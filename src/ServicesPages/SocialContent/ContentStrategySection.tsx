"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const ContentStrategySection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "Audience & Competitor Research",
    "Core Narrative & Pillar Definition",
    "Multi-Channel Distribution Roadmaps",
    "Funnel-Aligned Content Mapping",
    "Performance Tracking & KPI Models",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background: "radial-gradient(circle 600px at top left, rgba(6, 78, 211, 0.3) 0%, transparent 100%), radial-gradient(circle 600px at bottom right, rgba(6, 78, 211, 0.3) 0%, transparent 100%), #092b5e"
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:order-1">
            {/* Illustration Container */}
            <div className="contentstrategy-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/DarkBlueLogoBg.png"
                  className="contentstrategy-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="Content Strategy Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/BrandingCreative/DarkBlueLogo.png"
                  className="contentstrategy-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]"
                  alt="Content Strategy Illustration"
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

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start order-1 lg:order-2">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              Content Strategy
            </span>
            <h2 className="contentstrategy-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Clear Direction, Unified Messaging, Maximum Content Mileage
            </h2>

            <div className="contentstrategy-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-blue-50/90">
              <p>
                Random acts of content don't yield business results. A great product needs a clear story and an intentional distribution engine. We map end-to-end content strategies designed to solve customer pain points and guide prospects down the funnel.
              </p>
              <p>
                Conducting thorough audience research, competitor gap analysis & offering channel-specific distribution frameworks, we establish your brand’s core narratives, tone guidelines & content pillars to ensure every asset serves a measurable business objective.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="contentstrategy-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="contentstrategy-deliverable-item service-deliverable-item flex items-start gap-2.5">
                <div className="service-deliverable-icon mt-1 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#FAC02E]"
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

export default ContentStrategySection;
