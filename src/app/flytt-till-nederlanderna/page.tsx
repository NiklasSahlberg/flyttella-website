'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import FlyttoffertForm from '@/app/components/FlyttoffertForm';
import ReviewsWidget from '@/app/components/ReviewsWidget';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Lottie from 'lottie-react';
import { Variants } from 'framer-motion';

// Lottie animation components moved to module scope to match kontorsflytt implementation
function FillFormLottie() {
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/fillform.json')
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
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/fast.json')
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
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/phonecall.json')
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
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/signform.json')
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
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/movingtruck.json')
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
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/happycustomer.json')
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

function CashLottie() {
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/cash.json')
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return (
    <div className="w-32 h-32 flex items-center justify-center -m-2">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

function BoxesLottie() {
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/boxes.json')
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

function InsuranceLottie() {
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/insurance.json')
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

function ScheduleLottie() {
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/schedule2.json')
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

export default function FlyttTillNederlandernaPage() {
  const { t } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const totalFeatureCards = 9;
  const autoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);
  
  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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


  function FeatureBoxesSection() {
    const features = [
      {
        key: "pack-garanti",
        label: t('nederlanderna.benefits.packGaranti'),
        icon: (
          <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2"/></svg>
          </motion.div>
        ),
      },
      {
        key: "kundgaranti",
        label: t('nederlanderna.benefits.kundgaranti'),
        icon: (
          <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible">
            {HappyCustomerLottie()}
          </motion.div>
        ),
      },
      {
        key: "kartonger",
        label: t('nederlanderna.benefits.kartonger'),
        icon: (
          <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center overflow-visible">
            {BoxesLottie()}
          </motion.div>
        ),
      },
      {
        key: "rut-avdrag",
        label: t('nederlanderna.benefits.rutAvdrag'),
        icon: (
          <motion.div variants={variants} animate="wiggle" className="h-8 w-8 flex items-center justify-center overflow-visible">
            {CashLottie()}
          </motion.div>
        ),
      },
      {
        key: "ombokning-avbokning",
        label: t('nederlanderna.benefits.ombokning'),
        icon: (
          <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible">
            {ScheduleLottie()}
          </motion.div>
        ),
      },
      {
        key: "tillstand",
        label: "Trafiktillstånd och försäkring",
        icon: (
          <div className="flex items-center justify-start w-full">
            <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center mr-4 overflow-visible">
              {InsuranceLottie()}
            </motion.div>
            <span className="font-medium text-[#0F172A] text-left text-base leading-tight flex-grow">
              {t('nederlanderna.benefits.tillstand')}
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
            {t('nederlanderna.benefits.title')}
          </h2>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch justify-center w-full gap-0 md:gap-8">
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
          <div className="w-full md:w-2/5 relative">
            <Image
              src="/personalpicture.webp"
              alt={t('nederlanderna.common.personalImageAlt')}
              fill
              className="rounded-2xl shadow object-cover object-right"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  // ... All other sections (hero, about, reviews, process, experience, features, awards, tips, FAQ, blog) are adapted for Spain, using the Åkersberga structure and Spain/international move content ...
  // For brevity, only the structure and a few examples are shown here. The actual implementation will include all sections, adapted for Spain.

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          {/* Mobile: Form only */}
          <div className="md:hidden mx-auto px-4 pb-8">
            <FlyttoffertForm mode="widget" />
          </div>
          
          {/* Mobile: Förmåner after form */}
          <div className="md:hidden">
            <FeatureBoxesSection />
          </div>
          
          {/* Mobile: Hero content after form */}
          <div className="md:hidden mx-auto px-4 py-6">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/nederländerna-flyttfirma.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10 text-center space-y-4">
                <h1 className="text-4xl font-bold">
                  {t('nederlanderna.hero.title')}
                </h1>
                <p className="text-xl text-white/90">
                  {t('nederlanderna.hero.subtitle')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/nederländerna-flyttfirma.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    {t('nederlanderna.hero.title')}
                  </h1>
                  <p className="text-2xl md:text-3xl text-white/90 mb-12">
                    {t('nederlanderna.hero.subtitle')}
                  </p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <FlyttoffertForm mode="widget" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Om Flyttella Section */}
        <motion.section
          className="relative overflow-hidden"
          style={{
            paddingTop: '4rem',
            paddingBottom: '4rem',
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
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position"
            style={{
              backgroundImage: 'url(/efter_flytt.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 85%',
              zIndex: 0,
            }}
          />
          {/* Mobile-specific background positioning */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat md:hidden"
            style={{
              backgroundImage: 'url(/efter_flytt.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
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
          <div className="relative z-40 max-w-7xl mx-auto px-8 md:px-16 lg:mr-60">

                <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60">{t('nederlanderna.about.title')}</h3>
              
              {/* Text content only - image moved outside section on mobile */}
              <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
                {/* Left: Image - desktop only */}
                <motion.div
                  className="hidden lg:block w-full lg:w-1/5 relative lg:-ml-16 lg:pr-16"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative h-96 lg:h-full w-full lg:w-[200%] lg:-ml-[100%] overflow-hidden rounded-2xl">
                    <Image
                      src="/omoss.webp"
                      alt={t('nederlanderna.common.aboutImageAlt')}
                      fill
                      className="object-cover rounded-2xl"
                      style={{ 
                        objectPosition: 'center center',
                        transform: 'scale(1.0)'
                      }}
                      priority
                    />
                  </div>
                </motion.div>
                
                {/* Right: Text content */}
                <motion.div
                  className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-3 md:mb-4">
                    {t('nederlanderna.about.description1')}
                  </p>
                  {/* Mobile: Läs mer button */}
                  {!showFullAboutText && (
                    <div className="md:hidden mb-3">
                      <motion.button
                        onClick={() => setShowFullAboutText(true)}
                        className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4"
                      >
                        {t('nederlanderna.about.readMore')}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  {/* Mobile: Expanded text when Läs mer is clicked */}
                  {showFullAboutText && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.5 }}
                      className="space-y-3 mt-3 md:hidden"
                    >
                      <p className="text-lg text-[#0F172A] leading-relaxed">
                    {t('nederlanderna.about.description2')}
                  </p>
                      <p className="text-lg text-[#0F172A] leading-relaxed">
                    {t('nederlanderna.about.description3')}
                  </p>
                      <p className="text-lg text-[#0F172A] leading-relaxed">
                    {t('nederlanderna.about.description4')}
                  </p>
                      
                      {/* Läs mer om oss link - only shown after expansion on mobile */}
                      <div className="pt-4">
                        <Link 
                          href="/om-oss" 
                          className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4 group"
                        >
                          {t('nederlanderna.about.readMoreAbout')}
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
                    </motion.div>
                  )}
                  {/* Desktop: Always show all content */}
                  <p className="text-xl md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                    {t('nederlanderna.about.description2')}
                  </p>
                  <p className="text-xl md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                    {t('nederlanderna.about.description3')}
                  </p>
                  <p className="text-xl md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                    {t('nederlanderna.about.description4')}
                  </p>
                  {/* Läs mer om oss link - Desktop only */}
                  <motion.div
                    className="pt-4 lg:pt-6 hidden md:block"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link 
                      href="/om-oss" 
                      className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg md:text-xl underline decoration-2 underline-offset-4 group"
                    >
                      {t('nederlanderna.about.readMoreAbout')}
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

        {/* Förmåner Section - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block">
        <FeatureBoxesSection />
        </div>

        {/* Reviews Section */}
        <ReviewsWidget 
          location={t('nederlanderna.reviews.location')}
          title={t('nederlanderna.reviews.title')}
          subtitle={t('nederlanderna.reviews.subtitle')}
          description={t('nederlanderna.reviews.description')}
          badgeAlt={t('nederlanderna.reviews.badgeAlt')}
          arrowText={t('nederlanderna.reviews.arrowText')}
        />

        

        {/* Process and Features Section */}
        <section className="py-8 md:py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-0 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full relative">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
                  {t('nederlanderna.process.title')}
                </h2>
                {/* Process Description - Hidden on mobile */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('nederlanderna.process.description1')}
                  </p>
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('nederlanderna.process.description2')}
                  </p>
                </div>
                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
                    {t('nederlanderna.process.pricing')}
                  </p>
                </div>
                {/* Process Flow Section */}
                <div className="mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{t('nederlanderna.process.howItWorks')}</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        { icon: <FillFormLottie />, title: t('nederlanderna.processSteps.fillForm'), description: t('nederlanderna.processSteps.fillFormDesc'), textClass: "" },
                        { icon: <FastLottie />, title: t('nederlanderna.processSteps.quickQuote'), description: t('nederlanderna.processSteps.quickQuoteDesc'), textClass: "" },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: t('nederlanderna.processSteps.personalContact'), description: t('nederlanderna.processSteps.personalContactDesc'), containerClass: "md:-mt-7", textClass: "" },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: t('nederlanderna.processSteps.signConfirm'), description: t('nederlanderna.processSteps.signConfirmDesc'), containerClass: "md:-mt-6", textClass: "" },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: t('nederlanderna.processSteps.moveCompleted'), description: t('nederlanderna.processSteps.moveCompletedDesc'), containerClass: "md:-mt-14", textClass: "md:-mt-8" },
                        { icon: <div className="md:mt-0"><HappyCustomerLottie /></div>, title: t('nederlanderna.processSteps.satisfiedCustomer'), description: t('nederlanderna.processSteps.satisfiedCustomerDesc'), containerClass: "md:-mt-6", textClass: "" }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 h-full min-h-[160px] md:min-h-0"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#10B981] rounded-full hidden md:block"></div>
                          <div className={`${step.containerClass || ''} w-full flex flex-col items-center justify-center`}>
                            <div className="mb-1 md:mb-2 h-16 md:h-auto flex items-center justify-center">{step.icon}</div>
                            <div className={`flex flex-col items-center justify-center w-full md:min-h-[84px] lg:min-h-[96px] ${step.textClass || ''}`}>
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



        {/* Erfarenhet Section */}
        {/* Redo att börja din flytt? (moved here to be under Vår process) */}
        <section className="pt-0 pb-8 bg-white">
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
                    Redo att börja din flytt?
                  </h3>
                  <p className="text-lg text-gray-100">
                    Få en snabb och gratis offert på din flytt till Nederländerna
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
                    {t('nederlanderna.cta.button')}
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
        
        
        
        
        <motion.section
          className="relative overflow-hidden py-12 md:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position" style={{ backgroundImage: 'url(/backgroundpicture.webp)', backgroundSize: 'cover', backgroundPosition: 'center center', zIndex: 0 }} />
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
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-16 md:h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('nederlanderna.experience.title')}</h3>
              
              {/* Mobile: Auto-sliding cards */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentCard * 100}%)` }}
                  >
                    {[
                      { title: t('nederlanderna.experience.card1Title'), count: "1800+", description: t('nederlanderna.experience.cardDescription'), delay: 0 },
                      { title: t('nederlanderna.experience.card2Title'), count: "1400+", description: t('nederlanderna.experience.cardDescription'), delay: 1 },
                      { title: t('nederlanderna.experience.card3Title'), count: "100+", description: t('nederlanderna.experience.cardDescriptionMonthly'), delay: 2 }
                    ].map((card, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <motion.div 
                          className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2"
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.2 }}
                          variants={variants}
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
                            <motion.h2 className="text-lg font-bold mb-2 text-white text-center">
                              {card.title}
                            </motion.h2>
                            <motion.div className="text-3xl font-bold mb-2 text-white text-center">
                              {card.count.includes('+') ? (
                                <CountUp end={parseInt(card.count.replace('+', ''))} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} />
                              ) : (
                                card.count
                              )}
                            </motion.div>
                            <motion.p className="text-white/90 text-sm text-center leading-relaxed">
                              {card.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* Arrow controls */}
                  <button
                    onClick={() => {
                      setCurrentCard((prev) => (prev - 1 + 3) % 3);
                      restartAutoSlide();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentCard((prev) => (prev + 1) % 3);
                      restartAutoSlide();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentCard(index);
                          restartAutoSlide();
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentCard === index ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop: Grid layout */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white text-center">{t('nederlanderna.experience.card1Title')}</motion.h2>
                    <motion.div className="text-4xl lg:text-5xl font-bold mb-2 text-white"><CountUp end={1800} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90 text-base text-center">{t('nederlanderna.experience.cardDescription')}</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white text-center">{t('nederlanderna.experience.card2Title')}</motion.h2>
                    <motion.div className="text-4xl lg:text-5xl font-bold mb-2 text-white"><CountUp end={1400} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90 text-base text-center">{t('nederlanderna.experience.cardDescription')}</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white text-center">{t('nederlanderna.experience.card3Title')}</motion.h2>
                    <motion.div className="text-4xl lg:text-5xl font-bold mb-2 text-white"><CountUp end={100} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90 text-base text-center">{t('nederlanderna.experience.cardDescriptionMonthly')}</motion.p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">{t('nederlanderna.experience.subtitle')}</h4>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-3 md:mb-4">{t('nederlanderna.experience.paragraph1')}</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">{t('nederlanderna.experience.paragraph2')}</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">{t('nederlanderna.experience.paragraph3')}</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">{t('nederlanderna.experience.paragraph4')}</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">{t('nederlanderna.experience.paragraph5')}</p>
                </motion.div>
                
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
                  <div className="flex items-center justify-center gap-4 mr-4">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image
                        src="/rekommenderad2026.png"
                        alt="Rekommenderad flyttfirma till Nederländerna - Flyttella"
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
                
                {/* Desktop: Original horizontal layout */}
                <div className="hidden md:flex items-center justify-center gap-6">
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image src="/rekommenderad2026.png" alt="Rekommenderad flyttfirma till Nederländerna - Flyttella" width={240} height={240} className="object-contain h-52 w-52" priority={false} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image src="/1000reviewspicture.png" alt="1000+ positiva recensioner från kunder" width={260} height={260} className="object-contain h-64 w-64" priority={false} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image src="/bestinswedenbadge-modified.png" alt="Top 10 flyttfirma - Flyttella" width={300} height={300} className="object-contain h-48 w-48" priority={false} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-48 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)' }} />
        </motion.section>

        {/* Features Section */}
        <div className="py-8 md:py-16" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
          <div className="mx-auto px-0 md:px-24">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-none md:rounded-2xl p-4 md:p-8">
              <div className="flex flex-col lg:flex-row items-stretch gap-4 md:gap-8 h-full">
                {/* Left side - Features content */}
                <div className="flex-[2] w-full md:flex-[2]">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center lg:text-left">{t('nederlanderna.features.title')}</h2>
                  
                  {/* Mobile: Sliding carousel */}
                  <div className="md:hidden">
                    <div className="relative overflow-hidden rounded-xl" onTouchStart={handleFeatureTouchStart} onTouchMove={handleFeatureTouchMove} onTouchEnd={handleFeatureTouchEnd}>
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}
                      >
                        {[
                          { icon: "💰", title: t('nederlanderna.features.fastPris'), description: t('nederlanderna.features.fastPrisDesc'), link: "/priser" },
                          { icon: "📋", title: t('nederlanderna.features.dokumentation'), description: t('nederlanderna.features.dokumentationDesc'), link: "/faq" },
                          { icon: "📦", title: t('nederlanderna.features.magasinering'), description: t('nederlanderna.features.magasineringDesc'), link: "/magasinering" },
                          { icon: "⏰", title: t('nederlanderna.features.ombokning'), description: t('nederlanderna.features.ombokningDesc'), link: "/avbokning" },
                          { icon: "✅", title: t('nederlanderna.features.garanti'), description: t('nederlanderna.features.garantiDesc'), link: "/garanti" },
                          { icon: "🔒", title: t('nederlanderna.features.forsakring'), description: t('nederlanderna.features.forsakringDesc'), link: "/tillstand" },
                          { icon: "🎓", title: t('nederlanderna.features.personal'), description: t('nederlanderna.features.personalDesc'), link: "/om-oss" },
                          { icon: "📈", title: t('nederlanderna.features.logistik'), description: t('nederlanderna.features.logistikDesc'), link: "/om-oss" },
                          { icon: "🦺", title: t('nederlanderna.features.sakerhet'), description: t('nederlanderna.features.sakerhetDesc'), link: "/om-oss" }
                        ].map((feature, index) => (
                          <div key={feature.icon} className="w-full flex-shrink-0">
                            <motion.div 
                              className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg text-white flex flex-col h-full mx-2 md:mx-4"
                              initial="initial"
                              whileInView="animate"
                              viewport={{ once: true, amount: 0.2 }}
                              variants={variants}
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
                                  <a 
                                    href={feature.link}
                                    target={feature.link.startsWith('http') ? '_blank' : undefined}
                                    rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center"
                                  >
                                    {t('nederlanderna.common.readMore')}
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Arrow controls */}
                      <button
                        type="button"
                        aria-label="Föregående"
                        onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 111.06 1.06L10.56 12l5.22 5.22a.75.75 0 010 1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Nästa"
                        onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L13.44 12 8.22 6.78a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Grid layout */}
                  <div className="hidden md:grid md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                    {[
                      { icon: "💰", title: t('nederlanderna.features.fastPris'), description: t('nederlanderna.features.fastPrisDesc'), link: "/priser" },
                      { icon: "📋", title: t('nederlanderna.features.dokumentation'), description: t('nederlanderna.features.dokumentationDesc'), link: "/faq" },
                      { icon: "📦", title: t('nederlanderna.features.magasinering'), description: t('nederlanderna.features.magasineringDesc'), link: "/magasinering" },
                      { icon: "⏰", title: t('nederlanderna.features.ombokning'), description: t('nederlanderna.features.ombokningDesc'), link: "/avbokning" },
                      { icon: "✅", title: t('nederlanderna.features.garanti'), description: t('nederlanderna.features.garantiDesc'), link: "/garanti" },
                      { icon: "🔒", title: t('nederlanderna.features.forsakring'), description: t('nederlanderna.features.forsakringDesc'), link: "/tillstand" },
                      { icon: "🎓", title: t('nederlanderna.features.personal'), description: t('nederlanderna.features.personalDesc'), link: "/om-oss" },
                      { icon: "📈", title: t('nederlanderna.features.logistik'), description: t('nederlanderna.features.logistikDesc'), link: "/om-oss" },
                      { icon: "🦺", title: t('nederlanderna.features.sakerhet'), description: t('nederlanderna.features.sakerhetDesc'), link: "/om-oss" }
                    ].map((feature, i) => (
                      <motion.div key={feature.icon} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                        <span className="text-2xl md:text-3xl">{feature.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                          <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                          <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center">
                            {t('nederlanderna.common.readMore')}
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 hidden lg:flex justify-center lg:justify-end lg:self-stretch">
                  <div className="w-full h-full flex items-stretch">
                    <Image src="/smiling_worker_new.webp" alt="Flytt till Nederländerna - Flyttella" width={600} height={200} className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} priority={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Image below container */}
        <div className="md:hidden">
          <Image
            src="/intro_picture.webp"
            alt="Flyttella introduktion"
            width={600}
            height={400}
            className="rounded-none shadow-lg object-cover w-full h-80 max-w-none"
            style={{ objectPosition: '90% 90%' }}
            priority={false}
          />
        </div>

        {/* Awards Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-3/5 flex justify-center">
                <Image src="/awards_no_bg_2026.png" alt={t('nederlanderna.awards.imageAlt')} width={1200} height={600} className="object-contain w-full h-auto max-w-3xl" priority />
              </div>
              <div className="w-full md:w-2/5 text-left flex flex-col items-start justify-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">{t('nederlanderna.awards.title')}</h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">{t('nederlanderna.awards.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Redo att börja din flytt? - Second Card */}
        <section className="pt-0 pb-8 bg-white">
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
                    Redo att börja din flytt?
                  </h3>
                  <p className="text-lg text-gray-100">
                    Få en snabb och gratis offert på din flytt till Nederländerna
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
                    {t('nederlanderna.cta.button')}
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
        <section className="pt-8 pb-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                {t('nederlanderna.services.title')}
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
                      {t('nederlanderna.services.flyttstadning')}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-100 mb-8 relative">
                    {t('nederlanderna.services.flyttstadningDesc')}
                  </p>
                  <p className="text-lg text-gray-100 mb-8 relative">
                    {t('nederlanderna.services.flyttstadningExtended')} Städutrustning ingår, inklusive leverans och upphämtning. Vi dammtorkar väggar och tak, rengör golvbrunnar och bakom vitvaror (om du drar fram dem). Frysen rengörs om den är avfrostad dagen innan. Med oss får du en komplett flyttstädning för en trygg och smidig överlämning.
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
                        {t('nederlanderna.services.readMore')}
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
                      {t('nederlanderna.services.magasinering')}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-100 mb-8 relative">
                    {t('nederlanderna.services.magasineringDesc')}
                  </p>
                  <p className="text-lg text-gray-100 mb-8 relative">
                    {t('nederlanderna.services.magasineringExtended')}
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
                        {t('nederlanderna.services.readMore')}
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
                      {t('nederlanderna.services.packhjalp')}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-100 mb-8 relative">
                    {t('nederlanderna.services.packhjalpDesc')}
                  </p>
                  <p className="text-lg text-gray-100 mb-8 relative">
                    {t('nederlanderna.services.packhjalpExtended')}
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
                        {t('nederlanderna.services.readMore')}
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
        <motion.section className="py-24 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0 * 0.25 }} id="upptack-tjanster">{t('nederlanderna.discoverServices.title')}</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0 * 0.25 }}>{t('nederlanderna.discoverServices.description')}</motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('nederlanderna.discoverServices.privateButton')}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/foretag" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('nederlanderna.discoverServices.businessButton')}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Tips för din flytt Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('nederlanderna.tips.title')}</h2>
              <div className="space-y-16">
                {/* Innan flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">{t('nederlanderna.tips.beforeTitle')}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <TipCard title="Planera och förbered" imageSrc="/tipsforflytt.jpg" imageAlt="Flyttplanering till Nederländerna - Tips för flytt" content={<ul className="list-disc pl-5 space-y-2"><li>Gör en checklista för utlandsflytt.</li><li>Rensa ut onödiga saker – ta bara med det viktigaste.</li><li>Boka flyttfirma i god tid.</li><li>Beställ flyttkartonger och packmaterial.</li></ul>} />
                    <TipCard title="Avtal och anmälningar" imageSrc="/viktigaavtalcustomer.webp" imageAlt="Viktiga avtal för flytt till Nederländerna" content={<ul className="list-disc pl-5 space-y-2"><li>Adressändra hos Skatteverket och meddela myndigheter.</li><li>Ordna med försäkringar och eventuella visum.</li><li>Teckna nya avtal för el, internet, etc. i Nederländerna.</li><li>Meddela viktiga kontakter om din flytt.</li></ul>} />
                    <TipCard title="Innan flyttfirman kommer" imageSrc="/innanflyttfirmankommer.webp" imageAlt="Förberedelse för flytt till Nederländerna" objectPosition="object-[center_45%]" content={<ul className="list-disc pl-5 space-y-2"><li>Packa ner allt lösöre i kartonger.</li><li>Montera ner gardiner och lampor.</li><li>Dubbelkolla packning och märkning.</li><li>Ha alla dokument redo för transport och tull.</li></ul>} />
                    <TipCard title="Packtips för utlandsflytt" imageSrc="/packing_tips.webp" imageAlt="Packningstips för flytt till Nederländerna" content={<ul className="list-disc pl-5 space-y-2"><li>Märk alla kartonger tydligt med innehåll och rum.</li><li>Packa ömtåligt extra noggrant.</li><li>Gör en inventarielista för tullen.</li><li>Packa det viktigaste separat för enkel åtkomst vid ankomst.</li></ul>} />
                  </div>
                </div>
                {/* Under flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">{t('nederlanderna.tips.duringTitle')}</h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <TipCard title="En smidig flyttdag" imageSrc="/smidigflyttdag.jpg" imageAlt="Smidig flyttdag till Nederländerna" objectPosition="object-[center_35%]" content={<ul className="list-disc pl-5 space-y-2"><li>Håll värdesaker och viktiga papper tillgängliga.</li><li>Säkerställ fri väg för flytthjälp.</li><li>Gör en slutkontroll av bostaden efter inlastning och efter avlastning i båda bostäderna för att säkerställa att inget glömts kvar.</li><li>Se till att montera ner eller packa ner bortglömda föremål.</li></ul>} />
                    <TipCard title="Kommunikation och koordinering" imageSrc="/under_flytt.webp" imageAlt="Flytt under pågående" objectPosition="object-center" content={<ul className="list-disc pl-5 space-y-2"><li>Håll kontakt med flyttledaren.</li><li>Fotografera eventuella skador.</li><li>Kontrollera att allt laddas korrekt.</li><li>Följ med till den nya adressen.</li><li>Var tydlig med särskilda önskemål.</li><li>Var tillgänglig för frågor.</li></ul>} />
                  </div>
                </div>
                {/* Efter flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">{t('nederlanderna.tips.afterTitle')}</h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <TipCard title="Start i nya hemmet" imageSrc="/efter_flytt.webp" imageAlt="Start i nytt hem efter flytt till Nederländerna" objectPosition="object-[10%_center]" content={<ul className="list-disc pl-5 space-y-2"><li>Kontrollera att allt anlänt och är helt.</li><li>Packa upp det viktigaste först.</li><li>Registrera dig hos spanska myndigheter om det behövs.</li><li>Teckna nödvändiga avtal och försäkringar i Nederländerna.</li></ul>} />
                    <TipCard title="Dokumentation och uppföljning" imageSrc="/godtid.webp" imageAlt="Dokumentation efter flytt" objectPosition="object-center" content={<ul className="list-disc pl-5 space-y-2"><li>Fotografera ditt nya hem.</li><li>Kontakta flyttfirman för feedback.</li><li>Skriv en recension av tjänsten.</li><li>Organisera flyttkvitton och dokument.</li><li>Fira din nya bostad med familj och vänner.</li><li>Uppdatera försäkringar för nya bostaden.</li></ul>} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('nederlanderna.blog.title')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('nederlanderna.blog.subtitle')}</p>
              </div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/innanflyttfirmankommer.webp" alt="Flytt till Nederländerna" className="w-full h-64 md:h-full object-cover" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">{t('nederlanderna.blog.category')}</span>
                      <span className="text-gray-500 text-sm ml-4">{t('nederlanderna.blog.readingTime')}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{t('nederlanderna.blog.articleTitle')}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{t('nederlanderna.blog.articleDescription')}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-full flex items-center justify-center"><span className="text-white font-bold text-sm">FE</span></div>
                        <div className="ml-3">
                        <p className="text-sm font-medium text-[#0F172A]">{t('nederlanderna.blog.expert')}</p>
                        <p className="text-sm text-gray-500">{t('nederlanderna.blog.expertTitle')}</p>
                        </div>
                      </div>
                      <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('nederlanderna.blog.readArticle')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                    <div className="text-center">
                      <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium group shadow-lg hover:shadow-xl">{t('nederlanderna.blog.seeAllArticles')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('nederlanderna.faq.title')}</h2>
              <div className="space-y-4">
                {(t('nederlanderna.faq.items', { returnObjects: true }) as { id: string; question: string; answer: string }[]).map((faq, index) => (
                  <motion.div key={faq.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">{faq.question}</h3>
                      <motion.div animate={{ rotate: openFAQ === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                        <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </motion.div>
                    </button>
                    <motion.div initial={false} animate={{ height: openFAQ === faq.id ? "auto" : 0, opacity: openFAQ === faq.id ? 1 : 0 }} transition={{ height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2, ease: "easeInOut" } }} className="overflow-hidden">
                      <div className="px-6 pb-6"><p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p></div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12">
                <p className="text-lg text-gray-600 mb-6">{t('nederlanderna.faq.footer')}</p>
                <Link href="/faq" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('nederlanderna.faq.seeAll')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 