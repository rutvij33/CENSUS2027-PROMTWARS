/**
 * Main API Router
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const censusRoutes = require('./censusRoutes');
const securityRoutes = require('./securityRoutes');

router.use('/auth', authRoutes);
router.use('/census', censusRoutes);
router.use('/security', securityRoutes);

module.exports = router;
