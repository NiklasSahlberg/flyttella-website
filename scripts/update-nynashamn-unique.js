const fs = require('fs');
const path = require('path');

const svPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'en.json');

function update(filePath, updater) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  updater(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

update(svPath, (data) => {
  const k = data.nynashamn || (data.nynashamn = {});

  k.hero = k.hero || {};
  k.hero.title = 'Flyttfirma i Nynäshamn – från hamnen och Backlura till Ösmo och Torö';
  k.hero.subtitle = 'Lokalkända team för kustnära villor, skärgårdshem och centrumlägenheter. Vi planerar runt färjetrafik, backiga gator och pendeltågsparkeringar – alltid fasta priser och tydlig plan.';

  k.about = k.about || {};
  k.about.title = 'Om Flyttella i Nynäshamn';
  k.about.desktop = 'Flyttella är en Stockholmsbaserad flytt- och städfirma som startades för att göra flyttar enklare, tryggare och mer transparenta. Med över åtta års erfarenhet – och många uppdrag i Nynäshamn – arbetar vi med tydliga processer, kvalitetssäkrade team och nära kundkontakt.';
  k.about.desktop2 = 'Vi har hjälpt fler än 8\u202f000 kunder, från lägenheter vid pendeltåget till villor i Ösmo, Sorunda och Torö. Behöver du packhjälp, städning eller rådgivning får du en helhetslösning med fasta priser och tydliga villkor – du vet alltid vad som ingår.';
  k.about.desktop3 = 'Gratis lånekartonger, kostnadsfri om-/avbokning upp till 24 timmar innan samt 14 dagars garanti på flyttstädning ingår. Vår kundtjänst och din personliga kontakt finns med hela vägen för att svara på frågor, ge tips och hålla flytten lugn.';
  k.about.mobile = 'Stockholmsbaserat team som gör Nynäshamnsflytten trygg och förutsägbar.';
  k.about.mobileExpanded = 'Åtta års erfarenhet, fasta priser och helhetslösningar med packning, städning och rådgivning.';
  k.about.mobileExpanded2 = 'Kartonger, garantier och kundtjänst ingår – samma kontaktperson följer dig från offert till inflytt.';

  k.experience = k.experience || {};
  k.experience.title = 'Vår erfarenhet av flyttar i Nynäshamn';
  k.experience.description = 'Över 8000 flyttar totalt, varav fler än 500 i Nynäshamn, Ösmo, Sorunda och ut mot Torö. Vi är vana vid kuperade tomter, kustklimat och tighta tidsfönster runt hamnen.';
  k.experience.expanded = 'Vår modell kombinerar tydliga tidsluckor, bärkedjor och sekventiell lastning (sist in, först ut). Erfarenhet från Norvikterminalen, Nickstabadet och Kvarnängen gör att vi vet hur man skyddar saltutsatta ytor, hanterar sjöbodar och navigerar trånga hamngator utan stress.';

  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Rekommenderad flyttfirma i Nynäshamn';
  k.reviews.description = 'Kunder i Nynäshamn uppskattar att vi tar höjd för färjescheman, väder och parkeringsregler. Omdömen från centrum, Nicksta, Ösmo och Sorunda lyfter vår kommunikation, punktlighet och varsamma hantering.';
  k.reviews.badgeAlt = 'Flyttfirma Nynäshamn omdömen';
  k.reviews.arrowText = 'Läs fler omdömen från Nynäshamn';

  k.awards = k.awards || {};
  k.awards.title = 'Flyttellas utmärkelser i Nynäshamn';
  k.awards.description = 'Våra utmärkelser bekräftar vårt fokus på kvalitet, service och nöjda kunder i kustkommuner. Nynäshamnsbor lyfter särskilt vår punktlighet, vår varsamma hantering av kusthem och hur vi gör flyttdagen lugn och strukturerad.';

  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Upptäck alla våra tjänster i Nynäshamn';
  k.servicesSection.description = 'Bohagsflytt, packhjälp, magasinering, flyttstädning och skärgårdslogistik för villor, radhus och lägenheter i Nynäshamn, Ösmo, Sorunda och Torö. Alltid fasta offerter, tydlig kontaktperson och plan för parkering och färjor.';
  k.servicesSection.privateServices = k.servicesSection.privateServices || 'Se alla tjänster';

  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guider och tips för flytt i Nynäshamn';
  k.blogSection.description = 'Planera runt pendeltåg och färjor, boka parkering i centrum i god tid och märk lådor för övervåning, sjöbod och förråd.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklista: flytt i Nynäshamn och Ösmo';
  k.blog.description = 'Synka med färjescheman, förbered sjöbod/garage, skydda saltutsatta möbler och skapa en inbärningsplan som följer tomtens nivåskillnader.';

  k.processSection = k.processSection || {};
  k.processSection.title = 'Vår process';
  k.processSection.subtitle = 'Så fungerar det';
  k.processSection.description = 'Offerterna baseras på boyta, våningsplan, bärvägar i backe, parkeringsmöjlighet nära hamn/pendeltåg, samt om färjetider eller broöppningar påverkar schemat. Vid behov gör vi kostnadsfri besiktning på plats.';

  k.process = k.process || {};
  k.process.fillForm = 'Fyll i formuläret';
  k.process.fillFormDesc = 'Dela adresser, våningsplan, om det finns gästhus, förråd eller sjöbod, önskat datum och om färjor eller elbilsplatser behöver bokas. Lägg till packning, städ och magasinering vid behov.';
  k.process.quickQuote = 'Snabb offert';
  k.process.quickQuoteDesc = 'Du får en detaljerad offert med fast pris och RUT-avdrag. Vi räknar på bärsträckor mellan hus och väg, behov av extra bärare för kuperade tomter och tidsfönster runt pendeltåg/färjor.';
  k.process.signConfirm = 'Signera och bekräfta';
  k.process.signConfirmDesc = 'Efter signatur reserverar vi team, fordon, parkeringstillstånd och eventuella färjeplatser. Du får körplan med kontaktuppgifter och tidslinje.';
  k.process.personalContact = 'Personlig kontakt';
  k.process.personalContactDesc = 'Din kontaktperson gör genomgång på plats eller digitalt, stämmer av ytskydd, ordnar bärkedjor och uppdaterar dig om väder eller trafik kan påverka upplägget.';
  k.process.moveCompleted = 'Flytt genomförd';
  k.process.moveCompletedDesc = 'På flyttdagen skyddar vi golv, trappor och uteplatser, bygger bärkedjor, lastar sekventiellt och håller dig uppdaterad efter varje etapp  från första kartong till sista sjöbodsföremål.';
  k.process.satisfiedCustomer = 'Uppföljning';
  k.process.satisfiedCustomerDesc = 'Efter avlastning gör vi gemensam genomgång, justerar möblering och följer upp kommande städ eller magasinering. Målet är en trygg flytt utan överraskningar.';

  k.faq = k.faq || {};
  k.faq.title = 'Vanliga frågor om flytt i Nynäshamn';
  k.faq.items = [
    {
      question: 'Hur ser en normal flyttdag ut från första kartong till sista kontroll?',
      answer: 'Vi startar med gemensam genomgång, skyddar ytor, packar och bär i den ordning vi planerat, uppdaterar dig efter varje etapp och avslutar med en checklista där vi säkerställer att allt står där du vill.'
    },
    {
      question: 'Hur skyddar ni exklusiva möbler och konst i privata hem?',
      answer: 'Vi emballerar antikviteter, vitriner och konstverk med specialskydd, använder bärselar/bärremmar för tunga möbler och loggar placeringen så att allt hamnar rätt i nya bostaden.'
    },
    {
      question: 'Hur hanterar ni flyttar i radhus och villor med trånga trappor?',
      answer: 'Vi planerar bärkedjor, använder bärselar och skyddsmaterial för väggar/räcken och delar vid behov upp större möbler för att bära säkert utan skador.'
    },
    {
      question: 'Erbjuder ni magasinering mellan försäljning och inflytt?',
      answer: 'Absolut. Vi kan magasinera bohag kort- eller medellång tid och leverera etappvis när nya hemmet är klart.'
    },
    {
      question: 'Hur hanterar ni tunga verktyg eller hobbyutrustning från garage och verkstad?',
      answer: 'Vi inventerar vikter, tar med specialutrustning (pianodockor, trallor, lyftselar) och planerar bärvägen så att både utrustning och ytor skyddas.'
    }
  ];
});

update(enPath, (data) => {
  const k = data.nynashamn || (data.nynashamn = {});

  k.hero = k.hero || {};
  k.hero.title = 'Moving company in Nynäshamn  from the harbor and Backlura to Ösmo and Torö';
  k.hero.subtitle = 'Local crews for coastal villas, island homes and central apartments. We plan around ferry traffic, hilly streets and commuter parking  always fixed pricing and a clear plan.';

  k.about = k.about || {};
  k.about.title = 'About Flyttella in Nynäshamn';
  k.about.desktop = 'Flyttella is a Stockholm-based moving and cleaning company founded to make relocations simpler, safer and more transparent. With 8+ years of experience — including extensive work in Nynäshamn — we pair structured workflows, trained crews and proactive communication.';
  k.about.desktop2 = 'We have supported more than 8,000 clients, from commuter-line apartments to villas in Ösmo, Sorunda and Torö. Whether you need packing, cleaning or advisory support, you receive a full-service package with fixed pricing and clear terms so you always know what’s included.';
  k.about.desktop3 = 'Complimentary box loans, free rescheduling up to 24 hours beforehand and a 14-day cleaning guarantee are standard. Our customer support and your dedicated coordinator stay with you from first call to final box so the move stays calm and predictable.';
  k.about.mobile = 'Stockholm crew delivering predictable moves in Nynäshamn and nearby areas.';
  k.about.mobileExpanded = 'Eight years of experience, transparent pricing and full-service options for packing, cleaning and guidance.';
  k.about.mobileExpanded2 = 'Boxes, guarantees and support are included — the same coordinator follows you from quote to move-in.';

  k.experience = k.experience || {};
  k.experience.title = 'Our experience with moves in Nynäshamn';
  k.experience.description = 'Over 8,000 moves overall, with more than 500 in Nynäshamn, Ösmo, Sorunda and Torö. Were used to steep lots, coastal weather and tight windows around the harbor.';
  k.experience.expanded = 'Our method blends defined time slots, carry chains and sequential loading (last in, first out). Experience from Norvik terminal, Nicksta beach and Kvarnängen means we know how to shield salt-exposed surfaces, empty boathouses and navigate narrow harbor streets calmly.';

  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Most recommended mover in Nynäshamn';
  k.reviews.description = 'Clients highlight that we account for ferry schedules, weather and parking rules. Feedback from central Nynäshamn, Nicksta, Ösmo and Sorunda praises our communication, punctuality and careful handling.';
  k.reviews.badgeAlt = 'Moving company Nynäshamn reviews';
  k.reviews.arrowText = 'Read more Nynäshamn reviews';

  k.awards = k.awards || {};
  k.awards.title = 'Flyttella awards in Nynäshamn';
  k.awards.description = 'Our awards underline our commitment to quality, service and customer satisfaction along the coast. Residents in Nynäshamn highlight our punctual crews, careful handling of seaside homes and the calm, structured move days we deliver.';

  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Discover all our services in Nynäshamn';
  k.servicesSection.description = 'Household moves, packing crews, storage, move-out cleaning and island logistics for villas, row houses and apartments in Nynäshamn, Ösmo, Sorunda and Torö. Always fixed quotes, one coordinator and a plan covering parking and ferries.';
  k.servicesSection.privateServices = k.servicesSection.privateServices || 'See all services';

  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guides and tips for moving in Nynäshamn';
  k.blogSection.description = 'Plan around commuter trains and ferries, pre-book central parking and label boxes for upper floor, boathouse and storage.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklist: moving in Nynäshamn and Ösmo';
  k.blog.description = 'Sync with ferry schedules, prep boathouse/garage, shield salt-exposed furniture and build an unloading plan that follows the propertys slopes.';

  k.processSection = k.processSection || {};
  k.processSection.title = 'Our process';
  k.processSection.subtitle = 'How it works';
  k.processSection.description = 'Quotes factor in square meters, floor levels, sloped carry routes, parking near the harbor/commuter line and whether ferry times or bridge openings influence the schedule. Site checks are free when needed.';

  k.process = k.process || {};
  k.process.fillForm = 'Submit the form';
  k.process.fillFormDesc = 'Share addresses, floors, whether theres a guest house, storage or boathouse, your preferred date and any ferry/EV parking requirements. Add packing, cleaning or storage if needed.';
  k.process.quickQuote = 'Detailed quote';
  k.process.quickQuoteDesc = 'You receive a fixed-price quote with RUT deduction. We calculate carry distances between house and road, extra crew for steep lots and time windows around ferries or commuter traffic.';
  k.process.signConfirm = 'Sign and confirm';
  k.process.signConfirmDesc = 'Once you sign we reserve the crew, vehicles, parking permits and any ferry spots. You get the run sheet with contacts and timeline.';
  k.process.personalContact = 'Dedicated contact';
  k.process.personalContactDesc = 'Your coordinator walks the site (physically or virtually), confirms surface protection, sets up carry chains and updates you if weather or traffic could change the plan.';
  k.process.moveCompleted = 'Move executed';
  k.process.moveCompletedDesc = 'On move day we protect floors, stairs and patios, build carry chains, load sequentially and keep you posted after every phase  from the first box to the last boathouse item.';
  k.process.satisfiedCustomer = 'Follow-up';
  k.process.satisfiedCustomerDesc = 'After unloading we do a joint walkthrough, fine-tune furniture placement and coordinate any cleaning or storage that remains. The aim is a calm, predictable move.';

  k.faq = k.faq || {};
  k.faq.title = 'Common questions about moving in Nynäshamn';
  k.faq.items = [
    {
      question: 'What does a standard move day look like from start to finish?',
      answer: 'We begin with a walkthrough, protect floors and walls, load and unload in the planned sequence, keep you updated after each phase, and wrap up with a checklist to confirm everything is placed where you want it.'
    },
    {
      question: 'How do you protect luxury furniture and art during private moves?',
      answer: 'We wrap antiques, glass cabinets and artwork with custom padding, use carry straps/dollies for heavy items and log each placement so the new home is staged exactly as agreed.'
    },
    {
      question: 'How do you handle moves in houses with tight staircases?',
      answer: 'We map the carry route, bring straps and protection for walls/rails and break down larger pieces when needed so everything moves safely without damage.'
    },
    {
      question: 'Do you offer storage between sale and move-in?',
      answer: 'Absolutely. We can store belongings short or mid term and deliver in stages once the new home is ready.'
    },
    {
      question: 'How do you handle heavy tools or hobby gear from garages and workshops?',
      answer: 'We inventory weights, bring the right lifting gear (piano dollies, ramps, straps) and plan the carry route so both the items and surfaces stay protected.'
    }
  ];
});

console.log('Updated Nynäshamn content in sv/en med unik kustcopy.');
