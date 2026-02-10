# Project Assessment System

A full-stack web application for assessing hackathon projects with QR code scanning, real-time results, and secure submission.

## Features

- **QR Code Scanner**: Scan project QR codes to auto-fill team and project information
- **Camera Flip**: Switch between front and back cameras for QR scanning
- **Star Rating System**: 4-star rating system across 9 criteria in 3 categories
- **Duplicate Prevention**: Prevents assessors from submitting multiple assessments for the same team
- **Password Protection**: Secure submission with password verification
- **Real-time Results**: Live leaderboard that auto-refreshes every minute
- **SQL Database**: Persistent storage with SQLite

## Project Structure

```
├── backend/          # Express API server with SQLite database
├── frontend/         # React + Vite assessment form
├── results/          # React + Vite results display
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup (Assessment Form)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Results Display Setup

1. Navigate to the results directory:
```bash
cd results
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The results display will run on `http://localhost:3002`

## Default Passwords

The following passwords are configured for submission (you can change them in `backend/server.js`):

- `Admin123!`
- `Secure2024!`
- `JudgePass!`
- `Assess2024!`

To change passwords, edit the `SUBMIT_PASSWORDS` array in `backend/server.js`.

## API Endpoints

### POST `/api/assessments`
Submit a new assessment.

**Request Body:**
```json
{
  "teamName": "MP25052",
  "projectNumber": "MP25052",
  "projectName": "HYDROLIFT",
  "assessorName": "John Doe",
  "ratings": {
    "hook": 4,
    "story": 3,
    "dialogue": 4,
    "wow": 4,
    "heart": 3,
    "logic": 4,
    "polish": 4,
    "grit": 3,
    "future": 4
  },
  "password": "Admin123!"
}
```

### GET `/api/results`
Get aggregated results for all teams (for leaderboard).

### GET `/api/results/:teamName`
Get detailed results for a specific team.

## Database Schema

The `assessments` table stores:
- Team name and project information
- Assessor name (for duplicate prevention)
- Star ratings for 9 criteria
- Timestamp

## Usage

1. **For Assessors**: 
   - Open the frontend app (`http://localhost:3000`)
   - Scan QR code or manually enter team/project info
   - Enter assessor name
   - Rate the project using the star system
   - Submit with password

2. **For Viewing Results**:
   - Open the results app (`http://localhost:3002`)
   - View real-time leaderboard
   - Results auto-refresh every minute

## Security Features

- Password-protected submissions
- Duplicate assessment prevention (same assessor cannot assess same team twice)
- SQL injection protection via parameterized queries

## Technologies Used

- **Frontend**: React 18, Vite, HTML5 QR Code Scanner
- **Backend**: Node.js, Express, SQLite3
- **Styling**: CSS3 with modern gradients and animations

