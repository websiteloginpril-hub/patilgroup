'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const solutions = [
  {
    title: 'Concrete Sleepers',
    description: 'Engineered for strength and durability, our concrete sleepers enhance track stability with minimal maintenance.',
    image: '/05_sleepers_banner.jpg',
    link: '#',
  },
  {
    title: 'Turnout Systems',
    description: 'Precision-engineered turnout systems for seamless track switching and enhanced operational efficiency.',
    image: '/08_turnouts_switches_banner.jpg',
    link: '#',
  },
  {
    title: 'Fastening Systems',
    description: 'Reliable and robust fastening systems that ensure track integrity and safety under all conditions.',
    image: '/04_fasteners_banner.jpg',
    link: '#',
  },
];

export default function SolutionsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === solutions.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#F2F2F2] overflow-hidden fade-in-section relative">
      <div className="lg:grid lg:grid-cols-5 min-h-[500px]">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className={`lg:col-span-2 min-h-[400px] lg:min-h-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${solution.image})`,
              clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              zIndex: 1,
            }}
          ></div>
        ))}
        <div className="lg:col-span-3 space-y-6 lg:space-y-8 p-8 sm:p-12 lg:p-16 slide-in-left z-10">
          <h2
            className="flex items-center"
            style={{
              fontFamily: 'inherit',
              fontWeight: 'bold',
              fontSize: '64px',
              lineHeight: '61px',
              color: '#8A393B',
            }}
          >
            Our Solutions
          </h2>

          <div className="space-y-4 lg:space-y-6">
            <h3
              className="flex items-center"
              style={{
                fontFamily: 'inherit',
                fontWeight: 'bold',
                fontSize: '32px',
                lineHeight: '61px',
                color: '#000000',
              }}
            >
              {solutions[current].title}
            </h3>
            <p
              style={{
                fontFamily: 'inherit',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '28px',
                color: '#000000',
              }}
            >
              {solutions[current].description}
            </p>
            <Link href={solutions[current].link} className="text-[#8A393B] hover:underline">
              Read more
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === current ? 'bg-[#D97706]' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
            <Link
              href="/products"
              className="inline-flex items-center group transition-all duration-300"
              style={{
                fontFamily: 'inherit',
                fontWeight: 'bold',
                fontSize: '24px',
                lineHeight: '72px',
                color: '#000000',
                gap: '13px',
              }}
            >
              Products
              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#8A393B] text-[#8A393B] group-hover:bg-[#8A393B] group-hover:text-white transition-colors">
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 