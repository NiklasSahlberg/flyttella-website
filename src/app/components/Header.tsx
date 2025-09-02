'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [showQuoteButton, setShowQuoteButton] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const businessDropdownRef = useRef<HTMLDivElement>(null);
  const [isCleaningOpen, setIsCleaningOpen] = useState(false);
  const [isMobileCleaningOpen, setIsMobileCleaningOpen] = useState(false);
  const [isMobileFlyttOpen, setIsMobileFlyttOpen] = useState(false);
  const [isMobileScrolled, setIsMobileScrolled] = useState(false);
  // Add cleaning dropdown timeout logic
  const cleaningTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setShowQuoteButton(false);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowQuoteButton(scrollPosition > 600);
      setIsMobileScrolled(scrollPosition > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (cleaningTimeoutRef.current) {
      clearTimeout(cleaningTimeoutRef.current);
    }
    setIsServicesOpen(true);
    setIsBusinessOpen(false);
    setIsCleaningOpen(false);
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

  const handleCleaningMouseEnter = () => {
    if (cleaningTimeoutRef.current) {
      clearTimeout(cleaningTimeoutRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCleaningOpen(true);
    setIsServicesOpen(false);
    setIsBusinessOpen(false);
  };

  const handleCleaningMouseLeave = () => {
    cleaningTimeoutRef.current = setTimeout(() => {
      setIsCleaningOpen(false);
    }, 200);
  };

  const getQuoteLink = () => {
    if (pathname === '/magasinering') {
      return '/kontakt?scroll=message&service=magasinering';
    }
    if (pathname === '/bortforsling') {
      return '/kontakt?scroll=message&service=bortforsling';
    }
    if (pathname === '/piano-tunglyft') {
      return '/kontakt?scroll=message&service=piano';
    }
    if (pathname === '/bemanning') {
      return '/kontakt?scroll=message&service=bemanning';
    }
    return '/offert';
  };

  return (
    <>
    <header className="sticky top-0 z-50">
      {/* Contact Bar */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center py-2 md:py-0 md:h-8">
            <div className="hidden md:flex flex-col md:flex-row md:items-center md:divide-x divide-white/20 space-y-1 md:space-y-0">
              <div className="flex items-center justify-center md:pr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white/90">{t('header.openHours')}</span>
              </div>
              <div className="flex items-center justify-center md:px-6">
                <span className="text-sm font-medium text-white/90">{t('header.closedWeekend')}</span>
              </div>
            </div>
            <div className="flex items-center mt-1 md:mt-0 space-x-3">
              {/* Social Media Icons */}
              <a 
                href="https://www.facebook.com/flyttella" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="white"/>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/flyttella" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="white"/>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F"/>
                </svg>
              </a>
              
              {/* Language Toggle */}
              <div className="hidden md:block">
                <LanguageToggle currentLocale={locale} onLocaleChange={setLocale} />
              </div>
              
              <a href="tel:08-898-301" className="flex items-center group bg-white/10 rounded-full px-4 py-1 md:py-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80 group-hover:text-white transition-colors mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium text-white group-hover:text-white transition-colors">{t('header.phone')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12 md:h-20 relative">
            {/* Logo - centered on mobile, left on desktop */}
            <div className="flex-1 flex justify-center md:justify-start items-center relative">
              {/* Desktop: Always show logo */}
              <Link 
                href="/" 
                className="cursor-pointer hidden md:block"
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}
              >
                <div className="relative h-12 w-24 md:h-20 md:w-96 mx-auto">
                  <Image
                    src="/flyttella-logo.png"
                    alt="Flyttella Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              
              {/* Mobile: Show logo or "Få offert" button based on scroll */}
              <div className="md:hidden">
                {!isMobileScrolled ? (
                  <Link 
                    href="/" 
                    className="cursor-pointer"
                    onClick={(e) => {
                      if (pathname === '/') {
                        e.preventDefault();
                        window.location.reload();
                      }
                    }}
                  >
                    <div className="relative h-12 w-24 mx-auto">
                      <Image
                        src="/flyttella-logo.png"
                        alt="Flyttella Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </Link>
                ) : (
                  <Link 
                    href={getQuoteLink()}
                    className="cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-lg">
                      Få offert
                    </div>
                  </Link>
                )}
                </div>
            </div>
            {/* Mobile controls - hamburger menu only */}
            <div className="md:hidden flex items-center">
              {/* Hamburger menu */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[#0F172A]  transition-colors p-1"
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
                
                {/* Services Dropdown */}
                <div 
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    href="/tjanster"
                    className="text-[#0F172A]  transition-colors text-base font-medium tracking-wide flex items-center"
                  >
                    {t('header.movingServices')}
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
                        <h3 className="text-sm font-semibold text-[#0F172A]">{t('header.seeAllMoving')}</h3>
                      </div>
                      <div className="py-2">
                        <Link href="/bohagsflytt" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🏠</span>
                          <span>Bohagsflytt</span>
                        </Link>
                        <Link href="/barhjalp" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">💪</span>
                          <span>Bärhjälp</span>
                        </Link>
                        <Link href="/piano-tunglyft" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🎹</span>
                          <span>Piano/Tunglyft</span>
                        </Link>
                        <Link href="/bortforsling" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">♻️</span>
                          <span>Bortforsling</span>
                        </Link>
                        <Link href="/magasinering" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">📦</span>
                          <span>Magasinering</span>
                        </Link>
                        <Link href="/utlandsflytt" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🌍</span>
                          <span>Utlandsflytt</span>
                        </Link>
                        <Link href="/montering" onClick={() => setIsServicesOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🔧</span>
                          <span>Montering</span>
                        </Link>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link href="/tjanster" onClick={() => setIsServicesOpen(false)} className="flex items-center justify-between text-base font-medium text-[#0F172A] transition-colors">
                          <span>{t('header.seeAllMoving')}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                {/* Cleaning Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={handleCleaningMouseEnter}
                  onMouseLeave={handleCleaningMouseLeave}
                >
                  <Link
                    href="/flyttstadning"
                    className="text-[#0F172A]  transition-colors text-base font-medium tracking-wide flex items-center"
                  >
                    {t('header.cleaningServices')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {isCleaningOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-3 border border-gray-100"
                      onMouseEnter={handleCleaningMouseEnter}
                      onMouseLeave={handleCleaningMouseLeave}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-[#0F172A]">{t('header.seeAllCleaning')}</h3>
                      </div>
                      <div className="py-2">
                        <Link href="/flyttstadning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">✨</span>
                          <span>Flyttstädning</span>
                        </Link>
                        <Link href="/kontorsstadning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🧹</span>
                          <span>Kontorsstädning</span>
                        </Link>
                        <Link href="/hemstadning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🏡</span>
                          <span>Hemstädning</span>
                        </Link>
                        <Link href="/fonsterputsning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🪟</span>
                          <span>Fönsterputs</span>
                        </Link>
                        <Link href="/byggstadning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🚧</span>
                          <span>Byggstädning</span>
                        </Link>
                        <Link href="/storstädning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🧽</span>
                          <span>Storstädning</span>
                        </Link>
                        <Link href="/visningsstadning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🏠</span>
                          <span>Visningsstädning</span>
                        </Link>
                        <Link href="/dodsbo-stadning" onClick={() => setIsCleaningOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🕊️</span>
                          <span>Dödsbostädning</span>
                        </Link>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link href="/stadtjanster" onClick={() => setIsCleaningOpen(false)} className="flex items-center justify-between text-base font-medium text-[#0F172A] transition-colors">
                          <span>{t('header.seeAllCleaning')}</span>
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
                    className="text-[#0F172A]  transition-colors text-base font-medium tracking-wide flex items-center"
                  >
                    {t('header.business')}
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
                        <h3 className="text-sm font-semibold text-[#0F172A]">{t('header.seeAllBusiness')}</h3>
                      </div>
                      <div className="py-2">
                        <Link href="/kontorsflytt" onClick={() => setIsBusinessOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🏢</span>
                          <span>Kontorsflytt</span>
                        </Link>
                        <Link href="/kontorsstadning" onClick={() => setIsBusinessOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">🧹</span>
                          <span>Kontorsstädning</span>
                        </Link>
                        <Link href="/bemanning" onClick={() => setIsBusinessOpen(false)} className="flex items-center px-4 py-2.5 text-base text-[#0F172A] hover:bg-gray-50  transition-colors">
                          <span className="text-lg mr-3">👷‍♂️</span>
                          <span>Bemanning och underentreprenad</span>
                        </Link>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link href="/foretag" onClick={() => setIsBusinessOpen(false)} className="flex items-center justify-between text-base font-medium text-[#0F172A] transition-colors">
                          <span>{t('header.seeAllBusiness')}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/om-oss" className="text-[#0F172A]  transition-colors text-base font-medium tracking-wide">{t('header.about')}</Link>
                <Link href="/faq" className="text-[#0F172A]  transition-colors text-base font-medium tracking-wide">{t('header.faq')}</Link>
                <Link href="/blogg" className="text-[#0F172A]  transition-colors text-base font-medium tracking-wide">{t('header.blog')}</Link>
                <Link href="/kontakt" className="text-[#0F172A]  transition-colors text-base font-medium tracking-wide">{t('header.contact')}</Link>
              </nav>



              {/* Quote Button Dropdown */}
              <div className="relative">
                {showQuoteButton && (
                  <Link 
                    href={getQuoteLink()}
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

      {/* Mobile Menu Overlay - Full Screen */}
        {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-white md:hidden"
        >
          <div 
            className="h-full w-full flex flex-col"
          >
              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 "
                aria-label="Stäng meny"
              >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

            {/* Menu Content */}
            <div className="h-full overflow-y-auto pt-12 pb-4 px-6 flex flex-col items-center text-center">
              {/* Logo */}
              <div className="mb-4">
                <Link 
                  href="/" 
                  onClick={(e) => {
                    if (pathname === '/') {
                      e.preventDefault();
                      window.location.reload();
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                <Image
                  src="/flyttella-logo.png"
                  alt="Flyttella Logo"
                  width={220}
                  height={56}
                  className="h-16 w-auto"
                />
              </Link>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col space-y-2 w-full max-w-sm">
                  <Link
                  href="/om-oss"
                  className="block py-1 text-3xl font-medium text-[#0F172A] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                  {t('header.about')}
                  </Link>
                <Link
                  href="/faq"
                  className="block py-1 text-3xl font-medium text-[#0F172A] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.faq')}
                </Link>
                <Link
                  href="/blogg"
                  className="block py-1 text-3xl font-medium text-[#0F172A] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.blog')}
                </Link>
                <Link
                  href="/kontakt"
                  className="block py-1 text-3xl font-medium text-[#0F172A] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.contact')}
                </Link>

                {/* Våra Tjänster Section (Mobile) */}
                <div className="py-1 w-full max-w-sm order-first">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className={`flex items-center justify-center w-full text-3xl font-medium transition-colors py-1 relative ${
                      isMobileServicesOpen 
                        ? 'text-[#10B981]' 
                        : 'text-[#0F172A]'
                    }`}
                  >
                    <span>Våra tjänster</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform absolute right-0 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isMobileServicesOpen && (
                    <div className="mt-1 space-y-1 text-center">
                      {/* Flyttjänster Subsection */}
                      <div className="py-1">
                        <button
                          onClick={() => setIsMobileFlyttOpen(!isMobileFlyttOpen)}
                          className={`flex items-center justify-center w-full text-2xl font-medium transition-colors py-2 relative ${
                            isMobileFlyttOpen 
                              ? 'text-[#10B981]' 
                              : 'text-[#0F172A] '
                          }`}
                        >
                          <span>Flyttjänster</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform absolute right-0 ${isMobileFlyttOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isMobileFlyttOpen && (
                          <div className="mt-1 space-y-1 text-center">
                      <Link
                        href="/bohagsflytt"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Bohagsflytt
                      </Link>
                      <Link
                        href="/barhjalp"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Bärhjälp
                      </Link>
                      <Link
                        href="/piano-tunglyft"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Piano/Tunglyft
                      </Link>
                      <Link
                        href="/bortforsling"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Bortforsling
                      </Link>
                      <Link
                        href="/magasinering"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Magasinering
                      </Link>
                      <Link
                        href="/utlandsflytt"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Utlandsflytt
                      </Link>

                  </div>
                )}
                </div>

                      {/* Städtjänster Subsection */}
                      <div className="py-1">
                  <button
                    onClick={() => setIsMobileCleaningOpen(!isMobileCleaningOpen)}
                          className={`flex items-center justify-center w-full text-2xl font-medium transition-colors py-2 relative ${
                            isMobileCleaningOpen 
                              ? 'text-[#10B981]' 
                              : 'text-[#0F172A] '
                          }`}
                  >
                          <span>Städtjänster</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform absolute right-0 ${isMobileCleaningOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isMobileCleaningOpen && (
                          <div className="mt-1 space-y-1 text-center">
                    <Link
                      href="/flyttstadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Flyttstädning
                    </Link>
                    <Link
                      href="/hemstadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Hemstädning
                    </Link>
                    <Link
                      href="/storstadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Storstädning
                    </Link>
                    <Link
                      href="/byggstadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Byggstädning
                    </Link>
                    <Link
                      href="/fonsterputsning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Fönsterputs
                    </Link>
                    <Link
                      href="/visningsstadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Visningsstädning
                    </Link>
                    <Link
                      href="/kontorsstadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kontorsstädning
                    </Link>
                    <Link
                      href="/dodsbo-stadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dödsbostädning
                    </Link>

                  </div>
                )}
                </div>

                      {/* Företagstjänster Subsection */}
                      <div className="py-1">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`flex items-center justify-center w-full text-2xl font-medium transition-colors py-2 relative ${
                            isDropdownOpen 
                              ? 'text-[#10B981]' 
                              : 'text-[#0F172A] '
                          }`}
                  >
                          <span>Företagstjänster</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform absolute right-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isDropdownOpen && (
                          <div className="mt-1 space-y-1 text-center">
                    <Link
                      href="/kontorsflytt"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kontorsflytt
                    </Link>
                    <Link
                      href="/kontorsstadning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kontorsstädning
                    </Link>
                    <Link
                      href="/bemanning"
                              className="block py-1 text-lg text-[#0F172A]  transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Bemanning och underentreprenad
                    </Link>

                          </div>
                        )}
                      </div>


                  </div>
                )}
                </div>
              </nav>

              {/* CTA Buttons */}
              <div className="space-y-2 py-3 border-t border-gray-200">
                <Link
                  href={getQuoteLink()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3 px-6 text-center text-2xl font-bold text-white bg-[#10B981] rounded-full hover:bg-[#059669] transition shadow-md"
                >
                  Få offert
                </Link>
              </div>

              {/* Language Toggle for Mobile */}
              <div className="py-3 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex justify-center items-center space-x-6">
                    <button
                      onClick={() => setLocale('sv')}
                      className={`transition-all duration-200 ${locale === 'sv' ? 'scale-110' : 'hover:scale-105'}`}
                    >
                      <Image 
                        src="/flags/se.svg" 
                        alt="Svenska" 
                        width={36} 
                        height={27} 
                        className={`rounded-sm border-2 shadow-sm ${locale === 'sv' ? 'border-[#10B981]' : 'border-gray-300'}`}
                      />
                    </button>
                    <button
                      onClick={() => setLocale('en')}
                      className={`transition-all duration-200 ${locale === 'en' ? 'scale-110' : 'hover:scale-105'}`}
                    >
                      <Image 
                        src="/flags/gb.svg" 
                        alt="English" 
                        width={36} 
                        height={27} 
                        className={`rounded-sm border-2 shadow-sm ${locale === 'en' ? 'border-[#10B981]' : 'border-gray-300'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-0 border-t border-gray-200"></div>

              {/* Social Media Buttons */}
              <div className="flex items-center justify-center space-x-4 py-1">
                <a 
                  href="https://www.facebook.com/flyttella" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1877F2] hover:text-[#166FE5] transition-colors p-2"
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/flyttella" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E4405F] hover:text-[#D63384] transition-colors p-2"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
} 