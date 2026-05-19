const logger = require('../../utils/logger');

/**
 * Validation Middleware
 * Validates request query parameters and body
 */

const validateQuery = (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_QUERY',
          message: 'Latitude and longitude query parameters are required'
        }
      });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_COORDINATES',
          message: 'Latitude and longitude must be valid numbers'
        }
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_LATITUDE',
          message: 'Latitude must be between -90 and 90'
        }
      });
    }

    if (lon < -180 || lon > 180) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_LONGITUDE',
          message: 'Longitude must be between -180 and 180'
        }
      });
    }

    next();
  } catch (error) {
    logger.error('Query validation error', error);
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid query parameters'
      }
    });
  }
};

/**
 * Validate request body
 */
const validateBody = (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'EMPTY_BODY',
          message: 'Request body cannot be empty'
        }
      });
    }

    next();
  } catch (error) {
    logger.error('Body validation error', error);
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request body'
      }
    });
  }
};

module.exports = {
  validateQuery,
  validateBody
};
