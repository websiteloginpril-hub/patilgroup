"use client";

import React from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { Download } from 'lucide-react';
import Image from 'next/image';

const ResponsibilitiesPage = () => {
  useGSAPAnimations();

  const brochures = [
    {
      title: "Corporate brochure",
      filename: "PG Brochure .pdf",
      description: "Complete overview of Patil Group's services and capabilities",
      coverImage: "/Brochure/coverimage1.jpg",
      hasCoverImage: true
    },
    {
      title: "Precast brochure",
      filename: "precastbrochure.pdf",
      description: "Comprehensive guide to our precast concrete solutions",
      coverImage: "/Brochure/coverimage2.jpg",
      hasCoverImage: true
    }
  ];

  const handleDownload = (filename: string, title: string) => {
    const link = document.createElement('a');
    link.href = `/Brochure/${filename}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="bg-white pt-[103px]">
      {/* CSR Resources Section */}
      <section className="bg-white text-black py-16 md:py-24">
        {/* Brochures Section - Full Width Header */}
        <div className="w-screen overflow-hidden mb-12">
          {/* Brochure heading with gradient lines from screen edges */}
          <div className="flex items-center">
            <div className="flex-1" style={{
              height: '28px',
                background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>
            <div className="px-8 flex-shrink-0">
              <h2 className="font-bold text-[#8A393B] leading-tight whitespace-nowrap" style={{
                fontFamily: '"Helvetica Neue"',
                fontSize: '64px',
                fontWeight: 700,
                lineHeight: '75%'
              }}>
                  Brochures
                </h2>
                </div>
            <div className="flex-1" style={{
              height: '28px',
                background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>
          </div>
              </div>

        {/* Brochures Content - Centered Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
              {brochures.map((brochure, index) => (
                <div key={index} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-300 sm:hover:scale-105">
                  {/* Card Header with Cover Image or PDF Preview */}
                  <div className="relative h-60 sm:h-72 lg:h-80 bg-white overflow-hidden">
                    {brochure.hasCoverImage && brochure.coverImage ? (
                      <>
                        <Image
                          src={brochure.coverImage}
                          alt={`${brochure.title} Cover`}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                      </>
                    ) : (
                      <>
                        <iframe
                          src={`/Brochure/${brochure.filename}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-full transform scale-150 origin-top-left pointer-events-none"
                          title={`${brochure.title} Preview`}
                          style={{
                            width: '150%',
                            height: '150%',
                            transform: 'scale(0.67) translate(-25%, -25%)'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                      </>
                    )}
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 sm:p-8 bg-white">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight text-gray-800">
                      {brochure.title}
                    </h3>
                    <p className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed text-gray-600">
                      {brochure.description}
                    </p>
                    
                    {/* File Info */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#F2913F]"></div>
                        PDF Format
                      </span>
                      <span>•</span>
                      <span>Multiple Pages</span>
                    </div>
                    
                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(brochure.filename, brochure.title)}
                      className="flex w-full items-center justify-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium transition-colors duration-200 text-base sm:text-lg bg-[#F2913F] hover:bg-[#E6822B]"
                    >
                      <Download size={18} className="sm:w-5 sm:h-5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsibilitiesPage;
