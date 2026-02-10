# Environment Variables Explanation

## How DATABASE_URL Works

You use **ONE** `DATABASE_URL` variable at a time. You switch it based on your environment:

### Local Development
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/assessment_db
```

### Supabase (Cloud)
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

## Setup Options

### Option 1: Single .env File (Switch Manually)

Create `.env` file in `backend/` directory:

**For local development:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/assessment_db
PORT=3001
```

**When deploying to cloud, change to:**
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
PORT=3001
```

### Option 2: Multiple .env Files (Recommended)

**For local development:**
- Create `.env` with local PostgreSQL URL
- Keep this in your project (but add to .gitignore)

**For cloud deployment:**
- Don't commit `.env` to git
- Set `DATABASE_URL` as environment variable in your hosting platform (Railway, Render, etc.)

### Option 3: Use Environment Variables in Deployment

When deploying to cloud platforms:

1. **Railway/Render/Heroku:**
   - Go to project settings
   - Add environment variable: `DATABASE_URL`
   - Set value to your Supabase connection string
   - The platform will use this instead of `.env` file

2. **Local development:**
   - Keep using `.env` file with local PostgreSQL URL

## Best Practice

1. **Local**: Use `.env` file with local PostgreSQL
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/assessment_db
   ```

2. **Cloud**: Set `DATABASE_URL` as environment variable in hosting platform
   - Don't hardcode Supabase URL in `.env` file
   - Set it in Railway/Render dashboard instead

3. **Never commit `.env` to git** (already in .gitignore)

## Example Workflow

### Development (Local)
```bash
# .env file contains:
DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/assessment_db

# Run locally
npm start
```

### Deployment (Cloud)
```bash
# In Railway/Render dashboard, set:
DATABASE_URL=postgresql://postgres:[SUPABASE-PASSWORD]@db.xxx.supabase.co:5432/postgres

# Deploy code (no .env file needed)
```

## Quick Reference

| Environment | DATABASE_URL Source | Location |
|------------|-------------------|----------|
| Local Dev | `.env` file | `backend/.env` |
| Cloud Deploy | Environment Variable | Hosting platform settings |
| Supabase | Connection String | Supabase project settings |

## Important Notes

- ✅ Use **ONE** `DATABASE_URL` at a time
- ✅ Switch between local and cloud by changing the value
- ✅ Never put both URLs in the same variable
- ✅ Cloud platforms override `.env` with their environment variables
- ✅ Keep `.env` for local development only

