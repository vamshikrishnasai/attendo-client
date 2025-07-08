import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { FaQrcode, FaShieldAlt, FaChartLine, FaBell, FaUsersCog, FaFileDownload } from 'react-icons/fa';
import Nav from './nav';

const FeatureCard = ({ title, description, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="backdrop-blur-lg bg-navy-800/20 p-8 rounded-2xl border border-navy-400/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/10"
  >
    <div className="mb-6 relative">
      <div className="text-3xl w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
        <Icon className="text-blue-400" />
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-3 text-white font-poppins tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {title}
    </h3>

    <p className="text-gray-300 leading-relaxed font-inter">
      {description}
    </p>
  </motion.div>
);

const Body = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#about') {
      scrollToSection(aboutRef);
    } else if (hash === '#contact') {
      scrollToSection(contactRef);
    }
  }, []);

  const slides = [
    { 
      image: "/logo.png",
      title: "Classroom Attendance" 
    },
    { 
      image: "/vjit-pica.png",
      title: "Digital Dashboard Analytics" 
    },
    { 
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80",
      title: "Barcode Scanning" 
    },
    { 
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",  
      title: "Modern Classroom"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: "Smart Scanning",
      description: "Advanced  barcode scanning technology for instant student identification and attendance tracking in real-time",
      icon: FaQrcode
    },
    {
      title: "Enhanced Security",
      description: "End-to-end encryption and secure authentication ensuring student data privacy and system integrity",
      icon: FaShieldAlt
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with detailed insights, trends, and patterns in attendance data",
      icon: FaChartLine
    },
    {
      title: "Instant Notifications",
      description: "Real-time alerts for absent students, late arrivals, and important attendance updates",
      icon: FaBell
    },
    {
      title: "User Management",
      description: "Flexible roles and permissions system for administrators, teachers, and staff members",
      icon: FaUsersCog
    },
    {
      title: "Downloadable Reports",
      description: "Export attendance data in various formats, PDF, and Excel for easy sharing and analysis",
      icon: FaFileDownload
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] overflow-x-hidden">
      <Nav scrollToSection={scrollToSection} aboutRef={aboutRef} contactRef={contactRef} />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A0F] via-[#111827] to-[#0A0A0F]">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-4 py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-white">
                  Manage Late Comers
                </span>
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Effortlessly
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Create, track, and manage student attendance all in one place. The complete platform for educational institutions.
              </p>
              <div className="flex gap-4 cursor-pointer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/scan")}
                  className="px-8 py-4 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700"
                  
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/learn-more")}
                  className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-md text-lg font-semibold hover:border-gray-500"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode='wait'>
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Update the rest of the sections with darker background */}
      <div className="bg-[#0A0A0F]">
        {/* Features Section */}
        <div className="py-32 bg-gradient-to-b from-[#0A0A0F] via-[#111827] to-[#0A0A0F] relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Key Features
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-32 bg-[#0A0A0F] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
          <motion.div
            ref={aboutRef}
            style={{ backgroundImage: "url('/pattern.png')" }}
            className="py-32 relative bg-fixed bg-cover"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                About Us
              </h2>
              <div className="space-y-6 text-gray-300 text-base md:text-lg backdrop-blur-lg bg-white/5 p-4 md:p-8 rounded-2xl">
                <img src="logo.png" alt="logo" className='h-32 md:h-48 mx-auto'/>
                <p>Attendo is a smart and secure latecomers management system designed to modernize attendance tracking in educational institutions. Our application enables institutions to monitor student punctuality through secure barcode scanning, geofencing-based verification, and real-time data analysis. By identifying latecomers automatically and generating insightful reports, Attendo helps faculty and administrators take timely actions and maintain discipline. With features such as instant notifications, performance dashboards, and reliable analytics, Attendo transforms traditional attendance into a data-driven tool for improving time management and accountability.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Section */}
        <div className="py-32 bg-gradient-to-b from-[#0A0A0F] via-[#111827] to-[#0A0A0F] relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div ref={contactRef} className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <form className="space-y-6 backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-4 bg-black/30 rounded-lg text-white border border-white/10 focus:border-blue-500 outline-none transition-all"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <textarea
                    placeholder="Your message"
                    rows={5}
                    className="w-full p-4 bg-black/30 rounded-lg text-white border border-white/10 focus:border-blue-500 outline-none transition-all"
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold text-lg"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 bg-[#0A0A0F] border-t border-navy-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <img src="/logo.png" alt="Attendo" className="h-12 mx-auto" />
              <p className="text-gray-400">© 2025 Attendo. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Add subtle animated lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#1E3A8A_50%,transparent_100%)] opacity-5 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#1E3A8A_50%,transparent_100%)] opacity-5 animate-gradient-y"></div>
      </div>
    </div>
  );
};

export default Body;
