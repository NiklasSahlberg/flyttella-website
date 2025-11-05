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
  const ns = d.marsta || (d.marsta = {});
  ns.faq = ns.faq || {};
  ns.faq.title = ns.faq.title || 'Vanliga frågor om flytt i Märsta';
  ns.faq.items = [
    {
      question: 'Hur planerar ni flyttar nära Arlanda för att undvika trafiktoppar?',
      answer: 'Vi lägger in tidsfönster utanför morgon- och eftermiddagsrusning samt justerar rutt för att undvika köer vid Arlanda/Arlandastad. Detta ger punktliga ankomster och en lugnare flyttdag.'
    },
    {
      question: 'Kan ni samordna flytt med extra stopp, till exempel förråd i Arlandastad?',
      answer: 'Ja. Vi planerar flera stopp med sekventiell lastning (det som ska in sist lastas först), märker allt tydligt och reserverar extra tid så att avlastningen går snabbt på slutadressen.'
    },
    {
      question: 'Hur gör ni vid vinterväder med snö och halka i Märsta?',
      answer: 'Vi tar med halkskydd, ramper och extra skyddsmaterial. Bärvägar saltas/sandas vid behov och vi planerar buffert för att hålla tidplanen även vid kyla och halka.'
    },
    {
      question: 'Flytt till nyproduktion i Steninge – vad behöver jag tänka på?',
      answer: 'Vi följer inflyttsrutiner, bokar hiss‑skydd/tidsfönster och skyddar känsliga ytor. Vid behov samordnar vi nyckelöverlämning med mäklare/entreprenör för smidig inflytt.'
    },
    {
      question: 'Hur hanterar ni långa bärvägar från markparkering i Valsta?',
      answer: 'Vi dimensionerar bemanning och utrustning (säckkärror/bärselar) efter avstånd och nivåskillnader. Vi delar upp lasten och märker rum för rum för att minimera onödiga lyft.'
    },
    {
      question: 'Kan ni hjälpa till med tunga lyft i kedjehus eller suterränghus i Rosersberg?',
      answer: 'Ja. Vi gör en snabb genomgång av trappor/bärvägar, tar med rätt team och lyfthjälpmedel och demonterar större möbler vid behov för säker transport.'
    }
  ];
});

update(enPath, (d) => {
  const ns = d.marsta || (d.marsta = {});
  ns.faq = ns.faq || {};
  ns.faq.title = ns.faq.title || 'Common questions about moving in Märsta';
  ns.faq.items = [
    {
      question: 'How do you plan moves near Arlanda to avoid traffic peaks?',
      answer: 'We schedule off‑peak time windows and adjust routes to avoid queues around Arlanda/Arlandastad. This keeps arrivals punctual and the day calmer.'
    },
    {
      question: 'Can you coordinate a move with extra stops, e.g., a storage unit in Arlandastad?',
      answer: 'Yes. We plan multi‑stop routes with sequenced loading (what goes in last is loaded first), label everything clearly and reserve time so unloading is fast at the final address.'
    },
    {
      question: 'What happens in winter conditions with snow and ice in Märsta?',
      answer: 'We bring anti‑slip gear, ramps and extra protection. Routes are salted/sanded as needed and we plan buffers to keep the schedule even in cold and slippery conditions.'
    },
    {
      question: 'Moving into new developments in Steninge — what should I prepare?',
      answer: 'We follow move‑in routines, book elevator protection/time slots and protect delicate surfaces. We can coordinate key handover with the agent/builder for a smooth move‑in.'
    },
    {
      question: 'How do you handle long carry distances from ground parking in Valsta?',
      answer: 'We size crew and equipment (dollies/carry straps) for distance and level changes, split loads and label by room to minimise unnecessary lifts.'
    },
    {
      question: 'Can you help with heavy lifts in link‑detached or split‑level homes in Rosersberg?',
      answer: 'Yes. We assess stairs/routes, bring the right team and lifting aids, and disassemble large furniture when needed for safe transport.'
    }
  ];
});

console.log('Updated Märsta FAQ with unique, location‑specific questions (sv/en).');
