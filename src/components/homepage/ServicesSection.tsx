"use client"

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger, SplitText } from "gsap/all"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import ArrowButton from "../buttons/ArrowButton"
import YellowButton from "../buttons/YellowButton"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ServiceItem {
  name: string
  href: string
}

interface ServiceCategory {
  number: string
  title: string
  href: string
  items: ServiceItem[]
}

const services: ServiceCategory[] = [
  {
    number: "01",
    title: "Performance<br />Marketing",
    href: "/performance-marketing",
    items: [
      { name: "Affiliate Channels", href: "/performance-marketing#affiliate-marketing" },
      { name: "Cost Per Action", href: "/performance-marketing#performance-marketing" },
      { name: "ROI Model", href: "/performance-marketing#media-planning" },
    ],
  },
  {
    number: "02",
    title: "Social &<br />Content",
    href: "/social-content",
    items: [
      { name: "Content Strategy", href: "/social-content#content-strategy" },
      { name: "Leverage Influencers", href: "/social-content#influencer-marketing" },
      { name: "Paid Social", href: "/social-content#paid-social" },
    ],
  },
  {
    number: "03",
    title: "Web & Digital<br />Experience",
    href: "/web-digital-experience",
    items: [
      { name: "UX/UI", href: "/web-digital-experience#ux-ui" },
      { name: "Front & Back End", href: "/web-digital-experience#web-development" },
      { name: "API Integration", href: "/web-digital-experience#api-integration" },
    ],
  },
  {
    number: "04",
    title: "Branding &<br />Creative",
    href: "/branding-creative",
    items: [
      { name: "Identity", href: "/branding-creative#identity" },
      { name: "Campaigns", href: "/branding-creative#campaigns" },
      { name: "Design Systems", href: "/branding-creative#design-systems" },
    ],
  },
  {
    number: "05",
    title: "Public Relations<br />& Activations",
    href: "/public-relations",
    items: [
      { name: "Strategic PR", href: "/public-relations#strategic-pr" },
      { name: "Press Releases", href: "/public-relations#press-releases" },
      { name: "Events and Activation", href: "/public-relations#events-activation" },
    ],
  },
  {
    number: "06",
    title: "Strategy &<br />Consulting",
    href: "/strategy-consulting",
    items: [
      { name: "Industry and Competitor Analysis", href: "/strategy-consulting#industry-analysis" },
      { name: "Tailor-made Growth Strategies", href: "/strategy-consulting#growth-strategies" },
      { name: "Targeted Ads and Email Campaigns", href: "/strategy-consulting#targeted-campaigns" },
    ],
  },
]

// ─── Arrow SVG ────────────────────────────────────────────────────────────────

