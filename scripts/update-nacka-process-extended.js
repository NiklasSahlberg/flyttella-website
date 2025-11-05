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
  n.process = n.process || {};
  n.process.fillForm = n.process.fillForm || 'Fyll i formuläret';
  n.process.fillFormDesc = 'Berätta kort om din flytt i Nacka – adress, våningsplan, lutning/uppfart, hiss och önskat datum.';
  n.process.quickQuote = n.process.quickQuote || 'Snabb offert';
  n.process.quickQuoteDesc = 'Du får en fast offert med 50% RUT‑avdrag och tydliga villkor. Vi dimensionerar team/fordon efter bärvägar och parkering.';
  n.process.signConfirm = n.process.signConfirm || 'Signera och bekräfta';
  n.process.signConfirmDesc = 'Du signerar digitalt och vi säkrar bokningen. Vi går igenom eventuella tidsfönster för att undvika köer på Värmdöleden.';
  n.process.personalContact = n.process.personalContact || 'Personlig kontakt';
  n.process.personalContactDesc = 'Din kontaktperson synkar parkering nära entré, planerar bärvägar i backe och ordnar hiss‑skydd vid behov. All kommunikation i god tid.';
  n.process.moveCompleted = n.process.moveCompleted || 'Flytt genomförd';
  n.process.moveCompletedDesc = 'Skydd av golv, trappor och glaspartier. Sekventiell lastning och effektiva bärkedjor för snabb och trygg avlastning.';
  n.process.satisfiedCustomer = n.process.satisfiedCustomer || 'Nöjd kund';
  n.process.satisfiedCustomerDesc = 'Genomgång på plats och uppföljning efteråt. Vi hjälper med eventuella efterjusteringar och tar ansvar hela vägen.';
});

update(enPath, (d) => {
  const n = d.nacka || (d.nacka = {});
  n.process = n.process || {};
  n.process.fillForm = n.process.fillForm || 'Fill out the form';
  n.process.fillFormDesc = 'Tell us about your move in Nacka — address, floor level, slope/driveway, elevator and preferred date.';
  n.process.quickQuote = n.process.quickQuote || 'Quick quote';
  n.process.quickQuoteDesc = 'You receive a fixed quote with 50% RUT deduction and clear terms. We size crew/vehicle to routes and parking.';
  n.process.signConfirm = n.process.signConfirm || 'Sign and confirm';
  n.process.signConfirmDesc = 'Sign digitally and we secure the booking. We align time windows to avoid queues on Värmdöleden.';
  n.process.personalContact = n.process.personalContact || 'Personal contact';
  n.process.personalContactDesc = 'Your coordinator syncs parking close to entry, plans routes on hills and arranges elevator protection when needed. Proactive communication.';
  n.process.moveCompleted = n.process.moveCompleted || 'Move completed';
  n.process.moveCompletedDesc = 'Protection for floors, stairs and glass. Sequenced loading and efficient carry chains for safe, fast unloading.';
  n.process.satisfiedCustomer = n.process.satisfiedCustomer || 'Satisfied customer';
  n.process.satisfiedCustomerDesc = 'On‑site walkthrough and follow‑up afterwards. We help with any post‑move adjustments and stay accountable end‑to‑end.';
});

console.log('Extended Nacka process steps with detailed, location‑specific descriptions (sv/en).');
