# 🇮🇳 Census 2027 | India's First Digital Census Portal

[![CI Build](https://github.com/rutvij33/CENSUS2027-PROMTWARS/actions/workflows/ci.yml/badge.svg)](https://github.com/rutvij33/CENSUS2027-PROMTWARS/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://census-2027-promtwars.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-18%2B%20%7C%2020%2B%20%7C%2024%2B-brightgreen)](package.json)
[![WCAG Accessibility](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-orange)](public/index.html)

A state-of-the-art, secure, highly accessible, and multi-modal digital self-enumeration platform for **Census 2027**. Built with Express.js, Node.js, modern glassmorphic UI design tokens, and deployed serverless on Vercel.

---

## 🌟 Key Features

1. **🔒 Secure Authentication Gateway**:
   - Mobile Verification Key lookup & in-memory caching token engine (`H...`).
   - Strict rate limiting & input sanitization via `express-validator`.

2. **🗣️ Vernacular Engine (22 Official Indian Languages)**:
   - Built-in support for all **22 Scheduled Official Languages of India**: Hindi, English, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Odia, Punjabi, Urdu, Assamese, Maithili, Santali, Kashmiri, Nepali, Konkani, Dogri, Manipuri, Bodo, and Sanskrit.
   - Dynamic Google Translate integration with custom fallback options.

3. **📑 3-Block Guided Self-Enumeration Wizard**:
   - **Block A (Phase Directives & Location)**: Houselisting, State, District, Sub-district, Tehsil, and Village enumeration window tracking.
   - **Block B (Household Particulars & Multimodal Intake)**: 
     - **Vision ID Camera Scan**: Real-time webcam biometric face capture and demographic profile extraction.
     - **Live Voice Intake**: Real-time multilingual Speech-to-Text dictation using the Web Speech API.
   - **Block C (Housing, Amenities & Assets)**: Water supply, electricity connection, sanitation, and digital asset availability.

4. **🛡️ Privacy & Misinformation Sandbox (RAG Audit Ledger)**:
   - RAG (Retrieval-Augmented Generation) factual verification model auditing suspicious claims.
   - Automatically detects fraud indicators (e.g. fake fees, tax demands, penalty scams) and issues instant warnings in compliance with the **Census Act, 1948**.

5. **📊 Dynamic Demographic Analytics Graphics**:
   - Interactive parameter graphics vector displaying Rural vs. Urban vs. Tribal population metrics.
   - Real-time chart bar updates based on user query vectors (e.g., *Literacy*, *Gender*, *Digital*).

6. **🪪 Printable Digital Census ID Pass**:
   - Generates official Digital Census Serial Reference Tokens (`H1029384756`).
   - One-click print/export function for offline record keeping.

---

## 🏗️ Enterprise Folder Architecture

```
Census2027/
├── .github/
│   ├── workflows/
│   │   └── ci.yml              # GitHub Actions Automated CI Test Pipeline
│   ├── ISSUE_TEMPLATE/         # Bug Report & Feature Request Templates
│   └── PULL_REQUEST_TEMPLATE.md# Pull Request Template
├── public/                     # Static UI Assets (WCAG 2.1 AA Compliant)
│   ├── index.html              # Accessible Semantic HTML5 Layout
│   ├── css/
│   │   └── styles.css          # Glassmorphic Design System & Tokens
│   └── js/
│       ├── app.js              # State Controller & Print/Export Engine
│       ├── audit.js            # Misinformation Sandbox Auditor
│       ├── charts.js           # Dynamic Demographic Visualizer
│       ├── translate.js        # 22 Scheduled Indian Languages Switcher
│       └── wizard.js           # Vision Camera & Voice-to-Text Dictation
├── src/                        # Enterprise Backend Application
│   ├── app.js                  # Express Assembly & Security Setup
│   ├── controllers/            # Controller Layer (Auth, Census, Security)
│   ├── middleware/             # Rate Limiter, Helmet, Validator, Error Handler
│   ├── routes/                 # Express API Route Handlers
│   ├── services/               # In-Memory Database Cache & RAG Audit Engine
│   └── utils/                  # Centralized Logger & Response Formatter
├── tests/
│   └── api.test.js             # Automated Jest & Supertest Integration Suite
├── server.js                   # Standalone Application Entry Point
├── vercel.json                 # Serverless Production Routing Config
├── CONTRIBUTING.md             # Contribution Guidelines
├── LICENSE                     # MIT Open Source License
└── SECURITY.md                 # Security & Privacy Policy (Census Act 1948)
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js `v18.x` or higher
- npm `v9.x` or higher

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/rutvij33/CENSUS2027-PROMTWARS.git
cd Census2027
npm install
```

### 2. Run Local Development Server
```bash
npm start
# Server will start on http://localhost:3000
```

### 3. Run Automated Integration Tests
```bash
npm test
# Executes Jest & Supertest API integration suite
```

---

## 📡 API Reference

### 1. Auth Mobile Lookup
- **Endpoint**: `POST /api/auth/lookup`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  { "mobile": "9876543210" }
  ```
- **Response** (200 OK):
  ```json
  { "userExists": false }
  ```

### 2. Audit Misinformation Claim
- **Endpoint**: `POST /api/security/audit-claim`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  { "text": "Pay census activation fee of 100 rupees" }
  ```
- **Response** (200 OK):
  ```json
  {
    "status": "FRAUD_ALERT",
    "message": "❌ FRAUD VERIFICATION WARNING: Flagged by RAG database data models. Operations carry zero activation fees."
  }
  ```

### 3. Commit Census Payload
- **Endpoint**: `POST /api/census/commit`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  { "mobile": "9876543210", "payload": { "name": "Aarav Sharma" } }
  ```
- **Response** (200 OK):
  ```json
  {
    "token": "H5829104829",
    "committedAt": "2026-09-01T15:52:00.000Z",
    "status": "CACHED_PERSISTED"
  }
  ```

### 4. Health Check
- **Endpoint**: `GET /health`
- **Response** (200 OK):
  ```json
  { "status": "UP", "timestamp": "2026-09-01T15:52:00.000Z", "service": "Census 2027 Portal" }
  ```

---

## 🔒 Security & Compliance

This repository implements industry-standard web security practices:
- **Helmet.js**: Sets security HTTP headers (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `HSTS`).
- **Express Rate Limiting**: Mitigates brute-force attacks on lookup and enumeration routes.
- **Input Sanitization**: `express-validator` validates mobile format and escapes input text.
- **Zero Third-Party Tracking**: Enforces privacy compliance under the **Census Act, 1948**.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
