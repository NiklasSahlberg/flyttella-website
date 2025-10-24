// Update FAQ section for huddinge with completely new questions
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ with completely new questions
svData.huddinge.faq.items = [
  { question: 'Vad gör Flyttella unik i Huddinge?', answer: 'Vi kombinerar djup lokalkännedom om Huddinges områden med över 8 års erfarenhet. Våra specialister förstår de specifika utmaningarna med flyttar i Flemingsberg, Segeltorp och Skogås – från grönområden till moderna bostadsområden.' },
  { question: 'Hur hanterar ni flyttar i områden med begränsad parkering?', answer: 'Vi planerar noggrant för områden med begränsad parkering genom att bedöma bärvägar, samordna lastplatser och anpassa bemanning. Vi samarbetar med lokala föreningar och kommunen för att säkra optimala förutsättningar.' },
  { question: 'Kan ni hantera flyttar till lägenheter med hiss?', answer: 'Ja, vi är experter på lägenhetsflyttar med hiss i Huddinge. Vi planerar för bokningsbara hissar, skyddar dörrposter och väggar, och synkar lastningen för att följa hissbokningsfönster.' },
  { question: 'Erbjuder ni flyttstädning för olika bostadstyper?', answer: 'Ja, vi erbjuder professionell flyttstädning för villor, radhus och lägenheter i Huddinge. Våra städare är vana vid områdets olika bostadstyper och föreningsregler, med 14 dagars garanti på allt arbete.' },
  { question: 'Hur långt i förväg ska jag boka flytt i Huddinge?', answer: 'Vi rekommenderar att boka minst 1-2 veckor i förväg, särskilt för lägenheter med bokningsbara hissar. Under högsäsong (maj-september) kan längre förväg vara nödvändigt för att säkra önskad flyttdag.' },
  { question: 'Kan ni hjälpa med packning av känsliga föremål?', answer: 'Ja, vi erbjuder specialiserad packning av känsliga föremål med professionella material. Våra team är vana vid olika föremål och packar säkert för transport – från konst till elektronik.' },
  { question: 'Vad ingår i er flyttgaranti?', answer: 'Vi garanterar punktlighet, skydd av möbler och transparenta priser. Om något går fel ersätter vi skador och löser problem snabbt. Vår städning har 14 dagars garanti och vi följer upp alla flyttar.' }
];

// Update English FAQ with completely new questions
enData.huddinge.faq.items = [
  { question: 'What makes Flyttella unique in Huddinge?', answer: 'We combine deep local knowledge of Huddinge\'s areas with over 8 years\' experience. Our specialists understand the specific challenges of moves in Flemingsberg, Segeltorp and Skogås – from green areas to modern residential areas.' },
  { question: 'How do you handle moves in areas with limited parking?', answer: 'We plan carefully for areas with limited parking by assessing access routes, coordinating loading spots and adapting crew size. We collaborate with local associations and the municipality to secure optimal conditions.' },
  { question: 'Can you handle moves to apartments with elevators?', answer: 'Yes, we are experts at apartment moves with elevators in Huddinge. We plan for bookable elevators, protect door frames and walls, and sync loading to follow elevator booking windows.' },
  { question: 'Do you offer move-out cleaning for different housing types?', answer: 'Yes, we offer professional move-out cleaning for houses, townhouses and apartments in Huddinge. Our cleaners are experienced with the area\'s different housing types and association rules, with 14-day guarantee on all work.' },
  { question: 'How far in advance should I book a move in Huddinge?', answer: 'We recommend booking at least 1-2 weeks in advance, especially for apartments with bookable elevators. During peak season (May-September) longer advance booking may be necessary to secure your preferred move date.' },
  { question: 'Can you help with packing delicate items?', answer: 'Yes, we offer specialised packing of delicate items with professional materials. Our teams are experienced with different items and pack safely for transport – from art to electronics.' },
  { question: 'What is included in your moving guarantee?', answer: 'We guarantee punctuality, furniture protection and transparent pricing. If something goes wrong we compensate for damages and solve problems quickly. Our cleaning has a 14-day guarantee and we follow up on all moves.' }
];

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated FAQ questions for huddinge with completely new questions in sv and en.');
