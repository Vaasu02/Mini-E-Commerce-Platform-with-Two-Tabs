const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' }
});

// Request size limiting middleware
const requestSizeLimit = (req, res, next) => {
  const MAX_SIZE = 1024 * 1024; // 1MB
  if (req.headers['content-length'] > MAX_SIZE) {
    return res.status(413).json({
      success: false,
      error: 'Request entity too large'
    });
  }
  next();
};

module.exports = {
  limiter,
  requestSizeLimit
};