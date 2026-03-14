'use client';

import Link from "next/link";
import PictureSlider from '@/app/components/PictureSlider';
import ReviewsWidget from '@/app/components/ReviewsWidget';
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from '@/app/contexts/LanguageContext';
import Image from "next/image";

// AutoSlidingCards component
const AutoSlidingCards = () => {
  const { t, locale } = useLanguage();
  const [currentCard, setCurrentCard] = useState(0);
  const [showFullExperienceText, setShowFullExperienceText] = useState(false);
  const autoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);
  
  const cards = [
    {
      title: t('aboutSection.moves'),
      count: t('aboutSection.movesCount'),
      description: t('aboutSection.movesDesc'),
      delay: 0
    },
    {
      title: t('aboutSection.cleanings'),
      count: t('aboutSection.cleaningsCount'),
      description: t('aboutSection.cleaningsDesc'),
      delay: 1
    },
    {
      title: t('aboutSection.monthly'),
      count: t('aboutSection.monthlyCount'),
      description: t('aboutSection.monthlyDesc'),
      delay: 2
    }
  ];
  
  const restartAutoSlide = () => {
    if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
    autoIntervalRef.current = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 3);
    }, 3000);
  };

  useEffect(() => {
    restartAutoSlide();
    return () => {
      if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchCurrentXRef.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchCurrentXRef.current == null) return;
    const deltaX = touchCurrentXRef.current - touchStartXRef.current;
    const threshold = 50; // px
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setCurrentCard((prev) => (prev + 1) % 3);
      } else {
        setCurrentCard((prev) => (prev - 1 + 3) % 3);
      }
      restartAutoSlide();
    }
    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
  };


  return (
    <>
      {/* Background image absolutely positioned */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position"
        style={{
          backgroundImage: 'url(/backgroundpicture.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          zIndex: 0,
        }}
      />
      {/* Mobile-specific background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: 'url(/omoss.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center calc(40% - 40px)',
          zIndex: 0,
        }}
      />
      {/* Overlay absolutely positioned, full width */}
      <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
      
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 w-full h-32 z-15 pointer-events-none"
           style={{
             background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
           }}
      />
      
      {/* Bottom gradient fade - Desktop only */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-30 pointer-events-none hidden md:block"
           style={{
             background: 'linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
           }}
      />
      
      {/* Bottom gradient fade - mobile only, shorter */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 md:h-48 z-30 pointer-events-none md:hidden"
        style={{
          background:
            'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)',
        }}
      />
      
      {/* Centered content only */}
      <div className="relative z-20 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('aboutSection.title')}</h3>
          
          {/* Mobile: Auto-sliding cards */}
          <div className="md:hidden mt-8">
            <div className="relative overflow-hidden rounded-xl" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCard * 100}%)` }}
              >
                {cards.map((card, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <motion.div 
                      className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeInUp}
                      transition={{ duration: 0.8, delay: card.delay * 0.25 }}
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
                        <motion.h2 className="text-lg font-bold mb-2 text-white text-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: card.delay * 0.25 }}>
                          {card.title}
                        </motion.h2>
                        <motion.div className="text-3xl font-bold mb-2 text-white text-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: card.delay * 0.25 }}>
                          {card.count}
                        </motion.div>
                        <motion.p className="text-white/90 text-sm text-center leading-relaxed" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: card.delay * 0.25 }}>
                          {card.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Arrow controls */}
              <button
                type="button"
                aria-label={locale === 'sv' ? 'Föregående' : 'Previous'}
                onClick={() => { setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length); restartAutoSlide(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-25 text-white/80 hover:text-white transition-colors p-2 -m-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 111.06 1.06L10.56 12l5.22 5.22a.75.75 0 010 1.06z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={locale === 'sv' ? 'Nästa' : 'Next'}
                onClick={() => { setCurrentCard((prev) => (prev + 1) % cards.length); restartAutoSlide(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-25 text-white/80 hover:text-white transition-colors p-2 -m-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L13.44 12 8.22 6.78a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-3 space-x-2">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentCard ? 'bg-[#10B981]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop: Original grid layout */}
          <div className="hidden md:grid mt-12 grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <motion.div 
                key={index}
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: card.delay * 0.25 }}
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
                  <motion.h2 className="text-xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: card.delay * 0.25 }}>
                    {card.title}
                  </motion.h2>
                  <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: card.delay * 0.25 }}>
                    {card.count}
                  </motion.div>
                  <motion.p className="text-white/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: card.delay * 0.25 }}>
                    {card.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
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
              <h4 className="text-2xl md:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">
                {t('aboutSection.localExperienceTitle')}
              </h4>
              <p className="text-lg md:text-2xl text-[#0F172A] leading-relaxed mb-3 md:mb-4">
                {t('aboutSection.localExperienceDesc1')}
              </p>
              {/* Mobile: Läs mer button */}
              {!showFullExperienceText && (
                <div className="md:hidden mb-3">
                  <motion.button
                    onClick={() => setShowFullExperienceText(true)}
                    className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4"
                  >
                    {locale === 'sv' ? 'Läs mer' : 'Read more'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              )}
              {/* Mobile: Expanded text when Läs mer is clicked */}
              {showFullExperienceText && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 mt-4 md:hidden px-4 md:px-8"
                >
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    {t('aboutSection.localExperienceDesc2')}
                  </p>
                </motion.div>
              )}
              <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                {t('aboutSection.localExperienceDesc2')}
              </p>
            </motion.div>

            {/* Recommended Company and 1000 Reviews badges under text */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
              {/* Mobile: Pyramid layout */}
              <div className="md:hidden flex flex-col items-center">
                {/* Top badge - centered */}
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
                {/* Bottom badges - side by side */}
                <div className="flex items-center justify-center gap-4 mr-4">
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/rekommenderad2026.png"
                      alt="Rekommenderad flyttfirma - Flyttella"
                      width={160}
                      height={160}
                      className="object-contain h-28 w-28"
                      priority={false}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/bestinswedenbadge-modified.png"
                      alt="Top 10 flyttfirma - Flyttella"
                      width={180}
                      height={180}
                      className="object-contain h-28 w-28"
                      priority={false}
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Desktop: Side by side layout */}
              <div className="hidden md:flex items-center justify-center gap-6">
                <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                  <Image
                    src="/rekommenderad2026.png"
                    alt="Rekommenderad flyttfirma - Flyttella"
                    width={240}
                    height={240}
                    className="object-contain h-52 w-52"
                    priority={false}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                  <Image
                    src="/1000reviewspicture.png"
                    alt={locale === 'sv' ? '1000+ positiva recensioner från kunder' : '1000+ positive reviews from customers'}
                    width={260}
                    height={260}
                    className="object-contain h-64 w-64 mt-3"
                    priority={false}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                  <Image
                    src="/bestinswedenbadge-modified.png"
                    alt="Top 10 flyttfirma - Flyttella"
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
    </>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function OmOssPage() {
  const { t, locale } = useLanguage();
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);

  // State for horizontal sliding team images - start at "Glad medarbetare i tjänst" (index 2)
  const [currentSlide, setCurrentSlide] = useState(2);
  const teamSlideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const teamTouchStartXRef = useRef<number | null>(null);
  const teamTouchCurrentXRef = useRef<number | null>(null);

  // Auto-sliding for feature cards
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

  const handleFeatureTouchStart = (e: React.TouchEvent) => {
    featureTouchStartXRef.current = e.touches[0].clientX;
    featureTouchCurrentXRef.current = null;
  };
  const handleFeatureTouchMove = (e: React.TouchEvent) => {
    featureTouchCurrentXRef.current = e.touches[0].clientX;
  };
  const handleFeatureTouchEnd = () => {
    if (featureTouchStartXRef.current == null || featureTouchCurrentXRef.current == null) return;
    const deltaX = featureTouchCurrentXRef.current - featureTouchStartXRef.current;
    const threshold = 50;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards);
      } else {
        setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards);
      }
      restartFeatureAutoSlide();
    }
    featureTouchStartXRef.current = null;
    featureTouchCurrentXRef.current = null;
  };

  // All company images for horizontal sliding
  const allCompanyImages = [
    {
      src: "/omoss.webp",
      alt: locale === 'sv' ? "Flyttella team at work" : "Flyttella team at work",
      title: locale === 'sv' ? "Vårt team i arbete" : "Our team at work",
      description: locale === 'sv' ? "Vårt dedikerade team arbetar tillsammans för att säkerställa en smidig flyttprocess." : "Our dedicated team works together to ensure a smooth moving process."
    },
    {
      src: "/personalpicture.webp",
      alt: locale === 'sv' ? "Professional moving team" : "Professional moving team",
      title: locale === 'sv' ? "Professionellt flyttteam" : "Professional moving team",
      description: locale === 'sv' ? "Professionella medarbetare med fokus på kvalitet och kundnöjdhet." : "Professional employees with focus on quality and customer satisfaction."
    },
    {
      src: "/smiling_worker_new.webp",
      alt: locale === 'sv' ? "Happy worker providing service" : "Happy worker providing service",
      title: locale === 'sv' ? "Glad medarbetare i tjänst" : "Happy employee in service",
      description: locale === 'sv' ? "Glada och engagerade medarbetare som gör skillnaden för våra kunder." : "Happy and engaged employees who make the difference for our customers."
    },
    {
      src: "/under_flytt.webp",
      alt: locale === 'sv' ? "Team working during move" : "Team working during move",
      title: locale === 'sv' ? "Team i arbete under flytt" : "Team working during move",
      description: locale === 'sv' ? "Vårt team arbetar effektivt under flytten för att minimera stress." : "Our team works efficiently during the move to minimize stress."
    },
    {
      src: "/smidigflyttdag.jpg",
      alt: locale === 'sv' ? "Smooth moving day" : "Smooth moving day",
      title: locale === 'sv' ? "Smidig flyttdag" : "Smooth moving day",
      description: locale === 'sv' ? "Vi ser till att varje flyttdag blir så smidig som möjligt." : "We make sure every moving day is as smooth as possible."
    },
    {
      src: "/godtid.webp",
      alt: locale === 'sv' ? "Good time with customers" : "Good time with customers",
      title: locale === 'sv' ? "God tid med kunder" : "Good time with customers",
      description: locale === 'sv' ? "Vi tar oss tid att skapa en positiv upplevelse för våra kunder." : "We take time to create a positive experience for our customers."
    },
    {
      src: "/innanflyttfirmankommer.webp",
      alt: locale === 'sv' ? "Before moving company arrives" : "Before moving company arrives",
      title: locale === 'sv' ? "Innan flyttfirman kommer" : "Before the moving company arrives",
      description: locale === 'sv' ? "Vi förbereder allt noggrant innan flyttfirman kommer." : "We prepare everything carefully before the moving company arrives."
    },
    {
      src: "/kundservice.webp",
      alt: locale === 'sv' ? "Customer service" : "Customer service",
      title: locale === 'sv' ? "Kundservice" : "Customer service",
      description: locale === 'sv' ? "Vår kundservice är alltid tillgänglig för att hjälpa dig." : "Our customer service is always available to help you."
    },
    {
      src: "/magkansla.webp",
      alt: locale === 'sv' ? "Good feeling" : "Good feeling",
      title: locale === 'sv' ? "Magkänsla" : "Good feeling",
      description: locale === 'sv' ? "Vi skapar en trygg och positiv magkänsla kring din flytt." : "We create a safe and positive feeling around your move."
    }
  ];

  // Auto-sliding for team images
  const restartTeamSlide = () => {
    if (teamSlideIntervalRef.current) clearInterval(teamSlideIntervalRef.current);
    teamSlideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allCompanyImages.length);
    }, 4000); // Change every 4 seconds
  };

  const handleTeamTouchStart = (e: React.TouchEvent) => {
    teamTouchStartXRef.current = e.touches[0].clientX;
    teamTouchCurrentXRef.current = null;
  };

  const handleTeamTouchMove = (e: React.TouchEvent) => {
    teamTouchCurrentXRef.current = e.touches[0].clientX;
  };

  const handleTeamTouchEnd = () => {
    if (teamTouchStartXRef.current == null || teamTouchCurrentXRef.current == null) return;
    const deltaX = teamTouchCurrentXRef.current - teamTouchStartXRef.current;
    const threshold = 50;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setCurrentSlide((prev) => (prev + 1) % allCompanyImages.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + allCompanyImages.length) % allCompanyImages.length);
      }
      restartTeamSlide();
    }
    teamTouchStartXRef.current = null;
    teamTouchCurrentXRef.current = null;
  };

  useEffect(() => {
    restartTeamSlide();
    return () => {
      if (teamSlideIntervalRef.current) clearInterval(teamSlideIntervalRef.current);
    };
  }, []);

  return (
        <main className="min-h-screen">
      <div style={{ zoom: '0.80' }}>

      {/* Om oss Section */}
      <section className="relative overflow-hidden py-8">
        {/* Background image absolutely positioned */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/efter_flytt.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 100%',
            zIndex: 0,
          }}
        />
        {/* Overlay absolutely positioned, full width */}
        <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
        
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none"
             style={{
               background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'
             }}
        />
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none"
             style={{
               background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'
             }}
        />
        
        {/* Centered content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 py-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-6 md:mb-8">
              {locale === 'sv' ? 'Om oss' : 'About us'}
            </h2>
          </div>
          <div className="text-[#0F172A] text-lg md:text-2xl leading-tight md:leading-relaxed max-w-4xl md:max-w-5xl mx-auto">
            <p className="mb-8 md:mb-10">
              {locale === 'sv' ? 'Flyttella är en flytt- och städfirma med bas i Stockholm som grundades med målet att göra flyttar och städtjänster enklare, tryggare och mer transparenta. Vi har funnits i 5 år som företag, men har över 8 års erfarenhet i branschen – något som återspeglas i vårt arbetssätt, vår kvalitet och våra nöjda kunder. Hittills har vi haft nöjet att hjälpa över 8000 kunder, både privatpersoner och företag, med allt från små flyttar till helhetslösningar med städning, packning och rådgivning.' : 'Flyttella is a moving and cleaning company based in Stockholm that was founded with the goal of making moves and cleaning services easier, safer and more transparent. We have existed as a company for 5 years, but have over 8 years of experience in the industry – something that is reflected in our way of working, our quality and our satisfied customers. So far we have had the pleasure of helping over 8000 customers, both individuals and companies, with everything from small moves to complete solutions with cleaning, packing and consulting.'}
            </p>
            
            {/* Image after first paragraph */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden">
                <img src="/intro_picture.webp" 
                  alt={locale === 'sv' ? 'Flyttella team' : 'Flyttella team'} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <p className="mb-8 md:mb-10">
              {locale === 'sv' ? 'Det som gör oss unika är vårt fokus på tydliga villkor och fasta priser – hos oss vet du alltid vad som ingår och vad det kostar. Vi erbjuder gratis lån av flyttkartonger, kostnadsfri om- och avbokning upp till 24 timmar innan, samt en generös 14 dagars garanti på alla flyttstädningar. För dig som även bokar packhjälp erbjuder vi packgaranti, vilket innebär att vi tar fullt ansvar för det vi packar.' : 'What makes us unique is our focus on clear terms and fixed prices – with us you always know what\'s included and what it costs. We offer free loan of moving boxes, free rebooking and cancellation up to 24 hours before, as well as a generous 14-day guarantee on all moving cleanings. For you who also book packing help, we offer packing guarantee, which means we take full responsibility for what we pack.'}
            </p>
            
            {/* Image after second paragraph */}
            <div className="my-0 flex justify-center">
              <img src="/recommendedcompany2.webp" 
                alt={locale === 'sv' ? 'Rekommenderad företagsmärkning' : 'Recommended company badge'} 
                className="w-64 md:w-80 h-auto rounded-lg"
              />
            </div>
            
            <br />
            <p className="mb-8 md:mb-10">
              {locale === 'sv' ? 'Vi vet att tid ofta är en bristvara vid flytt, därför har vi utvecklat en smidig offertlösning där du får svar inom 1 minut – helt utan förpliktelser. Bakom allt detta står vår kompetenta och personliga kundtjänst, som alltid finns tillgänglig för att svara på frågor, ge tips och hjälpa dig fatta rätt beslut. Självklart erbjuder vi fri rådgivning i samband med både flytt och städning – allt för att din upplevelse med oss ska kännas enkel och trygg från början till slut.' : 'We know that time is often a scarce resource when moving, which is why we have developed a smooth quote solution where you get an answer within 1 minute – completely without obligations. Behind all this is our competent and personal customer service, which is always available to answer questions, give tips and help you make the right decision. Of course we offer free consultation in connection with both moving and cleaning – all so that your experience with us feels simple and safe from start to finish.'}
            </p>
            
            {/* Image after third paragraph */}
            <div className="my-6 flex justify-center">
              <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden">
                <img src="/specialicering.webp" 
                  alt={locale === 'sv' ? 'Specialisering' : 'Specialization'} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <p className="mb-8 md:mb-10">
              {locale === 'sv' ? 'Vi på Flyttella tror på att bygga långsiktiga relationer genom att leverera hög kvalitet, punktlighet och lyhörd service. Vår filosofi är enkel: ingen kund ska känna sig osäker, stressad eller överraskad av dolda kostnader. Därför har vi tagit fram tjänster och arbetsmetoder som är transparenta, kundvänliga och anpassade efter verkliga behov.' : 'We at Flyttella believe in building long-term relationships by delivering high quality, punctuality and responsive service. Our philosophy is simple: no customer should feel uncertain, stressed or surprised by hidden costs. That\'s why we have developed services and working methods that are transparent, customer-friendly and adapted to real needs.'}
            </p>
            
            {/* Image after "anpassade efter verkliga behov" */}
            <div className="my-6 flex justify-center">
              <img src="/under_flytt.webp" 
                alt={locale === 'sv' ? 'Under flytt - Flyttella team i arbete' : 'During move - Flyttella team at work'} 
                className="w-full h-64 md:h-80 rounded-3xl overflow-hidden object-cover"
                style={{ objectPosition: 'center 80%' }}
              />
            </div>
            <p className="mb-8 md:mb-10">
              {locale === 'sv' ? 'Oavsett om du ska flytta inom Stockholm eller behöver städhjälp efter en renovering eller försäljning, kan du lita på att vi tar hand om det med samma noggrannhet och engagemang varje gång. Vi är stolta över det rykte vi har byggt upp – ett rykte som vilar på förtroende, god kommunikation och ett genuint engagemang för varje kunds unika situation.' : 'Whether you are moving within Stockholm or need cleaning help after a renovation or sale, you can trust that we take care of it with the same care and commitment every time. We are proud of the reputation we have built – a reputation that rests on trust, good communication and a genuine commitment to each customer\'s unique situation.'}
            </p>
            
            {/* Image after fifth paragraph */}
            <div className="mt-6 flex justify-center">
              <img 
                src="/flyttella-logo.png" 
                alt={locale === 'sv' ? 'Flyttella logotyp' : 'Flyttella logo'} 
                className="w-64 md:w-80 h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proud of our reviews section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-2">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Vi är stolta över våra kundomdömen' : 'We are proud of our customer reviews'}</h2>
        <p className="text-lg text-gray-700 -mb-2">{locale === 'sv' ? 'Vi arbetar hårt för att varje kund ska bli nöjd – och det syns i våra recensioner. Läs vad våra kunder tycker om oss!' : 'We work hard to ensure every customer is satisfied – and it shows in our reviews. Read what our customers think about us!'}</p>
      </div>
      <ReviewsWidget hideTitle={true} />

      {/* AutoSlidingCards Section */}
      <motion.section
        className="relative overflow-hidden experience-section"
        style={{
          paddingTop: '15rem',
          paddingBottom: '4rem',
          marginTop: '-2rem',
          borderTop: 'none',
          boxShadow: 'none',
          zIndex: 10,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AutoSlidingCards />
      </motion.section>

      {/* Våra förmåner slider */}
      <div className="md:hidden mb-3">
        {/* Responsive zoom wrapper for wide screens */}
        <div className="responsive-zoom">
          <div className="pt-8" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-4">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4">
                <div className="flex flex-col items-stretch gap-4 h-full">
                  {/* Features content */}
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">{locale === 'sv' ? 'Våra förmåner' : 'Our benefits'}</h2>
                    
                    {/* Mobile: Sliding carousel */}
                    <div className="relative overflow-hidden rounded-xl" onTouchStart={handleFeatureTouchStart} onTouchMove={handleFeatureTouchMove} onTouchEnd={handleFeatureTouchEnd}>
                        <div 
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}
                        >
                          {[
                            {
                              icon: "💰",
                              title: locale === 'sv' ? "Fast pris" : "Fixed price",
                              description: locale === 'sv' ? "Inga överraskningar - vi erbjuder både fasta priser och möjlighet till löpande priser" : "No surprises - we offer both fixed prices and the possibility of ongoing prices",
                              link: "/priser"
                            },
                            {
                              icon: "📋",
                              title: locale === 'sv' ? "RUT-avdrag" : "RUT deduction",
                              description: locale === 'sv' ? "Vi hanterar allt pappersarbete för RUT-avdrag" : "We handle all paperwork for RUT deduction",
                              link: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html"
                            },
                            {
                              icon: "📦",
                              title: locale === 'sv' ? "Fritt lån av kartonger i 4 veckor" : "Free loan of boxes for 4 weeks",
                              description: locale === 'sv' ? "Specialgjorda flyttkartonger med vår logga" : "Custom-made moving boxes with our logo",
                              link: "/kartonger"
                            },
                            {
                              icon: "⏰",
                              title: locale === 'sv' ? "Omboka eller avboka kostnadsfritt" : "Rebook or cancel for free",
                              description: locale === 'sv' ? "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten" : "Rebook or cancel for free up to 24 hours before the move",
                              link: "/avbokning"
                            },
                            {
                              icon: "✅",
                              title: locale === 'sv' ? "Nöjd kund garanti" : "Satisfied customer guarantee",
                              description: locale === 'sv' ? "14 dagars garanti på flyttstädning" : "14 day guarantee on moving cleaning",
                              link: "/garanti"
                            },
                            {
                              icon: "🔒",
                              title: locale === 'sv' ? "Trafiktillstånd och försäkring" : "Traffic permit and insurance",
                              description: locale === 'sv' ? "Alla nödvändiga tillstånd och försäkringar på plats" : "All necessary permits and insurance in place",
                              link: "/tillstand"
                            },
                            {
                              icon: "🎓",
                              title: locale === 'sv' ? "Utbildad personal" : "Trained staff",
                              description: locale === 'sv' ? "Vår personal är utbildad för att säkerställa högsta kvalitet och service." : "Our staff is trained to ensure the highest quality and service.",
                              link: "/om-oss"
                            },
                            {
                              icon: "📈",
                              title: locale === 'sv' ? "Ledningssystem" : "Management system",
                              description: locale === 'sv' ? "Vi arbetar med effektiva ledningssystem för att garantera struktur och kvalitet." : "We work with effective management systems to guarantee structure and quality.",
                              link: "/om-oss"
                            },
                            {
                              icon: "🦺",
                              title: locale === 'sv' ? "Arbetsmiljö" : "Work environment",
                              description: locale === 'sv' ? "Vi prioriterar en trygg och säker arbetsmiljö för både kunder och personal." : "We prioritize a safe and secure work environment for both customers and staff.",
                              link: "/om-oss"
                            }
                          ].map((feature, index) => (
                            <div key={feature.icon} className="w-full flex-shrink-0">
                              <motion.div 
                                className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2"
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeInUp}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                              >
                                <div className="flex items-start gap-3 h-full">
                                  <motion.span
                                    className="text-2xl"
                                    initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }}
                                    animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [ -180, 20, 0 ], color: ['#10B981', '#34D399', '#10B981'] }}
                                    transition={{ duration: 1, delay: index * 0.1 + 0.2, type: 'tween', ease: 'easeInOut' }}
                                  >
                                    {feature.icon}
                                  </motion.span>
                                  <div className="flex-1">
                                    <h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4>
                                    <p className="text-white/80 text-sm mb-2">{feature.description}</p>
                                    {feature.title === "RUT-avdrag" && (
                                      <a 
                                        href={feature.link}
                                        target={feature.link.startsWith('http') ? '_blank' : undefined}
                                        rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-white/90 hover:text-white transition-colors text-sm inline-flex items-center"
                                      >
                                        Läs mer
                                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Arrow controls */}
                        <button
                          type="button"
                          aria-label={locale === 'sv' ? 'Föregående' : 'Previous'}
                          onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 111.06 1.06L10.56 12l5.22 5.22a.75.75 0 010 1.06z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          aria-label={locale === 'sv' ? 'Nästa' : 'Next'}
                          onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L13.44 12 8.22 6.78a.75.75 0 010-1.06z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team in Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              {locale === 'sv' ? 'Se vårt team i arbete' : 'See our team at work'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'sv' ? 'Ta en titt på våra professionella medarbetare och se hur vi arbetar för att göra din flytt så smidig som möjligt.' : 'Take a look at our professional employees and see how we work to make your move as smooth as possible.'}
            </p>
          </div>
          
          {/* Horizontal Sliding Team Images */}
          <div className="relative overflow-hidden rounded-2xl max-w-7xl mx-auto" onTouchStart={handleTeamTouchStart} onTouchMove={handleTeamTouchMove} onTouchEnd={handleTeamTouchEnd}>
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {allCompanyImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <motion.div
                    className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 mx-2 md:mx-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative h-96 md:h-[500px] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                        style={{
                          objectPosition: image.src === "/smiling_worker_new.webp" ? "center top" : 
                                         image.src === "/smidigflyttdag.jpg" ? "center 40%" : 
                                         image.src === "/kundservice.webp" ? "center 40%" : "center center"
                                        
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white text-lg md:text-2xl font-bold mb-2">{image.title}</h3>
                        <p className="text-white/90 text-sm md:text-base">
                          {image.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4 w-10 h-10 md:w-14 md:h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 md:w-7 md:h-7 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Arrow controls */}
            <button
              type="button"
              aria-label="Föregående"
              onClick={() => { setCurrentSlide((prev) => (prev - 1 + allCompanyImages.length) % allCompanyImages.length); restartTeamSlide(); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 text-[#0F172A]/80 hover:text-[#0F172A] transition-colors p-2 -m-2 bg-white/90 rounded-full shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
                <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 111.06 1.06L10.56 12l5.22 5.22a.75.75 0 010 1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Nästa"
              onClick={() => { setCurrentSlide((prev) => (prev + 1) % allCompanyImages.length); restartTeamSlide(); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 text-[#0F172A]/80 hover:text-[#0F172A] transition-colors p-2 -m-2 bg-white/90 rounded-full shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
                <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L13.44 12 8.22 6.78a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {allCompanyImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#10B981]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          
        </div>
      </section>

      {/* Rest of Content */}
      <div className="container mx-auto px-4 py-16">

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Professionalism */}
          <motion.div 
            className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {locale === 'sv' ? 'Professionalism' : 'Professionalism'}
            </h2>
            <ul className="space-y-3">
              {[
                locale === 'sv' ? "Erfaren personal" : "Experienced staff",
                locale === 'sv' ? "Kvalificerad utbildning" : "Qualified training",
                locale === 'sv' ? "Modern utrustning" : "Modern equipment",
                locale === 'sv' ? "Effektiva processer" : "Efficient processes",
                locale === 'sv' ? "Punktlighet" : "Punctuality",
                locale === 'sv' ? "Transparens" : "Transparency",
                locale === 'sv' ? "Kvalitetskontroll" : "Quality control",
                locale === 'sv' ? "Kontinuerlig utveckling" : "Continuous development"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quality */}
          <motion.div 
            className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {locale === 'sv' ? 'Kvalitet' : 'Quality'}
            </h2>
            <ul className="space-y-3">
              {[
                locale === 'sv' ? "Höga standarder" : "High standards",
                locale === 'sv' ? "Grundliga processer" : "Thorough processes",
                locale === 'sv' ? "Kvalitetskontroll" : "Quality control",
                locale === 'sv' ? "Kundnöjdhet" : "Customer satisfaction",
                locale === 'sv' ? "Miljöhänsyn" : "Environmental consideration",
                locale === 'sv' ? "Säkerhet" : "Safety",
                locale === 'sv' ? "Ansvarsförsäkring" : "Liability insurance",
                locale === 'sv' ? "Garantier" : "Guarantees"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Focus */}
          <motion.div 
            className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {locale === 'sv' ? 'Kundfokus' : 'Customer Focus'}
            </h2>
            <ul className="space-y-3">
              {[
                locale === 'sv' ? "Personlig service" : "Personal service",
                locale === 'sv' ? "Flexibla lösningar" : "Flexible solutions",
                locale === 'sv' ? "Transparent kommunikation" : "Transparent communication",
                locale === 'sv' ? "Snabb respons" : "Quick response",
                locale === 'sv' ? "Anpassade erbjudanden" : "Customized offers",
                locale === 'sv' ? "Lyhörd kundservice" : "Responsive customer service",
                locale === 'sv' ? "Uppföljning" : "Follow-up",
                locale === 'sv' ? "Nöjd-kund-garanti på flyttstädning" : "Satisfied customer guarantee on moving cleaning"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            {locale === 'sv' ? 'Vårt team' : 'Our team'}
          </h2>
          <p className="text-white/90 mb-6">
            {locale === 'sv' ? 'Våra medarbetare är hjärtat i vår verksamhet. Vi investerar i kontinuerlig utbildning och utveckling för att säkerställa att vi alltid levererar den bästa möjliga servicen.' : 'Our employees are the heart of our business. We invest in continuous training and development to ensure we always deliver the best possible service.'}
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              locale === 'sv' ? "Erfarna flyttare" : "Experienced movers",
              locale === 'sv' ? "Utbildade städare" : "Trained cleaners",
              locale === 'sv' ? "Certifierade specialister" : "Certified specialists",
              locale === 'sv' ? "Serviceinriktade medarbetare" : "Service-oriented employees",
              locale === 'sv' ? "Kvalitetsansvariga" : "Quality responsible",
              locale === 'sv' ? "Kundservice-team" : "Customer service team"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            {locale === 'sv' ? 'Låt oss hjälpa dig med dina behov' : 'Let us help you with your needs'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === 'sv' ? 'Vi är redo att hjälpa dig med din flytt, städning eller med någon av våra andra tjänster. Kontakta oss för en kostnadsfri offert och personlig rådgivning.' : 'We are ready to help you with your move, cleaning or with any of our other services. Contact us for a free quote and personal consultation.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/offert" 
              className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              {locale === 'sv' ? 'Få offert' : 'Get quote'}
            </Link>
            <Link 
              href="/kontakt" 
              className="inline-block bg-white border-2 border-[#0F172A] text-[#0F172A] px-8 py-3 rounded-full hover:bg-[#0F172A] hover:text-white transition-colors font-medium"
            >
              {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
} 