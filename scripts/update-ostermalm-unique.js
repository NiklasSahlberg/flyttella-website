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
  const k = data.ostermalm || (data.ostermalm = {});

  k.hero = k.hero || {};
  k.hero.title = 'Flyttfirma i Östermalm  Strandvägen, Karlaplan, Lärkstaden och Gärdet';
  k.hero.subtitle = 'Paradvåningar, vindslägenheter och kontor i stenstad kräver fingertoppskänsla. Vi planerar lastzoner, hissbokningar och designmöbler i detalj  alltid fasta priser och en personlig projektledare.';

  k.about = k.about || {};
  k.about.title = 'Om Flyttella i Östermalm';
  k.about.desktop = 'Flyttella är en Stockholmsbaserad flytt- och städfirma som skapades för att göra flyttar i innerstan mer transparenta. Över åtta års erfarenhet och 8000 uppdrag  varav en stor del på Östermalm  har lärt oss hur man navigerar portkoder, hissförbud och höga kulturvärden.';
  k.about.desktop2 = 'Vi hjälper både privatpersoner och företag med helhetslösningar: packteam med bomullshandskar, möbelmontering, visningsstädning och magasinering. Du får fast pris, tydlig omfattning och en kontaktperson som driver projektet från första möte till sista checklista.';
  k.about.desktop3 = 'Gratis lånekartonger, kostnadsfri om-/avbokning upp till 24 timmar innan och 14 dagars garanti på flyttstäd ingår alltid. Vår kundtjänst finns nära till hands för att svara på frågor, ge råd om lastzoner och säkerställa att flytten känns enkel.';
  k.about.mobile = 'Innerstadsteam med fokus på Östermalm  fasta priser, helhetslösningar.';
  k.about.mobileExpanded = 'Vi planerar portkod, hissskydd och lastzon, skyddar fiskbensparkett och stuckatur samt koordinerar med fastighetsskötare.';
  k.about.mobileExpanded2 = 'Kartonger, rådgivning och kundtjänst ingår  samma kontaktperson följer dig från offert till inflytt.';

  k.experience = k.experience || {};
  k.experience.title = 'Vår erfarenhet av flyttar i Östermalm';
  k.experience.description = 'Över 8000 flyttar  inklusive paradvåningar på Strandvägen, vindar i Lärkstaden och moderna kontor vid Stureplan. Vi kan hantera hissförbud, innergårdar och exklusiva material utan att tappa tempo.';
  k.experience.expanded = 'Metoden bygger på minutiös tidsplanering, dedikerade bärkedjor och sekventiell lastning. Erfarenheten från Karlaplan, Linnégatan och Gärdet gör att vi vet hur man skyddar marmortrappor, glaspartier och designmöbler  och levererar exakt när vi lovat.';

  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Rekommenderad flyttfirma på Östermalm';
  k.reviews.description = 'Kunder uppskattar att vi håller föreningens regler, informerar portvakter och arbetar diskret. Omdömen från Strandvägen, Östermalmstorg och Diplomatstaden lyfter vår kommunikation och varsamma hantering.';
  k.reviews.badgeAlt = 'Flyttfirma Östermalm omdömen';
  k.reviews.arrowText = 'Läs fler Östermalmsomdömen';

  k.awards = k.awards || {};
  k.awards.title = 'Flyttellas utmärkelser i Östermalm';
  k.awards.description = 'Våra utmärkelser visar att vi levererar kvalitet och service i känsliga miljöer. Östermalmskunder lyfter vår punktlighet, vårt lugna arbetssätt och hur vi skyddar paradvåningar från första skyddsmatta till sista kontroll.';

  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Upptäck alla våra tjänster i Östermalm';
  k.servicesSection.description = 'Paradvåningsflyttar, packning, magasinering, visningsstädning, möbelmontering och rådgivning för lägenheter, vindar och kontor. Vi tar hand om portkoder, hissbokningar och lastzonstillstånd  du får fasta offerter och tydlig kommunikation.';
  k.servicesSection.privateServices = k.servicesSection.privateServices || 'Se alla tjänster';

  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guider och tips för flytt i Östermalm';
  k.blogSection.description = 'Planera lastzon i god tid, boka hiss med föreningen, märk kartonger per rum och skydda parkett mot repor. Så blir flytten lugn även i tät bebyggelse.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklista: flytt i Östermalm och Djurgården';
  k.blog.description = 'Stäm av portkoder, hissförbud och innergård, planera ordningen på designmöbler och förbered skydd för golv och väggar  spara tid och undvik stress.';

  k.processSection = k.processSection || {};
  k.processSection.title = 'Vår process';
  k.processSection.subtitle = 'Så fungerar det';
  k.processSection.description = 'Offerter baseras på boyta, våningsplan, hiss, portkod, bärvägar via innergård och om lastzon/hiss behöver bokas. Vi gör platsbesök när det behövs och beskriver exakt vad som ingår.';

  k.process = k.process || {};
  k.process.fillForm = 'Fyll i formuläret';
  k.process.fillFormDesc = 'Berätta om adresserna, våningsplan, hissregler, portkod och om det finns vind, förråd eller separat kontor. Ange önskat datum och tilläggstjänster som packning eller magasinering.';
  k.process.quickQuote = 'Snabb offert';
  k.process.quickQuoteDesc = 'Du får en detaljerad offert med fast pris och RUT-avdrag där det går. Vi räknar på bärvägar, hissbokning, ytskydd och bemanning så att allt passar föreningens ramar.';
  k.process.signConfirm = 'Signera och bekräfta';
  k.process.signConfirmDesc = 'Efter signatur bokar vi lastzon/hiss, informerar fastighetsskötare och planerar körplanen. Du får kontaktrader och tidslinje i god tid.';
  k.process.personalContact = 'Personlig kontakt';
  k.process.personalContactDesc = 'Din kontaktperson gör walkthrough, kontrollerar skydd för marmor och parkett och håller dig uppdaterad via sms/mail inför flyttdagen.';
  k.process.moveCompleted = 'Flytt genomförd';
  k.process.moveCompletedDesc = 'På flyttdagen skyddar vi entréer, hisskorgar och golv, bygger bärkedjor, lastar sekventiellt (det som behövs först lastas sist) och ger status efter varje etapp.';
  k.process.satisfiedCustomer = 'Uppföljning';
  k.process.satisfiedCustomerDesc = 'Efter avlastning går vi igenom rummen tillsammans, finjusterar möblering och säkerställer att visningsstädning eller magasinering matchar din plan.';

  k.faq = k.faq || {};
  k.faq.title = 'Vanliga frågor om flytt i Östermalm';
  k.faq.items = [
    {
      question: 'Hur hanterar ni flyttar där hiss inte får användas?',
      answer: 'Vi planerar bärkedjor i trapphuset, tar med extra bärare och skyddar väggar/räcken med filtar och skum. Tidsplanen anpassas så att föreningens regler följs utan stress.'
    },
    {
      question: 'Hur skyddar ni parkett, marmor och specialsnickerier?',
      answer: 'Vi lägger skyddsmattor, masonit, trappskydd och använder bomullshandskar för känsliga ytor. Varje rum checklistas innan vi börjar bära.'
    },
    {
      question: 'Kan ni hjälpa till med packning av konst och designmöbler?',
      answer: 'Ja, vi använder syrafria papper, skräddarsydda lådor och stabila bärselar. Allt märks upp så att uppackning går snabbt.'
    },
    {
      question: 'Erbjuder ni magasinering när inflytt och utflytt inte synkar?',
      answer: 'Absolut. Vi magasinerar i larmade, torra utrymmen och levererar etappvis när nya bostaden är klar.'
    },
    {
      question: 'Hur ser kommunikationen ut inför flyttdagen?',
      answer: 'Du får en projektplan med tider, kontaktvägar och checklistor. Vi hör av oss dagarna innan och uppdaterar dig vid minsta justering så att du alltid vet vad som händer.'
    }
  ];
});

