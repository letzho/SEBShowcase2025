# How to View the Database

## Current Setup: SQLite Database

The application uses **SQLite** (file-based database), not PostgreSQL, so **pgAdmin won't work**. The database file is located at:
```
backend/assessments.db
```

## Option 1: Use the Built-in Script (Recommended)

I've created a script to view the database easily:

```bash
cd backend
npm run view-db
```

This will show:
- All assessments with details
- Summary statistics
- Team rankings

## Option 2: Use SQLite Browser Tools

### DB Browser for SQLite (Free, GUI)
1. Download from: https://sqlitebrowser.org/
2. Install and open
3. Open the file: `backend/assessments.db`
4. Browse tables, run queries, view data

### VS Code Extension
1. Install "SQLite Viewer" extension in VS Code
2. Right-click on `assessments.db` → "Open Database"
3. View tables and data

### Command Line (SQLite CLI)
If you have SQLite installed:
```bash
cd backend
sqlite3 assessments.db
```

Then run SQL commands:
```sql
.tables                    -- List all tables
SELECT * FROM assessments; -- View all assessments
.schema                    -- View table structure
.quit                      -- Exit
```

## Option 3: Switch to PostgreSQL (If you prefer pgAdmin)

If you really want to use pgAdmin, I can help you:
1. Convert the database to PostgreSQL
2. Update the backend to use PostgreSQL instead of SQLite
3. Set up connection configuration

**Note:** This requires:
- PostgreSQL server installed
- More complex setup
- Database migration

Would you like me to help you switch to PostgreSQL, or is SQLite fine for your needs?

## Quick Database Info

**Table Name:** `assessments`

**Columns:**
- `id` - Primary key
- `team_name` - Team identifier
- `project_number` - Project number
- `project_name` - Project name
- `assessor_name` - Name of assessor
- `hook_rating` through `future_rating` - Star ratings (0-4)
- `created_at` - Timestamp

**Constraints:**
- Unique constraint on `(team_name, assessor_name)` - prevents duplicate assessments

