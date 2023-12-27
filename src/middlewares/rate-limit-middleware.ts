import rateLimit from "express-rate-limit";
import "dotenv/config";

/**
 * Middleware for rate limiting
 * @returns funtion the rate limit middleware
 */
function rateLimitMiddleware() {
  return rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    max: Number(process.env.RATE_LIMIT_MAX),
  });
}

export default rateLimitMiddleware;
