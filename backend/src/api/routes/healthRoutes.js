const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

/**
 * GET /api/health/db
 * Database health check
 */
router.get('/db', async (req, res) => {
  try {
    const db = require('../../config/database');
    const result = await db.query('SELECT NOW()');
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: error.message
    });
  }
});

/**
 * GET /api/health/redis
 * Redis health check
 */
router.get('/redis', async (req, res) => {
  try {
    const redis = require('../../config/redis');
    await redis.ping();
    res.json({
      status: 'ok',
      redis: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      redis: 'disconnected',
      error: error.message
    });
  }
});

module.exports = router;
