import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line 
} from 'recharts';
import { FaExclamationTriangle, FaCalendar, FaUserClock, FaClock } from 'react-icons/fa';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    latecomersDaily: [],
    latecomersFrequency: [],
    timeDelayDistribution: [],
    todayLatecomers: [],
    frequentLatecomers: [],
    summary: {
      totalLatecomers: 0,
      repeatOffenders: 0,
      averageDelay: 0,
      todaysLatecomers: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Add pie chart data
  const pieData = {
    lateness: [
      { name: 'On Time', value: 70 },
      { name: 'Late', value: 30 }
    ],
    frequency: [
      { name: 'First Time', value: 60 },
      { name: 'Repeat', value: 40 }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const storedData = localStorage.getItem('latecomersData');
        
        if (storedData) {
          const latecomers = JSON.parse(storedData);
          console.log("Fetched latecomers:", latecomers); // Debug log

          // Process daily data
          const dailyCount = {};
          const studentFrequency = {};
          const today = new Date().toDateString();
          const todayLate = [];

          latecomers.forEach(entry => {
            const date = new Date(entry.time).toDateString();
            dailyCount[date] = (dailyCount[date] || 0) + 1;
            studentFrequency[entry.rollno] = (studentFrequency[entry.rollno] || 0) + 1;

            // Track today's latecomers
            if (date === today) {
              todayLate.push({
                rollno: entry.rollno,
                time: new Date(entry.time).toLocaleTimeString()
              });
            }
          });

          // Get frequent latecomers
          const frequentStudents = Object.entries(studentFrequency)
            .map(([rollno, count]) => ({ rollno, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

          // Calculate time delay distribution with proper ranges
          const delays = latecomers.map(entry => {
            const entryTime = new Date(entry.time);
            const expectedTime = new Date(entry.time);
            expectedTime.setHours(9, 40, 0);
            return Math.floor((entryTime - expectedTime) / (1000 * 60));
          });

          const delayRanges = {
            '0-10': 0,
            '11-20': 0,
            '21-30': 0,
            '31-40': 0,
            '41-50': 0,
            '50+': 0
          };

          delays.forEach(delay => {
            if (delay <= 10) delayRanges['0-10']++;
            else if (delay <= 20) delayRanges['11-20']++;
            else if (delay <= 30) delayRanges['21-30']++;
            else if (delay <= 40) delayRanges['31-40']++;
            else if (delay <= 50) delayRanges['41-50']++;
            else delayRanges['50+']++;
          });

          const timeDelayData = Object.entries(delayRanges).map(([range, count]) => ({
            range,
            count,
            percentage: (count / delays.length * 100).toFixed(1)
          }));

          setAnalyticsData({
            latecomersDaily: Object.entries(dailyCount).map(([date, count]) => ({
              date: new Date(date).toLocaleDateString(),
              count
            })),
            latecomersFrequency: frequentStudents,
            todayLatecomers: todayLate,
            frequentLatecomers: frequentStudents,
            summary: {
              totalLatecomers: latecomers.length,
              repeatOffenders: frequentStudents.filter(s => s.count > 3).length,
              averageDelay: calculateAverageDelay(latecomers),
              todaysLatecomers: todayLate.length
            },
            timeDelayDistribution: timeDelayData
          });
        }
      } catch (error) {
        console.error('Error processing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateAverageDelay = (latecomers) => {
    if (latecomers.length === 0) return 0;

    const totalDelay = latecomers.reduce((acc, entry) => {
      const entryTime = new Date(entry.time);
      const expectedTime = new Date(entry.time);
      expectedTime.setHours(9, 40, 0);
      return acc + (entryTime - expectedTime);
    }, 0);

    return Math.round(totalDelay / (latecomers.length * 60000));
  };

  // Update color constants
  const COLORS = {
    area: {
      gradient: ['#3b82f6', '#1d4ed8'], // Blue gradient for area chart
    },
    bar: {
      primary: '#10b981', // Green for vertical bars
    },
    delay: {
      bars: ['#8b5cf6', '#6d28d9', '#5b21b6', '#4c1d95', '#4338ca', '#3730a3'], // Purple gradient for delay distribution
    },
    pie: {
      lateness: ['#ef4444', '#22c55e'], // Red & Green
      frequency: ['#f59e0b', '#0ea5e9'], // Amber & Light Blue
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-44 px-4 ">
      <div className="max-w-9xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/5 p-6 rounded-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Latecomers Analytics Dashboard
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<FaExclamationTriangle />}
              title="Total Latecomers"
              value={analyticsData.summary.totalLatecomers}
              color="red"
            />
            <StatCard
              icon={<FaUserClock />}
              title="Repeat Offenders"
              value={analyticsData.summary.repeatOffenders}
              color="orange"
            />
            <StatCard
              icon={<FaClock />}
              title="Avg. Delay (mins)"
              value={analyticsData.summary.averageDelay}
              color="yellow"
            />
            <StatCard
              icon={<FaCalendar />}
              title="Today's Latecomers"
              value={analyticsData.summary.todaysLatecomers}
              color="pink"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Latecomers Trend */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Daily Latecomers Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.latecomersDaily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke={COLORS.area.gradient[1]}
                    fill="url(#colorLatecomers)"
                  />
                  <defs>
                    <linearGradient id="colorLatecomers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.area.gradient[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.area.gradient[1]} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Frequent Latecomers */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Frequent Latecomers</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.latecomersFrequency} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#888" />
                  <YAxis dataKey="rollno" type="category" stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Bar dataKey="count" fill={COLORS.bar.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Time Delay Distribution */}
            <div className="lg:col-span-2 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Delay Time Distribution (minutes)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.timeDelayDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="range" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#888' }}
                    formatter={(value, name) => [`${value} students (${analyticsData.timeDelayDistribution.find(d => d.count === value)?.percentage}%)`]}
                  />
                  <Bar 
                    dataKey="count" 
                    fill={COLORS.delay.bars[0]}
                  >
                    {analyticsData.timeDelayDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS.delay.bars[index % COLORS.delay.bars.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Today's Latecomers Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Today's Latecomers */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Today's Latecomers</h3>
              <div className="overflow-auto max-h-[300px]">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-700/50">
                      <th className="px-4 py-2 text-left text-gray-200">Roll No</th>
                      <th className="px-4 py-2 text-left text-gray-200">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.todayLatecomers.map((student, idx) => (
                      <tr key={idx} className="border-t border-gray-700">
                        <td className="px-4 py-2 text-gray-300">{student.rollno}</td>
                        <td className="px-4 py-2 text-red-400">{student.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Frequent Latecomers */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Most Frequent Latecomers</h3>
              <div className="overflow-auto max-h-[300px]">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-700/50">
                      <th className="px-4 py-2 text-left text-gray-200">Roll No</th>
                      <th className="px-4 py-2 text-left text-gray-200">Times Late</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.frequentLatecomers.map((student, idx) => (
                      <tr key={idx} className="border-t border-gray-700">
                        <td className="px-4 py-2 text-gray-300">{student.rollno}</td>
                        <td className="px-4 py-2 text-red-400">{student.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pie Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Lateness Distribution */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Lateness Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData.lateness}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.lateness.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.pie.lateness[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Frequency Distribution */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Frequency Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData.frequency}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.frequency.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.pie.frequency[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Frequent Latecomers</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.latecomersFrequency} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#888" />
                  <YAxis dataKey="rollno" type="category" stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Bar dataKey="count" fill={COLORS.bar.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-xl bg-gray-800/50 border border-gray-700"
  >
    <div className={`text-${color}-500 text-2xl mb-2`}>{icon}</div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </motion.div>
);
export default Analytics;