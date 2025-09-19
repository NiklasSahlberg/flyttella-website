'use client';

import Image from "next/image";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import FlyttoffertForm from '../components/FlyttoffertForm'
import ReviewsWidget from '../components/ReviewsWidget'
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
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

// Lottie animation functions
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
    <div ref={ref} className="w-20 h-20 mx-auto mb-2">
      {animationData && <Lottie animationData={animationData} loop autoplay />}
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
  const { t, locale } = useLanguage();

  const [openFAQBohag, setOpenFAQBohag] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [expandedTipSection, setExpandedTipSection] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [showFullExperienceText, setShowFullExperienceText] = useState(false);
  const toggleFAQBohag = (id: string) => {
    setOpenFAQBohag(openFAQBohag === id ? null : id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const experienceCards = [
    { title: locale === 'sv' ? 'Flyttar' : 'Moves', count: '8000+', description: locale === 'sv' ? 'Genomförda flyttar' : 'Completed moves', delay: 0 },
    { title: locale === 'sv' ? 'Städningar' : 'Cleanings', count: '7000+', description: locale === 'sv' ? 'Genomförda städningar' : 'Completed cleanings', delay: 1 },
    { title: locale === 'sv' ? 'Månadsvis' : 'Monthly', count: '500+', description: locale === 'sv' ? 'Nöjda kunder' : 'Satisfied customers', delay: 2 },
  ];

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

  return (
    <main id="top" className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section - Matching start page design */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">

          
          {/* Mobile: Hero content after form removed per request */}
          
          {/* Mobile: Hero section */}
          <div className="md:hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/coupleMoving.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%'
                }}
              />
              <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl font-bold mb-6">
                  {t('bohagsflytt.hero.title')}
                </h1>
                <p className="text-2xl text-white/90">
                  {t('bohagsflytt.hero.subtitle')}
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

        {/* What is Bohagsflytt Section */}
        <section id="content" className="py-0 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              {/* Reco Widget - Positioned absolutely to the right */}
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[10rem] w-72 sidebar-widget">
                <div className="sticky top-8">
                  <iframe 
                    src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5"
                    className="w-full h-[1000px] border-0"
                    title="Flyttella recensioner"
                                />
                              </div>
                            </div>
              
              {/* Mobile Reco Widget removed per request */}
              
              {/* Montering Card - Positioned absolutely to the right */}
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1635px] w-64 sidebar-widget">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                  {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                    <div className="flex items-center gap-3 mb-4 relative">
                      <span className="text-4xl">🔧</span>
                      <h3 className="text-xl font-bold text-white">
                      Montering
                    </h3>
                  </div>
                    <p className="text-sm text-gray-100 mb-4 relative">
                    Säker montering och demontering av möbler och vitvaror. Vi säkerställer att allt monteras korrekt och säkert.
                  </p>
                  <div className="mt-auto relative">
                      <Link 
                        href="/montering" 
                        className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm"
                      >
                        Läs mer
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
                  </div>
                  </div>
                </div>
              </div>
              
              {/* Tunglyft Card - Positioned absolutely to the right */}
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1915px] w-64 sidebar-widget">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                  {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                    <div className="flex items-center gap-3 mb-4 relative">
                      <span className="text-4xl">🎹</span>
                      <h3 className="text-xl font-bold text-white">
                      Tunglyft
                    </h3>
                  </div>
                    <p className="text-sm text-gray-100 mb-4 relative">
                    Specialiserad flytt och lyft av tunga och otympliga föremål som piano, kassaskåp och maskiner.
                  </p>
                  <div className="mt-auto relative">
                      <Link 
                        href="/piano-tunglyft" 
                        className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm"
                      >
                        Läs mer
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
                  </div>
                  </div>
                </div>
              </div>
              
              {/* Bärhjälp Card - Positioned absolutely to the right */}
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[2180px] w-64 sidebar-widget">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                  {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                    <div className="flex items-center gap-3 mb-4 relative">
                      <span className="text-4xl">💪</span>
                      <h3 className="text-xl font-bold text-white">
                      Bärhjälp
                    </h3>
                  </div>
                    <p className="text-sm text-gray-100 mb-4 relative">
                    Extra hjälp vid flytt för tunga och stora föremål. Vi hjälper dig med det tunga lyftet.
                  </p>
                  <div className="mt-auto relative">
                      <Link 
                        href="/barhjalp" 
                        className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm"
                      >
                        Läs mer
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
                  </div>
                  </div>
                </div>
              </div>
              
              {/* Bortforsling Card - Positioned absolutely to the right */}
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[2440px] w-64 sidebar-widget">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                  {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                    <div className="flex items-center gap-3 mb-4 relative">
                      <span className="text-4xl">🗑️</span>
                      <h3 className="text-xl font-bold text-white">
                      Bortforsling
                    </h3>
                  </div>
                    <p className="text-sm text-gray-100 mb-4 relative">
                    Professionell bortforsling av möbler och bohag som inte längre behövs. Miljövänlig hantering.
                  </p>
                  <div className="mt-auto relative">
                      <Link 
                        href="/bortforsling" 
                        className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm"
                      >
                        Läs mer
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
                  </div>
            </div>
                  </div>
                  </div>

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
                    title: t('bohagsflytt.content.whatIsTitle'),
                    content: t('bohagsflytt.content.whatIsDescription'),
                    icon: '🏠',
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-12">
                        <Image 
                          src="/magkansla.jpg" 
                          alt={t('bohagsflytt.content.imageAlt')} 
                          width={1200}
                          height={400}
                          className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        />
                  </div>
                    ),
                    icon: '',
                  },
                  {
                    title: t('bohagsflytt.content.pricingTitle'),
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-left md:text-center px-4">
                          {t('bohagsflytt.content.pricingDescription')}
                        </p>
                        <div className="my-12 md:my-16 text-left md:text-center px-4">
                          <p className="text-xl md:text-2xl lg:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            {t('bohagsflytt.content.testimonial')}
                          </p>
                          <p className="italic text-gray-700 mt-2">- Erika</p>
                  </div>
                      </>
                    ),
                    icon: '💸',
                  },
                  {
                    title: t('bohagsflytt.content.bohag2010Title'),
                    content: t('bohagsflytt.content.bohag2010Description'),
                    icon: '📜',
                  },
                  {
                    title: t('bohagsflytt.content.boxesTitle'),
                    content: t('bohagsflytt.content.boxesDescription'),
                    icon: '📦',
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-12">
                        <Image 
                          src="/packing_tips.jpg" 
                          alt={t('bohagsflytt.content.packingTipsAlt')} 
                          width={1200}
                          height={400}
                          className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        />
                  </div>
                    ),
                    icon: '',
                  },
                  {
                    title: t('bohagsflytt.content.bookingTitle'),
                    content: t('bohagsflytt.content.bookingDescription'),
                    icon: '📅',
                  },
                  {
                    title: t('bohagsflytt.content.checklistTitle'),
                    content: (
                      <div className="px-4 md:px-0">
                        <ul className="list-disc pl-5 space-y-3 md:space-y-2">
                          {locale === 'sv' ? [
                            <li key="1"><strong>Boka flyttfirma i god tid:</strong> Säkerställ att du får det datum som passar dig bäst.</li>,
                            <li key="2"><strong>Rensa och sortera:</strong> Gå igenom dina saker och släng, sälj eller skänk det du inte behöver.</li>,
                            <li key="3"><strong>Beställ flyttkartonger:</strong> Låna eller köp tillräckligt med kartonger och packmaterial.</li>,
                            <li key="4"><strong>Packa smart:</strong> Märk kartonger med innehåll och rum. Packa tunga saker i små kartonger och lätta saker i stora. Vi erbjuder också packhjälp som ett tillval - kontakta oss för mer information.</li>,
                            <li key="5"><strong>Adressändra och meddela viktiga kontakter:</strong> Anmäl flytt till Skatteverket, försäkringsbolag, bank, elbolag och andra leverantörer.</li>,
                            <li key="6"><strong>Boka flyttstädning:</strong> Se till att bostaden är ordentligt städad inför överlämning.</li>,
                            <li key="7"><strong>Töm och frosta av frysen:</strong> Gör detta minst en dag innan flytten.</li>,
                            <li key="8"><strong>Plocka ner gardiner, lampor och hyllor:</strong> Förbered så mycket som möjligt innan flyttdagen.</li>,
                            <li key="9"><strong>Packa en "första natten-låda":</strong> Lägg i det viktigaste: kläder, hygienartiklar, laddare och viktiga papper.</li>,
                            <li key="10"><strong>Dubbelkolla allt på flyttdagen:</strong> Kontrollera att inget är kvar, att alla fönster och dörrar är låsta och att nycklar lämnas enligt överenskommelse.</li>
                          ] : [
                            <li key="1"><strong>Book moving company in good time:</strong> Make sure you get the date that suits you best.</li>,
                            <li key="2"><strong>Clean and sort:</strong> Go through your things and throw away, sell or donate what you don't need.</li>,
                            <li key="3"><strong>Order moving boxes:</strong> Borrow or buy enough boxes and packing materials.</li>,
                            <li key="4"><strong>Pack smart:</strong> Label boxes with contents and room. Pack heavy things in small boxes and light things in large ones. We also offer packing help as an option - contact us for more information.</li>,
                            <li key="5"><strong>Change address and notify important contacts:</strong> Report move to Tax Agency, insurance companies, bank, electricity company and other suppliers.</li>,
                            <li key="6"><strong>Book moving cleaning:</strong> Make sure the home is properly cleaned before handover.</li>,
                            <li key="7"><strong>Empty and defrost the freezer:</strong> Do this at least one day before the move.</li>,
                            <li key="8"><strong>Take down curtains, lamps and shelves:</strong> Prepare as much as possible before moving day.</li>,
                            <li key="9"><strong>Pack a "first night box":</strong> Put in the most important: clothes, hygiene items, chargers and important papers.</li>,
                            <li key="10"><strong>Double-check everything on moving day:</strong> Make sure nothing is left, that all windows and doors are locked and that keys are handed over as agreed.</li>
                          ]}
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
                    <div>
                      <div className="max-w-6xl mx-auto">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">
                          {section.title}
                    </h3>
                        {typeof section.content === 'string' ? (
                          <p className={`text-gray-700 leading-relaxed px-4 ${section.title === 'Vad är en bohagsflytt?' || section.title === 'Vad är bohagsflytt 2010?' || section.title === 'Flyttkartonger' || section.title === 'Boka flytthjälp i god tid' ? 'text-lg md:text-xl lg:text-2xl text-left md:text-center' : 'text-base md:text-lg lg:text-xl'}`}>
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



        {/* (CTA moved to below Om Flyttella) */}

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
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position"
            style={{
              backgroundImage: 'url(/efter_flytt.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 85%',
              zIndex: 0,
            }}
          />
          {/* Mobile-specific background positioning */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat md:hidden"
            style={{
              backgroundImage: 'url(/efter_flytt.jpg)',
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
          <div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
               style={{
                 background: 'linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
               }}
          />
          
          {/* Centered content */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:mr-60 om-oss-container">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Mobile image above title to match main page */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <Image
                    src="/personalpicture.jpg"
                    alt={t('bohagsflytt.about.imageAlt')}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 70%' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60 om-oss-title">{t('bohagsflytt.about.title')}</h3>

              <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
                {/* Left: Image - desktop only */}
                <motion.div
                  className="hidden lg:block w-full lg:w-1/5 relative lg:-ml-16 lg:pr-16"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.2
                  }}
                >
                  <div className="relative h-96 lg:h-full w-full lg:w-[200%] lg:-ml-[100%] overflow-hidden rounded-2xl">
                    <Image
                      src="/omoss.jpg"
                      alt={t('bohagsflytt.about.imageAlt')}
                      fill
                      className="object-cover rounded-2xl"
                      style={{ objectPosition: 'center center', transform: 'scale(1.0)' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
                
                {/* Right: Text content */}
                <motion.div
                  className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4
                  }}
                >
                  {/* Desktop: Always show full text in 3 sections */}
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {t('bohagsflytt.about.description')}
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {t('bohagsflytt.about.experience')}
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {t('bohagsflytt.about.quality')}
                    </p>
                  </div>
                  
                  {/* Mobile: Show shortened text with expand option */}
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {t('bohagsflytt.about.description')}
                    </p>
                    
                    {!showFullAboutText && (
                      <button
                        onClick={() => setShowFullAboutText(true)}
                        className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
                      >
                        {t('bohagsflytt.about.readMore')}
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
                          {t('bohagsflytt.about.experience')}
                        </p>
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                          {t('bohagsflytt.about.quality')}
                        </p>
                        
                        {/* Läs mer om oss link - Mobile only when expanded */}
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
                            {t('bohagsflytt.about.readMore')}
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
                  
                  {/* Läs mer om oss link - Desktop only */}
                  <motion.div
                    className="pt-6 hidden lg:block"
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
                      {t('bohagsflytt.about.readMore')}
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

        

        {/* Vad tycker våra kunder om oss */}
        <ReviewsWidget />

        {/* Redo att börja din flytt? (duplicate above Om Flyttella) - moved above Om Flyttella */}
        {/* (Duplicate rendered here above Om Flyttella) */}
        
        {/* Removed duplicate second instance of "Redo att börja din flytt?" */}



        {/* CTA: Redo att börja din flytt? (placed above Service Cards) */}
        <section className="py-12 bg-white">
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
              <div className="flex items-center gap-3 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🚚</span>
                <div>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    {t('bohagsflytt.cta.title')}
                  </h3>
                  <p className="text-base md:text-lg text-gray-100">
                    {t('bohagsflytt.cta.subtitle')}
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
                    href="/offert"
                    className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
                  >
                    {t('bohagsflytt.cta.button')}
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                {t('bohagsflytt.services.title')}
              </h2>
              <div className="grid grid-cols-1 gap-12">
              {/* Flyttstädning Card */}
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
                  <span className="text-4xl md:text-6xl">✨</span>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    {t('bohagsflytt.services.flyttstadning.title')}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
                  {t('bohagsflytt.services.flyttstadning.description')}
                </p>
                <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                  {t('bohagsflytt.services.flyttstadning.extendedDescription')}
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/flyttstadning" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg"
                    >
                      {t('bohagsflytt.services.flyttstadning.readMore')}
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
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    {t('bohagsflytt.services.magasinering.title')}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
                  {t('bohagsflytt.services.magasinering.description')}
                </p>
                <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                  {t('bohagsflytt.services.magasinering.extendedDescription')}
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/magasinering" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg"
                    >
                      {t('bohagsflytt.services.magasinering.readMore')}
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
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    {t('bohagsflytt.services.packhjalp.title')}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-gray-100 mb-1 md:mb-8 relative">
                  {t('bohagsflytt.services.packhjalp.description')}
                </p>
                <p className="md:hidden text-lg text-gray-100 mb-6 md:mb-0 relative">
                  {t('bohagsflytt.services.packhjalp.mobileDescription')}
                </p>
                <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                  {t('bohagsflytt.services.packhjalp.extendedDescription')}
                </p>
                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/barhjalp" 
                      className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg"
                    >
                      {t('bohagsflytt.services.packhjalp.readMore')}
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

          {/* Se alla våra tjänster Section */}
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
                    {locale === 'sv' 
                      ? 'Vi erbjuder ett komplett utbud av flytt- och städtjänster för att göra din flytt och städning så smidig som möjligt. Från bohagsflytt och flyttstädning till specialtjänster som tunglyft och magasinering.'
                      : 'We offer a complete range of moving and cleaning services to make your move and cleaning as smooth as possible. From household moves and moving cleaning to special services like heavy lifting and storage.'
                    }
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
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
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="/stadtjanster" 
                      className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                    >
                      {locale === 'sv' ? 'Se alla våra städtjänster' : 'See all our cleaning services'}
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
          <section className="py-8 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('bohagsflytt.tipsSection.title')}</h2>
                
                <div className="space-y-4 md:space-y-16">
                  
                  {/* Innan flytten */}
                  <div>
                    {/* Mobile: Expandable section header */}
                    <div className="md:hidden mb-4">
                      <button
                        onClick={() => setExpandedTipSection(expandedTipSection === 'innan' ? null : 'innan')}
                        className="w-full flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <h3 className="text-xl font-bold text-white">Innan flytten</h3>
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
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">{t('bohagsflytt.tipsSection.beforeMoving.title')}</h3>
                    
                    {/* Mobile: Expandable content */}
                    <div className={`md:block ${expandedTipSection === 'innan' ? 'block' : 'hidden'}`}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <TipCard
                        title={t('bohagsflytt.tips.planning.title')}
                        imageSrc="/tipsforflytt.jpg"
                        imageAlt={t('bohagsflytt.tips.planning.imageAlt')}
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            {locale === 'sv' ? [
                              <li key="1">Gör en checklista.</li>,
                              <li key="2">Rensa ut onödiga saker.</li>,
                              <li key="3">Boka flyttfirma och städning.</li>,
                              <li key="4">Beställ flyttkartonger.</li>
                            ] : [
                              <li key="1">Make a checklist.</li>,
                              <li key="2">Clear out unnecessary things.</li>,
                              <li key="3">Book moving company and cleaning.</li>,
                              <li key="4">Order moving boxes.</li>
                            ]}
                          </ul>
                        }
                      />
                      <TipCard
                        title={t('bohagsflytt.tips.contracts.title')}
                        imageSrc="/viktigaavtalcustomer.png"
                        imageAlt={t('bohagsflytt.tips.contracts.imageAlt')}
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            {locale === 'sv' ? [
                              <li key="1">Adressändra hos Skatteverket.</li>,
                              <li key="2">Flytta el, bredband, etc.</li>,
                              <li key="3">Teckna nya avtal.</li>,
                              <li key="4">Meddela viktiga kontakter.</li>
                            ] : [
                              <li key="1">Change address with the Tax Agency.</li>,
                              <li key="2">Move electricity, broadband, etc.</li>,
                              <li key="3">Sign new contracts.</li>,
                              <li key="4">Notify important contacts.</li>
                            ]}
                          </ul>
                        }
                      />
                      <TipCard
                          title={t('bohagsflytt.tips.beforeMoving.title')}
                          imageSrc="/innanflyttfirmankommer.jpg"
                          imageAlt={t('bohagsflytt.tips.beforeMoving.imageAlt')}
                          objectPosition="object-[center_45%]"
                          content={
                            <ul className="list-disc pl-5 space-y-2">
                              {locale === 'sv' ? [
                                <li key="1">Packa ner allt lösöre i kartonger</li>,
                                <li key="2">Montera ner alla gardiner</li>,
                                <li key="3">Montera ner alla lampor</li>,
                                <li key="4">Dubbelkolla packning och märkning.</li>
                              ] : [
                                <li key="1">Pack all loose items in boxes</li>,
                                <li key="2">Take down all curtains</li>,
                                <li key="3">Take down all lamps</li>,
                                <li key="4">Double-check packing and labeling.</li>
                              ]}
                            </ul>
                          }
                        />
                      <TipCard
                        title={t('bohagsflytt.tipsSection.packingTips.title')}
                        imageSrc="/packing_tips.jpg"
                        imageAlt={t('bohagsflytt.tipsSection.packingTips.imageAlt')}
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            {locale === 'sv' ? [
                              <li key="1">Märk alla kartonger tydligt.</li>,
                              <li key="2">Håll nycklar tillgängliga.</li>,
                              <li key="3">Överbelasta inte flyttlådorna.</li>,
                              <li key="4">Använd silkespapper för ömtåliga föremål och porslin.</li>
                            ] : [
                              <li key="1">Label all boxes clearly.</li>,
                              <li key="2">Keep keys accessible.</li>,
                              <li key="3">Don't overload moving boxes.</li>,
                              <li key="4">Use tissue paper for delicate items and porcelain.</li>
                            ]}
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
                        <h3 className="text-xl font-bold text-white">Under flytten</h3>
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
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">{t('bohagsflytt.tipsSection.duringMoving.title')}</h3>
                    
                    {/* Mobile: Expandable content */}
                    <div className={`md:block ${expandedTipSection === 'under' ? 'block' : 'hidden'}`}>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <TipCard
                          title={t('bohagsflytt.tipsSection.smoothMovingDay.title')}
                          imageSrc="/smidigflyttdag.jpg"
                          imageAlt={t('bohagsflytt.tipsSection.smoothMovingDay.imageAlt')}
                          objectPosition="object-[center_35%]"
                          content={
                            <ul className="list-disc pl-5 space-y-2">
                              {locale === 'sv' ? [
                                <li key="1">Håll värdesaker tillgängliga.</li>,
                                <li key="2">Säkerställ fri väg för flytthjälp.</li>,
                                <li key="3">Gör en slutkontroll av bostaden efter inlastning och efter avlastning i båda bostäderna för att säkerställa att inget glömts kvar.</li>,
                                <li key="4">Se till att montera ner eller packa ner bortglömda föremål.</li>
                              ] : [
                                <li key="1">Keep valuables accessible.</li>,
                                <li key="2">Ensure clear path for movers.</li>,
                                <li key="3">Do a final check of the home after loading and unloading in both homes to ensure nothing is left behind.</li>,
                                <li key="4">Make sure to dismantle or pack forgotten items.</li>
                              ]}
                            </ul>
                          }
                        />
                      <TipCard
                          title={t('bohagsflytt.tips.duringMoving.title')}
                          imageSrc="/under_flytt.jpg"
                          imageAlt={t('bohagsflytt.tips.duringMoving.imageAlt')}
                          objectPosition="object-center"
                          content={
                            <ul className="list-disc pl-5 space-y-2">
                              {locale === 'sv' ? [
                                <li key="1">Håll kontakt med flyttledaren.</li>,
                                <li key="2">Fotografera eventuella skador.</li>,
                                <li key="3">Kontrollera att allt laddas korrekt.</li>,
                                <li key="4">Följ med till den nya adressen.</li>,
                                <li key="5">Var tydlig med särskilda önskemål.</li>,
                                <li key="6">Var tillgänglig för frågor.</li>
                              ] : [
                                <li key="1">Keep contact with the moving leader.</li>,
                                <li key="2">Photograph any damages.</li>,
                                <li key="3">Check that everything is loaded correctly.</li>,
                                <li key="4">Follow to the new address.</li>,
                                <li key="5">Be clear with special requests.</li>,
                                <li key="6">Be available for questions.</li>
                              ]}
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
                        <h3 className="text-xl font-bold text-white">Efter flytten</h3>
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
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">{t('bohagsflytt.tipsSection.afterMoving.title')}</h3>
                    
                    {/* Mobile: Expandable content */}
                    <div className={`md:block ${expandedTipSection === 'efter' ? 'block' : 'hidden'}`}>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <TipCard
                          title={t('bohagsflytt.tipsSection.startInNewHome.title')}
                          imageSrc="/efter_flytt.jpg"
                          imageAlt={t('bohagsflytt.tipsSection.startInNewHome.imageAlt')}
                          objectPosition="object-[10%_center]"
                          content={
                            <ul className="list-disc pl-5 space-y-2">
                              {locale === 'sv' ? [
                                <li key="1">Kontrollera flyttstädningen.</li>,
                                <li key="2">Packa upp det viktigaste först.</li>,
                                <li key="3">Kontrollera att alla föremål anlänt.</li>,
                                <li key="4">Montera upp gardiner och lampor.</li>,
                                <li key="5">Uppdatera adress hos myndigheter.</li>,
                                <li key="6">Testa alla vitvaror och eluttag.</li>,
                                <li key="7">Ta bort tomma kartonger och emballage.</li>
                              ] : [
                                <li key="1">Check the moving cleaning.</li>,
                                <li key="2">Unpack the most important things first.</li>,
                                <li key="3">Check that all items have arrived.</li>,
                                <li key="4">Mount curtains and lamps.</li>,
                                <li key="5">Update address with authorities.</li>,
                                <li key="6">Test all appliances and outlets.</li>,
                                <li key="7">Remove empty boxes and packaging.</li>
                              ]}
                            </ul>
                          }
                        />
                      <TipCard
                          title={t('bohagsflytt.tips.afterMoving.title')}
                          imageSrc="/godtid.jpg"
                          imageAlt={t('bohagsflytt.tips.afterMoving.imageAlt')}
                          objectPosition="object-center"
                          content={
                            <ul className="list-disc pl-5 space-y-2">
                              {locale === 'sv' ? [
                                <li key="1">Fotografera ditt nya hem.</li>,
                                <li key="2">Kontakta flyttfirman för feedback.</li>,
                                <li key="3">Skriv en recension av tjänsten.</li>,
                                <li key="4">Organisera flyttkvitton och dokument.</li>,
                                <li key="5">Fira din nya bostad med familj och vänner.</li>,
                                <li key="6">Uppdatera försäkringar för nya bostaden.</li>
                              ] : [
                                <li key="1">Photograph your new home.</li>,
                                <li key="2">Contact the moving company for feedback.</li>,
                                <li key="3">Write a review of the service.</li>,
                                <li key="4">Organize moving receipts and documents.</li>,
                                <li key="5">Celebrate your new home with family and friends.</li>,
                                <li key="6">Update insurance for the new home.</li>
                              ]}
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

                  {/* Redo att börja din flytt? */}
          <section className="py-16 bg-white mt-0 -mb-16">
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
                    {t('bohagsflytt.cta.title')}
                  </h3>
                  <p className="text-lg text-gray-100">
                    {t('bohagsflytt.cta.subtitle')}
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
                    href="/offert"
                    className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base"
                  >
                    {t('bohagsflytt.cta.button')}
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

        {/* Vår erfarenhet */}
        <motion.section
          className="relative overflow-hidden"
          style={{
            paddingTop: '14rem',
            paddingBottom: '6rem',
            marginTop: '-2rem',
            borderTop: 'none',
            boxShadow: 'none',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background image absolutely positioned (desktop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position"
            style={{
              backgroundImage: 'url(/backgroundpicture.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              zIndex: 0,
            }}
          />
          {/* Mobile-specific background image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage: 'url(/omoss.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              zIndex: 0,
            }}
          />
          {/* Overlay absolutely positioned, full width */}
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />

          {/* Top gradient fade */}
          <div
            className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Centered content only */}
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('bohagsflytt.experience.title')}</h3>

              {/* Mobile: Auto-sliding cards */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentCard * 100}%)` }}
                  >
                    {experienceCards.map((card, index) => (
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
                            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                            style={{
                              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                              backgroundSize: '20px 20px',
                            }}
                          />
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <motion.h2
                              className="text-lg font-bold mb-2 text-white text-center"
                              initial="initial"
                              whileInView="animate"
                              viewport={{ once: true, amount: 0.2 }}
                              variants={fadeInUp}
                              transition={{ duration: 0.8, delay: card.delay * 0.25 }}
                            >
                              {card.title}
                            </motion.h2>
                            <motion.div
                              className="text-3xl font-bold mb-2 text-white text-center"
                              initial="initial"
                              whileInView="animate"
                              viewport={{ once: true, amount: 0.2 }}
                              variants={fadeInUp}
                              transition={{ duration: 0.8, delay: card.delay * 0.25 }}
                            >
                              {card.count}
                            </motion.div>
                            <motion.p
                              className="text-white/90 text-sm text-center leading-relaxed"
                              initial="initial"
                              whileInView="animate"
                              viewport={{ once: true, amount: 0.2 }}
                              variants={fadeInUp}
                              transition={{ duration: 0.8, delay: card.delay * 0.25 }}
                            >
                              {card.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* Dots indicator */}
                  <div className="flex justify-center mt-3 space-x-2">
                    {experienceCards.map((_, index) => (
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
                {experienceCards.map((card, index) => (
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
                      transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                      style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <motion.h2
                        className="text-xl font-bold mb-2 text-white"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        transition={{ duration: 0.8, delay: card.delay * 0.25 }}
                      >
                        {card.title}
                      </motion.h2>
                      <motion.div
                        className="text-4xl md:text-5xl font-bold mb-2 text-white"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        transition={{ duration: 0.8, delay: card.delay * 0.25 }}
                      >
                        {card.count}
                      </motion.div>
                      <motion.p
                        className="text-white/90"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        transition={{ duration: 0.8, delay: card.delay * 0.25 }}
                      >
                        {card.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Experience description text and badges */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                {/* Experience description text */}
                <motion.div
                  className="flex-1 max-w-4xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Lokal erfarenhet i Stockholm' : 'Local experience in Stockholm'}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4 px-4 md:px-8">
                    {locale === 'sv' 
                      ? 'Vi har hjälpt tusentals kunder med deras flyttar i Stockholm och omnejd. Vår lokala kunskap och erfarenhet säkerställer att vi kan hantera alla typer av flyttar, från små lägenheter till stora villor.'
                      : 'We have helped thousands of customers with their moves in Stockholm and the surrounding area. Our local knowledge and experience ensures that we can handle all types of moves, from small apartments to large villas.'
                    }
                  </p>
                  {!showFullExperienceText && (
                    <div className="md:hidden mb-3">
                      <motion.button
                        onClick={() => setShowFullExperienceText(true)}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  {showFullExperienceText && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4 mt-4 md:hidden px-4 md:px-8"
                    >
                      <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                        {locale === 'sv' 
                          ? 'Med vår erfarenhet sedan 2010 har vi byggt upp rykte för kvalitet, pålitlighet och kundnöjdhet. Vi förstår de lokala förutsättningarna och kan erbjuda skräddarsydda lösningar för alla behov.'
                          : 'With our experience since 2010, we have built a reputation for quality, reliability and customer satisfaction. We understand the local conditions and can offer tailored solutions for all needs.'
                        }
                      </p>
                    </motion.div>
                  )}
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
                    {locale === 'sv' 
                      ? 'Med vår erfarenhet sedan 2010 har vi byggt upp rykte för kvalitet, pålitlighet och kundnöjdhet. Vi förstår de lokala förutsättningarna och kan erbjuda skräddarsydda lösningar för alla behov.'
                      : 'With our experience since 2010, we have built a reputation for quality, reliability and customer satisfaction. We understand the local conditions and can offer tailored solutions for all needs.'
                    }
                  </p>
                </motion.div>

                {/* Badges - mobile pyramid layout */}
                <div className="flex flex-col md:hidden items-center">
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                    <Image
                      src="/1000reviewspicture.png"
                      alt={t('bohagsflytt.reviews.imageAlt')}
                      width={200}
                      height={200}
                      className="object-contain h-36 w-36"
                      priority={true}
                    />
                  </motion.div>
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

                {/* Badges - desktop horizontal layout */}
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
                      alt={t('bohagsflytt.reviews.imageAlt')}
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
            </motion.div>
          </div>

          {/* Bottom gradient fade - mobile only, shorter */}
          <div
            className="absolute bottom-0 left-0 w-full h-24 md:h-48 z-30 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)',
            }}
          />
        </motion.section>

        {/* Process Section */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="mx-auto px-0 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
                  {t('bohagsflytt.process.title')}
                </h2>

                {/* Process Description */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('bohagsflytt.process.description')}
                  </p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
                    {t('bohagsflytt.process.pricing')}
                  </p>
                </div>

                {/* Process Flow Section */}
                <div className="mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{t('bohagsflytt.process.subtitle')}</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
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
                          icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
                          title: t('bohagsflytt.process.steps.3.title'),
                          description: t('bohagsflytt.process.steps.3.description'),
                          containerClass: "md:-mt-6",
                          textClass: ""
                        },
                        {
                          icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
                          title: t('bohagsflytt.process.steps.2.title'),
                          description: t('bohagsflytt.process.steps.2.description'),
                          containerClass: "md:-mt-7",
                          textClass: ""
                        },
                        {
                          icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
                          title: t('bohagsflytt.process.steps.4.title'),
                          description: t('bohagsflytt.process.steps.4.description'),
                          containerClass: "md:-mt-14",
                          textClass: "md:-mt-8",
                        },
                        {
                          icon: <div className="md:mt-0"><HappyCustomerLottie /></div>,
                          title: t('bohagsflytt.process.steps.5.title'),
                          description: t('bohagsflytt.process.steps.5.description'),
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





        {/* Blog Post Section (copied from start page) */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="w-full px-4 md:px-6">
            <div className="w-full">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">
                  {locale === 'sv' ? 'Läs mer om flytt i Stockholm' : 'Read more about moving in Stockholm'}
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                  {locale === 'sv' ? 'Få värdefulla tips och råd för en smidig flytt' : 'Get valuable tips and advice for a smooth move'}
                </p>
              </div>
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-1 gap-4 md:gap-2">
                  <motion.div 
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col md:flex-row h-full items-stretch">
                      <div className="w-full md:w-1/3 h-48 md:h-full relative">
                        <Image 
                          src="/tipsforflytt.jpg" 
                          alt={locale === 'sv' ? 'Flytttips Stockholm' : 'Moving tips Stockholm'} 
                          fill
                          className="object-cover object-[60%_center]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="w-full md:w-2/3 p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4 space-y-2 sm:space-y-0">
                          <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium w-fit">
                            {locale === 'sv' ? 'Flytttips' : 'Moving Tips'}
                          </span>
                          <span className="text-gray-500 text-sm md:text-base sm:ml-4">{locale === 'sv' ? '5 min läsning' : '5 min read'}</span>
                        </div>
                        <h3 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-4 md:mb-6 leading-tight">
                          {locale === 'sv' ? 'Vad bör du tänka på när du väljer en seriös flyttfirma' : 'What should you consider when choosing a serious moving company'}
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                          {locale === 'sv' 
                            ? 'Att välja rätt flyttfirma är avgörande för en smidig flytt. I denna guide går vi igenom de viktigaste faktorerna du bör tänka på - från försäkringar och tillstånd till kundrecensioner och pristransparens.'
                            : 'Choosing the right moving company is crucial for a smooth move. In this guide, we go through the most important factors you should consider - from insurance and permits to customer reviews and price transparency.'
                          }
                        </p>
                        <div className="flex justify-start sm:justify-between items-center">
                          <div></div>
                          <Link 
                            href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma" 
                            className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:opacity-90 transition-opacity font-medium text-sm md:text-base group w-fit"
                          >
                            {locale === 'sv' ? 'Läs mer' : 'Read more'}
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
            <div className="text-center mt-8 md:mt-12">
              <Link 
                href="/blogg" 
                className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                {locale === 'sv' ? 'Se alla artiklar om flytt' : 'See all moving articles'}
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
                {t('bohagsflytt.faq.title')}
              </h2>
              <div className="space-y-4">
                {(locale === 'sv' ? [
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
                ] : [
                  {
                    id: "bohag-1",
                    question: "How do I best prepare for a household move?",
                    answer: "Start by clearing out things you no longer need and sorting your belongings. Pack in good time and clearly label all boxes with contents and which room they should go to. Inform important authorities about your address change and book a moving company in good time, especially if you're moving during peak season. Also make sure to book elevator and parking if needed."
                  },
                  {
                    id: "bohag-2",
                    question: "What is usually included in a household move with a moving company?",
                    answer: "A household move with a moving company usually includes carrying help, loading, transport and unloading of your belongings. Many companies also offer additional services such as packing, assembly, storage and moving cleaning. Always check what's included in the quote and which services can be added to adapt the move to your needs."
                  },
                  {
                    id: "bohag-3",
                    question: "How does insurance work for household moving?",
                    answer: "Most serious moving companies have liability insurance that covers any damage that may occur during the move. However, it's important that you yourself have home insurance that applies on moving day. Read through the terms carefully and ask your moving company what applies if something breaks or disappears."
                  },
                  {
                    id: "bohag-4",
                    question: "How long does a household move take and what affects the time?",
                    answer: "The time depends on several factors: the amount of belongings, the distance between addresses, access to elevator, floor level, and whether you've chosen additional services such as packing or assembly. A normal household move within the same city usually takes one day, but larger or more complex moves can take longer."
                  },
                  {
                    id: "bohag-5",
                    question: "Can I book moving boxes and packing materials through you?",
                    answer: "Yes, we offer rental and sale of moving boxes and packing materials. When you book your move with us, you can borrow moving boxes free of charge for a certain period. We also have special boxes for items such as glass, porcelain and clothes to protect your things in the best way."
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
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            {locale === 'sv' ? 'Har du fler frågor?' : 'Do you have more questions?'}
          </p>
          <Link 
            href="/faq" 
            className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
          >
            {locale === 'sv' ? 'Se alla vanliga frågor' : 'See all common questions'}
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
  )
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
        height={192}
        className={`w-full h-48 object-cover ${objectPosition}`}
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    )}
    <div className="p-6">
      <h4 className="text-2xl font-bold text-[#0F172A] mb-3">{title}</h4>
      <div className="text-gray-600 text-lg leading-relaxed">{content}</div>
    </div>
  </div>
); 