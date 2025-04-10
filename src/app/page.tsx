'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import ReviewsWidget from "./components/ReviewsWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#10B981]"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Professionell flyttfirma i Stockholm
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Vi erbjuder komplett flyttservice med bohagsflytt, flyttstädning och packning. 
                Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg.
              </p>
            </div>

            <div className="mt-12 text-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Fast-pris</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Nöjd kund garanti</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Pack garanti</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">50% RUT-avdrag</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Försäkring & Trafiktillstånd</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <p className="font-semibold text-lg">Professionell service</p>
                </div>
              </div>
              <p className="text-xl font-semibold mb-8 text-white/90">
                Låt oss ta hand om hela din flytt medan du fokuserar på ditt nya hem!
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/fa-offert" className="bg-white text-[#0F172A] px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium">
                  Få offert
                </Link>
                <Link href="/kontakt" className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F172A] transition-all font-medium">
                  Kontakta oss
                </Link>
              </div>
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-16">
              VÅRA TJÄNSTER
            </h2>
            
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Bohagsflytt */}
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Bohagsflytt
                </h3>
                <p className="text-gray-100 mb-6">
                  Vi erbjuder professionell flytthjälp för både privatpersoner och företag. Med vår expertis och noggrannhet ser vi till att din flytt blir smidig och trygg.
                </p>
                <ul className="space-y-4 flex-grow">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Erfarna och försiktiga flyttare</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Moderna och välutrustade flyttbilar</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Fullständig flyttförsäkring ingår</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/fa-offert" className="bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium inline-block">
                    Boka din flytt
                  </Link>
                </div>
              </div>

              {/* Flyttstädning */}
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Flyttstädning
                </h3>
                <p className="text-gray-100 mb-6">
                  Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick.
                </p>
                <ul className="space-y-4 flex-grow">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Städgaranti ingår</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Miljövänliga rengöringsmedel</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Professionell utrustning</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/fa-offert" className="bg-white text-[#0F172A] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium inline-block">
                    Boka städning
                  </Link>
                </div>
              </div>

              {/* Packning */}
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Packning
                </h3>
                <p className="text-gray-100 mb-6">
                  Står du inför en flytt och har ont om tid eller vill vara säker på att dina saker hamnar tryggt i lådorna? Vi ser till att packa er bohag på ett korrekt och tryggt sätt.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Gratis lån av kartonger inom Stockholm</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Packgaranti på alla lösöre vi packar</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Professionell och säker packning</span>
                  </li>
                </ul>
              </div>

              {/* Montering */}
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Montering
                </h3>
                <p className="text-gray-100 mb-6">
                  Om du har ont om tid och saknar rätt redskap då ser vi till att alla taklampor, gardiner, tv och tavlor hamnar trygg i flyttkartonger. Vi ser till även att montera upp allting på din nya bostad.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Vi tar med alla verktyg och material</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Professionell nedmontering och uppsättning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-100">Säker hantering av dina föremål</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
                    <span className="text-lg font-semibold text-[#0F172A]">Måndag - Fredag</span>
                    <span className="text-lg text-[#10B981] font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-lg font-semibold text-[#0F172A]">Lördag</span>
                    <span className="text-lg text-gray-500">Stängt</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#0F172A]">Söndag</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-16">
              HÄR FINNS VI
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/flyttfirma-i-norrmalm" className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white hover:opacity-90 transition-opacity">
                <h3 className="text-2xl font-bold mb-4">Norrmalm</h3>
                <p className="text-white/90">
                  Professionell flyttservice i Norrmalm. Vi erbjuder flyttstädning, packning och bohagsflytt i Norrmalm.
                </p>
              </Link>
              <Link href="/flyttfirma-i-vasastan" className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white hover:opacity-90 transition-opacity">
                <h3 className="text-2xl font-bold mb-4">Vasastan</h3>
                <p className="text-white/90">
                  Specialiserade på flytt i historiska fastigheter. Vi erbjuder skräddarsydda lösningar för flytt i Vasastan.
                </p>
              </Link>
              <Link href="/flyttfirma-i-bro" className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white hover:opacity-90 transition-opacity">
                <h3 className="text-2xl font-bold mb-4">Bro</h3>
                <p className="text-white/90">
                  Specialiserade på flytt i villor och större bostäder. Vi erbjuder skräddarsydda lösningar för flytt i Bro.
                </p>
              </Link>
              <Link href="/flyttfirma-i-taby" className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-lg p-8 shadow-lg text-white hover:opacity-90 transition-opacity">
                <h3 className="text-2xl font-bold mb-4">Täby</h3>
                <p className="text-white/90">
                  Erfarenhet med alla typer av bostäder. Vi erbjuder skräddarsydda lösningar för flytt i Täby.
                </p>
              </Link>
              <Link href="/flyttfirma-i-jarfalla" className="group">
                <h3 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#10B981] transition-colors">Järfälla</h3>
                <p className="text-gray-600">Erfarenhet med både höghus och villor i hela kommunen</p>
              </Link>
              <Link href="/flyttfirma-i-bromma" className="group">
                <h3 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#10B981] transition-colors">Bromma</h3>
                <p className="text-gray-600">Erfarenhet med alla typer av bostäder - från lägenheter till villor</p>
              </Link>
              <Link href="/flyttfirma-i-sundbyberg" className="group">
                <h3 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#10B981] transition-colors">Sundbyberg</h3>
                <p className="text-gray-600">Erfarenhet med både lägenheter och villor i hela kommunen</p>
              </Link>
              {/* Add more locations here as needed */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12">
              HÄR FINNS VI
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
              {[
                "Norrmalm", "Kungsholmen", "Östermalm", "Nacka",
                "Vasastan", "Lidingö", "Bromma", "Norrtälje",
                "Täby", "Solna", "Vällingby", "Huddinge",
                "Värmdö", "Sollentuna", "Danderyd", "Södermalm",
                "Västerås", "Järfälla", "Södertälje", "Linköping",
                "Norrköping", "Enköping"
              ].map((location, index) => (
                <a key={index} href={`/flyttfirma-${location.toLowerCase().replace('ö', 'o').replace('å', 'a').replace('ä', 'a')}`} className="group">
                  <h3 className="text-[#0F172A] group-hover:text-[#10B981] transition-colors font-medium">
                    Flyttfirma i {location}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>
    </div>
    </main>
  );
}
