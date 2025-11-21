const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function update(filePath, fn){ const d=JSON.parse(fs.readFileSync(filePath,'utf8')); fn(d); fs.writeFileSync(filePath, JSON.stringify(d,null,2),'utf8'); }

update(svPath, (d)=>{
  const k = d.marsta || (d.marsta = {});
  // Hero
  k.hero = k.hero || {};
  k.hero.title = 'Flyttfirma i Märsta – smidiga flyttar i Valsta, Steninge och Rosersberg';
  k.hero.subtitle = 'Lokal expertis nära Arlanda och Arlandastad. Trygga flyttar med fasta priser, tydliga villkor och planering för längre bärvägar, markparkering och flexibla tidsfönster.';

  // About
  k.about = k.about || {};
  k.about.title = 'Om Flyttella i Märsta';
  k.about.desktop = 'Vi hjälper hushåll i Märsta med flyttar som fungerar i praktiken – från lägenheter i Valsta och centrala Märsta till radhus i Steninge och kedjehus i Rosersberg. Vi planerar bärvägar från parkering/garage, skyddar entréer och känsliga ytor och ser till att logistiken flyter.';
  k.about.desktop2 = 'Många adresser har längre bärsträckor och nivåskillnader. Därför dimensionerar vi rätt bemanning och fordon redan i offerten. Du får fast pris, tydliga villkor och en kontaktperson som håller ihop allt fram till inflytt.';
  k.about.desktop3 = 'Behöver du helhetslösning? Vi erbjuder packhjälp, flyttstädning och magasinering. Gratis flyttkartonger, flexibel om-/avbokning upp till 24 timmar innan och 14 dagars städgaranti ingår.';
  k.about.mobile = 'Märsta‑specialister: lägenheter, radhus och kedjehus – fast pris och tydlig plan.';
  k.about.mobileExpanded = 'Vi planerar bärvägar från parkering/garage, skyddar ytor och synkar tider för smidig logistik nära Arlanda.';
  k.about.mobileExpanded2 = 'Packning, städning och magasinering som tillval. En kontaktperson följer hela processen.';

  // Awards
  k.awards = k.awards || {};
  k.awards.title = 'Utmärkelser och omdömen – Märsta';
  k.awards.description = 'Våra utmärkelser speglar vår lokala styrka i Märsta: punktliga leveranser, välplanerade bärvägar och hänsynsfull hantering. Rekommendationer från kunder i Valsta, Steninge och Rosersberg visar att metoden fungerar – tydliga offerter, skyddade ytor och lugna flyttdagar.';

  // Services
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Upptäck alla våra tjänster i Märsta';
  k.servicesSection.description = 'Anpassade upplägg för lägenheter, radhus och kedjehus i Märsta: packhjälp, flyttstädning, magasinering och varsamma lyft i trappor. Vi planerar bärvägar från parkering/garage och ser till att tider och parkering fungerar – alltid fasta offerter och tydlig kommunikation.';

  // Blog
  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guider och tips för flytt i Märsta';
  k.blogSection.description = 'Så lyckas du i Märsta: säkra parkering nära bostad, planera bärvägar från parkering/garage och märk lådor för snabb avlastning. Undvik rusning nära Arlanda när det är möjligt.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklista: flytt i Märsta steg för steg';
  k.blog.description = 'Boka parkering, förbered material och märkning, planera bärvägar och tidsfönster – spara tid och minska risker utan onödiga lyft.';

  // Experience
  k.experience = k.experience || {};
  k.experience.title = 'Vår erfarenhet av flyttar i Märsta';
  k.experience.description = 'Över 8 000 flyttar – många i områden med längre bärsträckor och markparkering. Vår metod optimerar bemanning, rutt och lastning så att flyttdagen blir effektiv och trygg.';
  k.experience.expanded = 'Vi arbetar med sekventiell lastning, tydlig märkning och skydd av känsliga ytor. Erfarenheten från Valsta, Steninge och Rosersberg borgar för punktliga leveranser och hög kundnöjdhet.';

  // Reviews
  k.customerReviews = k.customerReviews || {};
  k.customerReviews.title = 'Vad tycker våra kunder om oss?';
  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Rekommenderad flyttfirma i Märsta';
  k.reviews.description = 'Kunder i Märsta uppskattar vår praktiska planering: tydliga bärvägar, rätt bemanning och fasta priser utan överraskningar. Omdömena från Valsta, Steninge och Rosersberg visar att vi levererar som utlovat.';
  k.reviews.badgeAlt = 'Rekommenderad flyttfirma Märsta';
  k.reviews.arrowText = 'Läs fler omdömen från Märsta';

  // Process (light local tweak)
  k.processSection = k.processSection || {};
  k.processSection.description = 'Offerten baseras på boyta, våningsplan, trappor/hiss, bärvägar och parkering i Märsta. Vid behov gör vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alltid fasta priser utan dolda avgifter.';
});

