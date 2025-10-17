// Update hagersten.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Hägersten – smidig flytt i västra söderort',
    subtitle: 'Lokalt anpassade flyttar i Hägersten, Telefonplan, Midsommarkransen och Aspudden. Vi planerar bärvägar, tidsfönster och parkering enligt parkeringszoner och föreningsregler – med fokus på lugn logistik och punktlighet.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Hägersten',
    desktop: 'Vi gör flyttar i Hägersten enklare, tryggare och tydligare – från lägenheter kring Telefonplan/Midsommarkransen till fastigheter i Aspudden. 5 år som företag och 8+ års erfarenhet ger inarbetade rutiner, hög kvalitet och många nöjda kunder.',
    desktop2: 'Över 8 000 kunder har valt oss för allt från mindre flyttar till helhetslösningar. Vi arbetar med fasta priser och klara villkor. Inför flyttdagen planerar vi bärvägar, lastplats och tidsfönster utifrån Hägerstens förutsättningar – vi bokar hiss, samordnar nycklar/portkoder och säkerställer smidigt tillträde.',
    desktop3: 'Gratis lån av flyttkartonger, kostnadsfri om-/avbokning upp till 24 timmar innan och 14 dagars städgaranti ingår. En personlig kontakt följer din flytt, dimensionerar bemanning/fordon och ser till att allt går enligt plan.',
    mobile: 'Smidig flytt i Hägersten med fasta priser, tydliga villkor och personlig kontakt – över 8 000 nöjda kunder.',
    mobileExpanded: 'Planering av bärvägar, lastplats och tidsfönster. Gratis kartonger, fri om-/avbokning (24 h) och 14 dagars städgaranti.',
    mobileExpanded2: 'Helhetslösningar (packning/städning/rådgivning). Kontaktperson som håller ihop allt från start till mål.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Hägersten?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Hägersten',
    description: 'Kunder i Hägersten, Telefonplan och Aspudden uppskattar vår tydliga planering, fasta priser och punktliga leverans. Vi är vana vid bokningsbara hissar, smala trapphus och reglerade lastplatser – och ser till att flyttdagen blir lugn och effektiv.',
    badgeAlt: 'Rekommenderad flyttfirma Hägersten',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter utgår från dina behov i Hägersten – boyta, våningsplan, trappor/hiss, bärvägar och parkering. Vid behov gör vi kostnadsfri besiktning och sätter rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter parkeringszoner och föreningsregler för en trygg, effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Hägersten' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Hägersten',
    description: 'Med över 8000 flyttar och 7000 städningar bakom oss har vi byggt upp en unik expertis. Vi har hjälpt tusentals familjer och företag med flyttar i Telefonplan, Midsommarkransen och Aspudden – med lugn logistik och hänsyn till boendemiljö.',
    expanded: 'Vi är erkända för pålitlig planering och god kommunikation, med över 1000 positiva omdömen i Stockholm. Vår flyttservice i Hägersten bygger på år av praktisk erfarenhet – med varsam hantering och effektiv utförande.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Hägersten',
    description: 'Våra utmärkelser speglar engagemang för kvalitet, service och kundnöjdhet i Hägersten. Återkommande kunder och goda omdömen visar att vår planering och hantering håller hög nivå – varje dag.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Hägersten',
    description: 'Bohagsflytt, packning, flyttstädning, magasinering och tunga lyft. Vi skräddarsyr upplägget efter bostadstyp och tidplan – med fasta priser och tydlig kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Hägersten',
    description: 'Checklista för smidig flytt i Hägersten: planera bärvägar och lastplats, boka hiss i tid, säkra nycklar/portkoder och anpassa tidsfönster efter parkering.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Hägersten',
    description: 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Hägersten',
    items: [
      { question: 'Hur löser ni parkering och lastzon i Hägersten?', answer: 'Vi bedömer bärvägar och föreslår lastplats utifrån gatornas bredd och parkeringszoner. I vissa föreningar krävs tillstånd eller bokade tidsfönster – vi rådgiver och planerar detta i offert och order.' },
      { question: 'Fastigheten har bokningsbar hiss – vad behöver jag tänka på?', answer: 'Boka hiss i god tid och meddela oss tiderna. Vi skyddar dörrposter/väggar/golv vid behov och synkar lastningen så att flytten följer bokningsfönstret.' },
      { question: 'Trapphuset är smalt – kan ni hantera det?', answer: 'Ja. Vi dimensionerar bemanning, använder bärselar/säckkärror och planerar bärvägar för att undvika skador och onödiga lyft.' },
      { question: 'Kan ni använda nyckelbox eller digitalt lås?', answer: 'Ja. Vi kan hantera nyckelboxar (kod) och tillfälliga digitala behörigheter. Vi bekräftar mottagning/återlämning skriftligt och verifierar legitimation.' },
      { question: 'Ingår montering/demontering?', answer: 'Enklare montering/demontering ingår. Avancerad montering, specialsnickerier eller fasta installationer är tillval och bokas i förväg.' },
      { question: 'Kan ni leverera packmaterial i förväg?', answer: 'Ja. Vi levererar kartonger, packpapper och skydd i god tid och ger råd om märkning/packordning för snabb uppackning.' },
      { question: 'Erbjuder ni magasinering mellan Hägersten och city?', answer: 'Ja. Vi erbjuder kort- och långtidsmagasinering. Hämtning och återleverans planeras efter din tidplan – inom Hägersten eller till/från andra stadsdelar.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Hägersten – smooth moves in west south Stockholm',
    subtitle: 'Localised moves in Hägersten, Telefonplan, Midsommarkransen and Aspudden. We plan access routes, time windows and parking aligned with parking zones and association rules – focusing on calm logistics and punctuality.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Hägersten',
    desktop: 'We make moves in Hägersten simpler, safer and clearer – from apartments around Telefonplan/Midsommarkransen to buildings in Aspudden. 5 years as a company and 8+ years’ experience give solid routines, high quality and many happy clients.',
    desktop2: 'Over 8,000 clients have chosen us for everything from small moves to full-service solutions. We work with fixed pricing and clear terms. Ahead of move day we plan access, loading spots and time windows for Hägersten – booking elevators, coordinating keys/codes and ensuring smooth access.',
    desktop3: 'Free loan of boxes, free rebooking/cancellation up to 24 hours before and a 14-day cleaning guarantee are included. A dedicated contact follows your move, sizes crew/vehicle and keeps everything on plan.',
    mobile: 'Smooth moves in Hägersten with fixed pricing, clear terms and a dedicated contact – over 8,000 happy clients.',
    mobileExpanded: 'Planning for access/loading/time windows. Free boxes, 24h free rebooking/cancellation and 14-day cleaning guarantee.',
    mobileExpanded2: 'Full-service options (packing/cleaning/advisory). A dedicated contact keeps everything on track.'
  },
  features: { title: 'What benefits do you get with Flyttella in Hägersten?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Hägersten',
    description: 'Clients in Hägersten, Telefonplan and Aspudden value our clear planning, fixed pricing and punctual delivery. We are used to bookable elevators, narrow stairwells and regulated loading – making move day calm and efficient.',
    badgeAlt: 'Recommended mover Hägersten',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Quotes are based on your needs in Hägersten – size, floor level, stairs/elevator, access routes and parking. When needed we perform a free inspection and set the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to parking zones and association rules for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Hägersten' },
  experience: {
    title: 'Our experience with moves in Hägersten',
    description: 'With over 8000 moves and 7000 cleanings we have built unique expertise. We have helped thousands of families and businesses move in Telefonplan, Midsommarkransen and Aspudden – with calm logistics and respect for residents.',
    expanded: 'We are recognised for reliable planning and good communication, with 1000+ positive reviews in Stockholm. Our Hägersten service is built on years of practical experience – with careful handling and efficient execution.'
  },
  awards: {
    title: 'Flyttella awards in Hägersten',
    description: 'Our awards reflect commitment to quality, service and customer satisfaction in Hägersten. Returning clients and strong reviews show our planning and handling are consistently high – every day.'
  },
  servicesSection: {
    title: 'Discover our services in Hägersten',
    description: 'Household moves, packing, move-out cleaning, storage and heavy lifts. We tailor the setup to your home and timeline – with fixed pricing and clear communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Hägersten',
    description: 'Checklist for a smooth move in Hägersten: plan access and loading, book elevators early, secure keys/codes and align time windows with parking.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Hägersten',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.'
  },
  faq: {
    title: 'Common questions about moving in Hägersten',
    items: [
      { question: 'How do you handle parking/loading in Hägersten?', answer: 'We assess access routes and suggest loading spots based on street width and parking zones. Some associations require permits or booked time windows – we advise and plan this in the quote and order.' },
      { question: 'The building has a bookable elevator – what should I consider?', answer: 'Book the elevator in advance and share the time window. We protect door frames/walls/floors if needed and sync loading so the move stays within the slot.' },
      { question: 'The stairwell is narrow – can you manage it?', answer: 'Yes. We size the crew appropriately, use carrying straps/dollies and plan access routes to avoid damage and unnecessary lifts.' },
      { question: 'Can you use a key box or digital lock?', answer: 'Yes. We can handle key boxes (with code) and temporary digital access. We confirm receipt/return in writing and verify IDs.' },
      { question: 'Is assembly/disassembly included?', answer: 'Basic assembly/disassembly is included. Advanced/custom work or fixed installations are add-ons and must be pre-booked.' },
      { question: 'Can you deliver packing materials in advance?', answer: 'Yes. We can deliver boxes, paper and protective materials and advise on labelling/packing order for faster unpacking.' },
      { question: 'Do you offer storage between Hägersten and the city?', answer: 'Yes. We offer short- and long-term storage. Collection and return are scheduled to fit your timeline – within Hägersten or to/from other districts.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.hagersten) data.hagersten = {};
  data.hagersten = { ...data.hagersten, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for hagersten in sv and en.');
