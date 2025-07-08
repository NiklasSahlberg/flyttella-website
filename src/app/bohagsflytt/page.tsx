'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import FlyttoffertForm from '../components/FlyttoffertForm'
import ReviewsWidget from '../components/ReviewsWidget'
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Lottie animation functions
function FillFormLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
    fetch("/fillform.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return (
    <div className="w-14 h-14 mx-auto mb-2">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

function FastLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
    fetch("/fast.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return (
    <div className="w-14 h-14 mx-auto mb-2">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

function PhoneCallLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
    fetch("/phonecall.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return (
    <div className="w-20 h-20 mx-auto mb-2">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

function SignFormLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
    fetch("/signform.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return (
    <div className="w-20 h-20 mx-auto mb-2">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

function MovingTruckLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
    fetch("/movingtruck.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return (
    <div className="w-36 h-36 mx-auto mb-2">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

function HappyCustomerLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
    fetch("/happycustomer.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return (
    <div className="w-24 h-24 flex items-center justify-center -m-2">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

const features = [
  {
    title: 'packing',
    icon: '📦'
  },
  {
    title: 'transport',
    icon: '🚛'
  },
  {
    title: 'materials',
    icon: '🛡️'
  },
  {
    title: 'assembly',
    icon: '🔧'
  }
]

export default function Bohagsflytt() {
  const { t } = useLanguage();

  const [openFAQBohag, setOpenFAQBohag] = useState<string | null>(null);
  const toggleFAQBohag = (id: string) => {
    setOpenFAQBohag(openFAQBohag === id ? null : id);
  };

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section - Matching start page design */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          <div className="mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/coupleMoving.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    {t('bohagsflytt.hero.title')}
                  </h1>
                  <p className="text-2xl md:text-3xl mb-12">
                    {t('bohagsflytt.hero.subtitle')}
                  </p>
                  <p className="text-lg text-white/90">
                    {t('bohagsflytt.hero.description')}
                  </p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <FlyttoffertForm mode="widget" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is Bohagsflytt Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <motion.div 
                  className="space-y-16"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {/* Main content sections */}
                  {([
                    {
                      title: "Vad är en bohagsflytt?",
                      content: "En bohagsflytt innebär att flytta hela eller delar av ett hushålls tillhörigheter från en bostad till en annan. Det omfattar allt från planering, packning och transport till uppackning och eventuell magasinering. En professionell bohagsflytt gör processen trygg, smidig och säker – oavsett om du flyttar inom samma stad eller till en ny ort.",
                      icon: '🏠',
                    },
                    {
                      title: '',
                      content: (
                        <div className="w-full max-w-4xl mx-auto flex justify-center my-12">
                          <img src="/magkansla.jpg" alt="Magkänsla" className="w-full h-64 md:h-80 rounded-lg shadow-lg object-cover" />
                        </div>
                      ),
                      icon: '',
                    },
                    {
                      title: "Vad kostar en bohagsflytt?",
                      content: (
                        <>
                          <p className="text-gray-700 leading-relaxed text-lg md:text-xl mb-8">
                            Priset på en bohagsflytt varierar beroende på faktorer som mängden bohag, avståndet mellan adresserna, våningsplan, tillgång till hiss och eventuella tilläggstjänster som packning eller magasinering. En normal flytt inom samma stad kan kosta från cirka 1 700 kr och uppåt. För att få ett exakt pris rekommenderar vi att du begär en kostnadsfri offert anpassad efter dina behov.
                          </p>
                          <div className="my-16 text-center">
                            <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                              "Allt gick smidigt och tryggt från första kontakt tills allt var på plats. Rekommenderar Flyttella varmt till alla som vill ha en bekymmersfri flytt!"
                            </p>
                            <p className="italic text-gray-700 mt-2">- Erika</p>
                          </div>
                        </>
                      ),
                      icon: '💸',
                    },
                    {
                      title: "Vad är bohagsflytt 2010?",
                      content: 'Bohagsflytt 2010 syftar på de regler och riktlinjer som fastställts i "Bohag 2010" – ett avtal framtaget av Sveriges Åkeriföretag och Svenska Möbeltransportörers Förbund. Avtalet reglerar ansvaret mellan flyttföretag och kund vid bohagsflytt, och säkerställer att flytten sker på ett tryggt och professionellt sätt. Det omfattar bland annat försäkringar, hantering av bohag, reklamationer och betalningsvillkor. När du anlitar en flyttfirma som följer Bohag 2010 kan du känna dig extra trygg under hela flyttprocessen.',
                      icon: '📜',
                    },
                    {
                      title: "Flyttkartonger",
                      content: 'Flyttkartonger är en viktig del av en smidig och säker bohagsflytt. Med rätt kartonger blir packningen enklare och dina saker skyddas bättre under transporten. Vi erbjuder stabila och rymliga flyttkartonger som är anpassade för olika typer av föremål – från böcker och porslin till kläder och elektronik. Hos oss kan du låna flyttkartonger kostnadsfritt i upp till 4 veckor när du bokar din flytt, vilket gör hela processen både enklare och mer kostnadseffektiv.',
                      icon: '📦',
                    },
                    {
                      title: "Boka flytthjälp i god tid",
                      content: "För en smidig och stressfri flytt är det viktigt att boka flytthjälp i god tid. Vi rekommenderar att du bokar minst 2-3 veckor i förväg för att säkerställa tillgänglighet och få den flyttdag som passar dig bäst. Vi erbjuder flexibla bokningsmöjligheter och kan anpassa oss efter dina behov. Boka redan idag för att säkerställa en professionell och pålitlig flyttservice.",
                      icon: '📅',
                    },
                    {
                      title: "Checklista vid flytt",
                      content: (
                        <div>
                          <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Boka flyttfirma i god tid:</strong> Säkerställ att du får det datum som passar dig bäst.</li>
                            <li><strong>Rensa och sortera:</strong> Gå igenom dina saker och släng, sälj eller skänk det du inte behöver.</li>
                            <li><strong>Beställ flyttkartonger:</strong> Låna eller köp tillräckligt med kartonger och packmaterial.</li>
                            <li><strong>Packa smart:</strong> Märk kartonger med innehåll och rum. Packa tunga saker i små kartonger och lätta saker i stora. Vi erbjuder också packhjälp som ett tillval - kontakta oss för mer information.</li>
                            <li><strong>Adressändra och meddela viktiga kontakter:</strong> Anmäl flytt till Skatteverket, försäkringsbolag, bank, elbolag och andra leverantörer.</li>
                            <li><strong>Boka flyttstädning:</strong> Se till att bostaden är ordentligt städad inför överlämning.</li>
                            <li><strong>Töm och frosta av frysen:</strong> Gör detta minst en dag innan flytten.</li>
                            <li><strong>Plocka ner gardiner, lampor och hyllor:</strong> Förbered så mycket som möjligt innan flyttdagen.</li>
                            <li><strong>Packa en "första natten-låda":</strong> Lägg i det viktigaste: kläder, hygienartiklar, laddare och viktiga papper.</li>
                            <li><strong>Dubbelkolla allt på flyttdagen:</strong> Kontrollera att inget är kvar, att alla fönster och dörrar är låsta och att nycklar lämnas enligt överenskommelse.</li>
                          </ul>
                        </div>
                      ),
                      icon: '✅',
                    },
                  ] as { title: string; content: any; icon: string; image?: string }[]).map((section, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      variants={fadeInUp}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {(index === 0 || index === 1) ? (
                        <div>
                          <div className="max-w-4xl mx-auto">
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 group-hover:text-[#10B981] transition-colors duration-300">
                              {section.title}
                            </h3>
                            {typeof section.content === 'string' ? (
                              <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </p>
                            ) : (
                              <div className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : section.image ? (
                        // Special layout for sections with image
                        <div className="flex flex-col lg:flex-row items-start gap-12">
                          {/* Content on the left */}
                          <div className="w-full lg:w-1/2 flex flex-col justify-end min-h-[600px]">
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 group-hover:text-[#10B981] transition-colors duration-300">
                              {section.title}
                            </h3>
                            {typeof section.content === 'string' ? (
                              <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </p>
                            ) : (
                              <div className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </div>
                            )}
                          </div>
                          {/* Image on the right */}
                          {section.image && (
                            <div className="w-full lg:w-1/2">
                              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
                                <img
                                  src={section.image}
                                  alt={section.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : section.title === "Boka flytthjälp i god tid" ? (
                        // Special layout for Boka flytthjälp i god tid with image above title
                        <div>
                          <div className="max-w-4xl mx-auto">
                            <img 
                              src="/godtid.jpg" 
                              alt="Boka flytthjälp i god tid" 
                              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mb-6"
                            />
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 group-hover:text-[#10B981] transition-colors duration-300">
                              {section.title}
                            </h3>
                            {typeof section.content === 'string' ? (
                              <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </p>
                            ) : (
                              <div className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        // Regular centered layout for other sections
                        <div>
                          <div className="max-w-4xl mx-auto">
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 group-hover:text-[#10B981] transition-colors duration-300">
                              {section.title}
                            </h3>
                            {typeof section.content === 'string' ? (
                              <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </p>
                            ) : (
                              <div className="text-gray-700 leading-relaxed text-lg md:text-xl">
                                {section.content}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}



                 
                </motion.div>
              </div>
              
              {/* Sidebar (desktop only) */}
              <aside className="hidden lg:flex flex-col gap-20 w-full max-w-xs shrink-0 ml-12">
                {/* Montering Card */}
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Montering</h3>
                  <p className="text-gray-600 mb-4">Säker montering och demontering av möbler och vitvaror.</p>
                  <Link href="/montering" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om montering</Link>
                </div>
                {/* Piano Flytt Card */}
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🎹</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Tunglyft</h3>
                  <p className="text-gray-600 mb-4">Specialiserad flytt och lyft av tunga och otympliga föremål som piano, kassaskåp och maskiner.</p>
                  <Link href="/piano-tunglyft" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om tunglyft</Link>
                </div>
                {/* Bärhjälp Card */}
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">💪</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Bärhjälp</h3>
                  <p className="text-gray-600 mb-4">Extra hjälp vid flytt för tunga och stora föremål.</p>
                  <Link href="/barhjalp" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om bärhjälp</Link>
                </div>
                {/* Bortforsling Card */}
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🗑️</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Bortforsling</h3>
                  <p className="text-gray-600 mb-4">Professionell bortforsling av möbler och bohag som inte längre behövs.</p>
                  <Link href="/bortforsling" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om bortforsling</Link>
                </div>
              </aside>
            </div>
            {/* Sidebar for mobile, shown just above 'Våra tjänster' */}
            <div className="block lg:hidden mt-12">
              <div className="flex flex-col gap-8">
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Montering</h3>
                  <p className="text-gray-600 mb-4">Säker montering och demontering av möbler och vitvaror.</p>
                  <Link href="/montering" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om montering</Link>
                </div>
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🎹</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Tunglyft</h3>
                  <p className="text-gray-600 mb-4">Specialiserad flytt och lyft av tunga och otympliga föremål som piano, kassaskåp och maskiner.</p>
                  <Link href="/piano-tunglyft" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om tunglyft</Link>
                </div>
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">💪</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Bärhjälp</h3>
                  <p className="text-gray-600 mb-4">Extra hjälp vid flytt för tunga och stora föremål.</p>
                  <Link href="/barhjalp" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om bärhjälp</Link>
                </div>
                <div className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🗑️</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Bortforsling</h3>
                  <p className="text-gray-600 mb-4">Professionell bortforsling av möbler och bohag som inte längre behövs.</p>
                  <Link href="/bortforsling" className="inline-block bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F172A] transition-colors">Läs mer om bortforsling</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Om Flyttella Section */}
        <motion.section
          className="relative overflow-hidden"
          style={{
            paddingTop: '8rem',
            paddingBottom: '8rem',
            borderTop: 'none',
            boxShadow: 'none',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
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
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none"
               style={{
                 background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
               }}
          />
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 w-full h-32 z-30 pointer-events-none"
               style={{
                 background: 'linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
               }}
          />
          
          {/* Centered content */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:mr-60">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center lg:mr-60">Om Flyttella</h3>
              
              {/* Image and text layout */}
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                {/* Left: Image - positioned outside container */}
                <motion.div
                  className="w-full lg:w-1/5 relative lg:-ml-16 lg:pr-16"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.2
                  }}
                >
                  <div className="relative h-96 lg:h-full w-[200%] lg:-ml-[100%] overflow-hidden rounded-2xl">
                    <img
                      src="/omoss.jpg"
                      alt="Om Flyttella"
                      className="object-cover rounded-2xl w-full h-full"
                      style={{ objectPosition: 'center 25%', transform: 'scale(1.20)' }}
                    />
                  </div>
                </motion.div>
                
                {/* Right: Text content */}
                <motion.div
                  className="w-full lg:w-4/5 space-y-8 flex flex-col justify-center"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4
                  }}
                >
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    Flyttella är en flytt- och städfirma med bas i Stockholm som grundades med målet att göra flyttar och städtjänster enklare, tryggare och mer transparenta. Vi har funnits i 5 år som företag, men har över 8 års erfarenhet i branschen – något som återspeglas i vårt arbetssätt, vår kvalitet och våra nöjda kunder.
                  </p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    Hittills har vi haft nöjet att hjälpa över 8000 kunder, både privatpersoner och företag, med allt från små flyttar till helhetslösningar med städning, packning och rådgivning. Det som gör oss unika är vårt fokus på tydliga villkor och fasta priser – hos oss vet du alltid vad som ingår och vad det kostar.
                  </p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    Vi erbjuder gratis lån av flyttkartonger, kostnadsfri om- och avbokning upp till 24 timmar innan, samt en generös 14 dagars garanti på alla flyttstädningar. Bakom allt detta står vår kompetenta och personliga kundtjänst, som alltid finns tillgänglig för att svara på frågor, ge tips och hjälpa dig fatta rätt beslut.
                  </p>
                  
                  {/* Läs mer om oss link */}
                  <motion.div
                    className="pt-6"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.6
                    }}
                  >
                    <Link 
                      href="/om-oss" 
                      className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
                    >
                      Läs mer om oss
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
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Service Cards Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                Våra andra huvudtjänster
              </h2>
              <div className="grid grid-cols-1 gap-12">
              {/* Flyttstädning Card */}
              <motion.div
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-12 shadow-lg text-white flex flex-col min-h-[340px] h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Background pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  initial={{ backgroundPosition: '0% 0%' }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
                <div className="flex items-center gap-4 mb-8 relative">
                  <span className="text-6xl">✨</span>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Flyttstädning
                  </h3>
                </div>
                <p className="text-xl text-gray-100 mb-8 relative">
                  Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick.
                </p>
                <p className="text-lg text-gray-100 mb-8 relative">
                  Flyttella erbjuder professionell flyttstädning med 14 dagars nöjd kund-garanti. Vi rengör alla boytor, putsar fönster på alla sidor och använder kvalitativa rengöringsmedel. Städutrustning ingår, inklusive leverans och upphämtning. Vi dammtorkar väggar och tak, rengör golvbrunnar och bakom vitvaror (om du drar fram dem). Frysen rengörs om den är avfrostad dagen innan. Med oss får du en komplett flyttstädning för en trygg och smidig överlämning.
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/flyttstadning" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-lg"
                    >
                      Läs mer
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Magasinering Card */}
              <motion.div
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-12 shadow-lg text-white flex flex-col min-h-[340px] h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Background pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  initial={{ backgroundPosition: '0% 0%' }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
                <div className="flex items-center gap-4 mb-8 relative">
                  <span className="text-6xl">🏢</span>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Magasinering
                  </h3>
                </div>
                <p className="text-xl text-gray-100 mb-8 relative">
                  Säker magasinering av dina tillhörigheter. Vi erbjuder flexibla lösningar för kortare och längre lagring med säker hantering.
                </p>
                <p className="text-lg text-gray-100 mb-8 relative">
                  Behöver du magasinera bohag under flyttprocessen? Flyttella tillhandahåller säkra och pålitliga magasineringslösningar för dina tillhörigheter. Vi erbjuder flexibla alternativ som passar dina behov och tidsplan. Som extra service erbjuder vi den första månaden gratis för att göra din flyttprocess ännu smidigare.
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/magasinering" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-lg"
                    >
                      Läs mer
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Packhjälp Card */}
              <motion.div
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-12 shadow-lg text-white flex flex-col min-h-[340px] h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Background pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  initial={{ backgroundPosition: '0% 0%' }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
                <div className="flex items-center gap-4 mb-8 relative">
                  <span className="text-6xl">📦</span>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Packhjälp
                  </h3>
                </div>
                <p className="text-xl text-gray-100 mb-8 relative">
                  Professionell packhjälp för en stressfri flytt. Vi hjälper dig packa dina tillhörigheter säkert och organiserat.
                </p>
                <p className="text-lg text-gray-100 mb-8 relative">
                  Packning är ofta den mest tidskrävande delen av en flytt. Flyttella erbjuder professionell packhjälp där våra erfarna flyttare hjälper dig packa dina tillhörigheter på ett säkert och organiserat sätt. Vi använder kvalitativa packmaterial och säkerställer att allt packas korrekt för transport. Vår packhjälp inkluderar även märkning av kartonger och skapande av en inventarielista för enkel uppackning på den nya adressen.
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/barhjalp" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-lg"
                    >
                      Läs mer
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad tycker våra kunder om oss */}
        <ReviewsWidget />

        {/* Våra förmåner */}
        {/* Responsive zoom wrapper for wide screens */}
        <div className="responsive-zoom">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  {/* Left side - Features content */}
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">Våra förmåner</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {[
                        {
                          icon: "💰",
                          title: "Fast pris",
                          description: "Inga överraskningar - vi erbjuder både fasta priser och möjlighet till löpande priser",
                          link: "/priser"
                        },
                        {
                          icon: "📋",
                          title: "RUT-avdrag",
                          description: "Vi hanterar allt pappersarbete för RUT-avdrag",
                          link: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html"
                        },
                        {
                          icon: "📦",
                          title: "Fritt lån av kartonger i 4 veckor",
                          description: "Specialgjorda flyttkartonger med vår logga",
                          link: "/kartonger"
                        },
                        {
                          icon: "⏰",
                          title: "Omboka eller avboka kostnadsfritt",
                          description: "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten",
                          link: "/avbokning"
                        },
                        {
                          icon: "✅",
                          title: "Nöjd kund garanti",
                          description: "14 dagars garanti på flyttstädning",
                          link: "/garanti"
                        },
                        {
                          icon: "🔒",
                          title: "Trafiktillstånd och försäkring",
                          description: "Alla nödvändiga tillstånd och försäkringar på plats",
                          link: "/tillstand"
                        },
                        {
                          icon: "🎓",
                          title: "Utbildad personal",
                          description: "Vår personal är utbildad för att säkerställa högsta kvalitet och service.",
                          link: "/om-oss"
                        },
                        {
                          icon: "📈",
                          title: "Ledningssystem",
                          description: "Vi arbetar med effektiva ledningssystem för att garantera struktur och kvalitet.",
                          link: "/om-oss"
                        },
                        {
                          icon: "🦺",
                          title: "Arbetsmiljö",
                          description: "Vi prioriterar en trygg och säker arbetsmiljö för både kunder och personal.",
                          link: "/om-oss"
                        }
                      ].map((feature, i) => (
                        <motion.div
                          key={feature.icon}
                          className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full"
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.2 }}
                          variants={fadeInUp}
                          custom={i}
                        >
                          <motion.span
                            className="text-2xl md:text-3xl"
                            initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }}
                            animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [ -180, 20, 0 ], color: ['#10B981', '#34D399', '#10B981'] }}
                            transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}
                          >
                            {feature.icon}
                          </motion.span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                            <a 
                              href={feature.link}
                              target={feature.link.startsWith('http') ? '_blank' : undefined}
                              rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center"
                            >
                              Läs mer
                              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch">
                      <img
                        src="/smiling_worker_new.png"
                        alt="Glad flyttarbetare"
                        className="rounded-xl shadow-lg object-cover w-full h-full"
                        style={{ objectPosition: '30% 80%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vår erfarenhet */}
        <motion.section
          className="relative overflow-hidden"
          style={{
            paddingTop: '18rem',
            paddingBottom: '6rem',
            marginTop: '2rem',
            borderTop: 'none',
            boxShadow: 'none',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background image absolutely positioned */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/backgroundpicture.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 100%',
              zIndex: 0,
            }}
          />
          {/* Overlay absolutely positioned, full width */}
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none"
               style={{
                 background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
               }}
          />
          
          {/* Centered content only */}
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Flyttar */}
                <motion.div 
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0 * 0.25 }}
                >
                  {/* Background pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                      Flyttar
                    </motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                      8000+
                    </motion.div>
                    <motion.p className="text-white/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                      Genomförda flyttar
                    </motion.p>
                  </div>
                </motion.div>

                {/* Städningar */}
                <motion.div 
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 1 * 0.25 }}
                >
                  {/* Background pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                      Städningar
                    </motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                      7000+
                    </motion.div>
                    <motion.p className="text-white/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                      Genomförda städningar
                    </motion.p>
                  </div>
                </motion.div>

                {/* Månadsvis */}
                <motion.div 
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 2 * 0.25 }}
                >
                  {/* Background pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                      Månadsvis
                    </motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                      500+
                    </motion.div>
                    <motion.p className="text-white/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                      Nöjda kunder
                    </motion.p>
                  </div>
                </motion.div>
              </div>

              {/* Experience description text and badges side by side */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                {/* Experience description text - left side */}
                <motion.div 
                  className="flex-1 max-w-4xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                    Lokal erfarenhet i Stockholm
                  </h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    Vi har hjälpt tusentals kunder med deras flyttar i Stockholm och omnejd. Vår lokala kunskap och erfarenhet säkerställer att vi kan hantera alla typer av flyttar, från små lägenheter till stora villor.
                  </p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6">
                    Med vår erfarenhet sedan 2010 har vi byggt upp en solid reputation för kvalitet, pålitlighet och kundnöjdhet. Vi förstår de lokala förutsättningarna och kan erbjuda skräddarsydda lösningar för alla behov.
                  </p>
                </motion.div>

                {/* Recommended Company and 1000 Reviews badges under text */}
                <div className="flex items-center justify-center gap-6">
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <img
                      src="/recommendedcompany2.png"
                      alt="Rekommenderad flyttfirma - Flyttella"
                      className="object-contain h-56 w-56"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <img
                      src="/1000reviewspicture.png"
                      alt="1000+ positiva recensioner från kunder"
                      className="object-contain h-64 w-64"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <img
                      src="/top10.png"
                      alt="Top 10 flyttfirma - Flyttella"
                      className="object-contain h-48 w-48"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom gradient fade - enhanced to completely hide container lines */}
          <div className="absolute bottom-0 left-0 w-full h-48 z-30 pointer-events-none"
               style={{
                 background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)'
               }}
          />
        </motion.section>

        {/* Features Section */}
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Våra tjänster</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Vi erbjuder ett komplett utbud av flyttjänster för att göra din flytt så smidig som möjligt. Från bohagsflytt och flyttstädning till specialtjänster som piano- och magasinering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">
                  Se alla våra privattjänster
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/foretag" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">
                  Se alla våra företagstjänster
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-10 mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  {t('bohagsflytt.process.title')}
                </h2>

                {/* Process Description */}
                <div className="text-center mb-8">
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-6 leading-relaxed">
                    {t('bohagsflytt.process.description')}
                  </p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-8">
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-4">
                    {t('bohagsflytt.process.pricing')}
                  </p>
                </div>

                {/* Process Flow Section */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{t('bohagsflytt.process.subtitle')}</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 w-full">
                      {[
                        {
                          icon: <FillFormLottie />,
                          title: t('bohagsflytt.process.steps.0.title'),
                          description: t('bohagsflytt.process.steps.0.description'),
                          textClass: ""
                        },
                        {
                          icon: <FastLottie />,
                          title: t('bohagsflytt.process.steps.1.title'),
                          description: t('bohagsflytt.process.steps.1.description'),
                          textClass: ""
                        },
                        {
                          icon: <div className="ml-3 mt-8"><PhoneCallLottie /></div>,
                          title: t('bohagsflytt.process.steps.2.title'),
                          description: t('bohagsflytt.process.steps.2.description'),
                          containerClass: "-mt-7",
                          textClass: ""
                        },
                        {
                          icon: <div className="ml-6 -mt-0"><SignFormLottie /></div>,
                          title: t('bohagsflytt.process.steps.3.title'),
                          description: t('bohagsflytt.process.steps.3.description'),
                          containerClass: "-mt-6",
                          textClass: ""
                        },
                        {
                          icon: <div className="mr-3"><MovingTruckLottie /></div>,
                          title: t('bohagsflytt.process.steps.4.title'),
                          description: t('bohagsflytt.process.steps.4.description'),
                          containerClass: "-mt-14",
                          textClass: "-mt-8",
                        },
                        {
                          icon: <div className="mt-0"><HappyCustomerLottie /></div>,
                          title: t('bohagsflytt.process.steps.5.title'),
                          description: t('bohagsflytt.process.steps.5.description'),
                          containerClass: "-mt-6",
                          textClass: ""
                        }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 h-full"
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.2 }}
                          variants={fadeInUp}
                          custom={index}
                        >
                          {/* Timeline dot */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#10B981] rounded-full hidden md:block"></div>
                          <div className={`${step.containerClass || ''} w-full flex flex-col items-center justify-center`}>
                            <div className="mb-2">{step.icon}</div>
                            <div className={`flex flex-col items-center justify-center w-full ${step.textClass || ''}`}>
                              <h4 className="text-white font-semibold text-base md:text-lg mb-1 text-center w-full">{step.title}</h4>
                              <p className="text-white/80 text-sm md:text-base text-center w-full">{step.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* White gradient fade to blend into next section */}
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20}} />
        </section>



        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white">
          <div className="container mx-auto px-4 text-center">
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Redo att börja din flytt?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Få en snabb och gratis offert på din bohagsflytt
              </p>
                  <Link 
                    href="/kontakt" 
                className="inline-block bg-white text-[#0F172A] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                Få gratis offert
          </Link>
            </motion.div>
        </div>
        </section>

        {/* Blog Post Section (copied from start page) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                  Läs mer om flytt i Stockholm
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Få värdefulla tips och råd för en smidig flytt
                </p>
              </div>
              <motion.div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src="/tipsforflytt.jpg" 
                      alt="Flytttips Stockholm" 
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Flytttips
                      </span>
                      <span className="text-gray-500 text-sm ml-4">5 min läsning</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
                      Vad bör du tänka på när du väljer en seriös flyttfirma
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Att välja rätt flyttfirma är avgörande för en smidig flytt. I denna guide går vi igenom de viktigaste faktorerna du bör tänka på - från försäkringar och tillstånd till kundrecensioner och pristransparens. Lär dig hur du identifierar en seriös flyttfirma som levererar kvalitet och trygghet.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">FE</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-[#0F172A]">Flyttella Expert</p>
                          <p className="text-sm text-gray-500">Flyttspecialist i Stockholm</p>
                        </div>
                      </div>
                      <Link 
                        href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma" 
                        className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group"
                      >
                        Läs hela artikeln
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
                    <div className="text-center">
                      <Link 
                        href="/blogg" 
                        className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium group shadow-lg hover:shadow-xl"
                      >
                        Se alla artiklar om flytt
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
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section: Vanliga frågor om bohagsflytt */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Vad är en bohagsflytt?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'En bohagsflytt innebär att flytta hela eller delar av ett hushålls tillhörigheter från en bostad till en annan, ofta med hjälp av en professionell flyttfirma.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Hur lång tid tar en bohagsflytt?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Tiden beror på mängden bohag, avståndet mellan adresserna och eventuella tilläggstjänster. En normal flytt inom samma stad tar oftast 1-2 dagar.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Vad kostar en bohagsflytt?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Priset varierar beroende på mängd, avstånd, våningsplan och tillval. Begär en offert för ett exakt pris.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Kan jag få hjälp med packning?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Ja, vi erbjuder packhjälp som tillval. Vi packar dina saker säkert och effektivt.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Ingår flyttkartonger?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Ja, du kan låna flyttkartonger kostnadsfritt när du bokar din flytt med oss.'
                }
              }
            ]
          })}} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                Vanliga frågor om bohagsflytt
              </h2>
              <div className="space-y-4">
                {[
                  {
                    id: "bohag-1",
                    question: "Hur förbereder jag mig bäst inför en bohagsflytt?",
                    answer: "Börja med att rensa ut sådant du inte längre behöver och sortera dina tillhörigheter. Packa i god tid och märk alla kartonger tydligt med innehåll och vilket rum de ska till. Informera viktiga instanser om din adressändring och boka flyttfirma i god tid, särskilt om du flyttar under högsäsong. Se även till att boka hiss och parkering om det behövs."
                  },
                  {
                    id: "bohag-2",
                    question: "Vad ingår vanligtvis i en bohagsflytt med flyttfirma?",
                    answer: "En bohagsflytt med flyttfirma inkluderar oftast bärhjälp, lastning, transport och lossning av dina tillhörigheter. Många firmor erbjuder även tilläggstjänster som packning, montering, magasinering och flyttstädning. Kontrollera alltid vad som ingår i offerten och vilka tjänster som kan läggas till för att anpassa flytten efter dina behov."
                  },
                  {
                    id: "bohag-3",
                    question: "Hur fungerar försäkring vid bohagsflytt?",
                    answer: "De flesta seriösa flyttfirmor har en ansvarsförsäkring som täcker eventuella skador som kan uppstå under flytten. Det är dock viktigt att du själv har en hemförsäkring som gäller under flyttdagen. Läs igenom villkoren noga och fråga din flyttfirma om vad som gäller om något skulle gå sönder eller försvinna."
                  },
                  {
                    id: "bohag-4",
                    question: "Hur lång tid tar en bohagsflytt och vad påverkar tidsåtgången?",
                    answer: "Tidsåtgången beror på flera faktorer: mängden bohag, avståndet mellan adresserna, tillgång till hiss, våningsplan, och om du valt till tjänster som packning eller montering. En normal bohagsflytt inom samma stad tar oftast en dag, men större eller mer komplexa flyttar kan ta längre tid."
                  },
                  {
                    id: "bohag-5",
                    question: "Kan jag boka flyttkartonger och packmaterial via er?",
                    answer: "Ja, vi erbjuder uthyrning och försäljning av flyttkartonger och packmaterial. När du bokar din flytt med oss kan du låna flyttkartonger kostnadsfritt under en viss period. Vi har även specialkartonger för exempelvis glas, porslin och kläder för att skydda dina saker på bästa sätt."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => toggleFAQBohag(faq.id)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFAQBohag === faq.id ? 180 : 0 }}
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
                        height: openFAQBohag === faq.id ? "auto" : 0,
                        opacity: openFAQBohag === faq.id ? 1 : 0
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
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 