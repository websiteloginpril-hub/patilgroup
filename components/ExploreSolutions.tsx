"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HLSVideo from './HLSVideo';

const ExploreSolutions = () => {
  return (
    <div className="relative bg-[#212121] min-h-[60vh] text-white flex items-center">
      <div 
        className="absolute inset-0 w-1/2 bg-gray-300"
        style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}
      >
        <video 
          className="w-full h-full object-cover"
          src="/herovideo.mp4" 
          autoPlay 
          loop 
          muted 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>{/* This empty div is to push the content to the right */}</div>
          <div className="py-16 px-4 md:pl-24">
            <h3 className="font-clash text-3xl font-medium text-amber-500">
              Explore More Railway Solutions
            </h3>
            <p className="mt-6 font-clash text-4xl leading-tight text-white">
              Patil Group offers a comprehensive range of railway infrastructure products designed for durability, safety, and efficiency.
            </p>
            <p className="mt-6 font-clash text-4xl leading-tight text-white">
              Discover our full range of products and innovations.
            </p>
            <Link href="/products" className="mt-12 inline-flex items-center text-white text-3xl font-medium group">
              <span className="group-hover:text-amber-500 transition-colors duration-300">Products</span>
              <div className="ml-4 flex items-center justify-center h-12 w-12 rounded-full border-2 border-amber-500 group-hover:bg-amber-500 transition-colors duration-300">
                <ArrowRight className="h-6 w-6 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSolutions; 