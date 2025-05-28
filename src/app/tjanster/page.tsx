import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Våra Tjänster | Flyttella - Professionell Flyttfirma i Stockholm',
  description: 'Upptäck våra omfattande flyttjänster: bohagsflytt, flyttstädning, bärhjälp, piano/tunglyft, kontorsflytt och montering. Professionell service i Stockholm.',
  openGraph: {
    title: 'Våra Tjänster | Flyttella - Professionell Flyttfirma i Stockholm',
    description: 'Upptäck våra omfattande flyttjänster: bohagsflytt, flyttstädning, bärhjälp, piano/tunglyft, kontorsflytt och montering. Professionell service i Stockholm.',
    url: 'https://flyttella.se/tjanster',
    siteName: 'Flyttella',
    locale: 'sv_SE',
    type: 'website',
  },
}

const services = [
  {
    title: 'Bohagsflytt',
    description: 'Professionell flytthjälp för ditt hem. Vi tar hand om hela flyttprocessen från packning till uppackning, med fokus på säkerhet och effektivitet.',
    href: '/bohagsflytt',
    icon: '🏠'
  },
  {
    title: 'Flyttstädning',
    description: 'Grundlig flyttstädning som uppfyller alla krav. Vi garanterar en skinande ren bostad som klarar besiktning.',
    href: '/flyttstadning',
    icon: '✨'
  },
  {
    title: 'Bärhjälp',
    description: 'Erfaren bärhjälp för tunga möbler och föremål. Låt oss ta hand om det tunga lyftet medan du fokuserar på annat.',
    href: '/barhjalp',
    icon: '💪'
  },
  {
    title: 'Piano/Tunglyft',
    description: 'Specialiserad transport av piano och andra tunga föremål. Vi har rätt utrustning och expertis för säker hantering.',
    href: '/piano-tunglyft',
    icon: '🎹'
  },
  {
    title: 'Återvinning',
    description: 'Vi hjälper dig med miljövänlig återvinning och bortforsling av möbler, inredning och annat du inte längre behöver.',
    href: '/atervinning',
    icon: '♻️'
  },
  {
    title: 'Magasinering',
    description: 'Säker och flexibel magasinering av dina möbler och tillhörigheter under kortare eller längre perioder.',
    href: '/magasinering',
    icon: '📦'
  },
  {
    title: 'Montering',
    description: 'Professionell montering av möbler och inredning. Vi säkerställer att allt monteras korrekt och säkert.',
    href: '/montering',
    icon: '🔧'
  }
]

export default function Services() {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Våra Tjänster</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Vi erbjuder ett komplett utbud av flyttjänster för att göra din flytt så smidig som möjligt. 
            Upptäck våra specialiserade tjänster nedan.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.title} 
              href={service.href}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-3 group-hover:text-[#10B981] transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-600">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-[#10B981] font-medium">
                Läs mer
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Redo att börja?</h2>
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