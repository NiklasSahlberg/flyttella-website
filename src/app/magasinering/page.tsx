'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import FlyttoffertForm from '../components/FlyttoffertForm';
import ReviewsWidget from '../components/ReviewsWidget';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import LocationsCard from '../components/LocationsCard';

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

function FillFormLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/fillform.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function FastLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/fast.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function PhoneCallLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/phonecall.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function SignFormLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/signform.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function MovingTruckLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/movingtruck.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-36 h-36 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function HappyCustomerLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/happycustomer.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={d} loop autoplay /></div>; }

export default function MagasineringPage() {
  const { t } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showFullExperienceText, setShowFullExperienceText] = useState(false);
  const toggleFAQ = (id: string) => setOpenFAQ(openFAQ === id ? null : id);

  useEffect(()=>{ const i=setInterval(()=>setCurrentCard(p=>(p+1)%3),3000); return ()=>clearInterval(i); },[]);

  const experienceCards = [
    { title: t('magasinering.experience.magasineradeBohag'), count: t('magasinering.experience.magasineradeBohagCount'), description: t('magasinering.experience.magasineradeBohagDesc'), delay: 0 },
    { title: t('magasinering.experience.moves'), count: t('magasinering.experience.movesCount'), description: t('magasinering.experience.movesDesc'), delay: 1 },
    { title: t('magasinering.experience.cleanings'), count: t('magasinering.experience.cleaningsCount'), description: t('magasinering.experience.cleaningsDesc'), delay: 2 },
  ];

  const locations = [
    { name: 'Åkersberga', slug: 'akersberga' }, { name: 'Älvsjö', slug: 'alvsjo' }, { name: 'Årsta', slug: 'arsta' }, { name: 'Bromma', slug: 'bromma' }, { name: 'Danderyd', slug: 'danderyd' }, { name: 'Ekerö', slug: 'ekero' }, { name: 'Hägersten', slug: 'hagersten' }, { name: 'Haninge', slug: 'haninge' }, { name: 'Huddinge', slug: 'huddinge' }, { name: 'Järfälla', slug: 'jarfalla' }, { name: 'Kista', slug: 'kista' }, { name: 'Kungsholmen', slug: 'kungsholmen' }, { name: 'Lidingö', slug: 'lidingo' }, { name: 'Nacka', slug: 'nacka' }, { name: 'Norrmalm', slug: 'norrmalm' }, { name: 'Östermalm', slug: 'ostermalm' }, { name: 'Sollentuna', slug: 'sollentuna' }, { name: 'Solna', slug: 'solna' }, { name: 'Täby', slug: 'taby' }, { name: 'Vasastan', slug: 'vasastan' }
  ];

  return (
    <main id="top" className="overflow-hidden">
      <div className="main-zoom">
        {/* Hero Section - Matching bortforsling header */}
        <div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
          {/* Mobile: Edge-to-edge hero (like bortforsling) */}
          <div className="md:hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/coupleMoving.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%'
                }}
              />
              <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl font-bold mb-6">{t('magasinering.hero.title')}</h1>
                <p className="text-2xl text-white/90">{t('magasinering.hero.description')}</p>
              </div>
            </div>
          </div>

          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden md:min-h-[720px] lg:min-h-[780px] flex items-center">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-no-repeat opacity-20"
                style={{
                  backgroundImage: 'url(/coupleMoving.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: '0% 40%'
                }}
              />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">{t('magasinering.hero.title')} i Stockholm</h1>
                  <p className="text-2xl md:text-3xl mb-12">{t('magasinering.hero.subtitle')}</p>
                  <p className="text-xl md:text-2xl text-white/90">{t('magasinering.hero.description')}</p>
                </div>
                {/* Right-side CTA directly on background */}
                <div className="w-full md:w-1/2 lg:w-[40%]">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('magasinering.hero.ctaTitle')}</h3>
                  <p className="text-white/90 mb-6 text-lg md:text-xl">{t('magasinering.hero.ctaDescription')}</p>
                  <div>
                    <Link 
                      href="/kontakt?scroll=message&service=magasinering"
                      className="inline-flex items-center bg-white text-[#0B172A] px-5 py-3 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
                    >
                      {t('magasinering.hero.ctaButton')}
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
                    <span className="text-sm font-medium mb-2">{t('magasinering.hero.readMore')}</span>
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

        {/* Intro + Sidebar */}
        <section id="content" className="py-0 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              {/* Reco Widget - Positioned absolutely to the right */}
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[15rem] w-72 sidebar-widget">
                <div className="sticky top-8">
                  <iframe src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5" className="w-full h-[1000px] border-0" title="Flyttella recensioner" />
                </div>
              </div>

              {/* Sidebar Service Cards */}
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1370px] w-64 sidebar-widget">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🎹</span><h3 className="text-xl font-bold text-white">{t('magasinering.sidebar.tunglyft.title')}</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">{t('magasinering.sidebar.tunglyft.description')}</p>
                    <div className="mt-auto relative"><Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{t('magasinering.sidebar.tunglyft.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1600px] w-64 sidebar-widget">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🔧</span><h3 className="text-xl font-bold text-white">{t('magasinering.sidebar.montering.title')}</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">{t('magasinering.sidebar.montering.description')}</p>
                    <div className="mt-auto relative"><Link href="/montering" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{t('magasinering.sidebar.montering.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1830px] w-64 sidebar-widget">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🗑️</span><h3 className="text-xl font-bold text-white">{t('magasinering.sidebar.bortforsling.title')}</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">{t('magasinering.sidebar.bortforsling.description')}</p>
                    <div className="mt-auto relative"><Link href="/bortforsling" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{t('magasinering.sidebar.bortforsling.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                  </div>
                </div>
              </div>

              {/* Content blocks */}
              {([
                { title: t('magasinering.content.whatIsTitle'), content: (
                  <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center mb-8">
                    {t('magasinering.content.whatIsDescription')}
                  </p>
                ), icon: '🏬' },
                { title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/under_flytt.jpg" alt="Magasinering" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>), icon: '' },
                { title: t('magasinering.content.pricingTitle'), content: (<>
                  <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">{t('magasinering.content.pricingDescription')}</p>
                  <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;{t('magasinering.content.pricingTestimonial')}&quot;</p><p className="italic text-gray-700 mt-2">- {t('magasinering.content.testimonialAuthor')}</p></div>
                </>), icon: '💸' },
                { title: t('magasinering.content.includesTitle'), content: (
                  <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center">{t('magasinering.content.includesDescription')}</p>
                ), icon: '📦' },
                { title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/smidigflyttdag.jpg" alt="Magasinering tjänster" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" style={{ objectPosition: 'center 37%' }} /></div>), icon: '' },
                { title: t('magasinering.content.bookingTitle'), content: (<p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center mb-8 md:mb-12">{t('magasinering.content.bookingDescription')}</p>), icon: '📅' },
              ] as { title: string; content: any; icon: string }[]).map((section, idx) => (
                <motion.div key={idx} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
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
            </div>
          </div>
        </section>

        {/* Om Flyttella */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position" style={{ backgroundImage: 'url(/efter_flytt.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat md:hidden" style={{ backgroundImage: 'url(/efter_flytt.jpg)', backgroundSize: 'cover', backgroundPosition: 'right center', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:mr-60 om-oss-container">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              {/* Mobile image above title to match main page & bortforsling */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/personalpicture.jpg" alt="Om Flyttella" className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60 om-oss-title">{t('magasinering.about.title')}</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
                {/* Left image desktop */}
                <motion.div className="hidden lg:block w-full lg:w-1/5 relative lg:-ml-16 lg:pr-16" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                  <div className="relative h-96 lg:h-full w-full lg:w-[200%] lg:-ml-[100%] overflow-hidden rounded-2xl">
                    <img src="/omoss.jpg" alt="Om Flyttella" className="object-cover rounded-2xl w-full h-full" style={{ objectPosition: 'center center', transform: 'scale(1.0)' }} />
                  </div>
                </motion.div>
                {/* Right text */}
                <motion.div className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('magasinering.about.description1')}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('magasinering.about.description2')}</p>
                  </div>
                  {/* Mobile with expand */}
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('magasinering.about.description1')}</p>
                    {!showFullAboutText && (
                      <button onClick={() => setShowFullAboutText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{t('magasinering.about.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    )}
                    {showFullAboutText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="space-y-4 mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{t('magasinering.about.description2')}</p>

                        <motion.div className="pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                          <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{t('magasinering.about.readMoreAbout')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                  {/* Desktop link */}
                  <motion.div className="pt-6 hidden lg:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.6 }}>
                    <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">{t('magasinering.about.readMoreAbout')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Reviews */}
        <ReviewsWidget
          location="Stockholm"
          title={t('magasinering.reviews.title')}
          subtitle={t('magasinering.reviews.subtitle')}
          description={t('magasinering.reviews.description')}
          badgeAlt="Erfarenhet av magasinering i Stockholm"
          arrowText="Läs vad våra kunder säger om vår magasinering"
        />

        {/* CTA: Redo att börja din flytt? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[200px] w-full max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex items-center gap-3 md:gap-4 relative z-10 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">🏬</span>
                <div>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    {t('magasinering.cta.title')}
                  </h3>
                  <p className="text-base md:text-lg text-gray-100">
                    {t('magasinering.cta.subtitle')}
                  </p>
                </div>
              </div>
              <div className="relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link href="/kontakt?scroll=message&service=magasinering" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">
                    {t('magasinering.cta.button')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        

                 {/* Våra andra huvudtjänster */}
         <section className="py-16 bg-white">
           <div className="container mx-auto px-4">
             <div className="max-w-7xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('magasinering.services.title')}</h2>
               <div className="grid grid-cols-1 gap-12">
                 {/* Bohagsflytt Card */}
                 <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                   <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                   <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏠</span><h3 className="text-4xl md:text-5xl font-bold text-white">{t('magasinering.services.bohagsflytt.title')}</h3></div>
                   <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('magasinering.services.bohagsflytt.description')}</p>
                   <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{t('magasinering.services.bohagsflytt.descriptionExtended')}</p>
                   <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/bohagsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg">{t('magasinering.services.bohagsflytt.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                 </motion.div>

                 {/* Flyttstädning Card */}
                 <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                   <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                   <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧽</span><h3 className="text-4xl md:text-5xl font-bold text-white">{t('magasinering.services.flyttstadning.title')}</h3></div>
                   <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('magasinering.services.flyttstadning.description')}</p>
                   <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{t('magasinering.services.flyttstadning.descriptionExtended')}</p>
                   <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg">{t('magasinering.services.flyttstadning.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                 </motion.div>

                 {/* Utlandsflytt Card */}
                 <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                   <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                   <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🌍</span><h3 className="text-4xl md:text-5xl font-bold text-white">{t('magasinering.services.utlandsflytt.title')}</h3></div>
                   <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{t('magasinering.services.utlandsflytt.description')}</p>
                   <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{t('magasinering.services.utlandsflytt.descriptionExtended')}</p>
                   <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/utlandsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg">{t('magasinering.services.utlandsflytt.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                 </motion.div>
               </div>
             </div>
           </div>
         </section>

         {/* Våra tjänster CTA row */}
         <motion.section className="py-12 md:py-24 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
           <div className="container mx-auto px-4 relative z-10">
             <div className="max-w-3xl mx-auto text-center">
               <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 hidden md:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>{t('magasinering.services.allServices.title')}</motion.h2>
               <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>{t('magasinering.services.allServices.description')}</motion.p>
               <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('magasinering.services.allServices.movingServices')}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link></motion.div>
                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/stadtjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('magasinering.services.allServices.cleaningServices')}<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link></motion.div>
               </motion.div>
             </div>
           </div>
         </motion.section>

        

        {/* Vår erfarenhet */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '6rem', marginTop: '0rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          {/* Background image absolutely positioned (desktop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position"
            style={{
              backgroundImage: 'url(/backgroundpicture.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              zIndex: 0,
            }}
          />
          {/* Mobile-specific background image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage: 'url(/omoss.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              zIndex: 0,
            }}
          />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-32 z-15 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-20 max-w-7xl mx-auto" style={{ marginTop: '-5rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('magasinering.experience.title')}</h3>
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentCard * 100}%)` }}>
                    {experienceCards.map((card) => (
                      <div key={card.title} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h4 className="text-lg font-bold mb-1 text-white">{card.title}</h4>
                            <div className="text-4xl font-bold mb-1 text-white">{card.count}</div>
                            <p className="text-white/90 text-sm">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {experienceCards.map((card, i) => (
                  <motion.div key={card.title} className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, delay: i * 0.25 }}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full"><h2 className="text-xl font-bold mb-2 text-white">{card.title}</h2><div className="text-4xl md:text-5xl font-bold mb-2 text-white">{card.count}</div><p className="text-white/90">{card.description}</p></div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('magasinering.experience.localExperienceTitle')}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">{t('magasinering.experience.localExperienceDesc1')}</p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">{t('magasinering.experience.localExperienceDesc2')}</p>
                </motion.div>
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

        {/* Process */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="mx-auto px-0 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
                  {t('magasinering.process.title')}
                </h2>

                {/* Process Description */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
                    {t('magasinering.process.description')}
                  </p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
                    {t('magasinering.process.pricingDescription')}
                  </p>
                </div>

                {/* Process Flow Section */}
                <div className="mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{t('magasinering.process.howItWorks')}</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        {
                          icon: <FillFormLottie />,
                          title: t('magasinering.process.steps.0.title'),
                          description: t('magasinering.process.steps.0.description'),
                          textClass: ""
                        },
                        {
                          icon: <FastLottie />,
                          title: t('magasinering.process.steps.1.title'),
                          description: t('magasinering.process.steps.1.description'),
                          textClass: ""
                        },
                        {
                          icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
                          title: t('magasinering.process.steps.2.title'),
                          description: t('magasinering.process.steps.2.description'),
                          containerClass: "md:-mt-6",
                          textClass: ""
                        },
                        {
                          icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
                          title: t('magasinering.process.steps.3.title'),
                          description: t('magasinering.process.steps.3.description'),
                          containerClass: "md:-mt-7",
                          textClass: ""
                        },
                        {
                          icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
                          title: t('magasinering.process.steps.4.title'),
                          description: t('magasinering.process.steps.4.description'),
                          containerClass: "md:-mt-14",
                          textClass: "md:-mt-8",
                        },
                        {
                          icon: <div className="md:mt-0"><HappyCustomerLottie /></div>,
                          title: t('magasinering.process.steps.5.title'),
                          description: t('magasinering.process.steps.5.description'),
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
              <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('magasinering.blog.title')}</h2><p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('magasinering.blog.subtitle')}</p></div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex"><div className="md:w-1/3"><img src="/cleaning_lady.png" alt="Magasinering tips" className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center" /></div><div className="md:w-2/3 p-8"><div className="flex items-center mb-4"><span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] textWhite px-3 py-1 rounded-full text-sm font-medium">{t('magasinering.blog.category')}</span><span className="text-gray-500 text-sm ml-4">{t('magasinering.blog.readTime')}</span></div><h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{t('magasinering.blog.postTitle')}</h3><p className="text-gray-600 text-lg leading-relaxed mb-6">{t('magasinering.blog.postDescription')}</p><div className="flex items-center justify-end mb-4"><Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">{t('magasinering.blog.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div></div></div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12"><Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">{t('magasinering.blog.allArticles')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: 'Vad ingår i magasinering?', acceptedAnswer: { '@type': 'Answer', text: 'Hämtning och bärhjälp vid behov, skyddande packning, registrering och säker förvaring i torra, larmade utrymmen samt återleverans.' } }, { '@type': 'Question', name: 'Vad kostar magasinering?', acceptedAnswer: { '@type': 'Answer', text: 'Pris beror på volym (kubikmeter), tid och tillval som hämtning/återleverans. Begär kostnadsfri offert för exakt pris.' } }, { '@type': 'Question', name: 'Hur snabbt kan jag få tillbaka mina saker?', acceptedAnswer: { '@type': 'Answer', text: 'Vi bokar återleverans enligt dina önskemål. Normalt inom några arbetsdagar beroende på säsong och volym.' } }, { '@type': 'Question', name: 'Kan jag få åtkomst till enstaka lådor under perioden?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, efter överenskommelse kan vi tillhandahålla åtkomst till utvalda kollin.' } } ] }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{t('magasinering.faq.title')}</h2>
              <div className="space-y-4">
                {[
                  { id: 'mag-1', question: t('magasinering.faq.questions.0.question'), answer: t('magasinering.faq.questions.0.answer') },
                  { id: 'mag-2', question: t('magasinering.faq.questions.1.question'), answer: t('magasinering.faq.questions.1.answer') },
                  { id: 'mag-3', question: t('magasinering.faq.questions.2.question'), answer: t('magasinering.faq.questions.2.answer') },
                  { id: 'mag-4', question: t('magasinering.faq.questions.3.question'), answer: t('magasinering.faq.questions.3.answer') }
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

// Page complete


