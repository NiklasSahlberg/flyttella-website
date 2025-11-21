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
  const k = data.norrmalm || (data.norrmalm = {});

  k.hero = k.hero || {};
  k.hero.title = 'Flyttfirma i Norrmalm \u2013 takvåningar, kontor och klassiska stenhus';
  k.hero.subtitle = 'Vi navigerar innerstadens logistik: bokade lastzoner, hisskydd, sena tidsfönster och diskreta leveranser runt Sergels torg. Fast pris, tydlig plan och en lugn flyttdag i Norrmalm.';

  k.about = k.about || {};
  k.about.title = 'Om Flyttella i Norrmalm';
  k.about.desktop = 'Flyttella är en Stockholmsbaserad flytt- och städfirma med innerstaden som specialitet. Vi startade för att göra cityflyttar mer transparenta, trygga och lättplanerade, och över åtta års erfarenhet märks i hur vi koordinerar varje uppdrag på Norrmalm.';
  k.about.desktop2 = 'Vi har hjälpt fler än 8\u202f000 privatpersoner och företag med allt från kompakta etappflyttar till helhetslösningar med packteam, städ, magasinering och logistisk rådgivning. Metoden bygger på fasta priser, tydliga villkor och detaljerade körplaner – du vet alltid vad som ingår.';
  k.about.desktop3 = 'Som standard ingår gratis lån av flyttkartonger, kostnadsfri om- och avbokning upp till 24 timmar innan samt 14 dagars garanti på flyttstädning. Vår innerstadscrew och kundtjänst finns nära till hands för frågor, tips och snabba beslut genom hela processen.';
  k.about.mobile = 'Stockholmsbaserad flytt- och städfirma med särskild spets på Norrmalm.';
  k.about.mobileExpanded = 'Vi kombinerar åtta års erfarenhet med fasta priser, tydliga planer och smart innerstadslogistik.';
  k.about.mobileExpanded2 = 'Kartonger, rådgivning, kundtjänst och garantier ingår – flytten känns trygg från första kontakt till inflytt.';

  k.experience = k.experience || {};
  k.experience.title = 'Vår erfarenhet av flyttar i Norrmalm';
  k.experience.description = 'Över 8\u202f000 flyttar varav hundratals i Norrmalm \u2013 från takvåningar vid Hötorget till kontor längs Hamngatan. Vi behärskar transporter via lastzoner, innergårdar och servicehissar där varje minut är schemalagd.';
  k.experience.expanded = 'Vår Norrmalm-metod bygger på minutiös tidsplanering: bilar i följd, bärteam som roterar mellan gård och våningsplan samt digital checklista rum för rum. Vi skyddar kalksten, stuckatur och glasräcken, hanterar pianon i spiraltrappor och erbjuder kvälls- eller nattlossning när kontoren behöver stillhet.';

  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Innerstadens mest rekommenderade flyttfirma';
  k.reviews.description = 'Kunder på Norrmalm uppskattar att vi håller föreningsregler, hanterar boendeparkeringar och levererar inom snäva tidsfönster. Omdömen från adresser runt Kungsträdgården, Hötorget och Centralstationen lyfter vår precision och service.';
  k.reviews.badgeAlt = 'Flyttfirma Norrmalm omdömen';
  k.reviews.arrowText = 'Läs fler innerstadsomdömen';

  k.awards = k.awards || {};
  k.awards.title = 'Utmärkelser för innerstadsflytt \u2013 Norrmalm';
  k.awards.description = 'Våra utmärkelser handlar om leveranssäkerhet i Stockholms mest trafikerade kvarter. Både branschjuryer och kunder lyfter vår förmåga att hålla tidsscheman, skydda kulturklassade ytor och lösa logistiken kring Sergels torg utan att störa grannar.';

  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Upptäck alla våra tjänster i Norrmalm';
  k.servicesSection.description = 'Norrmalmanpassade upplägg för takvåningar, butikslokaler och kontor: packhjälp, flyttstädning, magasinering, teknisk ned/uppmontering samt tillståndshantering för lastzoner och hissbokningar. Alltid fasta offerter och tydlig kommunikation.';

  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guider och tips för flytt i Norrmalm';
  k.blogSection.description = 'Så lyckas du i city: ansök om lastzon i tid, boka hiss med fastigheten, märk kartonger per våningsplan och planera alternativ parkering om platsen spärras.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklista: innerstadsflytt på Norrmalm';
  k.blog.description = 'Koordinera lastzon, hissbokning och bärteam, skapa tydlig märkning och ha reservplan för garageinfarter \u2013 det sparar minuter och minskar stress.';

  k.processSection = k.processSection || {};
  k.processSection.title = 'Vår process';
  k.processSection.subtitle = 'Så fungerar det';
  k.processSection.description = 'Offerter i Norrmalm baseras på boyta, takhöjd, hisskapacitet, lastzonstillstånd, portkoder och leveransfönster. Vi gör platsbesök vid behov, dimensionerar bemanning och fordon och beskriver exakt vad som ingår \u2013 inga överraskningar när du flyttar i city.';

  k.process = k.process || {};
  k.process.fillForm = 'Fyll i formuläret';
  k.process.fillFormDesc = 'Berätta om adresserna, våningsplan, hissbokning, portkod, garageinfart och om det finns särskilda ytor (serverrum, showroom, takterrass). Ange datum, önskad tid på dygnet och tilläggstjänster.';
  k.process.quickQuote = 'Snabb offert';
  k.process.quickQuoteDesc = 'Du får en detaljerad offert med fast pris och RUT där det är möjligt. Vi räknar på lastzoner, behov av trafikvakter, antal bärare och hur lång tid hissarna får blockeras.';
  k.process.signConfirm = 'Signera och bekräfta';
  k.process.signConfirmDesc = 'Efter signatur bokar vi lastzon via trafikkontoret, säkrar hiss- eller gårdsbokning och stämmer av med fastighetsägare. Körplan och kontaktlistor delas med dig.';
  k.process.personalContact = 'Personlig kontakt';
  k.process.personalContactDesc = 'Din kontaktperson gör en walkthrough på plats, noterar skydd för marmor, glas och hisskorg och förbereder bärkedjor. Vi uppdaterar dig inför flyttdagen med eventuella justeringar.';
  k.process.moveCompleted = 'Flytt genomförd';
  k.process.moveCompletedDesc = 'På flyttdagen lägger teamet ut skydd, monterar hisskydd, använder bärselar i trappor och håller dig uppdaterad per etapp. Vi arbetar sekventiellt så att prioriterade möbler kommer sist in i bilen och först in i nya adressen.';
  k.process.satisfiedCustomer = 'Nöjd kund';
  k.process.satisfiedCustomerDesc = 'Efter avlastning gör vi gemensam kontrollista, tar bort skydd och rapporterar status på nycklar och brickor. Vid behov hjälper vi till med städ, uppackning eller magasinering.';

  k.servicesSection.privateServices = k.servicesSection.privateServices || 'Se alla tjänster';

  k.faq = k.faq || {};
  k.faq.title = 'Vanliga frågor om flytt i Norrmalm';
  k.faq.items = [
    {
      question: 'Hur planerar ni flyttar när port- eller leveransfönster är korta?',
      answer: 'Vi bryter ned flytten i etapper med egna tidsstämplar, stämmer av med fastighetsskötare och bevakning och ser till att varje moment har en ansvarig så att inget drar ut på tiden.'
    },
    {
      question: 'Hur skyddar ni exklusiva möbler och konst i privata hem?',
      answer: 'Vi emballerar antikviteter, vitriner och konstverk med specialskydd, använder bärselar/bärremmar för tunga möbler och för journal över var varje objekt ska placeras i nya bostaden.'
    },
    {
      question: 'Hur skyddar ni marmortrappor och äldre hissar?',
      answer: 'Vi lägger skyddsmattor, plexi eller skumgummi på känsliga ytor, monterar hisskydd och använder bärselar för tunga lyft i spiraltrappor.'
    },
    {
      question: 'Kan ni planera flytten så den är klar före öppningstid?',
      answer: 'Ja, vi startar tidigt på morgonen, dimensionerar bemanning därefter och ser till att lokaler är fria innan butiker eller kontor öppnar.'
    },
    {
      question: 'Hur hanterar ni nycklar, brickor och passersystem?',
      answer: 'Alla nycklar kvitteras, förvaras i låsta väskor och lämnas tillbaka mot signatur. Passerkoder och brickor dokumenteras i vår checklista.'
    }
  ];
});

