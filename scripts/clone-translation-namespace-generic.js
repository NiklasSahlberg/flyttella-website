// Clone a locale namespace to a new one with city name replacement
// Usage: node scripts/clone-translation-namespace-generic.js <file> <oldNs> <newNs> <oldCity> <newCity>
const fs = require('fs');
const path = require('path');

const [file, oldNs, newNs, oldCity, newCity] = process.argv.slice(2);
if (!file || !oldNs || !newNs || !oldCity || !newCity) {
  console.error('Usage: node scripts/clone-translation-namespace-generic.js <file> <oldNs> <newNs> <oldCity> <newCity>');
  process.exit(1);
}

const candidates = [
  path.isAbsolute(file) ? file : path.join(process.cwd(), file),
  path.join(__dirname, '..', file),
];
const filePath = candidates.find(p => fs.existsSync(p));
if (!filePath) {
  console.error('Locale file not found:', file);
  process.exit(1);
}

const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);
if (!data[oldNs]) {
  console.error('Old namespace not found in', filePath);
  process.exit(1);
}
if (!data[newNs]) {
  const cloned = JSON.parse(JSON.stringify(data[oldNs]));
  let s = JSON.stringify(cloned);
  const reCity = new RegExp(oldCity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  s = s.replace(reCity, newCity);
  data[newNs] = JSON.parse(s);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Added', newNs, 'to', filePath);
} else {
  console.log(newNs, 'already exists in', filePath);
}











