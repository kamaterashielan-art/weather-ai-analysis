const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { authenticate } = require('../middleware/auth');
const { validateBody } = require('../middleware/validation');

/**
 * GET /api/alerts
 * Get all alerts for user
 * Query params: status (active/acknowledged/resolved), severity
 */
router.get('/', authenticate, alertController.getAlerts);

/**
 * GET /api/alerts/:id
 * Get specific alert details
 */
router.get('/:id', authenticate, alertController.getAlertById);

/**
 * POST /api/alerts/create
 * Create a new alert rule
 * Body: { location_id, alert_type, threshold, severity, enabled }
 */
router.post('/create', authenticate, validateBody, alertController.createAlert);

/**
 * PUT /api/alerts/:id
 * Update alert rule
 */
router.put('/:id', authenticate, validateBody, alertController.updateAlert);

/**
 * DELETE /api/alerts/:id
 * Delete alert rule
 */
router.delete('/:id', authenticate, alertController.deleteAlert);

/**
 * POST /api/alerts/:id/acknowledge
 * Acknowledge an alert
 */
router.post('/:id/acknowledge', authenticate, alertController.acknowledgeAlert);

/**
 * GET /api/alerts/active
 * Get active alerts only
 */
router.get('/active', authenticate, alertController.getActiveAlerts);

module.exports = router;
