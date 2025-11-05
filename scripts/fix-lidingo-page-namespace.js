const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'flyttfirma-i-lidingo', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/t\('kungsangen\./g, "t('lidingo.");
content = content.replace(/id:\s*\"kungsangen-/g, 'id: "lidingo-');
content = content.replace(/location=\"Kungsängen\"/g, 'location="Lidingö"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated Lidingö page namespace and location.');
