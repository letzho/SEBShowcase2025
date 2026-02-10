import { useState } from 'react';
import QRScanner from './components/QRScanner';
import AssessmentForm from './components/AssessmentForm';
import './App.css';

function App() {
  const [teamName, setTeamName] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleQRScan = (data) => {
    // Parse QR code data: "Project No: MP25052\nTitle: HYDROLIFT"
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

    if (projNo) {
      setProjectNumber(projNo);
      setTeamName(projNo); // Using project number as team identifier
      setProjectName(projTitle);
      setScanned(true);
      setShowScanner(false);
    }
  };

  const handleReset = () => {
    setTeamName('');
    setProjectNumber('');
    setProjectName('');
    setScanned(false);
  };

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
            onScan={handleQRScan} 
            onClose={() => setShowScanner(false)}
          />
        ) : (
          <>
            <div className="card team-info-card">
              <div className="grid-2">
                <div>
                  <label htmlFor="team-name" className="label">Team Name</label>
                  <input
                    type="text"
                    id="team-name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name or scan QR code"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="project-number" className="label">Project Number</label>
                  <input
                    type="text"
                    id="project-number"
                    value={projectNumber}
                    onChange={(e) => setProjectNumber(e.target.value)}
                    placeholder="Enter project number or scan QR code"
                    className="input"
                  />
                </div>
              </div>
              {projectName && (
                <div className="mt-4">
                  <label htmlFor="project-name" className="label">Project Name</label>
                  <input
                    type="text"
                    id="project-name"
                    value={projectName}
                    readOnly
                    className="input"
                    style={{ background: '#e8f4ff' }}
                  />
                </div>
              )}
              <button 
                className="qr-button"
                onClick={() => setShowScanner(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {scanned ? 'Scan Again' : 'Scan QR Code'}
              </button>
              {scanned && (
                <button 
                  className="reset-button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </div>

            <AssessmentForm
              teamName={teamName}
              projectNumber={projectNumber}
              projectName={projectName}
              onReset={handleReset}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

