import { SignIn } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import React from 'react'

const signin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 pt-24 sm:pt-32 md:pt-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[500px] mx-auto"
        >
          <SignIn 
            signUpUrl="/signup"
            redirectUrl="/"
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700",
                formFieldLabel: "text-gray-300",
                formFieldInput: "bg-gray-800/50 border-gray-700 text-white",
                footerActionText: "text-gray-400",
                footerActionLink: "text-blue-400 hover:text-blue-300",
                footer: "text-gray-400",
                dividerText: "text-gray-400",
                dividerLine: "bg-gray-700",
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default signin
