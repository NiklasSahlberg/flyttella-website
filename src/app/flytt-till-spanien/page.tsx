'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import FlyttoffertForm from '@/app/components/FlyttoffertForm';
import ReviewsWidget from '@/app/components/ReviewsWidget';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import React, { useEffect, useState, useRef } from 'react';
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

export default function FlyttTillSpanienPage() {
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
        label: "Pack-garanti",
        icon: (
          <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2"/></svg>
          </motion.div>
        ),
      },
      {
        key: "kundgaranti",
        label: "14 dagars nöjd kund garanti",
        icon: (
          <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible">
            {HappyCustomerLottie()}
          </motion.div>
        ),
      },
      {
        key: "kartonger",
        label: "Fritt lån av kartonger i 4 veckor",
        icon: (
          <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center overflow-visible">
            {BoxesLottie()}
          </motion.div>
        ),
      },
      {
        key: "rut-avdrag",
        label: "50% RUT-avdrag",
        icon: (
          <motion.div variants={variants} animate="wiggle" className="h-8 w-8 flex items-center justify-center overflow-visible">
            {CashLottie()}
          </motion.div>
        ),
      },
      {
        key: "ombokning-avbokning",
        label: "24h kostnadsfri ombokning och avbokning",
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
              Trafiktillstånd och försäkring
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
            Vilka förmåner får du med Flyttella till Spanien?
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
              alt="Flyttella personal - Flytt till Spanien"
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
          {/* Mobile: Form only (samma struktur som flytt-till-nederlanderna) */}
          <div className="md:hidden mx-auto px-4 pb-8">
            <FlyttoffertForm mode="widget" backgroundImage="/malaga.jpg" />
          </div>
          
          {/* Mobile: Förmåner after form */}
          <div className="md:hidden">
            <FeatureBoxesSection />
          </div>
          
          {/* Mobile: Hero-ruta med titel och text (utan formulär) */}
          <div className="md:hidden mx-auto px-4 py-6">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/malaga.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10 text-center space-y-4">
                <h1 className="text-4xl font-bold">
                  Flytt till Spanien – Trygg och smidig utlandsflytt
                </h1>
                <p className="text-xl text-white/90">
                  Vi hjälper dig med hela processen när du ska flytta till Spanien – från planering och packning till transport och inflyttning. Låt oss ta hand om din utlandsflytt så att du kan fokusera på ditt nya liv i solen!
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
                  backgroundImage: 'url(/malaga.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    Flytt till Spanien – Trygg och smidig utlandsflytt
                  </h1>
                  <p className="text-2xl md:text-3xl text-white/90 mb-12">
                    Vi hjälper dig med hela processen när du ska flytta till Spanien – från planering och packning till transport och inflyttning. Låt oss ta hand om din utlandsflytt så att du kan fokusera på ditt nya liv i solen!
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
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60">Om Flyttella</h3>
              
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
                      alt="Om Flyttella"
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
                    Flyttella har lång erfarenhet av internationella flyttar och hjälper varje år många svenskar att flytta tryggt och smidigt till Spanien. Vi tar hand om hela processen – från planering och packning till transport och inflyttning i ditt nya hem.
                  </p>
                  {/* Mobile: Läs mer button */}
                  {!showFullAboutText && (
                    <div className="md:hidden mb-3">
                      <motion.button
                        onClick={() => setShowFullAboutText(true)}
                        className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4"
                      >
                        Läs mer
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
                    Vi erbjuder personlig service, tydliga villkor och fasta priser på utlandsflytt. Vårt team har god kännedom om både Sverige och Spanien och kan hjälpa dig med allt från dokumentation till praktiska tips för en lyckad flytt.
                  </p>
                      <p className="text-lg text-[#0F172A] leading-relaxed">
                    Oavsett om du flyttar till Costa del Sol, Barcelona, Madrid eller någon annan plats i Spanien, kan du lita på att vi hanterar din flytt med omsorg och professionalism. Vi erbjuder även magasinering och försäkring för din trygghet.
                  </p>
                      <p className="text-lg text-[#0F172A] leading-relaxed">
                    Kontakta oss idag för en kostnadsfri offert på din flytt till Spanien – vi ser fram emot att hjälpa dig till ett nytt liv i solen!
                  </p>
                      
                      {/* Läs mer om oss link - only shown after expansion on mobile */}
                      <div className="pt-4">
                        <Link 
                          href="/om-oss" 
                          className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4 group"
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
                      </div>
                    </motion.div>
                  )}
                  {/* Desktop: Always show all content */}
                  <p className="text-xl md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                    Vi erbjuder personlig service, tydliga villkor och fasta priser på utlandsflytt. Vårt team har god kännedom om både Sverige och Spanien och kan hjälpa dig med allt från dokumentation till praktiska tips för en lyckad flytt.
                  </p>
                  <p className="text-xl md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                    Oavsett om du flyttar till Costa del Sol, Barcelona, Madrid eller någon annan plats i Spanien, kan du lita på att vi hanterar din flytt med omsorg och professionalism. Vi erbjuder även magasinering och försäkring för din trygghet.
                  </p>
                  <p className="text-xl md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                    Kontakta oss idag för en kostnadsfri offert på din flytt till Spanien – vi ser fram emot att hjälpa dig till ett nytt liv i solen!
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

        {/* Förmåner Section - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block">
        <FeatureBoxesSection />
        </div>

        {/* Reviews Section */}
        <ReviewsWidget 
          location="Spanien"
          title="Vad tycker våra kunder om oss?"
          subtitle="Trygg utlandsflytt till Spanien med Flyttella"
          description="Vi har hjälpt många svenskar att flytta till Spanien och vet vad som krävs för en lyckad utlandsflytt. Läs vad våra kunder tycker om vår service och professionalism."
          badgeAlt="Erfarenhet av utlandsflytt till Spanien"
          arrowText="Läs vad våra kunder säger om oss"
        />

        

        {/* Process and Features Section */}
        <section className="py-8 md:py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-0 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full relative">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
                  Vår process
                </h2>
                {/* Process Description - Hidden on mobile */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    Vi gör din utlandsflytt till Spanien enkel och trygg – från första kontakt till inflyttning. Vi tar hand om allt det praktiska och guidar dig genom hela processen, så att du kan fokusera på ditt nya liv i solen.
                  </p>
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    Vår flyttprocess till Spanien är designad för att vara enkel, transparent och trygg. Det börjar med att du fyller i vårt formulär där du anger dina uppgifter och behov för din Spanienflytt. Inom en minut får du en offert skickad till din e-post. Samma dag eller dagen efter tar vi personlig kontakt för att gå igenom detaljer, svara på frågor och ge råd kring utlandsflytt. När du är nöjd signerar du offerten digitalt. Sedan genomför vi flytten enligt dina önskemål och avtal – hela vägen till din nya adress i Spanien. Resultatet? En nöjd kund som kan fokusera på sitt nya liv i solen.
                  </p>
                </div>
                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
                    Våra offerter är alltid baserade på dina specifika behov och omständigheter. Vi tar hänsyn till faktorer som mängd bohag, avstånd, tillval och eventuella särskilda önskemål för att ge dig en offert som passar just din utlandsflytt. Alla priser är fasta utan dolda avgifter – har du frågor eller särskilda önskemål? Kontakta oss så anpassar vi offerten efter dina behov.
                  </p>
                </div>
                {/* Process Flow Section */}
                <div className="mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">Så fungerar det</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        { icon: <FillFormLottie />, title: "Fyll i formuläret", description: "Berätta om din utlandsflytt", textClass: "" },
                        { icon: <FastLottie />, title: "Snabb offert", description: "Få pris på 1 minut", textClass: "" },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: "Personlig kontakt", description: "Vi ringer dig för att gå igenom detaljerna", containerClass: "md:-mt-7", textClass: "" },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: "Signera & bekräfta", description: "Få bokningsbekräftelse och all dokumentation", containerClass: "md:-mt-6", textClass: "" },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: "Flytt genomförd", description: "Vi hämtar, transporterar och levererar till Spanien", containerClass: "md:-mt-14", textClass: "md:-mt-8" },
                        { icon: <div className="md:mt-0"><HappyCustomerLottie /></div>, title: "Nöjd kund", description: "Återkommande kund", containerClass: "md:-mt-6", textClass: "" }
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
                    Få en snabb och gratis offert på din flytt till Spanien
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
                    Få gratis offert
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
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/backgroundpicture.webp)', backgroundSize: 'cover', backgroundPosition: 'center 100%', zIndex: 0 }} />
          {/* Mobile-specific background image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage: 'url(/omoss.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              zIndex: 0,
            }}
          />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-16 md:h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet av utlandsflytt</h3>
              
              {/* Mobile: Auto-sliding cards */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentCard * 100}%)` }}
                  >
                    {[
                      { title: "Internationella flyttar", count: "1800+", description: "uppdrag utförda", delay: 0 },
                      { title: "Flyttstädningar", count: "1400+", description: "uppdrag utförda", delay: 1 },
                      { title: "Månadsvis", count: "100+", description: "uppdrag per månad", delay: 2 }
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
                    <motion.h2 className="text-xl font-bold mb-2 text-white text-center">Internationella flyttar</motion.h2>
                    <motion.div className="text-4xl lg:text-5xl font-bold mb-2 text-white"><CountUp end={1800} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90 text-base text-center">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white text-center">Flyttstädningar</motion.h2>
                    <motion.div className="text-4xl lg:text-5xl font-bold mb-2 text-white"><CountUp end={1400} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90 text-base text-center">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white text-center">Månadsvis</motion.h2>
                    <motion.div className="text-4xl lg:text-5xl font-bold mb-2 text-white"><CountUp end={100} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90 text-base text-center">uppdrag per månad</motion.p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">Erfarenhet av utlandsflytt</h4>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-3 md:mb-4">Vi har hjälpt över 1800 familjer och företag att flytta till Spanien och andra länder i Europa. Vår erfarenhet gör att vi kan erbjuda trygga och effektiva lösningar för din utlandsflytt.</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">Vi är stolta över våra många nöjda kunder och vårt rykte som en pålitlig partner för internationella flyttar.</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">Vi kör regelbundna avgångar mellan Sverige och Spanien med täckning i bland annat Costa del Sol, Barcelona, Madrid, Valencia och Alicante. Du kan välja kostnadseffektiv samlastning eller dedikerad expressleverans med fasta tidsfönster – vi anpassar lösningen efter tidsplan och budget.</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">Vårt team hjälper dig med all planering och dokumentation som krävs, inklusive hissbokning, bärvägar, parkeringstillstånd och hantering av ömtåligt eller värdefullt gods som piano, konst och glas. Vi erbjuder professionell packning och skräddarsydda emballagelösningar för extra trygghet.</p>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-relaxed mb-4 md:mb-6">Under hela flytten har du en personlig kontakt och tydlig spårbarhet. Full försäkring ingår och vi arbetar med en transparent skadehanteringsprocess om något oväntat skulle inträffa.</p>
                  <div className="text-[#0F172A] text-base md:text-lg lg:text-xl leading-relaxed mt-2 md:mt-4">
                    <p className="font-semibold mb-2 md:mb-3">Det här ingår ofta i våra Spanienflyttar:</p>
                    <ul className="list-disc list-inside space-y-1 md:space-y-1.5 text-left md:text-center">
                      <li>Planering, rådgivning och personlig projektledare</li>
                      <li>Packmaterial och möjlighet till professionell packhjälp</li>
                      <li>Demontering och montering av möbler vid behov</li>
                      <li>Bärhjälp och logistik på både avhämtnings- och leveransadress</li>
                      <li>Full försäkring och tydliga transportvillkor</li>
                      <li>Magasinering i Sverige eller Spanien vid behov</li>
                      <li>Uppackningshjälp som tillval</li>
                    </ul>
                  </div>
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
                  <div className="flex items-center justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image
                        src="/recommendedcompany2.png"
                        alt="Rekommenderad flyttfirma till Spanien - Flyttella"
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
                    <Image src="/recommendedcompany2.png" alt="Rekommenderad flyttfirma till Spanien - Flyttella" width={240} height={240} className="object-contain h-56 w-56" priority={false} />
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
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center lg:text-left">Våra fördelar</h2>
                  
                  {/* Mobile: Sliding carousel */}
                  <div className="md:hidden">
                    <div className="relative overflow-hidden rounded-xl" onTouchStart={handleFeatureTouchStart} onTouchMove={handleFeatureTouchMove} onTouchEnd={handleFeatureTouchEnd}>
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}
                      >
                        {[
                          { icon: "💰", title: "Fast pris", description: "Inga överraskningar – vi erbjuder fasta priser på utlandsflytt till Spanien", link: "/priser" },
                          { icon: "📋", title: "All dokumentation", description: "Vi hjälper dig med alla papper och tillstånd för flytt inom EU", link: "/faq" },
                          { icon: "📦", title: "Magasinering", description: "Säker magasinering av dina tillhörigheter innan eller efter flytten", link: "/magasinering" },
                          { icon: "⏰", title: "Omboka eller avboka kostnadsfritt", description: "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten", link: "/avbokning" },
                          { icon: "✅", title: "Nöjd kund garanti", description: "14 dagars garanti på flyttstädning även för utlandsflytt", link: "/garanti" },
                          { icon: "🔒", title: "Internationell försäkring", description: "Alla nödvändiga försäkringar för din trygghet", link: "/tillstand" },
                          { icon: "🎓", title: "Utbildad personal", description: "Vår personal är utbildad för internationella flyttar", link: "/om-oss" },
                          { icon: "📈", title: "Effektiv logistik", description: "Vi arbetar med effektiva logistiklösningar för utlandsflytt", link: "/om-oss" },
                          { icon: "🦺", title: "Säkerhet", description: "Vi prioriterar säkerhet för både kunder och personal", link: "/om-oss" }
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
                                    Läs mer
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
                      { icon: "💰", title: "Fast pris", description: "Inga överraskningar – vi erbjuder fasta priser på utlandsflytt till Spanien", link: "/priser" },
                      { icon: "📋", title: "All dokumentation", description: "Vi hjälper dig med alla papper och tillstånd för flytt inom EU", link: "/faq" },
                      { icon: "📦", title: "Magasinering", description: "Säker magasinering av dina tillhörigheter innan eller efter flytten", link: "/magasinering" },
                      { icon: "⏰", title: "Omboka eller avboka kostnadsfritt", description: "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten", link: "/avbokning" },
                      { icon: "✅", title: "Nöjd kund garanti", description: "14 dagars garanti på flyttstädning även för utlandsflytt", link: "/garanti" },
                      { icon: "🔒", title: "Internationell försäkring", description: "Alla nödvändiga försäkringar för din trygghet", link: "/tillstand" },
                      { icon: "🎓", title: "Utbildad personal", description: "Vår personal är utbildad för internationella flyttar", link: "/om-oss" },
                      { icon: "📈", title: "Effektiv logistik", description: "Vi arbetar med effektiva logistiklösningar för utlandsflytt", link: "/om-oss" },
                      { icon: "🦺", title: "Säkerhet", description: "Vi prioriterar säkerhet för både kunder och personal", link: "/om-oss" }
                    ].map((feature, i) => (
                      <motion.div key={feature.icon} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                        <span className="text-2xl md:text-3xl">{feature.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                          <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                          <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center">
                            Läs mer
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 hidden lg:flex justify-center lg:justify-end lg:self-stretch">
                  <div className="w-full h-full flex items-stretch">
                    <Image src="/smiling_worker_new.webp" alt="Flytt till Spanien - Flyttella" width={600} height={200} className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} priority={false} />
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
                <Image src="/awards_no_bg.png" alt="Flyttellas utmärkelser - Flytt till Spanien" width={1200} height={600} className="object-contain w-full h-auto max-w-3xl" priority />
              </div>
              <div className="w-full md:w-2/5 text-left flex flex-col items-start justify-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">Utmärkelser för vårt arbete med utlandsflytt</h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">Våra utmärkelser är ett bevis på vårt engagemang för kvalitet, service och kundnöjdhet vid internationella flyttar. Vi har blivit erkända av både branschorganisationer och våra kunder för vårt pålitliga arbete och höga standard.</p>
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
                    Få en snabb och gratis offert på din flytt till Spanien
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
                    Få gratis offert
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

        {/* Se alla våra tjänster Section */}
        <motion.section className="py-24 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0 * 0.25 }} id="upptack-tjanster">Upptäck Alla Våra Tjänster för Spanien</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0 * 0.25 }}>Vi erbjuder ett komplett utbud av tjänster för att göra din flytt till Spanien så smidig som möjligt. Från bohagsflytt och flyttstädning till magasinering och specialtransporter.</motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra privattjänster<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/foretag" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra företagstjänster<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Tips för din flytt Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Tips för din flytt till Spanien</h2>
              <div className="space-y-16">
                {/* Innan flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Innan flytten</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <TipCard title="Planera och förbered" imageSrc="/tipsforflytt.jpg" imageAlt="Flyttplanering till Spanien - Tips för flytt" content={<ul className="list-disc pl-5 space-y-2"><li>Gör en checklista för utlandsflytt.</li><li>Rensa ut onödiga saker – ta bara med det viktigaste.</li><li>Boka flyttfirma i god tid.</li><li>Beställ flyttkartonger och packmaterial.</li></ul>} />
                    <TipCard title="Avtal och anmälningar" imageSrc="/viktigaavtalcustomer.webp" imageAlt="Viktiga avtal för flytt till Spanien" content={<ul className="list-disc pl-5 space-y-2"><li>Adressändra hos Skatteverket och meddela myndigheter.</li><li>Ordna med försäkringar och eventuella visum.</li><li>Teckna nya avtal för el, internet, etc. i Spanien.</li><li>Meddela viktiga kontakter om din flytt.</li></ul>} />
                    <TipCard title="Innan flyttfirman kommer" imageSrc="/innanflyttfirmankommer.webp" imageAlt="Förberedelse för flytt till Spanien" objectPosition="object-[center_45%]" content={<ul className="list-disc pl-5 space-y-2"><li>Packa ner allt lösöre i kartonger.</li><li>Montera ner gardiner och lampor.</li><li>Dubbelkolla packning och märkning.</li><li>Ha alla dokument redo för transport och tull.</li></ul>} />
                    <TipCard title="Packtips för utlandsflytt" imageSrc="/packing_tips.webp" imageAlt="Packningstips för flytt till Spanien" content={<ul className="list-disc pl-5 space-y-2"><li>Märk alla kartonger tydligt med innehåll och rum.</li><li>Packa ömtåligt extra noggrant.</li><li>Gör en inventarielista för tullen.</li><li>Packa det viktigaste separat för enkel åtkomst vid ankomst.</li></ul>} />
                  </div>
                </div>
                {/* Under flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Under flytten</h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <TipCard title="En smidig flyttdag" imageSrc="/smidigflyttdag.jpg" imageAlt="Smidig flyttdag till Spanien" objectPosition="object-[center_35%]" content={<ul className="list-disc pl-5 space-y-2"><li>Håll värdesaker och viktiga papper tillgängliga.</li><li>Säkerställ fri väg för flytthjälp.</li><li>Gör en slutkontroll av bostaden efter inlastning och efter avlastning i båda bostäderna för att säkerställa att inget glömts kvar.</li><li>Se till att montera ner eller packa ner bortglömda föremål.</li></ul>} />
                    <TipCard title="Kommunikation och koordinering" imageSrc="/under_flytt.webp" imageAlt="Flytt under pågående" objectPosition="object-center" content={<ul className="list-disc pl-5 space-y-2"><li>Håll kontakt med flyttledaren.</li><li>Fotografera eventuella skador.</li><li>Kontrollera att allt laddas korrekt.</li><li>Följ med till den nya adressen.</li><li>Var tydlig med särskilda önskemål.</li><li>Var tillgänglig för frågor.</li></ul>} />
                  </div>
                </div>
                {/* Efter flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Efter flytten</h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <TipCard title="Start i nya hemmet" imageSrc="/efter_flytt.webp" imageAlt="Start i nytt hem efter flytt till Spanien" objectPosition="object-[10%_center]" content={<ul className="list-disc pl-5 space-y-2"><li>Kontrollera att allt anlänt och är helt.</li><li>Packa upp det viktigaste först.</li><li>Registrera dig hos spanska myndigheter om det behövs.</li><li>Teckna nödvändiga avtal och försäkringar i Spanien.</li></ul>} />
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
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Läs mer om flytt till Spanien</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Få värdefulla tips och råd för en smidig utlandsflytt till Spanien.</p>
              </div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/innanflyttfirmankommer.webp" alt="Flytt till Spanien" className="w-full h-64 md:h-full object-cover" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">Flytttips</span>
                      <span className="text-gray-500 text-sm ml-4">5 min läsning</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Komplett guide: Så planerar du en smidig flytt till Spanien</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">En utlandsflytt kräver noggrann planering. I denna guide går vi igenom allt du behöver veta – från första kontakten med flyttfirman till den sista kartongen i ditt nya hem i Spanien. Lär dig hur du väljer rätt flyttfirma, förbereder din bostad och säkerställer en stressfri flyttupplevelse.</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-full flex items-center justify-center"><span className="text-white font-bold text-sm">FE</span></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-[#0F172A]">Flyttella Expert</p>
                          <p className="text-sm text-gray-500">Flyttspecialist på utlandsflytt</p>
                        </div>
                      </div>
                      <Link href="/blogg/10-tips-for-en-smidig-flytt-till-spanien" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">Läs hela artikeln<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                    <div className="text-center">
                      <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium group shadow-lg hover:shadow-xl">Se alla artiklar om flytt till Spanien<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Vanliga frågor om flytt till Spanien</h2>
              <div className="space-y-4">
                {[
                  { id: "spanien-1", question: "Hur mycket kostar en flytt till Spanien?", answer: "Priset beror på mängden gods, avstånd, och eventuella tillval som packning och magasinering. Fyll i vårt formulär för en snabb offert!" },
                  { id: "spanien-2", question: "Vilka dokument behövs för att flytta till Spanien?", answer: "Vi hjälper dig med all dokumentation som krävs för flytt inom EU, inklusive inventarielista och eventuella tillstånd." },
                  { id: "spanien-3", question: "Kan ni hjälpa till med magasinering innan eller efter flytten?", answer: "Ja, vi erbjuder säker magasinering både i Sverige och Spanien om du behöver mellanlagra dina saker." },
                  { id: "spanien-4", question: "Hur lång tid tar en flytt till Spanien?", answer: "Normalt tar transporten mellan 3–7 dagar beroende på avstånd och rutt. Vi planerar alltid tillsammans med dig för bästa lösning." },
                  { id: "spanien-5", question: "Är mina saker försäkrade under flytten?", answer: "Ja, vi har full försäkring för internationella flyttar så att du kan känna dig trygg genom hela processen." }
                ].map((faq, index) => (
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
                <p className="text-lg text-gray-600 mb-6">Har du fler frågor om flytt till Spanien?</p>
                <Link href="/faq" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla vanliga frågor<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 