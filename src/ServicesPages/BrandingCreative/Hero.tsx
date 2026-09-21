"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // Title line mask reveal
    const leftTitleSplit = SplitText.create(".hero-left-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(leftTitleSplit);

    gsap.from(leftTitleSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -10,
      transformOrigin: "0% 50% -50px",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
    });

    // Right subtitle line mask reveal
    const rightTitleSplit = SplitText.create(".hero-right-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(rightTitleSplit);

    gsap.from(rightTitleSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -10,
      transformOrigin: "0% 50% -50px",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.08,
      delay: 0.2,
    });

    // Description paragraph fade up
    gsap.from(".hero-desc", {
      y: 30,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      delay: 0.5,
    });

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-28 pb-16 text-white"
      style={{
        background: "radial-gradient(circle 850px at top left, #df382b 0%, #f08924 55%, transparent 100%), radial-gradient(circle 850px at bottom right, #df382b 0%, #f08924 55%, transparent 100%), #FAC02E",
      }}
    >
      {/* Globe Watermark in Right Bottom of Page */}
      <div className="absolute right-30 bottom-0 w-[280px] h-[280px] md:w-[420px] md:h-[420px] opacity-55 pointer-events-none z-0">
        <Image
          src="/images/Logo_01.png"
          alt="Adapts Globe Grid"
          fill
          sizes="(max-width: 768px) 420px, 620px"
          className="object-contain"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="grid grid-cols-1 z-10 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16">
        {/* Left Side */}
        <div className="flex items-center justify-start">
          <h1 className="hero-left-title text-5xl tracking-wide md:text-7xl font-opensans font-medium leading-[1.2] pb-4 text-left">
            Branding & <br/> Creative
          </h1>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col justify-center items-start text-left max-w-2xl mx-auto w-full">
          <h2 className="hero-right-title mb-6 text-3xl leading-snug md:text-5xl font-opensans font-normal leading-[1.2] pb-2 text-left w-full">
            Ideas That Earn Attention, <br /> Brands That Hold It
          </h2>
          <p className="hero-desc text-2xl font-opensans font-extralight leading-tight tracking-wide text-white text-left w-full">
            We build identities, creative systems, and production assets that make your brand impossible to ignore or forget.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Hero;