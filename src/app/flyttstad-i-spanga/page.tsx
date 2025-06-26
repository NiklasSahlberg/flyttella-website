import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flyttstäd i Spånga | Professionell Städservice | Flyttella',
  description: 'Professionell flyttstädning i Spånga, Stockholm. Vi erbjuder grundlig flyttstädning, kontorsstädning och hemstädning i Spånga och omnejd.',
  keywords: 'flyttstäd spånga, flyttstädning spånga, städfirma spånga, flyttstädning stockholm',
  openGraph: {
    title: 'Flyttstäd i Spånga | Professionell Städservice | Flyttella',
    description: 'Professionell flyttstädning i Spånga, Stockholm.',
    type: 'website',
    locale: 'sv_SE',
  },
};

export default function FlyttstadSpangaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flyttstäd i Spånga
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professionell flyttstädning i Spånga, Stockholm. Vi har erfarenhet av städning i lägenheter, kontor och bostäder i detta familjevänliga område.
              </p>
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
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
              Professionell flyttstädning i Spånga, Stockholm
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Som ledande städfirma i Spånga har vi specialiserat oss på att erbjuda grundlig och professionell flyttstädning. Spånga är ett familjevänligt område med moderna lägenheter, kontor och bostadsområden som kräver noggrann städning.
              </p>
              <p className="text-lg">
                Vi förstår de specifika kraven för städning i Spånga - från moderna lägenheter till kontor. Vår erfarenhet och lokalkännedom säkerställer en skinande ren bostad eller kontorslokal.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Flyttstädning</h3>
            <ul className="space-y-3">
              {["Grundlig städning av alla ytor", "Städning av kök och badrum", "Fönsterputsning", "Golvstädning och dammsugning", "Städning av garderober", "Städgaranti"].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Kontorsstädning</h3>
            <ul className="space-y-3">
              {["Städning av kontorsrum", "Städning av mötesrum", "Sanering av kök och pentry", "Städning av toaletter", "Golvstädning", "Flexibla tider"].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Hemstädning</h3>
            <ul className="space-y-3">
              {["Regelbunden hemstädning", "Städning av alla rum", "Kök och badrumsstädning", "Städning av trädgårdsrum", "Fönsterputsning", "Personlig service"].map((item, index) => (
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
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            Boka din städtjänst i Spånga idag
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi erbjuder skräddarsydda städlösningar för alla typer av bostäder och kontor i Spånga. Kontakta oss för en kostnadsfri offert.
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