// Generic namespace replacer for a location page
// Usage: node scripts/namespace-replace-generic.js <routeDir> <oldNs> <newNs> <oldCity> <newCity>
const fs = require('fs');
const path = require('path');

const [routeDir, oldNs, newNs, oldCity, newCity] = process.argv.slice(2);
if (!routeDir || !oldNs || !newNs || !oldCity || !newCity) {
  console.error('Usage: node scripts/namespace-replace-generic.js <routeDir> <oldNs> <newNs> <oldCity> <newCity>');
  process.exit(1);
}

const candidates = [
  path.isAbsolute(routeDir) ? routeDir : path.join(process.cwd(), routeDir),
  path.join(__dirname, '..', routeDir),
];

const finalDir = candidates.find(p => fs.existsSync(p));
if (!finalDir) {
  console.error('Route directory not found:', routeDir);
  process.exit(1);
}

const pagePath = path.join(finalDir, 'page.tsx');
if (!fs.existsSync(pagePath)) {
  console.error('page.tsx not found in', finalDir);
  process.exit(1);
}

let content = fs.readFileSync(pagePath, 'utf8');
const reNs = new RegExp("t\\('" + oldNs.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\.", 'g');
content = content.replace(reNs, "t('" + newNs + '.');
content = content.replace(new RegExp('location="' + oldCity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g'), 'location="' + newCity + '"');
content = content.replace(new RegExp('id: "' + oldNs.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-', 'g'), 'id: "' + newNs + '-');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated namespace, location, and IDs in', pagePath);













