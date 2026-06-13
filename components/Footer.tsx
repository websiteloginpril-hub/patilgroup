'use client';

import Link from 'next/link';
import { Linkedin, ArrowUp, MapPin } from 'lucide-react';

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/systems', label: 'Systems' },
  { href: '/projects', label: 'Projects' },
  { href: '/cme', label: 'CME' },
  { href: '/careers', label: 'Careers' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white">
      {/* ===== MOBILE FOOTER (below md) ===== */}
      <div className="md:hidden px-4 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <address className="not-italic text-[11px] font-semibold leading-snug">
              6-3-1239/B/111 Raj Bhavan Rd,
              <br />
              Raj Bhavan Quarters Colony,
              <br />
              Somajiguda, Hyderabad,
              <br />
              Telangana India, 500082
            </address>

            <div className="mt-3 space-y-0.5 text-[11px] leading-snug text-gray-300">
              <p>
                <a href="mailto:info@patilgroup.com" className="break-all transition-colors hover:text-orange-400">
                  info@patilgroup.com
                </a>
              </p>
              <p>
                <a href="tel:+914039556700" className="whitespace-nowrap transition-colors hover:text-orange-400">
                  Tel: +91 40 3955 6700/6800
                </a>
              </p>
              <p>
                <a href="tel:+914039556750" className="transition-colors hover:text-orange-400">
                  Fax: +91 40 3955 6750
                </a>
              </p>
            </div>
          </div>

          <nav className="shrink-0 text-right">
            <ul className="space-y-1 text-[12px] text-gray-200">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-orange-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="flex flex-col items-start gap-2">
            <Link href="/contact" className="inline-block rounded-full bg-[#F2913F] px-3 py-1.5 text-[10px] font-bold text-black transition-colors hover:bg-orange-400">
              CONTACT US
            </Link>
            <Link href="/whistleblower" className="inline-block rounded-full bg-[#F2913F] px-3 py-1.5 text-[10px] font-bold text-black transition-colors hover:bg-orange-400">
              WHISTLEBLOWER
            </Link>
            <Link href="/privacy-policy" className="inline-block rounded-full bg-[#F2913F] px-3 py-1.5 text-[10px] font-bold text-black transition-colors hover:bg-orange-400">
              PRIVACY POLICY
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open('https://maps.app.goo.gl/Hyms5ZonVwVXRy6t7?g_st=aw', '_blank')}
              className="rounded-full bg-[#F2913F] p-1.5 text-black transition-colors hover:bg-orange-400"
              aria-label="View location on Google Maps"
            >
              <MapPin size={14} />
            </button>
            <a
              href="https://www.linkedin.com/company/patil-group/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Patil Group on LinkedIn"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-orange-400"
            >
              <Linkedin size={13} />
            </a>
            <button
              onClick={scrollToTop}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2913F] text-black transition-colors hover:bg-orange-400"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-800 pt-3">
          <p className="text-center text-[10px] leading-snug text-gray-400">
            CIN: U60100TG1996PTC023894 | &copy; 2025 Patil Rail Infrastructure Pvt. Ltd. (PRIL) | <strong>All rights reserved.</strong>
          </p>
          <p className="mt-1 text-center text-[10px] leading-snug text-gray-400">
            Mr. Santosh Sinha, GM - Compliance | +91 9930495226
          </p>
        </div>
      </div>

      {/* ===== DESKTOP FOOTER (md and above) — original layout ===== */}
      <div className="hidden md:block">
        {/* Pre-footer section */}
        <div className="bg-black pt-8 sm:pt-12 md:pt-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <address className="not-italic">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold">
                  6-3-1239/B/111 Raj Bhavan Rd,<br />
                  Raj Bhavan Quarters Colony,<br />
                  Somajiguda, Hyderabad,<br />
                  Telangana India, 500082
                </p>
              </address>
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
          </div>
        </div>

        {/* Main footer section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

            {/* About & Socials */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-0">
                <p className="text-xs sm:text-sm">
                  <a href="mailto:info@patilgroup.com" className="hover:text-orange-400 transition-colors">info@patilgroup.com</a>
                </p>
                <p className="text-sm sm:text-base">
                  <a href="tel:+914039556700" className="hover:text-orange-400 transition-colors whitespace-nowrap">Tel No:+91 40 3955 6700/6800</a>
                </p>
                <p className="text-sm sm:text-base">
                  <a href="tel:+914039556750" className="hover:text-orange-400 transition-colors">Fax No:+91 40 3955 6750</a>
                </p>
              </div>
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
              <div className="flex items-stretch justify-between gap-4 md:block">
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
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2">
              <div className="mt-6 flex justify-end md:mt-8 md:items-center md:justify-between">
                <div className="md:flex md:flex-wrap md:items-center md:gap-4">
                  <Link href="/whistleblower" className="inline-block">
                    <span className="inline-block bg-[#F2913F] text-black font-bold py-3 px-6 rounded-full text-sm hover:bg-orange-400 transition-colors">WHISTLEBLOWER POLICY</span>
                  </Link>
                  <Link href="/privacy-policy" className="inline-block">
                    <span className="inline-block bg-[#F2913F] text-black font-bold py-3 px-6 rounded-full text-sm hover:bg-orange-400 transition-colors">PRIVACY POLICY</span>
                  </Link>
                </div>
                <button
                  onClick={scrollToTop}
                  className="h-12 w-12 items-center justify-center rounded-full bg-[#F2913F] text-black transition-colors hover:bg-orange-400 md:flex hidden"
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* CIN Information */}
          <div className="mt-2 border-t border-gray-800 pt-6 sm:mt-8">
            <p className="text-gray-400 text-sm text-center">
              CIN: U60100TG1996PTC023894 | © 2025 Patil Rail Infrastructure Pvt. Ltd. (PRIL) | <strong>All rights reserved.</strong>
            </p>
            <p className="text-gray-400 text-sm text-center mt-2">
              Mr. Santosh Sinha, General Manager - Compliance, Mobile: +91 9930495226
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
