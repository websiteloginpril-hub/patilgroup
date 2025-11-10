"use client";
import React from 'react';
import Image from 'next/image';
import ContentSlider from '@/components/ContentSlider';
import ExploreSolutions from '@/components/ExploreSolutions';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const PatilRhedaSystemPage = () => {
  useGSAPAnimations();

  const sliderData = [
    { image: '/patil_rheda_image_carousel.png' },
    { image: '/26_mobile_RHEDA_plant.jpg' },
  ];

  return (
    <div>
      <div className="relative">
        {/* Mobile Layout */}
        <div className="md:hidden relative h-screen bg-black flex items-center justify-start hero-section">
          <div className="absolute inset-0 opacity-50 hero-image">
            <Image src="/Rheda hero image.png" alt="Patil RHEDA system" fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="relative z-10 p-4 px-6 text-left hero-content">
            <h1 className="hero-title font-bold text-white mb-2 animate-fadeInUp">Patil RHEDA System</h1>
            <p className="text-gray-200 hero-subtitle animate-fadeInUp animate-delay-200">Advanced track solutions for modern railways.</p>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen hero-section">
          <div className="absolute inset-0 hero-image">
            <Image 
              src="/Rheda hero image.png" 
              alt="Patil RHEDA system" 
              fill
              className="object-cover object-center z-0" 
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center text-left hero-content">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl">
              <h1 className="hero-title font-bold text-white mb-4 animate-fadeInUp">
                Patil RHEDA System
              </h1>
              <p className="text-gray-200 hero-subtitle mt-4 font-medium max-w-2xl">
                Advanced slab-track solution optimized for tunnels and elevated structures
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white">
        {/* Description Section */}
        <section className="bg-white py-6 sm:py-8 md:py-10 relative">
          {/* Top Left Gradient Line */}
          <div 
            className="absolute hidden lg:block fade-in-section gradient-line-ltr gradient-line-lg"
            style={{
              height: '28px',
              left: '0px',
              top: '0px'
            }}
          />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
            <p className="text-black text-lg sm:text-2xl leading-relaxed">
              The Patil RHEDA system is a slab-track solution optimized for tunnels and elevated structures. Developed with inputs from German RHEDA specifications, it provides integrated slab, rail, and fastening control within constrained alignments.
            </p>
          </div>

          {/* Bottom Right Gradient Line */}
          <div 
            className="absolute hidden lg:block fade-in-section gradient-line-rtl gradient-line-lg"
            style={{
              height: '28px',
              right: '0px',
              bottom: '40px'
            }}
          />
        </section>

        {/* System Overview Section */}
        <section className="bg-white py-6 sm:py-8 md:py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
            <div className="bg-[#F5F4F1] p-8 sm:p-10 md:p-12 rounded-lg shadow-sm">
              <p className="text-black fluid-body">
                At Patil Group, the Patil RHEDA system adapts to the unique requirements of every project. Its core design uses modified bi‑block sleepers embedded in a monolithic concrete slab, delivering strength and durability. With highly elastic rail fastenings, it ensures the vertical rail deflection needed for balanced load distribution and smooth, reliable train travel.
              </p>
            </div>
          </div>
        </section>

        {/* Implementation Section */}
        <section className="bg-white py-6 sm:py-8 md:py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 fade-in-section">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <Image 
                  src="/rhedaimagenew.jpg" 
                  alt="RHEDA system tunnel implementation" 
                  width={800} 
                  height={600} 
                  className="rounded-lg shadow-lg w-full h-auto object-cover" 
                  loading="lazy" 
                />
              </div>
              
              {/* Content */}
              <div className="w-full md:w-1/2">
                <h3 className="text-[#8A393B] fluid-h3 font-bold mb-6">
                  Implemented in:
                </h3>
                <ul className="space-y-2 text-black fluid-body">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                    Mumbai Metro (tunnel sections)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                    Chennai Metro (viaduct zones)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                    Katra–Banihal section (tunnel segments in J&K)
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Text */}
            <div className="mt-8 md:mt-10 fade-in-section">
              <p className="text-black fluid-body">
                This system ensures secure placement, minimal settlement, and long-term alignment—even under high dynamic loading and temperature variation.
              </p>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default PatilRhedaSystemPage; 