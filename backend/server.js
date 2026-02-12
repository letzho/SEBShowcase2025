import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup - works with both local PostgreSQL and Supabase
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set in .env file!');
  console.error('Please create .env file with: DATABASE_URL=postgresql://postgres:password@localhost:5432/assessment_db');
  process.exit(1);
}

// Basic format check (avoid strict URL parse — passwords with @, #, etc. break it)
const dbUrl = process.env.DATABASE_URL.trim();
if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
  console.error('ERROR: Invalid DATABASE_URL format!');
  console.error('Expected format: postgresql://username:password@host:port/database');
  process.exit(1);
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: dbUrl.includes('supabase') ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database
async function initDatabase() {
  try {
    // Create table without UNIQUE constraint (allow multiple votes per group)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS assessments (
        id SERIAL PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL,
        project_number VARCHAR(255) NOT NULL,
        project_name VARCHAR(255),
        assessor_name VARCHAR(255) NOT NULL,
        persuading_rating INTEGER DEFAULT 0,
        thinking_rating INTEGER DEFAULT 0,
        change_rating INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Add new columns if they don't exist (for migration from old schema)
    await pool.query(`
      ALTER TABLE assessments 
      ADD COLUMN IF NOT EXISTS persuading_rating INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS thinking_rating INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS change_rating INTEGER DEFAULT 0
    `);
    
    // Remove UNIQUE constraint if it exists (for existing databases)
    try {
      await pool.query(`
        ALTER TABLE assessments 
        DROP CONSTRAINT IF EXISTS assessments_team_name_assessor_name_key
      `);
    } catch (err) {
      // Constraint might not exist or have different name, ignore
    }
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// API Routes

// Submit assessment
app.post('/api/assessments', async (req, res) => {
  try {
    const {
      teamName,
      projectNumber,
      projectName,
      ratings
    } = req.body;

    // Validate required fields
    if (!teamName || !projectNumber) {
      return res.status(400).json({ 
        error: 'Team name and project number are required' 
      });
    }

    // Insert assessment (no password check, no duplicate check, no assessor name)
    // Use timestamp as assessor identifier for tracking (optional)
    const result = await pool.query(
      `INSERT INTO assessments (
        team_name, project_number, project_name, assessor_name,
        persuading_rating, thinking_rating, change_rating
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`,
      [
        teamName,
        projectNumber,
        projectName || '',
        `voter_${Date.now()}`, // Anonymous identifier based on timestamp
        ratings.persuading || 0,
        ratings.thinking || 0,
        ratings.change || 0
      ]
    );

    res.json({ 
      success: true, 
      message: 'Assessment submitted successfully',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
});

// Get all results (for leaderboard)
app.get('/api/results', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        team_name,
        project_number,
        project_name,
        COUNT(*) as assessor_count,
        AVG(persuading_rating) as avg_persuading,
        AVG(thinking_rating) as avg_thinking,
        AVG(change_rating) as avg_change,
        AVG(persuading_rating + thinking_rating + change_rating) as avg_total
      FROM assessments
      GROUP BY team_name, project_number, project_name
      ORDER BY avg_total DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Get detailed results by team
app.get('/api/results/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const result = await pool.query(
      'SELECT * FROM assessments WHERE team_name = $1 ORDER BY created_at DESC',
      [teamName]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching team results:', error);
    res.status(500).json({ error: 'Failed to fetch team results' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await pool.end();
  process.exit(0);
});

async function startServer() {
  const dbOk = await initDatabase();
  if (!dbOk) {
    console.error('Cannot start: database initialization failed. Check DATABASE_URL (no spaces, special chars in password must be URL-encoded).');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Database: Connected');
  });
}

startServer();
