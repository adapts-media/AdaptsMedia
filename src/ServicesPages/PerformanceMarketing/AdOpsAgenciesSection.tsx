"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const AdOpsAgenciesSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "Campaign Trafficking & QA",
    "Tag Management & Verification",
    "Delivery Monitoring & Pacing",
    "Third-Party Reporting Integration",
    "Discrepancy Management & Resolution",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-white text-slate-900"
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#064ed3] text-lg tracking-wider mb-3">
              Ad Operations for Advertising Agencies
            </span>
            <h2 className="adops-agency-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl text-slate-900 font-heading font-normal">
              Flawless Campaign Execution, No Errors, No Delays.
            </h2>

            <div className="adops-agency-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-slate-600">
              <p>
                Agency ad ops is where campaigns win or lose execution. A single trafficking error can drain days of spend and corrupt attribution data. We handle complete ad operations for agencies that need precision at scale, without adding headcount to their team.
              </p>
              <p>
                From creative QA and tag implementation to troubleshooting delivery discrepancies and third-party reporting integration, we manage the technical layer of your campaigns so account managers can focus on strategy and client relationships. We work across all major DSPs and ad servers.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="adops-agency-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/WhiteLogoBg.png"
                  className="adops-agency-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="Agency Ad Ops Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/Performance Marketing Icons/image 43.png"
                  className="adops-agency-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]"
                  alt="Agency Ad Ops Illustration"
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
          <h3 className="adops-agency-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6 text-slate-900">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="adops-agency-deliverable-item service-deliverable-item flex items-start gap-2.5">
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

export default AdOpsAgenciesSection;
