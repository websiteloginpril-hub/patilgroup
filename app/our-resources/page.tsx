"use client";

import React, { useState } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { Download, ChevronDown, Folder, FileText } from 'lucide-react';
import Image from 'next/image';

interface PDFDocument {
  name: string;
  filename: string;
  path: string;
}

interface DocumentCategory {
  id: string;
  title: string;
  pdfs: PDFDocument[];
}

const OurResourcesPage = () => {
  useGSAPAnimations();

  const [isExploreExpanded, setIsExploreExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

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
    },
    {
      title: "Steel Wire",
      filename: "Patil Group Steel Wire.pdf",
      description: "ABOUT OUR FACILITY",
      coverImage: "/Brochure/coverimage3.jpg",
      hasCoverImage: true
    }
  ];

  // Document categories with their PDFs
  // To add PDFs:
  // 1. Create folder structure: public/documents/[category-name]/
  // 2. Upload your PDF files to the appropriate folder
  // 3. Add them below in the pdfs array for each category
  // Format: { name: "Display Name", filename: "actual-filename.pdf", path: "/documents/category-name/actual-filename.pdf" }
  const documentCategories: DocumentCategory[] = [
    {
      id: "annual-return",
      title: "Annual Return",
      pdfs: [
        { name: "Annual Return FY 2023-24", filename: "Annual-Return_FY-2023-24.pdf", path: "/documents/annual-return/Annual-Return_FY-2023-24.pdf" },
        { name: "Annual Return FY 2022-23", filename: "Annual-Return_FY-2022-23.pdf", path: "/documents/annual-return/Annual-Return_FY-2022-23.pdf" },
        { name: "Annual Return FY 2021-22", filename: "Annual-Return_FY_2021-22.pdf", path: "/documents/annual-return/Annual-Return_FY_2021-22.pdf" },
      ]
    },
    {
      id: "csr",
      title: "CSR",
      pdfs: [
        { name: "CSR Policy", filename: "CSR-Policy.pdf", path: "/documents/csr/CSR-Policy.pdf" },
        { name: "CSR Annual Action Plan FY 2024-25", filename: "CSR-Annual-Action-Plan_FY-2024-25.pdf", path: "/documents/csr/CSR-Annual-Action-Plan_FY-2024-25.pdf" },
        { name: "CSR Annual Action Plan FY 2023-24", filename: "CSR-Annual-Action-Plan_FY-2023-24.pdf", path: "/documents/csr/CSR-Annual-Action-Plan_FY-2023-24.pdf" },
        { name: "CSR Annual Action Plan FY 2022-23", filename: "CSR-Annual-Action-Plan_FY-2022-23.pdf", path: "/documents/csr/CSR-Annual-Action-Plan_FY-2022-23.pdf" },
        { name: "Composition of CSR Committee", filename: "Composition-of-CSR-Committee.pdf", path: "/documents/csr/Composition-of-CSR-Committee.pdf" },
      ]
    },
    {
      id: "notices",
      title: "Notices",
      pdfs: [
        { name: "27th AGM Notice", filename: "27th-AGM-Notice.pdf", path: "/documents/notices/27th-AGM-Notice.pdf" },
        { name: "1st EGM Notice FY 2023-24", filename: "1st-EGM-Notice_FY-2023-24.pdf", path: "/documents/notices/1st-EGM-Notice_FY-2023-24.pdf" },
        { name: "2nd EGM Notice FY 2023-24", filename: "2nd-EGM-Notice_FY-2023-24.pdf", path: "/documents/notices/2nd-EGM-Notice_FY-2023-24.pdf" },
      ]
    },
    {
      id: "other-documents",
      title: "Other Documents",
      pdfs: [
        { name: "Terms and Conditions of Appointment of the Independent Directors", filename: "Terms-and-Conditions-of-appointment-of-the-Independent-Directors.pdf", path: "/documents/other-documents/Terms-and-Conditions-of-appointment-of-the-Independent-Directors.pdf" },
        { name: "Whistle Blower Policy", filename: "WHISTLE-BLOWER-POLICY.pdf", path: "/documents/other-documents/WHISTLE-BLOWER-POLICY.pdf" },
      ]
    },
    {
      id: "resignation-letter",
      title: "Resignation Letter",
      pdfs: [
        { name: "Resignation Letter of Mr. Durga Prasad Subramanyam Anapindi - 14th May 2024", filename: "Resignation-Letter-of-Mr-Durga-Prasad-Subramanyam-Anapindi_14th-May-2024.pdf", path: "/documents/resignation-letter/Resignation-Letter-of-Mr-Durga-Prasad-Subramanyam-Anapindi_14th-May-2024.pdf" },
        { name: "Resignation Letter of Mr. Kokkonda Subrahmaniyam - 18th July 2024", filename: "Resignation-Letter-of-Mr-Kokkonda-Subrahmaniyam_18th-July-2024.pdf", path: "/documents/resignation-letter/Resignation-Letter-of-Mr-Kokkonda-Subrahmaniyam_18th-July-2024.pdf" },
      ]
    }
  ];

  const handleDownload = (filename: string, title: string, path?: string) => {
    const link = document.createElement('a');
    link.href = path || `/Brochure/${filename}`;
    link.download = filename;
    link.click();
  };

  const handleView = (path: string) => {
    window.open(path, '_blank');
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="bg-white pt-[103px]">
      {/* CSR Resources Section */}
      <section className="bg-white text-black py-4 md:py-6">
        {/* Brochures Section - Full Width Header */}
        <div className="w-screen overflow-hidden mb-4">
          {/* Brochure heading with gradient lines from screen edges */}
          <div className="flex items-center">
            <div className="flex-1" style={{
              height: '20px',
                background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>
            <div className="px-6 flex-shrink-0">
              <h2 className="font-bold text-[#8A393B] leading-tight whitespace-nowrap" style={{
                fontFamily: '"Helvetica Neue"',
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: '75%'
              }}>
                  Brochures
                </h2>
                </div>
            <div className="flex-1" style={{
              height: '20px',
                background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>
          </div>
              </div>

        {/* Brochures Content - Centered Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {brochures.map((brochure, index) => (
                <div key={index} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-300 sm:hover:scale-105">
                  {/* Card Header with Cover Image or PDF Preview */}
                  <div className="relative w-full bg-white overflow-hidden">
                    {brochure.hasCoverImage && brochure.coverImage ? (
                      <>
                        <div className="relative w-full">
                          <Image
                            src={brochure.coverImage}
                            alt={`${brochure.title} Cover`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto object-contain object-center max-h-[180px]"
                            style={{ width: '100%', height: 'auto', maxHeight: '180px' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                        </div>
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
                  <div className="p-3 sm:p-4 bg-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-tight text-gray-800">
                      {brochure.title}
                    </h3>
                    <p className="text-xs sm:text-sm mb-2 leading-relaxed text-gray-600 line-clamp-2">
                      {brochure.description}
                    </p>
                    
                    {/* File Info */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F2913F]"></div>
                        PDF Format
                      </span>
                      <span>•</span>
                      <span>Multiple Pages</span>
                    </div>
                    
                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(brochure.filename, brochure.title)}
                      className="flex w-full items-center justify-center gap-2 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base bg-[#F2913F] hover:bg-[#E6822B]"
                    >
                      <Download size={16} className="sm:w-4 sm:h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Explore More Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex justify-center">
            <button
              onClick={() => setIsExploreExpanded(!isExploreExpanded)}
              className="flex items-center gap-2 px-6 py-3 bg-[#F2913F] text-white rounded-lg font-medium hover:bg-[#E6822B] transition-colors duration-200"
            >
              <span>Explore More</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-300 ${isExploreExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>

          {/* Expandable Document Categories */}
          {isExploreExpanded && (
            <div className="mt-8 max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {documentCategories.map((category, index) => (
                  <div key={category.id} className="border-b border-gray-200 last:border-b-0">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 text-left"
                    >
                      <Folder className="w-6 h-6 text-gray-600 flex-shrink-0" />
                      <span className="flex-1 text-gray-800 font-medium text-lg">
                        {category.title}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                          expandedCategories[category.id] ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Category Content - PDFs List */}
                    {expandedCategories[category.id] && (
                      <div className="bg-gray-50 px-6 py-4">
                        {category.pdfs.length > 0 ? (
                          <div className="space-y-2">
                            {category.pdfs.map((pdf, pdfIndex) => (
                              <div
                                key={pdfIndex}
                                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200"
                              >
                                <FileText className="w-5 h-5 text-[#F2913F] flex-shrink-0" />
                                <span 
                                  className="flex-1 text-gray-700 cursor-pointer hover:text-[#F2913F] transition-colors duration-200"
                                  onClick={() => handleView(pdf.path)}
                                >
                                  {pdf.name}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload(pdf.filename, pdf.name, pdf.path);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded transition-colors duration-200 cursor-pointer"
                                  aria-label={`Download ${pdf.name}`}
                                >
                                  <Download className="w-4 h-4 text-gray-500 hover:text-[#F2913F] transition-colors duration-200" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm py-2">
                            No documents available. Upload PDFs for this category.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OurResourcesPage;
