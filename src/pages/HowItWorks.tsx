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
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000); // Change step every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextStep = () => {
    setIsAutoPlaying(false);
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setIsAutoPlaying(false);
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentStep(index);
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
          <div className="max-w-7xl mx-auto">
            {/* Main Process Display */}
            <div className="relative">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-[500px] h-[500px] border-2 border-primary/20 rounded-full"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <motion.div
                  className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 0.95, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>

              {/* Step Indicators Around Circle */}
              <div className="relative w-[500px] h-[500px] mx-auto">
                {steps.map((step, index) => {
                  const angle = (index * 360) / steps.length;
                  const isActive = index === currentStep;
                  const isPrevious = index === (currentStep - 1 + steps.length) % steps.length;
                  const isNext = index === (currentStep + 1) % steps.length;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-20 h-20 flex items-center justify-center cursor-pointer"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-230px) rotate(-${angle}deg)`,
                      }}
                      animate={{
                        scale: isActive ? 1.4 : isPrevious || isNext ? 1.2 : 1,
                        zIndex: isActive ? 20 : isPrevious || isNext ? 15 : 10,
                      }}
                      transition={{ 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                      onClick={() => goToStep(index)}
                    >
                      <motion.div
                        className={`w-full h-full rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden ${
                          isActive ? step.color : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        animate={{
                          boxShadow: isActive 
                            ? '0 0 40px rgba(247, 181, 0, 0.6), 0 0 80px rgba(247, 181, 0, 0.3)' 
                            : '0 8px 25px rgba(0, 0, 0, 0.15)',
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 0 30px rgba(247, 181, 0, 0.4)'
                        }}
                      >
                        {/* Animated Background Gradient */}
                        {isActive && (
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-90`}
                            animate={{
                              background: [
                                `linear-gradient(45deg, ${step.color}, ${step.color}dd)`,
                                `linear-gradient(135deg, ${step.color}, ${step.color}aa)`,
                                `linear-gradient(225deg, ${step.color}, ${step.color}dd)`,
                                `linear-gradient(315deg, ${step.color}, ${step.color}aa)`,
                                `linear-gradient(45deg, ${step.color}, ${step.color}dd)`,
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        )}
                        
                        <motion.div
                          className="relative z-10"
                          animate={{
                            color: isActive ? '#ffffff' : '#6b7280',
                            scale: isActive ? 1.3 : 1,
                            rotate: isActive ? [0, 360] : 0,
                          }}
                          transition={{
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                          }}
                        >
                          {React.cloneElement(step.icon, { 
                            className: "w-8 h-8" 
                          })}
                        </motion.div>
                        
                        {/* Pulse Effect for Active Step */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-white/30"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 0, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </motion.div>
                      
                      {/* Step Number with Enhanced Animation */}
                      <motion.div
                        className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 border-3 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary shadow-lg"
                        animate={{
                          scale: isActive ? 1.3 : 1,
                          rotate: isActive ? [0, 360] : 0,
                          borderColor: isActive ? '#F7B500' : '#F7B500',
                        }}
                        transition={{
                          rotate: { duration: 3, repeat: Infinity, ease: "linear" }
                        }}
                      >
                        {index + 1}
                      </motion.div>

                      {/* Step Title (appears on hover or when active) */}
                      <AnimatePresence>
                        {(isActive || isPrevious || isNext) && (
                          <motion.div
                            className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 whitespace-nowrap"
                            initial={{ opacity: 0, y: -10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                              {step.title}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Content with Enhanced Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    className="text-center max-w-sm bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.7, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotateY: -90 }}
                    transition={{ 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
                      animate={{
                        background: [
                          'linear-gradient(45deg, rgba(247, 181, 0, 0.05), transparent, rgba(247, 181, 0, 0.1))',
                          'linear-gradient(135deg, rgba(247, 181, 0, 0.1), transparent, rgba(247, 181, 0, 0.05))',
                          'linear-gradient(225deg, rgba(247, 181, 0, 0.05), transparent, rgba(247, 181, 0, 0.1))',
                          'linear-gradient(315deg, rgba(247, 181, 0, 0.1), transparent, rgba(247, 181, 0, 0.05))',
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    <motion.div
                      className={`relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${steps[currentStep].gradient} flex items-center justify-center`}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      {steps[currentStep].icon}
                    </motion.div>
                    
                    <motion.h3 
                      className="text-2xl font-bold mb-4 dark:text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {steps[currentStep].title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {steps[currentStep].description}
                    </motion.p>
                    
                    <div className="space-y-3">
                      {steps[currentStep].details.map((detail, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Enhanced Navigation Arrows */}
              <motion.button
                onClick={prevStep}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 dark:border-gray-700 group"
                whileHover={{ 
                  scale: 1.1, 
                  x: -8,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
              </motion.button>
              
              <motion.button
                onClick={nextStep}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 dark:border-gray-700 group"
                whileHover={{ 
                  scale: 1.1, 
                  x: 8,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
              </motion.button>
            </div>

            {/* Enhanced Progress Indicators */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="flex justify-center space-x-3 mb-6">
                {steps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                      index === currentStep 
                        ? 'w-12 h-4 bg-primary' 
                        : 'w-4 h-4 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index === currentStep && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="text-center">
                <motion.p 
                  className="text-gray-500 dark:text-gray-400 text-sm"
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Step {currentStep + 1} of {steps.length}
                </motion.p>
                
                {/* Auto-play indicator */}
                {isAutoPlaying && (
                  <motion.div
                    className="mt-2 w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </motion.div>
                )}
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