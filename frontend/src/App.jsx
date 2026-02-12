import { useState, useCallback, useRef, useEffect } from 'react';
import QRScanner from './components/QRScanner';
import AssessmentForm from './components/AssessmentForm';
import Login from './components/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('assessment_logged_in') === 'true';
  });
  const [projectNumber, setProjectNumber] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannerKey, setScannerKey] = useState(0);
  const currentProjectRef = useRef('');
  const scannerJustOpenedRef = useRef(false);

  useEffect(() => {
    currentProjectRef.current = projectNumber;
  }, [projectNumber]);

  const handleQRScan = useCallback((data) => {
    const lines = data.split('\n');
    let projNo = '';
    let projTitle = '';
    lines.forEach(line => {
      if (line.startsWith('Project No:')) {
        projNo = line.replace('Project No:', '').trim();
      } else if (line.startsWith('Title:')) {
        projTitle = line.replace('Title:', '').trim();
      }
    });
    if (!projNo) return;
    // Ignore if same QR scanned within 2s of opening (camera still showing previous)
    if (projNo === currentProjectRef.current && scannerJustOpenedRef.current) return;
    scannerJustOpenedRef.current = false;
    setProjectNumber(projNo);
    setProjectTitle(projTitle);
    setScanned(true);
    setShowScanner(false);
  }, []);

  const handleReset = useCallback(() => {
    setProjectNumber('');
    setProjectTitle('');
    setScanned(false);
  }, []);

  const openScanner = useCallback(() => {
    scannerJustOpenedRef.current = true;
    setScannerKey((k) => k + 1);
    setShowScanner(true);
    window.setTimeout(() => {
      scannerJustOpenedRef.current = false;
    }, 2500);
  }, []);

  const closeScanner = useCallback(() => {
    setShowScanner(false);
  }, []);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <div className="toast-container" id="toast-container"></div>
      
      <div className="container">
        <header className="header">
          <div className="header-icon">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="main-title">DEB Innovation & Enterprise Fest 2026</h1>
          <p className="subtitle">Project Assessment Portal</p>
        </header>

        {showScanner ? (
          <QRScanner 
            key={scannerKey}
            onScan={handleQRScan} 
            onClose={closeScanner}
          />
        ) : (
          <>
            <div className="card team-info-card">
              <div>
                <label htmlFor="project-number" className="label">Project Number</label>
                <input
                  type="text"
                  id="project-number"
                  value={projectNumber}
                  onChange={(e) => setProjectNumber(e.target.value)}
                  placeholder="Scan QR or enter project number"
                  className="input"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="project-title" className="label">Project Title</label>
                <input
                  type="text"
                  id="project-title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Scan QR or enter project title"
                  className="input"
                  style={projectTitle ? { background: '#e8f4ff' } : {}}
                />
              </div>
              <button 
                type="button"
                className="qr-button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); openScanner(); }}
                aria-label="Scan QR Code"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {scanned ? 'Scan Again' : 'Scan QR Code'}
              </button>
              {(projectNumber || projectTitle) && (
                <button 
                  type="button"
                  className="reset-button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleReset(); }}
                  aria-label="Reset"
                >
                  Reset
                </button>
              )}
            </div>

            <AssessmentForm
              teamName={projectNumber}
              projectNumber={projectNumber}
              projectName={projectTitle}
              onReset={handleReset}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

