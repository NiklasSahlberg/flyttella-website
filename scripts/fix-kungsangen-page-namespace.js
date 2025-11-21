const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'flyttfirma-i-kungsangen', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace t('kungsholmen.*') -> t('kungsangen.*')
content = content.replace(/t\('kungsholmen\./g, "t('kungsangen.");

// Replace ReviewsWidget location="Kungsholmen" -> "Kungsängen"
content = content.replace(/location=\"Kungsholmen\"/g, 'location="Kungsängen"');

// Replace FAQ id prefixes kungsholmen- -> kungsangen-
content = content.replace(/id:\s*\"kungsholmen-/g, 'id: "kungsangen-');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated page.tsx for Kungsängen namespace, location, and FAQ ids.');

