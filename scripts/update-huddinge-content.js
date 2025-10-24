// Update huddinge.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Huddinge – experter på familjeflyttar sedan 2019',
    subtitle: 'Professionella flyttar i Huddinge, Flemingsberg, Segeltorp och Skogås. Vi är specialister på familjebostäder, villor och lägenhetskomplex med djup förståelse för Huddinges grönområden och barnvänliga miljöer.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Huddinge',
    desktop: 'Sedan 2019 har vi byggt upp en stark position som Huddinges mest betrodda flyttfirma för familjer – från exklusiva villor i Flemingsberg till moderna familjelägenheter i Segeltorp. Vår specialisering på familjeflyttar och barnvänliga miljöer gör oss till det naturliga valet för Huddinges invånare.',
    desktop2: 'Över 8 000 framgångsrika familjeflyttar har etablerat oss som en pålitlig partner för både familjer och företag i Huddinge. Vi arbetar med transparenta priser och inga överraskningar. Varje flytt planeras noggrant med hänsyn till Huddinges specifika utmaningar – grönområden med lekplatser, skolor, barnfamiljer och trygga boendemiljöer.',
    desktop3: 'Våra familjevänliga fördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Din personliga flyttkoordinator säkerställer att allt från initial planering till slutlig genomförande fungerar smidigt för hela familjen.',
    mobile: 'Huddinges mest betrodda flyttfirma för familjer med transparenta priser och personlig service – över 8 000 nöjda kunder.',
    mobileExpanded: 'Specialiserad planering för familjeflyttar och barnvänliga miljöer. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.',
    mobileExpanded2: 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen för hela familjen.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Huddinge?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Huddinge',
    description: 'Familjer i Huddinge, Flemingsberg och Segeltorp uppskattar vår familjevänliga planering, transparenta priser och punktliga genomförande. Vi är experter på familjeflyttar med barn och garanterar att flyttdagen blir lugn och trygg för hela familjen.',
    badgeAlt: 'Rekommenderad flyttfirma Huddinge',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter baseras på dina familjespecifika behov i Huddinge – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Huddinges familjevänliga miljöer för en säker, effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Huddinge' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Huddinge',
    description: 'Med över 8000 genomförda familjeflyttar och 7000 städningar har vi utvecklat en gedigen expertis inom familjeflyttar. Särskilt starka är vi på familjebostäder i Flemingsberg, villor i Segeltorp och lägenhetskomplex i Skogås – där varje område kräver sin unika familjevänliga planering.',
    expanded: 'Vår position som en av Stockholms mest rekommenderade familjeflyttfirmor bekräftas av över 1000 positiva omdömen. I Huddinge bygger vår service på årslång erfarenhet av områdets familjevänliga förutsättningar – från grönområden med lekplatser till skolor och trygga boendemiljöer.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Huddinge',
    description: 'Våra utmärkelser bekräftar vår position som Huddinges mest pålitliga familjeflyttfirma. Särskilt stolta är vi över våra återkommande familjekunder i Flemingsberg och Segeltorp, som visar på den höga kvalitet och det förtroende vi byggt upp för familjeflyttar över tid.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Huddinge',
    description: 'Från familjeflyttar och villor till lägenhetskomplex – vi erbjuder kompletta flyttlösningar i Huddinge. Packning, flyttstädning, magasinering och speciallyft av familjemöbler. Varje uppdrag skräddarsys efter familjens behov och områdets familjevänliga förutsättningar – alltid med fasta priser och transparent kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för familjeflytt i Huddinge',
    description: 'Checklista för smidig familjeflytt i Huddinge: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter familjens behov och områdets skolor.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig familjeflytt i Huddinge',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska stress för hela familjen.'
  },
  faq: {
    title: 'Vanliga frågor om familjeflytt i Huddinge',
    items: [
      { question: 'Varför välja Flyttella för familjeflytt i Huddinge?', answer: 'Vi är specialiserade på familjeflyttar och barnvänliga miljöer i Huddinge med djup lokalkännedom. Våra familjevänliga fördelar inkluderar transparenta priser, gratis flyttkartonger och 14 dagars städgaranti – perfekt för Huddinges familjer.' },
      { question: 'Hur planerar ni flyttar för familjer med barn i Huddinge?', answer: 'Vi planerar noggrant för familjeflyttar med hänsyn till skolor, lekplatser och trygga boendemiljöer. Vi bedömer bärvägar, samordnar lastplatser och anpassar bemanning efter familjens specifika behov för en smidig flytt.' },
      { question: 'Kan ni hantera flyttar från villor i Huddinge?', answer: 'Ja, vi är experter på villaflyttar i Flemingsberg och andra områden. Vi planerar för familjeflyttar med hänsyn till grönområden, skolor och barnfamiljer – alltid med fokus på trygghet och säkerhet.' },
      { question: 'Erbjuder ni flyttstädning för familjebostäder i Huddinge?', answer: 'Ja, vi erbjuder professionell flyttstädning för familjebostäder, villor och lägenheter i Huddinge. Våra städare är vana vid områdets familjevänliga miljöer och föreningsregler, med 14 dagars garanti på allt arbete.' },
      { question: 'Kan ni hantera flyttar till andra kommuner från Huddinge?', answer: 'Ja, vi erbjuder flyttar till hela Sverige från Huddinge. Våra erfarna team planerar långväga transporter med hänsyn till väder, trafik och säkerhet. Vi ger alltid fasta priser även för flyttar utanför Stockholms län.' },
      { question: 'Kan ni hjälpa med packning inför familjeflytt i Huddinge?', answer: 'Ja, vi erbjuder komplett packningstjänst med familjevänliga material. Våra team är vana vid Huddinges olika familjebostäder och packar säkert för transport – från barnleksaker till familjemöbler.' },
      { question: 'Vad kostar en familjeflytt från villa till lägenhet i Huddinge?', answer: 'Priset baseras på boyta, avstånd och extra tjänster. Vi ger alltid fasta priser utan dolda avgifter. Kontakta oss för en personlig offert baserad på familjens specifika behov och flyttsträcka i Huddinge.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Huddinge – specialists in family moves since 2019',
    subtitle: 'Experienced moves in Huddinge, Flemingsberg, Segeltorp and Skogås. We specialise in family homes, houses and apartment complexes with focus on Huddinge\'s green areas and child-friendly environments.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Huddinge',
    desktop: 'Since 2019 we have established ourselves as Huddinge\'s most trusted moving company for families – from houses in Flemingsberg to modern apartment complexes in Segeltorp. Our specialisation in family moves and child-friendly environments makes us the natural choice for Huddinge residents.',
    desktop2: 'Over 8,000 successful family moves have made us a reliable partner for both families and businesses in Huddinge. We work with transparent pricing and no surprises. Every move is carefully planned considering Huddinge\'s specific challenges – green areas, schools, families with children and safe residential environments.',
    desktop3: 'Our family-friendly benefits include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Your personal move coordinator ensures everything from planning to execution works smoothly for the whole family.',
    mobile: 'Huddinge\'s most trusted moving company for families with transparent pricing and personal service – over 8,000 satisfied clients.',
    mobileExpanded: 'Specialised planning for family moves and child-friendly environments. Free boxes, flexible rebooking and 14-day cleaning guarantee.',
    mobileExpanded2: 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process for the whole family.'
  },
  features: { title: 'What benefits do you get with Flyttella in Huddinge?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Huddinge',
    description: 'Families in Huddinge, Flemingsberg and Segeltorp value our family-friendly planning, transparent pricing and punctual execution. We are specialists in family moves with children and ensure move day is calm and safe for the whole family.',
    badgeAlt: 'Recommended mover Huddinge',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Our quotes are based on your family-specific needs in Huddinge – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Huddinge\'s family-friendly environments for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Huddinge' },
  experience: {
    title: 'Our experience with moves in Huddinge',
    description: 'With over 8000 completed family moves and 7000 cleanings we have developed solid expertise in family moves. We are particularly strong in family homes in Flemingsberg, houses in Segeltorp and apartment complexes in Skogås – where each area requires its unique family-friendly planning.',
    expanded: 'Our position as one of Stockholm\'s most recommended family moving companies is confirmed by over 1000 positive reviews. In Huddinge our service is built on years of experience with the area\'s family-friendly conditions – from green areas with playgrounds to schools and safe residential environments.'
  },
  awards: {
    title: 'Flyttella awards in Huddinge',
    description: 'Our awards confirm our position as Huddinge\'s most reliable family moving company. We are particularly proud of our returning family customers in Flemingsberg and Segeltorp, who demonstrate the high quality and trust we have built for family moves over time.'
  },
  servicesSection: {
    title: 'Discover our services in Huddinge',
    description: 'From family moves and houses to apartment complexes – we offer complete moving solutions in Huddinge. Packing, move-out cleaning, storage and special lifts of family furniture. Every job is tailored to the family\'s needs and the area\'s family-friendly conditions – always with fixed pricing and transparent communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for family moves in Huddinge',
    description: 'Checklist for a smooth family move in Huddinge: plan access and loading, secure parking and align time windows with the family\'s needs and the area\'s schools.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth family move in Huddinge',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce stress for the whole family.'
  },
  faq: {
    title: 'Common questions about family moves in Huddinge',
    items: [
      { question: 'Why choose Flyttella for family moves in Huddinge?', answer: 'We specialise in family moves and child-friendly environments in Huddinge with deep local knowledge. Our family-friendly benefits include transparent pricing, free moving boxes and 14-day cleaning guarantee – perfect for Huddinge families.' },
      { question: 'How do you plan moves for families with children in Huddinge?', answer: 'We plan carefully for family moves considering schools, playgrounds and safe residential environments. We assess access routes, coordinate loading spots and adapt crew size to the family\'s specific needs for a smooth move.' },
      { question: 'Can you handle moves from houses in Huddinge?', answer: 'Yes, we are experts at house moves in Flemingsberg and other areas. We plan for family moves considering green areas, schools and families with children – always with focus on safety and security.' },
      { question: 'Do you offer move-out cleaning for family homes in Huddinge?', answer: 'Yes, we offer professional move-out cleaning for family homes, houses and apartments in Huddinge. Our cleaners are experienced with the area\'s family-friendly environments and association rules, with 14-day guarantee on all work.' },
      { question: 'Can you handle moves to other municipalities from Huddinge?', answer: 'Yes, we offer moves throughout Sweden from Huddinge. Our experienced teams plan long-distance transport considering weather, traffic and safety. We always provide fixed prices even for moves outside Stockholm County.' },
      { question: 'Can you help with packing before a family move in Huddinge?', answer: 'Yes, we offer complete packing service with family-friendly materials. Our teams are experienced with Huddinge\'s different family homes and pack safely for transport – from children\'s toys to family furniture.' },
      { question: 'What does a family move from house to apartment cost in Huddinge?', answer: 'The price is based on size, distance and additional services. We always provide fixed prices with no hidden fees. Contact us for a personal quote based on the family\'s specific needs and move distance in Huddinge.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.huddinge) data.huddinge = {};
  data.huddinge = { ...data.huddinge, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for huddinge in sv and en.');
