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
          
          {/* Mobile: Hero content after form removed per request */}
          
          {/* Mobile: Hero section */}
          <div className="md:hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ 
                  backgroundImage: 'url(/nystadat_kontor.png)',
                  backgroundPosition: 'center 50%'
                }}
              />
              <div className="relative z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  Professionell kontorsstädning i Stockholm
                </h1>
                <p className="text-xl mb-6">
                  Regelbunden städning för företag
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/nystadat_kontor.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">Professionell kontorsstädning i Stockholm</h1>
                  <p className="text-2xl md:text-3xl mb-12">Regelbunden städning för företag</p>
                  <p className="text-lg text-white/90">Vi erbjuder professionell kontorsstädning anpassad efter ert schema. Löpande priser och en ren arbetsmiljö för era medarbetare.</p>
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
        <section className="py-6 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {/* Sidebar service cards (desktop) */}
                <div className="hidden lg:block absolute -right-72 top-[1385px] w-64">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧽</span><h3 className="text-xl font-bold text-white">Flyttstädning</h3></div>
                      <p className="text-sm text-gray-100 mb-4 relative">Grundlig flyttstädning enligt branschstandard – löpande priser och 14 dagars garanti.</p>
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
                        <img src="/nystadat_kontor2.png" alt="Kontorsstädning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Vad kostar kontorsstädning?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">Priset för kontorsstädning beror på lokalernas storlek, städfrekvens och omfattning. Begär en kostnadsfri offert – vi arbetar med löpande priser utan dolda avgifter.</p>
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
                        <img src="/nystadat_kontor.png" alt="Kontorsstädning service" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
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
              {/* Mobile image above title to match Bohagsflytt */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/omflyttella_flyttstad.png" alt="Om Flyttella" className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

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
                      src="/omflyttella_flyttstad.png" 
                      alt="Om Flyttella Städ" 
                      className="object-cover rounded-2xl w-full h-full" 
                      style={{ objectPosition: '80% 25%', transform: 'scale(1.10)' }}
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
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är en erfaren städfirma i Stockholm som erbjuder professionell kontorsstädning för företag av alla storlekar. Vi arbetar med löpande priser, tydliga checklistor och flexibel service anpassad efter ert schema.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vårt team använder miljövänliga produkter och moderna metoder för att skapa en ren, hälsosam arbetsmiljö. Vi förstår att varje företag har unika behov och anpassar därför våra tjänster efter er verksamhet.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Med många års erfarenhet av kontorsstädning i Stockholm levererar vi pålitlig service som gör att ni kan fokusera på ert kärnverksamhet. Snabb kommunikation och flexibla lösningar.</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är en erfaren städfirma i Stockholm med specialisering på kontorsstädning för företag.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Löpande priser, miljövänliga produkter och flexibel service anpassad efter ert schema.</p>
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

        {/* Reviews Widget */}
        <ReviewsWidget 
          location="Stockholm" 
          title="Vad tycker våra kunder om oss?" 
          subtitle="Pålitlig kontorsstädning i Stockholm" 
          description="Professionell kontorsstädning i Stockholm – regelbunden städning för företag. Löpande priser och pålitliga städare med höga betyg. Läs vad våra företagskunder tycker om vår kontorsstädning i Stockholm." 
          badgeAlt="Erfarenhet av kontorsstädning i Stockholm" 
          arrowText="Läs vad våra kunder säger om vår kontorsstädning" 
        />

        {/* CTA: Redo att börja er kontorsstädning? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🧹</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">Redo att börja er kontorsstädning?</h3><p className="text-base md:text-lg text-gray-100 leading-snug">Få en snabb och gratis offert</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">Få gratis offert<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Våra andra huvudtjänster</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Kontorsflytt Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏢</span><h3 className="text-3xl md:text-5xl font-bold text-white">Kontorsflytt</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Effektiv kontorsflytt med minimal störning av verksamheten – planering, genomförande och efterarbete.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi hanterar hela processen från planering till genomförande. Professionell hantering av IT-utrustning, möbler och dokument. Minimal störning av verksamheten.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/kontorsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Bemanning och underentreprenad Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🔧</span><h3 className="text-3xl md:text-5xl font-bold text-white">Bemanning och underentreprenad</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Professionell bemanning för era projekt – kvalificerad personal och pålitliga underentreprenörer.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi tillhandahåller erfaren personal för både kortsiktiga och långsiktiga uppdrag. Våra underentreprenörer är noggrant utvalda och kvalitetssäkrade. Flexibla lösningar anpassade efter era specifika behov och krav.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/bemanning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Flyttstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧽</span><h3 className="text-3xl md:text-5xl font-bold text-white">Flyttstädning</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Grundlig flyttstädning enligt branschstandard – löpande priser, 14 dagars garanti och professionell service.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vi städar enligt en komplett checklista: alla rum, kök (inkl. skåp och lådor invändigt), vitvaror, badrum och toaletter. Baksidor och utrymmen bakom vitvaror städas där det är åtkomligt. Som tillval kan du välja fönsterputs, balkong/förråd/garage och extra grovrengöring. Resultatet är en inflyttningsklar bostad som uppfyller krav från hyresvärd eller köpare.</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
            </div>
          </div>
        </div>
      </section>

        {/* Våra förmåner - Mobile slider */}
        <section className="md:hidden py-8 bg-white">
          <div className="mx-auto px-4">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Våra förmåner</h2>
              <div className="relative overflow-hidden rounded-xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}>
                  {[
                    { icon: "💰", title: "Löpande priser", description: "Transparenta löpande priser – du vet vad du betalar för", link: "/priser" },
                    { icon: "✅", title: "Kvalitetsgaranti", description: "Vi är så säkra på vår kvalitet att vi erbjuder nöjd kund-garanti", link: "/garanti" },
                    { icon: "⏰", title: "Flexibla tider", description: "Vi anpassar städningen efter ert schema - kvällar och helger", link: "/kontakt" },
                    { icon: "🔒", title: "Försäkring", description: "Full ansvarsförsäkring och alla nödvändiga tillstånd på plats", link: "/tillstand" },
                    { icon: "🎓", title: "Utbildad personal", description: "Vår personal är utbildad för kontorsmiljöer och professionell service", link: "/om-oss" },
                    { icon: "🧴", title: "Miljövänliga produkter", description: "Vi använder certifierade miljövänliga rengöringsmedel", link: "/om-oss" },
                    { icon: "📈", title: "Regelbunden service", description: "Pålitlig och konsekvent städning enligt överenskommen frekvens", link: "/om-oss" },
                    { icon: "🦺", title: "Trygg arbetsmiljö", description: "Vi prioriterar säkerhet för både kunder och personal", link: "/om-oss" },
                    { icon: "📞", title: "Personlig kontakt", description: "Direkt kontakt med er kontaktperson för snabb service och support", link: "/kontakt" }
                  ].map((feature, index) => (
                    <div key={feature.icon} className="w-full flex-shrink-0">
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                        <div className="flex items-start gap-3 h-full">
                          <span className="text-2xl">{feature.icon}</span>
              <div className="flex-1">
                            <h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4>
                                                         <p className="text-white/80 text-sm mb-2">{feature.description}</p>
                             <div className="h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Arrow controls */}
                <button type="button" aria-label="Föregående" onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button type="button" aria-label="Nästa" onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Våra förmåner */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  {/* Left side - Features content */}
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">Våra förmåner</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                                             {[
                        { icon: "💰", title: "Löpande priser", description: "Transparenta löpande priser – du vet vad du betalar för", link: "/priser" },
                        { icon: "✅", title: "Kvalitetsgaranti", description: "Vi är så säkra på vår kvalitet att vi erbjuder nöjd kund-garanti", link: "/garanti" },
                        { icon: "⏰", title: "Flexibla tider", description: "Vi anpassar städningen efter ert schema - kvällar och helger", link: "/kontakt" },
                        { icon: "🔒", title: "Försäkring", description: "Full ansvarsförsäkring och alla nödvändiga tillstånd på plats", link: "/tillstand" },
                        { icon: "🎓", title: "Utbildad personal", description: "Vår personal är utbildad för kontorsmiljöer och professionell service", link: "/om-oss" },
                        { icon: "🧴", title: "Miljövänliga produkter", description: "Vi använder certifierade miljövänliga rengöringsmedel", link: "/om-oss" },
                        { icon: "📈", title: "Regelbunden service", description: "Pålitlig och konsekvent städning enligt överenskommen frekvens", link: "/om-oss" },
                        { icon: "🦺", title: "Trygg arbetsmiljö", description: "Vi prioriterar säkerhet för både kunder och personal", link: "/om-oss" },
                        { icon: "📞", title: "Personlig kontakt", description: "Direkt kontakt med er kontaktperson för snabb service och support", link: "/kontakt" }
                                             ].map((feature, index) => (
                         <motion.div key={feature.icon} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                           <span className="text-2xl md:text-3xl">{feature.icon}</span>
              <div className="flex-1">
                             <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                             <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                             <div className="h-6" />
                           </div>
                         </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Right side - Image */}
                  <div className="flex-1 w-full lg:w-auto flex items-center justify-center min-h-[420px]">
                    <div className="relative w-full max-w-md h-full flex items-center">
                      <img src="/varafarmaner_flyttstad.png" alt="Våra förmåner" className="w-full h-full object-cover rounded-xl shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4">
          <img
            src="/varafarmaner_flyttstad.png"
            alt="Våra förmåner"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Redo att börja er kontorsstädning? */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12">
          <div className="mx-auto px-4">
            <motion.div
              className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🏢</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
                    Redo att börja er kontorsstädning?
                  </h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">
                    Få en snabb och gratis offert på er kontorsstädning
                  </p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button
                    onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
                  >
                    Få gratis offert
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vår erfarenhet */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/our_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>
              {/* Mobile: auto-sliding cards */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{expTouchStartXRef.current=e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);}} onTouchMove={(e)=>expTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (expTouchStartXRef.current!=null && expTouchCurrentXRef.current!=null){ const dx=expTouchCurrentXRef.current-expTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentExperienceCard((prev)=>(prev+1)%totalExperienceCards);} else { setCurrentExperienceCard((prev)=>(prev-1+totalExperienceCards)%totalExperienceCards);} restartExperienceAutoSlide(); } } expTouchStartXRef.current=null; expTouchCurrentXRef.current=null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {[
                      { title: 'Kontorsstädningar', count: 7000 },
                      { title: 'Kontorsflyttstädningar', count: 2000 },
                      { title: 'Hemstädningar', count: 5000 },
                    ].map((card, index) => (
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
                  {/* Arrow controls */}
                  <button type="button" aria-label="Föregående" onClick={() => { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </button>
                  <button type="button" aria-label="Nästa" onClick={() => { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>
              </div>

              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 0 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">Kontorsstädningar</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={7000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 1 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">Kontorsflyttstädningar</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={2000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: 2 * 0.25 }}>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.h2 className="text-xl font-bold mb-2 text-white">Hemstädningar</motion.h2>
                    <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={5000} duration={2.5} suffix="+" useEasing={true} enableScrollSpy={true} scrollSpyOnce={true} /></motion.div>
                    <motion.p className="text-white/90">uppdrag utförda</motion.p>
                  </div>
                </motion.div>
            </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Lokal erfarenhet ger resultat</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    Med tusentals städningar bakom oss har vi byggt upp en unik expertis inom kontorsstädning i Stockholm. Vi hjälper både privatpersoner och företag till skinande rena kontor och arbetsplatser. Vårt erfarna team arbetar alltid noggrant och effektivt, med miljövänliga produkter och modern utrustning. Vi strävar efter att överträffa dina förväntningar vid varje uppdrag och är stolta över vår höga kundnöjdhet.
                  </p>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  {/* Mobile pyramid layout */}
                  <div className="md:hidden flex flex-col items-center">
                    {/* Top badge */}
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image
                        src="/1000reviewspicture.png"
                        alt="1000+ positiva recensioner från kunder"
                        width={200}
                        height={200}
                        className="object-contain h-36 w-36"
                        priority={false}
                      />
                    </motion.div>
                    {/* Bottom row */}
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/recommendedcompany2.png"
                          alt="Rekommenderad kontorsstädfirma - Flyttella"
                          width={160}
                          height={160}
                          className="object-contain h-32 w-32"
                          priority={false}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/bestinswedenbadge-modified.png"
                          alt="Top 10 kontorsstädfirma - Flyttella"
                          width={180}
                          height={180}
                          className="object-contain h-28 w-28"
                          priority={false}
                        />
                      </motion.div>
                    </div>
                  </div>
                  {/* Desktop horizontal layout */}
                  <div className="hidden md:flex items-center justify-center gap-6">
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/recommendedcompany2.png"
                      alt="Rekommenderad kontorsstädfirma - Flyttella"
                      width={240}
                      height={240}
                      className="object-contain h-60 w-60"
                      priority={false}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/1000reviewspicture.png"
                      alt="1000+ positiva recensioner från kunder"
                      width={260}
                      height={260}
                      className="object-contain h-64 w-64 mt-3"
                      priority={false}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                    <Image
                      src="/bestinswedenbadge-modified.png"
                      alt="Top 10 kontorsstädfirma - Flyttella"
                      width={300}
                      height={300}
                      className="object-contain h-48 w-48"
                      priority={false}
                    />
                  </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vår process */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-4 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  Vår process
            </h2>

                {/* Process Description */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    Vår kontorsstädningsprocess är designad för att vara enkel, transparent och trygg. Det börjar med att du fyller i vårt formulär där du anger dina uppgifter och städbehov. Inom en minut får du en offert skickad till din angivna e-postadress. Samma dag eller dagen efter tar vi personlig kontakt med dig för att diskutera detaljerna och svara på eventuella frågor. När du är nöjd med offerten kan du enkelt signera den digitalt. Sedan genomför vi städningen enligt dina önskemål och avtal. Resultatet? En nöjd kund som kan lämna sitt kontor i perfekt skick.
                  </p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">
                    Våra offerter är alltid baserade på dina specifika behov och omständigheter. Vi tar hänsyn till faktorer som kontorsyta, antal rum, tillgänglighet och städkrav för att ge dig en offert som passar just din situation. Alla priser är löpande utan dolda avgifter - vi utgår alltid från dina önskemål och information vi får från dig som kund. Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.
              </p>
            </div>

                {/* Process Flow Section */}
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">Så fungerar det</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        {
                          icon: <FillFormLottie />,
                          title: "Fyll i formuläret",
                          description: "Berätta om din kontorsstädning",
                          textClass: ""
                        },
                        {
                          icon: <FastLottie />,
                          title: "Snabb offert",
                          description: "Få pris på 1 minut",
                          textClass: ""
                        },
                        {
                            icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
                          title: "Personlig kontakt",
                          description: "Vi ringer samma dag eller dagen efter",
                            containerClass: "md:-mt-7",
                          textClass: ""
                        },
                        {
                            icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
                          title: "Signera & bekräfta",
                          description: "Få bokningsbekräftelse direkt",
                            containerClass: "md:-mt-6",
                          textClass: ""
                        },
                        {
                            icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
                          title: "Städning genomförd",
                          description: "Vi tar hand om allt - från start till slut",
                            containerClass: "md:-mt-14",
                            textClass: "md:-mt-8",
                        },
                        {
                            icon: <div className="md:mt-0"><CleanHomeLottie /></div>,
                          title: "Nöjd kund",
                          description: "Återkommande kund",
                            containerClass: "md:-mt-6",
                          textClass: ""
                        }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                            className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 h-full min-h-[160px] md:min-h-0"
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, amount: 0.2 }}
                          variants={fadeInUp}
                          custom={index}
                        >
                          {/* Timeline dot */}
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
          {/* White gradient fade to blend into next section */}
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20}} />
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                  Läs mer om kontorsstädning i Stockholm
            </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Få värdefulla tips och råd för professionell kontorsstädning
                </p>
              </div>
              <motion.div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src="/cleaning_lady.png" 
                      alt="Kontorsstädtips Stockholm" 
                      className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Kontorsstädning
                      </span>
                      <span className="text-gray-500 text-sm ml-4">5 min läsning</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
                      Vad bör du tänka på när du väljer kontorsstädfirma
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Att välja rätt kontorsstädfirma är avgörande för en professionell arbetsmiljö. I denna guide går vi igenom de viktigaste faktorerna du bör tänka på - från kvalitetsgaranti och miljövänliga produkter till kundrecensioner och pristransparens. Lär dig hur du identifierar en seriös kontorsstädfirma som levererar kvalitet och trygghet för ditt kontor.
                    </p>
                    <div className="flex items-center justify-end mb-4">
                      <Link 
                        href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-kontorsstadfirma" 
                        className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group"
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
          </div>

                  </div>
                </div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12">
                      <Link 
                        href="/blogg" 
                  className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base"
                      >
                        Se alla artiklar om städning
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                      </Link>
                    </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: 'Vad ingår i kontorsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Dammsugning, våttorkning av golv, tömning av papperskorgar, torkning av skrivbord, rengöring av kök/pentry och toaletter.' } }, { '@type': 'Question', name: 'Vad kostar kontorsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på lokalernas storlek, städfrekvens och omfattning. Vi arbetar med löpande priser utan dolda avgifter.' } }, { '@type': 'Question', name: 'Kan ni städa utanför kontorstid?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, vi anpassar städningen efter ert schema och kan arbeta kvällar och helger.' } }, { '@type': 'Question', name: 'Hur ofta ska man städa kontoret?', acceptedAnswer: { '@type': 'Answer', text: 'Beror på antal medarbetare och verksamhet. Vanligt är 1-3 gånger per vecka.' } } ] }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Vanliga frågor om kontorsstädning</h2>
              <div className="space-y-4">
                {[
                  { id: 'kontor-1', question: 'Erbjuder ni engångsstädning eller bara regelbunden städning?', answer: 'Vi erbjuder både engångsstädning och regelbunden kontorsstädning. Många kunder börjar med en engångsstädning och övergår sedan till regelbunden service.' },
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
