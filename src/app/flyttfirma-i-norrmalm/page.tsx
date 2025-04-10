import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flyttfirma i Norrmalm | Professionell Flyttservice | Flyttella',
  description: 'Professionell flyttfirma i Norrmalm. Vi erbjuder flyttstädning, packning och bohagsflytt i Norrmalm. Snabb service och konkurrenskraftiga priser. Boka din flytt idag!',
  keywords: 'flyttfirma norrmalm, flyttstädning norrmalm, flyttfirma stockholm, flyttstädning stockholm, bohagsflytt norrmalm',
  openGraph: {
    title: 'Flyttfirma i Norrmalm | Professionell Flyttservice | Flyttella',
    description: 'Professionell flyttfirma i Norrmalm. Vi erbjuder flyttstädning, packning och bohagsflytt i Norrmalm. Snabb service och konkurrenskraftiga priser.',
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function FlyttfirmaNorrmalmPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttfirma i Norrmalm
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professionell flyttservice i Norrmalm med erfarenhet sedan 2010. Vi erbjuder komplett flyttservice med bohagsflytt, flyttstädning och packning.
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
              Professionell flyttservice i Norrmalm
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Som ledande flyttfirma i Norrmalm erbjuder vi en komplett flyttservice som täcker alla dina behov. 
                Med vår erfarenhet sedan 2010 har vi hjälpt tusentals kunder med deras flyttar i Norrmalm och övriga Stockholm.
              </p>
              <p className="text-lg">
                Vi förstår de unika utmaningarna med att flytta i Norrmalm - från trånga gator till historiska byggnader. 
                Vår expertis och lokalkännedom säkerställer en smidig och effektiv flyttprocess.
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
                "Erfarenhet med kontorsflyttar",
                "Hantering av höghus och hissar",
                "Fullständig försäkring",
                "Flexibla tider",
                "Lokal expertis i Norrmalm",
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
                "Anpassad städning för kontorslokaler",
                "Städgaranti",
                "Flexibla tider",
                "Erfaren personal i Norrmalm",
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
                "Erfaren personal i Norrmalm"
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
            Varför välja oss som din flyttfirma i Norrmalm?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Erfarenhet med alla bostadstyper",
              "Lokalkännedom i hela Norrmalm",
              "Erfarenhet sedan 2010",
              "Fullständig försäkring",
              "Fast pris-garanti",
              "Konkurrenskraftiga priser",
              "Kvalitetsgaranti",
              "Snabb service"
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
            Boka din flytt i Norrmalm idag
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
            "name": "Flyttella - Flyttfirma i Norrmalm",
            "image": "https://flyttella.se/flyttella-logo.png",
            "description": "Professionell flyttfirma i Norrmalm. Vi erbjuder flyttstädning, packning och bohagsflytt i Norrmalm. Snabb service och konkurrenskraftiga priser.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Norrmalm",
              "addressRegion": "Stockholm",
              "addressCountry": "SE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "59.3326",
              "longitude": "18.0649"
            },
            "url": "https://flyttella.se/flyttfirma-i-norrmalm",
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