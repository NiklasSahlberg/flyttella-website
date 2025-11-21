const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

function deepClone(o){return JSON.parse(JSON.stringify(o));}
function replaceInObject(obj, pairs){
  if (typeof obj === 'string') { let s=obj; for (const [a,b] of pairs) s=s.replaceAll(a,b); return s; }
  if (Array.isArray(obj)) return obj.map(v=>replaceInObject(v,pairs));
  if (obj && typeof obj === 'object'){ const out={}; for (const [k,v] of Object.entries(obj)) out[k]=replaceInObject(v,pairs); return out; }
  return obj;
}
function seed(file){
  const d = JSON.parse(fs.readFileSync(file,'utf8'));
  if (!d.marsta) throw new Error('marsta namespace missing');
  const cloned = deepClone(d.marsta);
  const replaced = replaceInObject(cloned, [['Märsta','Nacka'],['Marsta','Nacka']]);
  d.nacka = replaced;
  fs.writeFileSync(file, JSON.stringify(d,null,2),'utf8');
}
seed(svPath);
seed(enPath);
console.log('Seeded nacka translations from marsta with basic replacements.');

