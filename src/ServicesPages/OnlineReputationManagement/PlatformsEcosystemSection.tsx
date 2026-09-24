"use client";

import Link from "next/link";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const PlatformsEcosystemSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "High-Converting Layouts",
    "Rapid Load Speed",
    "Laser-Focused CTAs",
    "Campaign-Aligned Messaging",
    "A/B Testing Ready",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle 600px at top left, rgba(255, 255, 255, 0.08) 0%, transparent 100%), radial-gradient(circle 600px at bottom right, rgba(255, 255, 255, 0.08) 0%, transparent 100%), #1e1e1e",
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Illustration & CTA (Order 2 on mobile, Order 1 on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:order-1">
            {/* Illustration Container */}
            <div className="platform-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Star Grid with red/coral hue */}
                <img
                  src="/images/ContactStarPattern.png"
                  className="platform-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-125 z-0 opacity-70 pointer-events-none"
                  style={{ filter: "hue-rotate(330deg) saturate(3.5) brightness(0.85)" }}
                  alt="Ecosystem Star Pattern Background"
                />

                {/* Main Illustration: image 77 */}
                <img
                  src="/images/ORM/image 77.png"
                  className="platform-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.85]"
                  alt="Platforms & Ecosystem Coverage Illustration"
                />
              </div>
            </div>

            {/* Button Centered Under Image */}
            <div className="mt-8">
              <Link href="/portfolio" className="service-cta inline-block">
                <ArrowButton title="View Work" variant="light" />
              </Link>
            </div>
          </div>

          {/* Right Column: Text Content (Order 1 on mobile, Order 2 on desktop) */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start order-1 lg:order-2">
            <span className="service-category text-[#f08924] text-lg tracking-wider mb-3">
              Platforms &amp; Ecosystem Coverage
            </span>
            <h2 className="platform-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Sharper Coverage, <br />
              Smarter Positioning
            </h2>

            <div className="platform-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-gray-300">
              <p>
                We employ punchy copy structure, strategic visual hierarchy &amp; instant load times and design targeted, high-performance landing pages built specifically to turn campaign traffic into qualified leads and sales.
              </p>
              <p>
                Our team aligns every headline, CTA, web design &amp; development with your acquisition campaigns to maximize return on ad spend (ROAS). Land your target audience on pages tested for performance, optimized for action &amp; built to convert.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="platform-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="platform-deliverable-item service-deliverable-item flex items-start gap-2.5"
              >
                <div className="service-deliverable-icon mt-1 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#e03e3e]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </div>
                <span className="service-deliverable-text text-sm md:text-[15px] text-white/90 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformsEcosystemSection;
