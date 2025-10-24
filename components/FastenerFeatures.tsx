"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const featureData = [
  {
    title: 'Cost effective as the majority of the components are manufactured locally.',
    description: 'Fasteners are link systems that hold the track to the sleepers. Different types of fasteners are used for different railway tracks. Patil Group entered into a strategic collaboration to develop, manufacture, market and sales of Fastening Systems.',
  },
  {
    title: 'Full fledged technical team for support.',
    description: 'With Indian Railways deciding to upgrade railway infrastructure in line with requirements of global standards and safety of passengers, a change was required in the fastening systems for railway tracks. Patil Group supplied Fasteners for Delhi and Chennai Metro Track Projects.',
  },
  {
    title: 'Maintenance-free, fit-and-forget system',
    description: 'Our advanced fastening systems are designed for longevity and require minimal maintenance, ensuring a reliable and cost-effective solution for modern railway infrastructure.',
  },
  {
    title: 'Systems available to suit various tow loads up to 12 KN',
    description: 'We offer a range of fastening systems capable of handling diverse operational requirements, including tow loads up to 12 KN, making them suitable for a variety of railway applications.',
  },
];

const FastenerFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(Math.floor(latest * featureData.length), featureData.length - 1);
    setActiveIndex(newIndex);
  });

  return (
    <div ref={ref} className="relative h-[250vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            
            <div className="relative h-72">
              {featureData.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              {featureData.map((feature, index) => (
                <div key={index} className="flex items-start mb-10 last:mb-0">
                  <div className="flex flex-col items-center mr-8">
                    <motion.div 
                      className="w-4 h-4 rounded-full"
                      animate={{
                        backgroundColor: index === activeIndex ? '#F59E0B' : '#E5E7EB',
                        scale: index === activeIndex ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    {index < featureData.length - 1 && (
                      <div className="w-0.5 h-20 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <motion.h3 
                    className="font-clash font-medium text-[32px] leading-[40px] tracking-[-0.25px]"
                    animate={{ 
                      color: index === activeIndex ? '#F2913F' : '#D1D5DB' 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.title}
                  </motion.h3>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastenerFeatures; 