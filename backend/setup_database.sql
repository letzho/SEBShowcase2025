-- Create database for assessment system
-- Run this in psql or pgAdmin query tool

-- Create database (if it doesn't exist)
CREATE DATABASE assessment_db;

-- Connect to the new database
\c assessment_db

-- Create the assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL,
  project_number VARCHAR(255) NOT NULL,
  project_name VARCHAR(255),
  assessor_name VARCHAR(255) NOT NULL,
  persuading_rating INTEGER DEFAULT 0,
  thinking_rating INTEGER DEFAULT 0,
  change_rating INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(team_name, assessor_name)
);

-- Verify table was created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

