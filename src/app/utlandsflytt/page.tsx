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
import type ReactType from 'react';

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

function FillFormLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/fillform.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function FastLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/fast.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-14 h-14 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function PhoneCallLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/phonecall.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function SignFormLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/signform.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-20 h-20 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function MovingTruckLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/movingtruck.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-36 h-36 mx-auto mb-2"><Lottie animationData={d} loop autoplay /></div>; }
function HappyCustomerLottie() { const [d,sD]=useState(null as any); useEffect(()=>{ fetch('/happycustomer.json').then(r=>r.json()).then(sD); },[]); if(!d) return null; return <div className="w-24 h-24 flex items-center justify-center -m-2"><Lottie animationData={d} loop autoplay /></div>; }

export default function Utlandsflytt() {
  const { t } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showFullAboutText, setShowFullAboutText] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showFullExperienceText, setShowFullExperienceText] = useState(false);
  const [expandedTipSection, setExpandedTipSection] = useState<string | null>(null);
  const toggleFAQ = (id: string) => setOpenFAQ(openFAQ === id ? null : id);

  useEffect(()=>{ const i=setInterval(()=>setCurrentCard(p=>(p+1)%3),3000); return ()=>clearInterval(i); },[]);

  const experienceCards = [
    { title: 'Utlandsflyttar', count: '1500+', description: 'Genomförda uppdrag', delay: 0 },
    { title: 'Bohagsflyttar', count: '8000+', description: 'Genomförda uppdrag', delay: 1 },
    { title: 'Länder', count: '25+', description: 'Vi har flyttat till', delay: 2 },
  ];

  const locations = [
    { name: 'Åkersberga', slug: 'akersberga' }, { name: 'Älvsjö', slug: 'alvsjo' }, { name: 'Årsta', slug: 'arsta' }, { name: 'Bromma', slug: 'bromma' }, { name: 'Danderyd', slug: 'danderyd' }, { name: 'Ekerö', slug: 'ekero' }, { name: 'Hägersten', slug: 'hagersten' }, { name: 'Haninge', slug: 'haninge' }, { name: 'Huddinge', slug: 'huddinge' }, { name: 'Järfälla', slug: 'jarfalla' }, { name: 'Kista', slug: 'kista' }, { name: 'Kungsholmen', slug: 'kungsholmen' }, { name: 'Lidingö', slug: 'lidingo' }, { name: 'Nacka', slug: 'nacka' }, { name: 'Norrmalm', slug: 'norrmalm' }, { name: 'Östermalm', slug: 'ostermalm' }, { name: 'Sollentuna', slug: 'sollentuna' }, { name: 'Solna', slug: 'solna' }, { name: 'Täby', slug: 'taby' }, { name: 'Vasastan', slug: 'vasastan' }
  ];

  return (
    <main id="top" className="overflow-hidden">
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
                  backgroundImage: 'url(/malaga.jpg)',
                  backgroundPosition: 'center 30%'
                }}
              />
              <div className="relative z-10 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  Utlandsflytt från Stockholm
                </h1>
                <p className="text-xl mb-6">
                  Internationell flytt – trygg planering, packning och transport
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacing between hero and content */}
          <div className="md:hidden py-2"></div>
          
          {/* Desktop: Full hero section */}
          <div className="hidden md:block mx-auto px-16">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/coupleMoving.png)' }} />
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-xl w-full">
                  <h1 className="text-5xl md:text-6xl font-bold mb-8">Utlandsflytt från Stockholm</h1>
                  <p className="text-2xl md:text-3xl mb-12">Internationell flytt – trygg planering, packning och transport</p>
                  <p className="text-lg text-white/90">Vi hjälper dig hela vägen: packning, inventarielistor, försäkring, tull- och importdokument samt säker transport. Få offert på 1 minut.</p>
                </div>
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <FlyttoffertForm mode="widget" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is Utlandsflytt Section */}
        <section className="py-0 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              {/* Reco Widget - Positioned absolutely to the right */}
              <div className="hidden lg:block absolute -right-72 top-[22rem] w-72">
                <div className="sticky top-8">
                  <iframe src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5" className="w-full h-[1000px] border-0" title="Flyttella recensioner" />
                </div>
              </div>

              {/* Sidebar Service Cards */}
              <div className="hidden lg:block absolute -right-72 top-[1595px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🔧</span><h3 className="text-xl font-bold text-white">Montering</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Säker montering och demontering av möbler och vitvaror inför packning och leverans.</p>
                    <div className="mt-auto relative"><Link href="/montering" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 top-[1880px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4l">📦</span><h3 className="text-xl font-bold text-white">Packning</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">packning med rätt material och märkning för säker transport över gränser.</p>
                    <div className="mt-auto relative"><Link href="/packning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute -right-72 top-[2140px] w-64">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧽</span><h3 className="text-xl font-bold text-white">Flyttstädning</h3></div>
                    <p className="text-sm text-gray-100 mb-4 relative">Avslutande flyttstädning enligt checklista – klart för besiktning och överlämning.</p>
                    <div className="mt-auto relative"><Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
                  </div>
                </div>
              </div>

              {/* Content blocks */}
              {([
                { title: 'Vad är utlandsflytt?', content: (
                  <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center mb-8">
                    En utlandsflytt är en förflyttning av bohag över en landsgräns, ofta mellan olika regelverk och språk. Jämfört med en inrikes flytt kräver den längre framförhållning, mer dokumentation och hänsyn till tull- och importregler, försäkringsvillkor, väg- och gränskontroller samt tidsskillnader och helgdagar i flera länder. Typiska moment är rensning och inventering av bohag, långdistansanpassad packning och märkning med avsändare/mottagare, framtagning av inventarielista och tullvärden, planering av rutt och leveransfönster samt mottagningskontroll på destinationen. Ledtiderna är i regel längre än vid en inrikes flytt och det är klokt att planera med buffert för gränsövergångar och oförutsedda händelser.
                  </p>
                ), icon: '🌍' },
                { title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/under_flytt.jpg" alt="Utlandsflytt" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>), icon: '' },
                { title: 'Vad kostar utlandsflytt?', content: (<>
                  <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">Priset beror främst på volym (kubik), destination, tillgänglighet på adresserna (våningsplan, hiss, bärväg) och tillval som packning, magasinering och montering. Avstånd, bro- och vägavgifter samt önskade leveransfönster påverkar också totalpriset. Prissättning sker vanligtvis som fast pris eller rörligt pris. Fast pris innebär en totalsumma för en tydligt definierad omfattning (volym, adresser, bärväg, tidsfönster) och ändras inte så länge förutsättningarna stämmer – förutsägbart och lätt att budgetera. Rörligt pris debiteras per tid/volym eller enligt löpande räkning utifrån faktisk insats och eventuella tillägg – flexibelt vid osäker omfattning, men slutkostnaden kan variera. I båda fallen kan priset omfatta material, arbetstid, transport, försäkring och ibland tullrelaterade kostnader. Kostnaden kan ofta sänkas genom att minska volymen (rensa), vara flexibel med datum och säkra god åtkomlighet/parkering.</p>
                  <div className="my-16 text-center"><p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;Trygg och smidig utlandsflytt – Flyttella hade tydlig kommunikation hela vägen.&quot;</p><p className="italic text-gray-700 mt-2">- Daniel</p></div>
                </>), icon: '💸' },
                { title: 'Vad ingår i utlandsflytt?', content: (
                  <p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center">Inventering och planering, exportpackning och märkning, lastning med möbelskydd, tull- och importdokument, försäkring, internationell vägtransport samt lossning på destinationen. Vi stämmer av bärväg och leveransfönster och gör en enkel mottagningskontroll. Tillval: packning av hela hemmet, magasinering, montering/demontering och flyttstädning inför överlämning.</p>
                ), icon: '📦' },
                { title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-12"><img src="/fonsterputs_intro.png" alt="Utlandsflytt tjänster" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" /></div>), icon: '' },
                { title: 'Hur bokar jag utlandsflytt?', content: (<p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl text-left md:text-center mb-8 md:mb-12">Boka via formuläret – ange adress, volym och destination. Du får pris direkt och kan bekräfta digitalt. Vi kontaktar dig samma dag eller nästkommande vardag för att stämma av detaljer, önskade datum och eventuella tillval. Vi erbjuder paketlösningar för bästa pris.</p>), icon: '📅' },
                { title: 'Checklista vid utlandsflytt', content: (<div className="px-4 md:px-0"><ul className="list-disc pl-5 space-y-3 md:space-y-2"><li><strong>Boka flyttfirma i god tid:</strong> Säkerställ att du får det datum som passar dig bäst.</li><li><strong>Rensa och sortera:</strong> Gå igenom dina saker och släng, sälj eller skänk det du inte behöver.</li><li><strong>Beställ flyttkartonger:</strong> Låna eller köp tillräckligt med kartonger och packmaterial.</li><li><strong>Packa smart:</strong> Märk kartonger med innehåll och rum. Packa tunga saker i små kartonger och lätta saker i stora. Vi erbjuder också packhjälp som ett tillval - kontakta oss för mer information.</li><li><strong>Adressändra och meddela viktiga kontakter:</strong> Anmäl flytt till Skatteverket, försäkringsbolag, bank, elbolag och andra leverantörer.</li><li><strong>Boka flyttstädning:</strong> Se till att bostaden är ordentligt städad inför överlämning.</li><li><strong>Plocka ner gardiner, lampor och hyllor:</strong> Förbered så mycket som möjligt innan flyttdagen.</li><li><strong>Packa en "första natten-låda":</strong> Lägg i det viktigaste: kläder, hygienartiklar, laddare och viktiga papper.</li><li><strong>Dubbelkolla allt på flyttdagen:</strong> Kontrollera att inget är kvar, att alla fönster och dörrar är låsta och att nycklar lämnas enligt överenskommelse.</li><li><strong>Pass, visum och uppehållstillstånd:</strong> Säkerställ giltighet och rätt intyg för alla i hushållet.</li><li><strong>Inventarielista och tullvärden:</strong> Lista bohaget och förbered tullvärden enligt destinationslandets krav.</li><li><strong>Införselregler:</strong> Kontrollera vad som får tas in (t.ex. livsmedel, växter, batterier) och om tillstånd krävs.</li><li><strong>Internationell försäkring:</strong> Se att försäkringen täcker långdistans vägtransport och hela flyttkedjan.</li><li><strong>Parkering och bärväg:</strong> Ordna lastzon/tillstånd och hissbokning på båda adresser.</li><li><strong>Husdjur:</strong> Kontrollera veterinärintyg, vaccinationer och införselkrav.</li></ul></div>), icon: '' },
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

        {/* Om Flyttella - match bohagsflytt layout */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position" style={{ backgroundImage: 'url(/efter_flytt.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 85%', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat md:hidden" style={{ backgroundImage: 'url(/efter_flytt.jpg)', backgroundSize: 'cover', backgroundPosition: 'right center', zIndex: 0 }} />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="absolute bottom-0 left-0 w-full h-16 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              {/* Mobile image above title to match Bohagsflytt */}
              <div className="lg:hidden px-4 mb-6 -mx-8">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <img src="/personalpicture.jpg" alt="Om Flyttella" className="object-cover w-full h-full" style={{ objectPosition: 'center 70%' }} />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60">Om Flyttella</h3>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
                {/* Left image desktop */}
                <motion.div className="hidden lg:block w-full lg:w-1/5 relative lg:-ml-16 lg:pr-16" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                  <div className="relative h-96 lg:h-full w-full lg:w-[200%] lg:-ml-[100%] overflow-hidden rounded-2xl">
                    <img src="/personalpicture.jpg" alt="Om Flyttella" className="object-cover rounded-2xl w-full h-full" style={{ objectPosition: 'center center', transform: 'scale(1.0)' }} />
                  </div>
                </motion.div>
                {/* Right text */}
                <motion.div className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
                  <div className="hidden lg:block space-y-8">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är en flytt- och städfirma i Stockholm med spetskompetens inom utlandsflytt. I över åtta år har vi hjälpt kunder att flytta mellan länder – med tydliga steg, trygg planering och samma höga kvalitet som vid en lokal flytt. Vårt mål är att göra internationella flyttar enkla, förutsägbara och transparenta.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vi hanterar packning, inventarielistor, tull- och importdokument samt försäkring och vägtransport. Vi koordinerar hela kedjan dörr‑till‑dörr med tydliga tidplaner och uppdateringar. Med fasta villkor och tydliga priser vet du alltid vad som ingår – oavsett destination.</p>
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Du får snabb offert och löpande uppdateringar om tidplan och leverans. Behöver du magasinering, montering/demontering eller flyttstädning inför överlämning ordnar vi det också. Målet är en smidig utlandsflytt där du kan känna dig trygg genom hela processen.</p>
                  </div>
                  {/* Mobile with expand */}
                  <div className="lg:hidden space-y-4">
                    <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Flyttella är en flytt- och städfirma i Stockholm med lång erfarenhet av utlandsflytt – tydliga steg, trygg planering och personlig kontakt.</p>
                    {!showFullAboutText && (
                      <button onClick={() => setShowFullAboutText(true)} className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    )}
                    {showFullAboutText && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="space-y-4 mt-4">
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Vi hjälper till med packning, tull- och importdokument, försäkring och internationell vägtransport – allt samordnat av oss. Fasta villkor och transparent pris gör att du vet exakt vad som ingår.</p>
                        <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">Du får snabb offert och löpande uppdateringar om tidplan och leverans. Behöver du magasinering, montering/demontering eller flyttstädning inför överlämning löser vi det också.</p>
                        <motion.div className="pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                          <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer om oss<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                  {/* Desktop link */}
                  <motion.div className="pt-6 hidden lg:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.6 }}>
                    <Link href="/om-oss" className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4">Läs mer om oss<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Reviews */}
        <ReviewsWidget
          location="Stockholm"
          title="Vad tycker våra kunder om oss?"
          subtitle="Pålitlig utlandsflytt i Stockholm"
          description="Som en av Sveriges mest rekommenderade flyttfirmor för utlandsflytt sätter vi kunden i fokus. Vi vet att flytt över gränser kan vara extra krävande – med dokument, tidsplaner och vägtransport – därför gör vi processen så smidig och trygg som möjligt. Med lång erfarenhet av internationella flyttar och ett dedikerat team ser vi till att din utlandsflytt blir en positiv upplevelse från start till mål."
          badgeAlt="Erfarenhet av utlandsflytt i Stockholm"
          arrowText="Läs vad våra kunder säger om vår utlandsflytt"
        />

        {/* CTA: Redo att börja din flytt? */}
        <section className="pt-0 pb-4 bg-white">
          <div className="mx-auto px-4">
            <motion.div className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10 mb-3 md:mb-4"><span className="text-3xl md:text-4xl">🌍</span><div className="text-center md:text-left"><h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">Redo att börja din utlandsflytt?</h3><p className="text-base md:text-lg text-gray-100 leading-snug">Få en snabb och gratis offert</p></div></div>
              <div className="relative z-10 text-center"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/offert" className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base">Få gratis offert<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
            </motion.div>
          </div>
        </section>

        {/* Våra andra huvudtjänster */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Våra andra huvudtjänster</h2>
              <div className="grid grid-cols-1 gap-12">
                {/* Flyttstädning Card */}
                <motion.div
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]"
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
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">✨</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">Flyttstädning</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Vår flyttstädning följer etablerade branschstandarder och omfattar allt från kök och badrum till fönsterputs och detaljer. Vi använder miljövänliga produkter och lämnar 14 dagars städgaranti så att du kan känna dig helt trygg.</p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/flyttstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg">
                        Läs mer
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Magasinering Card */}
                <motion.div
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">🏢</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">Magasinering</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">Säker magasinering av dina tillhörigheter. Vi erbjuder flexibla lösningar för kortare och längre lagring med säker hantering.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Behöver du magasinera bohag under flyttprocessen? Vi tillhandahåller säkra och pålitliga magasineringslösningar för dina tillhörigheter. Vi erbjuder flexibla alternativ som passar dina behov och tidsplan – och kan även hjälpa till med hämtning och återleverans.</p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/magasinering" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg">
                        Läs mer
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Packhjälp Card */}
                <motion.div
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative">
                    <span className="text-4xl md:text-6xl">📦</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">Packhjälp</h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-100 mb-1 md:mb-8 relative">Professionell packhjälp för en stressfri flytt. Vi hjälper dig packa dina tillhörigheter säkert och organiserat.</p>
                  <p className="md:hidden text-lg text-gray-100 mb-6 md:mb-0 relative">Vi hjälper med märkning och organisering för enklare uppackning.</p>
                  <p className="hidden md:block text-lg text-gray-100 mb-8 relative">Packning är ofta den mest tidskrävande delen av en flytt. Våra erfarna flyttare använder kvalitativa packmaterial och säkerställer att allt packas korrekt för transport. Vi hjälper även till med märkning av kartonger och inventarielista för smidig uppackning.</p>
                  <div className="mt-auto relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link href="/barhjalp" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg">
                        Läs mer
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Våra tjänster CTA row */}
        <motion.section className="py-12 md:py-24 bg-white text-[#0F172A] relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 hidden md:block" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>Våra tjänster</motion.h2>
              <motion.p className="text-lg md:text-xl mb-8 text-[#0F172A]/90" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0 }}>Vi erbjuder ett komplett utbud av flytt- och städtjänster – allt du behöver för en smidig flytt.</motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/tjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra flyttjänster<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link></motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link href="/stadtjanster" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group">Se alla våra städtjänster<motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></motion.svg></Link></motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Tips för din flytt Section */}
        <section className="py-8 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Tips för din flytt</h2>
              <div className="space-y-4 md:space-y-16">
                {/* Innan flytten */}
                <div>
                  {/* Mobile: Expandable section header */}
                  <div className="md:hidden mb-4">
                    <button onClick={() => setExpandedTipSection(expandedTipSection === 'innan' ? null : 'innan')} className="w-full flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                      <h3 className="text-xl font-bold text-white">Innan flytten</h3>
                      <svg className={`w-6 h-6 transition-transform duration-300 ${expandedTipSection === 'innan' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {/* Desktop: Always visible title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">Innan flytten</h3>
                  {/* Mobile: Expandable content */}
                  <div className={`md:block ${expandedTipSection === 'innan' ? 'block' : 'hidden'}`}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <TipCard title="Planera och förbered" imageSrc="/tipsforflytt.jpg" imageAlt="Planering" content={<ul className="list-disc pl-5 space-y-2"><li>Gör en checklista.</li><li>Rensa ut onödiga saker.</li><li>Boka flyttfirma och städning.</li><li>Beställ flyttkartonger.</li></ul>} />
                      <TipCard title="Avtal och anmälningar" imageSrc="/viktigaavtalcustomer.png" imageAlt="Avtal" content={<ul className="list-disc pl-5 space-y-2"><li>Adressändra hos Skatteverket.</li><li>Flytta el, bredband, etc.</li><li>Teckna nya avtal.</li><li>Meddela viktiga kontakter.</li></ul>} />
                      <TipCard title="Innan flyttfirman kommer" imageSrc="/innanflyttfirmankommer.jpg" imageAlt="Förberedelse för flytt" objectPosition="object-[center_45%]" content={<ul className="list-disc pl-5 space-y-2"><li>Packa ner allt lösöre i kartonger</li><li>Montera ner alla gardiner</li><li>Montera ner alla lampor</li><li>Dubbelkolla packning och märkning.</li></ul>} />
                      <TipCard title="Packtips" imageSrc="/packing_tips.jpg" imageAlt="Packning" content={<ul className="list-disc pl-5 space-y-2"><li>Märk alla kartonger tydligt.</li><li>Håll nycklar tillgängliga.</li><li>Överbelasta inte flyttlådorna.</li><li>Använd silkespapper för ömtåliga föremål och porslin.</li></ul>} />
                    </div>
                  </div>
                </div>
                {/* Under flytten */}
                <div>
                  {/* Mobile: Expandable section header */}
                  <div className="md:hidden mb-4">
                    <button onClick={() => setExpandedTipSection(expandedTipSection === 'under' ? null : 'under')} className="w-full flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                      <h3 className="text-xl font-bold text-white">Under flytten</h3>
                      <svg className={`w-6 h-6 transition-transform duration-300 ${expandedTipSection === 'under' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {/* Desktop: Always visible title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">Under flytten</h3>
                  {/* Mobile: Expandable content */}
                  <div className={`md:block ${expandedTipSection === 'under' ? 'block' : 'hidden'}`}>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <TipCard title="En smidig flyttdag" imageSrc="/smidigflyttdag.jpg" imageAlt="Glad flyttarbetare" objectPosition="object-[center_35%]" content={<ul className="list-disc pl-5 space-y-2"><li>Håll värdesaker tillgängliga.</li><li>Säkerställ fri väg för flytthjälp.</li><li>Gör en slutkontroll av bostaden efter inlastning och efter avlastning i båda bostäderna för att säkerställa att inget glömts kvar.</li><li>Se till att montera ner eller packa ner bortglömda föremål.</li></ul>} />
                      <TipCard title="Kommunikation och koordinering" imageSrc="/under_flytt.jpg" imageAlt="Flytt under pågående" objectPosition="object-center" content={<ul className="list-disc pl-5 space-y-2"><li>Håll kontakt med flyttledaren.</li><li>Fotografera eventuella skador.</li><li>Kontrollera att allt laddas korrekt.</li><li>Följ med till den nya adressen.</li><li>Var tydlig med särskilda önskemål.</li><li>Var tillgänglig för frågor.</li></ul>} />
                    </div>
                  </div>
                </div>
                {/* Efter flytten */}
                <div>
                  {/* Mobile: Expandable section header */}
                  <div className="md:hidden mb-4">
                    <button onClick={() => setExpandedTipSection(expandedTipSection === 'efter' ? null : 'efter')} className="w-full flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                      <h3 className="text-xl font-bold text-white">Efter flytten</h3>
                      <svg className={`w-6 h-6 transition-transform duration-300 ${expandedTipSection === 'efter' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {/* Desktop: Always visible title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center hidden md:block">Efter flytten</h3>
                  {/* Mobile: Expandable content */}
                  <div className={`md:block ${expandedTipSection === 'efter' ? 'block' : 'hidden'}`}>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <TipCard title="Start i nya hemmet" imageSrc="/efter_flytt.jpg" imageAlt="Nytt hem" objectPosition="object-[10%_center]" content={<ul className="list-disc pl-5 space-y-2"><li>Kontrollera flyttstädningen.</li><li>Packa upp det viktigaste först.</li><li>Kontrollera att alla föremål anlänt.</li><li>Montera upp gardiner och lampor.</li><li>Uppdatera adress hos myndigheter.</li><li>Testa alla vitvaror och eluttag.</li><li>Ta bort tomma kartonger och emballage.</li></ul>} />
                      <TipCard title="Dokumentation och uppföljning" imageSrc="/godtid.jpg" imageAlt="Dokumentation efter flytt" objectPosition="object-center" content={<ul className="list-disc pl-5 space-y-2"><li>Fotografera ditt nya hem.</li><li>Kontakta flyttfirman för feedback.</li><li>Skriv en recension av tjänsten.</li><li>Organisera flyttkvitton och dokument.</li><li>Fira din nya bostad med familj och vänner.</li><li>Uppdatera försäkringar för nya bostaden.</li></ul>} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        {/* Vår erfarenhet (re-using bohags layout) */}
        <motion.section className="relative overflow-hidden" style={{ paddingTop: '14rem', paddingBottom: '6rem', marginTop: '2rem', borderTop: 'none', boxShadow: 'none' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          {/* Background image absolutely positioned (desktop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position"
            style={{ backgroundImage: 'url(/backgroundpicture.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center', zIndex: 0 }}
          />
          {/* Mobile-specific background image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
            style={{ backgroundImage: 'url(/omoss.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center', zIndex: 0 }}
          />
          <div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />
          <div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>
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
                  <h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Erfarenhet ger resultat</h4>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">Med hundratals utlandsflyttar bakom oss vet vi vad som krävs för en trygg resa över gränserna. Vi arbetar metodiskt med planering, exportpackning och dokument – och håller dig uppdaterad från hämtning till leverans. Resultatet är en smidigare flytt och nöjda kunder.</p>
                  <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4">Vår rutin bygger på tydliga tidplaner, kontroll vid lastning och leverans samt transparent kommunikation under hela transporten. Det gör att du kan planera i lugn och ro, medan vi tar ansvar för detaljerna.</p>
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
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="mx-auto px-0 md:px-24 relative z-10">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{t('bohagsflytt.process.title')}</h2>

                {/* Process Description */}
                <div className="text-center mb-6 md:mb-8 hidden md:block">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">{t('bohagsflytt.process.description')}</p>
                </div>

                {/* Pricing Info */}
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">{t('bohagsflytt.process.pricing')}</p>
                </div>

                {/* Process Flow Section */}
                <div className="mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{t('bohagsflytt.process.subtitle')}</h3>
                  <div className="relative w-full">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
                      {[
                        { icon: <FillFormLottie />, title: t('bohagsflytt.process.steps.0.title'), description: t('bohagsflytt.process.steps.0.description'), textClass: '' },
                        { icon: <FastLottie />, title: t('bohagsflytt.process.steps.1.title'), description: t('bohagsflytt.process.steps.1.description'), textClass: '' },
                        { icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>, title: t('bohagsflytt.process.steps.3.title'), description: t('bohagsflytt.process.steps.3.description'), containerClass: 'md:-mt-6', textClass: '' },
                        { icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>, title: t('bohagsflytt.process.steps.2.title'), description: t('bohagsflytt.process.steps.2.description'), containerClass: 'md:-mt-7', textClass: '' },
                        { icon: <div className="md:mr-3"><MovingTruckLottie /></div>, title: t('bohagsflytt.process.steps.4.title'), description: t('bohagsflytt.process.steps.4.description'), containerClass: 'md:-mt-14', textClass: 'md:-mt-8' },
                        { icon: <div className="md:mt-0"><HappyCustomerLottie /></div>, title: t('bohagsflytt.process.steps.5.title'), description: t('bohagsflytt.process.steps.5.description'), containerClass: 'md:-mt-6', textClass: '' }
                      ].map((step: any, index: number) => (
                        <motion.div key={index} className="relative flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 h-full min-h-[160px] md:min-h-0" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} custom={index}>
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
          <div className="absolute left-0 bottom-0 w-full h-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white 60%, rgba(255,255,255,0) 100%)', zIndex: 20 }} />
        </section>

        {/* Blog Post Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Läs mer om utlandsflytt</h2><p className="text-lg text-gray-600 max-w-2xl mx-auto">Råd kring dokument, packning och leverans – så blir flytten över gränser enklare.</p></div>
              <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="md:flex"><div className="md:w-1/3"><img src="/cleaning_lady.png" alt="Utlandsflytt tips" className="w-full h-64 md:h-full object-cover object-[center_20%] md:object-center" /></div><div className="md:w-2/3 p-8"><div className="flex items-center mb-4"><span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] textWhite px-3 py-1 rounded-full text-sm font-medium">Utlandsflytt</span><span className="text-gray-500 text-sm ml-4">4 min läsning</span></div><h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Checklista: Utlandsflytt steg för steg</h3><p className="text-gray-600 text-lg leading-relaxed mb-6">Dokument, packning och leverans – en tydlig ordning som sparar tid och minskar stress.</p><div className="flex items-center justify-end mb-4"><Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium group">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div></div></div>
              </motion.div>
              <div className="text-center mt-8 md:mt-12"><Link href="/blogg" className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base">Se alla artiklar om flytt och städning<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: 'Vad ingår i en utlandsflytt?', acceptedAnswer: { '@type': 'Answer', text: 'Planering, lastning, tull- och importdokument, försäkring, transport och lossning. Tillval: magasinering, montering/demontering och flyttstädning.' } }, { '@type': 'Question', name: 'Vad kostar utlandsflytt?', acceptedAnswer: { '@type': 'Answer', text: 'Pris beror på volym (kubik), destination och tillval. Begär kostnadsfri offert för exakt pris.' } }, { '@type': 'Question', name: 'Hur lång tid tar en utlandsflytt?', acceptedAnswer: { '@type': 'Answer', text: 'Tidsåtgången beror på sträcka, rutt och tullprocesser. Vi lämnar preliminär tidsplan vid bokning.' } }, { '@type': 'Question', name: 'Kan ni hjälpa med dokument?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, vi bistår med inventarielistor, tull- och importdokument samt försäkringsunderlag.' } } ] }) }} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Vanliga frågor om utlandsflytt</h2>
              <div className="space-y-4">
                {[
                  { id: 'utl-1', question: 'Ingår packning?', answer: 'Packning ingår inte som standard men kan bokas som packning där vi använder godkända material och tydlig märkning inför lång transport.' },
                  { id: 'utl-2', question: 'Hjälper ni med tull?', answer: 'Ja, vi hjälper med tulldokument, importhandlingar och rådgivning om vad som gäller för ditt destinationsland.' },
                  { id: 'utl-3', question: 'Kan ni magasinera?', answer: 'Absolut. Kort- och långtidsmagasinering kan kombineras med utlandsflytt om datum inte sammanfaller.' },
                  { id: 'utl-4', question: 'Hur bokar jag?', answer: 'Fyll i formuläret – du får pris på 1 minut och kan bekräfta digitalt. Vi ringer upp för att finjustera omfattning och datum.' }
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

interface TipCardProps {
  title: string;
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
}

const TipCard: React.FC<TipCardProps> = ({ title, content, imageSrc, imageAlt, objectPosition = 'object-center' }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
    {imageSrc && (
      <img src={imageSrc} alt={imageAlt || ''} className={`w-full h-48 object-cover ${objectPosition}`} />
    )}
    <div className="p-6">
      <h4 className="text-2xl font-bold text-[#0F172A] mb-3">{title}</h4>
      <div className="text-gray-600 text-lg leading-relaxed">{content}</div>
    </div>
  </div>
);


// Placeholder component removed; page implemented above