import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Flyttfirma i Lidingö | Exklusiv Flyttservice | Flyttella',
  description: 'Erfaren flyttfirma med gedigen lokalkännedom i Lidingö. Vi erbjuder professionell flytthjälp, flyttstädning och packning med fokus på kvalitet och kundnöjdhet. Kontakta oss för en smidig flytt!',
  keywords: 'flyttfirma lidingö, flytthjälp lidingö, flyttstädning lidingö, packning lidingö, bohagsflytt lidingö',
  openGraph: {
    title: 'Flyttfirma i Lidingö | Exklusiv Flyttservice | Flyttella',
    description: 'Erfaren flyttfirma med gedigen lokalkännedom i Lidingö. Vi erbjuder professionell flytthjälp, flyttstädning och packning med fokus på kvalitet och kundnöjdhet.',
  },
};

export default function FlyttfirmaLidingoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Din lokala flyttfirma i Lidingö
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Vi är specialiserade på flyttar i hela Lidingö - från exklusiva villor i Brevik till lägenheter i Lidingö Centrum och alla områden däremellan. Med vår lokalkännedom säkerställer vi en smidig flyttprocess på ön.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
              Flyttexperter på Lidingö
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                Som etablerad flyttfirma på Lidingö har vi specialanpassat våra tjänster för öns unika karaktär. Vi har omfattande erfarenhet av att hantera flyttar i både exklusiva villor och lägenheter, från Brevik till Lidingö Centrum, Hersby, Mölna, Bo och alla andra områden på ön.
              </p>
              <p className="text-lg text-gray-600">
                Vår djupa förståelse för Lidingös olika områden gör att vi kan erbjuda skräddarsydda flyttlösningar. Vi hanterar allt från flyttar i villor med stora trädgårdar till lägenheter i centrum, samt företagsflyttar i kommunens växande företagsområden som Lidingö Centrum och Brevik.
              </p>
            </div>
            <div className="mt-8 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">RUT-avdrag</h3>
                <div className="bg-white/10 rounded-full px-4 py-1">
                  <span className="text-sm font-medium text-white">50% avdrag</span>
                </div>
              </div>
              <p className="text-white/90">
                Vi erbjuder RUT-avdrag på våra tjänster vilket gör det mer prisvärt för dig som privatperson. Perfekt för dig som flyttar inom eller till Lidingö.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-12 text-center">
              Anpassade flyttjänster för Lidingö
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Bohagsflytt</h3>
                <ul className="space-y-3">
                  {[
                    "Specialister på villaflyttar i Brevik",
                    "Erfarenhet med trädgårdsmöbler",
                    "Fullständig flyttförsäkring",
                    "Flexibla flyttider",
                    "Gedigen lokalkännedom",
                    "Säker hantering av hissar"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Flyttstädning</h3>
                <ul className="space-y-3">
                  {[
                    "Anpassad för exklusiva bostäder",
                    "Fönsterputsning ingår",
                    "Städgaranti med besiktning",
                    "Flexibla tider",
                    "Erfaren städpersonal",
                    "RUT-avdrag för privatpersoner"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Packning</h3>
                <ul className="space-y-3">
                  {[
                    "Professionell packtjänst",
                    "Högkvalitativt flyttmaterial",
                    "Särskild hantering av ömtåliga föremål",
                    "Effektiv packprocess",
                    "Tydlig märkning för enkel upppackning",
                    "Hjälp med upppackning"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8 text-center">
              Varför välja oss som din flyttfirma på Lidingö?
            </h2>
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  "Specialister på flyttar på hela ön",
                  "Omfattande lokalkännedom i alla områden",
                  "Anpassade flyttlösningar för varje område",
                  "Heltäckande försäkring",
                  "Transparenta priser",
                  "Modern flyttutrustning",
                  "100% kundnöjdhetsgaranti",
                  "Miljömedveten flyttservice"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
              Vi täcker hela Lidingö
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Vi har specialiserat oss på flyttar i hela Lidingö - från Brevik till Lidingö Centrum, Hersby, Mölna, Bo och alla andra områden på ön. Med vår omfattande lokalkännedom kan vi erbjuda effektiv flyttservice oavsett var på Lidingö du bor eller ska flytta till.
            </p>
            <Link 
              href="/fa-offert" 
              className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              Få offert
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Flyttella - Flyttfirma i Lidingö",
            "image": "https://flyttella.se/flyttella-logo.png",
            "description": "Professionell flyttfirma i Lidingö. Vi erbjuder flyttstädning, packning och bohagsflytt i Lidingö. Snabb service och konkurrenskraftiga priser.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Lidingö Centrum",
              "addressLocality": "Lidingö",
              "addressRegion": "Stockholm",
              "postalCode": "181 32",
              "addressCountry": "SE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "59.3667",
              "longitude": "18.1333"
            },
            "url": "https://flyttella.se/flyttfirma-i-lidingo",
            "telephone": "08-898-301",
            "priceRange": "$$",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
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
 