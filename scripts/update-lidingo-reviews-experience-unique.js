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
  const k = d.lidingo;
  if (!k) return;
  // Reviews section uniqueness
  if (k.reviews) {
    k.reviews.subtitle = 'Rekommenderad flyttfirma på Lidingö';
    k.reviews.description = 'Kunder i Gåshaga, Herserud och Dalénum lyfter vår noggranna planering för sluttande uppfarter, begränsade vändytor och glasrika interiörer. Vi bokar rätt tidsfönster, skyddar ytor och levererar punktligt – vilket syns i våra återkommande omdömen.';
    k.reviews.badgeAlt = 'Rekommenderad flyttfirma Lidingö';
    k.reviews.arrowText = 'Läs fler omdömen från Lidingö';
  }
  if (k.customerReviews) {
    k.customerReviews.title = 'Vad tycker våra kunder om oss?';
  }
  // Experience section uniqueness
  if (k.experience) {
    k.experience.title = 'Vår erfarenhet av flyttar på Lidingö';
    k.experience.description = 'Över 8 000 flyttar – många i sjönära villor och moderna bostäder. Vi har en beprövad metod för branta uppfarter, längre bärsträckor och logistik över Lidingöbron, vilket ger en trygg och effektiv flyttdag.';
    k.experience.expanded = '1000+ verifierade omdömen bekräftar vår kvalitet. På Lidingö arbetar vi med tydliga tidsfönster, skydd av golv och glaspartier och sekventiell lastning för att minimera risker. Resultatet är punktliga leveranser och hög kundnöjdhet.';
  }
});

update(enPath, (d) => {
  const k = d.lidingo;
  if (!k) return;
  // Reviews section uniqueness
  if (k.reviews) {
    k.reviews.subtitle = 'Recommended moving company in Lidingö';
    k.reviews.description = 'Clients in Gåshaga, Herserud and Dalénum highlight our precise planning for sloped driveways, limited turning space and glass‑rich interiors. We book the right time slots, protect surfaces and deliver on time — reflected in our consistent reviews.';
    k.reviews.badgeAlt = 'Recommended mover Lidingö';
    k.reviews.arrowText = 'Read more Lidingö reviews';
  }
  if (k.customerReviews) {
    k.customerReviews.title = 'What do our customers say?';
  }
  // Experience section uniqueness
  if (k.experience) {
    k.experience.title = 'Our experience with moves in Lidingö';
    k.experience.description = 'Over 8,000 moves — many in waterfront villas and modern developments. We use a proven method for steep driveways, longer carry distances and logistics over Lidingö Bridge, resulting in a safe and efficient move day.';
    k.experience.expanded = '1000+ verified reviews confirm our quality. In Lidingö we work with precise time windows, protection for floors and glass sections, and sequenced loading to reduce risk. The outcome is punctual delivery and high customer satisfaction.';
  }
});

console.log('Updated Lidingö reviews and experience with unique, location-specific content (sv/en).');
