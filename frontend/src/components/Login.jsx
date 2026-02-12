import { useState } from 'react';
import './Login.css';

const LOGIN_PASSWORD = 'dseb2@26';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!password) {
      setError('Please enter password');
      return;
    }

    setSubmitting(true);
    
    // Small delay for UX
    setTimeout(() => {
      if (password === LOGIN_PASSWORD) {
        localStorage.setItem('assessment_logged_in', 'true');
        onLogin();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
        setSubmitting(false);
      }
    }, 300);
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="login-title">Assessment Portal</h2>
          <p className="login-subtitle">Enter password to access</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label htmlFor="login-password" className="login-label">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="login-input"
              autoFocus
              disabled={submitting}
            />
            {error && <p className="login-error">{error}</p>}
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
