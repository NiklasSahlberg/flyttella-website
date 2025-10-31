// Update kista.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Kista – din pålitliga partner med över 8 års erfarenhet',
    subtitle: 'Professionella flyttlösningar i Kista, Akalla, Husby och Tensta. Vi levererar skräddarsydda flyttar för lägenheter, radhus och villor med fokus på kvalitet och kundnöjdhet.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Kista',
    desktop: 'Med över 8 års erfarenhet har vi etablerat oss som Kistas mest betrodda flyttpartner – vi hjälper kunder i Akalla, Husby och Tensta med professionella flyttlösningar. Vår passion för kvalitet och djup lokalkännedom gör oss till den perfekta valet för Kistas invånare.',
    desktop2: 'Mer än 8 000 framgångsrika flyttar har gjort oss till en betrodd partner för både privatpersoner och företag i Kista. Vi arbetar med transparenta priser och inga överraskningar. Varje flytt planeras noggrant med hänsyn till Kistas specifika utmaningar – moderna bostadsområden, föreningsregler och lokala förutsättningar.',
    desktop3: 'Våra konkurrensfördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Din personliga flyttkoordinator säkerställer att allt från initial planering till slutlig genomförande fungerar smidigt.',
    mobile: 'Kistas mest betrodda flyttpartner med transparenta priser och personlig service – över 8 000 nöjda kunder.',
    mobileExpanded: 'Skräddarsydd planering för Kistas moderna områden och föreningsregler. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.',
    mobileExpanded2: 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Kista?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Kista',
    description: 'Kunder i Kista, Akalla och Husby värdesätter vår noggranna planering, transparenta priser och punktliga genomförande. Vi är experter på lägenhetsflyttar och garanterar att flyttdagen blir lugn och effektiv.',
    badgeAlt: 'Rekommenderad flyttfirma Kista',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter utgår från dina specifika behov i Kista – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Kistas olika områden för en säker, effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Kista' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Kista',
    description: 'Med över 8000 genomförda flyttar och 7000 städningar har vi utvecklat en gedigen expertis inom flytt- och städningsbranschen. Vi har hjälpt kunder i Akalla, Husby och Tensta med flyttar som kräver skräddarsydd planering för varje specifik situation.',
    expanded: 'Vår position som en av Stockholms mest rekommenderade flyttfirmor bekräftas av över 1000 positiva omdömen. I Kista bygger vår service på årslång erfarenhet av områdets förutsättningar – från moderna bostadsområden till föreningsregler.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Kista',
    description: 'Våra utmärkelser bekräftar vår position som Kistas mest pålitliga flyttfirma. Särskilt stolta är vi över våra återkommande kunder i Akalla och Husby, som visar på den höga kvalitet och det förtroende vi byggt upp över tid.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Kista',
    description: 'Från lägenheter och radhus till villor – vi erbjuder kompletta flyttlösningar i Kista. Packning, flyttstädning, magasinering och speciallyft av tunga möbler. Varje uppdrag skräddarsys efter dina behov och områdets förutsättningar – alltid med fasta priser och transparent kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Kista',
    description: 'Checklista för smidig flytt i Kista: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter områdets specifika förutsättningar.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Kista',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Kista',
    items: [
      { question: 'Vad gör Flyttella till den bästa flyttfirman i Kista?', answer: 'Vi kombinerar över 8 års erfarenhet med djup lokalkännedom om Kistas områden. Våra specialister förstår de specifika utmaningarna med flyttar i Akalla, Husby och Tensta – från moderna bostadsområden till föreningsregler.' },
      { question: 'Kan ni hantera flyttar med tunga möbler?', answer: 'Ja, vi är experter på flyttar med tunga möbler i Kista. Vi har specialiserad utrustning för tunga lyft som pianon, säkerhetsdörrar och stora skåp. Vi planerar extra tid och bemanning för sådana flyttar och säkerställer säker transport.' },
      { question: 'Kan ni hantera flyttar med känsliga och värdefulla föremål?', answer: 'Ja, vi är experter på flyttar med känsliga och värdefulla föremål i Kista. Vi har specialiserad utrustning och material för säker transport av konst, antikviteter och elektronik – alltid med extra försiktighet.' },
      { question: 'Erbjuder ni flyttstädning för olika bostadstyper?', answer: 'Ja, vi erbjuder professionell flyttstädning för lägenheter, radhus och villor i Kista. Våra städare är vana vid områdets olika bostadstyper och föreningsregler, med 14 dagars garanti på allt arbete.' },
      { question: 'Kan ni hantera flyttar under helger och kvällar?', answer: 'Ja, vi erbjuder flyttar även under helger och kvällar i Kista. Vi planerar extra tid för dessa flyttar och tar hänsyn till områdets tysthetsregler och parkeringsbestämmelser för en smidig genomförande.' },
      { question: 'Kan ni hjälpa med packning av känsliga föremål?', answer: 'Ja, vi erbjuder specialiserad packning av känsliga föremål med professionella material. Våra team är vana vid olika föremål och packar säkert för transport – från konst till elektronik.' },
      { question: 'Vad ingår i er flyttgaranti?', answer: 'Vi garanterar punktlighet, skydd av möbler och transparenta priser. Om något går fel ersätter vi skador och löser problem snabbt. Vår städning har 14 dagars garanti och vi följer upp alla flyttar.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Kista – your reliable partner with over 8 years experience',
    subtitle: 'Professional moving solutions in Kista, Akalla, Husby and Tensta. We deliver tailored moves for apartments, townhouses and houses with focus on quality and customer satisfaction.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Kista',
    desktop: 'With over 8 years experience we have established ourselves as Kista\'s most trusted moving partner – we help clients in Akalla, Husby and Tensta with professional moving solutions. Our passion for quality and deep local knowledge makes us the perfect choice for Kista residents.',
    desktop2: 'More than 8,000 successful moves have made us a trusted partner for both individuals and businesses in Kista. We work with transparent pricing and no surprises. Every move is carefully planned considering Kista\'s specific challenges – modern residential areas, association rules and local conditions.',
    desktop3: 'Our competitive advantages include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Your personal move coordinator ensures everything from initial planning to final execution works smoothly.',
    mobile: 'Kista\'s most trusted moving partner with transparent pricing and personal service – over 8,000 satisfied clients.',
    mobileExpanded: 'Tailored planning for Kista\'s modern areas and association rules. Free boxes, flexible rebooking and 14-day cleaning guarantee.',
    mobileExpanded2: 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process.'
  },
  features: { title: 'What benefits do you get with Flyttella in Kista?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Kista',
    description: 'Clients in Kista, Akalla and Husby value our thorough planning, transparent pricing and punctual execution. We are experts at apartment moves and guarantee move day is calm and efficient.',
    badgeAlt: 'Recommended mover Kista',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Our quotes are based on your specific needs in Kista – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Kista\'s different areas for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Kista' },
  experience: {
    title: 'Our experience with moves in Kista',
    description: 'With over 8000 completed moves and 7000 cleanings we have developed solid expertise in the moving and cleaning industry. We have helped clients in Akalla, Husby and Tensta with moves that require tailored planning for each specific situation.',
    expanded: 'Our position as one of Stockholm\'s most recommended moving companies is confirmed by over 1000 positive reviews. In Kista our service is built on years of experience with the area\'s conditions – from modern residential areas to association rules.'
  },
  awards: {
    title: 'Flyttella awards in Kista',
    description: 'Our awards confirm our position as Kista\'s most reliable moving company. We are particularly proud of our returning customers in Akalla and Husby, who demonstrate the high quality and trust we have built over time.'
  },
  servicesSection: {
    title: 'Discover our services in Kista',
    description: 'From apartments and townhouses to houses – we offer complete moving solutions in Kista. Packing, move-out cleaning, storage and special lifts of heavy furniture. Every job is tailored to your needs and the area\'s conditions – always with fixed pricing and transparent communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Kista',
    description: 'Checklist for a smooth move in Kista: plan access and loading, secure parking and align time windows with the area\'s specific conditions.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Kista',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.'
  },
  faq: {
    title: 'Common questions about moving in Kista',
    items: [
      { question: 'What makes Flyttella the best moving company in Kista?', answer: 'We combine over 8 years experience with deep local knowledge of Kista\'s areas. Our specialists understand the specific challenges of moves in Akalla, Husby and Tensta – from modern residential areas to association rules.' },
      { question: 'Can you handle moves with heavy furniture?', answer: 'Yes, we are experts at moves with heavy furniture in Kista. We have specialised equipment for heavy lifts like pianos, safes and large cabinets. We plan extra time and crew for such moves and ensure safe transport.' },
      { question: 'Can you handle moves with delicate and valuable items?', answer: 'Yes, we are experts at moves with delicate and valuable items in Kista. We have specialised equipment and materials for safe transport of art, antiques and electronics – always with extra care.' },
      { question: 'Do you offer move-out cleaning for different housing types?', answer: 'Yes, we offer professional move-out cleaning for apartments, townhouses and houses in Kista. Our cleaners are experienced with the area\'s different housing types and association rules, with 14-day guarantee on all work.' },
      { question: 'Can you handle moves during weekends and evenings?', answer: 'Yes, we offer moves even during weekends and evenings in Kista. We plan extra time for these moves and consider the area\'s noise regulations and parking rules for smooth execution.' },
      { question: 'Can you help with packing delicate items?', answer: 'Yes, we offer specialised packing of delicate items with professional materials. Our teams are experienced with different items and pack safely for transport – from art to electronics.' },
      { question: 'What is included in your moving guarantee?', answer: 'We guarantee punctuality, furniture protection and transparent pricing. If something goes wrong we compensate for damages and solve problems quickly. Our cleaning has a 14-day guarantee and we follow up on all moves.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.kista) data.kista = {};
  data.kista = { ...data.kista, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for kista in sv and en.');



