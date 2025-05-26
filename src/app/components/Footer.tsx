'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-gray-100 border-t-4 border-[#10B981]">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/integritetspolicy" className="text-sm text-gray-300 hover:text-[#10B981] transition-colors">
                Integritetspolicy
              </Link>
              <Link href="/cookies" className="text-sm text-gray-300 hover:text-[#10B981] transition-colors">
                Cookies
              </Link>
              <Link href="/villkor" className="text-sm text-gray-300 hover:text-[#10B981] transition-colors">
                Villkor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 