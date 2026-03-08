'use client';

import Image from "next/image";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/contexts/LanguageContext'
import FlyttoffertForm from '@/app/components/FlyttoffertForm'
import ReviewsWidget from '@/app/components/ReviewsWidget'
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import CountUp from "react-countup";
import LocationsCard from '@/app/components/LocationsCard';

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
  const { t, locale } = useLanguage();

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

  const experienceCards = locale === 'sv' ? [
    { title: 'Kontorsflyttar', count: '1200+', description: 'Genomförda kontorsflytt', delay: 0 },
    { title: 'Bohagsflyttar', count: '8000+', description: 'Genomförda bohagsflyttar', delay: 1 },
    { title: 'Kontorsstädningar', count: '2000+', description: 'Genomförda kontorsstädningar', delay: 2 },
  ] : [
    { title: 'Office Moves', count: '1200+', description: 'Completed office moves', delay: 0 },
    { title: 'Household Moves', count: '8000+', description: 'Completed household moves', delay: 1 },
    { title: 'Office Cleanings', count: '2000+', description: 'Completed office cleanings', delay: 2 },
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
          {/* Mobile: Hero content */}
          <div className="md:hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/office-moving.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%'
                }}
              />
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl font-bold mb-6">
                  {locale === 'sv' ? 'Kontorsflytt' : 'Office Moving'}
                </h1>
                <p className="text-xl text-white/90">
                  {locale === 'sv' ? 'Professionell företagsflytt med minimal störning' : 'Professional business moving with minimal disruption'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
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
                    {locale === 'sv' ? 'Professionell kontorsflytt i Stockholm' : 'Professional Office Moving in Stockholm'}
                  </h1>
                  <p className="text-2xl md:text-3xl mb-12">
                    {locale === 'sv' ? 'Smidig företagsflytt med minimal störning' : 'Smooth business moving with minimal disruption'}
                  </p>
                  <p className="text-lg text-white/90">
                    {locale === 'sv' ? 'Vi erbjuder kompletta lösningar för kontorsflytt – från planering till installation. Säker hantering av IT-utrustning och minimal störning av er verksamhet.' : 'We offer complete solutions for office moving – from planning to installation. Secure handling of IT equipment and minimal disruption to your business.'}
                  </p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <FlyttoffertForm mode="widget" defaultCustomerType="foretag" cleaningCardSubtitle={locale === 'sv' ? 'Professionell kontorsflytt – från planering till installation med minimal störning av verksamheten' : 'Professional office moving – from planning to installation with minimal disruption to business'} />
                </div>
              </div>
              
              {/* Läs mer button with arrow down */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <button
                    onClick={() => {
                      const element = document.getElementById('content');
                      if (element) {
                        const headerHeight = 80; // Approximate header height
                        const elementPosition = element.offsetTop - headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="flex flex-col items-center text-white hover:text-white/80 transition-colors group"
                  >
                    <span className="text-sm font-medium mb-2">{locale === 'sv' ? 'Läs mer' : 'Read more'}</span>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg 
                        className="w-6 h-6 group-hover:scale-110 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* What is Kontorsflytt Section */}
        <section id="content" className="relative py-0 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {/* Main content sections */}
                {(locale === 'sv' ? [
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
                        <img src="/godtid.webp" alt="Kontorsflytt Stockholm" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
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
                            &quot;Vi är väldigt nöjda med Flyttellas tjänster. De kunde hantera allt utan att störa verksamheten!&quot;
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
                      'Planering och projektledning, transport med försäkring, hantering av känsliga dokument och arkiv, installation, uppsättning, montage och demontage kan ordnas vid behov. Vi anpassar tjänsten efter era specifika behov och verksamhet.',
                    icon: '📋'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/kontor.webp" alt="Kontorsflytt service Stockholm" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Hur bokar jag kontorsflytt?',
                    content:
                      'Fyll i formuläret ovan för en kostnadsfri offert snabbt och enkelt, eller kontakta oss direkt för en personlig konsultation. Vi kartlägger era behov och skapar en skräddarsydd lösning. Vid behov kan vi göra en platsbesiktning för att säkerställa en exakt bedömning och erbjuda en kostnadsfri offert. Därefter planerar vi flytten i detalj och koordinerar allt från start till mål. Ni kan fokusera på er verksamhet medan vi sköter flytten professionellt.',
                    icon: '📞'
                  }
                ] : [
                  {
                    title: 'What is Office Moving?',
                    content:
                      'Office moving is professional moving of companies and organizations, either within the same building or to completely new premises. We handle everything from planning and coordination to secure transport of IT equipment, furniture and sensitive documents. With our expertise in business moving, we ensure minimal disruption to your business and a smooth transition to the new premises. Our team understands the importance of continuity in business operations and therefore works with detailed planning and flexible solutions. We offer everything from smaller internal moves to large office establishments with hundreds of workstations. Everything to make your office move in Stockholm safe, efficient and professional.',
                    icon: '🏢',
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/godtid.webp" alt="Office Moving Stockholm" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'What does Office Moving Cost?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">The price for office moving depends on several factors: size of the office, amount of equipment, distance and complexity. We work with transparent pricing without hidden costs and offer free quotes.</p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            &quot;We are very satisfied with Flyttella's services. They could handle everything without disturbing the business!&quot;
                          </p>
                          <p className="italic text-gray-700 mt-2">- Lars</p>
                        </div>
                      </>
                    ),
                    icon: '💼'
                  },
                  {
                    title: 'What is Included in Office Moving?',
                    content:
                      'Planning and project management, transport with insurance, handling of sensitive documents and archives, installation, setup, assembly and disassembly can be arranged as needed. We adapt the service to your specific needs and business.',
                    icon: '📋'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/kontor.webp" alt="Office Moving Service Stockholm" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'How do I Book Office Moving?',
                    content:
                      'Fill out the form above for a free quote quickly and easily, or contact us directly for a personal consultation. We map your needs and create a tailored solution. If needed, we can do a site visit to ensure an accurate assessment and offer a free quote. Then we plan the move in detail and coordinate everything from start to finish. You can focus on your business while we handle the move professionally.',
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
              backgroundImage: 'url(/efter_flytt.webp)', 
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
              {/* Mobile image above title to match Bohagsflytt */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/personalpicture.webp" alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'} className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'}</h3>
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
                    <img src="/omoss.webp" 
                      alt={locale === 'sv' ? 'Om Flyttella kontorsflytt' : 'About Flyttella office moving'} 
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
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Flyttella är en av Stockholms ledande aktörer inom kontorsflytt med över 8 års erfarenhet av att hjälpa företag att flytta säkert och effektivt. Vi förstår att en kontorsflytt är mer än bara transport – det handlar om kontinuitet i er verksamhet.' : 'Flyttella is one of Stockholm\'s leading players in office moving with over 8 years of experience helping companies move safely and efficiently. We understand that an office move is more than just transport – it\'s about continuity in your business.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Vårt specialiserade team har gedigen kunskap om IT-utrustning, känsliga dokument och komplexa logistiklösningar. Vi arbetar med detaljerad planering och har rätt utrustning för att hantera allt från skrivbord till IT-utrustning.' : 'Our specialized team has solid knowledge of IT equipment, sensitive documents and complex logistics solutions. We work with detailed planning and have the right equipment to handle everything from desks to IT equipment.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Med över 1200 genomförda kontorsflyttar har vi utvecklat effektiva metoder som minimerar störningar och säkerställer att ni kan komma igång snabbt på er nya adress. Löpande priser, försäkring och personlig projektledning.' : 'With over 1200 completed office moves, we have developed effective methods that minimize disruptions and ensure you can get started quickly at your new address. Transparent pricing, insurance and personal project management.'}</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Flyttella är Stockholms ledande företag inom kontorsflytt med över 8 års erfarenhet.' : 'Flyttella is Stockholm\'s leading company in office moving with over 8 years of experience.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Specialiserat team, detaljerad planering och minimal störning av er verksamhet.' : 'Specialized team, detailed planning and minimal disruption to your business.'}</p>
                    {!showFullAboutText && (
                      <button onClick={() => setShowFullAboutText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    )}
                    {showFullAboutText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="space-y-4 mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Med över 1200 genomförda kontorsflytt levererar vi trygg service med löpande priser och försäkring.' : 'With over 1200 completed office moves, we deliver reliable service with transparent pricing and insurance.'}</p>
                        <motion.div className="pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                          <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{locale === 'sv' ? 'Läs mer om oss' : 'Read more about us'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vad tycker våra kunder om oss? */}
        <ReviewsWidget 
          location="Stockholm" 
          title={locale === 'sv' ? 'Vad tycker våra kunder om oss?' : 'What do our customers think of us?'} 
          subtitle={locale === 'sv' ? 'Pålitlig kontorsflytt i Stockholm' : 'Reliable Office Moving in Stockholm'} 
          description={locale === 'sv' ? 'Professionell kontorsflytt i Stockholm – från planering till installation. Löpande priser och minimal störning av verksamheten. Pålitliga flyttkillar och höga betyg från företagskunder. Läs vad våra kunder tycker om vår kontorsflytt i Stockholm.' : 'Professional office moving in Stockholm – from planning to installation. Transparent pricing and minimal disruption to business. Reliable movers and high ratings from business customers. Read what our customers think about our office moving in Stockholm.'} 
          badgeAlt={locale === 'sv' ? 'Erfarenhet av kontorsflytt i Stockholm' : 'Experience in Office Moving in Stockholm'} 
          arrowText={locale === 'sv' ? 'Läs vad våra kunder säger om vår kontorsflytt' : 'Read what our customers say about our office moving'} 
        />

        {/* Redo att börja er kontorsflytt? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🏢</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja er kontorsflytt?' : 'Ready to start your office move?'}</h3><p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert' : 'Get a quick and free quote'}</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><button onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{locale === 'sv' ? 'Få gratis offert' : 'Get free quote'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Våra andra huvudtjänster' : 'Our Other Main Services'}</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Kontorsstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧹</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Kontorsstädning' : 'Office Cleaning'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Professionell kontorsstädning för företag – regelbunden städning för en ren och produktiv arbetsmiljö.' : 'Professional office cleaning for companies – regular cleaning for a clean and productive work environment.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi erbjuder skräddarsydd kontorsstädning anpassad efter era behov. Daglig, veckovis eller månatlig städning med kvalificerad personal och miljövänliga produkter.' : 'We offer tailored office cleaning adapted to your needs. Daily, weekly or monthly cleaning with qualified staff and eco-friendly products.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/kontorsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Piano & Tunglyft Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🎹</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Piano & Tunglyft' : 'Piano & Heavy Lifting'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Specialiserad flytt av piano, kassaskåp och andra tunga föremål – säker hantering med rätt utrustning.' : 'Specialized moving of pianos, safes and other heavy items – safe handling with the right equipment.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi har specialutrustning och erfaren personal för flytt av piano, kassaskåp, kopiatorer och andra tunga föremål. Säker transport och professionell hantering.' : 'We have special equipment and experienced staff for moving pianos, safes, copiers and other heavy items. Safe transport and professional handling.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Bortforsling Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🗑️</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Bortforsling' : 'Disposal'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Professionell bortforsling av möbler och inventarier – miljövänlig hantering och återvinning.' : 'Professional disposal of furniture and inventory – eco-friendly handling and recycling.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi hjälper er att bli av med gamla möbler, kontorsutrustning och inventarier på ett miljövänligt sätt. Sortering, transport och återvinning enligt gällande miljöbestämmelser.' : 'We help you get rid of old furniture, office equipment and inventory in an eco-friendly way. Sorting, transport and recycling according to current environmental regulations.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/bortforsling" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

         {/* Additional Service Cards - desktop only */}
         <section className="py-4 bg-white hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {/* Bohagsflytt */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🏠</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Bohagsflytt' : 'Household moving'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Trygg bohagsflytt för privatpersoner.' : 'Safe household moving for individuals.'}</p>
                  <div className="mt-auto relative"><Link href="/bohagsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Piano & Tunglyft */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🎹</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Piano & Tunglyft' : 'Piano & heavy lifting'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Säker hantering av tunga föremål.' : 'Safe handling of heavy items.'}</p>
                  <div className="mt-auto relative"><Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Utlandsflytt */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🌍</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Utlandsflytt' : 'International moving'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Experter på logistik och tull.' : 'Experts in logistics and customs.'}</p>
                  <div className="mt-auto relative"><Link href="/utlandsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section 
          className="py-12 md:py-12 bg-white text-[#0F172A] relative overflow-hidden"
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
              {locale === 'sv' ? 'Våra tjänster' : 'Our Services'}
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
                {locale === 'sv' ? 'Vi erbjuder ett komplett utbud av flyttjänster för företag och privatpersoner i Stockholm.' : 'We offer a complete range of moving services for companies and individuals in Stockholm.'}
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
                    {locale === 'sv' ? 'Se alla våra företagstjänster' : 'See all our business services'}
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
                    {locale === 'sv' ? 'Se alla våra flyttjänster' : 'See all our moving services'}
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
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{locale === 'sv' ? 'Våra förmåner' : 'Our Benefits'}</h2>
              <div className="relative overflow-hidden rounded-xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentCard * 100}%)` }}>
                  {(locale === 'sv' ? [
                    { icon: '💰', title: 'Löpande priser', description: 'Transparenta löpande priser – du vet vad du betalar för', link: '/priser' },
                    { icon: '📋', title: 'Försäkring', description: 'Full ansvarsförsäkring och skadeersättning vid behov', link: '/om-oss' },
                    { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – fyll enkelt formuläret ovan', link: '#top' },
                    { icon: '⏰', title: 'Flexibla tider', description: 'Vi anpassar oss efter era behov och tidsschema', link: '/kontakt' },
                    { icon: '🔒', title: 'Tillstånd', description: 'Alla nödvändiga tillstånd och certifieringar', link: '/om-oss' },
                    { icon: '🎓', title: 'Erfaren personal', description: 'Utbildade medarbetare med mångårig erfarenhet', link: '/om-oss' },
                    { icon: '🚛', title: 'Modern utrustning', description: 'Välunderhållna fordon och professionella verktyg', link: '/om-oss' },
                    { icon: '📈', title: 'Kvalitetssäkring', description: 'Systematisk kvalitetskontroll och uppföljning', link: '/om-oss' },
                    { icon: '🦺', title: 'Säkerhet', description: 'Arbetsmiljö och säkerhet i fokus för alla uppdrag', link: '/om-oss' }
                  ] : [
                    { icon: '💰', title: 'Transparent Pricing', description: 'Transparent pricing – you know what you pay for', link: '/priser' },
                    { icon: '📋', title: 'Insurance', description: 'Full liability insurance and compensation when needed', link: '/om-oss' },
                    { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – fill out the form above', link: '#top' },
                    { icon: '⏰', title: 'Flexible Times', description: 'We adapt to your needs and schedule', link: '/kontakt' },
                    { icon: '🔒', title: 'Licenses', description: 'All necessary licenses and certifications', link: '/om-oss' },
                    { icon: '🎓', title: 'Experienced Staff', description: 'Trained employees with years of experience', link: '/om-oss' },
                    { icon: '🚛', title: 'Modern Equipment', description: 'Well-maintained vehicles and professional tools', link: '/om-oss' },
                    { icon: '📈', title: 'Quality Assurance', description: 'Systematic quality control and follow-up', link: '/om-oss' },
                    { icon: '🦺', title: 'Safety', description: 'Work environment and safety in focus for all assignments', link: '/om-oss' }
                  ]).map((feature, index) => (
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
          <img src="/office-moving.webp" alt={locale === 'sv' ? 'Våra förmåner kontorsflytt' : 'Our benefits office moving'} className="w-full h-auto rounded-2xl shadow-lg" />
          </div>

        {/* Desktop features grid with image */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">{locale === 'sv' ? 'Våra förmåner' : 'Our Benefits'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {(locale === 'sv' ? [
                        { icon: '💰', title: 'Löpande priser', description: 'Transparenta löpande priser – du vet vad du betalar för', link: '/priser' },
                        { icon: '📋', title: 'Försäkring', description: 'Full ansvarsförsäkring och skadeersättning vid behov', link: '/om-oss' },
                        { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – fyll enkelt formuläret ovan', link: '#top' },
                        { icon: '⏰', title: 'Flexibla tider', description: 'Vi anpassar oss efter era behov och tidsschema', link: '/kontakt' },
                        { icon: '🔒', title: 'Tillstånd', description: 'Alla nödvändiga tillstånd och certifieringar', link: '/om-oss' },
                        { icon: '🎓', title: 'Erfaren personal', description: 'Utbildade medarbetare med mångårig erfarenhet', link: '/om-oss' },
                        { icon: '🚛', title: 'Modern utrustning', description: 'Välunderhållna fordon och professionella verktyg', link: '/om-oss' },
                        { icon: '📈', title: 'Kvalitetssäkring', description: 'Systematisk kvalitetskontroll och uppföljning', link: '/om-oss' },
                        { icon: '🦺', title: 'Säkerhet', description: 'Arbetsmiljö och säkerhet i fokus för alla uppdrag', link: '/om-oss' }
                      ] : [
                        { icon: '💰', title: 'Transparent Pricing', description: 'Transparent pricing – you know what you pay for', link: '/priser' },
                        { icon: '📋', title: 'Insurance', description: 'Full liability insurance and compensation when needed', link: '/om-oss' },
                        { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – fill out the form above', link: '#top' },
                        { icon: '⏰', title: 'Flexible Times', description: 'We adapt to your needs and schedule', link: '/kontakt' },
                        { icon: '🔒', title: 'Licenses', description: 'All necessary licenses and certifications', link: '/om-oss' },
                        { icon: '🎓', title: 'Experienced Staff', description: 'Trained employees with years of experience', link: '/om-oss' },
                        { icon: '🚛', title: 'Modern Equipment', description: 'Well-maintained vehicles and professional tools', link: '/om-oss' },
                        { icon: '📈', title: 'Quality Assurance', description: 'Systematic quality control and follow-up', link: '/om-oss' },
                        { icon: '🦺', title: 'Safety', description: 'Work environment and safety in focus for all assignments', link: '/om-oss' }
                      ]).map((feature, i) => (
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
                      <img src="/office-moving.webp" alt="Kontorsflytt Stockholm - Flyttella" className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} />
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🏢</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja er kontorsflytt?' : 'Ready to start your office move?'}</h3><p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert' : 'Get a quick and free quote'}</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><button onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{locale === 'sv' ? 'Få gratis offert' : 'Get free quote'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Vår erfarenhet */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/backgroundpicture.webp)', backgroundSize: 'cover', backgroundPosition: 'center center', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{locale === 'sv' ? 'Vår erfarenhet' : 'Our Experience'}</h3>
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
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Expertis inom kontorsflytt' : 'Expertise in Office Moving'}</h4>
                  {/* Desktop: Full text always visible */}
                  <div className="hidden md:block">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                      {locale === 'sv' ? 'Med över 1200 genomförda kontorsflytt i Stockholm har vi utvecklat unik expertis inom företagsflytt. Vi förstår komplexiteten i att flytta IT-system, känsliga dokument och hela kontorsmiljöer utan att störa er verksamhet. Våra projektledare har gedigen erfarenhet och arbetar systematiskt för att säkerställa en smidig övergång till era nya lokaler.' : 'With over 1200 completed office moves in Stockholm, we have developed unique expertise in business moving. We understand the complexity of moving IT systems, sensitive documents and entire office environments without disrupting your business. Our project managers have solid experience and work systematically to ensure a smooth transition to your new premises.'}
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {locale === 'sv' ? 'Vi har specialiserat oss på allt från små internflytt till stora kontorsetableringar med hundratals arbetsplatser. Vårt team har flyttat tusentals datorer och kontorsmöbler säkert och effektivt. Med rätt utrustning, detaljerad planering och erfaren personal levererar vi resultat som överträffar förväntningarna.' : 'We have specialized in everything from small internal moves to large office establishments with hundreds of workstations. Our team has moved thousands of computers and office furniture safely and efficiently. With the right equipment, detailed planning and experienced staff, we deliver results that exceed expectations.'}
                    </p>
                  </div>
                  
                  {/* Mobile: Expandable text */}
                  <div className="md:hidden">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                      {locale === 'sv' ? 'Med över 1200 genomförda kontorsflytt i Stockholm har vi utvecklat unik expertis inom företagsflytt. Vi förstår komplexiteten i att flytta IT-system, känsliga dokument och hela kontorsmiljöer utan att störa er verksamhet. Våra projektledare har gedigen erfarenhet och arbetar systematiskt för att säkerställa en smidig övergång till era nya lokaler.' : 'With over 1200 completed office moves in Stockholm, we have developed unique expertise in business moving. We understand the complexity of moving IT systems, sensitive documents and entire office environments without disrupting your business. Our project managers have solid experience and work systematically to ensure a smooth transition to your new premises.'}
                    </p>
                    {!showFullExperienceText && (
                      <button onClick={() => setShowFullExperienceText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">
                        {locale === 'sv' ? 'Läs mer om vår erfarenhet' : 'Read more about our experience'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                    {showFullExperienceText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                          {locale === 'sv' ? 'Vi har specialiserat oss på allt från små internflytt till stora kontorsetableringar med hundratals arbetsplatser. Vårt team har hanterat känslig IT-utrustning värd miljontals kronor och flyttat tusentals datorer och kontorsmöbler säkert och effektivt. Med rätt utrustning, detaljerad planering och erfaren personal levererar vi resultat som överträffar förväntningarna.' : 'We have specialized in everything from small internal moves to large office establishments with hundreds of workstations. Our team has handled sensitive IT equipment worth millions of kronor and moved thousands of computers and office furniture safely and efficiently. With the right equipment, detailed planning and experienced staff, we deliver results that exceed expectations.'}
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{locale === 'sv' ? 'Vår process' : 'Our Process'}</h2>
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {locale === 'sv' ? 'Vår kontorsflytt är välplanerad och systematisk. Fyll i formuläret – ni får pris direkt och kan bekräfta digitalt. Samma dag eller senast nästkommande vardag kontaktar vi er för att diskutera omfattning, tidsplan, åtkomlighet och eventuella särskilda behov som IT-utrustning eller känsliga dokument.' : 'Our office moving is well-planned and systematic. Fill out the form – you get a price immediately and can confirm digitally. The same day or at the latest the next business day, we contact you to discuss scope, timeline, accessibility and any special needs such as IT equipment or sensitive documents.'}
                  </p>
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {locale === 'sv' ? 'Vi skapar en detaljerad projektplan och genomför flytten enligt överenskommet schema. Vårt team använder professionell utrustning och arbetar systematiskt för minimal störning av er verksamhet. Resultatet är en smidig övergång till era nya kontorslokaler.' : 'We create a detailed project plan and carry out the move according to the agreed schedule. Our team uses professional equipment and works systematically for minimal disruption to your business. The result is a smooth transition to your new office premises.'}
                  </p>
                </div>
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">
                    {locale === 'sv' ? 'Priset baseras på kontorsstorlek, mängd utrustning, avstånd och komplexitet. Alla priser är fasta utan dolda avgifter. Försäkring ingår och ni får personlig projektledning från start till mål.' : 'The price is based on office size, amount of equipment, distance and complexity. All prices are fixed without hidden fees. Insurance is included and you get personal project management from start to finish.'}
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">{locale === 'sv' ? 'Så fungerar det' : 'How it works'}</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {(locale === 'sv' ? [
                        { icon: <FillFormLottie />, title: 'Fyll i formuläret', description: 'Berätta om era behov' },
                        { icon: <FastLottie />, title: 'Snabb offert', description: 'Få pris snabbt och enkelt' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personlig kontakt', description: 'Vi ringer samma dag eller dagen efter', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Signera & bekräfta', description: 'Boka digitalt', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Kontorsflytt utförd', description: 'Vi tar hand om allt', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><HappyCustomerLottie /></div>, title: 'Nöjd kund', description: 'Nytt kontor klart', containerClass: 'md:-mt-6' }
                      ] : [
                        { icon: <FillFormLottie />, title: 'Fill out the form', description: 'Tell us about your needs' },
                        { icon: <FastLottie />, title: 'Quick quote', description: 'Get price quickly and easily' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personal contact', description: 'We call the same day or the day after', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Sign & confirm', description: 'Book digitally', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Office move completed', description: 'We take care of everything', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><HappyCustomerLottie /></div>, title: 'Satisfied customer', description: 'New office ready', containerClass: 'md:-mt-6' }
                      ]).map((step: any, index: number) => (
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
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Läs mer om kontorsflytt' : 'Read more about office moving'}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {locale === 'sv' ? 'Tips för företag: planering av kontorsflytt, checklista för företagsflytt och hur ni minimerar störningar i verksamheten.' : 'Tips for companies: planning office moves, checklist for business moves and how to minimize disruptions to your business.'}
                </p>
              </div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/innanflyttfirmankommer.webp" alt={locale === 'sv' ? 'Seriös flyttfirma' : 'Serious moving company'} className="w-full h-64 md:h-full object-cover object-[center_40%] md:object-center" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">{locale === 'sv' ? 'Flytttips' : 'Moving Tips'}</span>
                      <span className="text-gray-500 text-sm ml-4">{locale === 'sv' ? '10 min läsning' : '10 min read'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Vad bör du tänka på när du väljer en seriös flyttfirma' : 'What to consider when choosing a serious moving company'}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {locale === 'sv' ? 'Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips för att identifiera en seriös och pålitlig flyttfirma som tar hand om dina ägodelar med omsorg.' : 'Choosing the right moving company is crucial for a smooth move. Here we share our most important tips for identifying a serious and reliable moving company that takes care of your belongings with care.'}
                    </p>
                    <div className="flex items-center justify-end mb-4">
                      <Link href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">
                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
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
                  {locale === 'sv' ? 'Se alla artiklar om flytt' : 'See all articles about moving'}
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Vanliga frågor om kontorsflytt' : 'Frequently Asked Questions about Office Moving'}</h2>
              <div className="space-y-4">
                {[
                  {
                    id: 'faq-1',
                    question: locale === 'sv' ? 'Vad kostar en kontorsflytt?' : 'How much does an office move cost?',
                    answer: locale === 'sv' ? 'Priset för kontorsflytt beror på flera faktorer: kontorsstorlek, mängd utrustning, avstånd mellan lokaler och komplexitet. Vi arbetar med löpande priser utan dolda kostnader och erbjuder en kostnadsfri offert där vi bedömer era specifika behov.' : 'The cost of an office move depends on several factors: office size, amount of equipment, distance between locations and complexity. We work with transparent pricing without hidden costs and offer a free quote where we assess your specific needs.'
                  },
                  {
                    id: 'faq-2',
                    question: locale === 'sv' ? 'Hur lång tid tar en kontorsflytt?' : 'How long does an office move take?',
                    answer: locale === 'sv' ? 'Tiden beror på kontorsstorlek och komplexitet. Mindre kontor kan ofta flyttas på en dag, medan större kontor kan ta flera dagar. Vi planerar noggrant för att minimera störningar i er verksamhet.' : 'The time depends on office size and complexity. Smaller offices can often be moved in one day, while larger offices can take several days. We plan carefully to minimize disruptions to your business.'
                  },
                  {
                    id: 'faq-3',
                    question: locale === 'sv' ? 'Arbetar ni utanför kontorstid?' : 'Do you work outside office hours?',
                    answer: locale === 'sv' ? 'Ja, vi kan utföra kontorsflytt kvällar och helger för att minimera störningar i er dagliga verksamhet. Detta är särskilt viktigt för företag som inte kan stänga under arbetsdagar.' : 'Yes, we can perform office moves evenings and weekends to minimize disruptions to your daily business. This is especially important for companies that cannot close during business days.'
                  },
                  {
                    id: 'faq-4',
                    question: locale === 'sv' ? 'Behöver vi packa själva innan kontorsflytten?' : 'Do we need to pack ourselves before the office move?',
                    answer: locale === 'sv' ? 'Nej, ni behöver inte packa själva om ni inte vill. Vi erbjuder ett tillvalspaket där vi sköter all packning åt er med professionellt material och lång erfarenhet av att packa kontorsutrustning på ett säkert sätt. Om ni föredrar kan ni självklart packa vissa delar själva och låta oss ta hand om resten.' : 'No, you don\'t need to pack yourself if you don\'t want to. We offer an optional package where we handle all packing for you with professional materials and extensive experience in packing office equipment safely. If you prefer, you can of course pack certain parts yourself and let us handle the rest.'
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