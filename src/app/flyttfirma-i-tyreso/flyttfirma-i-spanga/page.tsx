'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import FlyttoffertForm from '../../components/FlyttoffertForm';
import StadningOffertFormCustomAkersberga from "../../components/StadningOffertFormCustomAkersberga";
import ReviewsWidget from '../../components/ReviewsWidget';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import { Variants } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface TipCardProps {
  title: string;
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
}

const TipCard: React.FC<TipCardProps> = ({ title, content, imageSrc, imageAlt, objectPosition = 'object-center' }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
    {imageSrc && (
      <Image
        src={imageSrc}
        alt={imageAlt || ''}
        width={400}
        height={200}
        className={`w-full h-48 object-cover ${objectPosition}`}
      />
    )}
    <div className="p-6">
      <h4 className="text-2xl font-bold text-[#0F172A] mb-3">{title}</h4>
      <div className="text-gray-700 text-lg leading-relaxed">{content}</div>
    </div>
  </div>
);

// AutoSlidingCards component
const AutoSlidingCards = ({ t }: { t: (key: string) => string }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showFullExperienceText, setShowFullExperienceText] = useState(false);
  const autoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);
  
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

  const cards = [
    {
      title: t('alvsjo.stats.moves'),
      count: "8000+",
      description: "uppdrag utförda",
      delay: 0
    },
    {
      title: t('alvsjo.stats.cleanings'),
      count: "7000+",
      description: "uppdrag utförda",
      delay: 1
    },
    {
      title: t('alvsjo.stats.monthly'),
      count: "500+",
      description: "uppdrag per månad",
      delay: 2
    }
  ];

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
          <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('spanga.experienceSection.title')}</h3>
          
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
                aria-label={t('alvsjo.navigation.previous')}
                onClick={() => { setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length); restartAutoSlide(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-25 text-white/80 hover:text-white transition-colors p-2 -m-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 111.06 1.06L10.56 12l5.22 5.22a.75.75 0 010 1.06z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={t('alvsjo.navigation.next')}
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
                {t('spanga.experience.title')}
              </h4>
              <p className="text-lg md:text-2xl text-[#0F172A] leading-relaxed mb-3 md:mb-4">
                {t('spanga.experience.description')}
              </p>
              {/* Mobile: Läs mer button */}
              {!showFullExperienceText && (
                <div className="md:hidden mb-3">
                  <motion.button
                    onClick={() => setShowFullExperienceText(true)}
                    className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4"
                  >
                    {t('alvsjo.about.readMore')}
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
                    {t('spanga.experience.expanded')}
                  </p>
                </motion.div>
              )}
              <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                {t('spanga.experience.expanded')}
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
                    alt="1000+ positiva recensioner från kunder"
                    width={200}
                    height={200}
                    className="object-contain h-36 w-36"
                    priority={false}
                  />
                </motion.div>
                {/* Bottom row - two badges */}
                <div className="flex items-center justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/recommendedcompany2.png"
                      alt="Rekommenderad flyttfirma - Flyttella"
                      width={160}
                      height={160}
                      className="object-contain h-32 w-32"
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
              
              {/* Desktop: Original horizontal layout */}
              <div className="hidden md:flex items-center justify-center gap-6">
              <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                <Image
                  src="/recommendedcompany2.png"
                  alt="Rekommenderad flyttfirma - Flyttella"
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

// Lottie component functions
function FillFormLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/fillform.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

  return (
      <div ref={ref} className="w-14 h-14 mx-auto mb-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function FastLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/fast.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-14 h-14 mx-auto mb-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function PhoneCallLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/phonecall.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-20 h-20 mx-auto mb-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function SignFormLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/signform.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-20 h-20 mx-auto mb-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function MovingTruckLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/movingtruck.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-36 h-36 mx-auto mb-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }
  
  function HappyCustomerLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/happycustomer.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-24 h-24 flex items-center justify-center -m-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function CashLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/cash.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-32 h-32 flex items-center justify-center -m-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function BoxesLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/boxes.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-24 h-24 flex items-center justify-center -m-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function InsuranceLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/insurance.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-24 h-24 flex items-center justify-center -m-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function ScheduleLottie() {
    const [animationData, setAnimationData] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (isVisible) {
      fetch("/schedule2.json")
        .then((res) => res.json())
        .then(setAnimationData);
      }
    }, [isVisible]);

    return (
      <div ref={ref} className="w-24 h-24 flex items-center justify-center -m-2">
        {animationData && <Lottie animationData={animationData} loop autoplay />}
      </div>
    );
  }

  function FeatureBoxesSection({ t }: { t: (key: string) => string }) {
    // Animation for insurance logos
    const [logoIndex, setLogoIndex] = React.useState(0);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setLogoIndex((prev) => (prev + 1) % 2);
      }, 1800);
      return () => clearInterval(interval);
    }, []);
  
    const variants = {
      initial: { opacity: 0, y: 20 },
      animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
        },
      }),
    };
  
    const insuranceLogos = (
      <div className="flex items-center justify-between w-full">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [1, 0.9, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex items-center gap-3"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span className="font-medium text-[#0F172A] text-base leading-tight">
            Försäkring
          </span>
        </motion.div>
        <div className="flex items-center gap-4">
          <Image
            src="/fora-logo.png"
            alt="FORA"
            width={36}
            height={36}
            className="object-contain"
          />
          <Image
            src="/trygg-hansa-logo.png"
            alt="Trygg Hansa"
            width={80}
            height={80}
            className="object-contain"
          />
                  </div>
                </div>
    );
  
    const features = [
                  {
                    key: "pack-garanti",
                    label: t('alvsjo.features.items.packGuarantee'),
                    icon: (
                      <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center">
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2"/></svg>
                      </motion.div>
                    ),
                  },
                  {
                    key: "kundgaranti",
                    label: t('alvsjo.features.items.customerGuarantee'),
                    icon: (
                      <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible">
                        <HappyCustomerLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "kartonger",
                    label: t('alvsjo.features.items.freeBoxes'),
                    icon: (
                      <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center overflow-visible">
                        <BoxesLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "rut-avdrag",
                    label: t('alvsjo.features.items.rutDeduction'),
                    icon: (
                      <motion.div variants={variants} animate="wiggle" className="h-8 w-8 flex items-center justify-center overflow-visible">
                        <CashLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "ombokning-avbokning",
                    label: t('alvsjo.features.items.freeReschedule'),
                    icon: (
                      <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible">
                        <ScheduleLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "tillstand",
                    label: t('alvsjo.features.items.permitsInsurance'),
                    icon: (
                      <div className="flex items-center justify-start w-full">
                        <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center mr-4 overflow-visible">
                          <InsuranceLottie />
                        </motion.div>
                        <span className="font-medium text-[#0F172A] text-left text-base leading-tight flex-grow">
                          {t('alvsjo.features.items.permitsInsurance')}
                        </span>
                        <div className="flex items-center ml-4">
                          <Image src="/trygg-hansa-logo.png" alt="Trygg Hansa Logo" width={120} height={120} className="object-contain" />
                          <Image src="/fora-logo.png" alt="Fora Logo" width={60} height={60} className="object-contain ml-2" />
                        </div>
                      </div>
                    ),
                  },
    ];
  
    return (
      <div className="w-full my-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center mb-12 mt-2">
            {t('spanga.features.title')}
          </h2>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch justify-center w-full gap-0 md:gap-8">
          {/* Left: Animated boxes with icons and labels */}
          <div className="w-full md:w-2/5 flex flex-col justify-between items-center py-4 gap-4">
            {features.map((feature, i) => (
                  <motion.div
                    key={feature.key}
                    className="flex items-center gap-4 bg-white border border-[#10B981] rounded-xl shadow px-8 py-8 w-full max-w-md transition-transform duration-200"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={variants}
                    custom={i}
                  >
                    {feature.icon}
                    {feature.key !== "tillstand" && (
                      <span className="font-medium text-[#0F172A] text-left text-lg leading-tight">
                        {feature.label}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
              {/* Right: Image */}
              <div className="w-full md:w-2/5 relative">
                <Image
                  src="/personalpicture.webp"
              alt="Professionell flyttfirma i Årsta - Erfarenhet i Söderort"
                  fill
                  className="rounded-2xl shadow object-cover object-right"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

export default function FlyttfirmaAkersbergaPage() {
  const { t, locale } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const [expandedTipSection, setExpandedTipSection] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Auto-sliding for feature cards
  const restartFeatureAutoSlide = () => {
    if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    featureIntervalRef.current = setInterval(() => {
      setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards);
    }, 3000);
  };

  useEffect(() => {
    restartFeatureAutoSlide();
    return () => {
      if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    };
  }, []);

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
    const threshold = 50; // px
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

  // Animation variants
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
      {/* Hero Section */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          {/* Mobile: Form only */}
          <div className="md:hidden mx-auto px-4 pb-8">
            {selectedServiceType === 'flyttstad' ? (
              <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
            ) : (
              <FlyttoffertForm 
                mode="widget" 
                backgroundImage="/spanga-flyttfirma.jpg" 
                onServiceTypeSelect={setSelectedServiceType}
              />
            )}
          </div>
          
          {/* Mobile: Hero content after form */}
          <div className="md:hidden mx-auto px-4 py-6">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/spanga-flyttfirma.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl font-bold">
          {t('spanga.hero.title')}
              </h1>
        <p className="text-xl">
          {t('spanga.hero.subtitle')}
              </p>
            </div>
            </div>
          </div>
          
          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{
                  backgroundImage: 'url(/spanga-flyttfirma.jpg)', 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            {t('spanga.hero.title')}
          </h1>
          <p className="text-2xl md:text-3xl mb-12">
            {t('spanga.hero.subtitle')}
          </p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm 
                      mode="widget" 
                      backgroundImage="/spanga-flyttfirma.jpg" 
                      onServiceTypeSelect={setSelectedServiceType}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Om Flyttella Section */}
        <motion.section
          className="relative overflow-hidden py-16 md:py-24 lg:py-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background image absolutely positioned */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/efter_flytt.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              zIndex: 0,
            }}
          />
          {/* Overlay absolutely positioned, full width */}
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 w-full h-16 md:h-20 lg:h-24 z-30 pointer-events-none"
               style={{
                 background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'
               }}
          />
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 lg:h-24 z-10 pointer-events-none"
               style={{
                 background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'
               }}
          />
          
          

          {/* Centered content */}
          <div className="relative z-40 max-w-[90rem] mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Mobile image above title (inside container to match bohagsflytt) */}
              <div className="lg:hidden mb-6">
                <div className="relative w-full h-80 rounded-3xl overflow-hidden">
                  <Image
                    src="/personalpicture.webp"
                    alt="Flyttella personal - Lokala experter på flytt i Årstas bostadsområden"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 70%' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-8 md:mb-12 lg:mb-16 text-center">{t('spanga.about.title')}</h3>
              
              {/* Text content with image on desktop */}
              <div className="relative flex flex-col lg:flex-row items-stretch gap-8 md:gap-12 lg:gap-16">
                {/* Left: Image - desktop only */}
                <motion.div
                  className="hidden lg:block w-full lg:w-1/4 relative"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={variants}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.2
                  }}
                >
                  <div className="relative w-full h-full min-h-[32rem] overflow-hidden rounded-2xl">
                    <Image
                      src="/omoss.webp"
                      alt="Om Flyttella - Årstas pålitliga flyttfirma med lokalkännedom"
                      fill
                      className="object-cover rounded-2xl"
                      style={{ 
                        objectPosition: 'center center'
                      }}
                      priority
                    />
                  </div>
                </motion.div>
                
                {/* Right: Text content */}
                <motion.div
                  className="w-full lg:w-3/4 space-y-4 md:space-y-6 lg:space-y-8 flex flex-col justify-center"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={variants}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4
                  }}
                >
                  {/* Desktop: Always show full text */}
                <div className="hidden lg:block space-y-8">
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    {t('spanga.about.desktop')}
                  </p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    {t('spanga.about.desktop2')}
                  </p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                    {t('spanga.about.desktop3')}
                  </p>
                </div>
                  
                  {/* Mobile: Show shortened text with expand option */}
                  <div className="lg:hidden space-y-4 text-center">
                    <div className="text-left inline-block max-w-2xl">
                      <p className="text-base md:text-lg text-[#0F172A] leading-relaxed">
                        {t('spanga.about.desktop')}
                        {showFullAboutText && (
                          <>
                            {' '}{t('spanga.about.desktop2')}
                          </>
                        )}
                      </p>
                      {showFullAboutText && (
                        <p className="text-base md:text-lg text-[#0F172A] leading-relaxed mt-4">
                          {t('spanga.about.desktop3')}
                        </p>
                      )}
                    </div>
                    
                    {/* Läs mer button - Mobile */}
                    <div className="text-center">
                      {!showFullAboutText ? (
                        <button
                          onClick={() => setShowFullAboutText(true)}
                          className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-base underline decoration-2 underline-offset-4"
                        >
                          {t('alvsjo.about.readMore')}
                        </button>
                      ) : (
                        <Link
                          href="/om-oss"
                          className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-base underline decoration-2 underline-offset-4"
                        >
                          {t('alvsjo.about.readMoreAbout')}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
              </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Läs mer om oss link - Desktop only */}
                  <motion.div
                    className="pt-6 hidden lg:block"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={variants}
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



        {/* Vilka förmåner får du med Flyttella? Section */}
          <FeatureBoxesSection t={t} />

        {/* Reviews Section */}
        <ReviewsWidget 
          location="Spånga"
          title={t('spanga.customerReviews.title')}
          subtitle={t('spanga.reviews.subtitle')}
          description={t('spanga.reviews.description')}
          badgeAlt={t('spanga.reviews.badgeAlt')}
          arrowText={t('spanga.reviews.arrowText')}
        />

        {/* Redo att börja din flytt? */}
        <section className="py-16 bg-white mt-8 md:-mt-20 -mb-16">
          <div className="mx-auto px-4">
            <motion.div
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[200px] w-full max-w-3xl mx-auto text-center"
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
              <div className="flex items-center gap-4 relative z-10 mb-4">
                <span className="text-4xl">🚚</span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {t('alvsjo.cta.title')}
                  </h3>
                  <p className="text-lg text-gray-100">
                    {t('alvsjo.cta.subtitle')}
                  </p>
                </div>
              </div>
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link 
                    href="#flytt-offert"
                    className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base"
                  >
                    {t('alvsjo.cta.button')}
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
              </div>
            </motion.div>
        </div>
      </section>

        {/* Process and Features Section */}
        <section className="section-padding bg-white relative overflow-hidden"
          style={{ borderBottom: 'none', boxShadow: 'none' }}>
          <div className="mx-auto px-0 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full relative">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
                  {t('alvsjo.processSection.title')}
            </h2>

                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
                    {t('spanga.processSection.description')}
                  </p>
            </div>

                {/* Process Flow Section */}
                <div className="mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{t('alvsjo.processSection.subtitle')}</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        {
                          icon: <FillFormLottie />,
                          title: t('alvsjo.process.fillForm'),
                          description: t('alvsjo.process.fillFormDesc'),
                          textClass: ""
                        },
                        {
                          icon: <FastLottie />,
                          title: t('alvsjo.process.quickQuote'),
                          description: t('alvsjo.process.quickQuoteDesc'),
                          textClass: ""
                        },
                        {
                          icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
                          title: t('alvsjo.process.signConfirm'),
                          description: t('alvsjo.process.signConfirmDesc'),
                          containerClass: "md:-mt-6",
                          textClass: ""
                        },
                        {
                          icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
                          title: t('alvsjo.process.personalContact'),
                          description: t('alvsjo.process.personalContactDesc'),
                          containerClass: "md:-mt-7",
                          textClass: ""
                        },
                        {
                          icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
                          title: t('alvsjo.process.moveCompleted'),
                          description: t('alvsjo.process.moveCompletedDesc'),
                          containerClass: "md:-mt-14",
                          textClass: "md:-mt-8",
                        },
                        {
                          icon: <div className="md:mt-0"><HappyCustomerLottie /></div>,
                          title: t('alvsjo.process.satisfiedCustomer'),
                          description: t('alvsjo.process.satisfiedCustomerDesc'),
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
                          variants={variants}
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
        </section>

        

        {/* 5. Vår erfarenhet */}
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
          <AutoSlidingCards t={t} />
        </motion.section>

         {/* 6. Våra fördelar - Desktop only */}
        {/* Responsive zoom wrapper for wide screens */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-8 md:pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-0 md:px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-none md:rounded-2xl p-4 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-4 md:gap-8 h-full">
                  {/* Left side - Features content */}
                  <div className="flex-[2] w-full md:flex-[2]">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center lg:text-left">{locale === 'sv' ? 'Våra förmåner' : 'Our benefits'}</h2>
                    
                    {/* Mobile: Sliding carousel */}
                    <div className="md:hidden">
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
                              title: locale === 'sv' ? "Omboka eller avboka kostnadsfritt" : "Reschedule or cancel free of charge",
                              description: locale === 'sv' ? "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten" : "Reschedule or cancel free of charge up to 24 hours before the move",
                              link: "/avbokning"
                            },
                            {
                              icon: "✅",
                              title: locale === 'sv' ? "Nöjd kund garanti" : "Satisfied customer guarantee",
                              description: locale === 'sv' ? "14 dagars garanti på flyttstädning" : "14-day guarantee on moving cleaning",
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
                                className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg text-white flex flex-col h-full mx-2 md:mx-4"
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeInUp}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                              >
                                <div className="flex items-start gap-3 h-full">
                                  <motion.span
                                    className="text-2xl md:text-3xl"
                                    initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }}
                                    animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [ -180, 20, 0 ], color: ['#10B981', '#34D399', '#10B981'] }}
                                    transition={{ duration: 1, delay: index * 0.1 + 0.2, type: 'tween', ease: 'easeInOut' }}
                                  >
                                    {feature.icon}
                                  </motion.span>
                                  <div className="flex-1">
                                    <h4 className="text-white font-semibold text-base md:text-lg mb-1 md:mb-2">{feature.title}</h4>
                                    <p className="text-white/80 text-sm md:text-base mb-2 md:mb-3">{feature.description}</p>
                                    {(feature.title === "RUT-avdrag" || feature.title === "RUT deduction") && (
                                      <a 
                                        href={feature.link}
                                        target={feature.link.startsWith('http') ? '_blank' : undefined}
                                        rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center"
                                      >
                                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
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
                          aria-label={t('alvsjo.navigation.previous')}
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
                    
                    {/* Desktop: Original grid layout */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
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
                          title: locale === 'sv' ? "Omboka eller avboka kostnadsfritt" : "Reschedule or cancel free of charge",
                          description: locale === 'sv' ? "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten" : "Reschedule or cancel free of charge up to 24 hours before the move",
                          link: "/avbokning"
                        },
                        {
                          icon: "✅",
                          title: locale === 'sv' ? "Nöjd kund garanti" : "Satisfied customer guarantee",
                          description: locale === 'sv' ? "14 dagars garanti på flyttstädning" : "14-day guarantee on moving cleaning",
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
                    ].map((feature, i) => (
                      <motion.div
                        key={feature.icon}
                        className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full"
                          initial="initial"
                          whileInView="animate"
                        viewport={{ once: true, amount: 0.2 }}
                          variants={variants}
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
                            {feature.title === "RUT-avdrag" && (
                          <a 
                            href={feature.link}
                            target={feature.link.startsWith('http') ? '_blank' : undefined}
                            rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center"
                          >
                                {locale === 'sv' ? 'Läs mer' : 'Read more'}
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                          </a>
                            )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
          </div>

                  {/* Right side - Image (Desktop only) */}
                  <div className="hidden md:flex flex-1 justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch justify-center md:justify-start">
                      {/* Desktop: smiling_worker_new.webp */}
                    <Image
                      src="/smiling_worker_new.webp"
                    alt="Glad flyttarbetare i Årsta - Professionell service i Söderort"
                      width={600}
                      height={200}
                        className="rounded-xl shadow-lg object-cover w-full h-full max-w-56 md:max-w-none"
                      style={{ objectPosition: '30% 80%' }}
                      priority={false}
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         {/* Mobile only: Våra förmåner moved here */}
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
                                title: locale === 'sv' ? "Omboka eller avboka kostnadsfritt" : "Reschedule or cancel free of charge",
                                description: locale === 'sv' ? "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten" : "Reschedule or cancel free of charge up to 24 hours before the move",
                                link: "/avbokning"
                              },
                              {
                                icon: "✅",
                                title: locale === 'sv' ? "Nöjd kund garanti" : "Satisfied customer guarantee",
                                description: locale === 'sv' ? "14 dagars garanti på flyttstädning" : "14-day guarantee on moving cleaning",
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
                                      {(feature.title === "RUT-avdrag" || feature.title === "RUT deduction") && (
                                        <a 
                                          href={feature.link}
                                          target={feature.link.startsWith('http') ? '_blank' : undefined}
                                          rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                          className="text-white/90 hover:text-white transition-colors text-sm inline-flex items-center"
                                        >
                                          {locale === 'sv' ? 'Läs mer' : 'Read more'}
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

        {/* Awards Section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              {/* Mobile: Text first, then image */}
              <div className="w-full md:hidden text-center mb-4">
                <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-3 md:mb-6">{t('spanga.awards.title')}</h2>
                <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
                  {t('spanga.awards.description')}
                </p>
              </div>
              
              {/* Mobile: Image below text */}
              <div className="w-full md:w-3/5 flex justify-center order-2 md:order-2">
                <Image
                  src="/awards_no_bg.png"
                  alt="Flyttellas utmärkelser - Flyttfirma i Årsta"
                  width={1200}
                  height={600}
                  className="object-contain w-full h-auto max-w-2xl md:max-w-3xl"
                  priority
                />
              </div>
              
              {/* Desktop: Text on the right */}
              <div className="hidden md:flex w-full md:w-2/5 md:order-1 text-left flex-col items-start justify-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">{t('spanga.awards.title')}</h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  {t('spanga.awards.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Redo att börja din flytt? - Second Card */}
        <section className="pt-0 pb-8 mt-8 md:mt-0 bg-white">
          <div className="mx-auto px-4">
            <motion.div
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[200px] w-full max-w-3xl mx-auto text-center"
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
              <div className="flex items-center gap-4 relative z-10 mb-4">
                <span className="text-4xl">🚚</span>
            <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {t('alvsjo.cta.title')}
              </h3>
                  <p className="text-lg text-gray-100">
                    {t('alvsjo.cta.subtitle')}
                  </p>
                </div>
              </div>
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link 
                    href="#flytt-offert"
                    className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base"
                  >
                    {t('alvsjo.cta.button')}
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
              </div>
            </motion.div>
          </div>
        </section>

        {/* Våra andra huvudtjänster Section */}
        <section className="pt-8 pb-16 mt-8 md:mt-0 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                {t('alvsjo.services.title')}
              </h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Flyttstädning Card */}
                <motion.div
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
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
                  <div className="flex items-center gap-4 mb-6 relative">
                    <span className="text-4xl">✨</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {t('alvsjo.services.flyttstadning.title')}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-100 mb-6 relative">
                    {t('alvsjo.services.flyttstadning.description')}
                  </p>
                  <p className="hidden md:block text-lg text-gray-100 mb-6 relative">
                    {t('alvsjo.services.flyttstadning.extra')}
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
                        {t('alvsjo.servicesSection.readMore')}
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
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
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
                  <div className="flex items-center gap-4 mb-6 relative">
                    <span className="text-4xl">🏢</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {t('alvsjo.services.storage.title')}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-100 mb-6 relative">
                    {t('alvsjo.services.storage.description')}
                  </p>
                  <p className="hidden md:block text-lg text-gray-100 mb-6 relative">
                    {t('alvsjo.services.storage.extended')}
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
                        {t('alvsjo.servicesSection.readMore')}
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
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
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
                  <div className="flex items-center gap-4 mb-6 relative">
                    <span className="text-4xl">📦</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {t('alvsjo.services.packing.title')}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-100 mb-6 relative">
                    {t('alvsjo.services.packing.description')}
                  </p>
                  <p className="hidden md:block text-lg text-gray-100 mb-6 relative">
                    {t('alvsjo.services.packing.extended')}
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
                        {t('alvsjo.servicesSection.readMore')}
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

        {/* Se alla våra tjänster Section */}
        <motion.section 
          className="py-24 bg-white text-[#0F172A] relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0 * 0.25
                }}
                id="upptack-tjanster"
              >
                  {t('spanga.servicesSection.title')}
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-[#0F172A]/90"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0 * 0.25
                }}
              >
                  {t('spanga.servicesSection.description')}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.2
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/tjanster" 
                    className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                  >
                    {t('spanga.servicesSection.privateServices')}
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
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/foretag" 
                    className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                  >
                    {t('alvsjo.servicesSection.businessServices')}
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

        {/* Tips för din flytt Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('alvsjo.tips.title')}</h2>
              
              <div className="space-y-4 md:space-y-16">
                
                {/* Innan flytten */}
                <div>
                  {/* Mobile: Expandable section header */}
                  <div className="md:hidden mb-4">
                    <button
                      onClick={() => setExpandedTipSection(expandedTipSection === 'innan' ? null : 'innan')}
                      className="w-full flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <h3 className="text-xl font-bold text-white">{t('alvsjo.tips.before.title')}</h3>
                      <svg 
                        className={`w-6 h-6 transition-transform duration-300 ${expandedTipSection === 'innan' ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Desktop: Always visible title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">{t('alvsjo.tips.before.title')}</h3>
                  
                  {/* Mobile: Expandable content */}
                  <div className={`md:block ${expandedTipSection === 'innan' ? 'block' : 'hidden'}`}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <TipCard
                      title={t('alvsjo.tips.before.planning.title')}
                      imageSrc="/tipsforflytt.jpg"
                      imageAlt="Flyttplanering i Årsta - Tips för flytt"
                      content={
                        <ul className="list-disc pl-5 space-y-2">
                          {(t('alvsjo.tips.before.planning.content', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                ))}
              </ul>
                      }
                    />
                    <TipCard
                      title={t('alvsjo.tips.before.documents.title')}
                      imageSrc="/viktigaavtalcustomer.webp"
                      imageAlt="Viktiga avtal för flytt i Årsta"
                      content={
                        <ul className="list-disc pl-5 space-y-2">
                          {(t('alvsjo.tips.before.documents.content', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      }
                    />
                    <TipCard
                        title={t('alvsjo.tips.before.decluttering.title')}
                        imageSrc="/innanflyttfirmankommer.webp"
                        imageAlt="Förberedelse för flytt i Årsta"
                        objectPosition="object-[center_45%]"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            {(t('alvsjo.tips.before.decluttering.content', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        }
                    />
                    <TipCard
                      title={t('alvsjo.tips.before.packing.title')}
                      imageSrc="/packing_tips.webp"
                      imageAlt="Packningstips för flytt i Årsta"
                      content={
                        <ul className="list-disc pl-5 space-y-2">
                          {(t('alvsjo.tips.before.packing.content', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      }
                    />
            </div>
                  </div>
                </div>

                {/* Under flytten */}
            <div>
                  {/* Mobile: Expandable section header */}
                  <div className="md:hidden mb-4">
                    <button
                      onClick={() => setExpandedTipSection(expandedTipSection === 'under' ? null : 'under')}
                      className="w-full flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <h3 className="text-xl font-bold text-white">{t('alvsjo.tips.during.title')}</h3>
                      <svg 
                        className={`w-6 h-6 transition-transform duration-300 ${expandedTipSection === 'under' ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>
                  </div>
                  
                  {/* Desktop: Always visible title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">{t('alvsjo.tips.during.title')}</h3>
                  
                  {/* Mobile: Expandable content */}
                  <div className={`md:block ${expandedTipSection === 'under' ? 'block' : 'hidden'}`}>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <TipCard
                        title={t('alvsjo.tips.during.smooth.title')}
                        imageSrc="/smidigflyttdag.jpg"
                        imageAlt="Smidig flyttdag med flyttfirma i Årsta"
                        objectPosition="object-[center_35%]"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            {(t('alvsjo.tips.during.smooth.content', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                              <li key={index}>{item}</li>
                ))}
              </ul>
                        }
                      />
                    <TipCard
                        title={t('alvsjo.tips.during.supervision.title')}
                        imageSrc="/under_flytt.webp"
                        imageAlt="Flytt under pågående i Årsta"
                        objectPosition="object-center"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            {(t('alvsjo.tips.during.supervision.content', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        }
                      />
            </div>
          </div>
        </div>

                {/* Efter flytten */}
                <div>
                  {/* Mobile: Expandable section header */}
                  <div className="md:hidden mb-4">
                    <button
                      onClick={() => setExpandedTipSection(expandedTipSection === 'efter' ? null : 'efter')}
                      className="w-full flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <h3 className="text-xl font-bold text-white">{t('alvsjo.tips.after.title')}</h3>
                      <svg 
                        className={`w-6 h-6 transition-transform duration-300 ${expandedTipSection === 'efter' ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                    </button>
                  </div>
                  
                  {/* Desktop: Always visible title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">{t('alvsjo.tips.after.title')}</h3>
                  
                  {/* Mobile: Expandable content */}
                  <div className={`md:block ${expandedTipSection === 'efter' ? 'block' : 'hidden'}`}>
                  <div className="max-w-2xl mx-auto">
                    <TipCard
                        title={t('alvsjo.tips.after.settling.title')}
                        imageSrc="/efter_flytt.webp"
                        imageAlt="Start i nytt hem efter flytt i Årsta"
                        objectPosition="object-[10%_center]"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            {(t('alvsjo.tips.after.settling.content', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                              <li key={index}>{item}</li>
            ))}
          </ul>
                        }
                      />
                  </div>
                  </div>
        </div>

              </div>
            </div>
          </div>
        </section>

        {/* Blog Post Section */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="w-full px-4 md:px-6">
            <div className="w-full">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">
                  {t('spanga.blogSection.title')}
          </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                  {t('spanga.blogSection.description')}
                </p>
              </div>
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-1 gap-4 md:gap-2">
                  {/* Single Blog Article Card */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                    <div className="flex flex-col md:flex-row h-full items-stretch">
                      <div className="w-full md:w-1/3 h-48 md:h-full">
                    <img 
                      src="/tipsforflytt.jpg" 
                      alt="Pålitlig flyttfirma i Årsta - Specialister på flytt i Söderort" 
                          className="w-full h-full object-cover object-[60%_center]"
                    />
                  </div>
                      <div className="w-full md:w-2/3 p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4 space-y-2 sm:space-y-0">
                          <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium w-fit">
                        {t('alvsjo.tips.blog.badge')}
                      </span>
                          <span className="text-gray-500 text-sm md:text-base sm:ml-4">{t('alvsjo.tips.blog.readTime')}</span>
                    </div>
                        <h3 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-4 md:mb-6 leading-tight">
                      {t('spanga.blog.title')}
                    </h3>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                      {t('spanga.blog.description')}
                    </p>
                        <div className="flex justify-start sm:justify-between items-center">
                          <div></div>
          <Link 
                            href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma" 
                            className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:opacity-90 transition-opacity font-medium text-sm md:text-base group w-fit"
                      >
                            {t('spanga.blogSection.readMore')}
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
              </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                {t('spanga.faq.title')}
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    id: "spanga-1",
                    question: t('spanga.faq.items.0.question'),
                    answer: t('spanga.faq.items.0.answer')
                  },
                  {
                    id: "spanga-2",
                    question: t('spanga.faq.items.1.question'),
                    answer: t('spanga.faq.items.1.answer')
                  },
                  {
                    id: "spanga-3",
                    question: t('spanga.faq.items.2.question'),
                    answer: t('spanga.faq.items.2.answer')
                  },
                  {
                    id: "spanga-4",
                    question: t('spanga.faq.items.3.question'),
                    answer: t('spanga.faq.items.3.answer')
                  },
                  {
                    id: "spanga-5",
                    question: t('spanga.faq.items.4.question'),
                    answer: t('spanga.faq.items.4.answer')
                  },
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

              <div className="text-center mt-12">
                <p className="text-lg text-gray-600 mb-6">
                  {t('spanga.faqFooter.title')}
                </p>
                <Link 
                  href="/faq" 
                  className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                >
                  {t('spanga.faqFooter.linkText')}
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
        </section>
      </div>
    </main>
  );
} 
