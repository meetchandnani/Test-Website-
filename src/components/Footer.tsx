import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Linkedin, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918696770077?text=I want more info about MyHisaab Smart Attendance and Payroll', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+918696770077', '_blank');
  };

  const socialLinks = [
    {
      icon: Instagram,
      url: 'https://www.instagram.com/myhisaab.team?igsh=MW93anN5ZXRkbHh0Yg%3D%3D&utm_source=qr',
      color: 'hover:text-pink-500'
    },
    {
      icon: Twitter,
      url: 'https://x.com/myhisaabteam?s=21',
      color: 'hover:text-blue-400'
    },
    {
      icon: Youtube,
      url: 'https://www.youtube.com/@Hisaabofficial',
      color: 'hover:text-red-500'
    },
    {
      icon: Linkedin,
      url: 'https://www.threads.com/@myhisaab.team?igshid=NTc4MTIwNjQ2YQ==',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/logo-big-white-2.png" 
                alt="MyHisaab" 
                className="h-8"
              />
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              Business karne ka naya andaaz
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 dark:text-gray-500 transition-colors p-2 rounded-full bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/features" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">API Documentation</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <motion.button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-3 text-gray-400 dark:text-gray-500 hover:text-green-400 transition-colors w-full text-left p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900"
                whileHover={{ x: 5 }}
              >
                <MessageCircle size={20} />
                <span>WhatsApp: +91 8696770077</span>
              </motion.button>
              <motion.button
                onClick={handlePhoneClick}
                className="flex items-center space-x-3 text-gray-400 dark:text-gray-500 hover:text-primary transition-colors w-full text-left p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900"
                whileHover={{ x: 5 }}
              >
                <Phone size={20} />
                <span>Call: +91 8696770077</span>
              </motion.button>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors text-sm">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors text-sm">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors text-sm">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 dark:border-gray-900 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 dark:text-gray-600">
            &copy; {new Date().getFullYear()} MyHisaab. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-600 mt-2 md:mt-0">
            Designed with <span className="text-primary">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}