// Update Kungsholmen content to be completely different from Kista
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish content to be completely different
svData.kungsholmen.about.desktop = 'Sedan 2016 har vi etablerat oss som Kungsholmens mest betrodda flyttpartner – vi hjälper kunder i Marieberg och Fredhäll med professionella flyttlösningar. Vår passion för kvalitet och djup lokalkännedom gör oss till den perfekta valet för Kungsholmens invånare.';

svData.kungsholmen.about.desktop2 = 'Mer än 8 000 framgångsrika flyttar har gjort oss till en betrodd partner för både privatpersoner och företag i Kungsholmen. Vår transparenta prissättning och tydliga kommunikation gör att du alltid vet vad som ingår. Varje flytt skräddarsys efter Kungsholmens unika karaktär – från innerstadslägenheter till bostadsområden med sina specifika regler och förutsättningar.';

svData.kungsholmen.about.desktop3 = 'Våra konkurrensfördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Vår dedikerade kundtjänst följer hela flyttprocessen och säkerställer att varje detalj är perfekt planerad för Kungsholmens specifika förutsättningar.';

svData.kungsholmen.processSection.description = 'Våra offerter utgår från dina specifika behov i Kungsholmen – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Kungsholmens olika områden för en säker, effektiv flytt.';

svData.kungsholmen.experience.expanded = 'Vår position som en av Stockholms mest rekommenderade flyttfirmor bekräftas av över 1000 positiva omdömen. I Kungsholmen bygger vår service på årslång erfarenhet av områdets förutsättningar – från innerstadslägenheter till bostadsområden.';

svData.kungsholmen.awards.description = 'Genom åren har vi blivit erkända för vår expertis inom flyttar i Kungsholmen. Våra utmärkelser reflekterar vår specialisering på områdets unika utmaningar – från innerstadslägenheter till bostadsområden med sina specifika regler. Dessa utmärkelser bekräftar vår position som Kungsholmens mest pålitliga flyttfirma med djup lokalkännedom.';

// Update English content to be completely different
enData.kungsholmen.about.desktop = 'Since 2016 we have established ourselves as Kungsholmen\'s most trusted moving partner – we help clients in Marieberg and Fredhäll with professional moving solutions. Our passion for quality and deep local knowledge makes us the perfect choice for Kungsholmen residents.';

enData.kungsholmen.about.desktop2 = 'More than 8,000 successful moves have made us a trusted partner for both individuals and businesses in Kungsholmen. Our transparent pricing and clear communication means you always know what\'s included. Every move is tailored to Kungsholmen\'s unique character – from inner city apartments to residential areas with their specific rules and conditions.';

enData.kungsholmen.about.desktop3 = 'Our competitive advantages include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Our dedicated customer service follows the entire moving process and ensures every detail is perfectly planned for Kungsholmen\'s specific conditions.';

enData.kungsholmen.processSection.description = 'Our quotes are based on your specific needs in Kungsholmen – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Kungsholmen\'s different areas for a safe, efficient move.';

enData.kungsholmen.experience.expanded = 'Our position as one of Stockholm\'s most recommended moving companies is confirmed by over 1000 positive reviews. In Kungsholmen our service is built on years of experience with the area\'s conditions – from inner city apartments to residential areas.';

enData.kungsholmen.awards.description = 'Over the years we have been recognized for our expertise in moves in Kungsholmen. Our awards reflect our specialization in the area\'s unique challenges – from inner city apartments to residential areas with their specific rules. These awards confirm our position as Kungsholmen\'s most reliable moving company with deep local knowledge.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kungsholmen content to be completely different from Kista.');










