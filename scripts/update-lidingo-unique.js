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
  const k = d.lidingo || (d.lidingo = {});
  k.hero = k.hero || {};
  k.hero.title = 'Flyttfirma på Lidingö – villor vid vattnet och moderna bostäder';
  k.hero.subtitle = 'Erfarenhet från Gåshaga, Herserud, Baggeby, Dalénum och Elfvik. Trygga flyttar med fasta priser, planering för backiga tomter, känsliga ytor och smart logistik över Lidingöbron.';

  k.about = k.about || {};
  k.about.title = 'Om Flyttella på Lidingö';
  k.about.desktop = 'Vi genomför flyttar på Lidingö med respekt för boendemiljö och fastigheter – från sjönära villor i Gåshaga och Herserud till nyproduktion i Dalénum och lägenheter i Baggeby. Vi planerar bärvägar för sluttande uppfarter, begränsade vändytor och skyddar golv, trappor och glaspartier.';
  k.about.desktop2 = 'Varje uppdrag dimensioneras efter tomtens/lägenhetens förutsättningar: längre bärsträckor, nivåskillnader och parkeringslösningar nära Lidingöbron. Du får fast pris, tydliga villkor och en kontaktperson som koordinerar allt från offert till inflytt.';
  k.about.desktop3 = 'Helhetslösningar ingår vid behov – packhjälp, flyttstädning och korttidsmagasinering. Gratis flyttkartonger, flexibel om-/avbokning upp till 24 timmar innan samt 14 dagars städgaranti.';
  k.about.mobile = 'Lidingö‑specialister: villor, radhus och lägenheter – fast pris och tydlig plan.';
  k.about.mobileExpanded = 'Vi skyddar känsliga ytor, planerar bärvägar i sluttningar och synkar tider för smidig logistik över bron.';
  k.about.mobileExpanded2 = 'Packning, städning och magasinering som komplement. En kontaktperson följer hela processen.';

  k.awards = k.awards || {};
  k.awards.title = 'Utmärkelser och omdömen – Lidingö';
  k.awards.description = 'Våra utmärkelser speglar vår styrka på Lidingö: punktliga leveranser, välplanerade bärvägar och hänsynsfull hantering i villamiljö. Rekommendationer från kunder i Gåshaga, Herserud och Dalénum visar att vår metod fungerar – tydliga offerter, skyddade ytor och en lugn flyttdag.';

  k.faq = k.faq || {};
  k.faq.title = 'Vanliga frågor om flytt på Lidingö';
  k.faq.items = [
    {
      question: 'Hur hanterar ni flytt till sjönära villor med sluttande uppfart?',
      answer: 'Vi gör en snabb genomgång av bärvägar, lutning och vändytor och tar med rätt utrustning (ramper, bärselar, skyddsmaterial). Vi planerar lastning för att minimera gångsträckor och skyddar golv och glaspartier.'
    },
    {
      question: 'Kan ni samordna flytt med känsliga föremål (t.ex. konst eller glas)?',
      answer: 'Ja. Vi packar och märker ömtåliga föremål separat, använder extra skydd och dedikerad zon i bilen. Vid behov kör vi dem i ett eget lass eller först i ordning för att minska risk.'
    },
    {
      question: 'Hur planerar ni logistik över Lidingöbron vid högtrafik?',
      answer: 'Vi väljer tidsfönster utanför rusning, planerar rutt/parkering i god tid och håller buffert för eventuella köer. Detta säkerställer punktliga leveranser och en lugn flyttdag.'
    },
    {
      question: 'Erbjuder ni magasinering mellan försäljning och inflytt på Lidingö?',
      answer: 'Absolut. Vi erbjuder korttidsmagasinering och kan dela upp flytten (del‑/helflytt) efter tillträde. All hantering dokumenteras för spårbarhet.'
    },
    {
      question: 'Går det att boka flytt kvällstid eller helg på Lidingö?',
      answer: 'Ja. Vi genomför flyttar utanför kontorstid med hänsyn till grannar och lokala ordningsregler. Vi kommunicerar tidigt om parkering och bärvägar.'
    }
  ];
});

update(enPath, (d) => {
  const k = d.lidingo || (d.lidingo = {});
  k.hero = k.hero || {};
  k.hero.title = 'Moving company in Lidingö – waterfront villas and modern homes';
  k.hero.subtitle = 'Experience in Gåshaga, Herserud, Baggeby, Dalénum and Elfvik. Secure moves with fixed pricing, planning for sloped driveways, delicate surfaces and smart logistics over Lidingö Bridge.';

  k.about = k.about || {};
  k.about.title = 'About Flyttella in Lidingö';
  k.about.desktop = 'We perform moves in Lidingö with respect for homes and surroundings — from waterfront villas in Gåshaga and Herserud to new developments in Dalénum and apartments in Baggeby. We plan routes for slopes, limited turning space and protect floors, stairs and glass sections.';
  k.about.desktop2 = 'Each job is sized to the property’s conditions: longer carry distances, level changes and parking solutions close to Lidingö Bridge. You get a fixed price, clear terms and a single contact who coordinates everything from quote to move‑in.';
  k.about.desktop3 = 'End‑to‑end options when needed — packing assistance, move‑out cleaning and short‑term storage. Free moving boxes, flexible rebooking up to 24 hours prior and a 14‑day cleaning guarantee.';
  k.about.mobile = 'Lidingö specialists: villas, townhouses and apartments — fixed price and a clear plan.';
  k.about.mobileExpanded = 'We protect sensitive surfaces, plan routes on slopes and coordinate timing for smooth bridge logistics.';
  k.about.mobileExpanded2 = 'Packing, cleaning and storage as add‑ons. One coordinator follows the whole process.';

  k.awards = k.awards || {};
  k.awards.title = 'Awards and reviews – Lidingö';
  k.awards.description = 'Our recognitions reflect our strengths in Lidingö: punctual delivery, well‑planned carry routes and considerate handling in residential environments. Recommendations from clients in Gåshaga, Herserud and Dalénum show the method works — clear quotes, protected surfaces and a calm moving day.';

  k.faq = k.faq || {};
  k.faq.title = 'Common questions about moving in Lidingö';
  k.faq.items = [
    {
      question: 'How do you manage moves to waterfront villas with sloped driveways?',
      answer: 'We assess routes, slope and turning space and bring the right equipment (ramps, carry straps, protection). Loading is planned to minimise carry distances and surfaces like floors and glass are protected.'
    },
    {
      question: 'Can you coordinate moves involving delicate items (e.g., art or glass)?',
      answer: 'Yes. We pack and label fragile items separately, use extra protection and assign a dedicated space in the truck. When needed we move them in a separate run or first in sequence to reduce risk.'
    },
    {
      question: 'How do you plan logistics over Lidingö Bridge during peak hours?',
      answer: 'We target off‑peak time slots, plan route/parking in advance and keep a buffer for potential queues. This ensures punctual delivery and a calm moving day.'
    },
    {
      question: 'Do you offer storage between sale and move‑in in Lidingö?',
      answer: 'Absolutely. We provide short‑term storage and can split the move (partial/full) according to possession dates. All handling is documented for traceability.'
    },
    {
      question: 'Can I book evening or weekend moving in Lidingö?',
      answer: 'Yes. We perform moves outside office hours with respect for neighbours and local rules. We communicate early about parking and routes.'
    }
  ];
});

console.log('Updated Lidingö with unique hero, about, awards and FAQ (sv/en).');

