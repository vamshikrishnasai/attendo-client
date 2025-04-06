import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Attendies = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/getData");
        const result = await response.json();
        console.log("Fetched Data:", result);

        if (response.ok && Array.isArray(result)) {
          setData(result);
        } else {
          console.warn("API returned an empty array or invalid format.");
          setData([]);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });

    return { date: formattedDate, time: formattedTime };
  };

  const filteredData = selectedDate
    ? data.filter((item) => formatDateTime(item.time).date === selectedDate)
    : data;

  const isLate = (timeString) => {
    
    if (timeString.toUpperCase().includes('PM')) {
      return true;
    }

    const timeMatch = timeString.match(/(\d+):(\d+)/);
    if (timeMatch) {
      const [, hours, minutes] = timeMatch;
      if (Number(hours) > 9 || (Number(hours) === 9 && Number(minutes) > 40)) {
        return true;
      }
    }

    return false;
  };

  const generatePDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const doc = new jsPDF();

      
      const logoImg = new Image();
      logoImg.src = '/logo.png';
      
      await new Promise((resolve) => {
        logoImg.onload = () => {
          doc.addImage(logoImg, 'PNG', 15, 10, 20, 20);
          resolve();
        };
      });
      
      
      doc.setFontSize(18);
      doc.text("Attendo - Late Comers List", 40, 20);
      doc.setFontSize(12);
      doc.text(`Date: ${selectedDate || 'All Dates'}`, 15, 40);

      
      const lateComers = filteredData.filter(item => {
        const { time } = formatDateTime(item.time);
        return isLate(time);
      });

      if (lateComers.length === 0) {
        throw new Error('No late comers found for the selected date');
      }

     
      const tableData = lateComers.map(item => {
        const { date, time } = formatDateTime(item.time);
        return [item.rollno, date, time];
      });

      
      autoTable(doc, {
        startY: 45,
        head: [['Roll Number', 'Date', 'Time']],
        body: tableData,
        theme: 'grid',
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
      });

      doc.save(`late-comers-${selectedDate || 'all'}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert(error.message || 'Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 pt-36">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10"
        >
          <h2 className="text-4xl font-bold mb-8 text-center font-poppins tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Attendance Records
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            <input
              type="date"
              className="px-4 py-2 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-blue-500 outline-none"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className={`px-6 py-2 ${
                isGeneratingPDF ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-lg transition-colors duration-200 flex items-center gap-2`}
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586L7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <th className="px-4 py-3 text-white font-semibold">Roll Number</th>
                  <th className="px-4 py-3 text-white font-semibold">Date</th>
                  <th className="px-4 py-3 text-white font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => {
                    const { date, time } = formatDateTime(item.time);
                    const late = isLate(time);
                    return (
                      <tr
                        key={index}
                        className={`
                          ${late ? 'bg-red-900/50 hover:bg-red-800/50' : 'odd:bg-gray-800/30 even:bg-gray-800/50 hover:bg-gray-700/50'}
                          transition-colors
                        `}
                      >
                        <td className="px-4 py-3 text-center text-gray-300">{item.rollno}</td>
                        <td className="px-4 py-3 text-center text-gray-300">{date}</td>
                        <td className="px-4 py-3 text-center text-gray-300">
                          <span className={late ? 'text-red-400' : 'text-green-400'}>
                            {time}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Attendies;
