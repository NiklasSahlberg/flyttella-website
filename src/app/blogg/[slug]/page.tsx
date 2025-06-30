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
    slug: "10-tips-för-en-smidig-flytt-i-stockholm",
    title: "10 Tips för en Smidig Flytt i Stockholm",
    excerpt: "Planera din flytt i Stockholm med våra beprövade tips. Från packning till flyttdag - vi hjälper dig genom hela processen.",
    category: "Flytttips",
    date: "2024-01-15",
    readTime: "5 min",
    author: "Flyttella Team",
    content: `
      <h2>1. Börja planera tidigt</h2>
      <p>En välplanerad flytt är nyckeln till framgång. Börja minst 8 veckor innan flyttdatumet med att organisera och planera. Skapa en checklista med alla viktiga uppgifter som behöver göras.</p>
      
      <h2>2. Rensa och organisera</h2>
      <p>Innan du börjar packa, gå igenom alla dina ägodelar. Sälj, ge bort eller släng saker du inte längre behöver. Detta kommer att minska packningsarbetet och flyttkostnaderna.</p>
      
      <h2>3. Beställ flyttkartonger i tid</h2>
      <p>Vi erbjuder gratis lån av flyttkartonger i 4 veckor. Beställ dem i god tid så att du har tillräckligt med material för allt som behöver packas.</p>
      
      <h2>4. Märk alla kartonger tydligt</h2>
      <p>Använd tydliga etiketter på alla kartonger. Skriv rum och innehåll på varje låda. Detta gör det mycket enklare att hitta saker när du ska packa upp.</p>
      
      <h2>5. Packa rum för rum</h2>
      <p>Börja med rum du använder minst, som gästrum eller förråd. Låt kök och sovrum vara sist så du kan fortsätta leva normalt under packningsprocessen.</p>
      
      <h2>6. Förbered för flyttfirman</h2>
      <p>Innan flyttfirman kommer, se till att alla vägar är fria och att du har packat ner allt lösöre. Montera ner gardiner och lampor om det behövs.</p>
      
      <h2>7. Håll värdesaker tillgängliga</h2>
      <p>Packa värdesaker, viktiga dokument och nycklar separat och håll dem med dig under flytten. Lita inte på att de kommer med flyttbilen.</p>
      
      <h2>8. Boka flyttstädning</h2>
      <p>Boka flyttstädning i god tid. Vi erbjuder professionell flyttstädning som säkerställer att din gamla bostad lämnas i perfekt skick.</p>
      
      <h2>9. Uppdatera adresser</h2>
      <p>Glöm inte att adressändra hos Skatteverket och meddela viktiga kontakter som bank, försäkringsbolag och leverantörer.</p>
      
      <h2>10. Var förberedd på flyttdagen</h2>
      <p>Ha kaffe och fika redo för flyttarbetarna. Var tillgänglig för frågor och gör en slutkontroll av bostaden innan du lämnar den.</p>
    `,
    relatedPosts: [
      {
        title: "Så Packar Du Känsliga Föremål Korrekt",
        slug: "så-packar-du-känsliga-föremål-korrekt",
        excerpt: "Lär dig hur du packar porslin, konst och andra känsliga föremål för att säkerställa att de kommer fram oskadda."
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
        slug: "10-tips-för-en-smidig-flytt-i-stockholm",
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
                backgroundImage: 'url(/blog-hero-bg.jpg)',
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
                <div className="flex flex-wrap items-center gap-6 text-white/80">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="mx-auto px-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="prose prose-lg max-w-none"
            >
              {/* Excerpt */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Main Content */}
              <div 
                className="text-lg leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-16 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-2xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">
                Behöver du hjälp med din flytt?
              </h3>
              <p className="text-white/90 mb-6">
                Låt oss hjälpa dig med din flytt. Vi erbjuder professionell flyttservice med fast pris och kvalitetsgaranti.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Få offert
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
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