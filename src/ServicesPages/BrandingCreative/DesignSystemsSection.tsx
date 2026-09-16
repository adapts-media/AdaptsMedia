"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const DesignSystemsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const deliverables = [
    "Component Library Creation",
    "Design Token Documentation",
    "Typography & Spacing Systems",
    "Developer-Ready Style Guide",
    "Cross-Platform Usage Rules",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background: "radial-gradient(circle 600px at top left, rgba(250, 192, 46, 0.75) 0%, transparent 100%), radial-gradient(circle 600px at bottom right, rgba(250, 192, 46, 0.75) 0%, transparent 100%), #C12126"
      }}
    >

      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              Design Systems
            </span>
            <h2 className="designsystems-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              One Unified System, Scalable Across Every Platform
            </h2>

            <div className="designsystems-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-red-50/90">
              <p>
                Design inconsistency costs brands credibility. When every communication looks like it came from a different company, trust deteriorates. A design system fixes that. It gives your team shared components, tokens, and usage rules they can apply without any doubts or waiting for a designer.
              </p>
              <p>
                We build design systems for growing teams and product-driven businesses that need to produce content at scale without losing brand integrity. Our systems include component libraries, spacing and typography scales, color tokens, and usage documentation that works for both designers and developers.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="designsystems-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE */}
                <Image 
                  src="/images/BrandingCreative/DesignSystemLogoBg.png" 
                  fill
                  className="designsystems-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-80 pointer-events-none" 
                  alt="Logo Background Grid" 
                />
              
                {/* 2. THE MAIN IMAGE */}
                <Image 
                  src="/images/BrandingCreativeIcons/image 51.png" 
                  fill
                  className="designsystems-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]" 
                  alt="Design Systems Illustration" 
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
          <h3 className="designsystems-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="designsystems-deliverable-item service-deliverable-item flex items-start gap-2.5">
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

export default DesignSystemsSection;
