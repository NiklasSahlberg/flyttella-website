// Update jarfalla FAQ question to change "stora" to just "tunga möbler"
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ question
svData.jarfalla.faq.items[1] = { 
  question: 'Kan ni hantera flyttar med tunga möbler?', 
  answer: 'Ja, vi är experter på flyttar med tunga möbler i Järfälla. Vi har specialiserad utrustning för tunga lyft som pianon, säkerhetsdörrar och stora skåp. Vi planerar extra tid och bemanning för sådana flyttar och säkerställer säker transport.' 
};

// Update English FAQ question
enData.jarfalla.faq.items[1] = { 
  question: 'Can you handle moves with heavy furniture?', 
  answer: 'Yes, we are experts at moves with heavy furniture in Järfälla. We have specialised equipment for heavy lifts like pianos, safes and large cabinets. We plan extra time and crew for such moves and ensure safe transport.' 
};

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated jarfalla FAQ question to change "stora" to just "tunga möbler" in sv and en.');









