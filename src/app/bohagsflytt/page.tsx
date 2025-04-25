'use client';

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

const features = [
  {
    title: 'Packning & Uppackning',
    description: 'Vi packar dina ägodelar säkert och professionellt med rätt material och teknik.',
    icon: '📦'
  },
  {
    title: 'Säker Transport',
    description: 'Moderna flyttbilar och erfarna flyttare säkerställer en trygg transport av dina tillhörigheter.',
    icon: '🚛'
  },
  {
    title: 'Flyttmaterial',
    description: 'Vi tillhandahåller allt flyttmaterial som behövs för en säker flytt.',
    icon: '🛡️'
  },
  {
    title: 'Demontering & Montering',
    description: 'Vi hjälper dig att demontera och montera möbler vid behov.',
    icon: '🔧'
  }
]

export default function Bohagsflytt() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-24 overflow-hidden">
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bohagsflytt
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
            Låt oss ta hand om hela din flytt. Med vår professionella bohagsflytt får du en 
            bekymmersfri flyttupplevelse från start till mål.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Top banner with gradient */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] p-8 relative overflow-hidden">
              {/* Animated dots background */}
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
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10"
                variants={fadeInUp}
              >
                Privatflytt till konkurrenskraftiga priser!
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-white/90 relative z-10">
                Vi tar hand om din flytt!
              </motion.p>
            </div>

            <div className="p-8 md:p-12 space-y-8">
              {/* Main content with icons */}
              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">🏠</div>
                <div>
                  <p className="text-lg text-gray-700">
                    Ska ni flytta från ett boende till ett annat? Låt oss på Flyttella ta hand om din flytt, 
                    vi utför stora och små bohagsflyttar varje dag! Det är vårt stolta yrke att säkert och 
                    effektivt flytta saker från ett ställe till ett annat till konkurrenskraftiga priser.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">💪</div>
                <div>
                  <p className="text-lg text-gray-700">
                    Vi vet att en bohagsflytt kan kännas krångligt och jobbigt men att hjälpa dig att 
                    flytta är vår kompetens område.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">✨</div>
                <div>
                  <p className="text-lg text-gray-700">
                    Om du är ute efter en kvalitets flytthjälp till rimliga priser då har du kommit rätt! 
                    Efter många år i branschen kan vi lova dig pålitlig service till ett lågt pris. Att 
                    flytta ska nämligen vara enkelt, och vi ser till att det blir det.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">🏡</div>
                <div>
                  <p className="text-lg text-gray-700">
                    Spelar ingen roll om det handlar om en lägenhet, sommarstuga eller en hel villa! Vi 
                    hjälper dig med hela processen! Från ner montering, ner packning, emballering, 
                    transportering, upp packning till möbel placering.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">🎯</div>
                <div>
                  <p className="text-lg text-gray-700">
                    Berätta för oss vad du behöver hjälp med, så hittar vi en smart lösning anpassad 
                    efter just dina önskemål.
          </p>
        </div>
              </motion.div>

              {/* Call to action */}
              <motion.div 
                variants={fadeInUp} 
                className="mt-8 p-6 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl text-white text-center"
              >
                <p className="text-xl font-semibold">
                  Du är välkommen att kontakta oss för en kostnadsfri och skräddarsydd offert just efter dina behov!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.title} 
              className="group relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl shadow-lg p-8 text-white flex flex-col transform-gpu overflow-hidden"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
            >
              {/* Background pattern */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                initial={{ backgroundPosition: '0% 0%' }}
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
              
              <motion.div 
                className="relative z-10"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-100">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-2xl shadow-xl p-8 md:p-12 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
          
          <div className="relative z-10">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-white mb-8"
              variants={fadeInUp}
            >
              Varför välja oss för din bohagsflytt?
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                "Erfarenhet med alla typer av flyttar",
                "Fullständig försäkring av dina ägodelar",
                "Professionell och pålitlig personal",
                "Flexibla tider som passar dig",
                "Konkurrenskraftiga priser",
                "Säker och effektiv transport",
                "Skräddarsydda lösningar",
                "Kvalitetsgaranti på all service",
                "Fast pris-garanti",
                "RUT-avdrag på flytten"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <svg className="w-6 h-6 text-white mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90 text-lg">{item}</span>
                </motion.div>
              ))}
            </motion.div>
        </div>
        </motion.div>

        {/* Process Section */}
        <motion.div 
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-[#0F172A] mb-8"
            variants={fadeInUp}
          >
            Vår Process
          </motion.h2>
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: 1,
                title: "Kostnadsfri offert",
                description: "Kontakta oss för en kostnadsfri offert. Vi går igenom dina önskemål och ger dig ett fast pris för flytten."
              },
              {
                step: 2,
                title: "Planering",
                description: "Vi planerar din flytt i detalj och säkerställer att allt är förberett för en smidig flyttprocess."
              },
              {
                step: 3,
                title: "Flyttdagen",
                description: "På flyttdagen kommer vårt professionella team och utför flytten enligt plan. Vi hanterar allt från packning till transport."
              }
            ].map((process) => (
              <motion.div 
                key={process.step}
                className="flex items-start bg-white rounded-xl shadow-md p-6 transform-gpu"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.div 
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-full flex items-center justify-center font-semibold text-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {process.step}
                </motion.div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
              </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.section 
          className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
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
          
          <div className="relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                variants={fadeInUp}
              >
                Redo att börja din flyttresa?
              </motion.h2>
              <motion.p 
                className="text-xl mb-8"
                variants={fadeInUp}
              >
            Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din flytt.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 justify-center items-center"
                variants={fadeInUp}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
          <Link 
            href="/fa-offert"
                    className="h-[56px] bg-white text-[#0F172A] px-8 py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium inline-flex items-center gap-2"
                  >
                    Få offert
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
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
                    href="/kontakt" 
                    className="h-[56px] border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium inline-flex items-center"
                  >
                    Kontakta oss
          </Link>
                </motion.div>
              </motion.div>
            </motion.div>
        </div>
        </motion.section>
      </div>
    </main>
  )
} 