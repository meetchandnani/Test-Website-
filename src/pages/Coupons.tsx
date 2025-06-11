import React from 'react';
import { CouponShowcase } from '../components/CouponShowcase';

export const Coupons: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white">
              Coupon
              <span className="text-primary block">Codes</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Exclusive discount codes for MyHisaab workforce management solutions.
            </p>
          </div>
        </div>
      </section>

      <CouponShowcase />
    </div>
  );
};