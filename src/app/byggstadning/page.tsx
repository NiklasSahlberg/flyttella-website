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
  useEffect(() => { fetch('/fillform.json').then(r=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function FastLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/fast.json').then(r=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function PhoneCallLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/phonecall.json').then(r=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function SignFormLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/signform.json').then(r=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function MovingTruckLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/movingtruck.json').then(r=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-36 h-36 mx-auto mb-2"><Lottie animationData={animationData} loop autoplay /></div>;
}
function CleanHomeLottie() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => { fetch('/happycustomer.json').then(r=>r.json()).then(setAnimationData); }, []);
  if (!animationData) return null;
  return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={animationData} loop autoplay /></div>;
}

export default function ByggstadningPage() {
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
                  backgroundImage: 'url(/byggstadning.png)',
                  backgroundPosition: 'center 50%'
                }}
              />
              <div className="relative z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  {locale === 'sv' ? 'Professionell byggstädning i Stockholm' : 'Professional Construction Cleaning in Stockholm'}
                </h1>
                <p className="text-xl mb-6">
                  {locale === 'sv' ? 'Grov- och finstädning efter renovering och bygge' : 'Rough and fine cleaning after renovation and construction'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
          {/* Desktop hero */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/byggstadning.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">{locale === 'sv' ? 'Professionell byggstädning i Stockholm' : 'Professional Construction Cleaning in Stockholm'}</h1>
                  <p className="text-2xl md:text-3xl mb-12">{locale === 'sv' ? 'Grov- och finstädning efter renovering och bygge' : 'Rough and fine cleaning after renovation and construction'}</p>
                  <p className="text-lg text-white/90">{locale === 'sv' ? 'Vi tar bort byggdamm, spill och emballage, torkar av ytor och gör hemmet inflyttningsklart. Snabb offert och tydlig checklista.' : 'We remove construction dust, debris and packaging, wipe down surfaces and make the home move-in ready. Quick quote and clear checklist.'}</p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {selectedServiceType === 'flyttstad' ? (
                    <StadningOffertFormCustomAkersberga onSubmit={() => {}} onCancel={() => setSelectedServiceType(null)} />
                  ) : (
                    <FlyttoffertForm mode="widget" onServiceTypeSelect={setSelectedServiceType} cleaningCardSubtitle={locale === 'sv' ? 'Professionell byggstädning – grov- och finstädning efter renovering' : 'Professional construction cleaning – rough and fine cleaning after renovation'} />
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

        {/* What is Byggstädning */}
        <section id="content" className="relative pt-2 pb-12 md:pt-2 md:pb-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto relative">
              <motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>

                {(locale === 'sv' ? [
                  {
                    title: 'Vad är byggstädning?',
                    content:
                      'Byggstädning är en grundlig städning efter renovering eller bygge. Vi tar bort byggdamm, spackelrester och emballage, torkar alla ytor och gör bostaden inflyttningsklar. Arbetet sker i två steg – grovstädning och finstädning med noggrann dammtorkning av väggar, taklister och svåråtkomliga ytor samt avtorkning av alla fria ytor, kök, badrum och snickerier. Vi putsar synliga glasytor och ser till att fogdamm och byggrester försvinner. Allt sker enligt en tydlig checklista och med miljövänliga produkter för ett jämnt, dammfritt resultat. Vid behov samordnar vi även bortforsling av emballage och enklare skräp och anpassar insatsen efter tidsplan och åtkomst.',
                    icon: '🧱'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/byggstadning.png" alt="Byggstädning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Vad kostar byggstädning?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">Priset beror på boyta, omfattning och åtkomlighet. Med 50% RUT‑avdrag blir byggstädning prisvärt. Begär en kostnadsfri offert – du får prisförslag snabbt och enkelt. Vi lämnar alltid ett fast, transparent pris utan dolda avgifter.</p>
                        <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;Efter renoveringen blev hemmet dammfritt och prydligt – snabbt och proffsigt!&quot;</p><p className="italic text-gray-700 mt-2">- Anders</p></div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'Vad ingår i byggstädning?',
                    content:
                      'Dammsugning av byggdamm (även lister, socklar och svåråtkomliga ytor), avtorkning av alla ytor, kök (bänkar, luckor utsida, vitvarors utsidor), badrum (kalk och fogdamm), fönsterbrädor, speglar och synliga glasytor. Miljövänliga produkter används.',
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/byggstadning_badrum.png" alt="Byggstädning badrum" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'Hur bokar jag byggstädning?',
                    content:
                      'Boka snabbt och enkelt via formuläret högst upp på sidan – ange boyta, omfattning och en kort beskrivning av renoveringen. Du får pris direkt och kan bekräfta digitalt. Vi kontaktar dig samma dag eller nästkommande vardag för att stämma av material, åtkomlighet, grov- och finstädning, eventuella tillval och tidsplan. Inför städningen kan du enkelt dela portkod/nyckel eller lämna instruktioner – vi hanterar det tryggt. Du kan omboka/avboka kostnadsfritt upp till 24 timmar innan och RUT‑avdraget (50% på arbetskostnaden) hanteras automatiskt.',
                    icon: '📅'
                  }
                ] : [
                  {
                    title: 'What is Construction Cleaning?',
                    content:
                      'Construction cleaning is a thorough cleaning after renovation or construction. We remove construction dust, putty residues and packaging, wipe all surfaces and make the home move-in ready. The work is done in two steps – rough cleaning and fine cleaning with careful dust wiping of walls, ceiling moldings and hard-to-reach areas as well as wiping of all free surfaces, kitchen, bathroom and carpentry. We clean visible glass surfaces and ensure that grout dust and construction residues disappear. Everything is done according to a clear checklist and with eco-friendly products for an even, dust-free result. When needed, we also coordinate disposal of packaging and simple waste and adapt the effort to schedule and access.',
                    icon: '🧱'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/byggstadning.png" alt="Construction Cleaning" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'What does Construction Cleaning Cost?',
                    content: (
                      <>
                        <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">The price depends on floor area, scope and accessibility. With 50% RUT deduction, construction cleaning becomes cost-effective. Request a free quote – you get a price proposal quickly and easily. We always provide a fixed, transparent price without hidden fees.</p>
                        <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;After the renovation, the home became dust-free and tidy – fast and professional!&quot;</p><p className="italic text-gray-700 mt-2">- Anders</p></div>
                      </>
                    ),
                    icon: '💸'
                  },
                  {
                    title: 'What is Included in Construction Cleaning?',
                    content:
                      'Vacuuming of construction dust (including moldings, baseboards and hard-to-reach areas), wiping of all surfaces, kitchen (countertops, cabinet exteriors, appliance exteriors), bathroom (lime and grout dust), window sills, mirrors and visible glass surfaces. Eco-friendly products are used.',
                    icon: '🧹'
                  },
                  {
                    title: '',
                    content: (
                      <div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/byggstadning_badrum.png" alt="Construction Cleaning Bathroom" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>
                    ),
                    icon: ''
                  },
                  {
                    title: 'How do I Book Construction Cleaning?',
                    content:
                      'Book quickly and easily via the form at the top of the page – specify floor area, scope and a brief description of the renovation. You get a price immediately and can confirm digitally. We contact you the same day or next business day to coordinate materials, accessibility, rough and fine cleaning, any options and schedule. Before cleaning, you can easily share door code/key or leave instructions – we handle it safely. You can reschedule/cancel free of charge up to 24 hours before and the RUT deduction (50% of labor cost) is handled automatically.',
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
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Flyttella är en städfirma i Stockholm med lång erfarenhet av byggstädning, flyttstädning och hemstädning. Vi erbjuder fasta priser, tydliga checklistor och personlig service i hela Storstockholm.' : 'Flyttella is a cleaning company in Stockholm with long experience in construction cleaning, move-out cleaning and home cleaning. We offer fixed prices, clear checklists and personal service throughout Greater Stockholm.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Vi arbetar metodiskt med både grov- och finstädning efter renovering. Miljövänliga produkter och en strukturerad process ger ett jämnt, dammfritt resultat.' : 'We work methodically with both rough and fine cleaning after renovation. Eco-friendly products and a structured process provide an even, dust-free result.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Snabb återkoppling, flexibla tider och ett lösningsorienterat arbetssätt gör att du snabbt kan njuta av ett prydligt hem igen. Du får pris direkt och kan boka enkelt.' : 'Quick feedback, flexible times and a solution-oriented approach means you can quickly enjoy a tidy home again. You get a price immediately and can book easily.'}</p>
                  </div>
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Flyttella är en städfirma i Stockholm med erfarenhet av byggstädning, flyttstädning och hemstädning.' : 'Flyttella is a cleaning company in Stockholm with experience in construction cleaning, move-out cleaning and home cleaning.'}</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">{locale === 'sv' ? 'Fasta priser, tydliga checklistor och snabb återkoppling – vi finns nära genom hela processen.' : 'Fixed prices, clear checklists and quick feedback – we are close throughout the entire process.'}</p>
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
        <ReviewsWidget location="Stockholm" title={locale === 'sv' ? 'Vad tycker våra kunder om oss?' : 'What do our customers think of us?'} subtitle={locale === 'sv' ? 'Pålitlig byggstädning i Stockholm' : 'Reliable construction cleaning in Stockholm'} description={locale === 'sv' ? 'Professionell byggstädning i Stockholm – grov- och finstädning efter renovering. Fast pris och 50% RUT‑avdrag. Punktliga städare och höga betyg. Läs vad våra kunder tycker om vår byggstädning i Stockholm.' : 'Professional construction cleaning in Stockholm – rough and fine cleaning after renovation. Fixed price and 50% RUT deduction. Punctual cleaners and high ratings. Read what our customers think about our construction cleaning in Stockholm.'} badgeAlt={locale === 'sv' ? 'Erfarenhet av byggstädning i Stockholm' : 'Experience in construction cleaning in Stockholm'} arrowText={locale === 'sv' ? 'Läs vad våra kunder säger om vår byggstädning' : 'Read what our customers say about our construction cleaning'} />

        {/* CTA: Redo att börja din byggstädning? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🧱</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja din byggstädning?' : 'Ready to start your construction cleaning?'}</h3><p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert' : 'Get a quick and free quote'}</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">{locale === 'sv' ? 'Få gratis offert' : 'Get free quote'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
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
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧽</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Flyttstädning' : 'Move-out Cleaning'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Grundlig flyttstädning enligt branschstandard – fast pris, 14 dagars garanti och full RUT‑hantering.' : 'Thorough move-out cleaning according to industry standards – fixed price, 14-day guarantee and full RUT handling.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi städar enligt en komplett checklista: alla rum, fönsterputsning av alla fönster, kök (inkl. skåp och lådor invändigt), vitvaror, badrum och toaletter. Baksidor och utrymmen bakom vitvaror städas där det är åtkomligt. Som tillval kan du välja balkong/förråd/garage och extra grovrengöring. Resultatet är en inflyttningsklar bostad som uppfyller krav från hyresvärd eller köpare.' : 'We clean according to a complete checklist: all rooms, window cleaning of all windows, kitchen (including cabinets and drawers inside), appliances, bathroom and toilets. Backsides and spaces behind appliances are cleaned where accessible. As options you can choose balcony/storage/garage and extra rough cleaning. The result is a move-in ready home that meets requirements from landlord or buyer.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Visningsstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏠</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Visningsstädning' : 'Viewing Cleaning'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Professionell visningsstädning som får bostaden att glänsa inför försäljning. Fast pris och 50% RUT‑avdrag.' : 'Professional viewing cleaning that makes the home shine before sale. Fixed price and 50% RUT deduction.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Fokus på första intrycket: skinande kök och badrum, polerade ytor och speglar, snyggt ordnade detaljer och doftneutralt resultat. Fönsterputs som tillval. Vi följer en visningsanpassad checklista och tidsplan i samråd med dig eller mäklaren.' : 'Focus on first impression: sparkling kitchen and bathroom, polished surfaces and mirrors, nicely arranged details and odor-neutral result. Window cleaning as option. We follow a viewing-adapted checklist and schedule in consultation with you or the real estate agent.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/visningsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
                </motion.div>
                {/* Hemstädning Card */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🏡</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Hemstädning' : 'Home Cleaning'}</h3></div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Regelbunden hemstädning – veckovis, varannan vecka eller månadsvis. Fast pris och 50% RUT‑avdrag.' : 'Regular home cleaning – weekly, bi-weekly or monthly. Fixed price and 50% RUT deduction.'}</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi anpassar städningen efter dina behov och önskemål – från kök och badrum till vardagsrum och sovrum. Miljövänliga produkter och flexibla intervaller. Som tillval erbjuds fönsterputs och storstädning. Samma erfarna städare när möjligt för kontinuitet och trygghet.' : 'We adapt the cleaning to your needs and wishes – from kitchen and bathroom to living room and bedroom. Eco-friendly products and flexible intervals. As options we offer window cleaning and deep cleaning. Same experienced cleaners when possible for continuity and security.'}</p>
                  <div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/hemstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
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
                {/* Storstädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🧹</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Storstädning' : 'Deep Cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Grundlig storstädning med fokus på svåråtkomliga ytor. Perfekt som uppföljning efter bygge.' : 'Thorough deep cleaning focusing on hard-to-reach areas. Perfect as follow-up after construction.'}</p>
                  <div className="mt-auto relative"><Link href="/storstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Fönsterputs */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🪟</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Fönsterputs' : 'Window Cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Kristallklara fönster året runt – invändigt och utvändigt där det är säkert och åtkomligt.' : 'Crystal clear windows year round – inside and outside where it is safe and accessible.'}</p>
                  <div className="mt-auto relative"><Link href="/fonsterputsning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                </motion.div>
                {/* Dödsbostädning */}
                <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-5 shadow-lg text-white flex flex-col h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="flex items-center gap-3 mb-4 relative"><span className="text-3xl">🕊️</span><h3 className="text-lg font-bold text-white">{locale === 'sv' ? 'Dödsbostädning' : 'Estate Cleaning'}</h3></div>
                  <p className="text-sm text-gray-100 mb-4 relative">{locale === 'sv' ? 'Varsam städning i samband med överlåtelse – respektfullt i varje steg.' : 'Caring cleaning in connection with transfer – respectful in every step.'}</p>
                  <div className="mt-auto relative"><Link href="/dodsbo-stadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
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
                    { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#bygg-offert' },
                    { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                    { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                    { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                    { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                    { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                    { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                  ] : [
                    { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and option for extras', link: '/priser' },
                    { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                    { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – Fill out the form at the top of the page', link: '#bygg-offert' },
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
                        { icon: '⚡', title: 'Snabb offert', description: 'Få pris snabbt och enkelt – Fyll enkelt formuläret högst upp på sidan', link: '#bygg-offert' },
                        { icon: '⏰', title: 'Omboka eller avboka', description: 'Omboka/avboka kostnadsfritt upp till 24 timmar innan', link: '/avbokning' },
                        { icon: '🔒', title: 'Tillstånd och försäkring', description: 'Alla nödvändiga tillstånd och försäkringar på plats', link: '/tillstand' },
                        { icon: '🎓', title: 'Utbildad personal', description: 'Utbildade medarbetare och kvalitetssäkrade rutiner', link: '/om-oss' },
                        { icon: '🧴', title: 'Miljövänliga produkter', description: 'Skonsamma och miljövänliga rengöringsmedel', link: '/om-oss' },
                        { icon: '📈', title: 'Ledningssystem', description: 'Effektiva rutiner för kvalitet och struktur', link: '/om-oss' },
                        { icon: '🦺', title: 'Arbetsmiljö', description: 'Trygg arbetsmiljö för både kunder och personal', link: '/om-oss' }
                      ] : [
                        { icon: '💰', title: 'Fixed Price', description: 'No surprises – fixed prices and option for extras', link: '/priser' },
                        { icon: '📋', title: 'RUT Deduction', description: 'We handle all paperwork for RUT deduction', link: 'https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html' },
                        { icon: '⚡', title: 'Quick Quote', description: 'Get price quickly and easily – Fill out the form at the top of the page', link: '#bygg-offert' },
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
                    <div className="w-full h-full flex items-stretch"><img src="/cleaning_lady.png" alt="Städpersonal i Stockholm - Flyttella" className="rounded-xl shadow-lg object-cover w-full h-full" style={{ objectPosition: '30% 80%' }} /></div>
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🧱</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">{locale === 'sv' ? 'Redo att börja din byggstädning?' : 'Ready to start your construction cleaning?'}</h3><p className="text-base md:text-lg text-gray-100 leading-snug">{locale === 'sv' ? 'Få en snabb och gratis offert' : 'Get a quick and free quote'}</p></div></div>
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
              <div className="md:hidden mt-8">
                <div className="relative overflow-hidden rounded-xl" onTouchStart={(e) => { expTouchStartXRef.current = e.touches[0].clientX; if (experienceIntervalRef.current) clearInterval(experienceIntervalRef.current); }} onTouchMove={(e) => (expTouchCurrentXRef.current = e.touches[0].clientX)} onTouchEnd={() => { if (expTouchStartXRef.current != null && expTouchCurrentXRef.current != null) { const dx = expTouchCurrentXRef.current - expTouchStartXRef.current; const th = 50; if (Math.abs(dx) > th) { if (dx < 0) { setCurrentExperienceCard((prev) => (prev + 1) % totalExperienceCards); } else { setCurrentExperienceCard((prev) => (prev - 1 + totalExperienceCards) % totalExperienceCards); } restartExperienceAutoSlide(); } } expTouchStartXRef.current = null; expTouchCurrentXRef.current = null; }}>
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExperienceCard * 100}%)` }}>
                    {(locale === 'sv' ? [
                      { title: 'Byggstädningar', count: 3000 },
                      { title: 'Flyttstädningar', count: 7000 },
                      { title: 'Hemstädningar', count: 5000 }
                    ] : [
                      { title: 'Construction Cleanings', count: 3000 },
                      { title: 'Move-out Cleanings', count: 7000 },
                      { title: 'Home Cleanings', count: 5000 }
                    ]).map((card) => (
                      <div key={card.title} className="w-full flex-shrink-0">
                        <div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2">
                          <div className="relative z-10 flex flex-col items-center justifyCenter h-full">
                            <h4 className="text-lg font-bold mb-1 textWhite">{card.title}</h4>
                            <div className="text-4xl font-bold mb-1 textWhite"><CountUp end={card.count} duration={2.0} suffix="+" /></div>
                            <p className="textWhite/90 text-sm">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {(locale === 'sv' ? [{ title: 'Byggstädningar', count: 3000 }, { title: 'Flyttstädningar', count: 7000 }, { title: 'Hemstädningar', count: 5000 }] : [{ title: 'Construction Cleanings', count: 3000 }, { title: 'Move-out Cleanings', count: 7000 }, { title: 'Home Cleanings', count: 5000 }]).map((card, i) => (
                  <motion.div key={card.title} className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={variants} transition={{ duration: 0.8, delay: i * 0.25 }}>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full"><motion.h2 className="text-xl font-bold mb-2 text-white">{card.title}</motion.h2><motion.div className="text-4xl md:text-5xl font-bold mb-2 text-white"><CountUp end={card.count} duration={2.5} suffix="+" useEasing enableScrollSpy scrollSpyOnce /></motion.div><motion.p className="text-white/90">{locale === 'sv' ? 'uppdrag utförda' : 'assignments completed'}</motion.p></div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <motion.div className="flex-1 max-w-4xl text-center px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Lokal erfarenhet ger resultat' : 'Local Experience Delivers Results'}</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">
                    {locale === 'sv' ? 'Med tusentals uppdrag i Stockholm har vi byggt upp en stark expertis inom byggstädning. Vi arbetar noggrant och effektivt med professionella verktyg och miljövänliga produkter för att få bort byggdamm och rester – rum för rum, yta för yta. Vi planerar efter tidsplan och åtkomst, håller deadlines och lämnar ett prydligt, inflyttningsklart resultat. Vår höga kundnöjdhet är ett kvitto på att processen fungerar.' : 'With thousands of assignments in Stockholm, we have built strong expertise in construction cleaning. We work carefully and efficiently with professional tools and eco-friendly products to remove construction dust and residues – room by room, surface by surface. We plan according to schedule and access, meet deadlines and deliver a tidy, move-in ready result. Our high customer satisfaction is proof that the process works.'}
                  </p>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                  {/* Mobile pyramid layout */}
                  <div className="md:hidden flex flex-col items-center">
                    <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
                      <Image
                        src="/1000reviewspicture.png"
                        alt={locale === 'sv' ? '1000+ positiva recensioner från kunder' : '1000+ positive reviews from customers'}
                        width={200}
                        height={200}
                        className="object-contain h-36 w-36"
                        priority={false}
                      />
                    </motion.div>
                    <div className="flex items-center justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/recommendedcompany2.png"
                          alt="Rekommenderad städfirma - Flyttella"
                          width={160}
                          height={160}
                          className="object-contain h-32 w-32"
                          priority={false}
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
                        <Image
                          src="/bestinswedenbadge-modified.png"
                          alt="Top 10 städfirma - Flyttella"
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
                        alt="Rekommenderad städfirma - Flyttella"
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
                        alt="Top 10 städfirma - Flyttella"
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
          <div className="absolute bottom-0 left-0 w-full h-48 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)' }} />
        </motion.section>

        {/* Process Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-4 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{locale === 'sv' ? 'Vår process' : 'Our Process'}</h2>
                <div className="text-center mb-6 md:mb-8 hidden md:block"><p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">{locale === 'sv' ? 'Vår byggstädningsprocess är enkel och trygg. Fyll i formuläret – du får pris snabbt och eneklt och kan bekräfta digitalt. Samma dag eller senast nästkommande vardag ringer vi upp för att stämma av omfattning, material, åtkomlighet och tidsplan samt eventuella tillval.' : 'Our construction cleaning process is simple and secure. Fill out the form – you get a price quickly and easily and can confirm digitally. The same day or latest next business day we call to coordinate scope, materials, accessibility and schedule as well as any options.'}</p><p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">{locale === 'sv' ? 'När allt är förankrat planerar vi arbetet och genomför både grov- och finstädning enligt tydlig checklista: dammtorkning och dammsugning av byggdamm, avtorkning av alla ytor, kök och badrum. Resultatet är dammfritt, prydligt och redo för inflytt.' : 'When everything is anchored, we plan the work and carry out both rough and fine cleaning according to a clear checklist: dust wiping and vacuuming of construction dust, wiping of all surfaces, kitchen and bathroom. The result is dust-free, tidy and ready for move-in.'}</p></div>
                <div className="text-center mb-4 md:mb-8"><p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-4">{locale === 'sv' ? 'Priset baseras på boyta, omfattning och åtkomlighet. Alla priser är fasta utan dolda avgifter. RUT‑avdrag hanteras automatiskt och du kan omboka/avboka kostnadsfritt upp till 24 timmar innan.' : 'The price is based on floor area, scope and accessibility. All prices are fixed without hidden fees. RUT deduction is handled automatically and you can reschedule/cancel free of charge up to 24 hours before.'}</p></div>
                <div className="mb-8"><h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8 text-center">{locale === 'sv' ? 'Så fungerar det' : 'How it works'}</h3><div className="relative w-full"><div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div><div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">{(locale === 'sv' ? [{ icon: <FillFormLottie />, title: 'Fyll i formuläret', description: 'Berätta om din städning' }, { icon: <FastLottie />, title: 'Snabb offert', description: 'Få pris snabbt och enkelt' }, { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personlig kontakt', description: 'Vi ringer samma dag eller dagen efter', containerClass: 'md:-mt-7' }, { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Signera & bekräfta', description: 'Boka digitalt', containerClass: 'md:-mt-6' }, { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Städning utförd', description: 'Vi tar hand om allt', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' }, { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: 'Nöjd kund', description: 'Inflyttningsklart', containerClass: 'md:-mt-6' }] : [{ icon: <FillFormLottie />, title: 'Fill out the form', description: 'Tell us about your cleaning' }, { icon: <FastLottie />, title: 'Quick quote', description: 'Get price quickly and easily' }, { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: 'Personal contact', description: 'We call the same day or day after', containerClass: 'md:-mt-7' }, { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: 'Sign & confirm', description: 'Book digitally', containerClass: 'md:-mt-6' }, { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: 'Cleaning completed', description: 'We take care of everything', containerClass: 'md:-mt-14', textClass: 'md:-mt-8' }, { icon: <div className="md:mt-0"><CleanHomeLottie /></div>, title: 'Satisfied customer', description: 'Move-in ready', containerClass: 'md:-mt-6' }]).map((step: any, index: number) => (<motion.div key={index} className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 h-full min-h-[160px] md:min-h-0" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={index}><div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#10B981] rounded-full hidden md:block"></div><div className={`${step.containerClass || ''} w-full flex flex-col items-center justify-center`}><div className="mb-1 md:mb-2 h-16 md:h-auto flex items-center justify-center">{step.icon}</div><div className={`flex flex-col items-center justify-center w-full ${step.textClass || ''}`}><h4 className="text-white font-semibold text-sm md:text-base lg:text-lg mb-1 text-center w-full">{step.title}</h4><p className="text-white/80 text-xs md:text-sm lg:text-base text-center w-full">{step.description}</p></div></div></motion.div>))}</div></div></div>
              </div>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20 }} />
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Läs mer om byggstädning' : 'Read more about construction cleaning'}</h2><p className="text-lg text-gray-600 max-w-2xl mx-auto">{locale === 'sv' ? 'Tips efter renovering: dammfritt, rätt ordning och hur du snabbast får det inflyttningsklart.' : 'Tips after renovation: dust-free, right order and how you fastest get it move-in ready.'}</p></div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="/omflyttella_flyttstad.png" alt={locale === 'sv' ? 'Hemstädning tips' : 'Home cleaning tips'} className="w-full h-64 md:h-full object-cover object-[center_40%] md:object-center" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">{locale === 'sv' ? 'Hemstädning' : 'Home Cleaning'}</span>
                      <span className="text-gray-500 text-sm ml-4">{locale === 'sv' ? '12 min läsning' : '12 min read'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Hemstädning - Tips för en Ren och Fräsch Bostad' : 'Home Cleaning - Tips for a Clean and Fresh Home'}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {locale === 'sv' ? 'Lär dig allt om hemstädning med våra professionella tips. Från grundläggande tekniker till avancerade metoder för en ren och fräsch bostad.' : 'Learn everything about home cleaning with our professional tips. From basic techniques to advanced methods for a clean and fresh home.'}
                    </p>
                    <div className="flex items-center justify-end mb-4">
                      <Link href="/blogg/hemstadning-vad-du-behover-veta" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">
                        {locale === 'sv' ? 'Läs mer' : 'Read more'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12"><Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">{locale === 'sv' ? 'Se alla artiklar om städning' : 'See all articles about cleaning'}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: 'Vad ingår i byggstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Grov- och finstädning, borttagning av byggdamm och spill, avtorkning av alla ytor och iordningställande.' } }, { '@type': 'Question', name: 'Vad kostar byggstädning?', acceptedAnswer: { '@type': 'Answer', text: 'Priset beror på boyta och omfattning. RUT‑avdrag ger 50% på arbetskostnaden.' } }, { '@type': 'Question', name: 'Behöver jag vara hemma?', acceptedAnswer: { '@type': 'Answer', text: 'Nej, nyckel/portkod kan lämnas och hanteras tryggt.' } }, { '@type': 'Question', name: 'När kan ni komma?', acceptedAnswer: { '@type': 'Answer', text: 'Ofta inom ett par dagar, beroende på omfattning och schema.' } } ] }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">{locale === 'sv' ? 'Vanliga frågor om byggstädning' : 'Frequently Asked Questions about Construction Cleaning'}</h2>
              <div className="space-y-4">
                {(locale === 'sv' ? [
                  { id: 'byg-1', question: 'Kan ni hjälpa till med bortforsling av byggsopor?', answer: 'Vi kan hjälpa till med bortforsling av byggsopor, men för att det ska fungera smidigt behöver vi information i förväg om mängd och material. Då kan vi planera rätt upplägg och ge en tydlig kostnadsbild innan arbetet påbörjas.' },
                  { id: 'byg-2', question: 'Hur lång tid tar en byggstädning?', answer: 'Det beror på lokalens storlek och omfattningen av arbetet. Mindre ytor kan ofta vara klara samma dag, medan större projekt kan ta längre tid. Vi lämnar alltid en uppskattad tidsplan innan vi startar.' },
                  { id: 'byg-3', question: 'Kan jag boka fönsterputs samtidigt?', answer: 'Ja, fönsterputs kan läggas till där det är säkert och åtkomligt.' },
                  { id: 'byg-4', question: 'Kan jag avboka?', answer: 'Ja, kostnadsfri ombokning/avbokning upp till 24 timmar innan.' }
                ] : [
                  { id: 'byg-1', question: 'Can you help with disposal of construction waste?', answer: 'We can help with disposal of construction waste, but for it to work smoothly we need information in advance about quantity and material. Then we can plan the right setup and give a clear cost picture before the work begins.' },
                  { id: 'byg-2', question: 'How long does construction cleaning take?', answer: 'It depends on the size of the premises and the scope of the work. Smaller areas can often be ready the same day, while larger projects may take longer. We always provide an estimated schedule before we start.' },
                  { id: 'byg-3', question: 'Can I book window cleaning at the same time?', answer: 'Yes, window cleaning can be added where it is safe and accessible.' },
                  { id: 'byg-4', question: 'Can I cancel?', answer: 'Yes, free rescheduling/cancellation up to 24 hours before.' }
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


