"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StatCounter = ({ end, duration, suffix = '', prefix = '', className = '' }: { 
  end: number; 
  duration: number; 
  suffix?: string; 
  prefix?: string; 
  className?: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });

  return (
    <span ref={ref} className={className}>
      <CountUp 
        start={0}
        end={inView ? end : 0} 
        duration={duration} 
        separator="," 
        suffix={suffix} 
        prefix={prefix}
        preserveValue={true}
      />
    </span>
  );
};

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('Sleepers');

  const tabs = [
    { name: 'Sleepers' },
    { name: 'Fastening systems' },
    { name: 'Turnout parts' },
    { name: 'Rubber elements' },
  ];

  useGSAPAnimations();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const philosophySection = document.getElementById('philosophy-section');
    if (!philosophySection) return;

    const items = gsap.utils.toArray('.philosophy-item');
    if (items.length === 0) return;
    
    gsap.set(items, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: philosophySection,
            start: 'top 60%',
            toggleActions: 'play none none none',
        }
    });

    tl.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.4,
        duration: 0.8,
        ease: 'power2.out',
    });

    return () => {
        if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
        }
        tl.kill();
    };
  }, []);

  return (
    <div className="bg-white">
      {/* New About - Track background header */}
      <section className="bg-white overflow-hidden pt-32 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8">
        <div className="flex items-center justify-center w-full">
            {/* Left track - hide on mobile to prevent crowding */}
            <div className="hidden sm:block flex-1 min-w-0 h-40 sm:h-48 md:h-56 relative" style={{ WebkitMaskImage: 'linear-gradient(to left, transparent 10%, black 100%)', maskImage: 'linear-gradient(to left, transparent 10%, black 100%)' }}>
                <Image src="/trackkkk.png" alt="Rail track left" fill className="object-cover object-right scale-x-[-1]" priority />
            </div>

            {/* Centered heading */}
            <h1 className="flex-shrink-0 text-[#8A393B] font-extrabold leading-tight text-center px-4 sm:px-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-normal sm:whitespace-nowrap break-words max-w-[90vw]">
                Through the tracks of time
            </h1>

            {/* Right track - hide on mobile to prevent crowding */}
            <div className="hidden sm:block flex-1 min-w-0 h-40 sm:h-48 md:h-56 relative" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 100%)', maskImage: 'linear-gradient(to right, transparent 10%, black 100%)' }}>
                <Image src="/trackkkk.png" alt="Rail track right" fill className="object-cover object-left" priority />
            </div>
        </div>
    </section>

      {/* Legacy blurb card */}
      <section className="bg-white py-4 sm:py-5 md:py-6 mt-6 sm:-mt-14 md:-mt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-2xl border border-gray-200 bg-[#F7F6F4] shadow-sm px-3 sm:px-8 py-5 sm:py-8 text-center">
            <p className="text-[#F2913F] font-bold text-base sm:text-xl md:text-2xl">
              We began in the 1960s with a single concrete sleeper plant.
            </p>
            <p className="mt-2 text-[#8A393B] font-semibold text-lg sm:text-2xl md:text-3xl leading-snug">
              Today, we supply track components to railways and
              <br className="hidden sm:block" /> metros across India.
            </p>
          </div>
        </div>
      </section>

      {/* Zero Bad Section */}
      <section className="bg-white py-8 sm:py-10 md:py-12 relative fade-in-section" data-delay="0.1" data-duration="0.9">
        {/* Left Edge Gradient Line */}
        <div 
          className="absolute hidden lg:block reveal-line-left gradient-line-ltr gradient-line-md"
          style={{
            height: '28px',
            left: '0px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        
        {/* Right Edge Gradient Line */}
        <div 
          className="absolute hidden lg:block reveal-line-right gradient-line-rtl gradient-line-md"
          style={{
            height: '28px',
            right: '0px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          {/* Title */}
          <div className="text-center mb-8 fade-heading" data-delay="0.15" data-duration="0.9">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold whitespace-normal break-words">
              <span className="text-[#8A393B]">Our Business Decision - </span>
              <span className="text-[#F2913F]">Making Principles</span>
            </h2>
          </div>
          
          {/* Three Boxes */}
          <div className="space-y-3 sm:space-y-4 max-w-md mx-auto stagger-children" data-stagger="0.15" data-duration="0.7">
            {/* Country 1st */}
            <div className="bg-[#8A393B] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg stagger-item">
              <h3 className="text-base sm:text-lg font-bold text-center">
                Country <span className="text-[#F2913F]">1<sup className="fluid-small">st</sup></span>
              </h3>
            </div>
            
            {/* Customer 2nd */}
            <div className="bg-[#8A393B] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg stagger-item">
              <h3 className="text-base sm:text-lg font-bold text-center">
                Customer <span className="text-[#F2913F]">2<sup className="fluid-small">nd</sup></span>
              </h3>
            </div>
            
            {/* Company & Employees 3rd */}
            <div className="bg-[#8A393B] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg stagger-item">
              <h3 className="text-base sm:text-lg font-bold text-center">
                Company & Employees <span className="text-[#F2913F]">3<sup className="fluid-small">rd</sup></span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Philosophy Section (minimized) */}
      <section id="philosophy-section" className="py-4 sm:py-6 md:py-8 bg-white relative overflow-hidden">
        <div className="relative z-10">
            {/* Desktop Layout - text removed as requested */}
            <div className="hidden md:block">
              

              <div className="philosophy-item"></div>

              <div className="philosophy-item"></div>
              <div className="philosophy-item"></div>
            </div>
        </div>
      </section>

      {/* Innovation gradient statements */}
      <section className="bg-white py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <div className="space-y-10 sm:space-y-12">
            {/* Left-edge gradient with text */}
            <div>
              <h3 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-left">
                Innovation keeps our journey moving
              </h3>
              <div
                className="h-4 sm:h-6 rounded-full"
                style={{
                  width: '80vw',
                  marginLeft: 'calc(50% - 50vw)',
                  background:
                    'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)',
                }}
              />
            </div>

            {/* Right-edge gradient with text */}
            <div className="text-right">
              <h3 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                refining every detail, every decade.
              </h3>
              <div
                className="h-4 sm:h-6 rounded-full ml-auto"
                style={{
                  width: '80vw',
                  marginLeft: 'calc(50% + 50vw - 60vw)',
                  background:
                    'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Responsive In Service Section */}
      <section className="py-10 sm:py-16 md:py-24 bg-white text-center relative fade-in-section">
        <div 
          className="absolute inset-0 opacity-90"
          style={{ 
            backgroundImage: "url('/worldmap.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-5">
            <h2 className="text-3xl font-extrabold text-[#8A393B]">In Service</h2>
            <p className="text-lg text-[#8A393B] font-semibold">
              <StatCounter end={4000000} duration={2.5} /> sleepers and counting used in <StatCounter end={14} duration={2} /> railway zones.
            </p>
            <p className="text-lg font-semibold" style={{
              background: 'linear-gradient(to right, #8A393B, #F2913F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Over four hundred kilo metres delivered each year.
            </p>
            <p className="text-base font-medium text-[#8A393B]">Approved across systems</p>
          </div>
          
          {/* Desktop Layout - Styled to match reference */}
          <div className="hidden md:block">
            <h2 className="text-6xl font-extrabold text-[#8A393B]">In Service</h2>
            <p className="mt-6 text-2xl lg:text-3xl font-semibold text-[#8A393B]">
              <StatCounter end={4000000} duration={2.5} /> sleepers and counting used in <StatCounter end={14} duration={2} /> railway zones.
            </p>
            <p className="mt-2 text-2xl lg:text-3xl font-semibold" style={{
              background: 'linear-gradient(to right, #8A393B, #F2913F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Over four hundred kilo metres delivered each year.
            </p>
            <p className="mt-4 text-xl font-medium text-[#8A393B]">Approved across systems</p>
          </div>
        </div>
      </section>

      {/* Responsive Make in India Section */}
      <section className="py-10 sm:py-16 md:py-24 bg-white text-center relative fade-in-section">
        {/* Mobile Layout */}
        <div className="md:hidden px-4">
          <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-6 mx-auto max-w-sm">
            <img src="/makeindia.png" alt="Make in India" className="h-16 sm:h-24 mx-auto mb-4" />
            <p className="text-lg sm:text-2xl font-bold text-black leading-tight">Installed across India</p>
            <div
              className="h-1.5 mt-3 mx-auto rounded-full"
              style={{
                width: '120px',
                background: 'linear-gradient(to right, #F2913F, #1E3888, #8A393B)',
              }}
            />
          </div>
        </div>
        
        {/* Desktop Layout - Original */}
        <div className="hidden md:block">
          <div className="flex justify-center items-center max-w-7xl mx-auto max-w-full w-auto">
            <img src="/indiaflag.png" alt="Indian Flag" className="w-[636px] h-96" />
            <img src="/makeindia.png" alt="Make in India" className="h-56 mx-8" />
            <img src="/indiaflag.png" alt="Indian Flag" className="w-[636px] h-96 transform scale-x-[-1]" />
          </div>
          <div className="mt-12">
            <p className="text-5xl font-semibold text-black">Installed across India</p>
            <div
              className="h-2 mt-4 mx-auto"
              style={{
                width: '400px',
                background: 'linear-gradient(to right, #F2913F, #1E3888, #8A393B)',
              }}
            />
          </div>
        </div>
      </section>
      
      <div className="border-t border-gray-200"></div>

      {/* Responsive Clientele and Presence Section */}
      <section className="py-10 sm:py-16 md:py-24 bg-white fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 text-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-[#8A393B]">Our </span>
                <span className="text-[#F2913F]">Clientele</span>
              </h2>
              <Link href="/our-clientele" className="inline-flex items-center text-lg sm:text-xl md:text-2xl text-black group">
                View
                <span className="ml-2 sm:ml-3 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8A393B] text-[#8A393B] group-hover:bg-[#8A393B] group-hover:text-white transition-colors">
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </span>
              </Link>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-[#8A393B]">Our </span>
                <span className="text-[#F2913F]">Presence</span>
              </h2>
              <Link href="/our-presence" className="inline-flex items-center text-lg sm:text-xl md:text-2xl text-black group">
                View
                <span className="ml-2 sm:ml-3 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8A393B] text-[#8A393B] group-hover:bg-[#8A393B] group-hover:text-white transition-colors">
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
