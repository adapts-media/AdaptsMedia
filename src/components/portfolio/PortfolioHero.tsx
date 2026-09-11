"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const COPY = {
  portfolio: {
    heading: (
      <>
        Work That <br />
        Delivers Results
      </>
    ),
    subheading:
      "Explore the brands, campaigns, and digital experiences we've created to drive growth, engagement, and measurable impact.",
  },
  "case-studies": {
    heading: (
      <>
        Real Brands. <br />
        Real Results.
      </>
    ),
    subheading:
      "Deep dives into the challenges we solved, the strategies we built, and the measurable impact we delivered for our clients.",
  },
} as const;

interface PortfolioHeroProps {
  variant?: keyof typeof COPY;
}

const PortfolioHero = ({ variant = "portfolio" }: PortfolioHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const copy = COPY[variant];

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // 1. Text reveals
    const headingSplit = SplitText.create(".hero-heading", {
      type: "lines",
      mask: "lines",
    });
    splits.push(headingSplit);

    gsap.from(headingSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -15,
      transformOrigin: "0% 50% -100px",
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.12,
    });

    const subSplit = SplitText.create(".hero-subheading", {
      type: "words",
      mask: "words",
    });
    splits.push(subSplit);

    gsap.from(subSplit.words, {
      yPercent: 100,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.03,
      delay: 0.25,
    });

    // 2. Entrance for right-side visual assets
    gsap.fromTo(".hero-target",
      { scale: 0.2, rotate: -20, opacity: 0, z: 50 },
      { scale: 1, rotate: 0, opacity: 1, z: 50, duration: 1.3, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo(".hero-pattern",
      { scale: 0.6, opacity: 0, z: -50 },
      { scale: 1, opacity: 1, z: -50, duration: 1.1, ease: "power3.out", delay: 0.15 }
    );

    // 3. Ambient floating animations
    gsap.to(".hero-target", {
      y: "-=15",
      rotation: 1.5,
      z: 50,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#d61e1b] flex items-center justify-center py-20 text-white"
    >
      {/* Hero Background Image */}
      <Image
        src="/images/portfolio/Hero.png"
        alt="Hero Background"
        fill
        priority={true}
        sizes="100vw"
        quality={95}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      {/* Hero Content */}
      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 lg:px-20 items-center mt-12 lg:mt-0">
        {/* Left Side - Text */}
        <div className="flex flex-col justify-center text-left">
          <h1 className="hero-heading text-[clamp(38px,5.5vw,68px)] font-heading font-medium tracking-normal leading-[1.12] text-white font-sans max-w-xl">
            {copy.heading}
          </h1>
          <p className="hero-subheading text-[clamp(16px,1.8vw,24px)] font-heading font-light leading-snug text-white/90 max-w-[520px] mt-6">
            {copy.subheading}
          </p>
        </div>

        {/* Right Side - Images */}
        <div className="relative w-full flex items-center justify-center lg:justify-end min-h-[350px] md:min-h-[500px]">
          {/* Main container that aligns Layer 1 behind the target */}
          <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center" style={{ perspective: 1000, transformStyle: "preserve-3d" }}>
            {/* Dot pattern/Stars layer (Layer 1.png) - static background */}
            <div className="hero-pattern absolute w-[80%] h-[80%] pointer-events-none z-0">
              <Image
                src="/images/portfolio/Layer 1.png"
                alt=""
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            {/* Target Dart image (Target Hit.L03.2k 1.png) - interactive overlay */}
            <div className="hero-target relative w-[92%] h-[92%] z-10">
              <Image
                src="/images/portfolio/Target Hit.L03.2k 1.png"
                alt="Target Hit"
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
