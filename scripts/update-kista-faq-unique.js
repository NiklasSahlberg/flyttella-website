// Update Kista FAQ with completely unique questions
const fs = require('fs');
const path = require('path');

const svPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'sv.json');
const enPath = path.join(process.cwd(), 'flyttella-website', 'src', 'app', 'i18n', 'locales', 'en.json');

const svData = JSON.parse(fs.readFileSync(svPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// New unique FAQ questions for Kista
const newSvFaq = {
  title: 'Vanliga frågor om flytt i Kista',
  items: [
    { 
      question: 'Hur hanterar ni flyttar i Kistas IT-distrikt?', 
      answer: 'Vi är experter på flyttar i Kistas IT-distrikt med erfarenhet av kontorsflyttar och företagsrelaterade flyttar. Vi planerar extra tid för trafikrusning och säkerställer att flyttar genomförs utan att störa verksamheten i området.' 
    },
    { 
      question: 'Kan ni hantera flyttar med höga våningar i Kista?', 
      answer: 'Ja, vi är vana vid höga våningar i Kistas bostadsområden. Vi har erfarenhet av hissar, trappor och bärvägar i höga byggnader. Vi planerar extra tid och säkerställer säker transport av möbler mellan våningar.' 
    },
    { 
      question: 'Erbjuder ni flyttstädning för lägenheter i Kista?', 
      answer: 'Ja, vi erbjuder professionell flyttstädning för lägenheter i Kista. Våra städare är vana vid områdets olika bostadstyper och föreningsregler. Vi garanterar 14 dagars garanti på allt städarbete.' 
    },
    { 
      question: 'Kan ni hantera flyttar med tunga möbler i Kista?', 
      answer: 'Ja, vi är experter på flyttar med tunga möbler i Kista. Vi har specialiserad utrustning för tunga lyft som pianon, säkerhetsdörrar och stora skåp. Vi planerar extra tid och bemanning för sådana flyttar.' 
    },
    { 
      question: 'Hur långt i förväg ska jag boka flytt i Kista?', 
      answer: 'Vi rekommenderar att boka flytt i Kista minst 2-3 veckor i förväg, särskilt under högsäsong. För flyttar med tunga möbler eller speciella krav planerar vi gärna ännu tidigare för att säkerställa optimal genomförande.' 
    },
    { 
      question: 'Kan ni hantera flyttar under helger i Kista?', 
      answer: 'Ja, vi erbjuder flyttar även under helger i Kista. Vi planerar extra tid för dessa flyttar och tar hänsyn till områdets tysthetsregler och parkeringsbestämmelser för en smidig genomförande.' 
    },
    { 
      question: 'Vad gör Flyttella till den bästa flyttfirman i Kista?', 
      answer: 'Vi kombinerar över 8 års erfarenhet med djup lokalkännedom om Kistas områden. Våra specialister förstår de specifika utmaningarna med flyttar i Akalla, Husby och Tensta – från bostadsområden till föreningsregler.' 
    }
  ]
};

const newEnFaq = {
  title: 'Common questions about moving in Kista',
  items: [
    { 
      question: 'How do you handle moves in Kista\'s IT district?', 
      answer: 'We are experts at moves in Kista\'s IT district with experience of office moves and business-related relocations. We plan extra time for traffic rush and ensure moves are carried out without disturbing business activities in the area.' 
    },
    { 
      question: 'Can you handle moves with high floors in Kista?', 
      answer: 'Yes, we are used to high floors in Kista\'s residential areas. We have experience with elevators, stairs and access routes in tall buildings. We plan extra time and ensure safe transport of furniture between floors.' 
    },
    { 
      question: 'Do you offer move-out cleaning for apartments in Kista?', 
      answer: 'Yes, we offer professional move-out cleaning for apartments in Kista. Our cleaners are experienced with the area\'s different housing types and association rules. We guarantee 14 days warranty on all cleaning work.' 
    },
    { 
      question: 'Can you handle moves with heavy furniture in Kista?', 
      answer: 'Yes, we are experts at moves with heavy furniture in Kista. We have specialised equipment for heavy lifts like pianos, safes and large cabinets. We plan extra time and crew for such moves.' 
    },
    { 
      question: 'How far in advance should I book a move in Kista?', 
      answer: 'We recommend booking a move in Kista at least 2-3 weeks in advance, especially during peak season. For moves with heavy furniture or special requirements we prefer to plan even earlier to ensure optimal execution.' 
    },
    { 
      question: 'Can you handle moves during weekends in Kista?', 
      answer: 'Yes, we offer moves even during weekends in Kista. We plan extra time for these moves and consider the area\'s noise regulations and parking rules for smooth execution.' 
    },
    { 
      question: 'What makes Flyttella the best moving company in Kista?', 
      answer: 'We combine over 8 years experience with deep local knowledge of Kista\'s areas. Our specialists understand the specific challenges of moves in Akalla, Husby and Tensta – from residential areas to association rules.' 
    }
  ]
};

// Update the FAQ sections
svData.kista.faq = newSvFaq;
enData.kista.faq = newEnFaq;

fs.writeFileSync(svPath, JSON.stringify(svData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Updated Kista FAQ with completely unique questions.');
