# pgAdmin Setup Guide

## Step 1: Connect to PostgreSQL Server in pgAdmin

1. **Open pgAdmin**
2. **Right-click on "Servers"** in the left panel
3. **Select "Create" → "Server"**
4. **Fill in the connection details:**

   **General Tab:**
   - Name: `Local PostgreSQL` (or any name you prefer)

   **Connection Tab:**
   - Host name/address: `localhost`
   - Port: `5432`
   - Maintenance database: `postgres`
   - Username: `postgres` (default)
   - Password: `[Your PostgreSQL password]` (the one you set during installation)
   - ☑ Save password (optional, for convenience)

5. **Click "Save"**

## Step 2: Create the Database

### Option A: Using pgAdmin GUI

1. **Expand your server** → **Databases**
2. **Right-click on "Databases"** → **Create** → **Database**
3. **Fill in:**
   - Database: `assessment_db`
   - Owner: `postgres`
4. **Click "Save"**

### Option B: Using SQL Query Tool

1. **Right-click on your server** → **Query Tool**
2. **Paste this SQL:**
```sql
CREATE DATABASE assessment_db;
```
3. **Click Execute (F5)**

### Option C: Using Command Line

```bash
psql -U postgres
```

Then run:
```sql
CREATE DATABASE assessment_db;
\q
```

## Step 3: Verify Database Exists

1. **Refresh pgAdmin** (right-click "Databases" → Refresh)
2. **You should see `assessment_db`** in the list
3. **Expand it** → **Schemas** → **public** → **Tables**

## Step 4: Create Table (if not auto-created)

The server will auto-create the table when it starts, but you can also create it manually:

1. **Right-click on `assessment_db`** → **Query Tool**
2. **Paste the SQL from `setup_database.sql`**
3. **Execute (F5)**

## Troubleshooting

### Can't see any databases?

1. **Check if you're connected:**
   - Look for a green icon next to your server
   - If red/yellow, check password and connection settings

2. **Check default databases:**
   - You should at least see `postgres` database
   - If you don't see anything, PostgreSQL might not be running

3. **Verify PostgreSQL is running:**
   ```powershell
   Get-Service -Name "*postgresql*"
   ```
   Should show "Running"

### Connection refused?

- Check if PostgreSQL service is running
- Verify port 5432 is not blocked by firewall
- Check if PostgreSQL is listening on localhost

### Wrong password?

- Try the password you set during PostgreSQL installation
- If you forgot, you may need to reset it or reinstall PostgreSQL

### Still can't connect?

Try connecting via command line first:
```bash
psql -U postgres -h localhost
```

If this works, the issue is with pgAdmin settings. If it doesn't, PostgreSQL might not be configured correctly.

## Quick Test

After setup, test the connection:

1. **In pgAdmin**, right-click `assessment_db` → **Query Tool**
2. **Run:**
```sql
SELECT version();
```
3. **Should return PostgreSQL version info**

## Next Steps

Once database is created:
1. Update your `.env` file with the connection string
2. Start the backend server: `npm start`
3. The `assessments` table will be created automatically
4. View it in pgAdmin: `assessment_db` → `Schemas` → `public` → `Tables` → `assessments`

