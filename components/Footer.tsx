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

      {/* ================================== */}
      {/* DESKTOP FOOTER (>=md) — from image */}
      {/* ================================== */}
      <div className="hidden md:block bg-black text-white">
        {/* Main 3-column section */}
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-14 pb-10">
          <div className="grid grid-cols-3 gap-8">

            {/* ── Col 1: Address ── */}
            <div className="flex flex-col items-start">
              <h4 className="text-[#F2913F] font-bold text-lg mb-5 tracking-wide">Address</h4>
              <address className="not-italic">
                <p className="text-white text-[15px] font-medium leading-relaxed mb-4">
                  6-3-1239/B/111 Raj Bhavan Rd, Raj Bhavan<br />
                  Quarters Colony, Somajiguda, Hyderabad,<br />
                  Telangana India, 500082
                </p>
                <div className="text-gray-400 text-[14px] space-y-1">
                  <p><a href="mailto:info@patilgroup.com" className="hover:text-[#F2913F] transition-colors">info@patilgroup.com</a></p>
                  <p><a href="tel:+914039556700" className="hover:text-[#F2913F] transition-colors">+91 40 3955 6700/6800</a></p>
                  <p><a href="tel:+914039556750" className="hover:text-[#F2913F] transition-colors">Fax: +91 40 3955 6750</a></p>
                </div>
              </address>
              {/* Social icons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/Hyms5ZonVwVXRy6t7?g_st=aw', '_blank')}
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center text-gray-300 hover:text-[#F2913F] hover:border-[#F2913F] transition-all duration-200"
                  aria-label="View location on Google Maps"
                >
                  <MapPin size={17} />
                </button>
                <a
                  href="https://www.linkedin.com/company/patil-group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Patil Group on LinkedIn"
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center text-gray-300 hover:text-[#F2913F] hover:border-[#F2913F] transition-all duration-200"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div className="flex flex-col items-start pl-8">
              <h4 className="text-[#F2913F] font-bold text-lg mb-5 tracking-wide">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: '/about', label: 'About Us' },
                  { href: '/products', label: 'Products' },
                  { href: '/systems', label: 'Systems' },
                  { href: '/projects', label: 'Projects' },
                  { href: '/cme', label: 'CME' },
                  { href: '/careers', label: 'Careers' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 text-[14px] hover:text-[#F2913F] transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Action Buttons ── */}
            <div className="flex flex-col gap-4 items-end justify-start pt-1">
              <Link
                href="/contact"
                className="w-full max-w-[260px] bg-[#7a2d2d] hover:bg-[#8a393b] text-white font-bold text-[13px] tracking-widest uppercase py-4 px-6 rounded-xl text-center transition-all duration-200 hover:brightness-110"
              >
                CONTACT US
              </Link>
              <Link
                href="/whistleblower"
                className="w-full max-w-[260px] bg-[#111] hover:bg-[#1a1a1a] text-white font-bold text-[13px] tracking-widest uppercase py-4 px-6 rounded-xl text-center border border-gray-700 hover:border-gray-500 transition-all duration-200"
              >
                WHISTLEBLOWER POLICY
              </Link>
              <Link
                href="/privacy-policy"
                className="w-full max-w-[260px] bg-[#111] hover:bg-[#1a1a1a] text-white font-bold text-[13px] tracking-widest uppercase py-4 px-6 rounded-xl text-center border border-gray-700 hover:border-gray-500 transition-all duration-200"
              >
                PRIVACY POLICY
              </Link>
            </div>

          </div>
        </div>

        {/* ── Bottom bar: divider + copyright + scroll-to-top ── */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
            <div className="flex-1 text-center">
              <p className="text-gray-500 text-[13px]">
                CIN: U60100TG1996PTC023894 | © 2025 Patil Rail Infrastructure Pvt. Ltd. (PRIL) |{' '}
                <strong className="text-gray-400 font-semibold">All rights reserved.</strong>
              </p>
              <p className="text-gray-500 text-[13px] mt-1">
                Mr. Santosh Sinha, General Manager - Compliance, Mobile: +91 9930495226
              </p>
            </div>
            {/* Orange scroll-to-top circle — right edge */}
            <button
              onClick={scrollToTop}
              className="shrink-0 ml-6 bg-[#F2913F] w-12 h-12 rounded-full flex items-center justify-center text-black hover:bg-orange-400 transition-all duration-300 shadow-lg hover:-translate-y-1"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

