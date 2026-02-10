# Migration Guide: 9 Ratings to 3 Category Ratings

## Overview

The assessment system has been updated to use **3 category ratings** instead of 9 individual criteria ratings. Each category now has a single rating (1-4 stars) based on the description provided.

## Changes Made

### Database Schema
- **Old**: 9 rating fields (hook, story, dialogue, wow, heart, logic, polish, grit, future)
- **New**: 3 rating fields (persuading_rating, thinking_rating, change_rating)

### Categories
1. **Excellence in Persuading Others for Change** → `persuading_rating`
   - Description: "Delivers a captivating, logically structured pitch with deep conviction, maintaining a clear narrative and engaging the audience through insightful Q&A."

2. **Excellence in Thinking Different** → `thinking_rating`
   - Description: "Presents a unique, creative solution with deep user-centricity, ensuring the concept is impactful, practical, and realistically viable for growth."

3. **Excellence in Making Change Happen** → `change_rating`
   - Description: "Showcases exceptional craftsmanship through a functional prototype, demonstrating efficient execution and resilience to achieve measurable, long-term sustainable impact."

### Aggregation Logic
- **Formula**: `SUM(all ratings for a category) / COUNT(assessments for that team)`
- Each assessor can only assess each group once (enforced by UNIQUE constraint)
- Not all assessors assess the same groups, so the average is calculated per team

## Migration Steps

### Step 1: Run the Migration Script

If you have existing data, run the migration script to update your database:

```bash
# Connect to your PostgreSQL database
psql -U your_username -d assessment_db -f backend/migrate_to_3_categories.sql
```

Or if using Supabase/remote database:
```bash
# Set your DATABASE_URL in .env file first
psql $DATABASE_URL -f backend/migrate_to_3_categories.sql
```

**Note**: The migration script will:
1. Add the new 3 rating columns
2. Migrate existing data by averaging the 3 sub-ratings for each category
3. Keep old columns (commented out drop statements) for reference

### Step 2: Restart Backend Server

The backend server will automatically create the new schema if the table doesn't exist, or add the new columns if they're missing.

```bash
cd backend
npm start
```

### Step 3: Update Frontend

The frontend has been updated to show only 1 rating per category. No additional steps needed - just restart the frontend:

```bash
cd frontend
npm run dev
```

### Step 4: Update Results Dashboard

The results dashboard has been updated to display the new 3-category system. Restart it:

```bash
cd results
npm run dev
```

## Scoring System

- **Maximum Score**: 12 points (3 categories × 4 stars)
- **Minimum Score**: 3 points (3 categories × 1 star)
- **Average Calculation**: Sum of all assessor ratings for each category, divided by number of assessments

## Files Changed

1. **Backend**:
   - `backend/server.js` - Updated API endpoints and database schema
   - `backend/view_database.js` - Updated to display new schema
   - `backend/setup_database.sql` - Updated schema definition
   - `backend/migrate_to_3_categories.sql` - Migration script (NEW)

2. **Frontend**:
   - `frontend/src/components/AssessmentForm.jsx` - Updated to show 1 rating per category
   - `frontend/src/components/AssessmentForm.css` - Added styles for category description

3. **Results**:
   - `results/src/App.jsx` - Updated aggregation and display logic

## Verification

After migration, verify the changes:

1. **Check Database**:
   ```bash
   cd backend
   npm run view-db
   ```

2. **Test Assessment Submission**:
   - Go to `http://localhost:3000`
   - Submit a test assessment with the new 3-category system
   - Verify it saves correctly

3. **Check Results**:
   - Go to `http://localhost:3002`
   - Verify scores are calculated correctly (max 12 points)

## Rollback (If Needed)

If you need to rollback, the old columns are preserved (unless you uncommented the DROP statements). You can:
1. Revert the code changes using git
2. The old columns will still exist in the database
3. Update the code to use old columns again

## Notes

- Each assessor can still only assess each team once (UNIQUE constraint maintained)
- The aggregation automatically handles cases where not all assessors assess the same groups
- Maximum possible score changed from 36 (9×4) to 12 (3×4)
