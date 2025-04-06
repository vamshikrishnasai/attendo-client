import { useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Nav = ({ scrollToSection, aboutRef, contactRef }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { isSignedIn } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = (ref) => {
        scrollToSection(ref);
        setIsOpen(false); // Close mobile menu if open
    };

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 text-white shadow-lg fixed w-full z-50"
        >
            <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/")} 
                    className="h-20 cursor-pointer" 
                    src="/logo.png" 
                    alt="logo"
                />

                <button 
                    onClick={toggleMenu} 
                    className="lg:hidden flex items-center justify-center w-12 h-12 text-3xl rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                    {isOpen ? "✖" : "☰"}
                </button>

                <ul className="hidden lg:flex gap-10 items-center">
                    <motion.li 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate("/scan")} 
                        className="text-blue-400 cursor-pointer text-lg hover:text-blue-300 transition-colors"
                    >
                        Scan Barcode
                    </motion.li>

                    <motion.li whileHover={{ scale: 1.05 }}>
                        <Button
                            onClick={() => handleScroll(aboutRef)}
                            className="border border-[#4361EE] text-[#4361EE] px-9 py-6 text-lg rounded-md bg-gray-800 hover:bg-[#4361EE] hover:text-white transition-all duration-300"
                        >
                            About Us
                        </Button>
                    </motion.li>

                    <motion.li whileHover={{ scale: 1.05 }}>
                        <Button
                            onClick={() => handleScroll(contactRef)}
                            className="border border-[#4361EE] text-[#4361EE] px-9 py-6 text-lg rounded-md bg-gray-800 hover:bg-[#4361EE] hover:text-white transition-all duration-300"
                        >
                            Contact
                        </Button>
                    </motion.li>

                    <motion.li whileHover={{ scale: 1.05 }}>
                        <Button
                            onClick={() => navigate("/attendies")}
                            className="border border-[#4361EE] text-[#4361EE] px-9 py-6 text-lg rounded-md bg-gray-800 hover:bg-[#4361EE] hover:text-white transition-all duration-300"
                        >
                            Attendies
                        </Button>
                    </motion.li>

                    {isSignedIn ? (
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <UserButton afterSignOutUrl="/signin" />
                        </motion.div>
                    ) : (
                        <motion.li whileHover={{ scale: 1.05 }}>
                            <Button
                                onClick={() => navigate("/signin")}
                                className="border border-[#4361EE] text-[#4361EE] px-9 py-6 text-lg rounded-md bg-gray-800 hover:bg-[#4361EE] hover:text-white transition-all duration-300"
                            >
                                Sign In
                            </Button>
                        </motion.li>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? 0 : "-100%" }}
                transition={{ type: "tween" }}
                className="lg:hidden fixed top-0 left-0 w-full h-screen bg-gray-900 shadow-lg flex flex-col items-center justify-center"
            >
                <button 
                    onClick={toggleMenu} 
                    className="absolute top-5 right-5 text-4xl text-gray-400 hover:text-white transition-colors"
                >
                    ✖
                </button>

                <ul className="flex flex-col gap-8 text-xl">
                    <motion.li 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => { navigate("/scan"); setIsOpen(false); }}
                        className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
                    >
                        Scan Barcode
                    </motion.li>

                    <motion.li 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleScroll(aboutRef)}
                        className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
                    >
                        About Us
                    </motion.li>

                    <motion.li 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleScroll(contactRef)}
                        className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
                    >
                        Contact
                    </motion.li>

                    <motion.li whileHover={{ scale: 1.05 }}>
                        <Button 
                            onClick={() => { navigate("/attendies"); setIsOpen(false); }}
                            className="bg-[#4361EE] px-10 py-4 text-white text-lg rounded-full hover:bg-[#3251DD] transition-colors"
                        >
                            Attendies
                        </Button>
                    </motion.li>

                    {!isSignedIn && (
                        <motion.li whileHover={{ scale: 1.05 }}>
                            <Button 
                                onClick={() => { navigate("/signin"); setIsOpen(false); }}
                                className="bg-blue-600 px-10 py-4 text-white text-lg rounded-full hover:bg-blue-700 transition-colors"
                            >
                                Sign In
                            </Button>
                        </motion.li>
                    )}

                    {isSignedIn && (
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <UserButton afterSignOutUrl="/signin" />
                        </motion.div>
                    )}
                </ul>
            </motion.div>
        </motion.nav>
    );
};

export default Nav;