"use client";

import React, { useState } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import Image from 'next/image';

/* Photo boxes use aspect-[3/4] to match the portraits' native aspect
   ratio. With matching aspect ratios, object-cover fills the frame
   edge-to-edge with near-zero cropping:
   — no white space at the sides
   — no zoom-in effect
   — no blurred/dark backdrop layers                                 */
const getManagementImageClassName = () =>
  'management-leadership-image object-cover object-top';


const leadershipData = [
  {
    image: '/management/lspatilsir.jpg',
    name: 'Dr. L. S. Patil',
    post: 'Executive Chairman',
  },
  {
    image: '/management/padmajamaam.jpg',
    name: 'Mrs. Padmaja Patil',
    post: 'Director',
  },
  {
    image: '/management/vikashguptasir.jpg',
    name: 'Mr. Vikash Kumar Gupta',
    post: 'Group Director & CEO',
  },
  {
    image: '/management/ajayrajputsir.jpg',
    name: 'Dr. Ajay Rajput',
    post: 'MD - Marketing',
  },
  {
    image: '/management/kaushikghoshsir.jpg',
    name: 'Mr. Kaushik Ghosh',
    post: 'MD - Track Systems',
  },
  {
    image: '/management/amit sir exe.png',
    name: 'Mr. Amit Pathak',
    post: 'CFO',
  },
  {
    image: '/management/swpan.png',
    name: 'Mr. Swapan Maity',
    post: 'CEO - Fastening Systems',
  },
  {
    image: '/management/bnsajjansir.jpg',
    name: 'Mr. B. N. Sajjan',
    post: 'Executive Director - Corporate Affairs',
  },
  {
    image: '/management/sujeet sir.png',
    name: 'Mr. Sujeeth Ramakrishnan',
    post: 'CEO - Wire Business',
  },
  {
    image: '/management/princesir.jpg',
    name: 'Mr. D. Prince',
    post: 'Director - Sleeper Operations',
  },
  {
    image: '/management/Janardhanan Narayanaswamy.jpg',
    name: 'Mr. Janardhanan Narayanaswamy',
    post: 'Group CHRO',
  },
  {
    image: '/management/dvrphanisir.jpg',
    name: 'Mr. DVR Phani Kumar',
    post: 'CEO - Track Systems, Engineering',
  },
  {
    image: '/management/rahulsir.jpg',
    name: 'Mr. Rahul Agarwal',
    post: 'Director - Foundry',
  },
  {
    image: '/management/satishchandrasir.jpg',
    name: 'Mr. Satish Chandra Alya',
    post: 'COO - Track Systems',
  },
  {
    image: '/management/gowrishankarsir.jpg',
    name: 'Mr. Gowri Sankar Lavudi',
    post: 'Vice President - RMBD',
  },
];

