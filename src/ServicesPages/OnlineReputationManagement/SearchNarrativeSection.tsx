"use client";

import Link from "next/link";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const SearchNarrativeSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "UI and Visual Design Systems",
    "Brand Asset Libraries",
    "Component and Layout Systems",
    "Marketing Templates and Guidelines",
    "Cross-platform Consistency Frameworks",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle 700px at top left, rgba(240, 137, 36, 0.75) 0%, transparent 100%), radial-gradient(circle 700px at bottom right, rgba(240, 137, 36, 0.75) 0%, transparent 100%), #c12126",
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              Search &amp; Narrative Management
            </span>
            <h2 className="search-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Clean SERPs, <br />
              Unmatched Influence
            </h2>

            <div className="search-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-red-50/90">
              <p>
                We build high-converting online stores tailored to your business model, customer base &amp; revenue targets. We leverage Shopify for speed &amp; simplicity, Wix for agile deployments &amp; WordPress/WooCommerce for deep customization.
              </p>
              <p>
                Offering fast checkout flows, seamless payment gateway integrations &amp; mobile-first shopping experiences, we remove every barrier between product discovery and completed payment &amp; optimize every layer of the buyer journey.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="search-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Star Grid with golden sparkle */}
                <img
                  src="/images/ContactStarPattern.png"
                  className="search-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-125 z-0 opacity-75 pointer-events-none"
                  alt="Search Star Pattern Background"
                />

                {/* Main Illustration: image 74 */}
                <img
                  src="/images/ORM/image 74.png"
                  className="search-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.85]"
                  alt="Search & Narrative Management Illustration"
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
          <h3 className="search-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="search-deliverable-item service-deliverable-item flex items-start gap-2.5"
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

export default SearchNarrativeSection;
