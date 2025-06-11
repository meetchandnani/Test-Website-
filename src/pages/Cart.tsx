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
  CheckCircle2,
  Package,
  Sparkles,
  Heart,
  Star
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
  const [removingItem, setRemovingItem] = useState<string | null>(null);

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

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItem(itemId);
    // Add a small delay for animation
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItem(null);
    }, 300);
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

  // Page entrance animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100, scale: 0.8 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <section className="relative pt-32 pb-12">
        <div className="container">
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/pricing" 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
              </motion.div>
              <span className="group-hover:underline">Back to Pricing</span>
            </Link>
          </motion.div>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="bg-gradient-to-r from-primary to-primary-600 p-4 rounded-2xl mr-4">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold dark:text-white">
                  Shopping
                  <span className="text-primary block">Cart</span>
                </h1>
              </div>
            </motion.div>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Review your selected plans and complete your purchase to start transforming your workforce management.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="relative pb-20">
        <div className="container">
          {cart.length === 0 ? (
            /* Empty Cart */
            <motion.div
              className="text-center py-20"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl max-w-md mx-auto relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Decorative elements */}
                <motion.div
                  className="absolute top-4 right-4 text-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
                
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ShoppingCart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  <motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Add some plans to get started with MyHisaab's powerful workforce management tools.
                </p>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/pricing" 
                    className="btn btn-primary inline-flex items-center"
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Browse Plans
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            /* Cart with Items */
            <motion.div
              className="grid grid-cols-1 xl:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {/* Cart Items */}
              <div className="xl:col-span-2">
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-primary-600 p-3 rounded-xl mr-4"
                        whileHover={{ rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Package className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold dark:text-white">
                          Your Items
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    <AnimatePresence>
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className={`group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30 ${
                            removingItem === item.id ? 'opacity-50 scale-95' : ''
                          }`}
                          variants={itemVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          layout
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Product Image */}
                          <div className="flex flex-col lg:flex-row gap-6">
                            <motion.div
                              className="flex-shrink-0"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
                                  animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                />
                                <Package className="w-12 h-12 lg:w-16 lg:h-16 text-primary relative z-10" />
                                {item.planIndex === 1 && (
                                  <motion.div
                                    className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    <Star className="w-3 h-3" />
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center mb-2">
                                    <h3 className="text-xl font-bold dark:text-white mr-3">
                                      {item.planName}
                                    </h3>
                                    {item.planIndex === 1 && (
                                      <motion.span
                                        className="bg-primary text-white text-xs px-3 py-1 rounded-full font-medium"
                                        whileHover={{ scale: 1.1 }}
                                      >
                                        Popular Choice
                                      </motion.span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                    {item.billing === 'yearly' ? 'Annual' : 'Monthly'} billing plan
                                  </p>
                                  
                                  {/* Employee Count Adjuster */}
                                  <div className="flex items-center space-x-3 mb-3">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium dark:text-white">Team Size:</span>
                                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-600 rounded-lg p-1">
                                      <motion.button
                                        onClick={() => updateEmployeeCount(item.id, Math.max(5, item.employeeCount - 5))}
                                        className="w-8 h-8 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center transition-colors shadow-sm"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <Minus className="w-4 h-4" />
                                      </motion.button>
                                      <span className="font-bold text-primary min-w-[50px] text-center text-lg">
                                        {item.employeeCount}
                                      </span>
                                      <motion.button
                                        onClick={() => updateEmployeeCount(item.id, item.employeeCount + 5)}
                                        className="w-8 h-8 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center transition-colors shadow-sm"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <Plus className="w-4 h-4" />
                                      </motion.button>
                                    </div>
                                  </div>

                                  {/* Coupon Info */}
                                  {item.coupon && (
                                    <motion.div
                                      className="flex items-center text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg inline-flex"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500 }}
                                    >
                                      <Tag className="w-4 h-4 mr-1" />
                                      <span>Coupon {item.coupon} applied</span>
                                    </motion.div>
                                  )}
                                </div>

                                {/* Pricing */}
                                <div className="text-right">
                                  <div className="mb-3">
                                    {item.discount && item.discount > 0 ? (
                                      <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through block">
                                          ₹{item.basePrice.toLocaleString()}
                                        </span>
                                        <div className="text-2xl font-bold text-primary">
                                          ₹{item.finalPrice.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                                          You save ₹{item.discount.toLocaleString()}
                                        </div>
                                      </motion.div>
                                    ) : (
                                      <div className="text-2xl font-bold text-primary">
                                        ₹{item.finalPrice.toLocaleString()}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <motion.button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="flex items-center text-red-500 hover:text-red-700 text-sm transition-colors bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={removingItem === item.id}
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Remove
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hover effect overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            initial={false}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="xl:col-span-1">
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 sticky top-8"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-primary-600 p-3 rounded-xl mr-4"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Calculator className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold dark:text-white">Order Summary</h2>
                  </div>

                  {/* Coupon Section */}
                  <motion.div
                    className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
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
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-600 dark:text-white text-sm transition-all duration-300"
                          />
                          <motion.button
                            onClick={applyCoupon}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Apply
                          </motion.button>
                        </div>
                        {couponError && (
                          <motion.p
                            className="text-red-500 text-xs"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {couponError}
                          </motion.p>
                        )}
                      </div>
                    ) : (
                      <motion.div
                        className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 p-3 rounded-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <div className="flex items-center">
                          <Percent className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-green-700 dark:text-green-300 font-medium text-sm">
                            {appliedCoupon} - {coupons[appliedCoupon as keyof typeof coupons].description}
                          </span>
                        </div>
                        <motion.button
                          onClick={removeCoupon}
                          className="text-red-500 hover:text-red-700 text-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Remove
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                      <span className="font-medium dark:text-white">₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {totalDiscount > 0 && (
                      <motion.div
                        className="flex justify-between items-center text-green-600 dark:text-green-400"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>Discount:</span>
                        <span>-₹{totalDiscount.toLocaleString()}</span>
                      </motion.div>
                    )}
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold dark:text-white">Total:</span>
                        <motion.span
                          className="text-3xl font-bold text-primary"
                          key={finalTotal}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          ₹{finalTotal.toLocaleString()}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => handlePayment('card')}
                      disabled={isProcessing}
                      className="w-full btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    >
                      <CreditCard className="w-5 h-5" />
                      {isProcessing ? 'Processing...' : 'Pay with Card'}
                      {!isProcessing && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handlePayment('upi')}
                      disabled={isProcessing}
                      className="w-full btn btn-outline flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    >
                      <Wallet className="w-5 h-5" />
                      {isProcessing ? 'Processing...' : 'Pay with UPI'}
                      {!isProcessing && (
                        <motion.div
                          className="absolute inset-0 bg-primary/10"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  </div>

                  {/* Security Badge */}
                  <motion.div
                    className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="flex items-center text-green-700 dark:text-green-300">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Secure Payment with Razorpay</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </motion.div>

                  {/* Trust Indicators */}
                  <motion.div
                    className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1 text-red-500" />
                      <span>Trusted by 1000+ businesses</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};