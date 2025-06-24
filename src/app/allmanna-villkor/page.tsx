'use client';

import Link from "next/link";

export default function AllmannaVillkorPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Allmänna villkor</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Våra villkor för flytt- och städtjänster
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
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Villkor Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
              Villkor
            </h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">1. Allmänt</h3>
                <p className="text-lg mb-4">
                  Dessa villkor gäller för alla flytt- och städtjänster som levereras av Flyttella. 
                  Genom att anlita våra tjänster accepterar kunden dessa villkor.
                </p>
                <p className="text-lg">
                  Flyttella förbehåller sig rätten att när som helst ändra dessa villkor. 
                  Eventuella ändringar kommer att meddelas kunden i förväg.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">2. Bokning och avbokning</h3>
                <ul className="space-y-3 text-lg">
                  <li>• Bokning sker genom muntligt eller skriftligt avtal</li>
                  <li>• Avbokning måste ske minst 24 timmar innan planerad start</li>
                  <li>• Vid senare avbokning kan avgift debiteras</li>
                  <li>• Flyttella förbehåller sig rätten att avboka vid force majeure</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">3. Priser och betalning</h3>
                <ul className="space-y-3 text-lg">
                  <li>• Alla priser anges exklusive moms</li>
                  <li>• Betalning sker enligt avtalad faktura</li>
                  <li>• Vid försenad betalning debiteras dröjsmålsränta</li>
                  <li>• Extra kostnader förkommer vid avvikelser från ursprunglig offert</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">4. Ansvarsförsäkring</h3>
                <p className="text-lg mb-4">
                  Flyttella har fullständig ansvarsförsäkring som täcker skador på kundens egendom 
                  under flytt- eller städarbetet.
                </p>
                <p className="text-lg">
                  Vid skada måste detta anmälas omedelbart och skriftligt inom 24 timmar.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">5. Kvalitet och garantier</h3>
                <ul className="space-y-3 text-lg">
                  <li>• Vi garanterar professionell service enligt branschstandard</li>
                  <li>• Vid missnöje åtgärdas problem inom rimlig tid</li>
                  <li>• Kundens tillfredsställelse är vår högsta prioritet</li>
                  <li>• Vi följer alla relevanta säkerhets- och kvalitetsstandarder</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">6. Force majeure</h3>
                <p className="text-lg">
                  Flyttella ansvarar inte för förseningar eller avbokningar som beror på 
                  omständigheter utanför vårt kontroll, såsom extrema väderförhållanden, 
                  strejker eller andra oförutsägbara händelser.
                </p>
              </div>
            </div>
          </div>

          {/* Villkor för underleverantör Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
              Villkor för underleverantör
            </h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">1. Underleverantörsavtal</h3>
                <p className="text-lg mb-4">
                  Flyttella samarbetar med utvalda underleverantörer för att säkerställa 
                  hög kvalitet och tillgänglighet av våra tjänster.
                </p>
                <p className="text-lg">
                  Alla underleverantörer måste godkännas av Flyttella och följa våra 
                  kvalitetsstandarder och säkerhetskrav.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">2. Kvalitetskrav</h3>
                <ul className="space-y-3 text-lg">
                  <li>• Underleverantörer måste ha relevanta certifikat och tillstånd</li>
                  <li>• Personal ska vara utbildad och erfaren</li>
                  <li>• Utrustning ska vara modern och väl underhållen</li>
                  <li>• Säkerhetsstandarder ska följas strikt</li>
                  <li>• Kundservice ska vara professionell och hjälpsam</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">3. Ansvarsfördelning</h3>
                <ul className="space-y-3 text-lg">
                  <li>• Flyttella ansvarar för kundkontakt och koordinering</li>
                  <li>• Underleverantör ansvarar för utförande av arbetet</li>
                  <li>• Gemensamt ansvar för kvalitet och säkerhet</li>
                  <li>• Kundens rättigheter skyddas enligt konsumentlagstiftning</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">4. Försäkringar</h3>
                <p className="text-lg mb-4">
                  Underleverantörer måste ha tillräcklig försäkringstäckning för att 
                  skydda både sig själva och kunden.
                </p>
                <ul className="space-y-3 text-lg">
                  <li>• Ansvarsförsäkring för skador på egendom</li>
                  <li>• Personskadeförsäkring för personal</li>
                  <li>• Fordringsgaranti för ekonomisk säkerhet</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">5. Kontroll och uppföljning</h3>
                <ul className="space-y-3 text-lg">
                  <li>• Regelbunden kvalitetskontroll av underleverantörer</li>
                  <li>• Kundfeedback används för kontinuerlig förbättring</li>
                  <li>• Uppföljning av säkerhets- och kvalitetsstandarder</li>
                  <li>• Möjlighet att avsluta samarbete vid bristande kvalitet</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">6. Konfidentialitet</h3>
                <p className="text-lg">
                  Underleverantörer måste respektera kundens integritet och konfidentialitet. 
                  Ingen information om kunden eller deras egendom får delas med tredje part 
                  utan uttryckligt tillstånd.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Har du frågor om våra villkor?
            </h2>
            <p className="text-white/90 mb-6">
              Vi är här för att hjälpa dig. Kontakta oss för mer information eller 
              för att diskutera dina specifika behov.
            </p>
            <Link 
              href="/kontakt" 
              className="inline-block bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 