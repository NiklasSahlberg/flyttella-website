// Update jarfalla content to change overused phrasing
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish content to change overused phrasing
svData.jarfalla.about.desktop = 'Med över 5 års erfarenhet har vi etablerat oss som Järfällas mest betrodda flyttpartner – vi hanterar allt från Jakobsbergs villakvarter till Kallhälls moderna bostadsområden. Vår passion för kvalitet och djup lokalkännedom gör oss till den perfekta valet för Järfällas invånare.';

// Update English content to change overused phrasing
enData.jarfalla.about.desktop = 'With over 5 years experience we have established ourselves as Järfälla\'s most trusted moving partner – we handle everything from Jakobsberg\'s villa districts to Kallhäll\'s modern residential areas. Our passion for quality and deep local knowledge makes us the perfect choice for Järfälla residents.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated jarfalla content to change overused phrasing in sv and en.');










