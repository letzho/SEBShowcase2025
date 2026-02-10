# How to View Results with Charts

## Access the Results Page

**URL:** http://localhost:3002

## What You'll See

### 1. **Total Scores Comparison Chart** (Bar Chart)
- Shows total scores for all teams
- Bars are color-coded by rank (Gold, Silver, Bronze)
- Easy to see which teams are leading

### 2. **Category Breakdown Chart** (Stacked Bar Chart)
- Shows scores for each category:
  - **Persuading** (Blue)
  - **Thinking** (Gold/Amber)
  - **Change** (Teal)
- Compare how teams perform across different categories

### 3. **Score Trends Chart** (Line Chart)
- Shows trends across categories
- See which categories teams excel in
- Visual comparison of performance

### 4. **Detailed Rankings Table**
- Complete table with all details
- Rank, team name, project info
- Individual category scores
- Total score and assessor count

## Features

✅ **Auto-refreshes every minute** - Results update automatically
✅ **Real-time data** - Shows latest scores from database
✅ **Interactive charts** - Hover to see exact values
✅ **Responsive design** - Works on desktop and mobile
✅ **Color-coded rankings** - Gold, Silver, Bronze for top 3

## Setup

1. **Install dependencies** (if not done):
```bash
cd results
npm install
```

2. **Start the results server**:
```bash
npm run dev
```

3. **Open in browser**:
```
http://localhost:3002
```

## Requirements

- Backend server must be running on http://localhost:3001
- Database must have assessment data
- Results page will show "No assessments submitted yet" if database is empty

## For Public Display

When deploying to cloud:
1. Deploy backend to Railway/Render
2. Deploy results frontend to Vercel/Netlify
3. Set `VITE_API_URL` environment variable to your backend URL
4. Share the results URL with teams/audience

The charts will automatically update every minute showing live competition results!

