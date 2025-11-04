// Update FAQ section for haninge with unique questions
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ with unique questions
svData.haninge.faq.items = [
  { question: 'Varför välja Flyttella för flytt i Haninge?', answer: 'Vi är specialiserade på villaflyttar och radhusområden i Haninge med djup lokalkännedom. Våra konkurrensfördelar inkluderar transparenta priser, gratis flyttkartonger och 14 dagars städgaranti – perfekt för Haninges olika boendemiljöer.' },
  { question: 'Hur planerar ni flyttar i villakvarter i Haninge?', answer: 'Vi planerar noggrant för villakvarter med smala gator och begränsad parkering. Vi bedömer bärvägar, samordnar lastplatser och anpassar bemanning efter områdets specifika förutsättningar för en smidig flytt.' },
  { question: 'Kan ni hantera flyttar från radhusområden i Haninge?', answer: 'Ja, vi är experter på radhusflyttar i Västerhaninge och andra områden. Vi planerar för trånga trappor, begränsade lastplatser och föreningsregler – alltid med hänsyn till grannar och boendemiljö.' },
  { question: 'Erbjuder ni flyttstädning för villor i Haninge?', answer: 'Ja, vi erbjuder professionell flyttstädning för villor, radhus och lägenheter i Haninge. Våra städare är vana vid områdets olika bostadstyper och föreningsregler, med 14 dagars garanti på allt arbete.' },
  { question: 'Hur lång tid tar en flytt i Haninge?', answer: 'Flyttiden varierar efter boyta och avstånd. En villa i Handen tar vanligtvis 4-6 timmar, medan en lägenhet i Jordbro kan ta 2-4 timmar. Vi ger alltid realistiska tidsuppskattningar i offerten.' },
  { question: 'Kan ni hjälpa med packning inför flytt i Haninge?', answer: 'Ja, vi erbjuder komplett packningstjänst med professionella material. Våra team är vana vid Haninges olika bostadstyper och packar säkert för transport – från känsliga föremål till tunga möbler.' },
  { question: 'Vad kostar en flytt från villa till lägenhet i Haninge?', answer: 'Priset baseras på boyta, avstånd och extra tjänster. Vi ger alltid fasta priser utan dolda avgifter. Kontakta oss för en personlig offert baserad på dina specifika behov och flyttsträcka i Haninge.' }
];

// Update English FAQ with unique questions
enData.haninge.faq.items = [
  { question: 'Why choose Flyttella for moves in Haninge?', answer: 'We specialise in house moves and townhouse areas in Haninge with deep local knowledge. Our competitive advantages include transparent pricing, free moving boxes and 14-day cleaning guarantee – perfect for Haninge\'s different residential environments.' },
  { question: 'How do you plan moves in villa districts in Haninge?', answer: 'We plan carefully for villa districts with narrow streets and limited parking. We assess access routes, coordinate loading spots and adapt crew size to the area\'s specific conditions for a smooth move.' },
  { question: 'Can you handle moves from townhouse areas in Haninge?', answer: 'Yes, we are experts at townhouse moves in Västerhaninge and other areas. We plan for narrow staircases, limited loading spots and association rules – always with respect for neighbours and residential environment.' },
  { question: 'Do you offer move-out cleaning for houses in Haninge?', answer: 'Yes, we offer professional move-out cleaning for houses, townhouses and apartments in Haninge. Our cleaners are experienced with the area\'s different housing types and association rules, with 14-day guarantee on all work.' },
  { question: 'How long does a move in Haninge take?', answer: 'Move time varies by size and distance. A house in Handen usually takes 4-6 hours, while an apartment in Jordbro can take 2-4 hours. We always provide realistic time estimates in the quote.' },
  { question: 'Can you help with packing before a move in Haninge?', answer: 'Yes, we offer complete packing service with professional materials. Our teams are experienced with Haninge\'s different housing types and pack safely for transport – from delicate items to heavy furniture.' },
  { question: 'What does a move from house to apartment cost in Haninge?', answer: 'The price is based on size, distance and additional services. We always provide fixed prices with no hidden fees. Contact us for a personal quote based on your specific needs and move distance in Haninge.' }
];

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated unique FAQ questions for haninge in sv and en.');








