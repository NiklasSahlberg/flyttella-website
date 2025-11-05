const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function update(filePath, fn){
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  fn(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

update(svPath, (d) => {
  const k = d.kungsangen || (d.kungsangen = {});

  // Experience
  k.experience = k.experience || {};
  k.experience.title = 'Vår erfarenhet i Kungsängen';
  k.experience.description = 'Med tusentals flyttar bakom oss har vi byggt en särskild kompetens för Kungsängen: längre bärsträckor från carport/parkering, nivåskillnader mellan entréplan och suterräng samt smart lastning vid radhuslängor i Brunna. Resultatet är en lugn och effektiv flyttdag.';
  k.experience.expanded = 'Vår metod är enkel men beprövad: rätt bemanning efter bärväg, sekventiell lastning (det som ska in sist lastas först) och tydlig märkning för snabb avlastning i rätt rum. Det syns i omdömena från Brunna, Tibble och centrum.';

  // Services description
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.description = 'I Kungsängen anpassar vi upplägget för radhus, kedjehus och moderna lägenheter: packhjälp, flyttstädning, magasinering samt varsamma lyft i trappor. Vi planerar bärvägar från carport/garage och ser till att parkering och tider fungerar smidigt – alltid fasta offerter och tydlig kommunikation.';

  // Reviews text
  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Rekommenderad flyttfirma i Kungsängen';
  k.reviews.description = 'Kunder i Kungsängen, Brunna och Tibble uppskattar vår praktiska planering: tydliga bärvägar, bemanning som matchar avstånden och punktliga leveranser. Inga överraskningar – bara en trygg flytt med fasta priser och bra dialog.';
  k.reviews.badgeAlt = 'Rekommenderad flyttfirma Kungsängen';
  k.reviews.arrowText = 'Läs fler omdömen från Kungsängen';

  // Customer reviews title ensure
  k.customerReviews = k.customerReviews || {};
  k.customerReviews.title = 'Vad tycker våra kunder om oss?';
});

update(enPath, (d) => {
  const k = d.kungsangen || (d.kungsangen = {});

  // Experience
  k.experience = k.experience || {};
  k.experience.title = 'Our experience in Kungsängen';
  k.experience.description = 'With thousands of moves completed, we have built specific expertise for Kungsängen: longer carry distances from carports/parking, level changes between entry and lower floors, and smart loading for townhouse rows in Brunna. The result is a calm, efficient move day.';
  k.experience.expanded = 'Our method is proven: crew sized to the route, sequenced loading (what goes in last is loaded first) and clear labelling for quick unloading to the right room. Reviews from Brunna, Tibble and central Kungsängen reflect this.';

  // Services description
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.description = 'In Kungsängen we tailor setups for townhouses, link‑detached homes and modern apartments: packing help, move‑out cleaning, storage and careful stairway lifts. We plan routes from carport/garage and ensure parking and timing work smoothly — always fixed quotes and clear communication.';

  // Reviews text
  k.reviews = k.reviews || {};
  k.reviews.subtitle = 'Recommended moving company in Kungsängen';
  k.reviews.description = 'Clients in Kungsängen, Brunna and Tibble value our practical planning: clear routes, crews matched to distances and punctual delivery. No surprises — just a safe move with fixed pricing and solid communication.';
  k.reviews.badgeAlt = 'Recommended mover Kungsängen';
  k.reviews.arrowText = 'Read more Kungsängen reviews';

  k.customerReviews = k.customerReviews || {};
  k.customerReviews.title = 'What do our customers say?';
});

console.log('Updated Kungsängen experience, services description, and reviews with unique content (sv/en).');
