'use client';

import { motion } from "framer-motion";
import Image from "next/image";
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
    title: "10 Tips för en Smidig Flytt i Stockholm",
    excerpt: "Planera din flytt i Stockholm med våra beprövade tips. Från packning till flyttdag - vi hjälper dig genom hela processen.",
    category: "Flytttips",
    date: "2024-01-15",
    readTime: "5 min",
    image: "/blog-flytt-tips.jpg",
    slug: "10-tips-för-en-smidig-flytt-i-stockholm"
  },
  {
    id: 2,
    title: "Så Packar Du Känsliga Föremål Korrekt",
    excerpt: "Lär dig hur du packar porslin, konst och andra känsliga föremål för att säkerställa att de kommer fram oskadda.",
    category: "Packning",
    date: "2024-01-10",
    readTime: "4 min",
    image: "/blog-packning.jpg",
    slug: "så-packar-du-känsliga-föremål-korrekt"
  },
  {
    id: 3,
    title: "Flyttstädning - Vad Du Behöver Veta",
    excerpt: "Allt om flyttstädning och vad som krävs för att lämna din gamla bostad i perfekt skick.",
    category: "Flyttstädning",
    date: "2024-01-05",
    readTime: "6 min",
    image: "/blog-flyttstadning.jpg",
    slug: "flyttstädning-vad-du-behöver-veta"
  },
  {
    id: 4,
    title: "RUT-avdrag på Flyttstädning - Så Fungerar Det",
    excerpt: "Förstå hur RUT-avdraget fungerar för flyttstädning och hur du kan spara pengar på din flytt.",
    category: "Ekonomi",
    date: "2023-12-28",
    readTime: "7 min",
    image: "/blog-rut-avdrag.jpg",
    slug: "rut-avdrag-på-flyttstädning-så-fungerar-det"
  },
  {
    id: 5,
    title: "Kontorsflytt - Planera för Minimal Störning",
    excerpt: "Strategier för att genomföra en kontorsflytt med minimal påverkan på verksamheten.",
    category: "Företag",
    date: "2023-12-20",
    readTime: "8 min",
    image: "/blog-kontorsflytt.jpg",
    slug: "kontorsflytt-planera-för-minimal-störning"
  },
  {
    id: 6,
    title: "Vinterns Flyttar - Särskilda Överväganden",
    excerpt: "Tips och råd för att hantera flyttar under vintermånaderna när väderförhållandena kan vara utmanande.",
    category: "Säsong",
    date: "2023-12-15",
    readTime: "5 min",
    image: "/blog-vinter-flytt.jpg",
    slug: "vinters-flyttar-särskilda-överväganden"
  }
];

const categories = [
  "Alla",
  "Flytttips",
  "Packning", 
  "Flyttstädning",
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
              <div className="w-full max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Flyttella Blogg
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Expertis, tips och råd för en smidig flytt
                </p>
                <p className="text-lg text-white/80">
                  Dela med dig av vår kunskap och erfarenhet från över 8000 flyttar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto px-24">
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
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                />
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
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
              className="flex flex-wrap gap-3 justify-center"
            >
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg'
                      : 'bg-white text-[#0F172A] border border-gray-300 hover:border-[#10B981] hover:text-[#10B981]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="mx-auto px-24">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                Inga resultat hittades
              </h3>
              <p className="text-gray-600 mb-8">
                Prova att ändra din sökning eller välj en annan kategori
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Alla");
                }}
                className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Rensa filter
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={variants}
                  custom={index}
                  whileHover="hover"
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#0F172A] to-[#10B981] flex items-center justify-center">
                      <span className="text-white text-4xl">📦</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(post.date)}
                    </p>

                    {/* Read More Button */}
                    <Link
                      href={`/blogg/${post.slug}`}
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
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
} 