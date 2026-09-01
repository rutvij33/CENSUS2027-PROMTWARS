/**
 * Security Audit Controller
 */
const securityService = require('../services/securityService');

const auditClaim = (req, res, next) => {
    try {
        const { text } = req.body;
        const result = securityService.auditClaim(text);
        return res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = { auditClaim };
