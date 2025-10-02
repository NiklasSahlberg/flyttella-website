'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import FlyttoffertForm from '../components/FlyttoffertForm';
import StadningOffertFormCustomAkersberga from '../components/StadningOffertFormCustomAkersberga';
import ReviewsWidget from '../components/ReviewsWidget';
import LocationsCard from '../components/LocationsCard';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';
import Lottie from 'lottie-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

// Lottie helpers at module scope
function FillFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/fillform.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function FastLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/fast.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function PhoneCallLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/phonecall.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function SignFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/signform.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function MovingTruckLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/movingtruck.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-36 h-36 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function CleanHomeLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/happycustomer.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
}

export default function FonsterputsningPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    featureIntervalRef.current = setInterval(() => {
      setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards);
    }, 4000);
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
                  backgroundImage: 'url(/fonsterputs_intro.png)',
                  backgroundPosition: 'center 50%'
                }}
              />
              <div className="relative z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  {t('fonsterputsning.hero.title')}
                </h1>
                <p className="text-xl mb-6">
                  {t('fonsterputsning.hero.subtitle')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
          {/* Desktop hero */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/fonsterputs_intro.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">{locale === 'sv' ? 'Professionell fönsterputsning i Stockholm' : 'Professional Window Cleaning in Stockholm'}</h1>
                  <p className="text-2xl md:text-3xl mb-12">{locale === 'sv' ? 'Kristallklara fönster – varje gång' : 'Crystal clear windows – every time'}</p>
                  <p className="text-lg text-white/90">{locale === 'sv' ? 'Invändigt och utvändigt där det är säkert och åtkomligt. Perfekt inför säsong, visning eller som abonnemang.' : 'Inside and outside where it is safe and accessible. Perfect for season, viewing or as subscription.'}</p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} cleaningCardSubtitle={locale === 'sv' ? 'Komplett städservice och fönsterputsning – kristallklart inne och ute' : 'Complete cleaning service and window cleaning – crystal clear inside and out'} />
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

        {/* What is Fönsterputsning */}
        <section id="content" className="relative py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {(locale === 'sv' ? [
                  {
                    title: t('fonsterputsning.content.whatIsTitle'),
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-6 text-left md:text-center">
                          {t('fonsterputsning.content.whatIsDescription')}
                        </p>
                        <div className="w-full max-w-6xl mx-auto flex justify-center mt-6 md:mt-8 mb-6">
                          <img src="/fonsterputs_intro.png" alt={t('fonsterputsning.content.whatIsImageAlt')} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                        </div>
                      </>
                    ),
                    icon: '🪟'
                  },
                  {
                    title: t('fonsterputsning.content.pricingTitle'),
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">
                          {t('fonsterputsning.content.pricingDescription')}
                        </p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            "{t('fonsterputsning.content.pricingTestimonial')}"
                          </p>
                          <p className="italic text-gray-700 mt-2">- {t('fonsterputsning.content.testimonialAuthor')}</p>
                        </div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: t('fonsterputsning.content.whyChooseTitle'),
                    content: t('fonsterputsning.content.whyChooseDescription'),
                    icon: '⭐'
                  },
                  {
                    title: t('fonsterputsning.content.howToBookTitle'),
                    preTitleContent: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-10">
                        <img src="/fonsterputs_info.png" alt={t('fonsterputsning.content.howToBookImageAlt')} className="w-full h-64 md:h-72 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    content: (
                      <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center">
                        {t('fonsterputsning.content.howToBookDescription')}
                      </p>
                    ),
                    icon: '📅'
                  },
                  {
                    title: t('fonsterputsning.content.includesTitle'),
                    content: t('fonsterputsning.content.includesDescription'),
                    icon: '🧼'
                  }
                ] : [
                  {
                    title: t('fonsterputsning.content.whatIsTitle'),
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-6 text-left md:text-center">
                          {t('fonsterputsning.content.whatIsDescription')}
                        </p>
                        <div className="w-full max-w-6xl mx-auto flex justify-center mt-6 md:mt-8 mb-6">
                          <img src="/fonsterputs_intro.png" alt={t('fonsterputsning.content.whatIsImageAlt')} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                        </div>
                      </>
                    ),
                    icon: '🪟'
                  },
                  {
                    title: t('fonsterputsning.content.pricingTitle'),
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">
                          {t('fonsterputsning.content.pricingDescription')}
                        </p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            "{t('fonsterputsning.content.pricingTestimonial')}"
                          </p>
                          <p className="italic text-gray-700 mt-2">- {t('fonsterputsning.content.testimonialAuthor')}</p>
                        </div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: t('fonsterputsning.content.whyChooseTitle'),
                    content: t('fonsterputsning.content.whyChooseDescription'),
                    icon: '⭐'
                  },
                  {
                    title: t('fonsterputsning.content.howToBookTitle'),
                    preTitleContent: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-10">
                        <img src="/fonsterputs_info.png" alt={t('fonsterputsning.content.howToBookImageAlt')} className="w-full h-64 md:h-72 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    content: (
                      <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center">
                        {t('fonsterputsning.content.howToBookDescription')}
                      </p>
                    ),
                    icon: '📅'
                  },
                  {
                    title: t('fonsterputsning.content.includesTitle'),
                    content: t('fonsterputsning.content.includesDescription'),
                    icon: '🧼'
                  }
                ]).map((section, index) => (
                  <motion.div key={index} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                    <div className="max-w-6xl mx-auto">
                      {section.preTitleContent ? (
                        <div>{section.preTitleContent}</div>
                      ) : null}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">
                        {section.title}
                      </h3>
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

      

        {/* Om Flyttella */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/cleaning_background.png)', backgroundSize: 'cover', backgroundPosition: 'center 70%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              {/* Mobile image above title to match Bohagsflytt */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/window_cleaner.png" alt={t('fonsterputsning.about.imageAlt')} className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('fonsterputsning.about.title')}</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                <motion.div className="hidden lg:block w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                      <img src="/window_cleaner.png" alt={t('fonsterputsning.about.imageAlt')} className="object-cover rounded-2xl w-full h-full" style={{ objectPosition: '20% 25%', transform: 'scale(1.0)' }} />
                  </div>
                </motion.div>
                <motion.div className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('fonsterputsning.about.description1')}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('fonsterputsning.about.description2')}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('fonsterputsning.about.description3')}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('fonsterputsning.about.description4')}</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {t('fonsterputsning.about.mobileDescription')}
                    </p>
                    <div className="pt-2">
                      <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{t('fonsterputsning.about.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Reviews */}
        <ReviewsWidget 
          title={t('fonsterputsning.reviews.title')}
          subtitle={t('fonsterputsning.reviews.subtitle')}
          description={t('fonsterputsning.reviews.description')}
          badgeAlt={t('fonsterputsning.reviews.badgeAlt')}
          arrowText={t('fonsterputsning.reviews.arrowText')}
        />

        {/* CTA 1 */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🪟</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{t('fonsterputsning.cta.title')}</h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">{t('fonsterputsning.cta.subtitle')}</p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{t('fonsterputsning.cta.button')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Våra städtjänster */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('fonsterputsning.services.title')}</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Flyttstädning Card (replacing fönsterputsning) */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🧽</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">{t('fonsterputsning.services.flyttstadning.title')}</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('fonsterputsning.services.flyttstadning.description')}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                    {t('fonsterputsning.services.flyttstadning.extendedDescription')}
                  </p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{t('fonsterputsning.services.flyttstadning.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hemstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🏠</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">{t('fonsterputsning.services.hemstadning.title')}</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('fonsterputsning.services.hemstadning.description')}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                    {t('fonsterputsning.services.hemstadning.extendedDescription')}
                  </p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{t('fonsterputsning.services.hemstadning.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Visningsstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🏠✨</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">{t('fonsterputsning.services.visningsstadning.title')}</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('fonsterputsning.services.visningsstadning.description')}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                    {t('fonsterputsning.services.visningsstadning.extendedDescription')}
                  </p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/visningsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{t('fonsterputsning.services.visningsstadning.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
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
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🏠</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Hemstädning' : 'Home cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Regelbunden hemstädning anpassad efter dina behov och önskemål.' : 'Regular home cleaning tailored to your needs and preferences.'}</p>
                  <div className="mt-auto relative"><Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Visningsstädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🏠✨</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Visningsstädning' : 'Viewing cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Snyggt och skinande inför försäljning eller visning.' : 'Spotless home ready for sale or viewing.'}</p>
                  <div className="mt-auto relative"><Link href="/visningsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Våra tjänster - CTA row */}
        <motion.section className="py-12 md:py-12 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 hidden md:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }} id="upptack-tjanster">{t('fonsterputsning.features.title')}</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>{t('fonsterputsning.features.description')}</motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('fonsterputsning.features.flyttServicesButton')}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/stadtjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('fonsterputsning.features.cleaningServicesButton')}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Våra förmåner - mobile */}
        <section className="md:hidden py-8 bg-white">
          <div className="mx-auto px-4">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('fonsterputsning.benefits.title')}</h2>
              <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{featureTouchStartXRef.current=e.touches[0].clientX; if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);}} onTouchMove={(e)=>featureTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (featureTouchStartXRef.current!=null && featureTouchCurrentXRef.current!=null){ const dx=featureTouchCurrentXRef.current-featureTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentFeatureCard((prev)=>(prev+1)%totalFeatureCards);} else { setCurrentFeatureCard((prev)=>(prev-1+totalFeatureCards)%totalFeatureCards);} restartFeatureAutoSlide(); } } featureTouchStartXRef.current=null; featureTouchCurrentXRef.current=null; }}>
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}>
                  {(locale === 'sv' ? [
                    { icon: '💰', title: 'Fast pris', description: 'Inga överraskningar – fasta priser och möjlighet till tillval', link: '/priser' },
                    { icon: '📋', title: 'RUT-avdrag', description: 'Vi hanterar allt pappersarbete för RUT-avdrag', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                    { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#fonsterputs-offert' },
                    { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                    { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                    { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                    { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                    { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                    { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                  ] : [
                    { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and options available', link: '/priser' },
                    { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                    { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – Simply fill out the form at the top of the page', link: '#fonsterputs-offert' },
                    { icon: '⏰', title: 'Reschedule or Cancel', description: 'Reschedule/cancel free of charge up to 24 hours before', link: '/avbokning' },
                    { icon: '🔒', title: 'Permits and Insurance', description: 'All necessary permits and insurance in place', link: '/tillstand' },
                    { icon: '🎓', title: 'Trained Staff', description: 'Trained employees and quality-assured routines', link: '/om-oss' },
                    { icon: '🧴', title: 'Eco-friendly Products', description: 'Gentle and eco-friendly cleaning products', link: '/om-oss' },
                    { icon: '📈', title: 'Management System', description: 'Effective routines for quality and structure', link: '/om-oss' },
                    { icon: '🦺', title: 'Work Environment', description: 'Safe work environment for both customers and staff', link: '/om-oss' }
                  ]).map((feature, index) => (
                    <div key={feature.icon} className="w-full flex-shrink-0">
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                        <div className="flex items-start gap-3 h-full">
                          <span className="text-2xl">{feature.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm mb-2">{feature.description}</p>
                            {feature.title === 'RUT-avdrag' && (
                              <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm inline-flex items-center">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" aria-label={locale === 'sv' ? 'Föregående' : 'Previous'} onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></button>
                <button type="button" aria-label={locale === 'sv' ? 'Nästa' : 'Next'} onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></button>
              </div>
            </div>
          </div>
        </section>
        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4">
          <img
            src="/window_worker.png"
            alt={t('fonsterputsning.benefits.imageAlt')}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Desktop features grid with image */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">{t('fonsterputsning.benefits.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {(locale === 'sv' ? [
                        { icon: '💰', title: 'Fast pris', description: 'Inga överraskningar – fasta priser och möjlighet till tillval', link: '/priser' },
                        { icon: '📋', title: 'RUT-avdrag', description: 'Vi hanterar allt pappersarbete för RUT-avdrag', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#fonsterputs-offert' },
                        { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                        { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                        { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                        { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                        { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                        { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                      ] : [
                        { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and options available', link: '/priser' },
                        { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – Simply fill out the form at the top of the page', link: '#fonsterputs-offert' },
                        { icon: '⏰', title: 'Reschedule or Cancel', description: 'Reschedule/cancel free of charge up to 24 hours before', link: '/avbokning' },
                        { icon: '🔒', title: 'Permits and Insurance', description: 'All necessary permits and insurance in place', link: '/tillstand' },
                        { icon: '🎓', title: 'Trained Staff', description: 'Trained employees and quality-assured routines', link: '/om-oss' },
                        { icon: '🧴', title: 'Eco-friendly Products', description: 'Gentle and eco-friendly cleaning products', link: '/om-oss' },
                        { icon: '📈', title: 'Management System', description: 'Effective routines for quality and structure', link: '/om-oss' },
                        { icon: '🦺', title: 'Work Environment', description: 'Safe work environment for both customers and staff', link: '/om-oss' }
                      ]).map((feature, i) => (
                        <motion.div key={feature.title} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={i}>
                          <motion.span className="text-2xl md:text-3xl" initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }} animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [-180, 20, 0], color: ['#10B981', '#34D399', '#10B981'] }} transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}>{feature.icon}</motion.span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                             {feature.title === 'RUT-avdrag' && (
                               <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                             )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch">
                      <img src="/window_worker.png" alt={t('fonsterputsning.benefits.imageAlt')} className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 2 */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12 -mb-12 md:-mb-16">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-xl md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🪟</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{t('fonsterputsning.cta.title')}</h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">{t('fonsterputsning.cta.subtitle')}</p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{t('fonsterputsning.cta.button')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/our_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('fonsterputsning.experience.title')}</h3>
              {/* Mobile slider */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e) => { expTouchStartXRef.current = e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); }} onTouchMove={(e) => (expTouchCurrentXRef.current = e.touches[0].clientX)} onTouchEnd={() => { if (expTouchStartXRef.current != null && expTouchCurrentXRef.current != null) { const dx = expTouchCurrentXRef.current - expTouchStartXRef.current; const th = 50; if (Math.abs(dx) > th) { if (dx < 0) { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); } else { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); } restartExperienceAutoSlide(); } } expTouchStartXRef.current = null; expTouchCurrentXRef.current = null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {(locale === 'sv' ? [
                      { title: 'Fönsterputsningar', count: 3000 },
                      { title: 'Flyttstädningar', count: 7000 },
                      { title: 'Hemstädningar', count: 5000 }
                    ] : [
                      { title: 'Window Cleanings', count: 3000 },
                      { title: 'Move-out Cleanings', count: 7000 },
                      { title: 'Home Cleanings', count: 5000 }
                    ]).map((card) => (
                      <div key={card.title} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h4 className="text-lg font-bold mb-1 text-white">{card.title}</h4>
                            <div className="text-4xl font-bold mb-1 text-white"><CountUp end={card.count} duration={2.0} suffix="+" /></div>
                            <p className="text-white/90 text-sm">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" aria-label={locale === 'sv' ? 'Föregående' : 'Previous'} onClick={() => { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></button>
                  <button type="button" aria-label={locale === 'sv' ? 'Nästa' : 'Next'} onClick={() => { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></button>
                </div>
              </div>
              {/* Desktop grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {(locale === 'sv' ? [
                  { title: 'Fönsterputsningar', count: 3000 },
                  { title: 'Flyttstädningar', count: 7000 },
                  { title: 'Hemstädningar', count: 5000 }
                ] : [
                  { title: 'Window Cleanings', count: 3000 },
                  { title: 'Move-out Cleanings', count: 7000 },
                  { title: 'Home Cleanings', count: 5000 }
                ]).map((card, i) => (
                  <motion.div key={card.title} className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: i * 0.25 }}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <motion.h2 className="text-xl font-bold mb-2 text-white">{card.title}</motion.h2>
                      <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={card.count} duration={2.5} suffix="+" useEasing enableScrollSpy scrollSpyOnce /></motion.div>
                      <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('fonsterputsning.experience.localExperienceTitle')}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    {t('fonsterputsning.experience.localExperienceDescription')}
                  </p>
                </motion.div>
                {/* Badges - pyramid on mobile */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  <div className="md:hidden flex flex-col items-center">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image src="/1000reviewspicture.png" alt={locale === 'sv' ? '1000+ positiva recensioner' : '1000+ positive reviews'} width={200} height={200} className="object-contain h-36 w-36" />
                    </motion.div>
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image src="/recommendedcompany2.png" alt={locale === 'sv' ? 'Rekommenderad städfirma' : 'Recommended cleaning company'} width={160} height={160} className="object-contain h-32 w-32" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image src="/bestinswedenbadge-modified.png" alt={locale === 'sv' ? 'Top 10 städfirma' : 'Top 10 cleaning company'} width={180} height={180} className="object-contain h-28 w-28" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/recommendedcompany2.png" alt={locale === 'sv' ? 'Rekommenderad städfirma' : 'Recommended cleaning company'} width={240} height={240} className="object-contain h-60 w-60" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/1000reviewspicture.png" alt={locale === 'sv' ? '1000+ positiva recensioner' : '1000+ positive reviews'} width={260} height={260} className="object-contain h-64 w-64 mt-3" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/bestinswedenbadge-modified.png" alt={locale === 'sv' ? 'Top 10 städfirma' : 'Top 10 cleaning company'} width={300} height={300} className="object-contain h-48 w-48" />
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{t('fonsterputsning.process.title')}</h2>
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('fonsterputsning.process.description')}
                  </p>
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('fonsterputsning.process.description2')}
                  </p>
                </div>
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">{t('fonsterputsning.process.pricing')}</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">{t('fonsterputsning.process.howItWorksTitle')}</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {(locale === 'sv' ? [
                        { icon: <FillFormLottie />, title: t('fonsterputsning.process.steps.0.title'), description: t('fonsterputsning.process.steps.0.description') },
                        { icon: <FastLottie />, title: t('fonsterputsning.process.steps.1.title'), description: t('fonsterputsning.process.steps.1.description') },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: t('fonsterputsning.process.steps.2.title'), description: t('fonsterputsning.process.steps.2.description'), containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: t('fonsterputsning.process.steps.3.title'), description: t('fonsterputsning.process.steps.3.description'), containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: t('fonsterputsning.process.steps.4.title'), description: t('fonsterputsning.process.steps.4.description'), containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: t('fonsterputsning.process.steps.5.title'), description: t('fonsterputsning.process.steps.5.description'), containerClass: 'md:-mt-6' }
                      ] : [
                        { icon: <FillFormLottie />, title: t('fonsterputsning.process.steps.0.title'), description: t('fonsterputsning.process.steps.0.description') },
                        { icon: <FastLottie />, title: t('fonsterputsning.process.steps.1.title'), description: t('fonsterputsning.process.steps.1.description') },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: t('fonsterputsning.process.steps.2.title'), description: t('fonsterputsning.process.steps.2.description'), containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: t('fonsterputsning.process.steps.3.title'), description: t('fonsterputsning.process.steps.3.description'), containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: t('fonsterputsning.process.steps.4.title'), description: t('fonsterputsning.process.steps.4.description'), containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: t('fonsterputsning.process.steps.5.title'), description: t('fonsterputsning.process.steps.5.description'), containerClass: 'md:-mt-6' }
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
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20 }} />
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('fonsterputsning.blog.title')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('fonsterputsning.blog.subtitle')}</p>
              </div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/window_cleaner.png" alt={t('fonsterputsning.blog.imageAlt')} className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">{t('fonsterputsning.blog.category')}</span>
                      <span className="text-gray-500 text-sm ml-4">{t('fonsterputsning.blog.readingTime')}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{t('fonsterputsning.blog.articleTitle')}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{t('fonsterputsning.blog.articleDescription')}</p>
                    <div className="flex items-center justify-end mb-4">
                      <Link href="/blogg/fonsterputs-vad-du-behover-veta" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('fonsterputsning.blog.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12">
                <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">{t('fonsterputsning.blog.seeAllArticles')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  { '@type': 'Question', name: 'Vad ingår i fönsterputsning?', acceptedAnswer: { '@type': 'Answer', text: 'Invändig puts och utvändig där det är säkert och åtkomligt. Karmar och fönsterbrädor ingår.' } },
                  { '@type': 'Question', name: 'Vad kostar fönsterputsning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på antal fönster, våningsplan och åtkomlighet. RUT‑avdrag ger 50% på arbetskostnaden.' } },
                  { '@type': 'Question', name: 'När är bästa tiden för fönsterputs?', acceptedAnswer: { '@type': 'Answer', text: 'Vår och höst är populära, men vi putsar året runt när vädret tillåter.' } },
                  { '@type': 'Question', name: 'Behöver jag vara hemma?', acceptedAnswer: { '@type': 'Answer', text: 'Nej, nyckel/portkod kan lämnas och hanteras tryggt av oss.' } }
                ]
              })
            }}
          />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('fonsterputsning.faq.title')}</h2>
              <div className="space-y-4">
                {(locale === 'sv' ? [
                  { id: 'fp-1', question: t('fonsterputsning.faq.questions.0.question'), answer: t('fonsterputsning.faq.questions.0.answer') },
                  { id: 'fp-2', question: t('fonsterputsning.faq.questions.1.question'), answer: t('fonsterputsning.faq.questions.1.answer') },
                  { id: 'fp-3', question: t('fonsterputsning.faq.questions.2.question'), answer: t('fonsterputsning.faq.questions.2.answer') },
                  { id: 'fp-4', question: t('fonsterputsning.faq.questions.3.question'), answer: t('fonsterputsning.faq.questions.3.answer') }
                ] : [
                  { id: 'fp-1', question: t('fonsterputsning.faq.questions.0.question'), answer: t('fonsterputsning.faq.questions.0.answer') },
                  { id: 'fp-2', question: t('fonsterputsning.faq.questions.1.question'), answer: t('fonsterputsning.faq.questions.1.answer') },
                  { id: 'fp-3', question: t('fonsterputsning.faq.questions.2.question'), answer: t('fonsterputsning.faq.questions.2.answer') },
                  { id: 'fp-4', question: t('fonsterputsning.faq.questions.3.question'), answer: t('fonsterputsning.faq.questions.3.answer') }
                ]).map((faq, index) => (
                  <motion.div key={faq.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">{faq.question}</h3>
                      <motion.div animate={{ rotate: openFAQ === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                        <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </motion.div>
                    </button>
                    <motion.div initial={false} animate={{ height: openFAQ === faq.id ? 'auto' : 0, opacity: openFAQ === faq.id ? 1 : 0 }} transition={{ height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2, ease: 'easeInOut' } }} className="overflow-hidden">
                      <div className="px-6 pb-6"><p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p></div>
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


