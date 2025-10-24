'use client';

import React from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfServicePage = () => {
  useGSAPAnimations();
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <main className="min-h-screen py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h1 className="hero-title font-bold font-clash text-black mb-16">Terms of Service</h1>
          <p className="text-lg leading-relaxed text-gray-700">
            This page is currently under construction.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
