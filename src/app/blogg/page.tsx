'use client';

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from '@/app/contexts/LanguageContext';

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

const variants: Variants = {
  initial: { scale: 0.98, opacity: 0, y: 5 },
  animate: (i: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 1,
      type: "spring",
      stiffness: 30,
      damping: 15
    }
  }),
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Sample blog posts - you can replace these with real content
const getBlogPosts = (t: any) => [
  {
    id: 1,
    title: t('blogg.blogPosts.post1.title'),
    excerpt: t('blogg.blogPosts.post1.excerpt'),
    category: t('blogg.blogPosts.post1.category'),
    date: "2024-01-20",
    readTime: "10 min",
    image: "/innanflyttfirmankommer.webp",
    slug: "vad-bor-du-tanka-pa-nar-du-valjer-en-serios-flyttfirma"
  },
  {
    id: 2,
    title: t('blogg.blogPosts.post2.title'),
    excerpt: t('blogg.blogPosts.post2.excerpt'),
    category: t('blogg.blogPosts.post2.category'),
    date: "2024-01-05",
    readTime: "6 min",
    image: "/cleaning_lady.png",
    slug: "flyttstadning-vad-du-behover-veta"
  },
  {
    id: 3,
    title: t('blogg.blogPosts.post3.title'),
    excerpt: t('blogg.blogPosts.post3.excerpt'),
    category: t('blogg.blogPosts.post3.category'),
    date: "2024-02-01",
    readTime: "9 min",
    image: "/malaga.jpg",
    slug: "utlandsflytt-vad-du-behover-veta"
  },
  {
    id: 4,
    title: t('blogg.blogPosts.post4.title'),
    excerpt: t('blogg.blogPosts.post4.excerpt'),
    category: t('blogg.blogPosts.post4.category'),
    date: "2024-02-15",
    readTime: "5 min",
    image: "/piano_tunglyft.png",
    slug: "piano-tunglyft-vad-du-behover-veta"
  },
  {
    id: 5,
    title: t('blogg.blogPosts.post5.title'),
    excerpt: t('blogg.blogPosts.post5.excerpt'),
    category: t('blogg.blogPosts.post5.category'),
    date: "2024-02-20",
    readTime: "6 min",
    image: "/personalpicture.webp",
    slug: "magasinering-vad-du-behover-veta"
  },
  {
    id: 6,
    title: t('blogg.blogPosts.post6.title'),
    excerpt: t('blogg.blogPosts.post6.excerpt'),
    category: t('blogg.blogPosts.post6.category'),
    date: "2024-02-25",
    readTime: "5 min",
    image: "/window_cleaner.png",
    slug: "fonsterputs-vad-du-behover-veta"
  },
  {
    id: 7,
    title: t('blogg.blogPosts.post7.title'),
    excerpt: t('blogg.blogPosts.post7.excerpt'),
    category: t('blogg.blogPosts.post7.category'),
    date: "2024-01-25",
    readTime: "12 min",
    image: "/omflyttella_flyttstad.png",
    slug: "hemstadning-vad-du-behover-veta"
  },
  {
    id: 8,
    title: t('blogg.blogPosts.post8.title'),
    excerpt: t('blogg.blogPosts.post8.excerpt'),
    category: t('blogg.blogPosts.post8.category'),
    date: "2024-03-01",
    readTime: "8 min",
    image: "/kontor.png",
    slug: "kontorsstadning-vad-du-behover-veta"
  }
];

const getCategories = (t: any) => [
  t('blogg.categories.all'),
  t('blogg.categories.movingTips'),
  t('blogg.categories.packing'),
  t('blogg.categories.movingCleaning'),
  t('blogg.categories.homeCleaning'),
  t('blogg.categories.officeCleaning'),
  t('blogg.categories.internationalMoving'),
  t('blogg.categories.heavyLifting'),
  t('blogg.categories.storage'),
  t('blogg.categories.windowCleaning'),
  t('blogg.categories.economy'),
  t('blogg.categories.business'),
  t('blogg.categories.season')
];

export default function BlogPage() {
  const { t } = useLanguage();
  const categories = getCategories(t);
  const blogPosts = getBlogPosts(t);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === categories[0] || post.category === selectedCategory;
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
                backgroundImage: 'url(/intro_picture.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="flex flex-col items-center justify-center gap-6 md:gap-8 relative z-10">
              <div className="w-full max-w-3xl mx-auto text-center px-4 md:px-0">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                  {t('blogg.hero.title')}
                </h1>
 
                <p className="text-lg md:text-2xl text-white/80">
                  {t('blogg.hero.subtitle')}
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
                  placeholder={t('blogg.search.placeholder')}
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
                {t('blogg.posts.noResults.title')}
              </h3>
              <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {t('blogg.posts.noResults.subtitle')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(categories[0]);
                }}
                className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-5 md:px-6 py-2 md:py-3 rounded-full hover:opacity-90 transition-opacity text-sm md:text-base"
                suppressHydrationWarning={true}
              >
                {t('blogg.posts.noResults.clearFilters')}
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
                <Link key={post.id} href={`/blogg/${post.slug}`} className="block">
                  <motion.article
                    variants={variants}
                    custom={_index}
                    whileHover="hover"
                    className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
                      <div className="inline-flex items-center text-[#10B981] font-medium hover:text-[#0F172A] transition-colors group text-sm md:text-base">
                        {t('blogg.posts.readMore')}
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
} 