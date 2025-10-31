// Update jarfalla content to change the experience section phrasing
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish content to change the experience section phrasing
svData.jarfalla.experience.description = 'Med över 8000 genomförda flyttar och 7000 städningar har vi utvecklat en gedigen expertis inom flytt- och städningsbranschen. Vi har hjälpt kunder i Jakobsberg, Kallhäll och Viksjö med flyttar som kräver skräddarsydd planering för varje specifik situation.';

// Update English content to change the experience section phrasing
enData.jarfalla.experience.description = 'With over 8000 completed moves and 7000 cleanings we have developed solid expertise in the moving and cleaning industry. We have helped clients in Jakobsberg, Kallhäll and Viksjö with moves that require tailored planning for each specific situation.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated jarfalla content to change the experience section phrasing in sv and en.');



