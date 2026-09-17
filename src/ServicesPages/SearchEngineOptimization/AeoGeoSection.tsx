"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const AeoGeoSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "AI Search Visibility Audit",
    "Brand Entity Establishment",
    "AEO/GEO Content Strategy",
    "Citation & Authority Building",
    "LLM Mention Tracking & Reporting",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      id="aeo-geo"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background: "radial-gradient(circle 600px at top left, rgba(7, 71, 107, 0.75) 0%, transparent 100%), radial-gradient(circle 600px at bottom right, rgba(7, 71, 107, 0.75) 0%, transparent 100%), #064ED3"
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              AEO &amp; GEO (LLM Search Visibility)
            </span>
            <h2 className="aeogeo-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Out of AI Answer. Out of Consideration Set.
            </h2>

            <div className="aeogeo-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-blue-50/90">
              <p>
                When a buyer asks ChatGPT, Perplexity or Gemini which agency to hire, which brand to buy or which product solves their problem, traditional SEO rankings mean nothing. Only brands cited by AI models get recommended. AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) are the disciplines that determine whether your brand appears in those answers or gets passed over entirely.
              </p>
              <p>
                We audit your brand&apos;s current AI search visibility, identify the gaps between what LLMs say about you and what you want them to say, and build a programme of content, entity establishment and digital authority development that gets your brand cited accurately across ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews. It is one of the fastest-growing service areas globally, and one of the least crowded. Agencies with this on their nav right now have a real first-mover window.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="aeogeo-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/LogoBgBlue.png"
                  className="aeogeo-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="AEO/GEO Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/AI And Emerging Media/image 64.png"
                  className="aeogeo-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]"
                  alt="AEO &amp; GEO Illustration"
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
          <h3 className="aeogeo-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="aeogeo-deliverable-item service-deliverable-item flex items-start gap-2.5">
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

export default AeoGeoSection;
