'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowUp, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-black text-white">
      {/* Contact headline above address */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold leading-tight">
          
        </h2>
        
      </div>

      {/* Pre-footer section */}
      <div className="bg-black pt-4 sm:pt-6 md:pt-8">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0 md:pr-64 lg:pr-96 xl:pr-[36rem]">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold">6-3-1342/4 Raj Bhavan Rd, Raj Bhavan Quarters Colony Somajiguda,<br />Hyderabad, Telangana 500082</h3>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Link href="/contact" className="inline-block">
                <button className="bg-[#F2913F] text-black font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm hover:bg-orange-400 transition-colors">
                  Contact Us
                </button>
              </Link>
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/Hyms5ZonVwVXRy6t7?g_st=aw', '_blank')}
                className="bg-[#F2913F] text-black p-2 sm:p-3 rounded-full hover:bg-orange-400 transition-colors"
                aria-label="View location on Google Maps"
                title="View our location on Google Maps"
              >
                <MapPin size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          <div className="md:absolute right-0 md:-bottom-32 lg:-bottom-36 xl:-bottom-40 mt-4 md:mt-12 pointer-events-none">
            <Image 
              src="/trainfooter.svg"
              alt="Footer illustration"
              width={350}
              height={200}
              className="object-contain w-64 sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] h-auto px-6"
            />
          </div>
        </div>
      </div>

      {/* Main footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

          {/* About & Socials */}
            <div className="space-y-6">
            
            <p className="text-xs sm:text-sm">
              <a href="mailto:info@patilgroup.com" className="hover:text-orange-400 transition-colors">info@patilgroup.com</a>
              </p>
              <p className="text-sm sm:text-base">
              <a href="tel:+914039556700" className="hover:text-orange-400 transition-colors">+91 40 3955 6700</a>
              </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="https://www.linkedin.com/company/patil-group/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Patil Group on LinkedIn"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-400 transition-colors"
              >
                <Linkedin size={16} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/systems" className="hover:text-white transition-colors">Systems</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/cme" className="hover:text-white transition-colors">CME</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mt-6 sm:mt-8">
              <div className="flex flex-wrap gap-4">
                <Link href="/whistleblower" className="inline-block">
                  <span className="inline-block bg-[#F2913F] text-black font-bold py-3 px-6 rounded-full text-sm hover:bg-orange-400 transition-colors">WHISTLEBLOWER POLICY</span>
                </Link>
                <Link href="/privacy-policy" className="inline-block">
                  <span className="inline-block bg-[#F2913F] text-black font-bold py-3 px-6 rounded-full text-sm hover:bg-orange-400 transition-colors">PRIVACY POLICY</span>
                </Link>
              </div>
             <button 
                onClick={scrollToTop} 
                className="bg-[#F2913F] w-12 h-12 rounded-full flex items-center justify-center text-black hover:bg-orange-400 transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} />
             </button>
            </div>
          </div>
        </div>
        
        {/* CIN Information */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <p className="text-gray-400 text-sm text-center">
            CIN: U60100TG1996PTC023894 | © 2025 Patil Rail Infrastructure Pvt. Ltd. (PRIL) | <strong>All rights reserved.</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

