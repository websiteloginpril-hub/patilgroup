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
      "Apna Technologies & Solutions (ApnaTech) is Patil Group's dedicated railway diagnostics arm, delivering integrated, OEM-grade solutions that enhance safety, reliability, and operational efficiency across rail and metro networks. Established in 2004, ApnaTech designs, develops, manufactures, delivers, and maintains intelligent wayside and on-board diagnostic systems, seamlessly integrating hardware, embedded systems, and proprietary software into scalable, data-driven platforms. With deep expertise in IoT, AI/ML, machine vision, sensors, and control technologies, ApnaTech moves railways from threshold-based monitoring to predictive, insight-led decision-making. Its portfolio includes Wheel Impact Load Detectors, Hot Axle Box & Hot Wheel Detection Systems, Rail Stress Monitoring, and many more, supported by centralized analytics for actionable intelligence. Backed by Patil Group's five-decade railway legacy, ApnaTech delivers “Made in India, Made for India” full-packaged diagnostic ecosystems built for modern, high-speed, and heavy-haul rail infrastructure.",
    ],
  },
];

const ApnaTechPage = () => {
  useGSAPAnimations();
  const card = cards[0];
  return (
    <div className="bg-[#F1EFF0] text-gray-800 overflow-hidden min-h-screen">
      {/* Hero: header image with overlay title */}
      <section className="relative w-full overflow-hidden bg-black">
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] min-h-[300px] sm:min-h-[360px]">
          <Image
            src="/atheader.jpg"
            alt={`${card.title} ${card.tagline}`}
            fill
            className="object-cover object-[38%_0%]"
            sizes="100vw"
            priority
          />
          {/* Bottom-left title overlay (same style as News&Events) */}
          <div className="absolute inset-0 z-10 flex items-end">
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12">
              <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Apna Technologies & Solutions
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Title and description section – aligned to R&D template style */}
      <section className="bg-transparent text-black py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1e5aa8] leading-tight">
              Integrated Railway Diagnostics. Engineered for Safer, Smarter Rail Networks
            </h1>
          </div>

          {/* Paragraph block styled like template description */}
          <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            {card.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Apna Technologies logo and link – in red-marked area */}
          <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col items-center gap-2 sm:gap-3">
            <Image
              src="/apna_technologies_logo.jpg"
              alt="Apna Technologies & Solutions"
              width={280}
              height={120}
              className="object-contain"
            />
            <a
              href="https://apnatech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#1e5aa8] hover:text-[#164785] font-medium text-base sm:text-lg transition-colors"
            >
              Explore more about Apna Tech
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApnaTechPage;
