// Update Kungsholmen content to be much more unique and distinctive
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Kungsholmen – din pålitliga partner med över 8 års erfarenhet',
    subtitle: 'Professionella flyttlösningar i Kungsholmen, Marieberg och Fredhäll. Vi levererar skräddarsydda flyttar för lägenheter, radhus och villor med fokus på kvalitet och kundnöjdhet.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Kungsholmen',
    desktop: 'Sedan 2016 har vi etablerat oss som Kungsholmens mest betrodda flyttpartner – vi hjälper kunder i Marieberg och Fredhäll med professionella flyttlösningar. Vår passion för kvalitet och djup lokalkännedom gör oss till den perfekta valet för Kungsholmens invånare.',
    desktop2: 'Mer än 8 000 framgångsrika flyttar har gjort oss till en betrodd partner för både privatpersoner och företag i Kungsholmen. Vår transparenta prissättning och tydliga kommunikation gör att du alltid vet vad som ingår. Varje flytt skräddarsys efter Kungsholmens unika karaktär – från innerstadslägenheter till bostadsområden med sina specifika regler och förutsättningar.',
    desktop3: 'Våra konkurrensfördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Vår dedikerade kundtjänst följer hela flyttprocessen och säkerställer att varje detalj är perfekt planerad för Kungsholmens specifika förutsättningar.',
    mobile: 'Kungsholmens mest betrodda flyttpartner med transparenta priser och personlig service – över 8 000 nöjda kunder.',
    mobileExpanded: 'Skräddarsydd planering för Kungsholmens områden och föreningsregler. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.',
    mobileExpanded2: 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Kungsholmen?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Kungsholmen',
    description: 'Kunder i Kungsholmen, Marieberg och Fredhäll värdesätter vår noggranna planering, transparenta priser och punktliga genomförande. Vi är experter på lägenhetsflyttar och garanterar att flyttdagen blir lugn och effektiv.',
    badgeAlt: 'Rekommenderad flyttfirma Kungsholmen',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter utgår från dina specifika behov i Kungsholmen – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Kungsholmens olika områden för en säker, effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Kungsholmen' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Kungsholmen',
    description: 'Med över 8000 genomförda flyttar och 7000 städningar har vi utvecklat en gedigen expertis inom flytt- och städningsbranschen. Vi har hjälpt kunder i Marieberg och Fredhäll med flyttar som kräver skräddarsydd planering för varje specifik situation.',
    expanded: 'Vår position som en av Stockholms mest rekommenderade flyttfirmor bekräftas av över 1000 positiva omdömen. I Kungsholmen bygger vår service på årslång erfarenhet av områdets förutsättningar – från innerstadslägenheter till bostadsområden.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Kungsholmen',
    description: 'Genom åren har vi blivit erkända för vår expertis inom flyttar i Kungsholmen. Våra utmärkelser reflekterar vår specialisering på områdets unika utmaningar – från innerstadslägenheter till bostadsområden med sina specifika regler. Dessa utmärkelser bekräftar vår position som Kungsholmens mest pålitliga flyttfirma med djup lokalkännedom.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Kungsholmen',
    description: 'Från lägenheter och radhus till villor – vi erbjuder kompletta flyttlösningar i Kungsholmen. Packning, flyttstädning, magasinering och speciallyft av tunga möbler. Varje uppdrag skräddarsys efter dina behov och områdets förutsättningar – alltid med fasta priser och transparent kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Kungsholmen',
    description: 'Checklista för smidig flytt i Kungsholmen: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter områdets specifika förutsättningar.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Kungsholmen',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Kungsholmen',
    items: [
      { question: 'Hur hanterar ni flyttar i Kungsholmens innerstad?', answer: 'Vi är experter på flyttar i Kungsholmens innerstad med erfarenhet av trånga gator, begränsad parkering och höga byggnader. Vi planerar extra tid för trafikrusning och säkerställer att flyttar genomförs utan att störa grannskapet.' },
      { question: 'Kan ni hantera flyttar med höga våningar i Kungsholmen?', answer: 'Ja, vi är vana vid höga våningar i Kungsholmens bostadsområden. Vi har erfarenhet av hissar, trappor och bärvägar i höga byggnader. Vi planerar extra tid och säkerställer säker transport av möbler mellan våningar.' },
      { question: 'Erbjuder ni flyttstädning för lägenheter i Kungsholmen?', answer: 'Ja, vi erbjuder professionell flyttstädning för lägenheter i Kungsholmen. Våra städare är vana vid områdets olika bostadstyper och föreningsregler. Vi garanterar 14 dagars garanti på allt städarbete.' },
      { question: 'Kan ni hantera flyttar med tunga möbler i Kungsholmen?', answer: 'Ja, vi är experter på flyttar med tunga möbler i Kungsholmen. Vi har specialiserad utrustning för tunga lyft som pianon, säkerhetsdörrar och stora skåp. Vi planerar extra tid och bemanning för sådana flyttar.' },
      { question: 'Hur långt i förväg ska jag boka flytt i Kungsholmen?', answer: 'Vi rekommenderar att boka flytt i Kungsholmen minst 2-3 veckor i förväg, särskilt under högsäsong. För flyttar med tunga möbler eller speciella krav planerar vi gärna ännu tidigare för att säkerställa optimal genomförande.' },
      { question: 'Kan ni hantera flyttar under helger i Kungsholmen?', answer: 'Ja, vi erbjuder flyttar även under helger i Kungsholmen. Vi planerar extra tid för dessa flyttar och tar hänsyn till områdets tysthetsregler och parkeringsbestämmelser för en smidig genomförande.' },
      { question: 'Vad gör Flyttella till den bästa flyttfirman i Kungsholmen?', answer: 'Vi kombinerar över 8 års erfarenhet med djup lokalkännedom om Kungsholmens områden. Våra specialister förstår de specifika utmaningarna med flyttar i Marieberg och Fredhäll – från innerstadslägenheter till bostadsområden.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Kungsholmen – your reliable partner with over 8 years experience',
    subtitle: 'Professional moving solutions in Kungsholmen, Marieberg and Fredhäll. We deliver tailored moves for apartments, townhouses and houses with focus on quality and customer satisfaction.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Kungsholmen',
    desktop: 'Since 2016 we have established ourselves as Kungsholmen\'s most trusted moving partner – we help clients in Marieberg and Fredhäll with professional moving solutions. Our passion for quality and deep local knowledge makes us the perfect choice for Kungsholmen residents.',
    desktop2: 'More than 8,000 successful moves have made us a trusted partner for both individuals and businesses in Kungsholmen. Our transparent pricing and clear communication means you always know what\'s included. Every move is tailored to Kungsholmen\'s unique character – from inner city apartments to residential areas with their specific rules and conditions.',
    desktop3: 'Our competitive advantages include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Our dedicated customer service follows the entire moving process and ensures every detail is perfectly planned for Kungsholmen\'s specific conditions.',
    mobile: 'Kungsholmen\'s most trusted moving partner with transparent pricing and personal service – over 8,000 satisfied clients.',
    mobileExpanded: 'Tailored planning for Kungsholmen\'s areas and association rules. Free boxes, flexible rebooking and 14-day cleaning guarantee.',
    mobileExpanded2: 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process.'
  },
  features: { title: 'What benefits do you get with Flyttella in Kungsholmen?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Kungsholmen',
    description: 'Clients in Kungsholmen, Marieberg and Fredhäll value our thorough planning, transparent pricing and punctual execution. We are experts at apartment moves and guarantee move day is calm and efficient.',
    badgeAlt: 'Recommended mover Kungsholmen',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Our quotes are based on your specific needs in Kungsholmen – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Kungsholmen\'s different areas for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Kungsholmen' },
  experience: {
    title: 'Our experience with moves in Kungsholmen',
    description: 'With over 8000 completed moves and 7000 cleanings we have developed solid expertise in the moving and cleaning industry. We have helped clients in Marieberg and Fredhäll with moves that require tailored planning for each specific situation.',
    expanded: 'Our position as one of Stockholm\'s most recommended moving companies is confirmed by over 1000 positive reviews. In Kungsholmen our service is built on years of experience with the area\'s conditions – from inner city apartments to residential areas.'
  },
  awards: {
    title: 'Flyttella awards in Kungsholmen',
    description: 'Over the years we have been recognized for our expertise in moves in Kungsholmen. Our awards reflect our specialization in the area\'s unique challenges – from inner city apartments to residential areas with their specific rules. These awards confirm our position as Kungsholmen\'s most reliable moving company with deep local knowledge.'
  },
  servicesSection: {
    title: 'Discover our services in Kungsholmen',
    description: 'From apartments and townhouses to houses – we offer complete moving solutions in Kungsholmen. Packing, move-out cleaning, storage and special lifts of heavy furniture. Every job is tailored to your needs and the area\'s conditions – always with fixed pricing and transparent communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Kungsholmen',
    description: 'Checklist for a smooth move in Kungsholmen: plan access and loading, secure parking and align time windows with the area\'s specific conditions.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Kungsholmen',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.'
  },
  faq: {
    title: 'Common questions about moving in Kungsholmen',
    items: [
      { question: 'How do you handle moves in Kungsholmen\'s inner city?', answer: 'We are experts at moves in Kungsholmen\'s inner city with experience of narrow streets, limited parking and tall buildings. We plan extra time for traffic rush and ensure moves are carried out without disturbing the neighborhood.' },
      { question: 'Can you handle moves with high floors in Kungsholmen?', answer: 'Yes, we are used to high floors in Kungsholmen\'s residential areas. We have experience with elevators, stairs and access routes in tall buildings. We plan extra time and ensure safe transport of furniture between floors.' },
      { question: 'Do you offer move-out cleaning for apartments in Kungsholmen?', answer: 'Yes, we offer professional move-out cleaning for apartments in Kungsholmen. Our cleaners are experienced with the area\'s different housing types and association rules. We guarantee 14 days warranty on all cleaning work.' },
      { question: 'Can you handle moves with heavy furniture in Kungsholmen?', answer: 'Yes, we are experts at moves with heavy furniture in Kungsholmen. We have specialised equipment for heavy lifts like pianos, safes and large cabinets. We plan extra time and crew for such moves.' },
      { question: 'How far in advance should I book a move in Kungsholmen?', answer: 'We recommend booking a move in Kungsholmen at least 2-3 weeks in advance, especially during peak season. For moves with heavy furniture or special requirements we prefer to plan even earlier to ensure optimal execution.' },
      { question: 'Can you handle moves during weekends in Kungsholmen?', answer: 'Yes, we offer moves even during weekends in Kungsholmen. We plan extra time for these moves and consider the area\'s noise regulations and parking rules for smooth execution.' },
      { question: 'What makes Flyttella the best moving company in Kungsholmen?', answer: 'We combine over 8 years experience with deep local knowledge of Kungsholmen\'s areas. Our specialists understand the specific challenges of moves in Marieberg and Fredhäll – from inner city apartments to residential areas.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.kungsholmen) data.kungsholmen = {};
  data.kungsholmen = { ...data.kungsholmen, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated Kungsholmen content to be much more unique and distinctive.');
