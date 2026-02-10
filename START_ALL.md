# How to Start the Application

## Important Notes

1. **You need to install dependencies FIRST** before running any server
2. **For Vite projects**, use `npm run dev` NOT `npm vite`
3. **Run each server in a separate terminal window**

## Step-by-Step Setup

### Terminal 1: Backend Server

```bash
cd backend
npm install          # Only needed the first time
npm start            # Starts backend on http://localhost:3001
```

### Terminal 2: Frontend (Assessment Form)

```bash
cd frontend
npm install          # Only needed the first time
npm run dev          # Starts frontend on http://localhost:3000
```

**Note:** Use `npm run dev` - NOT `npm vite`

### Terminal 3: Results Display

```bash
cd results
npm install          # Only needed the first time
npm run dev          # Starts results on http://localhost:3002
```

## Quick Commands Reference

| Project | Install | Start |
|---------|---------|-------|
| Backend | `cd backend && npm install` | `npm start` |
| Frontend | `cd frontend && npm install` | `npm run dev` |
| Results | `cd results && npm install` | `npm run dev` |

## After Installation

Once dependencies are installed, you only need to run:
- `npm start` (backend)
- `npm run dev` (frontend and results)

No need to run `npm install` again unless you add new packages.

