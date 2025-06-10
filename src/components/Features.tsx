import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  MapPin, 
  Clock, 
  BarChart4, 
  Smartphone, 
  Shield,
  CheckCircle2,
  Zap,
  Wifi,
  WifiOff
} from 'lucide-react';

const features = [
  {
    icon: <Camera className="w-8 h-8 text-primary" />,
    title: 'AI-Powered Selfie Verification',
    description: 'Advanced facial recognition technology ensures accurate employee identity verification.',
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: 'Smart Geo-Fencing',
    description: 'Create virtual boundaries around work locations for automatic attendance tracking.',
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: 'Real-Time Task Management',
    description: 'Assign, track, and monitor tasks with comprehensive progress tracking.',
  },
  {
    icon: <BarChart4 className="w-8 h-8 text-primary" />,
    title: 'Advanced Analytics',
    description: 'Generate detailed reports on attendance patterns and productivity metrics.',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: 'WhatsApp Integration',
    description: 'Receive daily attendance summaries and alerts directly through WhatsApp.',
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption and secure data storage.',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="section dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title dark:text-white">Core Features</h2>
          <p className="section-subtitle dark:text-gray-300">
            Essential tools designed to simplify and streamline your workforce management.
          </p>
        </div>

        {/* Highlighted Live Tracking Feature */}
        <motion.div
          className="mb-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 rounded-3xl p-8 border-2 border-primary/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-primary p-3 rounded-full mr-4"
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
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ⭐ FEATURED
                </span>
              </motion.div>
              
              <motion.h3
                className="text-3xl font-bold mb-4 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Offline Live Tracking
              </motion.h3>
              
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Revolutionary technology that tracks your workforce even without internet connection. 
                Data syncs automatically when connection is restored.
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <WifiOff className="w-5 h-5" />, text: "Works Offline" },
                  { icon: <Wifi className="w-5 h-5" />, text: "Auto Sync" },
                  { icon: <MapPin className="w-5 h-5" />, text: "GPS Tracking" },
                  { icon: <Clock className="w-5 h-5" />, text: "Real-time Updates" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-primary">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Animated Phone Mockup */}
                <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="bg-primary h-8 flex items-center justify-between px-4 text-white text-xs">
                      <span>MyHisaab</span>
                      <div className="flex items-center space-x-1">
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <WifiOff className="w-3 h-3" />
                        </motion.div>
                        <span>Offline</span>
                      </div>
                    </div>
                    
                    {/* Map View */}
                    <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
                      {/* Animated Location Dots */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-4 h-4 bg-primary rounded-full"
                          style={{
                            left: `${30 + i * 25}%`,
                            top: `${40 + i * 15}%`
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5
                          }}
                        />
                      ))}
                      
                      {/* Tracking Path */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <svg className="w-full h-full">
                          <motion.path
                            d="M 50 80 Q 100 40 150 80 Q 200 120 250 80"
                            stroke="#F7B500"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="5,5"
                            animate={{
                              strokeDashoffset: [0, -20]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Employee List */}
                    <div className="p-4 space-y-3">
                      {[
                        { name: "John Doe", status: "Tracked Offline", time: "2 min ago" },
                        { name: "Jane Smith", status: "Location Saved", time: "5 min ago" }
                      ].map((employee, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                          animate={{
                            backgroundColor: ["#f9fafb", "#fef3c7", "#f9fafb"]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 1.5
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs font-medium">{employee.name}</p>
                              <p className="text-xs text-gray-500">{employee.status}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{employee.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-2xl inline-block mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="/features"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Features
          </motion.a>
        </div>
      </div>
    </section>
  );
};