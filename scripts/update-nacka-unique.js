const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function update(file, fn){ const d=JSON.parse(fs.readFileSync(file,'utf8')); fn(d); fs.writeFileSync(file, JSON.stringify(d,null,2),'utf8'); }

update(svPath, (d)=>{
  const k = d.nacka || (d.nacka = {});
  // Hero
  k.hero = k.hero || {};
  k.hero.title = 'Flyttfirma i Nacka – från Sickla och Järla sjö till Boo och Saltsjöbaden';
  k.hero.subtitle = 'Trygga, planerade flyttar med lokalkännedom: branta backar, villagator och bostadsrätter vid vattnet. Fasta priser, tydliga villkor och en smidig flyttdag i Nacka.';

  // About
  k.about = k.about || {};
  k.about.title = 'Om Flyttella i Nacka';
  k.about.desktop = 'Vi hjälper Nackabor i allt från lägenheter i Sickla och Järla sjö till villor i Boo och radhus i Ektorp. Vi planerar bärvägar i sluttningar, skyddar golv, trappor och glaspartier och synkar tider för att undvika köer på Värmdöleden.';
  k.about.desktop2 = 'Varje uppdrag dimensioneras efter fastighetens förutsättningar: längre bärsträckor, begränsade vändytor och parkering nära entré. Du får fast pris, tydliga villkor och en kontaktperson som håller ihop allt till inflytt.';
  k.about.desktop3 = 'Helhetslösningar vid behov – packhjälp, flyttstädning och magasinering. Gratis flyttkartonger, flexibel om-/avbokning upp till 24 timmar innan samt 14 dagars städgaranti.';
  k.about.mobile = 'Nacka‑specialister: lägenheter, radhus och villor – fast pris och tydlig plan.';
  k.about.mobileExpanded = 'Vi skyddar känsliga ytor, planerar bärvägar i backe och väljer tidsfönster för smidig logistik via Värmdöleden.';
  k.about.mobileExpanded2 = 'Packning, städning och magasinering som komplement. En kontaktperson följer hela processen.';

  // Awards
  k.awards = k.awards || {};
  k.awards.title = 'Utmärkelser och omdömen – Nacka';
  k.awards.description = 'Våra utmärkelser speglar vår styrka i Nacka: punktliga leveranser, välplanerade bärvägar och varsam hantering i villamiljö och vid vattnet. Rekommendationer från Sickla, Boo och Saltsjöbaden visar att metoden fungerar – tydliga offerter, skyddade ytor och en lugn flyttdag.';

  // Services
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Upptäck alla våra tjänster i Nacka';
  k.servicesSection.description = 'Nackaanpassade upplägg för lägenheter, radhus och villor: packhjälp, flyttstädning, magasinering och varsamma lyft i trappor. Vi planerar bärvägar i sluttningar, ordnar parkering nära entré och håller tider – alltid fasta offerter och tydlig kommunikation.';

  // Blog
  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guider och tips för flytt i Nacka';
  k.blogSection.description = 'Så lyckas du i Nacka: boka parkering nära entré, planera bärvägar i backe och märk lådor rum för rum. Välj tidsfönster som undviker rusning på Värmdöleden.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklista: flytt i Nacka steg för steg';
  k.blog.description = 'Förbered material och märkning, säkra parkering, planera bärvägar och tidsfönster – spara tid och minska risker utan onödiga lyft.';

  // Experience
  k.experience = k.experience || {};
  k.experience.title = 'Vår erfarenhet av flyttar i Nacka';
  k.experience.description = 'Över 8 000 flyttar – många i områden med branta backar och begränsade vändytor. Vår metod optimerar bemanning, bärvägar och lastning för en trygg och effektiv flyttdag.';
  k.experience.expanded = 'I Nacka jobbar vi med tydliga tidsfönster, skydd av ytor och sekventiell lastning. Erfarenhet från Sickla, Järla sjö, Boo och Saltsjöbaden innebär punktliga leveranser och hög kundnöjdhet.';

  // Reviews
  k.customerReviews = k.customerReviews || {};
  k.customerReviews.title = 'Vad tycker våra kunder om oss?';
  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Rekommenderad flyttfirma i Nacka';
  k.reviews.description = 'Kunder i Nacka uppskattar vår praktiska planering: tydliga bärvägar, rätt bemanning och fasta priser utan överraskningar. Omdömen från Sickla, Boo och Saltsjöbaden visar att vi levererar som utlovat.';
  k.reviews.badgeAlt = 'Rekommenderad flyttfirma Nacka';
  k.reviews.arrowText = 'Läs fler omdömen från Nacka';

  // Process tweak
  k.processSection = k.processSection || {};
  k.processSection.description = 'Offerten baseras på boyta, våningsplan, trappor/hiss, bärvägar och parkering i Nacka. Vid behov gör vi kostnadsfri besiktning och dimensionerar bemanning/fordon. Alltid fasta priser utan dolda avgifter.';

  // FAQ
  k.faq = k.faq || {};
  k.faq.title = 'Vanliga frågor om flytt i Nacka';
  k.faq.items = [
    { question: 'Hur planerar ni flytt i områden med branta backar?', answer: 'Vi använder ramper/bärselar, planerar bärvägar i segment och dimensionerar bemanning efter lutning och avstånd för säker hantering.' },
    { question: 'Kan ni hantera flytt till sjönära villor med begränsad vändyta?', answer: 'Ja, vi rekognoserar lastplats i förväg, skyddar ytor och använder sekventiell lastning för kortare bär och snabb avlastning.' },
    { question: 'Hur undviker ni köer på Värmdöleden vid flytt?', answer: 'Vi väljer tidsfönster utanför rusning, planerar rutt/parkering i förväg och lägger in buffert för att hålla tidplanen.' },
    { question: 'Erbjuder ni magasinering mellan försäljning och inflytt?', answer: 'Absolut. Vi kan magasinera bohag kortare perioder och planera del‑/helfytt vid tillträde. Allt dokumenteras för spårbarhet.' },
    { question: 'Hur hanterar ni tunga lyft i trånga trapphus?', answer: 'Vi bedömer bärvägar och tar med rätt team och hjälpmedel (t.ex. bärselar/skyltar). Vid behov delar vi upp större möbler för säker transport.' }
  ];
});

