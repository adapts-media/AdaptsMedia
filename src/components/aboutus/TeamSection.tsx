"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers as initialMembers, TeamMember } from '@/data/teamData';

import ArrowButton from '@/components/buttons/ArrowButton';
import { getMemberProfileUrl } from '@/lib/authors';

interface TeamSectionProps {
  members?: TeamMember[];
  title?: string;
  limit?: number;
  showViewAll?: boolean;
  viewAllText?: string;
  viewAllHref?: string;
  className?: string;
}

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [imgSrc, setImgSrc] = useState(member.image);

  useEffect(() => {
    setImgSrc(member.image);
  }, [member.image]);

  const profileUrl = getMemberProfileUrl(member);

  return (
    <Link href={profileUrl} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: (index % 4) * 0.08, ease: "easeOut" }}
        className="relative cursor-pointer aspect-[4/5] rounded-xl overflow-hidden bg-[#0a254a] h-full shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300"
      >
        {/* Top Right Plus Icon */}
        <div className="absolute top-5 right-5 z-20 transition-transform duration-300 group-hover:rotate-90">
          <Image
            src="/images/aboutus/plusicon.png"
            alt="View Details"
            width={30}
            height={40}
          />
        </div>

        {/* Team Member Image */}
        <div className="absolute inset-0 flex items-end justify-center bg-slate-900">
          <Image
            src={imgSrc}
            alt={member.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => {
              // Fallback to local image or initials avatar on broken URL
              if (member.name.toLowerCase().includes('ashish')) {
                setImgSrc('/images/Team/AshishGupta.png');
              } else if (member.name.toLowerCase().includes('shubham')) {
                setImgSrc('/images/Team/ShubhamDhanwate.png');
              } else if (member.name.toLowerCase().includes('dvija')) {
                setImgSrc('/images/Team/Dvija.png');
              } else if (member.name.toLowerCase().includes('raghad')) {
                setImgSrc('/images/Team/RD.png');
              } else {
                setImgSrc('/images/Team/AshishGupta.png');
              }
            }}
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Bottom Shadow / Info Container */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-6">
          <h3 className="text-xl font-medium text-white transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0 line-clamp-1">
            {member.name}
          </h3>
          <p className="text-sm text-[#FAC02E] mt-1 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 line-clamp-1">
            {member.role}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

const TeamSection = ({
  members: propMembers,
  title = "The Minds Behind",
  limit,
  showViewAll = false,
  viewAllText = "View Team",
  viewAllHref = "/team",
  className = "",
}: TeamSectionProps) => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const base = propMembers && propMembers.length > 0 ? propMembers : initialMembers;
    return limit ? base.slice(0, limit) : base;
  });

  useEffect(() => {
    const base = propMembers && propMembers.length > 0 ? propMembers : initialMembers;
    setMembers(limit ? base.slice(0, limit) : base);
  }, [propMembers, limit]);

  return (
    <section className={`w-full bg-[#00224D] py-24 px-8 md:px-16 min-h-screen ${className}`}>
      <div className="max-w-[1350px] 2xl:max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-opensans md:text-7xl font-light text-white leading-tight">
              {title}
            </h2>
          </motion.div>

          {showViewAll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-start sm:justify-end shrink-0"
            >
              <Link href={viewAllHref}>
                <ArrowButton title={viewAllText} />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Unified Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <TeamCard key={`${member.id}-${member.slug}`} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;