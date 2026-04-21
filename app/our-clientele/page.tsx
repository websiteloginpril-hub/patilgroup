"use client";
import React from "react";
import Image from "next/image";

const logos1 = [
  '/client logos/client 1.png',
  '/client logos/client 2.png',
  '/client logos/client 3.png',
  '/client logos/client 4.png',
  '/client logos/client 5.png',
  '/client logos/client 6.png',
  '/client logos/client 7.png',
  '/client logos/client 8.png',
  '/client logos/client 9.png',
  '/client logos/client 10.png',
  '/client logos/client 11.png',
  '/client logos/client 12.png',
];

const logos2 = [
  '/client logos/client 13.png',
  '/client logos/client 14.png',
  '/client logos/client 15.png',
  '/client logos/client 16.png',
  '/client logos/client 17.png',
  '/client logos/client 18.png',
  '/client logos/client 19.png',
  '/client logos/client 20.png',
  '/client logos/client 21.png',
  '/client logos/client 22.png',
  '/client logos/client 23.png',
];

const MarqueeRow = ({ logos, reverse = false }: any) => {
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {/* EXACT DUPLICATION */}
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex-none px-3">
            <div className="w-28 md:w-44 h-20 md:h-24 flex items-center justify-center bg-white rounded-lg">
              <Image
                src={logo}
                alt=""
                width={160}
                height={96}
                className="object-contain max-h-16"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OurClientelePage = () => {
  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <div className="relative h-[40vh]">
        <Image
          src="/clientimage.jpg"
          alt="Hero"
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <section className="pt-4 sm:pt-6 pb-0 space-y-4 sm:space-y-6">

        <h2 className="text-center text-xl md:text-2xl font-bold">
          Trusted Partners
        </h2>

        {/* MOBILE + DESKTOP SAME (NO SEPARATE LOGIC NEEDED) */}
        <div className="space-y-6">
          <MarqueeRow logos={logos1} />
          <MarqueeRow logos={logos2} reverse />
        </div>

      </section>
    </div>
  );
};

export default OurClientelePage;