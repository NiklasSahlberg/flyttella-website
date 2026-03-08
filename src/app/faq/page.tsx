'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function FAQPage() {
  const { locale } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqData = {
    [locale === 'sv' ? "Vanliga frågor – Flytt" : "Frequently Asked Questions – Moving"]: [
      {
        id: "flytt-1",
        question: locale === 'sv' ? "Hur mycket kostar en flytt?" : "How much does a move cost?",
        answer: locale === 'sv' ? "Våra priser baseras på faktorer som boyta, våning, hiss och parkeringsavstånd. Vi erbjuder både fasta priser och löpande priser. Fyll i vårt formulär för en snabb offert på 1 minut." : "Our prices are based on factors such as living area, floor, elevator and parking distance. We offer both fixed prices and ongoing prices. Fill in our form for a quick quote in 1 minute."
      },
      {
        id: "flytt-2",
        question: locale === 'sv' ? "Hur lång tid tar en flytt?" : "How long does a move take?",
        answer: locale === 'sv' ? "Tiden för en flytt kan variera mycket och beror bland annat på bostadens storlek, hur mycket som ska flyttas, samt avståndet mellan adresserna. Mindre flyttar går ofta snabbare, medan större bostäder eller längre transporter kan ta längre tid. Vi kan alltid ge en mer anpassad uppskattning när vi vet mer om just er flytt." : "The time for a move can vary greatly and depends on factors such as the size of the home, how much needs to be moved, and the distance between addresses. Smaller moves often go faster, while larger homes or longer transports can take longer. We can always give a more tailored estimate when we know more about your specific move."
      },
      {
        id: "flytt-3",
        question: locale === 'sv' ? "Vad ingår i en vanlig bohagsflytt?" : "What is included in a regular household move?",
        answer: locale === 'sv' ? "Transport, bärhjälp, lastning och lossning. Vi kan även erbjuda packning, montering och flyttstäd som tillval." : "Transport, carrying help, loading and unloading. We can also offer packing, assembly and moving cleaning as options."
      },
      {
        id: "flytt-4",
        question: locale === 'sv' ? "Hur bokar jag en flytt?" : "How do I book a move?",
        answer: locale === 'sv' ? "Du kan boka en flytt genom att fylla i vårt formulär på hemsidan då får du svar inom 1 minut. Du kan även ringa oss på 08-898-301, eller skicka ett mail. Vi kommer att kontakta dig samma dag eller dagen efter för att bekräfta bokningen." : "You can book a move by filling in our form on the website and you will get an answer within 1 minute. You can also call us at 08-898-301, or send an email. We will contact you the same day or the day after to confirm the booking."
      },
      {
        id: "flytt-6",
        question: locale === 'sv' ? "Kan ni hjälpa med packning?" : "Can you help with packing?",
        answer: locale === 'sv' ? "Ja, vi erbjuder komplett packservice där vi packar allt åt dig. Vi har erfarenhet av att packa känsliga föremål och säkerställer att allt packas säkert för transport." : "Yes, we offer complete packing service where we pack everything for you. We have experience packing sensitive items and ensure everything is packed safely for transport."
      },
      {
        id: "flytt-7",
        question: locale === 'sv' ? "Kan jag låna flyttkartonger?" : "Can I borrow moving boxes?",
        answer: locale === 'sv' ? "Ja, vi erbjuder kostnadsfritt lån av flyttkartonger i upp till 4 veckor inom Stockholm. Om ni hämtar kartongerna själva från vårt kontor är det helt gratis." : "Yes, we offer free loan of moving boxes for up to 4 weeks within Stockholm. If you pick up the boxes yourself from our office, it is completely free."
      },
      {
        id: "flytt-8",
        question: locale === 'sv' ? "Hanterar ni piano och tunga föremål?" : "Do you handle pianos and heavy items?",
        answer: locale === 'sv' ? "Ja, vi har specialiserad service för flytt av piano och andra tunga föremål (över 100kg). Vår personal är utbildad och har rätt utrustning för säker hantering av tunga föremål." : "Yes, we have specialized service for moving pianos and other heavy items (over 100kg). Our staff is trained and has the right equipment for safe handling of heavy items."
      },
      {
        id: "flytt-9",
        question: locale === 'sv' ? "Ingår försäkring i flytten?" : "Is insurance included in the move?",
        answer: locale === 'sv' ? "Ja, vi har transportförsäkring som skyddar dina saker under flytten." : "Yes, we have transport insurance that protects your belongings during the move."
      },
      {
        id: "flytt-10",
        question: locale === 'sv' ? "Flyttar ni även på helger och kvällar?" : "Do you also move on weekends and evenings?",
        answer: locale === 'sv' ? "Ja, vi erbjuder flytt sju dagar i veckan, även kvällstid." : "Yes, we offer moving seven days a week, including evening hours."
      },
      {
        id: "flytt-11",
        question: locale === 'sv' ? "Flyttar ni till/från andra städer eller utomlands?" : "Do you move to/from other cities or abroad?",
        answer: locale === 'sv' ? "Ja, vi erbjuder både lokala och långdistansflyttar – även internationellt vid behov." : "Yes, we offer both local and long-distance moves – also internationally when needed."
      },
      {
        id: "flytt-12",
        question: locale === 'sv' ? "Vad händer om jag behöver omboka?" : "What happens if I need to reschedule?",
        answer: locale === 'sv' ? "Du kan omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten. Vi förstår att saker kan hända och gör det enkelt för dig att ändra din bokning." : "You can reschedule or cancel for free up to 24 hours before the move. We understand that things can happen and make it easy for you to change your booking."
      }
    ],
    [locale === 'sv' ? "Vanliga frågor – Utlandsflytt" : "Frequently Asked Questions – International Moving"]: [
      {
        id: "utland-1",
        question: locale === 'sv' ? "Vilka dokument behöver jag för utlandsflytt?" : "What documents do I need for international moving?",
        answer: locale === 'sv' ? "Det varierar mellan länder, men vanligtvis behövs inventarielista (på engelska), kopia på pass, eventuella visum/uppehållstillstånd och försäkringsbrev." : "It varies between countries, but usually an inventory list (in English), passport copy, any visas/residence permits and insurance certificates are needed."
      },
      {
        id: "utland-2",
        question: locale === 'sv' ? "Hur fungerar tull och införselregler?" : "How do customs and import rules work?",
        answer: locale === 'sv' ? "Tullregler skiljer sig åt per land. Personligt bohag för eget bruk är oftast tullfritt men måste förtullas korrekt." : "Customs rules differ per country. Personal belongings for own use are usually duty-free but must be declared correctly."
      },
      {
        id: "utland-3",
        question: locale === 'sv' ? "Är mina saker försäkrade under transporten?" : "Are my belongings insured during transport?",
        answer: locale === 'sv' ? "Ja, vi erbjuder transportförsäkring för internationella uppdrag. Vi rekommenderar även att du kontrollerar din hemförsäkring. Tillsammans säkerställer vi rätt skydd för ditt bohag under hela resan." : "Yes, we offer transport insurance for international assignments. We also recommend that you check your home insurance. Together we ensure the right protection for your belongings throughout the journey."
      },
      {
        id: "utland-4",
        question: locale === 'sv' ? "Hur lång tid tar en utlandsflytt?" : "How long does an international move take?",
        answer: locale === 'sv' ? "Leveranstid beror på sträcka, rutt, säsong och eventuella tullprocesser. Inom Norden/EU kan det ta från några dagar till ett par veckor. Vi ger alltid en tidsram i offerten." : "Delivery time depends on distance, route, season and any customs processes. Within the Nordics/EU it can take from a few days to a couple of weeks. We always give a timeframe in the quote."
      },
      {
        id: "utland-5",
        question: locale === 'sv' ? "Kan ni hjälpa till med packning och exportemballering?" : "Can you help with packing and export packaging?",
        answer: locale === 'sv' ? "Ja, vi erbjuder professionell packning, exportemballering och specialskydd för känsliga föremål. Vi kan även hjälpa till med demontering/montering och uppackning på destinationen." : "Yes, we offer professional packing, export packaging and special protection for sensitive items. We can also help with disassembly/assembly and unpacking at the destination."
      },
      {
        id: "utland-6",
        question: locale === 'sv' ? "Vad får jag inte ta med mig?" : "What can't I bring with me?",
        answer: locale === 'sv' ? "Farligt gods (t.ex. gas, brandfarliga vätskor), färskvaror samt vissa växt- och djurprodukter kan vara förbjudna. Reglerna skiljer sig per land." : "Dangerous goods (e.g. gas, flammable liquids), fresh goods and certain plant and animal products may be prohibited. The rules differ per country."
      },
      {
        id: "utland-7",
        question: locale === 'sv' ? "Hur prissätts en utlandsflytt?" : "How is an international move priced?",
        answer: locale === 'sv' ? "Priset baseras på volym/vikt, avstånd, tillgänglighet, tullhantering och tilläggstjänster som packning och magasinering. Begär en offert så återkommer vi med ett tydligt fast pris eller uppskattning." : "The price is based on volume/weight, distance, accessibility, customs handling and additional services such as packing and storage. Request a quote and we will come back with a clear fixed price or estimate."
      },
      {
        id: "utland-8",
        question: locale === 'sv' ? "Kan ni hjälpa till med magasinering före/efter flytten?" : "Can you help with storage before/after the move?",
        answer: locale === 'sv' ? "Ja, vi erbjuder säker magasinering kort- eller långsiktigt både inför avresa och vid ankomst. Vi kan samordna hämtning/leverans enligt din tidsplan." : "Yes, we offer secure storage short or long term both before departure and upon arrival. We can coordinate pickup/delivery according to your schedule."
      }
    ],
    [locale === 'sv' ? "Vanliga frågor – Städning" : "Frequently Asked Questions – Cleaning"]: [
      {
        id: "stadning-1",
        question: locale === 'sv' ? "Erbjuder ni flyttstädning?" : "Do you offer moving cleaning?",
        answer: locale === 'sv' ? "Ja, vi erbjuder professionell flyttstädning som uppfyller alla krav. Vi har utfört över 7000 städningar och ger 14 dagars nöjd kund garanti på vår städservice." : "Yes, we offer professional moving cleaning that meets all requirements. We have performed over 7000 cleanings and give a 14-day satisfied customer guarantee on our cleaning service."
      },
      {
        id: "stadning-2",
        question: locale === 'sv' ? "Vad ingår i en flyttstädning?" : "What is included in a moving cleaning?",
        answer: locale === 'sv' ? "Vår flyttstädning inkluderar grundlig rengöring av alla ytor, kök, badrum, toaletter, fönster, dörrar och golv. Vi följer alla krav för flyttstädning och garanterar att din gamla bostad lämnas i perfekt skick." : "Our moving cleaning includes thorough cleaning of all surfaces, kitchen, bathroom, toilets, windows, doors and floors. We follow all requirements for moving cleaning and guarantee that your old home is left in perfect condition."
      },
      {
        id: "stadning-3",
        question: locale === 'sv' ? "Gäller RUT-avdrag för flyttstädning?" : "Does RUT deduction apply to moving cleaning?",
        answer: locale === 'sv' ? "Ja, flyttstädning är RUT-avdragsgillt. Vi hanterar allt pappersarbete för RUT-avdrag så du endast betalar för 50% av arbetskostnaden." : "Yes, moving cleaning is RUT deductible. We handle all paperwork for RUT deduction so you only pay 50% of the labor cost."
      },
      {
        id: "stadning-4",
        question: locale === 'sv' ? "Vad ingår i flyttstädningen enligt Mäklarsamfundet?" : "What is included in moving cleaning according to the Real Estate Agents Association?",
        answer: locale === 'sv' ? "Vi följer Mäklarsamfundets riktlinjer: noggrann rengöring av hela bostaden inkl. ugn, kyl, badrum och fönsterputs." : "We follow the Real Estate Agents Association guidelines: thorough cleaning of the entire home including oven, refrigerator, bathroom and window cleaning."
      },
      {
        id: "stadning-5",
        question: locale === 'sv' ? "Vad kostar flyttstädning?" : "What does moving cleaning cost?",
        answer: locale === 'sv' ? "Priset beror på bostadens storlek och skick, men vi erbjuder fasta priser med RUT-avdrag." : "The price depends on the size and condition of the home, but we offer fixed prices with RUT deduction."
      },
      {
        id: "stadning-6",
        question: locale === 'sv' ? "Måste bostaden vara tom inför städningen?" : "Must the home be empty before cleaning?",
        answer: locale === 'sv' ? "Ja, för bästa resultat behöver bostaden vara helt tömd. Om den inte är det – till exempel när flyttstädningen beställs av en andra part – så städar vi de ytor vi kommer åt. Observera dock att resultatet blir bäst när bostaden är helt tom." : "Yes, for best results the home needs to be completely emptied. If it is not – for example when the moving cleaning is ordered by a third party – we clean the surfaces we can reach. Note however that the result is best when the home is completely empty."
      },
      {
        id: "stadning-7",
        question: locale === 'sv' ? "Ingår fönsterputs i flyttstädning?" : "Is window cleaning included in moving cleaning?",
        answer: locale === 'sv' ? "Ja, invändig och utvändig fönsterputs ingår om fönstren går att öppna inifrån." : "Yes, internal and external window cleaning is included if the windows can be opened from inside."
      },
      {
        id: "stadning-8",
        question: locale === 'sv' ? "Tar ni bort klistermärken, fläckar på väggar eller nikotinrengöring?" : "Do you remove stickers, wall stains or nicotine cleaning?",
        answer: locale === 'sv' ? "Nej, sådana tjänster ingår inte men kan erbjudas som tillägg om det nämns vid bokning." : "No, such services are not included but can be offered as an add-on if mentioned at booking."
      },
      {
        id: "stadning-9",
        question: locale === 'sv' ? "Hur fungerar RUT-avdraget?" : "How does the RUT deduction work?",
        answer: locale === 'sv' ? "Vi gör avdraget direkt på fakturan om du är berättigad. Du betalar bara 50 % av arbetskostnaden." : "We make the deduction directly on the invoice if you are entitled. You only pay 50% of the labor cost."
      }
    ],
    [locale === 'sv' ? "Allmänt" : "General"]: [
      {
        id: "allmant-1",
        question: locale === 'sv' ? "Är ni försäkrade?" : "Are you insured?",
        answer: locale === 'sv' ? "Ja, vi har alla nödvändiga tillstånd, skattesedel och försäkringar på plats. Vi arbetar med Trygg Hansa och FORA för att säkerställa att du är skyddad under hela flytten." : "Yes, we have all necessary permits, tax certificate and insurance in place. We work with Trygg Hansa and FORA to ensure you are protected throughout the move."
      },
      {
        id: "allmant-2",
        question: locale === 'sv' ? "Vilka områden betjänar ni?" : "What areas do you serve?",
        answer: locale === 'sv' ? "Vi betjänar hela Stockholmsområdet och omnejd, inklusive alla stadsdelar i Stockholm samt närliggande kommuner som Älvsjö, Årsta, Nacka, Huddinge och många fler. Kontakta oss för att bekräfta om vi betjänar ditt område." : "We serve the entire Stockholm area and surrounding areas, including all districts in Stockholm and nearby municipalities such as Älvsjö, Årsta, Nacka, Huddinge and many more. Contact us to confirm if we serve your area."
      },
      {
        id: "allmant-3",
        question: locale === 'sv' ? "Kan jag boka både flytt och städ samtidigt?" : "Can I book both moving and cleaning at the same time?",
        answer: locale === 'sv' ? "Absolut! Det är smidigt och ofta förmånligare att boka som paket." : "Absolutely! It's convenient and often more advantageous to book as a package."
      },
      {
        id: "allmant-4",
        question: locale === 'sv' ? "Vad händer om något går sönder?" : "What happens if something breaks?",
        answer: locale === 'sv' ? "Vi följer konsumenttjänstlagen och har försäkring. Skador anmäls till oss inom skälig tid." : "We follow the Consumer Services Act and have insurance. Damage is reported to us within reasonable time."
      },
      {
        id: "allmant-5",
        question: locale === 'sv' ? "Hur betalar jag?" : "How do I pay?",
        answer: locale === 'sv' ? "Swisha till 123-44-62-248, ange offertnummer i meddelandet. För företag erbjuder vi även faktura." : "Swish to 123-44-62-248, enter quote number in the message. For companies we also offer invoicing."
      },
      {
        id: "allmant-6",
        question: locale === 'sv' ? "Vad är era avbokningsvillkor?" : "What are your cancellation terms?",
        answer: locale === 'sv' ? "Avbokning måste ske minst 24 timmar innan uppdraget. Kortare än så kan debiteras med en avgift." : "Cancellation must be made at least 24 hours before the assignment. Shorter than that may be charged a fee."
      }
    ]
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section styled like the start page */}
      <section className="relative pt-0 pb-12 md:pt-0 md:pb-20 bg-white text-[#0F172A] overflow-hidden">
        <div className="mx-auto px-0 md:px-24">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-none md:rounded-2xl p-6 md:p-8 lg:p-12 relative overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: 'url(/intro_picture.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
              }}
            />
            <div className="flex flex-col items-center justify-center gap-6 md:gap-8 relative z-10">
              <div className="w-full max-w-2xl mx-auto text-center px-4 md:px-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">{locale === 'sv' ? 'Vanliga frågor' : 'Frequently Asked Questions'}</h1>
                <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
                  {locale === 'sv' ? 'Här hittar du svar på de vanligaste frågorna om våra flyttjänster. Kan du inte hitta det du letar efter? Kontakta oss så hjälper vi dig!' : 'Here you will find answers to the most common questions about our moving services. Can\'t find what you\'re looking for? Contact us and we\'ll help you!'}
                </p>
                <div className="flex justify-center">
                  <Link 
                    href="/kontakt" 
                    className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium text-sm md:text-base"
                  >
                    {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with light background */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {Object.entries(faqData).map(([category, questions], categoryIndex) => (
            <div key={category} className="bg-white/95 rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12 mb-6 md:mb-10">
              <motion.h2 
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-4 md:mb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                {category}
              </motion.h2>
              {questions.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="bg-white rounded-lg md:rounded-xl overflow-hidden mb-2 md:mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-4 md:px-6 py-4 md:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-[#0F172A] pr-3 md:pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-[#10B981]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFAQ === faq.id ? "auto" : 0,
                      opacity: openFAQ === faq.id ? 1 : 0
                    }}
                    transition={{
                      height: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.2, ease: "easeInOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ))}

          <motion.div 
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3 md:mb-4">
                {locale === 'sv' ? 'Har du fler frågor?' : 'Do you have more questions?'}
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                {locale === 'sv' ? 'Vi finns här för att hjälpa dig! Kontakta oss så svarar vi på alla dina frågor.' : 'We are here to help you! Contact us and we will answer all your questions.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link 
                  href="/kontakt" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:opacity-90 transition-opacity font-medium group text-sm md:text-base"
                >
                  {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 