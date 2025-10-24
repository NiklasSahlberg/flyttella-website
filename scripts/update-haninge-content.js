// Update haninge.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Haninge – expertis inom villaflyttar sedan 2019',
    subtitle: 'Specialiserade flyttar i Haninge, Handen, Jordbro och Västerhaninge. Vi är experter på villakvarter, radhusområden och moderna lägenhetskomplex med djup lokalkännedom om Haninges unika boendemiljöer.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Haninge',
    desktop: 'Sedan 2019 har vi byggt upp en stark position som Haninges ledande flyttfirma – från exklusiva villor i Handen till moderna lägenhetskomplex i Jordbro. Vår specialisering på villaflyttar och radhusområden gör oss till den naturliga valet för Haninges invånare.',
    desktop2: 'Över 8 000 framgångsrika flyttar har etablerat oss som en betrodd partner för både familjer och företag i Haninge. Vi arbetar med transparenta priser och inga överraskningar. Varje flytt planeras noggrant med hänsyn till Haninges specifika utmaningar – villakvarter med smala gator, radhusområden med begränsad parkering och moderna bostadsområden.',
    desktop3: 'Våra konkurrensfördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Din personliga flyttkoordinator säkerställer att allt från initial planering till slutlig genomförande fungerar smidigt.',
    mobile: 'Haninges ledande flyttfirma med transparenta priser och personlig service – över 8 000 nöjda kunder.',
    mobileExpanded: 'Specialiserad planering för villakvarter och radhusområden. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.',
    mobileExpanded2: 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen från start till mål.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Haninge?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Haninge',
    description: 'Kunder i Haninge, Handen och Jordbro värdesätter vår detaljerade planering, transparenta priser och punktliga genomförande. Vi är specialister på villaflyttar, radhus och lägenhetskomplex med precision – och garanterar att flyttdagen blir lugn och effektiv.',
    badgeAlt: 'Rekommenderad flyttfirma Haninge',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter utgår från dina specifika behov i Haninge – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Haninges olika områden för en säker, effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Haninge' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Haninge',
    description: 'Med över 8000 genomförda flyttar och 7000 städningar har vi utvecklat en gedigen expertis inom branschen. Särskilt starka är vi på villaflyttar i Handen, radhusområden i Västerhaninge och moderna lägenhetskomplex i Jordbro – där varje område kräver sin unika planering och logistik.',
    expanded: 'Vår position som en av Stockholms mest rekommenderade flyttfirmor bekräftas av över 1000 positiva omdömen. I Haninge bygger vår service på årslång erfarenhet av områdets specifika förutsättningar – från villakvarter med smala gator till moderna bostadsområden med reglerad parkering.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Haninge',
    description: 'Våra utmärkelser bekräftar vår position som Haninges mest pålitliga flyttfirma. Särskilt stolta är vi över våra återkommande kunder i Handen och Jordbro, som visar på den höga kvalitet och det förtroende vi byggt upp över tid. Dessa erkännanden driver oss att leverera toppklass – varje dag, i varje flytt.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Haninge',
    description: 'Från villaflyttar och radhus till lägenhetskomplex – vi erbjuder kompletta flyttlösningar i Haninge. Packning, flyttstädning, magasinering och speciallyft av tunga möbler. Varje uppdrag skräddarsys efter dina behov och områdets förutsättningar – alltid med fasta priser och transparent kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Haninge',
    description: 'Checklista för smidig flytt i Haninge: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter områdets specifika förutsättningar.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Haninge',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Haninge',
    items: [
      { question: 'Vad kostar en flytt i Haninge?', answer: 'Priset baseras på boyta, våningsplan, avstånd och extra tjänster. Vi ger alltid fasta priser utan dolda avgifter. Kontakta oss för en personlig offert baserad på dina specifika behov i Haninge.' },
      { question: 'Hur långt i förväg ska jag boka flytt i Haninge?', answer: 'Vi rekommenderar att boka minst 1-2 veckor i förväg, särskilt för villaflyttar och radhus. Under högsäsong (maj-september) kan längre förväg vara nödvändigt för att säkra önskad flyttdag.' },
      { question: 'Kan ni hjälpa till med packning i Haninge?', answer: 'Ja, vi erbjuder komplett packningstjänst med professionella material. Våra team är vana vid olika bostadstyper i Haninge och packar säkert för transport.' },
      { question: 'Vad händer om det regnar på flyttdagen?', answer: 'Vi har skydd för möbler och golv, och anpassar vår metodik efter väderförhållanden. Regn påverkar sällan flytten i Haninge eftersom vi planerar för alla väderlekar.' },
      { question: 'Erbjuder ni flyttstädning i Haninge?', answer: 'Ja, vi erbjuder professionell flyttstädning med 14 dagars garanti. Våra städare är vana vid Haninges olika bostadstyper och föreningsregler.' },
      { question: 'Kan ni hantera pianon och tunga möbler?', answer: 'Ja, vi har specialiserad utrustning för tunga lyft som pianon, säkerhetsdörrar och stora skåp. Vi planerar extra tid och bemanning för sådana flyttar i Haninge.' },
      { question: 'Vad ingår i er flyttgaranti?', answer: 'Vi garanterar punktlighet, skydd av möbler och transparenta priser. Om något går fel ersätter vi skador och löser problem snabbt. Vår städning har 14 dagars garanti.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Haninge – expertise in house moves since 2019',
    subtitle: 'Specialised moves in Haninge, Handen, Jordbro and Västerhaninge. We are experts in villa districts, townhouse areas and modern apartment complexes with deep local knowledge of Haninge\'s unique residential environments.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Haninge',
    desktop: 'Since 2019 we have built a strong position as Haninge\'s leading moving company – from exclusive villas in Handen to modern apartment complexes in Jordbro. Our specialisation in house moves and townhouse areas makes us the natural choice for Haninge residents.',
    desktop2: 'Over 8,000 successful moves have established us as a trusted partner for both families and businesses in Haninge. We work with transparent pricing and no surprises. Every move is carefully planned considering Haninge\'s specific challenges – villa districts with narrow streets, townhouse areas with limited parking and modern residential areas.',
    desktop3: 'Our competitive advantages include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Your personal move coordinator ensures everything from initial planning to final execution works smoothly.',
    mobile: 'Reliable moving company in Haninge with transparent pricing and personal service – over 8,000 satisfied clients.',
    mobileExpanded: 'Specialised planning for Haninge\'s different areas. Free boxes, flexible rebooking and 14-day cleaning guarantee.',
    mobileExpanded2: 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process.'
  },
  features: { title: 'What benefits do you get with Flyttella in Haninge?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Haninge',
    description: 'Clients in Haninge, Handen and Jordbro value our detailed planning, transparent pricing and punctual execution. We are specialists in house moves, townhouses and apartment complexes with precision – guaranteeing move day is calm and efficient.',
    badgeAlt: 'Recommended mover Haninge',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Our quotes are based on your specific needs in Haninge – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Haninge\'s different areas for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Haninge' },
  experience: {
    title: 'Our experience with moves in Haninge',
    description: 'With over 8000 completed moves and 7000 cleanings we have developed solid industry expertise. We are particularly strong in house moves in Handen, townhouse areas in Västerhaninge and modern apartment complexes in Jordbro – where each area requires its unique planning and logistics.',
    expanded: 'Our position as one of Stockholm\'s most recommended moving companies is confirmed by over 1000 positive reviews. In Haninge our service is built on years of experience with the area\'s specific conditions – from villa districts with narrow streets to modern residential areas with regulated parking.'
  },
  awards: {
    title: 'Flyttella awards in Haninge',
    description: 'Our awards confirm our position as Haninge\'s most reliable moving company. We are particularly proud of our returning customers in Handen and Jordbro, who demonstrate the high quality and trust we have built over time. These recognitions drive us to deliver top-class service – every day, in every move.'
  },
  servicesSection: {
    title: 'Discover our services in Haninge',
    description: 'From house moves and townhouses to apartment complexes – we offer complete moving solutions in Haninge. Packing, move-out cleaning, storage and special lifts of heavy furniture. Every job is tailored to your needs and the area\'s conditions – always with fixed pricing and transparent communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Haninge',
    description: 'Checklist for a smooth move in Haninge: plan access and loading, secure parking and align time windows with the area\'s specific conditions.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Haninge',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.'
  },
  faq: {
    title: 'Common questions about moving in Haninge',
    items: [
      { question: 'What does a move in Haninge cost?', answer: 'The price is based on size, floor level, distance and additional services. We always provide fixed prices with no hidden fees. Contact us for a personal quote based on your specific needs in Haninge.' },
      { question: 'How far in advance should I book a move in Haninge?', answer: 'We recommend booking at least 1-2 weeks in advance, especially for house moves and townhouses. During peak season (May-September) longer advance booking may be necessary to secure your preferred move date.' },
      { question: 'Can you help with packing in Haninge?', answer: 'Yes, we offer complete packing service with professional materials. Our teams are experienced with different housing types in Haninge and pack safely for transport.' },
      { question: 'What happens if it rains on move day?', answer: 'We have protection for furniture and floors, and adapt our methods to weather conditions. Rain rarely affects moves in Haninge as we plan for all weather conditions.' },
      { question: 'Do you offer move-out cleaning in Haninge?', answer: 'Yes, we offer professional move-out cleaning with a 14-day guarantee. Our cleaners are experienced with Haninge\'s different housing types and association rules.' },
      { question: 'Can you handle pianos and heavy furniture?', answer: 'Yes, we have specialised equipment for heavy lifts like pianos, safes and large cabinets. We plan extra time and crew for such moves in Haninge.' },
      { question: 'What is included in your moving guarantee?', answer: 'We guarantee punctuality, furniture protection and transparent pricing. If something goes wrong we compensate for damages and solve problems quickly. Our cleaning has a 14-day guarantee.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.haninge) data.haninge = {};
  data.haninge = { ...data.haninge, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for haninge in sv and en.');
