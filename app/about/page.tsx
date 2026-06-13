"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// --- StatCounter ------------------------------------------------------------
const StatCounter = ({ end, duration, suffix = '', prefix = '', className = '' }: {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '50px' });

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

// --- Decision cards ---------------------------------------------------------
const decisionCards = [
  { id: 1, title: 'Country', order: '1st' },
  { id: 2, title: 'Customer', order: '2nd' },
  { id: 3, title: 'Company & Employees', order: '3rd' },
];

// --- Mobile decision cards --------------------------------------------------
function MobileDecisionCards() {
  return (
    <div className="stack-container mx-auto w-full max-w-[44rem] pb-10">
      {decisionCards.map((card) => (
        <article
          key={card.id}
          className="stack-card text-center"
          style={{
            background: '#9A4043',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 14px 28px rgba(0, 0, 0, 0.14)',
          }}
        >
          <h3 className="text-[clamp(1rem,4.4vw,1.65rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            {card.title}{' '}
            <span className="text-[#F2913F]">
              {card.order.slice(0, 1)}
              <sup className="align-super text-[0.62em] font-bold">{card.order.slice(1)}</sup>
            </span>
          </h3>
        </article>
      ))}
    </div>
  );
}

function DecisionSectionTitle({ className = '' }: { className?: string }) {
  return (
    <h2 className={`font-bold ${className}`.trim()}>
      <span className="block whitespace-nowrap text-[#F2913F]">Our Business Decision -</span>
      <span className="block whitespace-nowrap text-[#8A393B]">Making Principles</span>
    </h2>
  );
}

const trainImages = ['/Train1.jpg', '/Train2.webp', '/Train3.jpg'];

