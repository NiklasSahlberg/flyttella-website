import Image from "next/image";
import Link from "next/link";

export default function AtervinningPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Återvinning</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Miljövänlig återvinning och hantering av alla typer av föremål enligt gällande miljöregler
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
                  Professionell återvinning för en hållbar framtid
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Vi tar ansvar för miljön genom att erbjuda professionell återvinning av alla typer av föremål. 
                    Vårt team är specialiserat på att sortera, hantera och återvinna material på rätt sätt 
                    enligt gällande miljöregler och återvinningskrav.
                  </p>
                  <p className="text-lg">
                    Från elektronik och vitvaror till möbler och byggmaterial - vi säkerställer att allt 
                    hanteras miljövänligt och att så mycket som möjligt återvinns eller återanvänds.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/recycling.png"
                    alt="Återvinning och miljövänlig hantering"
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
          {/* Electronics Recycling */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Elektronik & Vitvaror
            </h2>
            <ul className="space-y-2">
              {[
                "TV-apparater och skärmar",
                "Datorer och laptops",
                "Mobiltelefoner och surfplattor",
                "Kylskåp och frysar",
                "Tvättmaskiner och torktumlare",
                "Spisar och ugnar",
                "Mikrovågsugnar",
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

          {/* Furniture & Materials */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Möbler & Material
            </h2>
            <ul className="space-y-2">
              {[
                "Trämöbler och snickerier",
                "Metallmöbler och ramar",
                "Textilier och mattmaterial",
                "Plast och kompositmaterial",
                "Glas och speglar",
                "Byggmaterial",
                "Isoleringsmaterial",
                "Övriga material"
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

          {/* Environmental Benefits */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Miljöfördelar
            </h2>
            <ul className="space-y-2">
              {[
                "Certifierad återvinning",
                "CO2-reduktion",
                "Resursbesparing",
                "Farligt avfall hanteras",
                "Kvitto på återvinning",
                "Miljörapportering",
                "Hållbar utveckling",
                "Framtidssäkra lösningar"
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
            Så fungerar återvinningen
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Insamling & Sortering
              </h3>
              <p className="text-gray-600">
                Vi samlar in och sorterar föremålen enligt materialtyp och återvinningskrav.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Professionell Hantering
              </h3>
              <p className="text-gray-600">
                Föremålen hanteras säkert och professionellt enligt miljöregler.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Återvinning & Dokumentation
              </h3>
              <p className="text-gray-600">
                Material återvinns och vi ger kvitto på all miljöhantering.
              </p>
            </div>
          </div>
        </div>

        {/* Environmental Impact Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Vårt miljöansvar
          </h2>
          <p className="text-white/90 mb-6">
            Vi arbetar aktivt för en hållbar framtid genom:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Certifierade återvinningsprocesser",
              "CO2-neutrala transporter",
              "Minimering av avfall",
              "Återanvändning av material",
              "Miljörapportering och transparens",
              "Samarbete med miljöorganisationer"
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

        {/* Recycling Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* What We Recycle */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Vad vi återvinner
            </h2>
            <ul className="space-y-3">
              {[
                "Metaller (järn, aluminium, koppar)",
                "Plaster och kompositmaterial",
                "Glas och keramik",
                "Trä och papp",
                "Textilier och läder",
                "Elektronik och komponenter",
                "Batterier och akumulatorer",
                "Farligt avfall (enligt regler)"
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

          {/* Preparation Guidelines */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Inför återvinningen
            </h2>
            <p className="text-gray-600 mb-6">
              För att göra återvinningen så effektiv som möjligt:
            </p>
            <ul className="space-y-3">
              {[
                "Sortera föremål efter materialtyp",
                "Töm kylskåp och frysar",
                "Ta bort personliga data från elektronik",
                "Markera farligt avfall",
                "Ange eventuella särskilda krav",
                "Säkerställ tillgång till föremålen"
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

        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
            Behöver ni hjälp med återvinning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Kontakta oss för en kostnadsfri offert på miljövänlig återvinning av era föremål!
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