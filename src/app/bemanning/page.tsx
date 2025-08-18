'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FlyttoffertForm from '../components/FlyttoffertForm';

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
	return (
		<main id="top" className="overflow-hidden">
			<div className="main-zoom">
				{/* Hero Section - Matching kontorsflytt design */}
				<div className="relative py-2 bg-white text-[#0F172A] overflow-hidden">
					{/* Mobile: Form only */}
					<div className="md:hidden mx-auto px-4 pb-8">
						<FlyttoffertForm mode="widget" defaultCustomerType="foretag" />
					</div>

					{/* Desktop: Full hero section */}
					<div className="hidden md:block mx-auto px-16">
						<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
							{/* Background image */}
							<div
								className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
								style={{
									backgroundImage: 'url(/office-moving.png)',
									backgroundSize: 'cover',
									backgroundPosition: 'center 30%'
								}}
							/>
							<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
								<div className="max-w-xl w-full">
									<h1 className="text-5xl md:text-6xl font-bold mb-8">
										Bemanning och underentreprenad i Stockholm
									</h1>
									<p className="text-2xl md:text-3xl mb-12">
										Flexibel bemanning och pålitliga underentreprenörer
									</p>
									<p className="text-lg text-white/90">
										Vi erbjuder bemanning och underentreprenad för flytt, logistik och städ – när ni behöver förstärka teamet snabbt och säkert. Skalbara lösningar, erfaren personal och smidig projektledning.
									</p>
								</div>
								<div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
									<FlyttoffertForm mode="widget" defaultCustomerType="foretag" />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* What is Bemanning Section - matching kontorsflytt structure */}
				<section className="py-0 md:py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-6xl mx-auto relative">
							{/* Sidebar service cards (desktop) */}
							<div className="hidden lg:block absolute -right-72 top-[1385px] w-64">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🏠</span><h3 className="text-xl font-bold text-white">Bohagsflytt</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Professionell bohagsflytt för privatpersoner – trygg och smidig flytt.</p>
										<div className="mt-auto relative">
											<Link href="/bohagsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
										</div>
									</div>
								</div>
							</div>
							<div className="hidden lg:block absolute -right-72 top-[1620px] w-64">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🎹</span><h3 className="text-xl font-bold text-white">Piano & Tunglyft</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Specialiserad flytt av piano, kassaskåp och andra tunga föremål.</p>
										<div className="mt-auto relative">
											<Link href="/piano-tunglyft" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
										</div>
									</div>
								</div>
							</div>
							<div className="hidden lg:block absolute -right-72 top-[1880px] w-64">
								<div className="sticky top-8">
									<div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-xl p-6 shadow-lg text-white flex flex-col min-h-[180px] h-full">
										<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
										<div className="flex items-center gap-3 mb-4 relative"><span className="text-4xl">🌍</span><h3 className="text-xl font-bold text-white">Utlandsflytt</h3></div>
										<p className="text-sm text-gray-100 mb-4 relative">Internationell flytt med expertis inom tullformaliteter och logistik.</p>
										<div className="mt-auto relative">
											<Link href="/utlandsflytt" className="inline-flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-full hover:bg-opacity-90 transition-opacity font-medium group text-sm">Läs mer<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
										</div>
									</div>
								</div>
							</div>

							{/* Reco Widget - Positioned absolutely to the right (desktop) */}
							<div className="hidden lg:block absolute -right-72 top-[20rem] w-72 z-40">
								<div className="sticky top-8">
									<iframe src="https://widget.reco.se/v2/venues/4038580/vertical/large?inverted=false&border=false&reviews=5" className="w-full h-[1000px] border-0" title="Flyttella recensioner" />
								</div>
							</div>

							<motion.div className="space-y-12 md:space-y-16" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
								{/* Main content sections */}
								{([
									{
										title: 'Vad är bemanning och underentreprenad?',
										content:
											'Bemanning och underentreprenad innebär att vi tillhandahåller kompetenta resurser till ert projekt när behov uppstår – tillfälligt eller långsiktigt. Vi arbetar med flytt, logistik, montering och städ där vårt team integreras i er organisation och levererar enligt era processer. Med tydlig projektledning, försäkringar och arbetsmiljörutiner säkerställer vi kvalitet och effektivitet utan att störa er verksamhet.',
										icon: '👷‍♂️',
									},
									{
										title: '',
										content: (
											<div className="w-full max-w-6xl mx-auto flex justify-center my-12">
												<img src="/godtid.jpg" alt="Bemanning och underentreprenad i Stockholm" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
											</div>
										),
										icon: ''
									},
									{
										title: 'Vad kostar bemanning?',
										content: (
											<>
												<p className="text-gray-700 leading-relaxed px-4 text-lg md:text-xl lg:text-2xl mb-8 text-left md:text-center">Pris påverkas av kompetensnivå, antal timmar, tider och uppdragets omfattning. Vi erbjuder tydliga timpriser utan dolda avgifter och kan lämna fastpris för definierade delmoment.</p>
												<div className="my-16 text-center">
													<p className="text-2xl md:text-3xl italic font-bold" style={{ color: '#3b82f6' }}>
														"Flyttella levererade exakt den bemanning vi behövde – snabbt och proffsigt!"
													</p>
													<p className="italic text-gray-700 mt-2">- Maria</p>
												</div>
											</>
										),
										icon: '💼'
									},
									{
										title: 'Vad ingår i bemanning och underentreprenad?',
										content:
											'Planering och bemanningsplan, introduktion på plats, arbetsledning vid behov, rapportering, kvalitetssäkring och arbetsmiljö. Vi tillhandahåller bärare, montörer, arbetsledare, logistikkoordinatorer och städpersonal beroende på uppdragets omfattning.',
										icon: '📋'
									},
									{
										title: '',
										content: (
											<div className="w-full max-w-6xl mx-auto flex justify-center my-12">
												<img src="/kontor.png" alt="Underentreprenad och bemanning – tjänster" className="w-full h-80 md:h-96 rounded-lg shadow-lg object-cover" />
											</div>
										),
										icon: ''
									},
									{
										title: 'Hur bokar ni bemanning?',
										content:
											'Kontakta oss direkt via telefon eller e‑post för en behovsanalys. Vi återkommer så snart som möjligt med pris och förslag. Därefter planerar vi bemanningen och startar enligt överenskommen tidsplan.',
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
												<p className={`text-gray-700 leading-relaxed px-4 ${section.title === 'Vad är bemanning och underentreprenad?' || section.title === 'Vad ingår i bemanning och underentreprenad?' || section.title === 'Hur bokar ni bemanning?' ? 'text-lg md:text-xl lg:text-2xl text-left md:text-center' : 'text-base md:text-lg lg:text-xl'}`}>
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
			</div>
		</main>
	);
}


