import { Response } from "express";
import logger from "./logger";

/**
 * Custom error class for handling client and server errors with specific status codes.
 * Extends the built-in Error class with additional functionality specific to HTTP operations.
 */
class ClientError extends Error {
  /**
   * HTTP status code associated with the error, e.g., 404 for Not Found.
   */
  public statusCode: number;

  /**
   * Constructs a new ClientError.
   * @param {string} message - Descriptive message about the error.
   * @param {number} statusCode - HTTP status code appropriate for the error.
   */
  constructor(message: string, statusCode: number) {
    super(message); // Pass the message to the base Error class.
    this.name = "ClientError"; // Set a specific name for this type of error.
    this.statusCode = statusCode; // Attach the status code to the error instance.
    Error.captureStackTrace(this, this.constructor); // Captures a stack trace for debugging purposes.
  }

  /**
   * Serializes the error into a standard format for network transmission or logging.
   */
  serialize() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

/**
 * Handles errors by logging them and sending a response with the appropriate status code and error message.
 * @param {Response} res - The Express response object to send the error to.
 * @param {Error} error - The error to handle.
 */
function handleError(res: Response, error: Error): void {
  // Check if the error is an instance of ClientError
  if (error instanceof ClientError) {
    // Log the error with the appropriate level
    logger.log({
      level: error.statusCode < 500 ? "warn" : "error",
      message: error.message,
      statusCode: error.statusCode,
    });

    // Send the error response to the client
    res.status(error.statusCode).json({ error: error.message });
  } else {
    // For generic errors, log as an unhandled error and send a generic 500 Internal Server Error response
    logger.error("Unhandled error occurred", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
}
export { ClientError, handleError };
