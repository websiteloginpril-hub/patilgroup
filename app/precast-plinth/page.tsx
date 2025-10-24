"use client";
import React from 'react';
import Image from 'next/image';
import { TypingAnimation } from '@/components/TypingAnimation';
import { ArrowRight } from 'lucide-react';
import ContentSlider from '@/components/ContentSlider';
import ExploreSolutions from '@/components/ExploreSolutions';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const PrecastPlinthPage = () => {
  useGSAPAnimations();

  const sliderData = [
    { image: '/23_precast_plinth_process.jpg' },
    { image: '/25_alternate_material_CMA.jpg' },
  ];

  return (
    <div>
      <div className="relative hero-section">
        {/* Mobile Layout */}
        <div className="md:hidden h-screen relative hero-image">
          <img src="/Precast plinth.png" alt="Precast Plinth" className="h-full w-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          
          <div className="absolute inset-0 flex items-center justify-start z-20 hero-content">
            <div className="text-left px-6">
              <h1 className="hero-title font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                Precast Plinth
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mr-auto rounded-full shadow-lg"></div>
              <p className="text-gray-200 hero-subtitle mt-4 font-medium">
                Modular Track Infrastructure
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen hero-image">
          <img src="/Precast plinth.png" alt="Precast Plinth" className="h-full w-full object-cover z-0" />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center hero-content">
            <div className="px-6 sm:px-8 md:px-12 text-left">
              <h1 className="text-white font-bold leading-[0.95] hero-title">
                Precast Plinth
              </h1>
              <p className="text-gray-200 hero-subtitle mt-4 font-medium">
                Track Infrastructures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-cast Plinth Content Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10 relative">
        {/* Top Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '864px',
            height: '28px',
            left: '0px',
            top: '0px',
            background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h2 className="text-[#8A393B] fluid-h2 font-bold mb-8">
            Modular Track Infrastructure 
          </h2>
          
          <div className="space-y-6 text-black fluid-body">
            <p>
              Patil Rail Infrastructure Pvt. Ltd and ITD Bangkok together developed an innovative modification to the existing plinth type track structure adopted with fastening system.
            </p>
            
            <p>
              In this system, we bring in the plinth as a pre-cast element, same as the existing plinth structure to be used 300-1 fastening system.
            </p>
            
            <div>
              <p className="font-semibold text-black mb-4">Such a system brings in the following advantages:</p>
              
              <ul className="space-y-2 text-black fluid-body">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Cost effectiveness
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Better quality of work
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Time saving
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Lesser quantum of work on site
                </li>
            </ul>
            </div>
            
            <p>
              Due to the above advantages, many Metro authorities are showing keen interest in this system and are willing to adopt it in their upcoming projects
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Situations Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10 relative">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h3 className="text-[#F2913F] fluid-h2 font-bold mb-6">
              The Plinth Solutions can be implemented in the following situations:
            </h3>
            
          <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-4 sm:gap-6 text-black fluid-body">
            <span className="inline-block bg-gray-100 rounded-md px-4 py-2 font-bold">Elevated track</span>
            <span className="inline-block bg-gray-100 rounded-md px-4 py-2 font-bold">Depots</span>
            <span className="inline-block bg-gray-100 rounded-md px-4 py-2 font-bold">Tunnels & viaducts.</span>
          </div>
        </div>
      </section>

      {/* Speed Specification Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h3 className="text-[#8A393B] fluid-h3 font-bold text-center mb-6">
            Plinth system of Urban Metro is meant for speeds up to 110 kmph.
          </h3>
          <p className="text-black fluid-body text-center">
            Our varied references in this product make us hopeful to aspire for further forthcoming urban metro projects in various cities.
          </p>
        </div>
      </section>

      {/* Project References Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 fade-in-section">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <Image 
                src="/2nd image precast plinth.png" 
                alt="Precast plinth track implementation" 
                width={800} 
                height={600} 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
                loading="lazy" 
              />
            </div>
            
            {/* Content */}
            <div className="w-full md:w-1/2">
              <h3 className="text-[#8A393B] fluid-h3 font-bold mb-6">
                This system has been used in:
              </h3>
              <ul className="space-y-2 text-black fluid-body">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Mumbai Metro Line 2A
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Bangalore Metro Reach 5
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Pune Metro
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Ahmedabad Metro
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Summary Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <p className="text-[#8A393B] fluid-body font-bold text-justify">
            Its modular nature enables speed of installation and minimal site disruption, while maintaining structural integrity and alignment across straight and curved sections
          </p>
        </div>
      </section>

    </div>
  );
};

export default PrecastPlinthPage;