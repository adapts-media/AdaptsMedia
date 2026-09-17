"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface SingleBlogHeroProps {
  title: string;
  author: string;
  authorSlug?: string;
  date: string;
  categories: string[];
}

const SingleBlogHero = ({ title, author, authorSlug, date, categories }: SingleBlogHeroProps) => {
  const containerRef = useRef<HTMLElement>(null);

  // ── Animate elements (they are pre-hidden via inline styles in JSX below) ─
  useGSAP(() => {
    const splits: SplitText[] = [];
    const container = containerRef.current;
    if (!container) return;

    // 1. Background parallax on scroll (no pre-hide needed)
    gsap.fromTo(
      ".blog-hero-bg",
      { scale: 1.05, yPercent: 0 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // 2. Breadcrumb — gsap.to() since initial state set by useLayoutEffect
    gsap.to(container.querySelector(".blog-hero-breadcrumb"), {
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      duration: 0.8,
      ease: "power2.out",
      delay: 0.15,
    });

    // 3. Title — make visible for SplitText to measure, then animate lines
    const titleEl = container.querySelector(".blog-hero-title") as HTMLElement | null;
    if (titleEl) {
      // Restore visibility so SplitText can measure line heights correctly
      gsap.set(titleEl, { visibility: "visible" });

      const titleSplit = SplitText.create(titleEl, {
        type: "lines",
        mask: "lines", // overflow:hidden per line — lines at yPercent:110 are clipped out
      });
      splits.push(titleSplit);

      // Lines are inside overflow:hidden masks, so starting outside = already invisible
      gsap.from(titleSplit.lines, {
        yPercent: 110,
        opacity: 0,
        rotationX: -10,
        transformOrigin: "0% 50% -50px",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
        delay: 0.25,
      });
    }

    // 4. Meta — gsap.to() since initial state set by useLayoutEffect
    gsap.to(container.querySelector(".blog-hero-meta"), {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.6,
    });

    // 5. Tags — gsap.to() since initial state set by useLayoutEffect
    gsap.to(container.querySelectorAll(".blog-hero-tag"), {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      ease: "back.out(1.7)",
      stagger: 0.06,
      delay: 0.75,
    });

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-40 md:pb-48 px-6 text-center text-white overflow-hidden"
    >
      {/* Background Image with parallax class */}
      <Image
        src="/images/CommonBlogHero.png"
        alt="Blog Hero Background"
        fill
        priority
        className="blog-hero-bg absolute inset-0 object-cover z-0 scale-[1.05]"
      />

      {/* Subtle dark overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/25 to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Breadcrumb — server renders hidden, GSAP reveals */}
        <p
          className="blog-hero-breadcrumb text-[10px] md:text-xs font-sans text-white/70 mb-6 tracking-wide"
          style={{ opacity: 0 }}
        >
          Adapts Media | Blog | <span className="text-[#6a9bd6]">{title}</span>
        </p>

        {/* Title — visibility:hidden keeps layout space for SplitText to measure */}
        <h1
          className="blog-hero-title text-3xl md:text-4xl lg:text-5xl font-bold font-sans leading-snug mb-8 max-w-5xl text-center"
          style={{ visibility: "hidden" }}
          title={title}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Meta — server renders hidden */}
        <div
          className="blog-hero-meta flex flex-col items-center gap-2"
          style={{ opacity: 0 }}
        >
          {author && (
            <p className="text-sm md:text-base font-sans text-white/80">
              By{" "}
              <Link
                href={`/author/${authorSlug || author.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                className="text-[#6a9bd6] hover:underline hover:text-[#9bc2f5] transition-colors"
              >
                {author}
              </Link>
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-sans text-white/60">
            <span>{date}</span>
            <span className="mx-1 text-white/40">|</span>
            <span>Category:</span>
            {(categories.length > 0 ? categories : ["Insights"]).map((cat, index) => (
              <span
                key={index}
                className="blog-hero-tag bg-[#fac02d] text-[#17313B] text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap inline-flex items-center"
                style={{ opacity: 0 }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogHero;
