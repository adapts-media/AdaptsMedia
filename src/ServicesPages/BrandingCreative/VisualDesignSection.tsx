"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const VisualDesignSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "Social Media & Ad Artwork",
    "Print Collateral & Packaging",
    "Presentation Design",
    "Editorial & Report Layouts",
    "Brand-Consistent Design Production",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background: "radial-gradient(circle 600px at top left, rgba(255, 255, 255, 0.15) 0%, transparent 100%), radial-gradient(circle 600px at bottom right, rgba(255, 255, 255, 0.15) 0%, transparent 100%), #1e1e1e"
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:order-1">
            {/* Illustration Container */}
            <div className="visualdesign-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/WhiteLogoBg.png"
                  className="visualdesign-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="Visual Design Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/BrandingCreativeIcons/Graphic Design 1.png"
                  className="visualdesign-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]"
                  alt="Visual Design & Artwork Illustration"
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
              Visual Design & Artwork
            </span>
            <h2 className="visualdesign-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Art Direction That Commands Attention
            </h2>

            <div className="visualdesign-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-gray-300">
              <p>
                Bad design loses customers before they read a single word. The quality of your visuals signals the quality of your product. We create graphic design and artwork that represents your brand accurately and performs across every application, screen, and surface it appears on.
              </p>
              <p>
                From social media graphics and advertising artwork to printed collateral, presentations, and editorial layouts, we handle the full spectrum of visual design production. Our work is built on your brand system, not generic templates, so every output reinforces the same identity.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="visualdesign-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="visualdesign-deliverable-item service-deliverable-item flex items-start gap-2.5">
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

export default VisualDesignSection;
