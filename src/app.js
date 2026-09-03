/**
 * Express Application Assembly
 */
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const securityMiddleware = require('./middleware/security');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes');

const app = express();

// 1. Security HTTP Headers
app.use(securityMiddleware);

// 2. Performance & Compression
app.use(compression());

// 3. CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 4. Body Parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// 5. Serve Static Assets with Cache-Control
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir, {
    maxAge: 0,
    etag: true
}));

// 6. Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date().toISOString(), service: 'Census 2027 Portal' });
});

// 7. API Routes with Rate Limiter
app.use('/api', apiLimiter, apiRoutes);

// 8. Serve Index.html for root and SPA routes
app.use((req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

// 9. Centralized Error Handler
app.use(errorHandler);

module.exports = app;
