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
  const faq = d?.kungsangen?.faq;
  if (!faq || !Array.isArray(faq.items) || faq.items.length === 0) return;
  faq.items[0] = {
    question: 'Hur löser ni flyttar med flera stopp i Kungsängen (t.ex. förråd)?',
    answer: 'Vi planerar rutt och tidsfönster så att hämtning från förråd/garage eller extra adress sker effektivt. Last ordnas sekventiellt (det som ska in sist lastas först) och allt märks upp för snabb avlastning på rätt plats.'
  };
});

update(enPath, (d) => {
  const faq = d?.kungsangen?.faq;
  if (!faq || !Array.isArray(faq.items) || faq.items.length === 0) return;
  faq.items[0] = {
    question: 'How do you handle moves with multiple stops in Kungsängen (e.g., storage)?',
    answer: 'We plan routes and time windows so pick‑ups from storage/garage or an extra address are efficient. Loading is sequenced (what goes in last is loaded first) and everything is labeled for quick unloading to the right room.'
  };
});

console.log('Replaced first Kungsängen FAQ with a unique multi‑stop move question/answer (sv/en).');

