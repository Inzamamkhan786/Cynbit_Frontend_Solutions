const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * Admin Login
 */
const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const user = await db.get(
      `SELECT * FROM admin_users WHERE username = ? OR email = ?`,
      [identifier.trim().toLowerCase(), identifier.trim().toLowerCase()]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username/email and password.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username/email and password.',
      });
    }

    // Update last login
    const now = new Date().toISOString();
    await db.run('UPDATE admin_users SET last_login = ? WHERE id = ?', [now, user.id]);

    // Sign JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Authentication successful. Welcome to Cynbit Admin Hub.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        lastLogin: now,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current admin user profile
 */
const getMe = async (req, res, next) => {
  try {
    const user = await db.get(
      'SELECT id, username, email, full_name, role, created_at, last_login FROM admin_users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found.',
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        createdAt: user.created_at,
        lastLogin: user.last_login,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe,
};
