'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/mt train.jpg',
  '/train.png',
  '/train 2.jpg',
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="relative w-full h-[500px] px-4 sm:px-6 lg:px-[61px]">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Carousel image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="px-4 sm:px-6 lg:px-[61px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
} 