# How to Run All Servers

## You Need 3 Servers Running:

### 1. Backend Server (Port 3001)
**Purpose:** API server with database

```bash
cd backend
npm start
```

**URL:** http://localhost:3001 (API only, not a web page)

---

### 2. Frontend - Assessment Form (Port 3000)
**Purpose:** For assessors to submit assessments

```bash
cd frontend
npm install  # First time only
npm run dev
```

**URL:** http://localhost:3000
**Use for:** Assessors to scan QR codes and submit ratings

---

### 3. Results Display (Port 3002)
**Purpose:** Live leaderboard with charts

```bash
cd results
npm install  # First time only
npm run dev
```

**URL:** http://localhost:3002
**Use for:** Displaying live results with charts to teams/audience

---

## Quick Start (3 Terminal Windows)

### Terminal 1 - Backend:
```bash
cd backend
npm start
```

### Terminal 2 - Assessment Form:
```bash
cd frontend
npm run dev
```

### Terminal 3 - Results Display:
```bash
cd results
npm run dev
```

---

## What Each Does:

| Server | Port | Purpose | Who Uses It |
|--------|------|---------|-------------|
| Backend | 3001 | API & Database | (Internal - no direct access) |
| Frontend | 3000 | Assessment Form | Assessors/Judges |
| Results | 3002 | Live Leaderboard | Teams/Audience |

---

## Important Notes:

✅ **All 3 must be running** for the system to work
✅ **Backend must run first** (frontend and results depend on it)
✅ **Frontend and Results can run in any order** (after backend is up)
✅ **Each needs its own terminal window**

---

## Quick Check:

- ✅ Backend running? Check: http://localhost:3001/api/health
- ✅ Frontend running? Check: http://localhost:3000
- ✅ Results running? Check: http://localhost:3002

---

## For Production/Cloud:

When deploying:
- **Backend**: Deploy to Railway/Render
- **Frontend**: Deploy to Vercel/Netlify (set `VITE_API_URL`)
- **Results**: Deploy to Vercel/Netlify separately (set `VITE_API_URL`)

Or combine frontend and results into one app if preferred.

