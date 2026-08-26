"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Slide {
  image: string;
}

interface ContentSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

const ContentSlider: React.FC<ContentSliderProps> = ({ slides, autoPlayInterval = 3500 }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  if (!slides || slides.length === 0) return null;

  // Clone first and last slide for seamless circular infinite loop
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides, autoPlayInterval]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length);
    }
  };

  const activeDotIndex = (currentIndex - 1 + slides.length) % slides.length;

  return (
    <div className="bg-white h-full w-full">
      <div className="max-w-7xl mx-auto h-full">
        <div className="relative overflow-hidden h-full rounded-xl">
          <div
            className={`flex h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 relative min-h-[380px] md:min-h-[440px]">
                <Image
                  src={slide.image}
                  alt={`Slide ${index}`}
                  fill
                  className="object-cover"
                  priority={index === 1}
                />
                <div className="absolute bottom-6 right-6 z-10">
                  <button
                    onClick={handleNext}
                    className="bg-black/50 text-white rounded-full p-3 border-2 border-white/80 hover:bg-[#F2913F] hover:border-[#F2913F] transition-colors duration-300 backdrop-blur-sm"
                    aria-label="Next slide"
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-6 z-10 flex gap-2">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(dotIdx + 1);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeDotIndex === dotIdx
                    ? 'bg-[#F2913F] w-6'
                    : 'bg-white/60 hover:bg-white w-2.5'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;