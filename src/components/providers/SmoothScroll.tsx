"use client";

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Detect mobile touch devices after hydration to avoid SSR mismatch
    if (typeof window !== "undefined") {
      setIsMobile(!window.matchMedia("(pointer: fine)").matches);
    }
  }, []);

  useEffect(() => {
    // Reset scroll to top on route change
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if (isMobile) return;

    gsap.ticker.lagSmoothing(0);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.resize();
      }
      ScrollTrigger.refresh();
    });
    if (document?.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      gsap.ticker.remove(update);
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  // The internal CMS dashboard wants native scrolling (tables, sticky
  // headers) rather than the marketing site's smooth-scroll feel.
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        autoRaf: false,
        lerp: isMobile ? 1 : 0.1,
        duration: isMobile ? 0 : 1.2,
        smoothWheel: !isMobile,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}