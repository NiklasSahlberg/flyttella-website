// Update specific FAQ questions for huddinge
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish FAQ questions (items 4 and 2)
svData.huddinge.faq.items[4] = { 
  question: 'Kan ni hantera flyttar under helger och kvällar?', 
  answer: 'Ja, vi erbjuder flyttar även under helger och kvällar i Huddinge. Vi planerar extra tid för dessa flyttar och tar hänsyn till områdets tysthetsregler och parkeringsbestämmelser för en smidig genomförande.' 
};

svData.huddinge.faq.items[2] = { 
  question: 'Hur löser ni flyttar i områden med smala gator?', 
  answer: 'Vi planerar noggrant för områden med smala gator genom att bedöma bärvägar, använda mindre fordon och samordna med grannar. Vi har erfarenhet av Huddinges olika gatunät och anpassar vår metodik efter områdets specifika förutsättningar.' 
};

// Update English FAQ questions (items 4 and 2)
enData.huddinge.faq.items[4] = { 
  question: 'Can you handle moves during weekends and evenings?', 
  answer: 'Yes, we offer moves even during weekends and evenings in Huddinge. We plan extra time for these moves and consider the area\'s noise regulations and parking rules for smooth execution.' 
};

enData.huddinge.faq.items[2] = { 
  question: 'How do you handle moves in areas with narrow streets?', 
  answer: 'We plan carefully for areas with narrow streets by assessing access routes, using smaller vehicles and coordinating with neighbours. We have experience with Huddinge\'s different street networks and adapt our methods to the area\'s specific conditions.' 
};

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated specific FAQ questions for huddinge in sv and en.');









