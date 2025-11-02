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

// Lottie helpers at module scope to avoid remount flicker
function FillFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch('/fillform.json').then((res) => res.json()).then(setAnimationData);
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
    fetch('/fast.json').then((res) => res.json()).then(setAnimationData);
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
    fetch('/phonecall.json').then((res) => res.json()).then(setAnimationData);
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
    fetch('/signform.json').then((res) => res.json()).then(setAnimationData);
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
    fetch('/movingtruck.json').then((res) => res.json()).then(setAnimationData);
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
    fetch('/happycustomer.json').then((res) => res.json()).then(setAnimationData);
  }, []);
  if (!animationData) return null;
  return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
}

export default function VisningsstadningPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState(0);
  const featureTouchStartXRef = useRef<number | null>(null);
  const featureTouchCurrentXRef = useRef<number | null>(null);
  const totalFeatureCards = 9;
  const featureIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Vår erfarenhet (mobile slider)
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
    return () => {
      if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);
    };
  }, [totalExperienceCards]);

  const restartFeatureAutoSlide = () => {
    if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    featureIntervalRef.current = setInterval(() => {
      setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards);
    }, 4000);
  };
  useEffect(() => {
    restartFeatureAutoSlide();
    return () => {
      if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    };
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

  const { t, locale } = useLanguage();

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
                  backgroundImage: 'url(/fonsterputs_info.png)',
                  backgroundPosition: 'center 50%'
                }}
              />
              <div className="relative z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  {locale === 'sv' ? 'Professionell visningsstädning i Stockholm' : 'Professional Viewing Cleaning in Stockholm'}
                </h1>
                <p className="text-xl mb-6">
                  {locale === 'sv' ? 'Maximera intrycket inför försäljningen' : 'Maximize the impression before sale'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
          {/* Desktop hero */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/fonsterputs_info.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">{locale === 'sv' ? 'Professionell visningsstädning i Stockholm' : 'Professional Viewing Cleaning in Stockholm'}</h1>
                  <p className="text-2xl md:text-3xl mb-12">{locale === 'sv' ? 'Maximera intrycket inför försäljningen' : 'Maximize the impression before sale'}</p>
                  <p className="text-lg text-white/90">{locale === 'sv' ? 'Skinande kök och badrum, polerade ytor och doftneutralt resultat – anpassat för fotografering och visning.' : 'Sparkling kitchen and bathroom, polished surfaces and odor-neutral result – adapted for photography and viewing.'}</p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} cleaningCardSubtitle={locale === 'sv' ? 'Professionell visningsstädning – skinande kök, badrum och blanka ytor för fotografering och visning' : 'Professional viewing cleaning – sparkling kitchen, bathroom and shiny surfaces for photography and viewing'} />
                  )}
                </div>
              </div>
              
              {/* Läs mer button with arrow down */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <button
                    onClick={() => {
                      const element = document.getElementById('content');
                      if (element) {
                        const headerHeight = 80; // Approximate header height
                        const elementPosition = element.offsetTop - headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="flex flex-col items-center text-white hover:text-white/80 transition-colors group"
                  >
                    <span className="text-sm font-medium mb-2">{locale === 'sv' ? 'Läs mer' : 'Read more'}</span>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg 
                        className="w-6 h-6 group-hover:scale-110 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* What is Visningsstädning */}
        <section id="content" className="relative pt-2 pb-12 md:pt-2 md:pb-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {(locale === 'sv' ? [
                  {
                    title: 'Vad är visningsstädning?',
                    content:
                      'Visningsstädning är en noggrant utförd städning anpassad för fotografering och visning inför försäljning. Fokus ligger på att framhäva bostadens bästa sidor: skinande ytor, fräscht kök och badrum samt ett prydligt helhetsintryck. Vi arbetar efter en visningsanpassad checklista och planerar tillsammans med dig eller din mäklare vid behov.',
                    icon: '✨'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/fonsterputs_info.webp" alt="Visningsstädning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Vad kostar visningsstädning?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">
                          Pris för visningsstädning beror på boyta, planlösning och grad av förberedelse. Med 50% RUT‑avdrag på arbetskostnaden blir visningsstädning prisvärd. Begär en kostnadsfri offert – du får pris snabbt och enkelt. Faktorer som påverkar priset är bland är boyta, fönsterputs som tillval och bostadens skick. Vi lämnar alltid ett fast, transparent pris utan dolda avgifter så att du vet exakt vad som ingår i din visningsstädning.
                        </p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            "Bostaden såg fantastisk ut på bilderna och under visningen – städningen gjorde verkligen skillnad!"
                          </p>
                          <p className="italic text-gray-700 mt-2">- Niloufar</p>
                        </div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'Vad ingår i visningsstädning?',
                    content:
                      'Visningsstädning innefattar dammtorkning av fria ytor, avtorkning av lister, dörrar och handtag, puts av speglar och blanka ytor, noggrann rengöring av kök (arbetsbänkar, spishäll, diskho, vitvarors utsidor) och badrum (handfat, dusch/badkar, toalett). Golv dammsugs och moppas, och detaljer arrangeras för ett prydligt intryck. Som tillval erbjuder vi fönsterputs, punktinsatser i kök/badrum och doftneutralisering. Vi använder miljövänliga produkter och arbetar efter en tydlig checklista.',
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/cleaning_background.webp" alt="Boka visningsstädning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Hur bokar jag visningsstädning?',
                    content:
                      'Boka snabbt och enkelt via formuläret högst upp på sidan: fyll i dina uppgifter, välj datum och tid och lägg till eventuella tillval som fönsterputs. Du får pris direkt och en bekräftelse via e‑post och SMS. Vi kontaktar dig samma dag eller nästkommande vardag för att stämma av boyta och tidsplan inför fotografering och visning. Därefter bekräftar vi starttid – enkelt och tryggt. Du kan justera bokningen via vår kundtjänst. RUT‑avdraget (50% på arbetskostnaden) sköts automatiskt. Kostnadsfri ombokning/avbokning upp till 24 timmar innan.',
                    icon: '📅'
                  }
                ] : [
                  {
                    title: 'What is Viewing Cleaning?',
                    content:
                      'Viewing cleaning is a carefully performed cleaning adapted for photography and viewing before sale. The focus is on highlighting the property\'s best sides: shiny surfaces, fresh kitchen and bathroom and a tidy overall impression. We work according to a viewing-adapted checklist and plan together with you or your real estate agent when needed.',
                    icon: '✨'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/fonsterputs_info.webp" alt="Viewing Cleaning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'What does Viewing Cleaning Cost?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">
                          Price for viewing cleaning depends on floor area, layout and degree of preparation. With 50% RUT deduction on labor costs, viewing cleaning becomes cost-effective. Request a free quote – you get a price quickly and easily. Factors that affect the price include floor area, window cleaning as an option and the property\'s condition. We always provide a fixed, transparent price without hidden fees so you know exactly what is included in your viewing cleaning.
                        </p>
                        <div className="my-16 text-center">
                          <p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
                            "The property looked fantastic in the pictures and during the viewing – the cleaning really made a difference!"
                          </p>
                          <p className="italic text-gray-700 mt-2">- Niloufar</p>
                        </div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'What is Included in Viewing Cleaning?',
                    content:
                      'Viewing cleaning includes dust wiping of free surfaces, wiping of moldings, doors and handles, polishing of mirrors and shiny surfaces, thorough cleaning of kitchen (worktops, stove, sink, appliance exteriors) and bathroom (sink, shower/bathtub, toilet). Floors are vacuumed and mopped, and details are arranged for a tidy impression. As options we offer window cleaning, spot treatments in kitchen/bathroom and odor neutralization. We use eco-friendly products and work according to a clear checklist.',
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12">
                        <img src="/cleaning_background.webp" alt="Book Viewing Cleaning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
                      </div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'How do I Book Viewing Cleaning?',
                    content:
                      'Book quickly and easily via the form at the top of the page: fill in your details, choose date and time and add any options like window cleaning. You get a price immediately and a confirmation via email and SMS. We contact you the same day or next business day to coordinate floor area and schedule before photography and viewing. Then we confirm start time – simple and safe. You can adjust the booking via our customer service. The RUT deduction (50% of labor costs) is handled automatically. Free rescheduling/cancellation up to 24 hours before.',
                    icon: '📅'
                  }
                ] as { title: string; content: any; icon: string }[]).map((section, index) => (
                  <motion.div key={index} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                    <div className="max-w-6xl mx-auto">
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
        <motion.section 
          className="relative overflow-hidden" 
          style={{ paddingTop: '8rem', paddingBottom: '8rem', borderTop: 'none', boxShadow: 'none' }}
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: 'url(/cleaning_background.png)', backgroundSize: 'cover', backgroundPosition: 'center 70%', zIndex: 0 }}
          />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{ background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }}
          />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" 
               style={{ background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              {/* Mobile image above title to match Bohagsflytt */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/omflyttella_flyttstad.webp" alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'} className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'}</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                <motion.div 
                  className="hidden lg:block w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" 
                  initial="initial" 
                  whileInView="animate" 
                  viewport={{ once: true, amount: 0.2 }} 
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                    <img src="/omflyttella_flyttstad.webp" 
                      alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'} 
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
                  <div className="hidden lg:block space-y-6 lg:space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {locale === 'sv' ? 'Flyttella är en av Stockholms ledande aktörer inom visningsstädning med över 8 års erfarenhet av visningsstädning, hemstädning och flyttstädning. Vi erbjuder fasta priser och personlig service i hela Stockholm.' : 'Flyttella is one of Stockholm\'s leading players in viewing cleaning with over 8 years of experience in viewing cleaning, home cleaning and move-out cleaning. We offer fixed prices and personal service throughout Stockholm.'}
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {locale === 'sv' ? 'Vi känner till alla Stockholms områden och anpassar vår visningsstädning efter just dina behov. Vår visningsstädning följer tydliga checklistor och säkerställer ett resultat som syns både på bilder och under visning.' : 'We know all of Stockholm\'s areas and adapt our viewing cleaning to your specific needs. Our viewing cleaning follows clear checklists and ensures a result that shows both in pictures and during viewing.'}
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {locale === 'sv' ? 'Vårt mål är att göra din visningsstädning så enkel och trygg som möjligt. Vi erbjuder kostnadsfri offert, snabb bokning och personlig kontakt genom hela processen.' : 'Our goal is to make your viewing cleaning as simple and safe as possible. We offer free quote, quick booking and personal contact throughout the entire process.'}
                    </p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {locale === 'sv' ? 'Flyttella är Stockholms ledande städfirma med över 8 års erfarenhet av visningsstädning, hemstädning och flyttstädning. Vi arbetar i hela Storstockholm och vet vad som krävs för att hemmet ska se sitt bästa ut på bild och under visning.' : 'Flyttella is Stockholm\'s leading cleaning company with over 8 years of experience in viewing cleaning, home cleaning and move-out cleaning. We work throughout Greater Stockholm and know what is required for the home to look its best in pictures and during viewing.'}
                    </p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                      {locale === 'sv' ? 'Fasta priser och personlig service – anpassat för fotografering och visning. Vi planerar städningen efter bostadens planlösning, ytskikt och tidsplan, så att allt blir klart i tid.' : 'Fixed prices and personal service – adapted for photography and viewing. We plan the cleaning according to the property\'s layout, surface layers and schedule, so everything is ready on time.'}
                    </p>
                    {!showFullAboutText && (
                      <button
                        onClick={() => setShowFullAboutText(true)}
                        className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
                      >
                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                    {showFullAboutText && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 mt-4"
                      >
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                          {locale === 'sv' ? 'Vår visningsstädning följer tydliga checklistor för kök, badrum och alla rum – med fokus på blanka ytor, speglar och detaljer som syns i kamera. Resultatet märks på både bilder och visning.' : 'Our viewing cleaning follows clear checklists for kitchen, bathroom and all rooms – with focus on shiny surfaces, mirrors and details that show in camera. The result is noticeable in both pictures and viewing.'}
                        </p>
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
                          {locale === 'sv' ? 'Du får kostnadsfri offert, snabb bokning och personlig kontakt genom hela processen. Behöver du fönsterputs eller andra tillval hjälper vi till.' : 'You get free quote, quick booking and personal contact throughout the entire process. If you need window cleaning or other options we help out.'}
                        </p>
                        <motion.div className="pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                          <Link 
                            href="/om-oss" 
                            className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
                          >
                            {locale === 'sv' ? 'Läs mer om oss' : 'Read more about us'}
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
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vad tycker våra kunder om oss? */}
        <ReviewsWidget 
          location="Stockholm"
          title={locale === 'sv' ? 'Vad tycker våra kunder om oss?' : 'What do our customers think of us?'}
          subtitle={locale === 'sv' ? 'Pålitlig visningsstädning i Stockholm' : 'Reliable Viewing Cleaning in Stockholm'}
          description={locale === 'sv' ? 'Professionell visningsstädning i Stockholm inför fotografering och visning – fokus på skinande kök, badrum och blanka ytor – fast pris och 50% RUT‑avdrag. Punktliga städare och höga betyg. Läs vad våra kunder tycker om vår visningsstädning i Stockholm.' : 'Professional viewing cleaning in Stockholm for photography and viewing – focus on sparkling kitchen, bathroom and shiny surfaces – fixed price and 50% RUT deduction. Punctual cleaners and high ratings. Read what our customers think about our viewing cleaning in Stockholm.'}
          badgeAlt={locale === 'sv' ? '8+ års erfarenhet av visningsstädning i Stockholm' : '8+ years experience in Viewing Cleaning in Stockholm'}
          arrowText={locale === 'sv' ? 'Läs vad våra kunder säger om vår visningsstädning' : 'Read what our customers say about our viewing cleaning'}
        />

        {/* CTA: Redo att börja din visningsstädning? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🏠✨</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja din visningsstädning?' : 'Ready to start your viewing cleaning?'}</h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert på din visningsstädning' : 'Get a quick and free quote on your viewing cleaning'}</p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">
                    {locale === 'sv' ? 'Få gratis offert' : 'Get free quote'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Våra Städtjänster */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Våra Städtjänster' : 'Our Cleaning Services'}</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Flyttstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🧽</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Flyttstädning' : 'Move-out Cleaning'}</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Grundlig flyttstädning enligt branschstandard – fast pris, 14 dagars garanti och full RUT‑hantering.' : 'Thorough move-out cleaning according to industry standard – fixed price, 14-day guarantee and full RUT handling.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi städar enligt en komplett checklista: alla rum, kök (inkl. skåp och lådor invändigt), vitvaror, badrum och toaletter. Baksidor och utrymmen bakom vitvaror städas där det är åtkomligt.' : 'We clean according to a complete checklist: all rooms, kitchen (incl. cabinets and drawers inside), appliances, bathroom and toilets. Backs and spaces behind appliances are cleaned where accessible.'}</p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">
                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Fönsterputs Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🪟</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Fönsterputs' : 'Window Cleaning'}</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Kristallklara fönster som lyfter helhetsintrycket vid visning – som tillval eller separat tjänst.' : 'Crystal clear windows that lift the overall impression during viewing – as an option or separate service.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi putsar invändigt och utvändigt där det är säkert och åtkomligt. Rätt verktyg och metod ger ett kristallklart resultat utan ränder – perfekt för bilder och visning.' : 'We clean inside and outside where it is safe and accessible. Right tools and method give a crystal clear result without streaks – perfect for pictures and viewing.'}</p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/stadtjanster" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">
                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hemstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🏡</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Hemstädning' : 'Home Cleaning'}</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Regelbunden hemstädning med flexibla intervall – veckovis, varannan vecka eller månadsvis. Fast pris och 50% RUT‑avdrag.' : 'Regular home cleaning with flexible intervals – weekly, bi-weekly or monthly. Fixed price and 50% RUT deduction.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi städar efter tydliga checklistor: alla rum, kök och badrum. Samma städare för kontinuitet och trygghet. Miljövänliga produkter och pålitliga rutiner.' : 'We clean according to clear checklists: all rooms, kitchen and bathroom. Same cleaner for continuity and safety. Eco-friendly products and reliable routines.'}</p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">
                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

         {/* Additional Service Cards - desktop only */}
         <section className="py-4 bg-white hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {/* Flyttstädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🧽</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Flyttstädning' : 'Move-out cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Grundlig flyttstädning enligt branschstandard – 14 dagars nöjd kund-garanti.' : 'Thorough move-out cleaning to industry standards – 14-day satisfaction guarantee.'}</p>
                  <div className="mt-auto relative"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Fönsterputs */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🪟</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Fönsterputs' : 'Window cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Professionell fönsterputs för skinande rena fönster, året runt.' : 'Professional window cleaning for sparkling clean windows, all year round.'}</p>
                  <div className="mt-auto relative"><Link href="/fonsterputsning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Hemstädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🏡</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Hemstädning' : 'Home cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Regelbunden hemstädning anpassad efter dina behov och önskemål.' : 'Regular home cleaning tailored to your needs and preferences.'}</p>
                  <div className="mt-auto relative"><Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>


        {/* Våra tjänster - CTA row */}
        <motion.section className="py-12 md:py-12 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 hidden md:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }} id="upptack-tjanster">{locale === 'sv' ? 'Våra tjänster' : 'Our Services'}</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>
                {locale === 'sv' ? 'Vi erbjuder ett komplett utbud av flytt- och städtjänster för att göra din försäljning och vardag enklare.' : 'We offer a complete range of moving and cleaning services to make your sale and everyday life easier.'}
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">
                    {locale === 'sv' ? 'Se alla våra flyttjänster' : 'See all our moving services'}
                    <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/stadtjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">
                    {locale === 'sv' ? 'Se alla våra städtjänster' : 'See all our cleaning services'}
                    <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Våra förmåner - Mobile slider */}
        <section className="md:hidden py-8 bg-white">
          <div className="mx-auto px-4">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{locale === 'sv' ? 'Våra förmåner' : 'Our Benefits'}</h2>
              <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{featureTouchStartXRef.current=e.touches[0].clientX; if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);}} onTouchMove={(e)=>featureTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (featureTouchStartXRef.current!=null && featureTouchCurrentXRef.current!=null){ const dx=featureTouchCurrentXRef.current-featureTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentFeatureCard((prev)=>(prev+1)%totalFeatureCards);} else { setCurrentFeatureCard((prev)=>(prev-1+totalFeatureCards)%totalFeatureCards);} restartFeatureAutoSlide(); } } featureTouchStartXRef.current=null; featureTouchCurrentXRef.current=null; }}>
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentFeatureCard * 100}%)` }}>
                  {(locale === 'sv' ? [
                    { icon: '💰', title: 'Fast pris', description: 'Inga överraskningar – fasta priser och möjlighet till tillval', link: '/priser' },
                    { icon: '📋', title: 'RUT-avdrag', description: 'Vi hanterar allt pappersarbete för RUT-avdrag', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                    { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#visningsstad-offert' },
                    { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                    { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                    { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                    { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                    { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                    { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                  ] : [
                    { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and option for extras', link: '/priser' },
                    { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                    { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – Fill out the form at the top of the page', link: '#visningsstad-offert' },
                    { icon: '⏰', title: 'Reschedule or Cancel', description: 'Reschedule/cancel free of charge up to 24 hours before', link: '/avbokning' },
                    { icon: '🔒', title: 'Permits and Insurance', description: 'All necessary permits and insurance in place', link: '/tillstand' },
                    { icon: '🎓', title: 'Trained Staff', description: 'Trained employees and quality-assured routines', link: '/om-oss' },
                    { icon: '🧴', title: 'Eco-friendly Products', description: 'Gentle and eco-friendly cleaning products', link: '/om-oss' },
                    { icon: '📈', title: 'Management System', description: 'Effective routines for quality and structure', link: '/om-oss' },
                    { icon: '🦺', title: 'Work Environment', description: 'Safe work environment for both customers and staff', link: '/om-oss' }
                  ]).map((feature, index) => (
                    <div key={feature.icon} className="w-full flex-shrink-0">
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                        <div className="flex items-start gap-3 h-full">
                          <span className="text-2xl">{feature.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm mb-2">{feature.description}</p>
                            {feature.title === 'RUT-avdrag' || feature.title === 'RUT Deduction' ? (
                              <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm inline-flex items-center">
                                {locale === 'sv' ? 'Läs mer' : 'Read more'}
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </a>
                            ) : (
                              <div className="h-6" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" aria-label={locale === 'sv' ? 'Föregående' : 'Previous'} onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button type="button" aria-label={locale === 'sv' ? 'Nästa' : 'Next'} onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4">
          <img src="/varafarmaner_flyttstad.webp"
            alt={locale === 'sv' ? 'Våra förmåner' : 'Our Benefits'}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Desktop features grid with image */}
        <div className="hidden md:block">
          <div className="pt-28">
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">{locale === 'sv' ? 'Våra förmåner' : 'Our Benefits'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {(locale === 'sv' ? [
                        { icon: '💰', title: 'Fast pris', description: 'Inga överraskningar – fasta priser och möjlighet till tillval', link: '/priser' },
                        { icon: '📋', title: 'RUT-avdrag', description: 'Vi hanterar allt pappersarbete för RUT-avdrag', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#visningsstad-offert' },
                        { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                        { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                        { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                        { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                        { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                        { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                      ] : [
                        { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and option for extras', link: '/priser' },
                        { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – Fill out the form at the top of the page', link: '#visningsstad-offert' },
                        { icon: '⏰', title: 'Reschedule or Cancel', description: 'Reschedule/cancel free of charge up to 24 hours before', link: '/avbokning' },
                        { icon: '🔒', title: 'Permits and Insurance', description: 'All necessary permits and insurance in place', link: '/tillstand' },
                        { icon: '🎓', title: 'Trained Staff', description: 'Trained employees and quality-assured routines', link: '/om-oss' },
                        { icon: '🧴', title: 'Eco-friendly Products', description: 'Gentle and eco-friendly cleaning products', link: '/om-oss' },
                        { icon: '📈', title: 'Management System', description: 'Effective routines for quality and structure', link: '/om-oss' },
                        { icon: '🦺', title: 'Work Environment', description: 'Safe work environment for both customers and staff', link: '/om-oss' }
                      ]).map((feature, i) => (
                        <motion.div key={feature.title} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={i}>
                          <motion.span className="text-2xl md:text-3xl" initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }} animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [-180, 20, 0], color: ['#10B981', '#34D399', '#10B981'] }} transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}>
                            {feature.icon}
                          </motion.span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                            {feature.title === 'RUT-avdrag' || feature.title === 'RUT Deduction' ? (
                              <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center">
                                {locale === 'sv' ? 'Läs mer' : 'Read more'}
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                              </a>
                            ) : (
                              <div className="h-6 md:h-7" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch">
                      <img src="/cleaning_lady.webp" alt={locale === 'sv' ? 'Städpersonal i Stockholm - Flyttella' : 'Cleaning Staff in Stockholm - Flyttella'} className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA: Redo att börja din visningsstädning? */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12 -mb-12 md:-mb-16">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-xl md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🏡✨</span>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja din visningsstädning?' : 'Ready to start your viewing cleaning?'}</h3>
                  <p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert' : 'Get a quick and free quote'}</p>
                </div>
              </div>
              <div className="relative z-10 text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">
                    {locale === 'sv' ? 'Få gratis offert' : 'Get free quote'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vår erfarenhet */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/our_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }}></div>
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{locale === 'sv' ? 'Vår erfarenhet' : 'Our Experience'}</h3>
              {/* Mobile slider */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e) => { expTouchStartXRef.current = e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); }} onTouchMove={(e) => (expTouchCurrentXRef.current = e.touches[0].clientX)} onTouchEnd={() => { if (expTouchStartXRef.current != null && expTouchCurrentXRef.current != null) { const dx = expTouchCurrentXRef.current - expTouchStartXRef.current; const th = 50; if (Math.abs(dx) > th) { if (dx < 0) { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); } else { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); } restartExperienceAutoSlide(); } } expTouchStartXRef.current = null; expTouchCurrentXRef.current = null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {(locale === 'sv' ? [
                      { title: 'Visningsstädningar', count: 3000 },
                      { title: 'Flyttstädningar', count: 7000 },
                      { title: 'Hemstädningar', count: 5000 }
                    ] : [
                      { title: 'Viewing Cleanings', count: 3000 },
                      { title: 'Move-out Cleanings', count: 7000 },
                      { title: 'Home Cleanings', count: 5000 }
                    ]).map((card) => (
                      <div key={card.title} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h4 className="text-lg font-bold mb-1 text-white">{card.title}</h4>
                            <div className="text-4xl font-bold mb-1 text-white"><CountUp end={card.count} duration={2.0} suffix="+" /></div>
                            <p className="text-white/90 text-sm">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" aria-label={locale === 'sv' ? 'Föregående' : 'Previous'} onClick={() => { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </button>
                  <button type="button" aria-label={locale === 'sv' ? 'Nästa' : 'Next'} onClick={() => { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); restartExperienceAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>
              </div>
              {/* Desktop grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {(locale === 'sv' ? [{ title: 'Visningsstädningar', count: 3000 }, { title: 'Flyttstädningar', count: 7000 }, { title: 'Hemstädningar', count: 5000 }] : [{ title: 'Viewing Cleanings', count: 3000 }, { title: 'Move-out Cleanings', count: 7000 }, { title: 'Home Cleanings', count: 5000 }]).map((card, i) => (
                  <motion.div key={card.title} className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: i * 0.25 }}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <motion.h2 className="text-xl font-bold mb-2 text-white">{card.title}</motion.h2>
                      <motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={card.count} duration={2.5} suffix="+" useEasing enableScrollSpy scrollSpyOnce /></motion.div>
                      <motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Lokal erfarenhet ger resultat' : 'Local Experience Delivers Results'}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    {locale === 'sv' ? 'Med tusentals städningar i Stockholm har vi byggt upp en stark expertis inom visningsstädning. Vi arbetar metodiskt med tydliga checklistor och miljövänliga produkter för ett jämnt, pålitligt resultat som märks på både bilder och visning.' : 'With thousands of cleanings in Stockholm, we have built strong expertise in viewing cleaning. We work methodically with clear checklists and eco-friendly products for an even, reliable result that shows in both pictures and viewing.'}
                  </p>
                </motion.div>
                {/* Badges - pyramid on mobile */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  <div className="md:hidden flex flex-col items-center">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image src="/1000reviewspicture.png" alt={locale === 'sv' ? '1000+ positiva recensioner' : '1000+ positive reviews'} width={200} height={200} className="object-contain h-36 w-36" />
                    </motion.div>
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image src="/recommendedcompany2.png" alt={locale === 'sv' ? 'Rekommenderad städfirma' : 'Recommended cleaning company'} width={160} height={160} className="object-contain h-32 w-32" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image src="/bestinswedenbadge-modified.png" alt={locale === 'sv' ? 'Top 10 städfirma' : 'Top 10 cleaning company'} width={180} height={180} className="object-contain h-28 w-28" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/recommendedcompany2.png" alt={locale === 'sv' ? 'Rekommenderad städfirma' : 'Recommended cleaning company'} width={240} height={240} className="object-contain h-60 w-60" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/1000reviewspicture.png" alt={locale === 'sv' ? '1000+ positiva recensioner' : '1000+ positive reviews'} width={260} height={260} className="object-contain h-64 w-64 mt-3" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                      <Image src="/bestinswedenbadge-modified.png" alt={locale === 'sv' ? 'Top 10 städfirma' : 'Top 10 cleaning company'} width={300} height={300} className="object-contain h-48 w-48" />
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{locale === 'sv' ? 'Vår process' : 'Our Process'}</h2>
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {locale === 'sv' ? 'Vår process för visningsstädning är enkel, flexibel och trygg. Du börjar med att fylla i vårt formulär med dina uppgifter och önskemål. Du får snabbt en offert till din e‑post. Samma dag eller senast dagen efter tar vi personlig kontakt för att säkerställa detaljer och tidsplan.' : 'Our process for viewing cleaning is simple, flexible and safe. You start by filling out our form with your details and wishes. You quickly get a quote to your email. The same day or latest the day after we take personal contact to ensure details and schedule.'}
                  </p>
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {locale === 'sv' ? 'När du är nöjd signerar du digitalt. Vi planerar sedan städningen utifrån vår visningsanpassade checklista, med fokus på kök, badrum och blanka ytor. Vi kan även samordna med din mäklare vid behov. Resultatet är ett skinande rent hem som gör ett starkt första intryck på både bilder och visning.' : 'When you are satisfied you sign digitally. We then plan the cleaning based on our viewing-adapted checklist, with focus on kitchen, bathroom and shiny surfaces. We can also coordinate with your real estate agent when needed. The result is a sparkling clean home that makes a strong first impression in both pictures and viewing.'}
                  </p>
                </div>
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">
                    {locale === 'sv' ? 'Våra priser baseras på boyta och dina specifika önskemål. Alla priser är fasta utan dolda avgifter. RUT‑avdraget hanteras automatiskt för att göra det enkelt och prisvärt.' : 'Our prices are based on floor area and your specific wishes. All prices are fixed without hidden fees. The RUT deduction is handled automatically to make it simple and cost-effective.'}
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">{locale === 'sv' ? 'Så fungerar det' : 'How it works'}</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {(locale === 'sv' ? [
                        { icon: <FillFormLottie />, title: 'Fyll i formuläret', description: 'Berätta om din städning' },
                        { icon: <FastLottie />, title: 'Snabb offert', description: 'Få pris snabbt och enkelt' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personlig kontakt', description: 'Vi ringer samma dag eller dagen efter', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Signera & bekräfta', description: 'Boka digitalt', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Städning utförd', description: 'Vi tar hand om allt', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: 'Nöjd kund', description: 'Framgångsrik visning', containerClass: 'md:-mt-6' }
                      ] : [
                        { icon: <FillFormLottie />, title: 'Fill in the form', description: 'Tell us about your cleaning' },
                        { icon: <FastLottie />, title: 'Quick quote', description: 'Get price quickly and easily' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personal contact', description: 'We call the same day or the day after', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Sign & confirm', description: 'Book digitally', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Cleaning completed', description: 'We take care of everything', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: 'Happy customer', description: 'Successful viewing', containerClass: 'md:-mt-6' }
                      ]).map((step: any, index: number) => (
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
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Läs mer om visningsstädning' : 'Read more about viewing cleaning'}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{locale === 'sv' ? 'Tips för hur du gör bästa möjliga intryck inför visning och hur du förbereder bostaden.' : 'Tips for how to make the best possible impression before viewing and how to prepare the property.'}</p>
              </div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/omflyttella_flyttstad.webp" alt={locale === 'sv' ? 'Hemstädning tips' : 'Home cleaning tips'} className="w-full h-64 md:h-full object-cover object-[center_40%] md:object-center" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">{locale === 'sv' ? 'Hemstädning' : 'Home Cleaning'}</span>
                      <span className="text-gray-500 text-sm ml-4">{locale === 'sv' ? '12 min läsning' : '12 min read'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Hemstädning - Tips för en Ren och Fräsch Bostad' : 'Home Cleaning - Tips for a Clean and Fresh Home'}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{locale === 'sv' ? 'Lär dig allt om hemstädning med våra professionella tips. Från grundläggande tekniker till avancerade metoder för en ren och fräsch bostad.' : 'Learn everything about home cleaning with our professional tips. From basic techniques to advanced methods for a clean and fresh home.'}</p>
                    <div className="flex items-center justify-end mb-4">
                      <Link href="/blogg/hemstadning-vad-du-behover-veta" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">
                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12">
                <Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">
                  {locale === 'sv' ? 'Se alla artiklar om städning' : 'See all articles about cleaning'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
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
                  { '@type': 'Question', name: 'Vad är visningsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Visningsstädning är en noggrann städning anpassad för fotografering och visning, med fokus på ytor som skapar ett starkt första intryck.' } },
                  { '@type': 'Question', name: 'Vad kostar visningsstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på boyta och önskade tillägg. Med RUT‑avdrag blir visningsstädning prisvärt.' } },
                  { '@type': 'Question', name: 'Ingår fönsterputs?', acceptedAnswer: { '@type': 'Answer', text: 'Fönsterputs kan läggas till som tillval för bästa helhetsintryck.' } },
                  { '@type': 'Question', name: 'Kan ni samordna med mäklare?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, vi kan anpassa tidsplanen och samordna vid behov.' } }
                ]
              })
            }}
          />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Vanliga frågor om visningsstädning' : 'Frequently Asked Questions about Viewing Cleaning'}</h2>
              <div className="space-y-4">
                {(locale === 'sv' ? [
                  { id: 'vis-1', question: 'Hur nära inpå visning bör städningen ske?', answer: 'Vi rekommenderar att städningen görs senast dagen innan visningen. På så sätt hinner allt torka och kännas fräscht, samtidigt som du kan vara säker på att hemmet ger ett riktigt bra första intryck för spekulanterna.' },
                  { id: 'vis-2', question: 'Ingår fönsterputs i visningsstädning?', answer: 'Fönsterputs ingår inte som standard i en visningsstädning, men det är ett vanligt tillval. Vi rekommenderar starkt att boka det inför en visning, eftersom rena och skinande fönster släpper in mer ljus och ger rummen en fräschare och mer inbjudande känsla. Många upplever att det gör en stor skillnad för helhetsintrycket.' },
                  { id: 'vis-3', question: 'Behöver jag vara hemma?', answer: 'Nej, många kunder lämnar nyckel eller portkod – vi hanterar detta tryggt och säkert.' },
                  { id: 'vis-4', question: 'Kan jag avboka?', answer: 'Ja, om- eller avbokning är kostnadsfri upp till 24 timmar innan.' }
                ] : [
                  { id: 'vis-1', question: 'How close to the viewing should the cleaning be done?', answer: 'We recommend that the cleaning is done at the latest the day before the viewing. This way everything has time to dry and feel fresh, while you can be sure that the home gives a really good first impression for the potential buyers.' },
                  { id: 'vis-2', question: 'Is window cleaning included in viewing cleaning?', answer: 'Window cleaning is not included as standard in a viewing cleaning, but it is a common option. We strongly recommend booking it before a viewing, because clean and shiny windows let in more light and give the rooms a fresher and more inviting feeling. Many experience that it makes a big difference for the overall impression.' },
                  { id: 'vis-3', question: 'Do I need to be home?', answer: 'No, many customers leave a key or door code – we handle this safely and securely.' },
                  { id: 'vis-4', question: 'Can I cancel?', answer: 'Yes, rescheduling or cancellation is free of charge up to 24 hours before.' }
                ]).map((faq, index) => (
                  <motion.div key={faq.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">{faq.question}</h3>
                      <motion.div animate={{ rotate: openFAQ === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                        <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                    <motion.div initial={false} animate={{ height: openFAQ === faq.id ? 'auto' : 0, opacity: openFAQ === faq.id ? 1 : 0 }} transition={{ height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2, ease: 'easeInOut' } }} className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p>
                      </div>
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