const ManagementPage = () => {
  useGSAPAnimations();
  const [isMobileMarqueePaused, setIsMobileMarqueePaused] = useState(false);
  const [isDesktopMarqueePaused, setIsDesktopMarqueePaused] = useState(false);

  const pauseMobileMarquee = () => setIsMobileMarqueePaused(true);
  const resumeMobileMarquee = () => setIsMobileMarqueePaused(false);
  const pauseDesktopMarquee = () => setIsDesktopMarqueePaused(true);
  const resumeDesktopMarquee = () => setIsDesktopMarqueePaused(false);
  const preventImageContextMenu = (event: React.SyntheticEvent) => event.preventDefault();



  return (
    <div className="bg-[#1E1E1E] text-white pt-[103px]">
      {/* Responsive Our Leadership Section */}
      <section className="md:min-h-[calc(100vh-103px)] flex flex-col md:justify-center py-2 sm:py-3 md:py-4 pb-6 md:pb-8 bg-white text-black" style={{ backgroundColor: '#ffffff' }}>
        {/* Legacy in Rail Header - Full Width */}
        <div className="w-screen overflow-hidden mb-2 sm:mb-3 relative">
          {/* Heading with gradient lines from screen edges */}
          <div className="w-full">
            <div className="flex items-center mb-1 sm:mb-2">
              {/* Left gradient from left edge of screen */}
              <div className="flex-1" style={{
                height: '16px',
                background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>

              {/* Heading */}
              <div className="px-4 sm:px-6 flex-shrink-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-clash font-bold text-[#8A393B] leading-tight whitespace-nowrap">
                  Legacy in Rail
                </h2>
              </div>

              {/* Right gradient to right edge of screen */}
              <div className="flex-1" style={{
                height: '16px',
                background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>
            </div>

            {/* Subtitle */}
            <div className="text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F2913F] font-semibold">Led by Experience</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

          {/* Mobile Layout - Auto Circular Marquee
              Uniform card geometry: aspect-[3/4] photo + h-[60px] caption.
              Every card is exactly the same size. */}
          <div
            className="management-mobile-marquee md:hidden overflow-hidden w-[calc(100%+1rem)] -mx-2 mb-4 pb-4"
            onContextMenu={preventImageContextMenu}
          >
            <div
              className="flex w-max animate-marquee"
              style={{ animationPlayState: isMobileMarqueePaused ? 'paused' : 'running' }}
              onPointerEnter={pauseMobileMarquee}
              onPointerLeave={resumeMobileMarquee}
              onPointerDown={pauseMobileMarquee}
              onPointerUp={resumeMobileMarquee}
              onPointerCancel={resumeMobileMarquee}
            >
              {/* Duplicated for a seamless circular loop */}
              {[...leadershipData, ...leadershipData].map((leader, i) => (
                <div key={i} className="flex-none px-2 w-[48vw] sm:w-[38vw]">
                  <div className="group w-full flex flex-col rounded-none border border-gray-200 bg-white overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#ffffff' }}>
                    {/* Photo box matches portrait aspect ratio — image
                        fills fully, no white sides, no visible zoom */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden shrink-0">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className={getManagementImageClassName()}
                        sizes="48vw"
                        priority={i < 6}
                        quality={90}
                        unoptimized={true}
                        draggable={false}
                        onContextMenu={preventImageContextMenu}
                      />
                    </div>
                    {/* Fixed-height caption band: identical on every card.
                        line-clamp-2 keeps long posts (e.g. Sajjan sir's)
                        inside the band instead of growing the card. */}
                    <div className="flex flex-col justify-center py-1.5 px-2 text-center bg-[#F2913F] shrink-0 h-[60px]">
                      <p className="text-[11px] sm:text-xs text-black font-bold mb-0.5 leading-tight line-clamp-2">
                        {leader.post}
                      </p>
                      <h3 className="text-[10px] sm:text-[11px] font-medium text-black leading-tight">
                        {leader.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Auto Scrolling Marquee (same as mobile)
              Uniform card geometry: w-[220/240px] × aspect-[3/4] photo
              + h-[60px] caption. */}
          <div
            className="hidden md:block overflow-hidden w-[calc(100%+2rem)] -mx-4 mb-4 pb-4"
            onContextMenu={preventImageContextMenu}
          >
            <div
              className="flex w-max animate-marquee"
              style={{ animationPlayState: isDesktopMarqueePaused ? 'paused' : 'running' }}
              onPointerEnter={pauseDesktopMarquee}
              onPointerLeave={resumeDesktopMarquee}
              onPointerDown={pauseDesktopMarquee}
              onPointerUp={resumeDesktopMarquee}
              onPointerCancel={resumeDesktopMarquee}
            >
              {[...leadershipData, ...leadershipData].map((leader, i) => (
                <div key={i} className="flex-none px-3 w-[220px] lg:w-[240px]">
                  <div className="group w-full flex flex-col rounded-none border border-gray-200 bg-white overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#ffffff' }}>
                    {/* Photo box matches portrait aspect ratio */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden shrink-0">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className={getManagementImageClassName()}
                        sizes="240px"
                        priority={i < 6}
                        quality={90}
                        unoptimized={true}
                        draggable={false}
                        onContextMenu={preventImageContextMenu}
                      />
                    </div>
                    {/* Fixed-height caption band: identical on every card */}
                    <div className="flex flex-col justify-center py-1.5 px-2 text-center bg-[#F2913F] shrink-0 h-[60px]">
                      <p className="text-xs text-black font-bold mb-0.5 leading-tight line-clamp-2">
                        {leader.post}
                      </p>
                      <h3 className="text-[11px] font-medium text-black leading-tight">
                        {leader.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementPage;