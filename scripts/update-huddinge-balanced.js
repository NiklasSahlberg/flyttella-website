// Update huddinge content to be less family-focused and more balanced
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish content to be less family-focused
svData.huddinge.hero.title = 'Flyttfirma i Huddinge – professionell flyttservice sedan 2019';
svData.huddinge.hero.subtitle = 'Erfarna flyttar i Huddinge, Flemingsberg, Segeltorp och Skogås. Vi specialiserar oss på villor, lägenhetskomplex och radhus med djup lokalkännedom om Huddinges grönområden och boendemiljöer.';

svData.huddinge.about.desktop = 'Sedan 2019 har vi byggt upp en stark position som Huddinges mest betrodda flyttfirma – från exklusiva villor i Flemingsberg till moderna lägenhetskomplex i Segeltorp. Vår specialisering på olika bostadstyper och lokalkännedom gör oss till det naturliga valet för Huddinges invånare.';
svData.huddinge.about.desktop2 = 'Över 8 000 framgångsrika flyttar har etablerat oss som en pålitlig partner för både privatpersoner och företag i Huddinge. Vi arbetar med transparenta priser och inga överraskningar. Varje flytt planeras noggrant med hänsyn till Huddinges specifika utmaningar – grönområden, skolor, boendemiljöer och lokala förutsättningar.';
svData.huddinge.about.desktop3 = 'Våra fördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Din personliga flyttkoordinator säkerställer att allt från initial planering till slutlig genomförande fungerar smidigt.';

svData.huddinge.about.mobile = 'Huddinges mest betrodda flyttfirma med transparenta priser och personlig service – över 8 000 nöjda kunder.';
svData.huddinge.about.mobileExpanded = 'Specialiserad planering för Huddinges olika områden. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.';
svData.huddinge.about.mobileExpanded2 = 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen.';

svData.huddinge.reviews.description = 'Kunder i Huddinge, Flemingsberg och Segeltorp uppskattar vår noggranna planering, transparenta priser och punktliga genomförande. Vi är experter på olika bostadstyper och garanterar att flyttdagen blir lugn och effektiv.';

svData.huddinge.processSection.description = 'Våra offerter baseras på dina specifika behov i Huddinge – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Huddinges olika områden för en säker, effektiv flytt.';

svData.huddinge.experience.description = 'Med över 8000 genomförda flyttar och 7000 städningar har vi utvecklat en gedigen expertis inom flytt- och städningsbranschen. Särskilt starka är vi på villor i Flemingsberg, lägenhetskomplex i Segeltorp och radhus i Skogås – där varje område kräver sin unika planering.';
svData.huddinge.experience.expanded = 'Vår position som en av Stockholms mest rekommenderade flyttfirmor bekräftas av över 1000 positiva omdömen. I Huddinge bygger vår service på årslång erfarenhet av områdets förutsättningar – från grönområden till moderna bostadsområden.';

svData.huddinge.awards.description = 'Våra utmärkelser bekräftar vår position som Huddinges mest pålitliga flyttfirma. Särskilt stolta är vi över våra återkommande kunder i Flemingsberg och Segeltorp, som visar på den höga kvalitet och det förtroende vi byggt upp över tid.';

svData.huddinge.servicesSection.description = 'Från villor och radhus till lägenhetskomplex – vi erbjuder kompletta flyttlösningar i Huddinge. Packning, flyttstädning, magasinering och speciallyft av tunga möbler. Varje uppdrag skräddarsys efter dina behov och områdets förutsättningar – alltid med fasta priser och transparent kommunikation.';

svData.huddinge.blogSection.title = 'Guider och tips för flytt i Huddinge';
svData.huddinge.blogSection.description = 'Checklista för smidig flytt i Huddinge: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter områdets specifika förutsättningar.';

svData.huddinge.blog.title = 'Checklista: så förbereder du en smidig flytt i Huddinge';
svData.huddinge.blog.description = 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.';

svData.huddinge.faq.title = 'Vanliga frågor om flytt i Huddinge';

// Update English content to be less family-focused
enData.huddinge.hero.title = 'Moving company in Huddinge – professional moving service since 2019';
enData.huddinge.hero.subtitle = 'Experienced moves in Huddinge, Flemingsberg, Segeltorp and Skogås. We specialise in houses, apartment complexes and townhouses with deep local knowledge of Huddinge\'s green areas and residential environments.';

enData.huddinge.about.desktop = 'Since 2019 we have built a strong position as Huddinge\'s most trusted moving company – from exclusive houses in Flemingsberg to modern apartment complexes in Segeltorp. Our specialisation in different housing types and local knowledge makes us the natural choice for Huddinge residents.';
enData.huddinge.about.desktop2 = 'Over 8,000 successful moves have established us as a reliable partner for both individuals and businesses in Huddinge. We work with transparent pricing and no surprises. Every move is carefully planned considering Huddinge\'s specific challenges – green areas, schools, residential environments and local conditions.';
enData.huddinge.about.desktop3 = 'Our benefits include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Your personal move coordinator ensures everything from initial planning to final execution works smoothly.';

enData.huddinge.about.mobile = 'Huddinge\'s most trusted moving company with transparent pricing and personal service – over 8,000 satisfied clients.';
enData.huddinge.about.mobileExpanded = 'Specialised planning for Huddinge\'s different areas. Free boxes, flexible rebooking and 14-day cleaning guarantee.';
enData.huddinge.about.mobileExpanded2 = 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process.';

enData.huddinge.reviews.description = 'Clients in Huddinge, Flemingsberg and Segeltorp appreciate our thorough planning, transparent pricing and punctual execution. We are experts at different housing types and guarantee move day is calm and efficient.';

enData.huddinge.processSection.description = 'Our quotes are based on your specific needs in Huddinge – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Huddinge\'s different areas for a safe, efficient move.';

enData.huddinge.experience.description = 'With over 8000 completed moves and 7000 cleanings we have developed solid expertise in the moving and cleaning industry. We are particularly strong in houses in Flemingsberg, apartment complexes in Segeltorp and townhouses in Skogås – where each area requires its unique planning.';
enData.huddinge.experience.expanded = 'Our position as one of Stockholm\'s most recommended moving companies is confirmed by over 1000 positive reviews. In Huddinge our service is built on years of experience with the area\'s conditions – from green areas to modern residential areas.';

enData.huddinge.awards.description = 'Our awards confirm our position as Huddinge\'s most reliable moving company. We are particularly proud of our returning customers in Flemingsberg and Segeltorp, who demonstrate the high quality and trust we have built over time.';

enData.huddinge.servicesSection.description = 'From houses and townhouses to apartment complexes – we offer complete moving solutions in Huddinge. Packing, move-out cleaning, storage and special lifts of heavy furniture. Every job is tailored to your needs and the area\'s conditions – always with fixed pricing and transparent communication.';

enData.huddinge.blogSection.title = 'Guides and tips for moving in Huddinge';
enData.huddinge.blogSection.description = 'Checklist for a smooth move in Huddinge: plan access and loading, secure parking and align time windows with the area\'s specific conditions.';

enData.huddinge.blog.title = 'Checklist: prepare a smooth move in Huddinge';
enData.huddinge.blog.description = 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.';

enData.huddinge.faq.title = 'Common questions about moving in Huddinge';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated huddinge content to be less family-focused and more balanced in sv and en.');



