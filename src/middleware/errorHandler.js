/**
 * Centralized Error Handler Middleware
 */
const logger = require('../utils/logger');
const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    logger.error('Unhandled server error', err);

    if (err.message === 'INVALID_MOBILE') {
        return errorResponse(res, 'Invalid 10-digit mobile number provided', 400);
    }

    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' 
        ? 'An internal server error occurred.' 
        : (err.message || 'Internal Server Error');

    return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;
