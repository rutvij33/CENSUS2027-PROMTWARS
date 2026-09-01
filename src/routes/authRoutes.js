/**
 * Auth Routes
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLookup } = require('../middleware/validator');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/lookup', authLimiter, validateLookup, authController.lookupUser);

module.exports = router;
