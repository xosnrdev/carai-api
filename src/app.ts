import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { Server } from "http";
import { Socket } from "net";
import checkHealth from "./routes/health-route";
import getWelcomeMessage from "./routes/root-route";
import rateLimitMiddleware from "./middlewares/rate-limit-middleware";
import codeExecutionRoute from "./routes/execute-code-route";
import { ClientError, handleError } from "./utils/error-handler";
import logger from "./utils/logger";
import 'dotenv/config'

/**
 * Starts the worker process and configures the Express application.
 * It applies middlewares for rate limiting, security, and JSON parsing,
 * sets up routing and global error handling, and implements graceful shutdown.
 *
 * @returns {Server} - The Express server instance.
 */
function startWorkerProcess(): Server {
  const app: Express = express();
  const activeConnections: Set<Socket> = new Set();

  app.use(helmet());
  app.use(rateLimitMiddleware());
  app.use(express.json({ limit: "1mb" }));

  app.get("/", getWelcomeMessage);

  app.get("/health", checkHealth);

  app.post("/api/execute", codeExecutionRoute);

  /**
   * Global error handler for catching and responding to errors.
   * Logs the error and sends a structured response to the client.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof ClientError)) {
      err = new ClientError(err.message || "Internal Server Error", 500);
    }
    handleError(res, err);
  });

  const server: Server = app.listen(process.env.PORT, () => {
    logger.info(
      `Worker process started on port ${process.env.PORT} with PID: ${
        process.pid
      }`
    );
  });

  server.on("connection", (connection: Socket) => {
    activeConnections.add(connection);
    connection.on("close", () => activeConnections.delete(connection));
  });

  /**
   * Handles the SIGTERM signal by shutting down the server gracefully.
   * It stops the server from accepting new connections and closes existing, active connections.
   */
  process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received: closing HTTP server");

    server.close(() => {
      logger.info("HTTP server closed");

      activeConnections.forEach((conn) => conn.destroy());
      activeConnections.clear();
    });
  });

  return server;
}

export default startWorkerProcess;
