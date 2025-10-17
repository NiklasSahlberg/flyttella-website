// Update enskede.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Enskede – trygg och effektiv flytt nära city',
    subtitle: 'Specialiserade på flyttar i Gamla Enskede, Enskede Gård och Svedmyra. Vi planerar bärvägar, tidsfönster och parkering – med hänsyn till innerstadsnära trafik och boendemiljöer.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Enskede',
    desktop: 'Flyttella är en flytt- och städfirma i Stockholm som gör flyttar i Enskede enklare, tryggare och mer transparenta. Vi har funnits i 5 år som företag och har över 8 års erfarenhet i branschen – något som märks i vårt arbetssätt, vår kvalitet och våra nöjda kunder i Gamla Enskede, Enskede Gård och Svedmyra.',
    desktop2: 'Hittills har vi hjälpt över 8 000 kunder – allt från små flyttar till helhetslösningar med packning, städning och rådgivning. Vi arbetar med tydliga villkor och fasta priser så att du alltid vet vad som ingår och vad det kostar. Inför flyttdagen planerar vi bärvägar, parkering och tidsfönster utifrån Enskedes förutsättningar.',
    desktop3: 'Vi erbjuder gratis lån av flyttkartonger, kostnadsfri om-/avbokning upp till 24 timmar innan och 14 dagars garanti på alla flyttstädningar. Vår personliga kundtjänst finns nära till hands för frågor, tips och rätt beslut – och en kontaktperson följer din flytt från start till mål.',
    mobile: 'Trygg flytthjälp i Enskede med fasta priser, tydliga villkor och personlig kontakt – över 8 000 nöjda kunder.',
    mobileExpanded: 'Vi planerar bärvägar, parkering och tidsfönster för Enskede. Gratis kartonger, 24 h fri om-/avbokning och 14 dagars städgaranti.',
    mobileExpanded2: 'Helhetslösningar med packning/städning/rådgivning. En kontaktperson följer din flytt och ser till att allt flyter.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Enskede?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Enskede',
    description: 'Som en av Sveriges mest rekommenderade flyttfirmor – särskilt uppskattade i Gamla Enskede, Enskede Gård och Svedmyra – sätter vi alltid kunden först. Vi minskar stressen genom tydlig planering, fasta priser och punktlig leverans. Vårt team är vana vid bokningsbara hissar, trånga trapphus och innerstadsnära parkering och ser till att din flytt i Enskede blir en lugn och positiv upplevelse från start till mål.',
    badgeAlt: 'Rekommenderad flyttfirma Enskede',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter baseras på dina behov i Enskede – boyta, trappor/hiss, bärvägar och parkering. Vid behov gör vi kostnadsfri besiktning och planerar rätt bemanning och fordon. Alla priser är fasta utan dolda avgifter. Vi tar hänsyn till innerstadsnära trafik och föreningsregler för en smidig och trygg flytt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Enskede' },
  experience: {
    title: 'Erfarenhet av lägenheter och radhus i Enskede',
    description: 'Vi har lång erfarenhet av flyttar i Gamla Enskede, Enskede Gård, Svedmyra och Enskede-Årsta-Vantör. Vi planerar bärvägar, skyddar entréer och hissar samt reserverar lastzoner där det är möjligt.',
    expanded: 'Vi tar fram en tydlig plan för packning och lastning som minskar störningar och sparar tid. Vi arbetar strukturerat och med respekt för boendemiljö, och löser tunga lyft eller känsliga objekt med rätt metodik.'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Enskede',
    description: 'Våra utmärkelser är ett bevis på vårt engagemang för kvalitet, service och kundnöjdhet i Enskede. Genom åren har vi uppmärksammats av kunder och branschaktörer för pålitligt arbete, tydlig planering och varsam hantering i områden som Gamla Enskede, Enskede Gård och Svedmyra. Dessa erkännanden inspirerar oss att leverera flyttjänster i toppklass – varje dag, till varje kund i Enskede.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Enskede',
    description: 'Bohagsflytt, packning, flyttstädning, magasinering och tunga lyft. Vi skräddarsyr upplägget efter bostadstyp och tidplan – med fasta priser och tydlig kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Enskede',
    description: 'Planera bärvägar och lastplats, boka hiss i tid och säkra nycklar och tillträde. Våra checklistor hjälper dig till en lugn och effektiv flyttdag.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Enskede',
    description: 'Förbered packmaterial och märkning, säkra lastplats och planera packning rum för rum – så sparar du tid och minskar risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Enskede',
    items: [
      { question: 'Hur löser ni parkering och lastzon i Gamla Enskede och Svedmyra?', answer: 'Vi gör en bedömning av bärvägar och föreslår lastplats utifrån gatornas bredd och föreningens regler. I vissa fall krävs tillstånd eller tidsfönster – vi rådgiver och planerar detta i offert och orderbekräftelse.' },
      { question: 'Fastigheten har bokningsbar hiss – vad behöver jag tänka på?', answer: 'Boka hiss i god tid och meddela oss tiderna. Vi skyddar hiss och entré vid behov och synkar lastningen så att flytten följer bokningsfönstret utan förseningar.' },
      { question: 'Trapphuset är smalt – kan ni hantera det?', answer: 'Ja. Vi dimensionerar bemanning, använder rätt utrustning (bärselar, säckkärra, skydd) och planerar bärvägar för att undvika skador och onödiga lyft.' },
      { question: 'Kan ni använda nyckelbox eller digitalt lås om jag inte är på plats?', answer: 'Ja. Vi kan hantera nyckelboxar (med kod) och tillfälliga digitala behörigheter. Vi bekräftar mottagning och återlämning skriftligt och säkerställer legitimation och logg av nyckelflödet.' },
      { question: 'Ingår montering/demontering?', answer: 'Enklare demontering/montering (t.ex. säng, bord) ingår. Avancerad montering, specialsnickerier eller fasta installationer är tillval som behöver bokas i förväg.' },
      { question: 'Kan ni leverera packmaterial till Enskede i förväg?', answer: 'Ja. Vi kan leverera kartonger, packpapper och skydd i god tid och ge råd om märkning/packordning för snabbare uppackning.' },
      { question: 'Behöver vi magasinering mellan Enskede och innerstan?', answer: 'Ja. Vi erbjuder kort- och långtidsmagasinering. Hämtning och återleverans planeras efter din tidplan – oavsett om du flyttar inom Enskede eller till/från andra delar av Stockholm.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Enskede – safe and efficient near the city',
    subtitle: 'Specialised in moves in Gamla Enskede, Enskede Gård and Svedmyra. We plan access routes, time windows and parking with regard to traffic and residential rules.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Enskede',
    desktop: 'Flyttella is a Stockholm-based moving and cleaning company making moves in Enskede simpler, safer and more transparent. We have operated for 5 years with 8+ years of industry experience – reflected in our methods, quality and happy clients across Gamla Enskede, Enskede Gård and Svedmyra.',
    desktop2: 'We have helped over 8,000 clients – from small moves to full-service solutions with packing, cleaning and advisory. We work with clear terms and fixed pricing so you always know what is included and what it costs. Ahead of move day we plan access routes, parking and time windows tailored to Enskede.',
    desktop3: 'We offer free loan of moving boxes, free rebooking/cancellation up to 24 hours before and a 14-day guarantee on all move-out cleanings. Our personal support is on hand for questions, tips and decisions – and a dedicated contact follows your move end to end.',
    mobile: 'Reliable moves in Enskede with fixed pricing, clear terms and a dedicated contact – over 8,000 happy clients.',
    mobileExpanded: 'We plan access routes, parking and time windows for Enskede. Free boxes, 24h free rebooking/cancellation and 14-day cleaning guarantee.',
    mobileExpanded2: 'Full-service options with packing/cleaning/advisory. A dedicated contact ensures everything runs smoothly.'
  },
  features: { title: 'What benefits do you get with Flyttella in Enskede?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Enskede',
    description: 'As one of Sweden’s most recommended movers – especially appreciated in Gamla Enskede, Enskede Gård and Svedmyra – we put the customer first. We reduce stress with clear planning, fixed pricing and punctual delivery. Our team is used to bookable elevators, narrow stairwells and near-city parking, ensuring your Enskede move is calm and positive from start to finish.',
    badgeAlt: 'Recommended mover Enskede',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Quotes are based on your needs in Enskede – size, stairs/elevator, access routes and parking. When needed we perform a free inspection and plan the right crew and vehicle. All prices are fixed with no hidden fees. We account for traffic and association rules to make the move smooth and safe.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Enskede' },
  experience: {
    title: 'Experienced with apartments and townhouses',
    description: 'We have extensive experience in Gamla Enskede, Enskede Gård, Svedmyra and Enskede-Årsta-Vantör. We plan access routes, protect entrances and elevators and reserve loading zones where possible.',
    expanded: 'We create a clear plan for packing and loading that reduces disturbances and saves time. We work methodically and with respect for the living environment, handling heavy lifts and delicate items with the right methods.'
  },
  awards: {
    title: 'Flyttella awards in Enskede',
    description: 'Our awards demonstrate our commitment to quality, service and customer satisfaction in Enskede. Over the years we have been recognised by customers and industry peers for reliable planning and careful handling in areas like Gamla Enskede, Enskede Gård and Svedmyra. These acknowledgements inspire us to deliver top-class moving services – every day, for every customer in Enskede.'
  },
  servicesSection: {
    title: 'Discover our services in Enskede',
    description: 'Household moves, packing, move-out cleaning, storage and heavy lifts. We tailor the setup to your home and timeline – with fixed pricing and clear communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Enskede',
    description: 'Plan access routes and loading spots, book elevators early and secure keys and access. Our checklists help you achieve a calm and efficient move day.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Enskede',
    description: 'Prepare materials and labels, secure a loading spot and plan packing room by room – saving time and reducing risks.'
  },
  faq: {
    title: 'Common questions about moving in Enskede',
    items: [
      { question: 'How do you handle parking/loading in Gamla Enskede and Svedmyra?', answer: 'We assess access routes and suggest loading spots based on street width and association rules. Some areas require permits or time windows – we advise and plan this in the quote and order confirmation.' },
      { question: 'The building has a bookable elevator – what should I consider?', answer: 'Book the elevator in advance and share the time window. We protect the elevator/entrance if needed and sync loading so the move stays within the slot without delays.' },
      { question: 'The stairwell is narrow – can you manage it?', answer: 'Yes. We size the crew appropriately, use the right gear (carrying straps, dollies, protection) and plan access routes to avoid damage and unnecessary lifts.' },
      { question: 'Can you use a key box or digital lock if I cannot attend?', answer: 'Yes. We can handle key boxes (with code) and temporary digital access. We confirm receipt and return in writing and verify IDs, keeping a log of the key flow.' },
      { question: 'Is assembly/disassembly included?', answer: 'Basic disassembly/assembly (e.g. bed, table) is included. Advanced/custom work or fixed installations are add-ons and must be pre-booked.' },
      { question: 'Can you deliver packing materials to Enskede in advance?', answer: 'Yes. We can deliver boxes, paper and protective materials and advise on labelling/packing order for faster unpacking.' },
      { question: 'We need storage between Enskede and the city – possible?', answer: 'Yes. We offer short- and long-term storage. Collection and return are scheduled to fit your timeline whether moving within Enskede or to/from other parts of Stockholm.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.enskede) data.enskede = {};
  data.enskede = { ...data.enskede, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for enskede in sv and en.');
