"use client";

import React from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { TypingAnimation } from '@/components/TypingAnimation';
import { TiltCard } from '@/components/TiltCard';

const InsertsPage = () => {
  useGSAPAnimations();

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative hero-section">
        {/* Mobile Layout */}
        <div className="md:hidden h-screen relative">
          <Image
            src="/insertshero1.jpg"
            alt="SGCI Inserts, Base Plates, and Other Engineering Castings"
            layout="fill"
            objectFit="cover"
            className="z-0 hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
          
          <div className="relative z-20 h-full flex items-center justify-start hero-content px-6">
            <div className="text-left w-full max-w-2xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-2xl">
                SGCI Inserts, Base Plates <br/>and Other Engineering Castings
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mt-6 rounded-full shadow-lg"></div>
              <p className="text-white text-xl sm:text-2xl mt-6 font-medium drop-shadow-xl leading-relaxed">
                Precision Engineering for Railway Infrastructure
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen">
          <Image
            src="/insertshero1.jpg"
            alt="SGCI Inserts, Base Plates, and Other Engineering Castings"
            layout="fill"
            objectFit="cover"
            className="z-0 hero-image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
          <div className="relative z-20 h-full flex items-center max-w-7xl mx-auto px-8 hero-content">
            <div className="w-2/3">
              <h1 className="text-6xl lg:text-7xl font-bold text-white mt-2">
                SGCI Inserts, Base Plates<br/>and Other Engineering Castings
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Precision Castings Section */}
      <div className="bg-white text-black py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="fade-in-section">
            {/* Section Heading - inline title and subtitle */}
            <div className="text-left mb-6 sm:mb-8 md:mb-10">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="fluid-h2 font-bold text-[#8A393B]">Precision Castings</h2>
                <span className="fluid-h3 font-bold text-[#F2913F] whitespace-nowrap">for Modern Mobility</span>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 fluid-body text-gray-700">
              <p className="text-justify">
                Patil Group manufactures ductile-iron and cast-iron castings on advanced DISA ARPA 450 and ARPA 300 lines. With facilities in Bokaro (23,000 MT) and Hyderabad (13,000 MT), we deliver castings from 1 kg to 40 kg with assured consistency.
              </p>
              <p className="text-justify">
                Both plants hold RDSO and Delhi Metro approvals and are equipped with special-purpose machines and IoT systems, fully aligned with Industry 4.0 standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SGCI Inserts Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="fade-in-section">
            
            {/* Mobile-First Layout */}
            <div className="lg:hidden">
              {/* Mobile Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="fluid-h3 font-bold text-[#8A393B] leading-tight mb-4">
                  SGCI Inserts
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mx-auto mb-4 rounded-full"></div>
                <p className="fluid-body-sm text-gray-700">
                  Patil Group produces SGCI inserts for all sleeper types, with our Bokaro plant housing the country's largest facility, with a capacity of 1.3 million inserts per month.
                </p>
              </div>
              
              {/* Mobile Product Grid */}
              <div className="space-y-8">
                {/* SGCI Insert RT 6901 */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <Image 
                        src="/inserts45.png" 
                        alt="SGCI Insert RT 6901" 
                        width={200} 
                        height={200} 
                        className="object-contain h-32 sm:h-40 w-auto rounded-lg" 
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="fluid-h4 font-bold text-black mb-2">SGCI INSERT</h4>
                      <p className="fluid-body-sm text-gray-600 mb-1">RT 6901</p>
                      <p className="fluid-body-sm font-medium text-[#F2913F]">1.484 kg</p>
                    </div>
                  </div>
                </div>

                {/* SGCI Insert RT 3705 */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <Image 
                        src="/insertss69.png" 
                        alt="SGCI Insert RT 3705" 
                        width={200} 
                        height={200} 
                        className="object-contain h-32 sm:h-40 w-auto rounded-lg" 
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="fluid-h4 font-bold text-black mb-2">SGCI INSERT</h4>
                      <p className="fluid-body-sm text-gray-600 mb-1">RT 3705</p>
                      <p className="fluid-body-sm font-medium text-[#F2913F]">1.97 kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-3 gap-12 items-start">
              {/* Left side - Content */}
              <div className="col-span-1 relative">
                <div className="flex items-center mb-6">
                  <h2 className="fluid-h3 font-bold text-[#8A393B] leading-tight whitespace-nowrap">
                    SGCI Inserts
                  </h2>
                  {/* Inline Gradient Line */}
                  <div className="ml-4 flex-shrink-0 h-7 gradient-line-ltr gradient-line-sm" />
                </div>
                <p className="fluid-body text-gray-700 text-justify">
                  Patil Group produces SGCI inserts for all sleeper types, with our Bokaro plant housing the country's largest facility, with a capacity of 1.3 million inserts per month.
                </p>
              </div>

              {/* Right side - Product Images */}
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-12">
                  {/* SGCI Insert RT 6901 */}
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <Image
                        src="/inserts45.png"
                        alt="SGCI Insert RT 6901"
                        width={300}
                        height={350}
                        className="mx-auto object-contain h-64 w-auto"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="fluid-h4 font-bold text-black">SGCI INSERT</h4>
                      <p className="fluid-body text-black">RT 6901</p>
                      <p className="fluid-body text-black">1.484 kg</p>
                    </div>
                  </div>

                  {/* SGCI Insert RT 3705 */}
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <Image
                        src="/insertss69.png"
                        alt="SGCI Insert RT 3705"
                        width={300}
                        height={350}
                        className="mx-auto object-contain h-64 w-auto"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="fluid-h4 font-bold text-black">SGCI INSERT</h4>
                      <p className="fluid-body text-black">RT 3705</p>
                      <p className="fluid-body text-black">1.97 kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Base Plates Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="fade-in-section">
            
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Mobile Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="fluid-h3 font-bold text-[#8A393B] mb-4">
                  Base Plates
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mx-auto mb-4 rounded-full"></div>
                <p className="fluid-body-sm text-gray-700 mb-6">
                  We manufacture two-hole and four-hole base plates for metro projects, supplying directly to MMRDA and DMRC to support reliable urban transit.
                </p>
              </div>
              
              {/* Mobile Product Card */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-xs">
                    <Image
                      src="/baseplates.png"
                      alt="MMRDA project coated four-hole base plate" 
                      width={300} 
                      height={300}
                      className="w-full h-48 sm:h-56 object-contain rounded-lg" 
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-black mb-2">MMRDA project</h4>
                    <p className="text-base text-gray-600 mb-1">Coated four-hole base plate</p>
                    <p className="text-base font-medium text-[#F2913F]">9.30 kg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Section Header with inline gradient */}
              <div className="flex items-center mb-10">
                <h2 className="fluid-h2 font-bold text-[#8A393B]">Base Plates</h2>
                <div className="ml-4 flex-shrink-0 h-7 gradient-line-ltr gradient-line-md" />
              </div>

              <div className="grid grid-cols-3 gap-12 items-center">
                {/* Left - Description */}
                <div className="col-span-1">
                  <p className="fluid-body text-gray-700 text-justify">
                    We manufacture two-hole and four-hole base plates for metro projects, supplying directly to MMRDA and DMRC to support reliable urban transit.
                  </p>
                </div>

                {/* Center - Product Image */}
                <div className="col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <Image
                      src="/baseplates.png"
                      alt="MMRDA project coated four-hole base plate"
                      width={500}
                      height={500}
                      className="mx-auto object-contain h-72 w-auto"
                    />
                  </div>
                </div>

                {/* Right - Specs */}
                <div className="col-span-1">
                  <div className="space-y-1">
                    <h4 className="fluid-h4 font-bold text-black">MMRDA Project</h4>
                    <p className="fluid-body text-black">Coated 4 hole Base Plate</p>
                    <p className="fluid-body text-black">9.30 kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Railway Braking System Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="fade-in-section">
            
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Mobile Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="fluid-h3 font-bold text-[#8A393B] mb-4">
                  Railway Braking System
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mx-auto mb-4 rounded-full"></div>
                <p className="fluid-body-sm text-gray-700">
                  Our foundries deliver critical castings for railway braking assemblies, including lining holders, double eyes, hinges, levers, connectors, covers, and cylinders—ensuring safety and durability in service.
                </p>
              </div>
              
              {/* Mobile Product Grid */}
              <div className="space-y-6">
                {/* Hinge Component */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/bsytem1.png"
                        alt="DAKO-CZ India Pvt Ltd hinge" 
                        width={150} 
                        height={150} 
                        className="object-contain h-24 sm:h-32 w-auto rounded-lg" 
                      />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <h4 className="fluid-body-sm font-bold text-black mb-1">DAKO-CZ India Pvt Ltd, Hyderabad</h4>
                      <p className="fluid-small text-gray-600 mb-1">Hinge</p>
                      <p className="fluid-small text-gray-600 mb-1">BK 5551</p>
                      <p className="fluid-small font-medium text-[#F2913F]">13.0 kg</p>
                    </div>
                  </div>
                </div>

                {/* Lining Holder Component */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/bsystem2.png"
                        alt="DAKO-CZ India Pvt Ltd lining holder" 
                        width={150} 
                        height={150} 
                        className="object-contain h-24 sm:h-32 w-auto rounded-lg" 
                      />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <h4 className="fluid-body-sm font-bold text-black mb-1">DAKO-CZ India Pvt Ltd, Hyderabad</h4>
                      <p className="fluid-small text-gray-600 mb-1">Lining holder (LH and RH)</p>
                      <p className="fluid-small text-gray-600 mb-1">20270-163 & 20270-164</p>
                      <p className="fluid-small font-medium text-[#F2913F]">8.10 kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Header */}
              <div className="flex items-center mb-6">
                <h2 className="fluid-h2 font-bold text-[#8A393B]">Railway Braking System</h2>
                <div className="ml-4 flex-shrink-0 h-7 gradient-line-ltr gradient-line-md" />
              </div>
              <p className="fluid-body text-gray-700 text-justify mb-8">
                Our foundries deliver critical castings for railway braking assemblies, including lining holders, double eyes, hinges, levers, connectors, covers, and cylinders—ensuring safety and durability in service.
              </p>

              {/* Products row */}
              <div className="grid grid-cols-2 gap-12">
                {/* Left product - Lining Holder */}
                <div>
                  <div className="bg-gray-50 rounded-lg p-6 mb-3">
                    <Image
                      src="/bsystem2.png"
                      alt="DAKO-CZ India Pvt Ltd lining holder"
                      width={360}
                      height={240}
                      className="mx-auto object-contain h-40 w-auto"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="fluid-body-sm font-bold text-black">DAKO-CZ India Pvt Ltd, Hyderabad</h4>
                    <p className="fluid-small text-black">Lining Holder LH & RH</p>
                    <p className="fluid-small text-black">20270-163 & 20270-164</p>
                    <p className="fluid-small text-black">8.10 kg</p>
                  </div>
                </div>

                {/* Right product - Hinge */}
                <div>
                  <div className="bg-gray-50 rounded-lg p-6 mb-3">
                    <Image
                      src="/bsytem1.png"
                      alt="DAKO-CZ India Pvt Ltd hinge"
                      width={360}
                      height={240}
                      className="mx-auto object-contain h-40 w-auto"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="fluid-body-sm font-bold text-black">DAKO-CZ India Pvt Ltd, Hyderabad</h4>
                    <p className="fluid-small text-black">Hinge</p>
                    <p className="fluid-small text-black">BK 5551</p>
                    <p className="fluid-small text-black">13.0 kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Railway Suspension System Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="fade-in-section">
            
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Mobile Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#8A393B] mb-4">
                  Railway Suspension System
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mx-auto mb-4 rounded-full"></div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  We supply precision castings for suspension assemblies, covering eight labyrinth ring types and suspension tubes, engineered for stability and long service life.
                </p>
              </div>
              
              {/* Mobile Product Card */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-xs">
                    <Image
                      src="/suspension.png"
                      alt="Indore Nitriders lining labyrinth ring" 
                      width={250} 
                      height={250} 
                      className="w-full h-48 sm:h-56 object-contain rounded-lg" 
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-base font-bold text-black mb-2">Indore Nitriders; Indore Lining</h4>
                    <p className="text-sm text-gray-600 mb-1">Labyrinth ring (eight different parts)</p>
                    <p className="text-sm text-gray-600 mb-1">1209-01-211-927</p>
                    <p className="text-sm font-medium text-[#F2913F]">10.00 to 30.00 kg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Section Header with inline gradient */}
              <div className="flex items-center mb-6">
                <h2 className="fluid-h2 font-bold text-[#8A393B]">Railway Suspension System</h2>
                <div className="ml-4 flex-shrink-0 h-7 gradient-line-ltr gradient-line-md" />
              </div>

              <div className="grid grid-cols-3 gap-12 items-center">
                {/* Left - Description */}
                <div className="col-span-1">
                  <p className="fluid-body text-gray-700 text-justify">
                    We supply precision castings for suspension assemblies, covering eight labyrinth ring types and suspension tubes, engineered for stability and long service life.
                  </p>
                </div>

                {/* Center - Product Image */}
                <div className="col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <Image
                      src="/suspension.png"
                      alt="Indore Nitriders lining labyrinth ring"
                      width={360}
                      height={360}
                      className="mx-auto object-contain h-48 w-auto"
                    />
                  </div>
                </div>

                {/* Right - Specs */}
                <div className="col-span-1">
                  <div className="space-y-1">
                    <h4 className="fluid-body-sm font-bold text-black">Indore Nitriders; Indore Lining</h4>
                    <p className="fluid-small text-black">Labyrinth ring (8 different parts)</p>
                    <p className="fluid-small text-black">1209-01-211-927</p>
                    <p className="fluid-small text-black">10.00 to 30.00 kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsertsPage;

