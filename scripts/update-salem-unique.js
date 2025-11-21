const fs = require('fs');
const path = require('path');

const svContent = {
  customerReviews: {
    title: 'Vad tycker våra kunder om oss?'
  },
  hero: {
    title: 'Flyttfirma i Salem – Rönninge, Salem centrum, Skogsäng och Söderby',
    subtitle:
      'Vi planerar flyttar i villakvarter, kedjehus och terrasslägenheter längs Mälaren. Fasta priser, tydliga körplaner och lokalkännedom om backar, garage och föreningsregler gör flytten enkel.',
    ctaPrimary: 'Få offert',
    ctaSecondary: 'Se hur vi arbetar'
  },
  about: {
    title: 'Om Flyttella i Salem',
    desktop:
      'Flyttella startades för att göra flyttar i Stockholms närområden mer förutsägbara. Sedan 2016 har vi hjälpt över 8 000 kunder – många i Salem, Rönninge och Söderby – med allt från villaflyttar till kompletta helhetsuppdrag.',
    desktop2:
      'Vi kombinerar erfarna team, packhjälp, magasinering och flyttstädning under samma tak. Du får fast pris, tydlig omfattning och en kontaktperson som håller ihop planering, bemanning och uppföljning.',
    desktop3:
      'Gratis lånekartonger, kostnadsfri om-/avbokning upp till 24 timmar innan och 14 dagars garanti på flyttstäd ingår. Kundtjänsten finns nära till hands för frågor om parkeringsdispens, hissar eller nyckelhantering.',
    mobile: 'Lokala team i Salem med fasta priser och helhetslösningar.',
    mobileExpanded:
      'Planerar garageinfarter, backar och längre bärvägar. Skyddar golv, trappor och entréer.',
    mobileExpanded2:
      'Kartonger, rådgivning och kundtjänst ingår – samma kontaktperson genom hela flytten.'
  },
  experience: {
    title: 'Vår erfarenhet av flyttar i Salem',
    description:
      'Flyttar i villor längs Bornsjön, radhus i Söderby och lägenheter nära pendeltåget. Vi är vana vid kuperade tomter, carportar och begränsad parkering vid skolor och centrum.',
    expanded:
      'Metoden bygger på platsbesök vid behov, mätning av bärvägar och rätt bemanning för trappor och split-level-planlösningar. Erfarenhet från Rönninge, Nytorpsvägen och Skogsäng gör att vi kan tidsätta varje moment och hålla löften även vid tighta tidsfönster.'
  },
  reviews: {
    subtitle: 'Rekommenderad flyttfirma i Salem',
    description:
      'Kunder uppskattar våra punktliga tidsplaner, vår tydliga kommunikation och hur vi håller flytten lugn även när mycket händer runtomkring. Omdömen från Salem centrum, Rönninge och Söderby lyfter vårt lugna arbetssätt.',
    badgeAlt: 'Flyttfirma Salem omdömen',
    arrowText: 'Läs fler kunders upplevelser'
  },
  awards: {
    title: 'Flyttellas utmärkelser i Salem',
    description:
      'Våra utmärkelser visar att vi levererar kvalitet och trygg service i Södertörns småhusområden. Salem-bor lyfter vår punktlighet, hur vi skyddar nyrenoverade hem och att vi tar ansvar hela vägen från offert till sista lådan.'
  },
  servicesSection: {
    title: 'Upptäck alla våra tjänster i Salem',
    description:
      'Villaflytt, radhusflytt, packservice, magasinering, flyttstädning, montering och rådgivning inför tillträde. Vi tar hand om parkeringsdispens, bärhjälp till suterrängplan och koordinering med mäklare eller byggare.',
    privateServices: 'Se alla tjänster'
  },
  blogSection: {
    title: 'Guider och tips för flytt i Salem',
    description:
      'Planera parkering i god tid, frigör carporten, märk lådor efter våningsplan och säkra gångvägar om det är backigt.',
    readMore: 'Läs mer'
  },
  blog: {
    title: 'Checklista: flytta mellan Salem och Rönninge',
    description:
      'Gå igenom nycklar, porttelefon, carport och belysning runt huset. Frosta av, förbered vind/förråd och planera bärteamets väg i suterrängplan.'
  },
  processSection: {
    title: 'Vår process',
    subtitle: 'Så fungerar det',
    description:
      'Vår flyttprocess är designad för att vara enkel, transparent och trygg. Du fyller i vårt formulär med adresser och flyttbehov, inom en minut får du en offert i inkorgen och samma dag tar vi personlig kontakt för att gå igenom detaljerna. När offerten känns rätt signerar du digitalt och vi genomför flytten enligt dina önskemål – med målet att du ska kunna fokusera på att komma hem i lugn och ro.\n\nVåra offerter baseras alltid på dina specifika förutsättningar. Vi tar hänsyn till boyta, våningsplan, hiss, parkering och kan göra besiktning vid behov. Priset är fast utan dolda avgifter och vi anpassar omfattningen efter dina önskemål – hör av dig om du vill lägga till packning, städning eller magasinering.'
  },
  process: {
    fillForm: 'Fyll i formuläret',
    fillFormDesc:
      'Ange adresser, datum, våningsplan, eventuell suterräng, loft eller friggebod samt tjänster du vill lägga till.',
    quickQuote: 'Snabb offert',
    quickQuoteDesc:
      'Du får en specificerad offert med fast pris och uppskattade tider. Vi räknar på bärvägar, parkering och bemanning så att allt flyter.',
    signConfirm: 'Signera och bekräfta',
    signConfirmDesc:
      'Vi bokar tider, koordinerar med samfällighet eller förening och skickar körplan och kontaktvägar.',
    personalContact: 'Personlig kontakt',
    personalContactDesc:
      'Din kontaktperson håller avstämningar, tipsar om packning och säkerställer att skyddsmaterial och lådor kommer i tid.',
    moveCompleted: 'Flytt genomförd',
    moveCompletedDesc:
      'Teamet skyddar entréer, bygger bärkedjor och lastar i rätt ordning så avlastning i nya hemmet går snabbt.',
    satisfiedCustomer: 'Uppföljning',
    satisfiedCustomerDesc:
      'Efter avslut gör vi en genomgång, justerar möbleringen och säkerställer att städning/magasinering matchar planen.'
  },
  faq: {
    title: 'Vanliga frågor om flytt i Salem',
    items: [
      {
        question: 'Hur planerar ni flytt i suterränghus eller split-level?',
        answer:
          'Vi går igenom planlösningen, mäter trappor, tar med extra skydd och schemalägger bärteam per våningsplan så att flödet blir smidigt.'
      },
      {
        question: 'Kan ni hjälpa till med packning och uppackning?',
        answer:
          'Ja, vi erbjuder packteam som märker allt per rum och kategori. Du kan även boka uppackning så att kök och garderober är klara snabbare.'
      },
      {
        question: 'Kan ni ta hand om tunga eller skrymmande möbler?',
        answer:
          'Ja, vi använder bärselar, pianodockor och extra bemanning när det behövs. Vi skyddar väggar och trappor och planerar lyften så att allt sker säkert och kontrollerat.'
      },
      {
        question: 'Har ni möjlighet att ta hand om magasinering?',
        answer:
          'Absolut – vi magasinerar i torra, larmade lokaler och levererar tillbaka när renovering eller tillträde är klart.'
      },
      {
        question: 'Hur långt i förväg behöver jag boka?',
        answer:
          'Under vår och sommar rekommenderar vi 3–4 veckor. Övrig tid räcker ofta 1–2 veckor, men vi försöker alltid lösa akuta förfrågningar.'
      }
    ]
  }
};

