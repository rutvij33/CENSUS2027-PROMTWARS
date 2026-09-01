const request = require('supertest');
const app = require('../server');

describe('Census 2027 API & Security Integration Tests', () => {

    describe('GET /health', () => {
        it('should return 200 OK and health status UP', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'UP');
            expect(res.body).toHaveProperty('service', 'Census 2027 Portal');
        });
    });

    describe('POST /api/auth/lookup', () => {
        it('should return userExists: false for a new mobile number', async () => {
            const res = await request(app)
                .post('/api/auth/lookup')
                .send({ mobile: '9876543210' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('userExists', false);
        });

        it('should reject invalid mobile number length with 400 Bad Request', async () => {
            const res = await request(app)
                .post('/api/auth/lookup')
                .send({ mobile: '123' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
        });

        it('should reject non-numeric mobile number with 400 Bad Request', async () => {
            const res = await request(app)
                .post('/api/auth/lookup')
                .send({ mobile: 'abcdefghij' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
        });
    });

    describe('POST /api/security/audit-claim', () => {
        it('should trigger FRAUD_ALERT when claim contains suspicious key terms like tax/fee/cancel', async () => {
            const res = await request(app)
                .post('/api/security/audit-claim')
                .send({ text: 'Pay census registration fee of 100 rupees to activate census card or tax penalty' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'FRAUD_ALERT');
            expect(res.body.message).toContain('FRAUD VERIFICATION WARNING');
        });

        it('should return VERIFIED_SAFE for standard legitimate inquiry text', async () => {
            const res = await request(app)
                .post('/api/security/audit-claim')
                .send({ text: 'Census 2027 self enumeration schedule details' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'VERIFIED_SAFE');
            expect(res.body.message).toContain('SECURE PORTAL CLEARANCE');
        });
    });

    describe('POST /api/census/commit', () => {
        it('should commit census payload and generate secure token H...', async () => {
            const res = await request(app)
                .post('/api/census/commit')
                .send({ mobile: '9876543210', payload: { name: 'Aarav Sharma' } });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.token).toMatch(/^H\d{10}$/);
        });
    });

    describe('Security Headers', () => {
        it('should set security headers configured by Helmet', async () => {
            const res = await request(app).get('/health');
            expect(res.headers).toHaveProperty('x-content-type-options', 'nosniff');
            expect(res.headers).toHaveProperty('x-frame-options', 'SAMEORIGIN');
        });
    });
});
