// Update jarfalla.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Järfälla – experter på villaflyttar sedan 2021',
    subtitle: 'Professionella flyttar i Järfälla, Jakobsberg, Kallhäll och Viksjö. Vi specialiserar oss på villor, radhus och lägenhetskomplex med djup lokalkännedom om Järfällas villakvarter och moderna bostadsområden.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Järfälla',
    desktop: 'Sedan 2021 har vi byggt upp en stark position som Järfällas mest betrodda flyttfirma – från exklusiva villor i Jakobsberg till moderna lägenhetskomplex i Kallhäll. Vår specialisering på villaflyttar och lokalkännedom gör oss till det naturliga valet för Järfällas invånare.',
    desktop2: 'Över 8 000 framgångsrika flyttar har etablerat oss som en pålitlig partner för både privatpersoner och företag i Järfälla. Vi arbetar med transparenta priser och inga överraskningar. Varje flytt planeras noggrant med hänsyn till Järfällas specifika utmaningar – villakvarter, moderna bostadsområden och lokala förutsättningar.',
    desktop3: 'Våra fördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Din personliga flyttkoordinator säkerställer att allt från initial planering till slutlig genomförande fungerar smidigt.',
    mobile: 'Järfällas mest betrodda flyttfirma med transparenta priser och personlig service – över 8 000 nöjda kunder.',
    mobileExpanded: 'Specialiserad planering för Järfällas villakvarter och moderna områden. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.',
    mobileExpanded2: 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Järfälla?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Järfälla',
    description: 'Kunder i Järfälla, Jakobsberg och Kallhäll uppskattar vår noggranna planering, transparenta priser och punktliga genomförande. Vi är experter på villaflyttar och garanterar att flyttdagen blir lugn och effektiv.',
    badgeAlt: 'Rekommenderad flyttfirma Järfälla',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter baseras på dina specifika behov i Järfälla – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Järfällas olika områden för en säker, effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Järfälla' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Järfälla',
    description: 'Med över 8000 genomförda flyttar och 7000 städningar har vi utvecklat en gedigen expertis inom flytt- och städningsbranschen. Särskilt starka är vi på villor i Jakobsberg, lägenhetskomplex i Kallhäll och radhus i Viksjö – där varje område kräver sin unika planering.',
    expanded: 'Vår position som en av Stockholms mest rekommenderade flyttfirmor bekräftas av över 1000 positiva omdömen. I Järfälla bygger vår service på årslång erfarenhet av områdets förutsättningar – från villakvarter till moderna bostadsområden.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Järfälla',
    description: 'Våra utmärkelser bekräftar vår position som Järfällas mest pålitliga flyttfirma. Särskilt stolta är vi över våra återkommande kunder i Jakobsberg och Kallhäll, som visar på den höga kvalitet och det förtroende vi byggt upp över tid.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Järfälla',
    description: 'Från villor och radhus till lägenhetskomplex – vi erbjuder kompletta flyttlösningar i Järfälla. Packning, flyttstädning, magasinering och speciallyft av tunga möbler. Varje uppdrag skräddarsys efter dina behov och områdets förutsättningar – alltid med fasta priser och transparent kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Järfälla',
    description: 'Checklista för smidig flytt i Järfälla: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter områdets specifika förutsättningar.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Järfälla',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Järfälla',
    items: [
      { question: 'Varför välja Flyttella för flytt i Järfälla?', answer: 'Vi är specialiserade på villaflyttar och moderna bostadsområden i Järfälla med djup lokalkännedom. Våra fördelar inkluderar transparenta priser, gratis flyttkartonger och 14 dagars städgaranti – perfekt för Järfällas olika boendemiljöer.' },
      { question: 'Hur planerar ni flyttar i villakvarter i Järfälla?', answer: 'Vi planerar noggrant för villakvarter med hänsyn till smala gator och begränsad parkering. Vi bedömer bärvägar, samordnar lastplatser och anpassar bemanning efter områdets specifika förutsättningar för en smidig flytt.' },
      { question: 'Kan ni hantera flyttar från lägenhetskomplex i Järfälla?', answer: 'Ja, vi är experter på lägenhetsflyttar i Kallhäll och andra områden. Vi planerar för moderna bostadsområden med hänsyn till hissar, föreningsregler och parkeringsmöjligheter – alltid med fokus på effektivitet.' },
      { question: 'Erbjuder ni flyttstädning för villor i Järfälla?', answer: 'Ja, vi erbjuder professionell flyttstädning för villor, radhus och lägenheter i Järfälla. Våra städare är vana vid områdets olika bostadstyper och föreningsregler, med 14 dagars garanti på allt arbete.' },
      { question: 'Kan ni hantera flyttar till andra kommuner från Järfälla?', answer: 'Ja, vi erbjuder flyttar till hela Sverige från Järfälla. Våra erfarna team planerar långväga transporter med hänsyn till väder, trafik och säkerhet. Vi ger alltid fasta priser även för flyttar utanför Stockholms län.' },
      { question: 'Kan ni hjälpa med packning inför flytt i Järfälla?', answer: 'Ja, vi erbjuder komplett packningstjänst med professionella material. Våra team är vana vid Järfällas olika bostadstyper och packar säkert för transport – från känsliga föremål till tunga möbler.' },
      { question: 'Vad kostar en flytt från villa till lägenhet i Järfälla?', answer: 'Priset baseras på boyta, avstånd och extra tjänster. Vi ger alltid fasta priser utan dolda avgifter. Kontakta oss för en personlig offert baserad på dina specifika behov och flyttsträcka i Järfälla.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Järfälla – experts in house moves since 2021',
    subtitle: 'Professional moves in Järfälla, Jakobsberg, Kallhäll and Viksjö. We specialise in houses, townhouses and apartment complexes with deep local knowledge of Järfälla\'s villa districts and modern residential areas.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Järfälla',
    desktop: 'Since 2021 we have built a strong position as Järfälla\'s most trusted moving company – from exclusive houses in Jakobsberg to modern apartment complexes in Kallhäll. Our specialisation in house moves and local knowledge makes us the natural choice for Järfälla residents.',
    desktop2: 'Over 8,000 successful moves have established us as a reliable partner for both individuals and businesses in Järfälla. We work with transparent pricing and no surprises. Every move is carefully planned considering Järfälla\'s specific challenges – villa districts, modern residential areas and local conditions.',
    desktop3: 'Our benefits include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Your personal move coordinator ensures everything from initial planning to final execution works smoothly.',
    mobile: 'Järfälla\'s most trusted moving company with transparent pricing and personal service – over 8,000 satisfied clients.',
    mobileExpanded: 'Specialised planning for Järfälla\'s villa districts and modern areas. Free boxes, flexible rebooking and 14-day cleaning guarantee.',
    mobileExpanded2: 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process.'
  },
  features: { title: 'What benefits do you get with Flyttella in Järfälla?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Järfälla',
    description: 'Clients in Järfälla, Jakobsberg and Kallhäll appreciate our thorough planning, transparent pricing and punctual execution. We are experts at house moves and guarantee move day is calm and efficient.',
    badgeAlt: 'Recommended mover Järfälla',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Our quotes are based on your specific needs in Järfälla – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Järfälla\'s different areas for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Järfälla' },
  experience: {
    title: 'Our experience with moves in Järfälla',
    description: 'With over 8000 completed moves and 7000 cleanings we have developed solid expertise in the moving and cleaning industry. We are particularly strong in houses in Jakobsberg, apartment complexes in Kallhäll and townhouses in Viksjö – where each area requires its unique planning.',
    expanded: 'Our position as one of Stockholm\'s most recommended moving companies is confirmed by over 1000 positive reviews. In Järfälla our service is built on years of experience with the area\'s conditions – from villa districts to modern residential areas.'
  },
  awards: {
    title: 'Flyttella awards in Järfälla',
    description: 'Our awards confirm our position as Järfälla\'s most reliable moving company. We are particularly proud of our returning customers in Jakobsberg and Kallhäll, who demonstrate the high quality and trust we have built over time.'
  },
  servicesSection: {
    title: 'Discover our services in Järfälla',
    description: 'From houses and townhouses to apartment complexes – we offer complete moving solutions in Järfälla. Packing, move-out cleaning, storage and special lifts of heavy furniture. Every job is tailored to your needs and the area\'s conditions – always with fixed pricing and transparent communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Järfälla',
    description: 'Checklist for a smooth move in Järfälla: plan access and loading, secure parking and align time windows with the area\'s specific conditions.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Järfälla',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.'
  },
  faq: {
    title: 'Common questions about moving in Järfälla',
    items: [
      { question: 'Why choose Flyttella for moves in Järfälla?', answer: 'We specialise in house moves and modern residential areas in Järfälla with deep local knowledge. Our benefits include transparent pricing, free moving boxes and 14-day cleaning guarantee – perfect for Järfälla\'s different residential environments.' },
      { question: 'How do you plan moves in villa districts in Järfälla?', answer: 'We plan carefully for villa districts considering narrow streets and limited parking. We assess access routes, coordinate loading spots and adapt crew size to the area\'s specific conditions for a smooth move.' },
      { question: 'Can you handle moves from apartment complexes in Järfälla?', answer: 'Yes, we are experts at apartment moves in Kallhäll and other areas. We plan for modern residential areas considering elevators, association rules and parking options – always with focus on efficiency.' },
      { question: 'Do you offer move-out cleaning for houses in Järfälla?', answer: 'Yes, we offer professional move-out cleaning for houses, townhouses and apartments in Järfälla. Our cleaners are experienced with the area\'s different housing types and association rules, with 14-day guarantee on all work.' },
      { question: 'Can you handle moves to other municipalities from Järfälla?', answer: 'Yes, we offer moves throughout Sweden from Järfälla. Our experienced teams plan long-distance transport considering weather, traffic and safety. We always provide fixed prices even for moves outside Stockholm County.' },
      { question: 'Can you help with packing before a move in Järfälla?', answer: 'Yes, we offer complete packing service with professional materials. Our teams are experienced with Järfälla\'s different housing types and pack safely for transport – from delicate items to heavy furniture.' },
      { question: 'What does a move from house to apartment cost in Järfälla?', answer: 'The price is based on size, distance and additional services. We always provide fixed prices with no hidden fees. Contact us for a personal quote based on your specific needs and move distance in Järfälla.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.jarfalla) data.jarfalla = {};
  data.jarfalla = { ...data.jarfalla, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for jarfalla in sv and en.');










