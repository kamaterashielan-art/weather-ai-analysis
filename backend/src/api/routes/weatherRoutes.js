const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { authenticate } = require('../middleware/auth');
const { validateQuery } = require('../middleware/validation');

/**
 * GET /api/weather/current
 * Get current weather data for a location
 * Query params: latitude, longitude, units (metric/imperial)
 */
router.get('/current', validateQuery, weatherController.getCurrentWeather);

/**
 * GET /api/weather/forecast
 * Get weather forecast for next 7 days
 * Query params: latitude, longitude, days
 */
router.get('/forecast', validateQuery, weatherController.getForecast);

/**
 * GET /api/weather/historical
 * Get historical weather data
 * Query params: latitude, longitude, start_date, end_date
 */
router.get('/historical', authenticate, validateQuery, weatherController.getHistoricalData);

/**
 * POST /api/weather/location
 * Add a new location to track
 * Body: { name, latitude, longitude, country, timezone }
 */
router.post('/location', authenticate, weatherController.addLocation);

/**
 * GET /api/weather/locations
 * Get all tracked locations for user
 */
router.get('/locations', authenticate, weatherController.getUserLocations);

/**
 * DELETE /api/weather/location/:id
 * Remove a tracked location
 */
router.delete('/location/:id', authenticate, weatherController.removeLocation);

module.exports = router;
