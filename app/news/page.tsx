"use client";

import React, { useState, useEffect } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import Navbar from '@/components/Navbar';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import HLSVideo from '@/components/HLSVideo';

const cards = [
  {
    image: '/IIT Tirupati.png',
    title: 'Patil Group Signs MoU with IIT Tirupati',
    paragraphs: [
      "Patil Group has been recognised by the Confederation of Indian Industry (CII) as one of the top 10 Indian innovations in the railway sector for its indigenous Stricter Tolerance Track Fastening System, designed to enhance safety and ride comfort on semi-high-speed corridors including Vande Bharat routes.",
    ],
    bullets: [
      'Research Collaboration: Joint work on real-world challenges across civil engineering, AI/ML and allied domains.',
      'Advanced Testing Facility: Co-developing a first-of-its-kind lab capable of sting track systems and slab structures up to 24 metres.',
      'Talent Development: Shaping the next generation of infrastructure leaders through live industry exposure and technical engagement.'
    ],
    afterText: 'Building enduring value for Indian rail infrastructure "Make in Bharat for the World."',
  },
  {
    image: '/indianrailways.jpg',
    title: 'Honoured by CII for our top railway innovation',
    paragraphs: [
      "Patil Group has been recognised by the Confederation of Indian Industry (CII) as one of the top 10 Indian innovations in the railway sector for its indigenous Stricter Tolerance Track Fastening System, designed to enhance safety and ride comfort on semi-high-speed corridors including Vande Bharat routes.",
    ],
    bullets: [
      'Maintains precise ±1 mm track gauge for superior stability',
      'Proven performance with over a year of sustained improvement on live tracks',
      'No change in existing sleeper or rail components required',
      'Enhances ride quality, reduces track irregularities, and improves safety',
      'Supports the Viksit Bharat vision under Atmanirbhar Bharat',
    ],
  },
  {
    image: '/highspeedtrain.jpg',
    title: 'Modern fastening for high-speed trains',
    paragraphs: [
      "Under the Atmanirbhar Bharat initiative, Patil Group has developed a modern fastening system for Indian Railways' ballasted tracks, supporting semi‑high‑speed (200 km/h) and heavy axle‑load operations with ±1 mm gauge tolerance.",
    ],
    bullets: [
      'High-precision PSC sleeper manufacturing',
      'Specialized molds for accurate rail seat placement',
      'GFN liners with tight tolerance controls',
    ],
  },
  // Placeholder slots for 5 more cards; you can replace with your designs later
  {
    image: '/foundrynews.jpg',
    title: "India's largest foundry opened in Bokaro by Patil Group",
    paragraphs: [
      'Established in 2020, Patil Foundry Bokaro is one of India\'s largest manufacturers of ductile iron castings, serving global railways and general engineering sectors.',
      'With Indian Railways as a key customer, the foundry features a Disa high-pressure automatic molding line, auto pouring, and sand testing facilities. Focused on quality, it aims for global market leadership.',
    ],
    bullets: [],
  },
  {
    image: '/Bharat fastening1.png',
    title: 'Patil Group Selected for Bharat Fastening Initiative by Indian Railways',
    paragraphs: [
      "Patil Group has been selected under the Bharat Fastening Initiative led by the Ministry of Railways and RDSO for the development of an indigenous modern rail fastening system for Indian Railways.",
      "Only seven Indian manufacturers have been shortlisted under this programme, which focuses on Make in India development of high-performance fastening systems meeting stringent RDSO requirements.",
      "The initiative targets fastening systems designed for mixed traffic conditions:",
      "The programme mandates in-India design and manufacturing, FEM analysis, endurance testing, and compliance with international standards EN 13481 and EN 13146, adapted to Indian railway operating conditions for mixed traffic conditions.",
      "Patil Group's selection reflects its five-decade legacy in railway track engineering, backward-integrated manufacturing, and proven expertise in rail fastening systems, aligned with Indian Railways' vision of self-reliant, future-ready rail infrastructure.",
    ],
    bullets: [],
    paragraphBullets: [
      "25T axle load, speeds up to 200 kmph for passenger traffic",
      "Ballasted track infrastructure",
      "Enhanced safety, durability, and lifecycle reliability",
    ],
    paragraphBulletsAfterIndex: 2,
  },
  {
    image: '/whistleblowerpolicynews.jpg',
    title: 'Introducing the whistleblower policy',
    paragraphs: [
      "Patil Group's whistleblower policy enables confidential, anonymous reporting of misconduct or policy violations without fear of retaliation. Aligned with our values of trust and accountability, it fosters a safe, ethical, and transparent work environment.",
    ],
    bullets: [
      'Anonymous & confidential reporting',
      'Zero retaliation',
      'Strong focus on integrity and fairness',
    ],
  },
  {
    image: '/apnatech.jpg',
    title: "Patil Group acquires ApnaTech",
    paragraphs: [
      'Patil Group has acquired Apna Technologies (ApnaTech), a market leader in railway track diagnostics systems. ApnaTech specializes in safety‑enhancing solutions like wheel‑impact load detectors, hot‑box detectors, and onboard systems. This strategic move strengthens Patil Group\'s position in the growing railway infrastructure sector.',
    ],
    bullets: [],
  },
  {
    image: '/railwaytunnel.jpg',
    title: "India's longest railway tunnel opens to traffic",
    paragraphs: [
      "Patil Group is proud to be part of Asia's second‑longest railway tunnel project, connecting Qazigund and Banihal through an 11 km stretch in Jammu & Kashmir. As a complete system solution provider, Patil supplies RHEDA® bi‑block sleepers and Vossloh 300‑1U fastenings, and offers design and technical support for ballastless track installation. The tunnel enables travel between the regions in just 6.6 minutes.",
    ],
    bullets: [],
  },
  {
    image: '/newstrack.jpg',
    title: "India's first high‑speed ballastless track rail corridor",
    paragraphs: [
      "We are proud to announce the opening of India's first high‑speed ballastless‑track rail corridor—turning a new chapter in high‑speed rail—by M/s Patil Rail Infrastructure Pvt. Ltd., in partnership with the Delhi Airport Metro Express Link (DAMEL).",
    ],
    bullets: [],
  },
];

