import React from 'react';
import { motion } from 'framer-motion';

// Professional animation variants with elegant timing
export const elegantVariants = {
  // Page entrance with anticipation and follow-through
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
        ease: [0.25, 0.46, 0.45, 0.94], // Professional cubic-bezier
        staggerChildren: 0.15,
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.8,
        ease: [0.55, 0.06, 0.68, 0.19],
      }
    }
  },

  // Gentle floating animation
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

  // Sophisticated scale with anticipation
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

  // Smooth slide with easing
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

  // Professional fade with subtle movement
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

  // Elegant rotation with momentum
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

  // Sophisticated pulse
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

  // Professional shimmer effect
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

  // Elegant bounce with physics
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
  },

  // Smooth morphing
  morph: {
    initial: { borderRadius: "0%" },
    animate: { 
      borderRadius: ["0%", "50%", "0%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },

  // Professional stagger
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },

  // Elegant reveal
  reveal: {
    initial: { 
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
    },
    animate: { 
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Sophisticated glow
  glow: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(247, 181, 0, 0.3)",
        "0 0 40px rgba(247, 181, 0, 0.6)",
        "0 0 20px rgba(247, 181, 0, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },

  // Professional parallax
  parallax: {
    animate: (custom: number) => ({
      y: custom * -50,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    })
  },

  // Elegant magnetic effect
  magnetic: {
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  },

  // Smooth wave
  wave: {
    animate: {
      pathLength: [0, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },

  // Professional typewriter
  typewriter: {
    animate: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  },

  // Elegant particle system
  particle: {
    animate: (i: number) => ({
      y: [0, -100, -200],
      x: [0, Math.sin(i) * 50, Math.sin(i) * 100],
      opacity: [1, 0.5, 0],
      scale: [1, 0.5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeOut",
      }
    })
  },

  // Sophisticated ripple
  ripple: {
    animate: {
      scale: [0, 4],
      opacity: [1, 0],
      transition: {
        duration: 1.5,
        ease: "easeOut",
      }
    }
  },

  // Professional loading
  loading: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }
    }
  },

  // Elegant breathing
  breathe: {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },

  // Smooth elastic
  elastic: {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15,
      }
    }
  },

  // Professional gradient shift
  gradientShift: {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },

  // Elegant text reveal
  textReveal: {
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
  },

  // Sophisticated card flip
  cardFlip: {
    initial: { rotateY: 0 },
    hover: { 
      rotateY: 180,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Professional slide reveal
  slideReveal: {
    initial: { 
      x: "100%",
      skewX: -15,
    },
    animate: { 
      x: "0%",
      skewX: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Elegant zoom
  zoom: {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1,
      }
    }
  },

  // Smooth accordion
  accordion: {
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
        opacity: {
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut",
        }
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        height: {
          duration: 0.6,
          ease: [0.55, 0.06, 0.68, 0.19],
        },
        opacity: {
          duration: 0.4,
          ease: "easeIn",
        }
      }
    }
  },

  // Professional magnetic hover
  magneticHover: {
    hover: (custom: { x: number; y: number }) => ({
      x: custom.x * 0.3,
      y: custom.y * 0.3,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    })
  },

  // Elegant liquid motion
  liquid: {
    animate: {
      borderRadius: [
        "60% 40% 30% 70%",
        "30% 60% 70% 40%",
        "60% 40% 30% 70%"
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },

  // Sophisticated perspective
  perspective: {
    initial: { 
      rotateX: 90, 
      opacity: 0,
      transformPerspective: 1000,
    },
    animate: { 
      rotateX: 0, 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Professional morphing button
  morphButton: {
    initial: { borderRadius: "8px" },
    hover: { 
      borderRadius: "24px",
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      }
    }
  },

  // Elegant text wave
  textWave: {
    animate: (i: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut",
      }
    })
  },

  // Smooth glass morphism
  glassMorph: {
    initial: { 
      backdropFilter: "blur(0px)",
      background: "rgba(255, 255, 255, 0)",
    },
    animate: { 
      backdropFilter: "blur(20px)",
      background: "rgba(255, 255, 255, 0.1)",
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
};

// Professional timing functions
export const elegantTimings = {
  // Apple-inspired easing
  apple: [0.25, 0.46, 0.45, 0.94],
  
  // Material Design easing
  material: [0.4, 0.0, 0.2, 1],
  
  // Custom professional easing
  professional: [0.25, 0.46, 0.45, 0.94],
  
  // Smooth entrance
  entrance: [0.25, 0.46, 0.45, 0.94],
  
  // Elegant exit
  exit: [0.55, 0.06, 0.68, 0.19],
  
  // Bounce with control
  bounce: [0.68, -0.55, 0.265, 1.55],
  
  // Smooth anticipation
  anticipation: [0.175, 0.885, 0.32, 1.275],
};

// Professional spring configurations
export const elegantSprings = {
  // Gentle spring
  gentle: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
  
  // Responsive spring
  responsive: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  
  // Bouncy spring
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 15,
    mass: 1.2,
  },
  
  // Snappy spring
  snappy: {
    type: "spring" as const,
    stiffness: 600,
    damping: 35,
    mass: 0.6,
  },
  
  // Smooth spring
  smooth: {
    type: "spring" as const,
    stiffness: 250,
    damping: 30,
    mass: 1,
  },
};

// Professional gesture components
export const ElegantGesture: React.FC<{
  children: React.ReactNode;
  variant: keyof typeof elegantVariants;
  className?: string;
  custom?: any;
}> = ({ children, variant, className = "", custom }) => {
  const variants = elegantVariants[variant];
  
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      custom={custom}
    >
      {children}
    </motion.div>
  );
};

// Professional floating element
export const FloatingElement: React.FC<{
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

// Professional magnetic button
export const MagneticButton: React.FC<{
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
      transition={elegantSprings.responsive}
    >
      {children}
    </motion.button>
  );
};

// Professional reveal text
export const RevealText: React.FC<{
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
          variants={elegantVariants.textReveal}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Professional particle system
export const ParticleSystem: React.FC<{
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
          variants={elegantVariants.particle}
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

export default {
  elegantVariants,
  elegantTimings,
  elegantSprings,
  ElegantGesture,
  FloatingElement,
  MagneticButton,
  RevealText,
  ParticleSystem,
};