const enContent = {
  customerReviews: {
    title: 'What do our customers say?'
  },
  hero: {
    title: 'Moving company in Salem — Rönninge, central Salem, Skogsäng and Söderby',
    subtitle:
      'We manage villa, row-house and terrace-apartment moves along Lake Mälaren. Fixed pricing, clear schedules and local knowledge of slopes, garages and association rules keep your move calm.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See how we work'
  },
  about: {
    title: 'About Flyttella in Salem',
    desktop:
      'Flyttella was founded to make moves around Stockholm more predictable. Since 2016 we have supported 8,000+ clients — many in Salem, Rönninge and Söderby — with everything from single-family moves to turnkey packages.',
    desktop2:
      'We combine trained crews, packing help, storage and cleaning under one roof. You receive a fixed price, defined scope and one coordinator who handles planning, staffing and follow-up.',
    desktop3:
      'Complimentary box loans, free rescheduling up to 24 hours before and a 14-day cleaning guarantee are included. Support is on hand for questions about parking permits, elevators or key logistics.',
    mobile: 'Local Salem teams with fixed pricing and full-service options.',
    mobileExpanded:
      'We plan driveways, slopes and longer carry routes. Entrances, stairs and floors are protected before lifting starts.',
    mobileExpanded2:
      'Boxes, advice and customer support are included — the same coordinator stays with you throughout.'
  },
  experience: {
    title: 'Our experience with moves in Salem',
    description:
      'Moves in lakeside villas near Bornsjön, row houses in Söderby and apartments by the commuter line. We are used to hilly lots, carports and limited parking near schools and the town center.',
    expanded:
      'Our method involves site checks when needed, measuring carry routes and assigning the right crew size for stair-heavy or split-level layouts. Experience from Rönninge, Nytorpsvägen and Skogsäng lets us time every step and keep promises even with tight windows.'
  },
  reviews: {
    subtitle: 'Most recommended mover in Salem',
    description:
      'Clients value our punctual timelines, transparent communication and calm crews even when the surroundings are busy. Feedback from Salem center, Rönninge and Söderby highlights how steady the move feels from start to finish.',
    badgeAlt: 'Moving company Salem reviews',
    arrowText: 'Read more customer stories'
  },
  awards: {
    title: 'Flyttella awards in Salem',
    description:
      'Our awards show that we deliver quality and attentive service across Södertörn. Residents note our punctual schedules, careful handling of newly renovated homes and accountability from quote to final box.'
  },
  servicesSection: {
    title: 'Discover all our services in Salem',
    description:
      'Single-family moves, row-house moves, packing crews, storage, cleaning, assembly and advisory services. We handle parking permits, extra carriers for split levels and coordination with agents or builders.',
    privateServices: 'See all services'
  },
  blogSection: {
    title: 'Guides and tips for moving in Salem',
    description:
      'Plan parking early, clear the carport, label boxes by floor level and secure walkways if the lot is sloped.',
    readMore: 'Read more'
  },
  blog: {
    title: 'Checklist: moving between Salem and Rönninge',
    description:
      'Review keys, door codes, carport access and outdoor lighting. Defrost appliances, prep attic/storage areas and map the carry route for any split-level floors.'
  },
  processSection: {
    title: 'Our process',
    subtitle: 'How it works',
    description:
      'Our moving process is built to stay simple, transparent and safe. You submit the form with your details, a quote arrives in your inbox within a minute and we reach out the same day to walk through the plan. Once you are happy you sign digitally and we execute the move exactly as agreed – so you can focus on settling in while we handle the logistics.\n\nEvery quote is tailored to your circumstances. We consider floor area, levels, elevators, parking distance and can add a walkthrough when needed. Pricing is fixed with no hidden fees and we adjust the scope to include packing, cleaning or storage whenever you need it.'
  },
  process: {
    fillForm: 'Submit the form',
    fillFormDesc:
      'Share the addresses, dates, floors, any split-level sections, attic or shed plus the services you want to add.',
    quickQuote: 'Detailed quote',
    quickQuoteDesc:
      'You receive an itemised fixed-price quote with estimated hours. We calculate carry routes, parking and crew size so everything stays on schedule.',
    signConfirm: 'Sign and confirm',
    signConfirmDesc:
      'We reserve times, coordinate with associations if needed and send the run sheet with contacts.',
    personalContact: 'Dedicated contact',
    personalContactDesc:
      'Your coordinator keeps in touch, shares packing tips and makes sure protection materials and boxes arrive on time.',
    moveCompleted: 'Move executed',
    moveCompletedDesc:
      'The crew protects entrances, builds carry chains and loads in the right order so unloading is efficient at the new home.',
    satisfiedCustomer: 'Follow-up',
    satisfiedCustomerDesc:
      'After completion we review each room, adjust furniture placement and ensure cleaning/storage services match the plan.'
  },
  faq: {
    title: 'Common questions about moving in Salem',
    items: [
      {
        question: 'How do you handle split-level or hillside homes?',
        answer:
          'We walk through the layout, measure staircases, bring extra protection and schedule carry teams per floor so the workflow stays safe and efficient.'
      },
      {
        question: 'Can you help with packing and unpacking?',
        answer:
          'Yes. Packing crews label everything by room/category and can also unpack so kitchens and wardrobes are ready faster.'
      },
      {
        question: 'Can you handle heavy or bulky furniture?',
        answer:
          'Yes. We bring lifting straps, piano dollies and extra crew when needed, protect walls and stairs and plan each lift so it stays safe and controlled.'
      },
      {
        question: 'Do you provide storage?',
        answer:
          'Absolutely — we store belongings in secure, climate-controlled facilities and deliver them once renovations or handovers are complete.'
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'During spring and summer we recommend 3–4 weeks. Other seasons 1–2 weeks is usually enough, but we always try to help with urgent requests.'
      }
    ]
  }
};

const svPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'en.json');

function update(filePath, content) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.salem = content;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

update(svPath, svContent);
update(enPath, enContent);

console.log('Updaterade Salem-sidor i sv/en med unik lokal copy.');
