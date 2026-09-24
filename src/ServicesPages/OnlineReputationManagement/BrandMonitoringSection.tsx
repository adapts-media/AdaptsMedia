"use client";

import Link from "next/link";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";
import ArrowButton from "@/components/buttons/ArrowButton";

const BrandMonitoringSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "24/7 Multi-Channel Social, News & Forum Listening",
    "AI-Driven Sentiment & Threat Velocity Scoring",
    "Competitor & Industry Benchmark Intelligence",
    "Real-Time Early Warning Alerts (Slack & Email)",
    "Executive Perception & Share-of-Voice Dashboards",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle 600px at top left, rgba(6, 78, 211, 0.3) 0%, transparent 100%), radial-gradient(circle 600px at bottom right, rgba(6, 78, 211, 0.3) 0%, transparent 100%), #092b5e",
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              Brand Health &amp; Sentiment Intelligence
            </span>
            <h2 className="monitor-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading font-normal">
              Spot Reputational Threats Before They Become Front-Page News.
            </h2>

            <div className="monitor-desc service-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-blue-100/90">
              <p>
                By the time a negative sentiment trends or an unfair thread ranks on search engines, it is already too late for casual fixes. Proactive monitoring transforms brand protection from reactive panic into continuous strategic immunity.
              </p>
              <p>
                We track every mention of your company, executives, products, and key competitors across news media, Reddit, Quora, X, LinkedIn, blogs, and review portals. Using predictive AI sentiment modeling, we identify anomalies and alert your leadership team before negative chatter gains momentum.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="monitor-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img
                  src="/images/BrandingCreative/LogoBgBlue.png"
                  className="monitor-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: "brightness(0)" }}
                  alt="Brand Monitoring Background Grid"
                />

                {/* Main Illustration */}
                <img
                  src="/images/ORM/image 76.png"
                  className="monitor-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.85]"
                  alt="Real-Time Sentiment Monitoring Gauge Illustration"
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
          <h3 className="monitor-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="monitor-deliverable-item service-deliverable-item flex items-start gap-2.5"
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

export default BrandMonitoringSection;
