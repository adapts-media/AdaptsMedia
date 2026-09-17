"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { TeamMember, teamMembers } from "@/data/teamData";
import { getMemberProfileUrl } from "@/lib/authors";

interface TeamMemberProfileClientProps {
  member: TeamMember;
}

export default function TeamMemberProfileClient({
  member,
}: TeamMemberProfileClientProps) {
  // Get other team members for the "More voices" section
  const otherMembers = useMemo(() => {
    return teamMembers.filter((m) => m.slug !== member.slug);
  }, [member.slug]);

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
                src={member.image}
                alt={member.name}
                fill
                unoptimized
                className="object-cover object-top transition-transform duration-300"
                sizes="128px"
                priority
              />
            </motion.div>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAC02E] mb-2 block">
                Team Member
              </span>
              <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-white mb-2">
                {member.name}
              </h1>
              <p className="text-lg md:text-xl font-light text-white/80 mb-6 italic">
                {member.role}
              </p>
              <p className="text-white/70 max-w-2xl font-light leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Location & Social Icons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FAC02E]" />
                  <span>{member.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FAC02E]/20 hover:text-[#FAC02E] flex items-center justify-center transition-all duration-300 border border-white/10"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FAC02E]/20 hover:text-[#FAC02E] flex items-center justify-center transition-all duration-300 border border-white/10"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Member Since Badge */}
          {member.memberSince && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex flex-col items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl shrink-0"
            >
              <span className="text-3xl font-light text-[#FAC02E] block mb-1">
                {member.memberSince}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                team member since
              </span>
            </motion.div>
          )}
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
                  About {member.name.split(" ")[0]}
                </h2>
              </div>
              <p className="text-gray-600 font-light text-base leading-relaxed whitespace-pre-line mb-8">
                {member.aboutLong || member.bio}
              </p>

              {/* Sub-Badges */}
              {member.badges && member.badges.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {member.badges.map((badge) => (
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
                  <span className="font-semibold text-gray-800 text-right">{member.role}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Office Location</span>
                  <span className="font-semibold text-gray-800 text-right">{member.location}</span>
                </li>
                {member.memberSince && (
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-semibold text-gray-800 text-right">{member.memberSince}</span>
                  </li>
                )}
                {member.expertise && member.expertise.length > 0 && (
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Primary Focus</span>
                    <span className="font-semibold text-gray-800 text-right">{member.expertise[0]}</span>
                  </li>
                )}
              </ul>

              {member.expertise && member.expertise.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-3">
                    Areas of Expertise
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp, idx) => (
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

        {/* Section: More Voices */}
        <section className="border-t border-gray-100 pt-16 mb-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-[3px] h-6 bg-[#c42a27]" />
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
              More voices from Adapts Media
            </h2>
          </div>

          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {otherMembers.map((other) => (
              <Link
                key={other.id}
                href={getMemberProfileUrl(other)}
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
      </main>
    </div>
  );
}
