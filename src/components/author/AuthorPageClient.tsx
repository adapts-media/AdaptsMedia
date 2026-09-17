"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import BlogGridCard from "@/components/cards/BlogGridCard";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";

interface AuthorPageClientProps {
  authorData: {
    name: string;
    slug: string;
    description: string;
    avatar: string;
    role: string;
    linkedin: string;
    email: string;
    expertise?: string[];
  };
  posts: any[];
}

export default function AuthorPageClient({ authorData, posts }: AuthorPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const postCategories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p: any) => {
      if (Array.isArray(p.categories)) {
        p.categories.forEach((c: string) => cats.add(c));
      }
    });
    return Array.from(cats);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((p: any) =>
      p.categories?.some(
        (c: string) => c.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [posts, selectedCategory]);

  const emailUrl = authorData.email.startsWith("mailto:") ? authorData.email : `mailto:${authorData.email}`;

  // Card & content animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
        delay: 0.2,
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 16,
      },
    },
  };

  return (
    <article className="min-h-screen bg-white text-[#17313B] overflow-x-hidden">
      {/* Premium Hero with Interactive Elements & Animated Blobs */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061d40] via-[#004dc3] to-[#083c8a] pt-32 pb-24 px-6 min-h-[500px] flex items-center">
        {/* Dynamic Glowing Ambient Blobs */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -50, 70, 0],
            y: [0, 70, -50, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative group/card overflow-hidden"
          >
            {/* Subtle glow border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Avatar container with interactive hover effect */}
            <motion.div 
              variants={avatarVariants}
              className="flex-shrink-0 relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-xl cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={authorData.avatar}
                alt={authorData.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
            </motion.div>

            {/* Content Details */}
            <div className="flex-grow text-center md:text-left text-white flex flex-col justify-between min-h-[12rem]">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                  <motion.div variants={itemVariants}>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2 tracking-tight">
                      {authorData.name}
                    </h1>
                    <p className="text-blue-200 text-lg md:text-xl font-medium font-sans">
                      {authorData.role}
                    </p>
                  </motion.div>
                  
                  {/* Premium Hover Social Action Buttons */}
                  <motion.div variants={itemVariants} className="flex items-center gap-4">
                    <motion.a 
                      href={emailUrl} 
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#004dc3] hover:border-white transition-all group duration-300 shadow-lg"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEnvelope className="w-5 h-5 text-white group-hover:text-[#004dc3] transition-colors" />
                    </motion.a>
                    <motion.a 
                      href={authorData.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#004dc3] hover:border-white transition-all group duration-300 shadow-lg"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedinIn className="w-5 h-5 text-white group-hover:text-[#004dc3] transition-colors" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>

              <motion.p 
                variants={itemVariants}
                className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl font-sans"
              >
                {authorData.description}
              </motion.p>

              {/* Areas of Expertise */}
              {authorData.expertise && authorData.expertise.length > 0 && (
                <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-white/15">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-200 block mb-3 font-sans">
                    Areas of Expertise
                  </span>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {authorData.expertise.map((exp: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs md:text-sm rounded-full font-medium backdrop-blur-sm transition-all duration-300 shadow-sm"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid Section with Stagger Scroll Animations */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-[1350px] mx-auto">
          {/* Header section with in-view animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="border-b border-gray-100 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
          >
            <div>
              <span className="text-[#004dc3] text-sm font-bold tracking-widest uppercase block mb-2 font-sans">
                Author Archive
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#17313B] tracking-tight font-heading">
                Insights &amp; Articles by {authorData.name}
              </h2>
            </div>
            <p className="text-gray-500 font-medium font-sans">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </motion.div>

          {/* Topic / Category Filter Buttons */}
          {postCategories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 mb-12">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === "All"
                    ? "bg-[#004dc3] text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All ({posts.length})
              </button>
              {postCategories.map((cat) => {
                const count = posts.filter((p: any) =>
                  p.categories?.some((c: string) => c.toLowerCase() === cat.toLowerCase())
                ).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-[#004dc3] text-white shadow-md shadow-blue-500/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {filteredPosts.length > 0 ? (
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
              {filteredPosts.map((p: any) => (
                <motion.div 
                  key={p.slug} 
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="h-full flex"
                >
                  <BlogGridCard 
                    title={p.title}
                    image={p.image}
                    slug={p.slug}
                    author={p.author}
                    authorSlug={p.authorSlug || authorData.slug}
                    date={p.date}
                    tags={p.categories}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
            >
              <p className="text-gray-400 text-lg mb-4 font-sans">
                No published blog posts found for this category.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="text-sm font-semibold text-[#004dc3] hover:underline"
              >
                Clear filter
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <ContactCTA />
     
      <Footer />
    </article>
  );
}
