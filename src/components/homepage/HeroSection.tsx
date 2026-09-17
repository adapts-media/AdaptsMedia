"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const wrapper1Ref = useRef<HTMLDivElement>(null);
  const wrapper2Ref = useRef<HTMLDivElement>(null);

  // Video states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playerStatus, setPlayerStatus] = useState<"idle" | "loading" | "ready" | "playing" | "paused">("idle");
  const [playerActivated, setPlayerActivated] = useState(false);

  // Rotating text states
  const words = ["Campaign", "Social", "Marketing"];
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // 1. Load Hls.js dynamically for cross-platform compatibility
  useEffect(() => {
    let cleanupVideo: (() => void) | undefined;

    const initVideo = () => {
      const video = videoRef.current;
      const target = targetRef.current;
      if (!video || !target) return;

      const src = "https://vz-7fa605c7-1fd.b-cdn.net/77910414-bbf3-41c6-9c0e-e72d411c458d/playlist.m3u8";

      // Detect native HLS support (Safari)
      const isSafariNative = !!video.canPlayType("application/vnd.apple.mpegurl");
      const HlsLib = (window as any).Hls;
      const canUseHlsJs = !!(HlsLib && HlsLib.isSupported()) && !isSafariNative;

      let hlsInstance: any = null;

      if (isSafariNative) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          setPlayerStatus("ready");
        }, { once: true });
      } else if (canUseHlsJs) {
        hlsInstance = new HlsLib({ maxBufferLength: 10 });
        hlsInstance.attachMedia(video);
        hlsInstance.on(HlsLib.Events.MEDIA_ATTACHED, () => {
          hlsInstance.loadSource(src);
        });
        hlsInstance.on(HlsLib.Events.MANIFEST_PARSED, () => {
          setPlayerStatus("ready");
        });
      } else {
        // Fallback or non-HLS
        video.src = src;
      }

      const playVideo = () => {
        setPlayerStatus("loading");
        video.play()
          .then(() => {
            setPlayerStatus("playing");
            setPlayerActivated(true);
          })
          .catch(() => {
            setPlayerStatus("paused");
          });
      };

      // Play when in view, pause when out
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            playVideo();
          } else {
            video.pause();
            setPlayerStatus("paused");
          }
        });
      }, { threshold: 0.1 });

      observer.observe(target);

      cleanupVideo = () => {
        observer.disconnect();
        if (hlsInstance) {
          hlsInstance.destroy();
        }
      };
    };

    if (typeof window !== "undefined") {
      if (!(window as any).Hls) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js";
        script.async = true;
        script.onload = initVideo;
        document.body.appendChild(script);
      } else {
        initVideo();
      }
    }

    return () => {
      if (cleanupVideo) cleanupVideo();
    };
  }, []);

  // 2. Rotating Text Logic using GSAP
  useGSAP(() => {
    const wordEls = wordRefs.current;
    const wrapper = wrapperRef.current;
    if (!wrapper || wordEls.length === 0) return;

    // Set initial width to match the first word
    const setWidth = () => {
      const firstWord = wordEls[0];
      if (firstWord) {
        wrapper.style.width = `${firstWord.getBoundingClientRect().width}px`;
      }
    };

    // Slight delay to ensure fonts are rendered
    setWidth();
    const timeoutId = setTimeout(setWidth, 150);

    let activeIndex = 0;
    const inDuration = 0.75;
    const outDuration = 0.6;
    const stepDuration = 1.75; // seconds

    // Initially hide all words except first
    gsap.set(wordEls.slice(1), { yPercent: 150, autoAlpha: 0 });
    gsap.set(wordEls[0], { yPercent: 0, autoAlpha: 1 });

    const showNext = () => {
      const nextIndex = (activeIndex + 1) % wordEls.length;
      const prev = wordEls[activeIndex];
      const current = wordEls[nextIndex];
      if (!prev || !current) return;

      const targetWidth = current.getBoundingClientRect().width;

      // Animate wrapper width
      gsap.to(wrapper, {
        width: targetWidth,
        duration: inDuration,
        ease: "power4.inOut"
      });

      // Slide old word up & out
      gsap.to(prev, {
        yPercent: -150,
        autoAlpha: 0,
        duration: outDuration,
        ease: "power4.inOut"
      });

      // Slide new word up & in
      gsap.fromTo(current,
        { yPercent: 150, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: inDuration, ease: "power4.inOut" }
      );

      activeIndex = nextIndex;
    };

    const interval = setInterval(showNext, stepDuration * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, { scope: wrapperRef });

  // 3. GSAP Flip on Scroll
  useGSAP(() => {
    const wrapper1 = wrapper1Ref.current;
    const wrapper2 = wrapper2Ref.current;
    const target = targetRef.current;
    if (!wrapper1 || !wrapper2 || !target) return;

    let tl: gsap.core.Timeline;

    const initFlip = () => {
      if (tl) {
        tl.kill();
        gsap.set(target, { clearProps: "all" });
      }

      const wrappers = [wrapper1, wrapper2];
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrappers[0],
          start: "center center",
          endTrigger: wrappers[wrappers.length - 1],
          end: "center center",
          scrub: 0.25,
          invalidateOnRefresh: true,
        }
      });

      // Fit target into next wrapper element based on scroll scrub
      const nextRect = wrappers[1].getBoundingClientRect();
      const thisRect = wrappers[0].getBoundingClientRect();
      const nextDistance = nextRect.top + window.scrollY + wrappers[1].offsetHeight / 2;
      const thisDistance = thisRect.top + window.scrollY + wrappers[0].offsetHeight / 2;
      const offset = nextDistance - thisDistance;

      const flipTween = Flip.fit(target, wrappers[1], {
        duration: offset,
        ease: "none"
      });
      
      if (flipTween) {
        tl.add(flipTween as gsap.core.Tween);
      }
    };

    // Initialize Flip timeline
    initFlip();

    // Recreate flip timeline on window resize
    const handleResize = () => {
      initFlip();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (tl) tl.kill();
    };
  }, { scope: containerRef });

  return (
    <>
      <style>{`
        /* Encapsulated Hero CSS styles matching index.html */
        .hero-section {
          z-index: 0;
          position: relative;
          overflow: hidden;
          background-color: #000;
        }

        .hero-bg-video {
          z-index: 0;
          opacity: 0.11;
          filter: contrast(200%) saturate(0%);
          mix-blend-mode: normal;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0% 0% auto;
        }

        .hero-bg-video > video {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .scaling-element-header {
          z-index: 1;
          grid-column-gap: 3em;
          grid-row-gap: 3em;
          border-radius: 0;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20vh 0;
          display: flex;
          position: relative;
        }

        .scaling-element__small-box {
          border-radius: 0;
          width: 50em;
          height: 10em;
          position: relative;
          top: 4px;
        }

        .scaling-video__before {
          border-radius: 0;
          padding-top: 56.25%;
        }

        .scaling-video__wrapper {
          border-radius: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .bunny-bg {
          pointer-events: none;
          color: #fff;
          isolation: isolate;
          border-radius: 0;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          overflow: visible;
          transform: translate(0);
        }

        .bunny-bg__video {
          object-fit: cover;
          border-radius: 0;
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
        }

        .bunny-bg__placeholder {
          object-fit: cover;
          width: 100%;
          height: 100%;
          position: absolute;
          transition: opacity 0.3s linear, visibility 0.3s linear;
        }

        /* Hide placeholder when playing */
        .bunny-bg[data-player-status="playing"] .bunny-bg__placeholder,
        .bunny-bg[data-player-status="paused"] .bunny-bg__placeholder,
        .bunny-bg[data-player-activated="true"][data-player-status="ready"] .bunny-bg__placeholder {
          opacity: 0;
          visibility: hidden;
        }

        .bunny-bg__loading {
          opacity: 0;
          visibility: hidden;
          background-color: rgba(0, 0, 0, 0.33);
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          transition: opacity 0.3s linear, visibility 0.3s linear;
        }

        .bunny-bg[data-player-status="loading"] .bunny-bg__loading {
          opacity: 1;
          visibility: visible;
        }

        .bunny-bg__loading-svg {
          width: 6em;
          color: #fff;
        }

        .rotating-text__heading {
          z-index: 2;
          color: #fff;
          text-align: center;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          mix-blend-mode: normal;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-width: 0;
          height: auto;
          margin-top: 0;
          margin-bottom: 0;
          font-family: Barlow, sans-serif;
          font-size: 118px;
          font-weight: 200;
          line-height: 115%;
          display: flex;
          position: relative;
          top: -4%;
        }

        .rotating-text__highlight {
          opacity: 1;
          color: #fac02d;
          text-align: left;
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #fac02d;
          text-shadow: 5px 6px 6px rgba(19, 19, 19, 0.64);
          mix-blend-mode: normal;
          padding-left: 0;
          padding-right: 15px;
          font-family: Barlow, sans-serif;
          font-style: italic;
          font-weight: 900;
        }

        .rotating-text__inner {
          display: inline-block;
          position: relative;
          vertical-align: bottom;
          height: 1.15em;
        }

        .rotating-text__word {
          display: block;
          white-space: nowrap;
          position: absolute;
          top: 0;
          left: 0;
        }

        .scaling-element-video {
          grid-column-gap: 25vh;
          grid-row-gap: 25vh;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          padding: 6vh 4vw;
          display: flex;
          position: relative;
          min-height: 100vh;
        }

        .scaling-element__big-box {
          border-radius: 1em;
          width: 100%;
          position: relative;
        }

        /* Responsive breakpoints */
        @media screen and (max-width: 991px) {
          .scaling-element__small-box {
            width: 32em;
            height: 7em;
          }
          .rotating-text__heading {
            font-size: 88px;
          }
        }

        @media screen and (max-width: 767px) {
          .scaling-element-header {
            min-height: 100vh;
            padding-top: 11vh;
            padding-bottom: 24vh;
          }
          .scaling-element__small-box {
            width: 20em;
            height: 4em;
          }
          .scaling-video__before {
            padding-top: 47.25%;
          }
          .rotating-text__heading {
            font-size: 48px;
          }
          .rotating-text__highlight {
            text-shadow: 3px 2px 4px rgba(19, 19, 19, 0.45);
          }
        }

        /* Animated grain background effect removed for performance */
      `}</style>

      <div ref={containerRef} className="grain relative w-full overflow-hidden bg-black">
        {/* Static noise texture overlay */}
        <div
          className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px"
          }}
        />

        <section className="hero-section">
          {/* Fixed background loop video */}
          <div className="hero-bg-video">
            <video autoPlay loop muted playsInline preload="auto" suppressHydrationWarning>
              <source
                src="/videos/AdaptsMedia_Banner_Video.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Section 1: Heading with the small video box */}
          <section className="scaling-element-header">
            <a href="#Showreel" className="w-inline-block">
              <div className="scaling-element__small-box">
                <div className="scaling-video__before"></div>
                <div ref={wrapper1Ref} data-flip-element="wrapper" className="scaling-video__wrapper">

                  {/* The scaling element itself */}
                  <div
                    ref={targetRef}
                    data-flip-element="target"
                    className="bunny-bg"
                    data-player-status={playerStatus}
                    data-player-activated={playerActivated ? "true" : "false"}
                  >
                    {/* Rotating header text */}
                    <h1 className="rotating-text__heading">
                      Your<br />
                      <span className="rotating-text__highlight">
                        <span ref={wrapperRef} className="rotating-text__inner">
                          {words.map((word, i) => (
                            <span
                              key={word}
                              ref={(el) => { wordRefs.current[i] = el; }}
                              className="rotating-text__word"
                            >
                              {word}
                            </span>
                          ))}
                        </span>
                      </span>
                      Agency
                    </h1>

                    {/* HLS Video player inside the scaling box */}
                    <video
                      ref={videoRef}
                      preload="auto"
                      width="1920"
                      height="1080"
                      playsInline
                      muted
                      suppressHydrationWarning
                      className="bunny-bg__video"
                    />

                    {/* Placeholder image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width="auto"
                      sizes="(max-width: 1116px) 100vw, 1116px"
                      alt="reel-cover"
                      src="https://cdn.prod.website-files.com/6984f3310998e8295121e212/6984f3310998e8295121e1ee_reel-cover.avif"
                      className="bunny-bg__placeholder"
                    />

                    {/* Loading spinner */}
                    <div className="bunny-bg__loading">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        className="bunny-bg__loading-svg"
                        fill="none"
                      >
                        <path
                          fill="currentColor"
                          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                        >
                          <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="1s"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
                    </div>

                  </div>
                </div>
              </div>
            </a>
          </section>

          {/* Section 2: Big box where the video expands to */}
          <section id="Showreel" className="scaling-element-video">
            <div className="scaling-element__big-box">
              <div className="scaling-video__before"></div>
              <div ref={wrapper2Ref} data-flip-element="wrapper" className="scaling-video__wrapper"></div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default HeroSection;
