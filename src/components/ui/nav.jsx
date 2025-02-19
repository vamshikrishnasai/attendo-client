import React, { useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Nav = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                
                <img 
                    onClick={() => navigate("/")} 
                    className="h-20 cursor-pointer" 
                    src="./logo.png" 
                    alt="logo"
                />

               
                <button 
                    onClick={toggleMenu} 
                    className="lg:hidden flex items-center justify-center w-12 h-12 text-3xl rounded-full bg-gray-200"
                >
                    {isOpen ? "✖" : "☰"}
                </button>

                
                <ul className="hidden lg:flex gap-10 items-center">
                    <li 
                        onClick={() => navigate("/scan")} 
                        className="text-blue-700 cursor-pointer text-lg px-5 py-3 hover:text-blue-500"
                    >
                        Scan Barcode
                    </li>

                    <li>
                        <Button 
                            onClick={() => navigate("/attendies")} 
                            className="bg-[#4361EE] px-8 py-3 text-white text-lg rounded-full"
                        >
                            Attendies
                        </Button>
                    </li>
                    <li>
                        <Button 
                            onClick={() => navigate("/signup")} 
                            className="bg-green-500 px-8 py-3 text-white text-lg rounded-full"
                        >
                            Sign Up
                        </Button>
                    </li>
                    <li>
                        <Button 
                            onClick={() => navigate("/signin")} 
                            className="bg-green-500 px-8 py-3 text-white text-lg rounded-full"
                        >
                            Sign In
                        </Button>
                    </li>

                    
                    <UserButton afterSignOutUrl="/signin" />
                </ul>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-md flex flex-col items-center justify-center transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <button 
                    onClick={toggleMenu} 
                    className="absolute top-5 right-5 text-4xl text-gray-600"
                >
                    ✖
                </button>

                <ul className="flex flex-col gap-8 text-xl">
                    <li 
                        onClick={() => { navigate("/scan"); setIsOpen(false); }} 
                        className="text-blue-700 cursor-pointer hover:text-blue-500"
                    >
                        Scan Barcode
                    </li>

                    <li>
                        <Button 
                            onClick={() => { navigate("/attendies"); setIsOpen(false); }} 
                            className="bg-[#4361EE] px-10 py-4 text-white text-lg rounded-full"
                        >
                            Attendies
                        </Button>
                    </li>
                    <li>
                        <Button 
                            onClick={() => { navigate("/signup"); setIsOpen(false); }} 
                            className="bg-green-500 px-10 py-4 text-white text-lg rounded-full"
                        >
                            Sign Up
                        </Button>
                    </li>
                    <li>
                        <Button 
                            onClick={() => { navigate("/signin"); setIsOpen(false); }} 
                            className="bg-green-500 px-10 py-4 text-white text-lg rounded-full"
                        >
                            Sign In
                        </Button>
                    </li>

                    {/* User Button */}
                    <UserButton afterSignOutUrl="/signin" />
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
