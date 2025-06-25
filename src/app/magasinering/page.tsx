import Image from "next/image";
import Link from "next/link";

export default function MagasineringPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Magasinering</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Säker och pålitlig förvaring av dina föremål i moderna, säkra lagerlokaler
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
                  Professionell magasinering för alla behov
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Behöver du tillfällig förvaring av möbler, vitvaror eller andra föremål? 
                    Vi erbjuder säkra och moderna lagerlokaler med 24/7 övervakning och 
                    klimatkontroll för att skydda dina värdesaker.
                  </p>
                  <p className="text-lg">
                    Våra lagerlokaler är perfekta för mellanflytt, renovering eller när du 
                    behöver frigöra utrymme. Vi tar hand om transport, förvaring och 
                    leverans när du behöver dina föremål tillbaka.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/storage.png"
                    alt="Magasinering och förvaring"
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
          {/* Storage Types */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Förvaringstyper
            </h2>
            <ul className="space-y-2">
              {[
                "Möbler och inredning",
                "Vitvaror och elektronik",
                "Antikviteter och konst",
                "Dokument och arkiv",
                "Säsongsföremål",
                "Byggmaterial",
                "Företagsinventarier",
                "Privata samlingar"
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

          {/* Security Features */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Säkerhetsfunktioner
            </h2>
            <ul className="space-y-2">
              {[
                "24/7 övervakning",
                "Larm och säkerhetssystem",
                "Klimatkontrollerade lokaler",
                "Brandskydd",
                "Försäkring inkluderad",
                "Kodlås och säkerhet",
                "Registrerad personal",
                "Kvitton på allt"
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

          {/* Service Benefits */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Fördelar
            </h2>
            <ul className="space-y-2">
              {[
                "Flexibla avtal",
                "Inga dolda kostnader",
                "Snabb tillgång",
                "Professionell hantering",
                "Transport inkluderad",
                "Kostnadsfri offert",
                "Ingen bindningstid",
                "Nöjd-kund-garanti"
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
            Så fungerar magasineringen
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Upphämtning
              </h3>
              <p className="text-gray-600">
                Vi hämtar dina föremål hemma hos dig och transporterar dem säkert till våra lagerlokaler.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Säker förvaring
              </h3>
              <p className="text-gray-600">
                Dina föremål förvaras säkert i våra moderna lagerlokaler med full övervakning.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Leverans
              </h3>
              <p className="text-gray-600">
                När du behöver dina föremål tillbaka levererar vi dem till din nya adress.
              </p>
            </div>
          </div>
        </div>

        {/* Storage Solutions Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Magasineringslösningar
          </h2>
          <p className="text-white/90 mb-6">
            Vi erbjuder flexibla lösningar för alla behov:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Korttidsförvaring (1-3 månader)",
              "Långtidsförvaring (3+ månader)",
              "Företagsmagasinering",
              "Privat förvaring",
              "Säsongsbaserad förvaring",
              "Mellanflyttsförvaring"
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
            Inför magasineringen
          </h2>
          <p className="text-gray-600 mb-6">
            För att göra magasineringen så smidig som möjligt:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Markera tydligt vilka föremål som ska magasineras",
              "Packa känsliga föremål ordentligt",
              "Töm kylskåp och frysar innan transport",
              "Ange önskad förvaringsperiod",
              "Informera om eventuella särskilda krav",
              "Säkerställ att vi har tillgång till föremålen"
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
            Behöver ni hjälp med magasinering?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Kontakta oss för en kostnadsfri offert på magasinering av era föremål!
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