import Image from "next/image";
import Link from "next/link";

export default function OmOssPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Om Flyttella
            </h1>
            <p className="text-xl text-white/90">
              Din pålitliga flyttpartner i Stockholm och hela Mälardalen
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* About Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
                <div>
                  <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
                    KORT OM OSS
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-[#1E293B] text-white px-4 py-1.5 rounded-md text-sm">
                        Sedan 2020
                      </div>
                      <div className="bg-[#10B981] text-white px-4 py-1.5 rounded-md text-sm">
                        Fast pris
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Flyttfirman med Stor Kapacitet - Gott Renommé & Nöjda Kunder
                    </p>
                    <p className="text-gray-600">
                      Sedan vi etablerades har Flyttella Flyttfirma varit erkänt för våra kvalitetstjänster och vår hög effektivitet och proffsighet. Oavsett vilken tjänst du söker bohagsflytt, flyttstädning, packning, montering eller annan tjänst så försöker vi att överträffa dina förväntningar och ser till att du blir helt nöjd.
                    </p>
                    <p className="text-gray-600">
                      Vi erbjuder våra tjänster med fast pris och med 50 % RUT-avdrag. Vi har inga helgs eller kvällstillägg.
                    </p>
                    <p className="text-gray-600">
                      Vi lämnar ut garanti på packning och flyttstädning. Våra offerter och vår rådgivning är kostnadsfri!
                    </p>
                    <p className="text-gray-600">
                      Du är välkommen att skicka in en förfråga till oss eller ringa oss så hjälper vi dig så gott vi kan - Flyttella.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    <Image
                      src="/flyttella-logo.png"
                      alt="Flyttella Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Values Section */}
              <div className="mb-20">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">
                  Våra fördelar
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Fast Pris</h3>
                    <p className="text-gray-600">
                      Inga dolda kostnader eller oväntade tillägg - du vet exakt vad du betalar.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Garanti</h3>
                    <p className="text-gray-600">
                      Vi lämnar garanti på både packning och flyttstädning för din trygghet.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">RUT-avdrag</h3>
                    <p className="text-gray-600">
                      50% RUT-avdrag på alla våra tjänster för att göra flytten mer prisvärd.
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Section */}
              <div>
                <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">
                  Vårt team
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <Image
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aziz&backgroundColor=b6e3f4,c0aede,d1f4d9"
                        alt="Aziz"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Aziz</h3>
                    <p className="text-gray-600">VD & Grundare</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <Image
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel&backgroundColor=b6e3f4,c0aede,d1f4d9"
                        alt="Daniel"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Daniel</h3>
                    <p className="text-gray-600">Säljare</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <Image
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Martin&backgroundColor=b6e3f4,c0aede,d1f4d9"
                        alt="Martin"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Martin</h3>
                    <p className="text-gray-600">Säljare</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0F172A] to-[#10B981] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vill du bli en del av vårt team?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Vi söker alltid efter engagerade och serviceinriktade medarbetare som vill utvecklas inom flyttbranschen.
            </p>
            <button className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
              Sök jobb
            </button>
          </div>
        </section>
      </div>
    </main>
  );
} 