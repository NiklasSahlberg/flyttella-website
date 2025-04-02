import Image from "next/image";
import Link from "next/link";
import ReviewsWidget from "./components/ReviewsWidget";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top Header */}
      <header className="sticky top-0 z-50">
        {/* Contact Bar */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#059669] text-white">
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
                <div className="relative h-14 w-48">
        <Image
                    src="/flyttella-logo.png"
                    alt="Flyttella Logo"
                    fill
                    className="object-contain"
          priority
        />
                </div>
              </div>

              {/* Navigation and CTA */}
              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex items-center space-x-8">
                  <Link href="/" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Hem</Link>
                  <Link href="/bohagsflytt" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Bohagsflytt</Link>
                  <Link href="/flyttstadning" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Flyttstädning</Link>
                  <Link href="/om-oss" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Om oss</Link>
                  <Link href="/kontakt" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Kontakt</Link>
                </nav>

                <button className="bg-gradient-to-r from-[#1e3a8a] to-[#059669] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                  FÅ OFFERT
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-[#1e3a8a] hover:text-[#059669] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-gradient-to-br from-[#1e3a8a] to-[#059669]">
        <div className="absolute inset-0 z-0 bg-black/30"></div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttella - Din pålitliga flyttpartner
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Upplev skillnaden mellan en vanlig flytt och en professionell flyttjänst!
              </p>
            </div>

            <div className="mt-12 text-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Fast-pris</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Nöjd kund garanti</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Pack garanti</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">50% RUT-avdrag</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Försäkring & Trafiktillstånd</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Professionell service</p>
                </div>
              </div>
              <p className="text-xl font-semibold mb-8">
                Vi ser fram emot att överträffa dina förväntningar!
              </p>
              <div className="flex gap-4 justify-center">
                <button className="btn-secondary rounded-full">
                  Boka flytt
                </button>
                <button className="bg-white text-[#1e3a8a] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
                  Kontakta oss
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Widget Section */}
      <ReviewsWidget />

      {/* Services Sections */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e3a8a] mb-16">
            VÅRA TJÄNSTER
          </h2>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Bohagsflytt */}
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#059669] rounded-lg p-8 shadow-lg text-white">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Bohagsflytt
              </h3>
              <p className="text-gray-100 mb-6">
                Vi erbjuder professionell flytthjälp för både privatpersoner och företag. Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Erfarna och försiktiga flyttare</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Moderna och välutrustade flyttbilar</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Fullständig flyttförsäkring ingår</span>
                </li>
              </ul>
              <button className="bg-white text-[#1e3a8a] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
                Boka din flytt
              </button>
            </div>

            {/* Flyttstädning */}
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#059669] rounded-lg p-8 shadow-lg text-white">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Flyttstädning
              </h3>
              <p className="text-gray-100 mb-6">
                Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Städgaranti ingår</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Miljövänliga rengöringsmedel</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Professionell utrustning</span>
                </li>
              </ul>
              <button className="bg-white text-[#1e3a8a] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
                Boka städning
              </button>
            </div>

            {/* Packning */}
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#059669] rounded-lg p-8 shadow-lg text-white">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Packning
              </h3>
              <p className="text-gray-100 mb-6">
                Står du inför en flytt och har ont om tid eller vill vara säker på att dina saker hamnar tryggt i lådorna? Vi ser till att packa er bohag på ett korrekt och tryggt sätt.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Gratis lån av kartonger inom Stockholm</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Packgaranti på alla lösöre vi packar</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Professionell och säker packning</span>
                </li>
              </ul>
            </div>

            {/* Montering */}
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#059669] rounded-lg p-8 shadow-lg text-white">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Montering
              </h3>
              <p className="text-gray-100 mb-6">
                Om du har ont om tid och saknar rätt redskap då ser vi till att alla taklampor, gardiner, tv och tavlor hamnar trygg i flyttkartonger. Vi ser till även att montera upp allting på din nya bostad.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Vi tar med alla verktyg och material</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Professionell nedmontering och uppsättning</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-100">Säker hantering av dina föremål</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="section-padding bg-gradient-to-br from-[#1e3a8a]/5 to-[#059669]/5">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">
                ÖPPETTIDER
              </h2>
              <p className="text-xl text-gray-800">Kundservice</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-lg font-semibold text-[#1e3a8a]">Måndag - Fredag</span>
                  <span className="text-lg text-[#059669] font-medium">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-lg font-semibold text-[#1e3a8a]">Lördag</span>
                  <span className="text-lg text-gray-500">Stängt</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#1e3a8a]">Söndag</span>
                  <span className="text-lg text-gray-500">Stängt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[#1e3a8a] to-[#059669] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Redo att flytta?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kontakta oss idag för ett kostnadsfritt offert och låt oss hjälpa dig med din flytt.
          </p>
          <button className="bg-white text-[#1e3a8a] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
            Få offert
          </button>
        </div>
      </section>

      {/* Locations Section - SEO Optimized */}
      <section className="section-padding bg-gradient-to-br from-[#1e3a8a]/5 to-[#059669]/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e3a8a] mb-12">
            HÄR FINNS VI
          </h2>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
            <a href="/flyttfirma-norrmalm" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Norrmalm</h3>
            </a>
            <a href="/flyttfirma-kungsholmen" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Kungsholmen</h3>
            </a>
            <a href="/flyttfirma-ostermalm" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Östermalm</h3>
            </a>
            <a href="/flyttfirma-nacka" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Nacka</h3>
            </a>
            <a href="/flyttfirma-vasastan" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Vasastan</h3>
            </a>
            <a href="/flyttfirma-lidingo" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Lidingö</h3>
            </a>
            <a href="/flyttfirma-bromma" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Bromma</h3>
            </a>
            <a href="/flyttfirma-norrtalje" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Norrtälje</h3>
            </a>
            <a href="/flyttfirma-taby" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Täby</h3>
            </a>
            <a href="/flyttfirma-solna" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Solna</h3>
            </a>
            <a href="/flyttfirma-vallingby" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Vällingby</h3>
            </a>
            <a href="/flyttfirma-huddinge" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Huddinge</h3>
            </a>
            <a href="/flyttfirma-varmdo" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Värmdö</h3>
            </a>
            <a href="/flyttfirma-sollentuna" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Sollentuna</h3>
            </a>
            <a href="/flyttfirma-danderyd" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Danderyd</h3>
            </a>
            <a href="/flyttfirma-sodermalm" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Södermalm</h3>
            </a>
            <a href="/flyttfirma-vasteras" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Västerås</h3>
            </a>
            <a href="/flyttfirma-jarfalla" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Järfälla</h3>
            </a>
            <a href="/flyttfirma-sodertalje" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Södertälje</h3>
            </a>
            <a href="/flyttfirma-linkoping" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Linköping</h3>
            </a>
            <a href="/flyttfirma-norrkoping" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Norrköping</h3>
            </a>
            <a href="/flyttfirma-enkoping" className="group">
              <h3 className="text-[#1e3a8a] group-hover:text-[#059669] transition-colors font-medium">Flyttfirma i Enköping</h3>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
