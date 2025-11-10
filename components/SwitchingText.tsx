'use client';

import { useState, useEffect } from 'react';

interface TextVariant {
  mainTitle: string[];
  subtitle: string[];
}

const textVariants: TextVariant[] = [
  {
    mainTitle: ['RAILWAY', 'ENGINEERING'],
    subtitle: ['SMARTER TRACK', 'SOLUTIONS,', 'SAFER MOBILITY']
  },
  {
    mainTitle: ['PRECISION', 'COMPONENTS'],
    subtitle: ['BUILT FOR ENDURING', 'PERFORMANCE']
  },
  {
    mainTitle: ['INNOVATIVE', 'DESIGN'],
    subtitle: ['RELIABILITY AT', 'EVERY STEP']
  }
];

interface SwitchingTextProps {
  isMobile?: boolean;
  isAnimated?: boolean;
}

export default function SwitchingText({ isMobile = false, isAnimated = false }: SwitchingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // After fade-out completes, change content and fade-in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textVariants.length);
        setIsTransitioning(false);
      }, 800); // Duration of fade-out animation
      
    }, 4000); // Switch every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentVariant = textVariants[currentIndex];

  const getFadeClasses = (index: number) => {
    const baseClasses = 'transition-all duration-800 ease-in-out';
    const staggerDelay = index * 100; // Stagger each line by 100ms
    
    if (isTransitioning) {
      return `${baseClasses} opacity-0 transform translate-y-4 blur-sm`;
    }
    
    return `${baseClasses} opacity-100 transform translate-y-0 blur-0`;
  };

  const getStaggerStyle = (index: number) => {
    return {
      transitionDelay: `${index * 100}ms`
    };
  };

  if (isMobile) {
    return (
      <div 
        className={`transition-all duration-1000 ease-in-out transform ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '800ms' }}
      >
        {/* Main Heading */}
        <div className="mb-6">
          {currentVariant.mainTitle.map((line, index) => (
            <h2 
              key={`${currentIndex}-${index}`}
              className={`text-[#F2913F] font-extrabold text-5xl sm:text-6xl leading-[0.9] tracking-tight mb-1 mobile-hero-text mobile-heading drop-shadow-lg ${getFadeClasses(index)}`}
              style={getStaggerStyle(index)}
            >
              {line}
            </h2>
          ))}
        </div>
        
        {/* Animated Accent Line */}
        <div className={`w-16 h-1 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mb-6 rounded-full accent-line mobile-smooth drop-shadow-sm transition-all duration-800 ease-in-out ${isTransitioning ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></div>
        
        {/* Subtitle */}
        <div className="space-y-1">
          {currentVariant.subtitle.map((line, index) => (
            <h1 
              key={`${currentIndex}-sub-${index}`}
              className={`text-white font-semibold text-2xl leading-tight mobile-hero-text mobile-smooth drop-shadow-lg ${getFadeClasses(index + currentVariant.mainTitle.length)}`}
              style={getStaggerStyle(index + currentVariant.mainTitle.length)}
            >
              {line}
            </h1>
          ))}
        </div>
        
      </div>
    );
  }

  // Desktop version
  return (
    <div className="w-full px-6 lg:px-8 xl:px-16">
      {/* Left Side Text */}
      <div 
        className={`absolute left-6 lg:left-8 xl:left-16 top-1/2 transform -translate-y-1/2 pt-8 transition-opacity duration-1000 ease-in-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '800ms' }}
      >
        <div>
          <h2 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
            {currentVariant.mainTitle.map((line, index) => (
              <span 
                key={`${currentIndex}-main-${index}`} 
                className={`block ${getFadeClasses(index)}`}
                style={getStaggerStyle(index)}
              >
                <span className={`transition-colors duration-1000 ${isAnimated ? (index === 0 ? 'text-[#F2913F]' : 'text-[#8A393B]') : 'text-white'}`}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Right Side Text */}
      <div 
        className={`absolute right-6 lg:right-8 xl:right-16 top-1/2 transform -translate-y-1/2 pt-8 transition-opacity duration-1000 ease-in-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1200ms' }}
      >
        <div>
          <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight italic">
            {currentVariant.subtitle.map((line, index) => (
              <span 
                key={`${currentIndex}-sub-${index}`} 
                className={`block ${getFadeClasses(index + currentVariant.mainTitle.length)}`}
                style={getStaggerStyle(index + currentVariant.mainTitle.length)}
              >
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}

