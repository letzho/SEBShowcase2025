# Login System & Multiple Votes Implementation

## Changes Made

### Frontend Changes

1. **Added Login Screen** (`frontend/src/components/Login.jsx`)
   - Password: **`dseb2@26`**
   - Shows on first visit
   - Stores login state in `localStorage` (key: `assessment_logged_in`)
   - Once logged in, user stays logged in until they clear browser data

2. **Removed Assessor Name Field**
   - No longer asks for assessor name
   - Form only requires: Project Number, Project Title, and ratings

3. **Removed Password Modal**
   - No password prompt when submitting assessments
   - Submit button works directly after login

4. **Updated App.jsx**
   - Checks `localStorage` for login state on load
   - Shows Login component if not logged in
   - Shows assessment form if logged in

### Backend Changes

1. **Removed Password Verification**
   - No password check in `/api/assessments` endpoint
   - Removed `verifyPassword()` function usage

2. **Removed Assessor Name Requirement**
   - `assessor_name` is auto-generated as `voter_${timestamp}` for tracking
   - No longer required in request body

3. **Removed Duplicate Check**
   - No UNIQUE constraint check
   - Same person can vote multiple times for the same group
   - Database constraint removed in `initDatabase()`

4. **Database Schema**
   - `assessor_name` still exists in table (for optional tracking)
   - UNIQUE constraint removed (allows multiple votes)
   - Migration script provided: `backend/remove_unique_constraint.sql`

## How It Works

### First Visit
1. User opens the app → sees **Login screen**
2. Enters password: **`dseb2@26`**
3. Clicks "Sign In"
4. Login state saved to `localStorage`
5. Assessment form appears

### After Login
1. User can scan QR or enter project details
2. Rate the 3 categories (1-4 stars each)
3. Click "Submit Assessment" (no password needed)
4. Can vote again for the same group or different groups
5. Stays logged in until browser data is cleared

### Logout
- Clear browser data / localStorage, or
- Close browser tab (if sessionStorage was used, but we use localStorage so it persists)

## Database Migration

If you have an existing database with the UNIQUE constraint:

```sql
ALTER TABLE assessments 
DROP CONSTRAINT IF EXISTS assessments_team_name_assessor_name_key;
```

Or run: `backend/remove_unique_constraint.sql`

## Security Notes

- Password is stored in frontend code (not ideal for production, but acceptable for controlled event)
- Login state persists in localStorage (survives browser restarts)
- No server-side session management (stateless)
- Multiple votes allowed per group (as requested)

## Testing

1. Open app → should see login screen
2. Enter wrong password → should show error
3. Enter `dseb2@26` → should see assessment form
4. Submit assessment → should work without password
5. Submit same group again → should work (no duplicate error)
6. Refresh page → should stay logged in
7. Clear localStorage → should show login screen again
