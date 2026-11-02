const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { validateLogin } = require('../middleware/validation');
const { loginLimiter } = require('../middleware/rateLimiter');

// Admin login
router.post('/login', loginLimiter, validateLogin, login);

// Get current admin user
router.get('/me', requireAuth, getMe);

module.exports = router;
