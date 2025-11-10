"use client";
import React from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import IndiaMap from '../../components/IndiaMap';
import HLSVideo from '@/components/HLSVideo';

const OurPresencePage = () => {
  useGSAPAnimations();
  return (
    <div className="bg-white">
      {/* Responsive Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[45vh] overflow-hidden bg-black">
        <HLSVideo
          src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/b8827e1671f7ff0a0f082f98ddd944c4/manifest/video.m3u8"
          fallbackSrc="/lppatil.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          poster="/worldmap.png"
        />
        
        {/* Mobile Layout */}
        <div className="md:hidden absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center px-4">
              <div className="p-8">
                <h1 className="text-white font-bold leading-tight hero-title drop-shadow-2xl">
                  Our Presence
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mt-6 rounded-full animate-pulse"></div>
                <p className="text-gray-200 text-sm mt-4 leading-relaxed drop-shadow-2xl">
                  Nationwide reach across India
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout - Original */}
        <div className="hidden md:block">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12">
            <h1 className="text-white font-bold leading-none hero-title">
              Our Presence
            </h1>
          </div>
        </div>
      </section>
      
      {/* Responsive Map Section */}
      <div className="bg-white">
        {/* Mobile Section Header */}
        <div className="md:hidden px-4 py-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8A393B] mb-4">
            Pan-India Operations
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Our manufacturing facilities and project sites span across multiple states, bringing quality railway infrastructure solutions nationwide.
          </p>
        </div>
        
        {/* Map Container with Legend - Hidden on mobile */}
        <div className="hidden md:block mx-auto py-6 sm:py-8 md:py-10 fade-in-section px-4 md:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start gap-8 max-w-7xl mx-auto">
            {/* Map */}
            <div className="w-full md:flex-1">
              <IndiaMap />
            </div>
            
            {/* Legend */}
            <div className="md:w-80 lg:w-96">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#8A393B] mb-6 text-center">
                  Our Locations
                </h3>
                
                {/* Legend Items */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {[
                    { state: "Telangana", cities: ["Medchal", "Kallakal", "Wadiyaram"], color: "#F2913F" },
                    { state: "Chhattisgarh", cities: ["Kargi"], color: "#F2913F" },
                    { state: "Jharkhand", cities: ["Bokaro"], color: "#F2913F" },
                    { state: "Odisha", cities: ["Kaipadar"], color: "#F2913F" },
                    { state: "West Bengal", cities: ["Anara"], color: "#F2913F" },
                    { state: "Rajasthan", cities: ["Roopangarh"], color: "#F2913F" },
                    { state: "Uttar Pradesh", cities: ["Burhwal"], color: "#F2913F" },
                    { state: "Delhi", cities: ["Delhi"], color: "#F2913F" },
                    { state: "Assam", cities: ["Mirza", "Bongaigaon"], color: "#F2913F" },
                    { state: "Gujarat", cities: ["Udvada"], color: "#F2913F" },
                    { state: "Karnataka", cities: ["Tumkur", "Hubli"], color: "#F2913F" },
                    { state: "Tamil Nadu", cities: ["Tirumangalam"], color: "#F2913F" },
                    { state: "Andhra Pradesh", cities: ["Bobbili", "Kovvur"], color: "#F2913F" },
                    { state: "Bihar", cities: ["Gaya"], color: "#F2913F" },
                    { state: "Haryana", cities: ["Sholaka"], color: "#F2913F" },
                    { state: "Madhya Pradesh", cities: ["Bhopal"], color: "#F2913F" },
                    { state: "Uttarakhand", cities: ["Pathri"], color: "#F2913F" }
                  ].map((location, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div 
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: location.color }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#8A393B] text-base lg:text-lg mb-1">{location.state}</h4>
                        <div className="flex flex-wrap gap-1">
                          {location.cities.map((city, cityIndex) => (
                            <span 
                              key={cityIndex} 
                              className="text-sm bg-[#F2913F]/10 text-[#F2913F] px-3 py-1.5 rounded-full font-medium"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend Statistics */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gradient-to-br from-[#8A393B]/10 to-[#8A393B]/5 rounded-lg p-3">
                      <p className="text-2xl lg:text-3xl font-bold text-[#8A393B]">17</p>
                      <p className="text-sm text-gray-600 font-medium">States</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#F2913F]/10 to-[#F2913F]/5 rounded-lg p-3">
                      <p className="text-2xl lg:text-3xl font-bold text-[#F2913F]">25+</p>
                      <p className="text-sm text-gray-600 font-medium">Locations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Location List */}
        <div className="md:hidden px-4 pb-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#8A393B] mb-6 text-center">
              Our Locations
            </h3>
            
            {/* Mobile Map Image */}
            <div className="mb-8">
              <Image
                src="/ourpresencemapmobile.jpg"
                alt="Our Presence Map - Mobile"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
            
            {/* State-wise location cards */}
            <div className="space-y-3">
              {[
                { state: "Telangana", cities: ["Medchal", "Kallakal", "Wadiyaram"] },
                { state: "Chhattisgarh", cities: ["Kargi"] },
                { state: "Jharkhand", cities: ["Bokaro"] },
                { state: "Odisha", cities: ["Kaipadar"] },
                { state: "West Bengal", cities: ["Anara"] },
                { state: "Rajasthan", cities: ["Roopangarh"] },
                { state: "Uttar Pradesh", cities: ["Burhwal"] },
                { state: "Delhi", cities: ["Delhi"] },
                { state: "Assam", cities: ["Mirza", "Bongaigaon"] },
                { state: "Gujarat", cities: ["Udvada"] },
                { state: "Karnataka", cities: ["Tumkur", "Hubli"] },
                { state: "Tamil Nadu", cities: ["Tirumangalam"] },
                { state: "Andhra Pradesh", cities: ["Bobbili", "Kovvur"] },
                { state: "Bihar", cities: ["Gaya"] },
                { state: "Haryana", cities: ["Sholaka"] },
                { state: "Madhya Pradesh", cities: ["Bhopal"] },
                { state: "Uttarakhand", cities: ["Pathri"] }
              ].filter(location => location.cities.length > 0).map((location, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#8A393B] mb-1">{location.state}</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.cities.map((city, cityIndex) => (
                          <span key={cityIndex} className="text-sm bg-[#F2913F]/10 text-[#F2913F] px-3 py-1.5 rounded-full font-medium">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="w-3 h-3 bg-[#F2913F] rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile Statistics */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-br from-[#8A393B]/10 to-[#F2913F]/10 rounded-2xl p-6 border border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-[#8A393B]">17</p>
                    <p className="text-sm text-gray-600 font-medium">States</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#F2913F]">25+</p>
                    <p className="text-sm text-gray-600 font-medium">Locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPresencePage;
