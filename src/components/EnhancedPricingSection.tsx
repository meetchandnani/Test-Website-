import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, Star, Users, Calculator, ShoppingCart, Plus, CreditCard, Wallet, X, Tag, Percent } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { AddToCartConfirmation } from './AddToCartConfirmation';
import { AddToCartAnimation } from './AddToCartAnimation';
import { useNavigate } from 'react-router-dom';
import { 
  elegantVariants, 
  elegantSprings, 
  MagneticButton, 
  RevealText,
  ElegantGesture 
} from './ElegantAnimations';

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
    isFlat: true,
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
    gradient: 'from-blue-500 to-blue-600',
    color: 'blue',
  },
  {
    name: 'Professional Plan',
    monthlyPrice: 300,
    yearlyPrice: 1200,
    description: 'For growing teams with advanced needs',
    isFlat: false,
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
    gradient: 'from-primary to-primary-600',
    color: 'primary',
  },
];

const coupons = {
  'HISAAB20': { discount: 20, description: '20% off' },
  'HISAAB10': { discount: 10, description: '10% off' },
  'HISAAB30': { discount: 30, description: '30% off' },
  'HISAAB40': { discount: 40, description: '40% off' },
  'HISAAB50': { discount: 50, description: '50% off' },
};

export const EnhancedPricingSection: React.FC = () => {
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
  
  // Animation states
  const [animationState, setAnimationState] = useState<{
    isVisible: boolean;
    startPosition: { x: number; y: number };
    endPosition: { x: number; y: number };
    productName: string;
  }>({
    isVisible: false,
    startPosition: { x: 0, y: 0 },
    endPosition: { x: 0, y: 0 },
    productName: ''
  });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const calculatePrice = (plan: any, employees: number) => {
    if (isYearly) {
      return plan.yearlyPrice * employees;
    } else {
      if (plan.isFlat) {
        return plan.monthlyPrice;
      } else {
        return plan.monthlyPrice * employees;
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

  const getCartIconPosition = () => {
    const headerHeight = 80;
    const cartIconOffset = 100;
    
    return {
      x: window.innerWidth - cartIconOffset,
      y: headerHeight / 2
    };
  };

  const handleAddToCart = (planIndex: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const plan = plans[planIndex];
    const basePrice = calculatePrice(plan, employeeCount);
    const finalPrice = getFinalPrice(plan, employeeCount);
    
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const startPosition = {
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2
    };

    const endPosition = getCartIconPosition();

    setAnimationState({
      isVisible: true,
      startPosition,
      endPosition,
      productName: plan.name
    });

    setTimeout(() => {
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

      setShowConfirmation({
        visible: true,
        planName: plan.name,
        price: finalPrice,
        employeeCount,
        billing: isYearly ? 'yearly' : 'monthly'
      });
    }, 400);

    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleAnimationComplete = () => {
    setAnimationState(prev => ({ ...prev, isVisible: false }));
  };

  const handleViewCart = () => {
    setShowConfirmation(prev => ({ ...prev, visible: false }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/cart');
    }, 300);
  };

  const handleContinueShopping = () => {
    setShowConfirmation(prev => ({ ...prev, visible: false }));
  };

  return (
    <>
      <motion.section 
        ref={sectionRef}
        className="section bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
        variants={elegantVariants.pageEnter}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl"
            variants={elegantVariants.float}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-primary/10 rounded-full blur-3xl"
            variants={elegantVariants.float}
            animate="animate"
          />
        </div>

        <div className="container relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={elegantVariants.stagger}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <ElegantGesture variant="elegantScale" className="inline-block mb-6">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 text-primary-700 dark:text-primary-300 rounded-full font-semibold border border-primary/20 backdrop-blur-sm">
                Packages 
              </span>
            </ElegantGesture>
            
            <RevealText
              text="Choose Your Perfect Plan"
              className="section-title dark:text-white mb-4"
            />
            
            <motion.p 
              className="section-subtitle dark:text-gray-300"
              variants={elegantVariants.fadeInUp}
            >
              Transparent pricing with no hidden fees. Scale your plan as your business grows.
            </motion.p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div 
            className="flex justify-center mb-8"
            variants={elegantVariants.elegantScale}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20">
              <motion.div className="relative flex rounded-xl p-1">
                <motion.div
                  className="absolute bg-gradient-to-r from-primary to-primary-600 rounded-xl shadow-lg"
                  animate={{
                    x: isYearly ? "0%" : "100%",
                    width: "50%",
                  }}
                  transition={elegantSprings.responsive}
                />
                <motion.button
                  className="relative px-8 py-3 text-sm font-semibold z-10 rounded-xl transition-colors"
                  onClick={() => setIsYearly(true)}
                  animate={{ 
                    color: isYearly ? "#ffffff" : "#4B5563" 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yearly
                </motion.button>
                <motion.button
                  className="relative px-8 py-3 text-sm font-semibold z-10 rounded-xl transition-colors"
                  onClick={() => setIsYearly(false)}
                  animate={{ 
                    color: !isYearly ? "#ffffff" : "#4B5563" 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Monthly
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Savings Badge */}
          <AnimatePresence>
            {isYearly && (
              <motion.div
                className="flex items-center justify-center gap-2 mb-8"
                variants={elegantVariants.elegantScale}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.span 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg"
                  variants={elegantVariants.shimmer}
                  animate="animate"
                >
                  💰 Save up to 67% with yearly billing
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Employee Count Selector */}
          <motion.div
            className="max-w-md mx-auto mb-12"
            variants={elegantVariants.elegantScale}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ delay: 0.4 }}
          >
            <ElegantGesture 
              variant="elegantScale" 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20"
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  className="bg-gradient-to-r from-primary to-primary-600 p-3 rounded-2xl mr-4"
                  whileHover={{ rotate: 5 }}
                  transition={elegantSprings.responsive}
                >
                  <Users className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold dark:text-white">Team Size</h3>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                <MagneticButton
                  onClick={() => setEmployeeCount(Math.max(5, employeeCount - 5))}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-primary hover:to-primary-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 hover:text-white transition-all shadow-lg"
                >
                  <Minus className="w-5 h-5" />
                </MagneticButton>
                
                <motion.div 
                  className="text-4xl font-bold text-primary min-w-[80px] text-center"
                  key={employeeCount}
                  variants={elegantVariants.elegantScale}
                  initial="initial"
                  animate="animate"
                >
                  {employeeCount}
                </motion.div>
                
                <MagneticButton
                  onClick={() => setEmployeeCount(employeeCount + 5)}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-primary hover:to-primary-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 hover:text-white transition-all shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                </MagneticButton>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                Minimum 5 employees, increments of 5
              </p>
            </ElegantGesture>
          </motion.div>

          {/* Coupon Section */}
          <motion.div
            className="max-w-md mx-auto mb-12"
            variants={elegantVariants.fadeInUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <motion.button
                onClick={() => setAppliedCoupon(null)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors underline font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Have a coupon code? 🎫
              </motion.button>
            </div>
            
            <AnimatePresence>
              {!appliedCoupon && (
                <motion.div
                  variants={elegantVariants.accordion}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mt-4"
                >
                  <ElegantGesture 
                    variant="elegantScale"
                    className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white text-sm transition-all backdrop-blur-sm"
                        />
                        <MagneticButton
                          onClick={applyCoupon}
                          className="px-6 py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all text-sm font-semibold shadow-lg"
                        >
                          Apply
                        </MagneticButton>
                      </div>
                      {couponError && (
                        <motion.p
                          className="text-red-500 text-xs"
                          variants={elegantVariants.fadeInUp}
                          initial="initial"
                          animate="animate"
                        >
                          {couponError}
                        </motion.p>
                      )}
                    </div>
                  </ElegantGesture>
                </motion.div>
              )}
              
              {appliedCoupon && (
                <motion.div
                  variants={elegantVariants.elegantScale}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mt-4"
                >
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl border border-green-200 dark:border-green-800 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Percent className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-700 dark:text-green-300 font-semibold">
                          {appliedCoupon} - {coupons[appliedCoupon as keyof typeof coupons].description}
                        </span>
                      </div>
                      <MagneticButton
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </MagneticButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pricing Plans */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            variants={elegantVariants.stagger}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={`${plan.name}-${isYearly ? 'yearly' : 'monthly'}-${employeeCount}`}
                className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 ${
                  plan.popular 
                    ? 'border-primary/50 shadow-primary/20 transform scale-105' 
                    : 'border-white/20 dark:border-gray-700/20 hover:border-primary/30'
                }`}
                variants={elegantVariants.elegantScale}
                whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
                transition={elegantSprings.responsive}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    variants={elegantVariants.bounce}
                    animate="animate"
                  >
                    <div className="bg-gradient-to-r from-primary to-primary-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div className="p-8 pt-12">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <motion.h3 
                      className="text-2xl font-bold mb-3 dark:text-white"
                      variants={elegantVariants.textReveal}
                    >
                      {plan.name}
                    </motion.h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                    
                    {/* Pricing Display */}
                    <motion.div 
                      className="mb-6"
                      key={`${plan.name}-${isYearly}-${employeeCount}`}
                      variants={elegantVariants.elegantScale}
                      initial="initial"
                      animate="animate"
                    >
                      <div className="text-center mb-4">
                        <motion.span 
                          className="text-5xl font-bold text-primary"
                          variants={elegantVariants.textReveal}
                        >
                          ₹{getDisplayPrice(plan)}
                        </motion.span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2 block text-sm mt-2">
                          {getPriceLabel(plan)}
                        </span>
                      </div>
                      
                      {/* Total Cost Display */}
                      <ElegantGesture 
                        variant="elegantScale"
                        className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl border border-primary/20"
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Calculator className="w-5 h-5 text-primary mr-2" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Cost</span>
                        </div>
                        <div className="text-center">
                          <motion.span 
                            className="text-3xl font-bold text-primary"
                            key={getFinalPrice(plan, employeeCount)}
                            variants={elegantVariants.elegantScale}
                            initial="initial"
                            animate="animate"
                          >
                            ₹{getFinalPrice(plan, employeeCount).toLocaleString()}
                          </motion.span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                            {isYearly ? 'per year' : 'per month'}
                          </span>
                        </div>
                        <p className="text-xs text-primary text-center mt-2 font-medium">
                          For {employeeCount} employees
                        </p>
                        {!isYearly && plan.isFlat && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                            (Flat rate regardless of employee count)
                          </p>
                        )}
                        {appliedCoupon && (
                          <motion.p 
                            className="text-xs text-green-600 dark:text-green-400 text-center mt-2 font-semibold"
                            variants={elegantVariants.fadeInUp}
                            initial="initial"
                            animate="animate"
                          >
                            💰 Discount: ₹{getDiscountAmount(plan, employeeCount).toLocaleString()}
                          </motion.p>
                        )}
                      </ElegantGesture>
                    </motion.div>
                    
                    {/* Add to Cart Button */}
                    <motion.button
                      ref={(el) => (buttonRefs.current[index] = el)}
                      onClick={(e) => handleAddToCart(index, e)}
                      className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'} flex items-center justify-center gap-3 mb-8 relative overflow-hidden group`}
                      variants={elegantVariants.morphButton}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Add to Cart
                      
                      {/* Button shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <motion.div
                        key={fIndex}
                        className="flex items-center group"
                        variants={elegantVariants.slideIn}
                        initial="initial"
                        animate={isInView ? "animate" : "initial"}
                        transition={{ delay: 0.8 + (fIndex * 0.1) }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          variants={elegantVariants.pulse}
                          animate="animate"
                        >
                          <Check className="text-green-500 w-5 h-5 mr-4 flex-shrink-0" />
                        </motion.div>
                        <span className="text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Card glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  variants={elegantVariants.glow}
                  animate="animate"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* View All Features CTA */}
          <motion.div 
            className="text-center mt-16"
            variants={elegantVariants.fadeInUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ delay: 1.2 }}
          >
            <MagneticButton className="btn btn-outline group">
              <a href="/features" className="flex items-center">
                View All Features
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Add to Cart Animation */}
      <AddToCartAnimation
        isVisible={animationState.isVisible}
        startPosition={animationState.startPosition}
        endPosition={animationState.endPosition}
        productName={animationState.productName}
        onComplete={handleAnimationComplete}
      />

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