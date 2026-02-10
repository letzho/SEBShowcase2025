# Deploy to Vercel + Trial Period & Competition Day Reset

## Does Vercel host a database?

**No.** Vercel hosts only your **frontend (and serverless functions)**. It does **not** run a database.

Your setup:

- **Vercel** → hosts the **assessment form** and **results** (React apps).
- **Backend** → must be hosted elsewhere (e.g. Railway or Render).
- **Database** → **Supabase** (PostgreSQL in the cloud). You keep using one Supabase project for both trial and competition day; on the day, you clear the data.

---

## Architecture (trial and competition day)

```
Users (browser)
    ↓
[ Assessment Form ]  ← Vercel
[ Results Page   ]  ← Vercel
    ↓
[ Backend API ]     ← Railway or Render
    ↓
[ Supabase DB ]     ← Same DB for trial & competition (clear on the day)
```

---

## Step 1: Prepare your repo

1. Push your project to **GitHub** (if not already).
2. Ensure:
   - `frontend/` has `package.json` and `vite build` works.
   - `results/` has `package.json` and `vite build` works.
   - `backend/` has `package.json` and `npm start` runs the API.

---

## Step 2: Create and connect Supabase (if not done)

1. Go to [supabase.com](https://supabase.com) → create a project.
2. **Settings → Database** → copy the **Connection string (URI)**.
3. Format:  
   `postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`  
   Or use the direct one on port 5432 if you prefer.
4. Keep this for the **backend** env (Step 3). Use the **same** Supabase project for trial and for competition day.

---

## Step 3: Deploy the backend (Railway or Render)

The frontend on Vercel will call this URL. Deploy it first.

### Option A: Railway

1. Go to [railway.app](https://railway.app) → **New Project**.
2. **Deploy from GitHub repo** → select your repo.
3. Set **Root Directory** to `backend`.
4. **Variables** (or **Settings → Variables**):
   - `DATABASE_URL` = your Supabase connection string.
   - `PORT` = `3001` (or leave default if Railway sets it).
5. Deploy. Copy the public URL (e.g. `https://your-app.railway.app`).  
   This is your **backend URL** for the next step.

### Option B: Render

1. Go to [render.com](https://render.com) → **New → Web Service**.
2. Connect your GitHub repo.
3. **Root Directory**: `backend`.
4. **Build**: `npm install`.
5. **Start**: `npm start`.
6. **Environment**: add `DATABASE_URL` = Supabase connection string.
7. Deploy and copy the service URL (e.g. `https://your-app.onrender.com`).

---

## Step 4: Deploy frontend (assessment form) to Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub.
2. **Add New Project** → import your repository.
3. Configure:
   - **Root Directory**: click **Edit** → set to `frontend`.
   - **Framework Preset**: Vite (should be auto-detected).
   - **Build Command**: `npm run build`.
   - **Output Directory**: `dist`.
4. **Environment Variables** (before or after first deploy):
   - Name: `VITE_API_URL`  
   - Value: `https://your-backend.railway.app` (or your Render URL).  
   No trailing slash.
5. **Deploy**.  
   Share this URL with assessors for the **assessment form**.

---

## Step 5: Deploy results page to Vercel

You need a **second** Vercel project (same repo, different root).

1. In Vercel: **Add New Project** again → import the **same** GitHub repo.
2. Configure:
   - **Root Directory**: `results`.
   - **Framework Preset**: Vite.
   - **Build Command**: `npm run build`.
   - **Output Directory**: `dist`.
3. **Environment Variables**:
   - `VITE_API_URL` = same backend URL as frontend (e.g. `https://your-backend.railway.app`).
4. **Deploy**.  
   Use this URL for the **live results / leaderboard** (e.g. on a big screen).

---

## Step 6: Let users try first (trial)

- Use the **same** Supabase project and the **same** deployed frontend + backend + results.
- Share:
  - **Assessment form**: your Vercel frontend URL.
  - **Results**: your Vercel results URL.
- All trial submissions go into the same `assessments` table. No extra setup.

---

## Step 7: Competition day — reset database (new, clean data)

On the day, you want to **delete all existing data** in Supabase so only competition-day assessments count.

### Option A: Supabase Dashboard (easiest)

1. Go to [Supabase](https://supabase.com) → your project.
2. **Table Editor** → open the `assessments` table.
3. Select all rows (checkbox in header) → **Delete** (or use the trash icon).
4. Confirm.  
   Table stays; only data is cleared. New submissions will be the “latest and newest” for the competition.

### Option B: SQL (good if you have many rows)

1. In Supabase: **SQL Editor**.
2. Run:

```sql
TRUNCATE TABLE assessments RESTART IDENTITY;
```

This deletes every row and resets the `id` counter. No need to drop the table.

### When to do it

- Do the reset **once**, **before** the competition starts (e.g. morning of the event).
- After that, do **not** truncate again during the day, or you will lose live data.

---

## Checklist

- [ ] Supabase project created; connection string copied.
- [ ] Backend deployed (Railway or Render); URL works (e.g. `https://your-backend/api/health`).
- [ ] Frontend deployed on Vercel; `VITE_API_URL` set to backend URL.
- [ ] Results deployed on Vercel; `VITE_API_URL` set to same backend URL.
- [ ] Trial: shared both URLs; users can submit and see results.
- [ ] Competition day: truncated `assessments` (or deleted all rows) once before start.

---

## Summary

- **Vercel** = frontend + results only (no database).
- **Supabase** = database for both trial and competition; **clear data on competition day** (Table Editor or `TRUNCATE assessments`) so the database is latest and newest for the real start.
