// Update danderyd.* translations with unique SEO content in sv/en
const fs = require('fs');
const path = require('path');

const svContent = {
  hero: {
    title: 'Flyttfirma i Danderyd – trygg, effektiv och punktlig',
    subtitle: 'Specialiserade på flytt i Djursholm, Stocksund, Enebyberg och Täbygränsen. Vi planerar bärvägar, tidsfönster och parkering så att allt flyter – från villa till lägenhet, med fasta priser och tydlig tidsplan.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Läs hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Danderyd',
    desktop: 'Vi levererar välplanerade flyttar i Danderyd med fokus på struktur, säkerhet och respekt för bostad och grannar. Vi tar ansvar för logistik som lastzoner, hissbokning och bärvägar – och erbjuder kostnadsfri besiktning vid behov.',
    desktop2: 'Vårt team är vana vid villaflyttar med trappor, längre bärsträckor och känslig inredning. Vi packar smart, skyddar väggar och golv, och koordinerar tydliga tidsfönster för smidig lastning och lossning.',
    desktop3: 'Priserna är fasta utan dolda avgifter. En personlig kontakt följer din flytt från start till mål och ser till att plan, bemanning och fordon matchar dina förutsättningar i Danderyd.',
    mobile: 'Vi planerar flytten i Danderyd med fokus på säkerhet, bärvägar och tidsfönster – fasta priser och en personlig kontakt.',
    mobileExpanded: 'Vana vid villor och lägenheter: skydd av väggar/golv, smart packning och tydlig tidsplan för lastning och lossning.',
    mobileExpanded2: 'Kostnadsfri besiktning vid behov. Bemanning och fordon dimensioneras utifrån dina förutsättningar i Danderyd.'
  },
  features: { title: 'Vilka fördelar får du med Flyttella i Danderyd?' },
  customerReviews: { title: 'Vad tycker våra kunder om oss?' },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Danderyd',
    description: 'Kunder lyfter vår planering, punktlighet och varsam hantering av möbler och boendemiljö. Läs om erfarenheter från villaflyttar i Djursholm, lägenheter i Stocksund och radhus i Enebyberg.',
    badgeAlt: 'Rekommenderad flyttfirma Danderyd',
    arrowText: 'Se fler kundomdömen'
  },
  processSection: {
    title: 'Vår process',
    description: 'Våra offerter baseras på dina behov i Danderyd – boyta, trappor/hiss, bärvägar och parkering. Vid behov gör vi kostnadsfri besiktning och planerar tidsfönster samt rätt bemanning och fordon. Alla priser är fasta utan dolda avgifter. Har du nyckelöverlämning via mäklare eller portkod? Vi samordnar och genomför flytten effektivt och tryggt.',
    subtitle: 'Så fungerar det'
  },
  experienceSection: { title: 'Vår erfarenhet i Danderyd' },
  experience: {
    title: 'Erfaren flytt i villakvarter och lägenheter',
    description: 'Vi har lång erfarenhet av flyttar i Djursholm, Stocksund och Enebyberg. Vi planerar för smala trappor, nivåskillnader och längre bärsträckor samt reserverar lastzoner där det är möjligt. Vårt fokus är säker hantering, tydlig kommunikation och lugn logistik – även i trånga områden.',
    expanded: 'När du flyttar i Danderyd skapar vi en detaljerad plan: packordning, skydd av hissar/entréer, optimal lastning och punktlig lossning. Vi arbetar störningsfritt med hänsyn till grannar och boendemiljö och löser specialmoment som tunga lyft eller känsliga objekt.'
  },
  awards: {
    title: 'Utmärkelser för vårt arbete i Danderyd',
    description: 'Våra omdömen och återkommande kunder i Danderyd speglar vår kvalitet. Vi uppmärksammas för trygg planering, professionellt bemötande och varsam hantering i villaflyttar och bostadsrättsföreningar.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Danderyd',
    description: 'Bohagsflytt, packhjälp, flyttstädning, magasinering och tunga lyft. Vi skräddarsyr upplägget efter din bostadstyp och tidplan – med fasta priser och tydlig kommunikation.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Danderyd',
    description: 'Planera tidsfönster, boka hiss i tid, ordna bärvägar och parkering. Vi delar praktiska checklistor för villor och lägenheter så att flyttdagen blir lugn och effektiv.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: så förbereder du en smidig flytt i Danderyd',
    description: 'Förbered material och märkning, säkra lastplats, stäm av nycklar och tillträde – och planera packningen rum för rum för att spara tid och minimera risker.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Danderyd',
    items: [
      { question: 'Behöver jag ordna lastzon eller parkering i Danderyd?', answer: 'Vi hjälper dig att bedöma bärvägar och lastplats. I vissa områden kan det krävas tillstånd eller tidsfönster. Vi rådgiver och planerar efter dina förutsättningar.' },
      { question: 'Kan ni hantera nyckelöverlämning om jag inte kan vara på plats?', answer: 'Ja. Vi kan samordna med mäklare, hyresvärd eller kontaktperson. Legitimation kontrolleras och vi bekräftar alltid nyckelflödet skriftligt.' },
      { question: 'Ingår montering och demontering av möbler?', answer: 'Enklare demontering/montering (t.ex. säng och bord) ingår. Mer avancerad montering eller specialsnickerier är tillval som behöver bokas i förväg.' },
      { question: 'Hur planerar ni flytt i villor med flera våningsplan?', answer: 'Vi dimensionerar bemanning, planerar bärvägar och skyddar trappor och golv. Tunga lyft hanteras med rätt utrustning och metodik för att undvika skador.' },
      { question: 'Kan ni hjälpa till med packning och material?', answer: 'Ja. Vi erbjuder packhjälp och kan leverera flyttkartonger och skyddsmaterial i god tid. Vi ger råd om märkning för snabbare uppackning.' },
      { question: 'Erbjuder ni magasinering?', answer: 'Ja. Vi ordnar kort- eller långtidmagasinering och planerar hämtning/återleverans enligt din tidplan.' }
    ]
  },
  faqFooter: { title: 'Har du fler frågor?', linkText: 'Kontakta oss' }
};

