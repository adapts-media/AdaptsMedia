"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import ArrowButton from "../buttons/ArrowButton";
import { Project as SharedProject, allCaseStudies } from "@/data/portfolioData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger and useGSAP hooks
gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Project = SharedProject;
const projects: Project[] = allCaseStudies;

const BookmarkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const FlowerLogo = () => (
  <svg width="70" height="80" className="md:w-[90px] md:h-[104px]" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1.5" />
    <g transform="translate(26,26)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse key={i} cx="0" cy="-9" rx="4" ry="8" fill="white" transform={`rotate(${angle})`} opacity="0.9" />
      ))}
      <circle cx="0" cy="0" r="3.5" fill="white" />
    </g>
  </svg>
);

const descriptions: Record<number, string> = {
  1: "Engineering confidence and authentic representation for a global automotive leader.",
  2: "Crafting a premium Vietnamese coffee identity driven by creative AI storytelling.",
  3: "Elevating luxury wellness spaces with clean aesthetics and human-centered design.",
  4: "Powering secure, future-ready national payment systems across the Emirates.",
};

interface PortfolioShowcaseProps {
  projects?: Project[];
  variant?: "carousel" | "list";
}

const defaultProjects: Project[] = projects;

export default function PortfolioShowcase({ projects: externalProjects, variant = "carousel" }: PortfolioShowcaseProps) {
  const activeProjects = externalProjects || defaultProjects;
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const isList = variant === "list";

  // Check touch device capabilities to show correct cursor text directly in DOM and refresh ScrollTrigger dimensions
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (cursorRef.current) {
      cursorRef.current.textContent = isTouch ? "Drag" : "Explore";
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Card Mouse Parallax shift on hover
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2); // -1 to 1

    gsap.to(card.querySelector(".parallax-image"), { x: x * 15, y: y * 15, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    gsap.to(card.querySelector(".parallax-logo"), { x: x * 10, y: y * 10, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    gsap.to(card.querySelector(".parallax-title"), { x: x * 8, y: y * 8, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    gsap.to(card.querySelector(".parallax-tags"), { x: x * 5, y: y * 5, duration: 0.6, ease: "power2.out", overwrite: "auto" });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector(".parallax-image"), { x: 0, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
    gsap.to(card.querySelector(".parallax-logo"), { x: 0, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
    gsap.to(card.querySelector(".parallax-title"), { x: 0, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
    gsap.to(card.querySelector(".parallax-tags"), { x: 0, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
  };

  // Cursor morph handlers on CTA hover
  const handleCtaMouseEnter = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0.6,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(255, 255, 255, 0.6)",
        duration: 0.3
      });
    }
  };

  const handleCtaMouseLeave = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        duration: 0.3
      });
    }
  };

  useGSAP(() => {
    // --- LIST MODE: Standard vertical list scroll trigger (retained for backward compatibility) ---
    if (isList) {
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-list-card");
      cards.forEach((card) => {
        const bgImage = card.querySelector(".portfolio-bg-image");
        if (bgImage) {
          gsap.fromTo(bgImage,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              }
            }
          );
        }
      });
      return;
    }

    // --- CAROUSEL MODE: Awwwards-quality horizontal pinned scroll trigger ---
    if (!galleryRef.current || !sectionRef.current) return;

    // We translate the track by track width minus viewport width.
    const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
    const totalCards = cards.length;

    // We translate the track by track width minus viewport width to center cards dynamically.
    const getCardCenterX = (index: number) => {
      const cardEl = cards[index];
      if (!cardEl) return 0;
      return (window.innerWidth - cardEl.offsetWidth) / 2 - cardEl.offsetLeft;
    };

    // Master ScrollTrigger timeline managing pinned movement and card reveals sequentially
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${totalCards * window.innerHeight * 1.5}`, // Pinned scroll depth
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    const colors = [
      "#0b121c", // Hyundai Mobis: steel blue
      "#20150d", // The Caphe Vietnam: warm coffee brown
      "#240f1a", // The Bliss: wellness violet
      "#0a1c1d"  // Jaywan: national teal
    ];

    // Initialize all cards before adding animations to the master timeline (hidden & blurred by default)
    cards.forEach((card, i) => {
      const logo = card.querySelector(".parallax-logo");
      const titleLines = card.querySelectorAll(".title-line");
      const descWords = card.querySelectorAll(".desc-word");
      const tags = card.querySelectorAll(".tag-item");
      const cta = card.querySelector(".parallax-cta");
      const image = card.querySelector(".parallax-image");

      gsap.set(card, { scale: 0.92, opacity: 0.6, filter: "blur(6px)" });
      if (logo) gsap.set(logo, { y: 20, opacity: 0 });
      if (titleLines.length > 0) gsap.set(titleLines, { yPercent: 100, opacity: 0 });
      if (descWords.length > 0) gsap.set(descWords, { y: 12, opacity: 0 });
      if (tags.length > 0) gsap.set(tags, { y: 10, opacity: 0 });
      if (cta) gsap.set(cta, { y: 20, opacity: 0 });

      // Scale up image wrapper element to ensure ample padding for parallax motion
      if (image) {
        gsap.set(image, { scale: 1.2, xPercent: i === 0 ? 0 : -10 });
      }
    });

    // Set initial gallery horizontal offset centering the first card
    gsap.set(galleryRef.current, { x: () => getCardCenterX(0) });

    // Animate progress bar smoothly over the entire master timeline duration (2 * N - 1 units)
    if (progressBarRef.current) {
      masterTl.to(progressBarRef.current, {
        width: "100%",
        ease: "none",
        duration: totalCards * 2 - 1
      }, 0);
    }

    // Build the stepped sequence: [Focus Card i] -> [Translate to Card i+1 & Unfocus Card i]
    for (let i = 0; i < totalCards; i++) {
      const card = cards[i];
      const image = card.querySelector(".parallax-image");
      const logo = card.querySelector(".parallax-logo");
      const titleLines = card.querySelectorAll(".title-line");
      const descWords = card.querySelectorAll(".desc-word");
      const tags = card.querySelectorAll(".tag-item");
      const cta = card.querySelector(".parallax-cta");

      const focusStart = i * 2;
      const focusEnd = focusStart + 1;

      // 1. FOCUS STATE (Gallery movement is locked, internal elements reveal)
      masterTl.to(card, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 1.0
      }, focusStart);

      if (logo) masterTl.to(logo, { y: 0, opacity: 1, ease: "power2.out", duration: 0.4 }, focusStart + 0.2);
      if (titleLines.length > 0) masterTl.to(titleLines, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.5, stagger: 0.1 }, focusStart + 0.3);
      if (descWords.length > 0) masterTl.to(descWords, { y: 0, opacity: 1, ease: "power2.out", duration: 0.4, stagger: 0.3 / descWords.length }, focusStart + 0.5);
      if (tags.length > 0) masterTl.to(tags, { y: 0, opacity: 1, ease: "power2.out", duration: 0.4, stagger: 0.2 / tags.length }, focusStart + 0.6);
      if (cta) masterTl.to(cta, { y: 0, opacity: 1, ease: "power2.out", duration: 0.4 }, focusStart + 0.7);

      // Background color transition triggers at the start of each focus phase
      masterTl.to(sectionRef.current, {
        backgroundColor: colors[i] || "#0b121c",
        ease: "power2.out",
        duration: 0.6
      }, focusStart);

      // 2. TRAVEL STATE (Gallery translates, current card goes back to inactive state)
      if (i < totalCards - 1) {
        // We evaluate getCardCenterX dynamically on window refresh to stay responsive
        masterTl.to(galleryRef.current, {
          x: () => getCardCenterX(i + 1),
          ease: "power2.inOut",
          duration: 1.0
        }, focusEnd);

        masterTl.to(card, {
          scale: 0.92,
          opacity: 0.6,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 1.0
        }, focusEnd);

        if (logo) masterTl.to(logo, { y: 20, opacity: 0, ease: "power2.in", duration: 0.4 }, focusEnd + 0.4);
        if (titleLines.length > 0) masterTl.to(titleLines, { yPercent: 100, opacity: 0, ease: "power2.in", duration: 0.5, stagger: 0.1 }, focusEnd + 0.2);
        if (descWords.length > 0) masterTl.to(descWords, { y: 12, opacity: 0, ease: "power2.in", duration: 0.4, stagger: 0.3 / descWords.length }, focusEnd + 0.1);
        if (tags.length > 0) masterTl.to(tags, { y: 10, opacity: 0, ease: "power2.in", duration: 0.4, stagger: 0.2 / tags.length }, focusEnd + 0.1);
        if (cta) masterTl.to(cta, { y: 20, opacity: 0, ease: "power2.in", duration: 0.4 }, focusEnd);

        // Slide the outgoing image right (0 to 10%)
        if (image) {
          masterTl.fromTo(image,
            { xPercent: 0, scale: 1.2 },
            {
              xPercent: 10,
              scale: 1.2,
              ease: "power2.inOut",
              duration: 1.0
            },
            focusEnd
          );
        }

        // Slide the incoming image from left to center (-10% to 0)
        const nextCard = cards[i + 1];
        const nextImage = nextCard?.querySelector(".parallax-image");
        if (nextImage) {
          masterTl.fromTo(nextImage,
            { xPercent: -10, scale: 1.2 },
            {
              xPercent: 0,
              scale: 1.2,
              ease: "power2.inOut",
              duration: 1.0
            },
            focusEnd
          );
        }
      }
    }

    // Custom cursor movement tracking
    if (cursorRef.current && sectionRef.current) {
      // Explicitly initialize cursor as hidden
      gsap.set(cursorRef.current, { opacity: 0, scale: 0.5 });

      const cursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.25, ease: "power3.out" });
      const cursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.25, ease: "power3.out" });

      const updateCursorPos = (e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        cursorX(e.clientX - rect.left - 56);
        cursorY(e.clientY - rect.top - 56);
      };

      const onCardMouseEnter = (e: MouseEvent) => {
        if (!sectionRef.current || !cursorRef.current) return;
        
        // Immediately update position before animating opacity to prevent top-left (0,0) jump
        const rect = sectionRef.current.getBoundingClientRect();
        if (e.clientX && e.clientY) {
          gsap.set(cursorRef.current, {
            x: e.clientX - rect.left - 56,
            y: e.clientY - rect.top - 56,
          });
        }

        gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.25 });
        document.querySelectorAll(".cursor-dot, .cursor-ring").forEach((el) => {
          el.classList.add("cursor-hidden");
        });
      };

      const onCardMouseLeave = () => {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.25 });
        }
        document.querySelectorAll(".cursor-dot, .cursor-ring").forEach((el) => {
          el.classList.remove("cursor-hidden");
        });
      };

      const onSectionMouseMove = (e: MouseEvent) => {
        updateCursorPos(e);
      };

      const onSectionMouseLeave = () => {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.25 });
        }
        document.querySelectorAll(".cursor-dot, .cursor-ring").forEach((el) => {
          el.classList.remove("cursor-hidden");
        });
      };

      sectionRef.current.addEventListener("mousemove", onSectionMouseMove);
      sectionRef.current.addEventListener("mouseleave", onSectionMouseLeave);

      const cards = sectionRef.current.querySelectorAll(".portfolio-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", onCardMouseEnter as EventListener);
        card.addEventListener("mouseleave", onCardMouseLeave);
      });

      return () => {
        sectionRef.current?.removeEventListener("mousemove", onSectionMouseMove);
        sectionRef.current?.removeEventListener("mouseleave", onSectionMouseLeave);
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", onCardMouseEnter as EventListener);
          card.removeEventListener("mouseleave", onCardMouseLeave);
        });
        document.querySelectorAll(".cursor-dot, .cursor-ring").forEach((el) => {
          el.classList.remove("cursor-hidden");
        });
      };
    }
  }, { scope: sectionRef, dependencies: [activeProjects, isList] });

  /* ── Shared Card Image Renderer (Backward compatibility) ── */
  const renderCard = (p: Project, i: number) => (
    <div className="portfolio-bg-wrapper absolute inset-0 overflow-hidden">
      <Image
        src={p.bgImage}
        alt={p.brand}
        fill
        priority={i === 0}
        sizes="100vw"
        quality={85}
        className="portfolio-bg-image object-cover"
      />
    </div>
  );

  const renderOverlays = () => (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,16,0.9)_0%,rgba(10,12,16,0.4)_40%,transparent_80%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,12,16,0.6)_0%,transparent_50%)]" />
    </>
  );

  const renderListContent = (p: Project) => (
    <div className="relative h-full w-full px-8 md:px-16 lg:px-20 pointer-events-none">
      <div className="absolute bottom-0 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 pb-16 md:pb-[60px] z-[4] flex flex-col gap-6 md:gap-4 pointer-events-auto">
        <div className="flex flex-col items-start w-full">
          <div className="portfolio-logo w-full flex justify-start md:justify-start">
            {p.logoSrc ? (
              <div className="relative w-40 h-16">
                <Image src={p.logoSrc} alt={p.brand} fill sizes="160px" className="object-contain object-left" />
              </div>
            ) : (
              <FlowerLogo />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[14px]">
          <div className="w-full h-[1px] bg-gradient-to-r from-white via-transparent to-transparent" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            <div className="flex flex-col gap-1.5 flex-1">
              <h2 className="portfolio-tagline font-heading font-thin text-[24px] md:text-[clamp(26px,4vw,36px)] font-normal text-white leading-[1.2] tracking-[-0.01em]">
                {p.tagline}
              </h2>
            </div>
            <div className="flex items-center justify-start md:justify-end shrink-0 pointer-events-auto z-10">
              <Link href={p.detailSlug ? `/case-studies/${p.detailSlug}` : "/portfolio"} prefetch={false}>
                <ArrowButton title={p.detailSlug ? "Read Case Study" : "View Our Work"} />
              </Link>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-white via-transparent to-transparent" />
        </div>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span key={tag} className="portfolio-tag flex items-center gap-1.5 border border-white/30 text-white/75 rounded-full px-3 py-[5px] text-[10px] md:text-[12px] bg-white/5">
              <BookmarkIcon /> {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── LIST MODE: All cards stacked vertically ── */
  if (isList) {
    return (
      <div ref={sectionRef} className="flex flex-col gap-8 md:gap-12 bg-[#0c121c] font-sans py-8 md:py-16">
        {activeProjects.map((p, i) => (
          <div
            key={p.id}
            className="portfolio-list-card relative mx-4 md:mx-16 rounded-2xl overflow-hidden h-[600px] md:h-[750px]"
          >
            {renderCard(p, i)}
            {renderOverlays()}
            {renderListContent(p)}
          </div>
        ))}
      </div>
    );
  }

  /* ── CAROUSEL MODE: Horizontal Pinned Scrolling Gallery ── */
  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0c121c] font-sans transition-colors duration-1000 ease-out z-20"
    >
      {/* Custom Mouse Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 w-28 h-28 rounded-full border border-white/20 bg-white/5 backdrop-blur-[2px] flex items-center justify-center pointer-events-none z-50 opacity-0 font-sans text-[10px] tracking-[0.2em] text-white uppercase select-none hidden lg:flex"
        style={{
          boxShadow: "0 0 35px rgba(255, 255, 255, 0.05)",
          willChange: "transform, opacity",
          transform: "scale(0.5)",
          opacity: 0,
          pointerEvents: "none"
        }}
      >
        Explore
      </div>

      {/* Floating Ambient Film Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Horizontal Gallery Track */}
      <div
        ref={galleryRef}
        className="flex items-center h-full w-fit px-[10vw] gap-[6vw] relative z-20"
      >
        {activeProjects.map((p, idx) => {
          const descWords = (descriptions[p.id] || "").split(" ");

          return (
            <div
              key={p.id}
              className="portfolio-card relative w-[80vw] max-w-[1100px] h-[72vh] md:h-[76vh] shrink-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.4)] cursor-none bg-[#161c28]"
              style={{
                filter: "blur(6px)",
                opacity: 0.6,
                transform: "scale(0.92)",
                willChange: "transform, filter"
              } as React.CSSProperties}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Background Image Layer (with independent movement) */}
              <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
                <Image
                  src={p.bgImage}
                  alt={p.brand}
                  fill
                  priority={idx === 0}
                  sizes="(max-w-768px) 100vw, 80vw"
                  className="parallax-image object-cover scale-[1.08] will-change-transform"
                />
                {/* Cinematic Vignette/Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-10" />
              </div>

              {/* Card Content Layer */}
              <div className="relative z-20 h-full w-full flex flex-col justify-between p-8 md:p-14 lg:p-16">

                {/* Top Row: Client Logo & Industry Tag */}
                <div className="flex justify-between items-start w-full">
                  <div className="parallax-logo w-40 h-16 relative flex items-center justify-start will-change-transform">
                    {p.logoSrc ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={p.logoSrc}
                          alt={p.brand}
                          fill
                          sizes="160px"
                          className="object-contain object-left"
                        />
                      </div>
                    ) : (
                      <FlowerLogo />
                    )}
                  </div>
                  <div className="parallax-tags flex flex-wrap gap-2">
                    <span className="tag-item flex items-center gap-1 border border-white/20 text-white/80 rounded-full px-3 py-[5px] text-[10px] uppercase tracking-wider bg-white/5 font-sans">
                      {p.industry || "Creative"}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Text content & CTA */}
                <div className="flex flex-col gap-4 max-w-2xl">

                  {/* Title split in lines */}
                  <h2 className="parallax-title font-heading font-light text-[clamp(1.8rem,3.2vw,3rem)] leading-tight text-white tracking-tight will-change-transform">
                    <span className="block overflow-hidden py-[0.05em]">
                      <span className="title-line inline-block origin-bottom-left text-white/50 text-[0.45em] uppercase tracking-[0.2em] font-sans font-normal leading-normal">
                        {p.displayName || p.brand}
                      </span>
                    </span>
                    <span className="block overflow-hidden py-[0.05em] mt-1.5">
                      <span className="title-line inline-block">
                        {p.tagline}
                      </span>
                    </span>
                  </h2>

                  {/* Word-by-word reveal Description */}
                  <p className="parallax-desc text-white/70 font-light font-sans text-sm md:text-[0.95rem] leading-relaxed">
                    {descWords.map((word, wordIdx) => (
                      <span
                        key={wordIdx}
                        className="desc-word inline-block mr-[0.25em] will-change-[transform,opacity]"
                      >
                        {word}
                      </span>
                    ))}
                  </p>

                  {/* Tags list */}
                  <div className="parallax-tags flex flex-wrap gap-2 mt-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag-item flex items-center gap-1.5 border border-white/10 text-white/60 rounded-full px-3 py-[4px] text-[11px] bg-white/5 font-sans"
                      >
                        <BookmarkIcon /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Glassmorphic Call-to-action */}
                  <div className="parallax-cta mt-6 pointer-events-auto w-fit">
                    <Link
                      href={p.detailSlug ? `/case-studies/${p.detailSlug}` : "/portfolio"}
                      prefetch={false}
                      onMouseEnter={handleCtaMouseEnter}
                      onMouseLeave={handleCtaMouseLeave}
                    >
                      <div className="group cursor-pointer relative z-10 flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-[6px] px-6 py-3 font-sans text-xs uppercase tracking-wider text-white transition-all duration-500 hover:scale-[1.03] hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <span className="relative z-10 font-medium">{p.detailSlug ? "Read Case Study" : "View Our Work"}</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1 relative z-10"
                          viewBox="0 0 16 19"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 left-8 md:left-16 right-8 md:right-16 z-40 flex items-center justify-between font-sans text-xs tracking-widest text-white/50 uppercase select-none">
        <span className="font-heading">01</span>
        <div className="flex-1 mx-6 h-[2px] bg-white/10 relative rounded-full overflow-hidden">
          <div ref={progressBarRef} className="absolute left-0 top-0 h-full bg-[#FAC02D] w-0" />
        </div>
        <span className="font-heading">{`0${activeProjects.length}`}</span>
      </div>
    </div>
  );
}