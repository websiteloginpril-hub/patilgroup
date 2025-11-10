"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Slide {
  image: string;
}

interface ContentSliderProps {
  slides: Slide[];
}

const ContentSlider: React.FC<ContentSliderProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return null;
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div
                  className="bg-gray-200 p-8 md:p-12 lg:p-16 flex items-center justify-end min-h-[488px] bg-cover bg-center transition-all duration-500"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <button
                    onClick={handleNext}
                    className="bg-transparent text-amber-500 rounded-full p-3 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;