const NewsPage = () => {
  useGSAPAnimations();
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setProgress(0);
  };
  const prev = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setProgress(0);
  };

  // Progress bar and auto-advance
  useEffect(() => {
    if (!isAutoPlaying || isPaused || window.innerWidth >= 1024) {
      setProgress(0);
      return;
    }

    const duration = 2500; // 2.5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIndex((current) => (current + 1) % cards.length);
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, isPaused, index]);

  const card = cards[index];

  return (
    <div className="bg-[#F1EFF0] text-gray-800 overflow-hidden">

      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden hero-section">
        {/* Background Video wrapped for parallax */}
        <div className="absolute inset-0 w-full h-full hero-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          >
            <source src="/innews.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Bottom-left Overlay Text (parallax content) */}
        <div className="absolute inset-0 z-10 hero-content">
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12">
            <h1 className="text-white font-bold leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              News&Events
            </h1>
          </div>
        </div>
      </section>

      {/* Responsive Our Latest News Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-clash font-bold mb-6 sm:mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#F2913F] to-[#8A393B] text-center lg:text-left fade-in-section">
            Our Latest
          </h2>

          {/* Mobile Auto Carousel */}
          <div className="lg:hidden">
            <div
              className="relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Enhanced Card Container with Key-based Re-rendering */}
              <div className="relative min-h-[600px] sm:min-h-[650px]">
                <div
                  key={`card-${index}`}
                  className="carousel-card bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 ease-in-out"
                >
                  {/* Enhanced Mobile Image */}
                  <div className="mb-6 relative overflow-hidden rounded-lg group">
                    <img
                      key={`image-${index}`}
                      src={card.image}
                      alt={card.title}
                      className={`w-full transition-all duration-500 group-hover:scale-105 ${card.image.includes("Bharat fastening")
                        ? "h-52 sm:h-64 object-cover object-top bg-white"
                        : card.image.includes("IIT Tirupati")
                          ? "h-52 sm:h-64 object-contain bg-[#F8F6F4]"
                          : "h-48 sm:h-56 object-cover"
                        }`}
                    />
                    {/* Image overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image loading indicator */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-medium text-gray-600">{index + 1}/{cards.length}</span>
                    </div>
                  </div>

                  {/* Enhanced Mobile Content with Key for Re-render */}
                  <div key={`content-${index}`} className="space-y-4 carousel-content-enter">
                    <h3 className="text-lg sm:text-xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8A393B] to-[#F2913F]">
                      {card.title}
                    </h3>

                    {/* Scrollable content area */}
                    <div className="max-h-36 sm:max-h-44 overflow-y-auto custom-scrollbar pr-2">
                      {card.paragraphs.map((p, i) => (
                        <React.Fragment key={`para-${index}-${i}`}>
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                            {p}
                          </p>
                          {(card as { paragraphBulletsAfterIndex?: number }).paragraphBulletsAfterIndex === i &&
                            card.paragraphBullets &&
                            card.paragraphBullets.length > 0 && (
                              <ul className="mb-3 ml-4 space-y-1.5 text-gray-700 text-sm">
                                {card.paragraphBullets.map((b, bi) => (
                                  <li key={`pbullet-${index}-${bi}`} className="flex items-start">
                                    <span className="mt-1.5 mr-2 block h-1.5 w-1.5 rounded-full bg-[#F2913F] flex-shrink-0" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </React.Fragment>
                      ))}

                      {card.bullets.length > 0 && (
                        <div className="mt-4">
                          <p className="text-gray-900 font-semibold text-sm sm:text-base mb-3">Key innovations include:</p>
                          <ul className="space-y-2 text-gray-700 text-sm">
                            {card.bullets.map((b, i) => (
                              <li key={`bullet-${index}-${i}`} className="flex items-start">
                                <span className="mt-1.5 mr-2 block h-1.5 w-1.5 rounded-full bg-[#F2913F] flex-shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Progress bar for current article */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#F2913F] rounded-full"></span>
                          Article {index + 1} of {cards.length}
                        </span>
                        <span className="flex items-center gap-1">
                          {isAutoPlaying && !isPaused ? (
                            <>
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                              Auto-advancing
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                              Paused
                            </>
                          )}
                        </span>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="progress-bar h-1.5 rounded-full transition-all duration-75 ease-linear"
                          style={{
                            width: `${progress}%`,
                            transform: `translateZ(0)` // GPU acceleration
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Auto Carousel Indicators */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIndex(i);
                      setProgress(0);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 3000);
                    }}
                    className={`carousel-indicator transition-all duration-300 rounded-full touch-manipulation ${i === index
                      ? 'w-8 h-2 bg-[#F2913F] active shadow-lg'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 hover:scale-125'
                      }`}
                    aria-label={`Go to article ${i + 1}: ${cards[i].title.substring(0, 30)}...`}
                  />
                ))}
              </div>

              {/* Enhanced Auto-play Control */}
              <div className="text-center mt-4">
                <div className="flex items-center justify-center gap-4">
                  {/* Manual navigation */}
                  <button
                    onClick={() => {
                      prev();
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 3000);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors touch-manipulation"
                    aria-label="Previous article"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-600" />
                  </button>

                  {/* Auto-play control */}
                  <button
                    onClick={() => {
                      setIsAutoPlaying(!isAutoPlaying);
                      setProgress(0);
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-all duration-200 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 touch-manipulation border border-gray-200"
                  >
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      }`} />
                    <span className="font-medium">{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
                  </button>

                  {/* Manual navigation */}
                  <button
                    onClick={() => {
                      next();
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 3000);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors touch-manipulation"
                    aria-label="Next article"
                  >
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Vertical Stack with CSS Animations */}
          <div className="hidden lg:block">
            <div className="space-y-8 stagger-children">
              {cards.map((newsCard, cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer group stagger-item transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">
                    {/* Left image with hover effects */}
                    <div className="md:col-span-1 overflow-hidden relative">
                      <img
                        src={newsCard.image}
                        alt={newsCard.title}
                        loading="lazy"
                        className={
                          newsCard.image.includes("Bharat fastening")
                            ? "w-full h-full object-cover object-top bg-white transition-transform duration-400 group-hover:scale-105 group-hover:brightness-110"
                            : newsCard.image.includes("IIT Tirupati")
                              ? "w-full h-full object-contain bg-[#F8F6F4] transition-transform duration-400 group-hover:scale-105 group-hover:brightness-110"
                              : newsCard.image.includes("indianrailways")
                                ? "w-full h-full object-cover transition-transform duration-400 group-hover:scale-90 group-hover:brightness-110"
                                : "w-full h-full object-cover transition-transform duration-400 group-hover:scale-110 group-hover:brightness-110"
                        }
                      />
                      {/* Overlay gradient that appears on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F2913F]/20 to-[#8A393B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Right content with staggered text animations */}
                    <div className="md:col-span-2 p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F2913F] to-[#8A393B] mb-4 fade-text">
                        {newsCard.title}
                      </h3>

                      <div className="space-y-3">
                        {newsCard.paragraphs.map((paragraph, paragraphIndex) => (
                          <React.Fragment key={paragraphIndex}>
                            <p className="text-gray-700 text-base md:text-lg leading-relaxed fade-paragraph">
                              {paragraph}
                            </p>
                            {(newsCard as { paragraphBulletsAfterIndex?: number }).paragraphBulletsAfterIndex === paragraphIndex &&
                              newsCard.paragraphBullets &&
                              newsCard.paragraphBullets.length > 0 && (
                                <ul className="ml-4 mt-2 space-y-2 text-gray-700 text-base md:text-lg">
                                  {newsCard.paragraphBullets.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex} className="flex items-start fade-paragraph">
                                      <span className="mt-2 mr-3 block h-2 w-2 rounded-full bg-[#F2913F] flex-shrink-0" />
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </React.Fragment>
                        ))}

                        {newsCard.bullets.length > 0 && (
                          <div className="mt-4">
                            <p className="text-gray-900 font-semibold text-base md:text-lg mb-3">Key innovations include:</p>
                            <ul className="space-y-2 text-gray-700 text-base md:text-lg">
                              {newsCard.bullets.map((bullet, bulletIndex) => (
                                <li
                                  key={bulletIndex}
                                  className="flex items-start fade-paragraph"
                                >
                                  <span className="mt-2 mr-3 block h-2 w-2 rounded-full bg-[#F2913F] flex-shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {newsCard.afterText && (
                          <p className="text-gray-700 text-base md:text-lg leading-relaxed fade-paragraph">
                            {newsCard.afterText}
                          </p>
                        )}
                      </div>
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

export default NewsPage;
