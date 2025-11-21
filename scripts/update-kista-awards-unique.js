// Update Kista awards section to be more unique
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish awards section
svData.kista.awards.description = 'Våra utmärkelser bekräftar vår position som Kistas mest betrodda flyttfirma. Särskilt stolta är vi över våra återkommande kunder i Akalla och Husby, som visar på den höga kvalitet och det förtroende vi byggt upp över tid.';

// Update English awards section
enData.kista.awards.description = 'Our awards confirm our position as Kista\'s most reliable moving company. We are particularly proud of our returning customers in Akalla and Husby, who demonstrate the high quality and trust we have built over time.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kista awards section to be more unique.');










