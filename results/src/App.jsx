import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const CATEGORIES = [
  {
    key: 'persuading',
    title: 'Excellence in Persuading Others for Change',
    avgKey: 'avg_persuading',
    icon: '📢',
  },
  {
    key: 'thinking',
    title: 'Excellence in Thinking Different',
    avgKey: 'avg_thinking',
    icon: '💡',
  },
  {
    key: 'change',
    title: 'Excellence in Making Change Happen',
    avgKey: 'avg_change',
    icon: '⚡',
  },
];

const TOP_N = 5;

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_URL}/api/results`);
      if (Array.isArray(response.data)) {
        setResults(response.data);
        setLastUpdate(new Date());
        setLoading(false);
      } else {
        setResults([]);
        setLoading(false);
      }
    } catch (err) {
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError(`Cannot connect to backend at ${API_URL}. Make sure backend is running.`);
      } else if (err.response) {
        setError(`API Error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`);
      } else {
        setError(String(err.message));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatScore = (score) => {
    const numScore = typeof score === 'string' ? parseFloat(score) : (score ?? 0);
    if (isNaN(numScore)) return '0.00';
    return numScore.toFixed(2);
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#e2e8f0';
  };

  const topFiveByCategory = useMemo(() => {
    const out = {};
    CATEGORIES.forEach((cat) => {
      const sorted = [...results]
        .sort((a, b) => parseFloat(b[cat.avgKey] || 0) - parseFloat(a[cat.avgKey] || 0))
        .slice(0, TOP_N);
      out[cat.key] = sorted;
    });
    return out;
  }, [results]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <div className="live-indicator">
            <span className="pulse-dot"></span>
            <span>LIVE</span>
          </div>
          <div className="update-time">
            <span className="time-label">Last Updated:</span>
            <span className="time-value">{lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="title-container">
          <h1 className="title">DEB Innovation & Enterprise Fest 2026</h1>
          <div className="title-accent"></div>
        </div>
        <p className="subtitle">Live Competition Dashboard — Top 5 by Category</p>
      </header>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading results...</p>
        </div>
      ) : error ? (
        <div className="empty-state error-state">
          <h2>⚠️ Connection Error</h2>
          <p>{error}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Backend: <a href={`${API_URL}/api/health`} target="_blank" rel="noopener noreferrer">{API_URL}/api/health</a>
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          <h2>📊 No Assessments Yet</h2>
          <p>Submit assessments from the assessment portal to see leaderboards here.</p>
        </div>
      ) : (
        <div className="leaderboards-container">
          {CATEGORIES.map((category) => {
            const topFive = topFiveByCategory[category.key] || [];
            return (
              <div key={category.key} className="category-leaderboard-panel">
                <h2 className="category-leaderboard-title">
                  <span className="category-icon">{category.icon}</span>
                  {category.title}
                </h2>
                <p className="category-leaderboard-subtitle">Top {TOP_N}</p>
                <div className="top-five-list">
                  {topFive.length === 0 ? (
                    <p className="no-entries">No data yet</p>
                  ) : (
                    topFive.map((result, index) => {
                      const rank = index + 1;
                      const score = parseFloat(result[category.avgKey] || 0);
                      return (
                        <div
                          key={`${category.key}-${result.team_name}-${result.project_number}`}
                          className="top-five-item"
                        >
                          <div className="top-five-rank" style={{ color: getRankColor(rank) }}>
                            {getRankIcon(rank)}
                          </div>
                          <div className="top-five-info">
                            <div className="top-five-team">{result.team_name}</div>
                            <div className="top-five-project">
                              {result.project_name || result.project_number || '—'}
                            </div>
                          </div>
                          <div className="top-five-score">{formatScore(score)}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
