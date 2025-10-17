// Update ekero.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma på Ekerö – trygg flytt över broar och vatten',
    subtitle: 'Specialiserade på flyttar i Ekerö, Munsö och Adelsö. Vi planerar tidsfönster, bärvägar och parkering – och tar höjd för bropassager och färjor vid behov. Fasta priser och tydlig planering.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella på Ekerö',
    desktop: 'Vi genomför välplanerade flyttar på Ekerö med fokus på säker logistik och smidig körning över broar. Vi hanterar lastzoner, trappor och längre bärsträckor – och erbjuder kostnadsfri besiktning när det behövs. Inför flyttdagen tar vi fram en tydlig kör- och bärplan som minimerar störningar för grannar och förening.',
    desktop2: 'Vårt team är vana vid villor, radhus och sjönära bostäder. Vi skyddar dörrposter, väggar och golv, packar effektivt och håller en punktlig tidsplan för lastning och lossning. Vid behov bokar vi hiss i god tid, synkar nyckelhantering och säkerställer att tillträde och portkoder fungerar smidigt.',
    desktop3: 'Priserna är fasta utan dolda avgifter. En personlig kontakt följer flytten och säkerställer rätt bemanning och fordon efter dina förutsättningar på Ekerö. Vi kan hjälpa till med återvinning av emballage, mellanlagring, samt intyg/underlag som efterfrågas av bostadsrättsföreningar eller fastighetsägare.',
    mobile: 'Vi planerar flytten på Ekerö med säkra bärvägar, tidsfönster och fasta priser – med personlig kontakt och tydlig plan.',
    mobileExpanded: 'Vana vid villor/radhus och sjönära lägen: skydd av dörrposter/väggar/golv, smart packning, hissbokning och nyckelhantering.',
    mobileExpanded2: 'Fasta priser utan dolda avgifter. Vi kan ordna återvinning, mellanlagring och nödvändiga intyg för förening/fastighetsägare.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella på Ekerö?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma på Ekerö',
    description: 'Kunder uppskattar vår punktlighet, planering och varsamma hantering. Läs om villaflyttar på Ekerö och radhusflyttar i Munsö och Adelsö.',
    badgeAlt: 'Rekommenderad flyttfirma Ekerö',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter baseras på dina behov på Ekerö – boyta, våningsplan, trappor/hiss, bärvägar och parkering. Vid behov gör vi kostnadsfri besiktning och planerar tidsfönster, bemanning och fordon. Alla priser är fasta utan dolda avgifter. Vi tar höjd för bropassager och eventuella färjor så att flytten blir effektiv och trygg.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet på Ekerö' },
  experience: {
    title: 'Erfarenhet av flytt i villor, radhus och sjönära områden',
    description: 'Vi har stor erfarenhet av flyttar inom Ekerö kommun. Vi planerar bärvägar, skyddar trappor och golv och reserverar lastzoner där det är möjligt. Körplanen anpassas för broar och trafikflöden.',
    expanded: 'Vi tar fram en tydlig plan för packning, skydd av entréer och punktlig lastning/lossning. Vi arbetar lugnt och respektfullt med hänsyn till boendemiljö och grannar – även vid trånga vägar eller begränsad lastplats.'
  },
  awards: {
    title: 'Utmärkelser för vårt arbete på Ekerö',
    description: 'Återkommande kunder och goda omdömen på Ekerö speglar vår kvalitet. Vi uppmärksammas för planering, bemötande och trygg hantering vid både korta och längre flyttar.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster på Ekerö',
    description: 'Bohagsflytt, packning, flyttstädning, magasinering och tunga lyft. Vi skräddarsyr upplägget efter bostadstyp och tidplan – med fasta priser och tydlig kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt på Ekerö',
    description: 'Planera bärvägar och lastplats, boka hiss i tid, säkra nycklar och tillträde. Våra checklistor hjälper dig till en smidig flyttdag.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt på Ekerö',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum för att spara tid och undvika risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt på Ekerö',
    items: [
      { question: 'Hur påverkar broar och eventuella färjor tidplanen?', answer: 'Vi planerar tidsfönster med marginaler för trafik över Ekeröbron och eventuella färjelägen. Körplanen anpassas så att lastning och lossning sker punktligt även vid störningar.' },
      { question: 'Kan ni hantera lastzoner och parkering på smalare vägar?', answer: 'Ja. Vi bedömer bärvägar och föreslår lastplats utifrån vägbredd och lokala regler. I vissa samfälligheter krävs tillstånd – vi rådgiver och hjälper till med planering.' },
      { question: 'Vi bor sjönära med längre bärsträcka – hur löser ni det?', answer: 'Vi dimensionerar bemanning och använder rätt utrustning (säckkärror, bärselar, skydd). Planen anpassas för längre bär och nivåskillnader för säker och effektiv hantering.' },
      { question: 'Kan ni sköta nyckelöverlämning via mäklare eller granne?', answer: 'Ja. Vi samordnar nycklar med mäklare, hyresvärd eller granne. Legitimation kontrolleras och vi bekräftar nyckelflödet skriftligt inför flyttdagen.' },
      { question: 'Ingår montering/demontering?', answer: 'Enklare montering/demontering (t.ex. säng och bord) ingår. Avancerad montering, specialsnickerier eller fasta installationer är tillval och behöver bokas i förväg.' },
      { question: 'Kan ni leverera packmaterial till Ekerö i förväg?', answer: 'Ja. Vi kan leverera kartonger, packpapper och skydd i god tid. Vi ger även råd om märkning och packordning för snabbare uppackning.' },
      { question: 'Behöver vi magasinering mellan Ekerö och innerstan – går det?', answer: 'Ja. Vi erbjuder kort- och långtidsmagasinering. Hämtning och återleverans planeras efter din tidplan, oavsett om du flyttar inom Ekerö eller till/från Stockholm.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company on Ekerö – smooth moves across bridges',
    subtitle: 'Specialised in moves on Ekerö, Munsö and Adelsö. We plan time windows, access routes and parking – and account for bridges or ferries when needed. Fixed pricing and clear planning.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella on Ekerö',
    desktop: 'We deliver well-planned moves on Ekerö with safe logistics and smooth driving across bridges. We handle loading zones, stairs and longer carries – with a free pre-move inspection when needed. Ahead of move day we create a clear driving and handling plan that minimises disturbance for neighbours and the association.',
    desktop2: 'Our team is experienced with villas, townhouses and waterfront homes. We protect door frames, walls and floors, pack efficiently and keep a punctual schedule for loading and unloading. When required we book elevators in good time, coordinate key handover and make sure access and entry codes work smoothly.',
    desktop3: 'Pricing is fixed with no hidden fees. A dedicated contact follows the move and ensures the right crew and vehicle for your Ekerö home. We can help with recycling of packaging, temporary storage and any certificates/documents requested by housing associations or property owners.',
    mobile: 'We plan your move on Ekerö with safe access routes, time windows and fixed pricing – with a dedicated contact and clear plan.',
    mobileExpanded: 'Experienced with villas/townhouses and waterfront homes: protection for door frames/walls/floors, smart packing, elevator booking and key coordination.',
    mobileExpanded2: 'Fixed prices, no hidden fees. We can arrange recycling, storage and required certificates for associations/property owners.'
  },
  features: { title: 'What benefits do you get with Flyttella on Ekerö?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company on Ekerö',
    description: 'Clients appreciate our punctuality, planning and careful handling. Read about villa moves on Ekerö and townhouse moves on Munsö and Adelsö.',
    badgeAlt: 'Recommended mover Ekerö',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Quotes are based on your needs on Ekerö – size, floor level, stairs/elevator, access routes and parking. When needed we perform a free inspection and plan time windows, crew and vehicle. All prices are fixed with no hidden fees. We factor in bridge crossings and potential ferries so the move is efficient and safe.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience on Ekerö' },
  experience: {
    title: 'Experience with villas, townhouses and waterfront homes',
    description: 'We have extensive experience across Ekerö municipality. We plan access routes, protect stairs and floors and reserve loading zones where possible. The driving plan is adapted to bridges and traffic flows.',
    expanded: 'We create a clear plan for packing, protection of entrances and punctual loading/unloading. We work calmly and respectfully with consideration for neighbours – even on narrow roads or limited loading spots.'
  },
  awards: {
    title: 'Awards for our work on Ekerö',
    description: 'Returning clients and strong reviews on Ekerö reflect our quality. We are recognised for planning, service and careful handling for both short and longer-distance moves.'
  },
  servicesSection: {
    title: 'Discover our services on Ekerö',
    description: 'Household moves, packing, move-out cleaning, storage and heavy lifts. We tailor the setup to your home and timeline – with fixed pricing and clear communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving on Ekerö',
    description: 'Plan access routes and loading spots, book elevators early, secure keys and access. Our checklists help you achieve a smooth moving day.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move on Ekerö',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room to save time and avoid risks.'
  },
  faq: {
    title: 'Common questions about moving on Ekerö',
    items: [
      { question: 'How do bridges or possible ferries affect timing?', answer: 'We plan time windows with margins for Ekerö Bridge traffic and any ferry considerations. The driving plan ensures punctual loading and unloading even with disruptions.' },
      { question: 'Can you manage loading zones and parking on narrow roads?', answer: 'Yes. We assess access routes and suggest loading spots based on road width and local rules. Some associations require permits – we advise and plan accordingly.' },
      { question: 'We live by the water with a long carry – how do you handle it?', answer: 'We size the crew and use the right equipment (dollies, carrying straps, protection). The plan adapts to longer carries and level changes for safe handling.' },
      { question: 'Can you handle key handover via an agent or neighbour?', answer: 'Yes. We coordinate keys with an agent, landlord or neighbour. IDs are verified and we confirm the key flow in writing before move day.' },
      { question: 'Is assembly/disassembly included?', answer: 'Basic assembly/disassembly (e.g. beds, tables) is included. Advanced/custom work or fixed installations are add-ons and must be pre-booked.' },
      { question: 'Can you deliver packing materials to Ekerö in advance?', answer: 'Yes. We can deliver boxes, paper and protection in good time. We also advise on labelling and packing order for faster unpacking.' },
      { question: 'We need storage between Ekerö and the city – is that possible?', answer: 'Yes. We offer short- and long-term storage. Collection and return are planned to fit your schedule, whether moving within Ekerö or to/from Stockholm.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.ekero) data.ekero = {};
  data.ekero = { ...data.ekero, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for ekero in sv and en.');


