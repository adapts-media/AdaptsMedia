"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const AiSeoGeoSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "AI Search Engine Visibility & Citation Auditing",
    "Entity & Knowledge Graph Optimization",
    "Conversational Query & Direct-Answer Formatting",
    "Multi-Platform AI Brand Presence Strategy",
    "Generative Search Result Performance Tracking",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-[#f4f7fa] text-slate-900"
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#064ed3] text-lg tracking-wider mb-3">
              AI SEO & GEO
            </span>
            <h2 className="aiseogeo-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl text-slate-900 font-heading font-normal">
              Win in AI Overview Cards. Future-Proof Your Organic Visibility.
            </h2>

            <div className="aiseogeo-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-slate-600">
              <p>
                The search landscape has evolved beyond traditional link listings. Search engines now utilize generative AI models and answer engines to summarize information directly on the SERP. If your content isn't structured for large language models (LLMs), your brand risks becoming invisible in key search experiences.
              </p>
              <p>
                We optimize your digital footprint for AI-driven engines including Google AI Overviews, ChatGPT Search, Perplexity, and Claude. By structuring entity relationships, optimizing for conversational queries, and building brand citations across trusted AI knowledge sources, we secure your position in the future of search.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="aiseogeo-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/LogoBgBlue.png"
                  className="aiseogeo-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="AI SEO & GEO Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/BrandingCreative/LogoBlue.png"
                  className="aiseogeo-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]"
                  alt="AI SEO & GEO Illustration"
                />
              </div>
            </div>

            {/* Button Centered Under Image */}
            <div className="mt-8">
              <Link href="/portfolio" className="service-cta inline-block">
                <ArrowButton title="View Work" variant="blue" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="aiseogeo-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6 text-slate-900">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="aiseogeo-deliverable-item service-deliverable-item flex items-start gap-2.5">
                <div className="service-deliverable-icon mt-1 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#064ed3]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </div>
                <span className="service-deliverable-text text-sm md:text-[15px] text-slate-700 leading-snug">
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

export default AiSeoGeoSection;
