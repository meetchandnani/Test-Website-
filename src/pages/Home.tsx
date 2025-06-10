import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { PricingSection } from '../components/PricingSection';
import { Testimonials } from '../components/Testimonials';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <PricingSection />
      <Testimonials />
    </>
  );
};