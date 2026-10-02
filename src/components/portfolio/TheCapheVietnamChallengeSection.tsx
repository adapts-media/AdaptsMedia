"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "@/hooks/useServiceDetailAnimation";

export default function TheCapheVietnamChallengeSection() {
  const containerRef = useRef<HTMLElement>(null);

  useServiceDetailAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-24 md:py-32 text-white bg-[#064ed3]">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/IdentityBg.png"
        alt="Identity Background Pattern"
        fill
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Challenge Info */}
        <div className="lg:col-span-7 service-content-wrapper flex flex-col justify-center text-left">
          <span className="service-category text-[#FAC02E] text-lg font-heading tracking-wider mb-3">
            Case Study
          </span>
          <h2 className="service-title text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-8">
            The Challenge
          </h2>

          <div className="service-desc text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/80 max-w-2xl mb-12">
            <p>
              Operating in a highly competitive e-commerce and specialty beverage market, The Caphe Vietnam struggled with search engine discovery, indexation errors, and low organic keyword footprint.
            </p>
          </div>

          <h3 className="service-deliverables-header text-base md:text-lg font-heading font-semibold text-white mb-6 tracking-wide">
            The Caphe Vietnam needed to:
          </h3>

          {/* Grid of Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-3xl">
            {[
              "Audit and resolve unnecessary indexed links harming Google crawl health",
              "Capture high-intent queries across coffee, tea, and specialty nuts",
              "Overhaul technical SEO architecture to lift organic search visibility",
              "Publish strategic, SEO-driven content to build topical authority",
              "Acquire authoritative backlinks to drive qualified traffic and conversions",
            ].map((text, idx) => (
              <div key={idx} className={`service-deliverable-item flex items-start gap-3 ${idx === 4 ? "md:col-span-2" : ""}`}>
                <span className="service-deliverable-icon text-[#FAC02E] text-base mt-0.5 shrink-0">✦</span>
                <span className="service-deliverable-text text-sm md:text-base font-heading font-light text-white/90">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chess King Image with Branding Creative GSAP Animations */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[350px] md:h-[450px]">
          <div className="service-img-container relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* 1. THE BACKGROUND GRID */}
              <img
                src="/images/BrandingCreative/LogoBgBlue.png"
                className="service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                style={{ filter: "brightness(0)" }}
                alt="Logo Background Grid"
              />

              {/* 2. THE CHESS KING */}
              <img
                src="/images/portfolio/Hyundai/White King Chess.G03.2k 1.png"
                className="service-img-main relative z-10 w-full h-full object-contain scale-[1.05]"
                alt="White King Chess Piece"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
