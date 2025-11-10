"use client";

import React from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const PrecastPage = () => {
  useGSAPAnimations();

  // Product data with images and descriptions
  const products = [
    {
      name: 'U-drains',
      image: '/p2.jpg',
      description: 'Engineered for rapid surface-water management, our U-drains ensure smooth flow and easy maintenance in urban and highway projects. Manufactured using high-strength concrete with integrated reinforcement, these U-shaped drainage channels provide superior hydraulic performance while maintaining structural integrity under heavy traffic loads. Their modular construction allows quick installation and seamless integration with existing drainage networks.'
    },
    {
      name: 'Box Culverts',
      image: '/p1.jpg',
      description: 'Precast box culverts designed for efficient water conveyance and load-bearing performance in rail, road, and drainage applications. Their modular construction ensures rapid installation with minimal site disruption, while advanced reinforcement systems and quality-controlled concrete provide superior durability and watertight joints. Suitable for underpasses, utility corridors, and stormwater systems, these culverts offer a cost-effective solution for modern infrastructure development.'
    },
    {
      name: 'Manhole Chambers',
      image: '/manholechamber.jpg',
      description: 'Factory-finished manhole chambers that enable faster underground utility access with superior structural integrity. Produced under controlled conditions with advanced sealing systems and corrosion-resistant materials, they ensure consistent quality, watertight performance, and resistance to harsh underground environments. Ideal for sewer lines, stormwater drains, telecom, and power networks, providing reliable solutions for modern urban infrastructure.'
    },
    {
      name: 'Beams and Columns',
      image: '/p3.jpg',
      description: 'Precision-molded precast beams and columns that offer high load capacity and faster on-site assembly. Manufactured in controlled factory conditions with high-grade concrete and strategically placed reinforcement, they ensure dimensional accuracy, consistent strength, and a superior surface finish. Designed to withstand heavy loads and dynamic stresses, these components are ideal for bridges, industrial structures, and commercial complexes.'
    },
    {
      name: 'Walls',
      image: '/p4.jpg',
      description: 'Durable and modular precast wall panels suited for boundary, security, and retaining applications. Manufactured with high-strength concrete and advanced reinforcement systems, these panels deliver long-lasting performance, excellent weather resistance, and superior finish. Ideal for industrial perimeters, residential developments, and commercial spaces, providing reliable solutions for safety, privacy, and load-bearing requirements.'
    },
    {
      name: 'Slabs',
      image: '/p5.jpg',
      description: 'Precast floor and roof slabs enabling faster project turnaround with reduced on-site labor dependency. Manufactured under strict quality control with optimized reinforcement layouts and high-performance concrete mixtures, these slabs ensure uniform strength, superior finish, and long-term durability. Suitable for residential, commercial, and industrial structures, providing cost-effective solutions that enhance construction speed and efficiency.'
    },
    {
      name: 'Bus stops',
      image: '/precastbusstop.jpg',
      description: 'Smartly designed precast bus stop units combining strength, aesthetics, and ease of installation. Produced with high-grade concrete and engineered with weather-resistant materials, these units incorporate integrated seating, lighting provisions, and advertisement panels while maintaining structural integrity. Perfect for smart city initiatives, these prefabricated units significantly reduce installation time and maintenance costs.'
    },
    {
      name: 'Toilet blocks',
      image: '/p6.jpg',
      description: 'Portable and hygienic precast toilet blocks tailored for urban, rural, and smart city sanitation projects. These units incorporate advanced ventilation systems, anti-bacterial surface treatments, and water-efficient fixtures to ensure optimal hygiene standards and user comfort. Essential for public facilities, construction sites, and rural development programs, supporting government sanitation initiatives with dignified, accessible facilities.'
    },
    {
      name: 'Noise Barriers',
      image: '/p7.jpg',
      description: 'High-performance acoustic walls engineered to minimize sound pollution near highways and railway corridors. Manufactured with dense, durable precast concrete and advanced acoustic design incorporating specialized surface textures, these barriers effectively absorb and deflect noise while maintaining structural integrity. Critical for urban infrastructure development, balancing transportation efficiency with community welfare.'
    },
    {
      name: 'Road Dividers',
      image: '/roaddividers.jpg',
      description: 'Precast road medians ensuring safer traffic segregation with easy installation and relocation features. Built with high-strength concrete and incorporating crash-tested designs with reflective elements, these dividers enhance road safety while providing clear lane demarcation under all lighting conditions. Essential for urban road networks, expressways, and construction zone management, facilitating traffic flow optimization while maintaining safety standards.'
    },
    {
      name: 'Septic Tanks',
      image: '/p11.jpg',
      description: 'Leak-proof precast septic tanks designed for long service life and minimal maintenance in decentralized sewage systems. Manufactured with high-grade concrete and advanced sewage treatment design, these tanks ensure watertight performance, structural stability, and efficient waste decomposition. Vital for rural communities and areas without centralized sewerage, supporting public health and environmental protection goals.'
    },
    {
      name: 'Road Barriers',
      image: '/p8.jpg',
      description: 'Crash-tested precast barriers that enhance roadside safety and traffic control with minimal site disruption. Engineered to international safety standards with optimized geometric profiles, these barriers absorb impact and redirect vehicles effectively while maintaining structural integrity. Critical for highway safety improvement projects and construction zones, significantly reducing accident severity and property damage.'
    },
    {
      name: 'RE Walls',
      image: '/p9.jpg',
      description: 'Mechanically stabilized precast RE walls enabling faster slope construction with high structural stability. Engineered with precision reinforcement, high-tensile strength strips, and durable concrete panels, these walls provide reliable earth retention for highways, railways, and embankments. Essential for infrastructure projects requiring steep slope stabilization and space-efficient earth retention solutions.'
    },
    {
      name: 'Platform Walls',
      image: '/p10.jpg',
      description: 'Precast platform walls tailored for railway stations, offering uniform finish and long-term durability. Manufactured with precision-moulded concrete and designed with integrated provisions for signage, lighting, and safety equipment, these walls ensure passenger safety while maintaining aesthetic appeal. Critical for modern railway station development, supporting efficient passenger flow and station operations.'
    }
  ];

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <div className="relative hero-section no-mobile-parallax">
        {/* Mobile Layout */}
        <div className="md:hidden h-screen relative">
          <Image
            src="/Precast-Concrete.jpeg"
            alt="Precast Solutions"
            layout="fill"
            objectFit="cover"
            className="z-0 hero-image"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
          
          <div className="relative z-20 h-full flex items-center justify-start px-6 hero-content">
            <div className="text-left px-6 w-full max-w-2xl mx-auto">
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-3 drop-shadow-2xl">
                Precast Solutions
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mt-8 rounded-full shadow-lg"></div>
              <p className="text-white text-xl sm:text-2xl mt-8 font-medium drop-shadow-xl leading-relaxed">
                Built for Speed, Strength,Precision
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen">
          <Image
            src="/Precast-Concrete.jpeg"
            alt="Precast Solutions"
            layout="fill"
            objectFit="cover"
            className="z-0 hero-image"
            priority
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>

          {/* Left aligned content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center hero-content">
            <div className="w-full md:w-1/2 p-8 md:p-16 fade-in-section">
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                Precast
                <br />
                Solutions
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Built for speed, strength, & precision Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="fade-in-section">
            
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Mobile Header */}
              <div className="text-center mb-8">
              <h2 className="fluid-h3 font-bold text-[#8A393B] leading-tight mb-4">
                  Built for
                </h2>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-1.5 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mb-3 rounded-full"></div>
                  <h3 className="fluid-h3 font-bold text-[#F2913F] leading-tight text-center">
                    speed strength precision
                  </h3>
                </div>
              </div>
              
              {/* Mobile Content */}
              <div className="space-y-6 fluid-body text-gray-700 mb-8">
                <p className="text-justify">
                  Patil Group delivers one-stop infrastructure solutions with a daily precast capacity of 3,410 m³. Our portfolio spans diverse products, from culverts and drains to walls, slabs, and modular systems, supporting urban and industrial growth across India.
                </p>
                <p className="text-justify">
                  Driven by scale, diversity, and precision, we continue to expand into new markets while shaping durable foundations for tomorrow.
                </p>
              </div>
              
              {/* Mobile Map */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <Image
                  src="/precastmap.jpg"
                  alt="Precast Manufacturing Map across India"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
                <p className="text-center text-sm text-gray-600 mt-3">
                  Manufacturing locations across India
                </p>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
            
            {/* Left side - Map */}
            <div className="slide-in-left">
            <Image
                src="/precastmap.jpg"
                alt="Precast Manufacturing Map across India"
                width={600}
                height={700}
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
            />
          </div>

            {/* Right side - Content */}
            <div className="slide-in-right">
              <div className="mb-6">
                  <h2 className="fluid-h2 font-bold text-[#8A393B] leading-tight mb-4">
                  Built for
                </h2>
                <div className="flex items-center mb-6">
                  <div 
                    className="mr-4 flex-shrink-0"
                    style={{
                      width: '200px',
                      height: '28px',
                      background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)'
                    }}
                  />
                    <h3 className="fluid-h2 font-bold text-[#F2913F] leading-tight">
                    speed strength precision
                  </h3>
                </div>
              </div>
              
                <div className="space-y-6 fluid-body text-gray-700">
                <p className="text-justify">
                  Patil Group delivers one-stop infrastructure solutions with a daily precast capacity of 3,410 m³. Our portfolio spans diverse products, from culverts and drains to walls, slabs, and modular systems, supporting urban and industrial growth across India.
                </p>
                <p className="text-justify">
                  Driven by scale, diversity, and precision, we continue to expand into new markets while shaping durable foundations for tomorrow.
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Portfolio */}
      <section className="bg-white text-black py-8 sm:py-12 md:py-20 fade-in-section relative">
        {/* Right Edge Gradient Line - Desktop Only */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '864px',
            height: '28px',
            right: '0px',
            top: '100px',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header */}
          <div className="mb-8 sm:mb-10 md:mb-14 text-center lg:text-left">
            <h3 className="fluid-h3 font-bold text-[#8A393B]">Product Portfolio</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mx-auto lg:mx-0 mt-3 rounded-full lg:hidden"></div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {products.map((product, index) => (
              <div key={product.name} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Mobile Card Layout */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0 sm:w-32 sm:h-32">
                      <div className="bg-white rounded-lg p-2 h-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover w-full h-24 sm:h-full"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="fluid-h4 font-semibold text-[#F2913F] mb-2">{product.name}</h4>
                      <p className="fluid-body-sm text-gray-700 line-clamp-3">
                        {product.description.substring(0, 150)}...
                      </p>
                      <div className="h-0.5 w-16 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mt-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block space-y-12">
            {products.map((product, index) => (
              <div key={product.name} className="border-b border-gray-200 pb-8">
                <div className="grid grid-cols-3 gap-8 items-start">
                  {/* Image */}
                  <div className="col-span-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                      width={300}
                      height={200}
                        className="rounded-lg object-cover w-full h-auto"
                    />
                  </div>
            </div>

                  {/* Content */}
                  <div className="col-span-2">
                    <h4 className="fluid-h3 font-semibold text-amber-500 mb-4">{product.name}</h4>
                    <p className="fluid-body text-justify mb-6">
                      {product.description}
                    </p>
                    <div className="h-1.5 w-56 bg-gradient-to-r from-[#8A393B] via-amber-500 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrecastPage;