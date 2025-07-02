import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto px-24">
        <motion.div
          className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
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
              className="text-3xl md:text-4xl font-bold text-center text-white mb-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0 * 0.25 }}
            >
              HÄR FINNS VI
            </motion.h2>
            
            <div className="space-y-8">
              {/* Flyttfirma Section */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.1 * 0.25 }}
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Flyttfirma
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {locations.map((location, idx) => (
                    <motion.div
                      key={`flyttfirma-${location.slug}`}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ duration: 0.3, delay: idx * 0.02 }}
                    >
                      <Link
                        href={`/flyttfirma-i-${location.slug}`}
                        className="group transition-all block"
                      >
                        <span className="text-white/90 group-hover:text-white group-hover:underline text-sm font-medium transition-colors block text-center py-2 px-3 rounded-lg hover:bg-white/10 whitespace-nowrap">
                          {location.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Flyttstäd Section */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 * 0.25 }}
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Flyttstäd
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {locations.map((location, idx) => (
                    <motion.div
                      key={`flyttstad-${location.slug}`}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ duration: 0.3, delay: idx * 0.02 }}
                    >
                      <Link
                        href={`/flyttstad-i-${location.slug}`}
                        className="group transition-all block"
                      >
                        <span className="text-white/90 group-hover:text-white group-hover:underline text-sm font-medium transition-colors block text-center py-2 px-3 rounded-lg hover:bg-white/10 whitespace-nowrap">
                          {location.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 