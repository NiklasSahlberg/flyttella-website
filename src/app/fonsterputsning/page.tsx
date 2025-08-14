'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import FlyttoffertForm from '../components/FlyttoffertForm';
import StadningOffertFormCustomAkersberga from '../components/StadningOffertFormCustomAkersberga';
import ReviewsWidget from '../components/ReviewsWidget';
import LocationsCard from '../components/LocationsCard';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';
import Lottie from 'lottie-react';

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

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

// Lottie helpers at module scope
function FillFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/fillform.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function FastLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/fast.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function PhoneCallLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/phonecall.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function SignFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/signform.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function MovingTruckLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/movingtruck.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-36 h-36 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function CleanHomeLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/happycustomer.json').then((r)=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
}

export default function FonsterputsningPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [currentExperienceCard, setCurrentExperienceCard] = useState(0);
  const experienceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expTouchStartXRef = useRef<number | null>(null);
  const expTouchCurrentXRef = useRef<number | null>(null);
  const totalExperienceCards = 3;
  const restartExperienceAutoSlide = () => {
    if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);
    experienceIntervalRef.current = setInterval(() => {
      setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards);
    }, 3000);
  };
  useEffect(() => {
    restartExperienceAutoSlide();
    return () => { if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); };
  }, [totalExperienceCards]);

  const restartFeatureAutoSlide = () => {
    if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    featureIntervalRef.current = setInterval(() => {
      setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards);
    }, 4000);
  };
  useEffect(() => {
    restartFeatureAutoSlide();
    return () => { if (featureIntervalRef.current) clearInterval(featureIntervalRef.current); };
  }, [totalFeatureCards]);

  const toggleFAQ = (id: string) => setOpenFAQ(openFAQ === id ? null : id);

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

  const { t } = useLanguage();

  return (
    <main className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          {/* Mobile: Form */}
          <div className="md:hidden mx-auto px-4 pb-8" id="fonsterputs-offert">
            {selectedServiceType === 'flyttstad' ? (
              <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
            ) : (
              <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} cleaningCardSubtitle="Komplett städservice och fönsterputsning – kristallklart inne och ute" />
            )}
          </div>
          {/* Mobile hero removed per request */}
          {/* Desktop hero */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/cleaning_background.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">Professionell fönsterputsning i Stockholm</h1>
                  <p className="text-2xl md:text-3xl mb-12">Kristallklara fönster – varje gång</p>
                  <p className="text-lg text-white/90">Invändigt och utvändigt där det är säkert och åtkomligt. Perfekt inför säsong, visning eller som abonnemang.</p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} cleaningCardSubtitle="Komplett städservice och fönsterputsning – kristallklart inne och ute" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is Fönsterputsning */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              {/* Reco Widget - Positioned absolutely to the right (desktop) */}
              <div className="hidden lg:block absolute -right-72 top-[14rem] w-72 z-40">
                <div className="sticky top-8">
                  <iframe 
                    src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5"
                    className="w-full h-[1000px] border-0"
                    title="Flyttella recensioner"
                  />
                </div>
              </div>
              {/* Sidebar service cards (desktop) */}
              <div className="hidden lg:block absolute -right-72 top-[1385px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧹</span><h3 className="text-xl font-bold text-white">Storstädning</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Grundlig storstädning med fokus på kök, badrum och svåråtkomliga ytor. Perfekt som komplement till fönsterputs.</p>
                    <div className="mt-auto relative">
                      <Link href="/storstädning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 top-[1660px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧱</span><h3 className="text-xl font-bold text-white">Byggstädning</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Effektiv byggstädning efter renovering – grov- och finstädning för inflyttningsklart resultat.</p>
                    <div className="mt-auto relative">
                      <Link href="/byggstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 top-[1920px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🕊️</span><h3 className="text-xl font-bold text-white">Dödsbostädning</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Omsorgsfull dödsbostädning – sortering samt grov- och finstädning inför försäljning eller överlåtelse.</p>
                    <div className="mt-auto relative">
                      <Link href="/dodsbo" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {([
                  {
                    title: 'Vad är fönsterputsning?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-6 text-left md:text-center">
                          Fönsterputsning omfattar noggrann rengöring av fönsterrutor invändigt och utvändigt där det är säkert och åtkomligt. Vi tar även hand om karmar och fönsterbrädor, och lämnar ett kristallklart resultat utan ränder. Våra utbildade fönsterputsare använder beprövade tekniker, professionella skrapor och mikrofiberdukar för ett randfritt resultat. Vi anpassar arbetet efter fönstertyp och åtkomlighet, och kan vid behov hantera spröjsade fönster, inglasade balkonger och högt belägna fönster efter överenskommelse.
                        </p>
                        <div className="w-full max-w-6xl mx-auto flex justify-center mt-6 md:mt-8 mb-6">
                          <img src="/fonsterputs_intro.png" alt="Fönsterputsning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                        </div>
                      </>
                    ),
                    icon: '🪟'
                  },
                  {
                    title: 'Vad kostar fönsterputsning?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">
                          Priset beror på antal fönster, våningsplan, åtkomlighet och om utvändig puts önskas. Med 50% RUT‑avdrag blir fönsterputsning prisvärd. Tillval som spröjs, svåråtkomliga fönster eller inglasade balkonger påverkar priset. Vi lämnar alltid ett fast, transparent pris utan dolda avgifter. Begär en kostnadsfri offert – du får pris på 1 minut.
                        </p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            "Kristallklara fönster som verkligen lyfte hela hemmet inför visningen. Snabbt, proffsigt och prisvärt!"
                          </p>
                          <p className="italic text-gray-700 mt-2">- Sofia</p>
                        </div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'Fönsterputsning i Stockholm – därför ska du välja oss',
                    content:
                      'Vi erbjuder professionell fönsterputsning i Stockholm för lägenhet, villa och kontor. Våra utbildade fönsterputsare ger skinande rent resultat invändigt och utvändigt där det är säkert och åtkomligt. Med fast pris, snabb bokning och 50% RUT‑avdrag blir fönsterputsningen både smidig och prisvärd. Vi kan även schemalägga återkommande fönsterputs som abonnemang för ett jämnt resultat året runt.',
                    icon: '⭐'
                  },
                  {
                    title: 'Hur bokar jag fönsterputsning?',
                    preTitleContent: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-10">
                        <img src="/fonsterputs_info.png" alt="Boka fönsterputsning" className="w-full h-64 md:h-72 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    content: (
                      <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center">
                        Boka fönsterputsning på en minut: fyll i formuläret, få pris direkt och bekräfta digitalt. Vi återkommer samma dag eller nästkommande vardag för att säkerställa detaljer om antal fönster, åtkomlighet och eventuella tillval. Därefter planerar vi ett passande datum och levererar ett randfritt resultat som lyfter hela hemmet.
                      </p>
                    ),
                    icon: '📅'
                  },
                  {
                    title: 'Vad ingår i fönsterputsning?',
                    content:
                      'Invändig och, där det är säkert och åtkomligt, utvändig fönsterputs. Rengöring av karmar och fönsterbrädor. Vi använder professionella verktyg och metoder – inklusive specialbehandling för olika material – för ett skinande rent resultat. Som tillval erbjuder vi utvändig puts på högre våningsplan, puts av spröjsade fönster och abonnemang.',
                    icon: '🧼'
                  }
                ] as { title: string; content: any; icon: string; preTitleContent?: any }[]).map((section, index) => (
                  <motion.div key={index} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                    <div className="max-w-6xl mx-auto">
                      {section.preTitleContent ? (
                        <div>{section.preTitleContent}</div>
                      ) : null}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">
                        {section.title}
                      </h3>
                      {typeof section.content === 'string' ? (
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center">{section.content}</p>
                      ) : (
                        <div className="text-gray-700 leading-relaxed text-base md:text-lg lg:text-xl">{section.content}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Om Flyttella */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/cleaning_background.png)', backgroundSize: 'cover', backgroundPosition: 'center 70%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Om Flyttella</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                <motion.div className="hidden lg:block w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                      <img src="/window_cleaner.png" alt="Om Flyttella" className="object-cover rounded-2xl w-full h-full" style={{ objectPosition: '20% 25%', transform: 'scale(1.0)' }} />
                  </div>
                </motion.div>
                <motion.div className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är en ledande städfirma i Stockholm med över 8 års erfarenhet av fönsterputsning, hemstädning och flyttstädning. Vi erbjuder fasta priser och personlig service i hela Storstockholm.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vi använder professionella verktyg och tekniker för ett skinande rent resultat – oavsett årstid. Vi kan schemalägga återkommande puts för ett jämnt resultat över tid.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vårt mål är att göra din vardag enklare. Kostnadsfri offert, snabb bokning och personlig kontakt genom hela processen.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vi har stark lokal närvaro i hela Storstockholm och får höga betyg av våra kunder. Med tydliga rutiner, miljövänliga produkter och kvalitetssäkring i varje steg levererar vi ett pålitligt resultat – varje gång.</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      Flyttella är en städfirma i Stockholm med lång erfarenhet av fönsterputsning. Vi erbjuder städgaranti, fasta priser och personlig service – med randfria resultat. Vi planerar insatsen utifrån dina fönster och åtkomlighet och levererar ett resultat du märker direkt. Randfria resultat invändigt och, där det är säkert och åtkomligt, utvändigt. Snabb bokning och 50% RUT‑avdrag gör det enkelt och prisvärt.
                    </p>
                    <div className="pt-2">
                      <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer om oss<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        <div className="lg:hidden px-4 mt-6">
          <img src="/window_cleaner.png" alt="Om Flyttella" className="w-full h-auto rounded-2xl shadow-lg object-contain" />
        </div>

        {/* Reviews */}
        <ReviewsWidget 
          title="Vad tycker våra kunder om oss?"
          subtitle="Som en av Sveriges mest rekommenderade för fönsterputsning"
          description="Som en av Sveriges mest rekommenderade fönsterputstjänster sätter vi kunden i fokus. Vi vet att fönster påverkar helhetsintrycket – därför gör vi processen enkel, trygg och flexibel. Med vår erfarenhet och vårt dedikerade team ser vi till att din fönsterputs blir en positiv upplevelse från början till slut – med kristallklara resultat."
          badgeAlt="8+ års erfarenhet av fönsterputsning i Stockholm"
          arrowText="Läs vad våra kunder säger om vår fönsterputsning"
        />

        {/* CTA 1 */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🪟</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">Redo att börja med fönsterputs?</h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">Få en snabb och gratis offert</p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link href="#fonsterputs-offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">Få gratis offert<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Våra städtjänster */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Våra Städtjänster</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Flyttstädning Card (replacing fönsterputsning) */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🧽</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">Flyttstädning</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Grundlig flyttstädning enligt branschstandard – fast pris, garanti och RUT.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                    Vi städar enligt en komplett checklista: alla rum, kök (inklusive skåp och lådor invändigt), vitvaror, badrum och toaletter. Baksidor och utrymmen bakom vitvaror städas där det är åtkomligt. Som tillval kan du lägga till fönsterputs, balkong/förråd/garage och extra grovrengöring. Resultatet är en inflyttningsklar bostad som uppfyller krav från hyresvärd eller köpare.
                  </p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hemstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🏠</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">Hemstädning</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Återkommande städning – veckovis, varannan vecka eller månadsvis.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                    Hemstädning anpassad efter ditt hem och dina önskemål. Vi arbetar efter tydliga checklistor för kök, badrum, vardagsrum och sovrum, och använder skonsamma, miljövänliga produkter. Välj flexibla intervall och komplettera vid behov med tillval som fönsterputs, storstädning eller ugnsrengöring.
                  </p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Visningsstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col hFull md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🏠✨</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">Visningsstädning</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Städning anpassad för foto och visning – fokus på första intrycket.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">
                    Fokus på att lyfta helhetsintrycket: skinande kök och badrum, polerade ytor och speglar, prydligt arrangerade detaljer och doftneutralt resultat. Vi följer en visningsanpassad checklista och tidsplan i samråd med dig eller mäklaren för att maximera effekten.
                  </p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/visningsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Våra tjänster - CTA row */}
        <motion.section className="py-12 md:py-24 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 hidden md:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }} id="upptack-tjanster">Våra tjänster</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>Vi erbjuder ett komplett utbud av flytt- och städtjänster för att göra din vardag enklare.</motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra flyttjänster<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/stadtjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra städtjänster<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Våra förmåner - mobile */}
        <section className="md:hidden py-8 bg-white">
          <div className="mx-auto px-4">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Våra förmåner</h2>
              <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{featureTouchStartXRef.current=e.touches[0].clientX; if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);}} onTouchMove={(e)=>featureTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (featureTouchStartXRef.current!=null && featureTouchCurrentXRef.current!=null){ const dx=featureTouchCurrentXRef.current-featureTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentFeatureCard((prev)=>(prev+1)%totalFeatureCards);} else { setCurrentFeatureCard((prev)=>(prev-1+totalFeatureCards)%totalFeatureCards);} restartFeatureAutoSlide(); } } featureTouchStartXRef.current=null; featureTouchCurrentXRef.current=null; }}>
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}>
                  {[
                    { icon: '💰', title: 'Fast pris', description: 'Inga överraskningar – fasta priser och möjlighet till tillval', link: '/priser' },
                    { icon: '📋', title: 'RUT-avdrag', description: 'Vi hanterar allt pappersarbete för RUT-avdrag', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                    { icon: '⚡', title: 'Snabb offert', description: 'Få pris på 1 minut – Fyll enkelt formuläret högst upp på sidan', link: '#fonsterputs-offert' },
                    { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                    { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                    { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                    { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                    { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                    { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                  ].map((feature, index) => (
                    <div key={feature.icon} className="w-full flex-shrink-0">
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                        <div className="flex items-start gap-3 h-full">
                          <span className="text-2xl">{feature.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm mb-2">{feature.description}</p>
                            {feature.title === 'RUT-avdrag' && (
                              <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm inline-flex items-center">Läs mer<svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" aria-label="Föregående" onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></button>
                <button type="button" aria-label="Nästa" onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></button>
              </div>
            </div>
          </div>
        </section>
        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4">
          <img
            src="/window_worker.png"
            alt="Våra förmåner"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Desktop features grid with image */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">Våra förmåner</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {[
                        { icon: '💰', title: 'Fast pris', description: 'Inga överraskningar – fasta priser och möjlighet till tillval', link: '/priser' },
                        { icon: '📋', title: 'RUT-avdrag', description: 'Vi hanterar allt pappersarbete för RUT-avdrag', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Snabb offert', description: 'Få pris på 1 minut – Fyll enkelt formuläret högst upp på sidan', link: '#fonsterputs-offert' },
                        { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                        { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                        { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                        { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                        { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                        { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                      ].map((feature, i) => (
                        <motion.div key={feature.title} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={i}>
                          <motion.span className="text-2xl md:text-3xl" initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }} animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [-180, 20, 0], color: ['#10B981', '#34D399', '#10B981'] }} transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}>{feature.icon}</motion.span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                             {feature.title === 'RUT-avdrag' && (
                               <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center">Läs mer<svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                             )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch">
                      <img src="/window_worker.png" alt="Städpersonal i Stockholm - Flyttella" className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 2 */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12 -mb-12 md:-mb-16">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-xl md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🪟</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">Redo att börja med fönsterputs?</h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">Få en snabb och gratis offert</p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link href="#fonsterputs-offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">Få gratis offert<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/our_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>
              {/* Mobile slider */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e) => { expTouchStartXRef.current = e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); }} onTouchMove={(e) => (expTouchCurrentXRef.current = e.touches[0].clientX)} onTouchEnd={() => { if (expTouchStartXRef.current != null && expTouchCurrentXRef.current != null) { const dx = expTouchCurrentXRef.current - expTouchStartXRef.current; const th = 50; if (Math.abs(dx) > th) { if (dx < 0) { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); } else { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); } restartExperienceAutoSlide(); } } expTouchStartXRef.current = null; expTouchCurrentXRef.current = null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {[
                      { title: 'Fönsterputsningar', count: 7000 },
                      { title: 'Flyttstädningar', count: 7000 },
                      { title: 'Hemstädningar', count: 5000 }
                    ].map((card) => (
                      <div key={card.title} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h4 className="text-lg font-bold mb-1 text-white">{card.title}</h4>
                            <div className="text-4xl font-bold mb-1 text-white"><CountUp end={card.count} duration={2.0} suffix="+" /></div>
                            <p className="text-white/90 text-sm">uppdrag utförda</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" aria-label="Föregående" onClick={() => { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></button>
                  <button type="button" aria-label="Nästa" onClick={() => { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></button>
                </div>
              </div>
              {/* Desktop grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {[{ title: 'Fönsterputsningar', count: 7000 }, { title: 'Flyttstädningar', count: 7000 }, { title: 'Hemstädningar', count: 5000 }].map((card, i) => (
                  <motion.div key={card.title} className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: i * 0.25 }}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <motion.h2 className="text-xl font-bold mb-2 text-white">{card.title}</motion.h2>
                      <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={card.count} duration={2.5} suffix="+" useEasing enableScrollSpy scrollSpyOnce /></motion.div>
                      <motion.p className="text-white/90">uppdrag utförda</motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Lokal erfarenhet ger resultat</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    Med tusentals uppdrag i Stockholm har vi byggt upp en stark expertis inom fönsterputsning. Vi arbetar noggrant och effektivt med professionella verktyg och miljövänliga produkter för ett jämnt, randfritt resultat – året runt. Vi planerar efter väder och ljus när det behövs och håller tidsplanen. Vår höga kundnöjdhet är ett kvitto på att processen fungerar.
                  </p>
                </motion.div>
                {/* Badges - pyramid on mobile */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  <div className="md:hidden flex flex-col items-center">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image src="/1000reviewspicture.png" alt="1000+ positiva recensioner" width={200} height={200} className="object-contain h-36 w-36" />
                    </motion.div>
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image src="/recommendedcompany2.png" alt="Rekommenderad städfirma" width={160} height={160} className="object-contain h-32 w-32" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image src="/bestinswedenbadge-modified.png" alt="Top 10 städfirma" width={180} height={180} className="object-contain h-28 w-28" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/recommendedcompany2.png" alt="Rekommenderad städfirma" width={240} height={240} className="object-contain h-60 w-60" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/1000reviewspicture.png" alt="1000+ positiva recensioner" width={260} height={260} className="object-contain h-64 w-64 mt-3" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/bestinswedenbadge-modified.png" alt="Top 10 städfirma" width={300} height={300} className="object-contain h-48 w-48" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-48 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)' }} />
        </motion.section>

        {/* Process Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-4 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Vår process</h2>
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    Vår process för fönsterputsning är utformad för att vara enkel, trygg och effektiv. Börja med att fylla i formuläret – du får pris på 1 minut och kan bekräfta digitalt. Samma dag eller senast nästkommande vardag kontaktar vi dig för att stämma av antal fönster, åtkomlighet och eventuella tillval.
                  </p>
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    Därefter planerar vi insatsen och genomför fönsterputsningen med professionella verktyg och metoder för ett randfritt resultat – invändigt och, där det är säkert och åtkomligt, utvändigt. Om du vill kan vi även schemalägga återkommande putsning så att dina fönster håller sig kristallklara året runt.
                  </p>
                </div>
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">Priset baseras på antal fönster, åtkomlighet och tillval. Fast pris utan dolda avgifter. RUT‑avdrag hanteras automatiskt.</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">Så fungerar det</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        { icon: <FillFormLottie />, title: 'Fyll i formuläret', description: 'Berätta om din fönsterputsning' },
                        { icon: <FastLottie />, title: 'Snabb offert', description: 'Få pris på 1 minut' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personlig kontakt', description: 'Vi ringer samma dag eller dagen efter', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Signera & bekräfta', description: 'Boka digitalt', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Putsning utförd', description: 'Vi tar hand om allt', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: 'Nöjd kund', description: 'Kristallklara fönster', containerClass: 'md:-mt-6' }
                      ].map((step: any, index: number) => (
                        <motion.div key={index} className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 h-full min-h-[160px] md:min-h-0" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={index}>
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#10B981] rounded-full hidden md:block"></div>
                          <div className={`${step.containerClass || ''} w-full flex flex-col items-center justify-center`}>
                            <div className="mb-1 md:mb-2 h-16 md:h-auto flex items-center justify-center">{step.icon}</div>
                            <div className={`flex flex-col items-center justify-center w-full ${step.textClass || ''}`}>
                              <h4 className="text-white font-semibold text-sm md:text-base lg:text-lg mb-1 text-center w-full">{step.title}</h4>
                              <p className="text-white/80 text-xs md:text-sm lg:text-base text-center w-full">{step.description}</p>
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
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20 }} />
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Läs mer om fönsterputsning</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tips för randfri putsning, rätt intervall och hur du förbereder inför besök. Vi går igenom verktyg, teknik, väderförhållanden och hur du kombinerar fönsterputsning med städning för bästa effekt.</p>
              </div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/window_worker.png" alt="Fönsterputstips" className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">Fönsterputsning</span>
                      <span className="text-gray-500 text-sm ml-4">4 min läsning</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Så får du kristallklara fönster</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">Rätt verktyg, rätt teknik och rätt väder. Våra bästa tips för randfri fönsterputs, hur du undviker ränder i solsken och när det är bäst att boka utvändig puts. Plus checklista för förberedelser och säkerhet.</p>
                    <div className="flex items-center justify-end mb-4">
                      <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12">
                <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">Se alla artiklar om städning<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  { '@type': 'Question', name: 'Vad ingår i fönsterputsning?', acceptedAnswer: { '@type': 'Answer', text: 'Invändig puts och utvändig där det är säkert och åtkomligt. Karmar och fönsterbrädor ingår.' } },
                  { '@type': 'Question', name: 'Vad kostar fönsterputsning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på antal fönster, våningsplan och åtkomlighet. RUT‑avdrag ger 50% på arbetskostnaden.' } },
                  { '@type': 'Question', name: 'När är bästa tiden för fönsterputs?', acceptedAnswer: { '@type': 'Answer', text: 'Vår och höst är populära, men vi putsar året runt när vädret tillåter.' } },
                  { '@type': 'Question', name: 'Behöver jag vara hemma?', acceptedAnswer: { '@type': 'Answer', text: 'Nej, nyckel/portkod kan lämnas och hanteras tryggt av oss.' } }
                ]
              })
            }}
          />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Vanliga frågor om fönsterputsning</h2>
              <div className="space-y-4">
                {[
                  { id: 'fp-1', question: 'Hur ofta bör jag putsa fönster?', answer: '2–4 gånger per år ger ett jämnt resultat året runt.' },
                  { id: 'fp-2', question: 'Kan ni putsa utvändigt på hög höjd?', answer: 'Ja, där det är säkert och åtkomligt. Annars kan vi rekommendera alternativ.' },
                  { id: 'fp-3', question: 'Ingår fönsterkarmar?', answer: 'Ja, rengöring av karmar och fönsterbrädor ingår.' },
                  { id: 'fp-4', question: 'Kan jag avboka?', answer: 'Ja, kostnadsfri ombokning/avbokning upp till 24 timmar innan.' }
                ].map((faq, index) => (
                  <motion.div key={faq.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">{faq.question}</h3>
                      <motion.div animate={{ rotate: openFAQ === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                        <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </motion.div>
                    </button>
                    <motion.div initial={false} animate={{ height: openFAQ === faq.id ? 'auto' : 0, opacity: openFAQ === faq.id ? 1 : 0 }} transition={{ height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2, ease: 'easeInOut' } }} className="overflow-hidden">
                      <div className="px-6 pb-6"><p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p></div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <LocationsCard locations={locations} />
      </div>
    </main>
  );
}


