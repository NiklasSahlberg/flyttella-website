const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function deepClone(obj){
  return JSON.parse(JSON.stringify(obj));
}

function replaceInObject(obj, replacements){
  if (typeof obj === 'string') {
    let s = obj;
    for (const [from, to] of replacements) s = s.replaceAll(from, to);
    return s;
  }
  if (Array.isArray(obj)) return obj.map(v => replaceInObject(v, replacements));
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k,v] of Object.entries(obj)) out[k] = replaceInObject(v, replacements);
    return out;
  }
  return obj;
}

function seed(filePath){
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.kungsangen) throw new Error(`Namespace kungsangen not found in ${filePath}`);
  const cloned = deepClone(data.kungsangen);
  const replaced = replaceInObject(cloned, [['Kungsängen','Lidingö'], ['Kungsangen','Lidingö']]);
  data.lidingo = replaced;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

seed(svPath);
seed(enPath);

console.log('Seeded lidingo from kungsangen with basic name replacement.');

