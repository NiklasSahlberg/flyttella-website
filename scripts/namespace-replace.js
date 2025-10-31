// Replace namespace, location, and FAQ IDs in the Danderyd page safely.
const fs = require('fs');
const path = require('path');

const candidates = [
  path.join(__dirname, '..', 'src', 'app', 'flyttfirma-i-danderyd', 'page.tsx'),
  path.join(process.cwd(), 'src', 'app', 'flyttfirma-i-danderyd', 'page.tsx'),
];

const targetPath = candidates.find(p => fs.existsSync(p));
if (!targetPath) {
  console.error('Could not find flyttfirma-i-danderyd/page.tsx');
  process.exit(1);
}

let content = fs.readFileSync(targetPath, 'utf8');

content = content.replace(/t\('bromma\./g, "t('danderyd.");
content = content.replace(/location=\"Bromma\"/g, 'location="Danderyd"');
content = content.replace(/id: \"bromma-/g, 'id: "danderyd-');

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Updated namespace, location, and IDs in', targetPath);







