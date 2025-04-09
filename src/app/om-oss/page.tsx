'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function OmOssPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Om oss</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Din pålitliga partner för professionella flytt- och städtjänster
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/fa-offert" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                Få offert
              </Link>
              <Link href="/kontakt" className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium">
                Kontakta oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
                  Vår historia
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Med många års erfarenhet inom flytt- och städbranschen har vi byggt upp en solid 
                    kompetens och ett brett nätverk av pålitliga partners. Vi strävar ständigt efter 
                    att erbjuda den bästa möjliga servicen till våra kunder.
                  </p>
                  <p className="text-lg">
                    Vår passion för att göra flytt- och städprocessen så smidig som möjligt har gjort 
                    oss till en betrodd aktör i branschen. Vi förstår att varje kund har unika behov 
                    och anpassar vår service därefter.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[350px] w-full">
                  <Image
                    src="/flyttella-logo.png"
                    alt="Flyttella Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Professionalism */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Professionalism
            </h2>
            <ul className="space-y-3">
              {[
                "Erfaren personal",
                "Kvalificerad utbildning",
                "Modern utrustning",
                "Effektiva processer",
                "Punktlighet",
                "Transparens",
                "Kvalitetskontroll",
                "Kontinuerlig utveckling"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quality */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Kvalitet
            </h2>
            <ul className="space-y-3">
              {[
                "Höga standarder",
                "Grundliga processer",
                "Kvalitetskontroll",
                "Kundnöjdhet",
                "Miljöhänsyn",
                "Säkerhet",
                "Ansvarsförsäkring",
                "Garantier"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Focus */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Kundfokus
            </h2>
            <ul className="space-y-3">
              {[
                "Personlig service",
                "Flexibla lösningar",
                "Transparent kommunikation",
                "Snabb respons",
                "Anpassade erbjudanden",
                "Kundvård",
                "Uppföljning",
                "Nöjd-kund-garanti"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg shadow-lg p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Vårt team
          </h2>
          <p className="text-white/90 mb-6">
            Våra medarbetare är hjärtat i vår verksamhet. Vi investerar i kontinuerlig utbildning 
            och utveckling för att säkerställa att vi alltid levererar den bästa möjliga servicen.
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Erfarna flyttare",
              "Utbildade städare",
              "Certifierade specialister",
              "Serviceinriktade medarbetare",
              "Kvalitetsansvariga",
              "Kundservice-team"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            Låt oss hjälpa dig med din flytt
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vi är redo att hjälpa dig med din flytt eller städning. Kontakta oss för en 
            kostnadsfri offert och personlig rådgivning.
          </p>
          <Link 
            href="/fa-offert" 
            className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Få offert
          </Link>
        </div>
      </div>
    </main>
  );
} 