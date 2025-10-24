// Update jarfalla content to change "sedan 2019"
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish content to change "sedan 2019"
svData.jarfalla.hero.title = 'Flyttfirma i Järfälla – din pålitliga partner med över 5 års erfarenhet';
svData.jarfalla.about.desktop = 'Med över 5 års erfarenhet har vi etablerat oss som Järfällas mest betrodda flyttpartner – från eleganta villor i Jakobsberg till moderna lägenhetskomplex i Kallhäll. Vår dedikation till excellens och lokalkännedom gör oss till det självklara valet för Järfällas invånare.';

// Update English content to change "since 2019"
enData.jarfalla.hero.title = 'Moving company in Järfälla – your reliable partner with over 5 years experience';
enData.jarfalla.about.desktop = 'With over 5 years experience we have established ourselves as Järfälla\'s most trusted moving partner – from elegant houses in Jakobsberg to modern apartment complexes in Kallhäll. Our dedication to excellence and local knowledge makes us the obvious choice for Järfälla residents.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated jarfalla content to change "sedan 2019" to "med över 5 års erfarenhet" in sv and en.');
