"use client";

import React from "react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const cards = [
  {
    image: "/atheader.jpg",
    title:
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
      {/* Hero: image pinned to top so full head is visible (reference framing) */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] min-h-[300px] sm:min-h-[360px]">
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover object-[38%_0%]"
          />
        </div>
      </section>

      {/* Title and description section – aligned to R&D template style */}
      <section className="bg-transparent text-black py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h1 className="fluid-h2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F2913F] to-[#8A393B] text-left">
            {card.title}
          </h1>

          {/* Thin divider under title, like template */}
          <div className="mt-4 sm:mt-6 h-px w-full bg-gray-200" />

          {/* Paragraph block styled like template description */}
          <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            {card.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <a
              href="https://apnatech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base sm:text-lg rounded-lg transition-colors"
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