update(enPath, (d)=>{
  const k = d.nacka || (d.nacka = {});
  // Hero
  k.hero = k.hero || {};
  k.hero.title = 'Moving company in Nacka — from Sickla and Järla Sjö to Boo and Saltsjöbaden';
  k.hero.subtitle = 'Secure, well‑planned moves with local insight: steep hills, residential streets and waterfront apartments. Fixed pricing, clear terms and a smooth move day in Nacka.';

  // About
  k.about = k.about || {};
  k.about.title = 'About Flyttella in Nacka';
  k.about.desktop = 'We help Nacka residents with moves from apartments in Sickla and Järla Sjö to houses in Boo and townhouses in Ektorp. We plan routes on slopes, protect floors, stairs and glass sections and time windows to avoid queues on Värmdöleden.';
  k.about.desktop2 = 'Each job is sized to the property: longer distances, limited turning space and parking close to the entry. You get fixed pricing, clear terms and one coordinator from quote to move‑in.';
  k.about.desktop3 = 'End‑to‑end options when needed — packing assistance, move‑out cleaning and storage. Free boxes, flexible rebooking up to 24 hours prior and a 14‑day cleaning guarantee.';
  k.about.mobile = 'Nacka specialists: apartments, townhouses and houses — fixed price and a clear plan.';
  k.about.mobileExpanded = 'We protect sensitive surfaces, plan routes on slopes and choose time windows for smooth logistics via Värmdöleden.';
  k.about.mobileExpanded2 = 'Packing, cleaning and storage as add‑ons. A single coordinator follows the entire process.';

  // Awards
  k.awards = k.awards || {};
  k.awards.title = 'Awards and reviews — Nacka';
  k.awards.description = 'Our recognitions reflect our strengths in Nacka: punctual delivery, well‑planned carry routes and careful handling in residential and waterfront settings. Recommendations from Sickla, Boo and Saltsjöbaden show the method works — clear quotes, protected surfaces and a calm move day.';

  // Services
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Discover our services in Nacka';
  k.servicesSection.description = 'Nacka‑tailored setups for apartments, townhouses and houses: packing help, move‑out cleaning, storage and careful stairway lifts. We plan routes on slopes, arrange parking close to entry and keep timing tight — always fixed quotes and clear communication.';

  // Blog
  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guides and tips for moving in Nacka';
  k.blogSection.description = 'How to succeed in Nacka: secure parking near the entry, plan routes on hills and label boxes room by room. Pick time windows that avoid Värmdöleden rush.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklist: moving in Nacka step by step';
  k.blog.description = 'Prepare materials and labels, secure parking, plan carry routes and time windows — save time and reduce risks without unnecessary lifts.';

  // Experience
  k.experience = k.experience || {};
  k.experience.title = 'Our experience with moves in Nacka';
  k.experience.description = 'Over 8,000 moves — many in areas with steep slopes and limited turning space. Our method optimises crew, routes and loading for a safe and efficient move day.';
  k.experience.expanded = 'In Nacka we work with precise time windows, protective materials and sequenced loading. Experience from Sickla, Järla Sjö, Boo and Saltsjöbaden yields punctual delivery and high satisfaction.';

  // Reviews
  k.customerReviews = k.customerReviews || {};
  k.customerReviews.title = 'What do our customers say?';
  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Recommended moving company in Nacka';
  k.reviews.description = 'Clients in Nacka value our practical planning: clear routes, the right crew and fixed pricing with no surprises. Reviews from Sickla, Boo and Saltsjöbaden show we deliver as promised.';
  k.reviews.badgeAlt = 'Recommended mover Nacka';
  k.reviews.arrowText = 'Read more Nacka reviews';

  // Process
  k.processSection = k.processSection || {};
  k.processSection.description = 'Quotes are based on size, floor level, stairs/elevator, carry routes and parking in Nacka. We conduct free inspections when needed and size the right crew/vehicle. Always fixed pricing with no hidden fees.';

  // FAQ
  k.faq = k.faq || {};
  k.faq.title = 'Common questions about moving in Nacka';
  k.faq.items = [
    { question: 'How do you handle moves in areas with steep hills?', answer: 'We bring ramps/carry straps, plan routes in segments and size the crew to slope and distance for safe handling.' },
    { question: 'Can you manage moves to waterfront homes with limited turning space?', answer: 'Yes, we recon the loading spot in advance, protect surfaces and use sequenced loading to shorten carries and speed up unloading.' },
    { question: 'How do you avoid queues on Värmdöleden during the move?', answer: 'We select off‑peak time windows, plan route/parking in advance and keep a buffer to maintain schedule.' },
    { question: 'Do you offer storage between sale and move‑in?', answer: 'Absolutely. We can store belongings for short periods and schedule partial/full delivery at possession. Everything is documented for traceability.' },
    { question: 'How do you handle heavy lifts in narrow stairwells?', answer: 'We assess routes and bring the right team and lifting aids (e.g., carry straps). Large furniture is disassembled when needed for safe transport.' }
  ];
});

console.log('Updated Nacka with unique content across all sections (sv/en).');
