"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { ArrowRight } from 'lucide-react';

const systemsData = [
  {
    title: 'Ballastless Track',
    description: 'Designed for high-availability metro corridors, these systems reduce downtime and structural fatigue in dense urban transit.',
    link: '/ballastless-track-urban-metro',
    image: '/ballasttrack.png'
  },

  {
    title: 'Patil RHEDA System',
    description: 'A specialized ballastless track system for viaducts and tunnels — developed in partnership with German engineering standards.',
    link: '/patil-rheda-system',
    image: '/26_mobile_RHEDA_plant.jpg'
  },
  {
    title: 'Precast Plinth',
    description: 'Factory-prepared plinth units that offer cleaner installation, reduced on-site time, and greater curve control.',
    link: '/precast-plinth',
    image: '/precast1.jpg'
  },
  
  {
    title: 'Flash Butt Welding of Rails',
    description: 'Our in-house welding plants handle high-precision rail panel fabrication using proven flash butt welding techniques.',
    link: '/flash-butt-welding-of-rails',
    image: '/flashbuttslider.jpeg'
  }
];

// Simple typewriter component that supports multiple colored segments and an optional line break
const TypewriterText: React.FC<{
  segments: { text: string; className?: string; lineBreakBefore?: boolean }[];
  typingSpeedMs?: number;
}> = ({ segments, typingSpeedMs = 40 }) => {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    const caretTimer = setInterval(() => setShowCaret((v) => !v), 500);
    return () => clearInterval(caretTimer);
  }, []);

  useEffect(() => {
    if (segmentIndex >= segments.length) return;
    const current = segments[segmentIndex].text;
    const timer = setTimeout(() => {
      if (charIndex < current.length) {
        setCharIndex((c) => c + 1);
      } else {
        setSegmentIndex((s) => s + 1);
        setCharIndex(0);
      }
    }, typingSpeedMs);
    return () => clearTimeout(timer);
  }, [charIndex, segmentIndex, segments, typingSpeedMs]);

  return (
    <span>
      {segments.map((seg, idx) => {
        const isCurrent = idx === segmentIndex;
        const isCompleted = idx < segmentIndex;
        const content = isCompleted
          ? seg.text
          : isCurrent
          ? seg.text.substring(0, charIndex)
          : '';
        return (
          <React.Fragment key={idx}>
            {seg.lineBreakBefore && <br />}
            <span className={seg.className}>{content}</span>
          </React.Fragment>
        );
      })}
      <span className="inline-block w-1 ml-1 align-baseline" style={{ opacity: showCaret ? 1 : 0, backgroundColor: '#ffffff', height: '1em' }}></span>
    </span>
  );
};

