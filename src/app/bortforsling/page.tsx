'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FlyttoffertForm from '../components/FlyttoffertForm';
import Link from 'next/link'

export default function BortforslingPage() {
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
					{/* Mobile: Form only */}
					<div className="md:hidden mx-auto px-4 pb-8">
						<FlyttoffertForm mode="widget" />
					</div>

					{/* Desktop: Full hero section */}
					<div className="hidden md:block mx-auto px-16">
						<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
							{/* Background image */}
							<div
								className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
								style={{
									backgroundImage: 'url(/coupleMoving.png)',
									backgroundSize: 'cover',
									backgroundPosition: 'center 30%'
								}}
							/>
							<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
								<div className="max-w-xl w-full">
									<h1 className="text-5xl md:text-6xl font-bold mb-8">Bortforsling i Stockholm</h1>
									<p className="text-2xl md:text-3xl mb-12">Professionell bortforsling av möbler, bohag och grovsopor</p>
									<p className="text-lg text-white/90">Vi hämtar, bär och kör bort – snabbt och tryggt. Miljövänlig hantering och återvinning när det är möjligt. Få offert på 1 minut.</p>
								</div>
								<div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
									<FlyttoffertForm mode="widget" />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* What is Bortforsling Section with Sidebar (SEO-optimized) */}
				<section className="py-0 md:py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-6xl mx-auto relative">
							{/* Sidebar: Reviews widget (sticky) */}
							<div className="hidden lg:block absolute -right-72 top-[22rem] w-72">
								<div className="sticky top-8">
									<iframe 
										src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5"
										className="w-full h-[1000px] border-0"
										title="Flyttella recensioner"
									/>
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
									{ title: '', content: (<div className="w-full max-w-6xl mx-auto flex justify-center my-8 md:my-12"><img src="/bortforsling.jpg" alt="Bortforsling av möbler och grovsopor i Stockholm" className="w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-cover" /></div>), icon: '' },
									{ title: 'Vad kostar bortforsling?', content: (<><p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-left md:text-center px-4">Pris beror på volym, våningsplan, tillgänglighet och typ av material. Mindre uppdrag kan börja från cirka 990 kr. Begär en kostnadsfri offert – du får pris på 1 minut och kan boka direkt.</p><div className="my-12 md:my-16 text-left md:text-center px-4"><p className="text-xl md:text-2xl lg:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>&quot;Snabbt, smidigt och trevligt bemötande – våra gamla möbler hämtades samma dag och allt gick perfekt!&quot;</p><p className="italic text-gray-700 mt-2">- Maria</p></div></>), icon: '💸' },
									{ title: 'Vad ingår i tjänsten?', content: (<div className="px-4 md:px-0"><ul className="list-disc pl-5 space-y-3 md:space-y-2"><li><strong>Bärhjälp:</strong> Hämtning från bostad, vind, källare eller kontor.</li><li><strong>Nedmontering:</strong> Enklare demontering av möbler vid behov.</li><li><strong>Transport:</strong> Körning till återvinningscentral/godkänd mottagare.</li><li><strong>Miljösortering:</strong> Vi sorterar avfallet för återvinning när det är möjligt.</li><li><strong>Tydliga priser:</strong> Fasta priser utan dolda avgifter.</li></ul></div>), icon: '✅' },
								] as { title: string; content: any; icon: string }[]).map((section, index) => (
									<motion.div key={index} className="group" variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
										<div>
											<div className="max-w-6xl mx-auto">
												<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-6 group-hover:text-[#10B981] transition-colors duration-300 text-left md:text-center px-4">{section.title}</h3>
												{typeof section.content === 'string' ? (
													<p className="text-gray-700 leading-relaxed px-4 text-base md:text-lg lg:text-xl">{section.content}</p>
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
			</div>
		</main>
	);
}