update(enPath, (data) => {
  const k = data.norrmalm || (data.norrmalm = {});

  k.hero = k.hero || {};
  k.hero.title = 'Moving company in Norrmalm \u2014 penthouses, offices and heritage buildings';
  k.hero.subtitle = 'We navigate city-center logistics: pre-booked loading zones, elevator protection, late-night slots and discreet deliveries around Sergels Torg. Fixed pricing, tight coordination and a calm move day in Norrmalm.';

  k.about = k.about || {};
  k.about.title = 'About Flyttella in Norrmalm';
  k.about.desktop = 'Flyttella is a Stockholm-based moving and cleaning company devoted to downtown assignments. We were founded to make city relocations more transparent, safer and easier to plan, and our 8+ years of experience show in how we coordinate every project on Norrmalm.';
  k.about.desktop2 = 'We have supported more than 8,000 households and companies, handling everything from compact moves to fully managed setups with packing crews, cleaning, storage and logistics advice. Fixed prices, clear scopes and detailed run sheets mean you always know what is included.';
  k.about.desktop3 = 'Complimentary box loans, free rebooking up to 24 hours prior and a 14-day cleaning guarantee come as standard. Our inner-city team and customer support stay on call for questions, guidance and quick decisions throughout the process.';
  k.about.mobile = 'Stockholm moving and cleaning team with a dedicated Norrmalm focus.';
  k.about.mobileExpanded = 'Eight years of practice, transparent pricing and meticulous downtown planning in one package.';
  k.about.mobileExpanded2 = 'Boxes, guidance, customer care and guarantees are included \u2014 so the move feels safe from first call to move-in.';

  k.experience = k.experience || {};
  k.experience.title = 'Our experience with moves in Norrmalm';
  k.experience.description = 'Over 8,000 moves, hundreds of them in Norrmalm \u2014 from penthouses by Hötorget to offices along Hamngatan. We master transports via loading zones, courtyards and service lifts where every minute counts.';
  k.experience.expanded = 'Our Norrmalm playbook relies on precise scheduling: trucks arriving in sequence, crews rotating between courtyard and floors, and digital room-by-room checklists. We protect limestone, stucco and glass railings, move pianos through spiral staircases and offer evening or overnight unloading when offices need silence.';

  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Most recommended mover in central Stockholm';
  k.reviews.description = 'Clients in Norrmalm value that we follow building rules, manage residential parking and deliver within tight slots. Testimonials from around Kungsträdgården, Hötorget and Central Station highlight our precision and service.';
  k.reviews.badgeAlt = 'Top-rated mover Norrmalm';
  k.reviews.arrowText = 'Read more city reviews';

  k.awards = k.awards || {};
  k.awards.title = 'Awards for city moves \u2014 Norrmalm';
  k.awards.description = 'Our recognitions focus on reliability in Stockholm’s busiest streets. Industry juries and customers praise our ability to keep schedules, protect heritage interiors and execute logistics around Sergels Torg without disturbing neighbours.';

  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Discover all our services in Norrmalm';
  k.servicesSection.description = 'City-tailored offerings for penthouses, boutiques and offices: packing crews, move-out cleaning, climate-controlled storage, technical disassembly and permit management for loading zones and elevators. Always fixed quotes and clear communication.';

  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guides and tips for moving in Norrmalm';
  k.blogSection.description = 'Succeed downtown: apply for loading zones early, reserve elevators with the property manager, label boxes per floor and plan backup parking if the street is blocked.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklist: city-center move in Norrmalm';
  k.blog.description = 'Coordinate loading permits, elevator bookings and crews, create clear labelling and keep a spare plan for garage access \u2014 it saves minutes and lowers stress.';

  k.processSection = k.processSection || {};
  k.processSection.title = 'Our process';
  k.processSection.subtitle = 'How it works';
  k.processSection.description = 'Quotes in Norrmalm account for floor area, ceiling height, elevator capacity, loading-zone permits, access codes and delivery windows. We inspect on site when needed, size the right crew and vehicle and document everything in advance \u2014 no surprises downtown.';

  k.process = k.process || {};
  k.process.fillForm = 'Submit the form';
  k.process.fillFormDesc = 'Share both addresses, floors, elevator reservations, access codes, garage ramps and special areas (server rooms, showrooms, terraces). Include preferred dates, times of day and extra services.';
  k.process.quickQuote = 'Detailed quote';
  k.process.quickQuoteDesc = 'You receive a fixed-price quote with RUT where applicable. We calculate loading zones, traffic-control needs, crew size and how long elevators may be reserved.';
  k.process.signConfirm = 'Sign and confirm';
  k.process.signConfirmDesc = 'Once signed we book the loading zone with the city, secure elevator or courtyard access and coordinate with the property owners. You get the run sheet and contact list.';
  k.process.personalContact = 'Dedicated contact';
  k.process.personalContactDesc = 'Your coordinator walks the site, notes protection for marble, glass and elevators and prepares carry chains. We brief you before move day with any final tweaks.';
  k.process.moveCompleted = 'Move executed';
  k.process.moveCompletedDesc = 'On the day we deploy floor and wall protection, mount elevator padding, use carry straps on stairs and update you after each phase. Loads are sequenced so priority items go in last and out first.';
  k.process.satisfiedCustomer = 'Follow-up';
  k.process.satisfiedCustomerDesc = 'After unloading we run a joint checklist, remove protection and report the status of keys and badges. We can stay for cleaning, unpacking or storage if requested.';

  k.faq = k.faq || {};
  k.faq.title = 'Common questions about moving in Norrmalm';
  k.faq.items = [
    {
      question: 'How do you manage moves when loading or access windows are short?',
      answer: 'We break the relocation into timed phases, coordinate with building management/security and assign a responsible lead to each step so trucks and crews stay within the agreed window.'
    },
    {
      question: 'How do you protect luxury furniture and art during private moves?',
      answer: 'We wrap antiques, glass cabinets and artwork with custom padding, use carry straps/dollies for heavy pieces and log where each item should go so the new home is staged exactly as planned.'
    },
    {
      question: 'How do you protect marble stairs and vintage elevators?',
      answer: 'We install floor guards, plexi or foam on sensitive areas, mount elevator padding and use carry straps for heavy items in spiral staircases.'
    },
    {
      question: 'Can you schedule moves to finish before business hours?',
      answer: 'Yes, we begin early, size the crew accordingly and make sure the premises are cleared before shops or offices open.'
    },
    {
      question: 'How do you manage keys, badges and access systems?',
      answer: 'All keys are logged, stored in locked cases and handed back against signatures. Codes and badges are documented in our checklist for traceability.'
    }
  ];
});

console.log('Updated Norrmalm content in sv/en with unique inner-city copy.');
