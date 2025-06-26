'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqData = {
    "Vanliga frågor – Flytt": [
      {
        id: "flytt-1",
        question: "Hur mycket kostar en flytt?",
        answer: "Våra priser baseras på faktorer som boyta, våning, hiss och parkeringsavstånd. Vi erbjuder både fasta priser och löpande priser. Fyll i vårt formulär för en snabb offert på 1 minut."
      },
      {
        id: "flytt-2",
        question: "Hur lång tid tar en flytt?",
        answer: "Tiden varierar beroende på storleken på flytten. En vanlig lägenhetsflytt tar vanligtvis 2-4 timmar, medan en villa kan ta 4-8 timmar. Vi ger dig en mer exakt tidsuppskattning när vi ser din specifika situation."
      },
      {
        id: "flytt-3",
        question: "Vad ingår i en vanlig bohagsflytt?",
        answer: "Transport, bärhjälp, lastning och lossning. Vi kan även erbjuda packning, montering och flyttstäd som tillval."
      },
      {
        id: "flytt-4",
        question: "Hur bokar jag en flytt?",
        answer: "Du kan boka en flytt genom att fylla i vårt formulär på hemsidan då får du svar inom 1 minut. Du kan även ringa oss på 08-898-301, eller skicka ett mail. Vi kommer att kontakta dig samma dag eller dagen efter för att bekräfta bokningen."
      },
      {
        id: "flytt-6",
        question: "Kan ni hjälpa med packning?",
        answer: "Ja, vi erbjuder komplett packservice där vi packar allt åt dig. Vi har erfarenhet av att packa känsliga föremål och säkerställer att allt packas säkert för transport."
      },
      {
        id: "flytt-7",
        question: "Kan jag låna flyttkartonger?",
        answer: "Ja, vi erbjuder fritt lån av specialgjorda flyttkartonger med vår logga i upp till 4 veckor. Detta ingår i vårt servicepaket."
      },
      {
        id: "flytt-8",
        question: "Hanterar ni piano och tunga föremål?",
        answer: "Ja, vi har specialiserad service för flytt av piano och andra tunga föremål. Vår personal är utbildad och har rätt utrustning för säker hantering av känsliga föremål."
      },
      {
        id: "flytt-9",
        question: "Ingår försäkring i flytten?",
        answer: "Ja, vi har transportförsäkring som skyddar dina saker under flytten."
      },
      {
        id: "flytt-10",
        question: "Flyttar ni även på helger och kvällar?",
        answer: "Ja, vi erbjuder flytt sju dagar i veckan, även kvällstid."
      },
      {
        id: "flytt-11",
        question: "Flyttar ni till/från andra städer eller utomlands?",
        answer: "Ja, vi erbjuder både lokala och långdistansflyttar – även internationellt vid behov."
      },
      {
        id: "flytt-12",
        question: "Vad händer om jag behöver omboka?",
        answer: "Du kan omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten. Vi förstår att saker kan hända och gör det enkelt för dig att ändra din bokning."
      }
    ],
    "Vanliga frågor – Städning": [
      {
        id: "stadning-1",
        question: "Erbjuder ni flyttstädning?",
        answer: "Ja, vi erbjuder professionell flyttstädning som uppfyller alla krav. Vi har utfört över 7000 städningar och ger 14 dagars nöjd kund garanti på vår städservice."
      },
      {
        id: "stadning-2",
        question: "Vad ingår i en flyttstädning?",
        answer: "Vår flyttstädning inkluderar grundlig rengöring av alla ytor, kök, badrum, toaletter, fönster, dörrar och golv. Vi följer alla krav för flyttstädning och garanterar att din gamla bostad lämnas i perfekt skick."
      },
      {
        id: "stadning-3",
        question: "Gäller RUT-avdrag för flyttstädning?",
        answer: "Ja, flyttstädning är RUT-avdragsgillt. Vi hanterar allt pappersarbete för RUT-avdrag så du endast betalar för 50% av arbetskostnaden."
      },
      {
        id: "stadning-4",
        question: "Vad ingår i flyttstädningen enligt Mäklarsamfundet?",
        answer: "Vi följer Mäklarsamfundets riktlinjer: noggrann rengöring av hela bostaden inkl. ugn, kyl, badrum och fönsterputs."
      },
      {
        id: "stadning-5",
        question: "Vad kostar flyttstädning?",
        answer: "Priset beror på bostadens storlek och skick, men vi erbjuder fasta priser med RUT-avdrag."
      },
      {
        id: "stadning-6",
        question: "Måste bostaden vara tom inför städningen?",
        answer: "Ja, för att kunna städa effektivt behöver bostaden vara tömd."
      },
      {
        id: "stadning-7",
        question: "Ingår fönsterputs i flyttstädning?",
        answer: "Ja, invändig och utvändig fönsterputs ingår om fönstren går att öppna inifrån."
      },
      {
        id: "stadning-8",
        question: "Tar ni bort klistermärken, fläckar på väggar eller nikotinrengöring?",
        answer: "Nej, sådana tjänster ingår inte men kan erbjudas som tillägg om det nämns vid bokning."
      },
      {
        id: "stadning-9",
        question: "Hur fungerar RUT-avdraget?",
        answer: "Vi gör avdraget direkt på fakturan om du är berättigad. Du betalar bara 50 % av arbetskostnaden."
      }
    ],
    "Allmänt": [
      {
        id: "allmant-1",
        question: "Är ni försäkrade?",
        answer: "Ja, vi har alla nödvändiga tillstånd, skattesedel och försäkringar på plats. Vi arbetar med Trygg Hansa och FORA för att säkerställa att du är skyddad under hela flytten."
      },
      {
        id: "allmant-2",
        question: "Vilka områden betjänar ni?",
        answer: "Vi betjänar hela Stockholmsområdet och omnejd, inklusive alla stadsdelar i Stockholm samt närliggande kommuner som Älvsjö, Årsta, Nacka, Huddinge och många fler. Kontakta oss för att bekräfta om vi betjänar ditt område."
      },
      {
        id: "allmant-3",
        question: "Kan jag boka både flytt och städ samtidigt?",
        answer: "Absolut! Det är smidigt och ofta förmånligare att boka som paket."
      },
      {
        id: "allmant-4",
        question: "Vad händer om något går sönder?",
        answer: "Vi följer konsumenttjänstlagen och har försäkring. Skador anmäls till oss inom skälig tid."
      },
      {
        id: "allmant-5",
        question: "Hur betalar jag?",
        answer: "Swisha till 123-44-62-248, ange offertnummer i meddelandet. För företag erbjuder vi även faktura."
      },
      {
        id: "allmant-6",
        question: "Vad är era avbokningsvillkor?",
        answer: "Avbokning måste ske minst 24 timmar innan uppdraget. Kortare än så kan debiteras med en avgift."
      }
    ]
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section styled like the start page */}
      <section className="relative py-20 bg-white text-[#0F172A] overflow-hidden">
        <div className="mx-auto px-24">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: 'url(/intro_picture.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
              }}
            />
            <div className="flex flex-col items-center justify-center gap-8 relative z-10">
              <div className="w-full max-w-2xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Vanliga frågor</h1>
                <p className="text-xl text-white/90 mb-8">
                  Här hittar du svar på de vanligaste frågorna om våra flyttjänster. 
                  Kan du inte hitta det du letar efter? Kontakta oss så hjälper vi dig!
                </p>
                <div className="flex justify-center space-x-4">
                  {/* Removed Få offert button */}
                  <Link 
                    href="/kontakt" 
                    className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium"
                  >
                    Kontakta oss
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with light background */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {Object.entries(faqData).map(([category, questions], categoryIndex) => (
            <div key={category} className="bg-white/95 rounded-2xl p-8 md:p-12 mb-10">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6 text-center"
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
                  className="bg-white rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <svg
                        className="w-6 h-6 text-[#10B981]"
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
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ))}

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                Har du fler frågor?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Vi finns här för att hjälpa dig! Kontakta oss så svarar vi på alla dina frågor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/kontakt" 
                  className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                >
                  Kontakta oss
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
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