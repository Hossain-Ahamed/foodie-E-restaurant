import React, { useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Link } from 'react-router-dom';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { toast } from 'react-hot-toast';

const QRScanner = () => {
  const [error, setError] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    initializeScanner();
    return () => {
      if (scanner) {
        scanner.destroy();
      }
    };
  }, []);

  let scanner = null;

  const initializeScanner = async () => {
    try {
      const permissionGranted = await checkCameraPermission();
      if (!permissionGranted) {
        setError('Camera permission denied. Please grant permission to use the QR scanner.');
        return;
      }

      scanner = new QrScanner(document.getElementById('qr-video'), handleScanResult, {
        onDecodeError: error => {
        //   console.error(error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });

      scanner.start().then(() => {
        QrScanner.listCameras(true).then(cameras => {
          setCameras(cameras);
          if (cameras.length > 0) {
            setSelectedCamera(cameras[0].id);
          }
        });
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleScanResult = result => {
    setScannedData(result.data);
   
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

  const handleCameraChange = event => {
    setSelectedCamera(event.target.value);
    scanner.setCamera(event.target.value);
  };

  return (
    <div className="w-full h-full mt-5">
        <SetTitle  title="Qr Scan"/>
     
      <div className="w-full max-w-xl mx-auto h-full max-h-[70vh] flex flex-col justify-center items-start">
     
        {/* <h1>Scan from WebCam:</h1> */}
        {error && <p className='text-danger-400 mt-10 text-center font-semibold text-xl'>{error}</p>}
        <div>
          <video
            id="qr-video"
            className="w-full md:max-w-[700px] max-h-[70vh] mt-3"
          ></video>
        </div>
        
        <div className='mt-3 '>
        
         
          <p className='text-center mt-4 text-xs text-indigo-500'>Note: To place an order at the restaurant, please scan the QR code provided on your table. After completing the scan, click the button below to navigate to the restaurant page </p>
        </div>
      </div>
      <div id="cam-qr-result" className=' my-2 mx-auto'>
            {scannedData ||(
              <Link to={scannedData} className=' font-semibold cursor-pointer shadow px-5 py-2 bg-gray-100  text-blue-600 dark:text-blue-500 hover:underline'>Go to Restaurant Page</Link>
            ) }
            
          </div>
    </div>
  );
};

export default QRScanner;
