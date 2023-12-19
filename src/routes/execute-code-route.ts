import { Request, Response } from "express";
import handleCodeExecution from "../controllers/execute-code-controller";
import { validateCodeExecutionRequest } from "../utils/validation";

/**
 * Route for executing code
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
async function codeExecutionRoute(req: Request, res: Response) {
  // Validate input
  const { error } = validateCodeExecutionRequest(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Execute code
  await handleCodeExecution(req, res);
}

export default codeExecutionRoute;
