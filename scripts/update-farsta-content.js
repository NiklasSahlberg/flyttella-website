// Update farsta.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Farsta – smidig flytt i söderort',
    subtitle: 'Lokalt anpassade flyttar i Farsta, Farsta centrum, Farsta Strand och Hökarängen. Vi planerar bärvägar, tidsfönster och parkering enligt parkeringszoner och bostadsrättsföreningars regler.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Farsta',
    desktop: 'Vi gör flyttar i Farsta enklare, tryggare och tydligare – från lägenheter vid Farsta centrum till radhus kring Magelungen. 5 år som företag och 8+ års erfarenhet ger väl inarbetade rutiner, hög kvalitet och många nöjda kunder i söderort.',
    desktop2: 'Över 8 000 kunder har valt oss för allt från mindre flyttar till helhetslösningar. Vi arbetar med fasta priser och klara villkor. Inför flyttdagen planerar vi bärvägar, lastplats och tidsfönster utifrån Farstas förutsättningar – vi bokar hiss, samordnar nycklar/portkoder och säkerställer smidigt tillträde.',
    desktop3: 'Gratis lån av flyttkartonger, kostnadsfri om-/avbokning upp till 24 timmar innan och 14 dagars städgaranti ingår. En personlig kontakt följer din flytt, dimensionerar bemanning/fordon och ser till att allt går enligt plan.',
    mobile: 'Smidig flytt i Farsta med fasta priser, tydliga villkor och personlig kontakt – över 8 000 nöjda kunder.',
    mobileExpanded: 'Vi planerar bärvägar, lastplats och tidsfönster för Farsta. Gratis kartonger, fri om-/avbokning (24 h) och 14 dagars städgaranti.',
    mobileExpanded2: 'Helhetslösningar (packning/städning/rådgivning). Kontaktperson som håller ihop allt från start till mål.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Farsta?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Farsta',
    description: 'Kunder i Farsta, Farsta Strand och Hökarängen lyfter vår tydliga planering, fasta priser och punktlighet. Vi är vana vid bokningsbara hissar, smala trapphus och parkering nära tunnelbanan – och ser till att flyttdagen blir lugn och effektiv.',
    badgeAlt: 'Rekommenderad flyttfirma Farsta',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter utgår från dina behov i Farsta – boyta, våningsplan, trappor/hiss, bärvägar och parkering. Vid behov gör vi kostnadsfri besiktning och sätter rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Vi anpassar planeringen i anslutning till Farsta centrum och Farsta strand, med hänsyn till parkeringszoner och föreningsregler, för en trygg och effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Farsta' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Farsta',
    description: 'Med över 8000 flyttar och 7000 städningar bakom oss har vi byggt upp en unik expertis inom flytt- och städningsbranschen. Vår erfarenhet sträcker sig över hela Stockholm och vi har hjälpt tusentals familjer och företag med deras flyttar i Farsta, Farsta Strand och Hökarängen.',
    expanded: 'Våra prestationer har gett oss erkännande som en av Stockholms mest pålitliga flyttfirmor, med över 1000 positiva recensioner och rekommendationer från nöjda kunder i söderort. Vi är stolta över att kunna erbjuda professionell flyttservice i Farsta baserad på år av praktisk erfarenhet.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Farsta',
    description: 'Våra utmärkelser speglar vårt engagemang för kvalitet, service och kundnöjdhet i Farsta. Kunders omdömen och återkommande uppdrag visar att vår planering, kommunikation och varsamma hantering håller hög nivå – varje dag.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Farsta',
    description: 'Bohagsflytt, packning, flyttstädning, magasinering och tunga lyft. Vi skräddarsyr upplägget efter bostadstyp och tidplan – med fasta priser och tydlig kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Farsta',
    description: 'Checklista för smidig flytt i Farsta: planera bärvägar och lastplats, boka hiss i tid, säkra nycklar/portkoder och anpassa tidsfönster efter tunnelbana och parkering.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Farsta',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Farsta',
    items: [
      { question: 'Hur löser ni parkering och lastzon nära Farsta centrum och tunnelbana?', answer: 'Vi bedömer bärvägar och föreslår lastplats utifrån gatornas bredd och parkeringszoner. I vissa föreningar krävs tillstånd eller bokade tidsfönster – vi rådgiver och planerar detta i offert och order.' },
      { question: 'Fastigheten har bokningsbar hiss – vad behöver jag tänka på?', answer: 'Boka hiss i god tid och meddela oss tiderna. Vi skyddar hiss/entré vid behov och synkar lastningen så att flytten följer bokningsfönstret.' },
      { question: 'Trapphuset är smalt – kan ni hantera det?', answer: 'Ja. Vi dimensionerar bemanning, använder bärselar/säckkärror och planerar bärvägar för att undvika skador och onödiga lyft.' },
      { question: 'Kan ni använda nyckelbox eller digitalt lås?', answer: 'Ja. Vi kan hantera nyckelboxar (kod) och tillfälliga digitala behörigheter. Vi bekräftar mottagning/återlämning skriftligt och verifierar legitimation.' },
      { question: 'Ingår montering/demontering?', answer: 'Enklare montering/demontering ingår. Avancerad montering, specialsnickerier eller fasta installationer är tillval och bokas i förväg.' },
      { question: 'Kan ni leverera packmaterial i förväg?', answer: 'Ja. Vi levererar kartonger, packpapper och skydd i god tid och ger råd om märkning/packordning för snabb uppackning.' },
      { question: 'Erbjuder ni magasinering mellan Farsta och city?', answer: 'Ja. Vi erbjuder kort- och långtidsmagasinering. Hämtning och återleverans planeras efter din tidplan – inom Farsta eller till/från andra stadsdelar.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Farsta – smooth moves in south Stockholm',
    subtitle: 'Localised moves in Farsta, Farsta Centre, Farsta Strand and Hökarängen. We plan access routes, time windows and parking aligned with parking zones and housing association rules.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Farsta',
    desktop: 'Flyttella is a Stockholm-based moving and cleaning company making moves in Farsta simpler, safer and more transparent. We have operated for 5 years with 8+ years’ experience – reflected in our methods, quality and happy clients in Farsta, Farsta Strand and Hökarängen.',
    desktop2: 'We have helped over 8,000 clients, from small moves to full-service solutions. We work with clear terms and fixed pricing, planning access, parking and time windows tailored to Farsta. Elevator booking, keys and entry codes are coordinated in advance.',
    desktop3: 'We offer free loan of moving boxes, free rebooking/cancellation up to 24 hours before and a 14-day cleaning guarantee. Your dedicated contact follows the move end to end and ensures the right crew and vehicle.',
    mobile: 'Reliable moves in Farsta with fixed pricing, clear terms and a dedicated contact – over 8,000 happy clients.',
    mobileExpanded: 'Planning for access/parking/time windows tailored to Farsta. Free boxes, 24h free rebooking/cancellation and 14-day cleaning guarantee.',
    mobileExpanded2: 'Full-service options with packing/cleaning/advisory. A dedicated contact keeps everything on track.'
  },
  features: { title: 'What benefits do you get with Flyttella in Farsta?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Farsta',
    description: 'Clients in Farsta, Farsta Strand and Hökarängen value our clear planning, fixed pricing and punctual delivery. We are used to bookable elevators, tight stairwells and parking near the subway – making move day calm and efficient.',
    badgeAlt: 'Recommended mover Farsta',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Quotes are based on your needs in Farsta – size, floor level, stairs/elevator, access routes and parking. When needed we perform a free inspection and set the right crew/vehicle. All prices are fixed with no hidden fees. We adapt planning around Farsta Centre and Farsta Strand subway access, parking zones and association rules for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Farsta' },
  experience: {
    title: 'Our experience with moves in Farsta',
    description: 'With over 8000 moves and 7000 cleanings behind us, we have built unique expertise in the moving and cleaning industry. Our experience spans all of Stockholm and we have helped thousands of families and businesses with their moves in Farsta, Farsta Strand and Hökarängen.',
    expanded: 'Our achievements have earned us recognition as one of Stockholm\'s most reliable moving companies, with over 1000 positive reviews and recommendations from satisfied clients in south Stockholm. We are proud to offer professional moving services in Farsta based on years of practical experience.'
  },
  awards: {
    title: 'Flyttella awards in Farsta',
    description: 'Our awards reflect commitment to quality, service and customer satisfaction in Farsta. We are recognised for reliable planning and careful handling – inspiring us to deliver top-class moving services every day.'
  },
  servicesSection: {
    title: 'Discover our services in Farsta',
    description: 'Household moves, packing, move-out cleaning, storage and heavy lifts. We tailor the setup to your home and timeline – with fixed pricing and clear communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Farsta',
    description: 'Checklist for a smooth move in Farsta: plan access and loading, book elevators early, secure keys/codes and align time windows with subway and parking.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Farsta',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.'
  },
  faq: {
    title: 'Common questions about moving in Farsta',
    items: [
      { question: 'How do you handle parking/loading near Farsta Centre and the subway?', answer: 'We assess access routes and suggest loading spots based on street width and parking zones. Some associations require permits or booked time windows – we advise and plan this in the quote and order.' },
      { question: 'The building has a bookable elevator – what should I consider?', answer: 'Book the elevator in advance and share the time window. We protect the elevator/entrance if needed and sync loading so the move stays within the slot.' },
      { question: 'The stairwell is narrow – can you manage it?', answer: 'Yes. We size the crew appropriately, use carrying straps/dollies and plan access routes to avoid damage and unnecessary lifts.' },
      { question: 'Can you use a key box or digital lock?', answer: 'Yes. We can handle key boxes (with code) and temporary digital access. We confirm receipt/return in writing and verify IDs.' },
      { question: 'Is assembly/disassembly included?', answer: 'Basic assembly/disassembly is included. Advanced/custom work or fixed installations are add-ons and must be pre-booked.' },
      { question: 'Can you deliver packing materials in advance?', answer: 'Yes. We can deliver boxes, paper and protective materials and advise on labelling/packing order for faster unpacking.' },
      { question: 'Do you offer storage between Farsta and the city?', answer: 'Yes. We offer short- and long-term storage. Collection and return are scheduled to fit your timeline – within Farsta or to/from other districts.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.farsta) data.farsta = {};
  data.farsta = { ...data.farsta, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for farsta in sv and en.');
