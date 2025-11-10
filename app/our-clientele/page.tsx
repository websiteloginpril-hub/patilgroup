"use client";
import React from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const logos1 = [
  '/client logos/client 1.png',
  '/client logos/client 2.png',
  '/client logos/client 3.png',
  '/client logos/client 4.png',
  '/client logos/client 5.png',
  '/client logos/client 6.png',
  '/client logos/client 7.png',
  '/client logos/client 8.png',
  '/client logos/client 9.png',
  '/client logos/client 10.png',
  '/client logos/client 11.png',
  '/client logos/client 12.png',
];

const logos2 = [
    '/client logos/client 13.png',
    '/client logos/client 14.png',
    '/client logos/client 15.png',
    '/client logos/client 16.png',
    '/client logos/client 17.png',
    '/client logos/client 18.png',
    '/client logos/client 19.png',
    '/client logos/client 20.png',
    '/client logos/client 21.png',
    '/client logos/client 22.png',
    '/client logos/client 23.png',
];

const OurClientelePage = () => {
  useGSAPAnimations();

  return (
    <div className="bg-black text-white">
      {/* Responsive Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh]">
        <Image
          src="/clientimage.jpg"
          alt="Architectural structure"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
          loading="eager"
          priority
        />
        
        {/* Mobile Layout */}
        <div className="md:hidden absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center px-4 w-full max-w-lg mx-auto">
              <h1 className="text-white font-bold leading-tight hero-title drop-shadow-2xl">
                Our Clientele
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mt-8 rounded-full animate-pulse shadow-lg"></div>
              <p className="text-white fluid-body mt-8 leading-relaxed drop-shadow-xl font-medium">
                Trusted by India's leading organizations
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout - Original */}
        <div className="hidden md:block">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="hero-title font-bold text-white text-center leading-tight px-4">
              Our <br /> Clientele
            </h1>
          </div>
        </div>
      </div>

      {/* Responsive Client Logos Section */}
      <section className="py-12 sm:py-16 md:py-20 fade-in-section">
        {/* Mobile Layout - Grid */}
        <div className="md:hidden px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="fluid-h2 font-bold text-white text-center mb-8">
              Trusted Partners
            </h2>
            
            {/* Enhanced Mobile Grid Layout */}
            <div className="grid grid-cols-2 gap-4 mobile-logo-grid">
              {[...logos1, ...logos2].map((logo, index) => (
                <div key={`mobile-${index}`} className="group">
                  <div className="client-logo-card logo-fade-in h-24 sm:h-28 w-full flex justify-center items-center p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                    <Image 
                      src={logo} 
                      alt={`Client logo ${index + 1}`} 
                      width={120} 
                      height={72} 
                      className="max-h-16 sm:max-h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                      loading="lazy" 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Mobile Summary */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#F2913F] rounded-full animate-pulse"></div>
                  <p className="text-amber-400 font-bold text-lg">{[...logos1, ...logos2].length}+ Partners</p>
                  <div className="w-3 h-3 bg-[#8A393B] rounded-full animate-pulse"></div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  From government organizations to private enterprises, we serve India's most trusted names in infrastructure and railways.
                </p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mt-4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout - Original Marquee */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Row 1: first 12 logos */}
            <div className="overflow-hidden">
              <div className="flex animate-marquee">
                <div className="flex gap-8 flex-none">
                  {logos1.map((logo, index) => (
                    <div key={`row1-a-${index}`} className="flex-none w-44">
                      <div className="h-32 w-full flex justify-center items-center p-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <Image src={logo} alt={`Client logo ${index + 1}`} width={160} height={96} className="max-h-24 w-auto object-contain" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-8 flex-none" aria-hidden="true">
                  {logos1.map((logo, index) => (
                    <div key={`row1-b-${index}`} className="flex-none w-44">
                      <div className="h-32 w-full flex justify-center items-center p-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <Image src={logo} alt="" width={160} height={96} className="max-h-24 w-auto object-contain" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: remaining 11 logos */}
            <div className="overflow-hidden">
              <div className="flex animate-marquee-reverse">
                <div className="flex gap-8 flex-none">
                  {logos2.map((logo, index) => (
                    <div key={`row2-a-${index}`} className="flex-none w-44">
                      <div className="h-32 w-full flex justify-center items-center p-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <Image src={logo} alt={`Client logo ${index + 1}`} width={160} height={96} className="max-h-24 w-auto object-contain" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-8 flex-none" aria-hidden="true">
                  {logos2.map((logo, index) => (
                    <div key={`row2-b-${index}`} className="flex-none w-44">
                      <div className="h-32 w-full flex justify-center items-center p-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <Image src={logo} alt="" width={160} height={96} className="max-h-24 w-auto object-contain" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurClientelePage;
