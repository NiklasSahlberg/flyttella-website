const fs = require('fs');
const path = require('path');

const svPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'en.json');
const svDataPath = path.join(__dirname, 'data', 'polen-sv.json');
const enDataPath = path.join(__dirname, 'data', 'polen-en.json');

function loadJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Remove BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    return JSON.parse(content.slice(1));
  }
  return JSON.parse(content);
}

function saveLocale(filePath, key, content) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data[key] = content;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

const svContent = loadJson(svDataPath);
const enContent = loadJson(enDataPath);

saveLocale(svPath, 'polen', svContent);
saveLocale(enPath, 'polen', enContent);

console.log('Polen-texter uppdaterade i sv/en.');
