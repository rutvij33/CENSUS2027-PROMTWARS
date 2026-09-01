/**
 * Helmet Security Headers & CORS Middleware Setup
 */
const helmet = require('helmet');

const securityMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://translate.google.com", "https://translate.googleapis.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://translate.googleapis.com", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "blob:", "https://translate.googleapis.com", "https://www.google.com"],
            connectSrc: ["'self'", "https://translate.googleapis.com"],
            mediaSrc: ["'self'", "blob:"],
            objectSrc: ["'none'"]
        }
    },
    crossOriginEmbedderPolicy: false
});

module.exports = securityMiddleware;
