'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import FlyttoffertForm from '../components/FlyttoffertForm';
import ReviewsWidget from '../components/ReviewsWidget';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Variants } from 'framer-motion';

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

export default function FlyttfirmaAkersbergaPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
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
  
  function HappyCustomerLottie() {
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

  function CashLottie() {
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/cash.json")
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
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/boxes.json")
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
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/insurance.json")
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
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/schedule2.json")
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

  function FeatureBoxesSection() {
    // Animation for insurance logos
    const [logoIndex, setLogoIndex] = React.useState(0);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setLogoIndex((prev) => (prev + 1) % 2);
      }, 1800);
      return () => clearInterval(interval);
    }, []);
  
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
                        <HappyCustomerLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "kartonger",
                    label: "Fritt lån av kartonger i 4 veckor",
                    icon: (
                      <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center overflow-visible">
                        <BoxesLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "rut-avdrag",
                    label: "50% RUT-avdrag",
                    icon: (
                      <motion.div variants={variants} animate="wiggle" className="h-8 w-8 flex items-center justify-center overflow-visible">
                        <CashLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "ombokning-avbokning",
                    label: "24h kostnadsfri ombokning och avbokning",
                    icon: (
                      <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible">
                        <ScheduleLottie />
                      </motion.div>
                    ),
                  },
                  {
                    key: "tillstand",
                    label: "Trafiktillstånd och försäkring",
                    icon: (
                      <div className="flex items-center justify-start w-full">
                        <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center mr-4 overflow-visible">
                          <InsuranceLottie />
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
            Vilka förmåner får du med Flyttella i Åkersberga?
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
                  src="/personalpicture.jpg"
              alt="Flyttfirma i arbete"
                  fill
                  className="rounded-2xl shadow object-cover object-right"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section */}
        <section className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          <div className="mx-auto px-24">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/ostermalm.avif)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Din pålitliga flyttfirma i Åkersberga
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8">
                    Vi erbjuder professionell flyttservice anpassad för Åkersbergas unika behov - från moderna lägenheter i centrum till villor i lugna villaområden.
                  </p>

                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <FlyttoffertForm mode="widget" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Om Flyttella Section (copied from main page) */}
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
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/efter_flytt.jpg)',
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
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Om Flyttella</h3>
              <div className="space-y-8 max-w-6xl mx-auto">
                {/* Full text content */}
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={variants}
                  transition={{ 
                    duration: 0.8,
                    delay: 0 * 0.25
                  }}
                >
                  <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed text-center font-bold">
                    Flyttella är din lokala flyttfirma i Åkersberga med lång erfarenhet av att hjälpa både privatpersoner och företag med flytt och städning i området. Vi har specialiserat oss på att erbjuda trygga, smidiga och prisvärda flyttjänster i Åkersberga – från lägenheter i centrum till villor i de naturnära omgivningarna.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed text-center font-bold">
                    Det som gör oss unika som flyttfirma i Åkersberga är vårt fokus på tydliga villkor, fasta priser och personlig service. Vi erbjuder alltid gratis lån av flyttkartonger, kostnadsfri om- och avbokning upp till 24 timmar innan flytten samt en generös 14 dagars garanti på alla flyttstädningar. För dig som även bokar packhjälp erbjuder vi packgaranti, vilket innebär att vi tar fullt ansvar för det vi packar.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed text-center font-bold">
                    Vi känner till Åkersbergas olika områden och kan anpassa våra flyttjänster efter just dina behov. Oavsett om du ska flytta inom Åkersberga, till eller från området, kan du lita på att vi hanterar din flytt med omsorg och effektivitet. Vår lokala expertis gör att vi kan erbjuda snabba och flexibla lösningar, oavsett om det gäller bohagsflytt, kontorsflytt eller flyttstädning.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed text-center font-bold">
                    Vårt mål är att göra din flytt i Åkersberga så enkel och stressfri som möjligt. Vi erbjuder fri rådgivning, snabb offert och personlig kontakt genom hela processen. Flyttella har hjälpt över 8000 nöjda kunder och vi är stolta över vårt rykte som en pålitlig och professionell flyttfirma i Åkersberga.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed text-center font-bold">
                    Kontakta oss idag för en kostnadsfri offert på flytt eller städning i Åkersberga – vi ser fram emot att hjälpa dig med din nästa flytt!
                  </p>
                  {/* Läs mer om oss link */}
                  <motion.div
                    className="mt-12 text-center"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={variants}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.5
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
          <FeatureBoxesSection />

        {/* Reviews Section */}
        <ReviewsWidget 
          location="Åkersberga"
          title="Vad tycker våra kunder om oss?"
          subtitle="Pålitlig flyttservice i Åkersberga med lokalkännedom"
          description="Som Åkersbergas föredragna flyttfirma prioriterar vi din tillfredsställelse över allt annat. Vi vet att flyttar kan vara överväldigande, vilket är varför vi arbetar hårt för att skapa en känsla av trygghet och kontroll. Med vår djupa lokalkännedom och engagerade personal säkerställer vi att varje flytt i Åkersberga blir en smidig och minnesvärd upplevelse."
          badgeAlt="5 års erfarenhet som flyttfirma i Åkersberga"
          arrowText="Läs vad våra kunder i Åkersberga säger om oss"
        />

        {/* Process and Features Section */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="mx-auto px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-10 mb-24 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  Vår Process & Fördelar
                </h2>

                {/* Pricing Info */}
                <div className="text-center mb-8">
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-4">
                    Vi arbetar med fasta priser för att ge dig trygghet och transparens i Åkersberga. 
                    Det går även att komma överens om löpande priser för regelbundna flyttar i området.
                  </p>
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-4">
                    Våra offerter är alltid baserade på dina specifika behov och omständigheter i Åkersberga. 
                    Vi tar hänsyn till faktorer som boyta, våning, hiss och parkeringsavstånd för att ge dig en offert som passar just din situation i Åkersberga. 
                    Alla priser är fasta utan dolda avgifter - vi utgår alltid från dina önskemål och information vi får från dig som kund i Åkersberga. 
                    Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov i Åkersberga.
                  </p>
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-8">
                    Som en seriös flyttfirma i Åkersberga har vi alla nödvändiga tillstånd, skattesedel och försäkringar på plats. 
                    Du kan vara trygg med att vi följer alla gällande regler och bestämmelser i Åkersberga. Vi erbjuder även professionell besiktning av din bostad i Åkersberga vid behov.
                  </p>
                </div>

                {/* Process Flow Section */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Så fungerar det</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 w-full">
                      {[
                        {
                          icon: <FillFormLottie />,
                          title: "Fyll i formuläret",
                          description: "Berätta om din flytt",
                          textClass: ""
                        },
                        {
                          icon: <FastLottie />,
                          title: "Snabb offert",
                          description: "Få pris på 1 minut",
                          textClass: ""
                        },
                        {
                          icon: <div className="ml-3 mt-8"><PhoneCallLottie /></div>,
                          title: "Personlig kontakt",
                          description: "Vi ringer samma dag eller dagen efter",
                          containerClass: "-mt-7",
                          textClass: ""
                        },
                        {
                          icon: <div className="ml-6 mt-0"><SignFormLottie /></div>,
                          title: "Signera & bekräfta",
                          description: "Få bokningsbekräftelse direkt",
                          containerClass: "-mt-6",
                          textClass: ""
                        },
                        {
                          icon: <div className="mr-3"><MovingTruckLottie /></div>,
                          title: "Flytt genomförd",
                          description: "Vi tar hand om allt",
                          containerClass: "-mt-14",
                          textClass: "-mt-8",
                        },
                        {
                          icon: <div className="mt-0"><HappyCustomerLottie /></div>,
                          title: "Nöjd kund",
                          description: "14 dagars nöjd kund garanti",
                          containerClass: "-mt-6",
                          textClass: ""
                        }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 h-full"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {/* Timeline dot */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#10B981] rounded-full hidden md:block"></div>
                          <div className={`${step.containerClass || ''} w-full flex flex-col items-center justify-center`}>
                            <div className="mb-2">{step.icon}</div>
                            <div className={`flex flex-col items-center justify-center w-full ${step.textClass || ''}`}>
                              <h4 className="text-white font-semibold text-base md:text-lg mb-1 text-center w-full">{step.title}</h4>
                              <p className="text-white/80 text-sm md:text-base text-center w-full">{step.description}</p>
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
          className="relative overflow-hidden"
          style={{
            paddingTop: '14rem',
            paddingBottom: '6rem',
            marginTop: '-8rem',
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
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/backgroundpicture.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 100%',
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
          
          {/* Centered content only */}
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>
              <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Flyttar */}
                <motion.div 
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={variants}
                  transition={{ 
                    duration: 0.8,
                    delay: 0 * 0.25
                  }}
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
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 
                      className="text-xl font-bold mb-2 text-white"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 0 * 0.25
                      }}
                    >
                      Flyttar
                    </motion.h2>
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold mb-2 text-white"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 0 * 0.25
                      }}
                    >
                      <CountUp 
                        end={8000} 
                        duration={2.5}
                        suffix="+"
                        useEasing={true}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      />
                    </motion.div>
                    <motion.p 
                      className="text-white/90"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 0 * 0.25
                      }}
                    >
                      uppdrag utförda
                    </motion.p>
                  </div>
                </motion.div>

                {/* Städningar */}
                <motion.div 
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={variants}
                  transition={{ 
                    duration: 0.8,
                    delay: 1 * 0.25
                  }}
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
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 
                      className="text-xl font-bold mb-2 text-white"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 1 * 0.25
                      }}
                    >
                      Städningar
                    </motion.h2>
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold mb-2 text-white"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 1 * 0.25
                      }}
                    >
                      <CountUp 
                        end={7000} 
                        duration={2.5}
                        suffix="+"
                        useEasing={true}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      />
                    </motion.div>
                    <motion.p 
                      className="text-white/90"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 1 * 0.25
                      }}
                    >
                      uppdrag utförda
                    </motion.p>
                  </div>
                </motion.div>

                {/* Månadsvis */}
                <motion.div 
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={variants}
                  transition={{ 
                    duration: 0.8,
                    delay: 2 * 0.25
                  }}
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
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 
                      className="text-xl font-bold mb-2 text-white"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 2 * 0.25
                      }}
                    >
                      Månadsvis
                    </motion.h2>
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold mb-2 text-white"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 2 * 0.25
                      }}
                    >
                      <CountUp 
                        end={500} 
                        duration={2.5}
                        suffix="+"
                        useEasing={true}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      />
                    </motion.div>
                    <motion.p 
                      className="text-white/90"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={variants}
                      transition={{ 
                        duration: 0.8,
                        delay: 2 * 0.25
                      }}
                    >
                      uppdrag per månad
                    </motion.p>
                  </div>
                </motion.div>
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
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                    Lokal erfarenhet som ger resultat i Åkersberga
                  </h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    Med över 8000 flyttar och 7000 städningar bakom oss har vi byggt upp en unik expertis inom flytt- och städningsbranschen. 
                    Vår erfarenhet i Åkersberga sträcker sig över alla områden från Margretelund till Österskär, och vi har hjälpt hundratals familjer och företag med deras flyttar i Åkersberga.
                  </p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6">
                    Som flyttfirma i Åkersberga har våra prestationer gett oss erkännande som en av områdets mest pålitliga flyttfirmor, med över 1000 positiva recensioner och 
                    rekommendationer från nöjda kunder. Vi är stolta över att kunna erbjuda professionell flyttservice baserad på år av praktisk erfarenhet i Åkersberga.
                  </p>
                </motion.div>

                {/* Recommended Company and 1000 Reviews badges under text */}
                <div className="flex items-center justify-center gap-6">
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
            </motion.div>
          </div>
          
          {/* Bottom gradient fade - enhanced to completely hide container lines */}
          <div className="absolute bottom-0 left-0 w-full h-48 z-30 pointer-events-none"
               style={{
                 background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)'
               }}
          />
        </motion.section>

        {/* Features Section */}
        <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
          <div className="mx-auto px-24">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
              <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                {/* Left side - Features content */}
                <div className="flex-[2] w-full">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">Våra fördelar</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                    {[
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
                        icon: "📦",
                        title: "Magasinering",
                        description: "Säker magasinering av dina tillhörigheter i Åkersberga. Vi erbjuder flexibla lösningar för kortare och längre lagring med säker hantering.",
                        link: "/magasinering"
                      },
                      {
                        icon: "⏰",
                        title: "Omboka eller avboka kostnadsfritt",
                        description: "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten",
                        link: "/avbokning"
                      },
                      {
                        icon: "✅",
                        title: "Nöjd kund garanti",
                        description: "14 dagars garanti på flyttstädning",
                        link: "/garanti"
                      },
                      {
                        icon: "🔒",
                        title: "Trafiktillstånd och försäkring",
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
                    ].map((feature, i) => (
                      <motion.div
                        key={feature.icon}
                        className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <span className="text-2xl md:text-3xl">{feature.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                          <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
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
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right side - Image */}
                <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                  <div className="w-full h-full flex items-stretch">
                    <Image
                      src="/smiling_worker_new.png"
                      alt="Professionell flyttarbetare i Åkersberga - Flyttella"
                      width={600}
                      height={200}
                      className="rounded-xl shadow-lg object-cover w-full h-full"
                      style={{ objectPosition: '30% 80%' }}
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-3/5 flex justify-center">
                <Image
                  src="/awards_no_bg.png"
                  alt="Flyttellas utmärkelser - Flyttfirma i Åkersberga"
                  width={1200}
                  height={600}
                  className="object-contain w-full h-auto max-w-3xl"
                  priority
                />
              </div>
              <div className="w-full md:w-2/5 text-left flex flex-col items-start justify-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">Utmärkelser för vårt arbete i Åkersberga</h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Våra utmärkelser är ett bevis på vårt engagemang för kvalitet, service och kundnöjdhet i Åkersberga.<br />
                  Genom åren har vi blivit erkända av både branschorganisationer och våra kunder i Åkersberga för vårt pålitliga arbete och höga standard.<br />
                  Dessa utmärkelser inspirerar oss att fortsätta leverera flyttjänster i toppklass i Åkersberga – varje dag, till varje kund.
                </p>
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
                  Upptäck Alla Våra Tjänster i Åkersberga
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
                  Vi erbjuder ett komplett utbud av flyttjänster i Åkersberga för att göra din flytt så smidig som möjligt. 
                  Från bohagsflytt och flyttstädning till specialtjänster som piano- och magasinering.
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
                    Se alla våra privattjänster
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
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Tips för din flytt Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Tips för din flytt</h2>
              
              <div className="space-y-16">
                
                {/* Innan flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Innan flytten</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TipCard
                      title="Planera och förbered"
                      imageSrc="/tipsforflytt.jpg"
                      imageAlt="Flyttplanering i Åkersberga - Tips för flytt"
                      content={
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Gör en checklista.</li>
                          <li>Rensa ut onödiga saker.</li>
                          <li>Boka flyttfirma och städning.</li>
                          <li>Beställ flyttkartonger.</li>
                        </ul>
                      }
                    />
                    <TipCard
                      title="Avtal och anmälningar"
                      imageSrc="/viktigaavtalcustomer.png"
                      imageAlt="Viktiga avtal för flytt i Åkersberga"
                      content={
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Adressändra hos Skatteverket.</li>
                          <li>Flytta el, bredband, etc.</li>
                          <li>Teckna nya avtal.</li>
                          <li>Meddela viktiga kontakter.</li>
                        </ul>
                      }
                    />
                    <TipCard
                      title="Packtips"
                      imageSrc="/packing_tips.jpg"
                      imageAlt="Packningstips för flytt i Åkersberga"
                      content={
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Märk alla kartonger tydligt.</li>
                          <li>Håll nycklar tillgängliga.</li>
                          <li>Överbelasta inte flyttlådorna.</li>
                          <li>Använd silkespapper för ömtåliga föremål och porslin.</li>
                        </ul>
                      }
                    />
                  </div>
                </div>

                {/* Under flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Under flytten</h3>
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <TipCard
                        title="Innan flyttfirman kommer"
                        imageSrc="/innanflyttfirmankommer.jpg"
                        imageAlt="Förberedelse för flyttfirma i Åkersberga"
                        objectPosition="object-[center_45%]"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Packa ner allt lösöre i kartonger</li>
                            <li>Montera ner alla gardiner</li>
                            <li>Montera ner alla lampor</li>
                            <li>Dubbelkolla packning och märkning.</li>
                          </ul>
                        }
                      />
                    <TipCard
                        title="En smidig flyttdag"
                        imageSrc="/smidigflyttdag.jpg"
                        imageAlt="Smidig flyttdag med flyttfirma i Åkersberga"
                        objectPosition="object-[center_35%]"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Håll värdesaker tillgängliga.</li>
                            <li>Säkerställ fri väg för flytthjälp.</li>
                            <li>Var tillgänglig för frågor.</li>
                            <li> Gör en slutkontroll av bostaden efter inlastning och efter avlastning i båda bostäderna för att säkerställa att inget glömts kvar.</li>
                          </ul>
                        }
                      />
                  </div>
                </div>

                {/* Efter flytten */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Efter flytten</h3>
                  <div className="max-w-2xl mx-auto">
                    <TipCard
                        title="Start i nya hemmet"
                        imageSrc="/efter_flytt.jpg"
                        imageAlt="Start i nytt hem efter flytt i Åkersberga"
                        objectPosition="object-[10%_center]"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Kontrollera flyttstädningen.</li>
                            <li>Packa upp det viktigaste först.</li>
                            <li>Kontrollera att alla föremål anlänt.</li>
                            <li>Montera upp gardiner och lampor.</li>
                            <li>Uppdatera adress hos myndigheter.</li>
                            <li>Testa alla vitvaror och eluttag.</li>
                            <li>Ta bort tomma kartonger och emballage.</li>
                          </ul>
                        }
                      />
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
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                  Läs mer om flytt i Åkersberga
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Få värdefulla tips och råd för en smidig flytt i Åkersberga
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
                    <img 
                      src="/innanflyttfirmankommer.jpg" 
                      alt="Flyttfirma i Åkersberga" 
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Flytttips
                      </span>
                      <span className="text-gray-500 text-sm ml-4">5 min läsning</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
                      Komplett guide: Så planerar du en smidig flytt i Åkersberga
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      En flytt i Åkersberga kräver noggrann planering. I denna guide går vi igenom allt du behöver veta - från första kontakten med flyttfirman till den sista kartongen i ditt nya hem. Lär dig hur du väljer rätt flyttfirma, förbereder din bostad och säkerställer en stressfri flyttupplevelse.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">FE</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-[#0F172A]">Flyttella Expert</p>
                          <p className="text-sm text-gray-500">Flyttspecialist i Åkersberga</p>
                        </div>
                      </div>
                      <Link 
                        href="/blogg/10-tips-for-en-smidig-flytt-i-stockholm" 
                        className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group"
                      >
                        Läs hela artikeln
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
                    <div className="text-center">
                      <Link 
                        href="/blogg" 
                        className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium group shadow-lg hover:shadow-xl"
                      >
                        Se alla artiklar om flytt i Åkersberga
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
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
                Vanliga frågor om flytt i Åkersberga
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    id: "akersberga-1",
                    question: "Hur mycket kostar en flytt i Åkersberga?",
                    answer: "Våra priser baseras på faktorer som boyta, våning, hiss och parkeringsavstånd. Vi erbjuder både fasta priser och löpande priser. Fyll i vårt formulär för en snabb offert på 1 minut."
                  },
                  {
                    id: "akersberga-2",
                    question: "Vad ingår i en vanlig bohagsflytt i Åkersberga?",
                    answer: "Transport, bärhjälp, lastning och lossning. Vi kan även erbjuda packning, montering och flyttstäd som tillval. Vår lokala expertis i Åkersberga säkerställer en smidig flytt."
                  },
                  {
                    id: "akersberga-3",
                    question: "Erbjuder ni flyttstädning i Åkersberga?",
                    answer: "Ja, vi erbjuder professionell flyttstädning som uppfyller alla krav. Vi har utfört över 7000 städningar och ger 14 dagars nöjd kund garanti på vår städservice i Åkersberga."
                  },
                  {
                    id: "akersberga-4",
                    question: "Kan ni hjälpa till med magasinering i Åkersberga?",
                    answer: "Ja, vi erbjuder säker magasinering av dina tillhörigheter i Åkersberga. Vi har flexibla lösningar för både kort- och långtidsförvaring och ser till att dina saker är trygga tills du behöver dem igen."
                  },
                  {
                    id: "akersberga-5",
                    question: "Hur snabbt kan ni boka in en flytt i Åkersberga?",
                    answer: "Vi är flexibla och kan ofta erbjuda snabba tider för flytt i Åkersberga. Kontakta oss eller fyll i vårt offertformulär så återkommer vi inom 1 minut med lediga tider och prisförslag."
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
                  Har du fler frågor om flytt i Åkersberga?
                </p>
                <Link 
                  href="/faq" 
                  className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                >
                  Se alla vanliga frågor
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