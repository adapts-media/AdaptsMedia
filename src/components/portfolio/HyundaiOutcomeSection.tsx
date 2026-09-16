"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface MetricItem {
  id: number;
  rawVal: number;
  suffix: string;
  label: string;
  dec: number;
}

const METRICS: MetricItem[] = [
  { id: 1, rawVal: 2.8, suffix: "M+", label: "Content Impressions Generated", dec: 1 },
  { id: 2, rawVal: 850, suffix: "K+", label: "Video Views Across Campaign Assets", dec: 0 },
  { id: 3, rawVal: 120, suffix: "K+", label: "Audience Engagements", dec: 0 },
  { id: 4, rawVal: 45, suffix: "K+", label: "Post Shares & Saves", dec: 0 },
  { id: 5, rawVal: 18, suffix: "K+", label: "New Social Followers Acquired", dec: 0 },
  { id: 6, rawVal: 35, suffix: "%", label: "Increase in Engagement Rate", dec: 0 },
  { id: 7, rawVal: 250, suffix: "K+", label: "Website Visits Driven from Social", dec: 0 },
  { id: 8, rawVal: 4.2, suffix: "M+", label: "Total Campaign Reach", dec: 1 },
];

export default function HyundaiOutcomeSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  const [displayValues, setDisplayValues] = useState<string[]>(
    METRICS.map(() => "0")
  );

  useGSAP(
    () => {
      if (!rootRef.current) return;

      // ── 1. Top Section Text Reveal (SplitText word-by-word) ──
      const el = textSectionRef.current?.querySelector(".reveal-text") as HTMLElement;
      let split: SplitText | null = null;
      if (el) {
        split = new SplitText(el, { type: "words", wordsClass: "word" });
        gsap.set(split.words, {
          opacity: 0.25,
          color: "#9ca3af",
          scale: (i, target) => ((target as HTMLElement).closest(".highlight") ? 0.96 : 1),
          transformOrigin: "center center",
        });

        let currentDelay = 0;
        const delays = split.words.map((word, i) => {
          const htmlWord = word as HTMLElement;
          const isHighlight = htmlWord.closest(".highlight") !== null;
          const prevIsHighlight =
            i > 0 && (split!.words[i - 1] as HTMLElement).closest(".highlight") !== null;

          if (isHighlight && !prevIsHighlight) {
            currentDelay += 0.07;
          } else {
            currentDelay += 0.03;
          }

          htmlWord.dataset.finalColor = isHighlight ? "#d61e1b" : "#1a1a2e";
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
      }

      // Pill fade-up
      gsap.fromTo(
        ".outcome-pill",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 2. Metrics Grid Entrance & Count Up ──
      if (statsGridRef.current) {
        const cards = statsGridRef.current.querySelectorAll(".metric-card");

        // Stagger entrance animation
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: "top 80%",
            },
          }
        );

        // Counter count-up animation
        METRICS.forEach((m, idx) => {
          const cardNode = cards[idx];
          if (!cardNode) return;

          const numObj = { val: 0 };
          gsap.to(numObj, {
            val: m.rawVal,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardNode,
              start: "top 85%",
            },
            onUpdate: () => {
              const formatted =
                m.dec > 0
                  ? numObj.val.toFixed(m.dec)
                  : Math.round(numObj.val).toString();
              setDisplayValues((prev) => {
                const copy = [...prev];
                copy[idx] = formatted;
                return copy;
              });
            },
          });
        });
      }

      // Ambient background glow loop
      gsap.to(".ambient-glow-1", {
        scale: 1.25,
        opacity: 0.4,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ambient-glow-2", {
        scale: 1.3,
        opacity: 0.35,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => {
        split?.revert();
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="w-full bg-white text-left overflow-hidden">
      {/* ── 1. TOP HERO TEXT SECTION (Standardized Typography & SplitText) ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .reveal-text .word {
            display: inline-block;
            margin: 0 0.12em;
            will-change: transform, opacity, color;
          }
        `,
        }}
      />

      <div ref={textSectionRef} className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20 flex flex-col items-center">
        <div className="mb-6 md:mb-8 flex justify-center w-full">
          <span className="outcome-pill inline-flex items-center justify-center rounded-full border border-[#f8d7d7] bg-[#fdf2f2] px-6 py-2.5 md:px-7 md:py-3 text-center text-sm md:text-[15px] font-medium text-[#d61e1b] shadow-xs transition-all duration-300">
            The Outcome
          </span>
        </div>

        <div className="w-full max-w-[960px] mx-auto mb-8 md:mb-10">
          <p className="intro-paragraph reveal-text text-[clamp(20px,2.2vw,34px)] font-normal text-[#1a1a2e] leading-[1.5] tracking-[-0.01em] font-heading mx-auto text-center">
            The campaign established a{" "}
            <span className="highlight text-[#d61e1b] font-semibold">
              stronger and more consistent social presence
            </span>{" "}
            while increasing audience awareness around the importance of{" "}
            <span className="highlight text-[#d61e1b] font-semibold">
              genuine automotive parts.
            </span>
          </p>
        </div>

        <p className="text-[#d61e1b] font-heading font-semibold text-xs md:text-sm tracking-[0.15em] uppercase text-center">
          Numbers that speak louder than promises:
        </p>
      </div>

      {/* ── 2. METRICS STORYTELLING GRID SECTION ── */}
      <div className="w-full bg-gradient-to-br from-[#001d52] via-[#002f85] to-[#064ed3] py-24 md:py-36 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="ambient-glow-1 absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#064ed3]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="ambient-glow-2 absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-[#004ca8]/50 rounded-full blur-[160px] pointer-events-none" />

        {/* Subtle Background Particle Grid Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Metrics Grid Container */}
        <div
          ref={statsGridRef}
          className="relative z-10 max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 md:gap-y-16"
        >
          {METRICS.map((m, idx) => {
            const displayVal = displayValues[idx] || "0";

            return (
              <div
                key={m.id}
                className="metric-card flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#FAC02E]/60 hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer shadow-xl hover:-translate-y-2"
              >
                <div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-white text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:text-[#FAC02E] transition-colors duration-300">
                      {displayVal}
                    </span>
                    <span className="text-[#FAC02E] text-3xl md:text-5xl font-heading font-medium drop-shadow-[0_5px_15px_rgba(250,192,46,0.3)]">
                      {m.suffix}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm md:text-base font-heading font-light leading-relaxed">
                    {m.label}
                  </p>
                </div>
                <div className="w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[#FAC02E] to-transparent transition-all duration-500 mt-6" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
