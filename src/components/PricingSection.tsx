import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Users, Calculator, ShoppingCart, Plus, CreditCard, Wallet, X, Tag, Percent } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { AddToCartConfirmation } from './AddToCartConfirmation';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: 'Basic Plan',
    monthlyPrice: 150,
    yearlyPrice: 600,
    description: 'Perfect for small businesses and startups',
    isFlat: false, // FIXED: Both plans now calculate per employee
    features: [
      'AI-based Selfie Verification',
      'WhatsApp Daily Reporting',
      'Multiple Geo-Fencing',
      'Multiple Branch Management',
      'Loan and Advance option',
      'Download payslip through single click',
      'Basic Analytics',
      'Email Support'
    ],
    popular: false,
  },
  {
    name: 'Professional Plan',
    monthlyPrice: 300,
    yearlyPrice: 1200,
    description: 'For growing teams with advanced needs',
    isFlat: false, // Professional plan is per employee
    features: [
      'All Basic Plan Features',
      'Real time monitoring',
      'KM Tracking through Odometer',
      'Battery Percentages in Live Tracking',
      'Google Maps Integration',
      'Real-Time Workforce Control',
      'Advanced Reporting & Analytics',
      'Priority Support'
    ],
    popular: true,
  },
];

const coupons = {
  'HISAAB20': { discount: 20, description: '20% off' },
  'HISAAB10': { discount: 10, description: '10% off' },
  'HISAAB30': { discount: 30, description: '30% off' },
  'HISAAB40': { discount: 40, description: '40% off' },
  'HISAAB50': { discount: 50, description: '50% off' },
};

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(5);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState<{
    visible: boolean;
    planName: string;
    price: number;
    employeeCount: number;
    billing: 'monthly' | 'yearly';
  }>({
    visible: false,
    planName: '',
    price: 0,
    employeeCount: 0,
    billing: 'monthly'
  });
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const calculatePrice = (plan: any, employees: number) => {
    // FIXED: Both plans now calculate per employee for both monthly and yearly
    if (isYearly) {
      return plan.yearlyPrice * employees;
    } else {
      return plan.monthlyPrice * employees; // Both Basic and Professional multiply by employee count
    }
  };

  const getDisplayPrice = (plan: any) => {
    if (isYearly) {
      return plan.yearlyPrice;
    } else {
      return plan.monthlyPrice;
    }
  };

  const getPriceLabel = (plan: any) => {
    // FIXED: Both plans now show per employee pricing
    if (isYearly) {
      return 'per employee/year';
    } else {
      return 'per employee/month';
    }
  };

  const applyCoupon = () => {
    const upperCoupon = couponCode.toUpperCase();
    if (coupons[upperCoupon as keyof typeof coupons]) {
      setAppliedCoupon(upperCoupon);
      setCouponError('');
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

  const getFinalPrice = (plan: any, employees: number) => {
    const basePrice = calculatePrice(plan, employees);
    if (appliedCoupon && coupons[appliedCoupon as keyof typeof coupons]) {
      const discount = coupons[appliedCoupon as keyof typeof coupons].discount;
      return basePrice - (basePrice * discount / 100);
    }
    return basePrice;
  };

  const getDiscountAmount = (plan: any, employees: number) => {
    const basePrice = calculatePrice(plan, employees);
    const finalPrice = getFinalPrice(plan, employees);
    return basePrice - finalPrice;
  };

  const handleAddToCart = (planIndex: number) => {
    const plan = plans[planIndex];
    const basePrice = calculatePrice(plan, employeeCount);
    const finalPrice = getFinalPrice(plan, employeeCount);
    
    addToCart({
      planIndex,
      planName: plan.name,
      employeeCount,
      basePrice,
      finalPrice,
      billing: isYearly ? 'yearly' : 'monthly',
      coupon: appliedCoupon || undefined,
      discount: appliedCoupon ? getDiscountAmount(plan, employeeCount) : undefined
    });

    // Show confirmation popup
    setShowConfirmation({
      visible: true,
      planName: plan.name,
      price: finalPrice,
      employeeCount,
      billing: isYearly ? 'yearly' : 'monthly'
    });
    
    // Reset coupon
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleViewCart = () => {
    setShowConfirmation(prev => ({ ...prev, visible: false }));
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    setShowConfirmation(prev => ({ ...prev, visible: false }));
  };

  return (
    <>
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full font-semibold mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Packages 
            </motion.span>
            <h2 className="section-title dark:text-white">Choose Your Perfect Plan</h2>
            <p className="section-subtitle dark:text-gray-300">
              Transparent pricing with no hidden fees. Scale your plan as your business grows.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <motion.div className="relative flex rounded-full p-1">
                <motion.div
                  className="absolute bg-white dark:bg-gray-700 rounded-full shadow-sm"
                  animate={{
                    x: isYearly ? "0%" : "100%",
                    width: "50%",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <motion.button
                  className="relative px-8 py-2 text-sm font-medium z-10 dark:text-gray-300"
                  onClick={() => setIsYearly(true)}
                  animate={{ color: isYearly ? "#F7B500" : "#4B5563" }}
                >
                  Yearly
                </motion.button>
                <motion.button
                  className="relative px-8 py-2 text-sm font-medium z-10 dark:text-gray-300"
                  onClick={() => setIsYearly(false)}
                  animate={{ color: !isYearly ? "#F7B500" : "#4B5563" }}
                >
                  Monthly
                </motion.button>
              </motion.div>
            </div>
          </div>

          {isYearly && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <span className="bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 text-sm font-semibold px-4 py-1 rounded-full">
                Save up to 67% with yearly billing
              </span>
            </motion.div>
          )}

          {/* Employee Count Selector */}
          <motion.div
            className="max-w-md mx-auto mb-12 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-lg font-semibold dark:text-white">Number of Employees</h3>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setEmployeeCount(Math.max(5, employeeCount - 5))}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center font-bold dark:text-white"
              >
                -
              </button>
              <div className="text-2xl font-bold text-primary min-w-[60px] text-center">
                {employeeCount}
              </div>
              <button
                onClick={() => setEmployeeCount(employeeCount + 5)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center font-bold dark:text-white"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              Minimum 5 employees, increments of 5
            </p>
          </motion.div>

          {/* Subtle Coupon Code Section */}
          <motion.div
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center">
              <motion.button
                onClick={() => setAppliedCoupon(null)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors underline"
                whileHover={{ scale: 1.05 }}
              >
                Have a coupon code?
              </motion.button>
            </div>
            
            <AnimatePresence>
              {!appliedCoupon && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
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
                </motion.div>
              )}
              
              {appliedCoupon && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={`${plan.name}-${isYearly ? 'yearly' : 'monthly'}-${employeeCount}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden relative ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-soft-lg transform scale-105' 
                    : 'border border-gray-200 dark:border-gray-700 shadow-soft'
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-3 font-semibold flex items-center justify-center">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 dark:text-white">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                  
                  <motion.div 
                    className="mb-6"
                    key={`${plan.name}-${isYearly}-${employeeCount}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <span className="text-4xl font-bold text-primary">
                        ₹{getDisplayPrice(plan)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2 block text-sm">
                        {getPriceLabel(plan)}
                      </span>
                    </div>
                    
                    {/* Total Cost Display */}
                    <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
                      <div className="flex items-center justify-center mb-1">
                        <Calculator className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Total Cost</span>
                      </div>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-primary">
                          ₹{getFinalPrice(plan, employeeCount).toLocaleString()}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                          {isYearly ? 'per year' : 'per month'}
                        </span>
                      </div>
                      <p className="text-xs text-primary text-center mt-1">
                        For {employeeCount} employees
                      </p>
                      {appliedCoupon && (
                        <p className="text-xs text-green-600 dark:text-green-400 text-center mt-1">
                          Discount: ₹{getDiscountAmount(plan, employeeCount).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Single Add to Cart Button */}
                  <motion.button
                    onClick={() => handleAddToCart(index)}
                    className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'} flex items-center justify-center gap-2 mb-8`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>

                  <div className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center">
                        <Check className="text-success w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-gray-800 dark:text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="/features"
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Features
            </motion.a>
          </div>
        </div>
      </section>

      {/* Add to Cart Confirmation */}
      <AddToCartConfirmation
        isVisible={showConfirmation.visible}
        planName={showConfirmation.planName}
        price={showConfirmation.price}
        employeeCount={showConfirmation.employeeCount}
        billing={showConfirmation.billing}
        onViewCart={handleViewCart}
        onContinueShopping={handleContinueShopping}
      />
    </>
  );
};