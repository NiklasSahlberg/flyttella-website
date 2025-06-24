'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import TermsModal from './TermsModal';
import ReportModal from './ReportModal';

export default function Footer() {
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

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      fetch('/allmanna-villkor.txt')
        .then(res => res.text())
        .then(text => {
          // Basic formatting: convert double newlines to <br><br>, section titles to <h2>, and single newlines to <br>
          let html = text
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
          let html = text
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
          let html = text
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
          let html = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/^(\d+\.|[A-ZÅÄÖa-zåäö ]+:)$/gm, '<h2>$1</h2>')
            .replace(/\n/g, '<br>');
          setFlyttPartnerHtml(html);
          setLoadingFlyttPartner(false);
        });
    }
  }, [isFlyttPartnerModalOpen]);

  return (
    <footer className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-gray-100 border-t-4 border-[#10B981]">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/flyttella-logo.png"
                alt="Flyttella logotyp"
                width={120}
                height={40}
                className="mb-4 drop-shadow-lg"
              />
            </Link>
            <p className="text-sm text-gray-200">
              Din pålitliga flyttpartner i Stockholm. Vi erbjuder professionella flyttjänster med fokus på kvalitet och kundnöjdhet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Snabblänkar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Hem
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Tjänster
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Våra tjänster</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bohagsflytt" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Bohagsflytt
                </Link>
              </li>
              <li>
                <Link href="/flyttstadning" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Flyttstädning
                </Link>
              </li>
              <li>
                <Link href="/barhjalp" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Bärhjälp
                </Link>
              </li>
              <li>
                <Link href="/kontorsflytt" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Kontorsflytt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Juridisk information</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  className="text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  Allmänna villkor - Flytt
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => setIsStadModalOpen(true)}
                >
                  Allmänna villkor - Flyttstäd
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => setIsStadPartnerModalOpen(true)}
                >
                  Villkor Samarbetspartner - Flyttstäd
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-sm text-gray-200 hover:text-[#10B981] transition-colors underline bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => setIsFlyttPartnerModalOpen(true)}
                >
                  Villkor Samarbetspartner - Flytt
                </button>
              </li>
              <li>
                <Link href="/integritetspolicy" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Integritetspolicy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/villkor" className="text-sm text-gray-200 hover:text-[#10B981] transition-colors">
                  Villkor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Kontakta oss</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                08-898-301
              </li>
              <li className="flex items-center text-sm text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@flyttella.se
              </li>
              <li className="flex items-center text-sm text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Stockholm, Sverige
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#10B981]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} Flyttella. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </div>
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} htmlContent={loading ? '<p>Laddar villkor...</p>' : termsHtml} />
      <TermsModal isOpen={isStadModalOpen} onClose={() => setIsStadModalOpen(false)} htmlContent={loadingStad ? '<p>Laddar villkor...</p>' : stadHtml} />
      <TermsModal isOpen={isStadPartnerModalOpen} onClose={() => setIsStadPartnerModalOpen(false)} htmlContent={loadingStadPartner ? '<p>Laddar villkor...</p>' : stadPartnerHtml} />
      <TermsModal isOpen={isFlyttPartnerModalOpen} onClose={() => setIsFlyttPartnerModalOpen(false)} htmlContent={loadingFlyttPartner ? '<p>Laddar villkor...</p>' : flyttPartnerHtml} />
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 bg-white text-[#0F172A] border border-gray-200 shadow px-4 py-2 rounded-full text-xs opacity-70 hover:opacity-100 transition-all"
        onClick={() => setIsReportModalOpen(true)}
        aria-label="Anmälan"
      >
        Anmälan
      </button>
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </footer>
  );
} 