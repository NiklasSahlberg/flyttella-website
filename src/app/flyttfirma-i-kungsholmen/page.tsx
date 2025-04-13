import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Flyttfirma i Kungsholmen | Professionell Flyttservice | Flyttella',
  description: 'Professionell flyttfirma i Kungsholmen. Vi erbjuder flyttservice anpassad för Kungsholmens unika miljö, från sjönära lägenheter till historiska fastigheter.',
  keywords: 'flyttfirma kungsholmen, flyttstädning kungsholmen, flytthjälp kungsholmen, flyttfirma stockholm, flyttservice kungsholmen, bohagsflytt kungsholmen, packning kungsholmen, fridhemsplan flytt, hornsbergs strand flytt, lindhagen flytt',
  openGraph: {
    title: 'Flyttfirma i Kungsholmen | Professionell Flyttservice | Flyttella',
    description: 'Professionell flyttfirma i Kungsholmen. Vi erbjuder flyttservice anpassad för Kungsholmens unika miljö.',
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function FlyttfirmaKungsholmenPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttfirma i Kungsholmen
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professionell flyttservice anpassad för Kungsholmens unika karaktär. Vi har gedigen erfarenhet av flytt i området - från de moderna lägenheterna vid Hornsbergs Strand till de klassiska kvarteren kring Fridhemsplan och Lindhagen.
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
              Professionell flyttservice i Kungsholmen
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Som erfaren flyttfirma i Kungsholmen har vi specialiserat oss på att hantera flyttar i områdets varierade miljöer. 
                Från de moderna bostäderna längs Hornsbergs Strand till de klassiska fastigheterna kring S:t Eriksgatan och Fridhemsplan - vi förstår de särskilda krav som ställs vid flytt i Kungsholmens olika kvarter.
              </p>
              <p className="text-lg">
                Vi har omfattande erfarenhet av att arbeta i hela Kungsholmen - från Lindhagen och Stadshagen till Kristineberg och Thorildsplan. 
                Vår expertis omfattar hantering av både moderna och äldre fastigheter, och vi är väl förtrogna med områdets olika byggnadstyper och tillgänglighetsutmaningar.
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
                "Specialiserade på Kungsholmens fastigheter",
                "Erfarna med sjönära flyttar",
                "Anpassad utrustning för alla byggnadstyper",
                "Säker hantering i moderna och äldre hus",
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
                "Grundlig städning av alla ytor",
                "Specialrengöring av moderna material",
                "Fönsterputsning med sjöutsikt",
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
                "Professionellt packmaterial",
                "Säker packning av alla föremål",
                "Specialemballage vid behov",
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
            Varför välja oss som din flyttfirma i Kungsholmen?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Gedigen erfarenhet av Kungsholmens alla områden",
              "Specialister på både moderna och äldre fastigheter",
              "Omfattande lokalkännedom",
              "Fullständig försäkring",
              "Fast pris-garanti",
              "Professionell service",
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
            Boka din flytt i Kungsholmen idag
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi erbjuder skräddarsydda flyttlösningar anpassade för Kungsholmens olika områden och fastighetstyper. 
            Med vår gedigna erfarenhet av området och vår professionella service säkerställer vi en smidig och trygg flytt. 
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
            "name": "Flyttella - Flyttfirma i Kungsholmen",
            "image": "https://flyttella.se/flyttella-logo.png",
            "description": "Professionell flyttfirma i Kungsholmen. Vi erbjuder flyttservice anpassad för Kungsholmens unika miljö.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kungsholmen",
              "addressRegion": "Stockholm",
              "addressCountry": "SE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "59.3322",
              "longitude": "18.0340"
            },
            "url": "https://flyttella.se/flyttfirma-i-kungsholmen",
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