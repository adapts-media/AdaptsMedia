"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "@/hooks/useServiceDetailAnimation";

export default function HyundaiApproachSection() {
  const containerRef = useRef<HTMLElement>(null);

  useServiceDetailAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-24 md:py-32 text-white bg-[#1e1e1e]">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/CampaignsBg.png"
        alt="Campaigns Background Pattern"
        fill
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Column: Phones Illustration with Branding Creative GSAP Animations */}
        <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[520px] md:h-[650px] order-2 lg:order-1">
          <div className="relative w-full max-w-[560px] h-full flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* 1. RED SPARKLE STAR MATRIX BACKGROUND (EXACT AS SCREENSHOT) */}
              <div className="service-img-bg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] md:w-[620px] md:h-[620px] z-0 pointer-events-none">
                <Image
                  src="/images/portfolio/Hyundai/group all red.png"
                  alt="Hyundai Red Star Pattern"
                  fill
                  sizes="(max-width: 768px) 460px, 620px"
                  className="object-contain opacity-90"
                  priority
                />
              </div>

              {/* 2. LEFT PHONE */}
              <div className="absolute left-[2%] md:left-[6%] top-[15%] w-[180px] md:w-[220px] h-[360px] md:h-[450px] z-10">
                <Image
                  src="/images/portfolio/Hyundai/Mask group (2).png"
                  alt="Hyundai Mobis Cricket Campaign"
                  fill
                  sizes="(max-width: 768px) 180px, 220px"
                  className="object-contain drop-shadow-xl"
                />
              </div>

              {/* 3. RIGHT PHONE */}
              <div className="absolute right-[2%] md:right-[6%] top-[15%] w-[180px] md:w-[220px] h-[360px] md:h-[450px] z-10">
                <Image
                  src="/images/portfolio/Hyundai/Mask group (1).png"
                  alt="Hyundai Mobis Door Visors Campaign"
                  fill
                  sizes="(max-width: 768px) 180px, 220px"
                  className="object-contain drop-shadow-xl"
                />
              </div>

              {/* 4. MIDDLE PHONE (Main floating element) */}
              <div className="service-img-main absolute left-1/2 -translate-x-1/2 top-[6%] w-[200px] md:w-[245px] h-[400px] md:h-[490px] z-20">
                <Image
                  src="/images/portfolio/Hyundai/Mask group.png"
                  alt="Hyundai Mobis Red Ignite Campaign"
                  fill
                  sizes="(max-width: 768px) 200px, 245px"
                  className="object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text Info with Branding Creative GSAP Animations */}
        <div className="lg:col-span-5 service-content-wrapper flex flex-col justify-center text-left order-1 lg:order-2">
          <span className="service-category text-[#FAC02E] text-lg font-heading tracking-wider mb-3">
            Strategy
          </span>
          <h2 className="service-title text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-10">
            Our Approach
          </h2>

          <div className="service-desc text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/80 max-w-2xl mb-10">
            <p>
              Rather than focusing solely on product promotion, we developed
              a content ecosystem designed to educate, engage, and reinforce
              trust.
            </p>
          </div>

          <h3 className="service-deliverables-header text-base md:text-lg font-heading font-semibold text-white mb-8 tracking-wide">
            Our strategy centered around three key pillars:
          </h3>

          {/* Vertically Stacked Pillars */}
          <div className="flex flex-col gap-8 max-w-2xl">
            {[
              {
                title: "Education",
                desc: "Creating informative content that highlighted the benefits, performance, and safety standards of genuine Hyundai Mobis parts."
              },
              {
                title: "Trust",
                desc: "Showcasing product quality, manufacturing excellence, and the long-term value of using original components."
              },
              {
                title: "Engagement",
                desc: "Developing visually engaging content formats that encouraged interaction while making technical information easy to understand."
              }
            ].map((pillar, idx) => (
              <div key={idx} className="service-deliverable-item flex items-start gap-4">
                <span className="service-deliverable-icon text-[#d61e1b] mt-1.5 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                  </svg>
                </span>
                <div className="service-deliverable-text flex flex-col gap-1">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
