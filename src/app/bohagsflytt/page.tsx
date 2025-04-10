import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Bohagsflytt | Flyttella - Professionell Flytthjälp i Stockholm',
  description: 'Professionell bohagsflytt i Stockholm. Vi erbjuder komplett flyttservice med packning, transport och uppackning. Få en trygg och smidig flytt med Flyttella.',
  openGraph: {
    title: 'Bohagsflytt | Flyttella - Professionell Flytthjälp i Stockholm',
    description: 'Professionell bohagsflytt i Stockholm. Vi erbjuder komplett flyttservice med packning, transport och uppackning. Få en trygg och smidig flytt med Flyttella.',
    url: 'https://flyttella.se/bohagsflytt',
    siteName: 'Flyttella',
    locale: 'sv_SE',
    type: 'website',
  },
}

const features = [
  {
    title: 'Packning & Uppackning',
    description: 'Vi packar dina ägodelar säkert och professionellt med rätt material och teknik.',
    icon: '📦'
  },
  {
    title: 'Säker Transport',
    description: 'Moderna flyttbilar och erfarna flyttare säkerställer en trygg transport av dina tillhörigheter.',
    icon: '🚛'
  },
  {
    title: 'Flyttmaterial',
    description: 'Vi tillhandahåller allt flyttmaterial som behövs för en säker flytt.',
    icon: '🛡️'
  },
  {
    title: 'Demontering & Montering',
    description: 'Vi hjälper dig att demontera och montera möbler vid behov.',
    icon: '🔧'
  }
]

export default function Bohagsflytt() {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Bohagsflytt</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Låt oss ta hand om hela din flytt. Med vår professionella bohagsflytt får du en 
            bekymmersfri flyttupplevelse från start till mål.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Professionell Flytthjälp</h2>
          <p className="text-lg text-gray-600 mb-6">
            En flytt kan vara både tidskrävande och stressig. Med vår bohagsflytt tar vi hand om 
            hela processen så att du kan fokusera på annat. Vi har lång erfarenhet av alla typer 
            av flyttar, från små lägenheter till stora villor.
          </p>
          <p className="text-lg text-gray-600">
            Våra erfarna flyttare hanterar dina ägodelar med största omsorg och använder rätt 
            teknik och utrustning för att säkerställa en säker transport.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Vår Process</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#10B981] text-white rounded-full flex items-center justify-center font-semibold">1</div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Kostnadsfri Besiktning</h3>
                <p className="text-gray-600">Vi börjar med en kostnadsfri besiktning för att bedöma omfattningen av flytten och ge dig en exakt prisuppgift.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#10B981] text-white rounded-full flex items-center justify-center font-semibold">2</div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Planering</h3>
                <p className="text-gray-600">Vi planerar flytten i detalj och säkerställer att rätt resurser finns tillgängliga på flyttdagen.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#10B981] text-white rounded-full flex items-center justify-center font-semibold">3</div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Genomförande</h3>
                <p className="text-gray-600">På flyttdagen tar vårt professionella team hand om allt från packning till transport och uppackning.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Redo att Planera Din Flytt?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din flytt.
          </p>
          <Link 
            href="/fa-offert"
            className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Få en offert
          </Link>
        </div>
      </div>
    </main>
  )
} 