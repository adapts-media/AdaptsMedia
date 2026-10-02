"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AlphaNeroProjectOverview from "@/components/portfolio/AlphaNeroProjectOverview";
import AlphaNeroChallengeSection from "@/components/portfolio/AlphaNeroChallengeSection";
import AlphaNeroApproachSection from "@/components/portfolio/AlphaNeroApproachSection";
import AlphaNeroServicesSection from "@/components/portfolio/AlphaNeroServicesSection";
import AlphaNeroOutcomeSection from "@/components/portfolio/AlphaNeroOutcomeSection";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";

const BookmarkIcon = () => (
  <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

export default function AlphaNeroCaseStudy() {
  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-28 lg:pt-20 text-white bg-[#181818]">
        {/* Hero Background Image with subtle zoom/parallax */}
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Image
            src="/images/Case Studies/Alpha Nero/Alpha Nero.png"
            alt="Alpha Nero Luxury Fit-Out Case Study"
            fill
            quality={95}
            priority
            className="object-cover object-right lg:object-center"
          />
        </motion.div>

        {/* Content wrapper */}
        <div className="relative z-10 max-w-[1350px] w-full mx-auto px-8 md:px-16 lg:px-20 py-12 flex flex-col justify-center text-left min-h-[calc(100vh-160px)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
            }}
            className="max-w-[700px]"
          >

            {/* White Logo */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="relative w-48 h-14 mb-8"
            >
              <Image
                src="/images/Case Studies/Alpha Nero/Alphanerowhitelogo.png"
                alt="Alpha Nero White Logo"
                fill
                sizes="192px"
                priority
                className="object-contain object-left"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-[clamp(34px,4.5vw,52px)] font-heading font-medium tracking-tight leading-snug text-white mb-6"
            >
              Building a Digital Presence to <br />
              Match Luxury Craftsmanship
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-[clamp(15px,1.5vw,18px)] font-heading font-normal leading-relaxed text-white/90 mb-10 max-w-lg"
            >
              Implementing a full website rebuild and SEO program that took Alpha Nero from almost no digital footprint to a growing base of engaged, organic traffic.
            </motion.p>

            {/* Divider line before tags */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="w-full h-[1px] bg-gradient-to-r from-white/30 via-white/10 to-transparent mb-8 origin-left"
            />

            {/* Tags */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } }
              }}
              className="flex flex-wrap gap-2.5"
            >
              {["Luxury Fit-Out", "Website Redesign", "Strategic SEO", "Website Maintenance", "Organic Growth"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)", borderColor: "rgba(255, 255, 255, 0.4)" }}
                  className="flex items-center gap-1.5 border border-white/20 text-white/80 rounded-full px-4 py-1.5 text-xs md:text-sm bg-white/5 font-heading font-light cursor-pointer transition-all duration-300"
                >
                  <BookmarkIcon /> {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW SECTION ── */}
      <AlphaNeroProjectOverview />

      {/* ── THE CHALLENGE SECTION ── */}
      <AlphaNeroChallengeSection />

      {/* ── OUR APPROACH SECTION ── */}
      <AlphaNeroApproachSection />

      {/* ── SERVICES DELIVERED SECTION ── */}
      <AlphaNeroServicesSection />

      {/* ── THE OUTCOME & KEY RESULTS SECTION ── */}
      <AlphaNeroOutcomeSection />

      <PortfolioSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
