'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const variants = {
  initial: { scale: 0.98, opacity: 0, y: 5 },
  animate: (i: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 30,
      damping: 15
    },
  }),
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    },
  },
};

// Sample blog posts - you can replace these with real content
const blogPosts = [
  {
    id: 1,
    title: "Vad bör du tänka på när du väljer en seriös flyttfirma",
    excerpt: "Att välja rätt flyttfirma är avgörande för en smidig flytt. Här delar vi med oss av våra viktigaste tips för att identifiera en seriös och pålitlig flyttfirma som tar hand om dina ägodelar med omsorg.",
    category: "Flytttips",
    date: "2024-01-20",
    readTime: "10 min",
    image: "/innanflyttfirmankommer.jpg",
    slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma"
  },

  
  {
    id: 2,
    title: "Flyttstädning - Vad du behöver veta",
    excerpt: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick.",
    category: "Flyttstädning",
    date: "2024-01-05",
    readTime: "6 min",
    image: "/cleaning_lady.png",
    slug: "flyttstadning-vad-du-behover-veta"
  },
  {
    id: 3,
    title: "Utlandsflytt – Vad du behöver veta",
    excerpt: "Planering, dokument och genomförande av utlandsflytt. En komplett guide för en trygg flytt över gränser.",
    category: "Utlandsflytt",
    date: "2024-02-01",
    readTime: "9 min",
    image: "/malaga.jpg",
    slug: "utlandsflytt-vad-du-behover-veta"
  },
  {
    id: 4,
    title: "Piano & Tunglyft - Professionell Hantering av Tunga Föremål",
    excerpt: "Specialiserad hantering av piano, tunglyft och känsliga föremål. Vi guidar dig genom vad som krävs för en säker och professionell flytt av tunga objekt.",
    category: "Tunglyft",
    date: "2024-02-15",
    readTime: "5 min",
    image: "/piano_tunglyft.png",
    slug: "piano-tunglyft-vad-du-behover-veta"
  },
  {
    id: 5,
    title: "Magasinering - Säkra Lösningar för Din Lagring",
    excerpt: "Lär dig allt om magasinering med våra praktiska tips. Från förberedelse och packning till kostnadsbesparingar och vanliga misstag att undvika.",
    category: "Magasinering",
    date: "2024-02-20",
    readTime: "6 min",
    image: "/personalpicture.jpg",
    slug: "magasinering-vad-du-behover-veta"
  },
  {
    id: 6,
    title: "Fönsterputs - Tips för Kristallklara Rutor",
    excerpt: "Lär dig allt om fönsterputs med våra praktiska tips. Från rätt teknik och produkter till när du ska boka och hur du får bästa resultatet.",
    category: "Fönsterputs",
    date: "2024-02-25",
    readTime: "5 min",
    image: "/window_cleaner.png",
    slug: "fonsterputs-vad-du-behover-veta"
  },
  {
    id: 7,
    title: "Hemstädning - Tips för en Ren och Fräsch Bostad",
    excerpt: "Lär dig allt om hemstädning med våra professionella tips. Från grundläggande tekniker till avancerade metoder för en ren och fräsch bostad.",
    category: "Hemstädning",
    date: "2024-01-25",
    readTime: "12 min",
    image: "/omflyttella_flyttstad.png",
    slug: "hemstadning-vad-du-behover-veta"
  },
  {
    id: 8,
    title: "Kontorsstädning - Professionell Miljö för Din Verksamhet",
    excerpt: "Lär dig allt om kontorsstädning med våra praktiska tips. Från daglig städning till djuprengöring för en produktiv och ren arbetsmiljö.",
    category: "Kontorsstädning",
    date: "2024-03-01",
    readTime: "8 min",
    image: "/kontor.png",
    slug: "kontorsstadning-vad-du-behover-veta"
  }
];

const categories = [
  "Alla",
  "Flytttips",
  "Packning", 
  "Flyttstädning",
  "Hemstädning",
  "Kontorsstädning",
  "Utlandsflytt",
  "Tunglyft",
  "Magasinering",
  "Fönsterputs",
  "Ekonomi",
  "Företag",
  "Säsong"
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Alla" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <section className="relative pt-0 pb-12 md:pt-0 md:pb-20 bg-white text-[#0F172A] overflow-hidden">
        <div className="mx-auto px-0 md:px-24">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-none md:rounded-2xl p-6 md:p-8 lg:p-12 relative overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: 'url(/intro_picture.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="flex flex-col items-center justify-center gap-6 md:gap-8 relative z-10">
              <div className="w-full max-w-3xl mx-auto text-center px-4 md:px-0">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                  Flyttellas Blogg
                </h1>
 
                <p className="text-lg md:text-2xl text-white/80">
                  Vi delar med oss av vår kunskap och erfarenhet från över 8000 flyttar och 7000 städningar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="mx-auto px-4 md:px-24">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sök i blogginlägg..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                  suppressHydrationWarning={true}
                />
                <svg
                  className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="flex flex-wrap gap-2 md:gap-3 justify-center"
            >
              {categories.map((category, _index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg'
                      : 'bg-white text-[#0F172A] border border-gray-300 hover:border-[#10B981] hover:text-[#10B981]'
                  }`}
                  suppressHydrationWarning={true}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto px-4 md:px-24">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center py-12 md:py-20"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-4">
                Inga resultat hittades
              </h3>
              <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                Prova att ändra din sökning eller välj en annan kategori
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Alla");
                }}
                className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-5 md:px-6 py-2 md:py-3 rounded-full hover:opacity-90 transition-opacity text-sm md:text-base"
                suppressHydrationWarning={true}
              >
                Rensa filter
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredPosts.map((post, _index) => (
                <motion.article
                  key={post.id}
                  variants={variants}
                  custom={_index}
                  whileHover="hover"
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      style={{ 
                        objectPosition: post.slug === 'flyttstadning-vad-du-behover-veta' 
                          ? 'center 20%' 
                          : post.slug === 'vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma'
                          ? 'center 40%'
                          : post.slug === 'hemstadning-vad-du-behover-veta'
                          ? 'center 40%'
                          : 'center' 
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-[#0F172A] to-[#10B981] flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                      <span className="text-white text-4xl">📦</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white text-xs font-medium px-2 md:px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs md:text-sm">
                        <svg className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
                      {post.excerpt}
                    </p>

                    {/* Date */}
                    <p className="text-xs md:text-sm text-gray-500 mb-4">
                      {formatDate(post.date)}
                    </p>

                    {/* Read More Button */}
                    <Link
                      href={`/blogg/${post.slug}`}
                      className="inline-flex items-center text-[#10B981] font-medium hover:text-[#0F172A] transition-colors group text-sm md:text-base"
                    >
                      Läs mer
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
} 