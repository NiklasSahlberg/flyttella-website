'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: "Hur mycket kostar en flytt?",
      answer: "Våra priser baseras på faktorer som boyta, våning, hiss och parkeringsavstånd. Vi erbjuder både fasta priser och löpande priser. Fyll i vårt formulär för en snabb offert på 1 minut."
    },
    {
      question: "Hur lång tid tar en flytt?",
      answer: "Tiden varierar beroende på storleken på flytten. En vanlig lägenhetsflytt tar vanligtvis 2-4 timmar, medan en villa kan ta 4-8 timmar. Vi ger dig en mer exakt tidsuppskattning när vi ser din specifika situation."
    },
    {
      question: "Erbjuder ni flyttstädning?",
      answer: "Ja, vi erbjuder professionell flyttstädning som uppfyller alla krav. Vi har utfört över 7000 städningar och ger 14 dagars nöjd kund garanti på vår städservice."
    },
    {
      question: "Kan jag låna flyttkartonger?",
      answer: "Ja, vi erbjuder fritt lån av specialgjorda flyttkartonger med vår logga i upp till 4 veckor. Detta ingår i vårt servicepaket."
    },
    {
      question: "Vad händer om jag behöver omboka?",
      answer: "Du kan omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten. Vi förstår att saker kan hända och gör det enkelt för dig att ändra din bokning."
    },
    {
      question: "Är ni försäkrade?",
      answer: "Ja, vi har alla nödvändiga tillstånd, skattesedel och försäkringar på plats. Vi arbetar med Trygg Hansa och FORA för att säkerställa att du är skyddad under hela flytten."
    },
    {
      question: "Hanterar ni piano och tunga föremål?",
      answer: "Ja, vi har specialiserad service för flytt av piano och andra tunga föremål. Vår personal är utbildad och har rätt utrustning för säker hantering av känsliga föremål."
    },
    {
      question: "Gäller RUT-avdrag för flyttstädning?",
      answer: "Ja, flyttstädning är RUT-avdragsgillt. Vi hanterar allt pappersarbete för RUT-avdrag så du får 50% av kostnaden tillbaka via skatten."
    },
    {
      question: "Vilka områden betjänar ni?",
      answer: "Vi betjänar hela Stockholmsområdet och omnejd, inklusive alla stadsdelar i Stockholm samt närliggande kommuner som Älvsjö, Årsta, Nacka, Huddinge och många fler. Kontakta oss för att bekräfta om vi betjänar ditt område."
    },
    {
      question: "Kan ni hjälpa med packning?",
      answer: "Ja, vi erbjuder komplett packservice där vi packar allt åt dig. Vi har erfarenhet av att packa känsliga föremål och säkerställer att allt packas säkert för transport."
    },
    {
      question: "Vad ingår i en flyttstädning?",
      answer: "Vår flyttstädning inkluderar grundlig rengöring av alla ytor, kök, badrum, toaletter, fönster, dörrar och golv. Vi följer alla krav för flyttstädning och garanterar att din gamla bostad lämnas i perfekt skick."
    },
    {
      question: "Hur bokar jag en flytt?",
      answer: "Du kan boka en flytt genom att fylla i vårt formulär på hemsidan, ringa oss på 08-898-301, eller skicka ett mail. Vi kommer att kontakta dig samma dag eller dagen efter för att bekräfta bokningen."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Vanliga frågor</h1>
            <p className="text-xl text-white/90 mb-8">
              Här hittar du svar på de vanligaste frågorna om våra flyttjänster. 
              Kan du inte hitta det du letar efter? Kontakta oss så hjälper vi dig!
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/fa-offert" 
                className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium"
              >
                Få offert
              </Link>
              <Link 
                href="/kontakt" 
                className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium"
              >
                Kontakta oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
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
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0
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
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
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
                <Link 
                  href="/fa-offert" 
                  className="inline-flex items-center border-2 border-[#10B981] text-[#10B981] px-8 py-4 rounded-full hover:bg-[#10B981] hover:text-white transition-all font-medium group"
                >
                  Få offert
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