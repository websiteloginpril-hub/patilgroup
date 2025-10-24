'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

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
    { href: '/responsibilities', label: 'Our Resources' },
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

  // Close menus when clicking outside nav
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

  // Prevent scroll when mobile menu is open and reset submenus
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>('[data-navbar]');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 50;

      // Add a delta check to avoid flickering on minor scrolls
      if (Math.abs(lastScrollY - currentScrollY) < 10) {
        return;
      }

      navbar.classList.toggle('scrolled', isScrolled);

      if (currentScrollY > lastScrollY && isScrolled) {
        navbar.classList.add('navbar-hidden');
      } else {
        navbar.classList.remove('navbar-hidden');
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
      
      setIsAboutMenuOpen(false);
      setIsProductsMenuOpen(false);
      setIsSystemsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAboutPage = pathname === '/about';

  return (
    <nav 
      data-navbar
      className={`w-full fixed top-0 z-[9999] transition-all duration-300 ${isAboutPage ? 'navbar-solid' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
      style={{
        height: '103px',
      }}
      onMouseEnter={() => {
        const navbar = document.querySelector('[data-navbar]');
        if (navbar) {
          navbar.classList.add('hovered');
        }
      }}
      onMouseLeave={() => {
        const navbar = document.querySelector('[data-navbar]');
        if (navbar) {
          navbar.classList.remove('hovered');
        }
        // Ensure all desktop dropdowns are closed when leaving nav
        setIsAboutMenuOpen(false);
        setIsProductsMenuOpen(false);
        setIsSystemsMenuOpen(false);
      }}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[103px]">
          {/* Logo */}
          <div className="flex items-center animate-fadeInLeft -ml-2 sm:-ml-4 md:-ml-6 lg:-ml-10">
              <Link href="/" onMouseEnter={() => setIsAboutMenuOpen(false)}>
                <picture>
                  <source srcSet="/pg.png" type="image/png" />
                  <img
                    src="/pg.png"
                    alt="Patil Group Logo"
                    width={140}
                    height={70}
                    loading="eager"
                    className="h-16 sm:h-18 md:h-20 lg:h-24 w-auto transition-all duration-300 hover-scale cursor-pointer"
                  />
                </picture>
              </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-8 animate-fadeInRight">
            {/* Left side navigation items */}
            <div className="flex items-center gap-6">
            <div onMouseEnter={() => {
              setIsAboutMenuOpen(true);
              setIsProductsMenuOpen(false);
              setIsSystemsMenuOpen(false);
            }}>
                <button className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F] flex items-center gap-1">
                  Know us
                <ChevronDown size={16} className={`transition-transform duration-300 ${isAboutMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link href="/projects" onMouseEnter={() => {
                setIsAboutMenuOpen(false);
                setIsProductsMenuOpen(false);
                setIsSystemsMenuOpen(false);
              }} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
                Projects
              </Link>

              <div onMouseEnter={() => {
                setIsAboutMenuOpen(false);
                setIsProductsMenuOpen(false);
                setIsSystemsMenuOpen(true);
              }}>
                <Link href="/systems" className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F] flex items-center gap-1">
                  Systems
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isSystemsMenuOpen ? 'rotate-180' : ''}`} />
                </Link>
            </div>

              <div onMouseEnter={() => {
              setIsAboutMenuOpen(false);
              setIsSystemsMenuOpen(false);
              setIsProductsMenuOpen(true);
            }}>
                <Link href="/products" className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F] flex items-center gap-1">
                Products
                <ChevronDown size={16} className={`transition-transform duration-300 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                </Link>
            </div>

            <Link href="/cme" onMouseEnter={() => {
              setIsAboutMenuOpen(false);
              setIsProductsMenuOpen(false);
              setIsSystemsMenuOpen(false);
              }} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
              CME
            </Link>

            <Link href="/research-and-development" onMouseEnter={() => {
              setIsAboutMenuOpen(false);
              setIsProductsMenuOpen(false);
              setIsSystemsMenuOpen(false);
              }} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
              R&D
            </Link>

            <Link href="/news" onMouseEnter={() => {
              setIsAboutMenuOpen(false);
              setIsProductsMenuOpen(false);
              setIsSystemsMenuOpen(false);
            }} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
              News & Events
            </Link>
            </div>

            {/* Right side navigation items */}
            <div className="flex items-center gap-6">
            <Link href="/careers" onMouseEnter={() => {
              setIsAboutMenuOpen(false);
              setIsProductsMenuOpen(false);
              setIsSystemsMenuOpen(false);
              }} className="transition-all duration-300 font-medium text-gray-800 hover:text-[#F2913F]">
              Careers
            </Link>

            <Link href="/contact" onMouseEnter={() => {
              setIsAboutMenuOpen(false);
              setIsProductsMenuOpen(false);
              setIsSystemsMenuOpen(false);
              }} className="bg-[#F2913F] text-white px-6 py-2.5 rounded-full hover:bg-[#D97706] transition-all duration-300 font-medium">
                Contact Us
            </Link>
            </div>
          </div>

          {/* Modern Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative p-3 rounded-xl transition-all duration-300 hover:bg-gray-100 active:scale-95 text-black hover:text-[#F2913F] ${isMobileMenuOpen ? 'bg-gray-100 scale-95' : ''}`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className={`absolute transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-2'
                }`}>
                  <div className="w-5 h-0.5 bg-current rounded-full" />
                </div>
                <div className={`absolute transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}>
                  <div className="w-5 h-0.5 bg-current rounded-full" />
                </div>
                <div className={`absolute transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'rotate-0 translate-y-2'
                }`}>
                  <div className="w-5 h-0.5 bg-current rounded-full" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* About Us Mega Menu */}
      <div 
        className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden ${
          isAboutMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
        style={{
          top: '103px',
          width: '100%',
          transformOrigin: 'top',
          transitionProperty: 'opacity, transform, visibility',
          transitionDuration: isAboutMenuOpen ? '0.4s' : '0.3s',
          transitionTimingFunction: isAboutMenuOpen 
            ? 'cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'cubic-bezier(0.6, 0, 0.8, 0.4)',
          transitionDelay: isAboutMenuOpen ? '0s' : '0s',
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

      {/* Products Mega Menu */}
      <div 
        className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden ${
          isProductsMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
        style={{
          top: '103px',
          width: '100%',
          transformOrigin: 'top',
          transitionProperty: 'opacity, transform, visibility',
          transitionDuration: isProductsMenuOpen ? '0.4s' : '0.3s',
          transitionTimingFunction: isProductsMenuOpen 
            ? 'cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'cubic-bezier(0.6, 0, 0.8, 0.4)',
          transitionDelay: isProductsMenuOpen ? '0s' : '0s',
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

      {/* Systems Mega Menu */}
      <div 
        className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden ${
          isSystemsMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
        style={{
          top: '103px',
          width: '100%',
          transformOrigin: 'top',
          transitionProperty: 'opacity, transform, visibility',
          transitionDuration: isSystemsMenuOpen ? '0.4s' : '0.3s',
          transitionTimingFunction: isSystemsMenuOpen 
            ? 'cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'cubic-bezier(0.6, 0, 0.8, 0.4)',
          transitionDelay: isSystemsMenuOpen ? '0s' : '0s',
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

             {/* Full Screen Mobile Navigation */}
       <div 
        className={`lg:hidden fixed z-[9999] bg-white transition-all duration-500 ease-in-out ${
           isMobileMenuOpen 
             ? 'opacity-100 visible' 
             : 'opacity-0 invisible'
         }`}
         style={{ 
           position: 'fixed',
           top: 0,
           bottom: 0,
           width: '100%', 
           height: '100vh',
          backgroundColor: '#ffffff',
           zIndex: 9999,
           right: isMobileMenuOpen ? '0' : '-100%'
         }}
       >         
         {/* Full Screen Navigation Panel */}
        <div className="w-full h-full bg-white flex flex-col overflow-hidden">
           {/* Header */}
           <div className="flex items-center justify-end px-6 py-6 shrink-0">
             <button
               onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-black hover:text-amber-500 transition-colors duration-200"
               aria-label="Close menu"
             >
               <X size={24} />
             </button>
           </div>
           
           {/* Brand Section */}
           <div className="px-6 py-6 shrink-0">
           </div>
           
           {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 bg-white" style={{ backgroundColor: '#ffffff' }}>
             {/* Navigation Menu Items */}
             <div className="space-y-1 mt-2">
               {/* Home */}
               <Link 
                 href="/" 
                 onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
               >
                 <span className="text-lg font-medium">Home</span>
               </Link>

               {/* About Us - Expandable */}
              <div className="border-b border-gray-200">
                 <button 
                   onClick={() => setIsMobileAboutExpanded(!isMobileAboutExpanded)}
                  className="w-full flex items-center justify-between py-4 text-black hover:text-[#F2913F] transition-colors duration-200"
                 >
                   <span className="text-lg font-medium">Know us</span>
                  <div className={`text-gray-500 transition-transform duration-300 ${isMobileAboutExpanded ? 'rotate-90' : ''}`}>
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M15 18l-6-6 6-6"/>
                     </svg>
                   </div>
                 </button>
                 
                 {/* About Us Submenu */}
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                   isMobileAboutExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                 }`}>
                  <div className="py-2 pl-4 bg-gray-50">
                     <Link 
                       href="/about" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       About
                     </Link>
                     <Link 
                       href="/our-vision"
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Our Values
                     </Link>
                     <Link 
                       href="/legacy" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Our Legacy
                     </Link>
                     <Link 
                       href="/management" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Management
                     </Link>
                     <Link 
                       href="/responsibilities" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Our Resources
                     </Link>
                     <Link 
                       href="/our-presence" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Our Presence
                     </Link>
                     <Link 
                       href="/our-clientele" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Our Clientele
                     </Link>
                   </div>
                 </div>
               </div>

               {/* Products - Expandable */}
              <div className="border-b border-gray-200">
                 <button 
                   onClick={() => setIsMobileProductsExpanded(!isMobileProductsExpanded)}
                  className="w-full flex items-center justify-between py-4 text-black hover:text-[#F2913F] transition-colors duration-200"
                 >
                   <span className="text-lg font-medium">Products</span>
                  <div className={`text-gray-500 transition-transform duration-300 ${isMobileProductsExpanded ? 'rotate-90' : ''}`}>
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M15 18l-6-6 6-6"/>
                     </svg>
                   </div>
                 </button>
                 
                 {/* Products Submenu */}
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                   isMobileProductsExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                 }`}>
                  <div className="py-2 pl-4 bg-gray-50">
                     <Link 
                       href="/products" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       All Products
                     </Link>
                     <Link 
                       href="/sleepers" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Sleepers
                     </Link>
                     <Link 
                       href="/fasteners" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Fasteners
                     </Link>
                     <Link 
                       href="/wires" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Wires
                     </Link>
                     <Link 
                       href="/inserts" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Inserts
                     </Link>
                     <Link 
                       href="/precast" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Precast
                     </Link>
                     <Link 
                       href="/safety" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Track Safety
                     </Link>
                   </div>
                 </div>
               </div>

               {/* Systems - Expandable */}
              <div className="border-b border-gray-200">
                 <button 
                   onClick={() => setIsMobileSystemsExpanded(!isMobileSystemsExpanded)}
                  className="w-full flex items-center justify-between py-4 text-black hover:text-[#F2913F] transition-colors duration-200"
                 >
                   <span className="text-lg font-medium">Systems</span>
                  <div className={`text-gray-500 transition-transform duration-300 ${isMobileSystemsExpanded ? 'rotate-90' : ''}`}>
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M15 18l-6-6 6-6"/>
                     </svg>
                   </div>
                 </button>
                 
                 {/* Systems Submenu */}
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                   isMobileSystemsExpanded ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0'
                 }`}>
                  <div className="py-2 pl-4 bg-gray-50">
                     <Link 
                       href="/systems" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       All Systems
                     </Link>
                     <Link 
                       href="/ballastless-track-urban-metro" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Ballastless Track
                     </Link>
                     <Link 
                       href="/flash-butt-welding-of-rails" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Flash Butt Welding
                     </Link>
                     <Link 
                       href="/patil-rheda-system" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Patil RHEDA System
                     </Link>
                     <Link 
                       href="/precast-plinth" 
                       onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-gray-700 hover:text-[#F2913F] transition-colors duration-200 text-base"
                     >
                       Precast Plinth
                     </Link>
                   </div>
                 </div>
               </div>

               {/* Projects */}
               <Link 
                 href="/projects" 
                 onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
               >
                 <span className="text-lg font-medium">Projects</span>
               </Link>


               {/* CME */}
               <Link 
                 href="/cme" 
                 onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
               >
                 <span className="text-lg font-medium">CME</span>
               </Link>

               {/* R&D */}
               <Link 
                 href="/research-and-development" 
                 onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
               >
                 <span className="text-lg font-medium">R&D</span>
               </Link>

              {/* News and Events (moved after R&D for mobile) */}
              <Link 
                href="/news" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
              >
                <span className="text-lg font-medium">News & Events</span>
               </Link>

              {/* Sustainability (moved out of About for mobile) */}
              <Link 
                href="/sustainability" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
              >
                <span className="text-lg font-medium">Sustainability</span>
               </Link>

               {/* Careers */}
               <Link 
                 href="/careers" 
                 onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
               >
                 <span className="text-lg font-medium">Careers</span>
               </Link>


               {/* Contact Us */}
               <Link 
                 href="/contact" 
                 onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 border-b border-gray-200 text-black hover:text-[#F2913F] transition-colors duration-200"
               >
                 <span className="text-lg font-medium">Contact Us</span>
               </Link>

               {/* Privacy Policy */}
               <Link 
                 href="/privacy-policy" 
                 onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 text-black hover:text-[#F2913F] transition-colors duration-200"
               >
                 <span className="text-lg font-medium">Privacy Policy</span>
               </Link>
             </div>
           </div>
         </div>
       </div>
    </nav>
  );
};

export default Navbar;
