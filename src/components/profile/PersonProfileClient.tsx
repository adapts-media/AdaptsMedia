"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import BlogGridCard from "@/components/cards/BlogGridCard";

// Shared profile design for both /team/[slug] and /author/[slug] — a
// person is a person. The only thing that's actually different between a
// team member and a blog author is that an author page also shows the
// posts they've written; everything else (hero, about, quick facts,
// "more voices") is the same layout and styling for both.

export interface ProfilePerson {
  name: string;
  slug: string;
  role: string;
  image: string;
  bio: string;
  aboutLong?: string;
  location?: string;
  badges?: string[];
  expertise?: string[];
  email?: string;
  linkedin?: string;
}

export interface ProfileOtherPerson {
  slug: string;
  name: string;
  image: string;
  href: string;
}

export interface ProfilePost {
  slug: string;
  title: string;
  image: string;
  author: string;
  authorSlug?: string;
  date: string;
  categories?: string[];
}

interface PersonProfileClientProps {
  person: ProfilePerson;
  /** Small uppercase label above the name — e.g. "Team Member" or "Author". */
  kicker?: string;
  otherPeople?: ProfileOtherPerson[];
  otherPeopleHeading?: string;
  /** When provided (and non-empty), renders a blog grid below the About section. */
  posts?: ProfilePost[];
}

export default function PersonProfileClient({
  person,
  kicker = "Team Member",
  otherPeople = [],
  otherPeopleHeading = "More voices from Adapts Media",
  posts = [],
}: PersonProfileClientProps) {
  const firstName = useMemo(() => person.name.split(" ")[0], [person.name]);
  const aboutText = person.aboutLong || person.bio;

  return (
    <div className="w-full bg-white text-gray-900 min-h-screen">
      {/* 1. Header Section */}
      <section className="w-full bg-gradient-to-b from-[#00224D] to-[#001126] pt-36 pb-20 px-6 md:px-20 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,192,46,0.08),transparent_40%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 relative z-10">
          {/* Left Block: Avatar, Name, Bio */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start max-w-4xl text-center md:text-left">
            {/* Circle Image Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl shadow-black/30 shrink-0 relative group overflow-hidden bg-[#0a254a]"
            >
              <Image
                src={person.image}
                alt={person.name}
                fill
                unoptimized
                className="object-cover object-top transition-transform duration-300"
                sizes="128px"
                priority
              />
            </motion.div>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAC02E] mb-2 block">
                {kicker}
              </span>
              <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-white mb-2">
                {person.name}
              </h1>
              <p className="text-lg md:text-xl font-light text-white/80 mb-6 italic">
                {person.role}
              </p>
              <p className="text-white/70 max-w-2xl font-light leading-relaxed mb-6">
                {person.bio}
              </p>

              {/* Location & Social Icons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/60">
                {person.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FAC02E]" />
                    <span>{person.location}</span>
                  </div>
                )}

                {person.email && (
                  <div className="flex items-center gap-3">
                    <a
                      href={person.email.startsWith("mailto:") ? person.email : `mailto:${person.email}`}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FAC02E]/20 hover:text-[#FAC02E] flex items-center justify-center transition-all duration-300 border border-white/10"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main content body (White Background) */}
      <main className="max-w-[1400px] mx-auto py-16 px-6 md:px-20">
        {/* Section: About Long */}
        <section id="about" className="mb-20 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Long Bio & Badges */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[3px] h-6 bg-[#c42a27]" />
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                  About {firstName}
                </h2>
              </div>
              <p className="text-gray-600 font-light text-base leading-relaxed whitespace-pre-line mb-8">
                {aboutText}
              </p>

              {/* Sub-Badges */}
              {person.badges && person.badges.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {person.badges.map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm font-medium text-gray-700">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Link to start a project */}
              <div>
                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c42a27] hover:bg-[#a32220] text-white rounded-xl text-sm font-medium shadow-md shadow-red-900/10 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  Start a project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Mini Info Card */}
            <div className="lg:col-span-4 bg-gray-50 border border-gray-100 p-8 rounded-2xl self-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Quick Facts
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Position</span>
                  <span className="font-semibold text-gray-800 text-right">{person.role}</span>
                </li>
                {person.location && (
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Office Location</span>
                    <span className="font-semibold text-gray-800 text-right">{person.location}</span>
                  </li>
                )}

                {person.expertise && person.expertise.length > 0 && (
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Primary Focus</span>
                    <span className="font-semibold text-gray-800 text-right">{person.expertise[0]}</span>
                  </li>
                )}
              </ul>

              {person.expertise && person.expertise.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-3">
                    Areas of Expertise
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {person.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-full font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section: Blog posts (author pages only — omitted when no posts are passed) */}
        {posts.length > 0 && (
          <section className="border-t border-gray-100 pt-16 mb-20 scroll-mt-24">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-6 bg-[#c42a27]" />
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                  Articles by {firstName}
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.map((post) => (
                <BlogGridCard
                  key={post.slug}
                  title={post.title}
                  image={post.image}
                  slug={post.slug}
                  author={post.author}
                  authorSlug={post.authorSlug || person.slug}
                  date={post.date}
                  tags={post.categories || []}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section: More Voices */}
        {otherPeople.length > 0 && (
          <section className="border-t border-gray-100 pt-16 mb-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-[3px] h-6 bg-[#c42a27]" />
              <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                {otherPeopleHeading}
              </h2>
            </div>

            <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
              {otherPeople.map((other) => (
                <Link
                  key={other.slug}
                  href={other.href}
                  className="flex flex-col items-center gap-3 group text-center"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#FAC02E]/60 group-hover:scale-105 transition-all duration-300 shadow-sm relative bg-[#0a254a]">
                    <Image
                      src={other.image}
                      alt={other.name}
                      fill
                      unoptimized
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-[#c42a27] transition-colors">
                    {other.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
