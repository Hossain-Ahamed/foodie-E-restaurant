import React, { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';

const QRScanner = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    initializeScanner();
  }, []);

  const initializeScanner = async () => {
    try {
      const permissionGranted = await checkCameraPermission();
      if (!permissionGranted) {
        setError('Camera permission denied. Please grant permission to use the QR scanner.');
        return;
      }
      

      const scanner = new QrScanner(videoRef.current, result => {
        console.log('Scanned:', result);
        setScannedData(result);
      });

      scanner.highlightCodeOutline = true; // Enable code outline highlighting
      scanner.highlightScanRegion = true; // Enable scan region highlighting

      scanner.start();

      return () => {
        scanner.stop();
      };
    } catch (error) {
      setError(error.message);
    }
  };

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {error ? (
        <>
          <p className="text-red-500">{error}</p>
          <p className="text-gray-500">Please enable camera permissions to use the QR scanner.</p>
          <p className="text-gray-500">You can enable camera permissions in your browser settings.</p>
        </>
      ) : (
        <>
          <video className="w-full max-w-lg border border-gray-300" ref={videoRef}></video>
          {scannedData ? (
            <div className="mt-4">
              <p className="text-green-500">QR Code Decoded: {scannedData}</p>
            </div>
          ) : (
            <p className="mt-4 text-gray-500">Scanning QR code...</p>
          )}
        </>
      )}
    </div>
  );
};

export default QRScanner;