// --- Page component --------------------------------------------------------
const AboutUsPage = () => {
  useGSAPAnimations();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % trainImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadGSAPAnimation = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

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
        },
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.4,
        duration: 0.8,
        ease: 'power2.out',
      });

      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    };

    loadGSAPAnimation();
  }, []);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white pb-4 pt-32 sm:pb-6 sm:pt-24 md:hidden">
        <div className="absolute inset-0">
          {trainImages.map((imageSrc, index) => (
            <Image
              key={imageSrc}
              src={imageSrc}
              alt="Train slideshow"
              fill
              priority={index === 0}
              sizes="100vw"
              aria-hidden={index !== currentImageIndex}
              className={`object-cover object-center transition-opacity duration-[1400ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))}
          <div className="absolute inset-0 bg-white/65" />
        </div>

        <div className="relative z-10 flex w-full items-center justify-center">
          <div
            className="relative hidden h-40 min-w-0 flex-1 sm:block sm:h-48 md:h-56"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, transparent 10%, black 100%)',
              maskImage: 'linear-gradient(to left, transparent 10%, black 100%)',
            }}
          >
            <Image
              src="/trackkkk.png"
              alt="Rail track left"
              fill
              className="scale-x-[-1] object-cover object-right"
              priority
            />
          </div>

          <h1
            className="max-w-[90vw] flex-shrink-0 break-words px-4 text-center text-3xl font-extrabold leading-tight text-[#f4a01b] sm:px-6 sm:text-4xl sm:whitespace-nowrap md:text-5xl lg:text-6xl"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            Through the tracks of time
          </h1>

          <div
            className="relative hidden h-40 min-w-0 flex-1 sm:block sm:h-48 md:h-56"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 100%)',
              maskImage: 'linear-gradient(to right, transparent 10%, black 100%)',
            }}
          >
            <Image
              src="/trackkkk.png"
              alt="Rail track right"
              fill
              className="object-cover object-left"
              priority
            />
          </div>
        </div>
      </section>

      <section className="hidden overflow-hidden bg-white pb-8 pt-28 md:block">
        <div className="flex w-full items-center justify-center">
          <div
            className="relative h-56 min-w-0 flex-1"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, transparent 10%, black 100%)',
              maskImage: 'linear-gradient(to left, transparent 10%, black 100%)',
            }}
          >
            <Image src="/trackkkk.png" alt="Rail track left" fill className="scale-x-[-1] object-cover object-right" priority />
          </div>

          <h1 className="max-w-[90vw] flex-shrink-0 break-words px-6 text-center text-5xl font-extrabold leading-tight text-[#8A393B] lg:text-6xl">
            Through the tracks of time
          </h1>

          <div
            className="relative h-56 min-w-0 flex-1"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 100%)',
              maskImage: 'linear-gradient(to right, transparent 10%, black 100%)',
            }}
          >
            <Image src="/trackkkk.png" alt="Rail track right" fill className="object-cover object-left" priority />
          </div>
        </div>
      </section>

      <section className="mt-6 bg-white py-4 sm:mt-2 sm:py-5 md:hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.9fr_1.6fr] md:gap-6">
            <div className="flex min-h-[116px] items-center justify-center rounded-2xl border border-gray-200 bg-[#F7F6F4] px-4 py-5 text-center shadow-sm sm:min-h-[132px] sm:px-6 sm:py-6 md:min-h-[136px] md:px-7 md:py-7">
              <p className="text-sm font-bold leading-tight text-[#F2913F] sm:text-lg md:text-xl">
                We began in the 1960s with a single concrete sleeper plant.
              </p>
            </div>

            <div className="flex min-h-[116px] items-center justify-center rounded-2xl border border-gray-200 bg-[#F7F6F4] px-4 py-5 text-center shadow-sm sm:min-h-[132px] sm:px-6 sm:py-6 md:min-h-[136px] md:px-7 md:py-7">
              <p className="text-sm font-semibold leading-snug text-[#8A393B] sm:text-base md:text-xl">
                Today, we supply track components to railways and <br className="hidden md:block" /> metros across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 hidden bg-white py-6 md:-mt-16 md:block">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-[#F7F6F4] px-8 py-8 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#F2913F]">
              We began in the 1960s with a single concrete sleeper plant.
            </p>
            <p className="mt-2 text-3xl font-semibold leading-snug text-[#8A393B]">
              Today, we supply track components to railways and
              <br /> metros across India.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white pb-0 pt-8 fade-in-section sm:pt-10 md:hidden" data-delay="0.1" data-duration="0.9">
        <div className="fade-in-section mx-auto px-4 sm:px-6">
          <div className="fade-heading mb-8 text-center" data-delay="0.15" data-duration="0.9">
            <DecisionSectionTitle className="text-left text-[28px] leading-tight sm:text-[50px]" />
          </div>
          <MobileDecisionCards />
        </div>
      </section>

      <section className="relative hidden bg-white py-12 fade-in-section md:block" data-delay="0.1" data-duration="0.9">
        <div
          className="absolute hidden lg:block reveal-line-left gradient-line-ltr gradient-line-md"
          style={{
            height: '28px',
            left: '0px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        <div
          className="absolute hidden lg:block reveal-line-right gradient-line-rtl gradient-line-md"
          style={{
            height: '28px',
            right: '0px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        <div className="fade-in-section mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="fade-heading mb-8 text-center" data-delay="0.15" data-duration="0.9">
            <h2 className="break-words text-4xl font-bold">
              <span className="text-[#8A393B]">Our Business Decision - </span>
              <span className="text-[#F2913F]">Making Principles</span>
            </h2>
          </div>

          <div className="stagger-children mx-auto max-w-md space-y-4" data-stagger="0.15" data-duration="0.7">
            <div className="stagger-item rounded-xl bg-[#8A393B] px-6 py-3 text-white shadow-lg">
              <h3 className="text-center text-lg font-bold">
                Country <span className="text-[#F2913F]">1<sup className="fluid-small">st</sup></span>
              </h3>
            </div>

            <div className="stagger-item rounded-xl bg-[#8A393B] px-6 py-3 text-white shadow-lg">
              <h3 className="text-center text-lg font-bold">
                Customer <span className="text-[#F2913F]">2<sup className="fluid-small">nd</sup></span>
              </h3>
            </div>

            <div className="stagger-item rounded-xl bg-[#8A393B] px-6 py-3 text-white shadow-lg">
              <h3 className="text-center text-lg font-bold">
                Company & Employees <span className="text-[#F2913F]">3<sup className="fluid-small">rd</sup></span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy-section" className="relative overflow-hidden bg-white py-4 sm:py-6 md:py-8">
        <div className="relative z-10">
          <div className="hidden md:block">
            <div className="philosophy-item"></div>
            <div className="philosophy-item"></div>
            <div className="philosophy-item"></div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-8 pt-6 sm:pt-8 md:hidden">
        <div className="fade-in-section mx-auto max-w-7xl px-4 sm:px-6">
          <div className="space-y-8 sm:space-y-10">
            <div>
              <div className="-mx-4 flex flex-col items-start sm:-mx-6">
                <h3 className="mb-1 whitespace-nowrap px-4 text-left text-lg font-semibold leading-tight text-black sm:whitespace-normal sm:px-6 sm:text-3xl sm:leading-none">
                  Innovation Keeps Our Journey Moving
                </h3>
                <div
                  className="h-4 w-full rounded-r-full sm:h-6"
                  style={{
                    background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="-mx-4 flex flex-col items-end text-right sm:-mx-6">
                <h3 className="mb-1 whitespace-nowrap px-4 text-lg font-semibold text-black sm:px-6 sm:text-3xl">
                  Refining Every Detail, Every Decade.
                </h3>
                <div
                  className="h-4 w-full rounded-l-full sm:h-6"
                  style={{
                    background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden bg-white py-8 md:block">
        <div className="fade-in-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div>
              <h3 className="mb-4 text-left text-4xl font-semibold text-black">
                Innovation keeps our journey moving
              </h3>
              <div
                className="h-6 rounded-full"
                style={{
                  width: '80vw',
                  marginLeft: 'calc(50% - 50vw)',
                  background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)',
                }}
              />
            </div>

            <div className="text-right">
              <h3 className="mb-4 text-4xl font-semibold text-black">
                refining every detail, every decade.
              </h3>
              <div
                className="ml-auto h-6 rounded-full"
                style={{
                  width: '80vw',
                  marginLeft: 'calc(50% + 50vw - 60vw)',
                  background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-10 text-center fade-in-section sm:py-16 md:hidden">
        <div className="absolute inset-0 opacity-90">
          <Image src="/worldmap.png" alt="" fill className="object-contain object-center md:object-fill" sizes="100vw" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-5 md:hidden">
            <h2 className="text-3xl font-extrabold text-[#8A393B]">In Service</h2>
            <p className="text-lg font-semibold text-[#8A393B]">
              <StatCounter end={4000000} duration={2.5} /> sleepers and counting used in <StatCounter end={14} duration={2} /> railway zones.
            </p>
            <p
              className="text-lg font-semibold"
              style={{
                background: 'linear-gradient(to right, #8A393B, #F2913F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Over four hundred kilo metres delivered each year.
            </p>
            <p className="text-base font-medium text-[#8A393B]">Approved across systems</p>
          </div>
        </div>
      </section>

      <section className="relative hidden bg-white py-24 text-center fade-in-section md:block">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: "url('/worldmap.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        ></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-6xl font-extrabold text-[#8A393B]">In Service</h2>
            <p className="mt-6 text-2xl font-semibold text-[#8A393B] lg:text-3xl">
              <StatCounter end={4000000} duration={2.5} /> sleepers and counting used in <StatCounter end={14} duration={2} /> railway zones.
            </p>
            <p
              className="mt-2 text-2xl font-semibold lg:text-3xl"
              style={{
                background: 'linear-gradient(to right, #8A393B, #F2913F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Over four hundred kilo metres delivered each year.
            </p>
            <p className="mt-4 text-xl font-medium text-[#8A393B]">Approved across systems</p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-10 text-center fade-in-section sm:py-16 md:hidden">
        <div className="px-4 md:hidden">
          <div className="mx-auto max-w-sm rounded-2xl bg-gradient-to-r from-orange-50 to-green-50 p-6">
            <Image src="/makeindia.png" alt="Make in India" width={150} height={96} className="mx-auto mb-4 h-16 w-auto sm:h-24" />
            <p className="text-lg font-bold leading-tight text-black sm:text-2xl">Installed across India</p>
            <div
              className="mx-auto mt-3 h-1.5 rounded-full"
              style={{
                width: '120px',
                background: 'linear-gradient(to right, #F2913F, #1E3888, #8A393B)',
              }}
            />
          </div>
        </div>
      </section>

      <section className="relative hidden bg-white py-24 text-center fade-in-section md:block">
        <div>
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center">
            <img src="/indiaflag.png" alt="Indian Flag" loading="lazy" className="h-96 w-[636px]" />
            <img src="/makeindia.png" alt="Make in India" loading="lazy" className="mx-8 h-56" />
            <img src="/indiaflag.png" alt="Indian Flag" loading="lazy" className="h-96 w-[636px] scale-x-[-1]" />
          </div>
          <div className="mt-12">
            <p className="text-5xl font-semibold text-black">Installed across India</p>
            <div
              className="mx-auto mt-4 h-2"
              style={{
                width: '400px',
                background: 'linear-gradient(to right, #F2913F, #1E3888, #8A393B)',
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
