import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Wifi, WifiOff } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-32">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full font-semibold mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              One Tap Attendance. One Click Payroll.
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 dark:text-white">
              One App for <br />
              <span className="text-primary">All Your Workforce Needs</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Empower your business with integrated attendance, task, and payroll management.
            </p>
            
            {/* Highlighted Live Tracking Feature */}
            <motion.div
              className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl border border-primary/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <motion.div
                  className="bg-primary p-2 rounded-full mr-3"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-primary font-semibold text-lg">⭐ Featured: Offline Live Tracking</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Revolutionary technology that works even without internet. Track your workforce anywhere, anytime.
              </p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <WifiOff className="w-3 h-3 mr-1" />
                  <span>Works Offline</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Wifi className="w-3 h-3 mr-1" />
                  <span>Auto Sync</span>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.a 
                href="#pricing" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.a>
              <motion.a 
                href="#demo" 
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <CheckCircle2 size={20} className="text-primary" />
                <span className="text-gray-5000 dark:text-gray-300">Whatsapp reporting</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <CheckCircle2 size={20} className="text-primary" />
                <span className="text-gray-5000 dark:text-gray-300">Offline tracking</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <CheckCircle2 size={20} className="text-primary" />
                <span className="text-gray-5000 dark:text-gray-300">Task Manager</span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl"></div>
              <motion.div 
                className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg"
                  alt="Team using MyHisaab for attendance tracking" 
                  className="w-full h-auto rounded-xl shadow-soft object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <motion.div 
        className="absolute top-1/4 left-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/30 rounded-full filter blur-3xl opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary-200 dark:bg-primary-800/30 rounded-full filter blur-3xl opacity-20"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.25, 0.2] 
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      ></motion.div>
    </section>
  );
};