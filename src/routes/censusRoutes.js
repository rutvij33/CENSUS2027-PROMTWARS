/**
 * Census Routes
 */
const express = require('express');
const router = express.Router();
const censusController = require('../controllers/censusController');
const { validateCensusCommit } = require('../middleware/validator');

router.post('/commit', validateCensusCommit, censusController.commitCensusPayload);

module.exports = router;
