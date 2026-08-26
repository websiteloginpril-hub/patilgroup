'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isSystemsMenuOpen, setIsSystemsMenuOpen] = useState(false);
  const [isMobileAboutExpanded, setIsMobileAboutExpanded] = useState(false);
  const [isMobileProductsExpanded, setIsMobileProductsExpanded] = useState(false);
  const [isMobileSystemsExpanded, setIsMobileSystemsExpanded] = useState(false);
  const pathname = usePathname();

  const aboutLinks = [
    { href: '/about', label: 'About' },
    { href: '/our-vision', label: 'Our Values' },
    { href: '/legacy', label: 'Our Legacy' },
    { href: '/management', label: 'Management' },
    { href: '/our-resources', label: 'Our Resources' },
    { href: '/our-presence', label: 'Our Presence' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/our-clientele', label: 'Our Clientele' },
  ];

  const productLinks = [
    { href: '/sleepers', label: 'Sleepers' },
    { href: '/fasteners', label: 'Fasteners' },
    { href: '/wires', label: 'Wires' },
    { href: '/inserts', label: 'Inserts' },
    { href: '/precast', label: 'Precast' },
    { href: '/safety', label: 'Track Safety' },
  ];

  const systemLinks = [
    { href: '/ballastless-track-urban-metro', label: 'Ballastless Track' },
    { href: '/flash-butt-welding-of-rails', label: 'Flash Butt Welding' },
    { href: '/patil-rheda-system', label: 'Patil RHEDA System' },

    { href: '/precast-plinth', label: 'Precast Plinth' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideNav = !(event.target as Element).closest('nav');
      if (clickedOutsideNav) {
        setIsMobileMenuOpen(false);
        setIsAboutMenuOpen(false);
        setIsProductsMenuOpen(false);
        setIsSystemsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.classList.add('menu-open');
    else document.body.classList.remove('menu-open');
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>('[data-navbar]');
    if (!navbar) return;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 50;
      if (Math.abs(lastScrollY - currentScrollY) < 10) return;
      navbar.classList.toggle('scrolled', isScrolled);
      if (currentScrollY > lastScrollY && isScrolled) navbar.classList.add('navbar-hidden');
      else navbar.classList.remove('navbar-hidden');
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
      setIsAboutMenuOpen(false);
      setIsProductsMenuOpen(false);
      setIsSystemsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] px-0 sm:px-6 lg:px-10 pt-0 sm:pt-3 pointer-events-none">
      <nav
        data-navbar
        className={`nav-pill pointer-events-auto mx-auto max-w-[1380px] rounded-none sm:rounded-full px-3 sm:px-6 lg:px-8 transition-all duration-300 ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
        onMouseEnter={() => {
          const navbar = document.querySelector('[data-navbar]');
          if (navbar) navbar.classList.add('hovered');
        }}
        onMouseLeave={() => {
          const navbar = document.querySelector('[data-navbar]');
          if (navbar) navbar.classList.remove('hovered');
          setIsAboutMenuOpen(false);
          setIsProductsMenuOpen(false);
          setIsSystemsMenuOpen(false);
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-3 md:px-6 lg:px-8">
          {/* Bar: logo left · desktop nav / mobile hamburger right */}
          <div className="w-full flex items-center min-h-[46px] sm:min-h-[54px] lg:min-h-[56px] h-full justify-between">

            {/* Logo — left */}
            <div className="flex items-center animate-fadeInLeft ml-0 sm:-ml-4 md:-ml-6 lg:-ml-10">
              <Link href="/" onMouseEnter={() => setIsAboutMenuOpen(false)} aria-label="Patil Group Home">
                <img
                  src="/pg.png"
                  alt="Patil Group Logo"
                  width={240}
                  height={120}
                  loading="eager"
                  className="h-10 sm:h-12 lg:h-14 xl:h-16 w-auto transition-all duration-300 cursor-pointer object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              </Link>
            </div>

            {/* Hamburger — MOBILE ONLY */}
            <div className="lg:hidden z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative flex items-center justify-center w-11 h-11 -mr-1 rounded-lg active:scale-95 transition-transform duration-200"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="relative block w-6 h-5">
                  {/* Top bar */}
                  <span
                    className={`absolute left-0 block w-6 h-[2.5px] rounded-full bg-[#F2913F] transition-all duration-300 ease-out ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
                  />
                  {/* Middle bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 block w-6 h-[2.5px] rounded-full bg-[#F2913F] transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
                  />
                  {/* Bottom bar */}
                  <span
                    className={`absolute left-0 block w-6 h-[2.5px] rounded-full bg-[#F2913F] transition-all duration-300 ease-out ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}
                  />
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between flex-1 ml-12 animate-fadeInRight">
              <div className="flex items-center gap-8">

                <div className="relative" onMouseEnter={() => setIsAboutMenuOpen(true)} onMouseLeave={() => setIsAboutMenuOpen(false)}>
                  <button className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] flex items-center gap-1.5 text-[15px]" aria-expanded={isAboutMenuOpen}>
                    Know us
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isAboutMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute left-0 top-full pt-5 transition-all duration-300 ${isAboutMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                    <div className="glass-menu-panel rounded-2xl overflow-hidden py-3 min-w-[220px] flex flex-col shadow-2xl bg-black/90 backdrop-blur-md border border-white/10">
                      {aboutLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-[15px] font-semibold text-white/90 hover:text-[#F2913F] hover:bg-white/10 px-6 py-2.5 transition-colors border-l-2 border-transparent hover:border-[#F2913F]" onClick={() => setIsAboutMenuOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/projects" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] text-[15px]">Projects</Link>

                <div className="relative" onMouseEnter={() => setIsSystemsMenuOpen(true)} onMouseLeave={() => setIsSystemsMenuOpen(false)}>
                  <Link href="/systems" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] flex items-center gap-1.5 text-[15px]" aria-expanded={isSystemsMenuOpen}>
                    Systems
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isSystemsMenuOpen ? 'rotate-180' : ''}`} />
                  </Link>
                  <div className={`absolute left-0 top-full pt-5 transition-all duration-300 ${isSystemsMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                    <div className="glass-menu-panel rounded-2xl overflow-hidden py-3 min-w-[240px] flex flex-col shadow-2xl bg-black/90 backdrop-blur-md border border-white/10">
                      {systemLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-[15px] font-semibold text-white/90 hover:text-[#F2913F] hover:bg-white/10 px-6 py-2.5 transition-colors border-l-2 border-transparent hover:border-[#F2913F]" onClick={() => setIsSystemsMenuOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative" onMouseEnter={() => setIsProductsMenuOpen(true)} onMouseLeave={() => setIsProductsMenuOpen(false)}>
                  <Link href="/products" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] flex items-center gap-1.5 text-[15px]" aria-expanded={isProductsMenuOpen}>
                    Products
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                  </Link>
                  <div className={`absolute left-0 top-full pt-5 transition-all duration-300 ${isProductsMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                    <div className="glass-menu-panel rounded-2xl overflow-hidden py-3 min-w-[200px] flex flex-col shadow-2xl bg-black/90 backdrop-blur-md border border-white/10">
                      {productLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-[15px] font-semibold text-white/90 hover:text-[#F2913F] hover:bg-white/10 px-6 py-2.5 transition-colors border-l-2 border-transparent hover:border-[#F2913F]" onClick={() => setIsProductsMenuOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/cme" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] text-[15px]">CME</Link>
                <Link href="/research-and-development" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] text-[15px]">R&D</Link>
                <Link href="/news" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] text-[15px]">News & Events</Link>
                <Link href="/apnatech" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] text-[15px]">ApnaTech</Link>
              </div>
              <div className="flex items-center gap-10">
                <Link href="/careers" className="transition-all duration-300 font-semibold text-white/95 hover:text-[#F2913F] text-[15px]">Careers</Link>
                <Link href="/contact" className="bg-[#F2913F] text-white px-7 py-2.5 rounded-full hover:bg-[#D97706] transition-all duration-500 font-bold text-[15px] shadow-sm hover:shadow-md">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {/* Backdrop */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Half-height + half-width panel (mobile only) */}
        <div
          className={`lg:hidden fixed z-[9997] shadow-2xl rounded-b-2xl transition-transform duration-400 ease-out overflow-hidden top-[46px] sm:top-[56px]`}
          style={{
            right: 0,
            width: '50vw',
            maxWidth: '420px',
            height: '50vh',
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-150%)',
            background: '#ffffff',
          }}
        >
          <div className="w-full h-full bg-white flex flex-col">
            {/* Close button inside the white menu panel */}
            <div className="flex items-center justify-end px-3 py-2 shrink-0 border-b border-gray-200">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 text-black hover:text-[#F2913F] transition-colors" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable nav content — compact spacing */}
            <div className="flex-1 overflow-y-auto px-4 py-2 bg-white">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">Home</Link>

              <div className="border-b border-gray-200">
                <button onClick={() => setIsMobileAboutExpanded(!isMobileAboutExpanded)} className="w-full flex items-center justify-between py-2.5 text-black hover:text-[#F2913F] text-sm font-medium">
                  <span>Know us</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isMobileAboutExpanded ? 'rotate-90' : ''}`}>
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isMobileAboutExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                  <div className="pl-3 pb-2">
                    {aboutLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">{l.label}</Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <button onClick={() => setIsMobileProductsExpanded(!isMobileProductsExpanded)} className="w-full flex items-center justify-between py-2.5 text-black hover:text-[#F2913F] text-sm font-medium">
                  <span>Products</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isMobileProductsExpanded ? 'rotate-90' : ''}`}>
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isMobileProductsExpanded ? 'max-h-[400px]' : 'max-h-0'}`}>
                  <div className="pl-3 pb-2">
                    <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">All Products</Link>
                    {productLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">{l.label}</Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <button onClick={() => setIsMobileSystemsExpanded(!isMobileSystemsExpanded)} className="w-full flex items-center justify-between py-2.5 text-black hover:text-[#F2913F] text-sm font-medium">
                  <span>Systems</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isMobileSystemsExpanded ? 'rotate-90' : ''}`}>
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isMobileSystemsExpanded ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="pl-3 pb-2">
                    <Link href="/systems" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">All Systems</Link>
                    {systemLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">{l.label}</Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">Projects</Link>
              <Link href="/cme" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">CME</Link>
              <Link href="/research-and-development" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">R&D</Link>
              <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">News & Events</Link>
              <Link href="/apnatech" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">ApnaTech</Link>
              <Link href="/sustainability" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">Sustainability</Link>
              <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">Careers</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">Contact Us</Link>
              <Link href="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-black hover:text-[#F2913F] text-sm font-medium">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
