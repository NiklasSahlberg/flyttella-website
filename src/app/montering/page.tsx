'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

export default function MonteringPage() {
	const { t, locale } = useLanguage();
	const [showFullAboutText, setShowFullAboutText] = useState(false);
	const [showFullExperienceText, setShowFullExperienceText] = useState(false);
	const [currentCard, setCurrentCard] = useState(0);
	
	// State for FAQ section
	const [openFAQMontering, setOpenFAQMontering] = useState<string | null>(null);

	const toggleFAQMontering = (id: string) => {
		setOpenFAQMontering(openFAQMontering === id ? null : id);
	};
	
	// Auto-advance cards on mobile
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentCard((prev) => (prev + 1) % 3);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const experienceCards = [
		{ title: t('montering.experience.cards.0.title'), count: t('montering.experience.cards.0.count'), description: t('montering.experience.cards.0.description'), delay: 0 },
		{ title: t('montering.experience.cards.1.title'), count: t('montering.experience.cards.1.count'), description: t('montering.experience.cards.1.description'), delay: 0 },
		{ title: t('montering.experience.cards.2.title'), count: t('montering.experience.cards.2.count'), description: t('montering.experience.cards.2.description'), delay: 1 },
	];
	
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.8 }
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
									backgroundImage: 'url(/montering_ny2.png)',
									backgroundSize: 'cover',
									backgroundPosition: 'center 40%'
								}}
							/>
							<div className="relative z-10 text-center px-4">
								<h1 className="text-5xl font-bold mb-6">{t('montering.hero.title')}</h1>
								<p className="text-2xl text-white/90">{t('montering.hero.description')}</p>
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
									backgroundImage: 'url(/montering_ny2.png)',
									backgroundSize: 'cover',
									backgroundPosition: '0% 40%'
								}}
							/>
							<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
								<div className="max-w-xl w-full">
									<h1 className="text-5xl md:text-6xl font-bold mb-8">{t('montering.hero.title')}</h1>
									<p className="text-2xl md:text-3xl mb-12">{t('montering.hero.subtitle')}</p>
									<p className="text-xl md:text-2xl text-white/90">{t('montering.hero.description')}</p>
								</div>
								{/* Right-side CTA directly on background */}
								<div className="w-full md:w-1/2 lg:w-[40%]">
									<h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('montering.hero.cta.title')}</h3>
									<p className="text-white/90 mb-6 text-lg md:text-xl">{t('montering.hero.cta.description')}</p>
									<div>
										<Link 
											href="/kontakt?scroll=message&service=montering"
											className="inline-flex items-center bg-white text-[#0F172A] px-5 py-3 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
										>
											{t('montering.hero.cta.button')}
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
										<span className="text-sm font-medium mb-2">{t('montering.hero.readMore')}</span>
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

				{/* What is Montering Section with Sidebar (SEO-optimized) */}
				<section id="content" className="py-0 md:py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-6xl mx-auto relative">
										{/* Sidebar: Reviews widget (sticky) */}
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[12.5rem] w-72 sidebar-widget">
								<div className="sticky top-8">
									<iframe 
										src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5"
										className="w-full h-[1000px] border-0"
										title={t('montering.sidebar.reviews.title')}
									/>
								</div>
							</div>

										{/* Sidebar Service Cards */}
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1410px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🏬</span><h3 className="text-xl font-bold text-white">{t('montering.sidebar.services.magasinering.title')}</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">{t('montering.sidebar.services.magasinering.description')}</p>
										<div className="mt-auto relative"><Link href="/magasinering" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{t('montering.sidebar.services.magasinering.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1640px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🗑️</span><h3 className="text-xl font-bold text-white">{t('montering.sidebar.services.bortforsling.title')}</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">{t('montering.sidebar.services.bortforsling.description')}</p>
										<div className="mt-auto relative"><Link href="/bortforsling" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{t('montering.sidebar.services.bortforsling.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1890px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🎹</span><h3 className="text-xl font-bold text-white">{t('montering.sidebar.services.tunglyft.title')}</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">{t('montering.sidebar.services.tunglyft.description')}</p>
										<div className="mt-auto relative"><Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">{t('montering.sidebar.services.tunglyft.readMore')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>

							{/* Main content - Centered (matching bortforsling) */}
							<div className="space-y-12 md:space-y-16">
								{([
									{ title: t('montering.content.whatIsTitle'), content: t('montering.content.whatIsDescription'), icon: '🔧' },
									{ title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-12"><img src="/montering_ny2.png" alt={t('montering.hero.subtitle')} className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-cover" style={{ objectPosition: 'center 40%' }} /></div>), icon: '' },
									{ title: t('montering.content.pricingTitle'), content: (<div className="px-4 md:px-0">
											<p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl mb-4">{t('montering.content.pricingDescription')}</p>
											<p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">Skicka en förfrågan med kort beskrivning och gärna bilder så återkommer vi snabbt med ett pris utan dolda avgifter. <Link href="/kontakt?scroll=message&service=montering" className="text-[#10B981] hover:text-[#059669] underline font-medium transition-colors duration-300">Kontakta oss</Link>.</p>
											
											{/* Customer Quote */}
											<div className="my-12 md:my-16 text-left md:text-center px-4">
												<p className="text-xl md:text-2xl lg:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
													"{t('montering.content.pricingTestimonial')}"
												</p>
												<p className="italic text-gray-700 mt-2">- {t('montering.content.testimonialAuthor')}</p>
											</div>
										</div>), icon: '💸' },
									{ title: t('montering.content.includesTitle'), content: (<p className="px-4 md:px-0 text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">{t('montering.content.includesDescription')}</p>), icon: '✅' },
									{ title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-12"><img src="/intro_picture.jpg" alt="Assembly tips" className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-cover" /></div>), icon: '' },
									{ title: t('montering.content.bookingTitle'), content: (<div className="px-4 md:px-0"><p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">{t('montering.content.bookingDescription')}</p></div>), icon: '📞' },
								] as { title: string; content: any; icon: string }[]).map((section, index) => (
									<div key={index} className="group">
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
									</div>
								))}
							</div>
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
						boxShadow: 'none',
					}}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
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

							<h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60 om-oss-title">{t('montering.about.title')}</h3>

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
									{/* Desktop: Always show full text in 3 sections */}
									<div className="hidden lg:block space-y-8">
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											{t('montering.about.description1')}
										</p>
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											{t('montering.about.description2')}
										</p>
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											{t('montering.about.description3')}
										</p>
									</div>
									
									{/* Mobile: Show shortened text with expand option */}
									<div className="lg:hidden space-y-4">
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											{t('montering.about.mobileDescription')}
										</p>
										
										{!showFullAboutText && (
											<button
												onClick={() => setShowFullAboutText(true)}
												className="mt-4 inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
											>
												{t('montering.about.readMore')}
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
													{t('montering.about.mobileDescription2')}
												</p>
												<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
													{t('montering.about.mobileDescription3')}
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
														className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-xl underline decoration-2 underline-offset-4"
													>
														{t('montering.about.readMoreAbout')}
														<svg 
															xmlns="http://www.w3.org/0 24" 
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
											{t('montering.about.readMoreAbout')}
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
				</motion.section>

				{/* Vad tycker våra kunder om oss */}
				<ReviewsWidget 
					title={t('montering.reviews.title')}
					subtitle={t('montering.reviews.subtitle')}
					description={t('montering.reviews.description')}
					arrowText={t('montering.reviews.arrowText')}
				/>

				{/* CTA: Redo att boka din montering? */}
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
								<span className="text-3xl md:text-4xl">🔧</span>
								<div>
									<h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
										{t('montering.cta.title')}
									</h3>
									<p className="text-base md:text-lg text-gray-100">
										{t('montering.cta.subtitle')}
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
										href="/kontakt?scroll=message&service=montering"
										className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
									>
										{t('montering.cta.button')}
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
								{t('montering.services.title')}
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
										{t('montering.services.flyttstadning.title')}
									</h3>
								</div>
								<p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
									{t('montering.services.flyttstadning.description')}
								</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">
									{t('montering.services.flyttstadning.descriptionExtended')}
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
											{t('montering.services.flyttstadning.readMore')}
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
										{t('montering.services.bohagsflytt.title')}
									</h3>
              </div>
								<p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
									{t('montering.services.bohagsflytt.description')}
								</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">
								{t('montering.services.bohagsflytt.descriptionExtended')}
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
											{t('montering.services.bohagsflytt.readMore')}
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
										{t('montering.services.magasinering.title')}
									</h3>
                </div>
								<p className="text-lg md:text-xl text-gray-100 mb-1 md:mb-8 relative">
								{t('montering.services.magasinering.description')}
								</p>
								<p className="md:hidden text-lg text-gray-100 mb-6 md:mb-0 relative">
									{t('montering.services.magasinering.descriptionMobile')}
								</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">
									{t('montering.services.magasinering.descriptionExtended')}
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
											{t('montering.services.magasinering.readMore')}
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
								{t('montering.services.allServices.title')}
							</motion.h2>
							<motion.h2 
								className="text-3xl md:text-4xl font-bold mb-6 md:hidden"
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.2 }}
								variants={fadeInUp}
								transition={{ 
									duration: 0.8,
									delay: 0 * 0.25
								}}
								id="upptack-tjanster-mobile"
							>
								{t('montering.services.allServices.title')}
							</motion.h2>
							<motion.p 
								className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12"
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.2 }}
								variants={fadeInUp}
								transition={{ 
									duration: 0.8,
									delay: 0.25
								}}
							>
								{t('montering.services.allServices.description')}
							</motion.p>
							<motion.div 
								className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.2 }}
								variants={fadeInUp}
								transition={{ 
									duration: 0.8,
									delay: 0.5
								}}
							>
								<Link 
									href="/tjanster" 
									className="inline-flex items-center justify-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:opacity-90 transition-opacity font-medium group text-base md:text-lg"
								>
									{t('montering.services.allServices.movingServices')}
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
								<Link 
									href="/stadtjanster" 
									className="inline-flex items-center justify-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:opacity-90 transition-opacity font-medium group text-base md:text-lg"
								>
									{t('montering.services.allServices.cleaningServices')}
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
							<h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{t('montering.experience.title')}</h3>

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
													index === currentCard ? 'bg-[#10B981]' : 'bg-white'
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
									<h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t('montering.experience.localExperience')}</h4>
									<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4 px-4 md:px-8">
										{t('montering.experience.localExperienceDescription')}
									</p>
									{!showFullExperienceText && (
										<div className="md:hidden mb-3">
											<motion.button
												onClick={() => setShowFullExperienceText(true)}
												className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4"
											>
												{t('montering.experience.readMore')}
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
												{t('montering.experience.experienceDescription')}
											</p>
										</motion.div>
									)}
									<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
										{t('montering.experience.experienceDescription')}
									</p>
								</motion.div>

								{/* Badges - mobile pyramid layout */}
								<div className="flex flex-col md:hidden items-center">
									<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300 -mb-8">
										<Image
											src="/1000reviewspicture.png"
											alt="1000+ positive customer reviews"
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
												alt="Recommended assembly company - Flyttella"
												width={160}
												height={160}
												className="object-contain h-32 w-32"
												priority={false}
											/>
										</motion.div>
										<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
											<Image
												src="/bestinswedenbadge-modified.png"
												alt="Top 10 assembly company - Flyttella"
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
											alt="Recommended assembly company - Flyttella"
											width={240}
											height={240}
											className="object-contain h-60 w-60"
											priority={false}
										/>
									</motion.div>
									<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
										<Image
											src="/1000reviewspicture.png"
											alt="1000+ positive customer reviews"
											width={260}
											height={260}
											className="object-contain h-64 w-64 mt-3"
											priority={false}
										/>
									</motion.div>
									<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
										<Image
											src="/bestinswedenbadge-modified.png"
											alt="Top 10 assembly company - Flyttella"
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

				{/* Process Section - SEO optimized for montering */}
				<section className="section-padding bg-white relative overflow-hidden">
					<div className="mx-auto px-0 md:px-24 relative z-10">
						<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full">
							<div className="w-full">
								<h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
									{t('montering.process.title')}
            </h2>

								{/* Process Description */}
								<div className="text-center mb-6 md:mb-8 hidden md:block">
									<p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
										{t('montering.process.description')}
									</p>
								</div>

								{/* Pricing Info */}
								<div className="text-center mb-4 md:mb-8">
									<p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
										{t('montering.process.pricingInfo')}
									</p>
								</div>

								{/* Process Flow Section */}
								<div className="mb-4 md:mb-8">
									<h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{t('montering.process.stepsTitle')}</h3>
									<div className="relative w-full">
										{/* Timeline connector line */}
										<div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
										<div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
											{[
												{
													icon: <FillFormLottie />,
													title: t('montering.process.steps.0.title'),
													description: t('montering.process.steps.0.description'),
													textClass: ""
												},
												{
													icon: <FastLottie />,
													title: t('montering.process.steps.1.title'),
													description: t('montering.process.steps.1.description'),
													textClass: ""
												},
												{
													icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
													title: t('montering.process.steps.2.title'),
													description: t('montering.process.steps.2.description'),
													containerClass: "md:-mt-6",
													textClass: ""
												},
												{
													icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
													title: t('montering.process.steps.3.title'),
													description: t('montering.process.steps.3.description'),
													containerClass: "md:-mt-7",
													textClass: ""
												},
												{
													icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
													title: t('montering.process.steps.4.title'),
													description: t('montering.process.steps.4.description'),
													containerClass: "md:-mt-14",
													textClass: "md:-mt-8",
												},
												{
													icon: <div className="md:mt-0"><HappyCustomerLottie /></div>,
													title: t('montering.process.steps.5.title'),
													description: t('montering.process.steps.5.description'),
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
				<section className="py-8 md:py-16 bg-gray-50">
					<div className="w-full px-4 md:px-6">
						<div className="w-full">
							<div className="text-center mb-8 md:mb-12">
								<h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">
									{t('montering.blog.title')}
          </h2>
								<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
									{t('montering.blog.subtitle')}
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
													src="/montering_ny2.png" 
													alt="Assembly tips Stockholm" 
													className="w-full h-full object-cover object-center"
												/>
											</div>
											<div className="w-full md:w-2/3 p-4 md:p-6">
												<div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4 space-y-2 sm:space-y-0">
													<span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium w-fit">
														{t('montering.blog.post.category')}
													</span>
													<span className="text-gray-500 text-sm md:text-base sm:ml-4">{t('montering.blog.post.readTime')}</span>
												</div>
												<h3 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-4 md:mb-6 leading-tight">
													{t('montering.blog.post.title')}
												</h3>
												<p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
													{t('montering.blog.post.description')}
												</p>
												<div className="flex justify-start sm:justify-between items-center">
													<div></div>
													<Link 
														href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma" 
														className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:opacity-90 transition-opacity font-medium text-sm md:text-base group w-fit"
													>
														{t('montering.blog.post.readMore')}
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
					</div>
				</section>

				{/* FAQ Section: Vanliga frågor om montering */}
				<section className="py-20 bg-white">
					<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						'mainEntity': [
							{
								'@type': 'Question',
								'name': 'Vad är montering?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Montering innebär att sätta ihop och installera möbler, inredning och andra föremål. Detta kan vara allt från enkla möbler som bordsstolar till mer komplexa inredningar som köksinredning och garderober.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Hur lång tid tar en montering?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Tiden beror på komplexiteten av monteringen, antalet möbler och eventuella tilläggstjänster. En normal montering tar oftast några timmar, men större projekt kan ta en hel dag.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Vad kostar montering?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Priset varierar beroende på komplexitet, antal möbler, tillgänglighet och eventuella specialkrav. Vi ger alltid en prisoffert utan några dolda avgifter.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Kan ni montera alla typer av möbler?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Ja, vi monterar de flesta typer av möbler inklusive IKEA-möbler, köksinredning, garderober och specialmöbler. Vi har erfarenhet av både enkla och komplexa monteringsuppgifter.'
								}
							},
							{
								'@type': 'Question',
								'name': 'Behöver jag vara hemma under monteringen?',
								'acceptedAnswer': {
									'@type': 'Answer',
									'text': 'Nej, du behöver inte vara hemma. Vi kan utföra monteringen på egen hand efter att vi kommit överens om vad som ska monteras och hur.'
								}
							}
						]
					})}} />
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
								{t('montering.faq.title')}
          </h2>
							<div className="space-y-4">
								{(locale === 'sv' ? [
									{
										id: "montering-1",
										question: "Hur förbereder jag mig bäst inför montering?",
										answer: "Börja med att rensa området där monteringen ska ske. Se till att alla delar och instruktioner finns tillgängliga. Kontrollera att det finns tillräckligt med utrymme för att arbeta. Om du har särskilda önskemål eller preferenser, skriv ner dessa så vi kan följa dem."
									},
									{
										id: "montering-2",
										question: "Vad ingår vanligtvis i en montering?",
										answer: "En montering inkluderar oftast sammanbyggning av möbler, installation av beslag och eventuell justering. Vi följer instruktionerna noggrant och ser till att allt sitter säkert och fungerar som det ska. Vi kan även erbjuda tilläggstjänster som flytt av möbler eller städning."
									},
									{
										id: "montering-3",
										question: "Hur fungerar kvalitetskontroll vid montering?",
										answer: "Vi kontrollerar varje steg i monteringsprocessen för att säkerställa att allt är korrekt monterat. Vi testar funktionaliteten och justerar vid behov. Vi dokumenterar allt arbete och ger dig en genomgång av det färdiga resultatet."
									},
									{
										id: "montering-4",
										question: "Hur lång tid tar en montering och vad påverkar tidsåtgången?",
										answer: "Tidsåtgången beror på flera faktorer: komplexiteten av möblerna, antalet möbler, tillgänglighet till området och eventuella specialkrav. En normal montering tar oftast några timmar, men större projekt kan ta en hel dag."
									},
									{
										id: "montering-5",
										question: "Kan ni hantera alla typer av monteringsuppgifter?",
										answer: "Vi hanterar de flesta typer av monteringsuppgifter inklusive IKEA-möbler, köksinredning, garderober och specialmöbler. Vi har erfarenhet av både enkla och komplexa monteringsuppgifter. För särskilt känsliga eller värdefulla möbler kan vi erbjuda extra omsorg och precision."
									}
								] : [
									{
										id: "montering-1",
										question: "How do I best prepare for assembly?",
										answer: "Start by clearing the area where the assembly should take place. Make sure all parts and instructions are available. Check that there is enough space to work. If you have special wishes or preferences, write them down so we can follow them."
									},
									{
										id: "montering-2",
										question: "What is usually included in an assembly?",
										answer: "An assembly usually includes assembly of furniture, installation of hardware and possible adjustment. We follow the instructions carefully and make sure everything is secure and works as it should. We can also offer additional services such as moving furniture or cleaning."
									},
									{
										id: "montering-3",
										question: "How does quality control work for assembly?",
										answer: "We check every step in the assembly process to ensure everything is correctly assembled. We test functionality and adjust if needed. We document all work and give you a walkthrough of the finished result."
									},
									{
										id: "montering-4",
										question: "How long does an assembly take and what affects the time?",
										answer: "The time depends on several factors: the complexity of the furniture, the number of furniture, accessibility to the area and any special requirements. A normal assembly usually takes a few hours, but larger projects can take a whole day."
									},
									{
										id: "montering-5",
										question: "Can you handle all types of assembly tasks?",
										answer: "We handle most types of assembly tasks including IKEA furniture, kitchen fittings, wardrobes and special furniture. We have experience with both simple and complex assembly tasks. For particularly sensitive or valuable furniture, we can offer extra care and precision."
									}
								]).map((faq, index) => (
									<motion.div
										key={faq.id}
										className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<button
											onClick={() => toggleFAQMontering(faq.id)}
											className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
										>
											<h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">
												{faq.question}
											</h3>
											<motion.div
												animate={{ rotate: openFAQMontering === faq.id ? 180 : 0 }}
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
												height: openFAQMontering === faq.id ? "auto" : 0,
												opacity: openFAQMontering === faq.id ? 1 : 0
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
							{t('montering.faq.moreQuestions')}
          </p>
          <Link 
							href="/faq" 
							className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium group"
						>
							{t('montering.faq.allFaq')}
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