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
      "UX & UI Design",
      "E-commerce Development",
      "API & System Integration",
      "Website Maintenance & Support",
    ],
    links: [
      "/web-digital-experience#ux-ui",
      "/web-digital-experience#ecommerce-development",
      "/web-digital-experience#api-integration",
      "/web-digital-experience#website-maintenance",
    ],
  },
  {
    items: [
      "Web Development",
      "CMS Implementation",
      "Landing Page Design",
      "Conversion Rate Optimisation",
    ],
    links: [
      "/web-digital-experience#web-development",
      "/web-digital-experience#cms-implementation",
      "/web-digital-experience#landing-page-design",
      "/web-digital-experience#conversion-rate-optimisation",
    ],
  },
];

const WebDigitalExperience = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // Title animation
    const titleSplit = SplitText.create(".web-title", {
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
        trigger: ".web-title",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Description fade up
    gsap.from(".web-desc", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".web-desc",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    // Service Lists stagger
    gsap.from(".web-list", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".web-list",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Image Parallax Effect
    gsap.fromTo(".img-bg-web", 
      { y: 30 },
      { 
        y: -30, 
        ease: "none",
        scrollTrigger: {
          trigger: ".img-container-web",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );

    gsap.fromTo(".img-main-web", 
      { y: 60 },
      { 
        y: -80, 
        ease: "none",
        scrollTrigger: {
          trigger: ".img-container-web",
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
    <section ref={containerRef} className="bg-transparent relative text-white font-sans overflow-hidden">
      <div className="relative z-50 max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 mx-auto">
        <div className="flex flex-col min-[1200px]:flex-row gap-12 md:gap-36 items-start">

          {/* LEFT COLUMN: Text and Grid */}
          <div className="flex-grow w-full">
            <div>
              <h2 className="web-title text-4xl md:text-7xl font-light mb-8 leading-tight">
                Web & Digital  <br /> Experience
              </h2>
              <p className="web-desc text-lg md:text-3xl opacity-90 mb-20 font-light max-w-3xl">
                We design digital experiences that don’t just look good — they convert, perform, and support your growth goals.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full">
              {services && services.map((service, index) => (
                <div key={index} className="web-list w-full">
                  <ServiceList items={service.items} links={service.links} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Image (Sticky) */}
          <div className="img-container-web flex-shrink-0 md:sticky md:top-20">
            <div className="h-40 w-40 md:h-72 md:w-72 relative">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE */}
                <Image
                  src="/images/services/commonbg.png"
                  fill
                  className="img-bg-web absolute inset-0 w-full h-full object-contain scale-150 z-0 opacity-50 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="Background"
                />

                {/* 2. THE MAIN IMAGE */}
                <Image
                  src="/images/services/i3.png"
                  fill
                  className="img-main-web relative z-10 w-full h-full object-contain"
                  alt="Rocket"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WebDigitalExperience;