const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const { authenticate } = require('../middleware/auth');
const { validateBody } = require('../middleware/validation');

/**
 * POST /api/analysis/predict
 * Get AI prediction for weather
 * Body: { latitude, longitude, days_ahead }
 */
router.post('/predict', authenticate, validateBody, analysisController.getPrediction);

/**
 * GET /api/analysis/insights
 * Get AI-generated insights for a location
 * Query params: latitude, longitude, period (7d/30d/90d)
 */
router.get('/insights', authenticate, analysisController.getInsights);

/**
 * POST /api/analysis/compare
 * Compare weather patterns between locations
 * Body: { locations: [{ latitude, longitude }], period }
 */
router.post('/compare', authenticate, validateBody, analysisController.compareLocations);

/**
 * GET /api/analysis/trends
 * Get weather trends for a location
 * Query params: latitude, longitude, metric (temperature/humidity/pressure)
 */
router.get('/trends', authenticate, analysisController.getTrends);

/**
 * POST /api/analysis/anomaly-detection
 * Detect anomalies in weather data
 * Body: { latitude, longitude, sensitivity }
 */
router.post('/anomaly-detection', authenticate, validateBody, analysisController.detectAnomalies);

module.exports = router;
