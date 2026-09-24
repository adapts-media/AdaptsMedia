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
      "Review & Ratings Management",
      "Forum & Community Reputation",
      "Search & Narrative Management",
    ],
    links: [
      "/online-reputation-management#review-management",
      "/online-reputation-management#forum-community-reputation",
      "/online-reputation-management#search-narrative-management",
    ],
  },
  {
    items: [
      "Social Listening & Response",
      "Crisis & Risk Monitoring",
      "Platforms & Ecosystem Coverage",
    ],
    links: [
      "/online-reputation-management#social-listening-response",
      "/online-reputation-management#crisis-risk-monitoring",
      "/online-reputation-management#platforms-ecosystem-coverage",
    ],
  },
];

const OnlineReputationManagement = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const splits: any[] = [];

      // Title animation
      const titleSplit = SplitText.create(".orm-layout-title", {
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
          trigger: ".orm-layout-title",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Description fade up
      gsap.from(".orm-layout-desc", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".orm-layout-desc",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Service Lists stagger
      gsap.from(".orm-layout-list", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".orm-layout-list",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Image Parallax Effect
      gsap.fromTo(
        ".img-bg-orm",
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: ".img-container-orm",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".img-main-orm",
        { y: 60 },
        {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: ".img-container-orm",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
          },
        }
      );

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="online-reputation-management"
      ref={containerRef}
      className="bg-transparent relative text-white py-20 font-sans overflow-hidden"
    >
      <div className="relative z-50 max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 mx-auto">
        {/* Flex Wrapper: Text and Grid on Left, Image on Right */}
        <div className="flex flex-col min-[1200px]:flex-row gap-12 md:gap-36 items-start">
          {/* LEFT COLUMN: Text and Services Grid */}
          <div className="flex-grow w-full">
            <div>
              <h2 className="orm-layout-title text-4xl md:text-7xl font-light mb-8 leading-tight">
                Online Reputation <br /> Management
              </h2>
              <p className="orm-layout-desc text-lg md:text-3xl opacity-90 mb-20 font-light max-w-3xl">
                Protect trust and own your brand narrative. We turn search results, review channels, and online communities into growth assets that protect revenue and build lasting equity.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full">
              {services &&
                services.map((service, index) => (
                  <div key={index} className="orm-layout-list w-full">
                    <ServiceList items={service.items} links={service.links} />
                  </div>
                ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Image (Sticky) */}
          <div className="img-container-orm flex-shrink-0 md:sticky md:top-20">
            <div className="h-40 w-40 md:h-72 md:w-72 relative">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE */}
                <Image
                  src="/images/services/commonbg.png"
                  fill
                  sizes="(max-width: 768px) 160px, 288px"
                  className="img-bg-orm absolute inset-0 w-full h-full object-contain scale-150 z-0 opacity-50 pointer-events-none"
                  style={{ filter: "brightness(0)" }}
                  alt="Background Pattern"
                />

                {/* 2. THE MAIN IMAGE (image 72) */}
                <Image
                  src="/images/ORM/image 72.png"
                  fill
                  sizes="(max-width: 768px) 160px, 288px"
                  className="img-main-orm relative z-10 w-full h-full object-contain"
                  alt="Online Reputation Management"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineReputationManagement;
