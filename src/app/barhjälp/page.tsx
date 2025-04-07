import Image from "next/image";
import Link from "next/link";

export default function Barhjälp() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Professionell bärhjälp
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Inget är för tungt när man har rätt kompetens! Vi hjälper dig bära dina värdefulla bohag, oavsett destination.
              </p>
            </div>

            <div className="mt-12 text-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Fast-pris</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Erfaren personal</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Försäkring ingår</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">50% RUT-avdrag</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Rätt utrustning</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Snabb service</p>
                </div>
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
                  Din pålitliga bärhjälp i Stockholm
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Ska du flytta en våning ner, upp eller tvärs över gatan? Flyttella hjälper dig med att bära dina värdefulla bohag oavsett var de ska ta vägen. Vi finns här för att underlätta din vardag!
                  </p>
                  <p className="text-lg">
                    Som helhetsleverantör sedan 2010 inom flyttbranschen har vi den erfarenhet och kompetens som krävs för att hantera dina ägodelar på ett säkert och professionellt sätt.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[350px] w-full">
                  <Image
                    src="/moving_help.png"
                    alt="Bärhjälp"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-12">
            Våra tjänster
          </h2>
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
                  <span>Uppackning och montering</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Extra förmåner</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gratis flyttkartonger inom Stockholm</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kostnadsfri leverans av material</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Skräddarsydda lösningar</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flexibla tider</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Behöver du bärhjälp?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Kontakta oss för en kostnadsfri och skräddarsydd offert anpassad efter dina behov. Med vår erfarenhet sedan 2010 garanterar vi en smidig och trygg service.
            </p>
            <Link 
              href="/fa-offert" 
              className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium inline-block"
            >
              Begär offert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 