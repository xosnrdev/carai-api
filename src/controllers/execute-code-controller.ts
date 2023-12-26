import { Request, Response } from "express";
import { CodeExecutionRequest } from "../models/code-execution";
import executeCode from "../services/docker-service";
import { handleError } from "../utils/error-handler";

/**
 * Controller to handle code execution requests.
 *
 * @param {Request} req - The HTTP request object containing the execution parameters.
 * @param {Response} res - The HTTP response object for sending back execution results or errors.
 */
async function handleCodeExecution(req: Request, res: Response): Promise<void> {
  try {
    const { language, code } = req.body as CodeExecutionRequest;
    const output = await executeCode(language, code);

    res.status(200).json({
      output,
    });
  } catch (error) {
    handleError(res, error as Error);
  }
}

export default handleCodeExecution;
