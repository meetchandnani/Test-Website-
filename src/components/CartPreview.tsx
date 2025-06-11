import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartPreviewProps {
  isVisible: boolean;
  onClose: () => void;
}

export const CartPreview: React.FC<CartPreviewProps> = ({ isVisible, onClose }) => {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Cart Preview */}
          <motion.div
            className="fixed top-20 right-4 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <ShoppingCart className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold dark:text-white">Cart ({cart.length})</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="max-h-80 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {/* Product Thumbnail */}
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm dark:text-white truncate">
                          {item.planName}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.employeeCount} employees
                        </p>
                        <p className="text-sm font-bold text-primary">
                          ₹{item.finalPrice.toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold dark:text-white">Total:</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{getTotalPrice().toLocaleString()}
                  </span>
                </div>
                
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};