'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200); // 200ms delay before closing
  };

  const handleQuoteMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsQuoteOpen(true);
  };

  const handleQuoteMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsQuoteOpen(false);
    }, 200); // 200ms delay before closing
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileServicesOpen(false);
  };

  const toggleMobileServices = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Contact Bar */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center py-2 md:py-0 md:h-8">
            <div className="flex flex-col md:flex-row md:items-center md:divide-x divide-white/20 space-y-1 md:space-y-0">
              <div className="flex items-center justify-center md:pr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white/90">Mån-Fre: 08:00-18:00</span>
              </div>
              <div className="flex items-center justify-center md:px-6">
                <span className="text-sm font-medium text-white/90">Lör-Sön: Stängt</span>
              </div>
            </div>
            <div className="flex items-center mt-1 md:mt-0">
              <a href="tel:08-898-301" className="flex items-center group bg-white/10 rounded-full px-4 py-1 md:py-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80 group-hover:text-white transition-colors mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium text-white group-hover:text-white transition-colors">08-898-301</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="relative h-20 w-96">
                  <Image
                    src="/flyttella-logo.png"
                    alt="Flyttella Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Navigation and CTA */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                <Link href="/" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Hem</Link>
                
                {/* Services Dropdown */}
                <div 
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    href="/tjanster"
                    className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide flex items-center"
                  >
                    Tjänster
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  
                  {isServicesOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link href="/bohagsflytt" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Bohagsflytt</Link>
                      <Link href="/flyttstadning" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Flyttstädning</Link>
                      <Link href="/barhjalp" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Bärhjälp</Link>
                      <Link href="/piano-tunglyft" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Piano/Tunglyft</Link>
                      <Link href="/kontorsflytt" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Kontorsflytt</Link>
                      <Link href="/montering" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Montering</Link>
                    </div>
                  )}
                </div>

                <Link href="/om-oss" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Om oss</Link>
                <Link href="/kontakt" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Kontakt</Link>
              </nav>

              {/* Quote Button Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleQuoteMouseEnter}
                onMouseLeave={handleQuoteMouseLeave}
              >
                <button 
                  className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity flex items-center"
                >
                  FÅ OFFERT
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isQuoteOpen && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    onMouseEnter={handleQuoteMouseEnter}
                    onMouseLeave={handleQuoteMouseLeave}
                  >
                    <Link href="/fa-offert" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Flyttoffert</Link>
                    <Link href="/fa-stadning-offert" className="block px-4 py-2 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981]">Städoffert</Link>
                  </div>
                )}
              </div>

            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-[#0F172A] hover:text-[#10B981] transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link 
              href="/" 
              className="block px-3 py-2 text-base font-medium text-[#0F172A] hover:text-[#10B981]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hem
            </Link>
            
            {/* Mobile Services Menu */}
            <div>
              <button 
                onClick={toggleMobileServices}
                className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-[#0F172A] hover:text-[#10B981]"
              >
                <span>Tjänster</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`${isMobileServicesOpen ? 'block' : 'hidden'} pl-4`}>
                <Link href="/bohagsflytt" className="block px-3 py-2 text-sm text-[#0F172A] hover:text-[#10B981]" onClick={() => setIsMobileMenuOpen(false)}>Bohagsflytt</Link>
                <Link href="/flyttstadning" className="block px-3 py-2 text-sm text-[#0F172A] hover:text-[#10B981]" onClick={() => setIsMobileMenuOpen(false)}>Flyttstädning</Link>
                <Link href="/barhjalp" className="block px-3 py-2 text-sm text-[#0F172A] hover:text-[#10B981]" onClick={() => setIsMobileMenuOpen(false)}>Bärhjälp</Link>
                <Link href="/piano-tunglyft" className="block px-3 py-2 text-sm text-[#0F172A] hover:text-[#10B981]" onClick={() => setIsMobileMenuOpen(false)}>Piano/Tunglyft</Link>
                <Link href="/kontorsflytt" className="block px-3 py-2 text-sm text-[#0F172A] hover:text-[#10B981]" onClick={() => setIsMobileMenuOpen(false)}>Kontorsflytt</Link>
                <Link href="/montering" className="block px-3 py-2 text-sm text-[#0F172A] hover:text-[#10B981]" onClick={() => setIsMobileMenuOpen(false)}>Montering</Link>
              </div>
            </div>

            <Link 
              href="/om-oss" 
              className="block px-3 py-2 text-base font-medium text-[#0F172A] hover:text-[#10B981]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Om oss
            </Link>
            <Link 
              href="/kontakt" 
              className="block px-3 py-2 text-base font-medium text-[#0F172A] hover:text-[#10B981]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kontakt
            </Link>
            <div className="space-y-1">
              <Link 
                href="/fa-offert" 
                className="block px-3 py-2 text-base font-medium text-[#0F172A] hover:text-[#10B981]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Flyttoffert
              </Link>
              <Link 
                href="/fa-stadning-offert" 
                className="block px-3 py-2 text-base font-medium text-[#0F172A] hover:text-[#10B981]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Städoffert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 