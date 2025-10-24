// Update jarfalla content to be much more unique and distinctive
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Swedish content with completely unique phrasing
svData.jarfalla.hero.title = 'Flyttfirma i Järfälla – din pålitliga partner sedan 2019';
svData.jarfalla.hero.subtitle = 'Professionella flyttlösningar i Järfälla, Jakobsberg, Kallhäll och Viksjö. Vi levererar skräddarsydda flyttar för villor, radhus och lägenhetskomplex med fokus på kvalitet och kundnöjdhet.';

svData.jarfalla.about.desktop = 'Sedan 2019 har vi etablerat oss som Järfällas mest betrodda flyttpartner – från eleganta villor i Jakobsberg till moderna lägenhetskomplex i Kallhäll. Vår dedikation till excellens och lokalkännedom gör oss till det självklara valet för Järfällas invånare.';
svData.jarfalla.about.desktop2 = 'Mer än 8 000 framgångsrika flyttar har gjort oss till en betrodd partner för både privatpersoner och företag i Järfälla. Vi arbetar med transparenta priser och inga överraskningar. Varje flytt planeras noggrant med hänsyn till Järfällas specifika utmaningar – villakvarter, moderna bostadsområden och lokala förutsättningar.';
svData.jarfalla.about.desktop3 = 'Våra konkurrensfördelar inkluderar gratis flyttkartonger, flexibel ombokning fram till 24 timmar innan flyttdagen och en generös 14-dagars garanti på flyttstädning. Din personliga flyttkoordinator säkerställer att allt från initial planering till slutlig genomförande fungerar smidigt.';

svData.jarfalla.about.mobile = 'Järfällas mest betrodda flyttpartner med transparenta priser och personlig service – över 8 000 nöjda kunder.';
svData.jarfalla.about.mobileExpanded = 'Skräddarsydd planering för Järfällas villakvarter och moderna områden. Gratis kartonger, flexibel ombokning och 14 dagars städgaranti.';
svData.jarfalla.about.mobileExpanded2 = 'Kompletta flyttlösningar med packning och städning. Dedikerad koordinator som följer hela processen.';

svData.jarfalla.reviews.description = 'Kunder i Järfälla, Jakobsberg och Kallhäll värdesätter vår noggranna planering, transparenta priser och punktliga genomförande. Vi är experter på villaflyttar och garanterar att flyttdagen blir lugn och effektiv.';

svData.jarfalla.processSection.description = 'Våra offerter utgår från dina specifika behov i Järfälla – boyta, våningsplan, trappor/hiss, bärvägar och parkeringsmöjligheter. Vid behov genomför vi kostnadsfri besiktning och dimensionerar rätt bemanning/fordon. Alla priser är fasta utan dolda avgifter. Planeringen anpassas efter Järfällas olika områden för en säker, effektiv flytt.';

svData.jarfalla.experience.description = 'Med över 8000 genomförda flyttar och 7000 städningar har vi utvecklat en gedigen expertis inom flytt- och städningsbranschen. Särskilt starka är vi på villor i Jakobsberg, lägenhetskomplex i Kallhäll och radhus i Viksjö – där varje område kräver sin unika planering.';
svData.jarfalla.experience.expanded = 'Vår position som en av Stockholms mest rekommenderade flyttfirmor bekräftas av över 1000 positiva omdömen. I Järfälla bygger vår service på årslång erfarenhet av områdets förutsättningar – från villakvarter till moderna bostadsområden.';

svData.jarfalla.awards.description = 'Våra utmärkelser bekräftar vår position som Järfällas mest pålitliga flyttfirma. Särskilt stolta är vi över våra återkommande kunder i Jakobsberg och Kallhäll, som visar på den höga kvalitet och det förtroende vi byggt upp över tid.';

svData.jarfalla.servicesSection.description = 'Från villor och radhus till lägenhetskomplex – vi erbjuder kompletta flyttlösningar i Järfälla. Packning, flyttstädning, magasinering och speciallyft av tunga möbler. Varje uppdrag skräddarsys efter dina behov och områdets förutsättningar – alltid med fasta priser och transparent kommunikation.';

