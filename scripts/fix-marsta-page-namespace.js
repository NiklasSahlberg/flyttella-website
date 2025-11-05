const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'flyttfirma-i-marsta', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace kungsangen namespace to marsta if present
content = content.replace(/t\('kungsangen\./g, "t('marsta.");
// Also replace lidingo or kungsholmen remnants to marsta just in case
content = content.replace(/t\('lidingo\./g, "t('marsta.");
content = content.replace(/t\('kungsholmen\./g, "t('marsta.");

// ReviewsWidget location
content = content.replace(/location=\"Kungsängen\"/g, 'location="Märsta"');
content = content.replace(/location=\"Lidingö\"/g, 'location="Märsta"');
content = content.replace(/location=\"Kungsholmen\"/g, 'location="Märsta"');

// FAQ id prefixes
content = content.replace(/id:\s*\"kungsangen-/g, 'id: "marsta-');
content = content.replace(/id:\s*\"lidingo-/g, 'id: "marsta-');
content = content.replace(/id:\s*\"kungsholmen-/g, 'id: "marsta-');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated Märsta page to use marsta namespace, location, and FAQ ids.');
