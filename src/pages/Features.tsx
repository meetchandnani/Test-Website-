import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  MapPin, 
  Clock, 
  BarChart4, 
  Smartphone, 
  Shield,
  Users,
  Zap,
  Globe,
  Lock,
  CheckCircle2,
  Star
} from 'lucide-react';

const mainFeatures = [
  {
    icon: <Camera className="w-12 h-12 text-primary" />,
    title: 'AI-Powered Selfie Verification',
    description: 'Advanced facial recognition technology ensures accurate employee identity verification during check-in and check-out.',
    benefits: ['99.9% accuracy rate', 'Anti-spoofing protection', 'Real-time verification'],
    highlight: true,
  },
  {
    icon: <MapPin className="w-12 h-12 text-primary" />,
    title: 'Smart Geo-Fencing',
    description: 'Create virtual boundaries around work locations to automatically track when employees enter or leave designated areas.',
    benefits: ['Multiple location support', 'Customizable radius', 'Real-time alerts'],
  },
  {
    icon: <Clock className="w-12 h-12 text-primary" />,
    title: 'Real-Time Task Management',
    description: 'Assign, track, and monitor tasks in real-time with comprehensive progress tracking and productivity insights.',
    benefits: ['Live task updates', 'Progress tracking', 'Performance analytics'],
  },
  {
    icon: <BarChart4 className="w-12 h-12 text-primary" />,
    title: 'Advanced Analytics & Reporting',
    description: 'Generate detailed reports on attendance patterns, productivity metrics, and workforce insights.',
    benefits: ['Custom report generation', 'Data visualization', 'Export capabilities'],
  },
  {
    icon: <Smartphone className="w-12 h-12 text-primary" />,
    title: 'WhatsApp Integration',
    description: 'Receive daily attendance summaries, alerts, and reports directly through WhatsApp for seamless communication.',
    benefits: ['Daily automated reports', 'Instant notifications', 'Two-way communication'],
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption, secure data storage, and compliance with privacy regulations.',
    benefits: ['256-bit encryption', 'GDPR compliant', 'Secure cloud storage'],
  },
];

const additionalFeatures = [
  { icon: <Users />, title: 'Multi-Branch Management', description: 'Manage multiple locations from a single dashboard' },
  { icon: <Zap />, title: 'Offline Capability', description: 'Works without internet, syncs when connected' },
  { icon: <Globe />, title: 'Multi-Language Support', description: 'Available in multiple regional languages' },
  { icon: <Lock />, title: 'Role-Based Access', description: 'Customizable permissions for different user roles' },
];

export const Features: React.FC = () => {
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
              Our Features
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white">
              All essentials for seamless 
              <span className="text-primary block">Workforce Management</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              MyHisaab combines cutting-edge technology with intuitive design to transform how you track, manage, and optimize your workforce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-soft-lg ${
                  feature.highlight ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-gray-800' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={`mb-6 p-4 ${
                  feature.highlight ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-primary-50 dark:bg-primary-900/20'
                } inline-block rounded-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{feature.description}</p>
                <div className="space-y-3">
                  {feature.benefits.map((benefit, bIndex) => (
                    <motion.div
                      key={bIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index * 0.1) + (bIndex * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-success mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 dark:text-white">And Much More</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover additional features that make MyHisaab the complete workforce management solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-2xl inline-block mb-4">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-primary" })}
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-600">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Workforce Management?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust MyHisaab for their attendance and payroll needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/pricing"
                className="btn bg-white text-primary hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Pricing Plans
              </motion.a>
              <motion.a
                href="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};