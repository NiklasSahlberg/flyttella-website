import Image from "next/image";
import Link from "next/link";

export default function BohagsflyttpPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professionell bohagsflytt</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Vi hjälper dig med en trygg och smidig flytt från start till mål
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
                  Din pålitliga flyttpartner i Stockholm
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Med vår erfarna personal och moderna utrustning ser vi till att din flytt blir så smidig som möjligt. 
                    Vi hanterar dina ägodelar med största omsorg och respekt.
                  </p>
                  <p className="text-lg">
                    Oavsett om du flyttar till en lägenhet eller villa, inom Stockholm eller längre bort, 
                    har vi kunskapen och resurserna för att göra din flytt bekymmersfri.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[350px] w-full">
                  <Image
                    src="/coupleMoving.png"
                    alt="Bohagsflytt"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-16">
            Så går flytten till
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Kostnadsfri offert
              </h3>
              <p className="text-gray-600">
                Kontakta oss för en kostnadsfri offert. Vi går igenom dina behov och ger dig ett fast pris.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Planering
              </h3>
              <p className="text-gray-600">
                Vi planerar flytten i detalj och säkerställer att allt är förberett för flyttdagen.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Flyttdagen
              </h3>
              <p className="text-gray-600">
                Vi utför flytten professionellt och effektivt enligt överenskommen plan.
              </p>
            </div>
          </div>
        </div>

        {/* Services Included */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Moving Services */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Våra flyttjänster
            </h2>
            <ul className="space-y-3">
              {[
                "Packning av bohag",
                "Nedmontering av möbler",
                "Flyttkartonger och emballage",
                "Transport av bohag",
                "Uppackning på ny adress",
                "Montering av möbler",
                "Piano- och kassaskåpsflytt",
                "Magasinering"
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

          {/* Equipment */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Vår utrustning
            </h2>
            <ul className="space-y-3">
              {[
                "Moderna flyttbilar",
                "Flyttfiltar och skyddsmaterial",
                "Flyttkartonger i olika storlekar",
                "Specialemballage för ömtåliga föremål",
                "Flyttvagnar och lyfthjälpmedel",
                "Verktyg för montering/demontering",
                "Spännband och lastsäkring",
                "Flyttlift vid behov"
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

          {/* Guarantees */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Våra garantier
            </h2>
            <ul className="space-y-3">
              {[
                "Ansvarsförsäkring",
                "Punktlighet och tillförlitlighet",
                "Erfaren och utbildad personal",
                "Säker hantering av bohag",
                "Fast pris utan överraskningar",
                "Moderna och välskötta fordon",
                "Fullständig flyttservice",
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

        {/* Preparation Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Inför flyttdagen
          </h2>
          <p className="text-white/90 mb-6">
            För att göra din flytt så smidig som möjligt, tänk på följande:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Märk upp kartonger tydligt",
              "Packa inte kartongerna för tunga",
              "Töm garderober och skåp",
              "Samla småsaker i lådor",
              "Förbered värdesaker separat",
              "Ha viktiga dokument lättillgängliga"
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
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
            Redo att planera din flytt?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig med en smidig flytt!
          </p>
          <Link 
            href="/fa-offert" 
            className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block font-medium"
          >
            Få offert
          </Link>
        </div>
      </div>
    </main>
  );
} 