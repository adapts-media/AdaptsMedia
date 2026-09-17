"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const navLinks = [
  { name: "Home", href: "/", number: "01", image: "/images/portfolio/Hero.png" },
  { name: "Services", href: "/services", number: "02", image: "/images/BrandingCreative/HeroImage.png" },
  { name: "Work", href: "/portfolio", number: "03", image: "/images/portfolio/Target Hit.L03.2k 1.png" },
  { name: "About", href: "/about-us", number: "04", image: "/images/portfolio/Layer 1.png" },
  { name: "Insights", href: "/blogs", number: "05", image: "/images/BrandingCreative/DesignSystemLogoBg.png" },
  { name: "Contact", href: "/contact", number: "06", image: "/images/ContactIcon.png" },
];

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/adaptsmedia/?hl=en" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/adaptsmedia/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ae" },
  { name: "Twitter", href: "https://x.com/adaptsmedia" },
  { name: "YouTube", href: "https://www.youtube.com/@AdaptsMedia" },
];

function MenuLink({ 
  link, 
  onClose, 
  setHoveredLink, 
  linkVariants 
}: { 
  link: any; 
  onClose: () => void; 
  setHoveredLink: (name: string | null) => void;
  linkVariants: any;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!textRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    gsap.to(textRef.current, { x, y, duration: 0.5, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    if (!textRef.current) return;
    gsap.to(textRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <div className="overflow-hidden relative group -my-4 md:-my-6">
      <motion.div variants={linkVariants as any} className="flex items-start md:items-center gap-4 md:gap-8">
        <span className="text-sm md:text-lg font-light text-white/30 font-sans mt-2 md:mt-0 transition-colors duration-300 group-hover:text-[#FAC02D]">
          {link.number}
        </span>
        <Link 
          href={link.href}
          onClick={onClose}
          onMouseEnter={() => setHoveredLink(link.name)}
          onMouseLeave={() => {
            setHoveredLink(null);
            handleMouseLeave();
          }}
          onMouseMove={handleMouseMove}
          className="text-[12vw] md:text-[7vw] lg:text-[6vw] font-heading leading-[0.9] font-medium tracking-tight text-white/80 transition-colors duration-500 hover:text-white relative inline-block py-4 md:py-6"
        >
          <span ref={textRef} className="inline-block relative z-10">{link.name}</span>
          {/* Hover line */}
          <div className="absolute top-1/2 -left-8 w-0 h-[3px] bg-[#FAC02D] -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-[120%] group-hover:left-[-10%] z-0 opacity-0 group-hover:opacity-100 mix-blend-difference pointer-events-none"></div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function FullscreenMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const overlayVariants = {
    closed: { opacity: 0, clipPath: "circle(0% at 100% 0%)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    open: { opacity: 1, clipPath: "circle(150% at 100% 0%)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
  };

  const containerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
  };

  const linkVariants = {
    closed: { y: "120%", opacity: 0, rotate: 5 },
    open: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const rightSideVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 } }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants as any}
          className="fixed inset-0 z-[950] w-full h-full bg-[#050505] text-white flex pointer-events-auto"
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/images/noise.png')" }}></div>
          
          {/* Subtle Ambient Light Leaks */}
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-[#C52A27]/20 to-[#FAC02D]/10 blur-[120px] pointer-events-none z-0"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-l from-[#3b6ef5]/10 to-[#FAC02D]/10 blur-[100px] pointer-events-none z-0"></div>

          {/* Hover Preview Images */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 transition-opacity duration-700">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoveredLink === link.name ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
              >
                <Image src={link.image} alt={link.name} fill className="object-cover blur-sm" />
                <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-md"></div>
              </div>
            ))}
          </div>

          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-12 pt-32 pb-12 flex flex-col lg:flex-row justify-between h-full">
            
            {/* LEFT SIDE - Huge Links */}
            <motion.div 
              variants={containerVariants as any}
              className="flex flex-col justify-center gap-2 md:gap-4 lg:gap-6 w-full lg:w-2/3 h-full"
            >
              {navLinks.map((link) => (
                <MenuLink 
                  key={link.name} 
                  link={link} 
                  onClose={onClose} 
                  setHoveredLink={setHoveredLink} 
                  linkVariants={linkVariants} 
                />
              ))}
            </motion.div>

            {/* RIGHT SIDE - Agency Details */}
            <motion.div 
              variants={rightSideVariants as any}
              className="hidden lg:flex flex-col justify-end w-1/3 pb-12 pl-12 border-l border-white/10 relative"
            >
              {/* Decorative line */}
              <div className="absolute left-0 top-0 w-[1px] h-0 bg-gradient-to-b from-transparent via-[#FAC02D]/40 to-transparent transition-all duration-1000 group-hover:h-full"></div>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FAC02D]">The Agency</h4>
                  <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed font-sans max-w-sm">
                    Crafting digital experiences that bridge the gap between imagination and reality.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FAC02D]">Get in touch</h4>
                  <div className="space-y-1.5">
                    <a href="mailto:info@adaptsmedia.com" className="text-xl md:text-2xl font-light text-white hover:text-[#FAC02D] transition-colors duration-300 block">
                      info@adaptsmedia.com
                    </a>
                    <a href="tel:+971585601701" className="text-xl md:text-2xl font-light text-white hover:text-[#FAC02D] transition-colors duration-300 block">
                      +971-58-560-1701
                    </a>
                  </div>
                  <p className="text-sm text-white/50 font-light max-w-[250px]">
                    702, Warsan Tower, Tecom, Barsha Heights, Dubai, UAE
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FAC02D]">Socials</h4>
                  <ul className="flex gap-6">
                    {socials.map((social) => (
                      <li key={social.name}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-white/70 hover:text-[#FAC02D] transition-colors duration-300 relative group overflow-hidden inline-block"
                        >
                          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{social.name}</span>
                          <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-[#FAC02D]">{social.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
