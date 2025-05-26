'use client';

import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FlyttfirmaStockholmMalmoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttfirma mellan Stockholm och Malmö
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professionell flyttservice mellan Stockholm och Malmö. Med vår erfarenhet av långdistansflyttar säkerställer vi en smidig och säker flyttprocess för ditt bohag.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/fa-offert" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                Få offert
              </Link>
              <Link href="/kontakt" className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium">
                Kontakta oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
              Professionell flyttservice mellan Stockholm och Malmö
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Att flytta mellan Stockholm och Malmö är en stor omställning som kräver noggrann planering och erfarenhet. 
                Vi på Flyttella har specialiserat oss på långdistansflyttar och erbjuder en komplett flyttservice som gör din flytt så smidig som möjligt.
              </p>
              <p className="text-lg">
                Med vår erfarenhet av flyttar mellan Sveriges största städer kan vi hantera alla utmaningar som en långdistansflytt innebär, 
                från säker packning och transport till upppackning och montering i din nya bostad.
              </p>
            </div>
            <div className="mt-8 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  RUT-avdrag
                </h3>
                <div className="bg-white/10 rounded-full px-4 py-1">
                  <span className="text-sm font-medium text-white">50% avdrag</span>
                </div>
              </div>
              <p className="text-base text-white/90">
                Vi erbjuder RUT-avdrag på alla våra tjänster, vilket gör det ännu mer kostnadseffektivt för dig.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Bohagsflytt */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Bohagsflytt
            </h3>
            <ul className="space-y-3">
              {[
                "Säker transport mellan städerna",
                "Moderna flyttbilar med lastbäddar",
                "Fullständig försäkring",
                "Flexibla tider",
                "Erfarenhet med långdistansflyttar",
                "Säker hantering av alla föremål"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Flyttstädning */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Flyttstädning
            </h3>
            <ul className="space-y-3">
              {[
                "Grundlig städning av alla ytor",
                "Fönsterputsning ingår",
                "Städgaranti",
                "Flexibla tider",
                "Erfaren städpersonal",
                "Snabb service"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Packning */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Packning
            </h3>
            <ul className="space-y-3">
              {[
                "Effektiv packning för alla bostadstyper",
                "Professionell packning",
                "Packgaranti",
                "Säker hantering",
                "Effektiv process",
                "Hjälp med upppackning"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Varför välja oss för din flytt mellan Stockholm och Malmö?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Stor erfarenhet av långdistansflyttar",
              "Säker och pålitlig transport",
              "Professionell flyttservice",
              "Heltäckande försäkring",
              "Fast pris utan överraskningar",
              "Konkurrenskraftiga priser",
              "Nöjd-kund-garanti",
              "Snabb och pålitlig service"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            Boka din flytt mellan Stockholm och Malmö idag
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi erbjuder skräddarsydda lösningar för just dina behov. Kontakta oss för en 
            kostnadsfri offert och låt oss ta hand om hela processen.
          </p>
          <Link 
            href="/fa-offert" 
            className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Få offert
          </Link>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Flyttella - Flyttfirma mellan Stockholm och Malmö",
            "image": "https://flyttella.se/flyttella-logo.png",
            "description": "Professionell flyttfirma som erbjuder flyttservice mellan Stockholm och Malmö. Vi erbjuder komplett flyttservice inklusive packning, transport och upppackning.",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Stockholm",
              "addressCountry": "SE"
            },
            "url": "https://flyttella.se/flyttfirma-i-stockholm-och-malmo",
            "telephone": "08-898-301",
            "priceRange": "$$",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/flyttella",
              "https://www.instagram.com/flyttella"
            ]
          })
        }}
      />
    </main>
  );
} 