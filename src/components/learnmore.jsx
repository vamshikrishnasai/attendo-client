import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLightbulb, FaRocket, FaCode, FaUsers } from 'react-icons/fa';

const LearnMore = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Our Mission",
            icon: <FaRocket className="text-blue-500" />,
            content: "To revolutionize attendance management in educational institutions through innovative technology, making it effortless, accurate, and insightful."
        },
        {
            title: "Our Vision",
            icon: <FaLightbulb className="text-yellow-500" />,
            content: "To be the leading platform in educational attendance management, helping institutions worldwide maintain better discipline and improve student engagement."
        },
        {
            title: "Development Journey",
            icon: <FaCode className="text-green-500" />,
            content: "Built by a passionate team of developers and educators, Attendo was developed using modern technologies like React, Node.js, and real-time databases. We focused on creating a secure, scalable, and user-friendly system."
        },
        {
            title: "Team & Values",
            icon: <FaUsers className="text-purple-500" />,
            content: "Our diverse team brings together expertise in education, technology, and design. We value innovation, security, and user experience, ensuring every feature serves a purpose."
        }
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            <div className="container mx-auto px-4 py-20">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8"
                >
                    <FaArrowLeft /> <span>Back</span>
                </motion.button>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                    About Attendo
                </motion.h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="text-3xl">{section.icon}</div>
                                <h2 className="text-2xl font-bold">{section.title}</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Join us in transforming attendance management and creating a more efficient educational environment.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LearnMore;
