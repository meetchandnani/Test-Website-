import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';

interface AddToCartAnimationProps {
  isVisible: boolean;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  onComplete: () => void;
  productName: string;
}

export const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({
  isVisible,
  startPosition,
  endPosition,
  onComplete,
  productName
}) => {
  const [animationStage, setAnimationStage] = useState<'flying' | 'complete'>('flying');

  useEffect(() => {
    if (isVisible) {
      setAnimationStage('flying');
      // Complete animation after duration
      const timer = setTimeout(() => {
        setAnimationStage('complete');
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  // Calculate the curved path control points
  const midX = (startPosition.x + endPosition.x) / 2;
  const midY = Math.min(startPosition.y, endPosition.y) - 100; // Arc upward

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Animated Product Icon */}
          <motion.div
            className="fixed pointer-events-none z-[9999]"
            initial={{
              x: startPosition.x,
              y: startPosition.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: endPosition.x,
              y: endPosition.y,
              scale: [1, 1.2, 0.8, 0.3],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
              times: [0, 0.3, 0.7, 1],
            }}
            style={{
              transformOrigin: 'center',
            }}
          >
            <div className="relative">
              {/* Main product icon */}
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-2xl"
                animate={{
                  rotate: [0, 360, 720],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                <Package className="w-6 h-6 text-white" />
              </motion.div>

              {/* Trailing particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0.8,
                  }}
                  animate={{
                    x: -20 - (i * 10),
                    y: Math.sin(i) * 10,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary rounded-xl"
                animate={{
                  scale: [1, 2, 3],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>

          {/* Success burst at destination */}
          <motion.div
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: endPosition.x,
              top: endPosition.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: animationStage === 'complete' ? [0, 1, 0] : 0,
              scale: animationStage === 'complete' ? [0, 1.5, 2] : 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <div className="relative">
              {/* Success ring */}
              <div className="w-16 h-16 border-4 border-green-500 rounded-full animate-ping" />
              
              {/* Success particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-green-500 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: Math.cos((i * 60) * Math.PI / 180) * 30,
                    y: Math.sin((i * 60) * Math.PI / 180) * 30,
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Floating success message */}
          <motion.div
            className="fixed pointer-events-none z-[9997] bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            style={{
              left: endPosition.x,
              top: endPosition.y + 40,
              transform: 'translateX(-50%)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ 
              opacity: animationStage === 'complete' ? [0, 1, 1, 0] : 0,
              y: animationStage === 'complete' ? [20, 0, -10, -30] : 20,
              scale: animationStage === 'complete' ? [0.8, 1, 1, 0.8] : 0.8,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            ✓ Added to Cart!
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};