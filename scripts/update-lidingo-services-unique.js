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
  const k = d.lidingo || (d.lidingo = {});
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.description = 'På Lidingö erbjuder vi upplägg som passar villor vid vattnet, radhus och moderna lägenheter: packhjälp, flyttstädning, korttidsmagasinering och varsamma lyft i trappor. Vi planerar för sluttande uppfarter, begränsade vändytor och smidig logistik över Lidingöbron – alltid med fasta offerter och tydliga villkor.';
});

update(enPath, (d) => {
  const k = d.lidingo || (d.lidingo = {});
  k.servicesSection = k.servicesSection || {};
  k.servicesSection.description = 'In Lidingö we tailor setups for waterfront villas, townhouses and modern apartments: packing help, move‑out cleaning, short‑term storage and careful stairway lifts. We plan for sloped driveways, limited turning space and smooth logistics over Lidingö Bridge — always with fixed quotes and clear terms.';
});

console.log('Updated Lidingö servicesSection.description with unique content (sv/en).');

