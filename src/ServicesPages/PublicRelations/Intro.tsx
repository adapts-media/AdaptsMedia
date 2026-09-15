"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const pills = [
    "Strategic PR",
    "Press Releases & Media Outreach",
    "Events & Activations",
    "Sponsorship & Partnerships",
    "Influencer & Ambassador Programmes",
    "Crisis Communications"
  ];

  useGSAP(() => {
    const el = containerRef.current?.querySelector(".reveal-text") as HTMLElement;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(".word"), { 
        opacity: 1, 
        color: (i, target) => {
          const isHighlight = target.closest(".highlight") !== null;
          return isHighlight ? "#2563eb" : "#1a1a2e";
        }
      });
      return;
    }

    const split = new SplitText(el, {
      type: "words",
      wordsClass: "word",
    });

    gsap.set(split.words, {
      opacity: 0.25,
      color: "#9ca3af",
      scale: (i, target) => target.closest(".highlight") ? 0.96 : 1,
      transformOrigin: "center center"
    });

    let currentDelay = 0;
    const delays = split.words.map((word, i) => {
      const htmlWord = word as HTMLElement;
      const isHighlight = htmlWord.closest(".highlight") !== null;
      const prevIsHighlight = i > 0 && (split.words[i - 1] as HTMLElement).closest(".highlight") !== null;

      if (isHighlight && !prevIsHighlight) {
        currentDelay += 0.07; 
      } else {
        currentDelay += 0.03; 
      }

      htmlWord.dataset.finalColor = isHighlight ? "#2563eb" : "#1a1a2e";
      return currentDelay;
    });

    gsap.to(split.words, {
      opacity: 1,
      color: (i, target) => (target as HTMLElement).dataset.finalColor || "#1a1a2e",
      scale: 1,
      stagger: (i) => delays[i],
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    // Pills staggered fade-up
    gsap.fromTo(
      ".intro-pill",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 flex justify-center font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          .reveal-text .word {
            display: inline-block;
            margin: 0 0.12em;
            will-change: transform, opacity, color;
          }
        `
      }} />

      <div
        ref={containerRef}
        className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col items-center"
      >
        <div className="w-full max-w-[960px] mx-auto">
          <p className="intro-paragraph reveal-text text-[clamp(20px,2.2vw,34px)] font-normal text-[#1a1a2e] leading-[1.5] tracking-[-0.01em] font-heading mx-auto text-center">
            Paid media can buy reach. <span className="highlight text-[#2563eb] font-semibold">PR earns it</span>. When your brand gets written about, talked about, and remembered, it builds a <span className="highlight text-[#2563eb] font-semibold">layer of credibility</span> no ad budget can replicate. We handle the <span className="highlight text-[#2563eb] font-semibold">full scope of brand communications</span>, from media relations and press to live events and brand activations.
          </p>
        </div>

        <div 
          className="intro-pill-container mt-6 md:mt-8 flex flex-wrap gap-x-3 gap-y-3 md:gap-x-4 md:gap-y-3 w-full justify-center"
        >
          {pills.map((pill, idx) => (
            <div
              key={idx}
              className="intro-pill inline-flex items-center justify-center rounded-full border border-[#fce4bd] bg-[#fdf2df] px-6 py-2.5 md:px-7 md:py-3 text-center text-sm md:text-[15px] font-medium text-[#064ed3] shadow-xs transition-all duration-300 cursor-pointer hover:scale-[1.04] hover:bg-[#faeacb] hover:border-[#f9d79c] active:scale-[0.98]"
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
