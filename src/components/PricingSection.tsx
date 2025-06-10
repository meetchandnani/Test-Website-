import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Users, Calculator, CreditCard, Wallet, X } from 'lucide-react';

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

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [employeeCount, setEmployeeCount] = useState(5);

  const calculatePrice = (plan: any, employees: number) => {
    if (isYearly) {
      return plan.yearlyPrice * employees;
    } else {
      // Monthly calculation - FIXED
      if (plan.isFlat) {
        return plan.monthlyPrice; // ₹150 flat for Basic
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

  const handlePayment = (plan: any, method: 'card' | 'upi') => {
    const totalAmount = calculatePrice(plan, employeeCount);
    
    const options = {
      key: 'rzp_live_48budavqkFEuRM',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'MyHisaab',
      description: `${plan.name} - ${employeeCount} employees - ${isYearly ? 'yearly' : 'monthly'}`,
      image: '/WhatsApp Image 2025-01-14 at 22.37.16-Photoroom.png',
      handler: function (response: any) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        setSelectedPlan(null);
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        plan: plan.name,
        billing: isYearly ? 'yearly' : 'monthly',
        employees: employeeCount.toString()
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

          {/* Employee Count Selector - Always show for proper calculation */}
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
                className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-soft-lg relative transform scale-105' 
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
                          ₹{calculatePrice(plan, employeeCount).toLocaleString()}
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
                    </div>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setSelectedPlan(index)}
                    className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'} mb-8`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe Now
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
              href="/pricing"
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Detailed Pricing
            </motion.a>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedPlan !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedPlan(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold dark:text-white">Complete Your Subscription</h3>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Employee Count Selector */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary mr-2" />
                  <h4 className="text-lg font-semibold dark:text-white">Number of Employees</h4>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setEmployeeCount(Math.max(5, employeeCount - 5))}
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center font-bold dark:text-white"
                  >
                    -
                  </button>
                  <div className="text-2xl font-bold text-primary min-w-[60px] text-center">
                    {employeeCount}
                  </div>
                  <button
                    onClick={() => setEmployeeCount(employeeCount + 5)}
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center font-bold dark:text-white"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  Minimum 5 employees, increments of 5
                </p>
              </div>

              {/* Plan Summary */}
              <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-2xl">
                <h4 className="font-semibold text-lg dark:text-white">{plans[selectedPlan].name}</h4>
                <div className="flex items-center justify-center mt-2">
                  <Calculator className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-primary">
                    ₹{calculatePrice(plans[selectedPlan], employeeCount).toLocaleString()}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">
                    {isYearly ? 'per year' : 'per month'}
                  </span>
                </div>
                <p className="text-sm text-primary mt-1 text-center">
                  For {employeeCount} employees
                </p>
                {!isYearly && plans[selectedPlan].isFlat && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    (Flat rate for Basic Plan)
                  </p>
                )}
              </div>

              {/* Payment Buttons */}
              <div className="space-y-4">
                <motion.button
                  onClick={() => handlePayment(plans[selectedPlan], 'card')}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard className="w-5 h-5" />
                  Pay with Card
                </motion.button>
                
                <motion.button
                  onClick={() => handlePayment(plans[selectedPlan], 'upi')}
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
    </>
  );
};