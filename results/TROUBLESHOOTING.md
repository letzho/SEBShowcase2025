# Troubleshooting Empty Blue Screen

## Common Issues and Solutions

### 1. Backend Not Running

**Symptom:** Empty blue screen, no data

**Solution:**
```bash
cd backend
npm start
```

Check if backend is running:
- Open: http://localhost:3001/api/health
- Should return: `{"status":"ok","database":"connected"}`

### 2. No Data in Database

**Symptom:** Shows "No assessments submitted yet"

**Solution:**
- Submit some assessments via http://localhost:3000
- Or check database: `npm run view-db` (in backend folder)

### 3. API Connection Error

**Symptom:** Console shows connection errors

**Check:**
1. Open browser console (F12)
2. Look for errors
3. Verify `VITE_API_URL` in results/.env (if exists)
4. Default should be: `http://localhost:3001`

### 4. Chart Library Not Installed

**Symptom:** JavaScript errors about recharts

**Solution:**
```bash
cd results
npm install
```

### 5. Check Browser Console

**Steps:**
1. Open http://localhost:3002
2. Press F12 to open Developer Tools
3. Check Console tab for errors
4. Check Network tab - see if API calls are failing

### 6. Verify All Servers Running

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Should see: "Server running on http://localhost:3001"
```

**Terminal 2 - Results:**
```bash
cd results
npm run dev
# Should see: "Local: http://localhost:3002"
```

### 7. Test API Directly

Open in browser:
```
http://localhost:3001/api/results
```

Should return JSON array (empty `[]` if no data, or array of results)

### 8. Check Database Connection

If using PostgreSQL:
- Verify `.env` file has correct `DATABASE_URL`
- Check if database exists
- Check if table exists

### Quick Debug Steps

1. **Check backend:** http://localhost:3001/api/health
2. **Check API:** http://localhost:3001/api/results
3. **Check browser console** (F12) for errors
4. **Verify all 3 servers running:**
   - Backend (3001)
   - Frontend (3000) 
   - Results (3002)

### Still Not Working?

1. **Clear browser cache** and refresh
2. **Restart all servers**
3. **Check for JavaScript errors** in console
4. **Verify database has data**

