"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import ApplyForm from '@/components/ApplyForm';

const CareersContent = () => {
  useGSAPAnimations();
  const [activeTab, setActiveTab] = useState('Engineering');
  const tabs = ['Engineering', 'Production', 'Projects', 'Support'];

  const testimonials = [
    {
      quote: "I joined in 1996 as a Junior Accountant and have had the privilege of serving across six locations, from Accounts & Admin Head to Plant Head to General Manager. 30 years, multiple leadership roles, and one constant: a culture that trusts its people and builds leaders from within. Patil Group didn't just shape my career. It shaped who I am.",
      name: "Venugopal Bommu",
      role: "General Manager",
      image: "/management/venugopal sir (1).png",
      popOut: true
    },
    {
      quote: "15 years of expanded markets, modern technology, and rising standards — but what I'm most proud of is the culture that made it possible. At Patil Group, dignity and growth aren't just words. They're how we work, every day.",
      name: "Nagamani K.V",
      role: "Operations Department",
      image: "/management/Nagamani madam.png",
      popOut: true
    },
    {
      quote: "Joined as Officer – HR. 15 years later, I'm Senior Manager. Patil Group didn't just give me a job, it gave me a career, cross-functional exposure, leadership training, and the trust to grow into a people-first leader.",
      name: "Vijayrama Aki",
      role: "Sr. Manager - HR",
      image: "/management/Vijaya rama sir.png",
      popOut: true
    },
    {
      quote: "Joined in 2007 as Commercial Manager. Today, I'm VP – RMBD. In 19 years, I've watched PRIL grow from 4 plants to 14, and been part of building that growth, from plant operations and DFCC supply to business development.",
      name: "Gowrisankar Lavudi",
      role: "Vice President - RMBD",
      image: "/management/gowrishankarsir1.png",
      popOut: false
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonials.length, isPaused]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen bg-black flex items-center justify-center hero-section z-20">
        <div className="absolute inset-0 h-full w-full opacity-60 hero-image">
          <Image
            src="/ourreso.jpg"
            alt="Architectural Structure"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 w-full text-center hero-content">
          <h1 className="hero-title font-bold text-white animate-fadeInUp">
            Careers
          </h1>
        </div>
      </section>

      {/* Tagline / Life @ Patil Group */}
      <section className="bg-white text-black py-24 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
                  Build the future of Indian Railway
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#8A393B] tracking-tight leading-tight">
                  Life @ Patil Group
                </h3>
              </div>

              <div className="w-20 h-1 bg-[#8A393B] rounded-full" />

              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
                <p className="font-semibold text-lg sm:text-xl text-[#1E3888]">
                  Lead with integrity, Deliver with Excellence
                </p>
                <p>
                  At Patil Group, a career is more than a job title, it&apos;s a chance to leave your mark on the nation&apos;s backbone. Over the years, we have been building the infrastructure that keeps India moving, and the people who build it with us are our greatest asset.
                </p>
                <p>
                  We believe in growing our people the way we build our infrastructure, with precision, patience, and long-term thinking. From structured on-the-job learning to specialized sessions, we invest in knowledge that translates directly to impact.
                </p>
                <p>
                  Life at Patil Group is fast-paced and purpose-driven. You will find yourself working alongside engineers, technologists, and industry veterans who bring decades of domain depth to every challenge. The culture is open, leadership is accessible, ideas are welcomed, and performance is recognized.
                </p>
                <p>
                  We don&apos;t just build rail infrastructure. We build careers with direction, teams with integrity, and an organization that takes pride in the work it sends out into the world.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base font-semibold text-[#8A393B]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    Quality is our DNA
                  </span>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1E3888]" />
                    Safety is our Commitment
                  </span>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                    Technology is our Pivot
                  </span>
                </div>
              </div>
            </div>

            {/* Right Images (Overlapping Layout) */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] w-full mt-8 lg:mt-0">
              {/* Top-Left Image */}
              <div className="absolute -top-8 left-0 w-[60%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-300 z-10">
                <Image
                  src="/DSC_4148.JPG"
                  alt="DSC_4148"
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Bottom-Left Image */}
              <div className="absolute -bottom-8 left-0 w-[60%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-300 z-10">
                <Image
                  src="/WhatsApp Image 2025-12-08 at 4.25.35 PM (4).jpeg"
                  alt="Teamwork at Patil Group"
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Right-Middle Overlapping Image */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-8 w-[60%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-300 z-20">
                <Image
                  src="/IMG_6623-2.jpg"
                  alt="IMG_6623-2"
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-24 relative z-30" style={{ backgroundColor: '#f8a63e' }}>
        {/* Slide Animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideInLeft {
            from {
              transform: translateX(-40px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInRight {
            from {
              transform: translateX(40px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-left {
            animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-slide-right {
            animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
            Employees Testimonials
          </h2>

          <div className="max-w-6xl mx-auto relative">
            <div 
              className="rounded-none p-8 sm:p-12 pr-32 sm:pr-48 md:pr-64 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 shadow-xl group hover:shadow-2xl min-h-[350px] md:min-h-[300px] relative"
              style={{ 
                backgroundColor: '#f48f21',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffb15c';
                setIsPaused(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f48f21';
                setIsPaused(false);
              }}
            >
              {/* Left Quote */}
              <div 
                key={`quote-${currentTestimonial}`}
                className="flex-1 text-white relative z-10 animate-slide-left"
              >
                <span className="text-6xl font-serif absolute -top-8 -left-4 opacity-50">“</span>
                <p className="text-lg sm:text-xl leading-relaxed italic z-10 relative pl-4 transition-all duration-300">
                  {testimonials[currentTestimonial].quote}
                </p>
                <span className="text-6xl font-serif absolute -bottom-14 right-4 opacity-50">”</span>
              </div>
              
              {/* Author Info */}
              <div 
                key={`author-info-${currentTestimonial}`}
                className="flex items-center gap-8 md:w-[35%] justify-end z-10 animate-slide-right"
              >
                <div className="text-center sm:text-right text-white transition-all duration-300">
                  <h4 className="text-xl sm:text-2xl font-bold">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-base sm:text-lg text-white/95 mt-1">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>

              {/* Exact Image on Bottom Right Corner */}
              <div 
                key={`image-${currentTestimonial}`}
                className={`absolute bottom-0 right-0 z-0 pointer-events-none transition-all duration-500 animate-slide-right ${
                  testimonials[currentTestimonial].popOut 
                    ? 'h-[150%] w-[160px] sm:w-[230px] md:w-[310px]' 
                    : 'h-full w-[120px] sm:w-[180px] md:w-[240px]'
                }`}
              >
                <Image
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  fill
                  quality={100}
                  unoptimized
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === idx
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                    }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Department tabs */}
      <section className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-gray-300">
            <div className="pt-8 pr-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8A393B]">
                We hire for roles across
              </h2>
              <div className="mt-2 h-1.5 w-full bg-gradient-to-r from-[#8A393B] via-orange-400 to-blue-500" />
            </div>
            <div className="md:col-span-3 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {tabs.map((tab) => (
                  <div key={tab} className="border-l border-gray-300 pl-8">
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`text-2xl font-semibold transition-colors ${activeTab === tab
                        ? 'text-black'
                        : 'text-gray-500 hover:text-black'
                        }`}
                    >
                      {tab}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now Form Component */}
      <ApplyForm />
    </>
  );
};

const CareersPage = () => {
  return (
    <div className="bg-[#1E1E1E] text-white">
      <CareersContent />
    </div>
  );
};

export default CareersPage;
