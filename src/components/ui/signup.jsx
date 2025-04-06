import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

const signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 pt-24 sm:pt-32 md:pt-36 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 max-w-[440px] mx-auto"
        >
          <SignUp 
            signInUrl="signin"
            redirectUrl=""
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

export default signup
