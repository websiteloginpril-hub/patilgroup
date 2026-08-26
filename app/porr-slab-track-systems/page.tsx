"use client";
import React from 'react';
import Image from 'next/image';
import ContentSlider from '@/components/ContentSlider';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const PorrSlabTrackSystemsPage = () => {
  useGSAPAnimations();

  return (
    <div>
      <div className="relative">
        {/* Mobile Layout */}
        <div className="md:hidden relative h-screen bg-black flex items-center justify-start hero-section">
          <div className="absolute inset-0 opacity-50 hero-image">
            <Image src="/porr_slap.jpg" alt="PORR Slab Track Systems" fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="relative z-10 p-4 px-6 text-left hero-content">
            <h1 className="hero-title font-bold text-white mb-2 animate-fadeInUp">PORR Slab Track<br />Systems</h1>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative h-screen hero-section">
          <div className="absolute inset-0 hero-image">
            <Image
              src="/porr_slap.jpg"
              alt="PORR Slab Track Systems"
              fill
              className="object-cover object-center z-0"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center text-left hero-content">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
              <h1 className="hero-title font-bold text-white mb-4 animate-fadeInUp">
                PORR Slab <br />Track Systems
              </h1>
            </div>
          </div>

          {/* Bottom Right Logo Overlay (Patil Group Logo + X + PORR Slab Logo) - no background */}
          <div className="absolute bottom-8 right-[8%] md:right-[10%] z-30 flex items-center gap-6 md:gap-8">
            <Image
              src="/pg.png"
              alt="Patil Group Logo"
              width={260}
              height={180}
              className="h-36 sm:h-40 md:h-48 w-auto object-contain drop-shadow-lg"
            />

            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow md:w-9 md:h-9">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>

            <Image
              src="/porr.png"
              alt="PORR Logo"
              width={200}
              height={120}
              className="h-24 sm:h-28 md:h-32 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white py-4 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8A393B] tracking-tight mb-4 md:mb-8 sm:mb-12 fade-in-section">
            Engineered for speed,<br />built for the long run.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start fade-in-section">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-[#4A5568] text-base sm:text-lg leading-relaxed">
              <p>
                The <strong className="font-extrabold text-[#F2913F]">PORR Slab Track System</strong> is a precast modular slab track technology widely used across the world's high-speed and other railway applications. <strong className="font-extrabold text-[#F2913F]">Patil Group </strong>has entered into a strategic, long-term tie-up with <strong className="font-extrabold text-[#F2913F]">PORR, a 150+ year old </strong>Austrian engineering group, to manufacture and install the system in India. Patil group is under license with PORR  for the production and distribution of the said technology.
              </p>

              {/* Mobile-only Carousel - between first and second paragraph */}
              <div className="block md:hidden rounded-xl shadow-xl overflow-hidden min-h-[300px] mt-4 mb-4">
                <ContentSlider
                  slides={[
                    { image: '/Porr (1).jpg' },
                    { image: '/Porr (2).jpg' },
                    { image: '/Porr (3).jpg' },
                    { image: '/Porr (4).jpg' },
                  ]}
                />
              </div>

              <p className="mt-4 md:mt-0">
                The system has been selected for India's prestigious <strong className="font-extrabold text-[#F2913F]">High Speed RRTS </strong>network & is currently deployed on the <strong className="font-extrabold text-[#F2913F]">Delhi-Meerut corridor</strong>.
                It is designed by stitching the <strong className="font-extrabold text-[#F2913F]">precast slab </strong>with <strong className="font-extrabold text-[#F2913F]">self-compacting concrete </strong>with the help of <strong className="font-extrabold text-[#F2913F]">precision spindle hole </strong>arrangement which gives dimensional <strong className="font-extrabold text-[#F2913F]">accuracy & durability </strong>demanded by modern rail networks.
              </p>

              {/* Gradient Bar - Mobile version only, shifted after second paragraph */}
              <div
                className="block md:hidden w-full h-4 sm:h-7 my-4 fade-in-section"
                style={{
                  background: 'linear-gradient(90deg, rgba(255, 245, 235, 1) 0%, rgba(255, 235, 205, 0.9) 10%, rgba(242, 145, 63, 0.6) 25%, #F2913F 40%, #1E3888 65%, #8A393B 100%)'
                }}
              ></div>
            </div>

            {/* Right Column PORR Images Carousel - Desktop only */}
            <div className="hidden md:block lg:col-span-5 rounded-xl shadow-xl overflow-hidden min-h-[380px] md:min-h-[440px] mt-6 lg:-mt-36">
              <ContentSlider
                slides={[
                  { image: '/Porr (1).jpg' },
                  { image: '/Porr (2).jpg' },
                  { image: '/Porr (3).jpg' },
                  { image: '/Porr (4).jpg' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Highlighted Red/Burgundy Banner Section */}
        <div
          className="mt-16 sm:mt-20 py-8 sm:py-10 px-6 sm:px-12 text-white fade-in-section"
          style={{
            background: 'linear-gradient(90deg, #8A393B 0%, #6E2A2C 50%, #8A393B 100%)'
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* 165 km Big Stat */}
            <div className="flex items-baseline shrink-0 md:pr-8 md:border-r md:border-white/30">
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">165</span>
              <span className="text-xl sm:text-2xl font-bold ml-1 text-[#F2913F]">km</span>
            </div>

            {/* Banner Text */}
            <div className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed text-center md:text-left">
              Through the PORR Patil Group partnership, <strong className="font-extrabold text-white">165 km of PORR Slab Track has already been laid across India</strong>, making it one of the largest deployments of semi high-speed slab track technology in the country.
            </div>
          </div>
        </div>

        {/* WHY PORR SLAB TRACK Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
          {/* Section Subtitle */}
          <span className="text-[#F2913F] font-semibold text-xs sm:text-sm tracking-widest uppercase block mb-3 fade-in-section">
            WHY PORR SLAB TRACK
          </span>

          {/* Section Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8A393B] tracking-tight mb-10 sm:mb-14 fade-in-section">
            Built for performance, designed for a long life.
          </h2>

          {/* Mobile Only: Stacking Cards Layout */}
          <div className="block md:hidden stack-container">
            {/* Card 1 */}
            <article className="stack-card">
              <div className="w-12 h-12 flex items-center justify-center"><Image src="/Asset 1.png" alt="Load & stability icon" width={48} height={48} className="object-contain" /></div>
              <h3 className="text-lg font-bold text-[#8A393B]">Load & stability</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Large load-carrying capacity with high resistance to lateral displacement under dynamic loads.</p>
            </article>

            {/* Card 2 */}
            <article className="stack-card">
              <div className="w-12 h-12 flex items-center justify-center"><Image src="/Asset 2.png" alt="Reduced maintenance icon" width={48} height={48} className="object-contain" /></div>
              <h3 className="text-lg font-bold text-[#8A393B]">Reduced maintenance</h3>
              <p className="text-gray-500 text-sm leading-relaxed">A repair concept built into the design keeps whole-life maintenance costs low.</p>
            </article>

            {/* Card 3 */}
            <article className="stack-card">
              <div className="w-12 h-12 flex items-center justify-center"><Image src="/Asset 6.png" alt="Low vibration icon" width={48} height={48} className="object-contain" /></div>
              <h3 className="text-lg font-bold text-[#8A393B]">Low vibration</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Reduces vibration and ground-borne noise — well suited to dense urban corridors.</p>
            </article>

            {/* Card 4 */}
            <article className="stack-card">
              <div className="w-12 h-12 flex items-center justify-center"><Image src="/Asset 3.png" alt="Compact profile icon" width={48} height={48} className="object-contain" /></div>
              <h3 className="text-lg font-bold text-[#8A393B]">Compact profile</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Space-saving design ideal for tunnels and constrained urban environments.</p>
            </article>

            {/* Card 5 */}
            <article className="stack-card">
              <div className="w-12 h-12 flex items-center justify-center"><Image src="/Asset 5.png" alt="Faster installation icon" width={48} height={48} className="object-contain" /></div>
              <h3 className="text-lg font-bold text-[#8A393B]">Faster installation</h3>
              <p className="text-gray-500 text-sm leading-relaxed">High degree of prefabrication and a top-down construction methodology speed up execution.</p>
            </article>

            {/* Card 6 */}
            <article className="stack-card">
              <div className="w-12 h-12 flex items-center justify-center"><Image src="/Asset 4.png" alt="Broad Gauge ready icon" width={48} height={48} className="object-contain" /></div>
              <h3 className="text-lg font-bold text-[#8A393B]">Broad Gauge ready</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Adapted for Indian Broad Gauge Conditions.</p>
            </article>
          </div>

          {/* Desktop Only: Features Grid Box */}
          <div className="hidden md:grid border border-gray-200 rounded-lg overflow-hidden bg-white grid-cols-3 divide-x divide-gray-200 shadow-sm fade-in-section">
            {/* Column 1 */}
            <div className="divide-y divide-gray-200">
              {/* Item 1 */}
              <div className="p-8 sm:p-10 space-y-4 hover:bg-orange-50/20 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src="/Asset 1.png" alt="Load & stability icon" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#8A393B]">Load &amp;amp; stability</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Large load-carrying capacity with high resistance to lateral displacement under dynamic loads.
                </p>
              </div>

              {/* Item 4 */}
              <div className="p-8 sm:p-10 space-y-4 hover:bg-orange-50/20 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src="/Asset 2.png" alt="Reduced maintenance icon" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#8A393B]">Reduced maintenance</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  A repair concept built into the design keeps whole-life maintenance costs low.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="divide-y divide-gray-200">
              {/* Item 2 */}
              <div className="p-8 sm:p-10 space-y-4 hover:bg-orange-50/20 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src="/Asset 6.png" alt="Low vibration icon" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#8A393B]">Low vibration</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Reduces vibration and ground-borne noise well suited to dense urban corridors.
                </p>
              </div>

              {/* Item 5 */}
              <div className="p-8 sm:p-10 space-y-4 hover:bg-orange-50/20 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src="/Asset 3.png" alt="Compact profile icon" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#8A393B]">Compact profile</h3>
                <p className="text-gray-500 text-sm leading-relaxed">

                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="divide-y divide-gray-200">
              {/* Item 3 */}
              <div className="p-8 sm:p-10 space-y-4 hover:bg-orange-50/20 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src="/Asset 5.png" alt="Faster installation icon" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#8A393B]">Faster installation</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  High degree of prefabrication and a top-down construction methodology speed up execution.
                </p>
              </div>

              {/* Item 6 */}
              <div className="p-8 sm:p-10 space-y-4 hover:bg-orange-50/20 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src="/Asset 4.png" alt="Broad Gauge ready icon" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#8A393B]">Broad Gauge ready</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Adapted for Indian Broad Gauge Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PorrSlabTrackSystemsPage;
