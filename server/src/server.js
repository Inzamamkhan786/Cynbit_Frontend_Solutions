require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./config/db');
const seedData = require('./utils/seed');

const enquiryRoutes = require('./routes/enquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Cynbit Smart Project Discovery API',
    uptime: process.uptime(),
    version: '1.0.0',
  });
});

// Mount Feature Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// In production or when client/dist exists, serve frontend SPA
const clientDist = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Catch Unhandled API Routes & Global Errors
app.use(notFoundHandler);
app.use(errorHandler);

// Database Initialization and Server Startup
const startServer = async () => {
  try {
    await db.initDatabase();
    // Auto-seed default admin & samples if fresh installation
    await seedData();

    if (process.env.NODE_ENV !== 'test') {
      const server = app.listen(PORT, () => {
        console.log(`\n======================================================`);
        console.log(`  CYNBIT TECHNOLOGIES REST API SERVER`);
        console.log(`  Status: Running on port ${PORT}`);
        console.log(`  Health Check: http://localhost:${PORT}/api/health`);
        console.log(`  Enquiries API: http://localhost:${PORT}/api/enquiries`);
        console.log(`  Admin Auth: http://localhost:${PORT}/api/auth/login`);
        console.log(`======================================================\n`);
      });
      return server;
    }
  } catch (error) {
    console.error('Failed to start Cynbit server:', error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = { app, startServer };
