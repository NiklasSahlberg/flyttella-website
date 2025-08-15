'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import FlyttoffertForm from '../components/FlyttoffertForm'
import StadningOffertFormCustomAkersberga from '../components/StadningOffertFormCustomAkersberga'
import ReviewsWidget from '../components/ReviewsWidget'
import LocationsCard from '../components/LocationsCard'
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CountUp from "react-countup";
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

// Animation variants
const variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

// Lottie component functions
function FillFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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

function CleanHomeLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
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

export default function KontorsstadningPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Experience cards (mobile slider)
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
    featureIntervalRef.current = setInterval(() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); }, 4000);
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
          {/* Mobile: Form only */}
          <div className="md:hidden mx-auto px-4 pb-2" id="kontor-offert">
            {selectedServiceType === 'flyttstad' ? (
              <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
            ) : (
              <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} />
            )}
          </div>
          
          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/cleaning_background.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">Professionell kontorsstädning i Stockholm</h1>
                  <p className="text-2xl md:text-3xl mb-12">Regelbunden städning för företag</p>
                  <p className="text-lg text-white/90">Vi erbjuder professionell kontorsstädning anpassad efter ert schema. Fast pris, RUT-avdrag och en ren arbetsmiljö för era medarbetare.</p>
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

        {/* What is Kontorsstädning Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {/* Sidebar service cards (desktop) */}
                <div className="hidden lg:block absolute -right-72 top-[1385px] w-64">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧽</span><h3 className="text-xl font-bold text-white">Flyttstädning</h3></div>
                      <p className="text-sm text-gray-100 mb-4 relative">Grundlig flyttstädning enligt branschstandard – fast pris och 14 dagars garanti.</p>
                      <div className="mt-auto relative">
                        <Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute -right-72 top-[1570px] w-64">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🏡</span><h3 className="text-xl font-bold text-white">Hemstädning</h3></div>
                      <p className="text-sm text-gray-100 mb-4 relative">Regelbunden hemstädning anpassad efter dina behov och önskemål.</p>
                      <div className="mt-auto relative">
                        <Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute -right-72 top-[1830px] w-64">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧱</span><h3 className="text-xl font-bold text-white">Byggstädning</h3></div>
                      <p className="text-sm text-gray-100 mb-4 relative">Professionell städning efter renovering – grov- och finstädning.</p>
                      <div className="mt-auto relative">
                        <Link href="/byggstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Reco Widget - Positioned absolutely to the right (desktop) */}
                <div className="hidden lg:block absolute -right-72 top-[16rem] w-72 z-40">
                  <div className="sticky top-8">
                    <iframe src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5" className="w-full h-[1000px] border-0" title="Flyttella recensioner" />
              </div>
            </div>

                {/* Main content sections */}
                {([
                  {
                    title: 'Vad är kontorsstädning?',
                    content:
                      'Kontorsstädning är regelbunden professionell städning av kontorslokaler och arbetsplatser. Vi anpassar städningen efter ert schema och behov – från daglig städning till veckovis underhåll. Vårt erfarna team använder miljövänliga produkter och moderna metoder för att skapa en ren, hälsosam och trivsam arbetsmiljö. Med kontorsstädning från Flyttella får ni en pålitlig partner som säkerställer att era lokaler alltid håller hög standard. Vi arbetar efter tydliga checklistor och erbjuder flexibla lösningar anpassade efter företagets storlek och verksamhet. Allt för att er kontorsstädning i Stockholm ska bli enkel, prisvärd och professionell.',
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/office-moving.png" alt="Kontorsstädning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Vad kostar kontorsstädning?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">Priset för kontorsstädning beror på lokalernas storlek, städfrekvens och omfattning. Med RUT-avdrag blir kontorsstädning mycket prisvärt. Begär en kostnadsfri offert – vi ger er ett fast, transparent pris utan dolda avgifter.</p>
                        <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;Ett rent kontor skapar en bättre arbetsmiljö för alla – professionellt och välorganiserat!&quot;</p><p className="italic text-gray-700 mt-2">- Maria, Kontorschef</p></div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'Vad ingår i kontorsstädning?',
                    content:
                      'Dammsugning och våttorkning av golv, tömning av papperskorgar, torkning av skrivbord och arbetsstationer, rengöring av kök/pentry (diskho, bänkar, mikrovågsugn), städning av toaletter och tvättställ, putsning av speglar och glaspartier, damning av fönsterbrädor och kontorsmöbler. Miljövänliga produkter används för en hälsosam arbetsmiljö.',
                    icon: '🏢'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/cleaning_lady.png" alt="Kontorsstädning service" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Hur bokar jag kontorsstädning?',
                    content:
                      'Boka enkelt via formuläret ovan – ange lokalernas storlek, önskad städfrekvens och eventuella särskilda behov. Ni får pris direkt och kan bekräfta digitalt. Vi kontaktar er samma dag eller nästa vardag för att stämma av detaljer, åtkomst och schema. Inför första städningen kan ni enkelt dela nyckelkoder eller instruktioner. Ni kan ändra schema eller pausa tjänsten när som helst med kort varsel.',
                    icon: '📅'
                  }
                ] as { title: string; content: any; icon: string }[]).map((section, index) => (
                  <motion.div key={index} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                    <div className="max-w-6xl mx-auto">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">{section.title}</h3>
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

        {/* Om Flyttella Section */}
        <motion.section 
          className="relative overflow-hidden" 
          style={{ 
            paddingTop: '8rem', 
            paddingBottom: '8rem', 
            borderTop: 'none', 
            boxShadow: 'none' 
          }} 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(/cleaning_background.png)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center 70%', 
              zIndex: 0 
            }} 
          />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'}}></div>
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)'}}></div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Om Flyttella</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                {/* Left: Image - desktop only */}
                <motion.div 
                  className="hidden lg:block w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" 
                  initial="initial" 
                  whileInView="animate" 
                  viewport={{ once: true, amount: 0.2 }} 
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                    <img 
                      src="/cleaning_lady.png" 
                      alt="Om Flyttella" 
                      className="object-cover rounded-2xl w-full h-full" 
                      style={{ objectPosition: '30% 25%', transform: 'scale(1.10)' }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center" 
                  initial="initial" 
                  whileInView="animate" 
                  viewport={{ once: true, amount: 0.2 }} 
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är en erfaren städfirma i Stockholm som erbjuder professionell kontorsstädning för företag av alla storlekar. Vi arbetar med fasta priser, tydliga checklistor och flexibel service anpassad efter ert schema.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vårt team använder miljövänliga produkter och moderna metoder för att skapa en ren, hälsosam arbetsmiljö. Vi förstår att varje företag har unika behov och anpassar därför våra tjänster efter er verksamhet.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Med många års erfarenhet av kontorsstädning i Stockholm levererar vi pålitlig service som gör att ni kan fokusera på ert kärnverksamhet. Snabb kommunikation och flexibla lösningar.</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är en erfaren städfirma i Stockholm med specialisering på kontorsstädning för företag.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Fasta priser, miljövänliga produkter och flexibel service anpassad efter ert schema.</p>
                    {!showFullAboutText && (
                      <button onClick={() => setShowFullAboutText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    )}
                    {showFullAboutText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="space-y-4 mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vi levererar pålitlig kontorsstädning som gör att ni kan fokusera på er kärnverksamhet. Professionell service med personlig kontakt.</p>
                        <motion.div className="pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                          <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer om oss<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        {/* Mobile image below the section */}
        <div className="lg:hidden px-4 mt-6">
          <img src="/cleaning_lady.png" alt="Om Flyttella" className="w-full h-auto rounded-2xl shadow-lg object-contain" />
        </div>

        {/* Reviews Widget */}
        <ReviewsWidget 
          location="Stockholm" 
          title="Vad tycker våra kunder om oss?" 
          subtitle="Pålitlig kontorsstädning i Stockholm" 
          description="Professionell kontorsstädning i Stockholm – regelbunden städning för företag. Fast pris och RUT-avdrag. Pålitliga städare och höga betyg. Läs vad våra företagskunder tycker om vår kontorsstädning i Stockholm." 
          badgeAlt="Erfarenhet av kontorsstädning i Stockholm" 
          arrowText="Läs vad våra kunder säger om vår kontorsstädning" 
        />

        {/* CTA: Redo att börja er kontorsstädning? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🧹</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">Redo att börja er kontorsstädning?</h3><p className="text-base md:text-lg text-gray-100 leading-snug">Få en snabb och gratis offert</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="#kontor-offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">Få gratis offert<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Våra Städtjänster</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Kontorsflytt Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏢</span><h3 className="text-3xl md:text-5xl font-bold text-white">Kontorsflytt</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Effektiv kontorsflytt med minimal störning av verksamheten – planering, genomförande och efterarbete.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi hanterar hela processen från planering till genomförande. Professionell hantering av IT-utrustning, möbler och dokument. Minimal störning av verksamheten.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/kontorsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Hemstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏡</span><h3 className="text-3xl md:text-5xl font-bold text-white">Hemstädning</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Regelbunden hemstädning – veckovis, varannan vecka eller månadsvis. Fast pris och 50% RUT‑avdrag.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi anpassar städningen efter dina behov och önskemål – från kök och badrum till vardagsrum och sovrum. Miljövänliga produkter och flexibla intervaller. Som tillval erbjuds fönsterputs och storstädning. Samma erfarna städare för kontinuitet och trygghet.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Flyttstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧽</span><h3 className="text-3xl md:text-5xl font-bold text-white">Flyttstädning</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Grundlig flyttstädning enligt branschstandard – fast pris, 14 dagars garanti och full RUT‑hantering.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi städar enligt en komplett checklista: alla rum, kök (inkl. skåp och lådor invändigt), vitvaror, badrum och toaletter. Baksidor och utrymmen bakom vitvaror städas där det är åtkomligt. Som tillval kan du välja fönsterputs, balkong/förråd/garage och extra grovrengöring. Resultatet är en inflyttningsklar bostad som uppfyller krav från hyresvärd eller köpare.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: 'Vad ingår i kontorsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Dammsugning, våttorkning av golv, tömning av papperskorgar, torkning av skrivbord, rengöring av kök/pentry och toaletter.' } }, { '@type': 'Question', name: 'Vad kostar kontorsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på lokalernas storlek, städfrekvens och omfattning. RUT‑avdrag ger 50% på arbetskostnaden.' } }, { '@type': 'Question', name: 'Kan ni städa utanför kontorstid?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, vi anpassar städningen efter ert schema och kan arbeta kvällar och helger.' } }, { '@type': 'Question', name: 'Hur ofta ska man städa kontoret?', acceptedAnswer: { '@type': 'Answer', text: 'Beror på antal medarbetare och verksamhet. Vanligt är 1-3 gånger per vecka.' } } ] }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Vanliga frågor om kontorsstädning</h2>
              <div className="space-y-4">
                {[
                  { id: 'kontor-1', question: 'Vilka miljövänliga produkter använder ni?', answer: 'Vi använder certifierade miljövänliga rengöringsmedel som är säkra för både medarbetare och miljö, utan starka kemikalier eller allergiframkallande ämnen.' },
                  { id: 'kontor-2', question: 'Kan ni arbeta när kontoret är öppet?', answer: 'Ja, vi anpassar städningen efter er verksamhet och kan arbeta tidigt på morgonen, sent på kvällen eller helger för minimal störning.' },
                  { id: 'kontor-3', question: 'Vad händer om något går sönder?', answer: 'Vi har full ansvarsförsäkring som täcker eventuella skador. Vi hanterar alla ärenden snabbt och professionellt.' },
                  { id: 'kontor-4', question: 'Kan vi ändra städfrekvensen?', answer: 'Ja, ni kan enkelt justera städfrekvensen eller pausa tjänsten med kort varsel för att anpassa efter era behov.' }
                ].map((faq, index) => (
                  <motion.div key={faq.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"><h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">{faq.question}</h3><motion.div animate={{ rotate: openFAQ === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0"><svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></motion.div></button>
                    <motion.div initial={false} animate={{ height: openFAQ === faq.id ? 'auto' : 0, opacity: openFAQ === faq.id ? 1 : 0 }} transition={{ height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2, ease: 'easeInOut' } }} className="overflow-hidden"><div className="px-6 pb-6"><p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p></div></motion.div>
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
