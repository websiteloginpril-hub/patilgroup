"use client";

import React, { useState, useEffect } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const LeadershipCard = ({ image, name, post }: { image: string, name: string, post: string }) => (
  <div className="group bg-white text-black transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl will-change-transform">
    <div className="relative h-[200px] sm:h-[220px] md:h-[240px] bg-white overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain object-center transition-transform duration-500 will-change-transform"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
        quality={90}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
    image: '/management/manishsir.jpg',
    name: 'Mr. Manish Ishwarlal Panchal',
    post: 'Executive Director',
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
    image: '/management/avchandrasir.jpg',
    name: 'Mr. A. V. Chandra Gupta',
    post: 'CEO - Growth Centre',
  },
  {
    image: '/management/jawaharsir.jpg',
    name: 'Mr. Jawahar Lal Sinhari',
    post: 'Group CFO',
  },
  {
    image: '/management/bnsajjansir.jpg',
    name: 'Mr. B. N. Sajjan',
    post: 'Executive Director - Corporate Affairs',
  },
  {
    image: '/management/princesir.jpg',
    name: 'Mr. D. Prince',
    post: 'Director - Sleeper Operations',
  },
  {
    image: '/management/arjyakumarsir.jpg',
    name: 'Mr. Arjya Kumar Mishra',
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
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    duration: 20,
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
      <section className="min-h-[calc(100vh-103px)] flex flex-col justify-center py-2 sm:py-3 md:py-4 bg-white text-black" style={{ backgroundColor: '#ffffff' }}>
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Layout - Swipeable Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden" ref={mobileEmblaRef}>
              <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden', perspective: '1000px' }}>
                {leadershipData.map((leader, i) => (
                  <div key={i} className="flex-shrink-0 w-[90%] sm:w-[80%] pl-4 first:pl-6 last:pr-6 will-change-transform" style={{ transform: 'translateZ(0)' }}>
                    <div className="group leadership-card-mobile rounded-2xl border border-gray-300/30 backdrop-blur-sm bg-white overflow-hidden shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl will-change-transform" style={{ backgroundColor: '#ffffff' }}>
                      {/* Full Photo Container */}
                      <div className="relative h-[180px] sm:h-[200px] bg-white overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className="object-contain object-center transition-transform duration-500 will-change-transform"
                          sizes="(max-width: 640px) 90vw, 80vw"
                          priority={i < 3}
                          quality={90}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      </div>
                      
                      {/* Designation and Name Below Photo */}
                      <div className="p-2 sm:p-3 text-center bg-[#8A393B] transition-colors duration-500 ease-out group-hover:bg-[#F2913F]">
                        <p className="text-[10px] sm:text-xs text-white font-bold mb-0.5 transition-colors duration-500 ease-out group-hover:text-black leading-tight">
                          {leader.post}
                        </p>
                        <h3 className="text-[10px] sm:text-xs font-medium text-white leading-tight transition-colors duration-500 ease-out group-hover:text-black">
                          {leader.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="flex justify-center mt-2 sm:mt-3 space-x-2">
              {leadershipData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => mobileEmblaApi && mobileEmblaApi.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'bg-[#F2913F] scale-125' 
                      : 'bg-gray-400 opacity-50 hover:opacity-75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Mobile Swipe Hint */}
            <div className="text-center mt-1.5 sm:mt-2">
              <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
                ← Swipe to explore →
              </p>
            </div>
          </div>
          
          {/* Desktop Layout - Original Carousel */}
          <div className="hidden md:block relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex" style={{ backfaceVisibility: 'hidden', perspective: '1000px' }}>
                {leadershipData.map((leader, i) => (
                  <div key={i} className="flex-grow-0 flex-shrink-0 w-full md:w-1/3 pl-4 sm:pl-6 md:pl-8 will-change-transform" style={{ transform: 'translateZ(0)' }}>
                    <LeadershipCard image={leader.image} name={leader.name} post={leader.post} />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollPrev} 
              disabled={!canScrollPrev}
              className={`absolute top-1/2 -left-16 transform -translate-y-1/2 p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-gray-400/30 ${
                canScrollPrev 
                  ? 'bg-gray-200/80 hover:bg-gray-300/80 active:bg-gray-400/80 hover:scale-105 active:scale-95 cursor-pointer' 
                  : 'bg-gray-100/50 cursor-not-allowed opacity-50'
              }`}
            >
              <ArrowLeft className={`h-6 w-6 ${canScrollPrev ? 'text-[#F2913F]' : 'text-gray-400'}`} />
            </button>
            <button 
              onClick={scrollNext} 
              disabled={!canScrollNext}
              className={`absolute top-1/2 -right-16 transform -translate-y-1/2 p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-gray-400/30 ${
                canScrollNext 
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
