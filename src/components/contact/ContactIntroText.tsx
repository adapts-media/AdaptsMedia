"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const ContactIntroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
          },
        });
        return;
      }

      // Split paragraph into words
      const split = new SplitText(el, {
        type: "words",
        wordsClass: "word",
      });

      // Set initial dimmed state
      gsap.set(split.words, {
        opacity: 0.25,
        color: "#9ca3af",
        scale: (i, target) => (target.closest(".highlight") ? 0.96 : 1),
        transformOrigin: "center center",
      });

      // Precalculate delays for highlights and normal text
      let currentDelay = 0;
      const delays = split.words.map((word, i) => {
        const htmlWord = word as HTMLElement;
        const isHighlight = htmlWord.closest(".highlight") !== null;
        const prevIsHighlight =
          i > 0 &&
          (split.words[i - 1] as HTMLElement).closest(".highlight") !== null;

        if (isHighlight && !prevIsHighlight) {
          currentDelay += 0.07;
        } else {
          currentDelay += 0.03;
        }

        htmlWord.dataset.finalColor = isHighlight ? "#2563eb" : "#1a1a2e";
        return currentDelay;
      });

      // Create the reveal animation
      gsap.to(split.words, {
        opacity: 1,
        color: (i, target) =>
          (target as HTMLElement).dataset.finalColor || "#1a1a2e",
        scale: 1,
        stagger: (i) => delays[i],
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 1,
        },
      });

      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-28 flex justify-center font-sans overflow-hidden">
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

      <div
        ref={containerRef}
        className="max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 lg:px-20 flex flex-col items-center"
      >
        <div className="w-full max-w-[960px] mx-auto">
          <p className="reveal-text text-[clamp(20px,2.2vw,34px)] font-normal text-[#1a1a2e] leading-[1.5] tracking-[-0.01em] font-heading mx-auto text-left md:text-center">
            Thank you for your interest in partnering with{" "}
            <span className="highlight text-[#2563eb] font-semibold">
              Adapts Media
            </span>{" "}
            for your Digital Marketing agency Dubai. We are ready to lead you in
            a{" "}
            <span className="highlight text-[#2563eb] font-semibold">
              new era of digital marketing
            </span>
            . Please complete the below form, so we can provide quick service
            and quotation. Our{" "}
            <span className="highlight text-[#2563eb] font-semibold">
              24/7 client service team
            </span>{" "}
            helps you to reach your upcoming goals and{" "}
            <span className="highlight text-[#2563eb] font-semibold">
              make your revenue increase
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactIntroText;
