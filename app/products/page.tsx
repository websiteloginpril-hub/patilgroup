"use client";
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { AnimatedProductList } from '@/components/AnimatedProductList';
import { TypingAnimation } from '@/components/TypingAnimation';
import { GridLines } from '@/components/GridLines';
import HLSVideo from '@/components/HLSVideo';

const products = [
    {
      name: "Sleepers",
      description: "Concrete units for mainlines, metros, and turnouts",
      link: "/sleepers",
      image: "/sleepersslider.jpg",
    },
    {
      name: "Fasteners",
      description: "Clips, clamps, and insulators for securing rails",
      link: "/fasteners",
      image: "/fastenerslider.webp",
    },
    {
      name: "Wires",
      description: "Prestressed steel strands for sleeper reinforcement",
      link: "/wires",
      image: "/htswireslider.jpg",
    },
    {
      name: "Inserts",
      description: "SGCI castings and base plates for fastening systems",
      link: "/inserts",
      image: "/insertsslider.jpg",
      },
      {
        name: "Precast",
        description: "Precast plinth units for rapid installation and uniform geometry",
        link: "/precast",
        image: "/precastslider.jpg",
      },
  ];

const ProductsPage = () => {
  useGSAPAnimations();

  return (
    <div className="bg-black text-white">
      <section className="relative h-screen max-h-screen overflow-hidden hero-section">
        {/* Background Video for parallax */}
        <div className="absolute inset-0 w-full h-full hero-video">
          <HLSVideo
            src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/7f508f8619fc694d88c228bc4df4c260/manifest/video.m3u8"
            fallbackSrc="/productherovideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          />
        </div>
        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content for parallax */}
        <div className="absolute inset-0 z-10 hero-content">
          {/* Mobile Layout */}
          <div className="md:hidden h-full flex items-center justify-start py-8">
            <div className="text-left px-6 w-full max-w-lg">
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-2xl animate-fadeInUp">
                Track<br/>Components
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mt-6 rounded-full animate-pulse shadow-lg"></div>
              <p className="text-white text-lg sm:text-xl mt-6 font-medium tracking-wide drop-shadow-xl leading-relaxed">
                Explore our railway solutions
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-full items-center justify-start p-8 sm:p-12 lg:p-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white animate-fadeInUp">
              Track<br/>Components
            </h1>
          </div>
        </div>
      </section>

      {/* Middle section redesigned to match Systems page style */}
      <section className="bg-white text-gray-800 pt-16 md:pt-24 pb-24 overflow-hidden">
        <div className="space-y-12 md:space-y-24">
          {products.map((p, index) => (
            <div key={index} className="relative group fade-in-section">
              {/* Mobile Layout */}
              <div className="md:hidden px-6 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }}></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-600 mb-3">{p.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{p.description}</p>
                    <a href={p.link} className="group/link inline-flex items-center gap-3 font-medium text-lg text-black">
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
              <div className="hidden md:block h-56">
                <div 
                  className="absolute top-0 left-0 h-full bg-gray-100 w-5/12 bg-cover bg-center"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                    backgroundImage: `url(${p.image})`
                  }}
                ></div>
                <div className="relative max-w-screen-xl mx-auto h-full">
                  <div className="absolute left-5 top-0 h-full flex items-center w-6/12 transform translate-x-[85%]">
                    <div className="pr-8">
                      <h3 className="text-3xl font-bold font-clash tracking-wide text-amber-600">{p.name}</h3>
                      <p className="mt-4 text-lg text-gray-600">{p.description}</p>
                      <a href={p.link} className="group/link inline-flex items-center mt-6 gap-[13px] font-clash font-medium text-2xl text-black" style={{ lineHeight: '72px' }}>
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

      {/* CTA after slider */}
      <section className="bg-white text-black py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1]">
            <span className="text-[#8A393B]">Get in touch for</span><br/>
            <span className="text-[#F2913F]">specifications or supply.</span>
          </h2>
          <div
            className="mt-6 h-1.5 w-full max-w-xs md:max-w-sm lg:w-80"
            style={{
              background:
                'linear-gradient(90deg, #8A393B 0%, #1E3888 20%, #F2913F 60%, rgba(242,145,63,0) 100%)',
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
