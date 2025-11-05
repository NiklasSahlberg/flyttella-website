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
  k.blog = k.blog || {};
  k.blog.title = 'Checklista: flytt i Kungsängen steg för steg';
  k.blog.description = 'Säkra parkering nära bostad eller carport, planera bärvägar från parkering/garage och märk lådor rum för rum – spara tid och minska risker utan onödiga lyft.';
});

update(enPath, (d) => {
  const k = d.kungsangen || (d.kungsangen = {});
  k.blog = k.blog || {};
  k.blog.title = 'Checklist: moving in Kungsängen step by step';
  k.blog.description = 'Secure parking near the home or carport, plan carry routes from parking/garage and label boxes room by room — save time and reduce risks without unnecessary lifts.';
});

console.log('Updated Kungsängen blog article title and description (sv/en).');
