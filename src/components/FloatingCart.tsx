import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export const FloatingCart: React.FC = () => {
  const { cart, getTotalItems, getTotalPrice } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // Show cart when items are added and hide when empty
  useEffect(() => {
    if (getTotalItems() > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsExpanded(false);
    }
  }, [getTotalItems()]);

  // Auto-collapse after 5 seconds
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const handleCartClick = () => {
    if (isExpanded) {
      navigate('/cart');
    } else {
      setIsExpanded(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* Collapsed Cart Button */
          <motion.button
            key="collapsed"
            onClick={handleCartClick}
            className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl border-2 border-primary hover:border-primary-600 transition-all group"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 20px 40px rgba(247, 181, 0, 0.3)'
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {/* Custom Cart Icon */}
            <div className="relative">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-primary group-hover:text-primary-600 transition-colors"
              >
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              
              {/* Item Count Badge */}
              <motion.span
                className="absolute -top-3 -right-3 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                key={getTotalItems()}
              >
                {getTotalItems()}
              </motion.span>
            </div>
            
            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
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
          </motion.button>
        ) : (
          /* Expanded Cart Preview */
          <motion.div
            key="expanded"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-80 max-h-96 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg dark:text-white">Cart Summary</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
              {cart.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-600 rounded-lg flex items-center justify-center mr-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm dark:text-white">{item.planName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.employeeCount} employees
                    </p>
                  </div>
                  <p className="font-bold text-primary text-sm">
                    ₹{item.finalPrice.toLocaleString()}
                  </p>
                </motion.div>
              ))}
              
              {cart.length > 3 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  +{cart.length - 3} more items
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold dark:text-white">Total:</span>
                <span className="text-xl font-bold text-primary">
                  ₹{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <motion.button
                onClick={() => {
                  navigate('/cart');
                  scrollToTop();
                }}
                className="w-full btn btn-primary text-sm py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Cart
              </motion.button>
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="w-full btn btn-outline text-sm py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};