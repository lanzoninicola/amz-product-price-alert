import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    skipSuccessfulRequests: true
});

export default globalLimiter;
