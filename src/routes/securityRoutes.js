/**
 * Security Audit Routes
 */
const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');
const { validateAuditClaim } = require('../middleware/validator');

router.post('/audit-claim', validateAuditClaim, securityController.auditClaim);

module.exports = router;
