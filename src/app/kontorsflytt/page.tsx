'use client';

import Image from "next/image";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import FlyttoffertForm from '../components/FlyttoffertForm'
import ReviewsWidget from '../components/ReviewsWidget'
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import CountUp from "react-countup";
import LocationsCard from '../components/LocationsCard';

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

// Animation variants
const variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
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
    title: 'planning',
    icon: '📋'
  },
  {
    title: 'transport',
    icon: '🚛'
  },
  {
    title: 'equipment',
    icon: '💻'
  },
  {
    title: 'assembly',
    icon: '🔧'
  }
]

export default function KontorsflyttPage() {
  const { t } = useLanguage();

  const [openFAQKontor, setOpenFAQKontor] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [expandedTipSection, setExpandedTipSection] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [showFullExperienceText, setShowFullExperienceText] = useState(false);
  const toggleFAQKontor = (id: string) => {
    setOpenFAQKontor(openFAQKontor === id ? null : id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const experienceCards = [
    { title: 'Kontorsflyttar', count: '1200+', description: 'Genomförda kontorsflytt', delay: 0 },
    { title: 'Bohagsflyttar', count: '8000+', description: 'Genomförda bohagsflyttar', delay: 1 },
    { title: 'Kontorsstädningar', count: '2000+', description: 'Genomförda kontorsstädningar', delay: 2 },
  ];

  const locations = [
    { name: "Åkersberga", slug: "akersberga" },
    { name: "Älvsjö", slug: "alvsjo" },
    { name: "Årsta", slug: "arsta" },
    { name: "Botkyrka", slug: "botkyrka" },
    { name: "Bro", slug: "bro" },
    { name: "Bromma", slug: "bromma" },
    { name: "Danderyd", slug: "danderyd" },
    { name: "Ekerö", slug: "ekero" },
    { name: "Enskede", slug: "enskede" },
    { name: "Farsta", slug: "farsta" },
    { name: "Hägersten", slug: "hagersten" },
    { name: "Haninge", slug: "haninge" },
    { name: "Huddinge", slug: "huddinge" },
    { name: "Järfälla", slug: "jarfalla" },
    { name: "Kista", slug: "kista" },
    { name: "Kungsängen", slug: "kungsangen" },
    { name: "Kungsholmen", slug: "kungsholmen" },
    { name: "Lidingö", slug: "lidingo" },
    { name: "Märsta", slug: "marsta" },
    { name: "Nacka", slug: "nacka" },
    { name: "Norrmalm", slug: "norrmalm" },
    { name: "Nynäshamn", slug: "nynashamn" },
    { name: "Östermalm", slug: "ostermalm" },
    { name: "Salem", slug: "salem" },
    { name: "Skärholmen", slug: "skarholmen" },
    { name: "Södermalm", slug: "sodermalm" },
    { name: "Södertalje", slug: "sodertalje" },
    { name: "Sollentuna", slug: "sollentuna" },
    { name: "Solna", slug: "solna" },
    { name: "Spånga", slug: "spanga" },
    { name: "Sundbyberg", slug: "sundbyberg" },
    { name: "Täby", slug: "taby" },
    { name: "Tumba", slug: "tumba" },
    { name: "Tyresö", slug: "tyreso" },
    { name: "Upplands Väsby", slug: "upplands-vasby" },
    { name: "Vallentuna", slug: "vallentuna" },
    { name: "Varmdo", slug: "varmdo" },
    { name: "Vasastan", slug: "vasastan" },
    { name: "Västerhaninge", slug: "vasterhaninge" }
  ];

  return (
    <main id="top" className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section - Matching bohagsflytt design */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          {/* Mobile: Form only */}
          <div className="md:hidden mx-auto px-4 pb-8">
            <FlyttoffertForm mode="widget" defaultCustomerType="foretag" />
          </div>
          
          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/office-moving.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    Professionell kontorsflytt i Stockholm
                  </h1>
                  <p className="text-2xl md:text-3xl mb-12">
                    Smidig företagsflytt med minimal störning
                  </p>
                  <p className="text-lg text-white/90">
                    Vi erbjuder kompletta lösningar för kontorsflytt – från planering till installation. Säker hantering av IT-utrustning och minimal störning av er verksamhet.
                  </p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <FlyttoffertForm mode="widget" defaultCustomerType="foretag" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is Kontorsflytt Section */}
        <section className="py-0 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              {/* Sidebar service cards (desktop) */}
              <div className="hidden lg:block absolute -right-72 top-[1385px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🏠</span><h3 className="text-xl font-bold text-white">Bohagsflytt</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Professionell bohagsflytt för privatpersoner – trygg och smidig flytt.</p>
                    <div className="mt-auto relative">
                      <Link href="/bohagsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 top-[1620px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🎹</span><h3 className="text-xl font-bold text-white">Piano & Tunglyft</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Specialiserad flytt av piano, kassaskåp och andra tunga föremål.</p>
                    <div className="mt-auto relative">
                      <Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 top-[1880px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🌍</span><h3 className="text-xl font-bold text-white">Utlandsflytt</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Internationell flytt med expertis inom tullformaliteter och logistik.</p>
                    <div className="mt-auto relative">
                      <Link href="/utlandsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reco Widget - Positioned absolutely to the right (desktop) */}
              <div className="hidden lg:block absolute -right-72 top-[20rem] w-72 z-40">
                <div className="sticky top-8">
                  <iframe src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5" className="w-full h-[1000px] border-0" title="Flyttella recensioner" />
                </div>
              </div>

              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {/* Main content sections */}
                {([
                  {
                    title: 'Vad är kontorsflytt?',
                    content:
                      'Kontorsflytt är professionell flytt av företag och organisationer, antingen inom samma byggnad eller till helt nya lokaler. Vi hanterar allt från planering och koordinering till säker transport av IT-utrustning, möbler och känsliga dokument. Med vår expertis inom företagsflytt säkerställer vi minimal störning av er verksamhet och en smidig övergång till de nya lokalerna. Vårt team förstår vikten av kontinuitet i affärsverksamheten och arbetar därför med detaljerad planering och flexibla lösningar. Vi erbjuder allt från mindre internflytt till stora kontorsetableringar med hundratals arbetsplatser. Allt för att er kontorsflytt i Stockholm ska bli trygg, effektiv och professionell.',
                    icon: '🏢',
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/godtid.jpg" alt="Kontorsflytt Stockholm" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Vad kostar en kontorsflytt?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">Priset för kontorsflytt beror på flera faktorer: storlek på kontoret, mängd utrustning, avstånd och komplexitet. Vi arbetar med löpande priser utan dolda kostnader och erbjuder kostnadsfri offert.</p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            &quot;Vi är väldigt nöjda med vår kontorsflytt med Flyttella! Rekommenderas starkt!&quot;
                          </p>
                          <p className="italic text-gray-700 mt-2">- Lars</p>
                        </div>
                      </>
                    ),
                    icon: '💼'
                  },
                  {
                    title: 'Vad ingår i kontorsflytt?',
                    content:
                      'Planering och projektledning, transport med full försäkring, hantering av känsliga dokument och arkiv, installation och uppsättning på nya lokaler, koordinering med leverantörer och tekniker. Vi anpassar tjänsten efter era specifika behov och verksamhet.',
                    icon: '📋'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/kontor.png" alt="Kontorsflytt service Stockholm" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Hur bokar jag kontorsflytt?',
                    content:
                      'Fyll i formuläret ovan för en kostnadsfri offert på 1 minut, eller kontakta oss direkt för en personlig konsultation. Vi kartlägger era behov och skapar en skräddarsydd lösning. Vid behov kan vi göra en platsbesiktning för att säkerställa en exakt bedömning och erbjuda en kostnadsfri offert. Därefter planerar vi flytten i detalj och koordinerar allt från start till mål. Ni kan fokusera på er verksamhet medan vi sköter flytten professionellt.',
                    icon: '📞'
                  }
                ] as { title: string; content: any; icon: string; image?: string }[]).map((section, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="max-w-6xl mx-auto">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">
                        {section.title}
                      </h3>
                      {typeof section.content === 'string' ? (
                        <p className={`text-gray-700 leading-relaxed px-4 ${section.title === 'Vad är kontorsflytt?' || section.title === 'Vad ingår i kontorsflytt?' || section.title === 'Hur bokar jag kontorsflytt?' ? 'text-lg md:text-xl lg:text-2xl text-left md:text-center' : 'text-base md:text-lg lg:text-xl'}`}>
                          {section.content}
                        </p>
                      ) : (
                        <div className="text-gray-700 leading-relaxed text-base md:text-lg lg:text-xl">
                          {section.content}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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
            boxShadow: 'none' 
          }} 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(/efter_flytt.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center 85%', 
              zIndex: 0 
            }} 
          />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'}}></div>
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'}}></div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Om Flyttella</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                {/* Left: Image - desktop only */}
                <motion.div 
                  className="hidden lg:block w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" 
                  initial="initial" 
                  whileInView="animate" 
                  viewport={{ once: true, amount: 0.2 }} 
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                    <img 
                      src="/omoss.jpg" 
                      alt="Om Flyttella kontorsflytt" 
                      className="object-cover rounded-2xl w-full h-full" 
                      style={{ objectPosition: '30% 25%', transform: 'scale(1.10)' }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center" 
                  initial="initial" 
                  whileInView="animate" 
                  viewport={{ once: true, amount: 0.2 }} 
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är Stockholms ledande företag inom kontorsflytt med över 8 års erfarenhet av att hjälpa företag att flytta säkert och effektivt. Vi förstår att en kontorsflytt är mer än bara transport – det handlar om kontinuitet i er verksamhet.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vårt specialiserade team har gedigen kunskap om IT-utrustning, känsliga dokument och komplexa logistiklösningar. Vi arbetar med detaljerad planering och har rätt utrustning för att hantera allt från skrivbord till servrack.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Med över 1200 genomförda kontorsflyttar har vi utvecklat effektiva metoder som minimerar störningar och säkerställer att ni kan komma igång snabbt på er nya adress. Löpande priser, full försäkring och personlig projektledning.</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är Stockholms ledande företag inom kontorsflytt med över 8 års erfarenhet.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Specialiserat team, detaljerad planering och minimal störning av er verksamhet.</p>
                    {!showFullAboutText && (
                      <button onClick={() => setShowFullAboutText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    )}
                    {showFullAboutText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="space-y-4 mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Med över 1200 genomförda kontorsflytt levererar vi trygg service med löpande priser och full försäkring.</p>
                        <motion.div className="pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                          <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer om oss<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      
        {/* Mobile: Personal picture card below the section */}
        <div className="lg:hidden px-4 py-6">
          <div className="relative h-96 overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/personalpicture.jpg"
              alt="Flyttella personal"
              className="object-cover rounded-3xl w-full h-full"
              style={{ 
                objectPosition: 'center 70%',
                transform: 'scale(1.0)'
              }}
            />
          </div>
        </div>

        {/* Vad tycker våra kunder om oss? */}
        <ReviewsWidget 
          location="Stockholm" 
          title="Vad tycker våra kunder om oss?" 
          subtitle="Pålitlig kontorsflytt i Stockholm" 
          description="Professionell kontorsflytt i Stockholm – från planering till installation. Löpande priser och minimal störning av verksamheten. Pålitliga flyttare och höga betyg från företagskunder. Läs vad våra kunder tycker om vår kontorsflytt i Stockholm." 
          badgeAlt="Erfarenhet av kontorsflytt i Stockholm" 
          arrowText="Läs vad våra kunder säger om vår kontorsflytt" 
        />

        {/* Redo att börja er kontorsflytt? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🏢</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">Redo att börja er kontorsflytt?</h3><p className="text-base md:text-lg text-gray-100 leading-snug">Få en snabb och gratis offert</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><button onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">Få gratis offert<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Våra andra huvudtjänster</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Kontorsstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧹</span><h3 className="text-3xl md:text-5xl font-bold text-white">Kontorsstädning</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Professionell kontorsstädning för företag – regelbunden städning för en ren och produktiv arbetsmiljö.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi erbjuder skräddarsydd kontorsstädning anpassad efter era behov. Daglig, veckovis eller månatlig städning med kvalificerad personal och miljövänliga produkter.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/kontorsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Piano & Tunglyft Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🎹</span><h3 className="text-3xl md:text-5xl font-bold text-white">Piano & Tunglyft</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Specialiserad flytt av piano, kassaskåp och andra tunga föremål – säker hantering med rätt utrustning.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi har specialutrustning och erfaren personal för flytt av piano, kassaskåp, kopiatorer och andra tunga föremål. Säker transport och professionell hantering.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Bortforsling Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🗑️</span><h3 className="text-3xl md:text-5xl font-bold text-white">Bortforsling</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Professionell bortforsling av möbler och inventarier – miljövänlig hantering och återvinning.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi hjälper er att bli av med gamla möbler, kontorsutrustning och inventarier på ett miljövänligt sätt. Sortering, transport och återvinning enligt gällande miljöbestämmelser.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/bortforsling" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section 
          className="py-12 md:py-24 bg-white text-[#0F172A] relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 hidden md:block"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ 
                  duration: 0.8,
                  delay: 0 * 0.25
                }}
                id="upptack-tjanster"
              >
              Våra tjänster
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-[#0F172A]/90"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ 
                  duration: 0.8,
                  delay: 0 * 0.25
                }}
              >
                Vi erbjuder ett komplett utbud av flyttjänster för företag och privatpersoner i Stockholm.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ 
                  duration: 0.8,
                  delay: 0.2 * 0.25
                }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/foretag" 
                    className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                  >
                    Se alla våra företagstjänster
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/tjanster" 
                    className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                  >
                    Se alla våra flyttjänster
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Våra förmåner - Mobile slider to match main page */}
        <section className="md:hidden py-8 bg-white">
          <div className="mx-auto px-4">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Våra förmåner</h2>
              <div className="relative overflow-hidden rounded-xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentCard * 100}%)` }}>
                  {[
                    { icon: '💰', title: 'Löpande priser', description: 'Transparenta löpande priser – du vet vad du betalar för', link: '/priser' },
                    { icon: '📋', title: 'Försäkring', description: 'Full ansvarsförsäkring och skadeersättning vid behov', link: '/om-oss' },
                    { icon: '⚡', title: 'Snabb offert', description: 'Få pris på 1 minut – fyll enkelt formuläret ovan', link: '#top' },
                    { icon: '⏰', title: 'Flexibla tider', description: 'Vi anpassar oss efter era behov och tidsschema', link: '/kontakt' },
                    { icon: '🔒', title: 'Tillstånd', description: 'Alla nödvändiga tillstånd och certifieringar', link: '/om-oss' },
                    { icon: '🎓', title: 'Erfaren personal', description: 'Utbildade medarbetare med mångårig erfarenhet', link: '/om-oss' },
                    { icon: '🚛', title: 'Modern utrustning', description: 'Välunderhållna fordon och professionella verktyg', link: '/om-oss' },
                    { icon: '📈', title: 'Kvalitetssäkring', description: 'Systematisk kvalitetskontroll och uppföljning', link: '/om-oss' },
                    { icon: '🦺', title: 'Säkerhet', description: 'Arbetsmiljö och säkerhet i fokus för alla uppdrag', link: '/om-oss' }
                  ].map((feature, index) => (
                    <div key={feature.icon} className="w-full flex-shrink-0">
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                        <div className="flex items-start gap-3 h-full">
                          <span className="text-2xl">{feature.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm mb-2">{feature.description}</p>
                            <div className="h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4">
          <img src="/office-moving.png" alt="Våra förmåner kontorsflytt" className="w-full h-auto rounded-2xl shadow-lg" />
          </div>

        {/* Desktop features grid with image */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">Våra förmåner</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {[
                        { icon: '💰', title: 'Löpande priser', description: 'Transparenta löpande priser – du vet vad du betalar för', link: '/priser' },
                        { icon: '📋', title: 'Försäkring', description: 'Full ansvarsförsäkring och skadeersättning vid behov', link: '/om-oss' },
                        { icon: '⚡', title: 'Snabb offert', description: 'Få pris på 1 minut – fyll enkelt formuläret ovan', link: '#top' },
                        { icon: '⏰', title: 'Flexibla tider', description: 'Vi anpassar oss efter era behov och tidsschema', link: '/kontakt' },
                        { icon: '🔒', title: 'Tillstånd', description: 'Alla nödvändiga tillstånd och certifieringar', link: '/om-oss' },
                        { icon: '🎓', title: 'Erfaren personal', description: 'Utbildade medarbetare med mångårig erfarenhet', link: '/om-oss' },
                        { icon: '🚛', title: 'Modern utrustning', description: 'Välunderhållna fordon och professionella verktyg', link: '/om-oss' },
                        { icon: '📈', title: 'Kvalitetssäkring', description: 'Systematisk kvalitetskontroll och uppföljning', link: '/om-oss' },
                        { icon: '🦺', title: 'Säkerhet', description: 'Arbetsmiljö och säkerhet i fokus för alla uppdrag', link: '/om-oss' }
                      ].map((feature, i) => (
                        <motion.div key={feature.title} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={i}>
                          <motion.span className="text-2xl md:text-3xl" initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }} animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [-180, 20, 0], color: ['#10B981', '#34D399', '#10B981'] }} transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}>{feature.icon}</motion.span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                            <div className="h-6 md:h-7" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch">
                      <img src="/office-moving.png" alt="Kontorsflytt Stockholm - Flyttella" className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA above Vår erfarenhet */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12 -mb-12 md:-mb-16">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-xl md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🏢</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">Redo att börja er kontorsflytt?</h3><p className="text-base md:text-lg text-gray-100 leading-snug">Få en snabb och gratis offert</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><button onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">Få gratis offert<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Vår erfarenhet */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/backgroundpicture.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentCard * 100}%)` }}>
                    {experienceCards.map((card) => (
                      <div key={card.title} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h4 className="text-lg font-bold mb-1 text-white">{card.title}</h4>
                            <div className="text-4xl font-bold mb-1 text-white">{card.count}</div>
                            <p className="text-white/90 text-sm">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {experienceCards.map((card, i) => (
                  <motion.div key={card.title} className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: i * 0.25 }}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <motion.h2 className="text-xl font-bold mb-2 text-white">{card.title}</motion.h2>
                      <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white">{card.count}</motion.div>
                      <motion.p className="text-white/90">{card.description}</motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Expertis inom kontorsflytt</h4>
                  {/* Desktop: Full text always visible */}
                  <div className="hidden md:block">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                      Med över 1200 genomförda kontorsflytt i Stockholm har vi utvecklat unik expertis inom företagsflytt. Vi förstår komplexiteten i att flytta IT-system, känsliga dokument och hela kontorsmiljöer utan att störa er verksamhet. Våra projektledare har gedigen erfarenhet och arbetar systematiskt för att säkerställa en smidig övergång till era nya lokaler.
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      Vi har specialiserat oss på allt från små internflytt till stora kontorsetableringar med hundratals arbetsplatser. Vårt team har hanterat känslig IT-utrustning värd miljontals kronor och flyttat tusentals servrar, datorer och kontorsmöbler säkert och effektivt. Med rätt utrustning, detaljerad planering och erfaren personal levererar vi resultat som överträffar förväntningarna.
                    </p>
                  </div>
                  
                  {/* Mobile: Expandable text */}
                  <div className="md:hidden">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                      Med över 1200 genomförda kontorsflytt i Stockholm har vi utvecklat unik expertis inom företagsflytt. Vi förstår komplexiteten i att flytta IT-system, känsliga dokument och hela kontorsmiljöer utan att störa er verksamhet. Våra projektledare har gedigen erfarenhet och arbetar systematiskt för att säkerställa en smidig övergång till era nya lokaler.
                    </p>
                    {!showFullExperienceText && (
                      <button onClick={() => setShowFullExperienceText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">
                        Läs mer om vår erfarenhet
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                    {showFullExperienceText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                          Vi har specialiserat oss på allt från små internflytt till stora kontorsetableringar med hundratals arbetsplatser. Vårt team har hanterat känslig IT-utrustning värd miljontals kronor och flyttat tusentals servrar, datorer och kontorsmöbler säkert och effektivt. Med rätt utrustning, detaljerad planering och erfaren personal levererar vi resultat som överträffar förväntningarna.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                <div className="flex flex-col items-center justify-center gap-3 md:gap-6">
                  {/* Mobile pyramid layout */}
                  <div className="md:hidden flex flex-col items-center">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image
                        src="/1000reviewspicture.png"
                        alt="1000+ positiva recensioner från företagskunder"
                        width={200}
                        height={200}
                        className="object-contain h-36 w-36"
                        priority={false}
                      />
                    </motion.div>
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/recommendedcompany2.png"
                          alt="Rekommenderat kontorsflyttföretag - Flyttella"
                          width={160}
                          height={160}
                          className="object-contain h-32 w-32"
                          priority={false}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/bestinswedenbadge-modified.png"
                          alt="Top 10 kontorsflyttföretag - Flyttella"
                          width={180}
                          height={180}
                          className="object-contain h-28 w-28"
                          priority={false}
                        />
                      </motion.div>
                    </div>
                  </div>
                  {/* Desktop horizontal layout */}
                  <div className="hidden md:flex items-center justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image
                        src="/recommendedcompany2.png"
                        alt="Rekommenderat kontorsflyttföretag - Flyttella"
                        width={240}
                        height={240}
                        className="object-contain h-60 w-60"
                        priority={false}
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image
                        src="/1000reviewspicture.png"
                        alt="1000+ positiva recensioner från företagskunder"
                        width={260}
                        height={260}
                        className="object-contain h-64 w-64 mt-3"
                        priority={false}
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image
                        src="/bestinswedenbadge-modified.png"
                        alt="Top 10 kontorsflyttföretag - Flyttella"
                        width={300}
                        height={300}
                        className="object-contain h-48 w-48"
                        priority={false}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-48 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)' }} />
        </motion.section>

        {/* Process Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-4 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Vår process</h2>
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    Vår kontorsflytt är välplanerad och systematisk. Fyll i formuläret – ni får pris direkt och kan bekräfta digitalt. Samma dag eller senast nästkommande vardag kontaktar vi er för att diskutera omfattning, tidsplan, åtkomlighet och eventuella särskilda behov som IT-utrustning eller känsliga dokument.
                  </p>
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    Vi skapar en detaljerad projektplan och genomför flytten enligt överenskommet schema. Vårt team använder professionell utrustning och arbetar systematiskt för minimal störning av er verksamhet. Resultatet är en smidig övergång till era nya kontorslokaler.
                  </p>
                </div>
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">
                    Priset baseras på kontorsstorlek, mängd utrustning, avstånd och komplexitet. Alla priser är fasta utan dolda avgifter. Full försäkring ingår och ni får personlig projektledning från start till mål.
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">Så fungerar det</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        { icon: <FillFormLottie />, title: 'Fyll i formuläret', description: 'Berätta om era behov' },
                        { icon: <FastLottie />, title: 'Snabb offert', description: 'Få pris på 1 minut' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personlig kontakt', description: 'Vi ringer samma dag eller dagen efter', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Signera & bekräfta', description: 'Boka digitalt', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Kontorsflytt utförd', description: 'Vi tar hand om allt', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><HappyCustomerLottie /></div>, title: 'Nöjd kund', description: 'Nytt kontor klart', containerClass: 'md:-mt-6' }
                      ].map((step: any, index: number) => (
                        <motion.div key={index} className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 h-full min-h-[160px] md:min-h-0" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={index}>
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#10B981] rounded-full hidden md:block"></div>
                          <div className={`${step.containerClass || ''} w-full flex flex-col items-center justify-center`}>
                            <div className="mb-1 md:mb-2 h-16 md:h-auto flex items-center justify-center">{step.icon}</div>
                            <div className={`flex flex-col items-center justify-center w-full ${step.textClass || ''}`}>
                              <h4 className="text-white font-semibold text-sm md:text-base lg:text-lg mb-1 text-center w-full">{step.title}</h4>
                              <p className="text-white/80 text-xs md:text-sm lg:text-base text-center w-full">{step.description}</p>
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
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20}} />
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Läs mer om kontorsflytt</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Tips för företag: planering av kontorsflytt, checklista för företagsflytt och hur ni minimerar störningar i verksamheten.
                </p>
              </div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/office-moving.png" alt="Kontorsflyttstips" className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">Kontorsflytt</span>
                      <span className="text-gray-500 text-sm ml-4">5 min läsning</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Guide: Planera er kontorsflytt för minimal störning</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Så planerar ni en smidig kontorsflytt – från förberedelser till installation. Checklista och tips för företag.
                    </p>
                    <div className="flex items-center justify-end mb-4">
                      <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">
                        Läs mer
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12">
                <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">
                  Se alla artiklar om flytt
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
          </Link>
        </div>
            </div>
          </div>
        </section>

        {/* FAQ Section: Vanliga frågor om kontorsflytt */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Vad kostar en kontorsflytt?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Priset beror på kontorsstorlek, mängd utrustning, avstånd och komplexitet. Vi arbetar med löpande priser utan dolda kostnader och erbjuder kostnadsfri offert.'
                }
              },
              {
                '@type': 'Question',
                name: 'Hur lång tid tar en kontorsflytt?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tiden beror på kontorsstorlek och komplexitet. Mindre kontor kan flyttas på en dag, större kan ta flera dagar. Vi planerar för minimal störning.'
                }
              },

              {
                '@type': 'Question',
                name: 'Arbetar ni utanför kontorstid?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja, vi kan utföra kontorsflytt kvällar och helger för att minimera störningar i er verksamhet.'
                }
              }
            ]
          }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Vanliga frågor om kontorsflytt</h2>
              <div className="space-y-4">
                {[
                  {
                    id: 'faq-1',
                    question: 'Vad kostar en kontorsflytt?',
                    answer: 'Priset för kontorsflytt beror på flera faktorer: kontorsstorlek, mängd utrustning, avstånd mellan lokaler och komplexitet. Vi arbetar med löpande priser utan dolda kostnader och erbjuder en kostnadsfri offert där vi bedömer era specifika behov.'
                  },
                  {
                    id: 'faq-2',
                    question: 'Hur lång tid tar en kontorsflytt?',
                    answer: 'Tiden beror på kontorsstorlek och komplexitet. Mindre kontor (5-10 personer) kan ofta flyttas på en dag, medan större kontor kan ta flera dagar. Vi planerar noggrant för att minimera störningar i er verksamhet.'
                  },
                  {
                    id: 'faq-3',
                    question: 'Arbetar ni utanför kontorstid?',
                    answer: 'Ja, vi kan utföra kontorsflytt kvällar, nätter och helger för att minimera störningar i er dagliga verksamhet. Detta är särskilt viktigt för företag som inte kan stänga under arbetsdagar.'
                  },
                  {
                    id: 'faq-4',
                    question: 'Behöver vi packa själva innan kontorsflytten?',
                    answer: 'Nej, vi kan sköta all packning åt er. Vi har professionellt packningsmaterial och erfarenhet av att packa kontorsutrustning säkert. Ni kan också välja att packa vissa saker själva om ni föredrar det.'
                  },

                ].map((faq, index) => (
                  <motion.div key={faq.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <button onClick={() => toggleFAQKontor(faq.id)} className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">{faq.question}</h3>
                      <motion.div animate={{ rotate: openFAQKontor === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                        <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                    <motion.div initial={false} animate={{ height: openFAQKontor === faq.id ? 'auto' : 0, opacity: openFAQKontor === faq.id ? 1 : 0 }} transition={{ height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2, ease: 'easeInOut' } }} className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>




        {/* Locations */}
        <LocationsCard locations={locations} />
      </div>
    </main>
  );
} 