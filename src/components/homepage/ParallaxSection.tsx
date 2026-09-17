"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const ParallaxSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const splits: SplitText[] = [];

    // ── 1. Parallax Speed Animations for Image Wrappers ─────────────────
    const wraps = gsap.utils.toArray<HTMLElement>(".parallax_image-wrap");
    const speeds = [10, 7, 12, 5, 9, 6.5];

    wraps.forEach((wrap, index) => {
      const speed = speeds[index] || 6;

      // Outer wrapper movement
      gsap.to(wrap, {
        yPercent: speed * -50,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // Inner media (image/video) movement (in opposite direction to feel deeper)
      const innerMedia = wrap.querySelector(".parallax_image");
      if (innerMedia) {
        gsap.fromTo(
          innerMedia,
          { yPercent: 0 },
          {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );
      }
    });

    // ── 2. Text Reveal Animations inside Sticky Overlay ─────────────────
    const titleSplit = SplitText.create(".parallax-title", {
      type: "lines",
      mask: "lines",
      linesClass: "split-line-outer",
    });
    splits.push(titleSplit);

    gsap.from(titleSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -10,
      transformOrigin: "0% 50% -50px",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".parallax-title",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".parallax-eyebrow", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".parallax-eyebrow",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    // ── 3. Smooth background color transition based on scroll position ────
    // ── 3. Smooth background and text color transition when section is about to end ──
    const colorTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom 200%", // Start when bottom is 100% below viewport
        end: "bottom 100%", // End when bottom reaches viewport bottom
        scrub: true,
      },
    });

    colorTl.to(containerRef.current, {
      backgroundColor: "#ffffff",
      ease: "none",
    }, 0);

    colorTl.to(".parallax-title", {
      color: "#000000",
      ease: "none",
    }, 0);

    colorTl.to(".parallax-eyebrow", {
      color: "rgba(0, 0, 0, 0.6)",
      ease: "none",
    }, 0);

    colorTl.to(".gradient-line-divide", {
      "--divider-color": "rgba(0, 0, 0, 0.1)",
      ease: "none",
    }, 0);

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="section_parallax theme-dark w-full relative"
    >
      {/* Encapsulated internal styling to replicate Webflow's CSS exactly */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .section_parallax.theme-dark {
          background-color: #000;
        }
        .parallax_component {
          display: grid;
          position: relative;
          grid-column-gap: 0.5rem;
          grid-row-gap: 0.5rem;
          grid-template-rows: auto;
          grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr;
          grid-auto-columns: 1fr;
          height: 250vh;
        }
        @media screen and (max-width: 479px) {
          .parallax_component {
            grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr;
          }
        }
        .parallax_content {
          text-align: center;
          flex-flow: column;
          justify-content: flex-start;
          align-items: center;
          height: 250vh;
          display: flex;
          position: absolute;
          inset: 0%;
          z-index: 10;
          pointer-events: none;
        }
        .parallax_link-wrap {
          max-width: 60ch;
          text-decoration: none;
          pointer-events: auto;
          cursor: pointer;
        }
        .parallax_overlay {
          flex-flow: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          display: flex;
          position: sticky;
          top: 0;
          overflow: hidden;
          width: 100%;
        }
        .parallax_image-col {
          height: 150vh;
          margin-top: 50vh;
          margin-bottom: 50vh;
          display: flex;
          flex-direction: column;
        }
        .gradient-line-divide {
          z-index: 40;
          --divider-color: rgba(255, 255, 255, 0.2);
          background-image: linear-gradient(rgba(255, 255, 255, 0), var(--divider-color) 20% 80%, rgba(255, 255, 255, 0));
          width: 1px;
          height: 100%;
          position: relative;
        }
        .parallax_image-wrap {
          aspect-ratio: 1;
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .parallax_image-wrap.is-1 {
          aspect-ratio: 213/352;
          margin-top: 100vh;
        }
        .parallax_image-wrap.is-2 {
          aspect-ratio: 213/435;
          margin-top: 50vh;
        }
        .parallax_image-wrap.is-3 {
          aspect-ratio: 213/261;
          margin-top: 130vh;
        }
        .parallax_image-wrap.is-4 {
          aspect-ratio: 213/132;
          margin-top: 80vh;
        }
        .parallax_image-wrap.is-5 {
          aspect-ratio: 213/266;
          margin-top: 110vh;
        }
        .parallax_image-wrap.is-6 {
          aspect-ratio: 213/287;
          margin-top: 80vh;
        }
        .parallax_image {
          z-index: 2;
          object-fit: cover;
          width: 100%;
          height: 130%; /* extra height to allow smooth GSAP scrolling without gaps */
          position: absolute;
          top: -15%;
          left: 0;
        }
        
        /* Typography replication */
        .parallax-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5.5vw, 4.2rem);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.04em;
          color: #fff;
          
        }
        .split-line-outer {
          padding-bottom: 0.18em;
          margin-bottom: -0.18em;
        }
        .parallax-eyebrow {
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 400;
          text-transform: uppercase;
          color: #fff;
          display: flex;
          align-items: center;
        }
        
      `}} />

      <div className="px-8 md:px-16 w-full max-w-[120rem] mx-auto">
        <div className="parallax_component">

          {/* Column 1 - Crisis Video */}
          <div className="parallax_image-col">
            <div className="parallax_image-wrap is-1">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                suppressHydrationWarning
                poster="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7a7e0b906dca269a766_CRISIS%20PRT1-mp4%20Comp%201_1-poster-00001.jpg"
                className="parallax_image"
              >
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7a7e0b906dca269a766_CRISIS%20PRT1-mp4%20Comp%201_1-transcode.mp4" type="video/mp4" />
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7a7e0b906dca269a766_CRISIS%20PRT1-mp4%20Comp%201_1-transcode.webm" type="video/webm" />
              </video>
            </div>
          </div>

          <div className="gradient-line-divide"></div>

          {/* Column 2 - LG Video */}
          <div className="parallax_image-col">
            <div className="parallax_image-wrap is-2">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                suppressHydrationWarning
                poster="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7eb7bbb5f98f878e6b7_LG%20-%20photoreal%20fast-mp4%20Comp%201-poster-00001.jpg"
                className="parallax_image"
              >
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7eb7bbb5f98f878e6b7_LG%20-%20photoreal%20fast-mp4%20Comp%201-transcode.mp4" type="video/mp4" />
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7eb7bbb5f98f878e6b7_LG%20-%20photoreal%20fast-mp4%20Comp%201-transcode.webm" type="video/webm" />
              </video>
            </div>
          </div>

          <div className="gradient-line-divide"></div>

          {/* Column 3 - Dude Process Video */}
          <div className="parallax_image-col">
            <div className="parallax_image-wrap is-3">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                suppressHydrationWarning
                poster="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe869756d11a7c52e93c5_the%20dude%20process_01-mp4%20Comp%201-poster-00001.jpg"
                className="parallax_image"
              >
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe869756d11a7c52e93c5_the%20dude%20process_01-mp4%20Comp%201-transcode.mp4" type="video/mp4" />
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe869756d11a7c52e93c5_the%20dude%20process_01-mp4%20Comp%201-transcode.webm" type="video/webm" />
              </video>
            </div>
          </div>

          <div className="gradient-line-divide"></div>

          {/* Column 4 - Balloon Image */}
          <div className="parallax_image-col">
            <div className="parallax_image-wrap is-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34/6852dac5ffc41d70c5599402_balloon-Image.webp"
                alt="Balloon"
                className="parallax_image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 5 - Get Started Image 4 (Hidden on mobile portrait) */}
          <div className="gradient-line-divide max-[479px]:hidden"></div>
          <div className="parallax_image-col max-[479px]:hidden">
            <div className="parallax_image-wrap is-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34/6798b7ef9b639d68cf609006_Get%20Started%20Image%204.webp"
                alt="Get Started artwork"
                className="parallax_image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 6 - Tourism Video (Hidden on mobile portrait) */}
          <div className="gradient-line-divide max-[479px]:hidden"></div>
          <div className="parallax_image-col max-[479px]:hidden">
            <div className="parallax_image-wrap is-6">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                suppressHydrationWarning
                poster="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7c46bfd598b9144591f_COV%20-%20Tourism--mp4%20Comp%201_1-poster-00001.jpg"
                className="parallax_image"
              >
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7c46bfd598b9144591f_COV%20-%20Tourism--mp4%20Comp%201_1-transcode.mp4" type="video/mp4" />
                <source src="https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34%2F684fe7c46bfd598b9144591f_COV%20-%20Tourism--mp4%20Comp%201_1-transcode.webm" type="video/webm" />
              </video>
            </div>
          </div>

          {/* Center Sticky Overlay Text content */}
          <div className="parallax_content">
            <div className="parallax_overlay">
              <a
                data-cursor="Make it happen"
                href="/contact"
                className="parallax_link-wrap flex flex-col items-center justify-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="parallax-eyebrow">
                    <span className="parallax-eyebrow-dot" />
                    <span>Get Started</span>
                  </div>
                  <h2 className="parallax-title">
                    Let’s make things happen.
                  </h2>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
