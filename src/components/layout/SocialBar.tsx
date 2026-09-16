"use client";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const socialLinks = [
  { id: 1, iconPath: "/images/SocialIcons/Fb.png", url: "https://www.facebook.com/adaptsmedia/", alt: "Facebook" },
  { id: 2, iconPath: "/images/SocialIcons/X.png", url: "https://x.com/adaptsmedia", alt: "Twitter/X" },
  { id: 3, iconPath: "/images/SocialIcons/Insta.png", url: "https://www.instagram.com/adaptsmedia/?hl=en", alt: "Instagram" },
  { id: 4, iconPath: "/images/SocialIcons/LinkedIN.png", url: "https://www.linkedin.com/company/adaptsmedia/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ae", alt: "LinkedIn" },
  { id: 5, iconPath: "/images/SocialIcons/YT.png", url: "https://www.youtube.com/@AdaptsMedia", alt: "YouTube" },
];

interface SocialBarProps {
  className?: string;
}

const SocialBar = ({ className = "bg-transparent" }: SocialBarProps) => {
  const barRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const heading = barRef.current?.querySelector(".social-heading");
    const icons = barRef.current?.querySelectorAll(".social-icon-btn");

    if (!heading || !icons?.length) return;

    gsap.set(heading, { opacity: 0, y: 30 });
    gsap.set(icons, { opacity: 0, scale: 0, y: 40, rotate: -30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      }
    });

    tl.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(icons, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "back.out(1.7)"
    }, "-=0.2");
  }, { scope: barRef });

  return (
    <section ref={barRef} className={`social-bar-container w-full py-2 sm:py-3 md:py-4 flex items-center justify-center ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-10 lg:gap-14">
        <h3 className="social-heading text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-thin tracking-wide">
          Follow us @
        </h3>
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {socialLinks.map((social) => (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="social-icon-btn w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center 
                         rounded-full border border-white text-white
                         transition-colors duration-300 hover:border-white will-change-[transform,opacity]"
            >
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7">
                <Image
                  src={social.iconPath}
                  alt={social.alt}
                  fill
                  sizes="(max-width: 768px) 20px, 32px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialBar;