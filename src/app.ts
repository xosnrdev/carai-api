import express from "express";
import rateLimitMiddleware from "./middlewares/rate-limit-middleware";
import helmet from "helmet";
import codeExecutionRoute from "./routes/execute-code-route";
import { Server } from "http";

/**
 * Starts the worker process.
 */
function startWorkerProcess(): Server {
  const app = express();

  // Apply middleware
  app.use(rateLimitMiddleware());
  app.use(helmet());
  app.use(express.json());

  // Define routes
  app.post("/v1/execute", codeExecutionRoute);

  // Start the server
  const server = app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });

  return server;
}

export default startWorkerProcess;
