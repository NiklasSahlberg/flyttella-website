// Ensure mobile about content equals desktop content for a namespace
const fs = require('fs');
const path = require('path');

function align(filePath, ns) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!data[ns] || !data[ns].about) return false;
  const a = data[ns].about;
  // Mirror desktop richness into mobile fields
  a.mobile = a.desktop || a.mobile || '';
  a.mobileExpanded = a.desktop2 || a.mobileExpanded || '';
  a.mobileExpanded2 = a.desktop3 || a.mobileExpanded2 || '';
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  return true;
}

const ns = process.argv[2] || 'danderyd';
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

const okSv = align(svPath, ns);
const okEn = align(enPath, ns);
console.log(`Aligned mobile about for ${ns}: sv=${okSv} en=${okEn}`);




