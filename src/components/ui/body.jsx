import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Nav from './nav'

const FeatureCard = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/10"
  >
    <div className="mb-6 relative">
      <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
        {icon}
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30" />
    </div>
    
    <h3 className="text-2xl font-bold mb-3 text-white font-poppins tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {title}
    </h3>
    
    <p className="text-gray-300 leading-relaxed font-inter">
      {description}
    </p>
  </motion.div>
)

const Body = () => {
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#about') {
      scrollToSection(aboutRef)
    } else if (hash === '#contact') {
      scrollToSection(contactRef)
    }
  }, [])

  const features = [
    {
      title: "Quick Scanning",
      description: "Scan student barcodes instantly for real-time attendance tracking",
      icon: "🔍"
    },
    {
      title: "Secure System",
      description: "End-to-end encrypted data with secure authentication",
      icon: "🔒"
    },
    {
      title: "Real-time Analytics",
      description: "Get instant insights and attendance reports",
      icon: "📊"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <Nav scrollToSection={scrollToSection} aboutRef={aboutRef} contactRef={contactRef} />
      <div className="container mx-auto px-6 pt-24"> 
        
        <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center"> 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className='text-center font-bold text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 font-poppins tracking-tight'>
              Smart and Secure Student
            </h1>
            <h1 className='text-center font-bold text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 mb-16 font-poppins tracking-tight'>
              Late Comers Management System
            </h1>
          </motion.div>
        </section>

        <h1 className='  bg-clip-text text-transparent  bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-5xl font-bold font-poppins tracking-tight'>Key Features</h1>
        <section className="min-h-screen py-24">
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
        </section>

        
        <section ref={aboutRef} className="min-h-screen py-32"> 
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl  bg-clip-text  font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8 text-center">About Us</h2>
            <div className="space-y-6 text-gray-300 text-lg backdrop-blur-lg bg-white/5 p-8 rounded-2xl">
               <img src="logo.png" alt=""  className='h-48 mx-auto'/>
              <p>Attendo is a smart and secure latecomers management system designed to modernize attendance tracking in educational institutions. Our application enables institutions to monitor student punctuality through secure barcode scanning, geofencing-based verification, and real-time data analysis. By identifying latecomers automatically and generating insightful reports, Attendo helps faculty and administrators take timely actions and maintain discipline. With features such as instant notifications, performance dashboards, and reliable analytics, Attendo transforms traditional attendance into a data-driven tool for improving time management and accountability. Our mission is to support schools, colleges, and academic departments in creating a more organized, transparent, and responsible academic environment through the power of technology.</p>
            </div>
          </motion.div>
        </section>

        
        <section ref={contactRef} className="min-h-screen py-32"> 
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl bg-clip-text  font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8 text-center">Contact Us</h2>
            <form className="space-y-6 backdrop-blur-lg bg-white/5 p-8 rounded-2xl">
              <div className="space-y-2">
                <label className="text-white">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full p-3 bg-gray-800/50 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white">Message</label>
                <textarea 
                  placeholder="Your message"
                  rows={5}
                  className="w-full p-3 bg-gray-800/50 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none"
                />
              </div>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </section>

        {/* Footer Section */}
        <footer className="py-8 text-center border-t border-gray-800">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-400"
          >
            © 2025 Attendo. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </div>
  )
}

export default Body