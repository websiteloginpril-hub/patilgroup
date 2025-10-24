"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { TypingAnimation } from '@/components/TypingAnimation';
import HLSVideo from '@/components/HLSVideo';

const SleepersPage = () => {
    useGSAPAnimations();
    
    // State for dropdown sections
    const [expandedSections, setExpandedSections] = useState({
      standard: true,
      bridge: true,
      special: true
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };
  return (
    <div className="bg-white text-black">
      <div className="relative hero-section z-20">
        {/* Mobile Layout */}
        <div className="md:hidden h-screen relative">
          <HLSVideo
            src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/4661ee7a3a9880a0ca020d37a477cc63/manifest/video.m3u8"
            fallbackSrc="/1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 hero-video"
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
          
          <div className="relative z-20 h-full flex items-center justify-start hero-content px-6">
            <div className="text-left max-w-md">
              <div className="p-8">
                <h1 className="hero-title font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                  Concrete Sleepers
                </h1>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] rounded-full shadow-lg"></div>
                <p className="text-white text-sm mt-4 font-medium drop-shadow-2xl">
                  Engineered for durability and performance
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen">
          <HLSVideo
            src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/4661ee7a3a9880a0ca020d37a477cc63/manifest/video.m3u8"
            fallbackSrc="/1.mp4"
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover z-0 hero-video"
            preload="metadata"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          
          {/* Content */}
          <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row h-full z-20 hero-content">
            {/* Left Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
              <div className="text-left">
                <h1 className="hero-title font-bold text-white mt-2">
                  Concrete Sleepers
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-8 sm:py-10 md:py-12 relative z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Mobile Layout */}
            <div className="md:hidden text-center fade-in-section">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                <TypingAnimation
                  text="Patil Group manufactures prestressed concrete sleepers designed for high-load, high-speed rail conditions"
                  showCursor
                  speed={30}
                  className="block fluid-body font-light text-white"
                  cursorColor="#ffffff"
                />
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:flex">
                <div className="w-full md:w-4/5 pr-6 md:pr-10">
                    <TypingAnimation
                        text="Patil Group manufactures prestressed concrete sleepers designed for high-load, high-speed rail conditions"
                        showCursor
                        speed={30}
                        className="block fluid-body font-light text-white fade-in-section"
                        cursorColor="#ffffff"
                    />
                </div>
                <div className="hidden md:block md:w-1/5 border-l border-gray-700/40"></div>
            </div>
        </div>
      </div>

      {/* Composite Sleepers Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header */}
          <div className="mb-8 fade-in-section">
            <h2 className="text-[#8A393B] fluid-h2 font-bold mb-4 leading-tight">Composite Sleepers</h2>
            <h3 className="fluid-h3 font-bold text-[#F2913F] mb-8 leading-tight ml-16 sm:ml-20 md:ml-32 lg:ml-40">Smarter, sustainable track solutions</h3>
          </div>

          {/* Description */}
          <div className="max-w-6xl mx-auto fade-in-section">
            <p className="fluid-body text-gray-700 text-justify">
              We introduced EFG TieTek design composite sleepers to India as a durable, eco-friendly alternative to wood and steel. Made from recyclable materials and tested to AREMA standards, they offer a service life of 60+ years. RDSO-approved and in use on Indian Railways since 2002, our sleepers set new benchmarks in strength, safety, and sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Our Composite Sleeper Range Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative">
        {/* Right Edge Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section gradient-line-rtl gradient-line-lg"
          style={{
            height: '28px',
            right: '0px',
            top: '60px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Range Header */}
          <div className="fade-in-section mb-8">
            <h3 className="fluid-h3 font-bold text-[#8A393B]">
              Our Composite Sleeper Range
            </h3>
          </div>

          {/* Dropdown/Accordion Style Sections */}
          <div className="space-y-4 fade-in-section">
            {/* Standard Composite Sleepers */}
            <div className="bg-[#F5F4F1] rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#F0EDE8] transition-colors duration-200"
                onClick={() => toggleSection('standard')}
              >
                <h4 className="fluid-h3 font-bold text-[#F2913F]">
                  Standard Composite Sleepers
                </h4>
                <svg 
                  className={`w-6 h-6 text-[#F2913F] transition-transform duration-300 ${
                    expandedSections.standard ? '' : 'transform rotate-180'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedSections.standard && (
                <div className="px-6 pb-6">
                  <ul className="space-y-3 text-gray-800 fluid-body">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      Designed as a direct replacement for wooden and steel channel sleepers.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      Manufactured to AREMA standards, with proven installation across global railroads.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      Life span of 40–60 years, resistant to corrosion, fire, moisture, and insect attack.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bridge & Girder Applications */}
            <div className="bg-[#F5F4F1] rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#F0EDE8] transition-colors duration-200"
                onClick={() => toggleSection('bridge')}
              >
                <h4 className="fluid-h3 font-bold text-[#F2913F]">
                  Bridge and Girder Applications
                </h4>
                <svg 
                  className={`w-6 h-6 text-[#F2913F] transition-transform duration-300 ${
                    expandedSections.bridge ? '' : 'transform rotate-180'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedSections.bridge && (
                <div className="px-6 pb-6">
                  <ul className="space-y-3 text-gray-800 fluid-body">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#8A393B] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      Approved by RDSO for use on steel girder bridges in India.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#8A393B] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      Installed successfully across bridges in Northern, Eastern, South Eastern, and North Central Railways since 2002.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Special & Custom Sleepers */}
            <div className="bg-[#F5F4F1] rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#F0EDE8] transition-colors duration-200"
                onClick={() => toggleSection('special')}
              >
                <h4 className="fluid-h3 font-bold text-[#F2913F]">
                  Special and Custom Sleepers
                </h4>
                <svg 
                  className={`w-6 h-6 text-[#F2913F] transition-transform duration-300 ${
                    expandedSections.special ? '' : 'transform rotate-180'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedSections.special && (
                <div className="px-6 pb-6">
                  <ul className="space-y-3 text-gray-800 fluid-body">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      Tailored for ballasted track, open-deck bridges, points and crossings, and level crossings.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#F2913F] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      Flexible for ballastless and slab track systems, including metro applications.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Composite Sleepers Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">


          {/* Why Choose Composite Sleepers */}
          <div className="fade-in-section">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8A393B] mb-8">
                Why Choose Composite Sleepers
              </h3>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Sustainability */}
              <div className="text-center">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2913F] mb-4">
                  Sustainability
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                  100% recyclable, using waste plastics and rubber.
                </p>
              </div>
              
              {/* Performance */}
              <div className="text-center">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2913F] mb-4">
                  Performance
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                  High strength, low life-cycle cost, and superior fatigue resistance.
                </p>
              </div>
              
              {/* Safety */}
              <div className="text-center">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2913F] mb-4">
                  Safety
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Low electrical conductivity, fire resistance, and excellent vibration damping.
                </p>
              </div>
              
              {/* Maintainability - Centered on its own row */}
              <div className="text-center md:col-span-2 lg:col-span-1 lg:col-start-2">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2913F] mb-4">
                  Maintainability
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Easy installation, minimal maintenance, and compatibility with standard fittings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleeper Types Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative">
        {/* Left Edge Gradient Line */}
        <div
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '564px',
            height: '28px',
            left: '0px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />

        {/* Right Edge Gradient Line */}
        <div
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '564px',
            height: '28px',
            right: '0px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-8 fade-in-section">
          <h2 className="text-[#8A393B] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
            Sleeper Types
          </h2>
        </div>
      </section>

      <div className="bg-[#F5F4F1] py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            
            {/* Mobile Layout - Cards with Images */}
            <div className="lg:hidden">
              {/* Mobile Images Section */}
              <div className="flex flex-col items-center space-y-4 mb-8 fade-in-section">
                <div className="slide-in-up">
                  <Image 
                    src="/sleeper1.jpg" 
                    alt="Sleeper Types" 
                    width={600} 
                    height={400} 
                    className="rounded-lg shadow-lg w-full max-w-sm" 
                  />
                </div>
                <div className="slide-in-up" style={{ animationDelay: '100ms' }}>
                  <Image 
                    src="/sleeper2.jpg" 
                    alt="Sleeper Types" 
                    width={600} 
                    height={400} 
                    className="rounded-lg shadow-lg w-full max-w-sm" 
                  />
                </div>
                <div className="slide-in-up" style={{ animationDelay: '200ms' }}>
                  <Image 
                    src="/sleeper3.jpg" 
                    alt="Sleeper Types" 
                    width={600} 
                    height={400} 
                    className="rounded-lg shadow-lg w-full max-w-sm" 
                  />
                </div>
              </div>

              {/* Mobile Technical Data Cards */}
              <div className="space-y-6">
                {[
                  {
                    title: "MAIN TRACK SLEEPERS",
                    subtitle: "TECHNICAL DATA - RT 8746 (WB)",
                    color: "from-[#8A393B] to-[#a0453f]",
                    specs: [
                      { label: "Permissible axle load", value: "25 metric tonnes" },
                      { label: "Maximum speed", value: "100km/h" },
                      { label: "Concrete grade", value: "M60" },
                      { label: "Concrete volume", value: "136237.5 cm3" },
                      { label: "Weight (without rail fastenings)", value: "347 kg" },
                      { label: "Length", value: "2750 mm" },
                      { label: "Width", value: "230 mm" },
                      { label: "Height of sleeper centre", value: "200 mm" }
                    ]
                  },
                  {
                    title: "SWITCH EXPANSION JOINT SLEEPER",
                    subtitle: "TECHNICAL DATA - RT 4149 (SEJ)",
                    color: "from-[#F2913F] to-[#e67e22]",
                    specs: [
                      { label: "Permissible axle load", value: "25 metric tonnes" },
                      { label: "Maximum speed", value: "100km/h" },
                      { label: "Concrete grade", value: "M60" },
                      { label: "Concrete volume", value: "161975 cm3" },
                      { label: "Weight (without rail fastenings)", value: "405 kg" },
                      { label: "Length", value: "2750 mm" },
                      { label: "Width", value: "300 mm" },
                      { label: "Height of sleeper centre", value: "190 mm" }
                    ]
                  },
                  {
                    title: "TURNOUT SLEEPER",
                    subtitle: "TECHNICAL DATA - 1 IN 12",
                    color: "from-gray-700 to-gray-800",
                    specs: [
                      { label: "Permissible axle load", value: "25 metric tonnes" },
                      { label: "Maximum speed", value: "100km/h" },
                      { label: "Concrete grade", value: "M60" },
                      { label: "No of sleepers", value: "96" },
                      { label: "Sleeper RMT", value: "326.29" },
                      { label: "Width", value: "240 mm" },
                      { label: "Sleeper height", value: "230 mm" }
                    ]
                  }
                ].map((sleeper, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden fade-in-section">
                    {/* Card Header */}
                    <div className={`bg-gradient-to-r ${sleeper.color} p-6 text-white`}>
                      <h3 className="text-lg sm:text-xl font-bold mb-1">{sleeper.title}</h3>
                      <p className="text-sm opacity-90">{sleeper.subtitle}</p>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sleeper.specs.map((spec, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-5">
                            <p className="text-sm text-gray-600 mb-1">{spec.label}:</p>
                            <p className="text-sm font-bold text-[#F2913F]">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Layout - Enhanced Table */}
            <div className="hidden lg:block">
              {/* Technical Data Table - Full Width */}
              <div className="overflow-x-auto fade-in-section mb-12">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#8A393B] to-[#a0453f]">
                            <th className="p-6 text-center border-r border-white/20 text-white">
                                <div className="font-bold text-lg mb-2">MAIN TRACK SLEEPERS</div>
                                <div className="text-sm opacity-90 font-medium">TECHNICAL DATA - RT 8746 (WB)</div>
                            </th>
                            <th className="p-6 text-center border-r border-white/20 text-white">
                                <div className="font-bold text-lg mb-2">SWITCH EXPANSION JOINT SLEEPER</div>
                                <div className="text-sm opacity-90 font-medium">TECHNICAL DATA - RT 4149 (SEJ)</div>
                            </th>
                            <th className="p-6 text-center text-white">
                                <div className="font-bold text-lg mb-2">TURNOUT SLEEPER</div>
                                <div className="text-sm opacity-90 font-medium">TECHNICAL DATA - 1 IN 12</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-[#F2913F]">
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Permissible axle load:</span><br />
                                <span className="font-bold text-lg">25 metric tonnes</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Permissible axle load:</span><br />
                                <span className="font-bold text-lg">25 metric tonnes</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-800 text-sm font-bold">Permissible axle load:</span><br />
                                <span className="font-bold text-lg">25 metric tonnes</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 bg-gray-25">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Maximum speed:</span><br />
                                <span className="font-bold text-lg">100km/h</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Maximum speed:</span><br />
                                <span className="font-bold text-lg">100km/h</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Maximum speed:</span><br />
                                <span className="font-bold text-lg">100km/h</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Concrete grade:</span><br />
                                <span className="font-bold text-lg">M60</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Concrete grade:</span><br />
                                <span className="font-bold text-lg">M60</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Concrete grade:</span><br />
                                <span className="font-bold text-lg">M60</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 bg-gray-25">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Concrete volume:</span><br />
                                <span className="font-bold text-lg">136237.5 cm3</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Concrete volume:</span><br />
                                <span className="font-bold text-lg">161975 cm3</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">No of sleepers:</span><br />
                                <span className="font-bold text-lg">96</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Weight (without rail fastenings):</span><br />
                                <span className="font-bold text-lg">347 kg</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Weight (without rail fastenings):</span><br />
                                <span className="font-bold text-lg">405 kg</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Sleeper RMT:</span><br />
                                <span className="font-bold text-lg">326.29</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 bg-gray-25">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Length:</span><br />
                                <span className="font-bold text-lg">2750 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Length:</span><br />
                                <span className="font-bold text-lg">2750 mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Width:</span><br />
                                <span className="font-bold text-lg">240 mm</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Width:</span><br />
                                <span className="font-bold text-lg">230 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Width:</span><br />
                                <span className="font-bold text-lg">300 mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Sleeper height:</span><br />
                                <span className="font-bold text-lg">230 mm</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 bg-gray-25">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Height of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">230 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Height of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">190 mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Height of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">230 mm</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Top Width of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">210 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Top Width of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">300mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Top Width of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">240 mm</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 bg-gray-25">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Bottom Width of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">230 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Bottom Width of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">320 mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Bottom Width of rail-seat centre:</span><br />
                                <span className="font-bold text-lg">260 mm</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Top Width of sleeper centre:</span><br />
                                <span className="font-bold text-lg">180 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Top Width of sleeper centre:</span><br />
                                <span className="font-bold text-lg">300 mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Top Width of sleeper centre:</span><br />
                                <span className="font-bold text-lg">240 mm</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 bg-gray-25">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Width of sleeper centre:</span><br />
                                <span className="font-bold text-lg">230 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Bottom Width of sleeper centre:</span><br />
                                <span className="font-bold text-lg">320 mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Bottom Width of sleeper centre:</span><br />
                                <span className="font-bold text-lg">260 mm</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Height of sleeper centre:</span><br />
                                <span className="font-bold text-lg">200 mm</span>
                            </td>
                            <td className="p-5 border-r border-gray-100 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold">Height of sleeper centre:</span><br />
                                <span className="font-bold text-lg">190 mm</span>
                            </td>
                            <td className="p-5 text-center font-medium">
                                <span className="text-gray-700 text-sm font-bold text-lg">-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
              </div>
              
              {/* Images Section - Below Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-section">
                <div className="slide-in-up">
                  <Image 
                    src="/sleeper1.jpg" 
                    alt="Main Track Sleepers" 
                    width={400} 
                    height={300} 
                    className="rounded-lg shadow-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                  />
                  <p className="text-center mt-3 font-semibold text-gray-700">Main Track Sleepers</p>
                </div>
                <div className="slide-in-up" style={{ animationDelay: '100ms' }}>
                  <Image 
                    src="/sleeper2.jpg" 
                    alt="Switch Expansion Joint Sleeper" 
                    width={400} 
                    height={300} 
                    className="rounded-lg shadow-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                  />
                  <p className="text-center mt-3 font-semibold text-gray-700">Switch Expansion Joint</p>
                </div>
                <div className="slide-in-up" style={{ animationDelay: '200ms' }}>
                  <Image 
                    src="/sleeper3.jpg" 
                    alt="Turnout Sleeper" 
                    width={400} 
                    height={300} 
                    className="rounded-lg shadow-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                  />
                  <p className="text-center mt-3 font-semibold text-gray-700">Turnout Sleeper</p>
                </div>
                <div className="slide-in-up" style={{ animationDelay: '300ms' }}>
                  <Image 
                    src="/composleepers.webp" 
                    alt="Composite Sleepers Installation" 
                    width={400} 
                    height={300} 
                    className="rounded-lg shadow-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                  />
                  <p className="text-center mt-3 font-semibold text-gray-700">Installation View</p>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-8 fade-in-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#8A393B] mb-4">
              Manufactured for
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto rounded-full"></div>
          </div>
          
          {/* Desktop Header */}
          <div className="hidden md:block">
            <h2 className="text-5xl font-bold text-[#8A393B] mb-12 fade-in-section">
              Manufactured for
            </h2>
          </div>

          {/* Mobile Layout - Cards */}
          <div className="md:hidden space-y-4">
            {[
              "Broad Gauge",
              "Metros", 
              "Points and Crossings",
              "Guard Rail",
              "Dual Gauge Systems"
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-[#F2913F] to-[#e67e22] text-white rounded-xl p-6 shadow-lg fade-in-section">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                  <h3 className="text-lg sm:text-xl font-bold">{item}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block space-y-8">
            <div className="grid md:grid-cols-3 gap-8 border-b border-gray-200 pb-8 fade-in-section">
                <p className="text-2xl text-[#F2913F]">Broad Gauge</p>
                <p className="text-2xl text-[#F2913F]">Metros</p>
                <p className="text-2xl text-[#F2913F]">Points and Crossings</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 fade-in-section">
                <p className="text-2xl text-[#F2913F]">Guard Rail</p>
                <p className="text-2xl text-[#F2913F]">Dual Gauge Systems</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Mobile Layout */}
          <div className="md:hidden text-center fade-in-section">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30">
              <div className="h-1 bg-gradient-to-r from-[#8A393B] via-[#1E3888] to-[#F2913F] mb-6 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
                Includes India's first ISO certified composite plant
              </h2>
              <div className="h-1 bg-gradient-to-l from-[#8A393B] via-[#1E3888] to-[#F2913F] rounded-full"></div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:block text-center fade-in-section">
            <div className="h-1 bg-gradient-to-r from-[#8A393B] via-[#1E3888] to-[#F2913F] mb-8"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Includes India's first ISO certified composite plant
            </h2>
            <div className="h-1 bg-gradient-to-l from-[#8A393B] via-[#1E3888] to-[#F2913F]"></div>
          </div>
        </div>
        
        {/* Mass Spring System Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-8 sm:mt-12 md:mt-16">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            <div className="text-center fade-in-section">
              <h3 className="text-3xl sm:text-4xl font-bold text-[#F2913F] mb-4 leading-tight">Mass Spring System</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mb-4 rounded-full"></div>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                Used in slab track to reduce noise and vibration
              </p>
            </div>
            <div className="fade-in-section">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/30">
                <HLSVideo
                  src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/d2d877de47d3c8a142089869b78277c7/manifest/video.m3u8"
                  fallbackSrc="/2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-64 sm:h-80 object-cover"
                  preload="metadata"
                  poster="/12_sleeper_types.jpg"
                />
              </div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h3 className="text-5xl font-bold text-[#F2913F]">Mass Spring System</h3>
              <p className="mt-4 text-xl">Used in slab track to reduce noise and vibration</p>
            </div>
            <div className="slide-in-right">
              <div className="relative rounded-lg overflow-hidden">
                <HLSVideo
                  src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/d2d877de47d3c8a142089869b78277c7/manifest/video.m3u8"
                  fallbackSrc="/2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  preload="metadata"
                  poster="/12_sleeper_types.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Mobile Layout */}
            <div className="md:hidden space-y-8 fade-in-section">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F2913F] leading-tight mb-6">
                  Custom designed for urban zones rail via ducts and elevated metro lines
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                      Functions by isolating vibration at source
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                      Minimizes secondary noise in nearby buildings
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-[#F2913F]/20 to-[#8A393B]/20 rounded-lg border border-[#F2913F]/30">
                  <p className="text-base sm:text-lg font-bold text-[#F2913F]">
                    Executed on elevated corridors of Mumbai Metro
                  </p>
                </div>
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
                <div className="slide-in-left">
                    <h3 className="text-4xl font-bold text-[#F2913F] leading-tight">
                        Custom designed for urban zones<br />
                        rail via ducts and elevated metro lines
                    </h3>
                </div>
                <div className="slide-in-right">
                    <p className="text-lg">
                        Functions by isolating vibration at source<br />
                        Minimizes secondary noise in nearby buildings
                    </p>
                    <p className="mt-8 text-xl font-bold">
                        Executed on elevated corridors of Mumbai Metro
                    </p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default SleepersPage;