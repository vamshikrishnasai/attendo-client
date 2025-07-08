import { useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { 
    FaQrcode, 
    FaInfoCircle, 
    FaHeadset, 
    FaChartPie, 
    FaSignInAlt, 
    FaBars, 
    FaTimes,
    FaUserGraduate,
    FaCalendarCheck
} from 'react-icons/fa';

const Nav = ({ scrollToSection, aboutRef, contactRef }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { isSignedIn } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = (ref) => {
        scrollToSection(ref);
        setIsOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0A0A0F]/90 backdrop-blur-lg border-b border-blue-900/20 text-white shadow-lg fixed w-full z-30"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-[#111827]/50 to-blue-900/10"></div>
                    <div className="flex justify-between items-center p-6 max-w-7xl mx-auto relative z-10">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate("/")}
                            className="h-20 cursor-pointer"
                            src="/logo.png"
                            alt="logo"
                        />

                        <button
                            onClick={toggleMenu}
                            className="flex items-center justify-center w-12 h-12 text-3xl rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        >
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Sidebar */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? 0 : "-100%" }}
                transition={{ type: "tween" }}
                className="fixed top-0 left-0 w-64 h-full bg-[#0A0A0F]/90 backdrop-blur-lg border-r border-blue-900/20 shadow-lg z-40 overflow-hidden"
            >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-[#111827]/50 to-blue-900/10"></div>
                
                {/* Content container */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate("/")}
                            className="h-20 cursor-pointer mx-auto mb-8"
                            src="/logo.png"
                            alt="logo"
                        />

                        <ul className="space-y-6">
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                onClick={() => { navigate("/scan"); setIsOpen(false); }}
                                className="text-blue-400 cursor-pointer text-lg hover:text-blue-300 transition-colors flex items-center p-3 bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20 rounded-lg group"
                            >
                                <FaQrcode className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                                <span>Scan Attendance</span>
                            </motion.li>

                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                onClick={() => { navigate("/attendies"); setIsOpen(false); }}
                                className="text-blue-400 cursor-pointer text-lg hover:text-blue-300 transition-colors flex items-center p-3 bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20 rounded-lg group"
                            >
                                <FaUserGraduate className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                                <span>Students</span>
                            </motion.li>

                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                onClick={() => { handleScroll(aboutRef); setIsOpen(false); }}
                                className="text-blue-400 cursor-pointer text-lg hover:text-blue-300 transition-colors flex items-center p-3 bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20 rounded-lg group"
                            >
                                <FaInfoCircle className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                                <span>About Us</span>
                            </motion.li>

                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                onClick={() => { handleScroll(contactRef); setIsOpen(false); }}
                                className="text-blue-400 cursor-pointer text-lg hover:text-blue-300 transition-colors flex items-center p-3 bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20 rounded-lg group"
                            >
                                <FaHeadset className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                                <span>Contact Us</span>
                            </motion.li>

                            <motion.li whileHover={{ scale: 1.05 }}>
                                <Button
                                    onClick={() => { navigate("/analytics"); setIsOpen(false); }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white text-lg rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center group"
                                >
                                    <FaChartPie className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                                    <span>Analytics</span>
                                </Button>
                            </motion.li>
                        </ul>
                    </div>

                    {/* Signin section */}
                    <div className="border-t border-blue-900/20 pt-6">
                        {!isSignedIn ? (
                            <Button
                                onClick={() => { navigate("/signin"); setIsOpen(false); }}
                                className="w-full border border-blue-500/50 text-blue-400 py-3 rounded-md bg-[#111827]/30 hover:bg-blue-600/20 hover:text-blue-300 flex items-center justify-center transition-all"
                            >
                                <FaSignInAlt className="mr-3" /> Sign In
                            </Button>
                        ) : (
                            <div className="flex justify-center">
                                <UserButton afterSignOutUrl="/signin" />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Nav;
