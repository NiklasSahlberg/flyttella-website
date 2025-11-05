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
    question: 'Hur fungerar flytt till nyproduktion i Kungsängen?',
    answer: 'Vi anpassar oss efter föreningens inflyttsrutiner: bokar hiss‑skydd/tidsfönster, följer besiktningsprotokoll och planerar bärvägar så att nya ytor skyddas. Vi samordnar nyckelutlämning med mäklare/entreprenör vid behov.'
  };
});

update(enPath, (d) => {
  const faq = d?.kungsangen?.faq;
  if (!faq || !Array.isArray(faq.items) || faq.items.length === 0) return;
  faq.items[0] = {
    question: 'How do you manage moves into new developments in Kungsängen?',
    answer: 'We follow the building/association move‑in routines: book elevator protection/time slots, comply with inspection notes and plan carry routes to protect new surfaces. We coordinate key handover with the agent/builder when needed.'
  };
});

console.log('Replaced first Kungsängen FAQ with a new nyproduktion‑focused question/answer (sv/en).');
