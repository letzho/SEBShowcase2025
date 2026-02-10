# Setup Instructions

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all required packages (express, cors, sqlite3, dotenv).

## Step 2: Start Backend Server

```bash
npm start
```

The backend will run on http://localhost:3001

## Step 3: Install Frontend Dependencies

Open a **new terminal window** and run:

```bash
cd frontend
npm install
```

## Step 4: Start Frontend (Assessment Form)

```bash
npm run dev
```

**Note:** Use `npm run dev` NOT `npm vite`. The frontend will run on http://localhost:3000

## Step 5: Install Results Display Dependencies

Open **another terminal window** and run:

```bash
cd results
npm install
```

## Step 6: Start Results Display

```bash
npm run dev
```

The results display will run on http://localhost:3002

## Quick Reference

- **Backend**: `cd backend` → `npm install` → `npm start`
- **Frontend**: `cd frontend` → `npm install` → `npm run dev`
- **Results**: `cd results` → `npm install` → `npm run dev`

## Troubleshooting

- If `npm` is not recognized, make sure Node.js is installed
- If `npm vite` doesn't work, use `npm run dev` instead
- Make sure to run `npm install` in each directory before starting