const ArrowSVG = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      fill="currentColor"
    />
  </svg>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const cleanups: (() => void)[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = []


    // ── 1. SplitText setup ───────────────────────────────────────────────────
    const headingSplit = SplitText.create(".services-heading", {
      type: "lines",
      mask: "lines",
    })
    splits.push(headingSplit)

    const cardTitleSplits: any[] = []
    gsap.utils.toArray<HTMLElement>(".service-card-title").forEach((title) => {
      const split = SplitText.create(title, { type: "words", mask: "words" })
      splits.push(split)
      cardTitleSplits.push(split)
    })

    // ── 2. Set INITIAL HIDDEN STATES immediately on mount ────────────────────
    gsap.set(headingSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -12,
      transformOrigin: "0% 50% -60px",
    })

    gsap.set(".services-subtitle", {
      opacity: 0,
      y: 28,
    })

    gsap.set(".service-card", {
      opacity: 0,
      y: isMobile ? 35 : 70,
      rotationX: isMobile ? 0 : 22,
      rotationY: (i: number) => (isMobile ? 0 : i % 2 === 0 ? -6 : 6),
      scale: 0.94,
      transformOrigin: "center top",
    })

    gsap.set(".service-number", {
      opacity: 0,
      x: -20,
      scale: 0.75,
    })

    cardTitleSplits.forEach((split) => {
      gsap.set(split.words, {
        yPercent: 100,
        opacity: 0,
      })
    })

    gsap.set(".service-divider", {
      scaleX: 0,
      transformOrigin: "left center",
    })

    gsap.set(".services-cta-buttons > *", {
      opacity: 0,
      y: 30,
      scale: 0.96,
    })

    // ── 3. Heading — SplitText line mask reveal (Scroll-Interactive) ─────────
    gsap.to(headingSplit.lines, {
      yPercent: 0,
      opacity: 1,
      rotationX: 0,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".services-heading",
        start: "top bottom-=40",
        end: "top 65%",
        scrub: 1.2,
      },
    })

    // ── 4. Subtitle fade-up (Scroll-Interactive) ────────────────────────────
    gsap.to(".services-subtitle", {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".services-heading",
        start: "top bottom-=20",
        end: "top 65%",
        scrub: 1.2,
      },
    })

    // ── 5. Master Services Grid Scroll-Scrub Timeline ──────────────────────
    const servicesTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top bottom-=20",
        end: "bottom 75%",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    })

    // A. Service Cards (Slide, Fade & 3D Tilt)
    servicesTl.to(
      ".service-card",
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        stagger: 0.15,
        ease: "power1.out",
      },
      0.0
    )

    // B. Service Numbers
    gsap.utils.toArray<HTMLElement>(".service-number").forEach((num, i) => {
      servicesTl.to(
        num,
        {
          opacity: 0.5,
          x: 0,
          scale: 1,
          ease: "back.out(1.7)",
        },
        0.1 + i * 0.08
      )
    })

    // C. Card Title Word Reveal
    cardTitleSplits.forEach((split, i) => {
      servicesTl.to(
        split.words,
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "power1.out",
        },
        0.2 + i * 0.08
      )
    })

    // D. Divider Line Draw-In
    servicesTl.to(
      ".service-divider",
      {
        scaleX: 1,
        stagger: 0.05,
        ease: "power1.out",
      },
      0.1
    )

    // E. CTA Buttons Fade-Up
    servicesTl.to(
      ".services-cta-buttons > *",
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        ease: "back.out(1.4)",
      },
      0.8
    )

    // ── 9. Item row hover (desktop, remains trigger-based) ─────────────────
    if (!isMobile) {
      gsap.utils.toArray<HTMLElement>(".service-item-row").forEach((row) => {
        const arrow = row.querySelector<HTMLElement>(".service-item-arrow")
        const text = row.querySelector<HTMLElement>(".service-item-text")
        if (!arrow || !text) return
        gsap.set(arrow, { x: 0, rotation: 0 })

        const onEnter = () => {
          gsap.to(row, { backgroundColor: "rgba(255,255,255,0.07)", duration: 0.25, ease: "power2.out" })
          gsap.to(arrow, { x: 5, rotation: 45, scale: 1.2, duration: 0.3, ease: "back.out(2)" })
          gsap.to(text, { opacity: 1, x: 3, duration: 0.2, ease: "power2.out" })
        }
        const onLeave = () => {
          gsap.to(row, { backgroundColor: "rgba(255,255,255,0)", duration: 0.35, ease: "power3.out" })
          gsap.to(arrow, { x: 0, rotation: 0, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" })
          gsap.to(text, { opacity: 0.85, x: 0, duration: 0.25, ease: "power2.out" })
        }

        row.addEventListener("mouseenter", onEnter)
        row.addEventListener("mouseleave", onLeave)
        cleanups.push(() => {
          row.removeEventListener("mouseenter", onEnter)
          row.removeEventListener("mouseleave", onLeave)
        })
      })
    }

    if (!isMobile && sectionRef.current) {
      const goldBtn = sectionRef.current.querySelector<HTMLElement>(".btn-start-project")
      if (goldBtn) {
        // Slow, heavy lag — button trails the cursor like a weighted magnet
        const gxTo = gsap.quickTo(goldBtn, "x", { duration: 0.7, ease: "power1.out" })
        const gyTo = gsap.quickTo(goldBtn, "y", { duration: 0.7, ease: "power1.out" })
        const onMove = (e: MouseEvent) => {
          const r = goldBtn.getBoundingClientRect()
          // Increase displacement from 0.3 to 0.55 so the button follows further
          gxTo((e.clientX - r.left - r.width / 2) * 0.55)
          gyTo((e.clientY - r.top - r.height / 2) * 0.55)
        }
        const onLeave = () => { gxTo(0); gyTo(0) }
        goldBtn.addEventListener("mousemove", onMove)
        goldBtn.addEventListener("mouseleave", onLeave)
        cleanups.push(() => {
          goldBtn.removeEventListener("mousemove", onMove)
          goldBtn.removeEventListener("mouseleave", onLeave)
        })
      }
    }

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cleanups.forEach((fn) => fn())
      splits.forEach((s) => s.revert())
    }
  }, { scope: sectionRef })

  // ─── JSX ──────────────────────────────────────────────────────────────────

  return (
    <section
      ref={sectionRef}
      className="bg-[#064ED3] relative text-white flex flex-col w-full items-start justify-start md:items-center md:justify-center py-20 font-sans overflow-hidden"
    >
      {/* Services Mask Group */}
      <Image
        src="/images/ServicesMaskNewPng.png"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="absolute z-10 pointer-events-none object-cover"
      />

      <div className="max-w-[1350px] 2xl:max-w-[1600px] z-50 w-full px-8 md:px-16">

        {/* Header */}
        <div className="mb-20">


          <h2 className="services-heading text-3xl md:text-6xl font-heading font-medium mb-8 leading-tight max-w-3xl">
            Services Designed to <br className="hidden md:block" /> Drive Growth
          </h2>

          <p className="services-subtitle text-[clamp(1rem,1.6vw,1.35rem)] max-w-3xl font-light leading-relaxed">
            End-to-end solutions built to help brands grow, connect, and <br className="hidden md:block" /> perform across every touchpoint.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 min-[1300px]:grid-cols-3 gap-x-12 gap-y-6 md:gap-y-16">
          {services.map((service, index) => (
            <div key={index} style={{ perspective: "900px" }}>
              <div
                className="service-card flex flex-col text-white"
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
                {/* Number & Title link to service page */}
                <Link href={service.href} className="no-underline text-white block group cursor-pointer">
                  {/* Number */}
                  <span
                    className="service-number text-7xl font-heading font-normal opacity-50 mb-[-12px] leading-none text-white blur-[2px] inline-block transition-opacity duration-300 group-hover:opacity-80"
                    style={{ marginLeft: "-32px" }}
                  >
                    {service.number}
                  </span>

                  {/* Title */}
                  <h3
                    className="service-card-title text-3xl md:text-[46px] font-heading font-light mb-8 leading-tight min-h-[6.5rem] md:min-h-[7.2rem] w-full transition-opacity duration-300 group-hover:opacity-90"
                    dangerouslySetInnerHTML={{ __html: service.title }}
                  />
                </Link>

                {/* Sub-items list linked to specific section anchors */}
                <div className="service-items-list flex flex-col">
                  {service.items.map((item, i) => (
                    <div key={i}>
                      <div className="service-divider border-t border-white/60" />
                      <Link
                        href={item.href}
                        className="service-item-row flex items-center justify-between py-3 px-2 no-underline text-white transition-colors block cursor-pointer"
                        style={{ borderRadius: "6px" }}
                      >
                        <span className="service-item-text text-[clamp(0.85rem,1.1vw,1.05rem)] font-heading font-light tracking-wide opacity-90">
                          {item.name}
                        </span>
                        <span className="service-item-arrow flex items-center justify-center">
                          <ArrowSVG className="w-5 h-5 md:w-6 md:h-6 rotate-45 rounded-full border border-white/40 p-1 md:p-1.5 text-white relative z-10" />
                        </span>
                      </Link>
                    </div>
                  ))}
                  <div className="service-divider border-t border-white/60 mb-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="services-cta-buttons flex flex-wrap justify-center gap-6 z-50">
        <div>
          <ArrowButton title="Explore All Services" href="/services" />
        </div>
        <div className="btn-start-project p-6 -m-6">
          <YellowButton title="Start a Project" variant="blue" href="/start-project" />
        </div>
      </div>
    </section>
  )
}

export default ServicesSection