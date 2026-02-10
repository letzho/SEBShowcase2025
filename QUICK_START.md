# Quick Start Guide

## Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on: http://localhost:3001

### 2. Frontend Setup (Assessment Form)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

### 3. Results Display Setup
```bash
cd results
npm install
npm run dev
```
Results display runs on: http://localhost:3002

## Default Passwords

You can use any of these passwords to submit assessments:
- `Admin123!`
- `Secure2024!`
- `JudgePass!`
- `Assess2024!`

To change passwords, edit `backend/server.js` and modify the `SUBMIT_PASSWORDS` array.

## How to Use

1. **Start all three servers** (backend, frontend, results)
2. **For Assessors**: Open http://localhost:3000
   - Click "Scan QR Code" to scan project QR codes
   - Enter assessor name
   - Rate the project (1-4 stars for each criterion)
   - Click "Submit Assessment" and enter password
3. **For Results**: Open http://localhost:3002
   - View live leaderboard
   - Auto-refreshes every minute

## Features

✅ QR Code Scanner with camera flip
✅ Auto-fill team name and project number from QR code
✅ Assessor name tracking (prevents duplicates)
✅ Password-protected submissions
✅ Real-time results with auto-refresh
✅ SQL database for persistent storage

