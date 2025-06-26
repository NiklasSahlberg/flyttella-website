'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [showQuoteButton, setShowQuoteButton] = useState(pathname !== "/");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const businessDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/") {
      setShowQuoteButton(false);
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setShowQuoteButton(scrollPosition > 600);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      setShowQuoteButton(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
    setIsBusinessOpen(false);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
      setIsBusinessOpen(false);
    }, 200);
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

  const handleBusinessMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsBusinessOpen(true);
    setIsServicesOpen(false);
  };

  const handleBusinessMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsBusinessOpen(false);
      setIsServicesOpen(false);
    }, 200);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
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
          <div className="flex justify-between items-center h-20 relative">
            {/* Logo - centered on mobile, left on desktop */}
            <div className="flex-1 flex justify-center md:justify-start items-center relative">
              <div 
                onClick={() => {
                  window.scrollTo(0, 0);
                  window.location.reload();
                }}
                className="cursor-pointer"
              >
                <div className="relative h-16 w-32 md:h-20 md:w-96 mx-auto">
                  <Image
                    src="/flyttella-logo.png"
                    alt="Flyttella Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* Hamburger menu in top right on mobile - only show on mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0F172A] hover:text-[#10B981] transition-colors p-2"
                style={{ right: '1rem' }}
                aria-label="Öppna meny"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {/* Desktop navigation and CTA (unchanged) */}
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
                    Privat
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  
                  {isServicesOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-3 border border-gray-100"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-[#0F172A]">Våra privattjänster</h3>
                      </div>
                      <div className="py-2">
                        <Link href="/bohagsflytt" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">🏠</span>
                          <span>Bohagsflytt</span>
                        </Link>
                        <Link href="/flyttstadning" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">✨</span>
                          <span>Flyttstädning</span>
                        </Link>
                        <Link href="/barhjalp" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">💪</span>
                          <span>Bärhjälp</span>
                        </Link>
                        <Link href="/piano-tunglyft" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">🎹</span>
                          <span>Piano/Tunglyft</span>
                        </Link>
                        <Link href="/atervinning" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">♻️</span>
                          <span>Återvinning</span>
                        </Link>
                        <Link href="/magasinering" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">📦</span>
                          <span>Magasinering</span>
                        </Link>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link href="/tjanster" onClick={() => setIsServicesOpen(false)} className="flex items-center justify-between text-sm font-medium text-[#10B981] hover:text-[#0F172A] transition-colors">
                          <span>Se alla privattjänster</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                {/* Företag Dropdown */}
                <div
                  ref={businessDropdownRef}
                  className="relative"
                  onMouseEnter={handleBusinessMouseEnter}
                  onMouseLeave={handleBusinessMouseLeave}
                >
                  <Link
                    href="/foretag"
                    className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide flex items-center"
                  >
                    Företag
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {isBusinessOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-3 border border-gray-100"
                      onMouseEnter={handleBusinessMouseEnter}
                      onMouseLeave={handleBusinessMouseLeave}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-[#0F172A]">Våra företagstjänster</h3>
                      </div>
                      <div className="py-2">
                        <Link href="/kontorsflytt" onClick={() => setIsBusinessOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">🏢</span>
                          <span>Kontorsflytt</span>
                        </Link>
                        <Link href="/kontorsstadning" onClick={() => setIsBusinessOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">🧹</span>
                          <span>Kontorsstädning</span>
                        </Link>
                        <Link href="/bemanning" onClick={() => setIsBusinessOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#10B981] transition-colors">
                          <span className="text-lg mr-3">👷‍♂️</span>
                          <span>Bemanning och underentreprenad</span>
                        </Link>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link href="/foretag" onClick={() => setIsBusinessOpen(false)} className="flex items-center justify-between text-sm font-medium text-[#10B981] hover:text-[#0F172A] transition-colors">
                          <span>Se alla företagstjänster</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/om-oss" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Om oss</Link>
                <Link href="/faq" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">FAQ</Link>
                <Link href="/blogg" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Blogg</Link>
                <Link href="/kontakt" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Kontakt</Link>
              </nav>

              {/* Quote Button Dropdown */}
              <div className="relative">
                {showQuoteButton && (
                  <Link 
                    href="/services"
                    className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity flex items-center"
                  >
                    FÅ OFFERT
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - moved outside header */}
        {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute right-0 top-0 h-full w-[80vw] max-w-[340px] bg-white shadow-2xl rounded-l-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#10B981]"
                aria-label="Stäng meny"
              >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

            {/* Menu Content */}
            <div className="h-full overflow-y-auto pt-20 pb-8 px-6 flex flex-col">
              {/* Logo */}
              <div className="mb-8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/flyttella-logo.png"
                  alt="Flyttella Logo"
                  width={140}
                  height={36}
                  className="h-10 w-auto"
                />
              </Link>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block py-3 text-lg font-medium text-[#0F172A] hover:text-[#10B981] hover:bg-gray-50 rounded-lg px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hem
                </Link>
                  <Link
                  href="/om-oss"
                  className="block py-3 text-lg font-medium text-[#0F172A] hover:text-[#10B981] hover:bg-gray-50 rounded-lg px-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                  Om oss
                  </Link>
                <Link
                  href="/faq"
                  className="block py-3 text-lg font-medium text-[#0F172A] hover:text-[#10B981] hover:bg-gray-50 rounded-lg px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/blogg"
                  className="block py-3 text-lg font-medium text-[#0F172A] hover:text-[#10B981] hover:bg-gray-50 rounded-lg px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blogg
                </Link>
                <Link
                  href="/kontakt"
                  className="block py-3 text-lg font-medium text-[#0F172A] hover:text-[#10B981] hover:bg-gray-50 rounded-lg px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kontakt
                </Link>

                {/* Services Section */}
                <div className="py-3">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex items-center justify-between w-full text-lg font-medium text-[#0F172A] hover:text-[#10B981] hover:bg-gray-50 rounded-lg px-4 py-3"
                  >
                    <span>Privat</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isMobileServicesOpen && (
                    <div className="mt-2 space-y-1 pl-4 bg-gray-50 rounded-lg py-2">
                      <Link
                        href="/bohagsflytt"
                        className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Bohagsflytt
                      </Link>
                      <Link
                        href="/flyttstadning"
                        className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Flyttstädning
                      </Link>
                      <Link
                        href="/barhjalp"
                        className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Bärhjälp
                      </Link>
                      <Link
                        href="/piano-tunglyft"
                        className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Piano/Tunglyft
                      </Link>
                      <Link
                        href="/atervinning"
                        className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Återvinning
                      </Link>
                      <Link
                        href="/magasinering"
                        className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Magasinering
                      </Link>
                  </div>
                )}
                </div>
                {/* Företag Mobile Dropdown */}
                <div className="py-3">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full text-lg font-medium text-[#0F172A] hover:text-[#10B981] hover:bg-gray-50 rounded-lg px-4 py-3"
                  >
                    <span>Företag</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 space-y-1 pl-4 bg-gray-50 rounded-lg py-2">
                    <Link
                      href="/kontorsflytt"
                      className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kontorsflytt
                    </Link>
                    <Link
                      href="/kontorsstadning"
                      className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kontorsstädning
                    </Link>
                    <Link
                      href="/bemanning"
                      className="block py-2 px-4 text-base text-[#0F172A] hover:text-[#10B981] hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Bemanning och underentreprenad
                    </Link>
                    <Link
                      href="/foretag"
                      className="block py-2 px-4 text-base text-[#10B981] hover:text-[#0F172A] hover:bg-gray-100 rounded-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Se alla företagstjänster
                    </Link>
                  </div>
                )}
                </div>
              </nav>

              {/* Divider */}
              <div className="my-6 border-t border-gray-200"></div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href="/fa-offert"
                  className="block w-full py-3 text-center text-lg font-bold text-white bg-[#10B981] rounded-full hover:bg-[#059669] transition shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Få offert
                </Link>
                <Link
                  href="/fa-stadning-offert"
                  className="block w-full py-3 text-center text-lg font-bold text-[#10B981] bg-[#E6FCF4] rounded-full border border-[#10B981] hover:bg-[#CFF6EA] transition shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Städoffert
                </Link>
              </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
} 