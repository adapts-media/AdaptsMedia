"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "@/hooks/useServiceDetailAnimation";

export default function AaniApproachSection() {
  const containerRef = useRef<HTMLElement>(null);

  useServiceDetailAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-24 md:py-32 text-white bg-[#1e1e1e]">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/CampaignsBg.png"
        alt="Campaigns Background Pattern"
        fill
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Column: Creatives & Mockups with GSAP Animations */}
        <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[520px] md:h-[650px] order-2 lg:order-1">
          <div className="relative w-full max-w-[560px] h-full flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* 1. TOP-LEFT RED STAR MATRIX BACKGROUND */}
              <div
                className="absolute -left-[6%] sm:-left-[2%] md:-left-[4%] -top-[4%] sm:-top-[2%] w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] md:w-[310px] md:h-[310px] z-0 pointer-events-none"
              >
                <Image
                  src="/images/portfolio/Hyundai/group all red.png"
                  alt="Red Star Pattern Top Left"
                  fill
                  sizes="(max-width: 768px) 270px, 310px"
                  className="object-contain opacity-95"
                  priority
                />
              </div>

              {/* 2. BOTTOM-RIGHT RED STAR MATRIX BACKGROUND */}
              <div
                className="absolute -right-[6%] sm:-right-[2%] md:-right-[4%] top-[26%] sm:top-[28%] md:top-[28%] w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] md:w-[310px] md:h-[310px] z-0 pointer-events-none"
              >
                <Image
                  src="/images/portfolio/Hyundai/group all red.png"
                  alt="Red Star Pattern Bottom Right"
                  fill
                  sizes="(max-width: 768px) 270px, 310px"
                  className="object-contain opacity-95"
                  priority
                />
              </div>

              {/* 3. LEFT CARD */}
              <div className="absolute left-[2%] sm:left-[5%] md:left-[6%] top-[12%] w-[190px] sm:w-[225px] md:w-[260px] aspect-[4/5] z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Case Studies/Aani/Mask group (1).png"
                  alt="AANI Mobile App Feature"
                  fill
                  sizes="(max-width: 768px) 225px, 260px"
                  className="object-cover rounded-2xl"
                />
              </div>

              {/* 4. RIGHT CARD */}
              <div className="absolute right-[2%] sm:right-[5%] md:right-[6%] top-[12%] w-[190px] sm:w-[225px] md:w-[260px] aspect-[4/5] z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Case Studies/Aani/Mask group (2).png"
                  alt="AANI Instant Payment Screen"
                  fill
                  sizes="(max-width: 768px) 225px, 260px"
                  className="object-cover rounded-2xl"
                />
              </div>

              {/* 5. MIDDLE CARD (Main floating element) */}
              <div className="service-img-main absolute left-1/2 -translate-x-1/2 top-[4%] w-[215px] sm:w-[250px] md:w-[290px] aspect-[4/5] z-20 rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.85)] border border-white/10">
                <Image
                  src="/images/Case Studies/Aani/Mask group.png"
                  alt="AANI DOOH Outdoor Campaign"
                  fill
                  sizes="(max-width: 768px) 250px, 290px"
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text Info with GSAP Animations */}
        <div className="lg:col-span-5 service-content-wrapper flex flex-col justify-center text-left order-1 lg:order-2">
          <span className="service-category text-[#FAC02E] text-lg font-heading tracking-wider mb-3">
            Strategy
          </span>
          <h2 className="service-title text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-10">
            Our Approach
          </h2>

          <div className="service-desc text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/80 max-w-2xl mb-10">
            <p>
              Rather than running a single flat campaign, we structured the media plan around a full funnel that moved audiences from cold awareness through to conversion, adjusting budget and creative weight as performance data came in.
            </p>
          </div>

          <h3 className="service-deliverables-header text-base md:text-lg font-heading font-semibold text-white mb-8 tracking-wide">
            Our strategy centered around three key pillars:
          </h3>

          {/* Vertically Stacked Pillars */}
          <div className="flex flex-col gap-8 max-w-2xl">
            {[
              {
                title: "1. Awareness",
                desc: "Broad-reach placements across Meta, YouTube, LinkedIn, TikTok, programmatic display and audio, and UAE publisher sites (Khaleej Times, Al Watan, Al Etihad, The National), supported by DOOH and radio for offline reach.",
              },
              {
                title: "2. Retargeting",
                desc: "Dedicated retargeting flights on Meta, Programmatic Display, TikTok, LinkedIn, and YouTube to re-engage users who had already shown interest, using dedicated creative and CTAs to move them further down the funnel.",
              },
              {
                title: "3. Conversion & App Install",
                desc: "A dedicated app install push, plus 'Download AANI' appographic-targeted creative, to translate awareness and site traffic into installed, active users of the platform.",
              },
            ].map((pillar, idx) => (
              <div key={idx} className="service-deliverable-item flex items-start gap-4">
                <span className="service-deliverable-icon text-[#0097e6] mt-1.5 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                  </svg>
                </span>
                <div className="service-deliverable-text flex flex-col gap-1.5">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
