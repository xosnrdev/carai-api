import os from "os";
import cluster from "cluster";
import startWorkerProcess from "./app";

/** Number of CPU cores */
const numCPUs = os.cpus().length;

/**
 * Main function
 */
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (signal) {
      console.log(
        `worker ${worker.process.pid} was killed by signal: ${signal}`
      );
    } else if (code !== 0) {
      console.log(
        `worker ${worker.process.pid} exited with error code: ${code}`
      );
    } else {
      console.log(`worker ${worker.process.pid} success!`);
    }
  });
} else {
  startWorkerProcess();
}
