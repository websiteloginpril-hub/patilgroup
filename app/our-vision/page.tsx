"use client";

import React, { useState, useEffect } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { useInView } from 'react-intersection-observer';

const OurVisionPage = () => {
  useGSAPAnimations();
  
  // State for core values orange animation
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Intersection observers for each section
  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [coreValuesRef, coreValuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Sequential orange animation for core values
  useEffect(() => {
    if (coreValuesInView && !hasAnimated) {
      // Start animation after initial fade-in completes (1200ms)
      const startDelay = 1400;
      const highlightDuration = 1000; // How long each pill stays orange (increased for slower effect)
      
      const animateValues = () => {
        for (let i = 0; i < 7; i++) {
          setTimeout(() => {
            setActiveValueIndex(i);
            // Reset after highlight duration
            setTimeout(() => {
              setActiveValueIndex(null);
            }, highlightDuration);
          }, startDelay + (i * (highlightDuration + 200))); // 200ms gap between animations
        }
        
        // Mark animation as complete
        setTimeout(() => {
          setHasAnimated(true);
        }, startDelay + (7 * (highlightDuration + 200)));
      };
      
      animateValues();
    }
  }, [coreValuesInView, hasAnimated]);

  return (
    <div className="bg-white pt-[103px]">
      {/* Vision Section */}
      <section ref={visionRef} className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Gradient Line - Absolute positioned from right edge */}
        <div 
          className={`absolute right-0 hidden md:block transition-all duration-1000 will-change-transform ${
            visionInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            top: '115px',
            width: 'min(1133px, 80vw)',
            height: 'clamp(20px, 2vw, 28px)',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
            transformOrigin: 'right',
            transitionDelay: '300ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision Heading */}
          <div 
            className={`mb-6 sm:mb-8 md:mb-10 lg:mb-16 transition-all duration-700 will-change-transform ${
              visionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '100ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <h2 
              className="font-bold text-[#8A393B] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                lineHeight: '110%',
              }}
            >
              Vision
            </h2>
          </div>
          
          {/* Vision Content */}
          <div 
            className={`transition-all duration-700 will-change-transform ${
              visionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '400ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <p 
              className="text-[#414141] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              style={{
                textAlign: 'justify',
                fontWeight: 400,
                lineHeight: '150%',
                maxWidth: '1248px',
              }}
            >
              To be the world largest and low cost railway track component producer. To benchmark as quality producer of track components by merging the efficiencies of excellence in quality, productivity & cost. To make rail travel faster and safer.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Gradient Line - Absolute positioned from left edge */}
        <div 
          className={`absolute left-0 hidden md:block transition-all duration-1000 will-change-transform ${
            missionInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            top: '110px',
            width: 'min(1060px, 75vw)',
            height: 'clamp(20px, 2vw, 28px)',
            background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
            transformOrigin: 'left',
            transitionDelay: '300ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Heading */}
          <div 
            className={`mb-6 sm:mb-8 md:mb-10 lg:mb-16 transition-all duration-700 will-change-transform ${
              missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '100ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <h2 
              className="font-bold text-[#8A393B] text-right text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                lineHeight: '110%',
              }}
            >
              Mission
            </h2>
          </div>
          
          {/* Mission Content */}
          <div 
            className={`transition-all duration-700 will-change-transform ${
              missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '400ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <p 
              className="text-[#414141] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              style={{
                textAlign: 'justify',
                fontWeight: 400,
                lineHeight: '150%',
                maxWidth: '1248px',
              }}
            >
              Increasing the productivity and quality by strictly adhering to the manufacturing excellence process. Treating human resources as partners. Practicing continuous price discovery process. Bringing in customer delight with on time supply. Predominant growth by adding new customers.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={coreValuesRef} className="bg-black py-12 sm:py-16 md:py-20 lg:py-24 relative">
        {/* Top Gradient Line - Responsive */}
        <div 
          className={`absolute h-3 sm:h-5 lg:h-7 transition-all duration-1000 will-change-transform ${
            coreValuesInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            top: '0px',
            left: '0px',
            width: '70%',
            background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
            transformOrigin: 'left',
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        {/* Bottom Gradient Line - Responsive */}
        <div 
          className={`absolute h-3 sm:h-5 lg:h-7 transition-all duration-1000 will-change-transform ${
            coreValuesInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            bottom: '0px',
            right: '0px',
            width: '70%',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
            transformOrigin: 'right',
            transitionDelay: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Core Values Heading */}
          <div 
            className={`text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 transition-all duration-700 will-change-transform ${
              coreValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '100ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F2913F] mb-3 sm:mb-4">
              Core Values
            </h2>
            {/* Mobile underline */}
            <div className="lg:hidden w-24 h-1 bg-gradient-to-r from-[#8A393B] to-[#F2913F] mx-auto rounded-full"></div>
          </div>
          
          {/* Values Grid - Pill Style Buttons */}
          <div className="text-center">
            {/* Mobile Layout - Stack in single column on small screens */}
            <div className="block sm:hidden space-y-4">
              {['Quality', 'Customer Centric', 'Human Centric', 'Innovative', 'Sustainable growth', 'Adaptive', 'Competitive'].map((value, index) => (
                <div 
                  key={value}
                  className={`inline-block px-4 py-2 sm:px-6 sm:py-3 text-white text-sm sm:text-base font-semibold shadow-lg will-change-transform ${
                    coreValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{
                    background: activeValueIndex === index 
                      ? '#F2913F' 
                      : '#8A393B',
                    borderRadius: '11px',
                    transitionDelay: `${600 + index * 80}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.8s ease-in-out',
                  }}
                >
                  {value}
              </div>
              ))}
            </div>
            
            {/* Tablet and Desktop Layout */}
            <div className="hidden sm:block">
              {/* First Row */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                {['Quality', 'Customer Centric', 'Human Centric', 'Innovative'].map((value, index) => (
                  <div 
                    key={value}
                    className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold shadow-lg will-change-transform ${
                      coreValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{
                      background: activeValueIndex === index 
                        ? '#F2913F' 
                        : '#8A393B',
                      borderRadius: '11px',
                      transitionDelay: `${600 + index * 80}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.8s ease-in-out',
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>
              
              {/* Second Row */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
                {['Sustainable growth', 'Adaptive', 'Competitive'].map((value, index) => {
                  const globalIndex = index + 4; // Offset for second row
                  return (
                    <div 
                      key={value}
                      className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold shadow-lg will-change-transform ${
                        coreValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                      style={{
                        background: activeValueIndex === globalIndex 
                          ? '#F2913F' 
                          : '#8A393B',
                        borderRadius: '11px',
                        transitionDelay: `${920 + index * 80}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.8s ease-in-out',
                      }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurVisionPage;
