# PostgreSQL Setup Guide

## Overview

The application now uses **PostgreSQL** which works with both:
- **Local PostgreSQL** (for development)
- **Supabase** (for cloud deployment)

## Option 1: Local PostgreSQL Setup

### Step 1: Install PostgreSQL

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Install PostgreSQL (remember the password you set for `postgres` user)
3. PostgreSQL will run on `localhost:5432` by default

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

Open PostgreSQL command line (psql) or pgAdmin:

```sql
-- Create database
CREATE DATABASE assessment_db;

-- Create user (optional, or use default postgres user)
CREATE USER assessment_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE assessment_db TO assessment_user;
```

### Step 3: Configure Environment

Create `.env` file in `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/assessment_db
PORT=3001
```

Replace:
- `postgres` with your PostgreSQL username
- `your_password` with your PostgreSQL password
- `assessment_db` with your database name

### Step 4: Install Dependencies

```bash
cd backend
npm install
```

### Step 5: Start Server

```bash
npm start
```

The server will automatically create the `assessments` table on first run.

## Option 2: Supabase Setup (Cloud)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in project details
5. Wait for project to be created

### Step 2: Get Database Connection String

1. Go to your Supabase project dashboard
2. Click on "Settings" → "Database"
3. Scroll to "Connection string"
4. Copy the "URI" connection string
5. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Step 3: Configure Environment

Create `.env` file in `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
PORT=3001
```

Replace `[YOUR-PASSWORD]` with your actual Supabase database password (found in project settings).

### Step 4: Install Dependencies

```bash
cd backend
npm install
```

### Step 5: Start Server

```bash
npm start
```

The server will automatically create the `assessments` table in Supabase.

## Viewing the Database

### Local PostgreSQL with pgAdmin

1. Download pgAdmin: https://www.pgadmin.org/
2. Install and open pgAdmin
3. Add server:
   - Name: `Local PostgreSQL`
   - Host: `localhost`
   - Port: `5432`
   - Username: `postgres`
   - Password: (your PostgreSQL password)
4. Browse to `assessment_db` → `Tables` → `assessments`

### Supabase Dashboard

1. Go to your Supabase project
2. Click "Table Editor" in the sidebar
3. View the `assessments` table
4. You can also use SQL Editor to run queries

### Command Line Script

```bash
cd backend
npm run view-db
```

## Live Results Display

The results display already auto-refreshes every minute! 

- **Frontend URL**: http://localhost:3000 (assessment form)
- **Results URL**: http://localhost:3002 (live leaderboard)

The results page automatically fetches new data every 60 seconds.

## Deployment to Cloud

### For Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy `dist/` folder to Vercel or Netlify
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com`

### For Backend (Railway/Render/Heroku)

1. Set environment variable: `DATABASE_URL` (your Supabase connection string)
2. Deploy backend code
3. Update frontend `VITE_API_URL` to point to deployed backend

### Recommended Setup

- **Database**: Supabase (free tier available)
- **Backend**: Railway or Render (free tier available)
- **Frontend**: Vercel or Netlify (free tier available)

## Migration from SQLite

If you have existing SQLite data:

1. Export data from SQLite:
```bash
sqlite3 assessments.db .dump > data.sql
```

2. Convert SQLite syntax to PostgreSQL (or use a migration tool)

3. Import to PostgreSQL:
```bash
psql -d assessment_db -f data.sql
```

## Troubleshooting

### Connection Issues

- Check if PostgreSQL is running: `pg_isready`
- Verify connection string format
- Check firewall settings
- For Supabase: Ensure IP is whitelisted (or use connection pooling)

### SSL Issues

- Local PostgreSQL: Usually no SSL needed
- Supabase: SSL is required (handled automatically in code)

### Port Conflicts

- Default PostgreSQL port: 5432
- Change in connection string if needed

