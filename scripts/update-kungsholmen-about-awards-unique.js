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
  const k = data.kungsholmen;
  if (!k) return;

  if (k.about) {
    k.about.title = 'Om Flyttella på Kungsholmen';
    k.about.desktop = 'Vi är ett lokalt team med lång erfarenhet av innerstadsflyttar på Kungsholmen – från Norr Mälarstrand och Stadshagen till Kristineberg och Hornsberg. Vår styrka ligger i noggrann planering för hus med bevarade trapphus, innergårdar och tidsstyrda lastzoner. Målet är alltid samma: trygg hantering, god kommunikation och en lugn flyttdag.';
    k.about.desktop2 = 'Vi har hjälpt tusentals hushåll med allt från mindre lägenhetsflyttar till kompletta helhetslösningar med packning, städning och korttidsmagasinering. På Kungsholmen arbetar vi metodiskt: förbokar lastplats, synkar porttider med föreningen och sätter upp hiss‑skydd där det behövs. Du får fast pris, tydliga villkor och en kontaktperson som håller ihop allt.';
    k.about.desktop3 = 'Det som särskiljer oss här är vår innerstadsrutin – vi optimerar bärvägar via gårdsport, använder skydd för golv och väggar och tidsplanerar leveranser för minimal påverkan på grannar och boendemiljö. Flexibel om‑/avbokning till 24 timmar innan, kostnadsfria flyttkartonger och 14 dagars städgaranti ingår.';
    k.about.mobile = 'Kungsholmen‑specialister: smidiga innerstadsflyttar med fast pris, tydliga villkor och personlig plan.';
    k.about.mobileExpanded = 'Vi synkar lastzoner, gårdsport och hiss‑skydd. Skyddar känsliga ytor och planerar bärvägar för sekelskifteshus och nyproduktion.';
    k.about.mobileExpanded2 = 'Helhetslösningar med packning, städning och magasinering. Kontaktperson följer hela vägen.';
  }

  if (k.awards) {
    k.awards.title = 'Utmärkelser och omdömen – Kungsholmen';
    k.awards.description = 'Våra utmärkelser speglar det vi gör bäst i innerstan: precisa tidsfönster, välplanerad logistik och varsam hantering i trånga miljöer. Rekommendationer från återkommande kunder på Norr Mälarstrand, Hornsberg och Kristineberg visar att vår metod fungerar – punktliga leveranser, tydliga offerter och ett respektfullt bemötande i varje trapphus.';
  }
});

updateJson(enPath, (data) => {
  const k = data.kungsholmen;
  if (!k) return;

  if (k.about) {
    k.about.title = 'About Flyttella in Kungsholmen';
    k.about.desktop = 'We are a local team with long experience of inner‑city moves in Kungsholmen – from Norr Mälarstrand and Stadshagen to Kristineberg and Hornsberg. Our strength is meticulous planning for preserved stairwells, courtyards and timed loading zones. The goal is always the same: careful handling, clear communication and a calm moving day.';
    k.about.desktop2 = 'We have helped thousands of households with everything from small apartment moves to complete end‑to‑end solutions with packing, cleaning and short‑term storage. In Kungsholmen we work methodically: pre‑book loading space, sync entry times with the association and install elevator protection when needed. You get a fixed price, clear terms and a single point of contact.';
    k.about.desktop3 = 'What sets us apart here is our inner‑city routine — we optimise carry routes via courtyard gates, protect floors and walls, and time deliveries to minimise disturbance to neighbours. Flexible rebooking up to 24 hours before, free moving boxes and a 14‑day cleaning guarantee are included.';
    k.about.mobile = 'Kungsholmen specialists: smooth inner‑city moves with fixed pricing, clear terms and a personal plan.';
    k.about.mobileExpanded = 'We coordinate loading zones, courtyard access and elevator protection. We protect sensitive surfaces and plan carry routes for both historic and modern buildings.';
    k.about.mobileExpanded2 = 'End‑to‑end options with packing, cleaning and storage. A coordinator follows the whole process.';
  }

  if (k.awards) {
    k.awards.title = 'Awards and reviews – Kungsholmen';
    k.awards.description = 'Our recognitions reflect what we do best in the inner city: precise time windows, well‑planned logistics and careful handling in tight settings. Recommendations from returning clients along Norr Mälarstrand, Hornsberg and Kristineberg show our method works — punctual delivery, clear quotes and respectful conduct in every stairwell.';
  }
});

console.log('Updated Kungsholmen about and awards sections with unique inner‑city content (sv/en).');
