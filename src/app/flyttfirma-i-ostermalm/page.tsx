import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Flyttfirma i Östermalm | Professionell Flyttservice | Flyttella',
  description: 'Professionell flyttfirma i Östermalm. Vi erbjuder flyttservice anpassad för Östermalms eleganta fastigheter, med särskild hänsyn till historiska byggnader och exklusiva hem.',
  keywords: 'flyttfirma östermalm, flyttstädning östermalm, flytthjälp östermalm, flyttfirma stockholm, flyttservice östermalm, bohagsflytt östermalm, packning östermalm, stureplan flytt, karlaplan flytt, gärdet flytt',
  openGraph: {
    title: 'Flyttfirma i Östermalm | Professionell Flyttservice | Flyttella',
    description: 'Professionell flyttfirma i Östermalm. Vi erbjuder flyttservice anpassad för Östermalms eleganta fastigheter.',
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function FlyttfirmaOstermalmPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttfirma i Östermalm
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professionell flyttservice anpassad för Östermalms unika karaktär. Vi har gedigen erfarenhet av flytt i Östermalms eleganta sekelskifteshus och moderna fastigheter kring Stureplan, Karlaplan, Gärdet och hela området.
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
              Professionell flyttservice i Östermalm
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Som erfaren flyttfirma i Östermalm har vi specialiserat oss på att hantera flyttar i områdets karakteristiska miljöer. 
                Från de pampiga sekelskifteshusen längs Strandvägen och Narvavägen till de moderna lägenheterna vid Gärdet - vi förstår de särskilda krav som ställs vid flytt i Östermalms exklusiva fastigheter.
              </p>
              <p className="text-lg">
                Vi har omfattande erfarenhet av att arbeta i hela Östermalm - från Stureplan och Östermalmstorg till Karlaplan och Gärdet. 
                Vår expertis omfattar hantering av antika möbler, konst och andra värdefulla föremål, och vi är väl förtrogna med områdets historiska trapphus och hissar.
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
                "Specialiserade på Östermalms fastigheter",
                "Varsam hantering av antika möbler",
                "Erfarenhet av historiska byggnader",
                "Anpassad utrustning för trånga trapphus",
                "Fullständig flyttförsäkring",
                "Professionell projektledning"
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
                "Noggrann städning av stuckatur",
                "Specialrengöring av parkettgolv",
                "Fönsterputsning på hög höjd",
                "Städgaranti",
                "Miljövänliga rengöringsmedel",
                "Erfaren städpersonal"
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
                "Specialemballage för värdefulla föremål",
                "Säker packning av konst och antikviteter",
                "Professionellt packmaterial",
                "Packgaranti",
                "Märkning och inventering",
                "Uppackning på plats"
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
            Varför välja oss som din flyttfirma i Östermalm?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Gedigen erfarenhet av Östermalms fastigheter",
              "Specialister på exklusiva flyttar",
              "Omfattande lokalkännedom",
              "Fullständig försäkring",
              "Fast pris-garanti",
              "Diskret och professionell service",
              "Erfaren och serviceinriktad personal",
              "Flexibla flyttlösningar"
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
            Boka din flytt i Östermalm idag
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi erbjuder skräddarsydda flyttlösningar anpassade för Östermalms unika karaktär och krav. 
            Med vår gedigna erfarenhet av områdets fastigheter och vår professionella service säkerställer vi en smidig och trygg flytt. 
            Kontakta oss för en kostnadsfri offert och låt oss ta hand om hela flyttprocessen.
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
            "name": "Flyttella - Flyttfirma i Östermalm",
            "image": "https://flyttella.se/flyttella-logo.png",
            "description": "Professionell flyttfirma i Östermalm. Vi erbjuder flyttservice anpassad för Östermalms eleganta fastigheter.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Östermalm",
              "addressRegion": "Stockholm",
              "addressCountry": "SE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "59.3366",
              "longitude": "18.0854"
            },
            "url": "https://flyttella.se/flyttfirma-i-ostermalm",
            "telephone": "+4681234567",
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