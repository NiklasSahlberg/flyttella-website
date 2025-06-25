import Image from "next/image";
import Link from "next/link";

export default function BortforslingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bortforsling</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Professionell bortforsling av möbler, vitvaror och andra föremål med miljövänlig hantering
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kontakt#contact-form" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                Få offert
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
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
                  Miljövänlig bortforsling av allt från möbler till vitvaror
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    När du flyttar eller renoverar behöver du ofta bli av med gamla möbler, vitvaror eller andra föremål. 
                    Vi erbjuder professionell bortforsling med fokus på miljövänlig hantering och återvinning.
                  </p>
                  <p className="text-lg">
                    Vårt team tar hand om allt från små möbler till stora vitvaror och säkerställer att allt 
                    hanteras på rätt sätt enligt miljöregler och återvinningskrav.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/waste-removal.png"
                    alt="Bortforsling av möbler och vitvaror"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Included */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Furniture Removal */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Möbler
            </h2>
            <ul className="space-y-2">
              {[
                "Soffor och fåtöljer",
                "Sängar och madrasser",
                "Bord och stolar",
                "Skåp och byråar",
                "Garderober",
                "Matsalsmöbler",
                "Kontorsmöbler",
                "Trädgårdsmöbler"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#10B981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Appliances */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Vitvaror & Elektronik
            </h2>
            <ul className="space-y-2">
              {[
                "Kylskåp och frysar",
                "Tvättmaskiner och torktumlare",
                "Diskmaskiner",
                "Spisar och ugnar",
                "Mikrovågsugnar",
                "TV-apparater",
                "Datorer och skärmar",
                "Övrig elektronik"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#10B981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Items */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Övriga föremål
            </h2>
            <ul className="space-y-2">
              {[
                "Mattor och golvbeläggningar",
                "Gardiner och rullgardiner",
                "Lampor och belysning",
                "Speglar och tavlor",
                "Trädgårdsredskap",
                "Cyklar och leksaker",
                "Byggmaterial",
                "Övriga hushållsartiklar"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#10B981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-16">
            Så går bortforslingen till
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Bedömning
              </h3>
              <p className="text-gray-600">
                Vi bedömer vilka föremål som ska bortforslas och planerar den bästa metoden för hantering.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Bortforsling
              </h3>
              <p className="text-gray-600">
                Vi bortforslar föremålen säkert och effektivt med rätt utrustning och personal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Miljövänlig hantering
              </h3>
              <p className="text-gray-600">
                Vi säkerställer att allt återvinns eller hanteras på miljövänligt sätt enligt gällande regler.
              </p>
            </div>
          </div>
        </div>

        {/* Environmental Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Miljövänlig hantering
          </h2>
          <p className="text-white/90 mb-6">
            Vi tar ansvar för miljön genom att:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Sorterar föremål för återvinning",
              "Återvinner metaller och elektronik",
              "Donerar användbara föremål till välgörenhet",
              "Hanterar farligt avfall enligt regler",
              "Använder miljövänliga transportmetoder",
              "Ger kvitto på miljöhantering"
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

        {/* Preparation Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
            Inför bortforslingen
          </h2>
          <p className="text-gray-600 mb-6">
            För att göra bortforslingen så smidig som möjligt:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Markera tydligt vilka föremål som ska bort",
              "Se till att tillgångsbanan är fri från hinder",
              "Töm kylskåp och frysar innan bortforsling",
              "Ange eventuella särskilda instruktioner",
              "Säkerställ att vi har tillgång till eluttag",
              "Informera om eventuella skador på föremål"
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

        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
            Behöver ni hjälp med bortforsling?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Kontakta oss för en kostnadsfri offert på bortforsling av era föremål!
          </p>
          <Link 
            href="/kontakt#contact-form" 
            className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block font-medium"
          >
            Få offert
          </Link>
        </div>
      </div>
    </main>
  );
} 