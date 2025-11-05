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
  k.blogSection = k.blogSection || {};
  // Replace inner-city phrasing with Kungsängen-specific guidance
  k.blogSection.title = 'Praktiska tips för flytt i Kungsängen';
  k.blogSection.description = 'Så lyckas du i Kungsängen: säkra parkering nära bostad eller carport, planera bärvägar från parkering/garage och märk lådor och möbler för snabb avlastning utan onödiga lyft.';
});

update(enPath, (d) => {
  const k = d.kungsangen || (d.kungsangen = {});
  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Practical tips for moving in Kungsängen';
  k.blogSection.description = 'How to succeed in Kungsängen: secure parking near the home or carport, plan carry routes from parking/garage and label boxes and furniture for quick unloading with minimal extra lifts.';
});

console.log('Updated Kungsängen blog tips text to be location-specific (sv/en).');
