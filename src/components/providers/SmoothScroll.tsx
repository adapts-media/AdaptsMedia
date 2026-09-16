"use client";

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState, useCallback } from 'react';
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

  const scrollToAnchor = useCallback((targetElementOrId: string | HTMLElement) => {
    const target = typeof targetElementOrId === 'string'
      ? (document.getElementById(targetElementOrId.replace(/^#/, '')) || document.querySelector(targetElementOrId))
      : targetElementOrId;

    if (!target) return false;

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target, { offset: -90, duration: 1.2 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
    return true;
  }, []);

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash) {
      let attempts = 0;
      const maxAttempts = 25; // 25 * 60ms = 1.5s
      const tryScroll = () => {
        const id = hash.replace(/^#/, '');
        const target = document.getElementById(id) || document.querySelector(hash);
        const lenis = lenisRef.current?.lenis;
        if (target && lenis) {
          lenis.resize();
          lenis.scrollTo(target, { offset: -90, duration: 1.2 });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 60);
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };
      setTimeout(tryScroll, 100);
    } else {
      // Reset scroll to top on route change when no hash is present
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: true });
      } else if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  // Handle same-page hash changes and anchor clicks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToAnchor(hash);
      }
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.includes('#')) return;

      try {
        const url = new URL(href, window.location.href);
        // If clicking a hash link for the current page
        if (url.pathname === window.location.pathname && url.hash) {
          const id = url.hash.replace(/^#/, '');
          const target = document.getElementById(id) || document.querySelector(url.hash);
          if (target) {
            e.preventDefault();
            window.history.pushState(null, '', href);
            scrollToAnchor(target as HTMLElement);
          }
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('click', handleAnchorClick, true);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, [scrollToAnchor]);

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