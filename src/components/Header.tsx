import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './ThemeContext';
import { useCart } from '../contexts/CartContext';
import { GetStartedModal } from './GetStartedModal';
import { CartPreview } from './CartPreview';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStartedClick = () => {
    setShowGetStartedModal(true);
  };

  const handleLogoClick = () => {
    scrollToTop();
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  const totalItems = getTotalItems();

  const handleCartClick = () => {
    if (totalItems > 0) {
      setShowCartPreview(true);
    }
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white dark:bg-gray-900 shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between">
          {/* Logo - Enhanced with better click handling */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Link 
              to="/" 
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
              aria-label="MyHisaab Home"
            >
              <motion.img 
                src="/WhatsApp Image 2025-01-14 at 22.37.16-Photoroom.png"
                alt="MyHisaab - Smart Attendance & Workforce Management" 
                className="h-8 transition-all duration-300 hover:brightness-110"
                whileHover={{ 
                  filter: "brightness(1.1) drop-shadow(0 4px 8px rgba(247, 181, 0, 0.3))" 
                }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name} className="relative">
                <Link
                  to={item.path}
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors ${
                    isActive(item.path) ? 'text-primary font-semibold' : ''
                  }`}
                  onClick={scrollToTop}
                >
                  {item.name}
                </Link>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Cart Icon - Original Shopping Cart Icon */}
            <motion.button
              id="header-cart-icon"
              onClick={handleCartClick}
              onMouseEnter={() => totalItems > 0 && setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Original Shopping Cart Icon */}
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" />
                
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    key={totalItems} // Re-animate when count changes
                  >
                    {totalItems}
                  </motion.span>
                )}
                
                {/* Pulse effect when items are added */}
                {totalItems > 0 && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.button>
            
            <motion.button 
              onClick={handleGetStartedClick}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </nav>

          {/* Mobile Menu Button, Cart, and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile Cart Icon - Original Shopping Cart Icon */}
            <motion.button
              id="mobile-cart-icon"
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" />
                
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    key={totalItems}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
            </motion.button>
            
            <motion.button 
              className="text-gray-700 dark:text-gray-300"
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden bg-white dark:bg-gray-900 py-5 px-4 shadow-soft-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-col space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`text-gray-700 dark:text-gray-300 hover:text-primary transition-colors block ${
                        isActive(item.path) ? 'text-primary font-semibold' : ''
                      }`}
                      onClick={() => {
                        toggleMenu();
                        scrollToTop();
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.button 
                  onClick={() => {
                    toggleMenu();
                    handleGetStartedClick();
                  }}
                  className="btn btn-primary w-full text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Cart Preview */}
      <CartPreview 
        isVisible={showCartPreview}
        onClose={() => setShowCartPreview(false)}
      />

      {/* Get Started Modal */}
      <GetStartedModal 
        isOpen={showGetStartedModal} 
        onClose={() => setShowGetStartedModal(false)} 
      />
    </>
  );
};