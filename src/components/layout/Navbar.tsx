"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import FullscreenMenu from "./FullscreenMenu";
import AdaptsLogoSvg from "./AdaptsLogoSvg";

const NavLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className="relative h-[40px] overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
    style={{ width: isScrolled ? "35px" : "183px" }}
  >
    <AdaptsLogoSvg isScrolled={isScrolled} />
  </div>
);

const IDLE_TIMEOUT = 2500; // ms before hiding on no movement
const TOP_HOVER_ZONE = 80; // px from top to trigger show on hover

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringNav = useRef(false);

  const menuBarClass = "block w-[18px] md:w-[22px] h-[2px] bg-white rounded-[2px]";
  // Menu state and refs
  const [menuOpen, setMenuOpen] = useState(false);
  const topBarRef = useRef<HTMLSpanElement>(null);
  const middleBarRef = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLSpanElement>(null);

  // ── Reset idle timer: hides navbar after inactivity ──
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      // Don't hide if user is hovering on the navbar itself or still in hero
      if (!isHoveringNav.current && window.scrollY > window.innerHeight) {
        setIsVisible(false);
      }
    }, IDLE_TIMEOUT);
  }, []);

  // Toggle menu with GSAP animation
  const toggleMenu = () => {
    const opening = !menuOpen;
    setMenuOpen(opening);
    const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power3.out" } });
    if (opening) {
      tl.to(topBarRef.current, { rotate: 45, y: 6 })
        .to(middleBarRef.current, { opacity: 0 }, 0)
        .to(bottomBarRef.current, { rotate: -45, y: -6 }, 0);
    } else {
      tl.to(topBarRef.current, { rotate: 0, y: 0 })
        .to(middleBarRef.current, { opacity: 1 }, 0)
        .to(bottomBarRef.current, { rotate: 0, y: 0 }, 0);
    }
  };

  // ── Scroll handler: direction detection + pill morph ──
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroEnd = window.innerHeight; // hero is h-screen

      // Original pill transition
      setIsScrolled(currentY > 250);

      // Within the hero section (first 70%) → stay visible for pill animation
      if (currentY <= heroEnd * 0.8) {
        setIsVisible(true);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        lastScrollY.current = currentY;
        return;
      }

      // Approaching hero end → auto-hide so it disappears before section 2
      if (currentY <= heroEnd && currentY > lastScrollY.current) {
        setIsVisible(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        lastScrollY.current = currentY;
        return;
      }

      // Past the hero: scroll-up → show, scroll-down → hide
      if (currentY < lastScrollY.current) {
        setIsVisible(true);
        resetIdleTimer();
      } else if (currentY > lastScrollY.current) {
        setIsVisible(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [resetIdleTimer]);

  // ── Mouse movement: show on top-zone hover & restart idle timer ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If mouse is in the top hover zone, show navbar
      if (e.clientY <= TOP_HOVER_ZONE) {
        setIsVisible(true);
      }

      // Any movement while visible resets idle
      resetIdleTimer();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [resetIdleTimer]);

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // The internal CMS dashboard has its own admin nav — don't show the
  // public marketing navbar there.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[1000] py-4 pointer-events-none"
        style={{
          transform: (isVisible || menuOpen) ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={() => {
          isHoveringNav.current = true;
          setIsVisible(true);
          if (idleTimer.current) clearTimeout(idleTimer.current);
        }}
        onMouseLeave={() => {
          isHoveringNav.current = false;
          resetIdleTimer();
        }}
      >
        <nav
          aria-label="Main Navigation"
          className={`
          mx-auto flex items-center justify-between transition-all duration-[800ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] pointer-events-auto
          ${isScrolled
              ? "w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] max-w-[calc(1350px-4rem)] md:max-w-[calc(1350px-8rem)] bg-white/10 backdrop-blur-md border border-white/20 px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full shadow-lg"
              : "max-w-[1600px] w-full bg-transparent border-transparent px-4 sm:px-8 md:px-12 py-4 rounded-none shadow-none"
            }
        `}
        >
          <Link href="/" aria-label="Home" className="flex no-underline shrink-0">
            <NavLogo isScrolled={isScrolled} />
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-[28px]">
            <Link
              href="/start-project"
              className="flex items-center gap-2 bg-[#3b6ef5] text-white border-none rounded-full 
                       px-4 h-10 md:h-auto md:px-5 md:py-[10px] 
                       text-[14.5px] sm:text-[16px] md:text-[20px] font-medium tracking-[0.01em] 
                       cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 no-underline shrink-0 whitespace-nowrap"
            >
              <span className="font-sans whitespace-nowrap">Start a Project</span>
              <Image
                alt=""
                src="/images/clock.png"
                width={20}
                height={20}
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 object-contain shrink-0"
              />
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#f5a623] border-none rounded-full shrink-0
                       flex flex-col items-center justify-center gap-1 cursor-pointer 
                       transition-transform duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)]"
              onClick={toggleMenu}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleMenu(); }}
            >
              <span ref={topBarRef} className={menuBarClass} />
              <span ref={middleBarRef} className={menuBarClass} />
              <span ref={bottomBarRef} className={menuBarClass} />
            </button>
          </div>
        </nav>
      </header>
      {/* Fullscreen Menu Overlay */}
      <FullscreenMenu isOpen={menuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Navbar;