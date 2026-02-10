import { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import './AssessmentForm.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function AssessmentForm({ teamName, projectNumber, projectName, onReset }) {
  const [assessorName, setAssessorName] = useState('');
  const [ratings, setRatings] = useState({
    persuading: 0,
    thinking: 0,
    change: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleRatingChange = (key, value) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!teamName || !projectNumber || !assessorName) {
      showToast('Please fill in team name, project number, and assessor name', 'error');
      return;
    }

    const hasRatings = Object.values(ratings).some(v => v > 0);
    if (!hasRatings) {
      showToast('Please rate at least one criterion', 'error');
      return;
    }

    setShowPasswordModal(true);
  };

  const confirmSubmit = async () => {
    if (!password) {
      showToast('Please enter password', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/assessments`, {
        teamName,
        projectNumber,
        projectName,
        assessorName,
        ratings,
        password
      });

      if (response.data.success) {
        showToast('Assessment submitted successfully! Scan again for next project.');
        // Clear only form fields; keep project so Scan Again / Reset stay usable
        setAssessorName('');
        setRatings({
          persuading: 0,
          thinking: 0,
          change: 0
        });
        setPassword('');
        setShowPasswordModal(false);
        // Do NOT call onReset() so project fields stay and Scan Again / Reset keep working on mobile
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to submit assessment';
      showToast(message, 'error');
      if (error.response?.status === 409) {
        // Duplicate assessment
        setShowPasswordModal(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const categories = [
    {
      id: 1,
      title: 'Excellence in Persuading Others for Change',
      description: 'Delivers a captivating, logically structured pitch with deep conviction, maintaining a clear narrative and engaging the audience through insightful Q&A.',
      icon: (
        <svg className="category-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      color: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
      key: 'persuading',
      criteria: [
        { label: 'The Hook', subtitle: '(Passion & Impact)' },
        { label: 'The Story', subtitle: '(Clarity & Flow)' },
        { label: 'The Dialogue', subtitle: '(Handling Q&A)' }
      ]
    },
    {
      id: 2,
      title: 'Excellence in Thinking Different',
      description: 'Presents a unique, creative solution with deep user-centricity, ensuring the concept is impactful, practical, and realistically viable for growth.',
      icon: (
        <svg className="category-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
      key: 'thinking',
      criteria: [
        { label: 'The "Wow" Factor', subtitle: '(Innovation)' },
        { label: 'The Heart', subtitle: '(User-Centricity)' },
        { label: 'The Logic', subtitle: '(Feasibility)' }
      ]
    },
    {
      id: 3,
      title: 'Excellence in Making Change Happen',
      description: 'Showcases exceptional craftsmanship through a functional prototype, demonstrating efficient execution and resilience to achieve measurable, long-term sustainable impact.',
      icon: (
        <svg className="category-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #155e75 100%)',
      key: 'change',
      criteria: [
        { label: 'The Polish', subtitle: '(Prototype Quality)' },
        { label: 'The Grit', subtitle: '(Execution Efficiency)' },
        { label: 'The Future', subtitle: '(Sustainable Impact)' }
      ]
    }
  ];

  const Star = ({ filled }) => (
    <svg className="legend-star-mini" fill={filled ? '#eab308' : '#e2e8f0'} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <>
      <div className="card card-assessor">
        <label htmlFor="assessor-name" className="label">Assessor Name *</label>
        <input
          type="text"
          id="assessor-name"
          value={assessorName}
          onChange={(e) => setAssessorName(e.target.value)}
          placeholder="Enter your name"
          className="input"
        />
        <p className="hint">Required to prevent duplicate assessments</p>
      </div>

      <div className="card card-legend">
        <h3 className="legend-title">Rating scale</h3>
        <div className="legend-inline">
          <span className="legend-inline-item"><Star filled /><span>1 Emerging</span></span>
          <span className="legend-inline-item"><Star filled /><Star filled /><span>2 Developing</span></span>
          <span className="legend-inline-item"><Star filled /><Star filled /><Star filled /><span>3 Accomplished</span></span>
          <span className="legend-inline-item"><Star filled /><Star filled /><Star filled /><Star filled /><span>4 Exemplary</span></span>
        </div>
      </div>

      <div className="categories-compact">
        {categories.map(category => (
          <div key={category.id} className="card category-card-compact">
            <div className="category-row">
              <div className="category-icon-compact" style={{ background: category.color }}>
                {category.icon}
              </div>
              <div className="category-body">
                <h2 className="category-title-compact">{category.title}</h2>
                <div className="criteria-chips">
                  {category.criteria.map((c, i) => (
                    <span key={i} className="chip">{c.label} {c.subtitle}</span>
                  ))}
                </div>
              </div>
              <div className="category-rating-wrap">
                <span className="category-rating-label">Rate (1–4)</span>
                <StarRating
                  value={ratings[category.key]}
                  onChange={(value) => handleRatingChange(category.key, value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={submitting || !teamName || !projectNumber || !assessorName}
      >
        {submitting ? 'Submitting...' : 'Submit Assessment'}
      </button>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Enter Password to Submit</h3>
            <p className="modal-hint">This prevents fraudulent voting</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  confirmSubmit();
                }
              }}
            />
            <div className="modal-buttons">
              <button className="modal-button cancel" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
              <button className="modal-button confirm" onClick={confirmSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AssessmentForm;

