'use client';

import Image from "next/image";
import Link from "next/link";
import ReviewsWidget from "./components/ReviewsWidget";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import FlyttoffertForm from './components/FlyttoffertForm';
import React, { useEffect, useState } from "react";
import { Variants } from "framer-motion";
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

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const variants: Variants = {
  initial: { scale: 0.98, opacity: 0, y: 5 },
  animate: (i: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 30,
      damping: 15
    },
  }),
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    },
  },
  pulse: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
  bounce: {
    y: [0, -6, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
  wiggle: {
    rotate: [-2, 2, -2],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function Home() {
  const locations = [
    { name: "Stockholm och Göteborg", slug: "stockholm-och-goteborg" },
    { name: "Stockholm och Malmö", slug: "stockholm-och-malmo" },
    { name: "Stockholm och Oslo", slug: "stockholm-och-oslo" },
    { name: "Stockholm och Köpenhamn", slug: "stockholm-och-kopenhamn" },
    { name: "Norrmalm", slug: "norrmalm" },
    { name: "Kungsholmen", slug: "kungsholmen" },
    { name: "Östermalm", slug: "ostermalm" },
    { name: "Vasastan", slug: "vasastan" },
    { name: "Bro", slug: "bro" },
    { name: "Täby", slug: "taby" },
    { name: "Kungsängen", slug: "kungsangen" },
    { name: "Haninge", slug: "haninge" },
    { name: "Danderyd", slug: "danderyd" },
    { name: "Kista", slug: "kista" },
    { name: "Sollentuna", slug: "sollentuna" },
    { name: "Upplands Väsby", slug: "upplands-vasby" },
    { name: "Vallentuna", slug: "vallentuna" },
    { name: "Åkersberga", slug: "akersberga" },
    { name: "Tyresö", slug: "tyreso" },
    { name: "Järfälla", slug: "jarfalla" },
    { name: "Huddinge", slug: "huddinge" },
    { name: "Västerhaninge", slug: "vasterhaninge" },
    { name: "Farsta", slug: "farsta" },
    { name: "Skärholmen", slug: "skarholmen" },
    { name: "Enskede", slug: "enskede" },
    { name: "Hägersten", slug: "hagersten" },
    { name: "Bromma", slug: "bromma" },
    { name: "Spånga", slug: "spanga" },
    { name: "Sundbyberg", slug: "sundbyberg" },
    { name: "Solna", slug: "solna" },
    { name: "Lidingö", slug: "lidingo" },
    { name: "Nacka", slug: "nacka" },
    { name: "Värmdö", slug: "varmdo" },
    { name: "Ekerö", slug: "ekero" },
    { name: "Botkyrka", slug: "botkyrka" },
    { name: "Salem", slug: "salem" },
    { name: "Tumba", slug: "tumba" },
    { name: "Märsta", slug: "marsta" },
    { name: "Södertälje", slug: "sodertalje" },
    { name: "Nynäshamn", slug: "nynashamn" }
  ].map((location, index) => (
    <motion.a
      key={index}
      href={`/flyttfirma-i-${location.slug}`}
      className="group"
      variants={fadeInUp}
      whileHover={{ scale: 1.05, x: 5 }}
    >
      <h3 className="text-[#0F172A] group-hover:text-[#10B981] transition-colors font-medium">
        Flyttfirma i {location.name}
      </h3>
    </motion.a>
  ));

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

  return (
    <main className="min-h-screen">
      {/* Hero Section with integrated FlyttoffertForm */}
      <div className="relative py-20 bg-white text-[#0F172A] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
              <div className="max-w-xl w-full">
                <h1 className="text-5xl md:text-6xl font-bold mb-8">
                  Trygghet utan överraskningar
                </h1>
                <p className="text-2xl md:text-3xl mb-12">
                  Vi förstår att din flytt är viktig. Därför erbjuder vi trygg flyttservice med fast pris - inga dolda kostnader. Med oss kan du vara lugn, både för dina ägodelar och din plånbok.
                </p>
              </div>
              <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                <FlyttoffertForm mode="widget" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature/benefit boxes section */}
      <FeatureBoxesSection />

      {/* Reviews Widget Section */}
      <ReviewsWidget />

      {/* Process and Features Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12 mb-12 max-w-screen-2xl mx-auto w-full">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Vår Process & Fördelar
              </h2>

              {/* Pricing Info */}
              <div className="text-center mb-12">
                <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-8">
                  Vi arbetar med fasta priser för att ge dig trygghet och transparens. 
                  Det går även att komma överens om löpande priser.
                </p>
                <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-8">
                  Våra offerter är alltid baserade på dina specifika behov och omständigheter. 
                  Vi tar hänsyn till faktorer som boyta, våning, hiss och parkeringsavstånd för att ge dig en offert som passar just din situation. 
                  Alla priser är fasta utan dolda avgifter - det du ser är det du betalar. 
                  Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.
                </p>
                <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-12">
                  Som en seriös flyttfirma har vi alla nödvändiga tillstånd, skattesedel och försäkringar på plats. 
                  Du kan vara trygg med att vi följer alla gällande regler och bestämmelser. Vi kan även besikta din bostad vid behov.
                </p>
              </div>

              {/* Process Flow Section */}
              <div className="mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Så fungerar det</h3>
                <div className="relative w-full">
                  {/* Timeline connector line */}
                  <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
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
                        icon: <div className="ml-3 mt-7"><PhoneCallLottie /></div>,
                        title: "Personlig kontakt",
                        description: "Vi ringer samma dag eller dagen efter",
                        containerClass: "-mt-7",
                        textClass: ""
                      },
                      {
                        icon: <div className="ml-6 mt-6"><SignFormLottie /></div>,
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
                        icon: <div className="-mt-10"><HappyCustomerLottie /></div>,
                        title: "Nöjd kund",
                        description: "14 dagars nöjd kund garanti",
                        containerClass: "-mt-6",
                        textClass: ""
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 h-full"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        custom={index}
                      >
                        {/* Timeline dot */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#10B981] rounded-full hidden md:block"></div>
                        <div className={`${step.containerClass || ''} w-full flex flex-col items-center justify-center`}>
                          <div className="mb-4">{step.icon}</div>
                          <div className={`flex flex-col items-center justify-center w-full ${step.textClass || ''}`}>
                            <h4 className="text-white font-semibold text-lg md:text-2xl mb-1 text-center w-full">{step.title}</h4>
                            <p className="text-white/80 text-base md:text-lg text-center w-full">{step.description}</p>
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

        {/* Blank Section for spacing or future content (full width) */}
        <section className="py-40 relative overflow-hidden" style={{width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw'}}>
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/backgroundpicture.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Semi-transparent overlay for content readability */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-sm"></div>
          
          <motion.div 
            className="max-w-7xl mx-auto relative z-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-16 -mt-8 text-center">Vår erfarenhet</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Flyttar */}
              <motion.div 
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
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
                    className="text-2xl font-bold mb-2 text-white"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ 
                      duration: 0.8,
                      delay: 0 * 0.25
                    }}
                  >
                    Flyttar
                  </motion.h2>
                  <motion.div 
                    className="text-5xl md:text-6xl font-bold mb-2 text-white"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
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
                    variants={fadeInUp}
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
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
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
                    className="text-2xl font-bold mb-2 text-white"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ 
                      duration: 0.8,
                      delay: 1 * 0.25
                    }}
                  >
                    Städningar
                  </motion.h2>
                  <motion.div 
                    className="text-5xl md:text-6xl font-bold mb-2 text-white"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
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
                    variants={fadeInUp}
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
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
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
                    className="text-2xl font-bold mb-2 text-white"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ 
                      duration: 0.8,
                      delay: 2 * 0.25
                    }}
                  >
                    Månadsvis
                  </motion.h2>
                  <motion.div 
                    className="text-5xl md:text-6xl font-bold mb-2 text-white"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
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
                    variants={fadeInUp}
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
            <div className="mt-12 flex flex-col items-center justify-center gap-6">
              {/* Experience description text - left side */}
              <motion.div 
                className="flex-1 max-w-4xl text-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                  Erfarenhet som ger resultat
                </h4>
                <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6">
                  Med över 8000 flyttar och 7000 städningar bakom oss har vi byggt upp en unik expertis inom flytt- och städningsbranschen. 
                  Vår erfarenhet sträcker sig över hela landet och vi har hjälpt tusentals familjer och företag med deras flyttar.
                </p>
                <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-8">
                  Våra prestationer har gett oss erkännande som en av Sveriges bästa flyttfirmor, med över 1000 positiva recensioner och 
                  rekommendationer från nöjda kunder. Vi är stolta över att kunna erbjuda professionell service baserad på år av praktisk erfarenhet.
                </p>
              </motion.div>

              {/* Recommended Company and 1000 Reviews badges under text */}
              <div className="flex items-center justify-center gap-8">
                <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                  <Image
                    src="/recommendedcompany2.png"
                    alt="Recommended Company"
                    width={300}
                    height={300}
                    className="object-contain h-72 w-72"
                    priority={false}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 mt-8">
                  <Image
                    src="/1000reviewspicture.png"
                    alt="1000 Reviews"
                    width={320}
                    height={320}
                    className="object-contain h-80 w-80"
                    priority={false}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                  <Image
                    src="/top10.png"
                    alt="Top 10"
                    width={260}
                    height={260}
                    className="object-contain h-64 w-64"
                    priority={false}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <div className="pt-28">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Våra fördelar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    title: "Fritt lån av kartonger i 4 veckor",
                    description: "Specialgjorda flyttkartonger med vår logga",
                    link: "/kartonger"
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
                    className="flex items-start gap-5 bg-white/10 backdrop-blur-sm rounded-xl p-7 min-h-[170px] w-full max-w-none h-full min-w-0"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={variants}
                    custom={i}
                  >
                    <motion.span
                      className="text-3xl md:text-4xl"
                      initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }}
                      animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [ -180, 20, 0 ], color: ['#10B981', '#34D399', '#10B981'] }}
                      transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}
                    >
                      {feature.icon}
                    </motion.span>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg md:text-xl mb-2">{feature.title}</h4>
                      <p className="text-white/80 text-base md:text-lg mb-3">{feature.description}</p>
                      <a 
                        href={feature.link}
                        target={feature.link.startsWith('http') ? '_blank' : undefined}
                        rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white/90 hover:text-white transition-colors text-base md:text-lg inline-flex items-center"
                      >
                        Läs mer
                        <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-3/5 flex justify-center">
              <Image
                src="/awards_no_bg.png"
                alt="Flyttella's utmärkelser och priser"
                width={1200}
                height={600}
                className="object-contain w-full h-auto max-w-3xl"
                priority
              />
            </div>
            <div className="w-full md:w-2/5 text-left flex flex-col items-start justify-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">Flyttellas Utmärkelser</h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Våra utmärkelser är ett bevis på vårt engagemang för kvalitet, service och kundnöjdhet.<br />
                Genom åren har vi blivit erkända av både branschorganisationer och våra kunder för vårt pålitliga arbete och höga standard.<br />
                Dessa utmärkelser inspirerar oss att fortsätta leverera flyttjänster i toppklass – varje dag, till varje kund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <section className="section-padding bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            VÅRA TJÄNSTER
          </motion.h2>
          
          <motion.div 
            className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {[
              { 
                icon: "🏠", 
                title: "Bohagsflytt", 
                description: "Vi erbjuder professionell flytthjälp för privatpersoner. Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg.",
                buttonText: "Läs mer",
                href: "/bohagsflytt"
              },
              { 
                icon: "✨", 
                title: "Flyttstädning", 
                description: "Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick.",
                buttonText: "Läs mer",
                href: "/flyttstadning"
              },
              { 
                icon: "🏢", 
                title: "Kontorsflytt", 
                description: "Effektiv flytt av kontor och företag. Vi minimerar avbrott i verksamheten och säkerställer en smidig övergång.",
                buttonText: "Läs mer",
                href: "/kontorsflytt"
              },
              { 
                icon: "🧹", 
                title: "Kontorsstädning", 
                description: "Professionell kontorsstädning för företag och kontor. Vi erbjuder regelbunden städning som håller ditt kontor rent och professionellt.",
                buttonText: "Läs mer",
                href: "/kontorsstadning"
              },
              { 
                icon: "🎹", 
                title: "Piano/Tunglyft", 
                description: "Specialiserad service för flytt av piano och andra tunga föremål. Vi har erfarenhet och rätt utrustning för säker hantering.",
                buttonText: "Läs mer",
                href: "/piano-tunglyft"
              },
              { 
                icon: "🗑️", 
                title: "Bortforsling", 
                description: "Professionell bortforsling av möbler, inredning och andra föremål. Vi tar hand om allt från små till stora mängder.",
                buttonText: "Läs mer",
                href: "/bortforsling"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <span className="text-4xl">{service.icon}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-lg text-gray-100 mb-6 relative">
                  {service.description}
                </p>

                <div className="mt-auto relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link 
                      href={service.href} 
                      className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
                    >
                      {service.buttonText}
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
            ))}
          </motion.div>
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
                variants={fadeInUp}
                transition={{ 
                  duration: 0.8,
                  delay: 0 * 0.25
                }}
                id="upptack-tjanster"
              >
                  Upptäck Alla Våra Tjänster
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
                  Vi erbjuder ett komplett utbud av flyttjänster för att göra din flytt så smidig som möjligt. 
                  Från bohagsflytt och flyttstädning till specialtjänster som piano- och kontorsflytt.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/tjanster" 
                  className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
                >
                  Se alla våra tjänster
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
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8">Innan flytten</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TipCard
                      title="Planera och förbered"
                      imageSrc="/tipsforflytt.jpg"
                      imageAlt="Planering"
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
                      imageAlt="Avtal"
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
                      imageAlt="Packning"
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
                        imageAlt="Förberedelse för flytt"
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
                        imageSrc="/under_flytt.jpg"
                        imageAlt="Flyttdag"
                        content={
                          <ul className="list-disc pl-5 space-y-2">
  
                            <li>Håll värdesaker tillgängliga.</li>
                            <li>Säkerställ fri väg för flytthjälp.</li>
                            <li>Var tillgänglig för frågor.</li>
                            <li>Gör en slutkontroll av bostaden.</li>
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
                        imageAlt="Nytt hem"
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

        {/* Locations Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ 
              duration: 0.8,
              delay: 0 * 0.25
            }}
          >
              HÄR FINNS VI
          </motion.h2>
          <motion.div 
            className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {locations}
          </motion.div>
          </div>
        </section>
    </main>
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
      <h4 className="text-xl font-bold text-[#0F172A] mb-3">{title}</h4>
      <div className="text-gray-600 text-base leading-relaxed">{content}</div>
    </div>
  </div>
);

// Inline FeatureBoxesSection component
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
          Vilka förmåner får du med Flyttella?
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
                <span className="font-medium text-[#0F172A] text-left text-base leading-tight">
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
