'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from '@/app/contexts/LanguageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 } 
};

// Mobile Statistics Slider Component
const MobileStatsSlider = ({ postSlug, locale }: { postSlug: string, locale: string }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const autoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);
  
  const restartAutoSlide = () => {
    if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
    autoIntervalRef.current = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 3);
    }, 3000);
  };

  useEffect(() => {
    restartAutoSlide();
    return () => {
      if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchCurrentXRef.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchCurrentXRef.current == null) return;
    const deltaX = touchCurrentXRef.current - touchStartXRef.current;
    const threshold = 50; // px
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setCurrentCard((prev) => (prev + 1) % 3);
      } else {
        setCurrentCard((prev) => (prev - 1 + 3) % 3);
      }
      restartAutoSlide();
    }
    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
  };

  const cards = postSlug === "flyttstadning-vad-du-behover-veta" ? [
    {
        title: locale === 'en' ? 'Move-out Cleanings' : 'Flyttstädningar',
      count: 7000,
        description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 0
    },
    {
        title: locale === 'en' ? 'Home Cleanings' : 'Hemstädningar',
      count: 5000,
        description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 1
    },
    {
        title: locale === 'en' ? 'Office Cleanings' : 'Företagsstädningar',
      count: 2000,
        description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
        delay: 2
      }
  ] : postSlug === "magasinering-vad-du-behover-veta" ? [
    {
      title: locale === 'en' ? 'Storage Assignments' : 'Magasineringsuppdrag',
      count: 3000,
      description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 0
    },
    {
      title: locale === 'en' ? 'Storage Facilities' : 'Förvaringslokaler',
      count: 500,
      description: locale === 'en' ? 'sqm available' : 'kvm tillgängliga',
      delay: 1
    },
    {
      title: locale === 'en' ? 'Monthly' : 'Månadsvis',
      count: 200,
      description: locale === 'en' ? 'assignments per month' : 'uppdrag per månad',
      delay: 2
    }
  ] : postSlug === "fonsterputs-vad-du-behover-veta" ? [
    {
      title: locale === 'en' ? 'Window Cleanings' : 'Fönsterputsningar',
      count: 4000,
      description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 0
    },
    {
      title: locale === 'en' ? 'Home Cleanings' : 'Hemstädningar',
      count: 2000,
      description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 1
    },
    {
      title: locale === 'en' ? 'Office Windows' : 'Kontorsfönster',
      count: 1500,
      description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 2
    }
  ] : postSlug === "hemstadning-vad-du-behover-veta" ? [
    {
      title: locale === 'en' ? 'Home Cleanings' : 'Hemstädningar',
      count: 5000,
      description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 0
    },
    {
      title: locale === 'en' ? 'Regular Customers' : 'Regelbundna kunder',
      count: 1200,
      description: locale === 'en' ? 'active subscriptions' : 'aktiva abonnemang',
      delay: 1
    },
    {
      title: locale === 'en' ? 'Monthly' : 'Månadsvis',
      count: 800,
      description: locale === 'en' ? 'home cleanings' : 'hemstädningar',
      delay: 2
    }
  ] : postSlug === "kontorsstadning-vad-du-behover-veta" ? [
    {
      title: locale === 'en' ? 'Office Cleanings' : 'Kontorsstädningar',
      count: 2500,
      description: locale === 'en' ? 'assignments completed' : 'uppdrag utförda',
      delay: 0
    },
    {
      title: locale === 'en' ? 'Business Customers' : 'Företagskunder',
      count: 800,
      description: locale === 'en' ? 'active contracts' : 'aktiva kontrakt',
      delay: 1
    },
    {
      title: locale === 'en' ? 'Weekly' : 'Veckovis',
      count: 400,
      description: locale === 'en' ? 'office cleanings' : 'kontorsstädningar',
      delay: 2
    }
  ] : [
    {
      title: 'Flyttar',
      count: 8000,
      description: 'uppdrag utförda',
      delay: 0
    },
    {
      title: 'Städningar',
      count: 7000,
      description: 'uppdrag utförda',
      delay: 1
    },
    {
      title: 'Månadsvis',
      count: 500,
      description: 'uppdrag per månad',
      delay: 2
    }
  ];

  return (
    <div className="md:hidden flex justify-center">
      <div className="relative overflow-hidden rounded-xl w-full max-w-sm" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentCard * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <motion.div 
                className="relative bg-white/10 rounded-xl p-8 shadow-lg text-white flex flex-col items-center justify-center h-full mx-2"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: card.delay * 0.25 }}
              >
                <div className="text-3xl font-bold mb-2">
                  <CountUp 
                    end={card.count} 
                    duration={2.5}
                    suffix="+"
                    useEasing={true}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </div>
                <div className="text-base font-medium mb-1">{card.title}</div>
                <div className="text-sm text-white/80">{card.description}</div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Arrow controls */}
        <button
          type="button"
          aria-label="Föregående"
          onClick={() => { setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length); restartAutoSlide(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-25 text-white/80 hover:text-white transition-colors p-2 -m-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 111.06 1.06L10.56 12l5.22 5.22a.75.75 0 010 1.06z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Nästa"
          onClick={() => { setCurrentCard((prev) => (prev + 1) % cards.length); restartAutoSlide(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-25 text-white/80 hover:text-white transition-colors p-2 -m-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L13.44 12 8.22 6.78a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-3 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCard(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentCard ? 'bg-[#10B981]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample blog post data - you can replace this with real content from a CMS or database
const blogPosts = [
  {
    slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma",
    title: {
      sv: "Vad bör du tänka på när du väljer en seriös flyttfirma",
      en: "What to Consider When Choosing a Reliable Moving Company"
    },
    excerpt: {
      sv: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips för att identifiera en seriös och pålitlig flyttfirma som tar hand om dina ägodelar med omsorg.",
      en: "Choosing the right moving company is crucial for a smooth move. Here we share our most important tips for identifying a serious and reliable moving company that takes care of your belongings with care."
    },
    category: {
      sv: "Flytttips",
      en: "Moving Tips"
    },
    date: "2024-01-20",
    readTime: "10 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">1. Kontrollera företagets registrering och licenser</h2>
      <p>En seriös flyttfirma ska vara registrerad hos Bolagsverket och ha alla nödvändiga tillstånd. Kontrollera att företaget har rätt registreringsnummer och att det inte finns några varningar eller sanktioner mot företaget.</p>
      <p><strong>Vad du ska kontrollera:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Företagsregistrering hos Bolagsverket</li>
            <li>F-skatt (Företagsskatt) registrering</li>
            <li>Transportörlicens för godsfordon</li>
            <li>Försäkringar och säkerhetsställningar</li>
            <li>Medlemskap i branschorganisationer</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/innanflyttfirmankommer.webp" alt="Förberedelser innan flyttfirman kommer" class="w-full h-64 rounded-lg shadow-lg object-cover -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Förberedelser innan flyttfirman kommer - en viktig del av att välja rätt flyttfirma</p>
        </div>
      </div>
      
      <h2 class="font-bold">2. Undersök företagets rykte och erfarenhet</h2>
      <p>Läs recensioner och omdömen från tidigare kunder. En seriös flyttfirma har vanligtvis många positiva recensioner och är transparent med både positiva och negativa omdömen. Undersök också hur länge företaget har varit verksamt.</p>
      
      <p><strong>Var du kan hitta recensioner:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Google Reviews</li>
            <li>Trustpilot</li>
            <li>Företagets hemsida</li>
            <li>Bekanta och familj</li>
            <li>Reco</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/recommendedcompany2.webp" alt="Rekommenderad flyttfirma" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">3. Kräv skriftlig offert och kontrakt</h2>
      <p>En seriös flyttfirma ger alltid en skriftlig offert som är detaljerad och transparent. Offerten ska innehålla alla kostnader, inga dolda avgifter, och tydliga villkor. Läs igenom kontraktet noggrant innan du skriver under.</p>
      
      <p><strong>Vad som ska finnas i offerten:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
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
          <img src="/viktigaavtalcustomer.webp" alt="Skriftlig offert och kontrakt" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">En seriös flyttfirma ger alltid en skriftlig och detaljerad offert</p>
        </div>
      </div>
      
      <h2 class="font-bold">4. Kontrollera försäkringar och säkerhetsställningar</h2>
      <p>En seriös flyttfirma har omfattande försäkringar som skyddar både företaget och dig som kund. Kontrollera att företaget har rätt försäkringar och att de täcker eventuella skador på dina ägodelar under transporten.</p>
      <p><strong>Viktiga försäkringar att kontrollera:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Ansvarsförsäkring för godsfordon</li>
            <li>Försäkring för kundens ägodelar</li>
            <li>Arbetsmiljöförsäkring för personal</li>
            <li>Företagsansvarsförsäkring</li>
           
          </ul>
        </div>
        <div class="flex-1">
          <img src="/trygg-hansa-logo.png" alt="Trygg-Hansa försäkring" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
          <p class="text-sm text-gray-600 mt-2 text-center">Trygg-Hansa försäkring - viktigt för din trygghet vid flytt</p>
        </div>
      </div>
      
      <h2 class="font-bold">5. Undersök företagets personal och fordon</h2>
      <p>Kontrollera att flyttfirman använder egen personal och inte underentreprenörer. Fråga om personalens erfarenhet och utbildning. Undersök också fordonens skick och storlek för att säkerställa att de räcker för din flytt.</p>
      
      <p><strong>Vad du ska fråga om:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Använder företaget egen personal?</li>
            <li>Vilken erfarenhet har flyttarbetarna?</li>
            <li>Finns det utbildad personal för specialflyttar?</li>
            <li>Vilken typ och storlek på fordon används?</li>
            <li>Är fordonen väl underhållna?</li>
            <li>Finns det tillräckligt med utrustning?</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/personalpicture.webp" alt="Professionell flyttpersonal" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Erfaren och professionell personal är avgörande för en smidig flytt</p>
        </div>
      </div>
      
      <h2 class="font-bold">6. Kontrollera företagets lokala närvaro</h2>
      <p>En flyttfirma som är etablerad i ditt område känner till lokala förhållanden, parkeringsregler och trafikflöden. Detta kan göra flytten mycket smidigare och mer effektiv.</p>
      <p><strong>Fördelar med lokal flyttfirma:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Känner till lokala förhållanden</li>
            <li>Snabbare responstid vid problem</li>
            <li>Bättre kundservice</li>
            <li>Lättare att få referenser</li>
            <li>Känner till parkeringsregler</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Lokal flyttfirma i Stockholm" class="w-full rounded-lg shadow-lg mt-0 md:-mt-12" />
        </div>
      </div>
      
      <h2 class="font-bold">7. Undersök företagets kundservice och kommunikation</h2>
      <p>En seriös flyttfirma har bra kundservice och kommunicerar tydligt och professionellt. De svarar snabbt på frågor, är transparenta med information och gör det enkelt att komma i kontakt med dem.</p>
      <p><strong>Tecken på bra kundservice:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Snabba svar på förfrågningar</li>
            <li>Tydlig och professionell kommunikation</li>
            <li>Transparent information</li>
            <li>Lätt att komma i kontakt</li>
            <li>Proaktiv kommunikation</li>
            <li>Dedikerad kontaktperson</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/kundservice.webp" alt="Kundservice och kommunikation" class="w-full h-60 rounded-lg shadow-lg mt-0 md:-mt-12 object-cover" />
        </div>
      </div>
      
      <h2 class="font-bold">8. Kontrollera företagets specialiseringar</h2>
      <p>Olika flyttar kräver olika kompetenser. Kontrollera att flyttfirman har erfarenhet av din typ av flytt - oavsett om det är en lägenhetsflytt, villaflytt, kontorsflytt eller specialflytt med känsliga föremål.</p>
      
      <p><strong>Specialiseringar att tänka på:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
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
          <img src="/specialicering.webp" alt="Specialiserade flyttar som pianoflytt" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Vissa flyttar kräver specialkompetens, som pianoflytt eller flytt av konst</p>
        </div>
      </div>
      
      <h2 class="font-bold">9. Undersök företagets miljöarbete och hållbarhet</h2>
      <p>Allt fler kunder värdesätter företag som tar miljöansvar. En seriös flyttfirma arbetar aktivt med hållbarhet och miljöfrågor, från miljövänliga fordon till återvinning av förpackningsmaterial.</p>
      <p><strong>Miljöaspekter att kontrollera:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Miljövänliga fordon</li>
            <li>Återvinning av förpackningsmaterial</li>
            <li>Energisnåla lösningar</li>
            <li>Miljöcertifieringar</li>
            <li>Hållbar verksamhet</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttella-logo.png" alt="Flyttella logo" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">10. Lita på din magkänsla</h2>
      <p>Trots alla checklistor och kriterier är det viktigt att lita på din magkänsla. Om något känns fel eller om flyttfirman inte ger dig en trygg känsla, fortsätt leta. En seriös flyttfirma ska ge dig trygghet och förtroende.</p>
      <p><strong>Varningstecken att vara uppmärksam på:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Otydliga eller undvikande svar</li>
            <li>Orealistiskt låga priser</li>
            <li>Krav på kontantbetalning</li>
            <li>Otydliga kontrakt</li>
            <li>Dålig kommunikation</li>
            <li>Tryck på att besluta snabbt</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/magkansla.webp" alt="Lita på din magkänsla" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">Sammanfattning</h2>
      <p>Att välja en seriös flyttfirma kräver tid och noggrannhet, men det är en investering som löner sig. Genom att följa dessa riktlinjer kan du minimera risken för problem och säkerställa en smidig flyttupplevelse. Kom ihåg att det bästa priset inte alltid är det billigaste - kvalitet, säkerhet och pålitlighet är ofta värt den extra kostnaden.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Viktiga punkter att komma ihåg:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Kontrollera alltid företagets registrering och licenser</li>
            <li>Läs recensioner och omdömen från tidigare kunder</li>
            <li>Kräv skriftlig offert och kontrakt</li>
            <li>Verifiera försäkringar och säkerhetsställningar</li>
            <li>Undersök personal och fordon</li>
            <li>Lita på din magkänsla</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/happycustomeraftermoving.webp" alt="Nöjd kund efter flytt" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">En seriös flyttfirma säkerställer en smidig flytt och nöjda kunder</p>
        </div>
      </div>
      
      <p><strong>Behöver du hjälp med att välja flyttfirma?</strong> Flyttella är en etablerad och seriös flyttfirma i Stockholmsområdet med över 8000 genomförda flyttar. Vi erbjuder transparenta priser, omfattande försäkringar och professionell service. Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig med din flytt.</p>
    `,
      en: `
      <h2 class="font-bold">1. Check the company's registration and licenses</h2>
      <p>A serious moving company should be registered with the Swedish Companies Registration Office and have all necessary permits. Check that the company has the correct registration number and that there are no warnings or sanctions against the company.</p>
      <p><strong>What you should check:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Company registration with the Swedish Companies Registration Office</li>
            <li>F-tax (Corporate tax) registration</li>
            <li>Transport license for goods vehicles</li>
            <li>Insurance and security deposits</li>
            <li>Membership in industry organizations</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/innanflyttfirmankommer.webp" alt="Preparations before the moving company arrives" class="w-full h-64 rounded-lg shadow-lg object-cover -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Preparations before the moving company arrives - an important part of choosing the right moving company</p>
        </div>
      </div>
      
      <h2 class="font-bold">2. Investigate the company's reputation and experience</h2>
      <p>Read reviews and testimonials from previous customers. A serious moving company usually has many positive reviews and is transparent with both positive and negative reviews. Also investigate how long the company has been in business.</p>
      
      <p><strong>Where you can find reviews:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Google Reviews</li>
            <li>Trustpilot</li>
            <li>Company website</li>
            <li>Friends and family</li>
            <li>Reco</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/recommendedcompany2.webp" alt="Recommended moving company" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">3. Demand written quote and contract</h2>
      <p>A serious moving company always provides a written quote that is detailed and transparent. The quote should include all costs, no hidden fees, and clear terms. Read through the contract carefully before signing.</p>
      
      <p><strong>What should be included in the quote:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Detailed cost breakdown</li>
            <li>What's included and not included</li>
            <li>Moving date and timeframe</li>
            <li>Number of movers and vehicles</li>
            <li>Insurance and liability terms</li>
            <li>Payment terms</li>
            <li>Cancellation terms</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/viktigaavtalcustomer.webp" alt="Written quote and contract" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">A serious moving company always provides a written and detailed quote</p>
        </div>
      </div>
      
      <h2 class="font-bold">4. Verify insurance and security deposits</h2>
      <p>A serious moving company has comprehensive insurance that protects both the company and you as a customer. Check that the company has the right insurance and that it covers any damage to your belongings during transport.</p>
      <p><strong>Important insurance to check:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Liability insurance for goods vehicles</li>
            <li>Insurance for customer's belongings</li>
            <li>Work environment insurance for staff</li>
            <li>Corporate liability insurance</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/trygg-hansa-logo.png" alt="Trygg-Hansa insurance" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
          <p class="text-sm text-gray-600 mt-2 text-center">Trygg-Hansa insurance - important for your security during the move</p>
        </div>
      </div>
      
      <h2 class="font-bold">5. Investigate the company's staff and vehicles</h2>
      <p>Check that the moving company uses their own staff and not subcontractors. Ask about the staff's experience and training. Also investigate the condition and size of the vehicles to ensure they are sufficient for your move.</p>
      
      <p><strong>What you should ask about:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Does the company use their own staff?</li>
            <li>What experience do the movers have?</li>
            <li>Is there trained staff for special moves?</li>
            <li>What type and size of vehicles are used?</li>
            <li>Are the vehicles well maintained?</li>
            <li>Is there sufficient equipment?</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/personalpicture.webp" alt="Professional moving staff" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Experienced and professional staff is crucial for a smooth move</p>
        </div>
      </div>
      
      <h2 class="font-bold">6. Check the company's local presence</h2>
      <p>A moving company established in your area knows local conditions, parking rules, and traffic flows. This can make the move much smoother and more efficient.</p>
      <p><strong>Advantages of local moving company:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Knows local conditions</li>
            <li>Faster response time for problems</li>
            <li>Better customer service</li>
            <li>Easier to get references</li>
            <li>Knows parking rules</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Local moving company in Stockholm" class="w-full rounded-lg shadow-lg mt-0 md:-mt-12" />
        </div>
      </div>
      
      <h2 class="font-bold">7. Check customer service and communication</h2>
      <p>Good communication is crucial for a smooth move. The company should be responsive, clear, and professional in all communication.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Quick responses to inquiries</li>
            <li>Clear and professional communication</li>
            <li>Transparent information</li>
            <li>Easy to get in touch</li>
            <li>Proactive communication</li>
            <li>Dedicated contact person</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/kundservice.webp" alt="Customer service and communication" class="w-full h-60 rounded-lg shadow-lg mt-0 md:-mt-12 object-cover" />
        </div>
      </div>
      
      <h2 class="font-bold">8. Check the company's specializations</h2>
      <p>Different moves require different competencies. Check that the moving company has experience with your type of move - whether it's an apartment move, house move, office move, or special move with sensitive items.</p>
      
      <p><strong>Specializations to consider:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Apartment moves</li>
            <li>House moves</li>
            <li>Office moves</li>
            <li>Piano moves</li>
            <li>Art and antiques</li>
            <li>International moves</li>
            <li>Long-distance moves</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/specialicering.webp" alt="Specialized moves like piano moves" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Some moves require special expertise, like piano moves or moving art</p>
        </div>
      </div>
      
      <h2 class="font-bold">9. Investigate the company's environmental work and sustainability</h2>
      <p>More and more customers value companies that take environmental responsibility. A serious moving company actively works with sustainability and environmental issues, from eco-friendly vehicles to recycling of packaging materials.</p>
      <p><strong>Environmental aspects to check:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Eco-friendly vehicles</li>
            <li>Recycling of packaging materials</li>
            <li>Energy-efficient solutions</li>
            <li>Environmental certifications</li>
            <li>Sustainable operations</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttella-logo.png" alt="Flyttella logo" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">10. Trust your gut feeling</h2>
      <p>Finally, trust your instincts. If something feels wrong or if the company seems unprofessional, it's better to choose another company. A good moving company should make you feel confident and secure.</p>
      <p><strong>Warning signs to watch out for:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Unclear or evasive answers</li>
            <li>Unrealistically low prices</li>
            <li>Demand for cash payment</li>
            <li>Unclear contracts</li>
            <li>Poor communication</li>
            <li>Pressure to decide quickly</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/magkansla.webp" alt="Trust your gut feeling" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">Summary</h2>
      <p>Choosing a serious moving company requires time and thoroughness, but it's an investment that pays off. By following these guidelines, you can minimize the risk of problems and ensure a smooth moving experience. Remember that the best price is not always the cheapest - quality, safety, and reliability are often worth the extra cost.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Important points to remember:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Always check the company's registration and licenses</li>
            <li>Read reviews and testimonials from previous customers</li>
            <li>Demand written quote and contract</li>
            <li>Verify insurance and security deposits</li>
            <li>Investigate staff and vehicles</li>
            <li>Trust your gut feeling</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttella-logo.png" alt="Flyttella logo" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <p><strong>Need help choosing a moving company?</strong> Flyttella is an established and serious moving company in the Stockholm area with over 8000 completed moves. We offer transparent prices, comprehensive insurance, and professional service. Contact us for a free quote and let us help you with your move.</p>
    </div>
  </div>
</div>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "10 Tips för en Smidig Flytt i Stockholm",
          en: "10 Tips for a Smooth Move in Stockholm"
        },
        slug: "10-tips-for-en-smidig-flytt-i-stockholm",
        excerpt: {
          sv: "Planera din flytt i Stockholm med våra beprövade tips.",
          en: "Plan your move in Stockholm with our proven tips."
        }
      },
      {
        title: {
          sv: "Flyttstädning - Vad Du Behöver Veta",
          en: "Move-out Cleaning - What You Need to Know"
        },
        slug: "flyttstadning-vad-du-behover-veta",
        excerpt: {
          sv: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick.",
          en: "Everything about move-out cleaning and what's required to leave your old home in perfect condition."
        }
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
        title: {
          sv: "Vad bör du tänka på när du väljer en seriös flyttfirma",
          en: "What to Consider When Choosing a Reliable Moving Company"
        },
        slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma",
        excerpt: {
          sv: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips.",
          en: "Choosing the right moving company is crucial for a smooth move. Here we share our most important tips."
        }
      },
      {
        title: {
          sv: "Flyttstädning - Vad Du Behöver Veta",
          en: "Moving Cleaning - What You Need to Know"
        },
        slug: "flyttstadning-vad-du-behover-veta",
        excerpt: {
          sv: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick.",
          en: "Everything about moving cleaning and what's required to leave your old home in perfect condition."
        }
      }
    ]
  },
  {
    slug: "flyttstadning-vad-du-behover-veta",
      title: {
        sv: "Flyttstädning - Vad Du Behöver Veta",
        en: "Move-out Cleaning - What You Need to Know"
      },
      excerpt: {
        sv: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick. Vi guidar dig genom hela processen.",
        en: "Everything about move-out cleaning and what's required to leave your old home in perfect condition. We guide you through the entire process."
      },
      category: {
        sv: "Städning",
        en: "Cleaning"
      },
    date: "2024-01-25",
    readTime: "8 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">1. Vad är flyttstädning?</h2>
      <p>Flyttstädning är en grundlig städning av din gamla bostad som ska utföras innan du lämnar den. Detta är ofta ett krav i hyreskontrakt och är viktigt för att säkerställa att du får tillbaka din deposition eller att köparen får en ren bostad.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Vad som förväntas av en flyttstädning:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Grundlig städning av alla ytor</li>
            <li>Fönsterputsning</li>
            <li>Sanering av kök och badrum</li>
            <li>Städning av garderober och förråd</li>
            <li>Balkong/terrassstädning</li>
            <li>Städning av källare/garage</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/cleaning_lady.webp" alt="Professionell flyttstädning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 30%;" />
          <p class="text-sm text-gray-600 mt-2 text-center">Professionell flyttstädning säkerställer att din bostad lämnas i perfekt skick</p>
        </div>
      </div>
      
      <h2 class="font-bold">2. Undersök företagets rykte och erfarenhet</h2>
      <p>Läs recensioner och omdömen från tidigare kunder. En seriös flyttfirma har vanligtvis många positiva recensioner och är transparent med både positiva och negativa omdömen. Undersök också hur länge företaget har varit verksamt.</p>
      
      <p><strong>Var du kan hitta recensioner:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Google Reviews</li>
            <li>Trustpilot</li>
            <li>Företagets hemsida</li>
            <li>Bekanta och familj</li>
            <li>Reco</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/recommendedcompany2.webp" alt="Rekommenderad flyttfirma" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">3. Vad kostar flyttstädning?</h2>
      <p>Kostnaden för flyttstädning varierar beroende på storlek, skick och omfattning. En lägenhet på 50-70 kvm kostar vanligtvis mellan 1 450-2 000 kr.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Faktorer som påverkar priset:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Bostadens storlek</li>
            <li>Antal rum och våningar</li>
            <li>Bostadens skick</li>
            <li>Specialbehov (höga tak, svårtillgängliga ytor)</li>
            <li>Balkong/terrass</li>
            <li>Källare/garage</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/cleaning_background.webp" alt="Flyttstädning kostnad" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Kostnaden för flyttstädning varierar beroende på bostadens storlek och skick</p>
        </div>
      </div>
      
      <h2 class="font-bold">4. RUT-avdrag på flyttstädning</h2>
      <p>Flyttstädning är RUT-avdragsgill, vilket betyder att du kan få 50% av kostnaden tillbaka via skatteverket. Detta gör professionell flyttstädning mycket mer kostnadseffektiv.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Vad du behöver veta om RUT-avdrag:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Max 50 000 kr per person och år</li>
            <li>Kvittot från städfirman krävs</li>
            <li>Företaget måste vara RUT-registrerat</li>
            <li>Avdraget görs i din deklaration</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttella-logo.png" alt="RUT-avdrag flyttstädning" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">5. Vad ingår i en professionell flyttstädning?</h2>
      <p>En professionell flyttstädning inkluderar allt som behövs för att lämna bostaden i perfekt skick. Här är en detaljerad översikt:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Kök:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Städning av alla skåp och lådor</li>
            <li>Sanering av spis, ugn och micro</li>
            <li>Diskbänk och kranar</li>
            <li>Kylskåp och frys</li>
            <li>Golv och väggar</li>
          </ul>
          
          <p><strong>Badrum:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Toalett, handfat och badkar/dusch</li>
            <li>Speglar och väggar</li>
            <li>Golv och fogar</li>
            <li>Ventilation</li>
          </ul>
        </div>
        <div class="flex-1">
          <p><strong>Övriga rum:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Alla golvytor</li>
            <li>Dörrar och karmar</li>
            <li>Lister och taklister</li>
            <li>Eluttag och strömbrytare</li>
            <li>Fönster och fönsterkarmar</li>
          </ul>
          
          <p><strong>Fönsterputsning:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Alla fönster in- och utsida</li>
            <li>Fönsterkarmar</li>
            <li>Balkongdörrar</li>
            <li>Speglar</li>
          </ul>
        </div>
      </div>
      
      <h2 class="font-bold">6. Förberedelser innan flyttstädning</h2>
      <p>För att få bästa resultat från flyttstädningen är det viktigt att förbereda bostaden ordentligt. Här är vad du behöver göra:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Innan städfirman kommer:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Flytta ut allt bohag</li>
            <li>Ta bort alla personliga föremål</li>
            <li>Lämna nycklar tillgängliga</li>
            <li>Informera om eventuella problem</li>
            <li>Stäng av vatten och el om möjligt</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/cleaning_lady.webp" alt="Professionell flyttstädning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 30%;" />
          <p class="text-sm text-gray-600 mt-2 text-center">Professionell flyttstädning säkerställer att din bostad lämnas i perfekt skick</p>
        </div>
      </div>
      
      <h2 class="font-bold">7. När ska flyttstädning utföras?</h2>
      <p>Flyttstädning ska utföras efter att du har flyttat ut allt ditt bohag men innan du lämnar nycklarna. Detta ger dig bästa möjliga resultat och säkerställer att inget missas.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Optimal tidpunkt:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Efter att allt bohag är utflyttat</li>
            <li>Innan nycklarna lämnas tillbaka</li>
            <li>Minst 24 timmar innan överlämning</li>
            <li>Under vardagar för bästa tillgänglighet</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/fonsterputs_intro.webp" alt="När ska flyttstädning utföras" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>
      
      <h2 class="font-bold">8. Välja rätt städfirma</h2>
      <p>Att välja rätt städfirma är avgörande för en lyckad flyttstädning. Här är vad du ska tänka på:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Kontrollera:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>F-skattregistrering</li>
            <li>Försäkringar</li>
            <li>Referenser från tidigare kunder</li>
            <li>Transparenta priser</li>
            <li>Städgaranti</li>
            <li>RUT-registrering</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/varafarmaner_flyttstad.webp" alt="Professionell städfirma" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Välj en seriös och RUT-registrerad städfirma för bästa resultat</p>
        </div>
      </div>
      
      <h2 class="font-bold">9. Tips för att spara pengar</h2>
      <p>Det finns flera sätt att göra flyttstädningen mer kostnadseffektiv utan att kompromissa med kvaliteten:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Boka i god tid för bättre priser</li>
            <li>Undvik helger och högtider</li>
            <li>Förbered bostaden ordentligt</li>
            <li>Utnyttja RUT-avdraget</li>
            <li>Jämför priser från flera firmor</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttella-logo.png" alt="Tips för att spara pengar" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">10. Efter flyttstädningen</h2>
      <p>När flyttstädningen är klar är det viktigt att kontrollera resultatet och säkerställa att allt är som det ska vara innan du lämnar nycklarna.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Kontrollera:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Alla rum systematiskt</li>
            <li>Att inget är kvar i skåp</li>
            <li>Att alla ytor är rena</li>
            <li>Att fönster är putsade</li>
            <li>Att allt fungerar som det ska</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/byggstadning_2.webp" alt="Nöjd kund efter flyttstädning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>
      
      <h2 class="font-bold">Sammanfattning</h2>
      <p>Flyttstädning är en viktig del av flyttprocessen som inte bör underskattas. Genom att välja en professionell städfirma och förbereda bostaden ordentligt kan du säkerställa en smidig överlämning och få tillbaka din deposition.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Viktiga punkter att komma ihåg:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Boka flyttstädning i god tid</li>
            <li>Välj en seriös och RUT-registrerad firma</li>
            <li>Förbered bostaden ordentligt</li>
            <li>Kontrollera resultatet noggrant</li>
            <li>Utnyttja RUT-avdraget</li>
            <li>Krav på städgaranti</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/omflyttella_flyttstad.webp" alt="Om Flyttella flyttstädning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Flyttella - Din pålitliga partner för professionell flyttstädning</p>
        </div>
      </div>
      
      <p><strong>Behöver du hjälp med flyttstädning?</strong> Flyttella erbjuder professionell flyttstädning i Stockholmsområdet med städgaranti och RUT-avdrag. Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig att lämna din bostad i perfekt skick.</p>
    `,
    en: `
      <h2 class="font-bold">1. What is move-out cleaning?</h2>
      <p>Move-out cleaning is a thorough cleaning of your old home that should be performed before you leave it. This is often a requirement in rental contracts and is important to ensure that you get your deposit back or that the buyer gets a clean home.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>What is expected from a move-out cleaning:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Thorough cleaning of all surfaces</li>
            <li>Window cleaning</li>
            <li>Sanitization of kitchen and bathroom</li>
            <li>Cleaning of closets and storage rooms</li>
            <li>Balcony/terrace cleaning</li>
            <li>Basement/garage cleaning</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/cleaning_lady.webp" alt="Professional move-out cleaning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 30%;" />
          <p class="text-sm text-gray-600 mt-2 text-center">Professional move-out cleaning ensures your home is left in perfect condition</p>
        </div>
      </div>
      
      <h2 class="font-bold">2. Investigate the company's reputation and experience</h2>
      <p>Read reviews and testimonials from previous customers. A serious cleaning company usually has many positive reviews and is transparent with both positive and negative reviews. Also investigate how long the company has been in business.</p>
      
      <p><strong>Where you can find reviews:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Google Reviews</li>
            <li>Trustpilot</li>
            <li>Company website</li>
            <li>Friends and family</li>
            <li>Recommendations</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/recommendedcompany2.webp" alt="Recommended cleaning company" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">3. Demand written quote and contract</h2>
      <p>A serious cleaning company always provides a written quote that is detailed and transparent. The quote should include all costs, no hidden fees, and clear terms. Read through the contract carefully before signing.</p>
      
      <p><strong>What should be included in the quote:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Detailed cost breakdown</li>
            <li>What's included and not included</li>
            <li>Cleaning date and timeframe</li>
            <li>Number of cleaners and equipment</li>
            <li>Insurance and liability terms</li>
            <li>Payment terms</li>
            <li>Cancellation terms</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/viktigaavtalcustomer.webp" alt="Written quote and contract" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">A serious cleaning company always provides a written and detailed quote</p>
        </div>
      </div>
      
      <h2 class="font-bold">4. Verify insurance and security deposits</h2>
      <p>A serious cleaning company has comprehensive insurance that protects both the company and you as a customer. Check that the company has the right insurance and that it covers any damage to your property during cleaning.</p>
      <p><strong>Important insurance to check:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Liability insurance for cleaning services</li>
            <li>Insurance for customer's property</li>
            <li>Work environment insurance for staff</li>
            <li>Corporate liability insurance</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/trygg-hansa-logo.png" alt="Trygg-Hansa insurance" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
          <p class="text-sm text-gray-600 mt-2 text-center">Trygg-Hansa insurance - important for your security during cleaning</p>
        </div>
      </div>
      
      <h2 class="font-bold">5. Investigate the company's staff and equipment</h2>
      <p>Check that the cleaning company uses their own staff and not subcontractors. Ask about the staff's experience and training. Also investigate the condition and quality of the equipment to ensure they are sufficient for your cleaning needs.</p>
      
      <p><strong>What you should ask about:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Does the company use their own staff?</li>
            <li>What experience do the cleaners have?</li>
            <li>Is there trained staff for special cleaning?</li>
            <li>What type and quality of equipment is used?</li>
            <li>Is the equipment well maintained?</li>
            <li>Is there sufficient cleaning supplies?</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/personalpicture.webp" alt="Professional cleaning staff" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Experienced and professional staff is crucial for a thorough cleaning</p>
        </div>
      </div>
      
      <h2 class="font-bold">6. Check the company's local presence</h2>
      <p>A cleaning company established in your area knows local conditions, building regulations, and cleaning standards. This can make the cleaning much more efficient and thorough.</p>
      <p><strong>Advantages of local cleaning company:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Knows local conditions</li>
            <li>Faster response time for problems</li>
            <li>Better customer service</li>
            <li>Easier to get references</li>
            <li>Knows building regulations</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Local cleaning company in Stockholm" class="w-full rounded-lg shadow-lg mt-0 md:-mt-12" />
        </div>
      </div>
      
      <h2 class="font-bold">7. Investigate the company's customer service and communication</h2>
      <p>A serious cleaning company has good customer service and communicates clearly and professionally. They respond quickly to questions, are transparent with information, and make it easy to get in touch with them.</p>
      <p><strong>Signs of good customer service:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Quick responses to inquiries</li>
            <li>Clear and professional communication</li>
            <li>Transparent information</li>
            <li>Easy to get in touch</li>
            <li>Proactive communication</li>
            <li>Dedicated contact person</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/kundservice.webp" alt="Customer service and communication" class="w-full h-60 rounded-lg shadow-lg mt-0 md:-mt-12 object-cover" />
        </div>
      </div>
      
      <h2 class="font-bold">8. Check the company's specializations</h2>
      <p>Different cleaning needs require different competencies. Check that the cleaning company has experience with your type of cleaning - whether it's apartment cleaning, house cleaning, office cleaning, or special cleaning with sensitive items.</p>
      
      <p><strong>Specializations to consider:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Apartment cleaning</li>
            <li>House cleaning</li>
            <li>Office cleaning</li>
            <li>Deep cleaning</li>
            <li>Post-construction cleaning</li>
            <li>Eco-friendly cleaning</li>
            <li>Specialized cleaning</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/specialicering.webp" alt="Specialized cleaning services" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Some cleaning requires special expertise, like post-construction cleaning</p>
        </div>
      </div>
      
      <h2 class="font-bold">9. Investigate the company's environmental work and sustainability</h2>
      <p>More and more customers value companies that take environmental responsibility. A serious cleaning company actively works with sustainability and environmental issues, from eco-friendly products to recycling of cleaning materials.</p>
      <p><strong>Environmental aspects to check:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Eco-friendly cleaning products</li>
            <li>Recycling of cleaning materials</li>
            <li>Energy-efficient solutions</li>
            <li>Environmental certifications</li>
            <li>Sustainable operations</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttella-logo.png" alt="Flyttella logo" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <h2 class="font-bold">10. Trust your gut feeling</h2>
      <p>Finally, trust your instincts. If something feels wrong or if the company seems unprofessional, it's better to choose another company. A good cleaning company should make you feel confident and secure.</p>
      <p><strong>Warning signs to watch out for:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Unclear or evasive answers</li>
            <li>Unrealistically low prices</li>
            <li>Demand for cash payment</li>
            <li>Unclear contracts</li>
            <li>Poor communication</li>
            <li>Pressure to decide quickly</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/magkansla.webp" alt="Trust your gut feeling" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
        </div>
      </div>
      
      <h2 class="font-bold">Summary</h2>
      <p>Choosing a serious cleaning company requires time and thoroughness, but it's an investment that pays off. By following these guidelines, you can minimize the risk of problems and ensure a thorough cleaning experience. Remember that the best price is not always the cheapest - quality, safety, and reliability are often worth the extra cost.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Important points to remember:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Always check the company's registration and licenses</li>
            <li>Read reviews and testimonials from previous customers</li>
            <li>Demand written quote and contract</li>
            <li>Verify insurance and security deposits</li>
            <li>Investigate staff and equipment</li>
            <li>Trust your gut feeling</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttella-logo.png" alt="Flyttella logo" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>
      
      <p><strong>Need help choosing a cleaning company?</strong> Flyttella is an established and serious cleaning company in the Stockholm area with over 8000 completed moves and thousands of satisfied cleaning customers. We offer transparent prices, comprehensive insurance, and professional service. Contact us for a free quote and let us help you with your move-out cleaning.</p>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "Vad bör du tänka på när du väljer en seriös flyttfirma",
          en: "What to Consider When Choosing a Reliable Moving Company"
        },
        slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma",
        excerpt: {
          sv: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips.",
          en: "Choosing the right moving company is crucial for a smooth move. Here we share our most important tips."
        }
      },
      {
        title: {
          sv: "10 Tips för en Smidig Flytt i Stockholm",
          en: "10 Tips for a Smooth Move in Stockholm"
        },
        slug: "10-tips-for-en-smidig-flytt-i-stockholm",
        excerpt: {
          sv: "Planera din flytt i Stockholm med våra beprövade tips.",
          en: "Plan your move in Stockholm with our proven tips."
        }
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
        slug: "flyttstadning-vad-du-behover-veta",
        excerpt: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick."
      }
    ]
  },
  {
    slug: "utlandsflytt-vad-du-behover-veta",
      title: {
        sv: "Utlandsflytt – Vad du behöver veta",
        en: "International Moving – What You Need to Know"
      },
      excerpt: {
        sv: "Planering, dokument och genomförande av utlandsflytt. En komplett guide för en trygg flytt över gränser.",
        en: "Planning, documents and execution of international moves. A complete guide for a safe move across borders."
      },
      category: {
        sv: "Utlandsflytt",
        en: "International Moving"
      },
    date: "2024-02-01",
    readTime: "9 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">1. Planera i god tid</h2>
      <p>Utlandsflytt kräver längre framförhållning än en inrikes flytt. Sätt en tidsplan för packning, dokument, transport och leveransfönster. Räkna med extra tid för gränsövergångar, helgdagar och oförutsedda händelser.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Inventera bohaget och uppskatta volym (m³)</li>
            <li>Bestäm preliminärt flyttdatum och leveransfönster</li>
            <li>Gör en checklista vecka för vecka</li>
            <li>Identifiera särskilda behov (pianon, konst, etc.)</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/innanflyttfirmankommer.webp" alt="Förberedelser innan flyttfirman kommer" class="w-full h-64 rounded-lg shadow-lg object-cover -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Förberedelser innan flyttfirman kommer - en viktig del av att välja rätt flyttfirma</p>
        </div>
      </div>

      <h2 class="font-bold">2. Dokument och tull</h2>
      <p>Förbered nödvändiga dokument: inventarielista, tullvärden, försäkringsunderlag och identitetshandlingar. Reglerna varierar mellan länder – kontrollera införselregler i god tid.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Inventarielista med värden</li>
            <li>Pass, visum och eventuellt uppehållstillstånd</li>
            <li>Försäkringsbrev för internationell transport</li>
            <li>Intyg för husdjur, läkemedel och elektronik</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/personalpicture.webp" alt="Professionell flyttpersonal" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">3. Pris – fast eller rörligt</h2>
      <p>Pris påverkas av volym, destination, bärväg och tillval (packning, magasinering, montering). Välj mellan fast pris (förutsägbart) eller rörligt (flexibelt vid osäker omfattning).</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Volym i m³ och avstånd</li>
            <li>Bärväg, våningsplan, hiss</li>
            <li>Tidsfönster och åtkomlighet/parkering</li>
            <li>Tillägg: packning, emballage, magasinering</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/viktigaavtalcustomer.webp" alt="Skriftlig offert och kontrakt" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">En seriös flyttfirma ger alltid en skriftlig och detaljerad offert</p>
        </div>
      </div>

      <h2 class="font-bold">4. Undersök företagets rykte och erfarenhet</h2>
      <p>Läs recensioner och omdömen från tidigare kunder. En seriös flyttfirma har vanligtvis många positiva recensioner och är transparent med både positiva och negativa omdömen. Undersök också hur länge företaget har varit verksamt.</p>
      
      <p><strong>Var du kan hitta recensioner:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Google Reviews</li>
            <li>Trustpilot</li>
            <li>Företagets hemsida</li>
            <li>Bekanta och familj</li>
            <li>Reco</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/recommendedcompany2.webp" alt="Rekommenderad flyttfirma" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>

      <h2 class="font-bold">5. Försäkring och ansvar</h2>
      <p>Se över att försäkring täcker hela transportkedjan internationellt. Begär skriftliga villkor och förstå självrisken.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Godsansvar och transportförsäkring</li>
            <li>Villkor vid oförutsedda händelser</li>
            <li>Hur skador hanteras och anmäls</li>
            <li>Begränsningar och undantag</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/trygg-hansa-logo.png" alt="Försäkring utlandsflytt" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>

      <h2 class="font-bold">6. Logistik och rutt</h2>
      <p>Samordna lastningspunkt, rutt och leveransfönster. Kommunicera tydligt kring åtkomst, parkering och bärväg på båda adresserna.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Bokad lastzon och hiss</li>
            <li>Kontroll av vägavgifter och broar</li>
            <li>Tydlig kontakt vid leverans</li>
            <li>Buffert för förseningar</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Lokal flyttfirma i Stockholm" class="w-full rounded-lg shadow-lg mt-0 md:-mt-12" />
        </div>
      </div>

      <h2 class="font-bold">7. Packhjälp och montering</h2>
      <p>Överväg professionell packhjälp och montering/demontering av möbler och vitvaror för att spara tid och minska risker.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Exportpackning av känsliga föremål</li>
            <li>Demontering före lastning</li>
            <li>Montering vid leverans</li>
            <li>Emballagehantering</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/kundservice.webp" alt="Kundservice och kommunikation" class="w-full h-60 rounded-lg shadow-lg mt-0 md:-mt-12 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">8. Magasinering vid behov</h2>
      <p>Om datum inte sammanfaller kan tillfällig magasinering vara rätt. Välj säker förvaring och planera in/utleverans.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Kort- eller långtidsbehov</li>
            <li>Försäkringsskydd i förrådet</li>
            <li>Inventering vid in- och utleverans</li>
            <li>Temperatur och fukt</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/specialicering.webp" alt="Specialiserade flyttar som pianoflytt" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Vissa flyttar kräver specialkompetens, som pianoflytt eller flytt av konst</p>
        </div>
      </div>

      <h2 class="font-bold">9. Vanliga destinationer och tips</h2>
      <p>Olika länder har olika regler. Läs på om införsel, helgdagar och parkering. Planera tidsmarginal för högsäsonger.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Norden och EU: enklare tullprocesser</li>
            <li>Storbritannien: särskilda införselregler</li>
            <li>Spanien/Portugal: planera för värme och siesta</li>
            <li>Norge/Schweiz: tull och dokument</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/malaga.webp" alt="Destinationer" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">10. Sammanfattning</h2>
      <p>Med rätt planering, dokument och partners blir utlandsflytten trygg och effektiv. Sätt en tydlig tidsplan, säkerställ dokument och välj en erfaren flyttfirma.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Viktiga punkter att komma ihåg:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Inventarielista och tullvärden i tid</li>
            <li>Exportpackning och korrekt märkning</li>
            <li>Försäkring som täcker hela kedjan</li>
            <li>Logistik och tydlig kommunikation</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/happycustomeraftermoving.webp" alt="Nöjd kund efter flytt" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">En seriös flyttfirma säkerställer en smidig flytt och nöjda kunder</p>
        </div>
      </div>

      <p><strong>Behöver du hjälp med din utlandsflytt?</strong> Flyttella har lång erfarenhet av internationella flyttar – från planering och exportpackning till tullhandlingar och leverans. Kontakta oss för en kostnadsfri offert.</p>
    `,
    en: `
      <h2 class="font-bold">1. Plan early</h2>
      <p>International moving requires longer advance planning than domestic moving. Set a timeline for packing, documents, transport and delivery windows. Allow extra time for border crossings, holidays and unforeseen events.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Inventory belongings and estimate volume (m³)</li>
            <li>Determine preliminary moving date and delivery windows</li>
            <li>Create a week-by-week checklist</li>
            <li>Identify special needs (piano, art, etc.)</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/innanflyttfirmankommer.webp" alt="Preparations before the moving company arrives" class="w-full h-64 rounded-lg shadow-lg object-cover -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Preparations before the moving company arrives - an important part of choosing the right moving company</p>
        </div>
      </div>

      <h2 class="font-bold">2. Documents and customs</h2>
      <p>Prepare necessary documents: inventory list, customs values, insurance documentation and identity papers. Rules vary between countries - check import regulations in good time.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Inventory list with values</li>
            <li>Passport, visa and any residence permit</li>
            <li>Insurance certificate for international transport</li>
            <li>Certificates for pets, medicines and electronics</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/personalpicture.webp" alt="Professional moving staff" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">3. Price - fixed or variable</h2>
      <p>Price is affected by volume, destination, carrying distance and add-ons (packing, storage, assembly). Choose between fixed price (predictable) or variable (flexible for uncertain scope).</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Volume in m³ and distance</li>
            <li>Carrying distance, floor level, elevator</li>
            <li>Time windows and accessibility/parking</li>
            <li>Add-ons: packing, packaging, storage</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/viktigaavtalcustomer.webp" alt="Written quote and contract" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">A serious moving company always provides a written and detailed quote</p>
        </div>
      </div>

      <h2 class="font-bold">4. Investigate the company's reputation and experience</h2>
      <p>Read reviews and testimonials from previous customers. A serious moving company usually has many positive reviews and is transparent with both positive and negative reviews. Also investigate how long the company has been in business.</p>
      
      <p><strong>Where you can find reviews:</strong></p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Google Reviews</li>
            <li>Trustpilot</li>
            <li>Company website</li>
            <li>Friends and family</li>
            <li>Recommendations</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/recommendedcompany2.webp" alt="Recommended moving company" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>

      <h2 class="font-bold">5. Insurance and liability</h2>
      <p>Review that insurance covers the entire international transport chain. Request written terms and understand the deductible.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Goods liability and transport insurance</li>
            <li>Terms for unforeseen events</li>
            <li>How damages are handled and reported</li>
            <li>Limitations and exceptions</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/trygg-hansa-logo.png" alt="International moving insurance" class="w-full h-64 -mt-2 md:-mt-8 object-contain" />
        </div>
      </div>

      <h2 class="font-bold">6. Logistics and route</h2>
      <p>Coordinate loading point, route and delivery windows. Communicate clearly about access, parking and carrying distance at both addresses.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Booked loading zone and elevator</li>
            <li>Check toll fees and bridges</li>
            <li>Clear contact at delivery</li>
            <li>Buffer for delays</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Local moving company in Stockholm" class="w-full rounded-lg shadow-lg mt-0 md:-mt-12" />
        </div>
      </div>

      <h2 class="font-bold">7. Packing help and assembly</h2>
      <p>Consider professional packing help and assembly/disassembly of furniture and appliances to save time and reduce risks.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Export packing of sensitive items</li>
            <li>Disassembly before loading</li>
            <li>Assembly at delivery</li>
            <li>Packaging handling</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/kundservice.webp" alt="Customer service and communication" class="w-full h-60 rounded-lg shadow-lg mt-0 md:-mt-12 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">8. Storage when needed</h2>
      <p>If dates don't coincide, temporary storage may be right. Choose secure storage and plan in/out delivery.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Short- or long-term needs</li>
            <li>Insurance protection in storage</li>
            <li>Inventory at in- and out-delivery</li>
            <li>Temperature and humidity</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/specialicering.webp" alt="Specialized moves like piano moving" class="w-full rounded-lg shadow-lg -mt-2 md:-mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Some moves require special expertise, like piano moving or art moving</p>
        </div>
      </div>

      <h2 class="font-bold">9. Common destinations and tips</h2>
      <p>Different countries have different rules. Read up on import, holidays and parking. Plan time margin for peak seasons.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Nordic countries and EU: simpler customs processes</li>
            <li>United Kingdom: special import rules</li>
            <li>Spain/Portugal: plan for heat and siesta</li>
            <li>Norway/Switzerland: customs and documents</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/malaga.webp" alt="Destinations" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">10. Summary</h2>
      <p>With proper planning, documents and partners, international moving becomes safe and efficient. Set a clear timeline, ensure documents and choose an experienced moving company.</p>
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Important points to remember:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Inventory list and customs values in time</li>
            <li>Export packing and correct labeling</li>
            <li>Insurance that covers the entire chain</li>
            <li>Logistics and clear communication</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/happycustomeraftermoving.webp" alt="Satisfied customer after move" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">A serious moving company ensures smooth delivery and satisfied customers</p>
        </div>
      </div>

      <p><strong>Need help with your international move?</strong> Flyttella has extensive experience with international moves – from planning and export packing to customs handling and delivery. Contact us for a free quote.</p>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "Vad bör du tänka på när du väljer en seriös flyttfirma",
          en: "What to Consider When Choosing a Reliable Moving Company"
        },
        slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma",
        excerpt: {
          sv: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi våra viktigaste tips.",
          en: "Choosing the right moving company is crucial for a smooth move. Here we share our most important tips."
        }
      },
      {
        title: {
          sv: "10 Tips för en Smidig Flytt i Stockholm",
          en: "10 Tips for a Smooth Move in Stockholm"
        },
        slug: "10-tips-for-en-smidig-flytt-i-stockholm",
        excerpt: {
          sv: "Planera din flytt i Stockholm med våra beprövade tips.",
          en: "Plan your move in Stockholm with our proven tips."
        }
      }
    ]
  },
  {
    slug: "piano-tunglyft-vad-du-behover-veta",
    title: {
      sv: "Piano & Tunglyft - Professionell Hantering av Tunga Föremål",
      en: "Piano & Heavy Lifting - Professional Handling of Heavy Objects"
    },
    excerpt: {
      sv: "Specialiserad hantering av piano, tunglyft och känsliga föremål. Vi guidar dig genom vad som krävs för en säker och professionell flytt av tunga objekt.",
      en: "Specialized handling of piano, heavy lifting and sensitive objects. We guide you through what is required for a safe and professional move of heavy objects."
    },
    category: {
      sv: "Tunglyft",
      en: "Heavy Lifting"
    },
    date: "2024-02-15",
    readTime: "5 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">Varför krävs specialiserad hantering?</h2>
      <p>Piano och andra tunga föremål kräver expertis och specialutrustning för säker hantering. En vanlig flyttfirma har ofta inte rätt utrustning eller kunskap för att hantera dessa känsliga objekt utan risk för skador.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Vad som gör piano och tunglyft speciellt:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Extremt tungt - piano väger 200-500 kg</li>
            <li>Känslig mekanik som kan skadas</li>
            <li>Kräver specialiserad utrustning</li>
            <li>Behöver erfaren personal</li>
            <li>Risk för skador på både objekt och miljö</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/smiling_worker_new.webp" alt="Piano flytt" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 10%;" />
        </div>
      </div>

      <h2 class="font-bold">Vår specialiserade service</h2>
      <p>Vi erbjuder professionell hantering av piano och tunglyft med specialiserad utrustning och erfaren personal. Vårt team har mångårig erfarenhet av att hantera känsliga och tunga föremål.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Specialiserad pianoutrustning</li>
            <li>Erfaren personal med tunglyftskompetens</li>
            <li>Försäkring som täcker skador</li>
            <li>Ställning och justering av piano</li>
            <li>Demontering och montering vid behov</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/piano_tunglyft.webp" alt="Professionell piano hantering" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Vad ingår i vår service?</h2>
      <p>Vår piano och tunglyft-service inkluderar allt som behövs för en säker och professionell hantering av dina tunga föremål.</p>
      
      <div class="bg-gray-50 rounded-lg p-6 my-8">
        <h3 class="font-semibold mb-4">Komplett service:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Förberedelse:</strong> Bedömning av objekt och miljö</li>
          <li><strong>Utrustning:</strong> Specialiserad pianoutrustning och skydd</li>
          <li><strong>Transport:</strong> Säker hantering under hela processen</li>
          <li><strong>Placering:</strong> Korrekt ställning och justering</li>
          <li><strong>Efterkontroll:</strong> Verifiering att allt fungerar korrekt</li>
        </ul>
      </div>

      <h2 class="font-bold">Viktiga överväganden</h2>
      <p>Innan du bokar piano eller tunglyft-service finns det några viktiga saker att tänka på för att säkerställa en smidig process.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Förberedelser du kan göra:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Kontrollera åtkomstvägar och dörröppningar</li>
            <li>Rensa bort hinder i vägen</li>
            <li>Informera om eventuella trappor eller hiss</li>
            <li>Planera för eventuell demontering</li>
            <li>Kontrollera att destinationen är redo</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/personalpicture.webp" alt="Professionell flyttarbetare" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Sammanfattning</h2>
      <p>Piano och tunglyft kräver specialiserad hantering för att säkerställa säkerhet och skydd av dina värdefulla föremål. Med rätt utrustning, erfaren personal och noggrann planering kan även de tyngsta och mest känsliga objekten flyttas säkert.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Viktiga punkter att komma ihåg:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Välj en specialiserad firma med rätt utrustning</li>
            <li>Kontrollera försäkring och garantier</li>
            <li>Förbered miljön ordentligt</li>
            <li>Planera för eventuell demontering</li>
            <li>Boka i god tid för bästa service</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/happycustomeraftermoving.webp" alt="Nöjd kund efter flytt" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Professionell hantering säkerställer skydd av dina värdefulla föremål</p>
        </div>
      </div>
      
      <p><strong>Behöver du hjälp med piano eller tunglyft?</strong> Flyttella har specialiserad utrustning och erfaren personal för säker hantering av piano och andra tunga föremål. Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig med din specialflytt.</p>
    `,
    en: `
      <h2 class="font-bold">Why is specialized handling required?</h2>
      <p>Piano and other heavy objects require expertise and special equipment for safe handling. A regular moving company often doesn't have the right equipment or knowledge to handle these sensitive objects without risk of damage.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>What makes piano and heavy lifting special:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Extremely heavy - piano weighs 200-500 kg</li>
            <li>Sensitive mechanics that can be damaged</li>
            <li>Requires specialized equipment</li>
            <li>Needs experienced staff</li>
            <li>Risk of damage to both object and environment</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/smiling_worker_new.webp" alt="Piano moving" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 10%;" />
        </div>
      </div>

      <h2 class="font-bold">Our specialized service</h2>
      <p>We offer professional handling of piano and heavy lifting with specialized equipment and experienced staff. Our team has many years of experience handling sensitive and heavy objects.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li>Specialized piano equipment</li>
            <li>Experienced staff with heavy lifting competence</li>
            <li>Insurance that covers damage</li>
            <li>Positioning and adjustment of piano</li>
            <li>Disassembly and assembly when needed</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/piano_tunglyft.webp" alt="Professional piano handling" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">What is included in our service?</h2>
      <p>Our piano and heavy lifting service includes everything needed for safe and professional handling of your heavy objects.</p>
      
      <div class="bg-gray-50 rounded-lg p-6 my-8">
        <h3 class="font-semibold mb-4">Complete service:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Preparation:</strong> Assessment of object and environment</li>
          <li><strong>Equipment:</strong> Specialized piano equipment and protection</li>
          <li><strong>Transport:</strong> Safe handling throughout the process</li>
          <li><strong>Placement:</strong> Correct positioning and adjustment</li>
          <li><strong>Follow-up:</strong> Verification that everything works correctly</li>
        </ul>
      </div>

      <h2 class="font-bold">Important considerations</h2>
      <p>Before booking piano or heavy lifting service, there are some important things to think about to ensure a smooth process.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Preparations you can make:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Check access routes and door openings</li>
            <li>Clear away obstacles in the way</li>
            <li>Inform about any stairs or elevator</li>
            <li>Plan for possible disassembly</li>
            <li>Check that the destination is ready</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/personalpicture.webp" alt="Professional moving worker" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Summary</h2>
      <p>Piano and heavy lifting require specialized handling to ensure safety and protection of your valuable objects. With the right equipment, experienced staff and careful planning, even the heaviest and most sensitive objects can be moved safely.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Important points to remember:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Choose a specialized company with the right equipment</li>
            <li>Check insurance and guarantees</li>
            <li>Prepare the environment properly</li>
            <li>Plan for possible disassembly</li>
            <li>Book in good time for best service</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/happycustomeraftermoving.webp" alt="Satisfied customer after move" class="w-full rounded-lg shadow-lg -mt-8" />
          <p class="text-sm text-gray-600 mt-2 text-center">Professional handling ensures protection of your valuable objects</p>
        </div>
      </div>
      
      <p><strong>Need help with piano or heavy lifting?</strong> Flyttella has specialized equipment and experienced staff for safe handling of piano and other heavy objects. Contact us for a free quote and let us help you with your special move.</p>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "Vad bör du tänka på när du väljer en seriös flyttfirma",
          en: "What to Consider When Choosing a Reliable Moving Company"
        },
        slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma",
        excerpt: {
          sv: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi våra viktigaste tips.",
          en: "Choosing the right moving company is crucial for a smooth move. Here we share our most important tips."
        }
      },
      {
        title: {
          sv: "Utlandsflytt – Vad du behöver veta",
          en: "International Moving – What You Need to Know"
        },
        slug: "utlandsflytt-vad-du-behover-veta",
        excerpt: {
          sv: "Planering, dokument och genomförande av utlandsflytt. En komplett guide för en trygg flytt över gränser.",
          en: "Planning, documents and execution of international moves. A complete guide for a safe move across borders."
        }
      }
    ]
  },
  {
    slug: "magasinering-vad-du-behover-veta",
    title: {
      sv: "Magasinering - Säkra Lösningar för Din Lagring",
      en: "Storage - Secure Solutions for Your Storage Needs"
    },
    excerpt: {
      sv: "Lär dig allt om magasinering med våra praktiska tips. Från förberedelse och packning till kostnadsbesparingar och vanliga misstag att undvika.",
      en: "Learn everything about storage with our practical tips. From preparation and packing to cost savings and common mistakes to avoid."
    },
    category: {
      sv: "Magasinering",
      en: "Storage"
    },
    date: "2024-02-20",
    readTime: "6 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">När behöver du magasinering?</h2>
      <p>Magasinering kan vara en praktisk lösning för många olika situationer. Här är de vanligaste anledningarna till att folk väljer att förvara sina ägodelar:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Vanliga anledningar till magasinering:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Mellanflyttar och renoveringar</li>
            <li>Förvaring av säsongsobjekt (vinter/sommar)</li>
            <li>Utrymme för nya möbler eller ombyggnation</li>
            <li>Långtidsförvaring vid utlandsflytt</li>
            <li>Företagsförvaring av arkiv och inventarier</li>
            <li>Dödsbo och arv som behöver sorteras</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/personalpicture.webp" alt="Organisering av ägodelar" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Så här förbereder du dina ägodelar för förvaring</h2>
      <p>En bra förberedelse är nyckeln till en framgångsrik magasinering. Här är våra bästa tips för att förbereda dina ägodelar:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Steg-för-steg guide:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Inventera:</strong> Gör en detaljerad lista över allt som ska förvaras</li>
            <li><strong>Rensa:</strong> Sortera bort saker du inte längre behöver</li>
            <li><strong>Organisera:</strong> Gruppera liknande föremål tillsammans</li>
            <li><strong>Förpacka:</strong> Använd rätt förpackningsmaterial för varje typ</li>
            <li><strong>Märk:</strong> Märk alla lådor och kartonger tydligt</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/smiling_worker_new.webp" alt="Förberedelse för förvaring" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 5%;" />
        </div>
      </div>

      <h2 class="font-bold">Vad ska du tänka på när du väljer magasineringsservice?</h2>
      <p>Alla magasineringsservice är inte lika. Här är viktiga faktorer att överväga när du väljer en förvaringslösning:</p>
      
      <div class="bg-gray-50 rounded-lg p-6 my-8">
        <h3 class="font-semibold mb-4">Kontrollera följande:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Säkerhet:</strong> 24/7 övervakning och säkerhetssystem</li>
          <li><strong>Försäkring:</strong> Vad täcks av försäkringen?</li>
          <li><strong>Åtkomst:</strong> När och hur kan du komma åt dina saker?</li>
          <li><strong>Miljö:</strong> Är lokalen torr, välventilerad och temperaturkontrollerad?</li>
          <li><strong>Flexibilitet:</strong> Kan du förlänga eller förkorta avtalet?</li>
          <li><strong>Transport:</strong> Erbjuds hämtning och leverans?</li>
        </ul>
      </div>

      <h2 class="font-bold">Tips för att spara pengar på magasinering</h2>
      <p>Magasinering behöver inte vara dyrt. Här är våra bästa tips för att hålla kostnaderna nere:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Kostnadsbesparande strategier:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Rensa bort onödiga saker innan förvaring</li>
            <li>Välj rätt storlek på förvaringsutrymmet</li>
            <li>Jämför priser mellan olika leverantörer</li>
            <li>Förhandla om längre avtal för bättre priser</li>
            <li>Packa effektivt för att spara utrymme</li>
            <li>Planera för regelbunden åtkomst för att undvika glömda saker</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/happycustomeraftermoving.webp" alt="Kostnadsbesparande tips" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Vanliga misstag att undvika</h2>
      <p>Många gör samma misstag när de förvarar sina ägodelar. Här är de vanligaste felen och hur du undviker dem:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Misstag att undvika:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Packa för tätt - låt föremål "andas"</li>
            <li>Glöm att ta bort batterier från elektronik</li>
            <li>Förvara känsliga föremål utan extra skydd</li>
            <li>Inte märka kartonger tydligt</li>
            <li>Förvara saker som inte tål fukt eller temperaturförändringar</li>
            <li>Inte planera för regelbunden kontroll av förvarade objekt</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Undvik vanliga misstag" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Rätt förberedelse undviker problem senare</p>
        </div>
      </div>
      
      <p><strong>Sammanfattning:</strong> Magasinering kan vara en utmärkt lösning för många situationer, men framgången beror på noggrann planering och förberedelse. Genom att följa dessa tips kan du säkerställa att dina ägodelar förvaras säkert och kostnadseffektivt.</p>
    `,
    en: `
      <h2 class="font-bold">When do you need storage?</h2>
      <p>Storage can be a practical solution for many different situations. Here are the most common reasons why people choose to store their belongings:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Common reasons for storage:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Between moves and renovations</li>
            <li>Storage of seasonal items (winter/summer)</li>
            <li>Space for new furniture or remodeling</li>
            <li>Long-term storage during international moves</li>
            <li>Business storage of archives and inventory</li>
            <li>Estate and inheritance that needs sorting</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/personalpicture.webp" alt="Organizing belongings" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">How to prepare your belongings for storage</h2>
      <p>Good preparation is the key to successful storage. Here are our best tips for preparing your belongings:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Step-by-step guide:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Inventory:</strong> Make a detailed list of everything to be stored</li>
            <li><strong>Clean:</strong> Sort out things you no longer need</li>
            <li><strong>Organize:</strong> Group similar items together</li>
            <li><strong>Pack:</strong> Use the right packaging material for each type</li>
            <li><strong>Label:</strong> Label all boxes and cartons clearly</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/smiling_worker_new.webp" alt="Preparation for storage" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 5%;" />
        </div>
      </div>

      <h2 class="font-bold">What to consider when choosing storage service?</h2>
      <p>Not all storage services are the same. Here are important factors to consider when choosing a storage solution:</p>
      
      <div class="bg-gray-50 rounded-lg p-6 my-8">
        <h3 class="font-semibold mb-4">Check the following:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Security:</strong> 24/7 monitoring and security systems</li>
          <li><strong>Insurance:</strong> What is covered by the insurance?</li>
          <li><strong>Access:</strong> When and how can you access your things?</li>
          <li><strong>Environment:</strong> Is the facility dry, well-ventilated and temperature-controlled?</li>
          <li><strong>Flexibility:</strong> Can you extend or shorten the contract?</li>
          <li><strong>Transport:</strong> Is pickup and delivery offered?</li>
        </ul>
      </div>

      <h2 class="font-bold">Tips for saving money on storage</h2>
      <p>Storage doesn't have to be expensive. Here are our best tips for keeping costs down:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Cost-saving strategies:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Clean out unnecessary items before storage</li>
            <li>Choose the right size storage space</li>
            <li>Compare prices between different providers</li>
            <li>Negotiate longer contracts for better prices</li>
            <li>Pack efficiently to save space</li>
            <li>Plan for regular access to avoid forgotten items</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/happycustomeraftermoving.webp" alt="Cost-saving tips" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Common mistakes to avoid</h2>
      <p>Many people make the same mistakes when storing their belongings. Here are the most common errors and how to avoid them:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Mistakes to avoid:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Pack too tightly - let items "breathe"</li>
            <li>Forget to remove batteries from electronics</li>
            <li>Store sensitive items without extra protection</li>
            <li>Don't label boxes clearly</li>
            <li>Store things that don't tolerate moisture or temperature changes</li>
            <li>Don't plan for regular checks of stored items</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Avoid common mistakes" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Proper preparation avoids problems later</p>
        </div>
      </div>
      
      <p><strong>Summary:</strong> Storage can be an excellent solution for many situations, but success depends on careful planning and preparation. By following these tips, you can ensure that your belongings are stored safely and cost-effectively.</p>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "Piano & Tunglyft - Professionell Hantering av Tunga Föremål",
          en: "Piano & Heavy Lifting - Professional Handling of Heavy Objects"
        },
        slug: "piano-tunglyft-vad-du-behover-veta",
        excerpt: {
          sv: "Specialiserad hantering av piano, tunglyft och känsliga föremål. Vi guidar dig genom vad som krävs för en säker och professionell flytt av tunga objekt.",
          en: "Specialized handling of piano, heavy lifting and sensitive objects. We guide you through what is required for a safe and professional move of heavy objects."
        }
      },
      {
        title: {
          sv: "Utlandsflytt – Vad du behöver veta",
          en: "International Moving – What You Need to Know"
        },
        slug: "utlandsflytt-vad-du-behover-veta",
        excerpt: {
          sv: "Planering, dokument och genomförande av utlandsflytt. En komplett guide för en trygg flytt över gränser.",
          en: "Planning, documents and execution of international moves. A complete guide for a safe move across borders."
        }
      }
    ]
  },
  {
    slug: "fonsterputs-vad-du-behover-veta",
    title: {
      sv: "Fönsterputs - Tips för Kristallklara Rutor",
      en: "Window Cleaning - Tips for Crystal Clear Windows"
    },
    excerpt: {
      sv: "Lär dig allt om fönsterputs med våra praktiska tips. Från rätt teknik och produkter till när du ska boka och hur du får bästa resultatet.",
      en: "Learn everything about window cleaning with our practical tips. From the right technique and products to when you should book and how to get the best results."
    },
    category: {
      sv: "Fönsterputs",
      en: "Window Cleaning"
    },
    date: "2024-02-25",
    readTime: "5 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">När behöver du fönsterputs?</h2>
      <p>Fönsterputs är mer än bara en estetisk förbättring - det påverkar både ljusinsläppet och ditt hems allmänna intryck. Här är de vanligaste anledningarna till att boka professionell fönsterputs:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Vanliga anledningar till fönsterputs:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Flyttstädning och visningsstädning</li>
            <li>Säsongsrengöring (vår och höst)</li>
            <li>Efter byggarbeten eller renoveringar</li>
            <li>Regelbunden underhållsrengöring</li>
            <li>Förberedelse inför speciella event</li>
            <li>Kontorsfönster för professionellt intryck</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/window_cleaner.webp" alt="Professionell fönsterputs" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Rätt teknik för perfekta resultat</h2>
      <p>Att få kristallklara fönster utan ränder kräver rätt teknik och verktyg. Här är våra beprövade metoder för professionell fönsterputs:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Professionell teknik:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Förberedelse:</strong> Rengör karmar och avlägsna grovsmuts först</li>
            <li><strong>Rätt verktyg:</strong> Använd professionella skrapor och gummiskrapor</li>
            <li><strong>Rengöringsmedel:</strong> Miljövänliga produkter för bästa resultat</li>
            <li><strong>Teknik:</strong> Arbeta systematiskt från topp till botten</li>
            <li><strong>Efterkontroll:</strong> Polera bort eventuella ränder direkt</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/window_worker.webp" alt="Fönsterputsteknik" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">När ska du boka fönsterputs?</h2>
      <p>Timing är viktigt för att få bästa möjliga resultat. Här är våra rekommendationer för när du ska boka fönsterputs:</p>
      
      <div class="bg-gray-50 rounded-lg p-6 my-8">
        <h3 class="font-semibold mb-4">Bästa tidpunkter för fönsterputs:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Väder:</strong> Undvik stark sol och regn - molnigt väder är idealiskt</li>
          <li><strong>Säsong:</strong> Vår och höst är optimala tidpunkter</li>
          <li><strong>Frekvens:</strong> 2-4 gånger per år för bostäder, oftare för kontor</li>
          <li><strong>Speciella tillfällen:</strong> Boka i god tid inför visningar eller event</li>
          <li><strong>Efter byggarbeten:</strong> Vänta tills allt damm lagt sig</li>
          <li><strong>Kombination:</strong> Kombinera gärna med annan städning för bästa pris</li>
        </ul>
      </div>

      <h2 class="font-bold">Tips för att hålla fönstren rena längre</h2>
      <p>Med rätt underhåll kan du förlänga tiden mellan professionella fönsterputsningar och hålla dina fönster kristallklara:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Underhållstips:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Torka av kondens regelbundet för att undvika vattenränder</li>
            <li>Rengör fönsterkarmar och trösklar ofta</li>
            <li>Använd mikrofiberduk för snabb avtorkning</li>
            <li>Undvik att röra glaset med fingrarna</li>
            <li>Håll växter och föremål på avstånd från fönstren</li>
            <li>Kontrollera och rengör fönstergaller regelbundet</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/cleaning_lady.webp" alt="Underhåll av fönster" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 20%;" />
        </div>
      </div>

      <h2 class="font-bold">Vanliga misstag att undvika</h2>
      <p>Många gör samma misstag när de putsar fönster själva. Här är de vanligaste felen och hur du undviker dem:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Misstag att undvika:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Putsa i direkt solljus - ger ränder och fläckar</li>
            <li>Använd för mycket rengöringsmedel</li>
            <li>Glöm att rengöra verktyg mellan användning</li>
            <li>Börja med glaset innan karmar är rena</li>
            <li>Använd gamla eller smutsiga trasor</li>
            <li>Försöka putsa när det regnar eller snöar</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/fonsterputs_info.webp" alt="Undvik vanliga misstag" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Professionell utrustning ger bästa resultatet</p>
        </div>
      </div>
      
      <p><strong>Sammanfattning:</strong> Professionell fönsterputs ger inte bara kristallklara rutor utan också bättre ljusinsläpp och ett fräschare intryck av ditt hem eller kontor. Med rätt timing och teknik får du bästa möjliga resultat.</p>
      
      <p><strong>Behöver du hjälp med fönsterputs eller andra städtjänster?</strong> Flyttella är en etablerad flytt- och städfirma i Stockholmsområdet med över 8000 genomförda flyttar och tusentals nöjda städkunder. Vi erbjuder professionell fönsterputs som en del av våra omfattande städtjänster, inklusive flyttstädning, hemstädning, kontorsstädning och byggstädning.</p>
      
      <p><strong>Varför välja Flyttella?</strong> Som en av Stockholms mest pålitliga flytt- och städfirmor kombinerar vi flytt- och städexpertis för att ge dig den bästa möjliga servicen. Vi kombinerar gärna fönsterputs med flyttstädning, hemstädning eller kontorsstädning för bästa pris. Våra erfarna team arbetar med professionell utrustning och miljövänliga produkter för att säkerställa kristallklara resultat.</p>
      
      <p><strong>Våra städtjänster inkluderar:</strong></p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>Fönsterputs (inomhus och utomhus)</li>
        <li>Flyttstädning (garanterat godkänt resultat)</li>
        <li>Hemstädning (regelbunden eller engångsstädning)</li>
        <li>Kontorsstädning (daglig, veckovis eller månadsvis)</li>
        <li>Byggstädning (efter renoveringar och nybyggnation)</li>
        <li>Visningsstädning (för bostadsförsäljning)</li>
        <li>Dödsbostädning (med respekt och omsorg)</li>
      </ul>
      
      <p>Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig med alla dina flytt- och städbehov. Vi erbjuder transparenta priser, omfattande försäkringar och professionell service som du kan lita på.</p>
    `,
    en: `
      <h2 class="font-bold">When do you need window cleaning?</h2>
      <p>Window cleaning is more than just an aesthetic improvement - it affects both light intake and the general impression of your home. Here are the most common reasons to book professional window cleaning:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Common reasons for window cleaning:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Move-out cleaning and viewing cleaning</li>
            <li>Seasonal cleaning (spring and autumn)</li>
            <li>After construction work or renovations</li>
            <li>Regular maintenance cleaning</li>
            <li>Preparation for special events</li>
            <li>Office windows for professional impression</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/window_cleaner.webp" alt="Professional window cleaning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Right technique for perfect results</h2>
      <p>Getting crystal clear windows without streaks requires the right technique and tools. Here are our proven methods for professional window cleaning:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Professional technique:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Preparation:</strong> Clean frames and remove coarse dirt first</li>
            <li><strong>Right tools:</strong> Use professional scrapers and squeegees</li>
            <li><strong>Cleaning agents:</strong> Eco-friendly products for best results</li>
            <li><strong>Technique:</strong> Work systematically from top to bottom</li>
            <li><strong>Follow-up:</strong> Polish away any streaks immediately</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/window_worker.webp" alt="Window cleaning technique" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">When should you book window cleaning?</h2>
      <p>Timing is important to get the best possible results. Here are our recommendations for when you should book window cleaning:</p>
      
      <div class="bg-gray-50 rounded-lg p-6 my-8">
        <h3 class="font-semibold mb-4">Best times for window cleaning:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Weather:</strong> Avoid strong sun and rain - cloudy weather is ideal</li>
          <li><strong>Season:</strong> Spring and autumn are optimal times</li>
          <li><strong>Frequency:</strong> 2-4 times per year for homes, more often for offices</li>
          <li><strong>Special occasions:</strong> Book well in advance for viewings or events</li>
          <li><strong>After construction:</strong> Wait until all dust has settled</li>
          <li><strong>Combination:</strong> Combine with other cleaning for best price</li>
        </ul>
      </div>

      <h2 class="font-bold">Tips for keeping windows clean longer</h2>
      <p>With proper maintenance, you can extend the time between professional window cleanings and keep your windows crystal clear:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Maintenance tips:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Wipe condensation regularly to avoid water streaks</li>
            <li>Clean window frames and sills often</li>
            <li>Use microfiber cloth for quick drying</li>
            <li>Avoid touching the glass with your fingers</li>
            <li>Keep plants and objects away from windows</li>
            <li>Check and clean window screens regularly</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/cleaning_lady.webp" alt="Window maintenance" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 20%;" />
        </div>
      </div>

      <h2 class="font-bold">Common mistakes to avoid</h2>
      <p>Many people make the same mistakes when cleaning windows themselves. Here are the most common errors and how to avoid them:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Mistakes to avoid:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Clean in direct sunlight - causes streaks and spots</li>
            <li>Use too much cleaning agent</li>
            <li>Forget to clean tools between uses</li>
            <li>Start with glass before frames are clean</li>
            <li>Use old or dirty rags</li>
            <li>Try to clean when it's raining or snowing</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/fonsterputs_info.webp" alt="Avoid common mistakes" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
          <p class="text-sm text-gray-600 mt-2 text-center">Professional equipment gives the best results</p>
        </div>
      </div>
      
      <p><strong>Summary:</strong> Professional window cleaning not only gives crystal clear windows but also better light intake and a fresher impression of your home or office. With the right timing and technique, you get the best possible results.</p>
      
      <p><strong>Need help with window cleaning or other cleaning services?</strong> Flyttella is an established moving and cleaning company in the Stockholm area with over 8,000 completed moves and thousands of satisfied cleaning customers. We offer professional window cleaning as part of our comprehensive cleaning services, including move-out cleaning, home cleaning, office cleaning and construction cleaning.</p>
      
      <p><strong>Why choose Flyttella?</strong> As one of Stockholm's most reliable moving and cleaning companies, we combine moving and cleaning expertise to give you the best possible service. We are happy to combine window cleaning with move-out cleaning, home cleaning or office cleaning for the best price. Our experienced teams work with professional equipment and eco-friendly products to ensure crystal clear results.</p>
      
      <p><strong>Our cleaning services include:</strong></p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>Window cleaning (indoor and outdoor)</li>
        <li>Move-out cleaning (guaranteed approved result)</li>
        <li>Home cleaning (regular or one-time cleaning)</li>
        <li>Office cleaning (daily, weekly or monthly)</li>
        <li>Construction cleaning (after renovations and new construction)</li>
        <li>Viewing cleaning (for property sales)</li>
        <li>Estate cleaning (with respect and care)</li>
      </ul>
      
      <p>Contact us for a free quote and let us help you with all your moving and cleaning needs. We offer transparent prices, comprehensive insurance and professional service you can trust.</p>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "Hemstädning - Professionell Städning av Ditt Hem",
          en: "Home Cleaning - Professional Cleaning of Your Home"
        },
        slug: "hemstadning-tips-och-rad",
        excerpt: {
          sv: "Lär dig allt om hemstädning och få tips för en ren och fräsch bostad. Vi går igenom teknik, produkter och hur ofta du bör städa.",
          en: "Learn everything about home cleaning and get tips for a clean and fresh home. We go through technique, products and how often you should clean."
        }
      },
      {
        title: {
          sv: "Flyttstädning - Vad du behöver veta",
          en: "Move-out Cleaning - What You Need to Know"
        },
        slug: "flyttstadning-vad-du-behover-veta",
        excerpt: {
          sv: "Komplett guide till flyttstädning. Lär dig vad som ingår, hur du förbereder dig och får garanterat godkänt resultat.",
          en: "Complete guide to move-out cleaning. Learn what's included, how to prepare and get guaranteed approved results."
        }
      }
    ]
  },
  {
    slug: "hemstadning-vad-du-behover-veta",
    title: {
      sv: "Hemstädning - Tips för en Ren och Fräsch Bostad",
      en: "Home Cleaning - Tips for a Clean and Fresh Home"
    },
    excerpt: {
      sv: "Lär dig allt om hemstädning med våra professionella tips. Från grundläggande tekniker till avancerade metoder för en ren och fräsch bostad.",
      en: "Learn everything about home cleaning with our professional tips. From basic techniques to advanced methods for a clean and fresh home."
    },
    category: {
      sv: "Hemstädning",
      en: "Home Cleaning"
    },
    date: "2024-01-25",
    readTime: "12 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">Vad är hemstädning?</h2>
      <p>Hemstädning är en omfattande städning av din bostad som fokuserar på att skapa en ren, fräsch och välordnad miljö. Till skillnad från daglig städning handlar hemstädning om att gå djupare och rengöra områden som inte städas regelbundet.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="w-full md:flex-1">
          <p><strong>Hemstädning inkluderar:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Grundlig rengöring av alla ytor</li>
            <li>Rengöring av svåråtkomliga områden</li>
            <li>Organisering och sortering</li>
            <li>Rengöring av textiler och möbler</li>
            <li>Desinfektion av kök och badrum</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/cleaning_lady.webp" alt="Professionell hemstädning" class="w-full h-64 md:h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 20%;" />
        </div>
      </div>

      <h2 class="font-bold">När behöver du hemstädning?</h2>
      <p>Hemstädning kan behövas i olika situationer. Oavsett om det är för att hålla din bostad i toppskick eller inför speciella tillfällen, finns det flera tecken på att det är dags för en grundlig städning.</p>
      
      <p><strong>Vanliga anledningar till hemstädning:</strong></p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>Regelbunden underhållsstädning (månadsvis eller kvartalsvis)</li>
        <li>Inför högtider och familjeträffar</li>
        <li>Efter renoveringar eller flytt</li>
        <li>Inför bostadsförsäljning eller uthyrning</li>
        <li>Efter sjukdom eller allergier</li>
        <li>När daglig städning inte räcker till</li>
      </ul>

      <h2 class="font-bold">Steg-för-steg guide till hemstädning</h2>
      <p>En effektiv hemstädning följer en logisk ordning. Genom att planera din städning kan du spara tid och säkerställa att inget glöms bort.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>1. Planering och förberedelse</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Gör en lista över alla rum som ska städas</li>
            <li>Samla ihop alla städprodukter och verktyg</li>
            <li>Ställ undan lösa föremål och dekorationer</li>
            <li>Ventilera rummen innan du börjar</li>
          </ul>
          
          <p><strong>2. Topp-till-botten metod</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Börja med tak och väggar</li>
            <li>Rengör lampor och takfläktar</li>
            <li>Städa möbler och ytor</li>
            <li>Avsluta med golv och golvlister</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttstad_intro.webp" alt="Steg-för-steg hemstädning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 20%;" />
        </div>
      </div>

      <h2 class="font-bold">Rätt teknik för bästa resultat</h2>
      <p>Professionell hemstädning kräver rätt teknik och verktyg. Genom att använda korrekta metoder får du bättre resultat och sparar tid.</p>
      
      <p><strong>Viktiga tekniker:</strong></p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>Mikrofiberdukar:</strong> Fångar damm och smuts effektivt</li>
        <li><strong>Rätt rengöringsmedel:</strong> Använd rätt produkt för rätt yta</li>
        <li><strong>Systematisk approach:</strong> Städa rum för rum</li>
        <li><strong>Dubbelrengöring:</strong> Grovstädning följt av finstädning</li>
        <li><strong>Ventilation:</strong> Håll fönster öppna under städning</li>
      </ul>

      <h2 class="font-bold">Tips för att hålla hemmet rent längre</h2>
      <p>Efter en grundlig hemstädning finns det flera sätt att hålla resultatet längre och minska behovet av omfattande städning.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="w-full md:flex-1">
          <p><strong>Dagliga rutiner:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Städa undan efter varje måltid</li>
            <li>Häng upp kläder direkt</li>
            <li>Dammsug högtrafikerade områden dagligen</li>
            <li>Håll kök och badrum torra</li>
          </ul>
          
          <p><strong>Veckorutiner:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Dammsug hela hemmet</li>
            <li>Rengör badrum grundligt</li>
            <li>Bytt sängkläder</li>
            <li>Städa kök djupare</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/omflyttella_flyttstad.webp" alt="Tips för ren bostad" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Vanliga misstag att undvika</h2>
      <p>Många gör samma misstag vid hemstädning som kan försämra resultatet eller göra arbetet ineffektivt. Här är de vanligaste felen och hur du undviker dem.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Vanliga misstag:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Fel ordning:</strong> Städa golv innan möbler</li>
            <li><strong>För mycket rengöringsmedel:</strong> Mer är inte alltid bättre</li>
            <li><strong>Ignorera ventilation:</strong> Viktigt för hälsa och resultat</li>
            <li><strong>Glömma detaljer:</strong> Dörrhandtag, strömbrytare</li>
            <li><strong>Påskynda processen:</strong> Ta tid för bästa resultat</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/byggstadning.webp" alt="Undvik vanliga misstag" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <p><strong>Sammanfattning:</strong> Hemstädning är en investering i din hälsa och välbefinnande. Med rätt planering, teknik och rutiner kan du skapa en ren och fräsch bostad som känns som ett hem.</p>
      
      <p><strong>Behöver du hjälp med hemstädning eller andra städtjänster?</strong> Flyttella erbjuder professionell hemstädning i Stockholmsområdet som en del av våra omfattande städtjänster. Vi kombinerar gärna hemstädning med flyttstädning, fönsterputs eller kontorsstädning för bästa pris. Kontakta oss för en kostnadsfri offert och låt oss hjälpa dig med alla dina städbehov.</p>
    `,
    en: `
      <h2 class="font-bold">What is home cleaning?</h2>
      <p>Home cleaning is a comprehensive cleaning of your home that focuses on creating a clean, fresh and well-organized environment. Unlike daily cleaning, home cleaning is about going deeper and cleaning areas that are not cleaned regularly.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="w-full md:flex-1">
          <p><strong>Home cleaning includes:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Thorough cleaning of all surfaces</li>
            <li>Cleaning of hard-to-reach areas</li>
            <li>Organization and sorting</li>
            <li>Cleaning of textiles and furniture</li>
            <li>Disinfection of kitchen and bathroom</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/cleaning_lady.webp" alt="Professional home cleaning" class="w-full h-64 md:h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 20%;" />
        </div>
      </div>

      <h2 class="font-bold">When do you need home cleaning?</h2>
      <p>Home cleaning may be needed in different situations. Whether it's to keep your home in top condition or before special occasions, there are several signs that it's time for a thorough cleaning.</p>
      
      <p><strong>Common reasons for home cleaning:</strong></p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>Regular maintenance cleaning (monthly or quarterly)</li>
        <li>Before holidays and family gatherings</li>
        <li>After renovations or moving</li>
        <li>Before property sale or rental</li>
        <li>After illness or allergies</li>
        <li>When daily cleaning is not enough</li>
      </ul>

      <h2 class="font-bold">Step-by-step guide to home cleaning</h2>
      <p>An effective home cleaning follows a logical order. By planning your cleaning, you can save time and ensure nothing is forgotten.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>1. Planning and preparation</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Make a list of all rooms to be cleaned</li>
            <li>Gather all cleaning products and tools</li>
            <li>Put away loose items and decorations</li>
            <li>Ventilate the rooms before you start</li>
          </ul>
          
          <p><strong>2. Top-to-bottom method</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Start with ceiling and walls</li>
            <li>Clean lamps and ceiling fans</li>
            <li>Clean furniture and surfaces</li>
            <li>Finish with floors and baseboards</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/flyttstad_intro.webp" alt="Step-by-step home cleaning" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" style="object-position: center 20%;" />
        </div>
      </div>

      <h2 class="font-bold">Right technique for best results</h2>
      <p>Professional home cleaning requires the right technique and tools. By using correct methods, you get better results and save time.</p>
      
      <p><strong>Important techniques:</strong></p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>Microfiber cloths:</strong> Capture dust and dirt effectively</li>
        <li><strong>Right cleaning agents:</strong> Use the right product for the right surface</li>
        <li><strong>Systematic approach:</strong> Clean room by room</li>
        <li><strong>Double cleaning:</strong> Rough cleaning followed by fine cleaning</li>
        <li><strong>Ventilation:</strong> Keep windows open during cleaning</li>
      </ul>

      <h2 class="font-bold">Tips for keeping the home clean longer</h2>
      <p>After a thorough home cleaning, there are several ways to keep the result longer and reduce the need for extensive cleaning.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="w-full md:flex-1">
          <p><strong>Daily routines:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Clean up after each meal</li>
            <li>Hang up clothes immediately</li>
            <li>Vacuum high-traffic areas daily</li>
            <li>Keep kitchen and bathroom dry</li>
          </ul>
          
          <p><strong>Weekly routines:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Vacuum the entire home</li>
            <li>Clean bathroom thoroughly</li>
            <li>Change bed linen</li>
            <li>Clean kitchen deeper</li>
          </ul>
        </div>
        <div class="w-full md:flex-1">
          <img src="/omflyttella_flyttstad.webp" alt="Tips for clean home" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Common mistakes to avoid</h2>
      <p>Many people make the same mistakes during home cleaning that can worsen the result or make the work inefficient. Here are the most common errors and how to avoid them.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p><strong>Common mistakes:</strong></p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Wrong order:</strong> Clean floor before furniture</li>
            <li><strong>Too much cleaning agent:</strong> More is not always better</li>
            <li><strong>Ignore ventilation:</strong> Important for health and results</li>
            <li><strong>Forget details:</strong> Door handles, light switches</li>
            <li><strong>Rush the process:</strong> Take time for best results</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/byggstadning.webp" alt="Avoid common mistakes" class="w-full h-64 rounded-lg shadow-lg -mt-2 md:-mt-8 object-cover" />
        </div>
      </div>

      <p><strong>Summary:</strong> Home cleaning is an investment in your health and well-being. With proper planning, technique and routines, you can create a clean and fresh home that feels like a home.</p>
      
      <p><strong>Need help with home cleaning or other cleaning services?</strong> Flyttella offers professional home cleaning in the Stockholm area as part of our comprehensive cleaning services. We are happy to combine home cleaning with move-out cleaning, window cleaning or office cleaning for the best price. Contact us for a free quote and let us help you with all your cleaning needs.</p>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "Fönsterputs - Tips för Kristallklara Rutor",
          en: "Window Cleaning - Tips for Crystal Clear Windows"
        },
        slug: "fonsterputs-vad-du-behover-veta",
        excerpt: {
          sv: "Lär dig allt om fönsterputs och få tips för kristallklara rutor. Professionell teknik och rätt timing för bästa resultat.",
          en: "Learn everything about window cleaning and get tips for crystal clear windows. Professional technique and right timing for best results."
        }
      },
      {
        title: {
          sv: "Flyttstädning - Vad du behöver veta",
          en: "Move-out Cleaning - What You Need to Know"
        },
        slug: "flyttstadning-vad-du-behover-veta",
        excerpt: {
          sv: "Komplett guide till flyttstädning. Lär dig vad som ingår, hur du förbereder dig och får garanterat godkänt resultat.",
          en: "Complete guide to move-out cleaning. Learn what's included, how to prepare and get guaranteed approved results."
        }
      }
    ]
  },
  {
    slug: "kontorsstadning-vad-du-behover-veta",
    title: {
      sv: "Kontorsstädning - Professionell Miljö för Din Verksamhet",
      en: "Office Cleaning - Professional Environment for Your Business"
    },
    excerpt: {
      sv: "Lär dig allt om kontorsstädning med våra praktiska tips. Från daglig städning till djuprengöring för en produktiv och ren arbetsmiljö.",
      en: "Learn everything about office cleaning with our practical tips. From daily cleaning to deep cleaning for a productive and clean work environment."
    },
    category: {
      sv: "Kontorsstädning",
      en: "Office Cleaning"
    },
    date: "2024-03-01",
    readTime: "8 min",
    author: "Flyttella Team",
    content: {
      sv: `
      <h2 class="font-bold">Vad är kontorsstädning?</h2>
      <p>Kontorsstädning är en specialiserad form av städning som fokuserar på att skapa en ren, hygienisk och produktiv arbetsmiljö. Det handlar om mer än bara att dammsuga och torka av ytor - det är om att skapa en miljö där medarbetare kan prestera på bästa sätt.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p class="text-gray-700 leading-relaxed text-lg">En ren kontorsmiljö påverkar direkt medarbetarnas välbefinnande, produktivitet och hälsa. Professionell kontorsstädning säkerställer att alla ytor, från skrivbord till köksutrymmen, hålls i optimalt skick.</p>
        </div>
        <div class="flex-1">
          <img src="/kontor.webp" alt="Professionell kontorsstädning" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">När behöver du kontorsstädning?</h2>
      <p>Kontorsstädning behövs i olika situationer och med olika frekvens beroende på verksamhetens storlek och typ. Här är de vanligaste scenarierna:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Daglig städning:</strong> För större kontor med många anställda</li>
            <li><strong>Veckovis städning:</strong> För mindre kontor och kontorshotell</li>
            <li><strong>Djuprengöring:</strong> Kvartalsvis eller halvårsvis</li>
            <li><strong>Inför viktiga möten:</strong> Extra städning före presentationer</li>
            <li><strong>Efter renoveringar:</strong> Byggstädning av kontorslokaler</li>
            <li><strong>Vid flytt:</strong> Kontorsflyttstädning</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/office-moving.webp" alt="Kontorsmiljö som behöver städning" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Steg-för-steg guide till kontorsstädning</h2>
      <p>En effektiv kontorsstädning följer en strukturerad process för att säkerställa att inget glöms bort:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ol class="list-decimal pl-5 space-y-3">
            <li><strong>Förberedelse:</strong> Samla ihop allt material och planera arbetet</li>
            <li><strong>Dammtorkning:</strong> Alla ytor, skrivbord, hyllor och utrustning</li>
            <li><strong>Rengöring av skärmar:</strong> Datorer, telefoner och andra skärmar</li>
            <li><strong>Köksutrymmen:</strong> Mikrovågsugn, kylskåp, diskho och ytor</li>
            <li><strong>Toaletter:</strong> Grundlig rengöring av alla sanitetsutrymmen</li>
            <li><strong>Golvstädning:</strong> Dammsugning och moppning</li>
            <li><strong>Papperskorgar:</strong> Tömning och rengöring</li>
            <li><strong>Kontroll:</strong> Genomgång och kvalitetskontroll</li>
          </ol>
        </div>
        <div class="flex-1">
          <img src="/smiling_worker_new.webp" alt="Strukturerad kontorsstädning" class="w-full h-64 rounded-lg shadow-lg object-cover" style="object-position: center 10%;" />
        </div>
      </div>

      <h2 class="font-bold">Rätt teknik för bästa resultat</h2>
      <p>Professionell kontorsstädning kräver rätt verktyg och tekniker för att uppnå optimala resultat:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Mikrofiberdukar:</strong> Effektiv dammtorkning utan kemikalier</li>
            <li><strong>Hepa-filter:</strong> För allergivänlig dammsugning</li>
            <li><strong>Miljövänliga produkter:</strong> Skonsamma för hälsa och miljö</li>
            <li><strong>Professionell utrustning:</strong> Industriella dammsugare och moppar</li>
            <li><strong>Rätt teknik:</strong> Systematisk arbetssätt från topp till botten</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/cleaning_background.webp" alt="Professionell städutrustning" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Tips för att hålla kontoret rent längre</h2>
      <p>Med rätt rutiner och vanor kan du förlänga tiden mellan städningarna och hålla kontoret fräscht:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Dagliga rutiner:</strong> Töm papperskorgar och städa skrivbord</li>
            <li><strong>Matregler:</strong> Ät endast i köksutrymmen, inte vid skrivbord</li>
            <li><strong>Organisation:</strong> Håll skrivbord och hyllor organiserade</li>
            <li><strong>Ventilation:</strong> Öppna fönster regelbundet för luftcirkulation</li>
            <li><strong>Medvetenhet:</strong> Uppmuntra alla att bidra till en ren miljö</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/byggstadning.webp" alt="Rent och organiserat kontor" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Vanliga misstag att undvika</h2>
      <p>För att få bästa resultatet med din kontorsstädning, undvik dessa vanliga misstag:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>För lite tid:</strong> Ge städningen tillräckligt med tid</li>
            <li><strong>Fel produkter:</strong> Använd rätt rengöringsmedel för varje yta</li>
            <li><strong>Glömma detaljer:</strong> Kontrollera att inget glöms bort</li>
            <li><strong>Ignorera kök:</strong> Köksutrymmen kräver extra uppmärksamhet</li>
            <li><strong>För lite personal:</strong> Se till att det finns tillräckligt med resurser</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Professionell kontorsstädning" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>
    `,
    en: `
      <h2 class="font-bold">What is office cleaning?</h2>
      <p>Office cleaning is a specialized form of cleaning that focuses on creating a clean, hygienic and productive work environment. It's about more than just vacuuming and wiping surfaces - it's about creating an environment where employees can perform at their best.</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <p class="text-gray-700 leading-relaxed text-lg">A clean office environment directly affects employees' well-being, productivity and health. Professional office cleaning ensures that all surfaces, from desks to kitchen areas, are kept in optimal condition.</p>
        </div>
        <div class="flex-1">
          <img src="/kontor.webp" alt="Professional office cleaning" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">When do you need office cleaning?</h2>
      <p>Office cleaning is needed in different situations and with different frequencies depending on the size and type of business. Here are the most common scenarios:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Daily cleaning:</strong> For larger offices with many employees</li>
            <li><strong>Weekly cleaning:</strong> For smaller offices and office hotels</li>
            <li><strong>Deep cleaning:</strong> Quarterly or semi-annually</li>
            <li><strong>Before important meetings:</strong> Extra cleaning before presentations</li>
            <li><strong>After renovations:</strong> Construction cleaning of office premises</li>
            <li><strong>During relocation:</strong> Office move-out cleaning</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/office-moving.webp" alt="Office environment that needs cleaning" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Step-by-step guide to office cleaning</h2>
      <p>An effective office cleaning follows a structured process to ensure nothing is forgotten:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ol class="list-decimal pl-5 space-y-3">
            <li><strong>Preparation:</strong> Gather all materials and plan the work</li>
            <li><strong>Dusting:</strong> All surfaces, desks, shelves and equipment</li>
            <li><strong>Screen cleaning:</strong> Computers, phones and other screens</li>
            <li><strong>Kitchen areas:</strong> Microwave, refrigerator, sink and surfaces</li>
            <li><strong>Toilets:</strong> Thorough cleaning of all sanitary facilities</li>
            <li><strong>Floor cleaning:</strong> Vacuuming and mopping</li>
            <li><strong>Waste bins:</strong> Emptying and cleaning</li>
            <li><strong>Control:</strong> Review and quality control</li>
          </ol>
        </div>
        <div class="flex-1">
          <img src="/smiling_worker_new.webp" alt="Structured office cleaning" class="w-full h-64 rounded-lg shadow-lg object-cover" style="object-position: center 10%;" />
        </div>
      </div>

      <h2 class="font-bold">Right technique for best results</h2>
      <p>Professional office cleaning requires the right tools and techniques to achieve optimal results:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Microfiber cloths:</strong> Effective dusting without chemicals</li>
            <li><strong>HEPA filters:</strong> For allergy-friendly vacuuming</li>
            <li><strong>Eco-friendly products:</strong> Gentle on health and environment</li>
            <li><strong>Professional equipment:</strong> Industrial vacuum cleaners and mops</li>
            <li><strong>Right technique:</strong> Systematic approach from top to bottom</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/cleaning_background.webp" alt="Professional cleaning equipment" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Tips for keeping the office clean longer</h2>
      <p>With the right routines and habits, you can extend the time between cleanings and keep the office fresh:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Daily routines:</strong> Empty waste bins and clean desks</li>
            <li><strong>Food rules:</strong> Eat only in kitchen areas, not at desks</li>
            <li><strong>Organization:</strong> Keep desks and shelves organized</li>
            <li><strong>Ventilation:</strong> Open windows regularly for air circulation</li>
            <li><strong>Awareness:</strong> Encourage everyone to contribute to a clean environment</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/byggstadning.webp" alt="Clean and organized office" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      <h2 class="font-bold">Common mistakes to avoid</h2>
      <p>To get the best results with your office cleaning, avoid these common mistakes:</p>
      
      <div class="flex flex-col md:flex-row gap-8 items-start my-8">
        <div class="flex-1">
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Too little time:</strong> Give the cleaning enough time</li>
            <li><strong>Wrong products:</strong> Use the right cleaning agent for each surface</li>
            <li><strong>Forgetting details:</strong> Check that nothing is forgotten</li>
            <li><strong>Ignoring kitchen:</strong> Kitchen areas require extra attention</li>
            <li><strong>Too little staff:</strong> Make sure there are enough resources</li>
          </ul>
        </div>
        <div class="flex-1">
          <img src="/intro_picture.webp" alt="Professional office cleaning" class="w-full h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>
    `
    },
    relatedPosts: [
      {
        title: {
          sv: "Hemstädning - Tips för en Ren och Fräsch Bostad",
          en: "Home Cleaning - Tips for a Clean and Fresh Home"
        },
        slug: "hemstadning-vad-du-behover-veta",
        excerpt: {
          sv: "Lär dig allt om hemstädning med våra professionella tips. Från grundläggande tekniker till avancerade metoder för en ren och fräsch bostad.",
          en: "Learn everything about home cleaning with our professional tips. From basic techniques to advanced methods for a clean and fresh home."
        }
      },
      {
        title: {
          sv: "Byggstädning - Efter Renovering",
          en: "Construction Cleaning - After Renovation"
        },
        slug: "byggstadning-vad-du-behover-veta",
        excerpt: {
          sv: "Komplett guide till byggstädning efter renovering. Lär dig vad som krävs för att få ditt hem inflyttningsklart.",
          en: "Complete guide to construction cleaning after renovation. Learn what's required to get your home move-in ready."
        }
      }
    ]
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLanguage();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  // Helper functions to get translated content
  const getTranslatedTitle = (title: any) => {
    if (typeof title === 'string') return title;
    return title[locale] || title.sv;
  };
  
  const getTranslatedExcerpt = (excerpt: any) => {
    if (typeof excerpt === 'string') return excerpt;
    return excerpt[locale] || excerpt.sv;
  };
  
  const getTranslatedCategory = (category: any) => {
    if (typeof category === 'string') return category;
    return category[locale] || category.sv;
  };
  
  const getTranslatedContent = (content: any) => {
    if (typeof content === 'string') return content;
    return content[locale] || content.sv;
  };
  
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
      <section className="relative pt-0 md:pt-20 pb-12 md:pb-20 bg-white text-[#0F172A] overflow-hidden">
        <div className="mx-auto px-0 md:px-24">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-none md:rounded-2xl p-6 md:p-12 relative overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: post.slug === 'vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma' 
                  ? `url(/intro_picture.webp)`
                  : post.slug === 'utlandsflytt-vad-du-behover-veta'
                  ? `url(/malaga.jpg)`
                  : post.slug === 'magasinering-vad-du-behover-veta'
                  ? `url(/personalpicture.webp)`
                  : post.slug === 'piano-tunglyft-vad-du-behover-veta'
                  ? `url(/piano_tunglyft.png)`
                  : post.slug === 'fonsterputs-vad-du-behover-veta'
                  ? `url(/window_cleaner.png)`
                  : post.slug === 'hemstadning-vad-du-behover-veta'
                  ? `url(/cleaning_lady.png)`
                  : post.slug === 'kontorsstadning-vad-du-behover-veta'
                  ? `url(/kontor.png)`
                  : `url(/cleaning_background.png)`,
                backgroundSize: post.slug === 'flyttstadning-vad-du-behover-veta' 
                  ? '120% auto'
                  : 'cover',
                backgroundPosition: post.slug === 'vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma' 
                  ? 'center 50%'
                  : post.slug === 'flyttstadning-vad-du-behover-veta'
                  ? 'center 50%'
                  : post.slug === 'utlandsflytt-vad-du-behover-veta'
                  ? 'center 30%'
                  : post.slug === 'magasinering-vad-du-behover-veta'
                  ? 'center 58%'
                  : post.slug === 'piano-tunglyft-vad-du-behover-veta'
                  ? 'left center'
                  : post.slug === 'fonsterputs-vad-du-behover-veta'
                  ? 'center 30%'
                  : post.slug === 'hemstadning-vad-du-behover-veta'
                  ? 'center 20%'
                  : post.slug === 'kontorsstadning-vad-du-behover-veta'
                  ? 'center 30%'
                  : 'center top'
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
                    {locale === 'en' ? 'Back to blog' : 'Tillbaka till bloggen'}
                  </Link>
                </nav>

                {/* Category */}
                <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                  {getTranslatedCategory(post.category)}
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {getTranslatedTitle(post.title)}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-white/80 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </div>
                </div>

                {/* Lead paragraph */}
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  {post.slug === "flyttstadning-vad-du-behover-veta" 
                     ? (locale === 'en' 
                         ? "Move-out cleaning is an important part of the moving process that requires thoroughness and professional service. Here we guide you through everything you need to know to leave your home in perfect condition."
                         : "Flyttstädning är en viktig del av flyttprocessen som kräver noggrannhet och professionell service. Här guidar vi dig genom allt du behöver veta för att lämna din bostad i perfekt skick.")
                    : post.slug === "kontorsstadning-vad-du-behover-veta"
                    ? (locale === 'en' ? "Office cleaning is crucial for a productive and professional work environment. Here we guide you through everything you need to know to create a clean and hygienic office environment that promotes well-being and efficiency." : "Kontorsstädning är avgörande för en produktiv och professionell arbetsmiljö. Här guidar vi dig genom allt du behöver veta för att skapa en ren och hygienisk kontorsmiljö som främjar välbefinnande och effektivitet.")
                    : post.slug === "hemstadning-vad-du-behover-veta"
                    ? (locale === 'en' ? "Home cleaning is the foundation for a pleasant and healthy home environment. Here we guide you through everything you need to know to create a clean and well-organized home that promotes well-being and comfort for the whole family." : "Hemstädning är grunden för en trivsam och hälsosam bostadsmiljö. Här guidar vi dig genom allt du behöver veta för att skapa en ren och välordnad hem som främjar välbefinnande och komfort för hela familjen.")
                    : post.slug === "piano-tunglyft-vad-du-behover-veta"
                    ? (locale === 'en' ? "Piano and heavy lifting require specialized handling and expertise for safe transport. Here we guide you through everything you need to know to ensure a safe and professional move of your valuable and heavy objects." : "Piano och tunglyft kräver specialiserad hantering och expertis för säker transport. Här guidar vi dig genom allt du behöver veta för att säkerställa en trygg och professionell flytt av dina värdefulla och tunga föremål.")
                    : post.slug === "fonsterputs-vad-du-behover-veta"
                    ? (locale === 'en' ? "Window cleaning is crucial for a bright and fresh home environment. Here we guide you through everything you need to know to achieve crystal clear windows that improve both appearance and light intake in your home." : "Fönsterputsning är avgörande för en ljus och fräsch bostadsmiljö. Här guidar vi dig genom allt du behöver veta för att uppnå kristallklara fönster som förbättrar både utseende och ljusinsläpp i ditt hem.")
                    : locale === 'en' 
                      ? "Choosing the right moving company is crucial for a smooth move. Here we share our most important tips for identifying a serious and reliable moving company that takes care of your belongings with care."
                    : "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips för att identifiera en seriös och pålitlig flyttfirma som tar hand om dina ägodelar med omsorg."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="mx-auto px-0 md:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="space-y-8"
            >


              {/* Key Points Summary */}
              <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-2xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
                {/* Mobile-only background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20 md:hidden"
                  style={{
                    backgroundImage: post.slug === 'vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma' 
                      ? 'url(/innanflyttfirmankommer.webp)'
                      : post.slug === 'utlandsflytt-vad-du-behover-veta'
                      ? 'url(/intro_picture.webp)'
                      : post.slug === 'magasinering-vad-du-behover-veta'
                      ? 'url(/happycustomeraftermoving.webp)'
                      : post.slug === 'piano-tunglyft-vad-du-behover-veta'
                      ? 'url(/piano.png)'
                      : post.slug === 'fonsterputs-vad-du-behover-veta'
                      ? 'url(/window_worker.png)'
                      : post.slug === 'kontorsstadning-vad-du-behover-veta'
                      ? 'url(/office-moving.png)'
                      : 'url(/flyttstad_intro.png)'
                  }}
                />
                <h3 className="text-2xl font-bold mb-6 text-center">{locale === 'en' ? 'Important points to remember' : 'Viktiga punkter att komma ihåg'}</h3>
                <div className="grid md:grid-cols-2 gap-6 justify-items-center">
                  {post.slug === "flyttstadning-vad-du-behover-veta" ? (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Book in good time' : 'Boka i god tid'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Plan move-out cleaning early' : 'Planera flyttstädning tidigt'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'RUT deduction' : 'RUT-avdrag'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Take advantage of the tax deduction' : 'Utnyttja skatteavdraget'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Prepare the home' : 'Förbered bostaden'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Move out all belongings first' : 'Flytta ut allt bohag först'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Cleaning guarantee' : 'Städgaranti'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Requirement for re-cleaning if needed' : 'Krav på omstädning vid behov'}</p>
                        </div>
                      </div>
                    </>
                  ) : post.slug === "utlandsflytt-vad-du-behover-veta" ? (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Plan early' : 'Planera tidigt'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Start planning early' : 'Börja planeringen tidigt'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Documents & customs' : 'Dokument & tull'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Prepare all necessary documents' : 'Förbered alla nödvändiga dokument'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Insurance' : 'Försäkring'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Secure international insurance' : 'Säkra internationell försäkring'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Export packing' : 'Exportpackning'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Professional packing for transport' : 'Professionell packning för transport'}</p>
                        </div>
                      </div>
                    </>
                  ) : post.slug === "magasinering-vad-du-behover-veta" ? (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Clean first' : 'Rensa först'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Sort out unnecessary items before storage' : 'Sortera bort onödiga saker innan förvaring'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Pack smart' : 'Packa smart'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Use the right materials and let items "breathe"' : 'Använd rätt material och låt föremål "andas"'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Compare prices' : 'Jämför priser'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Check security, insurance and cost' : 'Kontrollera säkerhet, försäkring och kostnad'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Label clearly' : 'Märk tydligt'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Write content and date on all boxes' : 'Skriv innehåll och datum på alla lådor'}</p>
                        </div>
                      </div>
                    </>
                  ) : post.slug === "fonsterputs-vad-du-behover-veta" ? (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Right weather' : 'Rätt väder'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Avoid sun and rain for best results' : 'Undvik sol och regn för bästa resultat'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Professional technique' : 'Professionell teknik'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Use the right tools and cleaning agents' : 'Använd rätt verktyg och rengöringsmedel'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Regular maintenance' : 'Regelbundet underhåll'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? '2-4 times per year for best results' : '2-4 gånger per år för bästa resultat'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Combine services' : 'Kombinera tjänster'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Save money by combining with cleaning' : 'Spara pengar genom att kombinera med städning'}</p>
                        </div>
                      </div>
                    </>
                  ) : post.slug === "kontorsstadning-vad-du-behover-veta" ? (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Choose right frequency' : 'Välj rätt frekvens'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Adapt cleaning to business needs' : 'Anpassa städning efter verksamhetens behov'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Professional equipment' : 'Professionell utrustning'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Use the right tools and products' : 'Använd rätt verktyg och produkter'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Focus on common areas' : 'Fokusera på gemensamma utrymmen'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Kitchen, toilets and reception first' : 'Kök, toaletter och reception först'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Regular deep cleaning' : 'Regelbunden djuprengöring'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Plan quarterly or semi-annually' : 'Planera kvartalsvis eller halvårsvis'}</p>
                        </div>
                      </div>
                    </>
                  ) : post.slug === "hemstadning-vad-du-behover-veta" ? (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Create routines' : 'Skapa rutiner'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Establish daily and weekly cleaning routines' : 'Etablera dagliga och veckovisa städrutiner'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Right products' : 'Rätt produkter'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Use eco-friendly and effective cleaning agents' : 'Använd miljövänliga och effektiva rengöringsmedel'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Focus on kitchen and bathroom' : 'Fokusera på kök och badrum'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Prioritize hygiene-critical areas' : 'Prioritera hygienkritiska områden'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Professional help' : 'Professionell hjälp'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Book regular cleaning for deep cleaning' : 'Boka regelbunden städning för djuprengöring'}</p>
                        </div>
                      </div>
                    </>
                  ) : post.slug === "piano-tunglyft-vad-du-behover-veta" ? (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Specialized equipment' : 'Specialiserad utrustning'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Requires piano lifts and special tools' : 'Kräver piano-lyft och specialverktyg'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Experienced staff' : 'Erfaren personal'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Trained specialists for safe handling' : 'Tränade specialister för säker hantering'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Insurance & guarantee' : 'Försäkring & garanti'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Ensure complete coverage' : 'Säkerställ fullständig täckning'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Plan in good time' : 'Planera i god tid'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Book specialized service in advance' : 'Boka specialiserad service i förväg'}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Plan early' : 'Planera tidigt'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Start planning early' : 'Börja planeringen tidigt'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'RUT deduction' : 'Rut-avdrag'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Use the RUT deduction' : 'Använd dig av rut-avdraget'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Book moving help' : 'Boka flytthjälp'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Check insurance and guarantees' : 'Kontrollera försäkring och garantier'}</p>
                        </div>
                      </div>
                      <div className="flex items-start w-full max-w-xs">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{locale === 'en' ? 'Book in good time' : 'Boka i god tid'}</h4>
                          <p className="text-white/80 text-sm">{locale === 'en' ? 'Secure specialized service in time' : 'Säkra specialiserad service i tid'}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                <div 
                  className="text-lg leading-relaxed text-[#0F172A] space-y-8"
                  dangerouslySetInnerHTML={{ __html: getTranslatedContent(post.content) }}
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
          </div>
        </div>
      </section>

      {/* Call to Action - Moved outside max-width constraint */}
      <section className="py-16" >
        <div className="mx-auto px-0 md:px-24" >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden max-w-full mx-auto"
          >
            {/* Background pattern */}
            <div 
             className="absolute inset-0 opacity-10 pointer-events-none lg:scale-100 scale-[0.67] origin-top-left"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
               backgroundSize: '20px 20px',
              }}
            />
            <div className="relative z-10">
              {/* Statistics Section */}
              <div className="mb-8">
                <h4 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${post.slug === "flyttstadning-vad-du-behover-veta" ? "" : "md:text-center md:ml-[-120px]"}`}>
                   {post.slug === "flyttstadning-vad-du-behover-veta" 
                      ? (locale === 'en' ? "Need help with move-out cleaning in Stockholm?" : "Behöver du hjälp med flyttstädning i Stockholm?")
                     : post.slug === "hemstadning-vad-du-behover-veta"
                     ? (locale === 'en' ? "Need help with home cleaning in Stockholm?" : "Behöver du hjälp med hemstädning i Stockholm?")
                     : post.slug === "fonsterputs-vad-du-behover-veta"
                     ? (locale === 'en' ? "Need help with window cleaning in Stockholm?" : "Behöver du hjälp med fönsterputs i Stockholm?")
                     : post.slug === "kontorsstadning-vad-du-behover-veta"
                     ? (locale === 'en' ? "Need help with office cleaning in Stockholm?" : "Behöver du hjälp med kontorsstädning i Stockholm?")
                     : post.slug === "piano-tunglyft-vad-du-behover-veta"
                     ? (locale === 'en' ? "Need help with piano or heavy lifting?" : "Behöver du hjälp med piano eller tunglyft?")
                     : post.slug === "utlandsflytt-vad-du-behover-veta"
                     ? (locale === 'en' ? "Need help with your international move?" : "Behöver du hjälp med din utlandsflytt?")
                     : locale === 'en' 
                       ? "Need help with your move in Stockholm?"
                     : "Behöver du hjälp med din flytt i Stockholm?"
                   }
                 </h4>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
    {/* Mobile Statistics Slider */}
    <div className="w-full flex justify-center lg:w-auto lg:justify-start">
       <MobileStatsSlider postSlug={post.slug} locale={locale} />
    </div>
    
    {/* Desktop Statistics boxes */}
    <div className="hidden md:grid grid-cols-1 gap-6 justify-start w-auto lg:w-80 flex-shrink-0">
      <div className="bg-white/10 rounded-xl p-8 shadow-lg flex flex-col items-center justify-center w-full">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          <CountUp 
            end={post.slug === "flyttstadning-vad-du-behover-veta" ? 7000 : post.slug === "magasinering-vad-du-behover-veta" ? 3000 : post.slug === "fonsterputs-vad-du-behover-veta" ? 4000 : post.slug === "hemstadning-vad-du-behover-veta" ? 5000 : post.slug === "kontorsstadning-vad-du-behover-veta" ? 2500 : 8000} 
            duration={2.5}
            suffix="+"
            useEasing={true}
            enableScrollSpy={true}
            scrollSpyOnce={true}
          />
        </div>
        <div className="text-base font-medium mb-1">
           {post.slug === "flyttstadning-vad-du-behover-veta" ? (locale === 'en' ? "Move-out Cleanings" : "Flyttstädningar") : post.slug === "magasinering-vad-du-behover-veta" ? (locale === 'en' ? "Storage Assignments" : "Magasineringsuppdrag") : post.slug === "fonsterputs-vad-du-behover-veta" ? (locale === 'en' ? "Window Cleanings" : "Fönsterputsningar") : post.slug === "hemstadning-vad-du-behover-veta" ? (locale === 'en' ? "Home Cleanings" : "Hemstädningar") : post.slug === "kontorsstadning-vad-du-behover-veta" ? (locale === 'en' ? "Office Cleanings" : "Kontorsstädningar") : locale === 'en' ? "Moves" : "Flyttar"}
        </div>
        <div className="text-sm text-white/80">{locale === 'en' ? "assignments completed" : "uppdrag utförda"}</div>
      </div>
      <div className="bg-white/10 rounded-xl p-8 shadow-lg flex flex-col items-center justify-center w-full">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          <CountUp 
            end={post.slug === "flyttstadning-vad-du-behover-veta" ? 5000 : post.slug === "magasinering-vad-du-behover-veta" ? 500 : post.slug === "fonsterputs-vad-du-behover-veta" ? 2000 : post.slug === "hemstadning-vad-du-behover-veta" ? 1200 : post.slug === "kontorsstadning-vad-du-behover-veta" ? 800 : 7000} 
            duration={2.5}
            suffix="+"
            useEasing={true}
            enableScrollSpy={true}
            scrollSpyOnce={true}
          />
        </div>
        <div className="text-base font-medium mb-1">
           {post.slug === "flyttstadning-vad-du-behover-veta" ? (locale === 'en' ? "Home Cleanings" : "Hemstädningar") : post.slug === "magasinering-vad-du-behover-veta" ? (locale === 'en' ? "Storage Facilities" : "Förvaringslokaler") : post.slug === "fonsterputs-vad-du-behover-veta" ? (locale === 'en' ? "Home Cleanings" : "Hemstädningar") : post.slug === "hemstadning-vad-du-behover-veta" ? (locale === 'en' ? "Regular Customers" : "Regelbundna kunder") : post.slug === "kontorsstadning-vad-du-behover-veta" ? (locale === 'en' ? "Business Customers" : "Företagskunder") : locale === 'en' ? "Cleanings" : "Städningar"}
        </div>
        <div className="text-sm text-white/80">
          {post.slug === "magasinering-vad-du-behover-veta" ? (locale === 'en' ? "sqm available" : "kvm tillgängliga") : post.slug === "hemstadning-vad-du-behover-veta" ? (locale === 'en' ? "active subscriptions" : "aktiva abonnemang") : post.slug === "kontorsstadning-vad-du-behover-veta" ? (locale === 'en' ? "active contracts" : "aktiva kontrakt") : locale === 'en' ? "assignments completed" : "uppdrag utförda"}
        </div>
      </div>
      <div className="bg-white/10 rounded-xl p-8 shadow-lg flex flex-col items-center justify-center w-full">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          <CountUp 
            end={post.slug === "flyttstadning-vad-du-behover-veta" ? 2000 : post.slug === "magasinering-vad-du-behover-veta" ? 200 : post.slug === "fonsterputs-vad-du-behover-veta" ? 1500 : post.slug === "hemstadning-vad-du-behover-veta" ? 800 : post.slug === "kontorsstadning-vad-du-behover-veta" ? 400 : 500} 
            duration={2.5}
            suffix="+"
            useEasing={true}
            enableScrollSpy={true}
            scrollSpyOnce={true}
          />
        </div>
        <div className="text-base font-medium mb-1">
           {post.slug === "flyttstadning-vad-du-behover-veta" ? (locale === 'en' ? "Office Cleanings" : "Företagsstädningar") : post.slug === "magasinering-vad-du-behover-veta" ? (locale === 'en' ? "Monthly" : "Månadsvis") : post.slug === "fonsterputs-vad-du-behover-veta" ? (locale === 'en' ? "Office Windows" : "Kontorsfönster") : post.slug === "hemstadning-vad-du-behover-veta" ? (locale === 'en' ? "Monthly" : "Månadsvis") : post.slug === "kontorsstadning-vad-du-behover-veta" ? (locale === 'en' ? "Weekly" : "Veckovis") : locale === 'en' ? "Monthly" : "Månadsvis"}
        </div>
        <div className="text-sm text-white/80">
          {post.slug === "flyttstadning-vad-du-behover-veta" ? (locale === 'en' ? "assignments completed" : "uppdrag utförda") : post.slug === "magasinering-vad-du-behover-veta" ? (locale === 'en' ? "assignments per month" : "uppdrag per månad") : post.slug === "fonsterputs-vad-du-behover-veta" ? (locale === 'en' ? "assignments completed" : "uppdrag utförda") : post.slug === "hemstadning-vad-du-behover-veta" ? (locale === 'en' ? "home cleanings" : "hemstädningar") : post.slug === "kontorsstadning-vad-du-behover-veta" ? (locale === 'en' ? "office cleanings" : "kontorsstädningar") : locale === 'en' ? "assignments per month" : "uppdrag per månad"}
        </div>
      </div>
    </div>

    {/* About text in the center */}
    <div className="flex-1 text-white/90 min-w-0">
      {post.slug === "flyttstadning-vad-du-behover-veta" ? (
        <>
      <p className="text-xl md:text-2xl leading-relaxed mb-6">
         {locale === 'en' 
           ? "We are an established moving and cleaning company in the Stockholm area with over 10 years of experience helping individuals and businesses with their move-out cleaning. Our team of experienced cleaners is dedicated to ensuring your home is left in perfect condition."
           : "Vi är en etablerad flytt och städfirma i Stockholmsområdet med över 10 års erfarenhet av att hjälpa privatpersoner och företag med deras flyttstädning. Vårt team av erfarna städare är dedikerade till att säkerställa att din bostad lämnas i perfekt skick."
         }
      </p>
      <p className="text-xl md:text-2xl leading-relaxed mb-6">
         {locale === 'en'
           ? "We offer everything from small apartment cleanings to large house cleanings and office cleanings. With our extensive experience and professional service, you can trust that your home is cleaned with the utmost care and precision."
           : "Vi erbjuder allt från små lägenhetsstädningar till stora villastädningar och kontorsstädningar. Med vår omfattande erfarenhet och professionella service kan du lita på att din bostad städas med största omsorg och noggrannhet."
         }
      </p>
      <p className="text-xl md:text-2xl leading-relaxed mb-12">
         {locale === 'en'
           ? "Contact us today for a free quote and let us help you with your move-out cleaning in Stockholm!"
           : "Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din flyttstädning i Stockholm!"
         }
       </p>
        </>
      ) : post.slug === "utlandsflytt-vad-du-behover-veta" ? (
        <>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {locale === 'en' 
              ? "We are an established moving company in Stockholm with over 10 years of experience in international moves and overseas relocations. Our team of experienced movers specializes in helping individuals and businesses with safe and efficient international moves worldwide."
              : "Vi är en etablerad flyttfirma i Stockholm med över 10 års erfarenhet av internationella flyttar och utlandsflytt. Vårt team av erfarna flyttarbetare är specialiserade på att hjälpa privatpersoner och företag med säkra och effektiva utlandsflyttar till hela världen."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {locale === 'en'
              ? "We offer professional international moves. With our extensive experience in customs regulations, insurance and international logistics, you can trust that your international move will be carried out with the utmost safety and precision."
              : "Vi erbjuder professionella utlandsflyttar. Med vår omfattande erfarenhet av tullregler, försäkringar och internationell logistik kan du lita på att din utlandsflytt genomförs med största säkerhet och noggrannhet."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-12">
            {locale === 'en'
              ? "Contact us today for a free quote and let us help you with your international move from Stockholm!"
              : "Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din utlandsflytt från Stockholm!"
            }
          </p>
        </>
      ) : post.slug === "piano-tunglyft-vad-du-behover-veta" ? (
        <>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {locale === 'en' 
              ? "We are an established moving company in Stockholm with over 10 years of experience in specialized handling of piano and heavy lifting. Our team of experienced movers specializes in helping individuals and businesses with safe handling of heavy and sensitive objects."
              : "Vi är en etablerad flyttfirma i Stockholm med över 10 års erfarenhet av specialiserad hantering av piano och tunglyft. Vårt team av erfarna flyttarbetare är specialiserade på att hjälpa privatpersoner och företag med säker hantering av tunga och känsliga föremål."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {locale === 'en'
              ? "We offer professional piano and heavy lifting service with specialized equipment and experienced staff. With our extensive experience with heavy objects and sensitive items, you can trust that your piano or heavy lifting is carried out with the utmost safety and precision."
              : "Vi erbjuder professionell piano och tunglyft-service med specialiserad utrustning och erfaren personal. Med vår omfattande erfarenhet av tunga föremål och känsliga objekt kan du lita på att din piano eller tunglyft genomförs med största säkerhet och noggrannhet."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-12">
            {locale === 'en'
              ? "Contact us today for a free quote and let us help you with your piano or heavy lifting in Stockholm!"
              : "Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din piano eller tunglyft i Stockholm!"
            }
          </p>
        </>
      ) : post.slug === "magasinering-vad-du-behover-veta" ? (
        <>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {locale === 'en' 
              ? "Storage can be an excellent solution for many situations, from between moves to long-term storage. With proper planning and preparation, you can save money and ensure that your belongings are stored safely."
              : "Magasinering kan vara en utmärkt lösning för många situationer, från mellanflyttar till långtidsförvaring. Med rätt planering och förberedelse kan du spara pengar och säkerställa att dina ägodelar förvaras säkert."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {locale === 'en'
              ? "By following our proven tips and advice, you can avoid common mistakes and get the most out of your storage service. Whether you need short- or long-term storage, there are always ways to optimize both cost and security."
              : "Genom att följa våra beprövade tips och råd kan du undvika vanliga misstag och få ut mesta möjliga av din magasineringsservice. Oavsett om du behöver kort- eller långtidsförvaring finns det alltid sätt att optimera både kostnad och säkerhet."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-12">
            {locale === 'en'
              ? "Learn more about storage and get tips for making the right choice for your needs!"
              : "Lär dig mer om magasinering och få tips för att göra rätt val för dina behov!"
            }
          </p>
        </>
      ) : (
        <>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {post.slug === "fonsterputs-vad-du-behover-veta" 
              ? locale === 'en' 
                ? "We are an established moving and cleaning company in the Stockholm area with over 10 years of experience helping individuals and businesses with their moving and cleaning needs. Our team of experienced movers and cleaners is dedicated to ensuring that your move and cleaning becomes as smooth as possible."
                : "Vi är en etablerad flytt- och städfirma i Stockholmsområdet med över 10 års erfarenhet av att hjälpa privatpersoner och företag med deras flyttar och städbehov. Vårt team av erfarna flyttarbetare och städare är dedikerade till att säkerställa att din flytt och städning blir så smidig som möjligt."
              : post.slug === "hemstadning-vad-du-behover-veta"
              ? locale === 'en'
                ? "We are an established moving and cleaning company in the Stockholm area with over 10 years of experience helping individuals and businesses with their moving and cleaning needs. Our team of experienced movers and cleaners is dedicated to ensuring that your move and cleaning becomes as smooth as possible."
                : "Vi är en etablerad flytt- och städfirma i Stockholmsområdet med över 10 års erfarenhet av att hjälpa privatpersoner och företag med deras flyttar och städbehov. Vårt team av erfarna flyttarbetare och städare är dedikerade till att säkerställa att din flytt och städning blir så smidig som möjligt."
              : post.slug === "kontorsstadning-vad-du-behover-veta"
              ? locale === 'en'
                ? "We are an established moving and cleaning company in the Stockholm area with over 10 years of experience helping individuals and businesses with their moving and cleaning needs. Our team of experienced movers and cleaners is dedicated to ensuring that your move and cleaning becomes as smooth as possible."
                : "Vi är en etablerad flytt- och städfirma i Stockholmsområdet med över 10 års erfarenhet av att hjälpa privatpersoner och företag med deras flyttar och städbehov. Vårt team av erfarna flyttarbetare och städare är dedikerade till att säkerställa att din flytt och städning blir så smidig som möjligt."
              : locale === 'en'
                ? "We are an established moving company in the Stockholm area with over 10 years of experience helping individuals and businesses with their moves. Our team of experienced movers is dedicated to ensuring that your move becomes as smooth as possible."
                : "Vi är en etablerad flyttfirma i Stockholmsområdet med över 10 års erfarenhet av att hjälpa privatpersoner och företag med deras flyttar. Vårt team av erfarna flyttarbetare är dedikerade till att säkerställa att din flytt blir så smidig som möjligt."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            {post.slug === "fonsterputs-vad-du-behover-veta" 
              ? locale === 'en'
                ? "We offer everything from window cleaning and home cleaning to move-out cleaning and office cleaning. With our extensive experience and professional service, you can trust that your cleaning is carried out with the greatest care and precision for crystal-clear results."
                : "Vi erbjuder allt från fönsterputs och hemstädning till flyttstädning och kontorsstädning. Med vår omfattande erfarenhet och professionella service kan du lita på att din städning genomförs med största omsorg och noggrannhet för kristallklara resultat."
              : post.slug === "hemstadning-vad-du-behover-veta"
              ? locale === 'en'
                ? "We offer everything from home cleaning and move-out cleaning to window cleaning and office cleaning. With our extensive experience and professional service, you can trust that your cleaning is carried out with the greatest care and precision for a clean and fresh home."
                : "Vi erbjuder allt från hemstädning och flyttstädning till fönsterputs och kontorsstädning. Med vår omfattande erfarenhet och professionella service kan du lita på att din städning genomförs med största omsorg och noggrannhet för en ren och fräsch bostad."
              : post.slug === "kontorsstadning-vad-du-behover-veta"
              ? locale === 'en'
                ? "We offer everything from office cleaning and move-out cleaning to home cleaning and window cleaning. With our extensive experience and professional service, you can trust that your office cleaning is carried out with the greatest care and precision for a productive work environment."
                : "Vi erbjuder allt från kontorsstädning och flyttstädning till hemstädning och fönsterputs. Med vår omfattande erfarenhet och professionella service kan du lita på att din kontorsstädning genomförs med största omsorg och noggrannhet för en produktiv arbetsmiljö."
              : locale === 'en'
                ? "We offer everything from small apartment moves to large house moves and office moves. With our extensive experience and professional service, you can trust that your move is carried out with the greatest care and precision."
                : "Vi erbjuder allt från små lägenhetsflyttar till stora villaflyttar och kontorsflyttar. Med vår omfattande erfarenhet och professionella service kan du lita på att din flytt genomförs med största omsorg och noggrannhet."
            }
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mb-12">
            {post.slug === "fonsterputs-vad-du-behover-veta" 
              ? locale === 'en'
                ? "Contact us today for a free quote and let us help you with window cleaning and other cleaning services in Stockholm!"
                : "Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med fönsterputs och andra städtjänster i Stockholm!"
              : post.slug === "hemstadning-vad-du-behover-veta"
              ? locale === 'en'
                ? "Contact us today for a free quote and let us help you with home cleaning and other cleaning services in Stockholm!"
                : "Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med hemstädning och andra städtjänster i Stockholm!"
              : post.slug === "kontorsstadning-vad-du-behover-veta"
              ? locale === 'en'
                ? "Contact us today for a free quote and let us help you with office cleaning and other cleaning services in Stockholm!"
                : "Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med kontorsstädning och andra städtjänster i Stockholm!"
              : locale === 'en'
                ? "Contact us today for a free quote and let us help you with your move in Stockholm!"
                : "Kontakta oss idag för en kostnadsfri offert och låt oss hjälpa dig med din flytt i Stockholm!"
            }
          </p>
        </>
      )}
      
      {/* Få offert button */}
      <div className="flex justify-center">
        <Link
          href="/offert"
          className="bg-white text-[#0F172A] px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-lg md:text-xl hover:bg-gray-100 transition-colors shadow-lg"
        >
          {locale === 'en' ? 'Get Quote' : 'Få offert'}
        </Link>
      </div>
    </div>

    {/* Picture on the right - visible on both mobile and desktop */}
    <div className={`${post.slug === "flyttstadning-vad-du-behover-veta" ? "w-full lg:w-[460px]" : "w-full lg:w-[500px]"} flex-shrink-0 flex items-center justify-center`}>
        <div className="rounded-2xl overflow-hidden">
           {post.slug === "flyttstadning-vad-du-behover-veta" ? (
             <>
               {/* Mobile image */}
               <img src="/omflyttella_flyttstad.webp" 
                 alt="Flyttella team" 
                 className="block lg:hidden w-full h-auto max-h-[600px] object-contain rounded-2xl"
               />
               {/* Desktop image */}
               <img src="/stad_vertical_happy_cleaner.webp" 
                 alt="Flyttella team" 
                 className="hidden lg:block w-full h-auto lg:max-h-[540px] object-contain rounded-2xl"
               />
             </>
           ) : (
             <img src="/smiling_worker_new.webp" 
               alt="Flyttella team" 
               className="w-full h-auto max-h-[300px] lg:max-h-[540px] object-contain rounded-2xl"
             />
           )}
         </div>
     </div>
  </div>
              </div>

              {/* Våra fördelar Section */}
              <div className="border-t border-white/20 pt-8">
                <h4 className="text-xl font-bold mb-6 text-center">{locale === 'en' ? 'Our Advantages' : 'Våra fördelar'}</h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[
                    {
                      icon: "💰",
                      title: locale === 'en' ? "Fixed Price" : "Fast pris",
                      description: locale === 'en' ? "No surprises - we offer both fixed prices and the possibility of ongoing prices" : "Inga överraskningar - vi erbjuder både fasta priser och möjlighet till löpande priser",
                      link: "/priser"
                    },
                    {
                      icon: "📋",
                      title: locale === 'en' ? "RUT Deduction" : "RUT-avdrag",
                      description: locale === 'en' ? "We handle all paperwork for RUT deduction" : "Vi hanterar allt pappersarbete för RUT-avdrag",
                      link: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html"
                    },
                    {
                      icon: "📦",
                      title: locale === 'en' ? "Free Box Loan for 4 Weeks" : "Fritt lån av kartonger i 4 veckor",
                      description: locale === 'en' ? "Custom-made moving boxes with our logo" : "Specialgjorda flyttkartonger med vår logga",
                      link: "/kartonger"
                    },
                    {
                      icon: "⏰",
                      title: locale === 'en' ? "Free Rescheduling or Cancellation" : "Omboka eller avboka kostnadsfritt",
                      description: locale === 'en' ? "Reschedule or cancel for free up to 24 hours before the move" : "Omboka eller avboka kostnadsfritt upp till 24 timmar innan flytten",
                      link: "/avbokning"
                    },
                    {
                      icon: "✅",
                      title: locale === 'en' ? "Satisfied Customer Guarantee" : "Nöjd kund garanti",
                      description: locale === 'en' ? "14-day guarantee on move-out cleaning" : "14 dagars garanti på flyttstädning",
                      link: "/garanti"
                    },
                    {
                      icon: "🔒",
                      title: locale === 'en' ? "Traffic Permits and Insurance" : "Trafiktillstånd och försäkring",
                      description: locale === 'en' ? "All necessary permits and insurance in place" : "Alla nödvändiga tillstånd och försäkringar på plats",
                      link: "/tillstand"
                    }
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.icon}
                      className="flex flex-col items-center justify-center text-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg min-h-[120px] h-full w-full"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeInUp}
                      transition={{ delay: i * 0.1 }}
                    >
                      <motion.span
                        className="text-2xl md:text-3xl"
                        initial={{ scale: 0.6, opacity: 0, rotate: -180, color: '#10B981' }}
                        animate={{ scale: [0.6, 1.3, 1], opacity: 1, rotate: [ -180, 20, 0 ], color: ['#10B981', '#34D399', '#10B981'] }}
                        transition={{ duration: 1, delay: i * 0.18 + 0.2, type: 'tween', ease: 'easeInOut' }}
                      >
                        {feature.icon}
                      </motion.span>
                       <h5 className="text-white font-semibold text-base md:text-lg mb-1 text-center">{post.slug === 'flyttstadning-vad-du-behover-veta' && feature.title === 'Fritt lån av kartonger i 4 veckor' ? (locale === 'en' ? 'Eco-friendly Products' : 'Miljövänliga produkter') : feature.title}</h5>
                       <p className="text-white/80 text-sm md:text-base mb-2 line-clamp-3 text-center">{post.slug === 'flyttstadning-vad-du-behover-veta' && feature.title === 'Fritt lån av kartonger i 4 veckor' ? (locale === 'en' ? 'We use eco-friendly and safe cleaning products' : 'Vi använder miljövänliga och säkra rengöringsmedel') : feature.description}</p>
                      {(feature.title === "RUT-avdrag" || feature.title === "RUT Deduction") && (
                        <a 
                          href={feature.link}
                          target={feature.link.startsWith('http') ? '_blank' : undefined}
                          rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white/90 hover:text-white transition-colors text-sm md:text-base inline-flex items-center justify-center"
                        >
                          {locale === 'en' ? 'Read more' : 'Läs mer'}
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="mx-auto px-0 md:px-24">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-3xl font-bold text-[#0F172A] mb-12 text-center"
              >
                {locale === 'en' ? 'Related Articles' : 'Relaterade artiklar'}
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
                        {getTranslatedTitle(relatedPost.title)}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {getTranslatedExcerpt(relatedPost.excerpt)}
                      </p>
                      <Link
                        href={`/blogg/${relatedPost.slug}`}
                        className="inline-flex items-center text-[#10B981] font-medium hover:text-[#0F172A] transition-colors group"
                      >
                        {locale === 'en' ? 'Read more' : 'Läs mer'}
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