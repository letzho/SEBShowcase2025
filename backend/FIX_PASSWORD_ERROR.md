# Fix "client password must be a string" Error

## The Problem

The error `SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string` means:
- The password in your `DATABASE_URL` is missing or incorrectly formatted
- PostgreSQL connection string format is wrong

## Solution

### Step 1: Check Your .env File

Open `backend/.env` and check your `DATABASE_URL` format:

**Correct Format:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/assessment_db
```

**Common Mistakes:**

❌ **Missing password:**
```env
DATABASE_URL=postgresql://postgres@localhost:5432/assessment_db
```

✅ **Correct (with password):**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/assessment_db
```

❌ **Wrong format:**
```env
DATABASE_URL=postgresql://localhost:5432/assessment_db
```

✅ **Correct format:**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/assessment_db
```

### Step 2: Handle Special Characters in Password

If your PostgreSQL password contains special characters, you need to **URL-encode** them:

**Special characters that need encoding:**
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `#` → `%23`
- `?` → `%3F`
- `&` → `%26`
- `%` → `%25`
- ` ` (space) → `%20`

**Example:**
If your password is `my@pass:123`, use:
```env
DATABASE_URL=postgresql://postgres:my%40pass%3A123@localhost:5432/assessment_db
```

### Step 3: Find Your PostgreSQL Password

**If you forgot your PostgreSQL password:**

1. **Check if you set one during installation**
   - It's the password you entered when installing PostgreSQL

2. **Try common defaults:**
   - `postgres`
   - `admin`
   - `password`
   - (empty/no password)

3. **Reset PostgreSQL password:**
   - Windows: Edit `pg_hba.conf` file
   - Or reinstall PostgreSQL

### Step 4: Test Connection

**Option A: Test via command line**
```bash
psql -U postgres -h localhost
```
Enter password when prompted. If this works, use that password in `.env`.

**Option B: Test without password (if PostgreSQL allows)**
If PostgreSQL is configured to allow local connections without password:
```env
DATABASE_URL=postgresql://postgres@localhost:5432/assessment_db
```
(No password section)

### Step 5: Example .env File

Create `backend/.env` with this format:

```env
# For local PostgreSQL with password
DATABASE_URL=postgresql://postgres:your_actual_password@localhost:5432/assessment_db

# Or if no password required (less secure)
# DATABASE_URL=postgresql://postgres@localhost:5432/assessment_db

PORT=3001
```

**Replace `your_actual_password` with your real PostgreSQL password!**

### Step 6: Verify Format

Your connection string should follow this pattern:
```
postgresql://[username]:[password]@[host]:[port]/[database]
```

**Example breakdown:**
- `postgresql://` - Protocol
- `postgres` - Username
- `your_password` - Password (after the colon)
- `@localhost` - Host
- `:5432` - Port
- `/assessment_db` - Database name

### Step 7: Restart Server

After fixing `.env`:
```bash
npm start
```

## Quick Fix Checklist

- [ ] `.env` file exists in `backend/` directory
- [ ] `DATABASE_URL` starts with `postgresql://`
- [ ] Password is included after username (format: `username:password@`)
- [ ] Special characters in password are URL-encoded
- [ ] Database name is correct (`assessment_db`)
- [ ] Port is correct (`5432` for default PostgreSQL)
- [ ] Restarted server after changes

## Still Having Issues?

1. **Check if PostgreSQL is running:**
   ```powershell
   Get-Service -Name "*postgresql*"
   ```

2. **Test connection manually:**
   ```bash
   psql -U postgres -h localhost -d postgres
   ```

3. **Check PostgreSQL logs** for more details

4. **Try creating database first:**
   ```bash
   psql -U postgres
   CREATE DATABASE assessment_db;
   \q
   ```

