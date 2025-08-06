'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TermsModal from './TermsModal';
import ReportModal from './ReportModal';

export default function Footer() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsHtml, setTermsHtml] = useState('');
  const [loading, setLoading] = useState(false);

  // For städ modal
  const [isStadModalOpen, setIsStadModalOpen] = useState(false);
  const [stadHtml, setStadHtml] = useState('');
  const [loadingStad, setLoadingStad] = useState(false);

  // For städpartner modal
  const [isStadPartnerModalOpen, setIsStadPartnerModalOpen] = useState(false);
  const [stadPartnerHtml, setStadPartnerHtml] = useState('');
  const [loadingStadPartner, setLoadingStadPartner] = useState(false);

  // For flyttpartner modal
  const [isFlyttPartnerModalOpen, setIsFlyttPartnerModalOpen] = useState(false);
  const [flyttPartnerHtml, setFlyttPartnerHtml] = useState('');
  const [loadingFlyttPartner, setLoadingFlyttPartner] = useState(false);

  // For utlandsflytt modal
  const [isUtlandsflyttModalOpen, setIsUtlandsflyttModalOpen] = useState(false);
  const [utlandsflyttHtml, setUtlandsflyttHtml] = useState('');
  const [loadingUtlandsflytt, setLoadingUtlandsflytt] = useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showReportButton, setShowReportButton] = useState(false);
  const [showMoreLegal, setShowMoreLegal] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      fetch('/allmanna-villkor.txt')
        .then(res => res.text())
        .then(text => {
          // Basic formatting: convert double newlines to <br><br>, section titles to <h2>, and single newlines to <br>
          const html = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/^(\d+\.|[A-ZÅÄÖa-zåäö ]+:)$/gm, '<h2>$1</h2>')
            .replace(/\n/g, '<br>');
          setTermsHtml(html);
          setLoading(false);
        });
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isStadModalOpen) {
      setLoadingStad(true);
      fetch('/allmanna-villkor-stad.txt')
        .then(res => res.text())
        .then(text => {
          const html = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/^(\d+\.|[A-ZÅÄÖa-zåäö ]+:)$/gm, '<h2>$1</h2>')
            .replace(/\n/g, '<br>');
          setStadHtml(html);
          setLoadingStad(false);
        });
    }
  }, [isStadModalOpen]);

  useEffect(() => {
    if (isStadPartnerModalOpen) {
      setLoadingStadPartner(true);
      fetch('/allmanna-villkor-stadpartner.txt')
        .then(res => res.text())
        .then(text => {
          const html = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/^(\d+\.|[A-ZÅÄÖa-zåäö ]+:)$/gm, '<h2>$1</h2>')
            .replace(/\n/g, '<br>');
          setStadPartnerHtml(html);
          setLoadingStadPartner(false);
        });
    }
  }, [isStadPartnerModalOpen]);

  useEffect(() => {
    if (isFlyttPartnerModalOpen) {
      setLoadingFlyttPartner(true);
      fetch('/allmanna-villkor-flyttpartner.txt')
        .then(res => res.text())
        .then(text => {
          const html = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/^(\d+\.|[A-ZÅÄÖa-zåäö ]+:)$/gm, '<h2>$1</h2>')
            .replace(/\n/g, '<br>');
          setFlyttPartnerHtml(html);
          setLoadingFlyttPartner(false);
        });
    }
  }, [isFlyttPartnerModalOpen]);

  useEffect(() => {
    if (isUtlandsflyttModalOpen) {
      setLoadingUtlandsflytt(true);
      fetch('/allmanna-villkor-utlandsflytt.txt')
        .then(res => res.text())
        .then(text => {
          const html = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/^(\d+\.|[A-ZÅÄÖa-zåäö ]+:)$/gm, '<h2>$1</h2>')
            .replace(/\n/g, '<br>');
          setUtlandsflyttHtml(html);
          setLoadingUtlandsflytt(false);
        });
    }
  }, [isUtlandsflyttModalOpen]);

  useEffect(() => {
    // Only show the report button on the main page
    if (pathname !== '/') {
      setShowReportButton(false);
      return;
    }

    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        const isMobile = window.innerWidth < 768; // md breakpoint
        
        // Show button when footer is about to enter the viewport
        const threshold = isMobile ? 200 : 400; // Different thresholds for mobile vs desktop
        const hasScrolledToFooter = rect.top <= threshold;
        setShowReportButton(hasScrolledToFooter);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <footer className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-gray-100 border-t-4 border-[#10B981]">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-6 md:gap-6">
          {/* Company Info */}
          <div className="space-y-3 md:space-y-4 col-span-2 md:col-span-1">
            <Link href="/" className="block flex justify-center">
              <Image
                src="/flyttella-logo.png"
                alt="Flyttella logotyp"
                width={120}
                height={40}
                className="mb-3 md:mb-4 drop-shadow-lg"
              />
            </Link>
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
              Din pålitliga flyttpartner i Stockholm. Vi erbjuder professionella flyttjänster med fokus på kvalitet och kundnöjdhet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-white text-sm md:text-base">Snabblänkar</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="/" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Hem
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Tjänster
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Flyttjänster */}
          <div>
            <h3 className="font-semibold mb-3 text-white text-sm md:text-base">Våra Flyttjänster</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/bohagsflytt" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Bohagsflytt
                </Link>
              </li>
              <li>
                <Link href="/barhjalp" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Bärhjälp
                </Link>
              </li>
              <li>
                <Link href="/piano-tunglyft" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Piano/Tunglyft
                </Link>
              </li>
              <li>
                <Link href="/bortforsling" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Bortforsling
                </Link>
              </li>
              <li>
                <Link href="/magasinering" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Magasinering
                </Link>
              </li>
              <li>
                <Link href="/utlandsflytt" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Utlandsflytt
                </Link>
              </li>
            </ul>
          </div>

          {/* Städtjänster */}
          <div>
            <h3 className="font-semibold mb-3 text-white text-sm md:text-base">Städtjänster</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/flyttstadning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Flyttstädning
                </Link>
              </li>
              <li>
                <Link href="/hemstadning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Hemstädning
                </Link>
              </li>
              <li>
                <Link href="/storstadning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Storstädning
                </Link>
              </li>
              <li>
                <Link href="/byggstadning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Byggstädning
                </Link>
              </li>
              <li>
                <Link href="/visningsstadning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Visningsstädning
                </Link>
              </li>
              <li>
                <Link href="/dodsbostadning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Dödsbostädning
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Services */}
          <div>
            <h3 className="font-semibold mb-3 text-white text-sm md:text-base">Företagstjänster</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/kontorsflytt" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Kontorsflytt
                </Link>
              </li>
              <li>
                <Link href="/kontorsstadning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Kontorsstädning
                </Link>
              </li>
              <li>
                <Link href="/bemanning" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Bemanning och underentreprenad
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-white text-sm md:text-base">Juridisk information</h3>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer text-left w-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Allmänna villkor - Flytt
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer text-left w-full"
                  onClick={() => setIsStadModalOpen(true)}
                >
                  Allmänna villkor - Flyttstäd
                </button>
              </li>
              
              {/* Show more button - only shows when not expanded */}
              {!showMoreLegal && (
                <li>
                  <button
                    type="button"
                    className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer text-left w-full"
                    onClick={() => setShowMoreLegal(true)}
                  >
                    Se mer
                  </button>
                </li>
              )}
              
              {/* Additional legal links - shown when expanded */}
              {showMoreLegal && (
                <>
                  <li>
                    <button
                      type="button"
                      className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer text-left w-full"
                      onClick={() => setIsStadPartnerModalOpen(true)}
                    >
                      Villkor Samarbetspartner - Flyttstäd
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer text-left w-full"
                      onClick={() => setIsFlyttPartnerModalOpen(true)}
                    >
                      Villkor Samarbetspartner - Flytt
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer text-left w-full"
                      onClick={() => setIsUtlandsflyttModalOpen(true)}
                    >
                      Allmänna villkor - Utlandsflytt
                    </button>
                  </li>
                  <li>
                    <Link href="/integritetspolicy" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                      Integritetspolicy
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-xs md:text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                      Cookies
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-white text-sm md:text-base">Kontakta oss</h3>
            <ul className="space-y-1">
              <li className="flex items-center text-xs md:text-sm text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-2 text-[#10B981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                08-898-301
              </li>
              <li className="flex items-center text-xs md:text-sm text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-2 text-[#10B981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@flyttella.se
              </li>
              <li className="flex items-start text-xs md:text-sm text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-2 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lännavägen 64F, Huddinge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#10B981]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs md:text-sm text-gray-300 text-center">
              © {new Date().getFullYear()} Flyttella. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </div>
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} htmlContent={loading ? '<p>Laddar villkor...</p>' : termsHtml} />
      <TermsModal isOpen={isStadModalOpen} onClose={() => setIsStadModalOpen(false)} htmlContent={loadingStad ? '<p>Laddar villkor...</p>' : stadHtml} />
      <TermsModal isOpen={isStadPartnerModalOpen} onClose={() => setIsStadPartnerModalOpen(false)} htmlContent={loadingStadPartner ? '<p>Laddar villkor...</p>' : stadPartnerHtml} />
      <TermsModal isOpen={isFlyttPartnerModalOpen} onClose={() => setIsFlyttPartnerModalOpen(false)} htmlContent={loadingFlyttPartner ? '<p>Laddar villkor...</p>' : flyttPartnerHtml} />
      <TermsModal isOpen={isUtlandsflyttModalOpen} onClose={() => setIsUtlandsflyttModalOpen(false)} htmlContent={loadingUtlandsflytt ? '<p>Laddar villkor...</p>' : utlandsflyttHtml} />
      {showReportButton && (
        <button
          type="button"
          className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 bg-white text-[#0F172A] border border-gray-200 shadow-lg px-3 py-2 md:px-4 md:py-2 rounded-full text-xs opacity-90 hover:opacity-100 transition-all"
          onClick={() => setIsReportModalOpen(true)}
          aria-label="Anmälan"
        >
          Anmälan
        </button>
      )}
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </footer>
  );
} 