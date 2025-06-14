import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Users, Calculator, Tag, Percent, CreditCard, Wallet } from 'lucide-react';

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
    isFlat: true, // Basic plan is flat rate for monthly
    features: [
      { name: 'AI-based Selfie Verification', included: true },
      { name: 'WhatsApp Daily Reporting', included: true },
      { name: 'Multiple Geo-Fencing', included: true },
      { name: 'Multiple Branch Management', included: true },
      { name: 'Loan and Advance option', included: true },
      { name: 'Download payslip through single click', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Email Support', included: true },
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
      { name: 'All Basic Plan Features', included: true },
      { name: 'Real time monitoring', included: true },
      { name: 'KM Tracking through Odometer', included: true },
      { name: 'Battery Percentages in Live Tracking', included: true },
      { name: 'Google Maps Integration', included: true },
      { name: 'Real-Time Workforce Control', included: true },
      { name: 'Advanced Reporting & Analytics', included: true },
      { name: 'Priority Support', included: true },
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

export const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(5);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);

  const calculatePrice = (plan: any, employees: number) => {
    if (isYearly) {
      return plan.yearlyPrice * employees;
    } else {
      // Monthly calculation - FIXED: Basic plan is flat rate, Professional is per employee
      if (plan.isFlat) {
        return plan.monthlyPrice; // ₹150 flat for Basic regardless of employee count
      } else {
        return plan.monthlyPrice * employees; // ₹300 per employee for Professional
      }
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
    if (isYearly) {
      return 'per employee/year';
    } else {
      if (plan.isFlat) {
        return 'per month (flat rate)';
      } else {
        return 'per employee/month';
      }
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

  const handleSubscribe = (planIndex: number) => {
    setSelectedPlan(planIndex);
  };

  const handlePayment = (method: 'card' | 'upi') => {
    if (selectedPlan === null) return;
    
    const plan = plans[selectedPlan];
    const finalAmount = getFinalPrice(plan, employeeCount);
    
    const options = {
      key: 'rzp_live_48budavqkFEuRM',
      amount: finalAmount * 100,
      currency: 'INR',
      name: 'MyHisaab',
      description: `${plan.name} - ${employeeCount} employees - ${isYearly ? 'yearly' : 'monthly'}${appliedCoupon ? ` (${appliedCoupon} applied)` : ''}`,
      image: '/WhatsApp Image 2025-01-14 at 22.37.16-Photoroom.png',
      handler: function (response: any) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        setSelectedPlan(null);
        setAppliedCoupon(null);
        setCouponCode('');
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        plan: plan.name,
        billing: isYearly ? 'yearly' : 'monthly',
        employees: employeeCount.toString(),
        coupon: appliedCoupon || 'none'
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full font-semibold mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Simple Pricing
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white">
              Choose Your
              <span className="text-primary block">Perfect Plan</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Scale your plan as your business grows.
            </p>
          </motion.div>

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
                onClick={() => setShowCouponInput(!showCouponInput)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors underline"
                whileHover={{ scale: 1.05 }}
              >
                Have a coupon code?
              </motion.button>
            </div>
            
            <AnimatePresence>
              {showCouponInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
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
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {plans.map((plan, index) => (
                <motion.div
                  key={`${plan.name}-${isYearly ? 'yearly' : 'monthly'}-${employeeCount}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden ${
                    plan.popular 
                      ? 'border-2 border-primary shadow-soft-lg relative transform scale-105' 
                      : 'border border-gray-200 dark:border-gray-700 shadow-soft'
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-primary text-white text-center py-3 font-semibold">
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
                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-primary">
                          ₹{getDisplayPrice(plan)}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2 block text-sm">
                          {getPriceLabel(plan)}
                        </span>
                      </div>
                      
                      {/* Total Cost Display */}
                      <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
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
                        {!isYearly && plan.isFlat && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                            (Flat rate regardless of employee count)
                          </p>
                        )}
                        {appliedCoupon && (
                          <p className="text-xs text-green-600 dark:text-green-400 text-center mt-1">
                            Discount: ₹{getDiscountAmount(plan, employeeCount).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                    
                    <motion.button
                      onClick={() => handleSubscribe(index)}
                      className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'} mb-8`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Subscribe Now
                    </motion.button>

                    <div className="space-y-4">
                      {plan.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center">
                          {feature.included ? (
                            <Check className="text-success w-5 h-5 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {selectedPlan !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedPlan(null);
                setAppliedCoupon(null);
                setCouponCode('');
                setCouponError('');
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold dark:text-white">Complete Your Subscription</h3>
                <button
                  onClick={() => {
                    setSelectedPlan(null);
                    setAppliedCoupon(null);
                    setCouponCode('');
                    setCouponError('');
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Coupon Code Section */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="flex items-center mb-3">
                  <Tag className="w-5 h-5 text-primary mr-2" />
                  <h4 className="font-semibold dark:text-white">Have a Coupon Code?</h4>
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

              {/* Plan Summary */}
              <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-2xl">
                <h4 className="font-semibold text-lg dark:text-white">{plans[selectedPlan].name}</h4>
                
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Base Price:</span>
                    <span className="font-medium dark:text-white">
                      ₹{calculatePrice(plans[selectedPlan], employeeCount).toLocaleString()}
                    </span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                      <span>Discount ({coupons[appliedCoupon as keyof typeof coupons].description}):</span>
                      <span>-₹{getDiscountAmount(plans[selectedPlan], employeeCount).toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold dark:text-white">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{getFinalPrice(plans[selectedPlan], employeeCount).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                      {isYearly ? 'per year' : 'per month'} for {employeeCount} employees
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-4">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about our pricing? We're here to help.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Can I change my plan later?",
                a: "Yes, you can upgrade your plan according to your needs."
              },
              {
                q: "What happens if I need more employees?",
                a: "You can easily add more employees in increments of 5. Your billing will be adjusted accordingly."
              },
              {
                q: "Is there a free trial?",
                a: "Yes, we offer a 7-day free trial for all plans."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and UPI payments, Netbanking through our secure Razorpay integration."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-2 dark:text-white">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};