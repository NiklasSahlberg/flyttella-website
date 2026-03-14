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

// Lottie component functions
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

function CleanHomeLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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

export default function KontorsstadningPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Experience cards (mobile slider)
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
    return () => { if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); };
  }, [totalExperienceCards]);

  const restartFeatureAutoSlide = () => {
    if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    featureIntervalRef.current = setInterval(() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); }, 4000);
  };
  useEffect(() => {
    restartFeatureAutoSlide();
    return () => { if (featureIntervalRef.current) clearInterval(featureIntervalRef.current); };
  }, [totalFeatureCards]);

  const toggleFAQ = (id: string) => setOpenFAQ(openFAQ === id ? null : id);

  const locations = [
    { name: 'Åkersberga', slug: 'akersberga' },
    { name: 'Älvsjö', slug: 'alvsjo' },
    { name: 'Årsta', slug: 'arsta' },
    { name: 'Bromma', slug: 'bromma' },
    { name: 'Danderyd', slug: 'danderyd' },
    { name: 'Ekerö', slug: 'ekero' },
    { name: 'Hägersten', slug: 'hagersten' },
    { name: 'Haninge', slug: 'haninge' },
    { name: 'Huddinge', slug: 'huddinge' },
    { name: 'Järfälla', slug: 'jarfalla' },
    { name: 'Kista', slug: 'kista' },
    { name: 'Kungsholmen', slug: 'kungsholmen' },
    { name: 'Lidingö', slug: 'lidingo' },
    { name: 'Nacka', slug: 'nacka' },
    { name: 'Norrmalm', slug: 'norrmalm' },
    { name: 'Östermalm', slug: 'ostermalm' },
    { name: 'Sollentuna', slug: 'sollentuna' },
    { name: 'Solna', slug: 'solna' },
    { name: 'Täby', slug: 'taby' },
    { name: 'Vasastan', slug: 'vasastan' }
  ];

  const { t, locale } = useLanguage();

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
      {/* Hero Section */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          
          {/* Mobile: Hero content after form removed per request */}
          
          {/* Mobile: Hero section */}
          <div className="md:hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ 
                  backgroundImage: 'url(/nystadat_kontor.png)',
                  backgroundPosition: 'center 50%'
                }}
              />
              <div className="relative z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  {t('kontorsstadning.hero.title')}
                </h1>
                <p className="text-xl mb-6">
                  {t('kontorsstadning.hero.subtitle')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/nystadat_kontor.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">{t('kontorsstadning.hero.title')}</h1>
                  <p className="text-2xl md:text-3xl mb-12">{t('kontorsstadning.hero.subtitle')}</p>
                  <p className="text-lg text-white/90">{t('kontorsstadning.hero.description')}</p>
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

        {/* What is Kontorsstädning Section */}
        <section id="content" className="relative py-6 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>

                {/* Main content sections */}
                {([
                  {
                    title: t('kontorsstadning.content.whatIsTitle'),
                    content: t('kontorsstadning.content.whatIsDescription'),
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/nystadat_kontor2.webp" alt={locale === 'sv' ? 'Kontorsstädning' : 'Office cleaning'} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: t('kontorsstadning.content.pricingTitle'),
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">{t('kontorsstadning.content.pricingDescription')}</p>
                        <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;{t('kontorsstadning.content.pricingTestimonial')}&quot;</p><p className="italic text-gray-700 mt-2">- {t('kontorsstadning.content.testimonialAuthor')}</p></div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: t('kontorsstadning.content.includesTitle'),
                    content: t('kontorsstadning.content.includesDescription'),
                    icon: '🏢'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/nystadat_kontor.webp" alt={locale === 'sv' ? 'Kontorsstädning service' : 'Office cleaning service'} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: t('kontorsstadning.content.howToBookTitle'),
                    content: t('kontorsstadning.content.howToBookDescription'),
                    icon: '📅'
                  }
                ] as { title: string; content: any; icon: string }[]).map((section, index) => (
                  <motion.div key={index} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                    <div className="max-w-6xl mx-auto">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">{section.title}</h3>
                      {typeof section.content === 'string' ? (
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center">{section.content}</p>
                      ) : (
                        <div className="text-gray-700 leading-relaxed text-base md:text-lg lg:text-xl">{section.content}</div>
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
              backgroundImage: 'url(/cleaning_background.png)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center 70%', 
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
                  <img src="/omflyttella_flyttstad.webp" alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'} className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('kontorsstadning.about.title')}</h3>
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
                    <img src="/omflyttella_flyttstad.webp" 
                      alt={locale === 'sv' ? 'Om Flyttella Städ' : 'About Flyttella Cleaning'} 
                      className="object-cover rounded-2xl w-full h-full" 
                      style={{ objectPosition: '80% 25%', transform: 'scale(1.10)' }}
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
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('kontorsstadning.about.description1')}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('kontorsstadning.about.description2')}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('kontorsstadning.about.description3')}</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Flyttella är en erfaren städfirma i Stockholm med specialisering på kontorsstädning för företag.' : 'Flyttella is an experienced cleaning company in Stockholm specializing in office cleaning for companies.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Löpande priser, miljövänliga produkter och flexibel service anpassad efter ert schema.' : 'Ongoing prices, eco-friendly products and flexible service adapted to your schedule.'}</p>
                    {!showFullAboutText && (
                      <button onClick={() => setShowFullAboutText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{t('kontorsstadning.about.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    )}
                    {showFullAboutText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="space-y-4 mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Vi levererar pålitlig kontorsstädning som gör att ni kan fokusera på er kärnverksamhet. Professionell service med personlig kontakt.' : 'We deliver reliable office cleaning that allows you to focus on your core business. Professional service with personal contact.'}</p>
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

        {/* Reviews Widget */}
        <ReviewsWidget 
          location="Stockholm" 
          title={t('kontorsstadning.reviews.title')} 
          subtitle={t('kontorsstadning.reviews.subtitle')} 
          description={t('kontorsstadning.reviews.description')} 
          badgeAlt={t('kontorsstadning.reviews.badgeAlt')} 
          arrowText={t('kontorsstadning.reviews.arrowText')} 
        />

        {/* CTA: Redo att börja er kontorsstädning? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🧹</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{t('kontorsstadning.cta.title')}</h3><p className="text-base md:text-lg text-gray-100 leading-snug">{t('kontorsstadning.cta.subtitle')}</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{t('kontorsstadning.cta.button')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('kontorsstadning.services.title')}</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Kontorsflytt Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏢</span><h3 className="text-3xl md:text-5xl font-bold text-white">{t('kontorsstadning.services.kontorsflytt.title')}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('kontorsstadning.services.kontorsflytt.description')}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{t('kontorsstadning.services.kontorsflytt.extendedDescription')}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/kontorsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{t('kontorsstadning.services.kontorsflytt.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Bemanning och underentreprenad Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🔧</span><h3 className="text-3xl md:text-5xl font-bold text-white">{t('kontorsstadning.services.bemanning.title')}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('kontorsstadning.services.bemanning.description')}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{t('kontorsstadning.services.bemanning.extendedDescription')}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/bemanning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{t('kontorsstadning.services.bemanning.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Flyttstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧽</span><h3 className="text-3xl md:text-5xl font-bold text-white">{t('kontorsstadning.services.flyttstadning.title')}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('kontorsstadning.services.flyttstadning.description')}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{t('kontorsstadning.services.flyttstadning.extendedDescription')}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{t('kontorsstadning.services.flyttstadning.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
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
                {/* Flyttstädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🧽</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Flyttstädning' : 'Move-out cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Grundlig flyttstädning enligt branschstandard – 14 dagars nöjd kund-garanti.' : 'Thorough move-out cleaning to industry standards – 14-day satisfaction guarantee.'}</p>
                  <div className="mt-auto relative"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Hemstädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🏡</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Hemstädning' : 'Home cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Regelbunden hemstädning anpassad efter dina behov och önskemål.' : 'Regular home cleaning tailored to your needs and preferences.'}</p>
                  <div className="mt-auto relative"><Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Byggstädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🧱</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Byggstädning' : 'Construction cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Professionell städning efter renovering – grov- och finstädning.' : 'Professional post-renovation cleaning – rough and final cleaning.'}</p>
                  <div className="mt-auto relative"><Link href="/byggstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

             {/* Våra tjänster block (matching Kontorsflytt) */}
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
                transition={{ duration: 0.8, delay: 0 }}
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
                transition={{ duration: 0.8, delay: 0 }}
              >
                {locale === 'sv' ? 'Vi erbjuder ett komplett utbud av flyttjänster för företag och privatpersoner i Stockholm.' : 'We offer a complete range of moving services for companies and individuals in Stockholm.'}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.05 }}
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

       

        {/* Våra förmåner - Mobile slider */}
        <section className="md:hidden py-8 bg-white">
          <div className="mx-auto px-4">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('kontorsstadning.benefits.title')}</h2>
              <div className="relative overflow-hidden rounded-xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}>
                  {(locale === 'sv' ? [
                    { icon: "💰", title: "Löpande priser", description: "Transparenta löpande priser – du vet vad du betalar för", link: "/priser" },
                    { icon: "✅", title: "Kvalitetsgaranti", description: "Vi är så säkra på vår kvalitet att vi erbjuder nöjd kund-garanti", link: "/garanti" },
                    { icon: "⏰", title: "Flexibla tider", description: "Vi anpassar städningen efter ert schema - kvällar och helger", link: "/kontakt" },
                    { icon: "🔒", title: "Försäkring", description: "Full ansvarsförsäkring och alla nödvändiga tillstånd på plats", link: "/tillstand" },
                    { icon: "🎓", title: "Utbildad personal", description: "Vår personal är utbildad för kontorsmiljöer och professionell service", link: "/om-oss" },
                    { icon: "🧴", title: "Miljövänliga produkter", description: "Vi använder certifierade miljövänliga rengöringsmedel", link: "/om-oss" },
                    { icon: "📈", title: "Regelbunden service", description: "Pålitlig och konsekvent städning enligt överenskommen frekvens", link: "/om-oss" },
                    { icon: "🦺", title: "Trygg arbetsmiljö", description: "Vi prioriterar säkerhet för både kunder och personal", link: "/om-oss" },
                    { icon: "📞", title: "Personlig kontakt", description: "Direkt kontakt med er kontaktperson för snabb service och support", link: "/kontakt" }
                  ] : [
                    { icon: "💰", title: "Ongoing prices", description: "Transparent ongoing prices – you know what you pay for", link: "/priser" },
                    { icon: "✅", title: "Quality guarantee", description: "We are so confident in our quality that we offer a satisfied customer guarantee", link: "/garanti" },
                    { icon: "⏰", title: "Flexible times", description: "We adapt the cleaning to your schedule - evenings and weekends", link: "/kontakt" },
                    { icon: "🔒", title: "Insurance", description: "Full liability insurance and all necessary permits in place", link: "/tillstand" },
                    { icon: "🎓", title: "Trained staff", description: "Our staff is trained for office environments and professional service", link: "/om-oss" },
                    { icon: "🧴", title: "Eco-friendly products", description: "We use certified eco-friendly cleaning products", link: "/om-oss" },
                    { icon: "📈", title: "Regular service", description: "Reliable and consistent cleaning according to agreed frequency", link: "/om-oss" },
                    { icon: "🦺", title: "Safe work environment", description: "We prioritize safety for both customers and staff", link: "/om-oss" },
                    { icon: "📞", title: "Personal contact", description: "Direct contact with your contact person for quick service and support", link: "/kontakt" }
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
                {/* Arrow controls */}
                <button type="button" aria-label={locale === 'sv' ? 'Föregående' : 'Previous'} onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button type="button" aria-label={locale === 'sv' ? 'Nästa' : 'Next'} onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Våra förmåner */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  {/* Left side - Features content */}
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">{t('kontorsstadning.benefits.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                                             {(locale === 'sv' ? [
                        { icon: "💰", title: "Löpande priser", description: "Transparenta löpande priser – du vet vad du betalar för", link: "/priser" },
                        { icon: "✅", title: "Kvalitetsgaranti", description: "Vi är så säkra på vår kvalitet att vi erbjuder nöjd kund-garanti", link: "/garanti" },
                        { icon: "⏰", title: "Flexibla tider", description: "Vi anpassar städningen efter ert schema - kvällar och helger", link: "/kontakt" },
                        { icon: "🔒", title: "Försäkring", description: "Full ansvarsförsäkring och alla nödvändiga tillstånd på plats", link: "/tillstand" },
                        { icon: "🎓", title: "Utbildad personal", description: "Vår personal är utbildad för kontorsmiljöer och professionell service", link: "/om-oss" },
                        { icon: "🧴", title: "Miljövänliga produkter", description: "Vi använder certifierade miljövänliga rengöringsmedel", link: "/om-oss" },
                        { icon: "📈", title: "Regelbunden service", description: "Pålitlig och konsekvent städning enligt överenskommen frekvens", link: "/om-oss" },
                        { icon: "🦺", title: "Trygg arbetsmiljö", description: "Vi prioriterar säkerhet för både kunder och personal", link: "/om-oss" },
                        { icon: "📞", title: "Personlig kontakt", description: "Direkt kontakt med er kontaktperson för snabb service och support", link: "/kontakt" }
                                             ] : [
                        { icon: "💰", title: "Ongoing prices", description: "Transparent ongoing prices – you know what you pay for", link: "/priser" },
                        { icon: "✅", title: "Quality guarantee", description: "We are so confident in our quality that we offer a satisfied customer guarantee", link: "/garanti" },
                        { icon: "⏰", title: "Flexible times", description: "We adapt the cleaning to your schedule - evenings and weekends", link: "/kontakt" },
                        { icon: "🔒", title: "Insurance", description: "Full liability insurance and all necessary permits in place", link: "/tillstand" },
                        { icon: "🎓", title: "Trained staff", description: "Our staff is trained for office environments and professional service", link: "/om-oss" },
                        { icon: "🧴", title: "Eco-friendly products", description: "We use certified eco-friendly cleaning products", link: "/om-oss" },
                        { icon: "📈", title: "Regular service", description: "Reliable and consistent cleaning according to agreed frequency", link: "/om-oss" },
                        { icon: "🦺", title: "Safe work environment", description: "We prioritize safety for both customers and staff", link: "/om-oss" },
                        { icon: "📞", title: "Personal contact", description: "Direct contact with your contact person for quick service and support", link: "/kontakt" }
                                             ]).map((feature, index) => (
                         <motion.div key={feature.icon} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                           <span className="text-2xl md:text-3xl">{feature.icon}</span>
              <div className="flex-1">
                             <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                             <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                             <div className="h-6" />
                           </div>
                         </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Right side - Image */}
                  <div className="flex-1 w-full lg:w-auto flex items-center justify-center min-h-[420px]">
                    <div className="relative w-full max-w-md h-full flex items-center">
                      <img src="/varafarmaner_flyttstad.webp" alt={t('kontorsstadning.benefits.imageAlt')} className="w-full h-full object-cover rounded-xl shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4">
          <img src="/varafarmaner_flyttstad.webp"
            alt={t('kontorsstadning.benefits.imageAlt')}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Redo att börja er kontorsstädning? */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12">
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
                <span className="text-3xl md:text-4xl">🏢</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
                    {t('kontorsstadning.cta.title')}
                  </h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">
                    {t('kontorsstadning.cta.subtitle')}
                  </p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button
                    onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
                  >
                    {t('kontorsstadning.cta.button')}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
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
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('kontorsstadning.experience.title')}</h3>
              {/* Mobile: auto-sliding cards */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{expTouchStartXRef.current=e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);}} onTouchMove={(e)=>expTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (expTouchStartXRef.current!=null && expTouchCurrentXRef.current!=null){ const dx=expTouchCurrentXRef.current-expTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentExperienceCard((prev)=>(prev+1)%totalExperienceCards);} else { setCurrentExperienceCard((prev)=>(prev-1+totalExperienceCards)%totalExperienceCards);} restartExperienceAutoSlide(); } } expTouchStartXRef.current=null; expTouchCurrentXRef.current=null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {(locale === 'sv' ? [
                      { title: 'Kontorsstädningar', count: 7000, description: 'uppdrag utförda' },
                      { title: 'Kontorsflyttstädningar', count: 2000, description: 'uppdrag utförda' },
                      { title: 'Hemstädningar', count: 5000, description: 'uppdrag utförda' },
                    ] : [
                      { title: 'Office cleanings', count: 7000, description: 'assignments completed' },
                      { title: 'Office move-out cleanings', count: 2000, description: 'assignments completed' },
                      { title: 'Home cleanings', count: 5000, description: 'assignments completed' },
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
                  <button type="button" aria-label={locale === 'sv' ? 'Föregående' : 'Previous'} onClick={() => { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </button>
                  <button type="button" aria-label={locale === 'sv' ? 'Nästa' : 'Next'} onClick={() => { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>
              </div>

              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">{locale === 'sv' ? 'Kontorsstädningar' : 'Office cleanings'}</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={7000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">{locale === 'sv' ? 'Kontorsflyttstädningar' : 'Office move-out cleanings'}</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={2000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">{locale === 'sv' ? 'Hemstädningar' : 'Home cleanings'}</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={5000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                  </div>
                </motion.div>
            </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('kontorsstadning.experience.localExperienceTitle')}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    {t('kontorsstadning.experience.localExperienceDescription')}
                  </p>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  {/* Mobile pyramid layout */}
                  <div className="md:hidden flex flex-col items-center">
                    {/* Top badge */}
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image
                        src="/1000reviewspicture.png"
                        alt={locale === 'sv' ? '1000+ positiva recensioner från kunder' : '1000+ positive reviews from customers'}
                        width={200}
                        height={200}
                        className="object-contain h-36 w-36"
                        priority={false}
                      />
                    </motion.div>
                    {/* Bottom row */}
                    <div className="flex items-center justify-center gap-4 mr-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/rekommenderad2026.png"
                          alt="Rekommenderad kontorsstädfirma - Flyttella"
                          width={160}
                          height={160}
                          className="object-contain h-28 w-28"
                          priority={false}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/bestinswedenbadge-modified.png"
                          alt="Top 10 kontorsstädfirma - Flyttella"
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
                      src="/rekommenderad2026.png"
                      alt="Rekommenderad kontorsstädfirma - Flyttella"
                      width={240}
                      height={240}
                      className="object-contain h-52 w-52"
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
                      alt="Top 10 kontorsstädfirma - Flyttella"
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
        </motion.section>

        {/* Vår process */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-4 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  {t('kontorsstadning.process.title')}
            </h2>

                {/* Process Description */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('kontorsstadning.process.description')}
                  </p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">
                    {locale === 'sv' ? 'Våra offerter är alltid baserade på dina specifika behov och omständigheter. Vi tar hänsyn till faktorer som kontorsyta, antal rum, tillgänglighet och städkrav för att ge dig en offert som passar just din situation. Alla priser är löpande utan dolda avgifter - vi utgår alltid från dina önskemål och information vi får från dig som kund. Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.' : 'Our quotes are always based on your specific needs and circumstances. We take into account factors such as office space, number of rooms, accessibility and cleaning requirements to give you a quote that fits your specific situation. All prices are ongoing without hidden fees - we always base our quotes on your wishes and information we receive from you as a customer. Do you have special wishes or questions? Contact us and we will adapt the quote to your needs.'}
              </p>
            </div>

                {/* Process Flow Section */}
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">{locale === 'sv' ? 'Så fungerar det' : 'How it works'}</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        {
                          icon: <FillFormLottie />,
                          title: "Fyll i formuläret",
                          description: "Berätta om din kontorsstädning",
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
                            icon: <div className="md:mt-0"><CleanHomeLottie /></div>,
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
                  {t('kontorsstadning.blog.title')}
            </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('kontorsstadning.blog.subtitle')}
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
                      alt={t('kontorsstadning.blog.imageAlt')} 
                      className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t('kontorsstadning.blog.category')}
                      </span>
                      <span className="text-gray-500 text-sm ml-4">{t('kontorsstadning.blog.readingTime')}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
                      {t('kontorsstadning.blog.articleTitle')}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {t('kontorsstadning.blog.articleDescription')}
                    </p>
                    <div className="flex items-center justify-end mb-4">
                      <Link 
                        href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-kontorsstadfirma" 
                        className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group"
                      >
                        {t('kontorsstadning.blog.readMore')}
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
                        {t('kontorsstadning.blog.seeAllArticles')}
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

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: 'Vad ingår i kontorsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Dammsugning, våttorkning av golv, tömning av papperskorgar, torkning av skrivbord, rengöring av kök/pentry och toaletter.' } }, { '@type': 'Question', name: 'Vad kostar kontorsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på lokalernas storlek, städfrekvens och omfattning. Vi arbetar med löpande priser utan dolda avgifter.' } }, { '@type': 'Question', name: 'Kan ni städa utanför kontorstid?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, vi anpassar städningen efter ert schema och kan arbeta kvällar och helger.' } }, { '@type': 'Question', name: 'Hur ofta ska man städa kontoret?', acceptedAnswer: { '@type': 'Answer', text: 'Beror på antal medarbetare och verksamhet. Vanligt är 1-3 gånger per vecka.' } } ] }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('kontorsstadning.faq.title')}</h2>
              <div className="space-y-4">
                {(locale === 'sv' ? [
                  { id: 'kontor-1', question: 'Erbjuder ni engångsstädning eller bara regelbunden städning?', answer: 'Vi erbjuder både engångsstädning och regelbunden kontorsstädning. Många kunder börjar med en engångsstädning och övergår sedan till regelbunden service.' },
                  { id: 'kontor-2', question: 'Kan ni arbeta när kontoret är öppet?', answer: 'Ja, vi anpassar städningen efter er verksamhet och kan arbeta tidigt på morgonen, sent på kvällen eller helger för minimal störning.' },
                  { id: 'kontor-3', question: 'Vad händer om något går sönder?', answer: 'Vi har full ansvarsförsäkring som täcker eventuella skador. Vi hanterar alla ärenden snabbt och professionellt.' },
                  { id: 'kontor-4', question: 'Kan vi ändra städfrekvensen?', answer: 'Ja, ni kan när som helst ändra städfrekvensen för att bättre passa era behov. Oavsett om ni vill öka antalet städtillfällen under en intensiv period, minska när det är lugnare, eller pausa tjänsten helt under en tid, så går det smidigt att ordna. På så sätt får ni alltid en lösning som är flexibel och anpassad efter er verksamhet.' }
                ] : [
                  { id: 'kontor-1', question: 'Do you offer one-time cleaning or just regular cleaning?', answer: 'We offer both one-time cleaning and regular office cleaning. Many customers start with a one-time cleaning and then switch to regular service.' },
                  { id: 'kontor-2', question: 'Can you work when the office is open?', answer: 'Yes, we adapt the cleaning to your business and can work early in the morning, late in the evening or weekends for minimal disruption.' },
                  { id: 'kontor-3', question: 'What happens if something breaks?', answer: 'We have full liability insurance that covers any damage. We handle all matters quickly and professionally.' },
                  { id: 'kontor-4', question: 'Can we change the cleaning frequency?', answer: 'Yes, you can change the cleaning frequency at any time to better suit your needs. Whether you want to increase the number of cleaning sessions during an intensive period, reduce when it is quieter, or pause the service completely for a while, it can be arranged smoothly. This way you always get a solution that is flexible and adapted to your business.' }
                ]).map((faq, index) => (
                  <motion.div key={faq.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"><h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">{faq.question}</h3><motion.div animate={{ rotate: openFAQ === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0"><svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></motion.div></button>
                    <motion.div initial={false} animate={{ height: openFAQ === faq.id ? 'auto' : 0, opacity: openFAQ === faq.id ? 1 : 0 }} transition={{ height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2, ease: 'easeInOut' } }} className="overflow-hidden"><div className="px-6 pb-6"><p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p></div></motion.div>
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
