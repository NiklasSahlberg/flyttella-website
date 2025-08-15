'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import FlyttoffertForm from '../components/FlyttoffertForm';
import StadningOffertFormCustomAkersberga from '../components/StadningOffertFormCustomAkersberga';
import ReviewsWidget from '../components/ReviewsWidget';
import LocationsCard from '../components/LocationsCard';
import React, { useState } from 'react';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

export default function ForetagPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const { t } = useLanguage();

  const locations = [
    { name: 'Åkersberga', slug: 'akersberga' },
    { name: 'Älvsjö', slug: 'alvsjo' },
    { name: 'Årsta', slug: 'arsta' },
    { name: 'Bromma', slug: 'bromma' },
    { name: 'Danderyd', slug: 'danderyd' },
    { name: 'Ekerö', slug: 'ekero' },
    { name: 'Hägersten', slug: 'hagersten' },
    { name: 'Haninge', slug: 'haninge' },
    { name: 'Huddinge', slug: 'huddinge' },
    { name: 'Järfälla', slug: 'jarfalla' },
    { name: 'Kista', slug: 'kista' },
    { name: 'Kungsholmen', slug: 'kungsholmen' },
    { name: 'Lidingö', slug: 'lidingo' },
    { name: 'Nacka', slug: 'nacka' },
    { name: 'Norrmalm', slug: 'norrmalm' },
    { name: 'Östermalm', slug: 'ostermalm' },
    { name: 'Sollentuna', slug: 'sollentuna' },
    { name: 'Solna', slug: 'solna' },
    { name: 'Täby', slug: 'taby' },
    { name: 'Vasastan', slug: 'vasastan' }
  ];

  const businessServices = [
    {
      icon: '🏢',
      title: 'Kontorsflytt',
      description: 'Effektiv kontorsflytt med minimal störning av verksamheten. Vi planerar och genomför hela processen professionellt.',
      href: '/kontorsflytt'
    },
    {
      icon: '🧹',
      title: 'Kontorsstädning',
      description: 'Professionell kontorsstädning för en ren och trivsam arbetsmiljö. Anpassad efter ert schema och behov.',
      href: '/kontorsstadning'
    },
    {
      icon: '👷‍♂️',
      title: 'Bemanning och underentreprenad',
      description: 'Flexibel bemanning och pålitlig underentreprenad för flytt- och logistikprojekt. Erfaren personal när ni behöver det.',
      href: '/bemanning'
    }
  ];

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          {/* Mobile: Form */}
          <div className="md:hidden mx-auto px-4 pb-2" id="foretag-offert">
            {selectedServiceType === 'flyttstad' ? (
              <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
            ) : (
              <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} />
            )}
          </div>
          
          {/* Desktop hero */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/office-moving.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">Våra företagstjänster</h1>
                  <p className="text-2xl md:text-3xl mb-12">Professionella lösningar för företag</p>
                  <p className="text-lg text-white/90">Vi erbjuder skräddarsydda tjänster för företag inom flytt, städning och bemanning. Effektiva lösningar med minimal störning av verksamheten.</p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Företagstjänster Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Företagstjänster
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Skräddarsydda lösningar för företag. Vi hjälper er med allt från kontorsflytt till bemanning och städning.
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {businessServices.map((service, index) => (
                  <motion.div
                    key={service.title}
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
                          Läs mer
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
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto px-4">
            <motion.div 
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[200px] md:min-h-[240px] w-full max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                initial={{ backgroundPosition: '0% 0%' }} 
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} 
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} 
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
              />
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 relative z-10 mb-6">
                <span className="text-4xl md:text-5xl">🏢✨</span>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    Redo att ta nästa steg för ditt företag?
                  </h3>
                  <p className="text-lg md:text-xl text-gray-100 leading-snug">
                    Få en kostnadsfri offert på 1 minut
                  </p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link 
                    href="#foretag-offert" 
                    className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-lg"
                  >
                    Få gratis offert
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reviews Widget */}
        <ReviewsWidget 
          location="Stockholm" 
          title="Vad tycker våra kunder om oss?" 
          subtitle="Pålitliga företagstjänster i Stockholm" 
          description="Professionella företagstjänster i Stockholm – från kontorsflytt till bemanning. Fast pris och minimal störning av verksamheten. Höga betyg från nöjda företagskunder." 
          badgeAlt="Erfarenhet av företagstjänster i Stockholm" 
          arrowText="Läs vad våra företagskunder säger om våra tjänster" 
        />

        {/* Locations */}
        <LocationsCard locations={locations} />
      </div>
    </main>
  );
} 