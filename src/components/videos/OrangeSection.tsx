"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsCard from "../cards/StatCard";
import ArrowButton from "../buttons/ArrowButton";
import YellowButton from "../buttons/YellowButton";
import Link from "next/link";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger, useGSAP);

const OrangeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgOrbRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  // Pre-split content to ensure SSR safety and eliminate layout shifts (FOUC-free)
  const headlineLines = [
    "A New-Age Agency",
    "Built for Today's Brands"
  ];

  const introWords = [
    "We", "combine", "strategy,", "creativity,", "and", "technology",
    "to", "deliver", "marketing", "that", "performs", "not", "just", "looks", "good."
  ];

  const bodyParagraph1 = [
    "In today's fast-moving digital landscape, visibility alone isn't enough.",
    "Brands need clarity, consistency, and performance at every touchpoint."
  ];

  const bodyParagraph2 = [
    "We are a new-generation agency built to bridge that gap — bringing together",
    "strategic thinking, creative excellence, and data-driven execution under one",
    "roof. Every solution we design is rooted in understanding your business, your",
    "audience, and your growth ambitions."
  ];

  const bodyParagraph1Words = bodyParagraph1.join(" ").split(" ");
  const bodyParagraph2Words = bodyParagraph2.join(" ").split(" ");

  useGSAP(() => {
    const cleanups: (() => void)[] = [];
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;

    // --- 1. Background Orb Ambient Float Animation ---
    if (bgOrbRef.current) {
      gsap.to(bgOrbRef.current, {
        scale: 1.15,
        x: "+=25",
        y: "-=35",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Floating blobs ambient float
    const blobs = gsap.utils.toArray<HTMLElement>(".floating-blob");
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: () => gsap.utils.random(-30, 30),
        y: () => gsap.utils.random(-30, 30),
        scale: () => gsap.utils.random(0.9, 1.1),
        duration: () => gsap.utils.random(5, 8),
        delay: i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // --- 2. Interactive Cursor Glow / Orb Influence ---
    if (sectionRef.current && bgOrbRef.current) {
      const orbXTo = gsap.quickTo(bgOrbRef.current, "x", { duration: 1.2, ease: "power2.out" });
      const orbYTo = gsap.quickTo(bgOrbRef.current, "y", { duration: 1.2, ease: "power2.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Calculate offset from center to influence orb position
        const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.08;

        orbXTo(x);
        orbYTo(y);
      };

      sectionRef.current.addEventListener("mousemove", onMouseMove);
      cleanups.push(() => {
        sectionRef.current?.removeEventListener("mousemove", onMouseMove);
      });
    }

    // --- 3. Magnetic CTA Buttons Hover Effect ---
    if (sectionRef.current) {
      const magButtons = sectionRef.current.querySelectorAll<HTMLElement>(".magnetic-button");
      magButtons.forEach((btn: HTMLElement) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power2.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power2.out" });

        const onMouseMoveBtn = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.45;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.45;
          xTo(x);
          yTo(y);
        };

        const onMouseLeaveBtn = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", onMouseMoveBtn);
        btn.addEventListener("mouseleave", onMouseLeaveBtn);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMouseMoveBtn);
          btn.removeEventListener("mouseleave", onMouseLeaveBtn);
        });
      });
    }

    // ─── MOBILE: subtle entrance animations (no pin, no scrub) ──────────────
    if (isMobile) {
      const headlineLinesElements = gsap.utils.toArray<HTMLElement>(".headline-line");
      const introWordsElements = gsap.utils.toArray<HTMLElement>(".intro-word");
      const bodyParagraphs = gsap.utils.toArray<HTMLElement>(".body-paragraph");
      const cards = gsap.utils.toArray<HTMLElement>(".stats-card-3d");
      const statNumbers = gsap.utils.toArray<HTMLElement>(".stat-number");

      const countTargets = [
        { val: 100, suffix: "+" },
        { val: 500, suffix: "+" },
        { val: 3, suffix: "X" },
        { val: 5, suffix: "+" }
      ];

      // Set initial hidden states (same as desktop)
      gsap.set(headlineLinesElements, { y: 24, opacity: 0, filter: "blur(4px)" });
      gsap.set(introWordsElements, { y: 10, opacity: 0 });
      gsap.set(bodyParagraphs, { y: 16, opacity: 0 });
      gsap.set(closingRef.current, { opacity: 0, y: 12, filter: "blur(6px)" });
      gsap.set(".magnetic-button", { y: 20, opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 30, scale: 0.92 });

      // One-shot entrance triggered when the section enters the viewport
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // Headline lines fade + slide up
      mobileTl.to(headlineLinesElements, {
        y: 0, opacity: 1, filter: "blur(0px)", clearProps: "filter",
        duration: 0.75, stagger: 0.18, ease: "power2.out"
      }, 0);

      // Intro words stagger in softly
      mobileTl.to(introWordsElements, {
        y: 0, opacity: 1,
        duration: 0.55, stagger: 0.03, ease: "power2.out"
      }, 0.3);

      // Body paragraphs slide up one by one
      mobileTl.to(bodyParagraphs, {
        y: 0, opacity: 1,
        duration: 0.6, stagger: 0.15, ease: "power2.out"
      }, 0.6);

      // Closing statement fades in
      mobileTl.to(closingRef.current, {
        opacity: 1, y: 0, filter: "blur(0px)", clearProps: "filter",
        duration: 0.7, ease: "power3.out"
      }, 0.9);

      // CTA buttons slide up
      mobileTl.to(".magnetic-button", {
        y: 0, opacity: 1,
        duration: 0.55, stagger: 0.1, ease: "power3.out"
      }, 1.1);

      // Cards bloom in
      mobileTl.to(cards, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.65, stagger: 0.12, ease: "back.out(1.2)"
      }, 0.4);

      // Stat numbers count up once
      statNumbers.forEach((el, index) => {
        const target = countTargets[index];
        if (!target) return;
        const countObj = { val: 0 };
        mobileTl.to(countObj, {
          val: target.val,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            (el as HTMLElement).innerText = Math.floor(countObj.val) + target.suffix;
          },
          onComplete: () => {
            gsap.to(el, { color: "#FAC02E", duration: 0.3, ease: "power2.out" });
          }
        }, 0.55 + index * 0.1);
      });

      // Ambient card float (same as desktop)
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: "random(-6, 6)", y: "random(-8, 8)", rotate: "random(-1, 1)",
          duration: gsap.utils.random(4, 7),
          repeat: -1, yoyo: true, ease: "sine.inOut",
          delay: i * 0.25
        });
      });

      return () => { cleanups.forEach((fn) => fn()); };
    }
    // ─────────────────────────────────────────────────────────────────────────

    // --- 4. Master ScrollTrigger Timeline ---
    // --- 4a. Unpinned Scroll-Scrub Timeline for Text Reveals ---
    const textRevealTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        end: "+=150%",
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    // Selectors
    const headlineLinesElements = gsap.utils.toArray<HTMLElement>(".headline-line");
      const introWordsElements = gsap.utils.toArray<HTMLElement>(".intro-word");
      const importantWordsElements = gsap.utils.toArray<HTMLElement>(".important-word");
      const bodyWordsElements = gsap.utils.toArray<HTMLElement>(".body-word");
      const cards = gsap.utils.toArray<HTMLElement>(".stats-card-3d");
      const statNumbers = gsap.utils.toArray<HTMLElement>(".stat-number");

      // Initialize state
      gsap.set(headlineLinesElements, {
        y: 35,
        opacity: 0,
        filter: "blur(6px)",
        transformOrigin: "left bottom"
      });

      gsap.set(introWordsElements, {
        opacity: 0,
        filter: "blur(4px)"
      });

      gsap.set(bodyWordsElements, {
        opacity: 0,
        filter: "blur(4px)"
      });

      gsap.set(cards, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        x: (i) => [-50, 55, -60, 60][i] || 0,
        y: (i) => [60, -70, -50, 60][i] || 0,
        rotate: (i) => [-6, 6, -5, 5][i] || 0
      });

      // A. Title Lines Reveal (Scroll-Interactive, Unpinned)
      textRevealTl.to(headlineLinesElements, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        clearProps: "filter",
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, 0.0);

      // B. Intro Paragraph Word-by-Word Reveal ("writing effect", Unpinned)
      textRevealTl.to(introWordsElements, {
        opacity: 1,
        filter: "blur(0px)",
        clearProps: "filter",
        duration: 0.4,
        stagger: 0.05,
        ease: "power1.out"
      }, 0.3);

      // C. Important Words Highlight (Unpinned)
      textRevealTl.to(importantWordsElements, {
        color: "#FAC02E",
        textShadow: "0 0 12px rgba(250, 192, 46, 0.4)",
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      }, 0.7);

      // D. Body Copy Words Reveal ("writing effect", Unpinned)
      textRevealTl.to(bodyWordsElements, {
        opacity: 1,
        filter: "blur(0px)",
        clearProps: "filter",
        duration: 0.4,
        stagger: 0.02,
        ease: "power1.out"
      }, 0.9);

    // --- 4b. Pinned Master Timeline for Cards & Buttons ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    // E. Stats Cards Reveal Composition
    tl.to(cards, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.1)"
    }, 0.7);

    // F. Stat Numbers Count-Up
    const countTargets = [
      { val: 100, suffix: "+" },
      { val: 500, suffix: "+" },
      { val: 3, suffix: "X" },
      { val: 5, suffix: "+" }
    ];

    statNumbers.forEach((el, index) => {
      const target = countTargets[index];
      if (!target) return;
      const countObj = { val: 0 };

      tl.to(countObj, {
        val: target.val,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          el.innerText = Math.floor(countObj.val) + target.suffix;
        },
        onComplete: () => {
          gsap.fromTo(el,
            { scale: 1.18, color: "#FFFFFF" },
            { scale: 1, color: "#FAC02E", duration: 0.3, ease: "power2.out" }
          );
        }
      }, 0.8 + index * 0.1);
    });

    // G. Closing Statement Reveal
    tl.fromTo(closingRef.current,
      {
        opacity: 0,
        scale: 0.96,
        letterSpacing: "0.04em",
        filter: "blur(8px) brightness(0.9)"
      },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: "-0.01em",
        filter: "blur(0px) brightness(1.15)",
        clearProps: "filter",
        duration: 0.6,
        ease: "power4.out"
      },
      1.4
    );

    // H. CTA Buttons Slide up & scale
    tl.fromTo(".magnetic-button",
      {
        y: 35,
        rotate: 2,
        scale: 0.9,
        opacity: 0
      },
      {
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      },
      1.7
    );

    // I. Cards Ambient floating loops
    tl.add(() => {
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: "random(-6, 6)",
          y: "random(-10, 10)",
          rotate: "random(-1, 1)",
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.25
        });
      });
    }, 1.5);

    // Cleanup
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#C52A27] text-white py-24 z-20"
    >
      {/* Background System */}
      <div ref={bgRef} className="absolute -inset-y-12 inset-x-0 z-0 select-none pointer-events-none bg-[#C52A27]">
        {/* Background Image Layer (Original) */}
        <Image
          src="/images/About_Us_Bg.png"
          alt="Background"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Large Orb Behind Cards (Soft yellow glow, doesn't darken) */}
        <div
          ref={bgOrbRef}
          className="absolute w-[380px] h-[380px] md:w-[550px] md:h-[550px] rounded-full bg-[#FAC02E]/20 filter blur-[110px] top-[15%] right-[-12%] z-10 will-change-transform pointer-events-none"
        />

        {/* Background Video Layer (Original) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-10 top-1/2 -translate-y-1/2 right-0 w-[50%] h-[70%] object-cover opacity-30 mix-blend-multiply pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 80%)",
          }}
        >
          <source src="/assets/video_bg2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Structural Container */}
      <div
        ref={containerRef}
        className="relative z-30 max-w-[1350px] 2xl:max-w-[1600px] w-full px-6 sm:px-8 md:px-16 will-change-transform"
      >
        <div className="flex flex-col min-[1200px]:flex-row justify-between gap-12 md:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div ref={leftColRef} className="flex flex-col w-full min-[1200px]:w-[55%] will-change-[transform,opacity] items-center min-[1200px]:items-start text-center min-[1200px]:text-left">
            <div className="w-full flex flex-col items-center min-[1200px]:items-start">

              {/* Animated Line-split Headline */}
              <h1 className="text-[clamp(1.8rem,3.4vw,4.2rem)] font-medium tracking-tight leading-tight text-white mb-6 md:mb-8">
                {headlineLines.map((line, idx) => (
                  <span key={idx} className="block overflow-hidden py-[0.25em] -my-[0.25em]">
                    <span className="headline-line inline-block origin-bottom-left will-change-[transform,opacity,filter]">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Constrained Text Wrapper to match Title Width */}
              <div className="w-full max-w-[620px] flex flex-col items-center min-[1200px]:items-start">
                {/* Word-by-word Intro Paragraph */}
                <h2 className="text-[clamp(1.05rem,1.5vw,1.6rem)] mb-6 text-gray-200 font-thin font-sans leading-relaxed">
                  {introWords.map((word, idx) => {
                    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                    const important = ["strategy", "creativity", "technology", "marketing", "performs"].includes(cleanWord);
                    return (
                      <span
                        key={idx}
                        className={`intro-word inline-block mr-[0.22em] will-change-[transform,opacity,filter] ${important ? "font-normal text-white important-word" : "opacity-80"
                          }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </h2>

                {/* Word-by-word body paragraph 1 */}
                <p className="body-paragraph text-[clamp(0.85rem,1.05vw,1.02rem)] text-white/90 font-thin leading-relaxed mb-4 text-center min-[1200px]:text-left">
                  {bodyParagraph1Words.map((word, idx) => (
                    <span
                      key={idx}
                      className="body-word inline-block mr-[0.22em] will-change-[transform,opacity,filter]"
                    >
                      {word}
                    </span>
                  ))}
                </p>

                {/* Word-by-word body paragraph 2 */}
                <p className="body-paragraph text-[clamp(0.85rem,1.05vw,1.02rem)] text-white/90 font-thin leading-relaxed mb-8 text-center min-[1200px]:text-left">
                  {bodyParagraph2Words.map((word, idx) => (
                    <span
                      key={idx}
                      className="body-word inline-block mr-[0.22em] will-change-[transform,opacity,filter]"
                    >
                      {word}
                    </span>
                  ))}
                </p>

                {/* Emotional climax closing statement */}
                <div ref={closingRef} className="mb-8 opacity-0 will-change-[transform,opacity,filter] py-2">
                  <h2 className="text-[clamp(1.1rem,1.8vw,1.65rem)] bg-gradient-to-r from-white to-[#FAC02E] bg-clip-text text-transparent font-heading font-medium leading-tight">
                    We don&apos;t just deliver campaigns. <br /> We build momentum.
                  </h2>
                </div>
              </div>

              {/* Interactive CTA Buttons */}
              <div ref={buttonsContainerRef} className="orange-cta flex flex-wrap justify-center min-[1200px]:justify-start gap-4 sm:gap-6 items-center">
                <div className="magnetic-button p-4 -m-4">
                  <ArrowButton title="Read More" width="md" href="/about-us" />
                </div>
                <div className="magnetic-button p-4 -m-4">
                  <YellowButton title="Start a Project" variant="red" width="md" href="/start-project" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN (Stats Cards) */}
          <div
            ref={rightColRef}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mt-8 w-full sm:w-auto lg:w-auto lg:flex-shrink lg:justify-start min-[1200px]:-translate-x-4 min-[1400px]:-translate-x-8 will-change-[transform]"
            style={{ perspective: "1000px" }}
          >
            <div className="flex flex-col gap-3 sm:gap-4 items-center sm:items-stretch lg:flex-none">
              <StatsCard className="stats-card-3d" value="100+" title={`Brands Scaled\n Across Industries`} useGsapCount={true} />
              <StatsCard className="stats-card-3d" value="500+" title={`Successfully Executed Campaigns`} useGsapCount={true} />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-6 md:mt-8 items-center sm:items-stretch flex-1 lg:flex-none">
              <StatsCard className="stats-card-3d" value="3X" title={`Average Campaign Performance Uplift`} useGsapCount={true} />
              <StatsCard className="stats-card-3d" value="5+" title={`Key Market Presence`} useGsapCount={true} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrangeSection;