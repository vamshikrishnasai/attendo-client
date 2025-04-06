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

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 pt-20 sm:pt-36">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 p-4 sm:p-8 rounded-2xl border border-white/10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center font-poppins tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Scan Barcode
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="flex justify-center">
              <div className="backdrop-blur-lg bg-black/20 p-2 sm:p-4 rounded-xl border border-white/10 w-full max-w-[500px]">
                {hasPermission ? (
                  <BarcodeScannerComponent
                    width="100%"
                    height={isMobile ? 400 : 300}
                    onUpdate={(err, result) => {
                      if (result) {
                        console.log("Scanned from Camera:", result.text);
                        setScannedData(result.text);
                        sendToServer(result.text);
                      }
                    }}
                    onError={(err) => {
                      if (err.name === 'NotAllowedError') {
                        setHasPermission(false);
                      }
                    }}
                    videoConstraints={{
                      facingMode: isMobile ? "environment" : "user",
                      width: { min: 320, ideal: 1280, max: 1920 },
                      height: { min: 240, ideal: 720, max: 1080 },
                    }}
                  />
                ) : (
                  <div className="text-center p-4 text-red-400">
                    Camera permission denied. Please enable camera access and refresh the page.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 text-gray-300">
              <p className="text-lg"><strong>Scanned Data:</strong> {scannedData || "No barcode detected"}</p>
              <p className="text-lg"><strong>Time Captured:</strong> {timestamp}</p>
            </div>

            <div className="border-t border-white/10 my-8"></div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white text-center">Or Upload an Image</h3>
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

