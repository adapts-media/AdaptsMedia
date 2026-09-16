"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaArrowUp,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa6";
import SocialBar from "@/components/layout/SocialBar";
import { useLenis } from 'lenis/react';

export default function Footer() {
  const lenis = useLenis();
  const footerRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  const [isCopied, setIsCopied] = useState(false);

  // Smooth Back to Top Scroll
  const handleBackToTop = () => {
    if (backToTopRef.current) {
      gsap.to(backToTopRef.current.querySelector(".top-arrow"), {
        rotate: -360,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@adaptsmedia.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#064ED3] text-white font-sans overflow-hidden selection:bg-white selection:text-[#064ED3]"
    >
      {/* Background Texture System — Matches BlueSection & ServicesSection */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#064ED3] to-[#050b18]" />
        <Image
          src="/images/Services_Bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute pointer-events-none object-cover opacity-50 mix-blend-overlay"
        />
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#0052FF]/25 rounded-full blur-[140px]" />
      </div>

      {/* ========================================================================= */}
      {/* SOCIAL BAR SECTION (Compact Height) */}
      {/* ========================================================================= */}
      <section className="relative z-20 py-8 sm:py-10 md:py-12 w-full flex items-center justify-center">
        <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-6 sm:px-8 md:px-16 flex items-center justify-center">
          <SocialBar />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER GRID LAYOUT WITH AWARDS */}
      {/* ========================================================================= */}
      <section
        className="relative w-full pt-12 pb-10 bg-[#16171b] border-t border-white/10 text-white z-20"
      >
        <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 mx-auto">
          {/* Top Row: Logo & Social Icons */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 mb-10 border-b border-white/10">
            {/* Logo */}
            <Link href="/" className="group inline-block">
              <div className="relative w-52 h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/footerlogo.png"
                  alt="Adapts Media Logo"
                  fill
                  sizes="(max-width: 768px) 208px, 208px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Top Right Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { name: "Facebook", icon: <FaFacebookF className="w-3.5 h-3.5" />, href: "https://www.facebook.com/adaptsmedia/" },
                { name: "Twitter / X", icon: <FaXTwitter className="w-3.5 h-3.5" />, href: "https://x.com/adaptsmedia" },
                { name: "Instagram", icon: <FaInstagram className="w-3.5 h-3.5" />, href: "https://www.instagram.com/adaptsmedia/?hl=en" },
                { name: "LinkedIn", icon: <FaLinkedinIn className="w-3.5 h-3.5" />, href: "https://www.linkedin.com/company/adaptsmedia/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ae" },
                { name: "YouTube", icon: <FaYoutube className="w-3.5 h-3.5" />, href: "https://www.youtube.com/@AdaptsMedia" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start mb-12">
            
            {/* COLUMN 1: About Us & Services (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col space-y-6">
              <Link href="/about-us" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                About Us
              </Link>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Services</h4>
                <ul className="space-y-2 text-xs text-white/70 font-light">
                  <li><Link href="/performance-marketing#sem-google-ads" className="hover:text-white transition-colors">SEM Agency</Link></li>
                  <li><Link href="/strategy-consulting#data-analytics" className="hover:text-white transition-colors">Best Data Analytics Services</Link></li>
                  <li><Link href="/branding-creative#visual-design" className="hover:text-white transition-colors">Creative Designing</Link></li>
                  <li><Link href="/search-engine-optimization" className="hover:text-white transition-colors">SEO Services</Link></li>
                  <li><Link href="/social-content#sms-marketing" className="hover:text-white transition-colors">SMS Campaign</Link></li>
                  <li><Link href="/social-content#social-media-management" className="hover:text-white transition-colors">Social Media Marketing</Link></li>
                  <li><Link href="/web-digital-experience#web-development" className="hover:text-white transition-colors">Web Development</Link></li>
                  <li><Link href="/performance-marketing#display-campaigns" className="hover:text-white transition-colors">Display Campaign Management</Link></li>
                  <li><Link href="/performance-marketing#programmatic-advertising" className="hover:text-white transition-colors">Programmatic Advertising</Link></li>
                  <li><Link href="/performance-marketing#adops-solutions" className="hover:text-white transition-colors">Ad Operations for Advertising Agencies</Link></li>
                </ul>
              </div>
            </div>

            {/* COLUMN 2: Clients & Our Work & Head Office (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col space-y-6">
              <Link href="/portfolio" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                Clients &amp; Our Work
              </Link>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Head Office - Dubai</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                  702, Warsan Tower, Near Media Rotana,<br />
                  Tecom, Barsha Heights, Dubai,<br />
                  United Arab Emirates
                </p>
                <div className="text-xs text-white/70 leading-relaxed font-light space-y-1">
                  <p>Contact Number: +971 58 560 1701</p>
                  <p>Landline: +971 043257279</p>
                  <p>
                    Email:{" "}
                    <button onClick={handleCopyEmail} className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-left cursor-pointer">
                      <span>Info@adaptsmedia.com</span>
                      {isCopied && <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Copied!</span>}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Meet The Team, Blog, Other Location (lg:col-span-2) */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <Link href="/about-us" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                Meet The Team
              </Link>

              <div>
                <Link href="/blogs" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors block mb-3">
                  Blog
                </Link>
                <h4 className="text-sm font-semibold text-white mb-3">Other Location</h4>
                <ul className="space-y-1.5 text-xs text-white/70 font-light">
                  <li><Link href="/contact" className="hover:text-white transition-colors">India</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Philippines</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">London</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">United States</Link></li>
                </ul>
              </div>
            </div>

            {/* COLUMN 4: Contact Us & Locations (lg:col-span-1) */}
            <div className="lg:col-span-1 flex flex-col space-y-6">
              <Link href="/contact" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                Contact Us
              </Link>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Locations</h4>
                <ul className="space-y-1.5 text-xs text-white/70 font-light whitespace-nowrap">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Dubai</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">India</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Philippines</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">London</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">United States</Link></li>
                </ul>
              </div>
            </div>

            {/* COLUMN 5: Awards Section (lg:col-span-3) */}
            <div className="w-full md:col-span-2 lg:col-span-3 flex flex-col items-start space-y-4">
              <h4 className="text-sm font-semibold text-white">Awards</h4>

              {/* Awards Box */}
              <div className="w-full bg-white/[0.03] border border-white/15 rounded-xl p-2.5 sm:p-3 xl:p-4 grid grid-cols-4 items-center gap-1.5 sm:gap-2 shadow-lg backdrop-blur-md overflow-hidden">
                {[
                  { name: "TechBehemoths 2025 Winner", src: "/images/techbehemoths.png" },
                  { name: "Clutch Top Digital Marketing", src: "/images/digitalmarketing.png" },
                  { name: "Clutch Top Web Developers", src: "/images/webdevelopment.png" },
                  { name: "Clutch Top Technical SEO", src: "/images/technicalseo.png" },
                ].map((award, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-[4/5] max-w-[56px] sm:max-w-[64px] mx-auto hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={award.src}
                      alt={award.name}
                      fill
                      sizes="(max-width: 640px) 20vw, 80px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Icon Buttons under Awards Box */}
              <div className="w-full flex items-center justify-end gap-3 pt-2">
                {[
                  { icon: <FaGlobe className="w-3.5 h-3.5" />, href: "#" },
                  { icon: <FaPhone className="w-3.5 h-3.5" />, href: "tel:+971585601701" },
                  { icon: <FaEnvelope className="w-3.5 h-3.5" />, href: "mailto:info@adaptsmedia.com" },
                  { icon: <FaPaperPlane className="w-3.5 h-3.5" />, href: "/contact" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white transition-all duration-300"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
            {/* Left */}
            <div>
              <p>© 2026 Adapts Media® | All Rights Reserved.</p>
            </div>

            {/* Right: Privacy Policy & Terms */}
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms And Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}