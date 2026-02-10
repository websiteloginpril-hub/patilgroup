"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const ResearchAndDevelopmentPage = () => {
  useGSAPAnimations();
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);

  return (
    <div className="bg-gray-50">
      <div className="relative hero-section">
        {/* Mobile Layout */}
        <div className="md:hidden relative h-screen bg-black flex items-center justify-center text-center hero-section">
          <div className="absolute inset-0 opacity-50 hero-image">
            <Image src="/rndimage2.JPG" alt="R&D Hero" fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="relative z-10 p-4 hero-content">
            <h1 className="hero-title font-bold text-white mb-4 animate-fadeInUp">Research and Development</h1>
            <p className="text-lg sm:text-xl text-gray-200 animate-fadeInUp animate-delay-200">Driving innovation in railway technology.</p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mt-8 rounded-full shadow-lg"></div>
            <p className="text-white text-xl sm:text-2xl mt-8 font-medium drop-shadow-xl leading-relaxed">
              Innovation & Technology Solutions
            </p>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen hero-section">
          <div className="absolute inset-0 hero-image">
            <Image src="/rndimage2.JPG" alt="R&D Hero" fill className="object-cover z-0" priority sizes="100vw" />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-center z-20 hero-content">
            <h1 className="text-7xl font-bold text-white mb-6 animate-fadeInUp">
              Research and Development
            </h1>
            <p className="text-gray-200 text-xl lg:text-3xl mt-4 font-medium">
              Innovation and technology solutions
            </p>
          </div>
        </div>
      </div>

      {/* Intro text section */}
      <section className="bg-black text-white py-4 sm:py-6 md:py-8 fade-in-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
            Patil Group’s R&D drives engineering-led innovation in materials and process optimisation to deliver reliable, compliant, future-ready infrastructure and railway solutions. Through Patil I-Labs, it advances AI, ML, and IoT for smart rail infrastructure, predictive maintenance, product intelligence, and continuous improvement across all verticals.
          </p>
        </div>
      </section>

      {/* 1. Patil I-Labs: The Intelligence Engine */}
      <section className="bg-gray-100 text-black flex flex-col py-6 sm:py-8 lg:py-10 overflow-hidden fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col w-full">
          {/* Overview: heading (bold black, two lines) + logo placeholder (right) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2 sm:mb-3 shrink-0">
            <div className="text-left">
              <h2 className="fluid-h2 font-extrabold text-[#8A393B] leading-tight">
                Patil I-Labs: The Intelligence Engine of Patil Group
              </h2>
              <p className="mt-0.5 text-lg sm:text-xl md:text-2xl font-bold text-black leading-snug max-w-2xl">
                Intelligent Systems, Smarter Insights.
              </p>
            </div>
            {/* Logo: add patil-ilabs-logo.png to public – original image, no circle */}
            <div className="sm:ml-auto sm:shrink-0 max-w-[140px] sm:max-w-[160px] md:max-w-[180px] flex justify-center">
              <Image src="/patil-ilabs-logo.png" alt="Patil I-Labs" width={180} height={180} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Three-box layout: two text cards on left, insight card on right (same overall height on large screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 sm:gap-5 mb-4 sm:mb-5 items-stretch">
            {/* Top-left card */}
            <div className="border-2 border-[#F2913F] rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 flex flex-col bg-white overflow-visible shadow-sm box-border">
              <br />
              <p className="text-base sm:text-lg text-black leading-snug text-left break-words">
                Patil I-Labs is the dedicated <strong className="text-black">Research & Innovation</strong> arm of <strong className="text-black">Patil Group</strong>, driving intelligent systems, diagnostics, and digital transformation for <strong className="text-black">railways and allied infrastructure sectors</strong>.
              </p>
            </div>
            {/* Insight card: spans both rows on large screens so height matches combined left cards */}
            <div className="border-2 border-[#F2913F] rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 flex flex-col overflow-visible bg-white shadow-sm box-border lg:row-span-2">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-black mb-1 shrink-0 text-left">
                From Monitoring to Intelligent Insights
              </h3>
              <p className="text-sm sm:text-base text-black leading-snug mb-1.5 shrink-0 text-left break-words">
                As rail systems grow faster, heavier, and more complex, performance depends not just on monitoring, but on intelligent insights and decision support systems.
              </p>
              <p className="text-sm sm:text-base text-black leading-snug mb-1 shrink-0 text-left">
                Patil I-Labs enables:
              </p>
              <ul className="space-y-0.5 text-sm sm:text-base text-black leading-snug list-disc list-inside text-left break-words pr-1 pb-0">
                <li><strong className="text-black">Monitoring to intelligent insights</strong>: converting operational data into decisions</li>
                <li><strong className="text-black">Trend analysis and degradation behaviour</strong> across assets and networks</li>
                <li><strong className="text-black">Multi-parameter risk models</strong> instead of single-threshold alarms</li>
                <li><strong className="text-black">Residual Useful Life (RUL)</strong> estimation and asset lifecycle information models</li>
                <li>Predictive and preventive maintenance through <strong className="text-black">frugal intelligence</strong></li>
              </ul>
            </div>
            {/* Bottom-left card */}
            <div className="border-2 border-[#F2913F] rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 flex flex-col bg-white overflow-visible shadow-sm box-border">
              <p className="text-base sm:text-lg text-black leading-snug text-left break-words">
                Built on <strong className="text-black">Patil Group&apos;s decades of leadership</strong> in railway track engineering and manufacturing, Patil I-Labs extends the Group&apos;s capabilities from <strong className="text-black">physical infrastructure to data-driven intelligence</strong>, enabling smarter, safer, and more reliable rail operations.
              </p>
            </div>
          </div>

          {/* Quote and gradient bar - clear gap so bar never overlaps text */}
          <div className="mt-4 sm:mt-5 shrink-0 space-y-4 sm:space-y-5">
            <p className="text-base sm:text-lg md:text-xl font-bold text-black text-center max-w-4xl mx-auto leading-relaxed pb-1">
              This approach shifts rail operations from reactive responses to data-to-decision intelligence.
            </p>
            {/* Full-width gradient bar aligned with container edges (no inner horizontal gap) */}
            <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
              <div
                className="h-4 w-full"
                style={{ background: 'linear-gradient(to right, #8A393B 0%, #4f46e5 45%, #F2913F 75%, #fef3c7 100%)' }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Technology Capabilities - 5 circles with logo placeholders, hover highlights bold text */}
      <section className="bg-gray-50 text-black pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-5 sm:pb-8 md:pb-10 lg:pb-12 fade-in-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Central logo: add core-tech-central.png to public – original image, no circle */}
          <div className="flex justify-center mb-5 sm:mb-6" onMouseEnter={() => setHoveredCircle(0)} onMouseLeave={() => setHoveredCircle(null)}>
            <div className="max-w-[160px] sm:max-w-[200px] flex justify-center cursor-pointer">
              <Image src="/core-technology-capabilities.png" alt="Core Technology Capabilities" width={200} height={200} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Four capability circles (2–5) in 2x2 grid - logo placeholders + descriptions with hover-highlight on bold */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-8 sm:gap-x-16 -mt-2 sm:-mt-3">
            <div
              className="flex flex-col items-center text-center group cursor-pointer"
              onMouseEnter={() => setHoveredCircle(1)}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <div className="mb-3 w-full max-w-[200px] mx-auto flex justify-center">
                <Image src="/core-tech-machine-vision.png" alt="Machine vision systems" width={200} height={200} className="w-full h-auto object-contain" />
              </div>
              <p className="fluid-body text-black leading-relaxed">
                <strong className={`transition-colors duration-200 ${hoveredCircle === 1 ? 'text-[#F2913F]' : 'text-[#8A393B]'}`}>Machine vision systems</strong> for automated inspection of track, rolling stock, and wayside assets
              </p>
            </div>
            <div
              className="flex flex-col items-center text-center group cursor-pointer"
              onMouseEnter={() => setHoveredCircle(2)}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <div className="mb-3 w-full max-w-[200px] mx-auto flex justify-center">
                <Image src="/core-tech-llm-diagnostics.png" alt="LLM-based advanced diagnostics" width={200} height={200} className="w-full h-auto object-contain" />
              </div>
              <p className="fluid-body text-black leading-relaxed">
                <strong className={`transition-colors duration-200 ${hoveredCircle === 2 ? 'text-[#F2913F]' : 'text-[#8A393B]'}`}>LLM-based advanced diagnostics</strong> guiding engineers from alert to resolution
              </p>
            </div>
            <div
              className="flex flex-col items-end text-center group cursor-pointer"
              onMouseEnter={() => setHoveredCircle(3)}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <div className="mb-3 w-full max-w-[200px] flex justify-center mr-6">
                <Image src="/core-tech-iot-ml.png" alt="IoT, AI & ML capacity building" width={200} height={200} className="w-full h-auto object-contain" />
              </div>
              <p className="fluid-body text-black leading-relaxed max-w-[200px] text-center">
                <strong className={`transition-colors duration-200 ${hoveredCircle === 3 ? 'text-[#F2913F]' : 'text-[#8A393B]'}`}>IoT, AI & ML capacity building</strong> for sensing, analytics, and prediction
              </p>
            </div>
            <div
              className="flex flex-col items-start text-center group cursor-pointer"
              onMouseEnter={() => setHoveredCircle(4)}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <div className="mb-3 w-full max-w-[200px] flex justify-center -ml-6">
                <Image src="/core-tech-network-platforms.png" alt="Network-wide, integrated platforms" width={200} height={200} className="w-full h-auto object-contain" />
              </div>
              <p className="fluid-body text-black leading-relaxed max-w-[200px] text-center">
                <strong className={`transition-colors duration-200 ${hoveredCircle === 4 ? 'text-[#F2913F]' : 'text-[#8A393B]'}`}>Network-wide, integrated platforms</strong> delivering asset-level and corridor-level insights
              </p>
            </div>
          </div>

          {/* Bottom concluding box - rounded corners, thick orange border */}
          <div className="mt-5 sm:mt-6 border-2 border-[#F2913F] rounded-lg p-6 sm:p-7 text-center bg-white shadow-sm box-border overflow-visible">
            <p className="fluid-body font-bold text-black leading-relaxed break-words pt-0.5 pb-0.5">
              Where humans alone may not solve complex, multi-variable problems, technology can meaningfully aid decisions, positioning <strong className="text-black">Patil I-Labs</strong> as an intelligent partner of Indian Railways.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Driving Digital Transformation - heading spans both columns; left = two orange-bordered blocks, right = image placeholder (purple border) */}
      <section className="bg-gray-50 text-black pt-5 sm:pt-8 md:pt-10 lg:pt-12 pb-8 sm:pb-12 md:pb-16 lg:pb-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-[#8A393B] mb-4 w-full">Driving Digital Transformation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* Left column: two stacked text blocks, orange border, white bg, black text */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="border-2 border-[#F2913F] rounded-lg p-6 sm:p-7 flex-1 min-h-0 bg-white shadow-sm box-border overflow-visible flex flex-col justify-center">
                <p className="fluid-body text-black leading-relaxed text-justify break-words">
                  Patil I-Labs is accelerating digital transformation in the railway sector—for India and beyond by combining deep railway domain knowledge with IoT, AI, ML, and LLM-driven intelligence.
                </p>
              </div>
              <div className="border-2 border-[#F2913F] rounded-lg p-6 sm:p-7 flex-1 min-h-0 bg-white shadow-sm box-border overflow-visible flex flex-col justify-center">
                <p className="fluid-body text-black leading-relaxed text-justify break-words">
                  The result: safer operations, higher availability, longer asset life, and smarter rail infrastructure at scale.
                </p>
              </div>
            </div>
            {/* Right column: add digital-transformation.png to public folder */}
            <div className="border-2 border-purple-500 rounded-lg bg-gray-100 flex items-center justify-center min-h-[280px] lg:min-h-0 overflow-hidden relative">
              <Image src="/digital-transformation.png" alt="Driving Digital Transformation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Alternate Material - CMA */}
      <section className="bg-gray-50 text-black pt-5 sm:pt-8 md:pt-10 lg:pt-12 pb-8 sm:pb-12 md:pb-16 lg:pb-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-[#8A393B]">
            Alternate material: CMA
          </h2>
          <div className="mt-3 sm:mt-4 h-px w-full bg-gray-200"></div>

          <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Left column */}
            <div>
              <div className="h-1.5 sm:h-2 w-3/4 bg-gradient-to-r from-[#8A393B] via-[#F2913F] to-transparent rounded-full"></div>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 fluid-body text-black leading-relaxed">
                <p className="text-black">
                  Extensive research by the research and development team led to a composite mineral admixture (CMA), a fly-ash-based product. Fly ash not only reduces cost but also significantly enhances concrete durability.
                </p>
                <p className="text-black">
                  The sleeper design using CMA has been successfully tested at national laboratories such as the Indian Institutes of Technology (IITs) and the Research Designs and Standards Organisation (RDSO).
                </p>
              </div>
            </div>

            {/* Right column */}
            <div>
              <div className="h-1.5 sm:h-2 w-3/4 ml-auto bg-gradient-to-r from-transparent via-[#F2913F] to-[#8A393B] rounded-full"></div>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 fluid-body text-black leading-relaxed">
                <p className="text-black">
                  CMA has successfully replaced 20% of the cement.
                </p>
                <p className="text-black">
                  This project was recognized by the Canadian International Development Agency (CIDA) of ICMA, Canada, and is being supported through CANMET (Canada Centre for Mineral and Energy Technology).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stricter Tolerance Track */}
      <section className="bg-gray-100 text-black py-8 sm:py-12 md:py-16 lg:py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-[#8A393B]">
            Stricter tolerance track
          </h2>
          <div className="mt-4 sm:mt-6 h-px w-full bg-gray-200"></div>

          <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 fluid-body text-black leading-relaxed">
              <p className="text-black">
              Existing track gauge (Broad Gauge) is 1673 mm, with tolerances of −2 to +3 (1671 mm to 1676 mm). Indian Railways is increasing operating speeds from 110 km/h to 160 km/h and beyond.
              </p>
            
              <p className="text-black">
              To increase speed, stricter tolerances are mandatory for better control of gauge and other track parameters. PRIL has implemented stricter tolerances of ±1 mm on wider-gauge sleepers—more stringent than European standards—laid on an Indian Railways–nominated section. Tighter parameters and reduced slack gauge decrease sinusoidal vehicle movement, improving ride index and enhancing passenger comfort and safety.
              </p>
            </div>

          <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center">
            <Image
              src="/rnddddddd.png"
              alt="Stricter tolerance track diagram"
              width={800}
              height={600}
              className="rounded-lg shadow-lg w-full max-w-4xl h-auto object-cover"
            />
          </div>

          <div className="mt-8 sm:mt-12 md:mt-16">
            <h3 className="fluid-h3 font-bold text-[#F2913F] mb-4 sm:mb-6">
              Linerless fastening system
            </h3>
            <p className="fluid-body text-black leading-relaxed">
              A major problem today is rail-foot corrosion, leading to premature rail renewal due to moisture trapped in liners. Our Patil linerless fastening system addresses this issue and has been developed indigenously.
            </p>
          </div>
        </div>
      </section>

      {/* New Design of Concrete Sleeper */}
      <section className="bg-gray-50 text-black py-8 sm:py-12 md:py-16 lg:py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-[#8A393B]">
            New design of concrete sleeper
          </h2>
          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 fluid-body text-black leading-relaxed">
            <p className="text-black">
              The Indian Railways concrete sleeper design is about 30 years old. In that time, input materials such as cement, admixtures, and steel have improved significantly, and loading patterns and speeds have changed. In collaboration with the Railway Board, a new sleeper design was developed to meet future challenges. Given that Indian Railways uses millions of sleepers, even small economies yield large savings—one of the key drivers behind this project. With more than 25 years of experience manufacturing concrete sleepers and extensive expertise in high‑tensile steel wire, Patil Group has helped make this project a reality.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Advantages of the New Sleepers Design */}
      <section className="bg-gray-100 text-black py-8 sm:py-12 md:py-16 lg:py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-amber-500">
            Technical advantages of the new sleeper design
          </h2>
          <p className="mt-3 sm:mt-4 fluid-body font-semibold text-[#8A393B]">
            Salient features of the new design:
          </p>
          <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 list-disc list-inside fluid-body text-black leading-relaxed">
            <li className="text-black">
              Adoption of M60‑grade concrete, resulting in more durable sleepers with increased lifespan.
            </li>
            <li className="text-black">
              Increased sleeper base width reduces ballast pressure by about 10%, yielding significant savings in ballast and reduced maintenance effort.
            </li>
            <li className="text-black">
              As railways move to higher axle‑load wagons, the new design will meet future requirements without needing an alternative sleeper.
            </li>
            <li className="text-black">
              It envisages the use of one of the most modern strands developed in recent years, putting us on par with international prestressed concrete manufacturers.
            </li>
            <li className="text-black">
              A special strand with higher UTS reduces steel weight per sleeper by about 25%. Under technical collaboration with Reidelle, we successfully developed the strand. The basic raw material will be produced by SSL as per the specified chemical composition. Other steel manufacturers such as Usha Martin and TISCO also have the capacity to produce it. Our technical team has completed the necessary evaluations. The strand is coded to BSI standards, and IS coding is underway.
            </li>
            <li className="text-black">
              Reduced ballast pressure (approximately 10%) extends ballast life and decreases maintenance effort.
            </li>
            <li className="text-black">
              In addition to these benefits, it retains the advantages of the current RDSO RT‑2496 design.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ResearchAndDevelopmentPage;