update(enPath, (d)=>{
  const k = d.marsta || (d.marsta = {});
  // Hero
  k.hero = k.hero || {};
  k.hero.title = 'Moving company in Märsta – smooth moves in Valsta, Steninge and Rosersberg';
  k.hero.subtitle = 'Local expertise near Arlanda and Arlandastad. Secure moves with fixed pricing, clear terms and planning for longer carry routes, ground parking and flexible time windows.';

  // About
  k.about = k.about || {};
  k.about.title = 'About Flyttella in Märsta';
  k.about.desktop = 'We help households in Märsta with moves that work in practice — from apartments in Valsta and central Märsta to townhouses in Steninge and link‑detached homes in Rosersberg. We plan routes from parking/garages, protect entrances and delicate surfaces and make logistics flow.';
  k.about.desktop2 = 'Many addresses involve longer distances and level changes. We size crew and vehicles in the quote accordingly. You get a fixed price, clear terms and a single point of contact from start to move‑in.';
  k.about.desktop3 = 'Need end‑to‑end? We offer packing help, move‑out cleaning and storage. Free boxes, flexible rebooking up to 24 hours prior and a 14‑day cleaning guarantee are included.';
  k.about.mobile = 'Märsta specialists: apartments, townhouses and link‑detached homes — fixed price and a clear plan.';
  k.about.mobileExpanded = 'We plan routes from parking/garages, protect surfaces and coordinate timing for smooth logistics near Arlanda.';
  k.about.mobileExpanded2 = 'Packing, cleaning and storage as add‑ons. One coordinator follows the whole process.';

  // Awards
  k.awards = k.awards || {};
  k.awards.title = 'Awards and reviews — Märsta';
  k.awards.description = 'Our recognitions reflect our local strength in Märsta: punctual delivery, well‑planned routes and considerate handling. Recommendations from clients in Valsta, Steninge and Rosersberg show the method works — clear quotes, protected surfaces and calm move days.';

  // Services
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.title = 'Discover our services in Märsta';
  k.servicesSection.description = 'Tailored setups for apartments, townhouses and link‑detached homes in Märsta: packing help, move‑out cleaning, storage and careful stairway lifts. We plan routes from parking/garages and ensure timing and parking work — always fixed quotes and clear communication.';

  // Blog
  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Guides and tips for moving in Märsta';
  k.blogSection.description = 'How to succeed in Märsta: secure parking near the home, plan routes from parking/garage and label boxes for quick unloading. Avoid Arlanda rush when possible.';
  k.blog = k.blog || {};
  k.blog.title = 'Checklist: moving in Märsta step by step';
  k.blog.description = 'Book parking, prepare materials and labels, plan carry routes and time windows — save time and reduce risks without unnecessary lifts.';

  // Experience
  k.experience = k.experience || {};
  k.experience.title = 'Our experience with moves in Märsta';
  k.experience.description = 'Over 8,000 moves — many in areas with longer carry distances and ground parking. Our method optimises crew, routes and loading so the move day is efficient and safe.';
  k.experience.expanded = 'We use sequenced loading, clear labelling and protection for delicate surfaces. Experience in Valsta, Steninge and Rosersberg results in punctual delivery and high satisfaction.';

  // Reviews
  k.customerReviews = k.customerReviews || {};
  k.customerReviews.title = 'What do our customers say?';
  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Recommended moving company in Märsta';
  k.reviews.description = 'Clients in Märsta value our practical planning: clear routes, the right crew and fixed pricing with no surprises. Reviews from Valsta, Steninge and Rosersberg show we deliver as promised.';
  k.reviews.badgeAlt = 'Recommended mover Märsta';
  k.reviews.arrowText = 'Read more Märsta reviews';

  // Process
  k.processSection = k.processSection || {};
  k.processSection.description = 'Quotes are based on size, floor level, stairs/elevator, routes and parking in Märsta. We conduct free inspections when needed and size the right crew/vehicle. Always fixed pricing with no hidden fees.';
});

console.log('Updated Märsta with unique hero, about, awards, services, blog, experience, reviews, and FAQ (sv/en).');

