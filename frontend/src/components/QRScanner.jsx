import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './QRScanner.css';

function QRScanner({ onScan, onClose }) {
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' for back camera, 'user' for front
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    let mounted = true;
    const startScanning = async () => {
      try {
        const html5QrCode = new Html5Qrcode('qr-reader');
        html5QrCodeRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: facingMode },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            if (onScanRef.current) onScanRef.current(decodedText);
            stopScanning();
          },
          (errorMessage) => {
            // Ignore errors, just keep scanning
          }
        );
        if (mounted) setIsScanning(true);
      } catch (err) {
        console.error('Error starting scanner:', err);
      }
    };

    startScanning();

    return () => {
      mounted = false;
      stopScanning();
    };
  }, [facingMode]);

  const stopScanning = async () => {
    if (!html5QrCodeRef.current) return;
    try {
      await html5QrCodeRef.current.stop();
      html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
      setIsScanning(false);
    } catch (err) {
        console.error('Error stopping scanner:', err);
    }
  };

  const toggleCamera = async () => {
    await stopScanning();
    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
  };

  return (
    <div className="qr-scanner-overlay">
      <div className="qr-scanner-container">
        <div className="qr-scanner-header">
          <h2>Scan QR Code</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div id="qr-reader" className="qr-reader"></div>
        <div className="qr-scanner-controls">
          <button className="flip-button" onClick={toggleCamera}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Flip Camera
          </button>
        </div>
        <p className="qr-hint">Point your camera at the QR code</p>
      </div>
    </div>
  );
}

export default QRScanner;

