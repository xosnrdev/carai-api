import rateLimit from "express-rate-limit";

/**
 * Middleware for rate limiting
 * @returns {Function} The rate limit middleware
 */
function rateLimitMiddleware() {
  return rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: Number(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  });
}


export default rateLimitMiddleware;
