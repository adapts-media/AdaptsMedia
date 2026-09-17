"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const ContactHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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
      ease: "expo.out",
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
      ease: "expo.out",
      stagger: 0.03,
      delay: 0.25,
    });

    // 2. Entrance for right-side visual assets
    gsap.fromTo(".hero-target",
      { scale: 0.1, rotate: -35, opacity: 0, z: 50 },
      { scale: 1, rotate: 0, opacity: 1, z: 50, duration: 1.5, ease: "elastic.out(0.8, 0.6)", delay: 0.35 }
    );

    gsap.fromTo(".hero-pattern",
      { scale: 0.6, opacity: 0, z: -50 },
      { scale: 1, opacity: 1, z: -50, duration: 1.2, ease: "power3.out", delay: 0.15 }
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
      className="relative w-full min-h-[75vh] md:min-h-[100vh] flex items-center justify-center pt-32 pb-24 overflow-hidden"
      style={{
        backgroundImage: "url('/images/BrandingCreative/DesignSystemsBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] mx-auto px-8 md:px-16 lg:px-20 w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side Text */}
        <div className="flex-1 text-white z-20">
          <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
            Let's Build<br />
            What's Next
          </h1>
          <p className="hero-subheading text-base md:text-lg text-white max-w-md leading-relaxed">
            Whether you’re launching something new or taking your business to the next level, we’re here to make it happen. Reach out to start the conversation.
          </p>
        </div>

        {/* Right Side Images */}
        <div className="flex-1 relative flex items-center justify-center md:justify-end w-full max-w-[420px] aspect-square z-20" style={{ perspective: 1000, transformStyle: "preserve-3d" }}>
          {/* Background Pattern */}
          <div className="hero-pattern absolute inset-0 w-full h-full flex items-center justify-center">
            <Image
              src="/images/BrandingCreative/DesignSystemLogoBg.png"
              alt="Background Pattern"
              width={400}
              height={400}
              className="object-contain w-[65%] h-[65%]"
            />
          </div>
          {/* Main Icon */}
          <div className="hero-target absolute inset-0 w-full h-full flex items-center justify-center z-10 drop-shadow-2xl">
            <Image
              src="/images/ContactIcon.png"
              alt="Contact Icon"
              width={500}
              height={500}
              className="object-contain w-[80%] h-[80%]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
