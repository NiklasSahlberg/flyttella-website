"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import StadningOffertForm from "../components/StadningOffertForm";
import FlyttoffertForm from "../components/FlyttoffertForm";

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

export default function FlyttstadAkersbergaPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const toggleFAQ = (id: string) => setOpenFAQ(openFAQ === id ? null : id);

  // Animation variants
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  // Lottie component functions (reuse from original if needed)
  function HappyCustomerLottie() {
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/happycustomer.json").then((res) => res.json()).then(setAnimationData);
    }, []);
    if (!animationData) return null;
    return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
  }
  function CashLottie() {
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/cash.json").then((res) => res.json()).then(setAnimationData);
    }, []);
    if (!animationData) return null;
    return <div className="w-32 h-32 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
  }
  function InsuranceLottie() {
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/insurance.json").then((res) => res.json()).then(setAnimationData);
    }, []);
    if (!animationData) return null;
    return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
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

  // Feature boxes for cleaning
  function FeatureBoxesSection() {
    const features = [
      {
        key: "garanti",
        label: "14 dagars städgaranti",
        icon: <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible"><HappyCustomerLottie /></motion.div>,
      },
      {
        key: "rut-avdrag",
        label: "50% RUT-avdrag",
        icon: <motion.div variants={variants} animate="wiggle" className="h-8 w-8 flex items-center justify-center overflow-visible"><CashLottie /></motion.div>,
      },
      {
        key: "ombokning-avbokning",
        label: "24h kostnadsfri ombokning och avbokning",
        icon: <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center overflow-visible"><InsuranceLottie /></motion.div>,
      },
      {
        key: "forsakring",
        label: "Ansvarsförsäkring",
        icon: <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center overflow-visible"><InsuranceLottie /></motion.div>,
      },
    ];
    return (
      <div className="w-full my-12 mb-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center mb-12 mt-2">
            Fördelar med Flyttella i Åkersberga
          </h2>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-stretch md:items-stretch justify-center w-full gap-0 md:gap-8">
          <div className="w-full md:w-2/5 flex flex-col justify-between items-stretch py-4 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.key}
                className="flex items-center gap-4 bg-white border border-[#10B981] rounded-xl shadow px-8 py-8 w-full transition-transform duration-200"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
                custom={i}
              >
                {feature.icon}
                <span className="font-medium text-[#0F172A] text-left text-lg leading-tight">{feature.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="w-full md:w-2/5 relative">
            <Image
              src="/happy_cleaning_lady_europe.png"
              alt="Städpersonal i arbete"
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
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/ostermalm.avif)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">Professionell flyttstädning & hemstädning i Åkersberga</h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8">Vi erbjuder grundlig flyttstädning, hemstädning och kontorsstädning i Åkersberga – alltid med garanti och RUT-avdrag.</p>
            </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <FlyttoffertForm mode="widget" />
                </div>
            </div>
          </div>
        </div>
      </section>

        {/* Om Flyttella Städ Section */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/cleaning_background.png)', backgroundSize: 'cover', backgroundPosition: 'center 70%', zIndex: 0 }} />          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Om Flyttella</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                {/* Left: Image */}
                <motion.div className="w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0.2 }}>
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                    <Image src="/cleaning_lady.png" alt="Om Flyttella Städ" fill className="object-cover rounded-2xl" style={{ objectPosition: 'center 25%', transform: 'scale(1.10)' }} priority />
                  </div>
                </motion.div>
                {/* Right: Text content */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="space-y-8 max-w-3xl mx-auto lg:mx-0">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                      <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed font-bold">Flyttella är din lokala städfirma i Åkersberga med lång erfarenhet av flyttstädning, hemstädning och kontorsstädning. Vi erbjuder alltid städgaranti, fasta priser och personlig service.</p>
                      <br />
                      <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed font-bold">Vi känner till Åkersbergas olika områden och anpassar våra städtjänster efter just dina behov – från villor och lägenheter till kontor och butiker.</p>
                      <br />
                      <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed font-bold">Vårt mål är att göra din flyttstädning eller hemstädning så enkel och trygg som möjligt. Vi erbjuder fri rådgivning, snabb offert och personlig kontakt genom hela processen.</p>
                      <br />
                      <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed font-bold">Kontakta oss idag för en kostnadsfri offert på städning i Åkersberga – vi ser fram emot att hjälpa dig till ett skinande rent hem eller kontor!</p>
                      <motion.div className="mt-12 text-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0.5 }}>
                        <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer om oss<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Fördelar Section */}
        <section className="relative bg-white pb-8">
          <FeatureBoxesSection />
        </section>

        {/* Reviews Section */}
        {/* You can add a cleaning-specific ReviewsWidget here if available */}

        {/* Vår process & Fördelar Section */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="mx-auto px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-10 mb-24 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  Vår process & Fördelar
                </h2>
                {/* Pricing Info */}
                <div className="text-center mb-8">
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-4">
                    Vi arbetar med fasta priser för att ge dig trygghet och transparens i Åkersberga. 
                    Det går även att komma överens om löpande priser för regelbunden städning.
                  </p>
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-4">
                    Våra offerter är alltid baserade på dina specifika behov och omständigheter i Åkersberga. 
                    Vi tar hänsyn till faktorer som boyta, antal rum, och eventuella tilläggstjänster för att ge dig en offert som passar just din situation. Alla priser är fasta utan dolda avgifter – vi utgår alltid från dina önskemål och information vi får från dig som kund. Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.
                  </p>
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-8">
                    Som en seriös städfirma i Åkersberga har vi alla nödvändiga tillstånd, skattesedel och försäkringar på plats. Du kan vara trygg med att vi följer alla gällande regler och bestämmelser. Vi erbjuder även professionell besiktning av din bostad vid behov.
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
                          title: "Städning utförd",
                          description: "Vi tar hand om allt – från start till slut",
                          containerClass: "-mt-14",
                          textClass: "-mt-8",
                        },
                        {
                          icon: <div className="mt-0"><HappyCustomerLottie /></div>,
                          title: "Nöjd kund",
                          description: "14 dagars städgaranti",
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

        {/* Erfarenhet Section */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '-8rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/our_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>
              <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">Flyttstädningar</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={7000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">Hemstädningar</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={5000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">Företagsstädningar</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={2000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Lokal erfarenhet ger resultat</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    Med tusentals städningar bakom oss har vi byggt upp en unik expertis inom städbranschen i Åkersberga. Vi hjälper både privatpersoner och företag till skinande rena hem och arbetsplatser. Vårt erfarna team arbetar alltid noggrant och effektivt, med miljövänliga produkter och modern utrustning. Vi strävar efter att överträffa dina förväntningar vid varje uppdrag och är stolta över vår höga kundnöjdhet.
                  </p>
                </motion.div>
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
          <div className="absolute bottom-0 left-0 w-full h-48 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)' }} />
        </motion.section>

        {/* Features Section */}
        <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
          <div className="mx-auto px-24">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
              <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                <div className="flex-[2] w-full">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">Våra städtjänster</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                    {[
                      { icon: "🧹", title: "Flyttstädning", description: "Grundlig städning inför flytt – vi lämnar alltid städgaranti.", link: "/flyttstadning" },
                      { icon: "🏠", title: "Hemstädning", description: "Regelbunden eller engångsstädning av ditt hem.", link: "/hemstadning" },
                      { icon: "🏢", title: "Kontorsstädning", description: "Städning av kontor och arbetsplatser – flexibla tider.", link: "/kontorsstadning" },
                      { icon: "🪟", title: "Fönsterputs", description: "Professionell fönsterputsning för hem och företag.", link: "/fonsterputs" },
                      { icon: "🧽", title: "Storstädning", description: "Extra noggrann städning av hela bostaden.", link: "/storstädning" },
                      { icon: "🧴", title: "Sanering", description: "Sanering och specialstädning vid behov.", link: "/sanering" },
                      { icon: "🏡", title: "Visningsstädning", description: "Städning inför visning av bostad för bästa intryck.", link: "/visningsstadning" },
                      { icon: "⚰️", title: "Dödsbostädning", description: "Omsorgsfull städning av dödsbo med respekt och noggrannhet.", link: "/dodsbo-stadning" },
                      { icon: "🚧", title: "Bygg & grovstädning", description: "Städning efter renovering, byggnation eller grovarbete.", link: "/bygg-grovstadning" },
                    ].map((feature, i) => (
                      <motion.div key={feature.icon} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                        <span className="text-2xl md:text-3xl">{feature.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                          <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                          <a href={feature.link} className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center">Läs mer<svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                  <div className="w-full h-full flex items-stretch">
                    <Image src="/cleaning_lady.png" alt="Städpersonal i Åkersberga - Flyttella" width={600} height={200} className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} priority={false} />
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
                <Image src="/awards_no_bg.png" alt="Flyttellas utmärkelser - Städ i Åkersberga" width={1200} height={600} className="object-contain w-full h-auto max-w-3xl" priority />
              </div>
              <div className="w-full md:w-2/5 text-left flex flex-col items-start justify-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">Utmärkelser för vårt städarbete i Åkersberga</h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">Våra utmärkelser är ett bevis på vårt engagemang för kvalitet, service och kundnöjdhet i Åkersberga. Vi är stolta över att vara en rekommenderad städfirma av både kunder och branschorganisationer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Se alla våra tjänster Section */}
        <motion.section className="py-24 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0 * 0.25 }} id="upptack-tjanster">Upptäck Alla Våra tjänster i Åkersberga</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                Vi erbjuder ett komplett utbud av städtjänster i Åkersberga för hem, företag och inför flytt. Alltid med garanti och personlig service.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra privattjänster<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/foretag" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra företagstjänster<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Tips för din städning Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Tips för din flyttstädning</h2>
              <div className="space-y-16">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Innan städningen</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TipCard title="Rensa ut" imageSrc="/tipsforflytt.jpg" imageAlt="Rensa ut inför städning i Åkersberga" content={<ul className="list-disc pl-5 space-y-2"><li>Ta bort alla personliga tillhörigheter.</li><li>Töm kyl, frys och skåp.</li><li>Plocka undan gardiner och persienner.</li><li>Se till att alla ytor är fria inför städningen.</li></ul>} />
                    <TipCard title="Planera städdagen" imageSrc="/viktigaavtalcustomer.png" imageAlt="Planera städdag i Åkersberga" content={<ul className="list-disc pl-5 space-y-2"><li>Boka städfirma i god tid.</li><li>Informera hyresvärd eller köpare om städdatum.</li><li>Se till att el och vatten finns tillgängligt.</li></ul>} />
                    <TipCard title="Extra tjänster" imageSrc="/packing_tips.jpg" imageAlt="Extra städtjänster i Åkersberga" content={<ul className="list-disc pl-5 space-y-2"><li>Beställ fönsterputs om det behövs.</li><li>Be om offert på sanering eller storstädning vid behov.</li></ul>} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Under städningen</h3>
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <TipCard title="Kontrollera resultatet" imageSrc="/innanflyttfirmankommer.jpg" imageAlt="Kontrollera städning i Åkersberga" objectPosition="object-[center_45%]" content={<ul className="list-disc pl-5 space-y-2"><li>Gå igenom checklistan med städfirman.</li><li>Kontrollera att alla ytor är rena.</li><li>Testa vitvaror och avlopp.</li></ul>} />
                    <TipCard title="Kommunicera med städteamet" imageSrc="/smidigflyttdag.jpg" imageAlt="Kommunikation med städteam i Åkersberga" objectPosition="object-[center_35%]" content={<ul className="list-disc pl-5 space-y-2"><li>Var tillgänglig för frågor.</li><li>Ge tillgång till alla utrymmen.</li></ul>} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Efter städningen</h3>
                  <div className="max-w-2xl mx-auto">
                    <TipCard title="Slutbesiktning" imageSrc="/efter_flytt.jpg" imageAlt="Slutbesiktning efter städning i Åkersberga" objectPosition="object-[10%_center]" content={<ul className="list-disc pl-5 space-y-2"><li>Gör en gemensam besiktning med städfirman.</li><li>Kontrollera att städgarantin gäller.</li><li>Återkoppla om du är nöjd eller har synpunkter.</li></ul>} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Vanliga frågor om flyttstädning i Åkersberga</h2>
              <div className="space-y-4">
                {[
                  { id: "akersberga-1", question: "Hur mycket kostar en flyttstädning i Åkersberga?", answer: "Priset beror på bostadens storlek och skick. Vi erbjuder alltid fasta priser och RUT-avdrag. Fyll i vårt formulär för en snabb offert." },
                  { id: "akersberga-2", question: "Vad ingår i en flyttstädning?", answer: "Allt från dammsugning och våttorkning till fönsterputs, kök, badrum och förråd. Vi följer Mäklarsamfundets rekommendationer." },
                  { id: "akersberga-3", question: "Har ni städgaranti?", answer: "Ja, vi lämnar alltid 14 dagars städgaranti på alla flyttstädningar." },
                  { id: "akersberga-4", question: "Kan ni hjälpa till med hemstädning och kontorsstädning?", answer: "Ja, vi erbjuder både regelbunden hemstädning och flexibla lösningar för företag och kontor." },
                  { id: "akersberga-5", question: "Hur snabbt kan ni boka in en städning?", answer: "Vi är flexibla och kan ofta erbjuda snabba tider. Kontakta oss eller fyll i offertformuläret så återkommer vi med lediga tider och pris." },
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
                <p className="text-lg text-gray-600 mb-6">Har du fler frågor om städning i Åkersberga?</p>
                <Link href="/faq" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla vanliga frågor<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
        </div>
        </section>

        {/* Link to Flyttfirma i Åkersberga Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Behöver du flytthjälp i Åkersberga?</h2>
            <div className="flex flex-col items-center max-w-3xl mx-auto">
              {/* Centered Text and Button */}
              <div className="w-full flex flex-col items-center justify-center text-center mb-10">
                <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6">
                  Vi erbjuder även professionell flytthjälp i Åkersberga! Oavsett om du ska flytta inom staden eller till/från Åkersberga kan vårt erfarna team hjälpa dig med allt från packning till transport och magasinering. Läs mer om våra flyttjänster och boka en kostnadsfri offert.
                </p>
                <a href="/flyttfirma-i-akersberga" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium text-lg group">
                  Till flyttfirma i Åkersberga
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 