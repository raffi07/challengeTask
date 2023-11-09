const setRateLimit = require("express-rate-limit");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: "You have exceeded the requests per minute limit.",
    headers: true,
});

module.exports = rateLimitMiddleware;