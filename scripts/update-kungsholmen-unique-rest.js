const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function update(filePath, fn) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  fn(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

update(svPath, (data) => {
  const k = data.kungsholmen;
  if (!k) return;

  // Reviews
  if (k.reviews) {
    k.reviews.description = 'Kunder på Kungsholmen uppskattar vår precision i trånga gårdar, tidsstyrda lastzoner och föreningsregler. Vi förbokar lastplats, planerar bärvägar via gårdsportar och ser till att flyttdagen blir lugn – utan överraskningar.';
  }

  // Services
  if (k.servicesSection) {
    k.servicesSection.description = 'Innerstadsanpassade flyttupplägg för vindsvåningar, sekelskifteshus och nyproduktion. Hjälp med packning, flyttstädning, korttidsmagasinering och varsamma lyft av tunga möbler i smala trapphus. Alltid fasta offerter och tydlig plan.';
  }

  // Blog/Guides
  if (k.blogSection) {
    k.blogSection.title = 'Praktiska tips för flytt på Kungsholmen';
    k.blogSection.description = 'Så lyckas du i innerstan: boka lastzon, informera föreningen om hiss‑skydd, förbered bärvägar via gårdsport och märk skåp för våningsburen transport.';
  }
  if (k.blog) {
    k.blog.title = 'Checklista: innerstadsflytt på Kungsholmen steg för steg';
    k.blog.description = 'Från portkod och gårdsport till lastzon och hiss‑skydd – en konkret checklista som sparar tid och minskar risker i trång miljö.';
  }

  // Process
  if (k.process) {
    k.process.fillFormDesc = 'Berätta om portläsare/portkod, våningsplan och tillgång till hiss/innergård i Kungsholmen.';
    k.process.personalContactDesc = 'Vi synkar lastzon, gårdsport och hiss‑skydd samt ordnar eventuella tillstånd i god tid.';
    k.process.moveCompletedDesc = 'Skydd av golv, hiss och portar. Effektiva bärkedjor och ruttplanering för innerstadsmiljö.';
    k.process.satisfiedCustomerDesc = 'Proaktiv uppföljning och hjälp med eventuella efterjusteringar efter inflytt.';
  }

  // Experience
  if (k.experience) {
    k.experience.description = 'Över 8 000 flyttar – många i sekelskifteshus med smala trappor och vindsvåningar. Vår metod minskar bärtiden och skyddar känsliga ytor, särskilt i Marieberg och Fredhäll.';
    k.experience.expanded = '1000+ omdömen visar att vår innerstadsmetod fungerar: tidsfönster, förbokad lastzon och tydliga bärvägar. Resultatet är punktliga leveranser och trygg hantering i trång miljö.';
  }
});

update(enPath, (data) => {
  const k = data.kungsholmen;
  if (!k) return;

  // Reviews
  if (k.reviews) {
    k.reviews.description = 'Clients in Kungsholmen value our precision with courtyard access, timed loading zones and association rules. We pre‑book loading space, plan routes via courtyard gates and keep move day calm — no surprises.';
  }

  // Services
  if (k.servicesSection) {
    k.servicesSection.description = 'Inner‑city tailored setups for attic apartments, turn‑of‑the‑century buildings and new developments. Help with packing, move‑out cleaning, short‑term storage and careful lifting of heavy items in narrow stairwells. Always fixed quotes and a clear plan.';
  }

  // Blog/Guides
  if (k.blogSection) {
    k.blogSection.title = 'Practical tips for moving in Kungsholmen';
    k.blogSection.description = 'How to succeed in the inner city: book a loading zone, notify the association about elevator protection, prepare routes via courtyard gates and label cabinets for stair‑carried transport.';
  }
  if (k.blog) {
    k.blog.title = 'Checklist: inner‑city move in Kungsholmen step by step';
    k.blog.description = 'From entry codes and courtyard access to loading zones and elevator protection — a concrete checklist that saves time and reduces risks in tight environments.';
  }

  // Process
  if (k.process) {
    k.process.fillFormDesc = 'Tell us about entry system/code, floor level and access to elevator/courtyard in Kungsholmen.';
    k.process.personalContactDesc = 'We sync loading zone, courtyard access and elevator protection and arrange permits in advance when needed.';
    k.process.moveCompletedDesc = 'Protection for floors, elevators and doors. Efficient carry chains and route planning for inner‑city conditions.';
    k.process.satisfiedCustomerDesc = 'Proactive follow‑up and help with any post‑move adjustments.';
  }

  // Experience
  if (k.experience) {
    k.experience.description = 'Over 8,000 moves — many in turn‑of‑the‑century buildings with narrow stairs and attic apartments. Our method reduces carry time and protects sensitive surfaces, especially in Marieberg and Fredhäll.';
    k.experience.expanded = '1000+ reviews show our inner‑city method works: time windows, pre‑booked loading zones and clear carry routes. The result is punctual delivery and safe handling in tight environments.';
  }
});

console.log('Updated additional Kungsholmen sections with more unique inner‑city content (sv/en).');
