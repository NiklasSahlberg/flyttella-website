// Update jarfalla hero section to change "lägenhetskomplex" to "lägenheter"
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish hero section
svData.jarfalla.hero.subtitle = 'Professionella flyttlösningar i Järfälla, Jakobsberg, Kallhäll och Viksjö. Vi levererar skräddarsydda flyttar för villor, radhus och lägenheter med fokus på kvalitet och kundnöjdhet.';

// Update English hero section
enData.jarfalla.hero.subtitle = 'Professional moving solutions in Järfälla, Jakobsberg, Kallhäll and Viksjö. We deliver tailored moves for houses, townhouses and apartments with focus on quality and customer satisfaction.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated jarfalla hero section to change "lägenhetskomplex" to "lägenheter" in sv and en.');









