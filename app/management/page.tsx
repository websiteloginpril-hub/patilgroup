"use client";

import React, { useState, useEffect } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const getManagementImageClassName = (name: string) =>
  name === 'Mr. Swapan Maite'
    ? 'management-leadership-image management-leadership-image-swapan object-contain object-center'
    : 'management-leadership-image object-contain object-center';

const LeadershipCard = ({ image, name, post }: { image: string, name: string, post: string }) => (
  <div className="group bg-white text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="relative h-[200px] sm:h-[220px] md:h-[240px] bg-white overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <Image
        src={image}
        alt={name}
        fill
        className={getManagementImageClassName(name)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
        quality={90}
        unoptimized={true}
      />
    </div>
    <div className="text-center mt-1.5 sm:mt-2 font-clash px-2 py-1.5 sm:py-2 bg-[#8A393B] transition-colors duration-500 ease-out group-hover:bg-[#F2913F]">
      <p className="font-bold text-[10px] sm:text-xs text-white mb-0.5 transition-colors duration-500 ease-out group-hover:text-black leading-tight">{post}</p>
      <p className="text-[10px] sm:text-xs text-white font-medium transition-colors duration-500 ease-out group-hover:text-black leading-tight">{name}</p>
    </div>
  </div>
);

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
    image: '/management/sawpan maite.png',
    name: 'Mr. Swapan Maite',
    post: 'CEO - fastening systems',
  },
  {
    image: '/management/avchandrasir.jpg',
    name: 'Mr. A. V. Chandra Gupta',
    post: 'CEO - Growth Centre',
  },
  {
    image: '/management/bnsajjansir.jpg',
    name: 'Mr. B. N. Sajjan',
    post: 'Executive Director - Corporate Affairs',
  },
  {
    image: '/management/sujeet.png',
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isMobileMarqueePaused, setIsMobileMarqueePaused] = useState(false);

  // Desktop carousel with smooth animations
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    duration: 25,
    dragFree: false,
    loop: false,
    align: 'start'
  });

  // Mobile carousel with optimized performance
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    duration: 25,
    startIndex: 0,
    slidesToScroll: 1
  });

  const scrollPrev = () => {
    if (emblaApi && canScrollPrev) {
      emblaApi.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (emblaApi && canScrollNext) {
      emblaApi.scrollNext();
    }
  };

  const mobileScrollPrev = () => {
    if (mobileEmblaApi) {
      mobileEmblaApi.scrollPrev();
    }
  };

  const mobileScrollNext = () => {
    if (mobileEmblaApi) {
      mobileEmblaApi.scrollNext();
    }
  };

  const onDesktopSelect = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  const onMobileSelect = () => {
    if (!mobileEmblaApi) return;
    setSelectedIndex(mobileEmblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onDesktopSelect();
    emblaApi.on('select', onDesktopSelect);
    emblaApi.on('reInit', onDesktopSelect);
    return () => {
      emblaApi.off('select', onDesktopSelect);
      emblaApi.off('reInit', onDesktopSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!mobileEmblaApi) return;
    onMobileSelect();
    mobileEmblaApi.on('select', onMobileSelect);
    mobileEmblaApi.on('reInit', onMobileSelect);
    return () => {
      mobileEmblaApi.off('select', onMobileSelect);
      mobileEmblaApi.off('reInit', onMobileSelect);
    };
  }, [mobileEmblaApi]);

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

          {/* Mobile Layout - Auto Circular Marquee (Replaced Swipeable Carousel) */}
          <div className="md:hidden overflow-hidden w-[calc(100%+1rem)] -mx-2 mb-4 pb-4">
            <div
              className="flex w-max animate-marquee"
              style={{ animationPlayState: isMobileMarqueePaused ? 'paused' : 'running' }}
              onMouseEnter={() => setIsMobileMarqueePaused(true)}
              onMouseLeave={() => setIsMobileMarqueePaused(false)}
              onTouchStart={() => setIsMobileMarqueePaused(true)}
              onTouchEnd={() => setIsMobileMarqueePaused(false)}
              onTouchCancel={() => setIsMobileMarqueePaused(false)}
            >
              {/* Duplicated for a seamless circular loop */}
              {[...leadershipData, ...leadershipData].map((leader, i) => (
                <div key={i} className="flex-none px-2 w-[48vw] sm:w-[38vw]">
                  <div className="group w-full h-full flex flex-col rounded-2xl border border-gray-300/30 bg-white overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#ffffff' }}>
                    <div className="relative h-[180px] sm:h-[220px] bg-white overflow-hidden shrink-0" style={{ backgroundColor: '#ffffff' }}>
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className={getManagementImageClassName(leader.name)}
                        sizes="48vw"
                        priority={i < 6}
                        quality={90}
                        unoptimized={true}
                      />
                    </div>
                    <div className="h-[64px] flex flex-col justify-center p-2 text-center bg-[#8A393B] transition-colors duration-500 ease-out group-hover:bg-[#F2913F] shrink-0">
                      <p className="text-[10px] sm:text-[11px] text-white font-bold mb-0.5 transition-colors duration-500 ease-out group-hover:text-black leading-tight">
                        {leader.post}
                      </p>
                      <h3 className="text-[10px] sm:text-[11px] font-medium text-white leading-tight transition-colors duration-500 ease-out group-hover:text-black">
                        {leader.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Original Carousel */}
          <div className="hidden md:block relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {leadershipData.map((leader, i) => (
                  <div key={i} className="flex-grow-0 flex-shrink-0 w-full md:w-1/3 pl-4 sm:pl-6 md:pl-8">
                    <LeadershipCard image={leader.image} name={leader.name} post={leader.post} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`absolute top-1/2 -left-16 transform -translate-y-1/2 p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-gray-400/30 ${canScrollPrev
                ? 'bg-gray-200/80 hover:bg-gray-300/80 active:bg-gray-400/80 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-gray-100/50 cursor-not-allowed opacity-50'
                }`}
            >
              <ArrowLeft className={`h-6 w-6 ${canScrollPrev ? 'text-[#F2913F]' : 'text-gray-400'}`} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`absolute top-1/2 -right-16 transform -translate-y-1/2 p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-gray-400/30 ${canScrollNext
                ? 'bg-gray-200/80 hover:bg-gray-300/80 active:bg-gray-400/80 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-gray-100/50 cursor-not-allowed opacity-50'
                }`}
            >
              <ArrowRight className={`h-6 w-6 ${canScrollNext ? 'text-[#F2913F]' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementPage;
