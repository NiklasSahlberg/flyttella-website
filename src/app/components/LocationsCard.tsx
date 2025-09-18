import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

interface Location {
  name: string;
  slug: string;
}

interface LocationsCardProps {
  locations: Location[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function LocationsCard({ locations }: LocationsCardProps) {
  const { locale } = useLanguage();
  const [isFlyttfirmaExpanded, setIsFlyttfirmaExpanded] = useState(false);
  const [isFlyttstadExpanded, setIsFlyttstadExpanded] = useState(false);
  

  
  // Create separate arrays for flyttfirma and flyttstad
  const flyttfirmaLocations = [
    ...locations
  ];
  
  // Calculate how many cities to show initially on mobile (up to Kungsholmen)
  const initialShowCount = 16; // Show first 16 cities (ending with Kungsholmen)
  
  // Get visible cities based on expanded state (mobile only)
  const getVisibleFlyttfirmaLocations = () => {
    if (isFlyttfirmaExpanded) {
      return flyttfirmaLocations; // Show all when expanded
    } else {
      return flyttfirmaLocations.slice(0, initialShowCount); // Show first 16 cities initially
    }
  };
  
  const getVisibleFlyttstadLocations = () => {
    if (isFlyttstadExpanded) {
      return locations; // Show all when expanded
    } else {
      return locations.slice(0, initialShowCount); // Show first 16 cities initially
    }
  };

  return (
    <section className="py-6 md:py-16 bg-gray-50">
      <div className="mx-auto px-4 md:px-24">
        <motion.div
          className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-12 shadow-2xl relative overflow-hidden"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0 * 0.25 }}
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
          
          <div className="relative z-10">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-center text-white mb-6 md:mb-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0 * 0.25 }}
            >
              {locale === 'sv' ? 'HÄR FINNS VI' : 'HERE WE ARE'}
            </motion.h2>
            
            <div className="space-y-6 md:space-y-8">
              {/* Flyttfirma Section */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.1 * 0.25 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 text-center flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {locale === 'sv' ? 'Flyttfirma' : 'Moving Company'}
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                  {/* Desktop: Always show all cities */}
                  <div className="hidden md:flex flex-wrap gap-2 md:gap-3 justify-center">
                    {flyttfirmaLocations.map((location, idx) => (
                      <motion.div
                        key={`flyttfirma-desktop-${location.slug}`}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05, x: 2 }}
                        transition={{ duration: 0.3, delay: idx * 0.02 }}
                      >
                        <span className="text-white/90 text-xs md:text-sm font-medium block text-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg whitespace-nowrap">
                          {location.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile: Conditional display with Läs mer */}
                  <div className="md:hidden flex flex-wrap gap-2 md:gap-3 justify-center">
                    {getVisibleFlyttfirmaLocations().map((location, idx) => (
                      <div
                        key={`flyttfirma-mobile-${location.slug}`}
                        className="group transition-all block"
                      >
                        <span className="text-white text-xs md:text-sm font-medium block text-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg whitespace-nowrap">
                          {location.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Read More button for Flyttfirma - Mobile only */}
                {!isFlyttfirmaExpanded && flyttfirmaLocations.length > initialShowCount && (
                  <div className="mt-4 text-center md:hidden">
                    <button
                      onClick={() => setIsFlyttfirmaExpanded(true)}
                      className="text-white/90 hover:text-white text-sm font-medium underline transition-colors"
                    >
                      {locale === 'sv' ? 'Läs mer' : 'Read more'}
                    </button>
                  </div>
                )}
                

                <div className="mt-4 md:mt-6 text-center">
                  <h4 className="text-lg md:text-xl font-bold text-white flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {locale === 'sv' ? 'Flyttfirma internationellt' : 'International Moving Company'}
                  </h4>
                  <div className="mt-3 md:mt-4 flex flex-wrap justify-center gap-2">
                    {[
                      'Spanien', 'Finland', 'Norge', 'Danmark', 'Frankrike', 'Tyskland', 
                      'Italien', 'Schweiz', 'Polen', 'Nederländerna', 'Österrike', 'Belgien', 'Grekland'
                    ].map((country, index) => (
                      <span 
                        key={index}
                        className="text-white/90 text-xs md:text-sm font-medium block text-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg whitespace-nowrap"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Flyttstäd Section */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 * 0.25 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 text-center flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  {locale === 'sv' ? 'Flyttstäd' : 'Moving Cleaning'}
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                  {/* Desktop: Always show all cities */}
                  <div className="hidden md:flex flex-wrap gap-2 md:gap-3 justify-center">
                    {locations.map((location, idx) => (
                      <motion.div
                        key={`flyttstad-desktop-${location.slug}`}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05, x: 2 }}
                        transition={{ duration: 0.3, delay: idx * 0.02 }}
                      >
                        <span className="text-white/90 text-xs md:text-sm font-medium block text-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg whitespace-nowrap">
                          {location.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile: Conditional display with Läs mer */}
                  <div className="md:hidden flex flex-wrap gap-2 md:gap-3 justify-center">
                    {getVisibleFlyttstadLocations().map((location, idx) => (
                      <div
                        key={`flyttstad-mobile-${location.slug}`}
                        className="group transition-all block"
                      >
                        <span className="text-white text-xs md:text-sm font-medium block text-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg whitespace-nowrap">
                          {location.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Read More button for Flyttstäd - Mobile only */}
                {!isFlyttstadExpanded && locations.length > initialShowCount && (
                  <div className="mt-4 text-center md:hidden">
                    <button
                      onClick={() => setIsFlyttstadExpanded(true)}
                      className="text-white/90 hover:text-white text-sm font-medium underline transition-colors"
                    >
                      {locale === 'sv' ? 'Läs mer' : 'Read more'}
                    </button>
                  </div>
                )}
                

              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 