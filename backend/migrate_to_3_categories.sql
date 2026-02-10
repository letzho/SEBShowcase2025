-- Migration script to change from 9 ratings to 3 category ratings
-- Run this script to update your existing database

-- Step 1: Add new columns for the 3 categories
ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS persuading_rating INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS thinking_rating INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS change_rating INTEGER DEFAULT 0;

-- Step 2: Migrate existing data (if any)
-- For existing records, calculate average of the 3 sub-ratings for each category
UPDATE assessments 
SET 
  persuading_rating = ROUND((COALESCE(hook_rating, 0) + COALESCE(story_rating, 0) + COALESCE(dialogue_rating, 0)) / 3.0),
  thinking_rating = ROUND((COALESCE(wow_rating, 0) + COALESCE(heart_rating, 0) + COALESCE(logic_rating, 0)) / 3.0),
  change_rating = ROUND((COALESCE(polish_rating, 0) + COALESCE(grit_rating, 0) + COALESCE(future_rating, 0)) / 3.0)
WHERE persuading_rating = 0 AND thinking_rating = 0 AND change_rating = 0;

-- Step 3: Drop old columns (optional - comment out if you want to keep them for reference)
-- ALTER TABLE assessments 
-- DROP COLUMN IF EXISTS hook_rating,
-- DROP COLUMN IF EXISTS story_rating,
-- DROP COLUMN IF EXISTS dialogue_rating,
-- DROP COLUMN IF EXISTS wow_rating,
-- DROP COLUMN IF EXISTS heart_rating,
-- DROP COLUMN IF EXISTS logic_rating,
-- DROP COLUMN IF EXISTS polish_rating,
-- DROP COLUMN IF EXISTS grit_rating,
-- DROP COLUMN IF EXISTS future_rating;

-- Verify the changes
SELECT 
  id, 
  team_name, 
  assessor_name,
  persuading_rating,
  thinking_rating,
  change_rating,
  created_at
FROM assessments
LIMIT 5;
