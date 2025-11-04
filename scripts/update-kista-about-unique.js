// Update Kista about section to be more unique
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish about section
svData.kista.about.desktop2 = 'Mer än 8 000 framgångsrika flyttar har gjort oss till en betrodd partner för både privatpersoner och företag i Kista. Vår transparenta prissättning och tydliga kommunikation gör att du alltid vet vad som ingår. Varje flytt skräddarsys efter Kistas unika karaktär – från IT-företagens kontor till moderna bostadsområden med sina specifika regler och förutsättningar.';

// Update English about section
enData.kista.about.desktop2 = 'More than 8,000 successful moves have made us a trusted partner for both individuals and businesses in Kista. Our transparent pricing and clear communication means you always know what\'s included. Every move is tailored to Kista\'s unique character – from IT companies\' offices to modern residential areas with their specific rules and conditions.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kista about section to be more unique and distinctive.');








