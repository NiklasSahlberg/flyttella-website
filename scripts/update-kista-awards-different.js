// Update Kista awards section to be completely different and unique
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish awards section with completely different approach
svData.kista.awards.description = 'Genom åren har vi blivit erkända för vår expertis inom flyttar i Kista. Våra utmärkelser reflekterar vår specialisering på områdets unika utmaningar – från IT-företagens kontor till bostadsområden med sina specifika regler. Dessa utmärkelser bekräftar vår position som Kistas mest pålitliga flyttfirma med djup lokalkännedom.';

// Update English awards section with completely different approach
enData.kista.awards.description = 'Over the years we have been recognized for our expertise in moves in Kista. Our awards reflect our specialization in the area\'s unique challenges – from IT companies\' offices to residential areas with their specific rules. These awards confirm our position as Kista\'s most reliable moving company with deep local knowledge.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kista awards section to be completely different and unique.');


