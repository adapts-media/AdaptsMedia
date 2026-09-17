"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger and useGSAP hook
gsap.registerPlugin(ScrollTrigger, useGSAP);

const BlueSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const introParaRef = useRef<HTMLParagraphElement>(null);
  const bulbRef = useRef<HTMLDivElement>(null);
  const bulbFloatRef = useRef<HTMLDivElement>(null);
  
  const q1ContainerRef = useRef<HTMLDivElement>(null);
  const q2ContainerRef = useRef<HTMLDivElement>(null);
  const q3ContainerRef = useRef<HTMLDivElement>(null);
  
  const bottomBlockRef = useRef<HTMLDivElement>(null);

  // Helper to split text into SSR-safe and layout-shift-free animatable spans
  const renderSplitWords = (text: string, className: string) => {
    return text.split(" ").map((word, idx) => (
      <span key={idx} className="inline-block overflow-hidden py-[0.1em] mr-[0.22em] select-none pointer-events-none">
        <span className={`${className} inline-block origin-bottom-left will-change-[transform,filter]`}>
          {word}
        </span>
      </span>
    ));
  };

  useGSAP(() => {
    // --- 1. Float Animation for Bulb ---
    if (bulbFloatRef.current) {
      gsap.to(bulbFloatRef.current, {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // --- 2. Master ScrollTrigger Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350%", // Long enough to ensure a luxurious, heavy feel
        pin: true,
        scrub: 1.2, // Premium lag on scroll
        invalidateOnRefresh: true,
      }
    });

    // Query all word spans inside the containers
    const q1Words = gsap.utils.toArray<HTMLElement>(".q1-word");
    const q2Words = gsap.utils.toArray<HTMLElement>(".q2-word");
    const q3Words = gsap.utils.toArray<HTMLElement>(".q3-word");

    // Initialize CSS properties with GSAP to prevent FOUC / styling mismatch
    gsap.set([q2ContainerRef.current, q3ContainerRef.current], {
      opacity: 0,
      pointerEvents: "none"
    });

    gsap.set(q1Words, {
      yPercent: 105,
      filter: "blur(6px)",
      rotate: 2.5
    });
    gsap.set(q2Words, {
      yPercent: 105,
      filter: "blur(6px)",
      rotate: 2.5
    });
    gsap.set(q3Words, {
      yPercent: 105,
      filter: "blur(6px)",
      rotate: 2.5
    });

    // --- Timeline Choreography ---

    // A. Background shifting brightness (2-3% brightness overlay modulation)
    tl.to(bgOverlayRef.current, {
      opacity: 0.08,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0)
    .to(bgOverlayRef.current, {
      opacity: 0.03,
      duration: 1.5,
      ease: "power2.inOut"
    }, 1.5);

    // B. Subtle parallax & opacity on top intro paragraph (15-20px shift)
    tl.to(introParaRef.current, {
      y: -18,
      opacity: 0.75,
      duration: 3.5,
      ease: "none"
    }, 0);

    // C. Subtle parallax on lightbulb
    if (bulbRef.current) {
      tl.to(bulbRef.current, {
        y: -25,
        duration: 3.5,
        ease: "none"
      }, 0);
    }

    // --- Step 1: Question 1 Word-by-Word Stagger Reveal ---
    tl.to(q1Words, {
      yPercent: 0,
      filter: "blur(0px)",
      rotate: 0,
      duration: 1.0,
      ease: "power4.out",
      stagger: 0.06
    }, 0.1);

    // --- Step 2: Transition Q1 out, Q2 in (Overlapping by ~25%) ---
    tl.to(q1ContainerRef.current, {
      scale: 0.92,
      y: -35,
      opacity: 0.2,
      duration: 1.2,
      ease: "power4.inOut"
    }, 1.1);

    tl.to(q2ContainerRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.2
    }, 1.1);

    tl.to(q2Words, {
      yPercent: 0,
      filter: "blur(0px)",
      rotate: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.06
    }, 1.25);

    // --- Step 3: Transition Q2 out, Q3 in ---
    tl.to(q2ContainerRef.current, {
      scale: 0.92,
      y: -35,
      opacity: 0.2,
      duration: 1.2,
      ease: "power4.inOut"
    }, 2.2);

    tl.to(q3ContainerRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.2
    }, 2.2);

    tl.to(q3Words, {
      yPercent: 0,
      filter: "blur(0px)",
      rotate: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.06
    }, 2.35);

    // --- Step 4: Scale Q3 and animate letter spacing ---
    tl.fromTo(q3ContainerRef.current,
      { scale: 0.96, letterSpacing: "-0.015em" },
      { scale: 1.0, letterSpacing: "0.015em", duration: 1.1, ease: "power4.out" },
      2.35
    );

    // D. Fade in bottom execution detail paragraphs at the end of the sequence
    if (bottomBlockRef.current) {
      tl.fromTo(bottomBlockRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        2.9
      );
    }

    // Hold the end state briefly before releasing scroll lock
    tl.to({}, { duration: 0.6 });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[700px] bg-[#064ED3] text-white flex flex-col items-center justify-center font-sans overflow-hidden z-20"
    >
      {/* Background System */}
      <div ref={bgRef} className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] to-[#0039CC]" />
        <Image
          src="/images/Services_Bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute pointer-events-none object-cover opacity-60 mix-blend-overlay"
        />
      </div>

      {/* Dynamic Brightness Overlay */}
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 bg-black opacity-0 pointer-events-none z-10 will-change-[opacity]"
      />

      {/* Main Structural Container */}
      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-6 sm:px-8 md:px-16 relative z-30 flex flex-col justify-between h-[85vh] min-h-[600px]">
        
        {/* Top Section: Header & Small Paragraph & Lightbulb */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-start w-full gap-6 md:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-medium leading-none tracking-tight text-white mb-8 md:mb-12">
              Strategy First. <br /> Always.
            </h2>
            <p
              ref={introParaRef}
              className="text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed max-w-xl will-change-[transform,opacity]"
            >
              End-to-end solutions built to help brands grow, connect, and perform across every touchpoint. No guesswork. No wasted effort.
Just focused, effective execution.
            </p>
          </div>

          {/* Floating Chroma-Key Bulb */}
          <div ref={bulbRef} className="pointer-events-none z-10 flex justify-start md:justify-end w-full md:w-auto mt-2 md:mt-0 will-change-[transform]">
            <div ref={bulbFloatRef} className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-48 md:w-48 flex items-center justify-center will-change-[transform]">
              {/* SVG Filter to remove black background (Chroma Key) with smooth blending */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <filter id="remove-black-bulb" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" 
                      values="1 0 0 0 0
                              0 1 0 0 0
                              0 0 1 0 0
                              1.5 1.5 1.5 0 -0.1" />
                  </filter>
                </defs>
              </svg>

              {/* <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain pointer-events-none"
                style={{
                  filter: "url(#remove-black-bulb)",
                }}
              >
                <source src="/assets/Light Bulb 1_1.webm" type="video/webm" />
                <source src="/assets/bulbvideo.mp4" type="video/mp4" />
              </video> */}
            </div>
          </div>
        </div>

        {/* Middle Section: Overlay Question Grid (Layout Shift Free) */}
        <div className="relative w-full py-8 md:py-16 flex items-center justify-start">
          <div className="grid grid-cols-1 grid-rows-1 w-full relative">
            {/* Question 1 */}
            <div
              ref={q1ContainerRef}
              className="w-full text-left will-change-[transform,opacity] select-none"
              style={{ gridArea: "1 / 1 / 2 / 2" }}
            >
              <h3 className="text-3xl sm:text-5xl md:text-[62px] lg:text-[72px] font-heading font-medium leading-[1.1] tracking-tight text-white">
                {renderSplitWords("What does your brand stand for?", "q1-word")}
              </h3>
            </div>

            {/* Question 2 */}
            <div
              ref={q2ContainerRef}
              className="w-full text-left will-change-[transform,opacity] select-none"
              style={{ gridArea: "1 / 1 / 2 / 2" }}
            >
              <h3 className="text-3xl sm:text-5xl md:text-[60px] lg:text-[70px] font-heading font-medium leading-[1.1] tracking-tight text-white">
                {renderSplitWords("Where is the real opportunity?", "q2-word")}
              </h3>
            </div>

            {/* Question 3 */}
            <div
              ref={q3ContainerRef}
              className="w-full text-left will-change-[transform,opacity] select-none"
              style={{ gridArea: "1 / 1 / 2 / 2" }}
            >
              <h3 className="text-3xl sm:text-5xl md:text-[58px] lg:text-[68px] font-heading font-medium leading-[1.1] text-white">
                {renderSplitWords("What will actually move the needle?", "q3-word")}
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom Section: Explanatory Paragraph Block */}
        {/* <div className="w-full pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div
            ref={bottomBlockRef}
            className="max-w-3xl w-full flex flex-col sm:flex-row gap-4 sm:gap-12 md:gap-20 opacity-0 will-change-[transform,opacity]"
          >
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xs">
              End-to-end solutions built to help brands grow, connect, and perform across every touchpoint.
            </p>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xs">
              No guesswork. No wasted effort. <br className="hidden sm:block" /> Just focused, effective execution.
            </p>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default BlueSection;