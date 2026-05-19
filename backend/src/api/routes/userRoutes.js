const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validateBody } = require('../middleware/validation');

/**
 * POST /api/users/register
 * Register a new user
 * Body: { email, password, name }
 */
router.post('/register', validateBody, userController.register);

/**
 * POST /api/users/login
 * Login user
 * Body: { email, password }
 */
router.post('/login', validateBody, userController.login);

/**
 * POST /api/users/logout
 * Logout user
 */
router.post('/logout', authenticate, userController.logout);

/**
 * GET /api/users/profile
 * Get user profile
 */
router.get('/profile', authenticate, userController.getProfile);

/**
 * PUT /api/users/profile
 * Update user profile
 * Body: { name, email, preferences }
 */
router.put('/profile', authenticate, validateBody, userController.updateProfile);

/**
 * POST /api/users/change-password
 * Change user password
 * Body: { currentPassword, newPassword }
 */
router.post('/change-password', authenticate, validateBody, userController.changePassword);

/**
 * POST /api/users/refresh-token
 * Refresh JWT token
 */
router.post('/refresh-token', userController.refreshToken);

module.exports = router;
