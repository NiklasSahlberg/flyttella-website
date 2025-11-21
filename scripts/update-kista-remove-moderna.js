// Update Kista content to remove "moderna" and just use "bostadsområden"
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish content
svData.kista.about.desktop2 = svData.kista.about.desktop2.replace('moderna bostadsområden', 'bostadsområden');
svData.kista.about.mobileExpanded = svData.kista.about.mobileExpanded.replace('moderna områden', 'områden');
svData.kista.processSection.description = svData.kista.processSection.description.replace('moderna bostadsområden', 'bostadsområden');
svData.kista.experience.expanded = svData.kista.experience.expanded.replace('moderna bostadsområden', 'bostadsområden');
svData.kista.faq.items[0].answer = svData.kista.faq.items[0].answer.replace('moderna bostadsområden', 'bostadsområden');

// Update English content
enData.kista.about.desktop2 = enData.kista.about.desktop2.replace('modern residential areas', 'residential areas');
enData.kista.about.mobileExpanded = enData.kista.about.mobileExpanded.replace('modern areas', 'areas');
enData.kista.processSection.description = enData.kista.processSection.description.replace('modern residential areas', 'residential areas');
enData.kista.experience.expanded = enData.kista.experience.expanded.replace('modern residential areas', 'residential areas');
enData.kista.faq.items[0].answer = enData.kista.faq.items[0].answer.replace('modern residential areas', 'residential areas');

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kista content to remove "moderna" and just use "bostadsområden".');










