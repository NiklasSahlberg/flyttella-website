import Image from 'next/image';
import Link from 'next/link';

export default function FlyttstadningPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professionell flyttstädning</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Låt vårt erfarna team ta hand om städningen så att du kan fokusera på din flytt
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
                  Professionell flyttstädning för ett skinande hem
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Vårt professionella städteam rengör ordentligt varje liten detalj i din bostad. 
                    När man anlitar företag för flyttstädning ska man känna sig trygg – det kan du med oss.
                  </p>
                  <p className="text-lg">
                    Din köpare eller nya hyresvärd kommer att mötas av ett skinande hem och du kan lägga 
                    all din energi på ditt nya boende.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[350px] w-full">
                  <Image
                    src="/cleaning_lady.png"
                    alt="Flyttstädning"
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
            Så går städningen till
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
                Vi planerar städningen i detalj och säkerställer att allt är förberett för städdagen.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Städdagen
              </h3>
              <p className="text-gray-600">
                Vi utför städningen professionellt och effektivt enligt överenskommen plan.
              </p>
            </div>
          </div>
        </div>

        {/* Services Included */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* All Rooms */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Vi utför i alla rum
            </h2>
            <ul className="space-y-3">
              {[
                "Putsar fönster",
                "Dammsuger och våttorkar snickerier, lister, dörrar, dörrkarmar, fönsterbrädor, fria ytor, garderobsdörrar och skåpdörrar",
                "Torkar ovanpå och invändigt i garderober, skåp och bokhyllor",
                "Torkar i golvskenor på skjutdörrar",
                "Dammsuger och våttorkar element",
                "Dammtorkar väggar",
                "Dammtorkar eluttag",
                "Dammtorkar lampor",
                "Putsar speglar",
                "Tar bort aska från kakelugn och öppen spis",
                "Torkar ytterdörrar",
                "Dammsuger och moppar golv"
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

          {/* Kitchen */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              I köket gör vi även
            </h2>
            <ul className="space-y-3">
              {[
                "Rengör kyl och frys ut- och invändigt",
                "Rengör spis och ugn ut- och invändigt, även plåtar och galler",
                "Rengör fläkt och fläktfilter (ej kolfilter)",
                "Rengör in- och utvändigt samt ovanpå skåp, hyllor och lådor",
                "Rengör kakel/stänkskydd ovanför diskbänk",
                "Rengör under skåp och torkar av socklar",
                "Rengör mikrovågsugn ut- och invändigt",
                "Torkar diskmaskin in- och utvändigt",
                "Torkar ur besticklådor",
                "Tömmer och torkar sopkorg",
                "Putsar diskho, blandare, propp och sil"
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

          {/* Bathroom */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              I badrum och på toaletter
            </h2>
            <ul className="space-y-3">
              {[
                "Rengör väggar och golv",
                "Putsar blandare, synliga rör och duschmunstycke",
                "Avfettar och avkalkar väggar och fogar där det är möjligt",
                "Rengör golvbrunn",
                "Rengör hela duschen alt. badkaret, tar bort fronten och torkar under",
                "Torkar in- och utsida samt ovanpå badrumsskåp",
                "Rengör kran och handfat",
                "Rengör hela toalettstolen",
                "Rengör utsidan av vitvaror samt i tvättmedelsbehållaren på tvättmaskinen"
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
            Inför flyttstädningen
          </h2>
          <p className="text-white/90 mb-6">
            Här är några saker att tänka på inför flyttstädningen:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Stäng av och frosta av kyl och frys",
              "Dra ut kyl, frys, spis och tvättmaskin från väggen om du vill att vi rengör bakom",
              "Rensa vattenlås",
              "Rengör persienner"
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
            Tveka inte att höra av dig!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Du är välkommen att kontakta oss för en kostnadsfri och skräddarsydd offert just efter dina behov!
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