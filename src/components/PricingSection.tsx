import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Users, Calculator, ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const plans = [
  {
    name: 'Basic Plan',
    monthlyPrice: 150,
    yearlyPrice: 600,
    description: 'Perfect for small businesses and startups',
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

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(5);
  const [showSuccessMessage, setShowSuccessMessage] = useState<number | null>(null);
  const { addToCart } = useCart();

  const calculatePrice = (plan: any, employees: number) => {
    if (isYearly) {
      return plan.yearlyPrice * employees;
    } else {
      return plan.monthlyPrice * employees;
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
      return 'per employee/month';
    }
  };

  const handleAddToCart = (planIndex: number) => {
    const plan = plans[planIndex];
    const basePrice = calculatePrice(plan, employeeCount);
    
    addToCart({
      planIndex,
      planName: plan.name,
      employeeCount,
      basePrice,
      finalPrice: basePrice,
      billing: isYearly ? 'yearly' : 'monthly'
    });

    // Show success message
    setShowSuccessMessage(planIndex);
    setTimeout(() => setShowSuccessMessage(null), 2000);
  };

  const handleGetStarted = () => {
    window.open('https://app.myhisaab.com', '_blank');
  };

  return (
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
              {/* Success Message */}
              <AnimatePresence>
                {showSuccessMessage === index && (
                  <motion.div
                    className="absolute inset-0 bg-green-500 bg-opacity-95 flex items-center justify-center z-10 rounded-3xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center text-white">
                      <motion.div
                        className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ShoppingCart className="w-8 h-8" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">Added to Cart!</h3>
                      <p className="text-sm opacity-90">{plan.name} for {employeeCount} employees</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                        ₹{calculatePrice(plan, employeeCount).toLocaleString()}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        {isYearly ? 'per year' : 'per month'}
                      </span>
                    </div>
                    <p className="text-xs text-primary text-center mt-1">
                      For {employeeCount} employees
                    </p>
                  </div>
                </motion.div>
                
                <div className="flex space-x-2 mb-8">
                  <motion.button
                    onClick={() => handleAddToCart(index)}
                    className="flex-1 btn btn-outline flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={showSuccessMessage === index}
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    onClick={handleGetStarted}
                    className={`flex-1 btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>

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
  );
};