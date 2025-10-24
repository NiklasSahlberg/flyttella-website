// Update specific FAQ question for haninge
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ question
svData.haninge.faq.items[4] = { 
  question: 'Kan ni hantera flyttar till andra kommuner från Haninge?', 
  answer: 'Ja, vi erbjuder flyttar till hela Sverige från Haninge. Våra erfarna team planerar långväga transporter med hänsyn till väder, trafik och säkerhet. Vi ger alltid fasta priser även för flyttar utanför Stockholms län.' 
};

// Update English FAQ question
enData.haninge.faq.items[4] = { 
  question: 'Can you handle moves to other municipalities from Haninge?', 
  answer: 'Yes, we offer moves throughout Sweden from Haninge. Our experienced teams plan long-distance transport considering weather, traffic and safety. We always provide fixed prices even for moves outside Stockholm County.' 
};

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated FAQ question for haninge in sv and en.');