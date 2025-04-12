'use client';

import Image from "next/image";
import Link from "next/link";
import ReviewsWidget from "./components/ReviewsWidget";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Professionell flyttfirma i Stockholm
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Vi erbjuder komplett flyttservice med bohagsflytt, flyttstädning och packning. 
                Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg.
              </p>
            </motion.div>

            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="font-semibold text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xl font-semibold mb-8 text-white/90">
                Låt oss ta hand om hela din flytt medan du fokuserar på ditt nya hem!
              </p>
              <motion.div 
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="/fa-offert" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                  Få offert
                </Link>
                <Link href="/kontakt" className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium">
                  Kontakta oss
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Reviews Widget Section */}
        <ReviewsWidget />

        {/* Services Sections */}
        <section className="section-padding bg-white">
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
            
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
              {[
                { icon: "🏠", title: "Bohagsflytt", description: "Vi erbjuder professionell flytthjälp för både privatpersoner och företag. Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg." },
                { icon: "✨", title: "Flyttstädning", description: "Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick." },
                { icon: "💪", title: "Bärhjälp", description: "Professionell bärhjälp för alla typer av flytt. Vi tar hand om tunga lyft och säkerställer att allt transporteras säkert." },
                { icon: "🎹", title: "Piano/Tunglyft", description: "Specialiserad service för flytt av piano och andra tunga föremål. Vi har erfarenhet och rätt utrustning för säker hantering." },
                { icon: "🏢", title: "Kontorsflytt", description: "Effektiv flytt av kontor och företag. Vi minimerar avbrott i verksamheten och säkerställer en smidig övergång." },
                { icon: "🔧", title: "Montering", description: "Professionell montering och demontering av möbler och inredning. Vi säkerställer att allt monteras korrekt och säkert." }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{service.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-100 mb-6">
                    {service.description}
                  </p>
                  <div className="mt-auto">
                    <Link href="/fa-offert" className="bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium inline-block">
                      Boka {service.title.toLowerCase()}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Se alla våra tjänster Section */}
        <motion.section 
          className="py-16 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Upptäck Alla Våra Tjänster
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Vi erbjuder ett komplett utbud av flyttjänster för att göra din flytt så smidig som möjligt. 
                Från bohagsflytt och flyttstädning till specialtjänster som piano- och kontorsflytt.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/tjanster" 
                  className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
                >
                  Se alla våra tjänster
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Opening Hours Section */}
        <section className="section-padding bg-gradient-to-r from-[#0F172A]/5 to-[#10B981]/5">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                  ÖPPETTIDER
                </h2>
                <p className="text-xl text-gray-800">Kundservice</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-lg font-semibold text-[#0F172A]">⏰ Måndag - Fredag</span>
                    <span className="text-lg text-[#10B981] font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-lg font-semibold text-[#0F172A]">🚫 Lördag</span>
                    <span className="text-lg text-gray-500">Stängt</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#0F172A]">🚫 Söndag</span>
                    <span className="text-lg text-gray-500">Stängt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Här finns vi Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              HÄR FINNS VI
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Norrmalm", "Kungsholmen", "Östermalm",
                "Vasastan", "Bro", "Täby"
              ].map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link 
                    href={`/flyttfirma-i-${location.toLowerCase().replace('ö', 'o').replace('å', 'a').replace('ä', 'a')}`} 
                    className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white hover:opacity-90 transition-opacity block"
                  >
                    <h3 className="text-2xl font-bold">{location}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Planerar du en flytt?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Vi erbjuder kostnadsfri offert och rådgivning för din kommande flytt. Med vår erfarenhet och kompetens garanterar vi en trygg och professionell flyttservice.
            </p>
            <Link 
              href="/fa-offert" 
              className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium"
            >
              Begär offert
            </Link>
          </div>
        </section>

        {/* Locations Section - SEO Optimized */}
        <section className="section-padding bg-gradient-to-r from-[#0F172A]/5 to-[#10B981]/5">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              HÄR FINNS VI
            </motion.h2>
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
              {[
                "Norrmalm", "Kungsholmen", "Östermalm", "Nacka",
                "Vasastan", "Lidingö", "Bromma", "Norrtälje",
                "Täby", "Solna", "Vällingby", "Huddinge",
                "Värmdö", "Sollentuna", "Danderyd", "Södermalm",
                "Västerås", "Järfälla", "Södertälje", "Linköping",
                "Norrköping", "Enköping"
              ].map((location, index) => (
                <motion.a
                  key={index}
                  href={`/flyttfirma-${location.toLowerCase().replace('ö', 'o').replace('å', 'a').replace('ä', 'a')}`}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-[#0F172A] group-hover:text-[#10B981] transition-colors font-medium">
                    Flyttfirma i {location}
                  </h3>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
    </div>
    </main>
  );
}
