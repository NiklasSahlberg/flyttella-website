// Update FAQ section for hagersten with unique questions
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ
svData.hagersten.faq.items = [
  { question: 'Vad kostar en flytt i Hägersten?', answer: 'Priset baseras på boyta, våningsplan, avstånd och extra tjänster. Vi ger alltid fasta priser utan dolda avgifter. Kontakta oss för en personlig offert baserad på dina specifika behov i Hägersten.' },
  { question: 'Hur långt i förväg ska jag boka flytt i Hägersten?', answer: 'Vi rekommenderar att boka minst 1-2 veckor i förväg, särskilt för lägenheter med bokningsbara hissar. Under högsäsong (maj-september) kan längre förväg vara nödvändigt för att säkra önskad flyttdag.' },
  { question: 'Kan ni hjälpa till med packning i Hägersten?', answer: 'Ja, vi erbjuder komplett packningstjänst med professionella material. Våra team är vana vid olika bostadstyper i Hägersten och packar säkert för transport.' },
  { question: 'Vad händer om det regnar på flyttdagen?', answer: 'Vi har skydd för möbler och golv, och anpassar vår metodik efter väderförhållanden. Regn påverkar sällan flytten i Hägersten eftersom vi planerar för alla väderlekar.' },
  { question: 'Erbjuder ni flyttstädning i Hägersten?', answer: 'Ja, vi erbjuder professionell flyttstädning med 14 dagars garanti. Våra städare är vana vid Hägerstens olika bostadstyper och föreningsregler.' },
  { question: 'Kan ni hantera pianon och tunga möbler?', answer: 'Ja, vi har specialiserad utrustning för tunga lyft som pianon, säkerhetsdörrar och stora skåp. Vi planerar extra tid och bemanning för sådana flyttar i Hägersten.' },
  { question: 'Vad ingår i er flyttgaranti?', answer: 'Vi garanterar punktlighet, skydd av möbler och transparenta priser. Om något går fel ersätter vi skador och löser problem snabbt. Vår städning har 14 dagars garanti.' }
];

// Update English FAQ
enData.hagersten.faq.items = [
  { question: 'What does a move in Hägersten cost?', answer: 'The price is based on size, floor level, distance and additional services. We always provide fixed prices with no hidden fees. Contact us for a personal quote based on your specific needs in Hägersten.' },
  { question: 'How far in advance should I book a move in Hägersten?', answer: 'We recommend booking at least 1-2 weeks in advance, especially for apartments with bookable elevators. During peak season (May-September) longer advance booking may be necessary to secure your preferred move date.' },
  { question: 'Can you help with packing in Hägersten?', answer: 'Yes, we offer complete packing service with professional materials. Our teams are experienced with different housing types in Hägersten and pack safely for transport.' },
  { question: 'What happens if it rains on move day?', answer: 'We have protection for furniture and floors, and adapt our methods to weather conditions. Rain rarely affects moves in Hägersten as we plan for all weather conditions.' },
  { question: 'Do you offer move-out cleaning in Hägersten?', answer: 'Yes, we offer professional move-out cleaning with a 14-day guarantee. Our cleaners are experienced with Hägersten\'s different housing types and association rules.' },
  { question: 'Can you handle pianos and heavy furniture?', answer: 'Yes, we have specialised equipment for heavy lifts like pianos, safes and large cabinets. We plan extra time and crew for such moves in Hägersten.' },
  { question: 'What is included in your moving guarantee?', answer: 'We guarantee punctuality, furniture protection and transparent pricing. If something goes wrong we compensate for damages and solve problems quickly. Our cleaning has a 14-day guarantee.' }
];

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated unique FAQ questions for hagersten in sv and en.');


