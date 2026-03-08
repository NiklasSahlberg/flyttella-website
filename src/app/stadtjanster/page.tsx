'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/contexts/LanguageContext';
import ReviewsWidget from '@/app/components/ReviewsWidget';
import LocationsCard from '@/app/components/LocationsCard';
import React from 'react';
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

export default function StadtjansterPage() {
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

  const stadServices = [
    {
      icon: '🧽',
      title: t('stadtjanster.services.flyttstadning.title'),
      description: t('stadtjanster.services.flyttstadning.description'),
      href: '/flyttstadning'
    },
    {
      icon: '🏡',
      title: t('stadtjanster.services.hemstadning.title'),
      description: t('stadtjanster.services.hemstadning.description'),
      href: '/hemstadning'
    },
    {
      icon: '🧱',
      title: t('stadtjanster.services.byggstadning.title'),
      description: t('stadtjanster.services.byggstadning.description'),
      href: '/byggstadning'
    },
    {
      icon: '🪟',
      title: t('stadtjanster.services.fonsterputsning.title'),
      description: t('stadtjanster.services.fonsterputsning.description'),
      href: '/fonsterputsning'
    },
    {
      icon: '🧹',
      title: t('stadtjanster.services.storstadning.title'),
      description: t('stadtjanster.services.storstadning.description'),
      href: '/storstadning'
    },
    {
      icon: '🏠',
      title: t('stadtjanster.services.visningsstadning.title'),
      description: t('stadtjanster.services.visningsstadning.description'),
      href: '/visningsstadning'
    },
    {
      icon: '🧹',
      title: t('stadtjanster.services.kontorsstadning.title'),
      description: t('stadtjanster.services.kontorsstadning.description'),
      href: '/kontorsstadning'
    },
    {
      icon: '🕊️',
      title: t('stadtjanster.services.dodsboStadning.title'),
      description: t('stadtjanster.services.dodsboStadning.description'),
      href: '/dodsbo-stadning'
    }
  ];

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          
          {/* Hero Section */}
          <section className="relative py-16 md:py-32 overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#10B981]">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: 'url(/cleaning_background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
                  {t('stadtjanster.hero.title')}
                </h1>
                <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  {t('stadtjanster.hero.subtitle')}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="max-w-6xl mx-auto">
            </div>
          </div>

        {/* Städtjänster Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {t('stadtjanster.section.title')}
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('stadtjanster.section.subtitle')}
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {stadServices.map((service, index) => (
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
                          {t('stadtjanster.cta.readMore')}
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
                <span className="text-4xl md:text-5xl">🧽✨</span>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    {t('stadtjanster.cta.title')}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-100 leading-snug">
                    {t('stadtjanster.cta.subtitle')}
                  </p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link 
                    href="#stad-offert" 
                    className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-lg"
                  >
                    {t('stadtjanster.cta.button')}
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
          title={t('stadtjanster.reviews.title')} 
          subtitle={t('stadtjanster.reviews.subtitle')} 
          description={t('stadtjanster.reviews.description')} 
          badgeAlt={t('stadtjanster.reviews.badgeAlt')} 
          arrowText={t('stadtjanster.reviews.arrowText')} 
        />

        {/* Locations */}
        <LocationsCard locations={locations} />
      </div>
      </div>
    </main>
  );
}
