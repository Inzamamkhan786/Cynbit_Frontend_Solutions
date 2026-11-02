const rateLimit = require('express-rate-limit');

// Rate limiter for public enquiry submissions (prevent spam & automated bots)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiry submissions from this IP. Please wait a few minutes before trying again.',
  },
});

// Rate limiter for admin login (mitigate brute force attacks)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. For security reasons, please try again in 15 minutes.',
  },
});

module.exports = {
  enquiryLimiter,
  loginLimiter,
};
