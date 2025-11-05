const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');

const data = JSON.parse(fs.readFileSync(svPath, 'utf8'));
if (data.lidingo && data.lidingo.servicesSection && typeof data.lidingo.servicesSection.description === 'string') {
  data.lidingo.servicesSection.description = data.lidingo.servicesSection.description.replace('korttidsmagasinering', 'magasinering');
  fs.writeFileSync(svPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Replaced korttidsmagasinering with magasinering for Lidingö services description.');
} else {
  console.log('Lidingö servicesSection.description not found; no changes made.');
}
