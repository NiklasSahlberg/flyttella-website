'use client';

import Link from "next/link";
import PictureSlider from "../components/PictureSlider";
import ReviewsWidget from "../components/ReviewsWidget";

export default function OmOssPage() {

  // Company images for the slider
  const companyImages = [
    {
      src: "/omoss.jpg",
      alt: "Flyttella team at work",
      title: "Vårt team i arbete"
    },
    {
      src: "/personalpicture.jpg",
      alt: "Professional moving team",
      title: "Professionellt flyttteam"
    },
    {
      src: "/smiling_worker_new.png",
      alt: "Happy worker providing service",
      title: "Glad medarbetare i tjänst"
    }
  ];

  return (
        <main className="min-h-screen">
      <div style={{ zoom: '0.80' }}>

      {/* Om oss Section */}
      <section className="relative overflow-hidden py-8">
        {/* Background image absolutely positioned */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/efter_flytt.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 100%',
            zIndex: 0,
          }}
        />
        {/* Overlay absolutely positioned, full width */}
        <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
        
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none"
             style={{
               background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'
             }}
        />
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none"
             style={{
               background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'
             }}
        />
        
        {/* Centered content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Om oss
            </h2>
          </div>
          <div className="text-[#0F172A] text-lg leading-tight font-bold max-w-4xl mx-auto">
            <p className="mb-8">
              Flyttella är en flytt- och städfirma med bas i Stockholm som grundades med målet att göra flyttar och städtjänster enklare, tryggare och mer transparenta. Vi har funnits i 5 år som företag, men har över 8 års erfarenhet i branschen – något som återspeglas i vårt arbetssätt, vår kvalitet och våra nöjda kunder. Hittills har vi haft nöjet att hjälpa över 8000 kunder, både privatpersoner och företag, med allt från små flyttar till helhetslösningar med städning, packning och rådgivning.
            </p>
            
            {/* Image after first paragraph */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-full h-64 rounded-3xl overflow-hidden">
                <img 
                  src="/intro_picture.jpg" 
                  alt="Flyttella team" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <p className="mb-8">
              Det som gör oss unika är vårt fokus på tydliga villkor och fasta priser – hos oss vet du alltid vad som ingår och vad det kostar. Vi erbjuder gratis lån av flyttkartonger, kostnadsfri om- och avbokning upp till 24 timmar innan, samt en generös 14 dagars garanti på alla flyttstädningar. För dig som även bokar packhjälp erbjuder vi packgaranti, vilket innebär att vi tar fullt ansvar för det vi packar.
            </p>
            
            {/* Image after second paragraph */}
            <div className="my-6 flex justify-center">
              <img 
                src="/recommendedcompany2.png" 
                alt="Recommended company badge" 
                className="w-64 h-auto rounded-lg"
              />
            </div>
            
            <br />
            <p className="mb-8">
              Vi vet att tid ofta är en bristvara vid flytt, därför har vi utvecklat en smidig offertlösning där du får svar inom 1 minut – helt utan förpliktelser. Bakom allt detta står vår kompetenta och personliga kundtjänst, som alltid finns tillgänglig för att svara på frågor, ge tips och hjälpa dig fatta rätt beslut. Självklart erbjuder vi fri rådgivning i samband med både flytt och städning – allt för att din upplevelse med oss ska kännas enkel och trygg från början till slut.
            </p>
            
            {/* Image after third paragraph */}
            <div className="my-6 flex justify-center">
              <div className="relative w-full h-64 rounded-3xl overflow-hidden">
                <img 
                  src="/specialicering.jpg" 
                  alt="Specialization" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <p className="mb-8">
              Vi på Flyttella tror på att bygga långsiktiga relationer genom att leverera hög kvalitet, punktlighet och lyhörd service. Vår filosofi är enkel: ingen kund ska känna sig osäker, stressad eller överraskad av dolda kostnader. Därför har vi tagit fram tjänster och arbetsmetoder som är transparenta, kundvänliga och anpassade efter verkliga behov.
            </p>
            <p className="mb-8">
              Oavsett om du ska flytta inom Stockholm eller behöver städhjälp efter en renovering eller försäljning, kan du lita på att vi tar hand om det med samma noggrannhet och engagemang varje gång. Vi är stolta över det rykte vi har byggt upp – ett rykte som vilar på förtroende, god kommunikation och ett genuint engagemang för varje kunds unika situation.
            </p>
            
            {/* Image after fifth paragraph */}
            <div className="mt-6 flex justify-center">
              <img 
                src="/flyttella-logo.png" 
                alt="Flyttella logo" 
                className="w-64 h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proud of our reviews section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 text-center mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Vi är stolta över våra kundomdömen</h2>
          <p className="text-lg text-gray-700 -mb-2">Vi arbetar hårt för att varje kund ska bli nöjd – och det syns i våra recensioner. Läs vad våra kunder tycker om oss!</p>
        </div>
        <ReviewsWidget hideTitle={true} />
      </section>

      {/* Picture Slider Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Se vårt team i arbete
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ta en titt på våra professionella medarbetare och se hur vi arbetar för att göra din flytt så smidig som möjligt.
            </p>
          </div>
          <PictureSlider 
            images={companyImages}
            autoPlay={true}
            interval={6000}
            showNavigation={true}
            showDots={true}
          />
        </div>
      </section>

      {/* Rest of Content */}
      <div className="container mx-auto px-4 py-16">

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Professionalism */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Professionalism
            </h2>
            <ul className="space-y-3">
              {[
                "Erfaren personal",
                "Kvalificerad utbildning",
                "Modern utrustning",
                "Effektiva processer",
                "Punktlighet",
                "Transparens",
                "Kvalitetskontroll",
                "Kontinuerlig utveckling"
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

          {/* Quality */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Kvalitet
            </h2>
            <ul className="space-y-3">
              {[
                "Höga standarder",
                "Grundliga processer",
                "Kvalitetskontroll",
                "Kundnöjdhet",
                "Miljöhänsyn",
                "Säkerhet",
                "Ansvarsförsäkring",
                "Garantier"
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

          {/* Customer Focus */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Kundfokus
            </h2>
            <ul className="space-y-3">
              {[
                "Personlig service",
                "Flexibla lösningar",
                "Transparent kommunikation",
                "Snabb respons",
                "Anpassade erbjudanden",
                "Kundvård",
                "Uppföljning",
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

        {/* Team Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Vårt team
          </h2>
          <p className="text-white/90 mb-6">
            Våra medarbetare är hjärtat i vår verksamhet. Vi investerar i kontinuerlig utbildning 
            och utveckling för att säkerställa att vi alltid levererar den bästa möjliga servicen.
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Erfarna flyttare",
              "Utbildade städare",
              "Certifierade specialister",
              "Serviceinriktade medarbetare",
              "Kvalitetsansvariga",
              "Kundservice-team"
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
            Låt oss hjälpa dig med din flytt
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi är redo att hjälpa dig med din flytt eller städning. Kontakta oss för en 
            kostnadsfri offert och personlig rådgivning.
          </p>
          <Link 
            href="/fa-offert" 
            className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Få offert
          </Link>
        </div>
      </div>
    </div>
    </main>
  );
} 