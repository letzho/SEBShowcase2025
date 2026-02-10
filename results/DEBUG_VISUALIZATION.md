# Debug Visualization Issues

## If Charts/Table Not Showing

### Step 1: Check Browser Console
1. Open http://localhost:3002
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for:
   - Errors (red text)
   - "Results state:" log
   - "Chart data:" log

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Refresh page (F5)
3. Look for request to `/api/results`
4. Check:
   - Status should be **200**
   - Response should show JSON data

### Step 3: Verify Data Format
Open: http://localhost:3001/api/results

Should return JSON like:
```json
[
  {
    "team_name": "PJT1T",
    "project_number": "Try2",
    "avg_persuading": "10.00",
    "avg_thinking": "8.00",
    "avg_change": "10.00",
    "avg_total": "28.00"
  }
]
```

### Step 4: Check Chart Library
Make sure recharts is installed:
```bash
cd results
npm list recharts
```

If not installed:
```bash
npm install recharts
```

### Step 5: Common Issues

**Issue: Charts render but are empty**
- Check if data values are 0
- Verify chartData array has items
- Check console for "Chart data:" log

**Issue: White/blank charts**
- Check ResponsiveContainer has height
- Verify chart data format
- Check for JavaScript errors

**Issue: Table shows but charts don't**
- Check browser console for recharts errors
- Verify ResponsiveContainer is rendering
- Try refreshing page

### Step 6: Force Refresh
1. Hard refresh: **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
2. Clear browser cache
3. Restart results server:
```bash
cd results
npm run dev
```

### Step 7: Test with Sample Data
If still not working, check if the issue is with data format by looking at console logs for "Results state" and "Chart data".

