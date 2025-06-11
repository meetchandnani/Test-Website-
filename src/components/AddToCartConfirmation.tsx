import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingCart, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AddToCartConfirmationProps {
  isVisible: boolean;
  planName: string;
  price: number;
  employeeCount: number;
  billing: 'monthly' | 'yearly';
  onViewCart: () => void;
  onContinueShopping: () => void;
}

export const AddToCartConfirmation: React.FC<AddToCartConfirmationProps> = ({
  isVisible,
  planName,
  price,
  employeeCount,
  billing,
  onViewCart,
  onContinueShopping
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCart = () => {
    scrollToTop();
    onViewCart();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onContinueShopping();
            }
          }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Success Header - Changed to Yellow Theme */}
            <div className="bg-gradient-to-r from-primary to-primary-600 p-6 text-center">
              <motion.div
                className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Added to Cart!</h2>
              <p className="text-yellow-100">Item successfully added to your cart</p>
            </div>

            {/* Product Details */}
            <div className="p-6">
              {/* Product Image Placeholder */}
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold dark:text-white mb-1">{planName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {employeeCount} employees • {billing === 'yearly' ? 'Annual' : 'Monthly'} billing
                  </p>
                  <p className="text-xl font-bold text-primary">₹{price.toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={handleViewCart}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-5 h-5" />
                  View Cart
                </motion.button>
                
                <motion.button
                  onClick={onContinueShopping}
                  className="w-full btn btn-outline flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Quick Stats - Updated with Yellow Theme */}
              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Free Setup</span>
                  <span className="text-primary font-medium">✓ Included</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600 dark:text-gray-300">24/7 Support</span>
                  <span className="text-primary font-medium">✓ Included</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};