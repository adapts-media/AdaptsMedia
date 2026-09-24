"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyHero() {
  return (
    <section className="relative w-full pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden bg-gradient-to-b from-[#071322] via-[#091D34] to-[#0A2544] text-white">
      {/* Ambient background glow & subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#0052FF]/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2 text-xs font-medium text-white/60 mb-6 tracking-wide"
        >
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40" />
          <span className="text-blue-400 font-semibold">Privacy Policy</span>
        </nav>

        {/* Header Titles */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white leading-[1.15] mb-4">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed mx-auto max-w-2xl">
            How Adapts Media collects, uses, protects, and manages your personal information across our digital marketing solutions, websites, and international operations.
          </p>
        </div>
      </div>
    </section>
  );
}
