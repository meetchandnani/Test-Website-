import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Tag, Sparkles } from 'lucide-react';

interface CouponCodeProps {
  code: string;
  discount: string;
  description?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const CouponCode: React.FC<CouponCodeProps> = ({
  code,
  discount,
  description = "Limited Time Offer",
  width = 300,
  height = 100,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  const [noisePattern, setNoisePattern] = useState<string>('');

  // Generate noise pattern for anti-copy measures
  useEffect(() => {
    const generateNoise = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 30;
          data[i] = noise;     // Red
          data[i + 1] = noise; // Green
          data[i + 2] = noise; // Blue
          data[i + 3] = 8;     // Alpha (very low opacity)
        }
        
        ctx.putImageData(imageData, 0, 0);
        setNoisePattern(canvas.toDataURL());
      }
    };

    generateNoise();
  }, [width, height]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden select-none ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background with gradient and pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary via-primary-400 to-primary-600"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
          `,
        }}
      />

      {/* Noise overlay for anti-copy */}
      {noisePattern && (
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url(${noisePattern})`,
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* Decorative elements */}
      <motion.div
        className="absolute top-2 right-2 text-white/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>

      <motion.div
        className="absolute bottom-2 left-2 text-white/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Tag className="w-3 h-3" />
      </motion.div>

      {/* Distorted border effect */}
      <div className="absolute inset-0 border-2 border-white/30 rounded-lg">
        <div className="absolute inset-0 border border-white/20 rounded-lg transform rotate-1" />
        <div className="absolute inset-0 border border-white/10 rounded-lg transform -rotate-1" />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-between px-4">
        {/* Left side - Discount */}
        <div className="text-white">
          <motion.div
            className="text-2xl font-bold leading-none"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.2)',
              filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))',
              transform: 'skew(-2deg, 1deg)', // Slight distortion
            }}
            animate={{
              textShadow: [
                '2px 2px 4px rgba(0,0,0,0.3)',
                '3px 3px 6px rgba(0,0,0,0.4)',
                '2px 2px 4px rgba(0,0,0,0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {discount}
          </motion.div>
          <div 
            className="text-xs opacity-90 font-medium"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              transform: 'skew(-1deg, 0.5deg)', // Slight distortion
            }}
          >
            {description}
          </div>
        </div>

        {/* Center divider */}
        <div className="h-12 w-px bg-white/40 mx-3 relative">
          <div className="absolute inset-0 bg-white/20 transform rotate-2" />
          <div className="absolute inset-0 bg-white/10 transform -rotate-1" />
        </div>

        {/* Right side - Code */}
        <div className="text-white text-right flex-1">
          <motion.div
            className="text-lg font-bold tracking-wider leading-none cursor-pointer"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.4), 1px 1px 2px rgba(0,0,0,0.3)',
              filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.4))',
              transform: 'skew(1deg, -1deg)', // Slight distortion
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              textShadow: [
                '2px 2px 4px rgba(0,0,0,0.4)',
                '3px 3px 6px rgba(0,0,0,0.5)',
                '2px 2px 4px rgba(0,0,0,0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {code}
          </motion.div>
          
          <motion.div 
            className="text-xs opacity-80 mt-1 flex items-center justify-end"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              transform: 'skew(0.5deg, -0.5deg)', // Slight distortion
            }}
            whileHover={{ scale: 1.1 }}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Click to copy
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated overlay effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
        style={{ transform: 'skewX(-20deg)' }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/40 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/40 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/40 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/40 rounded-br-lg" />
    </motion.div>
  );
};