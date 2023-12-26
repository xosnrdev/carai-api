import * as winston from 'winston';
import 'dotenv/config'

/**
 * Configures and creates a Winston logger.
 * The log level is set based on the application environment,
 * with 'debug' for development and 'error' for production.
 *
 * @module logger
 */

// Determine the environment-specific log level.
const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

// Create and configure the logger instance.
const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;