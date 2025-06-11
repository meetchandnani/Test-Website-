import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Wallet,
  ArrowLeft,
  Tag,
  Percent,
  X
} from 'lucide-react';
import { useCart } from '../components/CartContext';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const coupons = {
  'HISAAB20': { discount: 20, description: '20% off' },
  'HISAAB10': { discount: 10, description: '10% off' },
  'HISAAB30': { discount: 30, description: '30% off' },
  'HISAAB40': { discount: 40, description: '40% off' },
  'HISAAB50': { discount: 50, description: '50% off' },
};

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);

  const applyCoupon = () => {
    const upperCoupon = couponCode.toUpperCase();
    if (coupons[upperCoupon as keyof typeof coupons]) {
      setAppliedCoupon(upperCoupon);
      setCouponError('');
      setShowCouponInput(false);
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    const discount = coupons[appliedCoupon as keyof typeof coupons].discount;
    return (getTotalPrice() * discount) / 100;
  };

  const getFinalTotal = () => {
    return getTotalPrice() - getDiscountAmount();
  };

  const handlePayment = (method: 'card' | 'upi') => {
    const totalAmount = getFinalTotal();
    
    const options = {
      key: 'rzp_live_48budavqkFEuRM',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'MyHisaab',
      description: `Cart Items: ${cart.length} plan(s)`,
      image: '/WhatsApp Image 2025-01-14 at 22.37.16-Photoroom.png',
      handler: function (response: any) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        clearCart();
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        cartItems: JSON.stringify(cart.map(item => ({
          plan: item.planName,
          employees: item.employeeCount,
          billing: item.billing,
          quantity: item.quantity,
          coupon: appliedCoupon || 'none'
        })))
      },
      theme: {
        color: '#F7B500'
      },
      method: {
        card: method === 'card',
        upi: method === 'upi',
        netbanking: false,
        wallet: false
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/pricing"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
          <h1 className="text-3xl font-bold dark:text-white">Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any plans to your cart yet.
            </p>
            <Link 
              to="/pricing"
              className="btn btn-primary"
            >
              Browse Plans
            </Link>
          </motion.div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2 dark:text-white">{item.planName}</h3>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <p>Employees: {item.employeeCount}</p>
                          <p>Billing: {item.billing}</p>
                          {item.coupon && (
                            <p className="text-green-600 dark:text-green-400">
                              Coupon: {item.coupon} (-₹{item.discount?.toLocaleString()})
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end space-x-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-8 text-center font-semibold dark:text-white">
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ₹{(item.finalPrice * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ₹{item.finalPrice.toLocaleString()} each
                          </p>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear Cart Button */}
              <motion.button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear all items
              </motion.button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft sticky top-32"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h3>

                {/* Coupon Section */}
                <div className="mb-6">
                  <motion.button
                    onClick={() => setShowCouponInput(!showCouponInput)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors underline mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    Have a coupon code?
                  </motion.button>

                  <AnimatePresence>
                    {showCouponInput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        {!appliedCoupon ? (
                          <div className="space-y-3">
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white text-sm"
                              />
                              <button
                                onClick={applyCoupon}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                              >
                                Apply
                              </button>
                            </div>
                            {couponError && (
                              <p className="text-red-500 text-xs">{couponError}</p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Percent className="w-4 h-4 text-green-600 mr-2" />
                              <span className="text-green-700 dark:text-green-300 font-medium text-sm">
                                {appliedCoupon} - {coupons[appliedCoupon as keyof typeof coupons].description}
                              </span>
                            </div>
                            <button
                              onClick={removeCoupon}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {appliedCoupon && !showCouponInput && (
                    <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 p-3 rounded-lg mb-4">
                      <div className="flex items-center">
                        <Percent className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-green-700 dark:text-green-300 font-medium text-sm">
                          {appliedCoupon} - {coupons[appliedCoupon as keyof typeof coupons].description}
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium dark:text-white">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount ({coupons[appliedCoupon as keyof typeof coupons].description}):</span>
                      <span>-₹{getDiscountAmount().toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold dark:text-white">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{getFinalTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={() => handlePayment('card')}
                    className="w-full btn btn-primary flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay with Card
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handlePayment('upi')}
                    className="w-full btn btn-outline flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Wallet className="w-5 h-5" />
                    Pay with UPI
                  </motion.button>
                </div>

                {/* Security Note */}
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  🔒 Your payment information is secure and encrypted
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};