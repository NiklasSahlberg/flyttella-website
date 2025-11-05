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
  const k = d.kungsangen || (d.kungsangen = {});
  k.hero = k.hero || {};
  k.hero.title = 'Flyttfirma i Kungsängen – villor, radhus och moderna lägenheter';
  k.hero.subtitle = 'Lokal expertis i Kungsängen, Brunna och Tibble. Trygga flyttar med fasta priser, tydlig planering och smidiga upplägg för carport, samfällighetsregler och längre bärvägar.';

  k.about = k.about || {};
  k.about.title = 'Om Flyttella i Kungsängen';
  k.about.desktop = 'Vi hjälper hushåll i Kungsängen med flyttar som fungerar i praktiken: från radhuslängor i Brunna och villor i Tibble till nyare bostadsrätter nära centrum. Vi planerar bärvägar från carport/garage, synkar med samfälligheter och säkerställer att allt skyddsmaterial finns på plats.';
  k.about.desktop2 = 'På många adresser innebär flytten längre bärsträckor, nivåskillnader och begränsade lastytor – därför dimensionerar vi bemanning och fordon därefter. Du får fast pris, tydliga villkor och en kontaktperson som håller ihop planeringen från start till mål.';
  k.about.desktop3 = 'Vi erbjuder helhetslösningar: packhjälp, flyttstädning och korttidsmagasinering. Gratis flyttkartonger, flexibel om-/avbokning upp till 24 timmar innan och 14 dagars städgaranti ingår alltid.';
  k.about.mobile = 'Kungsängen‑specialister: villor, radhus och lägenheter – fasta priser och tydlig plan.';
  k.about.mobileExpanded = 'Vi planerar bärvägar från carport/garage, skyddar känsliga ytor och synkar med samfälligheter vid behov.';
  k.about.mobileExpanded2 = 'Helhetslösningar med packning, städning och magasinering. En kontaktperson följer hela processen.';

  k.awards = k.awards || {};
  k.awards.title = 'Utmärkelser och omdömen – Kungsängen';
  k.awards.description = 'Våra utmärkelser bygger på det vi gör bäst i villa‑ och radhusområden: punktlighet, välplanerad logistik och respekt för boendemiljön. Återkommande rekommendationer från kunder i Brunna, Tibble och Kungsängens centrum visar att vår metod fungerar – tydliga offerter, trygg hantering och leverans utan krångel.';

  k.faq = k.faq || {};
  k.faq.title = 'Vanliga frågor om flytt i Kungsängen';
  k.faq.items = [
    {
      question: 'Hur planerar ni flytt i radhusområden med samfällighet?',
      answer: 'Vi kontaktar samfälligheten vid behov, anpassar tider efter lokala regler och planerar bärvägar från carport/garage för att minska störningar. Vi skyddar entréer och gemensamma ytor.'
    },
    {
      question: 'Kan ni hjälpa vid längre bärvägar från parkering till bostad?',
      answer: 'Ja. Vi dimensionerar bemanning och utrustning (säckkärror, bärselar) för längre avstånd och nivåskillnader och planerar raster så att tempot hålls uppe utan att kompromissa med säkerheten.'
    },
    {
      question: 'Erbjuder ni magasinering mellan försäljning och inflytt?',
      answer: 'Absolut. Vi kan magasinera bohag kortare perioder och planera in del‑ eller helflytt vid tillträde. Allt dokumenteras så att inventarier hanteras spårbart.'
    },
    {
      question: 'Hur hanterar ni tunga lyft i suterränghus eller kedjehus?',
      answer: 'Vi gör en snabb genomgång av bärvägar, trappor och nivåskillnader och tar med rätt team och utrustning för tunga lyft (t.ex. piano, kassaskåp). Vid behov delas större möbler upp och skyddas extra.'
    },
    {
      question: 'Går det att boka kvälls- eller helgflytt i Kungsängen?',
      answer: 'Ja. Vi erbjuder flyttar utanför kontorstid och tar hänsyn till grannsamverkan och lokala ordningsregler. Vi kommunicerar tidigt om parkering och bärvägar för en smidig flytt.'
    }
  ];
});

update(enPath, (d) => {
  const k = d.kungsangen || (d.kungsangen = {});
  k.hero = k.hero || {};
  k.hero.title = 'Moving company in Kungsängen – houses, townhouses and modern apartments';
  k.hero.subtitle = 'Local expertise in Kungsängen, Brunna and Tibble. Secure moves with fixed pricing, clear planning and smart setups for carports, HOA rules and longer carry distances.';

  k.about = k.about || {};
  k.about.title = 'About Flyttella in Kungsängen';
  k.about.desktop = 'We help households in Kungsängen with moves that work in practice: from townhouse rows in Brunna and houses in Tibble to newer apartments near the centre. We plan routes from carport/garage, coordinate with associations and ensure all protection materials are in place.';
  k.about.desktop2 = 'Many addresses mean longer carry distances, level changes and limited loading spots — so we size crew and vehicles accordingly. You get a fixed price, clear terms and a single point of contact who keeps the plan together end‑to‑end.';
  k.about.desktop3 = 'We offer end‑to‑end options: packing help, move‑out cleaning and short‑term storage. Free moving boxes, flexible rebooking up to 24 hours before and a 14‑day cleaning guarantee are always included.';
  k.about.mobile = 'Kungsängen specialists: houses, townhouses and apartments — fixed prices with a clear plan.';
  k.about.mobileExpanded = 'We plan carry routes from carports/garages, protect sensitive surfaces and coordinate with associations when needed.';
  k.about.mobileExpanded2 = 'End‑to‑end options with packing, cleaning and storage. A coordinator follows the whole process.';

  k.awards = k.awards || {};
  k.awards.title = 'Awards and reviews – Kungsängen';
  k.awards.description = 'Our recognitions come from what we do best in house and townhouse areas: punctuality, well‑planned logistics and respect for the living environment. Returning recommendations from clients in Brunna, Tibble and central Kungsängen show the method works — clear quotes, careful handling and a no‑hassle delivery.';

  k.faq = k.faq || {};
  k.faq.title = 'Common questions about moving in Kungsängen';
  k.faq.items = [
    {
      question: 'How do you plan moves in townhouse areas with associations?',
      answer: 'We contact the association when needed, adjust timing to local rules and plan routes from carports/garages to reduce disturbance. Entrances and shared areas are protected.'
    },
    {
      question: 'Can you handle long carry distances from parking to the home?',
      answer: 'Yes. We size crew and equipment (dollies, carry straps) for longer distances and level changes and schedule breaks to keep pace without compromising safety.'
    },
    {
      question: 'Do you offer storage between sale and move‑in?',
      answer: 'Absolutely. We can store belongings for short periods and plan partial or full delivery at possession. Everything is documented so items are handled traceably.'
    },
    {
      question: 'How do you manage heavy lifts in split‑level or link‑detached houses?',
      answer: 'We quickly review carry routes, stairs and level changes and bring the right team and equipment for heavy lifts (e.g., piano, safe). Large furniture is disassembled and protected when needed.'
    },
    {
      question: 'Is evening or weekend moving available in Kungsängen?',
      answer: 'Yes. We offer moves outside office hours and respect neighbourhood cooperation and local rules. We communicate early about parking and routes for a smooth move.'
    }
  ];
});

console.log('Updated Kungsängen with unique hero, about, awards and FAQ (sv/en).');
