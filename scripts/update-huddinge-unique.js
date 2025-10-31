// Update remaining sections for huddinge with more unique content
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish sections with more unique content
svData.huddinge.experience.description = 'Med över 8000 genomförda familjeflyttar och 7000 städningar har vi utvecklat en gedigen expertis inom familjeflyttar. Särskilt starka är vi på familjebostäder i Flemingsberg, villor i Segeltorp och lägenhetskomplex i Skogås – där varje område kräver sin unika familjevänliga planering.';
svData.huddinge.experience.expanded = 'Vår position som en av Stockholms mest rekommenderade familjeflyttfirmor bekräftas av över 1000 positiva omdömen. I Huddinge bygger vår service på årslång erfarenhet av områdets familjevänliga förutsättningar – från grönområden med lekplatser till skolor och trygga boendemiljöer.';

svData.huddinge.awards.description = 'Våra utmärkelser bekräftar vår position som Huddinges mest pålitliga familjeflyttfirma. Särskilt stolta är vi över våra återkommande familjekunder i Flemingsberg och Segeltorp, som visar på den höga kvalitet och det förtroende vi byggt upp för familjeflyttar över tid.';

svData.huddinge.servicesSection.description = 'Från familjeflyttar och villor till lägenhetskomplex – vi erbjuder kompletta flyttlösningar i Huddinge. Packning, flyttstädning, magasinering och speciallyft av familjemöbler. Varje uppdrag skräddarsys efter familjens behov och områdets familjevänliga förutsättningar – alltid med fasta priser och transparent kommunikation.';

svData.huddinge.blogSection.description = 'Checklista för smidig familjeflytt i Huddinge: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter familjens behov och områdets skolor.';

svData.huddinge.blog.description = 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska stress för hela familjen.';

// Update English sections with more unique content
enData.huddinge.experience.description = 'With over 8000 completed family moves and 7000 cleanings we have developed solid expertise in family moves. We are particularly strong in family homes in Flemingsberg, houses in Segeltorp and apartment complexes in Skogås – where each area requires its unique family-friendly planning.';
enData.huddinge.experience.expanded = 'Our position as one of Stockholm\'s most recommended family moving companies is confirmed by over 1000 positive reviews. In Huddinge our service is built on years of experience with the area\'s family-friendly conditions – from green areas with playgrounds to schools and safe residential environments.';

enData.huddinge.awards.description = 'Our awards confirm our position as Huddinge\'s most reliable family moving company. We are particularly proud of our returning family customers in Flemingsberg and Segeltorp, who demonstrate the high quality and trust we have built for family moves over time.';

enData.huddinge.servicesSection.description = 'From family moves and houses to apartment complexes – we offer complete moving solutions in Huddinge. Packing, move-out cleaning, storage and special lifts of family furniture. Every job is tailored to the family\'s needs and the area\'s family-friendly conditions – always with fixed pricing and transparent communication.';

enData.huddinge.blogSection.description = 'Checklist for a smooth family move in Huddinge: plan access and loading, secure parking and align time windows with the family\'s needs and the area\'s schools.';

enData.huddinge.blog.description = 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce stress for the whole family.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated remaining sections for huddinge with more unique content in sv and en.');



