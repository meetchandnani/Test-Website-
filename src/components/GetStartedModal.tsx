import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Users, 
  MapPin,
  Download,
  Smartphone,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    employeeCount: '',
    location: '',
    businessType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        employeeCount: '',
        location: '',
        businessType: ''
      });
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAppDownload = (platform: 'android' | 'ios') => {
    // Replace with actual app store links
    const links = {
      android: 'https://play.google.com/store/apps/details?id=com.myhisaab.app',
      ios: 'https://apps.apple.com/app/myhisaab/id123456789'
    };
    
    window.open(links[platform], '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-3xl font-bold dark:text-white">Get Started with MyHisaab</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Fill in your details to begin your workforce management journey
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {!isSubmitted ? (
              <>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Your company name"
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="+91 8696770077"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Employee Count */}
                    <div>
                      <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Number of Employees *
                      </label>
                      <select
                        id="employeeCount"
                        name="employeeCount"
                        required
                        value={formData.employeeCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                      >
                        <option value="">Select range</option>
                        <option value="5-10">5-10 employees</option>
                        <option value="11-25">11-25 employees</option>
                        <option value="26-50">26-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="101-250">101-250 employees</option>
                        <option value="250+">250+ employees</option>
                      </select>
                    </div>

                    {/* Business Type */}
                    <div>
                      <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                      >
                        <option value="">Select type</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="services">Services</option>
                        <option value="construction">Construction</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="technology">Technology</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Business Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="City, State"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Processing...
                      </>
                    ) : (
                      'Submit & Get Started'
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or download our mobile app
                    </span>
                  </div>
                </div>

                {/* App Download Section */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold dark:text-white mb-2">Download MyHisaab App</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get the mobile app for on-the-go workforce management
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Android Download */}
                    <motion.button
                      onClick={() => handleAppDownload('android')}
                      className="flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-xl shadow-soft hover:shadow-soft-lg transition-all border border-gray-200 dark:border-gray-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                          <Download className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Download for</p>
                          <p className="font-semibold dark:text-white">Android</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                      </div>
                    </motion.button>

                    {/* iOS Download */}
                    <motion.button
                      onClick={() => handleAppDownload('ios')}
                      className="flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-xl shadow-soft hover:shadow-soft-lg transition-all border border-gray-200 dark:border-gray-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-800 dark:bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                          <Download className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Download for</p>
                          <p className="font-semibold dark:text-white">iOS</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                      </div>
                    </motion.button>
                  </div>

                  {/* App Features */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    {[
                      'Real-time Tracking',
                      'Offline Capability',
                      'WhatsApp Reports'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-success mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: 2,
                  }}
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold dark:text-white mb-4">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your request has been submitted successfully. Our team will contact you within 24 hours to help you get started with MyHisaab.
                </p>
                <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl">
                  <p className="text-primary font-semibold text-sm">
                    📱 Don't forget to download our mobile app for the best experience!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};