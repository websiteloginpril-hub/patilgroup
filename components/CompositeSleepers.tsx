"use client";

import React from 'react';

const CompositeSleepers = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section with Diagonal Shape */}
        <div className="flex items-center mb-16">
          <h2 className="font-clash font-medium text-[96px] leading-[72px] tracking-[-0.25px] text-[#F2913F] pr-8 flex-shrink-0">
            Composite <br /> Sleepers
          </h2>
          <div 
            className="w-full h-48 bg-cover bg-center"
            style={{
              clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
              backgroundImage: "url('/sleeper.png')"
            }}
          >
          </div>
        </div>

        {/* Two-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
              Patil Group is the country's largest supplier of concrete sleepers to Indian Railways. With an extensive network of 12 manufacturing plants, including two newly automated plants, Patil Group produces pre-stressed concrete (PSC) sleepers, meeting the evolving needs of the Indian Railways.
            </p>
            <p className="mt-6 font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
              The Group's plants, equipped with state-of-the-art facilities, have a combined installed capacity of 4.85 million sleepers annually, positioning Patil Group as a leader in this domain.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">
              Precision-Engineered for Robust Railway Infrastructure
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Patil Group's pre-stressed concrete sleepers are manufactured to meet the exacting standards of Indian Railways. These sleepers are designed to handle various railway operations, from broad gauge lines to high-speed trains. The Group's manufacturing plants in Anara, Bhubaneshwar, Bilaspur, Madurai, Tumkur, Udwada, and Wadiyaram, along with two automated plants in Badi Khatu and Bhurwal, ensure efficient production processes. Notably, the company's plant is the country's first ISO-certified concrete manufacturing plant, further reinforcing its commitment to quality. These PSC sleepers are essential for various types of tracks, including normal broad gauge, points and crossings, guard rails, and dual gauge systems.
            </p>
          </div>
        </div>

        {/* Noise and Vibration Section */}
        <div className="mt-24">
          <h4 className="font-bold text-gray-800 mb-4 text-center">
            Noise and Vibration Solution for Slab Track | Mass Spring Systems
          </h4>
          <div className="max-w-full space-y-6">
            <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
              The increasing mobility of modern society results in an ever higher level of noise (acoustic) and vibrations (structure-borne). This problem is particularly acute in city areas and in heavily urbanized metropolitan areas. This is because the traffic infrastructure and residential property are often immediately adjacent.
            </p>
            <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
              Traffic-generated noise and vibration is a detrimental aspect for the quality of life of the residents in the vicinity and confronts traffic planners as well as public transport companies with new challenges.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompositeSleepers; 