const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function deepClone(obj){
  return JSON.parse(JSON.stringify(obj));
}

function replaceInObject(obj, from, to){
  if (typeof obj === 'string') return obj.replaceAll(from, to);
  if (Array.isArray(obj)) return obj.map(v => replaceInObject(v, from, to));
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k,v] of Object.entries(obj)) out[k] = replaceInObject(v, from, to);
    return out;
  }
  return obj;
}

function seed(filePath, fromNs, toNs, fromName, toName){
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data[fromNs]) throw new Error(`Namespace ${fromNs} not found in ${filePath}`);
  const cloned = deepClone(data[fromNs]);
  const replaced = replaceInObject(cloned, fromName, toName);
  data[toNs] = replaced;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

seed(svPath, 'kungsholmen', 'kungsangen', 'Kungsholmen', 'Kungsängen');
seed(enPath, 'kungsholmen', 'kungsangen', 'Kungsholmen', 'Kungsängen');

console.log('Seeded kungsangen namespace from kungsholmen with basic replacements.');
