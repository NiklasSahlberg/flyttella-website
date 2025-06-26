import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flyttstäd i Täby | Professionell Städservice | Flyttella',
  description: 'Professionell flyttstädning i Täby, Stockholm. Vi erbjuder grundlig flyttstädning, kontorsstädning och hemstädning i Täby och omnejd. Erfarenhet med städning av villor, lägenheter och kontor. Snabb service och konkurrenskraftiga priser.',
  keywords: 'flyttstäd täby, flyttstädning täby, städfirma täby, flyttstädning stockholm, hemstädning täby, kontorsstädning täby, städning villa, städning lägenhet',
  openGraph: {
    title: 'Flyttstäd i Täby | Professionell Städservice | Flyttella',
    description: 'Professionell flyttstädning i Täby, Stockholm. Vi erbjuder grundlig flyttstädning, kontorsstädning och hemstädning i Täby och omnejd.',
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function FlyttstadTabyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttstäd i Täby
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professionell flyttstädning i Täby, Stockholm. Vi har erfarenhet av städning i villor, lägenheter och kontor i detta välkomnande område.
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
              Professionell flyttstädning i Täby, Stockholm
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Som ledande städfirma i Täby har vi specialiserat oss på att erbjuda grundlig och professionell flyttstädning. 
                Täby är känt för sina välskötta villor, moderna lägenheter och professionella kontorsmiljöer som kräver noggrann städning.
              </p>
              <p className="text-lg">
                Vi förstår de specifika kraven för städning i Täby - från villor med trädgårdar till moderna kontorslokaler. 
                Vår erfarenhet och lokalkännedom säkerställer en skinande ren bostad eller kontorslokal.
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
                Vi erbjuder RUT-avdrag på alla våra städtjänster, vilket gör det ännu mer kostnadseffektivt för dig.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Flyttstädning */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Flyttstädning
            </h3>
            <ul className="space-y-3">
              {[
                "Grundlig städning av alla ytor",
                "Städning av kök och badrum",
                "Fönsterputsning",
                "Golvstädning och dammsugning",
                "Städning av garderober",
                "Städgaranti"
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

          {/* Kontorsstädning */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Kontorsstädning
            </h3>
            <ul className="space-y-3">
              {[
                "Städning av kontorsrum",
                "Städning av mötesrum",
                "Sanering av kök och pentry",
                "Städning av toaletter",
                "Golvstädning",
                "Flexibla tider"
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

          {/* Hemstädning */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Hemstädning
            </h3>
            <ul className="space-y-3">
              {[
                "Regelbunden hemstädning",
                "Städning av alla rum",
                "Kök och badrumsstädning",
                "Städning av trädgårdsrum",
                "Fönsterputsning",
                "Personlig service"
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

        {/* Täby Specific Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
            Varför välja oss som din städfirma i Täby?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Lokalkännedom
              </h3>
              <ul className="space-y-2">
                {[
                  "Känner till Täbys områden och villor",
                  "Erfarenhet med moderna kontorslokaler",
                  "Förstår villastädernas krav",
                  "Känner till Täby centrum och närområden",
                  "Erfarenhet med högkvalitativa bostäder"
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
                  "Städning av villor med trädgårdar",
                  "Kontorsstädning i Täby centrum",
                  "Städning av moderna lägenheter",
                  "Sanering av kök och badrum",
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
            Varför välja oss som din städfirma i Täby?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Erfarenhet med alla bostadstyper i Täby",
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
            Boka din städtjänst i Täby idag
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi erbjuder skräddarsydda städlösningar för alla typer av bostäder och kontor i Täby. 
            Kontakta oss för en kostnadsfri offert och låt oss ta hand om städningen.
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
            "name": "Flyttella - Flyttstäd i Täby",
            "description": "Professionell flyttstädning i Täby, Stockholm. Vi erbjuder flyttstädning, kontorsstädning och hemstädning.",
            "url": "https://flyttella.se/flyttstad-i-taby",
            "telephone": "08-898-301",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Täby",
              "addressRegion": "Stockholm",
              "addressCountry": "SE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 59.4439,
              "longitude": 18.0687
            },
            "serviceArea": {
              "@type": "City",
              "name": "Täby"
            },
            "priceRange": "$$",
            "openingHours": "Mo-Fr 08:00-18:00"
          })
        }}
      />
    </main>
  );
} 