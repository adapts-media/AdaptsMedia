"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function ScrollArrow() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const checkScrollPosition = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Show arrow after scrolling past the hero area
    setIsVisible(scrollTop > 150);

    // Flip arrow when near the bottom (within 200px of the end)
    const distanceFromBottom = docHeight - (scrollTop + windowHeight);
    setIsAtBottom(distanceFromBottom < 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const handleClick = useCallback(() => {
    if (isAtBottom) {
      // Scroll to top
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.8 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Scroll down by ~85% of the viewport
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const target = currentScroll + window.innerHeight * 0.85;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.2 });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    }
  }, [isAtBottom, lenis]);

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <style>{`
        @keyframes scrollChevronBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        @keyframes scrollChevronBounceDelayed {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        .scroll-arrow-btn:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 4px;
          border-radius: 50%;
        }
      `}</style>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isAtBottom ? "Scroll to top" : "Scroll down"}
        className="scroll-arrow-btn"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 9990,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0px",
          width: "52px",
          height: "52px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
          transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          padding: 0,
        }}
      >
        {/* Subtle glow ring */}
        <span
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            background: isHovered
              ? "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Chevron container - flips 180° when at bottom */}
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            transform: isAtBottom ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* First chevron (lighter) */}
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: "scrollChevronBounce 2.2s ease-in-out infinite",
            }}
          >
            <path
              d="M2 2L12 10L22 2"
              stroke={isHovered ? "#C9A84C" : "rgba(201,168,76,0.45)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.3s ease" }}
            />
          </svg>

          {/* Second chevron (more prominent) */}
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: "scrollChevronBounceDelayed 2.2s ease-in-out infinite",
              animationDelay: "0.25s",
            }}
          >
            <path
              d="M2 2L12 10L22 2"
              stroke={isHovered ? "#C9A84C" : "rgba(201,168,76,0.85)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.3s ease" }}
            />
          </svg>
        </span>
      </button>
    </>
  );
}
