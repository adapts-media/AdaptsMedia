"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger and useGSAP hook
gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutOrangeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgOrbRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const compassContainerRef = useRef<HTMLDivElement>(null);
  const compassFloatRef = useRef<HTMLDivElement>(null);
  const compassVideoRef = useRef<HTMLVideoElement>(null);
  const compassCanvasRef = useRef<HTMLCanvasElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  // Draw the compass video onto a canvas frame-by-frame, stripping its baked-in
  // black background to real alpha transparency (luma-based chroma key). This
  // replaces relying on an SVG filter / mix-blend-mode applied to a <video>
  // element, both of which are unreliable on mobile WebKit — video decoding
  // there often bypasses the normal CSS compositing pipeline. Manual canvas
  // pixel manipulation has no such dependency and works identically everywhere.
  useEffect(() => {
    const video = compassVideoRef.current;
    const canvas = compassCanvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const SIZE = 500;
    canvas.width = SIZE;
    canvas.height = SIZE;

    let rafId: number;
    const draw = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, SIZE, SIZE);
        const frame = ctx.getImageData(0, 0, SIZE, SIZE);
        const data = frame.data;
        for (let i = 0; i < data.length; i += 4) {
          const luma = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i + 3] = Math.max(0, Math.min(255, (luma - 12) * 2.4));
        }
        ctx.putImageData(frame, 0, 0);
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Pre-split content to ensure SSR safety and eliminate layout shifts (FOUC-free)
  const headlineLines = [
    "More Than an Agency.",
    "A Growth Partner."
  ];

  const introWords = [
    "In", "a", "world", "where", "attention", "is", "limited", "and", "competition", "is", "constant,",
    "brands", "need", "more", "than", "just", "marketing,", "they", "need", "direction."
  ];

  const transitionWords = ["That's", "where", "we", "come", "in."];

  const bodyParagraph1 = [
    "We are a team of strategists, creatives, and performance specialists working",
    "together to build brands that don't just show up, but stand out."
  ];

  const bodyParagraph2 = [
    "Every project we take on starts with understanding your business, your audience, and your",
    "ambition — because real growth begins with clarity."
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

    // --- 2. Interactive Cursor Glow / Orb Influence ---
    if (sectionRef.current && bgOrbRef.current) {
      const orbXTo = gsap.quickTo(bgOrbRef.current, "x", { duration: 1.2, ease: "power2.out" });
      const orbYTo = gsap.quickTo(bgOrbRef.current, "y", { duration: 1.2, ease: "power2.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;

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

    // --- 3. Interactive 3D Mouse Parallax on Compass ---
    if (sectionRef.current && compassContainerRef.current && !isMobile) {
      const onMouseMoveCompass = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = (e.clientX - rect.left - rect.width / 2) * 0.025;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.025;

        gsap.to(compassContainerRef.current, {
          rotateY: x,
          rotateX: -y,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      sectionRef.current.addEventListener("mousemove", onMouseMoveCompass);
      cleanups.push(() => {
        sectionRef.current?.removeEventListener("mousemove", onMouseMoveCompass);
      });
    }

    // ─── MOBILE: subtle entrance animations (no pin, no scrub) ──────────────
    if (isMobile) {
      const headlineLinesElements = gsap.utils.toArray<HTMLElement>(".headline-line");
      const introWordsElements = gsap.utils.toArray<HTMLElement>(".intro-word");
      const bodyParagraphs = gsap.utils.toArray<HTMLElement>(".body-paragraph");

      // Set initial hidden states
      gsap.set(headlineLinesElements, { y: 24, opacity: 0, filter: "blur(4px)" });
      gsap.set(introWordsElements, { y: 10, opacity: 0 });
      gsap.set(bodyParagraphs, { y: 16, opacity: 0 });
      gsap.set(closingRef.current, { opacity: 0, y: 12, filter: "blur(6px)" });
      if (compassContainerRef.current) {
        gsap.set(compassContainerRef.current, { opacity: 0, scale: 0.85, filter: "blur(8px)" });
      }

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

      // Body paragraphs slide up
      mobileTl.to(bodyParagraphs, {
        y: 0, opacity: 1,
        duration: 0.6, stagger: 0.15, ease: "power2.out"
      }, 0.6);

      // Compass blooms in
      if (compassContainerRef.current) {
        mobileTl.to(compassContainerRef.current, {
          opacity: 1, scale: 1, filter: "blur(0px)", clearProps: "filter",
          duration: 0.8, ease: "back.out(1.2)"
        }, 0.4);
      }

      // Closing statement fades in
      mobileTl.to(closingRef.current, {
        opacity: 1, y: 0, filter: "blur(0px)", clearProps: "filter",
        duration: 0.7, ease: "power3.out"
      }, 0.9);

      // Ambient compass float
      if (compassFloatRef.current) {
        gsap.to(compassFloatRef.current, {
          y: "-=12",
          rotate: "random(-1.5, 1.5)",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      return () => { cleanups.forEach((fn) => fn()); };
    }
    // ─────────────────────────────────────────────────────────────────────────

    // --- 4. Master Desktop Timelines ---

    // 4a. Unpinned Scroll-Scrub Timeline for Text & Compass Entrance ---
    const textRevealTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        end: "+=150%",
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    const headlineLinesElements = gsap.utils.toArray<HTMLElement>(".headline-line");
    const introWordsElements = gsap.utils.toArray<HTMLElement>(".intro-word");
    const importantWordsElements = gsap.utils.toArray<HTMLElement>(".important-word");
    const bodyWordsElements = gsap.utils.toArray<HTMLElement>(".body-word");

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

    if (compassContainerRef.current) {
      gsap.set(compassContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(12px)",
        x: 45,
        rotate: 6
      });
    }

    // A. Title Lines Reveal
    textRevealTl.to(headlineLinesElements, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      clearProps: "filter",
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    }, 0.0);

    // B. Intro Paragraph Word-by-Word Reveal ("writing effect")
    textRevealTl.to(introWordsElements, {
      opacity: 1,
      filter: "blur(0px)",
      clearProps: "filter",
      duration: 0.4,
      stagger: 0.04,
      ease: "power1.out"
    }, 0.3);

    // C. Important Words Highlight
    textRevealTl.to(importantWordsElements, {
      color: "#FAC02E",
      textShadow: "0 0 14px rgba(250, 192, 46, 0.45)",
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out"
    }, 0.65);

    // D. Body Copy Words Reveal ("writing effect")
    textRevealTl.to(bodyWordsElements, {
      opacity: 1,
      filter: "blur(0px)",
      clearProps: "filter",
      duration: 0.4,
      stagger: 0.02,
      ease: "power1.out"
    }, 0.85);

    // --- 4b. Pinned Master Timeline for Compass Climax & Section Pinning ---
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

    // E. Compass Entrance into View
    if (compassContainerRef.current) {
      tl.to(compassContainerRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        x: 0,
        rotate: 0,
        duration: 0.9,
        ease: "back.out(1.15)"
      }, 0.4);
    }

    // F. Emotional climax closing statement
    tl.fromTo(closingRef.current,
      {
        opacity: 0,
        scale: 0.95,
        letterSpacing: "0.04em",
        filter: "blur(8px) brightness(0.9)"
      },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: "-0.01em",
        filter: "blur(0px) brightness(1.15)",
        clearProps: "filter",
        duration: 0.7,
        ease: "power4.out"
      },
      0.9
    );

    // G. Ambient Continuous Floating Loop on Compass
    if (compassFloatRef.current) {
      gsap.to(compassFloatRef.current, {
        y: "-=18",
        rotate: "random(-2, 2)",
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

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
        {/* Background Image Layer */}
        <Image
          src="/images/About_Us_Bg.png"
          alt="Background"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Soft Gold Ambient Glow Orb behind the compass */}
        <div
          ref={bgOrbRef}
          className="absolute w-[380px] h-[380px] md:w-[550px] md:h-[550px] rounded-full bg-[#FAC02E]/20 filter blur-[110px] top-[15%] right-[-5%] z-10 will-change-transform pointer-events-none"
        />

        {/* Ambient Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          suppressHydrationWarning
          className="absolute z-10 top-1/2 -translate-y-1/2 right-0 w-[50%] h-[70%] object-cover opacity-25 mix-blend-multiply pointer-events-none"
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
        <div className="flex flex-col min-[1200px]:flex-row justify-between gap-10 md:gap-16 items-center">

          {/* LEFT COLUMN: Text Content */}
          <div
            ref={leftColRef}
            className="flex flex-col w-full min-[1200px]:w-[58%] will-change-[transform,opacity] items-center min-[1200px]:items-start text-center min-[1200px]:text-left"
          >
            {/* Animated Line-split Headline */}
            <h1 className="text-[clamp(1.8rem,3.4vw,4.2rem)] font-medium tracking-tight leading-tight text-white mb-6 md:mb-8">
              {headlineLines.map((line, idx) => (
                <span key={idx} className="block overflow-hidden py-[0.2em] -my-[0.2em]">
                  <span className="headline-line inline-block origin-bottom-left will-change-[transform,opacity,filter]">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {/* Constrained Text Wrapper */}
            <div className="w-full max-w-[650px] flex flex-col items-center min-[1200px]:items-start">
              {/* Word-by-word Intro Paragraph */}
              <h2 className="text-[clamp(1.05rem,1.5vw,1.6rem)] mb-6 text-gray-200 font-thin font-sans leading-relaxed">
                {introWords.map((word, idx) => {
                  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                  const important = ["attention", "marketing", "direction"].includes(cleanWord);
                  return (
                    <span
                      key={idx}
                      className={`intro-word inline-block mr-[0.22em] will-change-[transform,opacity,filter] ${
                        important ? "font-normal text-white important-word" : "opacity-80"
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </h2>

              {/* Transition Paragraph */}
              <p className="body-paragraph text-[clamp(0.85rem,1.05vw,1.02rem)] text-white/95 font-medium leading-relaxed mb-4 text-center min-[1200px]:text-left">
                {transitionWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="body-word inline-block mr-[0.22em] will-change-[transform,opacity,filter]"
                  >
                    {word}
                  </span>
                ))}
              </p>

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
                {bodyParagraph2Words.map((word, idx) => {
                  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                  const important = ["clarity", "growth"].includes(cleanWord);
                  return (
                    <span
                      key={idx}
                      className={`body-word inline-block mr-[0.22em] will-change-[transform,opacity,filter] ${
                        important ? "font-normal text-white important-word" : ""
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>

              {/* Emotional Climax Closing Statement */}
              <div ref={closingRef} className="mb-4 opacity-0 will-change-[transform,opacity,filter] py-2">
                <h2 className="text-[clamp(1.1rem,1.8vw,1.65rem)] bg-gradient-to-r from-white via-white to-[#FAC02E] bg-clip-text text-transparent font-heading font-medium leading-tight">
                  From brand creation to performance marketing <br />
                  We design solutions that are intentional, <br />
                  measurable, and built to scale.
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive 3D Compass */}
          <div
            ref={rightColRef}
            className="flex justify-center items-center -mt-8 min-[1200px]:mt-0 w-full min-[1200px]:w-[42%] will-change-[transform]"
            style={{ perspective: "1200px" }}
          >
            <div
              ref={compassContainerRef}
              className="relative max-w-[550px] md:max-w-[650px] w-full aspect-square flex items-center justify-center will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.55))",
              }}
            >
              {/* Compass Floating Layer */}
              <div
                ref={compassFloatRef}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
              >
                {/* Warm ambient glow behind the compass */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(0,0,0,0.45) 30%, transparent 68%)",
                    filter: "blur(40px)",
                    transform: "scale(0.65) translateY(8%)",
                  }}
                />

                {/* Hidden source video — decoded frames are drawn onto the canvas below */}
                <video
                  ref={compassVideoRef}
                  src="/assets/moving compass_1.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  suppressHydrationWarning
                  aria-hidden="true"
                  className="absolute w-px h-px opacity-0 pointer-events-none"
                />

                {/* Video Compass (chroma-keyed onto canvas — see effect above) */}
                <canvas
                  ref={compassCanvasRef}
                  className="w-full h-full object-contain scale-140 md:scale-180 pointer-events-none"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutOrangeSection;