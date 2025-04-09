import Image from "next/image";
import Link from "next/link";

export default function KontorsflyttPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Kontorsflytt</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Professionell flytt av företag både internt och externt
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
                  Professionell kontorsflytt
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Vi erbjuder kompletta lösningar för företagsflytt, oavsett om det gäller intern omflyttning 
                    eller flytt till ny adress. Med vår erfarenhet och kompetens säkerställer vi en smidig 
                    och kostnadseffektiv flyttprocess.
                  </p>
                  <p className="text-lg">
                    Vi följer alla relevanta regler, lagar och villkor, och håller oss till det vi kommit 
                    överens om. Vår erfarenhet och rätt utrustning gör att vi kan erbjuda högkvalitativa 
                    tjänster till konkurrenskraftiga priser.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/office-moving.png"
                    alt="Kontorsflytt"
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
          {/* Planning */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Planering & Rådgivning
            </h2>
            <ul className="space-y-3">
              {[
                "Strategisk flyttplanering",
                "Kostnadsoptimering",
                "Tidsplanering",
                "Resurshantering",
                "Riskbedömning",
                "Kommunikation",
                "Dokumentation",
                "Uppföljning"
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

          {/* Services */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Våra tjänster
            </h2>
            <ul className="space-y-3">
              {[
                "Intern omflyttning",
                "Extern flytt",
                "Möbelflytt",
                "IT-utrustning",
                "Arkivhantering",
                "Specialemballage",
                "Transport",
                "Montering"
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

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Våra certifikat
            </h2>
            <ul className="space-y-3">
              {[
                "F-skattesedel",
                "Yrkestrafiktillstånd",
                "Ansvarsförsäkring",
                "Erfaren personal",
                "Specialutrustning",
                "Professionell service",
                "Kvalitetskontroll",
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
            Inför flytten
          </h2>
          <p className="text-white/90 mb-6">
            För att göra flytten så smidig som möjligt, tänk på följande:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Planera flytten i god tid",
              "Inventera utrustning och möbler",
              "Backa upp viktig data",
              "Markera känslig utrustning",
              "Informera personalen",
              "Planera för driftstopp"
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
            Låt oss hjälpa dig med din kontorsflytt
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi anpassar vår service efter dina behov och säkerställer att allt går smidigt och säkert.
            Kontakta oss för en kostnadsfri offert och planering av din flytt.
          </p>
          <Link 
            href="/fa-offert" 
            className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Få offert
          </Link>
        </div>
      </div>
    </main>
  );
} 