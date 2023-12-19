import { Response } from "express";

/**
 * Custom error class for handling client and server errors with specific status codes.
 */
export class ClientError extends Error {
  public statusCode: number;

  /**
   * ClientError constructor.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with this error.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ClientError";
    this.statusCode = statusCode;
  }
}

/**
 * Handles errors by sending a response with the appropriate status code and error message.
 * @param {Response} res - The response object to send the error.
 * @param {ClientError | Error} error - The error to handle.
 */
export function handleError(res: Response, error: ClientError | Error): void {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