svData.jarfalla.blogSection.title = 'Guider och tips för flytt i Järfälla';
svData.jarfalla.blogSection.description = 'Checklista för smidig flytt i Järfälla: planera bärvägar och lastplats, säkra parkering och anpassa tidsfönster efter områdets specifika förutsättningar.';

svData.jarfalla.blog.title = 'Checklista: så förbereder du en smidig flytt i Järfälla';
svData.jarfalla.blog.description = 'Förbered material och märkning, säkra lastplats och planera packning rum för rum – spara tid och minska risker.';

// Update English content with completely unique phrasing
enData.jarfalla.hero.title = 'Moving company in Järfälla – your reliable partner since 2019';
enData.jarfalla.hero.subtitle = 'Professional moving solutions in Järfälla, Jakobsberg, Kallhäll and Viksjö. We deliver tailored moves for houses, townhouses and apartment complexes with focus on quality and customer satisfaction.';

enData.jarfalla.about.desktop = 'Since 2019 we have established ourselves as Järfälla\'s most trusted moving partner – from elegant houses in Jakobsberg to modern apartment complexes in Kallhäll. Our dedication to excellence and local knowledge makes us the obvious choice for Järfälla residents.';
enData.jarfalla.about.desktop2 = 'More than 8,000 successful moves have made us a trusted partner for both individuals and businesses in Järfälla. We work with transparent pricing and no surprises. Every move is carefully planned considering Järfälla\'s specific challenges – villa districts, modern residential areas and local conditions.';
enData.jarfalla.about.desktop3 = 'Our competitive advantages include free moving boxes, flexible rebooking up to 24 hours before move day and a generous 14-day cleaning guarantee. Your personal move coordinator ensures everything from initial planning to final execution works smoothly.';

enData.jarfalla.about.mobile = 'Järfälla\'s most trusted moving partner with transparent pricing and personal service – over 8,000 satisfied clients.';
enData.jarfalla.about.mobileExpanded = 'Tailored planning for Järfälla\'s villa districts and modern areas. Free boxes, flexible rebooking and 14-day cleaning guarantee.';
enData.jarfalla.about.mobileExpanded2 = 'Complete moving solutions with packing and cleaning. Dedicated coordinator who follows the entire process.';

enData.jarfalla.reviews.description = 'Clients in Järfälla, Jakobsberg and Kallhäll value our thorough planning, transparent pricing and punctual execution. We are experts at house moves and guarantee move day is calm and efficient.';

enData.jarfalla.processSection.description = 'Our quotes are based on your specific needs in Järfälla – size, floor level, stairs/elevator, access routes and parking options. When needed we conduct a free inspection and size the right crew/vehicle. All prices are fixed with no hidden fees. Planning is adapted to Järfälla\'s different areas for a safe, efficient move.';

enData.jarfalla.experience.description = 'With over 8000 completed moves and 7000 cleanings we have developed solid expertise in the moving and cleaning industry. We are particularly strong in houses in Jakobsberg, apartment complexes in Kallhäll and townhouses in Viksjö – where each area requires its unique planning.';
enData.jarfalla.experience.expanded = 'Our position as one of Stockholm\'s most recommended moving companies is confirmed by over 1000 positive reviews. In Järfälla our service is built on years of experience with the area\'s conditions – from villa districts to modern residential areas.';

enData.jarfalla.awards.description = 'Our awards confirm our position as Järfälla\'s most reliable moving company. We are particularly proud of our returning customers in Jakobsberg and Kallhäll, who demonstrate the high quality and trust we have built over time.';

enData.jarfalla.servicesSection.description = 'From houses and townhouses to apartment complexes – we offer complete moving solutions in Järfälla. Packing, move-out cleaning, storage and special lifts of heavy furniture. Every job is tailored to your needs and the area\'s conditions – always with fixed pricing and transparent communication.';

enData.jarfalla.blogSection.title = 'Guides and tips for moving in Järfälla';
enData.jarfalla.blogSection.description = 'Checklist for a smooth move in Järfälla: plan access and loading, secure parking and align time windows with the area\'s specific conditions.';

enData.jarfalla.blog.title = 'Checklist: prepare a smooth move in Järfälla';
enData.jarfalla.blog.description = 'Prepare materials and labels, secure a loading spot and plan packing room by room – save time and reduce risks.';

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated jarfalla content to be much more unique and distinctive in sv and en.');
