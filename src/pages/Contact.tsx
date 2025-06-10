import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918696770077?text=I want more info about MyHisaab Smart Attendance and Payroll', '_blank');
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
              Get In Touch
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white">
              Let's Start Your
              <span className="text-primary block">Digital Transformation</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to revolutionize your workforce management? Our team is here to help you get started with MyHisaab.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Our team is ready to answer your questions and guide you through the setup process.
                </p>
              </div>
              
              <motion.div 
                className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-soft transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+91 8696770077</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri 9AM-6PM IST</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-soft transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">office@myhisaab.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">We'll respond within 24 hours</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-soft transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">Address</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    400, 212F, Shipra Path, <br />
                    SFS Manasarovar, <br />
                    Jaipur, Rajasthan 302020
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-soft transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">Business Hours</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </motion.div>

              {/* Quick WhatsApp Button */}
              <motion.button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl flex items-center justify-center space-x-3 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-6 h-6" />
                <span className="font-semibold">Chat on WhatsApp</span>
              </motion.button>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-soft-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Request a Demo</h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2 dark:text-white">Thank You!</h4>
                  <p className="text-gray-600 dark:text-gray-300">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
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
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
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
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Tell us about your team and requirements..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full btn btn-primary flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Request
                    <Send size={16} className="ml-2" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 dark:text-white">Why Choose MyHisaab?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of businesses that trust MyHisaab for their workforce management needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Setup",
                description: "Get started in minutes with our intuitive setup process",
                icon: "⚡"
              },
              {
                title: "24/7 Support",
                description: "Our dedicated support team is always here to help",
                icon: "🛟"
              },
              {
                title: "Proven Results",
                description: "95% reduction in attendance fraud and 30% productivity increase",
                icon: "📈"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};