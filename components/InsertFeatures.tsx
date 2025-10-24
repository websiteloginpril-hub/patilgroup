"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const featureData = [
  {
    title: 'SGCI Inserts',
    description: "In continuation with its long-term strategy to be a one stop provider of all Rail Track and Metro Rail track related components Patil Group has achieved another milestone. We have recently established a Foundry near Kallakal, Hyderabad for manufacturing of Railway track components. In the foundry, we manufacture the following components for now.",
  },
  {
    title: 'Ribbed Base Plates',
    description: 'These sleepers are engineered to withstand the demanding load conditions of modern rail networks and comply with the rigorous technical standards of Indian Railways.',
  },
];

const InsertFeatures = () => {
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
                        backgroundColor: index === activeIndex ? '#F2913F' : '#D1D5DB',
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
                      color: index === activeIndex ? '#F59E0B' : '#D1D5DB' 
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

export default InsertFeatures; 