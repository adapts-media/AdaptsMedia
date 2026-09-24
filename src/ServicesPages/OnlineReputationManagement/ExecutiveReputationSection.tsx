"use client";

import Link from "next/link";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const ExecutiveReputationSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "C-Suite & Founder Online Footprint Audits",
    "Executive Thought Leadership Op-Ed Placements",
    "LinkedIn Authority & Biographical Content Architecture",
    "Wikipedia & Knowledge Panel Entity Verification",
    "Personal Smear Shielding & Risk Containment",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle 600px at top left, rgba(250, 192, 46, 0.75) 0%, transparent 100%), radial-gradient(circle 600px at bottom right, rgba(250, 192, 46, 0.75) 0%, transparent 100%), #C12126",
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              Executive &amp; VIP Brand Shielding
            </span>
            <h2 className="exec-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Protect The Leaders Who Represent The Company.
            </h2>

            <div className="exec-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-red-50/90">
              <p>
                In high-stakes deals, partnerships, and hiring, decision-makers don&apos;t just evaluate the company—they research the founders, CEO, and leadership team. Negative press, unfounded allegations, or outdated personal search results can jeopardize enterprise contracts and investor trust.
              </p>
              <p>
                We curate and protect executive search profiles. From placing tier-1 op-eds and establishing Wikipedia and Google Knowledge Panel entities to suppressing malicious search results, we position your leadership as industry visionaries with untarnished reputations.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="exec-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/LogoBgBlue.png"
                  className="exec-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: "brightness(0)" }}
                  alt="Executive Branding Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/ORM/image 73.png"
                  className="exec-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.85]"
                  alt="Executive Reputation Management Illustration"
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
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="exec-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="exec-deliverable-item service-deliverable-item flex items-start gap-2.5"
              >
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

export default ExecutiveReputationSection;
