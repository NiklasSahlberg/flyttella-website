'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function Services() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#0F172A] mb-4">
            Våra tjänster
          </h1>
          <p className="text-lg text-center text-gray-600 mb-12">
            Vi erbjuder professionell flytt- och städservice för både privatpersoner och företag
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flytt Section */}
            <motion.div
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">🏠</span>
                <h3 className="text-2xl font-bold">Boka flytt</h3>
              </div>
              <p className="text-white/90 mb-6">
                Vi erbjuder komplett flyttservice med professionell packning, transport och uppackning. 
                Vårt erfarna team säkerställer en smidig och trygg flytt.
              </p>
              <Link 
                href="/fa-offert"
                className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
              >
                Boka flytt
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

            {/* Städ Section */}
            <motion.div
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 shadow-lg text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">✨</span>
                <h3 className="text-2xl font-bold">Boka städ</h3>
              </div>
              <p className="text-white/90 mb-6">
                Professionell flyttstädning som uppfyller alla krav. 
                Vi garanterar en grundlig städning av din gamla bostad.
              </p>
              <Link 
                href="/fa-stadning-offert"
                className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
              >
                Boka städ
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
        </div>
      </div>
    </main>
  );
} 