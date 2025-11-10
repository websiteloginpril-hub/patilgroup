"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { TypingAnimation } from '@/components/TypingAnimation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const FastenersPage = () => {
  useGSAPAnimations();

  const [api, setApi] = useState<CarouselApi>();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!api) return;

    const startAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      
      autoPlayRef.current = setInterval(() => {
        if (isAutoPlaying) {
          api.scrollNext();
        }
      }, 4000); // 4 seconds for W clamp images
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [api, isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };
  
  return (
    <div className="bg-white text-black">
      <div className="relative h-screen max-h-screen overflow-hidden hero-section">
        {/* Mobile Layout */}
        <div className="md:hidden h-full relative hero-image">
          <Image
            src="/fastenerheroimage.JPG"
            alt="Fasteners Hero Image"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
          
          <div className="relative z-20 h-full flex items-center justify-center hero-content">
            <div className="text-center px-6 w-full max-w-lg mx-auto">
              <h1 className="hero-title font-bold text-white leading-tight mb-3 drop-shadow-2xl">
                Fasteners
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mt-8 rounded-full shadow-lg"></div>
              <p className="text-white text-xl sm:text-2xl mt-8 font-medium drop-shadow-xl leading-relaxed">
                Critical link between rails and sleepers
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-full hero-image">
          <Image
            src="/fastenerheroimage.JPG"
            alt="Fasteners Hero Image"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          
          {/* Content */}
          <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row h-full z-20 hero-content">
            {/* Left Panel */}
            <div className="w-full md:w-1/3 flex flex-col justify-center p-8 lg:p-12">
              <div className="text-left">
                <h1 className="hero-title font-bold text-white mt-2">
                  Fasteners
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-8 sm:py-10 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex">
                <div className="w-full md:w-4/5 pr-0 md:pr-6 lg:pr-10">
                    <TypingAnimation
                      text="Patil Group has set up global manufacturing facilities under the Make in India initiative, capable of supplying world-class fastening systems for railway infrastructure"
                      showCursor
                      speed={30}
                      className="block fluid-body-sm font-light text-white fade-in-section"
                      cursorColor="#ffffff"
                    />
                </div>
                <div className="hidden md:block md:w-1/5 border-l border-gray-700/40"></div>
            </div>
        </div>
      </div>

             <div className="bg-white py-8 sm:py-12 md:py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
           <div className="mb-8 sm:mb-12 md:mb-16 fade-in-section">
             <p className="fluid-body text-gray-700 text-justify">
               Fasteners are the critical link between rails and sleepers, ensuring safety and performance across diverse track conditions. Patil Group, in collaboration with global leaders in fastening technology, has built proven expertise in designing, manufacturing, and supplying advanced fastening systems for modern rail networks.
             </p>
           </div>
           
           <div className="mb-8 sm:mb-12 md:mb-16 fade-in-section">
             <p className="fluid-body text-gray-700 text-justify">
               Patil Group has over two decades of experience in track fastening systems — beginning with joint ventures and the development of a local vendor base. In 2020, the Group established a dedicated fastening plant, bringing all processes under one roof and adding in-house capabilities in die tool design and heat treatment. Today, Patil Group is the largest fastening supplier for metros and a trusted partner to Indian Railways across multiple zones.
             </p>
           </div>
           
        </div>
      </div>

      {/* For Mainline Ballasted Track Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative">
        {/* Right Edge Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '564px',
            height: '28px',
            right: '0px',
            top: '70px',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="fade-in-section mb-12">
            <h2 className="fluid-h3 font-bold text-[#8A393B] mb-8">
              For Mainline Ballasted Track
            </h2>
          </div>

          {/* Content Grid */}
          <div className="space-y-8 fade-in-section">
            
            {/* Elastic Rail Clips Row */}
            <div className="bg-[#F5F4F1] rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F]">
                    Elastic Rail Clips
                  </h3>
                </div>
                <div>
                  <h4 className="fluid-h4 font-bold text-[#F2913F] mb-4">
                    ERC clips: Mark III & V
                  </h4>
                  <p className="fluid-body-sm text-gray-700">
                    Manufactured in Medchal<br />
                    Approved by RDSO for Indian Railways and freight corridors
                  </p>
                </div>
                <div>
                  <h4 className="fluid-h4 font-bold text-[#F2913F] mb-4">
                    Production Capacity
                  </h4>
                  <p className="fluid-body-sm text-gray-700">
                    Approximately 110,000 units per annum
                  </p>
                </div>
              </div>
            </div>

            {/* GFN Liners Row */}
            <div className="bg-[#F5F4F1] rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F]">
                    GFN Liners
                  </h3>
                </div>
                <div>
                  <p className="fluid-body-sm text-gray-700">
                    GFN liner production<br />
                    84 lakh units per annum<br />
                    RDSO approved
                  </p>
                </div>
                <div>
                  <h4 className="fluid-h4 font-bold text-[#F2913F] mb-4">
                    SKL Series
                  </h4>
                  <p className="fluid-body-sm text-gray-700">
                    - SKL 12<br />
                    - SKL 15<br />
                    - System W 14 HH
                  </p>
                </div>
              </div>
            </div>

            {/* System W 14 HH Row */}
            <div className="bg-[#F5F4F1] rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F]">
                    System W 14<br />HH
                  </h3>
                </div>
                <div>
                  <h4 className="fluid-h4 font-bold text-[#F2913F] mb-4">
                    (Heavy Haul)
                  </h4>
                  <p className="fluid-body-sm text-gray-700">
                    Used in freight and heavy axle routes
                  </p>
                </div>
                <div>
                  <p className="fluid-body-sm text-gray-700">
                    Allows tension clamping and tilt protection<br /><br />
                    Reduces long-term maintenance
                  </p>
                </div>
              </div>
            </div>

            {/* Lab Facilities Row */}
            <div className="bg-[#F5F4F1] rounded-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F]">
                    Lab Facilities
                  </h3>
                </div>
                <div>
                  <p className="fluid-body-sm text-gray-700">
                    - World-class labs<br />
                    - Fatigue testing machines<br />
                    - GOM Scanner<br />
                    - Salt spray testing machine<br />
                    - UTM
                  </p>
                </div>
                <div>
                  <p className="fluid-body-sm text-gray-700">
                    As per STR (Schedule of Technical Requirements) of RDSO. These testing machines are not available anywhere else in India.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* For Mainline Ballastless Track Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative">
        {/* Left and Right Edge Gradients */}
        <div
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '264px',
            height: '28px',
            left: '0px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />

        <div
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '264px',
            height: '28px',
            right: '0px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-8 fade-in-section">
          <h2 className="text-[#8A393B] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-3">
            For Mainline Ballastless Track
          </h2>
        </div>
      </section>

      <div className="bg-[#F5F4F1] py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-12">
            
            {/* System 300 */}
            <div className="bg-white rounded-lg p-8 lg:p-10 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <Image 
                      src="/fs300.jpg" 
                      alt="System 300" 
                      width={400} 
                      height={300} 
                      className="rounded-lg object-cover w-full h-64" 
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-[#F2913F] text-white px-4 py-2 rounded font-bold">
                        FS 300
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Maximum axle load (up to)</span>
                      <span className="text-[#F2913F] font-bold text-lg">22.5 tonnes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Maximum speed (up to)</span>
                      <span className="text-[#F2913F] font-bold text-lg">300 km/h</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Toe Load (per clip)</span>
                      <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Insulation</span>
                      <span className="text-[#F2913F] font-bold text-lg">2.5 KΩ</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Static stiffness of pad</span>
                      <span className="text-[#F2913F] font-bold text-lg">22.5 kN/mm</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Longitudinal restraint (as per EN 13146)</span>
                      <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                    </div>
                    <div className="pt-4">
                      <p className="text-gray-700 text-lg">Pre-assembled system suitable for all slab-track installations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System DB 336 */}
            <div className="bg-white rounded-lg p-8 lg:p-10 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <div className="relative">
                    <Image 
                      src="/fs336.jpg" 
                      alt="System DB 336" 
                      width={400} 
                      height={300} 
                      className="rounded-lg object-cover w-full h-64" 
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-[#F2913F] text-white px-4 py-2 rounded font-bold">
                        FS 336
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Maximum axle load (up to)</span>
                      <span className="text-[#F2913F] font-bold text-lg">22.5 tonnes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Maximum speed (up to)</span>
                      <span className="text-[#F2913F] font-bold text-lg">300 km/h</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Toe Load (per clip)</span>
                      <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Insulation</span>
                      <span className="text-[#F2913F] font-bold text-lg">2.5 KΩ</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Static stiffness of pad</span>
                      <span className="text-[#F2913F] font-bold text-lg">22.5 kN/mm</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-700 text-lg">Longitudinal restraint (as per EN 13146)</span>
                      <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                    </div>
                    <div className="pt-4">
                      <p className="text-gray-700 text-lg">Optimized for vibration and noise reduction.<br />Ideal for urban rail and steel structure tracks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* W Clamp Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#8A393B] mb-6 sm:mb-8 md:mb-12 fade-in-section">
            W Clamp
          </h2>

          {/* Introduction with Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            {/* Left: Introduction Text */}
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed text-justify fade-in-section">
              <p>
                The W clamp is a resilient fastening component used in railway tracks.
              </p>
              <p>
                It ensures secure retention of rails to sleepers—maintaining track stability under dynamic loads.
              </p>
              <p>
                Its design allows controlled flexibility, reducing vibration and stress on the fastening system.
              </p>
              <p>
                Patil Group manufactures W clamps using precision engineering and tested spring steel—built for long service life, safety, and performance across diverse track conditions.
              </p>
            </div>

            {/* Right: W Clamp Images Carousel */}
            <div className="fade-in-section">
              <div className="w-full h-80 sm:h-96 lg:h-[28rem]">
                <Carousel
                  setApi={setApi}
                  opts={{ align: "start", loop: true }}
                  className="w-full h-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <CarouselContent className="h-full">
                    <CarouselItem className="h-full">
                      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src="/skl12.jpg"
                          alt="System 336 Assembly (SKL 12 Clamp)"
                          width={600}
                          height={450}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem className="h-full">
                      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src="/skl14.jpg"
                          alt="W 14 Assembly (SKL 14 Clamp)"
                          width={600}
                          height={450}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white/90 hover:bg-white text-gray-700 hover:text-[#F2913F] transition-colors duration-300" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F2913F] text-white hover:bg-[#D97706] transition-colors duration-300" />
                </Carousel>
              </div>
            </div>
          </div>

          {/* W Clamp Specifications - Side by Side Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 fade-in-section">
            {/* System 336 Assembly (SKL 12 Clamp) */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F2913F] mb-6 text-center">
                System 336 Assembly (SKL 12 Clamp)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Maximum axle load (up to)</span>
                  <span className="text-[#F2913F] font-bold text-lg">18 tonnes</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Maximum speed (up to)</span>
                  <span className="text-[#F2913F] font-bold text-lg">110 km/h</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Curve radius (minimum)</span>
                  <span className="text-[#F2913F] font-bold text-lg">120 m</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Toe Load (per clip)</span>
                  <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Insulation</span>
                  <span className="text-[#F2913F] font-bold text-lg">≥ 5 kΩ</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Static stiffness of pad</span>
                  <span className="text-[#F2913F] font-bold text-lg">22.5 kN/mm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Longitudinal rail restraint (as per EN 13146)</span>
                  <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                </div>
              </div>
            </div>

            {/* W 14 Assembly (SKL 14 Clamp) */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F2913F] mb-6 text-center">
                W 14 Assembly (SKL 14 Clamp)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Maximum axle load (up to)</span>
                  <span className="text-[#F2913F] font-bold text-lg">22 tonnes</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Maximum speed (up to)</span>
                  <span className="text-[#F2913F] font-bold text-lg">200 km/h</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Curve radius (minimum)</span>
                  <span className="text-[#F2913F] font-bold text-lg">175 m</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Toe Load (per clip)</span>
                  <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Insulation</span>
                  <span className="text-[#F2913F] font-bold text-lg">≥ 5 kΩ</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-700">Static stiffness of pad</span>
                  <span className="text-[#F2913F] font-bold text-lg">100 kN/mm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Longitudinal restraint (as per EN 13146)</span>
                  <span className="text-[#F2913F] font-bold text-lg">9 kN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fatigue Testing Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#8A393B] mb-6 sm:mb-8 md:mb-12 fade-in-section">
            Fatigue Testing
          </h2>
          
          <div className="mb-8 sm:mb-12 md:mb-16 fade-in-section">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Our laboratories are equipped with world-class facilities including India's first fatigue testing machine for railway fastening systems. It simulates real track conditions and subjects components to millions of load cycles, with five million cycles equating to more than ten years of service life in the lab. Earlier, such advanced testing was available only in Europe — this capability now sets a new benchmark for safety and reliability in India.
            </p>
          </div>
          
          <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center fade-in-section">
            <Image
              src="/fatigue.jpg"
              alt="Fatigue Testing Equipment"
              width={800}
              height={600}
              className="rounded-lg shadow-lg w-full max-w-4xl h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastenersPage;
