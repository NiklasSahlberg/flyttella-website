'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReviewsWidget from '../components/ReviewsWidget';
import { useLanguage } from '../contexts/LanguageContext';
import Lottie from "lottie-react";
import React from 'react';

// Lottie animation functions
function FillFormLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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

function HappyCustomerLottie() {
  const [animationData, setAnimationData] = React.useState(null);
  React.useEffect(() => {
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

export default function BortforslingPage() {
	const [showFullAboutText, setShowFullAboutText] = useState(false);
	const { t } = useLanguage();
	
	// State for experience section
	const [currentCard, setCurrentCard] = React.useState(0);
	const [showFullExperienceText, setShowFullExperienceText] = React.useState(false);

	// State for FAQ section
	const [openFAQBortforsling, setOpenFAQBortforsling] = React.useState<string | null>(null);

	const toggleFAQBortforsling = (id: string) => {
		setOpenFAQBortforsling(openFAQBortforsling === id ? null : id);
	};

	// Auto-advance cards on mobile
	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentCard((prev) => (prev + 1) % 3);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const experienceCards = [
		{ title: 'Bortforslingar', count: '2500+', description: 'Genomförda bortforslingar', delay: 0 },
		{ title: 'Flyttar', count: '8000+', description: 'Genomförda flyttar', delay: 0 },
		{ title: 'Städningar', count: '7000+', description: 'Genomförda städningar', delay: 1 },
		
	];
	
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.8 }
	};
	const staggerContainer = {
		animate: { transition: { staggerChildren: 0.1 } }
	};
	return (
		<main id="top" className="overflow-hidden">
			<div className="main-zoom">
				{/* Hero Section - Matching bohagsflytt header */}
				<div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
					{/* Mobile: Edge-to-edge hero (like bohagsflytt) */}
					<div className="md:hidden">
						<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
							{/* Background image */}
							<div
								className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
								style={{
									backgroundImage: 'url(/magkansla.jpg)',
									backgroundSize: 'cover',
									backgroundPosition: 'center 40%'
								}}
							/>
							<div className="relative z-10 text-center px-4">
								<h1 className="text-5xl font-bold mb-6">Bortforsling</h1>
								<p className="text-2xl text-white/90">Vi hämtar, bär och kör bort – snabbt och tryggt. Miljövänlig hantering och återvinning när det är möjligt.</p>
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
									backgroundImage: 'url(/magkansla.jpg)',
									backgroundSize: 'cover',
									backgroundPosition: '0% 40%'
								}}
							/>
							<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
								<div className="max-w-xl w-full">
									<h1 className="text-5xl md:text-6xl font-bold mb-8">Bortforsling i Stockholm</h1>
									<p className="text-2xl md:text-3xl mb-12">Professionell bortforsling av möbler, bohag och grovsopor</p>
									<p className="text-xl md:text-2xl text-white/90">Vi hämtar, bär och kör bort – snabbt och tryggt. Miljövänlig hantering och återvinning när det är möjligt.</p>
								</div>
								{/* Right-side CTA directly on background */}
								<div className="w-full md:w-1/2 lg:w-[40%]">
									<h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Kontakta oss för offert</h3>
									<p className="text-white/90 mb-6 text-lg md:text-xl">Berätta kort vad du behöver hjälp med så återkommer vi snabbt med pris och tid. Vi kan även besikta på plats vid behov.</p>
									<div>
										<Link 
											href="/kontakt?scroll=message&service=bortforsling"
											className="inline-flex items-center bg-white text-[#0F172A] px-5 py-3 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
										>
											Kontakta oss
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
										<span className="text-sm font-medium mb-2">Läs mer</span>
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

				{/* What is Bortforsling Section with Sidebar (SEO-optimized) */}
				<section id="content" className="py-0 md:py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-6xl mx-auto relative">
										{/* Sidebar: Reviews widget (sticky) */}
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[14rem] w-72 sidebar-widget">
								<div className="sticky top-8">
									<iframe 
										src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5"
										className="w-full h-[1000px] border-0"
										title="Flyttella recensioner"
									/>
								</div>
							</div>

										{/* Sidebar Service Cards */}
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1440px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🏬</span><h3 className="text-xl font-bold text-white">Magasinering</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Trygg förvaring av ditt bohag i torra, larmade utrymmen. Vi kan även hjälpa dig med packning innan vi lagrar dina saker, alltid med fokus på säker och omsorgsfull hantering.</p>
										<div className="mt-auto relative"><Link href="/magasinering" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1670px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🔧</span><h3 className="text-xl font-bold text-white">Montering</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Montering och demontering av möbler och inredning – rätt verktyg och varsam hantering.</p>
										<div className="mt-auto relative"><Link href="/montering" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1900px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🎹</span><h3 className="text-xl font-bold text-white">Tunglyft</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Säker hantering av tunga och storskaliga föremål som piano, kassaskåp och stora möbler.</p>
										<div className="mt-auto relative"><Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>

							{/* Main content - Centered (matching bohagsflytt) */}
							<motion.div
								className="space-y-12 md:space-y-16"
								variants={staggerContainer}
								initial="initial"
								whileInView="animate"
								viewport={{ once: true }}
							>
								{([
									{ title: 'Vad är bortforsling?', content: 'Bortforsling innebär att vi hämtar, bär och transporterar bort möbler, vitvaror, elektronik och grovsopor på ett säkert och miljövänligt sätt. Vi sorterar och lämnar avfallet på återvinningscentral eller godkänd mottagare. Tjänsten passar vid flytt, dödsbo, kontorsrensning eller när du behöver frigöra utrymme hemma.', icon: '🗑️' },
									{ title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-12"><img src="/smidigflyttdag.jpg" alt="Bortforsling av möbler och grovsopor i Stockholm" className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-cover" style={{ objectPosition: 'center 40%' }} /></div>), icon: '' },
									{ title: 'Vad kostar bortforsling?', content: (<div className="px-4 md:px-0">
											<p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl mb-4">Priset för bortforsling beror främst på mängd och typ av avfall, tillgänglighet (våningsplan, hiss, bärväg), samt hur långt transporten är till återvinningscentral. Vi lämnar alltid ett tydligt fast pris utan dolda avgifter innan vi startar arbetet. Vid behov kan vi göra en snabb besiktning på plats eller bedöma utifrån bilder.</p>
											<p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">Skicka en förfrågan med kort beskrivning och gärna bilder så återkommer vi snabbt med ett fast pris. <Link href="/kontakt?scroll=message&service=bortforsling" className="text-[#10B981] hover:text-[#059669] underline font-medium transition-colors duration-300">Kontakta oss</Link>.</p>
											
											<div className="my-12 md:my-16 text-left md:text-center px-4">
												<p className="text-xl md:text-2xl lg:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
													"Allt gick smidigt och tryggt från första kontakt tills allt var bortforslat. Rekommenderar Flyttella varmt till alla som vill ha en bekymmersfri bortforsling!"
												</p>
												<p className="italic text-gray-700 mt-2">- Martin</p>
											</div>
										</div>), icon: '💸' },
									{ title: 'Vad ingår i tjänsten?', content: (<p className="px-4 md:px-0 text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">I vår bortforsling ingår bärhjälp från bostad, vind, källare eller kontor, enklare nedmontering av möbler vid behov, transport till återvinningscentral eller godkänd mottagare, samt miljösortering där vi återvinner när det är möjligt. Allt till tydliga, fasta priser utan dolda avgifter.</p>), icon: '✅' },
									{ title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-12"><img src="/intro_picture.jpg" alt="Tips för bortforsling" className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-cover" /></div>), icon: '' },
									{ title: 'Hur bokar jag bortforsling?', content: (<div className="px-4 md:px-0"><p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">Boka bortforsling enkelt genom att <Link href="/kontakt?scroll=message&service=bortforsling" className="text-[#10B981] hover:text-[#059669] underline font-medium transition-colors duration-300">kontakta oss</Link>. Vi erbjuder snabb service och flexibla tider som passar dig. För snabbare offert, ange gärna adress, våningsplan och om hiss finns, ungefärlig mängd och typ av avfall (t.ex. möbler, vitvaror, byggavfall), samt önskat datum och tid. Du kan även bifoga bilder i meddelandet så kan vi bedöma volymen direkt. Vi återkommer snabbt med pris och bekräftelse. Vid behov kan vi även göra en kort besiktning på plats innan hämtning.</p></div>), icon: '📞' },
								] as { title: string; content: any; icon: string }[]).map((section, index) => (
									<motion.div key={index} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
										<div>
											<div className="max-w-6xl mx-auto">
												<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">{section.title}</h3>
												{typeof section.content === 'string' ? (
													<p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl">{section.content}</p>
												) : (
													<div className="text-gray-700 leading-relaxed text-base md:text-lg lg:text-xl">{section.content}</div>
												)}
											</div>
										</div>
									</motion.div>
								))}
							</motion.div>
						</div>
					</div>
				</section>

				{/* Om Flyttella Section - Matching bohagsflytt layout */}
				<section className="relative py-16 md:py-20 bg-white overflow-hidden">
					{/* Background image absolutely positioned */}
					<div
						className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mobile-bg-position"
						style={{
							backgroundImage: 'url(/efter_flytt.jpg)',
							backgroundSize: 'cover',
							backgroundPosition: 'center 85%',
							zIndex: 0,
						}}
					/>
					{/* Mobile-specific background positioning */}
					<div
						className="absolute inset-0 w-full h-full bg-cover bg-no-repeat md:hidden"
						style={{
							backgroundImage: 'url(/efter_flytt.jpg)',
							backgroundSize: 'cover',
							backgroundPosition: 'right center',
							zIndex: 0,
						}}
					/>
					{/* Overlay absolutely positioned, full width */}
					<div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{zIndex: 1}}></div>
					
					{/* Top gradient fade */}
					<div className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none"
						 style={{
							background: 'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
						 }}
					/>
					
					{/* Bottom gradient fade */}
					<div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
						 style={{
							background: 'linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
						 }}
					/>
					
					{/* Centered content */}
					<div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:mr-60 om-oss-container">
						<motion.div
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
						>
							{/* Mobile image above title to match main page */}
							<div className="lg:hidden px-4 mb-6 -mx-8">
								<div className="relative w-full h-96 rounded-3xl overflow-hidden">
									<img
										src="/personalpicture.jpg"
										alt="Om Flyttella"
										className="object-cover w-full h-full"
										style={{ objectPosition: 'center 70%' }}
									/>
								</div>
							</div>

							<h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60 om-oss-title">Om Flyttella</h3>

							<div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
								{/* Left: Image - desktop only */}
								<motion.div
									className="hidden lg:block w-full lg:w-1/5 relative lg:-ml-16 lg:pr-16"
									initial="initial"
									whileInView="animate"
									viewport={{ once: true, amount: 0.2 }}
									variants={fadeInUp}
									transition={{ 
										duration: 0.8,
										delay: 0.2
									}}
								>
									<div className="relative h-96 lg:h-full w-full lg:w-[200%] lg:-ml-[100%] overflow-hidden rounded-2xl">
										<img
											src="/omoss.jpg"
											alt="Om Flyttella"
											className="object-cover rounded-2xl w-full h-full"
											style={{ objectPosition: 'center center', transform: 'scale(1.0)' }}
										/>
									</div>
								</motion.div>
								
								{/* Right: Text content */}
								<motion.div
									className="w-full lg:w-4/5 space-y-4 lg:space-y-8 flex flex-col justify-center"
									initial="initial"
									whileInView="animate"
									viewport={{ once: true, amount: 0.2 }}
									variants={fadeInUp}
									transition={{ 
										duration: 0.8,
										delay: 0.4
									}}
								>
									{/* Desktop: Always show full text in 3 sections - SEO optimized for bortforsling */}
									<div className="hidden lg:block space-y-8">
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											Flyttella är Stockholms ledande företag för professionell bortforsling och flyttjänster. Med över 8 års erfarenhet hjälper vi både privatpersoner och företag med säker och miljövänlig bortforsling av möbler, vitvaror och grovsopor i hela Stockholm.
										</p>
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											Vårt team av erfarna flyttare och bärhjälpare är specialiserade på att hantera alla typer av bortforsling - från små möbler till stora kontorsrensningar. Vi använder modern utrustning och följer strikta miljöriktlinjer för att säkerställa att allt avfall hanteras korrekt och återvinns när det är möjligt.
										</p>
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											Som en del av våra omfattande flyttjänster erbjuder vi också bärhjälp, montering, piano- och tunglyft samt kontorsflyttar. Vårt mål är att göra bortforsling enkel, säker och miljövänlig för alla våra kunder i Stockholm med transparenta priser och professionell service.
										</p>
									</div>
									
									{/* Mobile: Show shortened text with expand option - SEO optimized for bortforsling */}
									<div className="lg:hidden space-y-4">
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											Flyttella är Stockholms ledande företag för professionell bortforsling och flyttjänster. Med över 8 års erfarenhet hjälper vi både privatpersoner och företag med säker och miljövänlig bortforsling av möbler, vitvaror och grovsopor i hela Stockholm.
										</p>
										
										{!showFullAboutText && (
											<button
												onClick={() => setShowFullAboutText(true)}
												className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
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
											</button>
										)}
										
										{showFullAboutText && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												transition={{ duration: 0.5 }}
												className="space-y-4 mt-4"
											>
												<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
													Hittills har vi haft nöjet att hjälpa över 8000 kunder, både privatpersoner och företag, med allt från små flyttar till helhetslösningar med städning, packning och rådgivning. Det som gör oss unika är vårt fokus på tydliga villkor och fasta priser – hos oss vet du alltid vad som ingår och vad det kostar.
												</p>
												<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
													Vi erbjuder gratis lån av flyttkartonger, kostnadsfri om- och avbokning upp till 24 timmar innan, samt en generös 14 dagars garanti på alla flyttstädningar. Bakom allt detta står vår kompetenta och personliga kundtjänst, som alltid finns tillgänglig för att svara på frågor, ge tips och hjälpa dig fatta rätt beslut.
												</p>
												
												{/* Läs mer om oss link - Mobile only when expanded */}
												<motion.div
													className="pt-6"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ duration: 0.5, delay: 0.3 }}
												>
													<Link 
														href="/om-oss" 
														className="inline-flex items-center text-xl text-[#0F172A] hover:text-[#10B981] transition-colors font-bold underline decoration-2 underline-offset-4"
													>
														Läs mer om oss
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
									
									{/* Läs mer om oss link - Desktop only */}
									<motion.div
										className="pt-6 hidden lg:block"
										initial="initial"
										whileInView="animate"
										viewport={{ once: true, amount: 0.2 }}
										variants={fadeInUp}
										transition={{ 
											duration: 0.8,
											delay: 0.6
										}}
									>
										<Link 
											href="/om-oss" 
											className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
										>
											Läs mer om oss
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
							</div>
						</motion.div>
					</div>
				</section>

				{/* Vad tycker våra kunder om oss */}
				<ReviewsWidget 
					title="Vad tycker våra kunder om oss?"
					subtitle="En trygg och miljövänlig bortforsling"
					description="Vi har hjälpt tusentals kunder med säker och miljövänlig bortforsling av möbler och grovsopor. Våra kunder uppskattar vår snabba service, transparenta priser och miljövänliga hantering av allt från små möbler till stora kontorsrensningar. Hos Flyttella får du professionell bortforsling med fokus på kundnöjdhet och hållbarhet."
				/>

				{/* CTA: Redo att boka din bortforsling? */}
				<section className="py-12 bg-white">
					<div className="mx-auto px-4">
						<motion.div
							className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-10 shadow-lg text-white flex flex-col items-center justify-center min-h-[200px] w-full max-w-3xl mx-auto text-center"
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
							<div className="flex items-center gap-3 md:gap-4 relative z-10 mb-3 md:mb-4">
								<span className="text-3xl md:text-4xl">🗑️</span>
								<div>
									<h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
										Redo att boka din bortforsling?
									</h3>
									<p className="text-base md:text-lg text-gray-100">
										Få en snabb och gratis offert på din bortforsling
									</p>
								</div>
							</div>
							<div className="relative z-10">
								<motion.div 
									whileHover={{ scale: 1.05 }} 
									whileTap={{ scale: 0.95 }}
									className="inline-block"
								>
									<Link 
										href="/kontakt?scroll=message&service=bortforsling"
										className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
									>
										Kontakta oss
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
								</motion.div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Service Cards Section */}
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-7xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
								Våra andra huvudtjänster
							</h2>
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
									transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
									style={{
										backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
										backgroundSize: '20px 20px'
									}}
								/>
								<div className="flex items-center gap-4 mb-6 md:mb-8 relative">
									<span className="text-4xl md:text-6xl">✨</span>
									<h3 className="text-4xl md:text-5xl font-bold text-white">
										Flyttstädning
									</h3>
								</div>
								<p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
									Vi garanterar en grundlig flyttstädning som uppfyller alla krav. Vår professionella städservice säkerställer att din gamla bostad lämnas i perfekt skick.
								</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">
									Vår flyttstädning följer etablerade branschstandarder och omfattar allt från kök och badrum till fönsterputs och detaljer. Vi använder miljövänliga produkter och lämnar 14 dagars städgaranti så att du kan känna dig helt trygg.
								</p>
								<div className="mt-auto relative">
									<motion.div 
										whileHover={{ scale: 1.05 }} 
										whileTap={{ scale: 0.95 }}
										className="inline-block"
									>
										<Link 
											href="/flyttstadning" 
											className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg"
										>
											Läs mer
											<svg 
												xmlns="http://www.w3.org/2000/svg" 
												className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" 
												fill="none" 
												viewBox="0 0 24 24" 
												stroke="currentColor"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
											</svg>
										</Link>
									</motion.div>
								</div>
							</motion.div>

							{/* Bohagsflytt Card */}
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
									transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
									style={{
										backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
										backgroundSize: '20px 20px'
									}}
								/>
								<div className="flex items-center gap-4 mb-6 md:mb-8 relative">
									<span className="text-4xl md:text-6xl">🚚</span>
									<h3 className="text-4xl md:text-5xl font-bold text-white">
										Bohagsflytt
									</h3>
								</div>
								<p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
									Professionell flytt av hela ditt bohag. Vi tar hand om allt från små möbler till stora pianon med omsorg och precision.
								</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">
								Vi erbjuder packning och uppackning samt montering och nedmontering av möbler – allt för att din flytt ska bli så enkel och bekväm som möjligt. Vi använder kvalitativa material och har erfarenhet av alla typer av flyttar. Med vår service får du en stressfri flytt där allt hanteras professionellt.
								</p>
								<div className="mt-auto relative">
									<motion.div 
										whileHover={{ scale: 1.05 }} 
										whileTap={{ scale: 0.95 }}
										className="inline-block"
									>
										<Link 
											href="/bohagsflytt" 
											className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg"
										>
											Läs mer
											<svg 
												xmlns="http://www.w3.org/2000/svg" 
												className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" 
												fill="none" 
												viewBox="0 0 24 24" 
												stroke="currentColor"
											>
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
								transition={{ duration: 0.5, delay: 0.2 }}
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
								<div className="flex items-center gap-4 mb-6 md:mb-8 relative">
									<span className="text-4xl md:text-6xl">🏬</span>
									<h3 className="text-4xl md:text-5xl font-bold text-white">
										Magasinering
									</h3>
								</div>
								<p className="text-lg md:text-xl text-gray-100 mb-1 md:mb-8 relative">
								Trygg förvaring av ditt bohag i torra, larmade utrymmen. Vi kan även hjälpa dig med packning innan vi lagrar dina saker, alltid med fokus på säker och omsorgsfull hantering.
								</p>
								<p className="md:hidden text-lg text-gray-100 mb-6 md:mb-0 relative">
									Vi hjälper med märkning och organisering för enklare återleverans.
								</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">
									Magasinering är perfekt vid flytt, renovering eller längre vistelser utomlands. Våra erfarna medarbetare använder kvalitativa packmaterial och säkerställer att allt packas korrekt för långsiktig förvaring. Vi hjälper även till med smidig återleverans.
								</p>
								<div className="mt-auto relative">
									<motion.div 
										whileHover={{ scale: 1.05 }} 
										whileTap={{ scale: 0.95 }}
										className="inline-block"
									>
										<Link 
											href="/magasinering" 
											className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg"
										>
											Läs mer
											<svg 
												xmlns="http://www.w3.org/2000/svg" 
												className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" 
												fill="none" 
												viewBox="0 0 24 24" 
												stroke="currentColor"
											>
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

				{/* Se alla våra tjänster Section */}
				<motion.section 
					className="py-12 md:py-24 bg-white text-[#0F172A] relative overflow-hidden"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="container mx-auto px-4 relative z-10">
						<div className="max-w-3xl mx-auto text-center">
							<motion.h2 
								className="text-3xl md:text-4xl font-bold mb-6 hidden md:block"
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.2 }}
								variants={fadeInUp}
								transition={{ 
									duration: 0.8,
									delay: 0 * 0.25
								}}
								id="upptack-tjanster"
							>
								Våra tjänster
							</motion.h2>
							<motion.p 
								className="text-lg md:text-xl mb-8 text-[#0F172A]/90"
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.2 }}
								variants={fadeInUp}
								transition={{ 
									duration: 0.8,
									delay: 0 * 0.25
								}}
							>
								Vi erbjuder ett komplett utbud av flytt- och städtjänster för att göra din flytt och städning så smidig som möjligt. 
								Från bohagsflytt och flyttstädning till specialtjänster som tunglyft och magasinering.
							</motion.p>
							<motion.div
								className="flex flex-col sm:flex-row gap-4 justify-center items-center"
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.2 }}
								variants={fadeInUp}
								transition={{ 
									duration: 0.8,
									delay: 0.2
								}}
							>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link 
										href="/tjanster" 
										className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
									>
										Se alla våra flyttjänster
										<motion.svg 
											xmlns="http://www.w3.org/2000/svg" 
											className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
											fill="none" 
											viewBox="0 0 24 24" 
											stroke="currentColor"
											animate={{ x: [0, 5, 0] }}
											transition={{ duration: 1.5, repeat: Infinity }}
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</motion.svg>
									</Link>
								</motion.div>
								
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link 
										href="/stadtjanster" 
										className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
									>
										Se alla våra städtjänster
										<motion.svg 
											xmlns="http://www.w3.org/2000/svg" 
											className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
											fill="none" 
											viewBox="0 0 24 24" 
											stroke="currentColor"
											animate={{ x: [0, 5, 0] }}
											transition={{ duration: 1.5, repeat: Infinity }}
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</motion.svg>
									</Link>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</motion.section>

				{/* Vår erfarenhet */}
				<motion.section
					className="relative overflow-hidden"
					style={{
						paddingTop: '14rem',
						paddingBottom: '6rem',
						marginTop: '-2rem',
						borderTop: 'none',
						boxShadow: 'none',
					}}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
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
					{/* Overlay absolutely positioned, full width */}
					<div className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-sm" style={{ zIndex: 1 }} />

					{/* Top gradient fade */}
					<div
						className="absolute top-0 left-0 w-full h-32 z-30 pointer-events-none"
						style={{
							background:
								'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)',
						}}
					/>

					{/* Centered content only */}
					<div className="relative z-10 max-w-7xl mx-auto" style={{ marginTop: '-8rem' }}>
						<motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
							<h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">Vår erfarenhet</h3>

							{/* Mobile: Auto-sliding cards */}
							<div className="md:hidden mt-8">
								<div className="relative overflow-hidden rounded-xl">
									<div
										className="flex transition-transform duration-500 ease-in-out"
										style={{ transform: `translateX(-${currentCard * 100}%)` }}
									>
										{experienceCards.map((card, index) => (
											<div key={index} className="w-full flex-shrink-0">
												<motion.div
													className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-4 shadow-lg text-white flex flex-col h-full mx-2"
													initial="initial"
													whileInView="animate"
													viewport={{ once: true, amount: 0.2 }}
													variants={fadeInUp}
													transition={{ duration: 0.8, delay: card.delay * 0.25 }}
												>
													{/* Background pattern */}
													<motion.div
														className="absolute inset-0 opacity-10 pointer-events-none"
														initial={{ backgroundPosition: '0% 0%' }}
														animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
														transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
														style={{
															backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
															backgroundSize: '20px 20px',
														}}
													/>
													<div className="relative z-10 flex flex-col items-center justify-center h-full">
														<motion.h2
															className="text-lg font-bold mb-2 text-white text-center"
															initial="initial"
															whileInView="animate"
															viewport={{ once: true, amount: 0.2 }}
															variants={fadeInUp}
															transition={{ duration: 0.8, delay: card.delay * 0.25 }}
														>
															{card.title}
														</motion.h2>
														<motion.div
															className="text-3xl font-bold mb-2 text-white text-center"
															initial="initial"
															whileInView="animate"
															viewport={{ once: true, amount: 0.2 }}
															variants={fadeInUp}
															transition={{ duration: 0.8, delay: card.delay * 0.25 }}
														>
															{card.count}
														</motion.div>
														<motion.p
															className="text-white/90 text-sm text-center leading-relaxed"
															initial="initial"
															whileInView="animate"
															viewport={{ once: true, amount: 0.2 }}
															variants={fadeInUp}
															transition={{ duration: 0.8, delay: card.delay * 0.25 }}
														>
															{card.description}
														</motion.p>
													</div>
												</motion.div>
											</div>
										))}
									</div>

									{/* Dots indicator */}
									<div className="flex justify-center mt-3 space-x-2">
										{experienceCards.map((_, index) => (
											<button
												key={index}
												onClick={() => setCurrentCard(index)}
												className={`w-2.5 h-2.5 rounded-full transition-colors ${
													index === currentCard ? 'bg-[#10B981]' : 'bg-gray-300'
												}`}
											/>
										))}
									</div>
								</div>
							</div>

							{/* Desktop: Original grid layout */}
							<div className="hidden md:grid mt-12 grid-cols-3 gap-6 max-w-6xl mx-auto">
								{experienceCards.map((card, index) => (
									<motion.div
										key={index}
										className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col h-full"
										initial="initial"
										whileInView="animate"
										viewport={{ once: true, amount: 0.2 }}
										variants={fadeInUp}
										transition={{ duration: 0.8, delay: card.delay * 0.25 }}
									>
										{/* Background pattern */}
										<motion.div
											className="absolute inset-0 opacity-10 pointer-events-none"
											initial={{ backgroundPosition: '0% 0%' }}
											animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
											transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
											style={{
												backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
												backgroundSize: '20px 20px',
											}}
										/>
										<div className="relative z-10 flex flex-col items-center justify-center h-full">
											<motion.h2
												className="text-xl font-bold mb-2 text-white"
												initial="initial"
												whileInView="animate"
												viewport={{ once: true, amount: 0.2 }}
												variants={fadeInUp}
												transition={{ duration: 0.8, delay: card.delay * 0.25 }}
											>
												{card.title}
											</motion.h2>
											<motion.div
												className="text-4xl md:text-5xl font-bold mb-2 text-white"
												initial="initial"
												whileInView="animate"
												viewport={{ once: true, amount: 0.2 }}
												variants={fadeInUp}
												transition={{ duration: 0.8, delay: card.delay * 0.25 }}
											>
												{card.count}
											</motion.div>
											<motion.p
												className="text-white/90"
												initial="initial"
												whileInView="animate"
												viewport={{ once: true, amount: 0.2 }}
												variants={fadeInUp}
												transition={{ duration: 0.8, delay: card.delay * 0.25 }}
											>
												{card.description}
											</motion.p>
										</div>
									</motion.div>
								))}
							</div>

							{/* Experience description text and badges */}
							<div className="mt-8 flex flex-col items-center justify-center gap-4">
								{/* Experience description text */}
								<motion.div
									className="flex-1 max-w-4xl text-center"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8 }}
								>
									<h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Lokal erfarenhet i Stockholm</h4>
									<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4 px-4 md:px-8">
										Vi har hjälpt tusentals kunder med deras bortforsling i Stockholm och omnejd. Vår lokala kunskap och erfarenhet säkerställer att vi kan hantera alla typer av bortforsling, från små lägenheter till stora kontorsrensningar.
									</p>
									{!showFullExperienceText && (
										<div className="md:hidden mb-3">
											<motion.button
												onClick={() => setShowFullExperienceText(true)}
												className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4"
											>
												Läs mer
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
												</svg>
											</motion.button>
										</div>
									)}
									{showFullExperienceText && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											transition={{ duration: 0.5 }}
											className="space-y-4 mt-4 md:hidden px-4 md:px-8"
										>
											<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
												Med över 8 års erfarenhet har vi byggt upp rykte för kvalitet, pålitlighet och kundnöjdhet. Vi förstår de lokala förutsättningarna och kan erbjuda skräddarsydda lösningar för alla behov.
											</p>
										</motion.div>
									)}
									<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
										Med över 8 års erfarenhet har vi byggt upp rykte för kvalitet, pålitlighet och kundnöjdhet. Vi förstår de lokala förutsättningarna och kan erbjuda skräddarsydda lösningar för alla behov.
									</p>
								</motion.div>

								{/* Badges - mobile pyramid layout */}
								<div className="flex flex-col md:hidden items-center">
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
									<div className="flex items-center justify-center gap-4">
										<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
											<Image
												src="/recommendedcompany2.png"
												alt="Rekommenderad bortforslingsfirma - Flyttella"
												width={160}
												height={160}
												className="object-contain h-32 w-32"
												priority={false}
											/>
										</motion.div>
										<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
											<Image
												src="/bestinswedenbadge-modified.png"
												alt="Top 10 bortforslingsfirma - Flyttella"
												width={180}
												height={180}
												className="object-contain h-28 w-28"
												priority={false}
											/>
										</motion.div>
									</div>
								</div>

								{/* Badges - desktop horizontal layout */}
								<div className="hidden md:flex items-center justify-center gap-6">
									<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
										<Image
											src="/recommendedcompany2.png"
											alt="Rekommenderad bortforslingsfirma - Flyttella"
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
											alt="Top 10 bortforslingsfirma - Flyttella"
											width={300}
											height={300}
											className="object-contain h-48 w-48"
											priority={false}
										/>
									</motion.div>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Bottom gradient fade - mobile only, shorter */}
					<div
						className="absolute bottom-0 left-0 w-full h-24 md:h-48 z-30 pointer-events-none"
						style={{
							background:
								'linear-gradient(to top, white 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%)',
						}}
					/>
				</motion.section>

				{/* Process Section - SEO optimized for bortforsling */}
				<section className="section-padding bg-white relative overflow-hidden">
					<div className="mx-auto px-0 md:px-24 relative z-10">
						<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full">
							<div className="w-full">
								<h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
									Vår process för bortforsling
								</h2>

								{/* Process Description */}
								<div className="text-center mb-6 md:mb-8 hidden md:block">
									<p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
										Vår bortforslingsprocess är utformad för att vara enkel, säker och miljövänlig. Vi följer strikta riktlinjer för att säkerställa att allt avfall hanteras korrekt och återvinns när det är möjligt.
									</p>
								</div>

								{/* Pricing Info */}
								<div className="text-center mb-4 md:mb-8">
									<p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
										Våra offerter är alltid baserade på dina specifika behov och omständigheter. Vi tar hänsyn till faktorer som mängd avfall, typ av material, tillgänglighet och transportavstånd för att ge dig en offert som passar just din situation. Vi kan även besikta platsen vid behov. Alla priser är fasta utan dolda avgifter - vi utgår alltid från dina önskemål och information vi får från dig som kund. Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.
									</p>
								</div>

								{/* Process Flow Section */}
								<div className="mb-4 md:mb-8">
									<h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">Så fungerar vår bortforsling</h3>
									<div className="relative w-full">
										{/* Timeline connector line */}
										<div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
										<div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
											{[
												{
													icon: <FillFormLottie />,
													title: "Kontakta oss",
													description: "Kontakta oss för en kostnadsfri offert på bortforsling",
													textClass: ""
												},
												{
													icon: <FastLottie />,
													title: "Få offert",
													description: "Få en snabb och kostnadsfri offert på din bortforsling",
													textClass: ""
												},
												{
													icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
													title: "Bekräftelse",
													description: "Bekräfta bokning och få all information",
													containerClass: "md:-mt-6",
													textClass: ""
												},
												{
													icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
													title: "Personlig kontakt",
													description: "Vi kontaktar dig för att bekräfta detaljer och planera hämtning",
													containerClass: "md:-mt-7",
													textClass: ""
												},
												{
													icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
													title: "Transport & Återvinning",
													description: "Vi transporterar och sorterar för återvinning",
													containerClass: "md:-mt-14",
													textClass: "md:-mt-8",
												},
												{
													icon: <div className="md:mt-0"><HappyCustomerLottie /></div>,
													title: "Nöjd kund",
													description: "En ren och tom plats - du är nöjd!",
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

				{/* Blog Post Section (copied from bohagsflytt) */}
				<section className="py-8 md:py-16 bg-gray-50">
					<div className="w-full px-4 md:px-6">
						<div className="w-full">
							<div className="text-center mb-8 md:mb-12">
								<h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">
									Läs mer om bortforsling i Stockholm
								</h2>
								<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
									Få värdefulla tips och råd för en smidig bortforsling
								</p>
							</div>
							<div className="max-w-6xl mx-auto">
								<div className="grid md:grid-cols-1 gap-4 md:gap-2">
									<motion.div 
										className="bg-white rounded-2xl shadow-lg overflow-hidden"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6 }}
										viewport={{ once: true }}
									>
										<div className="flex flex-col md:flex-row h-full items-stretch">
											<div className="w-full md:w-1/3 h-48 md:h-full">
												<img 
													src="/tipsforflytt.jpg" 
													alt="Bortforslingstips Stockholm" 
													className="w-full h-full object-cover object-[60%_center]"
												/>
											</div>
											<div className="w-full md:w-2/3 p-4 md:p-6">
												<div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4 space-y-2 sm:space-y-0">
													<span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium w-fit">
														Bortforsling
													</span>
													<span className="text-gray-500 text-sm md:text-base sm:ml-4">5 min läsning</span>
												</div>
												<h3 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-4 md:mb-6 leading-tight">
													Vad bör du tänka på inför bortforsling av möbler och grovsopor
												</h3>
												<p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
													Rätt planering gör bortforslingen enkel och trygg. Vi går igenom viktiga steg – från sortering och tillgänglighet till miljövänlig hantering och tydliga priser.
												</p>
												<div className="flex justify-start sm:justify-between items-center">
													<div></div>
													<Link 
														href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma" 
														className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:opacity-90 transition-opacity font-medium text-sm md:text-base group w-fit"
													>
														Läs mer
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
									</motion.div>
								</div>
							</div>
						</div>
						<div className="text-center mt-8 md:mt-12">
							<Link 
								href="/blogg" 
								className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white hover:opacity-90 transition-opacity px-4 py-2 md:px-6 md:py-3 rounded-full font-medium group shadow-lg hover:shadow-xl text-sm md:text-base"
							>
								Se alla artiklar
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
				</section>

				{/* FAQ Section: Vanliga frågor om bortforsling */}
				<section className="py-20 bg-white">
					<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						'mainEntity': [
							{
								'@type': 'Question',
								'name': 'Vad är bortforsling?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Bortforsling innebär att ta bort och hantera avfall, grovsopor och oönskade möbler från en fastighet. Detta kan vara allt från gamla möbler och vitvaror till byggavfall och trädgårdsavfall.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Hur lång tid tar en bortforsling?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Tiden beror på mängden avfall, tillgänglighet och eventuella tilläggstjänster. En normal bortforsling tar oftast 2-4 timmar, men större projekt kan ta en hel dag.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Vad kostar bortforsling?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Priset varierar beroende på mängd avfall, typ av material, tillgänglighet och transportavstånd. Vi ger alltid en fast prisoffert utan dolda avgifter.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Kan ni återvinna material?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Ja, vi sorterar allt material och återvinner så mycket som möjligt. Vi följer miljöregler och ser till att allt hanteras på rätt sätt.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Behöver jag vara hemma under bortforslingen?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Nej, du behöver inte vara hemma. Vi kan utföra bortforslingen på egen hand efter att vi kommit överens om vad som ska tas bort.'
								}
							}
						]
					})}} />
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
								Vanliga frågor om bortforsling
							</h2>
							<div className="space-y-4">
								{[
									{
										id: "bortforsling-1",
										question: "Hur förbereder jag mig bäst inför bortforsling?",
										answer: "Börja med att sortera dina saker i högar: vad som ska kastas, vad som kan säljas/doneras och vad som ska behållas. Ta bort alla lösa föremål från området som ska rensas. Se till att vi har tillgång till området och att det finns plats för våra fordon. Om du har särskilt känsliga eller värdefulla föremål, markera dessa tydligt."
									},
									{
										id: "bortforsling-2",
										question: "Vad ingår vanligtvis i en bortforsling?",
										answer: "En bortforsling inkluderar oftast bärhjälp, lastning, transport och miljövänlig hantering av avfallet. Vi sorterar material för återvinning och ser till att allt hanteras enligt gällande miljöregler. Vi kan även erbjuda tilläggstjänster som städning av området efter bortforslingen."
									},
									{
										id: "bortforsling-3",
										question: "Hur fungerar miljöhantering vid bortforsling?",
										answer: "Vi följer strikta miljöregler och sorterar allt material för maximal återvinning. Elektronik, farligt avfall och byggmaterial hanteras enligt särskilda regler. Vi dokumenterar all hantering och kan ge dig kvitton på att allt har hanterats korrekt."
									},
									{
										id: "bortforsling-4",
										question: "Hur lång tid tar en bortforsling och vad påverkar tidsåtgången?",
										answer: "Tidsåtgången beror på flera faktorer: mängden avfall, tillgänglighet till området, behov av specialutrustning, och om du valt tilläggstjänster som städning. En normal bortforsling tar oftast 2-4 timmar, men större projekt kan ta en hel dag."
									},
									{
										id: "bortforsling-5",
										question: "Kan ni hantera alla typer av avfall?",
										answer: "Vi hanterar de flesta typer av avfall inklusive möbler, vitvaror, byggavfall och trädgårdsavfall. För farligt avfall som asbest, kemikalier eller medicinsk avfall krävs särskild hantering - kontakta oss för rådgivning. Vi kan även hjälpa dig med sortering av återvinningsbart material."
									}
								].map((faq, index) => (
									<motion.div
										key={faq.id}
										className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<button
											onClick={() => toggleFAQBortforsling(faq.id)}
											className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
										>
											<h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">
												{faq.question}
											</h3>
											<motion.div
												animate={{ rotate: openFAQBortforsling === faq.id ? 180 : 0 }}
												transition={{ duration: 0.3 }}
												className="flex-shrink-0"
											>
												<svg
													className="w-6 h-6 text-[#10B981]"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</motion.div>
										</button>
										<motion.div
											initial={false}
											animate={{
												height: openFAQBortforsling === faq.id ? "auto" : 0,
												opacity: openFAQBortforsling === faq.id ? 1 : 0
											}}
											transition={{
												height: { duration: 0.3, ease: "easeInOut" },
												opacity: { duration: 0.2, ease: "easeInOut" }
											}}
											className="overflow-hidden"
										>
											<div className="px-6 pb-6">
												<p className="text-gray-600 text-base md:text-lg leading-relaxed">
													{faq.answer}
												</p>
											</div>
										</motion.div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
					<div className="text-center mt-12">
						<p className="text-lg text-gray-600 mb-6">
							Har du fler frågor?
						</p>
						<Link 
							href="/faq" 
							className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
						>
							Se alla vanliga frågor
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
				</section>


			</div>
		</main>
	);
}


