'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

// Sample blog post data - you can replace this with real content from a CMS or database
const blogPosts = [
  {
    slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma",
    title: "Vad bör du tänka på när du väljer en seriös flyttfirma",
    excerpt: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips för att identifiera en seriös och pålitlig flyttfirma som tar hand om dina ägodelar med omsorg.",
    category: "Flytttips",
    date: "2024-01-20",
    readTime: "10 min",
    author: "Flyttella Team",
    content: `
      <h2 class="font-bold">1. Kontrollera företagets registrering och licenser</h2>
      <p>En seriös flyttfirma ska vara registrerad hos Bolagsverket och ha alla nödvändiga tillstånd. Kontrollera att företaget har rätt registreringsnummer och att det inte finns några varningar eller sanktioner mot företaget.</p>
      <p><strong>Vad du ska kontrollera:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Företagsregistrering hos Bolagsverket</li>
            <li>F-skatt (Företagsskatt) registrering</li>
            <li>Transportörlicens för godsfordon</li>
            <li>Försäkringar och säkerhetsställningar</li>
            <li>Medlemskap i branschorganisationer</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/innanflyttfirmankommer.jpg" alt="Förberedelser innan flyttfirman kommer" class="w-full h-64 rounded-lg shadow-lg object-cover -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Förberedelser innan flyttfirman kommer - en viktig del av att välja rätt flyttfirma</p>
        </div>
      </div>
      
      <h2 class="font-bold">2. Undersök företagets rykte och erfarenhet</h2>
      <p>Läs recensioner och omdömen från tidigare kunder. En seriös flyttfirma har vanligtvis många positiva recensioner och är transparent med både positiva och negativa omdömen. Undersök också hur länge företaget har varit verksamt.</p>
      
      <p><strong>Var du kan hitta recensioner:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Google Reviews</li>
            <li>Trustpilot</li>
            <li>Företagets hemsida</li>
            <li>Bekanta och familj</li>
            <li>Reco</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/1000reviewspicture.png" alt="Kundrecensioner och omdömen" class="w-full -mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">3. Kräv skriftlig offert och kontrakt</h2>
      <p>En seriös flyttfirma ger alltid en skriftlig offert som är detaljerad och transparent. Offerten ska innehålla alla kostnader, inga dolda avgifter, och tydliga villkor. Läs igenom kontraktet noggrant innan du skriver under.</p>
      
      <p><strong>Vad som ska finnas i offerten:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Detaljerad kostnadsuppdelning</li>
            <li>Vad som ingår och inte ingår</li>
            <li>Flyttdatum och tidsram</li>
            <li>Antal flyttarbetare och fordon</li>
            <li>Försäkring och ansvarsförhållanden</li>
            <li>Betalningsvillkor</li>
            <li>Avbokningsvillkor</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/viktigaavtalcustomer.png" alt="Skriftlig offert och kontrakt" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">En seriös flyttfirma ger alltid en skriftlig och detaljerad offert</p>
        </div>
      </div>
      
      <h2 class="font-bold">4. Kontrollera försäkringar och säkerhetsställningar</h2>
      <p>En seriös flyttfirma har omfattande försäkringar som skyddar både företaget och dig som kund. Kontrollera att företaget har rätt försäkringar och att de täcker eventuella skador på dina ägodelar under transporten.</p>
      <p><strong>Viktiga försäkringar att kontrollera:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Ansvarsförsäkring för godsfordon</li>
            <li>Försäkring för kundens ägodelar</li>
            <li>Arbetsmiljöförsäkring för personal</li>
            <li>Företagsansvarsförsäkring</li>
            <li>Säkerhetsställningar enligt lag</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/insurance.json" alt="Försäkringar och säkerhet" class="w-full -mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">5. Undersök företagets personal och fordon</h2>
      <p>Kontrollera att flyttfirman använder egen personal och inte underentreprenörer. Fråga om personalens erfarenhet och utbildning. Undersök också fordonens skick och storlek för att säkerställa att de räcker för din flytt.</p>
      
      <p><strong>Vad du ska fråga om:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Använder företaget egen personal?</li>
            <li>Vilken erfarenhet har flyttarbetarna?</li>
            <li>Finns det utbildad personal för specialflyttar?</li>
            <li>Vilken typ och storlek på fordon används?</li>
            <li>Är fordonen väl underhållna?</li>
            <li>Finns det tillräckligt med utrustning?</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/personalpicture.jpg" alt="Professionell flyttpersonal" class="w-full h-64 rounded-lg shadow-lg -mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Erfaren och professionell personal är avgörande för en smidig flytt</p>
        </div>
      </div>
      
      <h2 class="font-bold">6. Kontrollera företagets lokala närvaro</h2>
      <p>En flyttfirma som är etablerad i ditt område känner till lokala förhållanden, parkeringsregler och trafikflöden. Detta kan göra flytten mycket smidigare och mer effektiv.</p>
      <p><strong>Fördelar med lokal flyttfirma:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Känner till lokala förhållanden</li>
            <li>Snabbare responstid vid problem</li>
            <li>Bättre kundservice</li>
            <li>Lättare att få referenser</li>
            <li>Känner till parkeringsregler</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/stockholm.jpg" alt="Lokal flyttfirma i Stockholm" class="w-full rounded-lg shadow-lg -mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">7. Undersök företagets kundservice och kommunikation</h2>
      <p>En seriös flyttfirma har bra kundservice och kommunicerar tydligt och professionellt. De svarar snabbt på frågor, är transparenta med information och gör det enkelt att komma i kontakt med dem.</p>
      <p><strong>Tecken på bra kundservice:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Snabba svar på förfrågningar</li>
            <li>Tydlig och professionell kommunikation</li>
            <li>Transparent information</li>
            <li>Lätt att komma i kontakt</li>
            <li>Proaktiv kommunikation</li>
            <li>Dedikerad kontaktperson</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/phonecall.json" alt="Kundservice och kommunikation" class="w-full -mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">8. Kontrollera företagets specialiseringar</h2>
      <p>Olika flyttar kräver olika kompetenser. Kontrollera att flyttfirman har erfarenhet av din typ av flytt - oavsett om det är en lägenhetsflytt, villaflytt, kontorsflytt eller specialflytt med känsliga föremål.</p>
      
      <p><strong>Specialiseringar att tänka på:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Lägenhetsflyttar</li>
            <li>Villaflyttar</li>
            <li>Kontorsflyttar</li>
            <li>Pianoflyttar</li>
            <li>Konst och antikviteter</li>
            <li>Internationella flyttar</li>
            <li>Långdistansflyttar</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/piano.png" alt="Specialiserade flyttar som pianoflytt" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Vissa flyttar kräver specialkompetens, som pianoflytt eller flytt av konst</p>
        </div>
      </div>
      
      <h2 class="font-bold">9. Undersök företagets miljöarbete och hållbarhet</h2>
      <p>Allt fler kunder värdesätter företag som tar miljöansvar. En seriös flyttfirma arbetar aktivt med hållbarhet och miljöfrågor, från miljövänliga fordon till återvinning av förpackningsmaterial.</p>
      <p><strong>Miljöaspekter att kontrollera:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Miljövänliga fordon</li>
            <li>Återvinning av förpackningsmaterial</li>
            <li>Energisnåla lösningar</li>
            <li>Miljöcertifieringar</li>
            <li>Hållbar verksamhet</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/barhjalp.png" alt="Miljövänlig flytt och hållbarhet" class="w-full rounded-lg shadow-lg -mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">10. Lita på din magkänsla</h2>
      <p>Trots alla checklistor och kriterier är det viktigt att lita på din magkänsla. Om något känns fel eller om flyttfirman inte ger dig en trygg känsla, fortsätt leta. En seriös flyttfirma ska ge dig trygghet och förtroende.</p>
      <p><strong>Varningstecken att vara uppmärksam på:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul>
            <li>Otydliga eller undvikande svar</li>
            <li>Orealistiskt låga priser</li>
            <li>Krav på kontantbetalning</li>
            <li>Otydliga kontrakt</li>
            <li>Dålig kommunikation</li>
            <li>Tryck på att besluta snabbt</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/thumbsup.json" alt="Lita på din magkänsla" class="w-full -mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">Sammanfattning</h2>
      <p>Att välja en seriös flyttfirma kräver tid och noggrannhet, men det är en investering som löner sig. Genom att följa dessa riktlinjer kan du minimera risken för problem och säkerställa en smidig flyttupplevelse. Kom ihåg att det bästa priset inte alltid är det billigaste - kvalitet, säkerhet och pålitlighet är ofta värt den extra kostnaden.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Viktiga punkter att komma ihåg:</strong></p>
          <ul>
            <li>Kontrollera alltid företagets registrering och licenser</li>
            <li>Läs recensioner och omdömen från tidigare kunder</li>
            <li>Kräv skriftlig offert och kontrakt</li>
            <li>Verifiera försäkringar och säkerhetsställningar</li>
            <li>Undersök personal och fordon</li>
            <li>Lita på din magkänsla</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/happycustomeraftermoving.png" alt="Nöjd kund efter flytt" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">En seriös flyttfirma säkerställer en smidig flytt och nöjda kunder</p>
        </div>
      </div>
      
      <p><strong>Behöver du hjälp med att välja flyttfirma?</strong> Flyttella är en etablerad och seriös flyttfirma i Stockholmsområdet med över 8000 genomförda flyttar. Vi erbjuder transparenta priser, omfattande försäkringar och professionell service. Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig med din flytt.</p>
    `,
    relatedPosts: [
      {
        title: "10 Tips för en Smidig Flytt i Stockholm",
        slug: "10-tips-for-en-smidig-flytt-i-stockholm",
        excerpt: "Planera din flytt i Stockholm med våra beprövade tips."
      },
      {
        title: "Flyttstädning - Vad Du Behöver Veta",
        slug: "flyttstädning-vad-du-behöver-veta",
        excerpt: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick."
      }
    ]
  },
  {
    slug: "10-tips-for-en-smidig-flytt-i-stockholm",
    title: "10 Tips för en Smidig Flytt i Stockholm",
    excerpt: "En flytt i Stockholm kan kännas överväldigande, men med rätt planering och förberedelser kan den bli en smidig och stressfri upplevelse. Här delar vi med oss av våra bästa tips baserade på över 8000 flyttar i Stockholmsområdet.",
    category: "Flytttips",
    date: "2024-01-15",
    readTime: "8 min",
    author: "Flyttella Team",
    content: `
      <p class="lead">En flytt i Stockholm kan kännas överväldigande, men med rätt planering och förberedelser kan den bli en smidig och stressfri upplevelse. Här delar vi med oss av våra bästa tips baserade på över 8000 flyttar i Stockholmsområdet.</p>
      
      <h2>1. Börja planera tidigt - 8 veckor innan flytten</h2>
      <p>En välplanerad flytt är nyckeln till framgång. Börja minst 8 veckor innan flyttdatumet med att organisera och planera. Skapa en detaljerad checklista med alla viktiga uppgifter som behöver göras. Inkludera deadlines för varje uppgift och dela upp arbetet i hanterbara delar.</p>
      <p><strong>Viktiga uppgifter att planera:</strong></p>
      <ul>
        <li>Boka flyttfirma (minst 4 veckor i förväg)</li>
        <li>Beställ flyttkartonger och förpackningsmaterial</li>
        <li>Boka flyttstädning</li>
        <li>Planera adressändringar</li>
        <li>Kontrollera parkeringsmöjligheter vid båda adresserna</li>
      </ul>
      
      <h2>2. Rensa och organisera - Minska dina ägodelar</h2>
      <p>Innan du börjar packa, gå igenom alla dina ägodelar systematiskt. Sälj, ge bort eller släng saker du inte längre behöver. Detta kommer att minska packningsarbetet, flyttkostnaderna och göra det enklare att organisera ditt nya hem.</p>
      <p><strong>Rensa rum för rum:</strong></p>
      <ul>
        <li>Börja med förråd och gästrum</li>
        <li>Gå igenom kläder - ge bort det du inte använt på ett år</li>
        <li>Rensa kök och badrum från utgångna produkter</li>
        <li>Kontrollera böcker, DVD:er och andra media</li>
      </ul>
      
      <h2>3. Beställ flyttkartonger och material i god tid</h2>
      <p>Vi erbjuder gratis lån av flyttkartonger i 4 veckor. Beställ dem i god tid så att du har tillräckligt med material för allt som behöver packas. Olika storlekar av kartonger är viktiga för olika typer av föremål.</p>
      <p><strong>Material du behöver:</strong></p>
      <ul>
        <li>Olika storlekar av flyttkartonger</li>
        <li>Silkespapper för känsliga föremål</li>
        <li>Bubbligaplast för sköra saker</li>
        <li>Maskeringstejp för att säkra kartonger</li>
        <li>Markörer för märkning</li>
        <li>Flyttfiltar för möbler</li>
      </ul>
      
      <h2>4. Märk alla kartonger tydligt och systematiskt</h2>
      <p>Använd tydliga etiketter på alla kartonger. Skriv rum och innehåll på varje låda. Detta gör det mycket enklare att hitta saker när du ska packa upp och hjälper flyttarbetarna att placera kartongerna i rätt rum.</p>
      <p><strong>Märkningssystem:</strong></p>
      <ul>
        <li>Använd färgkodning för olika rum</li>
        <li>Skriv både rum och innehåll på varje kartong</li>
        <li>Markera "FRAGILE" på känsliga föremål</li>
        <li>Skapa en inventeringslista över vad som finns i varje kartong</li>
      </ul>
      
      <h2>5. Packa rum för rum - Systematiskt tillvägagångssätt</h2>
      <p>Börja med rum du använder minst, som gästrum eller förråd. Låt kök och sovrum vara sist så du kan fortsätta leva normalt under packningsprocessen. Detta minskar stressen och gör att du alltid har tillgång till det du behöver.</p>
      <p><strong>Packningsordning:</strong></p>
      <ol>
        <li>Förråd och gästrum</li>
        <li>Vardagsrum och kontor</li>
        <li>Badrum</li>
        <li>Sovrum</li>
        <li>Kök (sist)</li>
      </ol>
      
      <h2>6. Förbered för flyttfirman - Effektiv flyttdag</h2>
      <p>Innan flyttfirman kommer, se till att alla vägar är fria och att du har packat ner allt lösöre. Montera ner gardiner och lampor om det behövs. Detta säkerställer en effektiv flyttdag utan förseningar.</p>
      <p><strong>Checklista för flyttdagen:</strong></p>
      <ul>
        <li>Packa ner allt lösöre i kartonger</li>
        <li>Montera ner gardiner och lampor</li>
        <li>Säkerställ fri väg för flyttarbetarna</li>
        <li>Ha nycklar tillgängliga</li>
        <li>Kontrollera att alla dörrar kan öppnas helt</li>
      </ul>
      
      <h2>7. Håll värdesaker och viktiga dokument tillgängliga</h2>
      <p>Packa värdesaker, viktiga dokument och nycklar separat och håll dem med dig under flytten. Lita inte på att de kommer med flyttbilen. Skapa en "viktiga saker"-påse som du alltid har med dig.</p>
      <p><strong>Vad som ska vara med dig:</strong></p>
      <ul>
        <li>Värdesaker och smycken</li>
        <li>Viktiga dokument (pass, ID-kort, försäkringar)</li>
        <li>Nycklar till båda bostäderna</li>
        <li>Kontaktinformation för flyttfirman</li>
        <li>Kontanter och kort</li>
        <li>Mediciner</li>
      </ul>
      
      <h2>8. Boka flyttstädning i god tid</h2>
      <p>Boka flyttstädning i god tid. Vi erbjuder professionell flyttstädning som säkerställer att din gamla bostad lämnas i perfekt skick. Detta är särskilt viktigt om du hyr eller säljer bostaden.</p>
      <p><strong>Vad som ingår i flyttstädning:</strong></p>
      <ul>
        <li>Grundlig städning av alla ytor</li>
        <li>Fönsterputsning</li>
        <li>Sanering av kök och badrum</li>
        <li>Städgaranti</li>
        <li>Flexibla tider</li>
      </ul>
      
      <h2>9. Uppdatera adresser och meddela viktiga kontakter</h2>
      <p>Glöm inte att adressändra hos Skatteverket och meddela viktiga kontakter som bank, försäkringsbolag och leverantörer. Gör detta i god tid för att undvika problem med post och fakturor.</p>
      <p><strong>Viktiga adressändringar:</strong></p>
      <ul>
        <li>Skatteverket (obligatoriskt)</li>
        <li>Bank och försäkringsbolag</li>
        <li>El- och internetleverantörer</li>
        <li>Arbetsgivare</li>
        <li>Läkare och tandläkare</li>
        <li>Föreningar och klubbar</li>
      </ul>
      
      <h2>10. Var förberedd och tillgänglig på flyttdagen</h2>
      <p>Ha kaffe och fika redo för flyttarbetarna. Var tillgänglig för frågor och gör en slutkontroll av bostaden innan du lämnar den. En bra relation med flyttarbetarna säkerställer en smidig process.</p>
      <p><strong>Flyttdagens checklista:</strong></p>
      <ul>
        <li>Ha kaffe, vatten och fika redo</li>
        <li>Var tillgänglig för frågor</li>
        <li>Gör en slutkontroll av alla rum</li>
        <li>Kontrollera att alla nycklar fungerar</li>
        <li>Ta bilder av bostadens skick</li>
        <li>Håll kontakt med flyttfirman under dagen</li>
      </ul>
      
      <h2>Sammanfattning</h2>
      <p>En smidig flytt i Stockholm handlar om noggrann planering, tidig förberedelse och rätt hjälp. Genom att följa dessa 10 tips kan du minska stressen och säkerställa att din flytt blir en positiv upplevelse. Kom ihåg att Flyttella finns här för att hjälpa dig genom hela processen - från första planeringen till den sista kartongen i ditt nya hem.</p>
      
      <p><strong>Behöver du hjälp med din flytt i Stockholm?</strong> Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig att göra din flytt så smidig som möjligt.</p>
    `,
    relatedPosts: [
      {
        title: "Vad bör du tänka på när du väljer en seriös flyttfirma",
        slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma",
        excerpt: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips."
      },
      {
        title: "Flyttstädning - Vad Du Behöver Veta",
        slug: "flyttstädning-vad-du-behöver-veta",
        excerpt: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick."
      }
    ]
  },
  {
    slug: "så-packar-du-känsliga-föremål-korrekt",
    title: "Så Packar Du Känsliga Föremål Korrekt",
    excerpt: "Lär dig hur du packar porslin, konst och andra känsliga föremål för att säkerställa att de kommer fram oskadda.",
    category: "Packning",
    date: "2024-01-10",
    readTime: "4 min",
    author: "Flyttella Team",
    content: `
      <h2>Förberedelse är nyckeln</h2>
      <p>När det gäller känsliga föremål är förberedelse avgörande. Samla ihop rätt material innan du börjar packa.</p>
      
      <h2>Material du behöver</h2>
      <ul>
        <li>Silkespapper eller tidningspapper</li>
        <li>Bubbligaplast</li>
        <li>Kartonger i olika storlekar</li>
        <li>Maskeringstejp</li>
        <li>Markörer för märkning</li>
      </ul>
      
      <h2>Porslin och glas</h2>
      <p>Packa porslin och glas vertikalt, inte liggande. Använd silkespapper mellan varje föremål och placera dem tätt ihop i kartongen.</p>
      
      <h2>Konst och fotografier</h2>
      <p>För konst och fotografier, använd specialkartonger och förpackningsmaterial. Undvik att stapla dem och håll dem vertikala.</p>
      
      <h2>Elektronik</h2>
      <p>Behåll originalförpackningar för elektronik om möjligt. Annars, använd bubbligaplast och packa dem i separata kartonger.</p>
    `,
    relatedPosts: [
      {
        title: "10 Tips för en Smidig Flytt i Stockholm",
        slug: "10-tips-for-en-smidig-flytt-i-stockholm",
        excerpt: "Planera din flytt i Stockholm med våra beprövade tips."
      },
      {
        title: "Flyttstädning - Vad Du Behöver Veta",
        slug: "flyttstädning-vad-du-behöver-veta",
        excerpt: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick."
      }
    ]
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto px-24 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0F172A] mb-4">
              Inlägget hittades inte
            </h1>
            <p className="text-gray-600 mb-8">
              Det blogginlägg du letar efter finns inte.
            </p>
            <Link
              href="/blogg"
              className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Tillbaka till bloggen
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section styled like the FAQ page */}
      <section className="relative py-20 bg-white text-[#0F172A] overflow-hidden">
        <div className="mx-auto px-24">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: 'url(/intro_picture.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="flex flex-col items-center justify-center gap-8 relative z-10">
              <div className="w-full max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-8">
                  <Link
                    href="/blogg"
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Tillbaka till bloggen
                  </Link>
                </nav>

                {/* Category */}
                <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                  {post.category}
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-white/80 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m4-6h.01M12 21h.01" />
                    </svg>
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </div>
                </div>

                {/* Lead paragraph */}
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips för att identifiera en seriös och pålitlig flyttfirma som tar hand om dina ägodelar med omsorg.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="mx-auto px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="space-y-8"
            >


              {/* Key Points Summary */}
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-2xl p-8 md:p-12 text-white mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Viktiga punkter att komma ihåg</h3>
                <div className="grid md:grid-cols-2 gap-6 justify-items-center">
                  <div className="flex items-start w-full max-w-xs">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Planera tidigt</h4>
                      <p className="text-white/80 text-sm">Börja planeringen tidigt</p>
                    </div>
                  </div>
                  <div className="flex items-start w-full max-w-xs">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Jämför flyttfirmor</h4>
                      <p className="text-white/80 text-sm">Kontrollera fasta eller rörliga priser</p>
                    </div>
                  </div>
                  <div className="flex items-start w-full max-w-xs">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Boka flytthjälp</h4>
                      <p className="text-white/80 text-sm">Kontrollera försäkring och garantier</p>
                    </div>
                  </div>
                  <div className="flex items-start w-full max-w-xs">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Boka flyttstädning</h4>
                      <p className="text-white/80 text-sm">Säkra professionell städning i tid</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                <div 
                  className="text-lg leading-relaxed text-[#0F172A] space-y-8"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    '--tw-prose-headings': '#0F172A',
                    '--tw-prose-body': '#0F172A',
                    '--tw-prose-links': '#10B981',
                    '--tw-prose-bold': '#0F172A',
                    '--tw-prose-counters': '#10B981',
                    '--tw-prose-bullets': '#10B981',
                    '--tw-prose-hr': '#E5E7EB',
                    '--tw-prose-quotes': '#0F172A',
                    '--tw-prose-quote-borders': '#10B981',
                    '--tw-prose-captions': '#6B7280',
                    '--tw-prose-code': '#0F172A',
                    '--tw-prose-pre-code': '#E5E7EB',
                    '--tw-prose-pre-bg': '#1F2937',
                    '--tw-prose-th-borders': '#D1D5DB',
                    '--tw-prose-td-borders': '#E5E7EB'
                  } as React.CSSProperties}
                />
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-16 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden"
            >
              {/* Background pattern */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Behöver du hjälp med din flytt i Stockholm?
                </h3>
                <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
                  Låt oss hjälpa dig med din flytt. Vi erbjuder professionell flyttservice med fast pris och kvalitetsgaranti. Kontakta oss för en kostnadsfri offert.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/fa-offert"
                    className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors group"
                  >
                    Få offert på 1 minut
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Kontakta oss
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="mx-auto px-24">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-3xl font-bold text-[#0F172A] mb-12 text-center"
              >
                Relaterade artiklar
              </motion.h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {post.relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.slug}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/blogg/${relatedPost.slug}`}
                        className="inline-flex items-center text-[#10B981] font-medium hover:text-[#0F172A] transition-colors group"
                      >
                        Läs mer
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
} 