import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Calculator,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

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
  const { cart, removeFromCart, updateCartItem, clearCart, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const applyCoupon = () => {
    const upperCoupon = couponCode.toUpperCase();
    if (coupons[upperCoupon as keyof typeof coupons]) {
      setAppliedCoupon(upperCoupon);
      setCouponError('');
      
      // Apply coupon to all cart items
      cart.forEach(item => {
        const discount = coupons[upperCoupon as keyof typeof coupons].discount;
        const discountAmount = item.basePrice * discount / 100;
        updateCartItem(item.id, {
          coupon: upperCoupon,
          discount: discountAmount,
          finalPrice: item.basePrice - discountAmount
        });
      });
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
    
    // Remove coupon from all cart items
    cart.forEach(item => {
      updateCartItem(item.id, {
        coupon: undefined,
        discount: undefined,
        finalPrice: item.basePrice
      });
    });
  };

  const updateEmployeeCount = (itemId: string, newCount: number) => {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    const newBasePrice = item.billing === 'yearly' 
      ? (item.planIndex === 0 ? 600 : 1200) * newCount
      : (item.planIndex === 0 ? 150 : 300) * newCount;

    const newFinalPrice = item.coupon && coupons[item.coupon as keyof typeof coupons]
      ? newBasePrice - (newBasePrice * coupons[item.coupon as keyof typeof coupons].discount / 100)
      : newBasePrice;

    updateCartItem(itemId, {
      employeeCount: newCount,
      basePrice: newBasePrice,
      finalPrice: newFinalPrice,
      discount: item.coupon ? newBasePrice - newFinalPrice : undefined
    });
  };

  const handlePayment = (method: 'card' | 'upi') => {
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    const totalAmount = getTotalPrice();
    
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
        setIsProcessing(false);
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
          coupon: item.coupon || 'none'
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
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const subtotal = cart.reduce((sum, item) => sum + item.basePrice, 0);
  const totalDiscount = cart.reduce((sum, item) => sum + (item.discount || 0), 0);
  const finalTotal = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container">
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/pricing" 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Pricing
            </Link>
          </motion.div>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white">
              Shopping
              <span className="text-primary block">Cart</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Review your selected plans and complete your purchase to start transforming your workforce management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="pb-20">
        <div className="container">
          {cart.length === 0 ? (
            /* Empty Cart */
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-soft-lg max-w-md mx-auto">
                <ShoppingCart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Add some plans to get started with MyHisaab's powerful workforce management tools.
                </p>
                <Link 
                  to="/pricing" 
                  className="btn btn-primary"
                >
                  Browse Plans
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Cart with Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-soft-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold dark:text-white">
                      Cart Items ({cart.length})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-6">
                    <AnimatePresence>
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-soft transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          layout
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Plan Info */}
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h3 className="text-lg font-bold dark:text-white mr-3">
                                  {item.planName}
                                </h3>
                                {item.planIndex === 1 && (
                                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                {item.billing === 'yearly' ? 'Annual' : 'Monthly'} billing
                              </p>
                              
                              {/* Employee Count Adjuster */}
                              <div className="flex items-center space-x-3 mb-3">
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium dark:text-white">Employees:</span>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => updateEmployeeCount(item.id, Math.max(5, item.employeeCount - 5))}
                                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-bold text-primary min-w-[40px] text-center">
                                    {item.employeeCount}
                                  </span>
                                  <button
                                    onClick={() => updateEmployeeCount(item.id, item.employeeCount + 5)}
                                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Coupon Info */}
                              {item.coupon && (
                                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                                  <Tag className="w-4 h-4 mr-1" />
                                  <span>Coupon: {item.coupon} applied</span>
                                </div>
                              )}
                            </div>

                            {/* Pricing */}
                            <div className="text-right">
                              <div className="mb-2">
                                {item.discount && item.discount > 0 ? (
                                  <>
                                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                      ₹{item.basePrice.toLocaleString()}
                                    </span>
                                    <div className="text-2xl font-bold text-primary">
                                      ₹{item.finalPrice.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-green-600 dark:text-green-400">
                                      Save ₹{item.discount.toLocaleString()}
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-2xl font-bold text-primary">
                                    ₹{item.finalPrice.toLocaleString()}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex items-center text-red-500 hover:text-red-700 text-sm transition-colors"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-soft-lg sticky top-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">Order Summary</h2>

                  {/* Coupon Section */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                    <div className="flex items-center mb-3">
                      <Tag className="w-5 h-5 text-primary mr-2" />
                      <h3 className="font-semibold dark:text-white">Coupon Code</h3>
                    </div>
                    
                    {!appliedCoupon ? (
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-600 dark:text-white text-sm"
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
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                      <span className="font-medium dark:text-white">₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {totalDiscount > 0 && (
                      <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                        <span>Discount:</span>
                        <span>-₹{totalDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold dark:text-white">Total:</span>
                        <span className="text-2xl font-bold text-primary">
                          ₹{finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => handlePayment('card')}
                      disabled={isProcessing}
                      className="w-full btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    >
                      <CreditCard className="w-5 h-5" />
                      {isProcessing ? 'Processing...' : 'Pay with Card'}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handlePayment('upi')}
                      disabled={isProcessing}
                      className="w-full btn btn-outline flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    >
                      <Wallet className="w-5 h-5" />
                      {isProcessing ? 'Processing...' : 'Pay with UPI'}
                    </motion.button>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                    <div className="flex items-center text-green-700 dark:text-green-300">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Secure Payment with Razorpay</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};