import Image from "next/image";
import Link from "next/link";

export default function MonteringPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Demontering & Montering</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Vi tar hand om hela processen - från nedmontering till montering i ditt nya hem
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
                  Professionell montering och demontering
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Har du inte tid att montera och demontera dina möbler? Vi finns här för att 
                    underlätta din vardag! Med vår erfarenhet sedan 2010 ser vi till att ingen 
                    detalj blir bortglömd.
                  </p>
                  <p className="text-lg">
                    Som helhetsleverantör inom flyttbranschen erbjuder vi en komplett service - från 
                    demontering och packning till montering och rätt placering i ditt nya hem. Vi 
                    erbjuder även gratis leverans av flyttkartonger inom Stockholm.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/montering.png"
                    alt="Montering och demontering"
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
          {/* Demontering */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Demontering
            </h2>
            <ul className="space-y-3">
              {[
                "Varsam nedmontering",
                "Säker packning",
                "Märkning av delar",
                "Dokumentation",
                "Specialverktyg",
                "Skydd av delar",
                "Effektiv process",
                "Professionell hantering"
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

          {/* Montering */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Montering
            </h2>
            <ul className="space-y-3">
              {[
                "Korrekt montering",
                "Rätt placering",
                "Kvalitetskontroll",
                "Funktionstest",
                "Specialverktyg",
                "Erfarenhet",
                "Noggrannhet",
                "Slutkontroll"
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

          {/* Fördelar */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Fördelar
            </h2>
            <ul className="space-y-3">
              {[
                "Tidsbesparande",
                "Professionellt utfört",
                "Säker hantering",
                "Komplett service",
                "Erfaren personal",
                "Kostnadsfri offert",
                "Snabb service",
                "Nöjd-kund-garanti"
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

        {/* Process Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Vår process
          </h2>
          <p className="text-white/90 mb-6">
            Vi erbjuder en komplett lösning för din flytt:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Demontering av möbler",
              "Professionell packning",
              "Säker transport",
              "Flyttstädning",
              "Uppackning",
              "Montering på plats"
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
            Låt oss hjälpa dig med monteringen
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi erbjuder skräddarsydda lösningar för just dina behov. Kontakta oss för en 
            kostnadsfri offert och låt oss ta hand om hela processen.
          </p>
          <Link 
            href="/kontakt#contact-form" 
            className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Få offert
          </Link>
        </div>
      </div>
    </main>
  );
} 