# Security Policy & Compliance Guidelines

## Census Act, 1948 Compliance & Privacy Safeguards
The **Census 2027 Digital Enumeration Portal** enforces data privacy protection in strict compliance with the **Census Act, 1948**.

### Key Security Implementations:
1. **Data Encryption**: All API endpoints enforce SSL/TLS encryption.
2. **Helmet HTTP Headers**: Enforces Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Content-Type-Options (`nosniff`), and X-Frame-Options (`SAMEORIGIN`).
3. **Rate Limiting**: Express Rate Limiter mitigates brute-force attacks on lookup and enumeration routes.
4. **Input Sanitization**: All inputs are sanitized using `express-validator` to prevent Cross-Site Scripting (XSS) and Injection attacks.
5. **Zero Monetary Collection**: Census operations are 100% free of activation or registration fees.

## Reporting a Security Vulnerability
If you discover a potential security vulnerability, please send a detailed security report to `guravrutvij@gmail.com`. Please do not report security issues via public GitHub issues.