const enContent = {
  hero: {
    title: 'Moving company in Danderyd – safe, efficient and on time',
    subtitle: 'Specialised in moves in Djursholm, Stocksund and Enebyberg. We plan access routes, time windows and parking – from villas to apartments – with fixed pricing and a clear schedule.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Danderyd',
    desktop: 'We deliver well-planned moves in Danderyd with structure, safety and respect for your home and neighbours. We handle loading zones, elevator booking and access routes – and offer a free pre-move inspection when needed.',
    desktop2: 'Our team is experienced with villa moves, stairs, longer carries and delicate interiors. We pack smart, protect walls/floors and coordinate clear time windows for loading and unloading.',
    desktop3: 'Pricing is fixed with no hidden fees. A dedicated contact follows your move from start to finish and ensures crew and vehicle match your conditions in Danderyd.',
    mobile: 'We plan your move in Danderyd with safety, access routes and time windows – fixed pricing and a dedicated contact.',
    mobileExpanded: 'Experienced with villas and apartments: protection for walls/floors, smart packing and a clear plan for loading/unloading.',
    mobileExpanded2: 'Free inspection when needed. Crew and vehicle are tailored to your Danderyd home.'
  },
  features: { title: 'What benefits do you get with Flyttella in Danderyd?' },
  customerReviews: { title: 'What do our customers say?' },
  reviews: {
    subtitle: 'Recommended moving company in Danderyd',
    description: 'Clients appreciate our planning, punctuality and careful handling. Read experiences from villa moves in Djursholm, apartments in Stocksund and townhouses in Enebyberg.',
    badgeAlt: 'Recommended mover Danderyd',
    arrowText: 'See more reviews'
  },
  processSection: {
    title: 'Our process',
    description: 'Quotes are based on your needs in Danderyd – size, stairs/elevator, access routes and parking. When needed we perform a free inspection and plan time windows plus the right crew and vehicle. All prices are fixed with no hidden fees. Key handover via agent or entry code? We coordinate and execute efficiently and safely.',
    subtitle: 'How it works'
  },
  experienceSection: { title: 'Our experience in Danderyd' },
  experience: {
    title: 'Experienced with villas and apartments',
    description: 'We have extensive experience in Djursholm, Stocksund and Enebyberg. We plan for narrow staircases, level changes and longer carries, and reserve loading zones where possible. The focus is safe handling, clear communication and calm logistics – even in tight areas.',
    expanded: 'For Danderyd moves we create a detailed plan: packing order, protection for elevators/entrances, optimal loading and punctual unloading. We work with consideration for neighbours and can handle heavy lifts and delicate items.'
  },
  awards: {
    title: 'Awards for our work in Danderyd',
    description: 'Customer feedback and returning clients in Danderyd reflect our quality. We are recognised for reliable planning, professional service and careful handling in both villas and apartment buildings.'
  },
  servicesSection: {
    title: 'Discover our services in Danderyd',
    description: 'Household moves, packing help, move-out cleaning, storage and heavy lifts. We tailor the setup to your home and timeline – with fixed pricing and clear communication.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Danderyd',
    description: 'Plan time windows, book elevators early, prepare access routes and parking. We share practical checklists for villas and apartments so move day runs smoothly.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: prepare a smooth move in Danderyd',
    description: 'Prepare materials and labels, secure a loading spot, confirm keys and access – and pack room by room to save time and reduce risks.'
  },
  faq: {
    title: 'Common questions about moving in Danderyd',
    items: [
      { question: 'Do I need to arrange a loading zone or parking?', answer: 'We help assess access routes and loading areas. Some streets may require permits or time windows. We advise and plan accordingly.' },
      { question: 'Can you handle key handover if I cannot be there?', answer: 'Yes. We coordinate with an agent, landlord or contact person. ID is verified and we always confirm the key flow in writing.' },
      { question: 'Is furniture assembly/disassembly included?', answer: 'Simple disassembly/assembly (e.g. beds and tables) is included. Advanced/custom assembly is an add-on and must be pre-booked.' },
      { question: 'How do you manage multi-storey villas?', answer: 'We size the crew appropriately, plan access routes and protect stairs and floors. Heavy lifts are handled with the right equipment and methods.' },
      { question: 'Can you help with packing and materials?', answer: 'Yes. We offer packing help and can deliver boxes and protective materials in advance. We advise on labelling for faster unpacking.' },
      { question: 'Do you offer storage?', answer: 'Yes. We arrange short- or long-term storage and plan collection/return according to your schedule.' }
    ]
  },
  faqFooter: { title: 'Have more questions?', linkText: 'Contact us' }
};

function updateLocale(filePath, content) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.danderyd) data.danderyd = {};
  data.danderyd = { ...data.danderyd, ...content };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svCandidates = [
  path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'sv.json'),
  path.join(process.cwd(), 'src', 'app', 'i18n', 'locales', 'sv.json'),
];
const enCandidates = [
  path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'en.json'),
  path.join(process.cwd(), 'src', 'app', 'i18n', 'locales', 'en.json'),
];

const svPath = svCandidates.find(p => fs.existsSync(p));
const enPath = enCandidates.find(p => fs.existsSync(p));

if (!svPath || !enPath) {
  console.error('Could not locate sv.json or en.json');
  process.exit(1);
}

updateLocale(svPath, svContent);
updateLocale(enPath, enContent);
console.log('Updated unique SEO content for danderyd in sv and en.');













