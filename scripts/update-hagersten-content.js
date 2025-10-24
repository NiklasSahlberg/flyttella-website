// Update hagersten.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Professionell flyttfirma i Hägersten – erfarenhet sedan 2019',
    subtitle: 'Specialiserade flyttar i Hägersten, Telefonplan, Midsommarkransen och Aspudden. Vi hanterar komplexa bärvägar, bokningsbara hissar och reglerade parkeringszoner med precision och hänsyn till boendemiljön.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Hägersten',
    desktop: 'Sedan 2019 har vi specialiserat oss på flyttar i Hägerstens olika områden – från moderna lägenhetskomplex vid Telefonplan till charmiga radhus i Aspudden. Vår lokalkännedom kombineras med över 8 års branscherfarenhet för optimala flyttlösningar.',
    desktop2: 'Mer än 8 000 framgångsrika flyttar har gjort oss till en pålitlig partner för både privatpersoner och företag. Vi arbetar med transparenta priser och inga överraskningar. Varje flytt planeras noggrant med hänsyn till Hägerstens specifika utmaningar – smala gator, bokningsbara hissar och föreningsregler.',
    desktop3: 'Våra fördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Din personliga flyttkoordinator säkerställer att allt från hissbokning till nyckelhantering fungerar smidigt.',
    mobile: 'Erfaren flyttfirma i Hägersten med transparenta priser och personlig service – över 8 000 nöjda kunder.',
    mobileExpanded: 'Specialiserad planering för Hägerstens utmaningar. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.',
    mobileExpanded2: 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Hägersten?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Hägersten',
    description: 'Kunder i Hägersten, Telefonplan och Aspudden uppskattar vår noggranna planering, transparenta priser och punktliga genomförande. Vi hanterar bokningsbara hissar, trånga trapphus och reglerade lastplatser med precision – och säkerställer att flyttdagen blir lugn och effektiv.',
    badgeAlt: 'Rekommenderad flyttfirma Hägersten',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter baseras på dina specifika behov i Hägersten – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter parkeringszoner och föreningsregler för en säker, effektiv flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Hägersten' },
  experience: {
    title: 'Vår erfarenhet av flyttar i Hägersten',
    description: 'Med över 8000 flyttar och 7000 städningar bakom oss har vi byggt upp en unik expertis inom flytt- och städningsbranschen. Vi har hjälpt tusentals familjer och företag med flyttar i Telefonplan, Midsommarkransen och Aspudden – med lugn logistik och hänsyn till boendemiljön.',
    expanded: 'Vi är erkända för pålitlig planering och god kommunikation, med över 1000 positiva omdömen i Stockholm. Vår flyttservice i Hägersten bygger på år av praktisk erfarenhet – med varsam hantering och effektiv utförande.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Hägersten',
    description: 'Våra utmärkelser speglar vårt engagemang för kvalitet, service och kundnöjdhet i Hägersten. Återkommande kunder och goda omdömen visar att vår planering och hantering håller hög nivå – varje dag.'
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
    title: 'Professional moving company in Hägersten – experience since 2019',
    subtitle: 'Specialised moves in Hägersten, Telefonplan, Midsommarkransen and Aspudden. We handle complex access routes, bookable elevators and regulated parking zones with precision and respect for residents.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Hägersten',
    desktop: 'Since 2019 we have specialised in moves across Hägersten\'s different areas – from modern apartment complexes at Telefonplan to charming townhouses in Aspudden. Our local knowledge combines with over 8 years\' industry experience for optimal moving solutions.',
    desktop2: 'More than 8,000 successful moves have made us a reliable partner for both individuals and businesses. We work with transparent pricing and no surprises. Every move is carefully planned considering Hägersten\'s specific challenges – narrow streets, bookable elevators and association rules.',
    desktop3: 'Our benefits include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Your personal move coordinator ensures everything from elevator booking to key handling works smoothly.',
    mobile: 'Experienced moving company in Hägersten with transparent pricing and personal service – over 8,000 satisfied clients.',
    mobileExpanded: 'Specialised planning for Hägersten\'s challenges. Free boxes, flexible rebooking and 14-day cleaning guarantee.',
    mobileExpanded2: 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process.'
  },
  features: { title: 'What benefits do you get with Flyttella in Hägersten?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Hägersten',
    description: 'Clients in Hägersten, Telefonplan and Aspudden appreciate our thorough planning, transparent pricing and punctual execution. We handle bookable elevators, narrow stairwells and regulated loading with precision – ensuring move day is calm and efficient.',
    badgeAlt: 'Recommended mover Hägersten',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Our quotes are based on your specific needs in Hägersten – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to parking zones and association rules for a safe, efficient move.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Hägersten' },
  experience: {
    title: 'Our experience with moves in Hägersten',
    description: 'With over 8000 moves and 7000 cleanings we have built unique expertise in the moving and cleaning industry. We have helped thousands of families and businesses move in Telefonplan, Midsommarkransen and Aspudden – with calm logistics and respect for residents.',
    expanded: 'We are recognised for reliable planning and good communication, with over 1000 positive reviews in Stockholm. Our Hägersten service is built on years of practical experience – with careful handling and efficient execution.'
  },
  awards: {
    title: 'Flyttella awards in Hägersten',
    description: 'Our awards reflect our commitment to quality, service and customer satisfaction in Hägersten. Returning clients and strong reviews show our planning and handling maintain high standards – every day.'
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