const SystemsContent = () => {
  useGSAPAnimations();

  return (
    <>
      <section className="relative bg-black text-white overflow-hidden">
        {/* Mobile Layout */}
        <div className="md:hidden min-h-screen">
          {/* Mobile Hero Header */}
          <div className="relative h-screen flex flex-col hero-section">
            <div className="absolute inset-0 hero-image">
              <Image src="/rndimage.JPG" alt="Systems" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="relative z-10 flex-1 flex items-center justify-start px-6 hero-content">
              <div className="text-left w-full max-w-lg">
                <h1 className="hero-title font-bold animate-fadeInUp drop-shadow-2xl text-white">
                  Our Systems
                </h1>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mr-auto mt-8 rounded-full animate-pulse shadow-lg"></div>
                <p className="text-white hero-subtitle mt-8 font-medium tracking-wide drop-shadow-xl">
                  Advanced railway engineering solutions
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Content Section */}
          <div className="bg-[#1A1A1A] px-6 py-12">
            <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
              <Image src="/system23.jpg" alt="Engineering Excellence" fill className="object-cover" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
              <span className="text-[#F2913F]">Engineering Excellence</span><br/>
              <span className="text-white">for a </span>
              <span className="text-[#8A393B]">Stronger Tomorrow.</span>
            </h2>
            <div className="w-16 border-t border-gray-700 mb-6"></div>
            <p className="fluid-body text-gray-300">
              Track systems are where structural integrity meets engineering detail. Over the years, we've developed and implemented advanced rail systems across urban metros, mainlines, tunnels, and yards — engineered to last, with a focus on precision and long-term performance.
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block h-screen">
          {/* Top half */}
          <div className="h-1/2 flex hero-section relative overflow-hidden">
            {/* Left side */}
            <div className="w-1/2 flex items-center justify-start p-8 text-left hero-content">
              <h1 className="hero-title font-bold animate-fadeInUp">Our Systems</h1>
            </div>
            {/* Right side */}
            <div className="w-1/2 relative hero-image">
              <Image src="/rndimage.JPG" alt="Systems" fill className="object-cover" sizes="50vw" priority />
            </div>
          </div>
          {/* Bottom half */}
          <div className="h-1/2 flex hero-section relative overflow-hidden">
            {/* Left side */}
            <div className="w-1/2 relative hero-image">
              <Image src="/system23.jpg" alt="Engineering Excellence" fill className="object-cover" sizes="50vw" />
            </div>
            {/* Right side */}
            <div className="w-1/2 bg-[#1A1A1A] flex flex-col justify-center p-12 animate-fadeInUp hero-content">
              <h2 className="fluid-h3 font-bold leading-tight">
                <TypewriterText
                  segments={[
                    { text: 'Engineering Excellence', className: 'text-[#F2913F]' },
                    { text: 'for a ', lineBreakBefore: true },
                    { text: 'Stronger Tomorrow.', className: 'text-[#8A393B]' },
                  ]}
                />
              </h2>
              <div className="w-1/2 border-t border-gray-700 my-8"></div>
              <p className="fluid-body">
                Track systems are where structural integrity meets engineering detail. Over the years, we've developed and implemented advanced rail systems across urban metros, mainlines, tunnels, and yards — engineered to last, with a focus on precision and long-term performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Section */}
      <section className="relative z-10 bg-white text-gray-800 pt-16 md:pt-24 pb-24 overflow-hidden">
        <div className="space-y-12 md:space-y-24">
          {systemsData.map((system, index) => (
            <div key={index} className="relative group fade-in-section">
              {/* Mobile Layout */}
              <div className="md:hidden px-6 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: system.image ? `url(${system.image})` : 'none' }}></div>
                  <div className="p-6">
                    <h3 className="fluid-h3 font-bold text-amber-600 mb-3">{system.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed fluid-body">{system.description}</p>
                    <a href={system.link} className="group/link inline-flex items-center gap-3 font-medium fluid-body text-black">
                      Read more
                      <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-400 text-gray-600 transition-all duration-300 group-hover/link:bg-black group-hover/link:text-white group-hover/link:border-black">
                        <ArrowRight size={14} className="transform transition-transform group-hover/link:translate-x-1" />
                      </span>
                    </a>
                    <div 
                      className="mt-4 h-1.5 w-full max-w-xs" 
                      style={{ 
                        background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block h-56 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gray-100 w-5/12 bg-cover bg-center z-0"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                    backgroundImage: system.image ? `url(${system.image})` : 'none'
                  }}
                ></div>
                <div className="relative max-w-screen-xl mx-auto h-full z-10">
                  <div className="absolute left-5 top-0 h-full flex items-center w-6/12 transform translate-x-[85%]">
                    <div className="pr-8">
                      <h3 className="text-3xl font-bold font-clash tracking-wide text-amber-600">{system.title}</h3>
                      <p className="mt-4 text-lg text-gray-600">{system.description}</p>
                      <a href={system.link} className="group/link inline-flex items-center mt-6 gap-[13px] font-clash font-medium text-2xl text-black" style={{ lineHeight: '72px' }}>
                        Read more
                        <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-gray-400 text-gray-600 transition-all duration-300 group-hover/link:bg-black group-hover/link:text-white group-hover/link:border-black">
                          <ArrowRight size={16} className="transform transition-transform group-hover/link:translate-x-1" />
                        </span>
                      </a>
                      <div 
                        className="mt-3 h-1.5 w-full max-w-sm" 
                        style={{ 
                          background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const SystemsPage = () => {
  return (
    <div className="bg-[#1E1E1E] text-white">
      <SystemsContent />
    </div>
  );
}

export default SystemsPage; 