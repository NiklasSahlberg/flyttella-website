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
  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Praktiska tips för flytt på Lidingö';
  k.blogSection.description = 'Så lyckas du på Lidingö: säkra parkering nära bostad eller uppfart, planera bärvägar i sluttning och märk lådor rum för rum. Skydda golv och glaspartier och välj tidsfönster som undviker rusning över Lidingöbron.';

  k.blog = k.blog || {};
  k.blog.title = 'Checklista: flytt på Lidingö steg för steg';
  k.blog.description = 'Boka parkering nära huset, planera bärvägar i backe, märk lådor för snabb avlastning och skydda känsliga ytor. Välj tid utanför rusning för smidig logistik över bron.';
});

update(enPath, (d) => {
  const k = d.lidingo || (d.lidingo = {});
  k.blogSection = k.blogSection || {};
  k.blogSection.title = 'Practical tips for moving in Lidingö';
  k.blogSection.description = 'How to succeed in Lidingö: secure parking near the home or driveway, plan carry routes on slopes and label boxes by room. Protect floors and glass sections and pick time slots that avoid Lidingö Bridge rush hours.';

  k.blog = k.blog || {};
  k.blog.title = 'Checklist: moving in Lidingö step by step';
  k.blog.description = 'Reserve parking close to the house, plan routes on a slope, label boxes for quick unloading and protect delicate surfaces. Choose off‑peak times for smooth bridge logistics.';
});

console.log('Updated Lidingö blogSection and blog content to Lidingö‑specific phrasing (sv/en).');
