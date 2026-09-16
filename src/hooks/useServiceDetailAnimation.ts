import { RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const useServiceDetailAnimation = (containerRef: RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inject styles dynamically once
    if (typeof document !== "undefined" && !document.getElementById("service-animation-styles")) {
      const style = document.createElement("style");
      style.id = "service-animation-styles";
      style.innerHTML = `
        .service-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255, 255, 255, 0.09) 0%, transparent 70%);
          mix-blend-mode: screen;
        }
        .service-ambient-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.012;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .service-title {
          font-weight: 400 !important;
        }
        .line-parent {
          overflow: hidden;
          display: block;
          padding-bottom: 0.25em !important;
          margin-bottom: -0.25em !important;
        }
        .line-child {
          display: inline-block;
          will-change: transform, filter, opacity;
        }
        .desc-line {
          will-change: transform, filter, opacity;
        }
        .service-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform;
        }
        .service-cta:hover {
          transform: translateY(-3px) scale(1.02);
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .service-cta span.arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-cta:hover span.arrow {
          transform: translate(2px, -2px);
        }
        .service-img-container {
          max-width: 270px !important;
        }
        .service-img-bg {
          transform: scale(1.25) !important;
        }
        @media (min-width: 1024px) {
          section .grid:has(.service-img-container),
          section .grid:has(.service-content-wrapper) {
            align-items: start !important;
          }
          .service-img-container {
            margin-top: 2.25rem !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const cleanups: (() => void)[] = [];

    // Prepend ambient glow container dynamically
    let glowEl = container.querySelector(".service-ambient-glow");
    if (!glowEl) {
      glowEl = document.createElement("div");
      glowEl.className = "service-ambient-glow";
      container.insertBefore(glowEl, container.firstChild);
    }

    // Split Heading into lines
    const titleEl = container.querySelector(".service-title") as HTMLElement;
    let headingSplit: SplitText | null = null;
    let headingParent: SplitText | null = null;
    if (titleEl) {
      headingSplit = new SplitText(titleEl, {
        type: "lines",
        linesClass: "line-child",
      });
      headingParent = new SplitText(titleEl, {
        type: "lines",
        linesClass: "line-parent",
      });
      cleanups.push(() => {
        headingSplit?.revert();
        headingParent?.revert();
      });
    }

    // Split Description paragraphs into lines
    const descEl = container.querySelector(".service-desc");
    let descLinesSplit: SplitText | null = null;
    if (descEl) {
      const paragraphs = descEl.querySelectorAll("p");
      descLinesSplit = new SplitText(paragraphs, {
        type: "lines",
        linesClass: "desc-line",
      });
      cleanups.push(() => {
        descLinesSplit?.revert();
      });
    }

    // ────────────────────────────────────────────────────────
    // Initial States Setup
    // ────────────────────────────────────────────────────────
    gsap.set(container, { "--glow-x": "50%", "--glow-y": "50%" });

    const categoryEl = container.querySelector(".service-category");
    if (categoryEl) {
      gsap.set(categoryEl, {
        opacity: 0,
        y: 10,
        clipPath: "inset(0 100% 0 0)",
      });
    }

    if (headingSplit) {
      gsap.set(headingSplit.lines, {
        yPercent: 120,
        filter: "blur(10px)",
        opacity: 0,
      });
    }

    if (descLinesSplit) {
      gsap.set(descLinesSplit.lines, {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      });
    }

    const imgMainEl = container.querySelector(".service-img-main");
    if (imgMainEl) {
      gsap.set(imgMainEl, {
        opacity: 0,
        scale: 0.75,
        filter: "blur(10px)",
        rotate: 5,
        transformOrigin: "center center",
      });
    }

    const ctaEl = container.querySelector(".service-cta");
    if (ctaEl) {
      gsap.set(ctaEl, {
        opacity: 0,
        y: 20,
        scale: 0.95,
      });
    }

    const delHeaderEl = container.querySelector(".service-deliverables-header");
    if (delHeaderEl) {
      gsap.set(delHeaderEl, {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
        x: -10,
      });
    }

    const delItems = container.querySelectorAll(".service-deliverable-item");
    delItems.forEach((item) => {
      const icon = item.querySelector(".service-deliverable-icon");
      const text = item.querySelector(".service-deliverable-text");
      if (icon) gsap.set(icon, { opacity: 0, scale: 0, filter: "blur(4px)" });
      if (text) gsap.set(text, { opacity: 0, x: -15, filter: "blur(4px)" });
    });

    // ────────────────────────────────────────────────────────
    // Entrance Sequence ScrollTrigger
    // ────────────────────────────────────────────────────────
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Background fade in
    entranceTl.to(container, {
      duration: 0.6,
      ease: "power2.out",
    }, 0);

    // Category Label Horizontal Mask Reveal
    if (categoryEl) {
      entranceTl.to(categoryEl, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.5,
        ease: "power2.out",
      }, 0.1);
    }

    // Heading lines reveal
    if (headingSplit) {
      entranceTl.to(headingSplit.lines, {
        yPercent: 0,
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
      }, "-=0.35");
    }

    // Paragraph lines reveal
    if (descLinesSplit) {
      entranceTl.to(descLinesSplit.lines, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.05,
        ease: "power3.out",
      }, "-=0.55");
    }

    // Illustration entrance
    if (imgMainEl) {
      entranceTl.to(imgMainEl, {
        opacity: 1,
        scale: 0.9,
        filter: "blur(0px)",
        rotate: 0,
        duration: 0.95,
        ease: "power3.out",
      }, "-=0.85");
    }

    // CTA Button entrance
    if (ctaEl) {
      entranceTl.to(ctaEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      }, "-=0.45");
    }

    // Deliverables Title mask reveal
    if (delHeaderEl) {
      entranceTl.to(delHeaderEl, {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.35");
    }

    // Deliverables List Items reveal (Icon pops first, then text)
    if (delItems.length > 0) {
      delItems.forEach((item, itemIdx) => {
        const icon = item.querySelector(".service-deliverable-icon");
        const text = item.querySelector(".service-deliverable-text");
        
        const delayOffset = 0.4 + itemIdx * 0.07;
        
        if (icon) {
          entranceTl.to(icon, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.35,
            ease: "back.out(1.5)",
          }, `-=${1.0 - delayOffset}`);
        }
        
        if (text) {
          entranceTl.to(text, {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          }, `-=${0.85 - delayOffset}`);
        }
      });
    }

    // ────────────────────────────────────────────────────────
    // Infinite Ambient Loops
    // ────────────────────────────────────────────────────────
    // Gradient breathing (slow motion)
    gsap.to(container, {
      "--glow-x": "65%",
      "--glow-y": "35%",
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Heading soft micro-movement
    if (titleEl) {
      gsap.to(titleEl, {
        y: "+=2",
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Illustration slow floating
    if (imgMainEl) {
      gsap.to(imgMainEl, {
        y: 6,
        rotate: 1,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // ────────────────────────────────────────────────────────
    // Mouse Parallax Interaction
    // ────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      
      const pctX = mouseX / (rect.width / 2);
      const pctY = mouseY / (rect.height / 2);

      if (titleEl) {
        gsap.to(titleEl, {
          x: pctX * 5,
          y: pctY * 5,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (imgMainEl) {
        gsap.to(imgMainEl, {
          x: pctX * 15,
          y: pctY * 15,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (ctaEl) {
        gsap.to(ctaEl, {
          x: pctX * 8,
          y: pctY * 8,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseLeave = () => {
      if (titleEl) {
        gsap.to(titleEl, { x: 0, y: 0, duration: 1.0, ease: "power2.out", overwrite: "auto" });
      }
      if (imgMainEl) {
        gsap.to(imgMainEl, { x: 0, y: 0, duration: 1.0, ease: "power2.out", overwrite: "auto" });
      }
      if (ctaEl) {
        gsap.to(ctaEl, { x: 0, y: 0, duration: 1.0, ease: "power2.out", overwrite: "auto" });
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    cleanups.push(() => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    });

    // ────────────────────────────────────────────────────────
    // Scroll-Scrubbed Exit Transition
    // ────────────────────────────────────────────────────────
    const contentWrapper = container.querySelector(".service-content-wrapper");
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    exitTl.to(container, {
      opacity: 0.9,
      ease: "none",
    }, 0);

    if (imgMainEl) {
      exitTl.to(imgMainEl, {
        scale: 0.98,
        ease: "none",
      }, 0);
    }

    if (contentWrapper) {
      exitTl.to(contentWrapper, {
        y: -20,
        ease: "none",
      }, 0);
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, { scope: containerRef });
};