update(enPath, (data) => {
  const k = data.ostermalm || (data.ostermalm = {});

  k.hero = k.hero || {};
  k.hero.title = 'Moving company in Östermalm  Strandvägen, Karlaplan, Lärkstaden and Gärdet';
  k.hero.subtitle = 'Penthouses, classic apartments and offices in the heart of Stockholm require precision. We plan loading zones, elevator bookings and designer furniture handling in detail  always fixed pricing and one project lead.';

  k.about = k.about || {};
  k.about.title = 'About Flyttella in Östermalm';
  k.about.desktop = 'Flyttella is a Stockholm-based moving and cleaning company created to make city moves more transparent. Over eight years of experience and 8,000 assignments  many of them in Östermalm  have taught us how to navigate door codes, elevator bans and high-value interiors.';
  k.about.desktop2 = 'We support private clients and businesses with end-to-end solutions: packing crews with cotton gloves, furniture assembly, styling/cleaning and storage. You receive a fixed price, clear scope and one coordinator from kickoff to final checklist.';
  k.about.desktop3 = 'Complimentary moving boxes, free rebooking up to 24 hours prior and a 14-day cleaning guarantee are standard. Our support team answers questions, advises on loading zones and keeps the move calm from start to finish.';
  k.about.mobile = 'Inner-city specialists for Östermalm  fixed pricing, full-service options.';
  k.about.mobileExpanded = 'We plan door codes, elevator protection and loading zones, safeguard herringbone floors and stucco, and coordinate with building staff.';
  k.about.mobileExpanded2 = 'Boxes, guarantees and support are included  the same coordinator stays with you from quote to move-in.';

  k.experience = k.experience || {};
  k.experience.title = 'Our experience with moves in Östermalm';
  k.experience.description = 'Over 8,000 moves, including Strandvägen residences, Lärkstaden lofts and offices near Stureplan. Were used to elevator bans, courtyards and premium materials without losing pace.';
  k.experience.expanded = 'Our approach relies on precise timelines, dedicated carry teams and sequential loading. Work on Karlaplan, Linnégatan and Gärdet means we know how to protect marble stairs, glass details and designer furniture while delivering exactly when promised.';

  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Most recommended mover in Östermalm';
  k.reviews.description = 'Clients value that we respect building rules, inform porters and work discreetly. Testimonials from Strandvägen, Östermalmstorg and Diplomatstaden highlight our communication and careful handling.';
  k.reviews.badgeAlt = 'Moving company Östermalm reviews';
  k.reviews.arrowText = 'Read more Östermalm reviews';

  k.awards = k.awards || {};
  k.awards.title = 'Flyttella awards in Östermalm';
  k.awards.description = 'Our awards confirm our focus on quality, service and client satisfaction in premium neighborhoods. Residents note our punctuality, calm crews and ability to protect valuable interiors from the first floor guard to the final inspection.';

  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Discover our services in Östermalm';
  k.servicesSection.description = 'Luxury apartment moves, packing, storage, move-out cleaning, furniture assembly and advisory services for apartments, lofts and offices. We secure door codes, elevator slots and loading permits  you receive fixed quotes and clear communication.';
  k.servicesSection.privateServices = k.servicesSection.privateServices || 'See all services';

  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guides and tips for moving in Östermalm';
  k.blogSection.description = 'Book loading zones early, reserve elevators with the association, label boxes per room and protect parquet to avoid scratches  thats how you keep the move calm.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklist: moving in Östermalm and Djurgården';
  k.blog.description = 'Confirm door codes, elevator rules and courtyard access, plan the order for designer furniture and prep protection for floors and walls to save time and avoid stress.';

  k.processSection = k.processSection || {};
  k.processSection.title = 'Our process';
  k.processSection.subtitle = 'How it works';
  k.processSection.description = 'Quotes cover floor area, levels, elevator rules, door codes, courtyard routes and any loading-zone/elevator bookings. Site checks are included when needed and every deliverable is documented.';

  k.process = k.process || {};
  k.process.fillForm = 'Submit the form';
  k.process.fillFormDesc = 'Share both addresses, floors, elevator policies, door codes and whether theres an attic, storage or office annex. Add preferred dates and any services like packing or storage.';
  k.process.quickQuote = 'Detailed quote';
  k.process.quickQuoteDesc = 'You receive a fixed-price quote with RUT deduction when applicable. We calculate carry routes, elevator bookings, surface protection and crew size to match the building rules.';
  k.process.signConfirm = 'Sign and confirm';
  k.process.signConfirmDesc = 'Once signed we reserve loading zones/elevators, inform the building manager and plan the run sheet. You receive contacts and a timeline ahead of time.';
  k.process.personalContact = 'Dedicated contact';
  k.process.personalContactDesc = 'Your coordinator conducts a walkthrough, checks marble/wood protection and keeps you updated via text/email before move day.';
  k.process.moveCompleted = 'Move executed';
  k.process.moveCompletedDesc = 'On move day we protect entrances, elevators and floors, set up carry chains, load sequentially (last in, first out) and send status updates after each phase.';
  k.process.satisfiedCustomer = 'Follow-up';
  k.process.satisfiedCustomerDesc = 'After unloading we review each room together, fine-tune furniture placement and coordinate any cleaning or storage follow-ups.';

  k.faq = k.faq || {};
  k.faq.title = 'Common questions about moving in Östermalm';
  k.faq.items = [
    {
      question: 'How do you handle moves when elevators cant be used?',
      answer: 'We design carry chains in the staircase, bring extra crew, protect walls/rails and adjust the schedule so the associations rules are respected without stress.'
    },
    {
      question: 'How do you protect parquet, marble and bespoke carpentry?',
      answer: 'We lay floor guards, masonite, stair protection and use cotton gloves for delicate surfaces. Every room gets a checklist before we start carrying.'
    },
    {
      question: 'Can you pack art and designer furniture?',
      answer: 'Yes. We use acid-free paper, custom crates and stable straps. Each piece is labelled so unpacking is efficient and documented.'
    },
    {
      question: 'Do you offer storage if move-out and move-in dates dont align?',
      answer: 'Absolutely. We store belongings in monitored, climate-controlled facilities and deliver in stages once the new home is ready.'
    },
    {
      question: 'How do you keep clients informed before move day?',
      answer: 'You receive a project plan with times, contacts and checklists. We reach out in the days before and update you immediately if any detail changes.'
    }
  ];
});

console.log('Updated Östermalm content i sv/en med unik innerstadskopia.');
