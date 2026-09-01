/**
 * Census Controller
 */
const censusService = require('../services/censusService');

const commitCensusPayload = (req, res, next) => {
    try {
        const { mobile, payload } = req.body;
        const result = censusService.commitCensusPayload(mobile, payload);
        return res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = { commitCensusPayload };
