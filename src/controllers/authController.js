/**
 * Auth Controller
 */
const authService = require('../services/authService');
const { successResponse } = require('../utils/response');

const lookupUser = (req, res, next) => {
    try {
        const { mobile } = req.body;
        const result = authService.lookupMobile(mobile);
        return res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = { lookupUser };
