'use client';

import { useState, useEffect, useRef } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import HLSVideo from '@/components/HLSVideo';

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
      className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 will-change-transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className={`mb-4 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transitionDelay: inView ? `${delay + 100}ms` : '0ms',
        }}
      >
        <span className="text-[#8A393B] font-semibold text-base sm:text-lg">{date}</span>
      </div>
      <h3
        className={`text-gray-900 font-medium text-sm sm:text-base mb-6 leading-relaxed transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{
          transitionDelay: inView ? `${delay + 200}ms` : '0ms',
        }}
      >
        {title}
      </h3>
      <a
        href="/news"
        className={`group inline-flex items-center text-[#F2913F] hover:text-[#D97706] font-medium text-sm sm:text-base transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
      className="hidden sm:block absolute right-0 h-7 will-change-transform overflow-hidden"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
      }}
    >
      <div
        className={`h-full gradient-line-rtl transition-all duration-1000 ease-out ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        style={{
          transformOrigin: 'right',
          height: '100%',
          width: 'clamp(200px, 60vw, 864px)',
          marginLeft: 'auto',
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
    <section ref={ref} className="relative z-20 mt-0 bg-white pt-4 pb-12 sm:mt-0 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className={`mb-6 px-4 sm:mb-10 sm:px-0 transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#8A393B]">Our Projects</h2>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex w-max gap-4 sm:gap-5 lg:gap-6 animate-marquee hover:[animation-play-state:paused]"
          >
            {[...projects, ...projects].map((project, index) => (
              <div
                key={`${project.city}-${index}`}
                className="w-[168px] flex-none sm:w-[220px] md:w-[240px] lg:w-[250px] xl:w-[260px]"
              >
                <div className="group rounded-2xl overflow-hidden">
                  <div className="mb-3 aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:-translate-y-2 sm:mb-5">
                    <Image
                      src={project.image}
                      alt={project.city}
                      width={520}
                      height={693}
                      unoptimized
                      sizes="(max-width: 640px) 200px, 300px"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 4}
                    />
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-gray-900 sm:text-xl">
                    {project.city}
                  </h3>
                  <Link
                    href={project.link}
                    className="text-xs font-medium text-gray-600 transition-colors hover:text-[#F2913F] sm:text-base"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
          src="https://customer-bowidoym2wl882qb.cloudflarestream.com/caf0e4e6cb0da655fcf6007b7717b034/manifest/video.m3u8"
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
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white px-4 transition-all duration-800 will-change-transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
          className={`h-1 w-60 sm:w-80 mx-auto mb-6 transition-all duration-700 will-change-transform ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
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
          className={`text-xl sm:text-2xl md:text-3xl text-gray-200 font-medium mb-4 transition-all duration-700 will-change-transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
          className={`text-sm sm:text-base md:text-lg text-gray-300 max-w-lg mx-auto leading-relaxed transition-all duration-700 will-change-transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      setShowText(true);
      return;
    }

    const revealText = () => setShowText(true);

    // Keep the hero usable even when autoplay or metadata events are delayed.
    let revealTimeout = window.setTimeout(revealText, 1800);

    const scheduleReveal = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (duration > 0) {
        window.clearTimeout(revealTimeout);
        revealTimeout = window.setTimeout(
          revealText,
          Math.max(600, (duration - 1) * 1000)
        );
      }
    };

    video.play().catch(() => {
      revealText();
    });

    video.addEventListener('loadedmetadata', scheduleReveal);
    video.addEventListener('ended', revealText);

    return () => {
      window.clearTimeout(revealTimeout);
      video.removeEventListener('loadedmetadata', scheduleReveal);
      video.removeEventListener('ended', revealText);
    };
  }, []);

  return (
    <div>


      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black hero-section block sm:h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full hero-video">
          <video
            ref={videoRef}
            src="/heronewvideo.mp4"
            autoPlay
            muted
            playsInline
            className="home-entry-video w-full h-full object-cover object-center"
            preload="auto"
            poster="/pg.png"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 px-4 sm:absolute sm:inset-0 sm:px-6 lg:flex lg:items-center lg:justify-center lg:px-8 hero-content">
          <div className="mx-auto flex h-auto sm:h-full w-full max-w-7xl flex-col justify-between pt-24 pb-4 sm:justify-between sm:pt-20 sm:pb-6 text-left md:pt-24 lg:max-w-5xl lg:items-center lg:justify-center lg:pb-0 lg:pt-32 lg:text-center">
            {/* Main Heading - First Animation */}
            <h1 className={`self-start text-left mb-2 sm:mb-2 md:mb-3 lg:self-center lg:text-center lg:mb-6 transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-white text-4xl sm:text-3xl lg:text-6xl xl:text-6xl font-extrabold tracking-tight mb-0 sm:mb-1">
                WORLD&apos;S
              </div>
              <div className="text-[#F2913F] text-4xl sm:text-3xl lg:text-6xl xl:text-6xl font-extrabold tracking-tight mb-0 sm:mb-1">
                LARGEST SLEEPER
              </div>
              <div className="text-white text-4xl sm:text-3xl lg:text-6xl xl:text-6xl font-extrabold tracking-tight mb-2 sm:mb-2 md:mb-3 lg:mb-6">
                MANUFACTURER
              </div>
            </h1>

            <div
              className="self-end flex flex-col items-end text-right gap-1 sm:gap-2 md:gap-3 mt-8 sm:mt-0 mb-2 sm:mb-2 md:mb-3 lg:grid lg:w-full lg:max-w-4xl lg:grid-cols-2 lg:gap-6 lg:self-center lg:items-start lg:text-center lg:mb-5 transition-all duration-1000"
              style={{
                opacity: showText ? 1 : 0,
                transform: showText ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: showText ? '800ms' : '0ms',
              }}
            >
              <div className="flex flex-col items-end lg:items-center">
                <div className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-1">
                  {showText ? <CountUp end={50} duration={2} suffix="+" delay={0.8} /> : '0+'}
                </div>
                <div className="text-[#F2913F] text-lg sm:text-lg lg:text-base font-medium">years on the job</div>
              </div>

              <div className="flex flex-col items-end lg:items-center">
                <div className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-1">
                  {showText ? <CountUp end={4000000} duration={2} separator="," suffix="+" delay={0.8} /> : '0+'}
                </div>
                <div className="text-[#F2913F] text-lg sm:text-lg lg:text-base font-medium">Safe Sleepers per year</div>
              </div>
            </div>

            <div
              className="self-center text-center text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight mt-[15px] sm:mt-[15px] md:mt-[15px] lg:mt-0 pb-3 sm:pb-4 lg:pb-3 transition-all duration-1000"
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
        </div>
      </section>

      {/* Mobile Only: Precast Section with Stacking Cards */}
      <div className="block lg:hidden">
        <section className="bg-[#F5F4F1] pt-16 pb-4 sm:py-24 md:py-32 will-change-transform">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="precast-container">

              {/* Left Column: Sticky Title & Glass Card */}
              <div className="sticky-column hidden lg:block">
                <h2 className="text-[#8A393B] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-8">
                  PRECAST
                </h2>

                <div className="precast-glass-card shadow-xl border border-white/40">
                  <p className="text-gray-800 text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-8">
                    Pioneering precast concrete solutions for India&apos;s modern infrastructure. Our precision-engineered
                    systems redefine durability and efficiency in railway construction.
                  </p>

                  <Link
                    href="/precast"
                    className="group inline-flex items-center gap-3 bg-[#8A393B] hover:bg-[#F2913F] px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out text-base sm:text-lg font-bold text-white"
                  >
                    Explore Precast Solution
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Column: Stacking Cards */}
              <div className="stack-container">

                {/* Card 1 */}
                <article className="stack-card">
                  <h3 className="card-tag">Delivered at Scale</h3>
                  <p className="card-desc">
                    Sleepers supplied for new Pune Metro Corridor
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/news"
                      className="text-[#F2913F] font-bold hover:text-[#8A393B] transition-colors flex items-center gap-2"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="stack-card">
                  <h3 className="card-tag">Built for long life</h3>
                  <p className="card-desc">
                    Partnered on Mumbai-Ahmedabad bullet train trial track
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/news"
                      className="text-[#F2913F] font-bold hover:text-[#8A393B] transition-colors flex items-center gap-2"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="stack-card">
                  <h3 className="card-tag">Approved across systems</h3>
                  <p className="card-desc">
                    Recognized by RDSO for product innovation
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/news"
                      className="text-[#F2913F] font-bold hover:text-[#8A393B] transition-colors flex items-center gap-2"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>

              </div>

              {/* Mobile Only: Explore Precast Solution Button */}
              <div className="lg:hidden flex justify-start mt-2 w-full pb-0">
                <Link
                  href="/precast"
                  className="group inline-flex items-center gap-3 bg-[#8A393B] hover:bg-[#F2913F] px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out text-base sm:text-lg font-bold text-white"
                >
                  Explore Precast Solution
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Desktop Only: Recent News and Updates Section */}
      <div className="hidden lg:block">
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
      </div>

      {/* Responsive Our Projects Section */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <OurProjectsSection />
      </div>

      {/* Nationwide Presence Section */}
      <NationwidePresenceSection />
    </div>
  );
}
