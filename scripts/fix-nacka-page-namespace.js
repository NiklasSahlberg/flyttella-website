const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'flyttfirma-i-nacka', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace any known namespaces to nacka
content = content.replace(/t\('marsta\./g, "t('nacka.");
content = content.replace(/t\('kungsangen\./g, "t('nacka.");
content = content.replace(/t\('lidingo\./g, "t('nacka.");
content = content.replace(/t\('kungsholmen\./g, "t('nacka.");

// ReviewsWidget location
content = content.replace(/location=\"Märsta\"/g, 'location="Nacka"');
content = content.replace(/location=\"Kungsängen\"/g, 'location="Nacka"');
content = content.replace(/location=\"Lidingö\"/g, 'location="Nacka"');
content = content.replace(/location=\"Kungsholmen\"/g, 'location="Nacka"');

// FAQ id prefixes
content = content.replace(/id:\s*\"marsta-/g, 'id: "nacka-');
content = content.replace(/id:\s*\"kungsangen-/g, 'id: "nacka-');
content = content.replace(/id:\s*\"lidingo-/g, 'id: "nacka-');
content = content.replace(/id:\s*\"kungsholmen-/g, 'id: "nacka-');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated Nacka page to use nacka namespace, location, and FAQ ids.');

