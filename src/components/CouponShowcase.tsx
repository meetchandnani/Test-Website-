import React from 'react';
import { motion } from 'framer-motion';
import { CouponCode } from './CouponCode';
import { Gift, Percent, Star, Zap } from 'lucide-react';

export const CouponShowcase: React.FC = () => {
  const coupons = [
    { code: 'HISAAB50', discount: '50% OFF', description: 'Limited Time' },
    { code: 'HISAAB30', discount: '30% OFF', description: 'New Users' },
    { code: 'HISAAB20', discount: '20% OFF', description: 'Save Now' },
    { code: 'HISAAB40', discount: '40% OFF', description: 'Special Deal' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-primary to-primary-600 p-4 rounded-2xl mr-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold dark:text-white">
                Exclusive
                <span className="text-primary block">Coupon Codes</span>
              </h2>
            </div>
          </motion.div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Save big on your MyHisaab subscription with these limited-time offers. Click any coupon to copy the code!
          </p>
        </motion.div>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <CouponCode
                code={coupon.code}
                discount={coupon.discount}
                description={coupon.description}
                width={300}
                height={100}
                className="shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: <Percent className="w-6 h-6" />,
              title: "Instant Savings",
              description: "Apply codes at checkout for immediate discounts"
            },
            {
              icon: <Star className="w-6 h-6" />,
              title: "Premium Features",
              description: "Get access to all MyHisaab features at reduced prices"
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Limited Time",
              description: "These exclusive offers won't last forever"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-soft hover:shadow-soft-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-2xl inline-block mb-4">
                <div className="text-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/pricing"
            className="btn btn-primary inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift className="w-5 h-5 mr-2" />
            Use Coupons Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};