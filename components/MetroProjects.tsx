"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const metroProjects = [
  { 
    name: 'Bangalore Metro', 
    description: "Providing advanced ballastless track solutions for Bangalore's rapidly expanding metro network." 
  },
  { 
    name: 'Delhi Metro', 
    description: "A key partner in one of India's largest and busiest metro systems, ensuring reliability and safety." 
  },
  { 
    name: 'Mumbai Metro', 
    description: "Deploying high-performance track systems to support Mumbai's complex and high-density urban transit environment." 
  },
  { 
    name: 'Chennai Metro', 
    description: "Contributing to the development of Chennai's modern metro infrastructure with our state-of-the-art track technologies." 
  },
];

const MetroProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(Math.floor(latest * metroProjects.length), metroProjects.length - 1);
    setActiveIndex(newIndex);
  });

  return (
    <div ref={ref} className="relative h-[250vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            
            <div className="relative h-72">
              <p className="text-lg sm:text-xl text-gray-700 mb-8">
                This system has been successfully deployed in multiple metro projects, including:
              </p>
              {metroProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pt-16"
                >
                  <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              {metroProjects.map((project, index) => (
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
                    {index < metroProjects.length - 1 && (
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
                    {project.name}
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

export default MetroProjects; 