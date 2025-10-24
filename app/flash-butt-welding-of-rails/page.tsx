"use client";
import React from 'react';
import Image from 'next/image';
import ContentSlider from '@/components/ContentSlider';
import ExploreSolutions from '@/components/ExploreSolutions';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const FlashButtWeldingOfRailsPage = () => {
  useGSAPAnimations();

  const sliderData = [
    { image: '/21_flash_butt_equipment.jpg' },
    { image: '/18_flash_butt_banner.jpg' },
  ];

  return (
    <div>
      <div className="relative hero-section">
        {/* Mobile Layout */}
        <div className="md:hidden h-screen relative hero-image">
          <Image src="/flashbuttslider.jpeg" alt="Flash butt welding operation" width={1920} height={1080} className="h-full w-full object-cover z-0" loading="eager" priority />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          
          <div className="absolute inset-0 flex items-center justify-start z-20 hero-content">
            <div className="text-left px-6">
              <h1 className="hero-title font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                Flash‑butt welding
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mr-auto rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen hero-image">
          <Image src="/flashbuttslider.jpeg" alt="Flash butt welding operation" width={1920} height={1080} className="h-full w-full object-cover z-0" loading="eager" priority />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center hero-content">
            <div className="px-6 sm:px-8 md:px-12 text-left">
              <h1 className="text-white font-bold leading-[0.95] hero-title">
                Flash‑butt welding
              </h1>
              <p className="text-gray-200 hero-subtitle mt-4 font-medium">
                High‑precision rail‑panel fabrication
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative">
        {/* Top Left Gradient Line */}
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
          <p className="text-black fluid-body">
            Our flash‑butt welding plants deliver factory‑controlled, high‑integrity welded rail panels. Using precision electrical‑resistance welding, each joint is formed without filler, reducing thermal distortion and improving fatigue resistance.
          </p>
        </div>

        {/* Bottom Right Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '864px',
            height: '28px',
            right: '0px',
            bottom: '40px',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <div className="bg-[#F5F4F1] p-8 sm:p-10 md:p-12 rounded-lg shadow-sm">
            <p className="text-[#8A393B] fluid-body font-medium">
              Patil Group operates India's largest flash‑butt welding depots, equipped to weld 20‑rail panels with advanced infrastructure. With mechanized rail‑handling systems, these facilities ensure efficiency, safety, and world‑class precision for Indian Railways.
            </p>
          </div>
        </div>
      </section>

      {/* Locations and Facilities Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 fade-in-section">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <Image 
                src="/flashbutt2.webp" 
                alt="Flash butt welding equipment operation" 
                width={800} 
                height={600} 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
                loading="lazy" 
              />
            </div>
            
            {/* Content */}
            <div className="w-full md:w-1/2">
              <h3 className="text-[#F2913F] fluid-h3 font-bold mb-4">
                Patil Group's welding plants are located in:
              </h3>
              <ul className="space-y-2 text-black fluid-body">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  New Bongaigaon, Assam
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Rangapani, West Bengal
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Text */}
          <div className="mt-8 md:mt-10 fade-in-section">
            <p className="text-black fluid-body">
              These facilities support large-scale panel production and direct dispatch to project sites.
            </p>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative">
        {/* Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '864px',
            height: '28px',
            right: '0px',
            top: '60px',
            background: 'linear-gradient(270deg, #F2913F 0%, #1E3888 50%, #8A393B 100%)'
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h3 className="text-[#F2913F] fluid-h3 font-bold mb-6">
            This system has been integral to:
          </h3>
          
          <ul className="space-y-3 text-black fluid-body">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0"></span>
              Northeast Frontier Railway projects
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0"></span>
              Konkan Railway sections
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0"></span>
              Bridge and tunnel approaches requiring jointless long panels
            </li>
          </ul>
        </div>
      </section>
      
    </div>
  );
};

export default FlashButtWeldingOfRailsPage; 