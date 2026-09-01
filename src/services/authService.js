/**
 * Auth Service - In-Memory User & Token Management
 */
const crypto = require('crypto');

class AuthService {
    constructor() {
        this.databaseCache = new Map();
    }

    lookupMobile(mobile) {
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            throw new Error('INVALID_MOBILE');
        }
        if (this.databaseCache.has(mobile)) {
            return {
                userExists: true,
                token: this.databaseCache.get(mobile)
            };
        }
        return { userExists: false };
    }

    generateToken(mobile) {
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            throw new Error('INVALID_MOBILE');
        }
        const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
        const token = `H${randomNum}`;
        this.databaseCache.set(mobile, token);
        return token;
    }

    getToken(mobile) {
        return this.databaseCache.get(mobile) || null;
    }

    clearCache() {
        this.databaseCache.clear();
    }
}

module.exports = new AuthService();
