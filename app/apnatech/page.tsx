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
      "Backed by Patil Group's five-decade railway legacy, ApnaTech delivers “Made in India, Made for India” full-packaged diagnostic ecosystems built for modern, high-speed, and heavy-haul rail infrastructure."
    ],
  },
];

const ApnaTechPage = () => {
  useGSAPAnimations();
  const card = cards[0];

  return (
    <div className="bg-[#F1EFF0] text-gray-800 overflow-hidden min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] min-h-[300px] sm:min-h-[360px]">
          <Image
            src="/atheader.jpg"
            alt={`${card.title} ${card.tagline}`}
            fill
            className="object-cover object-[38%_0%] z-0"
            sizes="100vw"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10" />

          {/* Centered Title */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
            <h1 className="text-white font-bold leading-tight text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              Apna Technologies & Solutions
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-transparent text-black py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* Tagline */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1e5aa8] leading-tight">
              Integrated Railway Diagnostics. Engineered for Safer, Smarter Rail Networks
            </h2>
          </div>

          {/* Description */}
          <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            {card.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Logo Section – centered */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center gap-3">
            
            <div className="border-2 border-[#1e5aa8] rounded-lg py-3 pr-3 pl-6 min-w-[200px] w-[200px] sm:w-[240px] md:w-[260px] flex items-center justify-center">
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

            <span className="text-[#1e5aa8] font-medium text-base sm:text-lg">
              Explore more about Apna Tech →
            </span>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ApnaTechPage;