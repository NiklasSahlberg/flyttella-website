import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Våra Städtjänster | Flyttella - Professionell Städservice i Stockholm',
  description: 'Upptäck våra omfattande städtjänster: flyttstädning och kontorsstädning. Professionell städservice i Stockholm.',
  openGraph: {
    title: 'Våra Städtjänster | Flyttella - Professionell Städservice i Stockholm',
    description: 'Upptäck våra omfattande städtjänster: flyttstädning och kontorsstädning. Professionell städservice i Stockholm.',
    url: 'https://flyttella.se/stadtjanster',
    siteName: 'Flyttella',
    locale: 'sv_SE',
    type: 'website',
  },
}

const cleaningServices = [
  {
    title: 'Flyttstädning',
    description: 'Grundlig flyttstädning som uppfyller alla krav. Vi garanterar en skinande ren bostad som klarar besiktning.',
    href: '/flyttstadning',
    icon: '✨'
  },
  {
    title: 'Kontorsstädning',
    description: 'Professionell städning av kontor och arbetsplatser. Vi anpassar städningen efter era behov för en trivsam arbetsmiljö.',
    href: '/kontorsstadning',
    icon: '🧹'
  },
  {
    title: 'Hemstädning',
    description: 'Regelbunden eller enstaka hemstädning för ett fräscht och trivsamt hem.',
    href: '/hemstadning',
    icon: '🏡'
  },
  {
    title: 'Byggstädning',
    description: 'Noggrann städning efter byggprojekt eller vid extra smutsiga miljöer.',
    href: '/bygg-grovstadning',
    icon: '🚧'
  },
  {
    title: 'Storstädning',
    description: 'En extra grundlig städning av hela hemmet – perfekt för säsongsbyte eller vid behov.',
    href: '/storstädning',
    icon: '🧽'
  },
  {
    title: 'Visningsstädning',
    description: 'Städning inför visning eller försäljning av bostad för bästa intryck.',
    href: '/visningsstadning',
    icon: '🏠'
  },
  {
    title: 'Dödsbostädning',
    description: 'Omsorgsfull städning av dödsbo med respekt och noggrannhet.',
    href: '/dodsbo-stadning',
    icon: '🕊️'
  }
]

export default function CleaningServices() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative py-20 bg-white text-[#0F172A] overflow-hidden">
        <div className="mx-auto px-16">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: 'url(/cleaning_background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Våra Städtjänster</h1>
              <p className="text-lg md:text-xl max-w-2xl">
                Vi erbjuder ett komplett utbud av städtjänster för både privatpersoner och företag. Upptäck våra specialiserade tjänster nedan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cleaningServices.map((service) => (
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
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Redo att boka städning?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din städning.
          </p>
          <Link 
            href="/fa-stadning-offert"
            className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Få städoffert
          </Link>
        </div>
      </div>
    </main>
  )
} 