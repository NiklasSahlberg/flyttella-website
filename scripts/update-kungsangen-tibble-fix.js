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
  if (d.kungsangen && d.kungsangen.about && typeof d.kungsangen.about.desktop === 'string') {
    d.kungsangen.about.desktop = d.kungsangen.about.desktop.replace('villor i Tibble', 'radhus och kedjehus i Tibble');
  }
});

update(enPath, (d) => {
  if (d.kungsangen && d.kungsangen.about && typeof d.kungsangen.about.desktop === 'string') {
    d.kungsangen.about.desktop = d.kungsangen.about.desktop.replace('houses in Tibble', 'townhouses and link‑detached homes in Tibble');
  }
});

console.log('Fixed Tibble phrasing for Kungsängen about text in sv/en.');

