'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import FlyttoffertForm from '../components/FlyttoffertForm'
import React, { useEffect, useState } from "react";
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

// Lottie animation functions
function FillFormLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const { t } = useLanguage();

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section - Matching start page design */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          <div className="mx-auto px-16">
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
            </div>
          </div>
        </div>

                        {/* What is Bohagsflytt Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">




              {/* Content Sections */}
              <motion.div 
                className="space-y-16"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  {
                    title: "Privatflytt – vi tar hand om allt",
                    content: "Vi på Flyttella förstår att varje flytt är en personlig resa. Därför erbjuder vi en komplett service som tar hand om allt från första kontakten till sista möbeln på plats. Med vår erfarenhet och dedikation kan du känna dig trygg i vetskapen om att allt sköts professionellt, så att du kan fokusera på det viktiga – att börja ditt nya liv i ditt nya hem.",
                    icon: '🏠',
                    image: '/omoss.jpg'
                  },
                  {
                    title: "Boka flytthjälp i god tid",
                    content: "För en smidig och stressfri flytt är det viktigt att boka flytthjälp i god tid. Vi rekommenderar att du bokar minst 2-3 veckor i förväg för att säkerställa tillgänglighet och få den flyttdag som passar dig bäst. Vi erbjuder flexibla bokningsmöjligheter och kan anpassa oss efter dina behov. Boka redan idag för att säkerställa en professionell och pålitlig flyttservice.",
                    icon: '📅',
                    image: '/packing_tips.jpg'
                  },
                  {
                    title: "Flyttkartonger och packning",
                    content: "Välj att packa själv eller låt våra experter ta hand om allt. Vi erbjuder professionell packning med högkvalitativt material för att skydda dina värdefulla och sköra föremål. Vårt team kan också hjälpa till med demontering och montering av möbler för en säker transport.",
                    icon: '📦'
                  },
                  {
                    title: "Flyttstädning",
                    content: "Flyttella erbjuder professionell flyttstädning som följer mäklarsamfundets riktlinjer. Vi erbjuder 14 dagars nöjd kund garanti för din trygghet.",
                    icon: '🧹'
                  },
                  {
                    title: "Magasinering av bohag",
                    content: "Behöver du magasinera bohag under flyttprocessen? Flyttella tillhandahåller säkra och pålitliga magasineringslösningar för dina tillhörigheter. Vi erbjuder flexibla alternativ som passar dina behov och tidsplan. Som extra service erbjuder vi den första månaden gratis för att göra din flyttprocess ännu smidigare.",
                    icon: '🏭'
                  },

                                ].map((section, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.image ? (
                      // Special layout for sections with image
                      <div className="flex flex-col lg:flex-row items-start gap-12">
                        {index === 0 ? (
                          // First section: Image on left, text on right
                          <>
                            {/* Image on the left */}
                            <div className="w-full lg:w-1/2">
                              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
                                <img
                                  src={section.image}
                                  alt={section.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            
                            {/* Content on the right */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-end min-h-[600px]">
                              <h3 className="text-5xl font-bold text-[#0F172A] mb-8 group-hover:text-[#10B981] transition-colors duration-300">
                                {section.title}
                              </h3>
                              <p className="text-gray-700 leading-relaxed text-3xl">
                                {section.content}
                              </p>
                            </div>
                          </>
                        ) : (
                          // Other sections: Text on left, image on right
                          <>
                            {/* Content on the left */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-end min-h-[600px]">
                              <h3 className="text-5xl font-bold text-[#0F172A] mb-8 group-hover:text-[#10B981] transition-colors duration-300">
                                {section.title}
                              </h3>
                              <p className="text-gray-700 leading-relaxed text-3xl">
                                {section.content}
                              </p>
                            </div>
                            
                            {/* Image on the right */}
                            <div className="w-full lg:w-1/2">
                              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
                                <img
                                  src={section.image}
                                  alt={section.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      // Regular centered layout for other sections
                      <div className="text-center">
                        <div className="max-w-4xl mx-auto">
                          <h3 className="text-5xl font-bold text-[#0F172A] mb-8 group-hover:text-[#10B981] transition-colors duration-300">
                            {section.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-3xl">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                Våra tjänster
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Vi erbjuder kompletta flyttlösningar med professionell service
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                    {t(`bohagsflytt.features.${feature.title}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`bohagsflytt.features.${feature.title}.description`)}
                  </p>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

        {/* Process Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-4 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-10 mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  {t('bohagsflytt.process.title')}
                </h2>

                {/* Process Description */}
                <div className="text-center mb-8">
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-6 leading-relaxed">
                    {t('bohagsflytt.process.description')}
                  </p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-8">
                  <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-4">
                    {t('bohagsflytt.process.pricing')}
                  </p>
                </div>

                {/* Process Flow Section */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{t('bohagsflytt.process.subtitle')}</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 w-full">
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
                          icon: <div className="ml-3 mt-8"><PhoneCallLottie /></div>,
                          title: t('bohagsflytt.process.steps.2.title'),
                          description: t('bohagsflytt.process.steps.2.description'),
                          containerClass: "-mt-7",
                          textClass: ""
                        },
                        {
                          icon: <div className="ml-6 -mt-0"><SignFormLottie /></div>,
                          title: t('bohagsflytt.process.steps.3.title'),
                          description: t('bohagsflytt.process.steps.3.description'),
                          containerClass: "-mt-6",
                          textClass: ""
                        },
                        {
                          icon: <div className="mr-3"><MovingTruckLottie /></div>,
                          title: t('bohagsflytt.process.steps.4.title'),
                          description: t('bohagsflytt.process.steps.4.description'),
                          containerClass: "-mt-14",
                          textClass: "-mt-8",
                        },
                        {
                          icon: <div className="mt-0"><HappyCustomerLottie /></div>,
                          title: t('bohagsflytt.process.steps.5.title'),
                          description: t('bohagsflytt.process.steps.5.description'),
                          containerClass: "-mt-6",
                          textClass: ""
                        }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 h-full"
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.2 }}
                          variants={fadeInUp}
                          custom={index}
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
          {/* White gradient fade to blend into next section */}
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20}} />
        </section>

        {/* Main Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
        <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
            {/* Top banner with gradient */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] p-8 relative overflow-hidden">
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
                  {/* Content sections with icons */}
              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">🏠</div>
                <div>
                  <p className="text-lg text-gray-700">
                        {t('bohagsflytt.content.intro')}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">💪</div>
                <div>
                  <p className="text-lg text-gray-700">
                        {t('bohagsflytt.content.expertise')}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">✨</div>
                <div>
                  <p className="text-lg text-gray-700">
                        {t('bohagsflytt.content.quality')}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">🏡</div>
                <div>
                  <p className="text-lg text-gray-700">
                        {t('bohagsflytt.content.comprehensive')}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="text-4xl">🎯</div>
                <div>
                  <p className="text-lg text-gray-700">
                        {t('bohagsflytt.content.customized')}
          </p>
        </div>
              </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white">
          <div className="container mx-auto px-4 text-center">
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Redo att börja din flytt?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Få en snabb och gratis offert på din bohagsflytt
              </p>
                  <Link 
                    href="/kontakt" 
                className="inline-block bg-white text-[#0F172A] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                Få gratis offert
          </Link>
            </motion.div>
        </div>
        </section>
      </div>
    </main>
  )
} 