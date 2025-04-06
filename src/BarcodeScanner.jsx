import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import jsQR from "jsqr"; 
import { motion } from "framer-motion";

const BarcodeScanner = () => {
  const [scannedData, setScannedData] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [imageData, setImageData] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);
  const [facingMode, setFacingMode] = useState("environment");

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const toggleCamera = () => {
    setFacingMode(prevMode => prevMode === "environment" ? "user" : "environment");
  };

  const sendToServer = async (barcode) => {
    const timestamp = new Date().toLocaleString();
    setTimestamp(timestamp);

    try {
      const response = await fetch("http://localhost:8080/api/users/sendData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode, timestamp }),
      });

      const data = await response.json();
      setServerResponse(data.message);
      console.log("Server Response:", data.message);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            console.log("Scanned from Image:", code.data);
            setImageData(code.data);
            sendToServer(code.data);
          } else {
            setImageData("No barcode found in image.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 pt-12 sm:pt-20 md:pt-36">
      <div className="w-full max-w-lg mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 p-3 sm:p-6 md:p-8 rounded-2xl border border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center font-poppins tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Scan Barcode
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col items-center">
              <div className="backdrop-blur-lg bg-black/20 p-2 rounded-xl border border-white/10 w-full aspect-[4/3] relative">
                {hasPermission ? (
                  <>
                    <BarcodeScannerComponent
                      width="100%"
                      height="100%"
                      onUpdate={(err, result) => {
                        if (result) {
                          setScannedData(result.text);
                          sendToServer(result.text);
                        }
                      }}
                      onError={(err) => {
                        console.error("Scanner Error:", err);
                        if (err.name === 'NotAllowedError') {
                          setHasPermission(false);
                        }
                      }}
                      videoConstraints={{
                        facingMode: facingMode,
                        width: { ideal: window.innerWidth < 768 ? 640 : 1280 },
                        height: { ideal: window.innerWidth < 768 ? 480 : 720 },
                      }}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0.5rem'
                      }}
                    />
                    {isMobile && (
                      <button
                        onClick={toggleCamera}
                        className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center p-4 text-red-400">
                    Camera permission denied. Please enable camera access and refresh the page.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 text-gray-300 text-sm sm:text-base">
              <p><strong>Scanned Data:</strong> {scannedData || "No barcode detected"}</p>
              <p><strong>Time Captured:</strong> {timestamp}</p>
            </div>

            <div className="border-t border-white/10 my-4 sm:my-6"></div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white text-center">Or Upload an Image</h3>
              <div className="flex justify-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 text-gray-300"
                />
              </div>
              
              {imageData && (
                <p className="text-lg text-gray-300">
                  <strong>Scanned from Image:</strong> {imageData}
                </p>
              )}
            </div>

            {serverResponse && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-center">
                  <strong>Server Response:</strong> {serverResponse}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BarcodeScanner;

