import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLightbulb, FaRocket, FaCode, FaUsers, FaLinkedin, FaGithub } from 'react-icons/fa';

const TeamMemberCard = ({ name, role, department, photo, linkedin, github }) => (
  <motion.div
    whileHover={{ scale: 1.08, y: -12, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.25)" }}
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 180, damping: 18 }}
    className="relative overflow-hidden flex flex-col items-center p-6 rounded-2xl border border-blue-400/20 shadow-xl group bg-gradient-to-br from-[#181825] via-[#1e293b] to-[#0A0A0F]"
  >
    {/* Animated background blobs */}
    <motion.div
      className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl opacity-60 group-hover:scale-110 transition-transform duration-500"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-cyan-500/20 blur-2xl opacity-60 group-hover:scale-110 transition-transform duration-500"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
    />
    {/* Card content */}
    <motion.img
      whileHover={{ scale: 1.13, rotate: 2 }}
      src={photo}
      alt={name}
      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-400/40 shadow-lg z-10"
    />
    <h3 className="text-xl font-bold text-white mb-2 z-10">{name}</h3>
    <p className="text-blue-400 mb-1 z-10">{role}</p>
    <p className="text-gray-300 text-sm mb-4 z-10">{department}</p>
    <div className="flex space-x-4 z-10">
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" 
           className="text-gray-400 hover:text-blue-400 transition-colors">
          <FaLinkedin size={20} />
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-cyan-400 transition-colors">
          <FaGithub size={20} />
        </a>
      )}
    </div>
  </motion.div>
);

const techStack = [
  {
    name: "React",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
  },
  {
    name: "Node.js",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
  },
  {
    name: "Express",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
  },
  {
    name: "MongoDB",
    logo: "https://www.svgrepo.com/show/331488/mongodb.svg"
  },
  {
    name: "Python",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
  },
  {
    name: "Tailwind CSS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
  },
  {
    name: "shadcn/ui",
    logo: "https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico"
  },
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
  }
];

const futureEnhancements = [
  {
    name: "Agentic AI",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7oW68XJ4ALiEinBb8O-Lwqco4npKrqxxU_w&s", // Example AI logo
    description: "Integrate agentic AI for smart attendance insights, anomaly detection, and predictive analytics."
  },
  {
    name: "Biometric",
    logo: "https://flyinglocksmiths.com/wp-content/smush-webp/Biometric-Access-Control-Thumprint-Reader-862x565.jpg.webp", // Example biometric icon
    description: "Enable biometric authentication using advanced machine learning for secure, seamless attendance."
  },
  {
    name: "Facial Recognition",
    logo: "https://miro.medium.com/v2/resize:fit:2000/1*DPNoWJ3Au35Fw58Sn2oj1w.png", // Example facial recognition icon
    description: "Integrate facial recognition for automated and contactless attendance marking."
  }
];

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

    const teamMembers = [
        {
            name: "R.Vamshi Krishna Sai",
            role: "Team Lead & Full stack Developer",
            department: "Information Technology",
            photo: "/vamshi_img.png",
            linkedin: "https://www.linkedin.com/in/vamshi-krishna-sai-ryagalla-71987a290/",
            github: "https://github.com/vamshikrishnasai"
        },
        {
            name: "A.Varun Reddy",
            role: "Hardware",
            department: "Information Technology",
            photo: "/varun_img.png",
            linkedin: "https://www.linkedin.com/in/anugula-sai-varun-r-9ab0b8292/",
            github: "https://github.com/student2"
        },
        {
            name: "Pilligundla Gokul",
            role: "UI/UX Designer",
            department: "Information Technology",
            photo: "/gokul_img.png",
            linkedin: "https://www.linkedin.com/in/gokul-pilligundla/",
            github: "https://github.com/gikki511"
        },
        {
            name: "Kolanu Keerthana",
            role: "Design & Marketing",
            department: "Information Technology",
            photo: "/keerthana_img1.png",
            linkedin: "https://www.linkedin.com/in/kolanu-keerthana-242898358/",
            github: "https://github.com/student4"
        },
    ];

    const advisor = {
        name: "Eswar Babu Banala",
        role: "Faculty Advisor",
        department: "Information Technology",
        photo: "/eswar_sir_img.png",
        linkedin: "https://www.linkedin.com/in/eswar-babu-banala/"
        
    };

    return (
        <div className="min-h-screen relative text-white overflow-hidden bg-[#0A0A0F]">
            {/* Animated background gradients and blobs */}
            <div className="absolute inset-0 -z-10">
                {/* Blueish animated gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#181825] to-[#1e293b] opacity-100"></div>
                {/* Animated blue blob */}
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-700/30 blur-3xl"
                    animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                />
                {/* Animated cyan blob */}
                <motion.div
                    className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/30 blur-3xl"
                    animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
                />
                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
            </div>
            <div className="container mx-auto px-2 sm:px-4 py-10 sm:py-20">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 mb-8"
                >
                    <FaArrowLeft /> <span>Back</span>
                </motion.button>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-20"
                >
                    <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Our Team
                    </h2>
                    <div className="flex justify-center mb-12">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7, type: "spring" }}
                            className="h-1 w-32 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"
                        />
                    </div>
                    {/* Faculty Advisor */}
                    <div className="mb-16">
                        <div className="flex justify-center">
                            <TeamMemberCard {...advisor} />
                        </div>
                    </div>
                    {/* Team Members */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} {...member} />
                        ))}
                    </div>
                </motion.div>

                {/* About/Mission Section */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 bg-clip-text text-transparent"
                >
                    About Attendo
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="backdrop-blur-lg bg-gradient-to-br from-[#181825] via-[#1a1024] to-[#0A0A0F] p-8 rounded-2xl border border-pink-400/20"
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

                {/* Tech Stack Section */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-20 mb-12"
                >
                  <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8">
                    {techStack.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex flex-col items-center bg-gradient-to-br from-[#181825] via-[#1e293b] to-[#0A0A0F] rounded-xl p-4 shadow-lg border border-blue-400/10 min-w-[120px] max-w-[140px] transition-transform hover:scale-105"
                      >
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="h-14 w-14 object-contain mb-3"
                          loading="lazy"
                        />
                        <span className="text-base font-semibold text-blue-200 text-center">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Future Enhancements Section */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-20 mb-12"
                >
                  <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Future Enhancements
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8">
                    {futureEnhancements.map((item) => (
                      <div
                        key={item.name}
                        className="flex flex-col items-center bg-gradient-to-br from-[#181825] via-[#1e293b] to-[#0A0A0F] rounded-xl p-4 shadow-lg border border-cyan-400/10 min-w-[180px] max-w-[220px] transition-transform hover:scale-105"
                      >
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="h-14 w-14 object-contain mb-3"
                          loading="lazy"
                        />
                        <span className="text-base font-semibold text-cyan-200 text-center mb-2">{item.name}</span>
                        <span className="text-xs text-gray-300 text-center">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

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
