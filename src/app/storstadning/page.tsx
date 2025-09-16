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

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };
const variants = { initial: { opacity: 0, y: 20 }, animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) };

// Lottie helpers at module scope
function FillFormLottie() { const [d, sD] = useState(null as any); useEffect(()=>{fetch('/fillform.json').then(r=>r.json()).then(sD)},[]); if(!d) return null; return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function FastLottie() { const [d, sD] = useState(null as any); useEffect(()=>{fetch('/fast.json').then(r=>r.json()).then(sD)},[]); if(!d) return null; return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function PhoneCallLottie() { const [d, sD] = useState(null as any); useEffect(()=>{fetch('/phonecall.json').then(r=>r.json()).then(sD)},[]); if(!d) return null; return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function SignFormLottie() { const [d, sD] = useState(null as any); useEffect(()=>{fetch('/signform.json').then(r=>r.json()).then(sD)},[]); if(!d) return null; return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function MovingTruckLottie() { const [d, sD] = useState(null as any); useEffect(()=>{fetch('/movingtruck.json').then(r=>r.json()).then(sD)},[]); if(!d) return null; return <div className="w-36 h-36 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function CleanHomeLottie() { const [d, sD] = useState(null as any); useEffect(()=>{fetch('/happycustomer.json').then(r=>r.json()).then(sD)},[]); if(!d) return null; return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={d} loop autoplay /></div>; }

export default function StorstadningPage() {
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
  const restartExperienceAutoSlide = () => { if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); experienceIntervalRef.current = setInterval(()=>{ setCurrentExperienceCard(p=>(p+1)%totalExperienceCards); }, 3000); };
  useEffect(()=>{ restartExperienceAutoSlide(); return ()=>{ if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); }; },[totalExperienceCards]);
  const restartFeatureAutoSlide = () => { if (featureIntervalRef.current) clearInterval(featureIntervalRef.current); featureIntervalRef.current = setInterval(()=>{ setCurrentFeatureCard(p=>(p+1)%totalFeatureCards); }, 4000); };
  useEffect(()=>{ restartFeatureAutoSlide(); return ()=>{ if (featureIntervalRef.current) clearInterval(featureIntervalRef.current); }; },[totalFeatureCards]);
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
                  {locale === 'sv' ? 'Professionell storstädning i Stockholm' : 'Professional Deep Cleaning in Stockholm'}
                </h1>
                <p className="text-xl mb-6">
                  {locale === 'sv' ? 'Djuprengöring för hem och företag' : 'Deep cleaning for homes and businesses'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
          {/* Desktop hero */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/cleaning_background.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">{locale === 'sv' ? 'Professionell storstädning i Stockholm' : 'Professional Deep Cleaning in Stockholm'}</h1>
                  <p className="text-2xl md:text-3xl mb-12">{locale === 'sv' ? 'Djuprengöring för hem och företag' : 'Deep cleaning for homes and businesses'}</p>
                  <p className="text-lg text-white/90">{locale === 'sv' ? 'Vi rengör på djupet – kök, badrum och svåråtkomliga ytor. Fast pris, 50% RUT och enkel bokning. Perfekt inför säsongsstart eller efter renovering.' : 'We clean deep – kitchen, bathroom and hard-to-reach areas. Fixed price, 50% RUT and easy booking. Perfect for seasonal start or after renovation.'}</p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} cleaningCardSubtitle={locale === 'sv' ? 'Grundlig storstädning – djuprengöring för ett fräscht hem' : 'Thorough deep cleaning – deep cleaning for a fresh home'} />
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

        {/* What is Storstädning */}
        <section id="content" className="pt-2 pb-12 md:pt-2 md:pb-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                {/* Sidebar service cards (desktop) */}
                <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1385px] w-64 sidebar-widget">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧱</span><h3 className="text-xl font-bold text-white">{locale === 'sv' ? 'Byggstädning' : 'Construction Cleaning'}</h3></div>
                      <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Grov- och finstädning efter renovering – dammfritt och prydligt resultat.' : 'Rough and fine cleaning after renovation – dust-free and tidy result.'}</p>
                      <div className="mt-auto relative">
                        <Link href="/byggstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1557px] w-64 sidebar-widget">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧽</span><h3 className="text-xl font-bold text-white">{locale === 'sv' ? 'Flyttstädning' : 'Move-out Cleaning'}</h3></div>
                      <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Grundlig flyttstädning enligt checklista – fast pris och 14 dagars garanti.' : 'Thorough move-out cleaning according to checklist – fixed price and 14-day guarantee.'}</p>
                      <div className="mt-auto relative">
                        <Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1800px] w-64 sidebar-widget">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🏡</span><h3 className="text-xl font-bold text-white">{locale === 'sv' ? 'Hemstädning' : 'Home Cleaning'}</h3></div>
                      <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Återkommande städning – samma städare om möjligt och tydliga checklistor.' : 'Recurring cleaning – same cleaner when possible and clear checklists.'}</p>
                      <div className="mt-auto relative">
                        <Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Reco Widget - Positioned absolutely to the right (desktop) */}
                <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[12rem] w-72 z-40 sidebar-widget">
                  <div className="sticky top-8">
                    <iframe src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5" className="w-full h-[1000px] border-0" title="Flyttella recensioner" />
                  </div>
                </div>

                {(locale === 'sv' ? [
                  {
                    title: 'Vad är storstädning?',
                    content:
                      'Storstädning är en grundlig djuprengöring som går djupare än vanlig städning. Vi fokuserar på svåråtkomliga ytor, avkalkning i badrum, detaljer i kök, samt noggrann dammtorkning. Lister, dörrar, kontakter, socklar och snickerier torkas av, och glasytor putsas. Arbetet följer en tydlig checklista och anpassas efter ytskikt och material för ett jämnt, fräscht resultat i hela bostaden – perfekt inför säsongsstart, efter renovering eller som nystart hemma.',
                    icon: '🧼'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/fonsterputs_info.png" alt="Storstädning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Vad kostar storstädning?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">Priset beror på boyta och grad av nedsmutsning. Med 50% RUT‑avdrag blir storstädning prisvärt. Begär en kostnadsfri offert – du får pris snabbt och enkelt. Vi lämnar alltid ett fast, transparent pris utan dolda avgifter.</p>
                        <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;Hemmet kändes som nytt efter storstädningen – varje detalj på plats!&quot;</p><p className="italic text-gray-700 mt-2">- Sara</p></div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'Vad ingår i storstädning?',
                    content:
                      'Dammsugning och moppning av golv, dammtorkning av fria ytor, noggrann avtorkning av lister, dörrar, handtag, eluttag, socklar och snickerier. I kök: avtorkning av alla ytor, spishäll, kakel, fläkt, och vitvarors utsidor, samt avtorkning invändigt i skåp/lådor som tillval. I badrum: avkalkning av dusch/badkar, kakel och glasytor, rengöring av toalett och handfat.Rengöring bakom och under möbler (kunden flyttar vid behov). Miljövänliga produkter används.',
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/cleaning_background.png" alt="Storstädning badrum" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Hur bokar jag storstädning?',
                    content:
                      'Boka enkelt minut via formuläret högst upp på sidan. Du får pris direkt och kan bekräfta digitalt. Vi kontaktar dig samma dag eller nästkommande vardag för att stämma av detaljer och eventuella tillval. Du kan lämna portkod/nyckel eller möta upp på plats. Du kan omboka/avboka kostnadsfritt upp till 24 timmar innan och RUT‑avdraget (50% på arbetskostnaden) hanteras automatiskt.',
                    icon: '📅'
                  }
                ] : [
                  {
                    title: 'What is Deep Cleaning?',
                    content:
                      'Deep cleaning is a thorough deep cleaning that goes deeper than regular cleaning. We focus on hard-to-reach areas, descaling in bathrooms, kitchen details, and careful dust wiping. Moldings, doors, outlets, baseboards and carpentry are wiped down, and glass surfaces are polished. The work follows a clear checklist and is adapted to surface layers and materials for an even, fresh result throughout the home – perfect for seasonal start, after renovation or as a fresh start at home.',
                    icon: '🧼'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/fonsterputs_info.png" alt="Deep Cleaning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'What does Deep Cleaning Cost?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">The price depends on floor area and degree of soiling. With 50% RUT deduction, deep cleaning becomes cost-effective. Request a free quote – you get a price quickly and easily. We always provide a fixed, transparent price without hidden fees.</p>
                        <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;The home felt like new after the deep cleaning – every detail in place!&quot;</p><p className="italic text-gray-700 mt-2">- Sara</p></div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'What is Included in Deep Cleaning?',
                    content:
                      'Vacuuming and mopping of floors, dust wiping of free surfaces, careful wiping of moldings, doors, handles, outlets, baseboards and carpentry. In kitchen: wiping of all surfaces, stove, tiles, fan, and appliance exteriors, as well as wiping inside cabinets/drawers as option. In bathroom: descaling of shower/bathtub, tiles and glass surfaces, cleaning of toilet and sink. Cleaning behind and under furniture (customer moves when needed). Eco-friendly products are used.',
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/cleaning_background.png" alt="Deep Cleaning Bathroom" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'How do I Book Deep Cleaning?',
                    content:
                      'Book easily via the form at the top of the page. You get a price immediately and can confirm digitally. We contact you the same day or next business day to coordinate details and any options. You can leave door code/key or meet on site. You can reschedule/cancel free of charge up to 24 hours before and the RUT deduction (50% of labor cost) is handled automatically.',
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

        {/* Om Flyttella */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/cleaning_background.png)', backgroundSize: 'cover', backgroundPosition: 'center 70%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              {/* Mobile image above title to match Bohagsflytt */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/omflyttella_flyttstad.png" alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'} className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'}</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-16">
                <motion.div className="hidden lg:block w-full lg:w-1/3 relative lg:-ml-8 lg:pr-8" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                  <div className="relative h-80 lg:h-full w-full overflow-hidden rounded-2xl">
                    <img src="/omflyttella_flyttstad.png" alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'} className="object-cover rounded-2xl w-full h-full" style={{ objectPosition: '80% 25%', transform: 'scale(1.10)' }} />
                  </div>
                </motion.div>
                <motion.div className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Flyttella är en städfirma i Stockholm med lång erfarenhet av storstädning, flyttstädning och hemstädning. Vi erbjuder fasta priser, tydliga checklistor och personlig service i hela Storstockholm.' : 'Flyttella is a cleaning company in Stockholm with long experience in deep cleaning, move-out cleaning and home cleaning. We offer fixed prices, clear checklists and personal service throughout Greater Stockholm.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Vi arbetar metodiskt med djuprengöring i kök, badrum och svåråtkomliga ytor. Miljövänliga produkter och en strukturerad process ger ett jämnt, fräscht resultat.' : 'We work methodically with deep cleaning in kitchen, bathroom and hard-to-reach areas. Eco-friendly products and a structured process provide an even, fresh result.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Snabb återkoppling, flexibla tider och ett lösningsorienterat arbetssätt gör att du snabbt kan njuta av ett prydligt hem igen. Du får pris direkt och enkel bokning.' : 'Quick feedback, flexible times and a solution-oriented approach means you can quickly enjoy a tidy home again. You get a price immediately and easy booking.'}</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Flyttella är Stockholms städfirma med erfarenhet av storstädning, flyttstädning och hemstädning.' : 'Flyttella is Stockholm\'s cleaning company with experience in deep cleaning, move-out cleaning and home cleaning.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Vi erbjuder fasta priser, tydliga checklistor och personlig service – alltid anpassat efter dina behov.' : 'We offer fixed prices, clear checklists and personal service – always adapted to your needs.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Vi känner till hela Stockholm och anpassar insatsen efter ytskikt och material. Målet är ett jämnt, fräscht resultat i hela hemmet – tryggt, smidigt och prisvärt.' : 'We know all of Stockholm and adapt the effort to surface layers and materials. The goal is an even, fresh result throughout the home – safe, smooth and cost-effective.'}</p>
                    {!showFullAboutText && (
                      <button onClick={() => setShowFullAboutText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    )}
                    {showFullAboutText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="space-y-4 mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Vi tar hand om städningen med noggrannhet och omtanke. Enkel bokning, tydliga steg och personlig kontakt genom hela processen.' : 'We handle the cleaning with precision and care. Easy booking, clear steps and personal contact throughout the entire process.'}</p>
                        <motion.div className="pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                          <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{locale === 'sv' ? 'Läs mer om oss' : 'Read more about us'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
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
        <ReviewsWidget location="Stockholm" title={locale === 'sv' ? 'Vad tycker våra kunder om oss?' : 'What do our customers think of us?'} subtitle={locale === 'sv' ? 'Pålitlig storstädning i Stockholm' : 'Reliable Deep Cleaning in Stockholm'} description={locale === 'sv' ? 'Professionell storstädning i Stockholm – djuprengöring av hem och företag. Fast pris och 50% RUT‑avdrag. Punktliga städare och höga betyg. Läs vad våra kunder tycker om vår storstädning i Stockholm.' : 'Professional deep cleaning in Stockholm – deep cleaning of homes and businesses. Fixed price and 50% RUT deduction. Punctual cleaners and high ratings. Read what our customers think about our deep cleaning in Stockholm.'} badgeAlt={locale === 'sv' ? 'Erfarenhet av storstädning i Stockholm' : 'Experience in Deep Cleaning in Stockholm'} arrowText={locale === 'sv' ? 'Läs vad våra kunder säger om vår storstädning' : 'Read what our customers say about our deep cleaning'} />

        {/* CTA: Redo att börja din storstädning? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🧼</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja din storstädning?' : 'Ready to start your deep cleaning?'}</h3><p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert' : 'Get a quick and free quote'}</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{locale === 'sv' ? 'Få gratis offert' : 'Get free quote'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Våra Städtjänster */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Våra Städtjänster' : 'Our Cleaning Services'}</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Visningsstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏠</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Visningsstädning' : 'Viewing Cleaning'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Noggrann städning inför fotografering och visning – rätt detaljer för ett starkt första intryck. Ytor, glas och detaljer som märks i bilderna prioriteras.' : 'Careful cleaning before photography and viewing – right details for a strong first impression. Surfaces, glass and details that show in the images are prioritized.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi fokuserar på kök, badrum och sociala ytor, fläckar och damm, och skapar en välkomnande känsla - skinande rent och fotoklart.' : 'We focus on kitchen, bathroom and social areas, stains and dust, and create a welcoming feeling - sparkling clean and photo-ready.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/visningsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Flyttstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧽</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Flyttstädning' : 'Move-out Cleaning'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Branschstandard, 14 dagars garanti och fast pris. Komplett flyttstäd enligt checklista med RUT‑avdrag. Snabb offert – bekräfta digitalt.' : 'Industry standard, 14-day guarantee and fixed price. Complete move-out cleaning according to checklist with RUT deduction. Quick quote – confirm digitally.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Alla rum, kök, fönsterputsning av alla fönster, (inkl. skåp och lådor invändigt), vitvaror, badrum och detaljer. Åtkomst bakom vitvaror där möjligt och tydlig slutkontroll. Nyckel/portkod hanteras tryggt.' : 'All rooms, kitchen, window cleaning of all windows, (incl. cabinets and drawers inside), appliances, bathroom and details. Access behind appliances where possible and clear final inspection. Key/door code handled safely.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Hemstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏡</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Hemstädning' : 'Home Cleaning'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Regelbunden städning – samma städare om möjligt och tydliga checklistor. Flexibla intervaller efter behov. Snabb offert och enkel ombokning/avbokning.' : 'Regular cleaning – same cleaner when possible and clear checklists. Flexible intervals as needed. Quick quote and easy rescheduling/cancellation.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Fokus på jämn kvalitet och trygg kontinuitet. Köks- och badrumsdetaljer, dammtorkning och golvvård ingår tillval som fönsterputs och storstädning vid behov. Du väljer veckodag och tid, vi använder miljövänliga produkter.' : 'Focus on even quality and safe continuity. Kitchen and bathroom details, dust wiping and floor care included, options like window cleaning and deep cleaning as needed. You choose weekday and time, we use eco-friendly products.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Våra tjänster - CTA row */}
        <motion.section className="py-12 md:py-24 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 hidden md:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }} id="upptack-tjanster">{locale === 'sv' ? 'Våra tjänster' : 'Our Services'}</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>{locale === 'sv' ? 'Vi erbjuder ett komplett utbud av flytt- och städtjänster för att göra din vardag enklare.' : 'We offer a complete range of moving and cleaning services to make your everyday life easier.'}</motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{locale === 'sv' ? 'Se alla våra flyttjänster' : 'See all our moving services'}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link></motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/stadtjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{locale === 'sv' ? 'Se alla våra städtjänster' : 'See all our cleaning services'}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link></motion.div>
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
                    { icon: '⚡', title: 'Snabb offert', description: 'Få prisförslag snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#storstad-offert' },
                    { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                    { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                    { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                    { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                    { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                    { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                  ] : [
                    { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and option for extras', link: '/priser' },
                    { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                    { icon: '⚡', title: 'Quick Quote', description: 'Get price proposal quickly and easily – Fill out the form at the top of the page', link: '#storstad-offert' },
                    { icon: '⏰', title: 'Reschedule or Cancel', description: 'Reschedule/cancel free of charge up to 24 hours before', link: '/avbokning' },
                    { icon: '🔒', title: 'Permits and Insurance', description: 'All necessary permits and insurance in place', link: '/tillstand' },
                    { icon: '🎓', title: 'Trained Staff', description: 'Trained employees and quality-assured routines', link: '/om-oss' },
                    { icon: '🧴', title: 'Eco-friendly Products', description: 'Gentle and eco-friendly cleaning products', link: '/om-oss' },
                    { icon: '📈', title: 'Management System', description: 'Effective routines for quality and structure', link: '/om-oss' },
                    { icon: '🦺', title: 'Work Environment', description: 'Safe work environment for both customers and staff', link: '/om-oss' }
                  ]).map((feature, index) => (
                    <div key={feature.icon} className="w-full flex-shrink-0">
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                        <div className="flex items-start gap-3 h-full"><span className="text-2xl">{feature.icon}</span><div className="flex-1"><h4 className="text-white font-semibold text-base mb-1">{feature.title}</h4><p className="text-white/80 text-sm mb-2">{feature.description}</p>{feature.title === 'RUT-avdrag' || feature.title === 'RUT Deduction' ? (<a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm inline-flex items-center">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>) : (<div className="h-6" />)}</div></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" aria-label={locale === 'sv' ? 'Föregående' : 'Previous'} onClick={() => { setCurrentFeatureCard((prev) => (prev - 1 + totalFeatureCards) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></button>
                <button type="button" aria-label={locale === 'sv' ? 'Nästa' : 'Next'} onClick={() => { setCurrentFeatureCard((prev) => (prev + 1) % totalFeatureCards); restartFeatureAutoSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2 -m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></button>
              </div>
            </div>
          </div>
        </section>
        {/* Image below mobile "Våra förmåner" slider */}
        <div className="md:hidden px-4 mt-4"><img src="/varafarmaner_flyttstad.png" alt={locale === 'sv' ? 'Våra förmåner' : 'Our Benefits'} className="w-full h-auto rounded-2xl shadow-lg" /></div>

        {/* Desktop features grid with image */}
        <div className="responsive-zoom hidden md:block">
          <div className="pt-28" style={{ transform: 'scale(1.1)', transformOrigin: 'center', width: '90.91%', height: '90.91%', margin: '0 auto' }}>
            <div className="mx-auto px-24">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-8 h-full">
                  <div className="flex-[2] w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">{locale === 'sv' ? 'Våra förmåner' : 'Our Benefits'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[420px] items-stretch">
                      {(locale === 'sv' ? [
                        { icon: '💰', title: 'Fast pris', description: 'Inga överraskningar – fasta priser och möjlighet till tillval', link: '/priser' },
                        { icon: '📋', title: 'RUT-avdrag', description: 'Vi hanterar allt pappersarbete för RUT-avdrag', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#storstad-offert' },
                        { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                        { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                        { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                        { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                        { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                        { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                      ] : [
                        { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and option for extras', link: '/priser' },
                        { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – Fill out the form at the top of the page', link: '#storstad-offert' },
                        { icon: '⏰', title: 'Reschedule or Cancel', description: 'Reschedule/cancel free of charge up to 24 hours before', link: '/avbokning' },
                        { icon: '🔒', title: 'Permits and Insurance', description: 'All necessary permits and insurance in place', link: '/tillstand' },
                        { icon: '🎓', title: 'Trained Staff', description: 'Trained employees and quality-assured routines', link: '/om-oss' },
                        { icon: '🧴', title: 'Eco-friendly Products', description: 'Gentle and eco-friendly cleaning products', link: '/om-oss' },
                        { icon: '📈', title: 'Management System', description: 'Effective routines for quality and structure', link: '/om-oss' },
                        { icon: '🦺', title: 'Work Environment', description: 'Safe work environment for both customers and staff', link: '/om-oss' }
                      ]).map((feature, i) => (
                        <motion.div key={feature.title} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-8 min-h-[180px] h-full w-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={i}>
                          <motion.span className="text-2xl md:text-3xl" initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }} animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [-180, 20, 0], color: ['#10B981', '#34D399', '#10B981'] }} transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}>{feature.icon}</motion.span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-base md:text-lg mb-1">{feature.title}</h4>
                            <p className="text-white/80 text-sm md:text-base mb-2">{feature.description}</p>
                            {feature.title === 'RUT-avdrag' || feature.title === 'RUT Deduction' ? (
                              <a href={feature.link} target={feature.link.startsWith('http') ? '_blank' : undefined} rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                            ) : (
                              <div className="h-6 md:h-7" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center lg:justify-end lg:self-stretch">
                    <div className="w-full h-full flex items-stretch"><img src="/cleaning_lady.png" alt={locale === 'sv' ? 'Städpersonal i Stockholm - Flyttella' : 'Cleaning Staff in Stockholm - Flyttella'} className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA above Vår erfarenhet */}
        <section className="py-12 md:py-16 bg-white mt-8 md:mt-12 -mb-12 md:-mb-16">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-xl md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🧼</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja din storstädning?' : 'Ready to start your deep cleaning?'}</h3><p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert' : 'Get a quick and free quote'}</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{locale === 'sv' ? 'Få gratis offert' : 'Get free quote'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Vår erfarenhet */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/our_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{locale === 'sv' ? 'Vår erfarenhet' : 'Our Experience'}</h3>
              {/* Mobile slider */}
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e)=>{expTouchStartXRef.current=e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current);}} onTouchMove={(e)=>expTouchCurrentXRef.current=e.touches[0].clientX} onTouchEnd={()=>{ if (expTouchStartXRef.current!=null && expTouchCurrentXRef.current!=null){ const dx=expTouchCurrentXRef.current-expTouchStartXRef.current; const th=50; if(Math.abs(dx)>th){ if(dx<0){ setCurrentExperienceCard((prev)=>(prev+1)%totalExperienceCards);} else { setCurrentExperienceCard((prev)=>(prev-1+totalExperienceCards)%totalExperienceCards);} restartExperienceAutoSlide(); } } expTouchStartXRef.current=null; expTouchCurrentXRef.current=null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {(locale === 'sv' ? [
                      { title: 'Storstädningar', count: 4000 },
                      { title: 'Flyttstädningar', count: 7000 },
                      { title: 'Hemstädningar', count: 5000 }
                    ] : [
                      { title: 'Deep Cleanings', count: 4000 },
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
                </div>
              </div>
              {/* Desktop grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {(locale === 'sv' ? [{ title: 'Storstädningar', count: 4000 }, { title: 'Flyttstädningar', count: 7000 }, { title: 'Hemstädningar', count: 5000 }] : [{ title: 'Deep Cleanings', count: 4000 }, { title: 'Move-out Cleanings', count: 7000 }, { title: 'Home Cleanings', count: 5000 }]).map((card, i) => (
                  <motion.div key={card.title} className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: i * 0.25 }}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full"><motion.h2 className="text-xl font-bold mb-2 text-white">{card.title}</motion.h2><motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={card.count} duration={2.5} suffix="+" useEasing enableScrollSpy scrollSpyOnce /></motion.div><motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p></div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Lokal erfarenhet ger resultat' : 'Local Experience Delivers Results'}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">{locale === 'sv' ? 'Med tusentals utförda storstädningar i Stockholmsområdet vet vi vad som krävs för ett riktigt fräscht hem. Vi arbetar metodiskt med djuprengöring och miljövänliga produkter – från kök och badrum till detaljer som ofta glöms bort. Resultatet är en jämn och hållbar renhet som märks.' : 'With thousands of completed deep cleanings in the Stockholm area, we know what it takes for a truly fresh home. We work methodically with deep cleaning and eco-friendly products – from kitchen and bathroom to details that are often forgotten. The result is an even and lasting cleanliness that shows.'}</p>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  <div className="md:hidden flex flex-col items-center">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8"><Image src="/1000reviewspicture.png" alt={locale === 'sv' ? '1000+ positiva recensioner' : '1000+ positive reviews'} width={200} height={200} className="object-contain h-36 w-36" /></motion.div>
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300"><Image src="/recommendedcompany2.png" alt={locale === 'sv' ? 'Rekommenderad städfirma' : 'Recommended cleaning company'} width={160} height={160} className="object-contain h-32 w-32" /></motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300"><Image src="/bestinswedenbadge-modified.png" alt={locale === 'sv' ? 'Top 10 städfirma' : 'Top 10 cleaning company'} width={180} height={180} className="object-contain h-28 w-28" /></motion.div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300"><Image src="/recommendedcompany2.png" alt={locale === 'sv' ? 'Rekommenderad städfirma' : 'Recommended cleaning company'} width={240} height={240} className="object-contain h-60 w-60" /></motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300"><Image src="/1000reviewspicture.png" alt={locale === 'sv' ? '1000+ positiva recensioner' : '1000+ positive reviews'} width={260} height={260} className="object-contain h-64 w-64 mt-3" /></motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300"><Image src="/bestinswedenbadge-modified.png" alt={locale === 'sv' ? 'Top 10 städfirma' : 'Top 10 cleaning company'} width={300} height={300} className="object-contain h-48 w-48" /></motion.div>
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
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">{locale === 'sv' ? 'Vår storstädningsprocess är enkel, trygg och effektiv. Fyll i formuläret – du får pris snabbt och enkelt och kan bekräfta digitalt. Vi ringer samma dag eller senast nästkommande vardag för att stämma av boyta, antal våtutrymmen och eventuella tillval.' : 'Our deep cleaning process is simple, safe and effective. Fill out the form – you get a price quickly and easily and can confirm digitally. We call the same day or latest next business day to coordinate floor area, number of wet rooms and any options.'}</p>
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">{locale === 'sv' ? 'Vi planerar insatsen, kommer i tid och arbetar enligt en tydlig checklista. Fokus på djuprengöring i kök och badrum, avkalkning och detaljer i hela hemmet. Resultatet är jämn renhet och ett fräscht hem.' : 'We plan the effort, arrive on time and work according to a clear checklist. Focus on deep cleaning in kitchen and bathroom, descaling and details throughout the home. The result is even cleanliness and a fresh home.'}</p>
                  <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">{locale === 'sv' ? 'Under arbetet håller vi en löpande dialog och gör en avslutande kvalitetskontroll. Vid behov kan vi anpassa moment efter ytskikt och material – alltid med skonsamma, miljövänliga produkter. Nyckel/portkod hanteras tryggt.' : 'During the work we maintain ongoing dialogue and perform a final quality control. When needed we can adapt tasks to surface layers and materials – always with gentle, eco-friendly products. Key/door code handled safely.'}</p>
                </div>
                <div className="text-center mb-4 md:mb-8"><p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">{locale === 'sv' ? 'Priset baseras på boyta och omfattning. Alla priser är fasta utan dolda avgifter. RUT‑avdrag hanteras automatiskt och du kan omboka/avboka kostnadsfritt upp till 24 timmar innan.' : 'The price is based on floor area and scope. All prices are fixed without hidden fees. RUT deduction is handled automatically and you can reschedule/cancel free of charge up to 24 hours before.'}</p></div>
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">{locale === 'sv' ? 'Så fungerar det' : 'How it works'}</h3>
                  <div className="relative w-full">
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {(locale === 'sv' ? [
                        { icon: <FillFormLottie />, title: 'Fyll i formuläret', description: 'Berätta om din städning' },
                        { icon: <FastLottie />, title: 'Snabb offert', description: 'Få prisförslag snabbt och enkelt' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personlig kontakt', description: 'Vi ringer samma dag eller dagen efter', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Signera & bekräfta', description: 'Boka digitalt', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Städning utförd', description: 'Vi tar hand om allt', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: 'Nöjd kund', description: 'Fräscht hem', containerClass: 'md:-mt-6' }
                      ] : [
                        { icon: <FillFormLottie />, title: 'Fill out the form', description: 'Tell us about your cleaning' },
                        { icon: <FastLottie />, title: 'Quick quote', description: 'Get price proposal quickly and easily' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personal contact', description: 'We call the same day or the day after', containerClass: 'md:-mt-7' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Sign & confirm', description: 'Book digitally', containerClass: 'md:-mt-6' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Cleaning completed', description: 'We take care of everything', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: 'Satisfied customer', description: 'Fresh home', containerClass: 'md:-mt-6' }
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
              <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Läs mer om storstädning' : 'Read more about deep cleaning'}</h2><p className="text-lg text-gray-600 max-w-2xl mx-auto">{locale === 'sv' ? 'Tips för djuprengöring, rätt ordning och hur du får bäst resultat i kök och badrum.' : 'Tips for deep cleaning, right order and how to get the best results in kitchen and bathroom.'}</p></div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex"><div className="md:w-1/3"><img src="/cleaning_lady.png" alt={locale === 'sv' ? 'Storstädningstips' : 'Deep Cleaning Tips'} className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center" /></div><div className="md:w-2/3 p-8"><div className="flex items-center mb-4"><span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] textWhite px-3 py-1 rounded-full text-sm font-medium">{locale === 'sv' ? 'Storstädning' : 'Deep Cleaning'}</span><span className="text-gray-500 text-sm ml-4">{locale === 'sv' ? '4 min läsning' : '4 min read'}</span></div><h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Checklista: Storstädning steg för steg' : 'Checklist: Deep Cleaning Step by Step'}</h3><p className="text-gray-600 text-lg leading-relaxed mb-6">{locale === 'sv' ? 'Ett enkelt upplägg: börja med våtutrymmen, fortsätt med kök och avsluta med detaljer. Så skapar du hållbar renhet.' : 'A simple approach: start with wet rooms, continue with kitchen and finish with details. This creates lasting cleanliness.'}</p><div className="flex items-center justify-end mb-4"><Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div></div></div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12"><Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">{locale === 'sv' ? 'Se alla artiklar om städning' : 'See all articles about cleaning'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: 'Vad ingår i storstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Djuprengöring i kök och badrum, avtorkning av detaljer, dammtorkning och moppning.' } }, { '@type': 'Question', name: 'Vad kostar storstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på boyta och omfattning. RUT‑avdrag ger 50% på arbetskostnaden.' } }, { '@type': 'Question', name: 'Behöver jag vara hemma?', acceptedAnswer: { '@type': 'Answer', text: 'Nej, nyckel/portkod kan lämnas och hanteras tryggt.' } }, { '@type': 'Question', name: 'När kan ni komma?', acceptedAnswer: { '@type': 'Answer', text: 'Ofta inom ett par dagar, beroende på omfattning och schema.' } } ] }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Vanliga frågor om storstädning' : 'Frequently Asked Questions about Deep Cleaning'}</h2>
              <div className="space-y-4">
                {(locale === 'sv' ? [
                  { id: 'stor-1', question: 'Ingår fönsterputs?', answer: 'Fönsterputs ingår inte som standard men kan läggas till som tillval – invändigt och, där det är säkert och åtkomligt, även utvändigt. Priset påverkas av antal fönster, höjd och åtkomlighet. Vi rådgör gärna om vad som passar din bostad och kan kombinera med storstädning för bästa resultat.' },
                  { id: 'stor-2', question: 'Hur lång tid tar det?', answer: 'Tidsåtgången beror på boyta och grad av nedsmutsning. Vid bokning får du en uppskattad tidsplan och tidsintervall. Vi meddelar inför ankomst (via sms/telefon) och arbetar metodiskt enligt checklista för att hålla både kvalitet och tid.' },
                  { id: 'stor-3', question: 'Behöver jag förbereda något?', answer: 'För bästa resultat: plocka undan lösa föremål, frigör bänkar och fria ytor samt ta bort personliga artiklar i badrum. Om husdjur finns, informera oss gärna så anpassar vi rutinen. Vi kan hjälpa till att flytta lättare möbler vid behov, men mycket tunga eller väggfasta möbler lämnas.' },
                  { id: 'stor-4', question: 'Kan jag avboka?', answer: 'Ja, du kan omboka/avboka kostnadsfritt upp till 24 timmar före start. Kontakta kundtjänst så hjälper vi dig snabbt att byta datum eller tid – smidigt och utan krångel.' }
                ] : [
                  { id: 'stor-1', question: 'Does window cleaning include?', answer: 'Window cleaning is not included as standard but can be added as an option – internally and, where it is safe and accessible, also externally. The price is affected by number of windows, height and accessibility. We are happy to advise on what suits your home and can combine with deep cleaning for best results.' },
                  { id: 'stor-2', question: 'How long does it take?', answer: 'The time depends on floor area and degree of soiling. When booking you get an estimated time plan and time interval. We notify before arrival (via sms/phone) and work methodically according to checklist to maintain both quality and time.' },
                  { id: 'stor-3', question: 'Do I need to prepare anything?', answer: 'For best results: put away loose items, free up counters and free surfaces and remove personal items in bathroom. If pets exist, please inform us so we adapt the routine. We can help move lighter furniture when needed, but very heavy or wall-mounted furniture is left.' },
                  { id: 'stor-4', question: 'Can I cancel?', answer: 'Yes, you can reschedule/cancel free of charge up to 24 hours before start. Contact customer service and we will help you quickly change date or time – smoothly and without hassle.' }
                ]).map((faq, index) => (
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



