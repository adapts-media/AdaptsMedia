"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "@/hooks/useServiceDetailAnimation";

export default function HyundaiServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-32 md:py-44 text-white"
      style={{
        background: "radial-gradient(circle 850px at top left, #df382b 0%, #f08924 55%, transparent 100%), radial-gradient(circle 850px at bottom right, #df382b 0%, #f08924 55%, transparent 100%), #FAC02E",
      }}
    >

      {/* Content Container */}
      <div className="relative z-10 max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Text & Grid Info */}
        <div className="lg:col-span-7 service-content-wrapper flex flex-col justify-center text-left">
          <span className="service-category text-white/90 text-lg font-heading tracking-wider mb-3">
            Execution
          </span>
          <h2 className="service-title text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-6">
            Services Delivered
          </h2>

          <div className="service-desc text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/95 max-w-2xl mb-12">
            <p>
              In a highly competitive automotive aftermarket, consumers are
              often presented with lower-cost alternatives that can
              compromise quality and safety.
            </p>
          </div>

          {/* 2-Column Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 max-w-3xl mb-12">
            {[
              {
                title: "Social Media Strategy",
                desc: "Developed a content framework aligned with audience interests, platform behaviors, and brand objectives."
              },
              {
                title: "Creative Content Production",
                desc: "Created engaging visuals, motion graphics, and campaign assets designed to increase awareness and strengthen brand recall."
              },
              {
                title: "Content Planning",
                desc: "Built a structured content calendar balancing education, product awareness, industry insights, and engagement-focused content."
              },
              {
                title: "Community Engagement",
                desc: "Supported audience interaction through platform management and performance-led optimization."
              }
            ].map((service, idx) => (
              <div key={idx} className="service-deliverable-item flex items-start gap-4">
                <span className="service-deliverable-icon text-[#fcae1e] text-base mt-1.5 shrink-0">✦</span>
                <div className="service-deliverable-text flex flex-col gap-1.5">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    {service.title}
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/90 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-16 items-center">
            <a
              href="https://www.facebook.com/adaptsmedia/"
              target="_blank"
              rel="noopener noreferrer"
              className="service-cta w-16 h-16 rounded-full border border-white flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="Facebook"
            >
              <Image
                src="/images/SocialIcons/Fb.png"
                alt="Facebook"
                width={14}
                height={14}
                style={{ width: "auto", height: "auto" }}
                className="object-contain brightness-0 invert"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/adaptsmedia/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ae"
              target="_blank"
              rel="noopener noreferrer"
              className="service-cta w-16 h-16 rounded-full border border-white flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Image
                src="/images/SocialIcons/LinkedIN.png"
                alt="LinkedIn"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
                className="object-contain brightness-0 invert"
              />
            </a>
            <a
              href="https://www.instagram.com/adaptsmedia/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="service-cta w-16 h-16 rounded-full border border-white flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <Image
                src="/images/SocialIcons/Insta.png"
                alt="Instagram"
                width={16}
                height={16}
                style={{ width: "auto", height: "auto" }}
                className="object-contain brightness-0 invert"
              />
            </a>
          </div>
        </div>

        {/* Right Column: 3D Character Illustration */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[350px] md:h-[500px]">
          <div className="service-img-container relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* 1. BACKGROUND GRID */}
              <img
                src="/images/portfolio/Hyundai/group all (2).png"
                className="service-img-bg absolute inset-0 w-full h-full object-contain scale-[1.3] z-0 opacity-100 pointer-events-none"
                style={{ filter: "sepia(1) saturate(8) hue-rotate(335deg) brightness(0.85) contrast(1.5)" }}
                alt="Background Star Pattern"
              />

              {/* 2. MAIN 3D CHARACTER */}
              <img
                src="/images/portfolio/Hyundai/image 31.png"
                className="service-img-main relative z-10 w-full h-full object-contain scale-[1.05]"
                alt="Hyundai Mobis 3D Character Illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
