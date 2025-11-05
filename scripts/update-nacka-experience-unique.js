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
  const n = d.nacka || (d.nacka = {});
  n.experience = n.experience || {};
  n.experience.title = 'Vår erfarenhet av flyttar i Nacka';
  n.experience.description = 'Över 8 000 flyttar – med särskild expertis i områden som Nacka Strand, Alphyddan, Finntorp och Ektorp. Vi har utvecklat en metod för bärvägar i branta backar, begränsade vändytor och sjönära fastigheter, där ytskydd och lastordning gör störst skillnad.';
  n.experience.expanded = 'I Nacka arbetar vi med detaljerad tidsplanering, sekventiell lastning (sist in, först ut) och tydlig märkning rum för rum. Vid flyttar i sjönära miljöer skyddar vi glaspartier och trägolv extra, och i kuperade områden organiserar vi bärkedjor för att minska lyftsträckor. Erfarenheten från Nacka Strand, Alphyddan, Finntorp och Ektorp ger oss en förutsägbar, punktlig leverans – varje gång.';
});

update(enPath, (d) => {
  const n = d.nacka || (d.nacka = {});
  n.experience = n.experience || {};
  n.experience.title = 'Our experience with moves in Nacka';
  n.experience.description = 'Over 8,000 moves — with specific expertise in Nacka Strand, Alphyddan, Finntorp and Ektorp. We use a method designed for routes on steep hills, limited turning space and waterfront homes where surface protection and load sequence matter most.';
  n.experience.expanded = 'In Nacka we plan precise timelines, use sequenced loading (last in, first out) and label room by room. For waterfront addresses we protect glass sections and wood floors extra, and in hilly areas we set up carry chains to shorten lift distances. Experience from Nacka Strand, Alphyddan, Finntorp and Ektorp yields predictable, on‑time delivery — every time.';
});

console.log('Updated Nacka experience with more unique, local details (sv/en).');
