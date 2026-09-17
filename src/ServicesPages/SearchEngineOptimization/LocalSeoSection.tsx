"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const LocalSeoSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "Google Business Profile Setup & Complete Optimization",
    "Local Citation Building & NAP Consistency Audits",
    "Geo-Targeted Landing Page Architecture",
    "Local Review Generation & Reputation Strategy",
    "Hyper-Local Keyword & Competitor Targeting",
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
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              Local SEO
            </span>
            <h2 className="localseo-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Dominate Geo-Targeted Searches. Win Nearby Buyers.
            </h2>

            <div className="localseo-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-blue-50/90">
              <p>
                Local search intent leads directly to offline and online transactions. When nearby buyers search for your products or services, your business must appear at the top of the Map Pack and localized search engine result pages (SERPs).
              </p>
              <p>
                We optimize your multi-location or local presence across Google Business Profile, local directories, and geo-targeted landing pages. We manage review generation workflows, local citation consistency, and hyper-local content strategies to ensure you capture the highest-intent local traffic available.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="localseo-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/DarkBlueLogoBg.png"
                  className="localseo-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="Local SEO Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/SEO Icons/image 69.png"
                  className="localseo-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]"
                  alt="Local SEO Illustration"
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
          <h3 className="localseo-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="localseo-deliverable-item service-deliverable-item flex items-start gap-2.5">
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

export default LocalSeoSection;
