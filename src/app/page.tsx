'use client';

import Image from "next/image";
import Link from "next/link";
import ReviewsWidget from "./components/ReviewsWidget";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import FlyttoffertForm from './components/FlyttoffertForm';
import React from "react";
import { Variants } from "framer-motion";

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
  initial: { scale: 0.8, opacity: 0, y: 20 },
  animate: (i: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
    },
  }),
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
  wiggle: {
    rotate: [-5, 5, -5],
    transition: {
      duration: 0.5,
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

  return (
    <main className="min-h-screen">
      {/* Hero Section with integrated FlyttoffertForm */}
      <div className="relative py-20 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trygghet utan överraskningar
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Vi förstår att din flytt är viktig. Därför erbjuder vi trygg flyttservice med fast pris – inga dolda kostnader. Med oss kan du vara lugn, både för dina ägodelar och din plånbok.
            </p>
            <div className="flex gap-4">
              <Link
                href="/services"
                className="bg-white text-[#0F172A] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition"
              >
                Få offert
              </Link>
              <a
                href="/kontakt"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[#0F172A] transition"
              >
                Kontakta oss
              </a>
            </div>
          </div>
          <div className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
            <FlyttoffertForm mode="widget" />
          </div>
        </div>
      </div>

      {/* Feature/benefit boxes section */}
      <FeatureBoxesSection />

      {/* Reviews Widget Section */}
      <ReviewsWidget />

      {/* Process and Features Section */}
      <section className="section-padding bg-gradient-to-r from-[#0F172A] to-[#10B981] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Vår Process & Fördelar
            </h2>

            {/* Pricing Info */}
            <div className="text-center mb-12">
              <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-6">
                Vi arbetar med fasta priser för att ge dig trygghet och transparens. 
                Det går även att komma överens om löpande priser.
              </p>
              <p className="text-white text-base md:text-lg max-w-3xl mx-auto mb-6">
                Våra offerter är alltid baserade på dina specifika behov och omständigheter. 
                Vi tar hänsyn till faktorer som boyta, våning, hiss och parkeringsavstånd för att ge dig en offert som passar just din situation. 
                Alla priser är fasta utan dolda avgifter - det du ser är det du betalar. 
                Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.
              </p>
              <p className="text-white text-base md:text-lg max-w-3xl mx-auto">
                Som en seriös flyttfirma har vi alla nödvändiga tillstånd, skattesedel och försäkringar på plats. 
                Du kan vara trygg med att vi följer alla gällande regler och bestämmelser.
              </p>
            </div>

            {/* Process Flow Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Så fungerar det</h3>
              <div className="relative">
                {/* Timeline connector line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  {[
                    {
                      icon: "📝",
                      title: "Fyll i formuläret",
                      description: "Berätta om din flytt"
                    },
                    {
                      icon: "⚡",
                      title: "Snabb offert",
                      description: "Få pris på 1 minut"
                    },
                    {
                      icon: "📞",
                      title: "Personlig kontakt",
                      description: "Vi ringer samma dag eller dagen efter"
                    },
                    {
                      icon: "✍️",
                      title: "Signera & bekräfta",
                      description: "Få bokningsbekräftelse direkt"
                    },
                    {
                      icon: "🚚",
                      title: "Flytt genomförd",
                      description: "Vi tar hand om allt"
                    },
                    {
                      icon: "😊",
                      title: "Nöjd kund",
                      description: "14 dagars nöjd kund garanti"
                    }
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#10B981] rounded-full hidden md:block"></div>
                      
                      <span className="text-2xl mb-2">{step.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold text-sm md:text-base">{step.title}</h4>
                        <p className="text-white/80 text-xs md:text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Våra fördelar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    title: "Kvalitetskartonger",
                    description: "Specialgjorda flyttkartonger med vår logga",
                    link: "/kartonger"
                  },
                  {
                    icon: "⏰",
                    title: "Kostnadsfri avbokning",
                    description: "Avboka kostnadsfritt upp till 24 timmar innan flytten",
                    link: "/avbokning"
                  },
                  {
                    icon: "✅",
                    title: "Nöjd kund garanti",
                    description: "14 dagars garanti på allt vi gör",
                    link: "/garanti"
                  },
                  {
                    icon: "🔒",
                    title: "Full tillstånd",
                    description: "Alla nödvändiga tillstånd och skattesedel",
                    link: "/tillstand"
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{feature.title}</h4>
                      <p className="text-white/80 mb-2">{feature.description}</p>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Assignments Counter */}
      <motion.section 
        className="py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12">Vår erfarenhet</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-3xl p-12 text-center text-white shadow-xl"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-2xl font-bold mb-2"
                variants={fadeInUp}
              >
                Flyttar
              </motion.h2>
              <motion.div 
                className="text-5xl md:text-6xl font-bold mb-2"
                variants={fadeInUp}
              >
                <CountUp 
                  end={5000} 
                  duration={2.5}
                  suffix="+"
                  useEasing={true}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </motion.div>
              <motion.p 
                className="text-white/90"
                variants={fadeInUp}
              >
                uppdrag utförda
              </motion.p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-3xl p-12 text-center text-white shadow-xl"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-2xl font-bold mb-2"
                variants={fadeInUp}
              >
                Städningar
              </motion.h2>
              <motion.div 
                className="text-5xl md:text-6xl font-bold mb-2"
                variants={fadeInUp}
              >
                <CountUp 
                  end={4500} 
                  duration={2.5}
                  suffix="+"
                  useEasing={true}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </motion.div>
              <motion.p 
                className="text-white/90"
                variants={fadeInUp}
              >
                uppdrag utförda
              </motion.p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-3xl p-12 text-center text-white shadow-xl"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-2xl font-bold mb-2"
                variants={fadeInUp}
              >
                Månadsvis
              </motion.h2>
              <motion.div 
                className="text-5xl md:text-6xl font-bold mb-2"
                variants={fadeInUp}
              >
                <CountUp 
                  end={300} 
                  duration={2.5}
                  suffix="+"
                  useEasing={true}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </motion.div>
              <motion.p 
                className="text-white/90"
                variants={fadeInUp}
              >
                uppdrag per månad
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
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
                description: "Vi erbjuder professionell flytthjälp för både privatpersoner och företag. Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg.",
                buttonText: "Boka bohagsflytt",
                href: "/fa-offert"
              },
              { 
                icon: "✨", 
                title: "Flyttstädning", 
                description: "Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick.",
                buttonText: "Boka flyttstädning",
                href: "/fa-offert"
              },
              { 
                icon: "💪", 
                title: "Bärhjälp", 
                description: "Professionell bärhjälp för alla typer av flytt. Vi tar hand om tunga lyft och säkerställer att allt transporteras säkert.",
                buttonText: "Läs mer",
                href: "/barhjalp"
              },
              { 
                icon: "🎹", 
                title: "Piano/Tunglyft", 
                description: "Specialiserad service för flytt av piano och andra tunga föremål. Vi har erfarenhet och rätt utrustning för säker hantering.",
                buttonText: "Läs mer",
                href: "/piano-tunglyft"
              },
              { 
                icon: "🏢", 
                title: "Kontorsflytt", 
                description: "Effektiv flytt av kontor och företag. Vi minimerar avbrott i verksamheten och säkerställer en smidig övergång.",
                buttonText: "Läs mer",
                href: "/kontorsflytt"
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
              variants={fadeInUp}
            >
                Upptäck Alla Våra Tjänster
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-[#0F172A]/90"
              variants={fadeInUp}
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

      {/* Locations Section */}
        <section className="section-padding bg-gradient-to-r from-[#0F172A]/5 to-[#10B981]/5">
          <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
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
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2"/></svg>
      ),
    },
    {
      key: "kundgaranti",
      label: "14 dagars nöjd kund garanti",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
      ),
    },
    {
      key: "insurance",
      label: "",
      animated: true,
    },
    {
      key: "rut-avdrag",
      label: "50% RUT-avdrag",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      ),
    },
    {
      key: "fri-avbokning",
      label: "24h fri kostnadsfri avbokning",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      ),
    },
    {
      key: "kartonger",
      label: "Fri lån av kartonger i 4 veckor",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
      ),
    },
  ];

  // Animated icons for each feature
  const animatedIcons = [
    // Pack-garanti: Box icon with bounce
    (i: number) => (
      <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2"/></svg>
      </motion.div>
    ),
    // 14 dagars nöjd kund garanti: Checkmark with pulse
    (i: number) => (
      <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
      </motion.div>
    ),
    // Försäkring: Static insurance logos
    (i: number) => (
      <motion.div
        className="h-10 w-full flex items-center justify-center"
      >
        {insuranceLogos}
      </motion.div>
    ),
    // 50% RUT-avdrag: Percent icon with wiggle
    (i: number) => (
      <motion.div variants={variants} animate="wiggle" className="h-8 w-8 flex items-center justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><line x1="7" y1="17" x2="17" y2="7"/></svg>
      </motion.div>
    ),
    // 24h fri kostnadsfri avbokning: Clock icon with pulse
    (i: number) => (
      <motion.div variants={variants} animate="pulse" className="h-8 w-8 flex items-center justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      </motion.div>
    ),
    // Fri lån av kartonger: Box-stack icon with bounce
    (i: number) => (
      <motion.div variants={variants} animate="bounce" className="h-8 w-8 flex items-center justify-center">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
      </motion.div>
    ),
  ];

  return (
    <div className="w-full flex justify-center my-12">
      <div className="flex flex-col md:flex-row items-center md:items-stretch max-w-4xl w-full gap-0 md:gap-8">
        {/* Left: Animated boxes with icons and labels */}
        <div className="w-full md:w-1/2 flex flex-col justify-between items-center md:items-start py-4 md:h-[600px] gap-4">
          {features.map((feature, i: number) => (
            <motion.div
              key={feature.key}
              className="flex items-center gap-4 bg-white border border-[#10B981] rounded-xl shadow px-5 py-4 w-full max-w-xs min-h-[56px] transition-transform duration-200"
              initial="initial"
              animate="animate"
              custom={i}
              variants={variants}
            >
              {animatedIcons[i](i)}
              <span className="font-medium text-[#0F172A] text-left text-base leading-tight">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image
            src="/movingpicture1.png"
            alt="Flyttfirma i arbete"
            width={420}
            height={600}
            className="rounded-2xl shadow object-cover max-h-[600px] w-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}