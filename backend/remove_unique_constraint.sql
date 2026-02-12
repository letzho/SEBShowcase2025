-- Migration script to remove UNIQUE constraint and allow multiple votes per group
-- Run this if you have existing data and want to allow multiple votes

-- Remove the UNIQUE constraint
ALTER TABLE assessments 
DROP CONSTRAINT IF EXISTS assessments_team_name_assessor_name_key;

-- Verify constraint is removed
SELECT 
    constraint_name, 
    constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'assessments';
