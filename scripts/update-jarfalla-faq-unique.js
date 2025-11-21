// Update FAQ section for jarfalla with completely unique questions
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ with completely unique questions
svData.jarfalla.faq.items = [
  { question: 'Vad gör Flyttella till den bästa flyttfirman i Järfälla?', answer: 'Vi kombinerar över 5 års erfarenhet med djup lokalkännedom om Järfällas områden. Våra specialister förstår de specifika utmaningarna med flyttar i Jakobsberg, Kallhäll och Viksjö – från villakvarter till moderna bostadsområden.' },
  { question: 'Hur hanterar ni flyttar i områden med trånga gator?', answer: 'Vi planerar noggrant för områden med trånga gator genom att bedöma bärvägar, använda mindre fordon och samordna med grannar. Vi har erfarenhet av Järfällas olika gatunät och anpassar vår metodik efter områdets specifika förutsättningar.' },
  { question: 'Kan ni hantera flyttar med känsliga och värdefulla föremål?', answer: 'Ja, vi är experter på flyttar med känsliga och värdefulla föremål i Järfälla. Vi har specialiserad utrustning och material för säker transport av konst, antikviteter och elektronik – alltid med extra försiktighet.' },
  { question: 'Erbjuder ni flyttstädning för olika bostadstyper?', answer: 'Ja, vi erbjuder professionell flyttstädning för villor, radhus och lägenheter i Järfälla. Våra städare är vana vid områdets olika bostadstyper och föreningsregler, med 14 dagars garanti på allt arbete.' },
  { question: 'Kan ni hantera flyttar under helger och kvällar?', answer: 'Ja, vi erbjuder flyttar även under helger och kvällar i Järfälla. Vi planerar extra tid för dessa flyttar och tar hänsyn till områdets tysthetsregler och parkeringsbestämmelser för en smidig genomförande.' },
  { question: 'Kan ni hjälpa med packning av känsliga föremål?', answer: 'Ja, vi erbjuder specialiserad packning av känsliga föremål med professionella material. Våra team är vana vid olika föremål och packar säkert för transport – från konst till elektronik.' },
  { question: 'Vad ingår i er flyttgaranti?', answer: 'Vi garanterar punktlighet, skydd av möbler och transparenta priser. Om något går fel ersätter vi skador och löser problem snabbt. Vår städning har 14 dagars garanti och vi följer upp alla flyttar.' }
];

// Update English FAQ with completely unique questions
enData.jarfalla.faq.items = [
  { question: 'What makes Flyttella the best moving company in Järfälla?', answer: 'We combine over 5 years experience with deep local knowledge of Järfälla\'s areas. Our specialists understand the specific challenges of moves in Jakobsberg, Kallhäll and Viksjö – from villa districts to modern residential areas.' },
  { question: 'How do you handle moves in areas with narrow streets?', answer: 'We plan carefully for areas with narrow streets by assessing access routes, using smaller vehicles and coordinating with neighbours. We have experience with Järfälla\'s different street networks and adapt our methods to the area\'s specific conditions.' },
  { question: 'Can you handle moves with delicate and valuable items?', answer: 'Yes, we are experts at moves with delicate and valuable items in Järfälla. We have specialised equipment and materials for safe transport of art, antiques and electronics – always with extra care.' },
  { question: 'Do you offer move-out cleaning for different housing types?', answer: 'Yes, we offer professional move-out cleaning for houses, townhouses and apartments in Järfälla. Our cleaners are experienced with the area\'s different housing types and association rules, with 14-day guarantee on all work.' },
  { question: 'Can you handle moves during weekends and evenings?', answer: 'Yes, we offer moves even during weekends and evenings in Järfälla. We plan extra time for these moves and consider the area\'s noise regulations and parking rules for smooth execution.' },
  { question: 'Can you help with packing delicate items?', answer: 'Yes, we offer specialised packing of delicate items with professional materials. Our teams are experienced with different items and pack safely for transport – from art to electronics.' },
  { question: 'What is included in your moving guarantee?', answer: 'We guarantee punctuality, furniture protection and transparent pricing. If something goes wrong we compensate for damages and solve problems quickly. Our cleaning has a 14-day guarantee and we follow up on all moves.' }
];

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated FAQ questions for jarfalla with completely unique questions in sv and en.');










