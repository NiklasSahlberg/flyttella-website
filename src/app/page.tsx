'use client';

import Image from "next/image";
import Link from "next/link";
import ReviewsWidget from "./components/ReviewsWidget";
import { motion } from "framer-motion";
import CountUp from "react-countup";

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

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
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
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            transition: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          style={{ backgroundSize: '200% 200%' }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0
              }}
              animate={{ 
                y: ['-20%', '120%'],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Professionell flyttfirma i Stockholm
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Vi erbjuder komplett flyttservice med bohagsflytt, flyttstädning och packning. 
                Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg.
              </motion.p>
            </motion.div>

            <motion.div 
              className="mt-12 text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {[
                  "Fast-pris",
                  "Nöjd kund garanti",
                  "Pack garanti",
                  "50% RUT-avdrag",
                  "Försäkring & Trafiktillstånd",
                  "Professionell service"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg cursor-pointer"
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.15)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className="font-semibold text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p 
                className="text-xl font-semibold mb-8 text-white/90"
                variants={fadeInUp}
              >
                Låt oss ta hand om hela din flytt medan du fokuserar på ditt nya hem!
              </motion.p>
              <motion.div 
                className="flex gap-4 justify-center"
                variants={fadeInUp}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/fa-offert" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                  Få offert
                </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/kontakt" className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium">
                  Kontakta oss
                </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Widget Section */}
      <ReviewsWidget />

      {/* RUT-avdrag Section */}
      <section className="section-padding bg-gradient-to-r from-[#0F172A] to-[#10B981] relative overflow-hidden">
        {/* Animated background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Självklart arbetar vi med RUT-avdrag
            </motion.h2>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white mb-8"
              variants={fadeInUp}
            >
              <p className="text-lg mb-6">
                Vi hanterar allt åt dig.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">50% av arbetskostnaden</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center justify-center"
              variants={fadeInUp}
            >
              <a 
                href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
              >
                Läs mer på Skatteverket →
              </a>
            </motion.div>
          </motion.div>
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
          <motion.div 
            className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-3xl p-12 text-center text-white shadow-xl"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-2xl font-bold mb-2"
              variants={fadeInUp}
            >
              Vår erfarenhet
            </motion.h2>
            <motion.div 
              className="text-5xl md:text-6xl font-bold mb-2"
              variants={fadeInUp}
            >
              <CountUp 
                end={3000} 
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
        </div>
      </motion.section>

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
                icon: "🔧", 
                title: "Montering", 
                description: "Professionell montering och demontering av möbler och inredning. Vi säkerställer att allt monteras korrekt och säkert.",
                buttonText: "Läs mer",
                href: "/montering"
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
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-100 mb-6 relative">
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
            {[
              { name: "Norrmalm", slug: "norrmalm" },
              { name: "Kungsholmen", slug: "kungsholmen" },
              { name: "Östermalm", slug: "ostermalm" },
              { name: "Vasastan", slug: "vasastan" },
              { name: "Bro", slug: "bro" },
              { name: "Täby", slug: "taby" }
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
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
