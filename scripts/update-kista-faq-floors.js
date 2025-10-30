// Update Kista FAQ question about high floors
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ question
svData.kista.faq.items[1].question = 'Kan ni hantera flyttar i höga byggnader i Kista?';
svData.kista.faq.items[1].answer = 'Ja, vi är vana vid höga byggnader i Kistas bostadsområden. Vi har erfarenhet av hissar, trappor och bärvägar i höga byggnader. Vi planerar extra tid och säkerställer säker transport av möbler mellan våningar.';

// Update English FAQ question
enData.kista.faq.items[1].question = 'Can you handle moves in tall buildings in Kista?';
enData.kista.faq.items[1].answer = 'Yes, we are used to tall buildings in Kista\'s residential areas. We have experience with elevators, stairs and access routes in tall buildings. We plan extra time and ensure safe transport of furniture between floors.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kista FAQ question about high floors to be more similar but different.');


