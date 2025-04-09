import Image from "next/image";
import Link from "next/link";

export default function BarhjalpPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bärhjälp - En del av vår flyttservice</h1>
            <p className="text-xl text-white/90 mb-8">
              Professionell bärhjälp ingår i alla våra flyttpaket. Vi tar hand om hela processen från början till slut.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/fa-offert" 
                className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium"
              >
                Få offert
              </Link>
              <Link 
                href="/kontakt" 
                className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium"
              >
                Kontakta oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Info Section */}
          <section className="mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
                    Bärhjälp som en del av flytten
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    När du väljer Flyttella för din flytt får du inte bara en flyttfirma - du får en komplett service där bärhjälp är en naturlig del. Våra erfarna flyttgubbar tar hand om allt från packning till transport och uppackning.
                  </p>
                </div>
                <div className="flex-1">
                  <div className="relative h-[400px] w-full">
                    <Image
                      src="/barhjalp.png"
                      alt="Bärhjälp"
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Komplett service</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Demontering av möbler</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professionell packning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bärhjälp och transport</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Montering av möbler</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Fördelar med vår service</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professionell hantering av möbler och tunga föremål</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Säker transport upp och ned för trappor</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Anpassad hantering av känsliga föremål</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Effektiv lastning och lossning av flyttbilen</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Redo att boka din flytt?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Kontakta oss idag för en kostnadsfri offert och låt oss ta hand om hela din flytt, inklusive bärhjälp.
              </p>
              <Link 
                href="/fa-offert" 
                className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium inline-block"
              >
                Få offert
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 