import Image from "next/image";
import Link from "next/link";

export default function Bohagsflytt() {
  return (
    <div className="min-h-screen">
      {/* Top Header - Same as main page */}
      <header className="sticky top-0 z-50">
        {/* Contact Bar */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-8">
              <div className="flex items-center divide-x divide-white/20">
                <div className="flex items-center pr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white/80 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-white/90">Mån-Fre: 08:00-18:00</span>
                </div>
                <div className="flex items-center px-6">
                  <span className="text-sm text-white/90">Lör-Sön: Stängt</span>
                </div>
              </div>
              <div className="flex items-center">
                <a href="tel:08-630-07-25" className="flex items-center group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80 group-hover:text-white transition-colors mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">08-630 07 25</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <div className="relative h-14 w-48">
                    <Image
                      src="/flyttella-logo.png"
                      alt="Flyttella Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Navigation and CTA */}
              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex items-center space-x-8">
                  <Link href="/" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Hem</Link>
                  <Link href="/bohagsflytt" className="text-[#10B981] transition-colors text-sm font-medium tracking-wide">Bohagsflytt</Link>
                  <Link href="/flyttstadning" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Flyttstädning</Link>
                  <Link href="/om-oss" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Om oss</Link>
                  <Link href="/kontakt" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Kontakt</Link>
                </nav>

                <Link href="/fa-offert" className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                  FÅ OFFERT
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-[#0F172A] hover:text-[#10B981] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bohagsflytt med Flyttella</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Professionell flytthjälp med fast pris och nöjd-kund-garanti
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/fa-offert" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                Få offert
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium">
                Kontakta oss
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
                  Vad ingår i vår flyttservice?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0F172A] mb-1">Professionell flytthjälp</h3>
                      <p className="text-gray-600">Erfarna flyttare som hanterar dina ägodelar med största omsorg</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0F172A] mb-1">Flyttbil och utrustning</h3>
                      <p className="text-gray-600">Modern flyttbil och all nödvändig utrustning för en säker flytt</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0F172A] mb-1">Försäkring ingår</h3>
                      <p className="text-gray-600">Full försäkring för dina ägodelar under hela flyttprocessen</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#0F172A] mb-1">Fast pris</h3>
                      <p className="text-gray-600">Inga överraskningar - du vet exakt vad flytten kommer att kosta</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96">
                <Image
                  src="/coupleMoving.png"
                  alt="Flyttella moving service"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Process Steps */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">
                Så går flytten till
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4">Kostnadsfri offert</h3>
                  <p className="text-gray-600">
                    Kontakta oss för en kostnadsfri offert. Vi går igenom dina behov och ger dig ett fast pris.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4">Planering</h3>
                  <p className="text-gray-600">
                    Vi planerar flytten i detalj och säkerställer att allt är förberett för flyttdagen.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4">Flyttdagen</h3>
                  <p className="text-gray-600">
                    Vi utför flytten professionellt och effektivt enligt överenskommen plan.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Redo att börja din flytt?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din flytt.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/fa-offert" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                  Få offert
                </Link>
                <a href="tel:08-630-07-25" className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium">
                  Ring 08-630 07 25
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 