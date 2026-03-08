'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/contexts/LanguageContext'
import FlyttoffertForm from '@/app/components/FlyttoffertForm'
import StadningOffertFormCustomAkersberga from '@/app/components/StadningOffertFormCustomAkersberga'
import ReviewsWidget from '@/app/components/ReviewsWidget'
import LocationsCard from '@/app/components/LocationsCard'
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CountUp from "react-countup";
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

// Animation variants
const variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

// Lottie component functions (moved to module scope to avoid remounting on page re-renders)
function FillFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch("/happycustomer.json").then((res) => res.json()).then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
}

export default function FlyttstadningPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [openFAQFlyttstadning, setOpenFAQFlyttstadning] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Vår erfarenhet (mobile slider)
  const [currentExperienceCard, setCurrentExperienceCard] = useState(0);
  const experienceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expTouchStartXRef = useRef<number | null>(null);
  const expTouchCurrentXRef = useRef<number | null>(null);
  const totalExperienceCards = 3;
  const restartExperienceAutoSlide = () => {
    if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);
    experienceIntervalRef.current = setInterval(() => {
      setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards);
    }, 3000);
  };
  useEffect(() => {
    restartExperienceAutoSlide();
    return () => {
      if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);
    };
  }, [totalExperienceCards]);

  const restartFeatureAutoSlide = () => {
    if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    featureIntervalRef.current = setInterval(() => {
      setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards);
    }, 4000);
  };

  useEffect(() => {
    restartFeatureAutoSlide();
    return () => {
      if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    };
  }, [totalFeatureCards]);
  const toggleFAQFlyttstadning = (id: string) => {
    setOpenFAQFlyttstadning(openFAQFlyttstadning === id ? null : id);
  };

  const locations = [
    { name: "Åkersberga", slug: "akersberga" },
    { name: "Älvsjö", slug: "alvsjo" },
    { name: "Årsta", slug: "arsta" },
    { name: "Botkyrka", slug: "botkyrka" },
    { name: "Bromma", slug: "bromma" },
    { name: "Bro", slug: "bro" },
    { name: "Danderyd", slug: "danderyd" },
    { name: "Ekerö", slug: "ekero" },
    { name: "Enskede", slug: "enskede" },
    { name: "Farsta", slug: "farsta" },
    { name: "Hägersten", slug: "hagersten" },
    { name: "Haninge", slug: "haninge" },
    { name: "Huddinge", slug: "huddinge" },
    { name: "Järfälla", slug: "jarfalla" },
    { name: "Kista", slug: "kista" },
    { name: "Kungsholmen", slug: "kungsholmen" },
    { name: "Kungsängen", slug: "kungsangen" },
    { name: "Lidingö", slug: "lidingo" },
    { name: "Märsta", slug: "marsta" },
    { name: "Nacka", slug: "nacka" },
    { name: "Norrmalm", slug: "norrmalm" },
    { name: "Nynäshamn", slug: "nynashamn" },
    { name: "Östermalm", slug: "ostermalm" },
    { name: "Salem", slug: "salem" },
    { name: "Skärholmen", slug: "skarholmen" },
    { name: "Södermalm", slug: "sodermalm" },
    { name: "Södertälje", slug: "sodertalje" },
    { name: "Solna", slug: "solna" },
    { name: "Sollentuna", slug: "sollentuna" },
    { name: "Spånga", slug: "spanga" },
    { name: "Sundbyberg", slug: "sundbyberg" },
    { name: "Täby", slug: "taby" },
    { name: "Tumba", slug: "tumba" },
    { name: "Tyresö", slug: "tyreso" },
    { name: "Upplands Väsby", slug: "upplands-vasby" },
    { name: "Vallentuna", slug: "vallentuna" },
    { name: "Varmdö", slug: "varmdo" },
    { name: "Vasastan", slug: "vasastan" },
    { name: "Västerhaninge", slug: "vasterhaninge" }
  ];

  // Lottie helpers are defined at module scope above
  const { t, locale } = useLanguage();

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section - Matching bohagsflytt design */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          
          {/* Mobile: Hero content after form removed per request */}
          
          {/* Mobile: Hero section */}
          <div className="md:hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ 
                  backgroundImage: 'url(/cleaning_background.png)',
                  backgroundPosition: 'center 50%'
                }}
              />
              <div className="relative z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  {t('flyttstadning.hero.title')}
                </h1>
                <p className="text-xl mb-6">
                  {t('flyttstadning.hero.subtitle')}
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
                  backgroundImage: 'url(/cleaning_background.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    {t('flyttstadning.hero.title')}
                  </h1>
                  <p className="text-2xl md:text-3xl mb-12">
                    {t('flyttstadning.hero.subtitle')}
                  </p>
                  <p className="text-lg text-white/90">
                    {t('flyttstadning.hero.description')}
                  </p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} />
                  )}
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
                    <span className="text-sm font-medium mb-2">Läs mer</span>
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

        {/* What is Flyttstädning Section */}
        <section id="content" className="relative py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
				<div className="max-w-7xl mx-auto relative">
              {/* Main content - Centered */}
              <motion.div
                className="space-y-12 md:space-y-16"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {/* Main content sections */}
                {([
                  {
                    title: t('flyttstadning.content.whatIsTitle'),
                    content: t('flyttstadning.content.whatIsDescription'),
                    icon: '✨',
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/cleaning_background.webp" alt={locale === 'sv' ? 'Flyttstädning' : 'Move-out cleaning'} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: '',
                  },
                  {
                    title: t('flyttstadning.content.pricingTitle'),
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">
                          {t('flyttstadning.content.pricingDescription')}
                        </p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            "{t('flyttstadning.content.pricingTestimonial')}"
                          </p>
                          <p className="italic text-gray-700 mt-2">- {t('flyttstadning.content.testimonialAuthor')}</p>
                        </div>
                      </>
                    ),
                    icon: '💸',
                  },
                  {
                    title: t('flyttstadning.content.includesTitle'),
                    content: t('flyttstadning.content.includesDescription'),
                    icon: '🧹',
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/flyttstad_intro.webp" alt={locale === 'sv' ? 'Städmaterial' : 'Cleaning supplies'} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover object-[center_85%]" />
                      </div>
                    ),
                    icon: '',
                  },
                  {
                    title: t('flyttstadning.content.guaranteeTitle'),
                    content: t('flyttstadning.content.guaranteeDescription'),
                    icon: '✅',
                  },
                  {
                    title: t('flyttstadning.content.checklistTitle'),
                    content: (
                      <div>
                        <ul className="list-disc pl-5 space-y-2">
                          {locale === 'sv' ? [
                            <li key="1"><strong>Stäng av och frosta av kyl och frys:</strong> Gör detta minst en dag innan städningen för bästa resultat.</li>,
                            <li key="2"><strong>Rensa vattenlås:</strong> Ta bort eventuella blockeringar för att underlätta rengöringen.</li>,
                            <li key="3"><strong>Dra ut vitvaror:</strong> Om du vill att vi rengör bakom kyl, frys, spis eller tvättmaskin.</li>,
                            <li key="4"><strong>Töm alla rum:</strong> Se till att alla rum är tomma från möbler och personliga tillhörigheter.</li>,
                            <li key="5"><strong>Lämna nycklar:</strong> Se till att vi har tillgång till bostaden på städdagen.</li>,
                            <li key="6"><strong>Kommunicera specialkrav:</strong> Informera oss om eventuella särskilda behov eller känsliga ytor.</li>
                          ] : [
                            <li key="1"><strong>Turn off and defrost refrigerator and freezer:</strong> Do this at least one day before cleaning for best results.</li>,
                            <li key="2"><strong>Clean drains:</strong> Remove any blockages to facilitate cleaning.</li>,
                            <li key="3"><strong>Pull out appliances:</strong> If you want us to clean behind refrigerator, freezer, stove or washing machine.</li>,
                            <li key="4"><strong>Empty all rooms:</strong> Make sure all rooms are empty of furniture and personal belongings.</li>,
                            <li key="5"><strong>Leave keys:</strong> Make sure we have access to the home on cleaning day.</li>,
                            <li key="6"><strong>Communicate special requirements:</strong> Inform us of any special needs or sensitive surfaces.</li>
                          ]}
                        </ul>
                      </div>
                    ),
                    icon: '📋',
                  },
                ] as { title: string; content: any; icon: string; image?: string }[]).map((section, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <div className="max-w-6xl mx-auto">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">
                          {section.title}
              </h3>
                        {typeof section.content === 'string' ? (
                          <p className={`text-gray-700 leading-relaxed px-4 ${section.title === 'Vad är flyttstädning?' || section.title === 'Vad ingår i flyttstädning?' || section.title === '14 dagars nöjd kund-garanti' || section.title === 'Förberedelser inför flyttstädning' ? 'text-lg md:text-xl lg:text-2xl text-left md:text-center' : 'text-base md:text-lg lg:text-xl'}`}>
                            {section.content}
                          </p>
                        ) : (
                          <div className="text-gray-700 leading-relaxed text-base md:text-lg lg:text-xl">
                            {section.content}
                          </div>
                        )}
                      </div>
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
              backgroundImage: 'url(/cleaning_background.png)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center 70%', 
              zIndex: 0 
            }} 
          />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{ 
                 background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' 
               }} 
          />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{ 
                 background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' 
               }} 
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div 
              initial="initial" 
              whileInView="animate" 
              viewport={{ once: true }}
            >
              {/* Mobile image above title to match Bohagsflytt */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/omflyttella_flyttstad.webp" alt={t('flyttstadning.about.imageAlt')} className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('flyttstadning.about.title')}</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                {/* Left: Image - desktop only (mobile image moved below section) */}
                <motion.div 
                  className="hidden lg:block w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" 
                  initial="initial" 
                  whileInView="animate" 
                  viewport={{ once: true, amount: 0.2 }} 
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                    <img src="/omflyttella_flyttstad.webp" 
                      alt={t('flyttstadning.about.imageAlt')} 
                      className="object-cover rounded-2xl w-full h-full" 
                      style={{ objectPosition: '80% 25%', transform: 'scale(1.10)' }} 
                    />
                  </div>
                </motion.div>
                {/* Right: Text content with mobile Läs mer behavior (match bohagsflytt) */}
                    <motion.div 
                  className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center"
                      initial="initial" 
                      whileInView="animate" 
                      viewport={{ once: true, amount: 0.2 }} 
                      variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.4 }}
                    >
                  {/* Desktop: full text */}
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                        {t('flyttstadning.about.description1')}
                      </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                        {t('flyttstadning.about.description2')}
                      </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                        {t('flyttstadning.about.description3')}
                      </p>
                  </div>
                  {/* Mobile: short text with expand */}
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    {locale === 'sv' 
                      ? 'Flyttella är en av Stockholms ledande aktörer inom flyttstädning med över 8 års erfarenhet flyttstädning, hemstädning och kontorsstädning.'
                      : 'Flyttella is one of Stockholm\'s leading players in move-out cleaning with over 8 years of experience in move-out cleaning, home cleaning and office cleaning.'
                    }
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {locale === 'sv' 
                        ? 'Vi erbjuder 14 dagars städgaranti, fasta priser och personlig service – alltid anpassat efter dina behov.'
                        : 'We offer 14-day cleaning guarantee, fixed prices and personal service – always adapted to your needs.'
                      }
                    </p>
                    {!showFullAboutText && (
                      <button
                        onClick={() => setShowFullAboutText(true)}
                        className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
                      >
                        {t('flyttstadning.about.readMore')}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                    {showFullAboutText && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 mt-4"
                      >
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                          {t('flyttstadning.about.description2')}
                        </p>
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                          {t('flyttstadning.about.description3')}
                        </p>
                        <motion.div
                          className="pt-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Link 
                          href="/om-oss" 
                          className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
                        >
                          {locale === 'sv' ? 'Läs mer om oss' : 'Read more about us'}
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
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vad tycker våra kunder om oss */}
        <ReviewsWidget 
          location="Stockholm"
          title={t('flyttstadning.reviews.title')}
          subtitle={t('flyttstadning.reviews.subtitle')}
          description={t('flyttstadning.reviews.description')}
          badgeAlt={t('flyttstadning.reviews.badgeAlt')}
          arrowText={t('flyttstadning.reviews.arrowText')}
        />

        {/* Redo att börja din flyttstädning? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center"
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🧹</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
                    {t('flyttstadning.cta.title')}
                  </h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">
                    {t('flyttstadning.cta.subtitle')}
                  </p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link 
                    href="/offert"
                    className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
                  >
                    {t('flyttstadning.cta.button')}
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
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                {t('flyttstadning.services.title')}
              </h2>
              <div className="grid grid-cols-1 gap-12">
              {/* Bohagsflytt Card */}
              <motion.div
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]"
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
                <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                  <span className="text-4xl md:text-6xl">🏠</span>
                  <h3 className="text-3xl md:text-5xl font-bold text-white">
                    {t('flyttstadning.services.bohagsflytt.title')}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
                  {t('flyttstadning.services.bohagsflytt.description')}
                </p>
                <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                  {t('flyttstadning.services.bohagsflytt.extendedDescription')}
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/bohagsflytt" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg"
                    >
                      {t('flyttstadning.services.bohagsflytt.readMore')}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" 
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
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]"
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
                <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                  <span className="text-4xl md:text-6xl">🏢</span>
                  <h3 className="text-3xl md:text-5xl font-bold text-white">
                    {t('flyttstadning.services.magasinering.title')}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
                  {t('flyttstadning.services.magasinering.description')}
                </p>
                <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                  {t('flyttstadning.services.magasinering.extendedDescription')}
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/magasinering" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg"
                    >
                      {t('flyttstadning.services.bohagsflytt.readMore')}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" 
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
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]"
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
                <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                  <span className="text-4xl md:text-6xl">📦</span>
                  <h3 className="text-3xl md:text-5xl font-bold text-white">
                    {t('flyttstadning.services.packhjalp.title')}
              </h3>
                </div>
                <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
                  {t('flyttstadning.services.packhjalp.description')}
                </p>
                <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                  {t('flyttstadning.services.packhjalp.extendedDescription')}
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/barhjalp" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg"
                    >
                      {t('flyttstadning.services.bohagsflytt.readMore')}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" 
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

        {/* Additional Service Cards - desktop only */}
        <section className="py-4 bg-white hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {/* Montering */}
                <motion.div
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative">
                    <span className="text-3xl">🔧</span>
                    <h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Montering' : 'Assembly'}</h3>
                  </div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Säker montering och demontering av möbler och vitvaror. Vi säkerställer att allt monteras korrekt och säkert.' : 'Safe assembly and disassembly of furniture and appliances. We ensure everything is mounted correctly and safely.'}</p>
                  <div className="mt-auto relative">
                    <Link href="/montering" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">
                      {locale === 'sv' ? 'Läs mer' : 'Read more'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </motion.div>

                {/* Bortforsling */}
                <motion.div
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative">
                    <span className="text-3xl">🗑️</span>
                    <h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Bortforsling' : 'Disposal'}</h3>
                  </div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Professionell bortforsling av möbler och bohag som inte längre behövs. Miljövänlig hantering.' : 'Professional disposal of furniture and belongings you no longer need. Eco-friendly handling.'}</p>
                  <div className="mt-auto relative">
                    <Link href="/bortforsling" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">
                      {locale === 'sv' ? 'Läs mer' : 'Read more'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </motion.div>

                {/* Bärhjälp */}
                <motion.div
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative">
                    <span className="text-3xl">💪</span>
                    <h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Bärhjälp' : 'Carrying assistance'}</h3>
                  </div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Extra hjälp vid flytt för tunga och stora föremål. Vi hjälper dig med det tunga lyftet.' : 'Extra help for heavy and large items during moves. We handle the heavy lifting.'}</p>
                  <div className="mt-auto relative">
                    <Link href="/barhjalp" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">
                      {locale === 'sv' ? 'Läs mer' : 'Read more'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
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
                transition={{ duration: 0.8, delay: 0 }}
                id="upptack-tjanster"
              >
                {t('flyttstadning.features.title')}
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-[#0F172A]/90"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0 }}
              >
                {t('flyttstadning.features.description')}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/tjanster" 
                    className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                  >
                    {t('flyttstadning.features.flyttServicesButton')}
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
                    href="/stadtjanster" 
                    className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                  >
                  {t('flyttstadning.features.cleaningServicesButton')}
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
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('flyttstadning.benefits.title')}</h2>
              <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{featureTouchStartXRef.current=e.touches[0].clientX; if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);}} onTouchMove={(e)=>featureTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (featureTouchStartXRef.current!=null && featureTouchCurrentXRef.current!=null){ const dx=featureTouchCurrentXRef.current-featureTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentFeatureCard((prev)=>(prev+1)%totalFeatureCards);} else { setCurrentFeatureCard((prev)=>(prev-1+totalFeatureCards)%totalFeatureCards);} restartFeatureAutoSlide(); } } featureTouchStartXRef.current=null; featureTouchCurrentXRef.current=null; }}>
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}
                >
                  {(locale === 'sv' ? [
                    { icon: "💰", title: "Fast pris", description: "Inga överraskningar - vi erbjuder både fasta priser och möjlighet till löpande priser", link: "/priser" },
                    { icon: "📋", title: "RUT-avdrag", description: "Vi hanterar allt pappersarbete för RUT-avdrag", link: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html" },
                    { icon: "✅", title: "14 dagars städgaranti", description: "Vi är så säkra på vår kvalitet att vi erbjuder 14 dagars nöjd kund-garanti", link: "/garanti" },
                    { icon: "⏰", title: "Omboka eller avboka kostnadsfritt", description: "Omboka eller avboka kostnadsfritt upp till 24 timmar innan städningen", link: "/avbokning" },
                    { icon: "🔒", title: "Tillstånd och försäkring", description: "Alla nödvändiga tillstånd och försäkringar på plats", link: "/tillstand" },
                    { icon: "🎓", title: "Utbildad personal", description: "Vår personal är utbildad för att säkerställa högsta kvalitet och service.", link: "/om-oss" },
                    { icon: "🧴", title: "Miljövänliga produkter", description: "Vi använder miljövänliga och säkra rengöringsmedel", link: "/om-oss" },
                    { icon: "📈", title: "Ledningssystem", description: "Vi arbetar med effektiva ledningssystem för att garantera struktur och kvalitet.", link: "/om-oss" },
                    { icon: "🦺", title: "Arbetsmiljö", description: "Vi prioriterar en trygg och säker arbetsmiljö för både kunder och personal.", link: "/om-oss" }
                  ] : [
                    { icon: "💰", title: "Fixed price", description: "No surprises - we offer both fixed prices and the possibility of ongoing prices", link: "/priser" },
                    { icon: "📋", title: "RUT deduction", description: "We handle all paperwork for RUT deduction", link: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html" },
                    { icon: "✅", title: "14-day cleaning guarantee", description: "We are so confident in our quality that we offer a 14-day satisfied customer guarantee", link: "/garanti" },
                    { icon: "⏰", title: "Reschedule or cancel free of charge", description: "Reschedule or cancel free of charge up to 24 hours before cleaning", link: "/avbokning" },
                    { icon: "🔒", title: "Permits and insurance", description: "All necessary permits and insurance in place", link: "/tillstand" },
                    { icon: "🎓", title: "Trained staff", description: "Our staff is trained to ensure the highest quality and service.", link: "/om-oss" },
                    { icon: "🧴", title: "Eco-friendly products", description: "We use eco-friendly and safe cleaning products", link: "/om-oss" },
                    { icon: "📈", title: "Management system", description: "We work with effective management systems to guarantee structure and quality.", link: "/om-oss" },
                    { icon: "🦺", title: "Work environment", description: "We prioritize a safe and secure work environment for both customers and staff.", link: "/om-oss" }
                  ]).map((feature, index) => (
                    <div key={feature.icon} className="w-full flex-shrink-0">
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                        <div className="flex items-start gap-3 h-full">
                          <span className="text-2xl">{feature.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm mb-2">{feature.description}</p>
                            {feature.title === 'RUT-avdrag' ? (
                              <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm inline-flex items-center">
                                {t('flyttstadning.services.bohagsflytt.readMore')}
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </a>
                            ) : (
                              <div className="h-6" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Arrow controls */}
                <button type="button" aria-label="Föregående" onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button type="button" aria-label="Nästa" onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4">
          <img src="/varafarmaner_flyttstad.webp"
            alt={t('flyttstadning.benefits.imageAlt')}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Responsive zoom wrapper for wide screens */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  {/* Left side - Features content */}
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">{t('flyttstadning.benefits.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {(locale === 'sv' ? [
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
                          icon: "✅",
                          title: "14 dagars städgaranti",
                          description: "Vi är så säkra på vår kvalitet att vi erbjuder 14 dagars nöjd kund-garanti",
                          link: "/garanti"
                        },
                        {
                          icon: "⏰",
                          title: "Omboka eller avboka kostnadsfritt",
                          description: "Omboka eller avboka kostnadsfritt upp till 24 timmar innan städningen",
                          link: "/avbokning"
                        },
                        {
                          icon: "🔒",
                          title: "Tillstånd och försäkring",
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
                          icon: "🧴",
                          title: "Miljövänliga produkter",
                          description: "Vi använder miljövänliga och säkra rengöringsmedel",
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
                      ] : [
                        {
                          icon: "💰",
                          title: "Fixed price",
                          description: "No surprises - we offer both fixed prices and the possibility of ongoing prices",
                          link: "/priser"
                        },
                        {
                          icon: "📋",
                          title: "RUT deduction",
                          description: "We handle all paperwork for RUT deduction",
                          link: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html"
                        },
                        {
                          icon: "✅",
                          title: "14-day cleaning guarantee",
                          description: "We are so confident in our quality that we offer a 14-day satisfied customer guarantee",
                          link: "/garanti"
                        },
                        {
                          icon: "⏰",
                          title: "Reschedule or cancel free of charge",
                          description: "Reschedule or cancel free of charge up to 24 hours before cleaning",
                          link: "/avbokning"
                        },
                        {
                          icon: "🔒",
                          title: "Permits and insurance",
                          description: "All necessary permits and insurance in place",
                          link: "/tillstand"
                        },
                        {
                          icon: "🎓",
                          title: "Trained staff",
                          description: "Our staff is trained to ensure the highest quality and service.",
                          link: "/om-oss"
                        },
                        {
                          icon: "🧴",
                          title: "Eco-friendly products",
                          description: "We use eco-friendly and safe cleaning products",
                          link: "/om-oss"
                        },
                        {
                          icon: "📈",
                          title: "Management system",
                          description: "We work with effective management systems to guarantee structure and quality.",
                          link: "/om-oss"
                        },
                        {
                          icon: "🦺",
                          title: "Work environment",
                          description: "We prioritize a safe and secure work environment for both customers and staff.",
                          link: "/om-oss"
                        }
                      ]).map((feature, i) => (
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
                            {feature.title === 'RUT-avdrag' ? (
                              <a 
                                href={feature.link}
                                target={feature.link.startsWith('http') ? '_blank' : undefined}
                                rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center"
                              >
                                {t('flyttstadning.services.bohagsflytt.readMore')}
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </a>
                            ) : (
                              <div className="h-6 md:h-7" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch">
                      <img src="/cleaning_lady.webp"
                        alt="Städpersonal i Stockholm - Flyttella"
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

        {/* Redo att börja din flyttstädning? */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12 -mb-12 md:-mb-16">
          <div className="mx-auto px-4">
            <motion.div
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-xl md:max-w-3xl mx-auto text-center"
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🧹</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
                    {t('flyttstadning.cta.title')}
                  </h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">
                    {t('flyttstadning.cta.subtitle')}
                  </p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link 
                    href="/offert"
                    className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
                  >
                    {t('flyttstadning.cta.button')}
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
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vår erfarenhet */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/our_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('flyttstadning.experience.title')}</h3>
              {/* Mobile: auto-sliding cards like main page */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{expTouchStartXRef.current=e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);}} onTouchMove={(e)=>expTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (expTouchStartXRef.current!=null && expTouchCurrentXRef.current!=null){ const dx=expTouchCurrentXRef.current-expTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentExperienceCard((prev)=>(prev+1)%totalExperienceCards);} else { setCurrentExperienceCard((prev)=>(prev-1+totalExperienceCards)%totalExperienceCards);} restartExperienceAutoSlide(); } } expTouchStartXRef.current=null; expTouchCurrentXRef.current=null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {(locale === 'sv' ? [
                      { title: 'Flyttstädningar', count: 7000, description: 'uppdrag utförda' },
                      { title: 'Hemstädningar', count: 5000, description: 'uppdrag utförda' },
                      { title: 'Företagsstädningar', count: 2000, description: 'uppdrag utförda' },
                    ] : [
                      { title: 'Move-out cleanings', count: 7000, description: 'assignments completed' },
                      { title: 'Home cleanings', count: 5000, description: 'assignments completed' },
                      { title: 'Office cleanings', count: 2000, description: 'assignments completed' },
                    ]).map((card, index) => (
                      <div key={card.title} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h4 className="text-lg font-bold mb-1 text-white">{card.title}</h4>
                            <div className="text-4xl font-bold mb-1 text-white"><CountUp end={card.count} duration={2.0} suffix="+" /></div>
                            <p className="text-white/90 text-sm">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Arrow controls */}
                  <button type="button" aria-label="Föregående" onClick={() => { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </button>
                  <button type="button" aria-label="Nästa" onClick={() => { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>
              </div>

              {/* Desktop: keep existing grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">{locale === 'sv' ? 'Flyttstädningar' : 'Move-out cleanings'}</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={7000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justifyCenter h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">{locale === 'sv' ? 'Hemstädningar' : 'Home cleanings'}</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={5000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">{locale === 'sv' ? 'Företagsstädningar' : 'Office cleanings'}</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={2000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('flyttstadning.experience.localExperienceTitle')}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    {t('flyttstadning.experience.localExperienceDescription')}
                  </p>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  {/* Mobile pyramid layout */}
                  <div className="md:hidden flex flex-col items-center">
                    {/* Top badge */}
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image
                        src="/1000reviewspicture.png"
                        alt="1000+ positiva recensioner från kunder"
                        width={200}
                        height={200}
                        className="object-contain h-36 w-36"
                        priority={false}
                      />
                    </motion.div>
                    {/* Bottom row */}
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/recommendedcompany2.png"
                          alt="Rekommenderad flyttstädfirma - Flyttella"
                          width={160}
                          height={160}
                          className="object-contain h-32 w-32"
                          priority={false}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/bestinswedenbadge-modified.png"
                          alt="Top 10 flyttstädfirma - Flyttella"
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
                      alt="Rekommenderad flyttstädfirma - Flyttella"
                      width={240}
                      height={240}
                      className="object-contain h-60 w-60"
                      priority={false}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/1000reviewspicture.png"
                      alt="1000+ positiva recensioner från kunder"
                      width={260}
                      height={260}
                      className="object-contain h-64 w-64 mt-3"
                      priority={false}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/bestinswedenbadge-modified.png"
                      alt="Top 10 flyttstädfirma - Flyttella"
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  {t('flyttstadning.process.title')}
            </h2>

                {/* Process Description */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('flyttstadning.process.description')}
                  </p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">
                    Våra offerter är alltid baserade på dina specifika behov och omständigheter. Vi tar hänsyn till faktorer som boyta, antal rum, tillgänglighet och städkrav för att ge dig en offert som passar just din situation. Alla priser är fasta utan dolda avgifter - vi utgår alltid från dina önskemål och information vi får från dig som kund. Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.
                  </p>
                </div>

                {/* Process Flow Section */}
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">Så fungerar det</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        {
                          icon: <FillFormLottie />,
                          title: "Fyll i formuläret",
                          description: "Berätta om din städning",
                          textClass: ""
                        },
                        {
                          icon: <FastLottie />,
                          title: "Snabb offert",
                          description: "Få pris på 1 minut",
                          textClass: ""
                        },
                        {
                            icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
                          title: "Personlig kontakt",
                          description: "Vi ringer samma dag eller dagen efter",
                            containerClass: "md:-mt-7",
                          textClass: ""
                        },
                        {
                            icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
                          title: "Signera & bekräfta",
                          description: "Få bokningsbekräftelse direkt",
                            containerClass: "md:-mt-6",
                          textClass: ""
                        },
                        {
                            icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
                          title: "Städning genomförd",
                          description: "Vi tar hand om allt - från start till slut",
                            containerClass: "md:-mt-14",
                            textClass: "md:-mt-8",
                        },
                        {
                            icon: <div className="md:mt-0"><HappyCustomerLottie /></div>,
                          title: "Nöjd kund",
                          description: "Återkommande kund",
                            containerClass: "md:-mt-6",
                          textClass: ""
                        }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                            className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 h-full min-h-[160px] md:min-h-0"
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.2 }}
                          variants={fadeInUp}
                          custom={index}
                        >
                          {/* Timeline dot */}
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
          {/* White gradient fade to blend into next section */}
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20}} />
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                  {t('flyttstadning.blog.title')}
            </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('flyttstadning.blog.subtitle')}
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
                    <img src="/cleaning_lady.webp" 
                      alt={t('flyttstadning.blog.imageAlt')} 
                      className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t('flyttstadning.blog.category')}
                      </span>
                      <span className="text-gray-500 text-sm ml-4">{t('flyttstadning.blog.readingTime')}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
                      {t('flyttstadning.blog.articleTitle')}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {t('flyttstadning.blog.articleDescription')}
                    </p>
                    <div className="flex items-center justify-end mb-4">
                      <Link 
                        href="/blogg/flyttstadning-vad-du-behover-veta" 
                        className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group"
                      >
                        {t('flyttstadning.blog.readMore')}
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
              <div className="text-center mt-8 md:mt-12">
                      <Link 
                        href="/blogg" 
                  className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base"
                      >
                        {t('flyttstadning.blog.seeAllArticles')}
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
          </div>
        </section>

        {/* FAQ Section: Vanliga frågor om flyttstädning */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Vad är flyttstädning?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Flyttstädning är en grundlig städning av en bostad som ska lämnas, ofta krävd av hyresvärdar eller köpare för att säkerställa att bostaden lämnas i perfekt skick.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Hur lång tid tar flyttstädning?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Tiden beror på bostadens storlek och tillstånd. En normal lägenhet tar oftast några timmar, medan större villor kan ta en hel dag eller mer.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Vad kostar flyttstädning?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Priset varierar beroende på boyta, antal rum, tillstånd och specifika krav. Begär en offert för ett exakt pris baserat på dina behov.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Ingår städgaranti?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Ja, vi erbjuder 14 dagars städgaranti. Om hyresvärden eller köparen inte är nöjd kan vi komma tillbaka och fixa det utan extra kostnad.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Vilka produkter använder ni?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Vi använder miljövänliga och professionella rengöringsmedel som är säkra för både människor och miljön, samtidigt som de ger utmärkta resultat.'
                }
              }
            ]
          })}} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                {t('flyttstadning.faq.title')}
          </h2>
              <div className="space-y-4">
                {(locale === 'sv' ? [
                  {
                    id: "stadning-1",
                    question: "Hur förbereder jag mig bäst inför flyttstädning?",
                    answer: "Börja med att rensa ut allt du inte längre behöver. Ta bort alla personliga föremål och lösöre. Se till att alla ytor är tillgängliga för städning. Informera oss om eventuella särskilda krav från hyresvärden eller köparen, och boka städning i god tid för att säkerställa tillgänglighet."
                  },
                  {
                    id: "stadning-2",
                    question: "Vad ingår vanligtvis i en flyttstädning?",
                    answer: "En grundlig flyttstädning inkluderar städning av alla ytor, golv, väggar, tak, fönster, kök, badrum och toaletter. Vi rengör även vitvaror, skåp, lådor och alla hårdgjorda ytor. Städningen följer branschstandarder och säkerställer att bostaden lämnas i perfekt skick enligt vanliga krav."
                  },
                  {
                    id: "stadning-3",
                    question: "Hur fungerar städgarantin?",
                    answer: "Vår 14-dagars städgaranti innebär att om hyresvärden eller köparen inte är nöjd med städningen, kommer vi tillbaka och fixar eventuella brister utan extra kostnad. Detta ger dig trygghet och säkerställer att du får den kvalitet du betalar för."
                  },
                  {
                    id: "stadning-4",
                    question: "Hur lång tid tar flyttstädning och vad påverkar tidsåtgången?",
                    answer: "Tidsåtgången beror på flera faktorer: bostadens storlek, antal rum, tillstånd, tillgänglighet och eventuella särskilda krav. En normal lägenhet tar oftast några timmar, medan större villor kan ta en hel dag eller mer. Vi ger dig alltid en realistisk tidsuppskattning innan vi börjar."
                  },
                  {
                    id: "stadning-5",
                    question: "Kan ni anpassa städningen efter specifika krav?",
                    answer: "Ja, vi kan anpassa städningen efter dina specifika behov och eventuella krav från hyresvärden eller köparen. Vi har erfarenhet av olika städkrav och kan säkerställa att städningen uppfyller alla förväntningar. Kontakta oss för att diskutera dina specifika behov."
                  }
                ] : [
                  {
                    id: "stadning-1",
                    question: "How do I best prepare for move-out cleaning?",
                    answer: "Start by clearing out everything you no longer need. Remove all personal items and loose property. Make sure all surfaces are accessible for cleaning. Inform us of any special requirements from the landlord or buyer, and book cleaning well in advance to ensure availability."
                  },
                  {
                    id: "stadning-2",
                    question: "What is usually included in a move-out cleaning?",
                    answer: "A thorough move-out cleaning includes cleaning of all surfaces, floors, walls, ceilings, windows, kitchen, bathroom and toilets. We also clean appliances, cabinets, drawers and all hard surfaces. The cleaning follows industry standards and ensures that the home is left in perfect condition according to common requirements."
                  },
                  {
                    id: "stadning-3",
                    question: "How does the cleaning guarantee work?",
                    answer: "Our 14-day cleaning guarantee means that if the landlord or buyer is not satisfied with the cleaning, we will come back and fix any deficiencies at no extra cost. This gives you security and ensures that you get the quality you pay for."
                  },
                  {
                    id: "stadning-4",
                    question: "How long does move-out cleaning take and what affects the time required?",
                    answer: "The time required depends on several factors: the home's size, number of rooms, condition, accessibility and any special requirements. A normal apartment usually takes a few hours, while larger villas can take a full day or more. We always give you a realistic time estimate before we start."
                  },
                  {
                    id: "stadning-5",
                    question: "Can you adapt the cleaning to specific requirements?",
                    answer: "Yes, we can adapt the cleaning to your specific needs and any requirements from the landlord or buyer. We have experience with different cleaning requirements and can ensure that the cleaning meets all expectations. Contact us to discuss your specific needs."
                  }
                ]).map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => toggleFAQFlyttstadning(faq.id)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFAQFlyttstadning === faq.id ? 180 : 0 }}
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
                        height: openFAQFlyttstadning === faq.id ? "auto" : 0,
                        opacity: openFAQFlyttstadning === faq.id ? 1 : 0
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
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            {t('flyttstadning.faq.moreQuestions')}
          </p>
          <Link 
            href="/faq" 
            className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
          >
            {t('flyttstadning.faq.seeAllQuestions')}
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
      <LocationsCard locations={locations} />
    </main>
  );
} 