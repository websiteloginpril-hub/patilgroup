"use client";

import React from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const WiresPage = () => {
  useGSAPAnimations();

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative hero-section z-20">
        {/* Mobile Layout */}
        <div className="md:hidden h-screen relative">
          <Image
            src="/wires123.jpg"
            alt="HTS Wires"
            layout="fill"
            objectFit="cover"
            className="z-0 hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
          
          <div className="relative z-20 h-full flex items-center justify-start hero-content px-6">
            <div className="text-left w-full max-w-lg mx-auto">
              <h1 className="hero-title font-bold text-white leading-tight mb-3 drop-shadow-2xl">
                HTS Wires
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mt-8 rounded-full shadow-lg"></div>
              <p className="text-white text-xl sm:text-2xl mt-8 font-medium drop-shadow-xl leading-relaxed">
                High-tensile steel wires for railway infrastructure
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen">
          <Image
            src="/wires123.jpg"
            alt="HTS Wires"
            layout="fill"
            objectFit="cover"
            className="z-0 hero-image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
          <div className="relative z-20 h-full flex items-center max-w-7xl mx-auto px-8 hero-content">
            <div className="w-1/2">
              <h1 className="hero-title font-bold text-white mt-2">
                HTS<br/>Wires
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Manufacturing Facilities Header Section */}
      <div className="bg-black py-8 sm:py-12 md:py-16 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="text-center fade-in-section">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-[#F2913F]">Manufacturing across</span><br />
              <span className="text-[#8A393B]">three</span> <span className="text-[#F2913F]">facilities.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Manufacturing Facilities Grid Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="fade-in-section">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 text-center">
              
              {/* Bobbili */}
              <div className="lg:border-r border-[#F2913F] lg:pr-8">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8A393B] mb-4">
                  Bobbili
                </h3>
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-600">
                  (Andhra Pradesh)
                </p>
              </div>
              
              {/* Roopangarh */}
              <div className="lg:border-r border-[#F2913F] lg:px-8">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8A393B] mb-4">
                  Roopangarh
                </h3>
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-600">
                  (Rajasthan)
                </p>
              </div>
              
              {/* Bokaro */}
              <div className="lg:pl-8">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8A393B] mb-4">
                  Bokaro
                </h3>
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-600">
                  (Jharkhand)
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* HTS Wires Introduction */}
      <div className="bg-white text-black py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-8 sm:mb-12 md:mb-16 fade-in-section">
            <h2 className="fluid-h2 font-bold mb-6 sm:mb-8">
              <span className="text-[#8A393B]">HTS Wires</span><br />
              <span className="text-[#F2913F] ml-12 sm:ml-20 md:ml-32 lg:ml-40">Strength behind every track</span>
            </h2>
            <p className="fluid-body text-gray-700 text-justify">
              Patil Group is India's largest HTS wire manufacturer for concrete sleepers, producing 3‑ply 3 mm and 7‑ply 9.5 mm strand wires at ISO 9001‑certified plants. With a total capacity of 60,000 MTPA, we are among the largest suppliers of steel wires for ports, tunnels, major bridges, and Indian Railways’ largest single order.
            </p>
          </div>
          
        </div>
      </div>

      {/* Product Types Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative">
        {/* Right Edge Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '664px',
            height: '28px',
            right: '0px',
            top: '70px',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="fade-in-section mb-12">
            <h2 className="fluid-h2 font-bold text-[#8A393B]">
              Product Types
            </h2>
          </div>

          {/* Product Types List */}
          <div className="space-y-8 fade-in-section">
            
            {/* 3 ply × 3 mm HTS stranded wires */}
            <div className="bg-[#F5F4F1] rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F]">
                    3 ply × 3 mm HTS stranded wires
                  </h3>
                </div>
                <div>
                  <p className="fluid-body text-gray-700">
                    as per IS 6006:1983
                  </p>
                </div>
              </div>
            </div>

            {/* 7 ply × 9.5 mm HTS stranded wires */}
            <div className="bg-[#F5F4F1] rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F]">
                    7 ply × 9.5 mm HTS stranded wires
                  </h3>
                </div>
                <div>
                  <p className="fluid-body text-gray-700">
                    as per IS 6006:1983
                  </p>
                </div>
              </div>
            </div>

            {/* 4 mm HT wire (indented) */}
            <div className="bg-[#F5F4F1] rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F]">
                    4 mm HT wire (indented)
                  </h3>
                </div>
                <div>
                  <ul className="space-y-2 fluid-body text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      as per IS 6003:1983
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      stress-relieved, hard drawn
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      used in spun poles and PSCC turnout sleepers
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Manufacturing Section */}
      <div className="bg-white text-black py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left side - Image */}
            <div className="relative slide-in-left">
              <Image 
                src="/wire4321.jpg" 
                alt="High tensile steel wire manufacturing facility" 
                width={600} 
                height={400} 
                className="rounded-lg w-full h-auto shadow-lg" 
              />
            </div>
            
            {/* Right side - Content */}
            <div className="slide-in-right">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#8A393B] mb-6 leading-tight">
                High tensile steel wire products for prestressed concrete applications
              </h3>
              <div className="space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700">
                  Patil Group began production of HTS wire strand in 1996.
                </p>
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                    Products include
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700">
                    3 mm × 3‑ply, 9.5 mm × 7‑ply, and 4 mm PC wire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACSR Section */}
      <div className="bg-[#F5F4F1] text-black py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="fade-in-section">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-[#F2913F]">Aluminum Conductor Steel </span>
              <span className="text-[#8A393B]">Reinforced (ACSR) core wire</span>
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 leading-relaxed">
              Manufactured for electric traction used in 25 kV railway systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WiresPage; 
