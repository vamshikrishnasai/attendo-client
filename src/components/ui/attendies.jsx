import React, { useEffect, useState } from "react";

const Attendies = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
// const [selectedTime,setSelectedTime]=useState([])
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
let timeArr=[];
let mArr=[];
    const hello=filteredData.forEach((obj)=>{
         
         const time1=formatDateTime(obj.time).time;
         
        timeArr.push(time1.split(" ")[0]);
        mArr.push(time1.split(" ")[1]);
        })
        
      
console.log(timeArr,mArr);



 

  

  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Attendance Records</h2>

      <div className="flex justify-center gap-4 mb-4">
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-400 px-4 py-2">Roll Number</th>
              <th className="border border-gray-400 px-4 py-2">Date</th>
              <th className="border border-gray-400 px-4 py-2">Time</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const { date, time } = formatDateTime(item.time);
                return (
                  <tr key={index} style={{ backgroundColor: selectedColor }} className="even:bg-gray-200">
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.rollno}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{date}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{time}</td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="border border-gray-400 px-4 py-2 text-center text-red-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendies;
