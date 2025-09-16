'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FlyttoffertForm from '../components/FlyttoffertForm';
import ReviewsWidget from '../components/ReviewsWidget';
import Lottie from "lottie-react";
import { useLanguage } from '../contexts/LanguageContext';

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

export default function BemanningPage() {
	const { t, locale } = useLanguage();
	const [showFullAboutText, setShowFullAboutText] = React.useState(false);
	const [currentCard, setCurrentCard] = React.useState(0);
	const [showFullExperienceText, setShowFullExperienceText] = React.useState(false);

	// State for FAQ section
	const [openFAQBemanning, setOpenFAQBemanning] = React.useState<string | null>(null);

	const toggleFAQBemanning = (id: string) => {
		setOpenFAQBemanning(openFAQBemanning === id ? null : id);
	};

	// Auto-sliding cards effect
	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentCard((prev) => (prev + 1) % 3);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const experienceCards = [
		{ title: locale === 'sv' ? 'Bemanningar' : 'Staffing assignments', count: '500+', description: locale === 'sv' ? 'Genomförda bemanningar' : 'Completed staffing assignments', delay: 0 },
		{ title: locale === 'sv' ? 'Företag' : 'Companies', count: '1200+', description: locale === 'sv' ? 'Nöjda företagskunder' : 'Satisfied business customers', delay: 1 },
		{ title: locale === 'sv' ? 'År' : 'Years', count: '8+', description: locale === 'sv' ? 'År i branschen' : 'Years in the industry', delay: 2 },
	];
	
	return (
		<main id="top" className="overflow-hidden">
			<div className="main-zoom">
				{/* Hero Section - Matching bortforsling design */}
				<div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
					{/* Mobile: Edge-to-edge hero */}
					<div className="md:hidden">
						<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-12 relative overflow-hidden">
							{/* Background image */}
							<div
								className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
								style={{
									backgroundImage: 'url(/office-moving.png)',
									backgroundSize: 'cover',
									backgroundPosition: 'center 30%'
								}}
							/>
							<div className="relative z-10 text-center px-4">
								<h1 className="text-3xl md:text-5xl font-bold mb-6">{locale === 'sv' ? 'Bemanning och underentreprenad' : 'Staffing and Subcontracting'}</h1>
								<p className="text-lg md:text-2xl text-white/90">{locale === 'sv' ? 'Flexibel bemanning och pålitliga underentreprenörer för flytt, logistik och städ.' : 'Flexible staffing and reliable subcontractors for moving, logistics and cleaning.'}</p>
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
									backgroundImage: 'url(/office-moving.png)',
									backgroundSize: 'cover',
									backgroundPosition: '0% 30%'
								}}
							/>
							<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
								<div className="max-w-xl w-full">
									<h1 className="text-5xl md:text-6xl font-bold mb-8">{locale === 'sv' ? 'Bemanning och underentreprenad i Stockholm' : 'Staffing and Subcontracting in Stockholm'}</h1>
									<p className="text-2xl md:text-3xl mb-12">{locale === 'sv' ? 'Flexibel bemanning och pålitliga underentreprenörer' : 'Flexible staffing and reliable subcontractors'}</p>
									<p className="text-xl md:text-2xl text-white/90">{locale === 'sv' ? 'Vi erbjuder bemanning och underentreprenad för flytt, logistik och städ – när ni behöver förstärka teamet snabbt och säkert. Skalbara lösningar, erfaren personal och smidig projektledning.' : 'We offer staffing and subcontracting for moving, logistics and cleaning – when you need to strengthen your team quickly and safely. Scalable solutions, experienced staff and smooth project management.'}</p>
								</div>
								{/* Right-side CTA directly on background */}
								<div className="w-full md:w-1/2 lg:w-[40%]">
									<h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{locale === 'sv' ? 'Kontakta oss för offert' : 'Contact us for a quote'}</h3>
									<p className="text-white/90 mb-6 text-lg md:text-xl">{locale === 'sv' ? 'Berätta kort vad du behöver hjälp med så återkommer vi snabbt med pris och tid. Vi kan även besikta på plats vid behov.' : 'Tell us briefly what you need help with and we will quickly get back to you with price and time. We can also inspect on site if needed.'}</p>
									<div>
										<Link 
											href="/kontakt?scroll=message&service=bemanning"
											className="inline-flex items-center bg-white text-[#0F172A] px-5 py-3 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group"
										>
											{locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
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

				{/* What is Bemanning Section - matching kontorsflytt structure */}
				<section id="content" className="py-0 md:py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-6xl mx-auto relative">
							{/* Sidebar service cards removed as requested */}

										{/* Reco Widget - Positioned absolutely to the right (desktop) */}
										<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[14.25rem] w-72 z-40 sidebar-widget">
								<div className="sticky top-8">
									<iframe src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5" className="w-full h-[1000px] border-0" title="Flyttella recensioner" />
								</div>
							</div>

							{/* Sidebar Service Cards */}
							<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1310px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🏢</span><h3 className="text-xl font-bold text-white">Kontorsflytt</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Professionell flytt av kontor och företag. Vi säkerställer minimal driftstopp och säker hantering av all utrustning.</p>
										<div className="mt-auto relative"><Link href="/kontorsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>
							<div className="hidden lg:block absolute -right-72 xl:-right-72 lg:-right-48 top-[1620px] w-64 sidebar-widget">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🧹</span><h3 className="text-xl font-bold text-white">Kontorsstädning</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Regelbunden städning av kontor och arbetsplatser. Vi håller ditt kontor rent och professionellt för dina anställda och kunder.</p>
										<div className="mt-auto relative"><Link href="/kontorsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></div>
									</div>
								</div>
							</div>

							<motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
								{/* Main content sections */}
								{([
									{
										title: locale === 'sv' ? 'Vad är bemanning och underentreprenad?' : 'What is staffing and subcontracting?',
										content: locale === 'sv' ? 
											'Bemanning och underentreprenad innebär att vi tillhandahåller kompetenta resurser till ert projekt när behov uppstår – tillfälligt eller långsiktigt. Vi arbetar med flytt, logistik, montering och städ där vårt team integreras i er organisation och levererar enligt era processer. Med tydlig projektledning, försäkringar och arbetsmiljörutiner säkerställer vi kvalitet och effektivitet utan att störa er verksamhet.' :
											'Staffing and subcontracting means that we provide competent resources to your project when needs arise – temporarily or long-term. We work with moving, logistics, assembly and cleaning where our team integrates into your organization and delivers according to your processes. With clear project management, insurance and work environment routines, we ensure quality and efficiency without disrupting your business.',
										icon: '👷‍♂️',
									},
									{
										title: '',
										content: (
											<div className="w-full max-w-6xl mx-auto flex justify-center my-12">
												<img src="/godtid.jpg" alt={locale === 'sv' ? 'Bemanning och underentreprenad i Stockholm' : 'Staffing and subcontracting in Stockholm'} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
											</div>
										),
										icon: ''
									},
									{
										title: locale === 'sv' ? 'Vad kostar bemanning?' : 'How much does staffing cost?',
										content: (
											<>
												<p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">{locale === 'sv' ? 'Pris påverkas av kompetensnivå, antal timmar, tider och uppdragets omfattning. Vi erbjuder tydliga timpriser utan dolda avgifter och kan lämna fastpris för definierade delmoment.' : 'Price is affected by skill level, number of hours, times and scope of the assignment. We offer clear hourly rates without hidden fees and can provide fixed prices for defined sub-tasks.'}</p>
												<div className="my-16 text-center">
													<p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
														{locale === 'sv' ? '"Flyttella levererade exakt den bemanning vi behövde!"' : '"Flyttella delivered exactly the staffing we needed!"'}
													</p>
													<p className="italic text-gray-700 mt-2">- Irina</p>
												</div>
											</>
										),
										icon: '💼'
									},
									{
										title: locale === 'sv' ? 'Vad ingår i bemanning och underentreprenad?' : 'What is included in staffing and subcontracting?',
										content: locale === 'sv' ? 
											'Planering och bemanningsplan, introduktion på plats, arbetsledning vid behov, rapportering, kvalitetssäkring och arbetsmiljö. Vi tillhandahåller bärare, montörer, arbetsledare, logistikkoordinatorer och städpersonal beroende på uppdragets omfattning.' :
											'Planning and staffing plan, on-site introduction, work supervision when needed, reporting, quality assurance and work environment. We provide carriers, assemblers, work supervisors, logistics coordinators and cleaning staff depending on the scope of the assignment.',
										icon: '📋'
									},
									{
										title: '',
										content: (
											<div className="w-full max-w-6xl mx-auto flex justify-center my-12">
												<img src="/kontor.png" alt={locale === 'sv' ? 'Underentreprenad och bemanning – tjänster' : 'Subcontracting and staffing – services'} className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
											</div>
										),
										icon: ''
									},
									{
										title: locale === 'sv' ? 'Hur bokar man bemanning?' : 'How do you book staffing?',
										content: locale === 'sv' ? 
											'Kontakta oss direkt via telefon eller e‑post för en behovsanalys. Vi återkommer så snart som möjligt med pris och förslag. Därefter planerar vi bemanningen och startar enligt överenskommen tidsplan.' :
											'Contact us directly by phone or email for a needs analysis. We will get back to you as soon as possible with price and proposal. Then we plan the staffing and start according to the agreed schedule.',
										icon: '📞'
									}
								] as { title: string; content: any; icon: string; image?: string }[]).map((section, index) => (
									<motion.div
										key={index}
										className="group"
										variants={fadeInUp}
										whileHover={{ y: -4 }}
										transition={{ duration: 0.3 }}
									>
										<div className="max-w-6xl mx-auto">
											<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">
												{section.title}
											</h3>
											{typeof section.content === 'string' ? (
												<p className={`text-gray-700 leading-relaxed px-4 ${section.title === 'Vad är bemanning och underentreprenad?' || section.title === 'Vad ingår i bemanning och underentreprenad?' || section.title === 'Hur bokar man bemanning?' ? 'text-lg md:text-xl lg:text-2xl text-left md:text-center' : 'text-base md:text-lg lg:text-xl'}`}>
													{section.content}
												</p>
											) : (
												<div className="text-gray-700 leading-relaxed text-base md:text-lg lg:text-xl">
													{section.content}
												</div>
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
						boxShadow: 'none',
					}}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					{/* Background image absolutely positioned, full width */}
					<div
						className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
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
										alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'}
										className="object-cover w-full h-full"
										style={{ objectPosition: 'center 70%' }}
									/>
								</div>
							</div>

							<h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center lg:mr-60 om-oss-title">{locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'}</h3>

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
											alt={locale === 'sv' ? 'Om Flyttella' : 'About Flyttella'}
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
											{locale === 'sv' ? 'Flyttella är en flytt- och städfirma med bas i Stockholm som specialiserat sig på att hjälpa företag med bemanning och underentreprenad. Vi grundades med målet att göra det enklare för företag att få tillgång till kompetent personal och pålitliga partners – allt med tydliga villkor och transparenta priser.' : 'Flyttella is a moving and cleaning company based in Stockholm that specializes in helping companies with staffing and subcontracting. We were founded with the goal of making it easier for companies to access competent staff and reliable partners – all with clear terms and transparent prices.'}
										</p>
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											{locale === 'sv' ? 'Hittills har vi haft nöjet att hjälpa över 8000 kunder, både privatpersoner och företag, med allt från små flyttar till helhetslösningar med städning, packning, bemanning, underentreprenad och rådgivning. Vi förstår företagens behov av snabb service, kvalitetssäkring och kostnadseffektivitet. Hos oss vet ni alltid vad som ingår och vad det kostar.' : 'So far we have had the pleasure of helping over 8000 customers, both individuals and companies, with everything from small moves to complete solutions with cleaning, packing, staffing, subcontracting and consulting. We understand companies\' needs for fast service, quality assurance and cost efficiency. With us you always know what\'s included and what it costs.'}
										</p>
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											{locale === 'sv' ? 'Vi erbjuder företagsanpassade lösningar med flexibel bemanning och pålitlig underentreprenad för alla typer av projekt. Vi arbetar enligt era processer och rutiner, erbjuder kostnadsfri om- och avbokning upp till 24 timmar innan. Vår företagsfokuserade kundtjänst finns alltid tillgänglig för att hjälpa er optimera era resurser.' : 'We offer customized business solutions with flexible staffing and reliable subcontracting for all types of projects. We work according to your processes and routines, offer free rebooking and cancellation up to 24 hours before. Our business-focused customer service is always available to help you optimize your resources.'}
										</p>
									</div>
									
									{/* Mobile: Show shortened text with expand option */}
									<div className="lg:hidden space-y-4">
										<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
											{locale === 'sv' ? 'Flyttella är en flytt- och städfirma med bas i Stockholm som specialiserat sig på att hjälpa företag med bemanning och underentreprenad. Vi grundades med målet att göra det enklare för företag att få tillgång till kompetent personal och pålitliga partners – allt med tydliga villkor och transparenta priser.' : 'Flyttella is a moving and cleaning company based in Stockholm that specializes in helping companies with staffing and subcontracting. We were founded with the goal of making it easier for companies to access competent staff and reliable partners – all with clear terms and transparent prices.'}
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
												animate={{ opacity: 1, height: "auto" }}
												transition={{ duration: 0.5 }}
												className="space-y-4 mt-4"
											>
												<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
													{locale === 'sv' ? 'Hittills har vi haft nöjet att hjälpa över 8000 kunder, både privatpersoner och företag, med allt från små flyttar till helhetslösningar med städning, packning, bemanning, underentreprenad och rådgivning. Vi förstår företagens behov av snabb service, kvalitetssäkring och kostnadseffektivitet. Hos oss vet ni alltid vad som ingår och vad det kostar.' : 'So far we have had the pleasure of helping over 8000 customers, both individuals and companies, with everything from small moves to complete solutions with cleaning, packing, staffing, subcontracting and consulting. We understand companies\' needs for fast service, quality assurance and cost efficiency. With us you always know what\'s included and what it costs.'}
												</p>
												<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed">
													{locale === 'sv' ? 'Vi erbjuder företagsanpassade lösningar med flexibel bemanning och pålitlig underentreprenad för alla typer av projekt. Vi arbetar enligt era processer och rutiner, erbjuder kostnadsfri om- och avbokning upp till 24 timmar innan. Vår företagsfokuserade kundtjänst finns alltid tillgänglig för att hjälpa er optimera era resurser.' : 'We offer customized business solutions with flexible staffing and reliable subcontracting for all types of projects. We work according to your processes and routines, offer free rebooking and cancellation up to 24 hours before. Our business-focused customer service is always available to help you optimize your resources.'}
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
											className="inline-flex items-center text-[#0F172A] leading-relaxed text-xl underline decoration-2 underline-offset-4"
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
							</div>
						</motion.div>
					</div>
				</motion.section>

				{/* Vad tycker våra kunder om oss */}
				<ReviewsWidget 
					title={locale === 'sv' ? "Vad tycker våra kunder om oss?" : "What do our customers think about us?"}
					subtitle={locale === 'sv' ? "En professionell och pålitlig bemanning" : "Professional and reliable staffing"}
					description={locale === 'sv' ? "Vi har hjälpt många företag med flexibel bemanning och pålitlig underentreprenad. Våra kunder uppskattar vår snabba service, kvalitetssäkring och kostnadseffektivitet. Hos Flyttella får ni professionell bemanning med fokus på att optimera era resurser och processer." : "We have helped many companies with flexible staffing and reliable subcontracting. Our customers appreciate our fast service, quality assurance and cost efficiency. At Flyttella you get professional staffing with a focus on optimizing your resources and processes."}
				/>

				{/* CTA: Redo att boka bemanning? */}
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
								<span className="text-3xl md:text-4xl">👷‍♂️</span>
								<div>
									<h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
										{locale === 'sv' ? 'Redo att boka bemanning?' : 'Ready to book staffing?'}
									</h3>
									<p className="text-base md:text-lg text-gray-100">
										{locale === 'sv' ? 'Få en snabb och gratis offert på din bemanning' : 'Get a quick and free quote on your staffing'}
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
										href="/kontakt?scroll=message&service=bemanning"
										className="inline-flex items-center bg-white text-[#0F172A] px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm md:text-base"
									>
										{locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
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

				{/* Våra företagstjänster Section */}
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-7xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">
								{locale === 'sv' ? 'Våra företagstjänster' : 'Our business services'}
							</h2>
							<div className="grid grid-cols-1 gap-12">
							{/* Kontorsflytt Card */}
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
									<span className="text-4xl md:text-6xl">🏢</span>
									<h3 className="text-4xl md:text-5xl font-bold text-white">
										{locale === 'sv' ? 'Kontorsflytt' : 'Office Moving'}
									</h3>
								</div>
								<p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">
									{locale === 'sv' ? 'Professionell flytt av kontor och företagslokaler. Vi tar hand om allt från IT-utrustning till möbler med minimal driftstopp.' : 'Professional moving of offices and business premises. We handle everything from IT equipment to furniture with minimal downtime.'}
								</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">
									{locale === 'sv' ? 'Vår kontorsflytt omfattar allt från planering och packning till transport och uppackning. Vi arbetar utanför kontorstid för att minimera påverkan på er verksamhet. Med vår service får ni en smidig flytt där allt hanteras professionellt och säkert.' : 'Our office move includes everything from planning and packing to transport and unpacking. We work outside office hours to minimize impact on your business. With our service you get a smooth move where everything is handled professionally and safely.'}
								</p>
								<div className="mt-auto relative">
									<motion.div 
										whileHover={{ scale: 1.05 }} 
										whileTap={{ scale: 0.95 }}
										className="inline-block"
									>
										<Link 
											href="/kontorsflytt" 
											className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group md:text-lg"
										>
											{locale === 'sv' ? 'Läs mer' : 'Read more'}
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

							{/* Kontorsstädning Card */}
							<motion.div
								className="relative bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-8 md:p-12 shadow-lg text-white flex flex-col h-full md:min-h-[340px]"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.1 }}
							>
								<motion.div className="absolute inset-0 opacity-10 pointer-events-none" initial={{ backgroundPosition: '0% 0%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
								<div className="flex items-center gap-4 mb-6 md:mb-8 relative"><span className="text-4xl md:text-6xl">🧹</span><h3 className="text-3xl md:text-5xl font-bold text-white">{locale === 'sv' ? 'Kontorsstädning' : 'Office Cleaning'}</h3></div>
								<p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8 relative">{locale === 'sv' ? 'Professionell kontorsstädning för företag – regelbunden eller engångsstädning för en ren och produktiv arbetsmiljö.' : 'Professional office cleaning for companies – regular or one-time cleaning for a clean and productive work environment.'}</p>
								<p className="hidden md:block text-lg text-gray-100 mb-8 relative">{locale === 'sv' ? 'Vi erbjuder skräddarsydd kontorsstädning anpassad efter era behov. Daglig, veckovis eller månatlig städning med kvalificerad personal och miljövänliga produkter.' : 'We offer tailored office cleaning adapted to your needs. Daily, weekly or monthly cleaning with qualified staff and environmentally friendly products.'}</p>
								<div className="mt-auto relative"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"><Link href="/kontorsstadning" className="inline-flex items-center bg-white text-[#0F172A] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-base md:text-lg">{locale === 'sv' ? 'Läs mer' : 'Read more'}<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></motion.div></div>
							</motion.div>
							</div>
						</div>
					</div>
				</section>

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
							<h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 text-center">{locale === 'sv' ? 'Vår erfarenhet' : 'Our experience'}</h3>

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
									<h4 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{locale === 'sv' ? 'Lokal erfarenhet i Stockholm' : 'Local experience in Stockholm'}</h4>
									<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-4 px-4 md:px-8">
										{locale === 'sv' ? 'Vi har hjälpt många företag med bemanning och underentreprenad i Stockholm och omnejd. Vår lokala kunskap och erfarenhet säkerställer att vi kan hantera alla typer av bemanningsbehov, från små projekt till stora entreprenader.' : 'We have helped many companies with staffing and subcontracting in Stockholm and the surrounding area. Our local knowledge and experience ensures that we can handle all types of staffing needs, from small projects to large contracts.'}
									</p>
									{!showFullExperienceText && (
										<div className="md:hidden mb-3">
											<motion.button
												onClick={() => setShowFullExperienceText(true)}
												className="inline-flex items-center text-[#0F172A] hover:text-[#10B981] transition-colors font-bold text-lg underline decoration-2 underline-offset-4"
											>
												{locale === 'sv' ? 'Läs mer' : 'Read more'}
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
												{locale === 'sv' ? 'Med över 8 års erfarenhet har vi byggt upp rykte för kvalitet, pålitlighet och kundnöjdhet inom bemanning och underentreprenad. Vi förstår företagens behov och kan erbjuda skräddarsydda lösningar för alla typer av projekt.' : 'With over 8 years of experience, we have built a reputation for quality, reliability and customer satisfaction in staffing and subcontracting. We understand companies\' needs and can offer tailored solutions for all types of projects.'}
											</p>
										</motion.div>
									)}
									<p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-6 hidden md:block">
										{locale === 'sv' ? 'Med över 8 års erfarenhet har vi byggt upp rykte för kvalitet, pålitlighet och kundnöjdhet inom bemanning och underentreprenad. Vi förstår företagens behov och kan erbjuda skräddarsydda lösningar för alla typer av projekt.' : 'With over 8 years of experience, we have built a reputation for quality, reliability and customer satisfaction in staffing and subcontracting. We understand companies\' needs and can offer tailored solutions for all types of projects.'}
									</p>
								</motion.div>

								{/* Badges - mobile pyramid layout */}
								<div className="flex flex-col md:hidden items-center">
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
												alt={locale === 'sv' ? 'Rekommenderad bemanningsfirma - Flyttella' : 'Recommended staffing company - Flyttella'}
												width={160}
												height={160}
												className="object-contain h-32 w-32"
												priority={false}
											/>
										</motion.div>
										<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
											<Image
												src="/bestinswedenbadge-modified.png"
												alt={locale === 'sv' ? 'Top 10 bemanningsfirma - Flyttella' : 'Top 10 staffing company - Flyttella'}
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
											alt={locale === 'sv' ? 'Rekommenderad bemanningsfirma - Flyttella' : 'Recommended staffing company - Flyttella'}
											width={240}
											height={240}
											className="object-contain h-60 w-60"
											priority={false}
										/>
									</motion.div>
									<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
										<Image
											src="/1000reviewspicture.png"
											alt={locale === 'sv' ? '1000+ positiva recensioner från kunder' : '1000+ positive reviews from customers'}
											width={260}
											height={260}
											className="object-contain h-64 w-64 mt-3"
											priority={false}
										/>
									</motion.div>
									<motion.div whileHover={{ scale: 1.08 }} className="transition-transform duration-300">
										<Image
											src="/bestinswedenbadge-modified.png"
											alt={locale === 'sv' ? 'Top 10 bemanningsfirma - Flyttella' : 'Top 10 staffing company - Flyttella'}
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

				{/* Process Section - SEO optimized for bemanning */}
				<section className="section-padding bg-white relative overflow-hidden">
					<div className="mx-auto px-0 md:px-24 relative z-10">
						<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-4 md:p-8 lg:p-10 mb-6 md:mb-8 w-full">
							<div className="w-full">
								<h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
									{locale === 'sv' ? 'Vår process för bemanning' : 'Our staffing process'}
								</h2>

								{/* Process Description */}
								<div className="text-center mb-6 md:mb-8 hidden md:block">
									<p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed">
										{locale === 'sv' ? 'Vår bemanningsprocess är utformad för att vara snabb, flexibel och pålitlig. Vi förstår att företag behöver kvalificerad personal snabbt och vi levererar alltid enligt avtal.' : 'Our staffing process is designed to be fast, flexible and reliable. We understand that companies need qualified staff quickly and we always deliver according to agreement.'}
									</p>
								</div>

								{/* Pricing Info */}
								<div className="text-center mb-4 md:mb-8">
									<p className="text-white text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-3 md:mb-4">
										{locale === 'sv' ? 'Våra offerter är alltid baserade på dina specifika behov och omständigheter. Vi tar hänsyn till faktorer som kompetensnivå, projektets längd, arbetstider och specialkrav för att ge dig en offert som passar just din situation. Vi kan även besikta på plats vid behov. Alla priser är transparenta utan dolda avgifter - vi utgår alltid från dina önskemål och information vi får från dig som kund. Har du särskilda önskemål eller frågor? Kontakta oss så anpassar vi offerten efter dina behov.' : 'Our quotes are always based on your specific needs and circumstances. We take into account factors such as skill level, project duration, working hours and special requirements to give you a quote that fits your situation. We can also inspect on site if needed. All prices are transparent without hidden fees - we always start from your wishes and information we get from you as a customer. Do you have special wishes or questions? Contact us and we will adapt the quote to your needs.'}
									</p>
								</div>

								{/* Process Flow Section */}
								<div className="mb-4 md:mb-8">
									<h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center">{locale === 'sv' ? 'Så fungerar vår bemanning' : 'How our staffing works'}</h3>
									<div className="relative w-full">
										{/* Timeline connector line */}
										<div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/20 -translate-y-1/2 hidden md:block"></div>
										<div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-3 w-full items-stretch">
											{[
												{
													icon: <FillFormLottie />,
													title: locale === 'sv' ? "Kontakta oss" : "Contact us",
													description: locale === 'sv' ? "Kontakta oss för en kostnadsfri offert på bemanning" : "Contact us for a free quote on staffing",
													textClass: ""
												},
												{
													icon: <FastLottie />,
													title: locale === 'sv' ? "Få offert" : "Get quote",
													description: locale === 'sv' ? "Få en snabb och kostnadsfri offert på din bemanning" : "Get a quick and free quote on your staffing",
													textClass: ""
												},
												{
													icon: <div className="ml-4 md:ml-6"><SignFormLottie /></div>,
													title: locale === 'sv' ? "Bekräftelse" : "Confirmation",
													description: locale === 'sv' ? "Bekräfta avtal och få all information" : "Confirm agreement and get all information",
													containerClass: "md:-mt-6",
													textClass: ""
												},
												{
													icon: <div className="md:ml-3 md:mt-8"><PhoneCallLottie /></div>,
													title: locale === 'sv' ? "Personlig kontakt" : "Personal contact",
													description: locale === 'sv' ? "Vi kontaktar dig för att bekräfta detaljer och planera start" : "We contact you to confirm details and plan start",
													containerClass: "md:-mt-7",
													textClass: ""
												},
												{
													icon: <div className="md:mr-3"><MovingTruckLottie /></div>,
													title: locale === 'sv' ? "Bemanning & Utförande" : "Staffing & Execution",
													description: locale === 'sv' ? "Vi levererar kvalificerad personal enligt avtal" : "We deliver qualified staff according to agreement",
													containerClass: "md:-mt-14",
													textClass: "md:-mt-8",
												},
												{
													icon: <div className="md:mt-0"><HappyCustomerLottie /></div>,
													title: locale === 'sv' ? "Nöjd kund" : "Satisfied customer",
													description: locale === 'sv' ? "Ett slutfört projekt - du är nöjd!" : "A completed project - you are satisfied!",
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
									{locale === 'sv' ? 'Läs mer om bemanning i Stockholm' : 'Read more about staffing in Stockholm'}
								</h2>
								<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
									{locale === 'sv' ? 'Få värdefulla tips och råd för smidig bemanning och underentreprenad' : 'Get valuable tips and advice for smooth staffing and subcontracting'}
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
													src="/office-moving.png" 
													alt={locale === 'sv' ? 'Bemanningstips Stockholm' : 'Staffing tips Stockholm'} 
													className="w-full h-full object-cover object-[60%_center]"
												/>
											</div>
											<div className="w-full md:w-2/3 p-4 md:p-6">
												<div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4 space-y-2 sm:space-y-0">
													<span className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium w-fit">
														{locale === 'sv' ? 'Bemanning' : 'Staffing'}
													</span>
													<span className="text-gray-500 text-sm md:text-base sm:ml-4">{locale === 'sv' ? '5 min läsning' : '5 min read'}</span>
												</div>
												<h3 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-4 md:mb-6 leading-tight">
													{locale === 'sv' ? 'Vad bör du tänka på när du väljer bemanning och underentreprenad' : 'What should you consider when choosing staffing and subcontracting'}
												</h3>
												<p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
													{locale === 'sv' ? 'Rätt bemanning är avgörande för projektets framgång. Vi går igenom viktiga faktorer – från kompetens och erfarenhet till flexibilitet och pålitlighet för att säkerställa en smidig samarbete.' : 'The right staffing is crucial for the project\'s success. We go through important factors – from competence and experience to flexibility and reliability to ensure smooth cooperation.'}
												</p>
												<div className="flex justify-start sm:justify-between items-center">
													<div></div>
													<Link 
														href="/blogg/vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma" 
														className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:opacity-90 transition-opacity font-medium text-sm md:text-base group w-fit"
													>
														{locale === 'sv' ? 'Läs mer' : 'Read more'}
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

				{/* FAQ Section: Vanliga frågor om bemanning */}
				<section className="py-20 bg-white">
					<div className="max-w-4xl mx-auto px-4">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
								{locale === 'sv' ? 'Vanliga frågor om bemanning' : 'Frequently Asked Questions about Staffing'}
							</h2>
							<p className="text-lg md:text-xl text-gray-600">
								{locale === 'sv' ? 'Svar på de vanligaste frågorna om våra bemannings- och underentreprenadtjänster' : 'Answers to the most common questions about our staffing and subcontracting services'}
							</p>
						</div>

						<div className="space-y-4">
							{[
								{
									id: 'faq-1',
									question: locale === 'sv' ? 'Vilka typer av bemanning erbjuder ni?' : 'What types of staffing do you offer?',
									answer: locale === 'sv' ? 'Vi erbjuder bemanning för flytt, logistik och städ. Vi kan anpassa bemanningen efter dina specifika behov och kompetenskrav.' : 'We offer staffing for moving, logistics and cleaning. We can adapt the staffing to your specific needs and competence requirements.'
								},
								{
									id: 'faq-2',
									question: locale === 'sv' ? 'Hur snabbt kan ni leverera bemanning?' : 'How quickly can you deliver staffing?',
									answer: locale === 'sv' ? 'Vi kan vanligtvis leverera kvalificerad personal inom några dagar, beroende på dina specifika krav och tillgänglighet. För akuta behov kontakta oss för att diskutera möjligheter.' : 'We can usually deliver qualified staff within a few days, depending on your specific requirements and availability. For urgent needs, contact us to discuss possibilities.'
								},
								{
									id: 'faq-3',
									question: locale === 'sv' ? 'Vad kostar bemanning och underentreprenad?' : 'How much does staffing and subcontracting cost?',
									answer: locale === 'sv' ? 'Priserna varierar beroende på kompetensnivå, projektets längd, arbetstider och specialkrav. Vi ger alltid en transparent offert utan dolda avgifter. Kontakta oss för en kostnadsfri offert anpassad efter dina behov.' : 'Prices vary depending on skill level, project duration, working hours and special requirements. We always give a transparent quote without hidden fees. Contact us for a free quote tailored to your needs.'
								},
								{
									id: 'faq-4',
									question: locale === 'sv' ? 'Har ni försäkringar för bemannad personal?' : 'Do you have insurance for staffed personnel?',
									answer: locale === 'sv' ? 'Ja, all vår bemannade personal är försäkrade. Vi har fullständiga försäkringar som täcker arbetsolyckor, skador på egendom och ansvar. Detta ger dig trygghet och säkerhet i samarbetet.' : 'Yes, all our staffed personnel are insured. We have comprehensive insurance that covers work accidents, property damage and liability. This gives you security and safety in the collaboration.'
								},
								{
									id: 'faq-5',
									question: locale === 'sv' ? 'Kan ni leverera bemanning utanför kontorstid?' : 'Can you deliver staffing outside office hours?',
									answer: locale === 'sv' ? 'Ja, vi kan leverera bemanning dygnet runt, inklusive kvällar och helger. Vi förstår att många projekt kräver flexibla arbetstider och vi anpassar oss efter ert schema.' : 'Yes, we can deliver staffing around the clock, including evenings and weekends. We understand that many projects require flexible working hours and we adapt to your schedule.'
								},
							
							].map((faq) => (
								<motion.div
									key={faq.id}
									className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									viewport={{ once: true }}
								>
									<button
										className="w-full px-6 py-4 md:px-8 md:py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
										onClick={() => toggleFAQBemanning(faq.id)}
									>
										<h3 className="text-lg md:text-xl font-semibold text-[#0F172A] pr-4">
											{faq.question}
										</h3>
										<svg
											className={`w-6 h-6 text-[#10B981] transition-transform duration-200 ${
												openFAQBemanning === faq.id ? 'rotate-180' : ''
											}`}
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
										</svg>
									</button>
									<motion.div
										initial={false}
										animate={{
											height: openFAQBemanning === faq.id ? 'auto' : 0,
											opacity: openFAQBemanning === faq.id ? 1 : 0
										}}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className="overflow-hidden"
									>
										<div className="px-6 pb-4 md:px-8 md:pb-6">
											<p className="text-gray-600 text-base md:text-lg leading-relaxed">
												{faq.answer}
											</p>
										</div>
									</motion.div>
								</motion.div>
							))}
						</div>

						<div className="text-center mt-12">
							<p className="text-gray-600 mb-6">
								Har du fler frågor om våra bemannings- och underentreprenadtjänster?
							</p>
							<Link
								href="/kontakt?scroll=message&service=bemanning"
								className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:opacity-90 transition-opacity font-medium group shadow-lg hover:shadow-xl"
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
				</section>
			</div>
		</main>
	);
}


