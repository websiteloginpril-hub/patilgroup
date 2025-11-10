"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

type Product = {
  name: string;
  description: string;
  link: string;
};

type AnimatedProductListProps = {
  products: Product[];
};

export const AnimatedProductList = ({ products }: AnimatedProductListProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="relative border-l border-gray-200 pl-8 md:pl-16">
      {/* Animated Vertical Line */}
      <div
        className="absolute top-0 -left-px h-full w-px bg-gray-300 transition-transform duration-1000 ease-in-out"
        style={{
          transform: inView ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
        }}
      />

      <div className="space-y-12">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative transition-opacity duration-700 ease-in-out"
            style={{
              opacity: inView ? 1 : 0,
              transitionDelay: inView ? `${index * 200}ms` : '0ms',
            }}
          >
            <span
              className="absolute -left-[33px] md:-left-[65px] top-1 h-2 w-2 bg-black rounded-full transition-opacity duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: inView ? `${index * 200 + 100}ms` : '0ms',
              }}
            ></span>
            <h3 className="text-4xl font-bold text-amber-500">{product.name}</h3>
            <p className="mt-2 text-xl text-gray-600">{product.description}</p>
            <a href={product.link} className="group inline-flex items-center mt-4 text-lg text-gray-800 hover:text-amber-500 transition-colors">
              Read More
              <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
