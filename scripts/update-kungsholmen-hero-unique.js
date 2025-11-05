const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function updateJson(filePath, updater) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  updater(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

updateJson(svPath, (data) => {
  if (!data.kungsholmen || !data.kungsholmen.hero) return;
  data.kungsholmen.hero.title = 'Flyttfirma på Kungsholmen – trygg innerstadsflytt med lokalkännedom';
  data.kungsholmen.hero.subtitle = 'Flyttar i Hornsberg, Kristineberg, Marieberg och Fredhäll. Smarta upplägg för sekelskifteshus, vindsvåningar och moderna bostäder – fasta priser, tydliga villkor och personlig planering.';
});

updateJson(enPath, (data) => {
  if (!data.kungsholmen || !data.kungsholmen.hero) return;
  data.kungsholmen.hero.title = 'Mover in Kungsholmen – inner-city moves handled with care and local insight';
  data.kungsholmen.hero.subtitle = 'Moves in Hornsberg, Kristineberg, Marieberg and Fredhäll. Smart setups for turn-of-the-century buildings, attic apartments and modern homes – fixed pricing, clear terms and personal planning.';
});

console.log('Updated Kungsholmen hero title and subtitle to unique inner-city content.');
