/**
 * Standardized API Response Format Helpers
 */
const successResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        timestamp: new Date().toISOString(),
        ...data
    });
};

const errorResponse = (res, message, statusCode = 400, errors = null) => {
    const payload = {
        success: false,
        error: message,
        timestamp: new Date().toISOString()
    };
    if (errors) {
        payload.details = errors;
    }
    return res.status(statusCode).json(payload);
};

module.exports = { successResponse, errorResponse };
