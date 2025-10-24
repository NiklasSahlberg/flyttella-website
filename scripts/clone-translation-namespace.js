// Clone bromma translation block to danderyd in sv.json and en.json safely.
const fs = require('fs');
const path = require('path');

function cloneLocale(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.bromma) {
    console.error('No bromma namespace found in', filePath);
    process.exit(1);
  }
  if (!data.danderyd) {
    const cloned = JSON.parse(JSON.stringify(data.bromma));
    const stringified = JSON.stringify(cloned);
    const replaced = stringified.replace(/Bromma/g, 'Danderyd');
    data.danderyd = JSON.parse(replaced);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Added danderyd block to', filePath);
  } else {
    console.log('danderyd already exists in', filePath);
  }
}

const svCandidates = [
  path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'sv.json'),
  path.join(process.cwd(), 'src', 'app', 'i18n', 'locales', 'sv.json'),
];
const enCandidates = [
  path.join(__dirname, '..', 'src', 'app', 'i18n', 'locales', 'en.json'),
  path.join(process.cwd(), 'src', 'app', 'i18n', 'locales', 'en.json'),
];

const svPath = svCandidates.find(p => fs.existsSync(p));
const enPath = enCandidates.find(p => fs.existsSync(p));

if (!svPath || !enPath) {
  console.error('Could not locate sv.json or en.json');
  process.exit(1);
}

cloneLocale(svPath);
cloneLocale(enPath);




