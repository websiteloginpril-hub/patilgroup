'use client';

import React from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const ContactPage = () => {
  useGSAPAnimations();
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Image Section */}
      <div className="relative h-[50vh] hero-section">
        <img src="/seework2.jpg" alt="Contact us background" className="w-full h-full object-cover hero-image" />
        <div className="absolute bottom-0 left-0 p-8 hero-content">
          <h1 className="hero-title font-bold text-white px-4">Contact</h1>
        </div>
        </div>

      {/* Content Section */}
      <div className="text-center py-20 px-4 fade-in-section">
        <div className="mt-8 mx-auto w-1/2 h-0.5 bg-gradient-to-r from-[#8A393B] via-orange-400 to-blue-500"></div>
        <div className="mt-20 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Phone */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#8A393B] mb-4">Phone</h3>
              <p className="text-xl md:text-2xl text-gray-300">+91 40 3955 6700</p>
            </div>
            
            {/* Email */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#8A393B] mb-4">Email</h3>
              <p className="text-xl md:text-2xl text-gray-300">info@patilgroup.com</p>
            </div>
            
            {/* Address */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#8A393B] mb-4">Address(CHQ)</h3>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                6-3-1342/4<br />
                Raj Bhavan Rd, Raj Bhavan Quarters Colony<br />
                Somajiguda, Hyderabad<br />
                Telangana 500082
              </p>
            </div>
          </div>
          </div>
        </div>
    </div>
  );
};

export default ContactPage; 