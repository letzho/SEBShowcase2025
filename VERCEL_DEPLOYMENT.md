# Deploying Frontend to Vercel

## Quick Answer

**No, the frontend does NOT connect to Supabase directly.** 

The frontend only connects to your backend API. The backend connects to Supabase.

## Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Frontend  │  HTTP   │    Backend   │  SQL    │  Supabase   │
│   (Vercel)  │ ──────> │ (Railway/etc)│ ──────> │  Database   │
└─────────────┘         └──────────────┘         └─────────────┘
```

## Step-by-Step Deployment

### Step 1: Deploy Backend First

Deploy your backend to Railway, Render, or similar:

1. **Railway** (Recommended - Easy setup):
   - Go to https://railway.app
   - Create new project
   - Connect your GitHub repo
   - Select `backend/` folder
   - Add environment variable:
     ```
     DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
     PORT=3001
     ```
   - Deploy and get your backend URL (e.g., `https://your-app.railway.app`)

2. **Render**:
   - Go to https://render.com
   - Create new Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variable: `DATABASE_URL` (your Supabase connection string)
   - Deploy and get your backend URL

### Step 2: Deploy Frontend to Vercel

**✅ Vercel fully supports React + Vite!** Your app is ready to deploy.

1. **Option A: Deploy via Vercel Web Interface** (Easiest):
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `frontend` (click "Edit" and set to `frontend`)
     - **Framework Preset**: Vite (auto-detected)
     - **Build Command**: `npm run build` (auto-detected)
     - **Output Directory**: `dist` (auto-detected)
   - Click "Deploy"

2. **Option B: Deploy via Vercel CLI**:
   ```bash
   npm i -g vercel
   cd frontend
   vercel
   ```
   - Follow the prompts
   - It will auto-detect Vite

**Note**: A `vercel.json` file has been created in the `frontend/` folder to ensure proper routing for your React app.

3. **Add Environment Variable in Vercel**:
   - Go to your project settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend.railway.app
     ```
   - Replace with your actual backend URL

4. **Redeploy** (if you added env var after first deploy):
   - Vercel will automatically redeploy when you add env vars
   - Or trigger a new deployment manually

### Step 3: Deploy Results Display (Optional)

Same process as frontend, but:
- Root Directory: `results`
- Same `VITE_API_URL` environment variable

## Environment Variables Summary

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.railway.app
```

### Backend (Railway/Render)
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
PORT=3001
```

## Testing After Deployment

1. **Test Backend**:
   - Visit: `https://your-backend.railway.app/api/health`
   - Should return: `{"status":"ok","database":"connected"}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try submitting an assessment
   - Check browser console (F12) for any errors

3. **Check Database**:
   - Go to Supabase dashboard
   - Check if assessments are being saved

## Important Notes

✅ **Frontend does NOT need Supabase credentials**
✅ **Frontend only needs backend API URL**
✅ **Backend handles all database connections**
✅ **CORS is already configured** in backend for cross-origin requests

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` is set correctly in Vercel
- Verify backend is running and accessible
- Check CORS settings in backend (should allow your Vercel domain)

### Backend can't connect to Supabase
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Verify database password is correct

### Build errors in Vercel
- Make sure `package.json` has correct build script
- Check Node.js version (Vercel auto-detects, but you can set it)
- Verify all dependencies are in `package.json`

## Quick Checklist

- [ ] Backend deployed and accessible
- [ ] Backend connected to Supabase (test with `/api/health`)
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set in Vercel environment variables
- [ ] Frontend can submit assessments
- [ ] Data appears in Supabase database
