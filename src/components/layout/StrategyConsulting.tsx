"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import ServiceList from "../layout/ServicesList";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const services = [
  {
    items: [
      "Market Research",
      "Industry & Competitor Analysis",
      "Audience & Consumer Insights",
      "Data & Analytics Consulting",
    ],
    links: [
      "/strategy-consulting#market-research",
      "/strategy-consulting#industry-analysis",
      "/strategy-consulting#audience-insights",
      "/strategy-consulting#data-analytics",
    ],
  },
  {
    items: [
      "Tailor-made Growth Strategies",
      "Digital Audit",
      "Campaign Planning & Measurement",
    ],
    links: [
      "/strategy-consulting#growth-strategies",
      "/strategy-consulting#digital-audit",
      "/strategy-consulting#targeted-campaigns",
    ],
  },
];

const StrategyConsulting = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // Title animation
    const titleSplit = SplitText.create(".strategy-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(titleSplit);

    gsap.from(titleSplit.lines, {
      yPercent: 120,
      opacity: 0,
      rotationX: -15,
      transformOrigin: "0% 50% -60px",
      duration: 1.2,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".strategy-title",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Description fade up
    gsap.from(".strategy-desc", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".strategy-desc",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    // Service Lists stagger
    gsap.from(".strategy-list", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".strategy-list",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Image Parallax Effect
    gsap.fromTo(".img-bg-strategy", 
      { y: 30 },
      { 
        y: -30, 
        ease: "none",
        scrollTrigger: {
          trigger: ".img-container-strategy",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );

    gsap.fromTo(".img-main-strategy", 
      { y: 60 },
      { 
        y: -80, 
        ease: "none",
        scrollTrigger: {
          trigger: ".img-container-strategy",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5
        }
      }
    );

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-transparent relative text-white flex flex-col w-full items-start justify-start md:items-center md:justify-center py-20 font-sans overflow-hidden">
      <div className="z-50 max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16">
        <div className="flex flex-col min-[1200px]:flex-row gap-12 md:gap-42 items-start">
          
          {/* 1. Left Side: Column Wrapper */}
          <div className="img-container-strategy flex-shrink-0 md:sticky md:top-20">
            <div className="h-40 w-40 md:h-72 md:w-72 relative">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE */}
                <Image 
                  src="/images/services/commonbg.png" 
                  fill
                  className="img-bg-strategy absolute inset-0 w-full h-full object-contain scale-150 z-0 opacity-50 pointer-events-none" 
                  style={{ filter: 'brightness(0)' }}
                  alt="Background" 
                />
              
                {/* 2. THE MAIN IMAGE */}
                <Image 
                  src="/images/services/i6.png" 
                  fill
                  className="img-main-strategy relative z-10 w-full h-full object-contain" 
                  alt="Rocket" 
                />
              </div>
            </div>
          </div>

          {/* 2. Right Side: Text & Content */}
          <div className="flex-grow w-full">
            <div>
              <h2 className="strategy-title text-4xl md:text-7xl font-light mb-8 leading-tight max-w-3xl">
                Strategy & <br /> Consulting
              </h2>
              <p className="strategy-desc text-lg md:text-3xl opacity-90 max-w-3xl font-light leading-relaxed mb-20">
                Clarity before execution. We start by understanding your market, audience, and competition to build a strategy that’s focused, actionable, and built to win.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-16 w-full">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="strategy-list flex flex-col w-full"
                >
                  <ServiceList items={service.items} links={service.links} />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default StrategyConsulting;