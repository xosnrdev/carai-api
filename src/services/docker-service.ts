import Docker, { Container } from "dockerode";
import { ClientError } from "../utils/error-handler";
import isScriptInjectionAttempt from "../utils/security";

const MAX_CODE_SIZE = 65536; // max size per code.

/**
 * Executes the provided code in a Docker container based on the specified language.
 * It ensures security and resource limitations to prevent abuse.
 *
 * @param {string} language - The programming language of the code (e.g., 'python', 'javascript').
 * @param {string} code - The source code to execute as a string.
 * @returns {Promise<string>} A promise that resolves to the output of the code execution.
 * @throws {ClientError} Throws an error if the execution or Docker operations fail.
 *                        This includes script injection attempts, payload too large, unsupported languages,
 *                        and any errors from the Docker execution environment.
 */
async function executeCode(language: string, code: string): Promise<string> {
  if (isScriptInjectionAttempt(code)) {
    throw new ClientError("Script injection attempt detected", 403);
  }

  if (Buffer.byteLength(code, "utf-8") > MAX_CODE_SIZE) {
    throw new ClientError("Payload too large", 413);
  }

  const docker = new Docker({ socketPath: "/var/run/docker.sock" });
  let image: string;
  let cmd: string;
  let executeCommand: string;

  // Docker image and command based on the language
  switch (language) {
    case "python":
      image = "python:3-alpine";
      cmd = "python";
      executeCommand = `echo "${code.replace(/(["$`\\])/g, "\\$1")}" | ${cmd}`;
      break;
    case "javascript":
    case "typescript": {
      image = "node:18-alpine";
      cmd = "node";
      const asyncWrapper: string = `(async () => { try { ${code} } catch (err) { console.error(err); } })()`;
      executeCommand = `echo "${asyncWrapper.replace(
        /(["$`\\])/g,
        "\\$1"
      )}" | ${cmd}`;
      break;
    }
    default:
      throw new ClientError("Unsupported language", 400);
  }

  let container: Container | null = null;
  let timeoutId: NodeJS.Timeout;

  try {
    container = await docker.createContainer({
      Image: image,
      Cmd: ["/bin/sh", "-c", executeCommand],
      AttachStdout: true,
      AttachStderr: true,
      HostConfig: {
        // Resource Limits
        Memory: 256 * 1024 * 1024, // Limit memory to 256MB
        CpuShares: 1024, // Limit CPU, equivalent to 1 core
        PidsLimit: 50, // Limit the number of processes
        ReadonlyRootfs: true, // Mount the container's root filesystem as read-only
        // Security Options
        CapDrop: ["ALL"], // Drop all capabilities
        SecurityOpt: ["no-new-privileges"], // Disable privilege escalation
      },
    });

    await container.start();

    const executionTimeout = 10000; // 10 seconds
    const timeoutPromise = new Promise<string>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new ClientError("Execution timed out", 408));
      }, executionTimeout);
    });

    const executionPromise = new Promise<string>((resolve, reject) => {
      if (!container) {
        reject(new ClientError("Failed to initialize Docker container", 500));
        return;
      }

      container
        .attach({ stream: true, stdout: true, stderr: true })
        .then((streamData) => {
          let outputData = "";
          let errorData = "";

          container!.modem.demuxStream(
            streamData,
            { write: (data: Buffer) => (outputData += data.toString()) },
            { write: (data: Buffer) => (errorData += data.toString()) }
          );

          streamData.on("end", () => {
            clearTimeout(timeoutId);
            if (errorData) {
              // Check for Out-of-Memory or other specific server-side errors
              if (
                errorData.includes("out of memory") ||
                errorData.toLowerCase().includes("killed")
              ) {
                reject(new ClientError("Internal Server Error", 500));
              } else {
                reject(new ClientError(errorData.trim(), 400));
              }
            } else {
              resolve(outputData.trim());
            }
          });
        })
        .catch((error) => {
          if (error instanceof ClientError) {
            reject(error);
          } else {
            reject(new ClientError("Error attaching to Docker container", 500));
          }
        });
    });

    // Race the execution against the timeout
    return await Promise.race([executionPromise, timeoutPromise]);
  } catch (error) {
    if (error instanceof ClientError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ClientError(`Docker execution failed: ${error.message}`, 500);
    } else {
      throw new ClientError("Unknown error occurred in Docker execution", 500);
    }
  } finally {
    if (container) {
      try {
        // Attempt to stop and remove the container safely.
        const containerInfo = await container.inspect();
        if (containerInfo.State.Running) {
          await container.stop({ t: 5 });
        }
        await container.remove();
      } catch (cleanupError) {
        console.error("Error during Docker container cleanup:", cleanupError);
      }
    }
  }
}

export default executeCode;
