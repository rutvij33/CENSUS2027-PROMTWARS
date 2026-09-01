/**
 * Input Validation & Sanitization Middleware
 */
const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation error', 400, errors.array());
    }
    next();
};

const validateLookup = [
    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 digits')
        .isNumeric().withMessage('Mobile number must contain only numbers'),
    handleValidationErrors
];

const validateCensusCommit = [
    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 digits')
        .isNumeric().withMessage('Mobile number must contain only numbers'),
    handleValidationErrors
];

const validateAuditClaim = [
    body('text')
        .trim()
        .escape(),
    handleValidationErrors
];

module.exports = {
    validateLookup,
    validateCensusCommit,
    validateAuditClaim
};
