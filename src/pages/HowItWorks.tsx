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
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

const steps = [
  {
    icon: <Download className="w-8 h-8 text-white" />,
    title: 'Download & Setup',
    description: 'Download the MyHisaab app and complete the quick setup process with your company details.',
    details: ['Available on Android & iOS', 'Quick 5-minute setup', 'Secure company registration'],
    color: 'bg-blue-500',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: <Settings className="w-8 h-8 text-white" />,
    title: 'Configure Locations',
    description: 'Set up geo-fencing boundaries around your work locations and customize attendance rules.',
    details: ['Multiple location support', 'Customizable radius settings', 'Flexible attendance rules'],
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: 'Add Employees',
    description: 'Invite your team members and assign roles with appropriate permissions and access levels.',
    details: ['Bulk employee import', 'Role-based permissions', 'Department organization'],
    color: 'bg-green-500',
    gradient: 'from-green-400 to-green-600',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-white" />,
    title: 'Punch-In & Geo-Fencing',
    description: 'Employees mark attendance by punching in when they arrive at designated locations.',
    details: ['GPS-based verification', 'Automatic location detection', 'Real-time notifications'],
    color: 'bg-primary',
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    icon: <Camera className="w-8 h-8 text-white" />,
    title: 'Selfie Verification',
    description: 'AI-powered facial recognition verifies employee identity for accurate attendance tracking.',
    details: ['99.9% accuracy rate', 'Anti-spoofing protection', 'Instant verification'],
    color: 'bg-primary-600',
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    icon: <Database className="w-8 h-8 text-white" />,
    title: 'Task Management',
    description: 'Assign tasks and track progress in real-time with comprehensive project management.',
    details: ['Real-time task updates', 'Progress tracking', 'Team collaboration'],
    color: 'bg-primary-700',
    gradient: 'from-primary-600 to-primary-800',
  },
  {
    icon: <LineChart className="w-8 h-8 text-white" />,
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
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

      {/* Clean Step-by-Step Process */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Step Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-soft">
                <motion.button
                  onClick={prevStep}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep 
                          ? 'bg-primary w-8' 
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextStep}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2" />

                <motion.button
                  onClick={toggleAutoPlay}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isAutoPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Current Step Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Step Content */}
                <div className="order-2 lg:order-1">
                  <div className="flex items-center mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${steps[currentStep].gradient} flex items-center justify-center mr-4`}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {steps[currentStep].icon}
                    </motion.div>
                    <div>
                      <span className="text-primary font-semibold text-sm">
                        Step {currentStep + 1} of {steps.length}
                      </span>
                      <h3 className="text-3xl font-bold dark:text-white">
                        {steps[currentStep].title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {steps[currentStep].description}
                  </p>
                  
                  <div className="space-y-4">
                    {steps[currentStep].details.map((detail, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Step Visualization */}
                <div className="order-1 lg:order-2">
                  <motion.div
                    className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-soft-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Phone Mockup */}
                    <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                      <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                        {/* Status Bar */}
                        <div className="bg-primary h-8 flex items-center justify-between px-4 text-white text-xs">
                          <span>MyHisaab</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-2 bg-white rounded-sm opacity-80" />
                            <span>100%</span>
                          </div>
                        </div>
                        
                        {/* Dynamic Content Based on Step */}
                        <div className="p-4 h-full bg-gradient-to-br from-gray-50 to-white">
                          {currentStep === 0 && (
                            <div className="text-center py-8">
                              <motion.div
                                className="w-20 h-20 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              >
                                <Download className="w-10 h-10 text-white" />
                              </motion.div>
                              <h4 className="font-bold text-lg mb-2">Welcome to MyHisaab</h4>
                              <p className="text-sm text-gray-600 mb-4">Setting up your account...</p>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div
                                  className="bg-primary h-2 rounded-full"
                                  animate={{ width: ['0%', '100%'] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                            </div>
                          )}

                          {currentStep === 1 && (
                            <div>
                              <h4 className="font-bold mb-4">Location Setup</h4>
                              <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 relative overflow-hidden">
                                <motion.div
                                  className="absolute w-6 h-6 bg-primary rounded-full"
                                  style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                                  animate={{
                                    scale: [1, 2, 1],
                                    opacity: [1, 0.3, 1]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Office Location</span>
                                  <span className="text-green-600">✓ Set</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Radius: 100m</span>
                                  <span className="text-primary">Active</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div>
                              <h4 className="font-bold mb-4">Team Members</h4>
                              <div className="space-y-3">
                                {['John Doe', 'Jane Smith', 'Mike Johnson'].map((name, i) => (
                                  <motion.div
                                    key={name}
                                    className="flex items-center p-2 bg-gray-50 rounded-lg"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                  >
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                                      <span className="text-white text-xs font-bold">
                                        {name.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{name}</p>
                                      <p className="text-xs text-gray-500">Employee</p>
                                    </div>
                                    <span className="text-green-600 text-xs">✓</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div>
                              <h4 className="font-bold mb-4">Punch In</h4>
                              <div className="text-center py-4">
                                <motion.div
                                  className="w-24 h-24 bg-gradient-to-r from-primary to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center cursor-pointer"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  animate={{
                                    boxShadow: [
                                      '0 0 0 0 rgba(247, 181, 0, 0.4)',
                                      '0 0 0 20px rgba(247, 181, 0, 0)',
                                    ]
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <Smartphone className="w-8 h-8 text-white" />
                                </motion.div>
                                <p className="text-sm font-medium">Tap to Punch In</p>
                                <p className="text-xs text-gray-500 mt-1">Location verified ✓</p>
                              </div>
                            </div>
                          )}

                          {currentStep === 4 && (
                            <div>
                              <h4 className="font-bold mb-4">Selfie Verification</h4>
                              <div className="text-center">
                                <motion.div
                                  className="w-32 h-32 bg-gray-200 rounded-2xl mx-auto mb-4 relative overflow-hidden"
                                  animate={{
                                    borderColor: ['#e5e7eb', '#F7B500', '#e5e7eb'],
                                    borderWidth: ['2px', '4px', '2px']
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Camera className="w-8 h-8 text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                  <motion.div
                                    className="absolute inset-0 border-2 border-primary rounded-2xl"
                                    animate={{
                                      scale: [1, 1.1, 1],
                                      opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  />
                                </motion.div>
                                <p className="text-sm font-medium text-green-600">Verification Successful!</p>
                              </div>
                            </div>
                          )}

                          {currentStep === 5 && (
                            <div>
                              <h4 className="font-bold mb-4">Task Management</h4>
                              <div className="space-y-2">
                                {[
                                  { task: 'Client Meeting', status: 'In Progress', progress: 60 },
                                  { task: 'Report Review', status: 'Completed', progress: 100 },
                                  { task: 'Site Visit', status: 'Pending', progress: 0 }
                                ].map((item, i) => (
                                  <div key={i} className="p-2 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="font-medium">{item.task}</span>
                                      <span className={`text-xs ${
                                        item.status === 'Completed' ? 'text-green-600' :
                                        item.status === 'In Progress' ? 'text-primary' : 'text-gray-500'
                                      }`}>
                                        {item.status}
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1">
                                      <motion.div
                                        className="bg-primary h-1 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progress}%` }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {currentStep === 6 && (
                            <div>
                              <h4 className="font-bold mb-4">Analytics & Reports</h4>
                              <div className="space-y-3">
                                <div className="bg-primary-50 p-3 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Attendance Rate</span>
                                    <span className="text-primary font-bold">95%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <motion.div
                                      className="bg-primary h-2 rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: '95%' }}
                                      transition={{ duration: 1.5 }}
                                    />
                                  </div>
                                </div>
                                <div className="text-center">
                                  <LineChart className="w-8 h-8 text-primary mx-auto mb-2" />
                                  <p className="text-xs text-gray-600">Payroll auto-generated</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Auto-play Progress Bar */}
            {isAutoPlaying && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    key={currentStep}
                  />
                </div>
              </div>
            )}
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