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
    const navbars = Array.from(document.querySelectorAll<HTMLElement>('[data-navbar]'));
    if (!navbars.length) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 50;

      if (Math.abs(lastScrollY - currentScrollY) < 10) return;

      navbars.forEach((navbar) => {
        navbar.classList.toggle('scrolled', isScrolled);
        if (currentScrollY > lastScrollY && isScrolled) navbar.classList.add('navbar-hidden');
        else navbar.classList.remove('navbar-hidden');
      });

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;

      setIsAboutMenuOpen(false);
      setIsProductsMenuOpen(false);
      setIsSystemsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAboutPage = pathname === '/about';

  const closeDesktopMenus = () => {
    setIsAboutMenuOpen(false);
    setIsProductsMenuOpen(false);
    setIsSystemsMenuOpen(false);
  };

  return (
    <>
      <nav
        data-navbar
        className={`hidden lg:block w-full fixed top-0 z-[9999] h-[103px] transition-all duration-300 ${isAboutPage ? 'navbar-solid' : ''}`}
        onMouseEnter={(event) => event.currentTarget.classList.add('hovered')}
        onMouseLeave={(event) => {
          event.currentTarget.classList.remove('hovered');
          closeDesktopMenus();
        }}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[103px]">
            <div className="flex items-center animate-fadeInLeft -ml-2 sm:-ml-4 md:-ml-6 lg:-ml-10">
              <Link href="/" onMouseEnter={() => setIsAboutMenuOpen(false)} aria-label="Patil Group Home">
                <picture>
                  <source srcSet="/pg.png" type="image/png" />
                  <img
                    src="/pg.png"
                    alt="Patil Group Logo"
                    width={1080}
                    height={1080}
                    loading="eager"
                    className="patil-navbar-logo h-24 w-auto transition-all duration-300 hover-scale cursor-pointer"
                  />
                </picture>
              </Link>
            </div>

            <div className="hidden lg:flex items-center justify-between flex-1 ml-8 animate-fadeInRight">
              <div className="flex items-center gap-6">
                <div
                  onMouseEnter={() => {
                    setIsAboutMenuOpen(true);
                    setIsProductsMenuOpen(false);
                    setIsSystemsMenuOpen(false);
                  }}
                >
                  <button
                    className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F] flex items-center gap-1"
                    aria-expanded={isAboutMenuOpen}
                    aria-haspopup="true"
                    aria-label="Know us menu"
                  >
                    Know us
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isAboutMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <Link href="/projects" onMouseEnter={closeDesktopMenus} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
                  Projects
                </Link>

                <div
                  onMouseEnter={() => {
                    setIsAboutMenuOpen(false);
                    setIsProductsMenuOpen(false);
                    setIsSystemsMenuOpen(true);
                  }}
                >
                  <Link
                    href="/systems"
                    className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F] flex items-center gap-1"
                    aria-expanded={isSystemsMenuOpen}
                    aria-haspopup="true"
                  >
                    Systems
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isSystemsMenuOpen ? 'rotate-180' : ''}`} />
                  </Link>
                </div>

                <div
                  onMouseEnter={() => {
                    setIsAboutMenuOpen(false);
                    setIsSystemsMenuOpen(false);
                    setIsProductsMenuOpen(true);
                  }}
                >
                  <Link
                    href="/products"
                    className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F] flex items-center gap-1"
                    aria-expanded={isProductsMenuOpen}
                    aria-haspopup="true"
                  >
                    Products
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                  </Link>
                </div>

                <Link href="/cme" onMouseEnter={closeDesktopMenus} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
                  CME
                </Link>

                <Link href="/research-and-development" onMouseEnter={closeDesktopMenus} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
                  R&D
                </Link>

                <Link href="/news" onMouseEnter={closeDesktopMenus} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
                  News & Events
                </Link>

                <Link href="/apnatech" onMouseEnter={closeDesktopMenus} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
                  ApnaTech
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <Link href="/careers" onMouseEnter={closeDesktopMenus} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
                  Careers
                </Link>

                <Link href="/contact" onMouseEnter={closeDesktopMenus} className="bg-[#F2913F] text-white px-6 py-2.5 rounded-full hover:bg-[#D97706] transition-all duration-300 font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden ${
            isAboutMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
          }`}
          style={{
            top: '103px',
            width: '100%',
            transformOrigin: 'top',
            transitionProperty: 'opacity, transform, visibility',
            transitionDuration: isAboutMenuOpen ? '0.4s' : '0.3s',
            transitionTimingFunction: isAboutMenuOpen ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.6, 0, 0.8, 0.4)',
            transitionDelay: '0s',
          }}
          onMouseLeave={() => setIsAboutMenuOpen(false)}
        >
          <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6">
            <div className="flex flex-col">
              {aboutLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-bold text-gray-900 hover:text-[#F2913F] px-6 py-3 transition-all duration-200 ease-out border-l-2 border-transparent hover:border-[#F2913F]"
                  style={{
                    animation: isAboutMenuOpen ? `fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.06}s forwards` : 'none',
                    opacity: 0,
                    transform: 'translateX(-8px)',
                  }}
                  onClick={() => setIsAboutMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden ${
            isProductsMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
          }`}
          style={{
            top: '103px',
            width: '100%',
            transformOrigin: 'top',
            transitionProperty: 'opacity, transform, visibility',
            transitionDuration: isProductsMenuOpen ? '0.4s' : '0.3s',
            transitionTimingFunction: isProductsMenuOpen ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.6, 0, 0.8, 0.4)',
            transitionDelay: '0s',
          }}
          onMouseLeave={() => setIsProductsMenuOpen(false)}
        >
          <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6">
            <div className="flex flex-col">
              {productLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-bold text-gray-900 hover:text-[#F2913F] px-6 py-3 transition-all duration-200 ease-out border-l-2 border-transparent hover:border-[#F2913F]"
                  style={{
                    animation: isProductsMenuOpen ? `fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.06}s forwards` : 'none',
                    opacity: 0,
                    transform: 'translateX(-8px)',
                  }}
                  onClick={() => setIsProductsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden ${
            isSystemsMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
          }`}
          style={{
            top: '103px',
            width: '100%',
            transformOrigin: 'top',
            transitionProperty: 'opacity, transform, visibility',
            transitionDuration: isSystemsMenuOpen ? '0.4s' : '0.3s',
            transitionTimingFunction: isSystemsMenuOpen ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.6, 0, 0.8, 0.4)',
            transitionDelay: '0s',
          }}
          onMouseLeave={() => setIsSystemsMenuOpen(false)}
        >
          <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6">
            <div className="flex flex-col">
              {systemLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-bold text-gray-900 hover:text-[#F2913F] px-6 py-3 transition-all duration-200 ease-out border-l-2 border-transparent hover:border-[#F2913F]"
                  style={{
                    animation: isSystemsMenuOpen ? `fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.06}s forwards` : 'none',
                    opacity: 0,
                    transform: 'translateX(-8px)',
                  }}
                  onClick={() => setIsSystemsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="lg:hidden fixed top-0 left-0 w-full z-[9999] px-0 sm:px-6 pt-0 sm:pt-3 pointer-events-none">
        <nav
          data-navbar
          className={`nav-pill pointer-events-auto mx-auto max-w-[1380px] rounded-none sm:rounded-full px-3 sm:px-6 transition-all duration-300 ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
        >
          <div className="max-w-[1440px] mx-auto px-2 sm:px-3 md:px-6">
            <div className="flex items-center justify-between h-[68px] sm:h-20">
              <div className="flex items-center">
                <Link href="/" onMouseEnter={() => setIsAboutMenuOpen(false)} aria-label="Patil Group Home">
                  <picture>
                    <source srcSet="/pg.png" type="image/png" />
                    <img
                      src="/pg.png"
                      alt="Patil Group Logo"
                      width={1080}
                      height={1080}
                      loading="eager"
                      className="patil-navbar-logo h-14 sm:h-16 w-auto transition-all duration-300 hover-scale cursor-pointer"
                    />
                  </picture>
                </Link>
              </div>

              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`relative p-1 sm:p-2 rounded-full transition-all duration-300 hover:bg-white/10 active:scale-95 text-white hover:text-[#F2913F] ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className={`absolute transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-1.5'}`}>
                      <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                    <div className={`absolute transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                      <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                    <div className={`absolute transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'rotate-0 translate-y-1.5'}`}>
                      <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`lg:hidden fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className="lg:hidden fixed z-[9997] shadow-2xl rounded-b-2xl transition-transform duration-400 ease-out overflow-hidden top-[68px] sm:top-[92px]"
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
              <div className="flex items-center justify-end px-3 py-2 shrink-0 border-b border-gray-200">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 text-black hover:text-[#F2913F] transition-colors" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-2 bg-white">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  Home
                </Link>

                <div className="border-b border-gray-200">
                  <button onClick={() => setIsMobileAboutExpanded(!isMobileAboutExpanded)} className="w-full flex items-center justify-between py-2.5 text-black hover:text-[#F2913F] text-sm font-medium">
                    <span>Know us</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isMobileAboutExpanded ? 'rotate-90' : ''}`}>
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileAboutExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                    <div className="pl-3 pb-2">
                      {aboutLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">
                          {link.label}
                        </Link>
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
                      <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">
                        All Products
                      </Link>
                      {productLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">
                          {link.label}
                        </Link>
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
                      <Link href="/systems" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">
                        All Systems
                      </Link>
                      {systemLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-gray-700 hover:text-[#F2913F] text-xs">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  Projects
                </Link>
                <Link href="/cme" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  CME
                </Link>
                <Link href="/research-and-development" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  R&D
                </Link>
                <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  News & Events
                </Link>
                <Link href="/apnatech" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  ApnaTech
                </Link>
                <Link href="/sustainability" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  Sustainability
                </Link>
                <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  Careers
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 border-b border-gray-200 text-black hover:text-[#F2913F] text-sm font-medium">
                  Contact Us
                </Link>
                <Link href="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-black hover:text-[#F2913F] text-sm font-medium">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
