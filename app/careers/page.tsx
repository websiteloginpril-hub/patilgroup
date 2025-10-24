"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import ApplyForm from '@/components/ApplyForm';
import { Linkedin, ArrowRight } from 'lucide-react';

const CareersContent = () => {
  useGSAPAnimations();
  const [activeTab, setActiveTab] = useState('Engineering');

  const tabs = ['Engineering', 'Production', 'Projects', 'Support'];
  
  return (
    <>
      <section className="relative h-screen bg-black flex items-center justify-center hero-section z-20">
        <div className="absolute inset-0 h-full w-full opacity-60 hero-image">
          <Image src="/ourreso.jpg" alt="Architectural Structure" fill className="object-cover" priority sizes="100vw" />
        </div>

        <div className="relative z-10 w-full text-center hero-content">
          <h1 className="hero-title font-bold text-white animate-fadeInUp">
            Careers
          </h1>
        </div>
      </section>

      <section className="bg-black py-20 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8A393B]">Join our team</h2>
          <p className="mt-2 text-2xl sm:text-3xl md:text-4xl text-orange-400">Build the future of rail</p>
            </div>
            <div className="ml-8 w-full h-1 bg-gradient-to-r from-orange-400 via-[#1E3888] to-[#8A393B]"></div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-gray-300">
            <div className="pt-8 pr-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8A393B]">We hire for roles across</h2>
              <div className="mt-2 h-1.5 w-full bg-gradient-to-r from-[#8A393B] via-orange-400 to-blue-500"></div>
            </div>
            <div className="md:col-span-3 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {tabs.map((tab) => (
                  <div key={tab} className="border-l border-gray-300 pl-8">
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`text-2xl font-semibold ${activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                    >
                      {tab}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ApplyForm />
    </>
  );
};

const CareersPage = () => {
  return (
    <div className="bg-[#1E1E1E] text-white">
      <CareersContent />
    </div>
  );
};

export default CareersPage;
