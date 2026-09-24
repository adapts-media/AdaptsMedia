"use client";

import Link from "next/link";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const CrisisRiskMonitoringSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "Connected Tech Stack",
    "Custom API Engineering",
    "Real-Time Data Sync",
    "Bulletproof Data Security",
    "High-Throughput Performance",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-gradient-to-br from-[#ebf3fa] via-[#f7fafc] to-[#ffffff] text-slate-900"
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#064ed3] text-lg tracking-wider mb-3">
              Crisis &amp; Risk Monitoring
            </span>
            <h2 className="crisis-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl text-slate-900 font-heading font-normal">
              Immediate Alerting, <br />
              Structured Response
            </h2>

            <div className="crisis-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-slate-600">
              <p>
                Your website shouldn’t operate in a silo. We connect your digital platform to your essential business stack - CRMs, ERPs, payment processors, analytics engines and marketing automation tools.
              </p>
              <p>
                With custom API endpoints, real-time data synchronization &amp; bulletproof security, we ensure information flows seamlessly between systems, cutting operational overhead and giving you a single source of truth across your tech stack.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="crisis-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Star Grid with blue dots */}
                <img
                  src="/images/ContactStarPattern.png"
                  className="crisis-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-125 z-0 opacity-70 pointer-events-none"
                  style={{ filter: "hue-rotate(185deg) saturate(2.5) brightness(1.05)" }}
                  alt="Risk Monitoring Star Pattern Background"
                />

                {/* Main Illustration: image 76 */}
                <img
                  src="/images/ORM/image 76.png"
                  className="crisis-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.85]"
                  alt="Crisis & Risk Monitoring Gauge Illustration"
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
          <h3 className="crisis-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6 text-slate-900">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="crisis-deliverable-item service-deliverable-item flex items-start gap-2.5"
              >
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

export default CrisisRiskMonitoringSection;
