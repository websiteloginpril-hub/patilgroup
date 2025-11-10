'use client';

import { useState, useEffect, useRef } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import Image from 'next/image';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import SwitchingText from '@/components/SwitchingText';
import HLSVideo from '@/components/HLSVideo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    city: "Bangalore Metro",
    image: "/bangalore metro.png",
    link: "/projects"
  },
  {
    city: "Delhi Phase III",
    image: "/delhi metro.png",
    link: "/projects"
  },
  {
    city: "Nagpur Metro",
    image: "/nagpurmetrohero.png",
    link: "/projects"
  },
  {
    city: "Mumbai Line 7B",
    image: "/mumbai metro.png",
    link: "/projects"
  },
  {
    city: "Kolkata Stretch",
    image: "/kolkata metro.png",
    link: "/projects"
  },
    {
    city: "Ahmedabad Phase II",
    image: "/ahemdabad metro.png",
    link: "/projects"
  },
];

const StatCounter = ({ end, duration, suffix = '', prefix = '' }: { end: number; duration: number; suffix?: string; prefix?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">
      {inView ? <CountUp end={end} duration={duration} separator="," suffix={suffix} prefix={prefix} /> : '0'}
    </div>
  );
};

const NewsCard = ({ date, title, delay }: { date: string; title: string; delay: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 will-change-transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div 
        className={`mb-4 transition-all duration-600 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionDelay: inView ? `${delay + 100}ms` : '0ms',
        }}
      >
        <span className="text-[#8A393B] font-semibold text-base sm:text-lg">{date}</span>
      </div>
      <h3 
        className={`text-gray-900 font-medium text-sm sm:text-base mb-6 leading-relaxed transition-all duration-600 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionDelay: inView ? `${delay + 200}ms` : '0ms',
        }}
      >
        {title}
      </h3>
      <a 
        href="/news" 
        className={`group inline-flex items-center text-[#F2913F] hover:text-[#D97706] font-medium text-sm sm:text-base transition-all duration-600 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionDelay: inView ? `${delay + 300}ms` : '0ms',
        }}
      >
        <span className="relative">
          Read More
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2913F] transition-all duration-300 ease-out group-hover:w-full"></span>
        </span>
        <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
};

const GradientLine = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div 
      ref={ref}
      className="absolute right-0 h-7 will-change-transform overflow-hidden"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        left: 'calc(max(50% - 640px + 350px, 350px))',
      }}
    >
      <div 
        className={`h-full gradient-line-rtl gradient-line-md transition-all duration-1000 ease-out ${
          inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{
          transformOrigin: 'right',
          height: '100%',
        }}
      />
    </div>
  );
};

const OurProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="bg-white py-16 sm:py-24 our-projects-carousel">
      {/* Centered Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex justify-between items-center mb-10 transition-all duration-800 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#8A393B]">Our Projects</h2>
          {/* Buttons are part of the Carousel now, so this div is removed */}
        </div>
      </div>
      
      {/* Full-bleed Carousel */}
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 px-2.5">
          {projects.map((project, index) => (
            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 project-card">
              <div className="group">
                <div className="overflow-hidden rounded-2xl mb-5 shadow-lg transform transition-transform duration-300 group-hover:-translate-y-2">
                  <Image
                    src={project.image}
                    alt={project.city}
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{project.city}</h3>
                <Link href={project.link} className="text-base font-medium text-gray-600 hover:text-[#F2913F] transition-colors">
                  View Project
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-0 right-0 max-w-7xl mx-auto w-full h-full pointer-events-none">
            <div className="hidden sm:flex items-center gap-1 absolute top-[-4.5rem] right-4 sm:right-6 lg:right-8">
                <CarouselPrevious className="w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition-colors pointer-events-auto" />
                <CarouselNext className="w-12 h-12 rounded-full bg-[#F2913F] text-white hover:bg-[#D97706] transition-colors pointer-events-auto" />
            </div>
        </div>
      </Carousel>
    </section>
  );
};

// Nationwide Presence Section Component
const NationwidePresenceSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="relative pt-36 pb-20 sm:pt-40 sm:pb-24 md:pt-48 md:pb-28 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HLSVideo
          src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/b8827e1671f7ff0a0f082f98ddd944c4/manifest/video.m3u8"
          fallbackSrc="/lppatil.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload="metadata"
        />
        {/* Add a dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main Heading */}
        <h2 
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white px-4 transition-all duration-800 will-change-transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #F2913F, #ffcba4, #F2913F)',
            }}
          >
            Nationwide Presence.
          </span>
        </h2>
        
        {/* Gradient Line */}
        <div
          className={`h-1 w-60 sm:w-80 mx-auto mb-6 transition-all duration-700 will-change-transform ${
            inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, #F2913F 0%, #1E3888 50%, #8A393B 100%)',
            transitionDelay: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center',
          }}
        />
        
        {/* Subtitle */}
        <p 
          className={`text-xl sm:text-2xl md:text-3xl text-gray-200 font-medium mb-4 transition-all duration-700 will-change-transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          From city metros to national corridors
        </p>
        
        {/* Description */}
        <p 
          className={`text-sm sm:text-base md:text-lg text-gray-300 max-w-lg mx-auto leading-relaxed transition-all duration-700 will-change-transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '900ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Our products run across India.
          <br />
          We support both new and upgrade projects at every scale.
        </p>
      </div>
    </section>
  );
};

export default function Home() {
  useGSAPAnimations();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showText, setShowText] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Play video once on mount
    videoRef.current.play().catch(() => {
      // ignore; autoplay might be blocked on some platforms
    });

    const handleLoadedMetadata = () => {
      setVideoDuration(videoRef.current?.duration ?? null);
    };

    const handleTimeUpdate = () => {
      const current = videoRef.current?.currentTime ?? 0;
      const duration = videoDuration ?? videoRef.current?.duration ?? 0;
      // Start text just before the video finishes to avoid any post-end lag
      if (!showText && duration > 0 && current >= Math.max(0, duration - 1)) {
        setShowText(true);
      }
    };

    const handleEnded = () => setShowText(true);

    videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    videoRef.current.addEventListener('ended', handleEnded);

    return () => {
      videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      videoRef.current?.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div>
      {/* Hero Section - Compact to content */}
      <section className="relative h-screen overflow-hidden bg-black hero-section">
        {/* Video Background */}
          <div className="absolute inset-0 w-full h-full hero-video">
          <video
            ref={videoRef}
            src="/heronewvideo.mp4"
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="auto"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content Overlay - Compact spacing */}
        <div className={`relative z-10 flex h-full flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 hero-content`}>
          {/* Main Heading - First Animation */}
          <h1 className={`mb-6 transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-white text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-1">
              WORLD’S
            </div>
            <div className="text-[#F2913F] text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-1">
              LARGEST SLEEPER
            </div>
            <div className="text-white text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              MANUFACTURER
            </div>
            {/* Stats removed as requested */}
          </h1>

          {/* Stats Section - Second Animation (after 800ms) */}
          <div 
            className={`grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-5 md:mb-6 max-w-4xl w-full transition-all duration-1000`}
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: showText ? '800ms' : '0ms',
            }}
          >
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <div className="text-white text-xl sm:text-3xl md:text-4xl font-bold mb-1">
                {showText ? <CountUp end={50} duration={2} suffix="+" delay={0.8} /> : '0+'}
              </div>
              <div className="text-[#F2913F] text-base sm:text-lg font-medium">years on the job</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <div className="text-white text-xl sm:text-3xl md:text-4xl font-bold mb-1">
                {showText ? <CountUp end={400000} duration={2} separator="," suffix="+" delay={0.8} /> : '0+'}
              </div>
              <div className="text-[#F2913F] text-base sm:text-lg font-medium">Safe Sleepers per year</div>
            </div>
          </div>

          {/* Tagline - Third Animation (after 1600ms) */}
          <div 
            className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight pb-2 sm:pb-3 md:pb-4 transition-all duration-1000`}
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: showText ? '1600ms' : '0ms',
            }}
          >
            <span className="text-[#F2913F]">One enduring</span>{' '}
            <span className="text-white">standard of quality.</span>
          </div>
        </div>
      </section>

      {/* Recent News and Updates Section */}
      <section className="bg-[#F5F4F1] py-8 sm:py-10 md:py-12 will-change-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1 */}
            <NewsCard 
              date="Delivered at scale"
              title="Sleepers supplied for new Pune Metro Corridor"
              delay={0}
            />

            {/* Card 2 */}
            <NewsCard 
              date="Built for long life"
              title="Partnered on Mumbai-Ahmedabad bullet train trial track"
              delay={150}
            />

            {/* Card 3 */}
            <NewsCard 
              date="Approved across systems"
              title="Recognized by RDSO for product innovation"
              delay={300}
            />
          </div>
        </div>
        
        {/* Button and Gradient Line Section - Full Width to Right Edge */}
        <div className="relative mt-12 sm:mt-16 md:mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              {/* Explore Precast Solution Button */}
            <Link 
              href="/precast" 
                className="group inline-flex items-center gap-3 bg-[#8A393B] hover:bg-[#F2913F] px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 ease-out text-base md:text-lg font-medium text-white whitespace-nowrap flex-shrink-0 z-10 will-change-transform"
            >
                Explore Precast Solution
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
        
          {/* Gradient Line extending to viewport right edge */}
          <GradientLine />
        </div>
      </section>

      {/* Responsive Our Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OurProjectsSection />
      </div>
      
      {/* Nationwide Presence Section */}
      <NationwidePresenceSection />
    </div>
  );
}
