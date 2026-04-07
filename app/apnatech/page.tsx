"use client";

import React from "react";
import Image from "next/image";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const cards = [
  {
    title: "Apna Technologies & Solutions",
    tagline:
      "Integrated Railway Diagnostics. Engineered for Safer, Smarter Rail Networks",
    paragraphs: [
      "Apna Technologies & Solutions (ApnaTech) is Patil Group's dedicated railway diagnostics arm, delivering integrated, OEM-grade solutions that enhance safety, reliability, and operational efficiency across rail and metro networks.",
      "Established in 2004, ApnaTech designs, develops, manufactures, delivers, and maintains intelligent wayside and on-board diagnostic systems, seamlessly integrating hardware, embedded systems, and proprietary software into scalable, data-driven platforms. With deep expertise in IoT, AI/ML, machine vision, sensors, and control technologies, ApnaTech moves railways from threshold-based monitoring to predictive, insight-led decision-making. Its portfolio includes Wheel Impact Load Detectors, Hot Axle Box & Hot Wheel Detection Systems, Rail Stress Monitoring, and many more, supported by centralized analytics for actionable intelligence.",
      "Backed by Patil Group's five-decade railway legacy, ApnaTech delivers “Made in India, Made for India” full-packaged diagnostic ecosystems built for modern, high-speed, and heavy-haul rail infrastructure.",
    ],
  },
];

const ApnaTechPage = () => {
  useGSAPAnimations();
  const card = cards[0];

  return (
    <div className="bg-[#F1EFF0] text-gray-800 overflow-hidden min-h-screen">

      {/* HERO SECTION (MOBILE + DESKTOP FIXED) */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* Background Image */}
        <Image
          src="/atheader.jpg"
          alt={card.title}
          fill
          className="object-cover object-center z-0"
          priority
        />

        {/* MOBILE VIEW */}
        <div className="md:hidden absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10"></div>

          <div className="relative z-20 h-full flex items-center justify-start px-6">
            <div className="text-left max-w-md">

              <h1 className="text-white font-bold text-2xl leading-tight mb-4 drop-shadow-2xl">
                {card.title}
              </h1>

              <div className="w-16 h-1 bg-[#1e5aa8] mb-4 rounded-full"></div>

              <p className="text-gray-200 text-sm leading-relaxed">
                {card.tagline}
              </p>

              <p className="mt-5 text-gray-300 text-xs animate-pulse">
                Scroll to explore →
              </p>
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block">
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
            <h1 className="text-white font-bold text-center text-4xl lg:text-6xl leading-tight drop-shadow-lg">
              {card.title}
            </h1>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="bg-transparent text-black py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

          {/* Tagline */}
          <div className="text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-extrabold text-[#1e5aa8] leading-tight">
              {card.tagline}
            </h2>
          </div>

          {/* Description */}
          <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            {card.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Logo Section */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">

            <div className="border-2 border-[#1e5aa8] rounded-lg p-4 w-[180px] sm:w-[220px] md:w-[260px] flex items-center justify-center">
              <a
                href="https://apnatech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
                aria-label="Explore more about Apna Tech"
              >
                <Image
                  src="/apna_technologies_logo.jpg"
                  alt="Apna Technologies & Solutions"
                  width={300}
                  height={170}
                  className="object-contain h-auto"
                />
              </a>
            </div>

            <span className="text-[#1e5aa8] font-medium text-sm sm:text-base md:text-lg">
              Explore more about Apna Tech →
            </span>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ApnaTechPage;