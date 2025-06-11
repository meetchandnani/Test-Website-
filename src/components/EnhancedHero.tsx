import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CheckCircle2, Zap, Wifi, WifiOff, ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GetStartedModal } from './GetStartedModal';

// Professional animation variants
const elegantVariants = {
  pageEnter: {
    initial: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
      }
    }
  },
  elegantScale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1,
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      }
    }
  },
  fadeInUp: {
    initial: { 
      opacity: 0, 
      y: 40,
      filter: "blur(4px)",
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  slideIn: {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },
  rotate: {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }
    }
  },
  shimmer: {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }
    }
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },
  float: {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }
    }
  },
  bounce: {
    animate: {
      y: [0, -20, 0],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        repeat: Infinity,
        repeatDelay: 2,
      }
    }
  }
};

// Floating Element Component
const FloatingElement: React.FC<{
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
  className?: string;
}> = ({ children, intensity = 1, duration = 6, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-8 * intensity, 8 * intensity, -8 * intensity],
        rotate: [-2 * intensity, 2 * intensity, -2 * intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setMousePosition({
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    });
  };

  return (
    <motion.button
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      animate={{
        x: isHovered ? mousePosition.x * 0.1 : 0,
        y: isHovered ? mousePosition.y * 0.1 : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.button>
  );
};

// Reveal Text Component
const RevealText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          }
        }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          variants={{
            initial: { 
              y: 100,
              opacity: 0,
              skewY: 7,
            },
            animate: { 
              y: 0,
              opacity: 1,
              skewY: 0,
              transition: {
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Particle System Component
const ParticleSystem: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 6, className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(i) * 50, Math.sin(i) * 100],
            opacity: [1, 0.5, 0],
            scale: [1, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export const EnhancedHero: React.FC = () => {
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Smooth parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  
  // Spring animations for smooth interactions
  const springConfig = { stiffness: 300, damping: 30, mass: 0.8 };
  const x = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = (e.clientX - centerX) / rect.width;
      const mouseY = (e.clientY - centerY) / rect.height;
      
      setMousePosition({ x: mouseX, y: mouseY });
      
      // Subtle 3D rotation based on mouse position
      rotateX.set(mouseY * -10);
      rotateY.set(mouseX * 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rotateX, rotateY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStartedClick = () => {
    setShowGetStartedModal(true);
  };

  return (
    <>
      <motion.section 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-32 min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          <FloatingElement intensity={0.5} duration={8} className="absolute top-20 left-10">
            <div className="w-32 h-32 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-xl" />
          </FloatingElement>
          
          <FloatingElement intensity={0.8} duration={12} className="absolute top-40 right-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-full blur-xl" />
          </FloatingElement>
          
          <FloatingElement intensity={0.3} duration={10} className="absolute bottom-20 left-1/4">
            <div className="w-40 h-40 bg-gradient-to-r from-green-500/10 to-primary/10 rounded-full blur-xl" />
          </FloatingElement>

          {/* Particle system */}
          <ParticleSystem count={8} />
          
          {/* Animated grid */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(247, 181, 0, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(247, 181, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <motion.div 
              className="lg:w-1/2"
              style={{ y }}
              variants={elegantVariants.pageEnter}
              initial="initial"
              animate="animate"
            >
              {/* Animated Badge */}
              <motion.div
                className="inline-block mb-8"
                variants={elegantVariants.elegantScale}
                whileHover="hover"
              >
                <motion.span 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 text-primary-700 dark:text-primary-300 rounded-full font-semibold text-sm border border-primary/20 backdrop-blur-sm"
                  variants={elegantVariants.shimmer}
                  animate="animate"
                  style={{
                    background: "linear-gradient(90deg, rgba(247, 181, 0, 0.1) 0%, rgba(247, 181, 0, 0.2) 50%, rgba(247, 181, 0, 0.1) 100%)",
                    backgroundSize: "200% 100%",
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  One Tap Attendance. One Click Payroll.
                </motion.span>
              </motion.div>

              {/* Main Heading with Reveal Animation */}
              <div className="mb-6">
                <RevealText
                  text="One App for"
                  className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight dark:text-white"
                />
                <RevealText
                  text="All Your Workforce Needs"
                  className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-primary"
                  delay={0.3}
                />
              </div>

              {/* Subtitle with Elegant Fade */}
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed"
                variants={elegantVariants.fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.6 }}
              >
                Empower your business with integrated attendance, task, and payroll management 
                powered by cutting-edge AI technology.
              </motion.p>
              
              {/* Featured Technology Highlight */}
              <motion.div
                className="mb-8 p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-3xl border border-primary/20 backdrop-blur-sm"
                variants={elegantVariants.elegantScale}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-primary-600 p-3 rounded-2xl mr-4"
                    variants={elegantVariants.rotate}
                    animate="animate"
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <span className="text-primary font-bold text-lg">⭐ Revolutionary Feature</span>
                    <h3 className="text-xl font-bold dark:text-white">Offline Live Tracking</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Industry-first technology that tracks your workforce even without internet connection. 
                  Data syncs automatically when connection is restored.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <WifiOff className="w-4 h-4" />, text: "Works Offline" },
                    { icon: <Wifi className="w-4 h-4" />, text: "Auto Sync" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl backdrop-blur-sm"
                      variants={elegantVariants.slideIn}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 1 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <div className="text-primary">
                        {item.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* CTA Buttons with Magnetic Effect */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-10"
                variants={elegantVariants.stagger}
                initial="initial"
                animate="animate"
                transition={{ delay: 1.2 }}
              >
                <MagneticButton
                  onClick={handleGetStartedClick}
                  className="btn btn-primary group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Free Trial
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </MagneticButton>

                <MagneticButton className="btn btn-outline group">
                  <Link 
                    to="/contact" 
                    className="flex items-center"
                    onClick={scrollToTop}
                  >
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Schedule Demo
                  </Link>
                </MagneticButton>
              </motion.div>
              
              {/* Feature Highlights */}
              <motion.div 
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                variants={elegantVariants.stagger}
                initial="initial"
                animate="animate"
                transition={{ delay: 1.4 }}
              >
                {[
                  "WhatsApp reporting",
                  "Offline tracking", 
                  "Task Manager"
                ].map((feature, index) => (
                  <motion.div 
                    key={feature}
                    className="flex items-center gap-3 group"
                    variants={elegantVariants.slideIn}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      variants={elegantVariants.pulse}
                      animate="animate"
                    >
                      <CheckCircle2 size={20} className="text-primary" />
                    </motion.div>
                    <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right Content - Enhanced Image */}
            <motion.div 
              className="lg:w-1/2"
              style={{ 
                y: useTransform(scrollYProgress, [0, 1], [0, -50]),
                rotateX,
                rotateY,
              }}
              variants={elegantVariants.elegantScale}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                {/* Animated background glow */}
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"
                  variants={elegantVariants.pulse}
                  animate="animate"
                />
                
                {/* Main image container */}
                <motion.div 
                  className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: mousePosition.x * 5,
                    rotateX: mousePosition.y * -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                >
                  {/* Floating elements around image */}
                  <FloatingElement intensity={0.5} duration={4} className="absolute -top-4 -right-4 z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </FloatingElement>
                  
                  <FloatingElement intensity={0.8} duration={6} className="absolute -bottom-4 -left-4 z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  </FloatingElement>

                  {/* Main image with parallax */}
                  <motion.img 
                    src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg"
                    alt="Team using MyHisaab for attendance tracking" 
                    className="w-full h-auto rounded-2xl shadow-xl object-cover"
                    style={{
                      transform: `translateZ(50px)`,
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  
                  {/* Overlay gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-1/4 -left-8 w-16 h-16 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl"
                  variants={elegantVariants.float}
                  animate="animate"
                />
                
                <motion.div
                  className="absolute bottom-1/4 -right-8 w-20 h-20 bg-gradient-to-l from-blue-500/20 to-transparent rounded-full blur-xl"
                  variants={elegantVariants.float}
                  animate="animate"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={elegantVariants.bounce}
          animate="animate"
        >
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Get Started Modal */}
      <GetStartedModal 
        isOpen={showGetStartedModal} 
        onClose={() => setShowGetStartedModal(false)} 
      />
    </>
  );
};