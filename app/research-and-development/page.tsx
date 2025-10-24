"use client";
import React from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const ResearchAndDevelopmentPage = () => {
  useGSAPAnimations();

  return (
    <div className="bg-white">
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
      <section className="bg-black text-white py-8 sm:py-12 md:py-16 fade-in-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
            Patil Group began operations in 1933 in Gulbarga, a historic and commercially important city in Karnataka, trading in agricultural products—mainly pulses, a key part of the Indian diet. Since then, the Group’s activities have diversified to include:
          </p>
        </div>
      </section>

      

      {/* Alternate Material - CMA */}
      <section className="bg-white text-black py-8 sm:py-12 md:py-16 lg:py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-[#8A393B]">
            Alternate material: CMA
          </h2>
          <div className="mt-4 sm:mt-6 h-px w-full bg-gray-200"></div>

          <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Left column */}
            <div>
              <div className="h-1.5 sm:h-2 w-3/4 bg-gradient-to-r from-[#8A393B] via-[#F2913F] to-transparent rounded-full"></div>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 fluid-body">
                <p>
                  Extensive research by the research and development team led to a composite mineral admixture (CMA), a fly-ash-based product. Fly ash not only reduces cost but also significantly enhances concrete durability.
                </p>
                <p>
                  The sleeper design using CMA has been successfully tested at national laboratories such as the Indian Institutes of Technology (IITs) and the Research Designs and Standards Organisation (RDSO).
                </p>
              </div>
            </div>

            {/* Right column */}
            <div>
              <div className="h-1.5 sm:h-2 w-3/4 ml-auto bg-gradient-to-r from-transparent via-[#F2913F] to-[#8A393B] rounded-full"></div>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 fluid-body">
                <p>
                  CMA has successfully replaced 20% of the cement.
                </p>
                <p>
                  This project was recognized by the Canadian International Development Agency (CIDA) of ICMA, Canada, and is being supported through CANMET (Canada Centre for Mineral and Energy Technology).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stricter Tolerance Track */}
      <section className="bg-white text-black py-8 sm:py-12 md:py-16 lg:py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-[#8A393B]">
            Stricter tolerance track
          </h2>
          <div className="mt-4 sm:mt-6 h-px w-full bg-gray-200"></div>

          <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 fluid-body">
              <p>
              Existing track gauge (Broad Gauge) is 1673 mm, with tolerances of −2 to +3 (1671 mm to 1676 mm). Indian Railways is increasing operating speeds from 110 km/h to 160 km/h and beyond.
              </p>
            
              <p>
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
            <p className="fluid-body">
              A major problem today is rail-foot corrosion, leading to premature rail renewal due to moisture trapped in liners. Our Patil linerless fastening system addresses this issue and has been developed indigenously.
            </p>
          </div>
        </div>
      </section>

      {/* New Design of Concrete Sleeper */}
      <section className="bg-white text-black py-8 sm:py-12 md:py-16 lg:py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-[#8A393B]">
            New design of concrete sleeper
          </h2>
          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 fluid-body">
            <p>
              The Indian Railways concrete sleeper design is about 30 years old. In that time, input materials such as cement, admixtures, and steel have improved significantly, and loading patterns and speeds have changed. In collaboration with the Railway Board, a new sleeper design was developed to meet future challenges. Given that Indian Railways uses millions of sleepers, even small economies yield large savings—one of the key drivers behind this project. With more than 25 years of experience manufacturing concrete sleepers and extensive expertise in high‑tensile steel wire, Patil Group has helped make this project a reality.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Advantages of the New Sleepers Design */}
      <section className="bg-white text-black py-8 sm:py-12 md:py-16 lg:py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="fluid-h2 font-extrabold text-amber-500">
            Technical advantages of the new sleeper design
          </h2>
          <p className="mt-3 sm:mt-4 fluid-body font-semibold text-[#8A393B]">
            Salient features of the new design:
          </p>
          <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 list-disc list-inside fluid-body">
            <li>
              Adoption of M60‑grade concrete, resulting in more durable sleepers with increased lifespan.
            </li>
            <li>
              Increased sleeper base width reduces ballast pressure by about 10%, yielding significant savings in ballast and reduced maintenance effort.
            </li>
            <li>
              As railways move to higher axle‑load wagons, the new design will meet future requirements without needing an alternative sleeper.
            </li>
            <li>
              It envisages the use of one of the most modern strands developed in recent years, putting us on par with international prestressed concrete manufacturers.
            </li>
            <li>
              A special strand with higher UTS reduces steel weight per sleeper by about 25%. Under technical collaboration with Reidelle, we successfully developed the strand. The basic raw material will be produced by SSL as per the specified chemical composition. Other steel manufacturers such as Usha Martin and TISCO also have the capacity to produce it. Our technical team has completed the necessary evaluations. The strand is coded to BSI standards, and IS coding is underway.
            </li>
            <li>
              Reduced ballast pressure (approximately 10%) extends ballast life and decreases maintenance effort.
            </li>
            <li>
              In addition to these benefits, it retains the advantages of the current RDSO RT‑2496 design.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ResearchAndDevelopmentPage;
