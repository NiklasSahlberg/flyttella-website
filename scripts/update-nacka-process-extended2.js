const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function update(filePath, fn) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  fn(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

update(svPath, (d) => {
  const n = d.nacka || (d.nacka = {});
  n.processSection = n.processSection || {};
  n.processSection.description = 'Våra offerter i Nacka baseras på faktiska förutsättningar: boyta, våningsplan, hiss/trappa, bärvägar i backe och parkering nära entré. Vid behov gör vi kostnadsfri besiktning på plats. Vi dimensionerar rätt bemanning och fordon, väljer tidsfönster som undviker rusning på Värmdöleden och beskriver exakt vad som ingår – inga överraskningar.';

  n.process = n.process || {};
  n.process.fillFormDesc = 'Berätta om adress, våningsplan och om det finns lutning/uppfart, portkod och hiss. Ange om det är vindsvåning, radhus eller villa. Lägg gärna till önskat datum och om du vill ha packhjälp, magasinering eller flyttstädning.';
  n.process.quickQuoteDesc = 'Du får en tydlig offert med fast pris och 50% RUT‑avdrag. Vi räknar på bärsträckor, nivåskillnader och parkeringsmöjligheter, och föreslår ett upplägg som minimerar bärtiden. Offerten innehåller tydliga tider, villkor och vad som ingår.';
  n.process.signConfirmDesc = 'När du signerat säkrar vi bokningen och lägger upp en detaljerad plan. Vi reserverar tidsfönster som undviker köer, stämmer av eventuella bygg- eller föreningsregler och bekräftar lastplats/parkering i god tid innan flyttdagen.';
  n.process.personalContactDesc = 'Din kontaktperson går igenom bärvägar i backe, ordnar hiss‑skydd där det behövs och säkerställer att skyddsmaterial finns på plats. Vi synkar tider med dig och planerar ordningen: vad som lastas först/sist för snabb avlastning i rätt rum.';
  n.process.moveCompletedDesc = 'På flyttdagen skyddar vi golv, trappor och glaspartier, sätter upp skydd där det behövs och skapar effektiva bärkedjor. Vi arbetar sekventiellt (det som ska in sist lastas först), håller dig uppdaterad längs vägen och anpassar oss vid oväntade hinder.';
  n.process.satisfiedCustomerDesc = 'Efter avlastning gör vi en gemensam genomgång. Behövs finjusteringar, bär vi om. Vi följer upp efteråt, och om du valt städning/magasinering säkerställer vi att allt matchar planen. Målet är en lugn, förutsägbar flytt utan stress.';
});

update(enPath, (d) => {
  const n = d.nacka || (d.nacka = {});
  n.processSection = n.processSection || {};
  n.processSection.description = 'Our quotes in Nacka are based on real conditions: size, floor level, elevator/stairs, routes on slopes and parking close to entry. We offer a free on‑site inspection when needed. We size the right crew and vehicle, pick time windows that avoid Värmdöleden rush and spell out exactly what is included — no surprises.';

  n.process = n.process || {};
  n.process.fillFormDesc = 'Tell us the address, floor level, any slope/driveway, entry code and elevator. Note if it is an attic apartment, townhouse or house. Add your preferred date and whether you want packing, storage or move‑out cleaning.';
  n.process.quickQuoteDesc = 'You receive a clear fixed‑price quote with 50% RUT deduction. We account for carry distances, level changes and parking, and propose a setup that minimises carry time. The quote includes precise timing, terms and inclusions.';
  n.process.signConfirmDesc = 'Once signed, we secure the booking and create a detailed plan. We reserve time windows to avoid queues, check any building/association rules and confirm the loading spot/parking well before move day.';
  n.process.personalContactDesc = 'Your coordinator reviews routes on slopes, arranges elevator protection where needed and ensures protective materials are on site. We sync timing with you and plan the sequence — what is loaded first/last for fast room‑by‑room unloading.';
  n.process.moveCompletedDesc = 'On move day we protect floors, stairs and glass, install protection where needed and set up efficient carry chains. We work sequentially (last in, first out), keep you updated and adapt to any unexpected obstacles.';
  n.process.satisfiedCustomerDesc = 'After unloading we do a joint walkthrough. Need fine‑tuning? We reposition items. We follow up afterwards, and if you chose cleaning/storage we confirm everything matches the plan. The goal: a calm, predictable move without stress.';
});

console.log('Further extended Nacka process copy to match Kungsholmen length (sv/en).');

