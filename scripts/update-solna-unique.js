const fs = require('fs');
const path = require('path');

const svPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'en.json');
const svDataPath = path.join(__dirname, 'data', 'solna-sv.json');
const enDataPath = path.join(__dirname, 'data', 'solna-en.json');

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveLocale(filePath, key, content) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data[key] = content;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svContent = loadJson(svDataPath);
const enContent = loadJson(enDataPath);

saveLocale(svPath, 'solna', svContent);
saveLocale(enPath, 'solna', enContent);

console.log('Solna-texter uppdaterade i sv/en.');





