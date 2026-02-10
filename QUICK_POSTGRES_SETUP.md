# Quick PostgreSQL Setup

## ✅ Live Results Already Working!

The results display **already auto-refreshes every minute**! Just open:
- **Results**: http://localhost:3002

## Switch to PostgreSQL (for Supabase)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install `pg` (PostgreSQL driver) instead of `sqlite3`.

### Step 2: Choose Your Database

#### Option A: Local PostgreSQL

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create database:
```sql
CREATE DATABASE assessment_db;
```
3. Create `.env` file:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/assessment_db
PORT=3001
```

#### Option B: Supabase (Cloud - Recommended)

1. Go to https://supabase.com and create account
2. Create new project
3. Go to Settings → Database
4. Copy connection string (URI format)
5. Create `.env` file:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
PORT=3001
```

### Step 3: Start Server

```bash
npm start
```

The table will be created automatically!

## View Database

### With pgAdmin (Local PostgreSQL)
1. Download: https://www.pgadmin.org/
2. Connect to `localhost:5432`
3. Browse `assessment_db` → `assessments` table

### With Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor"
3. View `assessments` table

### Command Line
```bash
npm run view-db
```

## Deploy to Cloud

### Backend (Railway/Render)
1. Set `DATABASE_URL` environment variable (Supabase connection string)
2. Deploy code
3. Get backend URL

### Frontend (Vercel/Netlify)
1. Set `VITE_API_URL` to your backend URL
2. Deploy `frontend/` folder
3. Deploy `results/` folder separately (or combine)

### Results Display
- Already auto-refreshes every minute ✅
- Works with cloud backend ✅
- Just update `VITE_API_URL` in results app

## Notes

- **Same code works for both local and Supabase!**
- Just change the `DATABASE_URL` in `.env`
- Supabase uses PostgreSQL, so pgAdmin works with it too (via connection string)

