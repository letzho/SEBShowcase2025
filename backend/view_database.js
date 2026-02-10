import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : false
});

async function viewDatabase() {
  try {
    console.log('\n=== Assessment Database ===\n');
    
    // Get all assessments
    const assessmentsResult = await pool.query('SELECT * FROM assessments ORDER BY created_at DESC');
    const assessments = assessmentsResult.rows;
    
    if (assessments.length === 0) {
      console.log('No assessments found in the database.\n');
    } else {
      console.log(`Total Assessments: ${assessments.length}\n`);
      console.log('─'.repeat(100));
      
      assessments.forEach((assessment, index) => {
        console.log(`\n[${index + 1}] Assessment ID: ${assessment.id}`);
        console.log(`    Team Name: ${assessment.team_name}`);
        console.log(`    Project Number: ${assessment.project_number}`);
        console.log(`    Project Name: ${assessment.project_name || 'N/A'}`);
        console.log(`    Assessor: ${assessment.assessor_name}`);
        console.log(`    Created: ${assessment.created_at}`);
        console.log(`\n    Ratings:`);
        console.log(`      Persuading: ${assessment.persuading_rating || 0} stars`);
        console.log(`      Thinking: ${assessment.thinking_rating || 0} stars`);
        console.log(`      Change: ${assessment.change_rating || 0} stars`);
        
        const total = (assessment.persuading_rating || 0) + (assessment.thinking_rating || 0) + (assessment.change_rating || 0);
        console.log(`      Total Score: ${total}/12`);
        console.log('─'.repeat(100));
      });
    }
    
    // Get summary statistics
    console.log('\n=== Summary Statistics ===\n');
    const summaryResult = await pool.query(`
      SELECT 
        COUNT(*) as total_assessments,
        COUNT(DISTINCT team_name) as unique_teams,
        COUNT(DISTINCT assessor_name) as unique_assessors,
        AVG(persuading_rating + thinking_rating + change_rating) as avg_total_score
      FROM assessments
    `);
    
    const summary = summaryResult.rows[0];
    if (summary) {
      console.log(`Total Assessments: ${summary.total_assessments}`);
      console.log(`Unique Teams: ${summary.unique_teams}`);
      console.log(`Unique Assessors: ${summary.unique_assessors}`);
      console.log(`Average Total Score: ${summary.avg_total_score ? parseFloat(summary.avg_total_score).toFixed(2) : 0}/12`);
    }
    
    // Get team rankings
    console.log('\n=== Team Rankings ===\n');
    const rankingsResult = await pool.query(`
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
    
    const rankings = rankingsResult.rows;
    if (rankings.length > 0) {
      rankings.forEach((team, index) => {
        console.log(`${index + 1}. ${team.team_name} (${team.project_name || team.project_number})`);
        console.log(`   Assessors: ${team.assessor_count} | Avg Score: ${team.avg_total ? parseFloat(team.avg_total).toFixed(2) : 0}/12`);
        console.log(`   Persuading: ${team.avg_persuading ? parseFloat(team.avg_persuading).toFixed(2) : 0} | Thinking: ${team.avg_thinking ? parseFloat(team.avg_thinking).toFixed(2) : 0} | Change: ${team.avg_change ? parseFloat(team.avg_change).toFixed(2) : 0}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('Error viewing database:', error);
  } finally {
    await pool.end();
  }
}

viewDatabase();
