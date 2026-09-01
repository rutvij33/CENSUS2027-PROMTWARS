/**
 * Application Entry Point
 */
const app = require('./src/app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        logger.info(`🚀 Production Census 2027 server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
