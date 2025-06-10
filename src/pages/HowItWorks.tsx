import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Camera, 
  Database, 
  LineChart,
  Download,
  Settings,
  Users,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

const steps = [
  {
    icon: <Download className="w-10 h-10 text-white" />,
    title: 'Download & Setup',
    description: 'Download the MyHisaab app and complete the quick setup process with your company details.',
    details: ['Available on Android & iOS', 'Quick 5-minute setup', 'Secure company registration'],
    color: 'bg-blue-500',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: <Settings className="w-10 h-10 text-white" />,
    title: 'Configure Locations',
    description: 'Set up geo-fencing boundaries around your work locations and customize attendance rules.',
    details: ['Multiple location support', 'Customizable radius settings', 'Flexible attendance rules'],
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    icon: <Users className="w-10 h-10 text-white" />,
    title: 'Add Employees',
    description: 'Invite your team members and assign roles with appropriate permissions and access levels.',
    details: ['Bulk employee import', 'Role-based permissions', 'Department organization'],
    color: 'bg-green-500',
    gradient: 'from-green-400 to-green-600',
  },
  {
    icon: <Smartphone className="w-10 h-10 text-white" />,
    title: 'Punch-In & Geo-Fencing',
    description: 'Employees mark attendance by punching in when they arrive at designated locations.',
    details: ['GPS-based verification', 'Automatic location detection', 'Real-time notifications'],
    color: 'bg-primary',
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    icon: <Camera className="w-10 h-10 text-white" />,
    title: 'Selfie Verification',
    description: 'AI-powered facial recognition verifies employee identity for accurate attendance tracking.',
    details: ['99.9% accuracy rate', 'Anti-spoofing protection', 'Instant verification'],
    color: 'bg-primary-600',
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    icon: <Database className="w-10 h-10 text-white" />,
    title: 'Task Management',
    description: 'Assign tasks and track progress in real-time with comprehensive project management.',
    details: ['Real-time task updates', 'Progress tracking', 'Team collaboration'],
    color: 'bg-primary-700',
    gradient: 'from-primary-600 to-primary-800',
  },
  {
    icon: <LineChart className="w-10 h-10 text-white" />,
    title: 'Analytics & Payroll',
    description: 'Generate detailed reports and process payroll automatically based on attendance data.',
    details: ['Automated payroll calculation', 'Custom report generation', 'WhatsApp notifications'],
    color: 'bg-primary-800',
    gradient: 'from-primary-700 to-primary-900',
  },
];

const benefits = [
  'Reduce attendance fraud by 95%',
  'Save 10+ hours per week on payroll',
  'Increase workforce productivity by 30%',
  'Real-time visibility into operations',
];

export const HowItWorks: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full font-semibold mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Simple Process
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white">
              How MyHisaab
              <span className="text-primary block">Works</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get started with MyHisaab in minutes. Our streamlined process makes workforce management effortless and efficient.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Process Animation */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Process Controls */}
            <div className="flex justify-center items-center mb-12 space-x-4">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </motion.button>
              
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>

            {/* Main Process Display */}
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-96 h-96 border-4 border-gray-200 dark:border-gray-700 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Step Indicators Around Circle */}
              <div className="relative w-96 h-96 mx-auto">
                {steps.map((step, index) => {
                  const angle = (index * 360) / steps.length;
                  const isActive = index === currentStep;
                  const isPrevious = index === (currentStep - 1 + steps.length) % steps.length;
                  const isNext = index === (currentStep + 1) % steps.length;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-16 h-16 flex items-center justify-center"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-180px) rotate(-${angle}deg)`,
                      }}
                      animate={{
                        scale: isActive ? 1.3 : isPrevious || isNext ? 1.1 : 1,
                        zIndex: isActive ? 10 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`w-full h-full rounded-full flex items-center justify-center shadow-lg ${
                          isActive ? step.color : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        animate={{
                          boxShadow: isActive 
                            ? '0 0 30px rgba(247, 181, 0, 0.5)' 
                            : '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setCurrentStep(index)}
                      >
                        <motion.div
                          animate={{
                            color: isActive ? '#ffffff' : '#6b7280',
                            scale: isActive ? 1.2 : 1,
                          }}
                        >
                          {React.cloneElement(step.icon, { 
                            className: "w-6 h-6" 
                          })}
                        </motion.div>
                      </motion.div>
                      
                      {/* Step Number */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 border-2 border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary"
                        animate={{
                          scale: isActive ? 1.2 : 1,
                        }}
                      >
                        {index + 1}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    className="text-center max-w-sm bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${steps[currentStep].gradient} flex items-center justify-center`}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      {steps[currentStep].icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-3 dark:text-white">
                      {steps[currentStep].title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {steps[currentStep].description}
                    </p>
                    
                    <div className="space-y-2">
                      {steps[currentStep].details.map((detail, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <CheckCircle2 className="w-3 h-3 text-success mr-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <motion.button
                onClick={prevStep}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300 rotate-180" />
              </motion.button>
              
              <motion.button
                onClick={nextStep}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="mt-12 max-w-md mx-auto">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-600"
                  animate={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Step {currentStep + 1}</span>
                <span>{steps.length} Steps Total</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 dark:text-white">Why Businesses Choose MyHisaab</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of companies that have transformed their workforce management with measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-gray-800 border border-primary/10 dark:border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full inline-block mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-600">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Transform your workforce management today with MyHisaab's powerful and easy-to-use platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/pricing"
                className="btn bg-white text-primary hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.a>
              <motion.a
                href="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};