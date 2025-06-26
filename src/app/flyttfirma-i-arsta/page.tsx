import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flyttfirma i Årsta | Professionell Flyttservice | Flyttella',
  description: 'Professionell flyttfirma i Årsta, Stockholm. Vi erbjuder flyttstädning, packning och bohagsflytt i Årsta och omnejd. Erfarenhet med flyttar i villor, lägenheter och större bostäder. Snabb service och konkurrenskraftiga priser.',
  keywords: 'flyttfirma årsta, flyttstädning årsta, flyttfirma stockholm, flyttstädning stockholm, bohagsflytt årsta, flytt i villa, flytt i lägenhet, årsta flytt',
  openGraph: {
    title: 'Flyttfirma i Årsta | Professionell Flyttservice | Flyttella',
    description: 'Professionell flyttfirma i Årsta, Stockholm. Vi erbjuder flyttstädning, packning och bohagsflytt i Årsta och omnejd. Erfarenhet med flyttar i villor och lägenheter.',
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function FlyttfirmaArstaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttfirma i Årsta
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professionell flyttservice i Årsta, Stockholm. Vi har erfarenhet av både villor och lägenheter i detta gröna område nära Årstaviken och Årsta holmar.
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
              Professionell flyttservice i Årsta, Stockholm
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Som ledande flyttfirma i Årsta har vi specialiserat oss på att hantera flyttar i detta vackra område i södra Stockholm. 
                Årsta är känt för sina gröna miljöer, närhet till Årstaviken och Årsta holmar, samt sin blandning av villor och lägenheter.
              </p>
              <p className="text-lg">
                Vi förstår de specifika utmaningarna med att flytta i Årsta - från villor med trädgårdar till lägenheter med utsikt över vattnet. 
                Vår lokalkännedom och erfarenhet säkerställer en smidig flyttprocess oavsett bostadstyp.
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
                "Erfarenhet med villor och lägenheter",
                "Hantering av trädgårdsmöbler och grillar",
                "Fullständig försäkring",
                "Flexibla tider",
                "Lokal expertis i Årsta",
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
                "Städning av trädgårdsrum och verandor",
                "Städgaranti",
                "Flexibla tider",
                "Erfaren personal i Årsta",
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
                "Erfaren personal i Årsta"
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

        {/* Årsta Specific Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
            Varför välja oss som din flyttfirma i Årsta?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Lokalkännedom
              </h3>
              <ul className="space-y-2">
                {[
                  "Känner till Årstas gator och områden",
                  "Erfarenhet med villor nära Årstaviken",
                  "Känner till parkeringsmöjligheter",
                  "Förstår trafikflöden i området",
                  "Känner till Årsta holmar och grönområden"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-4 h-4 text-[#10B981] mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Specialiserade tjänster
              </h3>
              <ul className="space-y-2">
                {[
                  "Flyttar i villor med trädgårdar",
                  "Hantering av båtmöbler och grillar",
                  "Flyttar nära vattnet",
                  "Erfarenhet med större bostäder",
                  "Flexibel service för alla behov"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-4 h-4 text-[#10B981] mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Varför välja oss som din flyttfirma i Årsta?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Erfarenhet med alla bostadstyper i Årsta",
              "Lokalkännedom i hela området",
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
            Boka din flytt i Årsta idag
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi erbjuder skräddarsydda lösningar för alla typer av flyttar i Årsta. 
            Kontakta oss för en kostnadsfri offert och låt oss ta hand om hela processen.
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
            "name": "Flyttella - Flyttfirma i Årsta",
            "description": "Professionell flyttfirma i Årsta, Stockholm. Vi erbjuder flyttstädning, packning och bohagsflytt.",
            "url": "https://flyttella.se/flyttfirma-i-arsta",
            "telephone": "08-898-301",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Årsta",
              "addressRegion": "Stockholm",
              "addressCountry": "SE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 59.2976,
              "longitude": 18.0250
            },
            "serviceArea": {
              "@type": "City",
              "name": "Årsta"
            },
            "priceRange": "$$",
            "openingHours": "Mo-Fr 08:00-18:00"
          })
        }}
      />
    </main>
  );
} 