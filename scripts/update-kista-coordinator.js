// Update Kista about section to change the coordinator phrasing
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish about section
svData.kista.about.desktop3 = 'Våra konkurrensfördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Vår dedikerade kundtjänst följer hela flyttprocessen och säkerställer att varje detalj är perfekt planerad för Kistas specifika förutsättningar.';

// Update English about section
enData.kista.about.desktop3 = 'Our competitive advantages include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Our dedicated customer service follows the entire moving process and ensures every detail is perfectly planned for Kista\'s specific conditions.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kista about section to change coordinator phrasing.');


