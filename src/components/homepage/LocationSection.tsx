"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger, SplitText } from "gsap/all"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const locations = [
  {
    city: "London",
    id: "london",
    address: "Surbiton KT5, London, UK",
    contact: "Email: Info@adaptsmedia.com"
  },
  {
    city: "United States",
    id: "us",
    address: "2807 Allen St Dallas, Texas 75204 United States",
    contact: "Contact Number: (256) 286-1817\nEmail: Info@adaptsmedia.com"
  },
  {
    city: "India",
    id: "india-1",
    sub: "Office 01",
    address: "Gurugram: 3rd Floor, Woxa IT Park Tower, Plot No. 463, Phase V, Udyog Vihar, Sector 19, Gurugram, Haryana 122016",
    contact: "Contact Number: +91 9818706696\nEmail: Info@adaptsmedia.com"
  },
  {
    city: "India",
    id: "india-2",
    sub: "Office 02",
    address: "Bilaspur: G-9, G-10, Commercial Complex, Phase III, Ramalife City, Sakri Road, Bilaspur, Chhattisgarh",
    contact: "Contact Number: +91 9818706696\nEmail: Ankita@adaptsmedia.com"
  },
  {
    city: "Philippines",
    id: "philippines",
    address: "Julia Vargas Avenue, Ortigas Pasig City, Philippines",
    contact: "Contact Number: +639 95 308 2820\nEmail: Info@adaptsmedia.com"
  }
]

// Accurate equirectangular coordinates for map positions (in %)
const mapPins = [
  { id: "london", name: "London", x: 47.8, y: 26.5 },
  { id: "us", name: "United States", x: 21.0, y: 35.8 },
  { id: "india-1", name: "India Office 01", x: 67.5, y: 44.5 },
  { id: "india-2", name: "India Office 02", x: 68.2, y: 47.2 },
  { id: "philippines", name: "Philippines", x: 79.5, y: 52.0 },
  { id: "dubai", name: "Dubai", x: 58.5, y: 39.5 } // Dubai active office
]

const LocationSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredOfficeIndex, setHoveredOfficeIndex] = useState<number | null>(null)

  const hoverPathRef = useRef<SVGPathElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoveredOfficeIndex(index)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredOfficeIndex(null)
    }, 120)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // 1. Dynamic Hover Path updates
  useEffect(() => {
    if (hoveredOfficeIndex === null || !sectionRef.current || !hoverPathRef.current) {
      gsap.to(hoverPathRef.current, { opacity: 0, duration: 0.3 })
      return
    }

    const sectionRect = sectionRef.current.getBoundingClientRect()
    const pin = sectionRef.current.querySelector(`#map-pin-${mapPins[hoveredOfficeIndex].id}`)

    // Find desktop or mobile card element
    const isMobile = window.matchMedia("(max-width: 1024px)").matches
    const cardSelector = isMobile
      ? `[data-mobile-card="${hoveredOfficeIndex}"]`
      : `[data-desktop-addr="${hoveredOfficeIndex}"]`
    const card = sectionRef.current.querySelector(cardSelector)

    if (!card || !pin) return

    const cardRect = card.getBoundingClientRect()
    const pinRect = pin.getBoundingClientRect()

    // Start coordinate: Center top of card relative to section
    const startX = (cardRect.left + cardRect.right) / 2 - sectionRect.left
    const startY = cardRect.top - sectionRect.top

    // End coordinate: Bottom-center of the pin (adjusted from top-left %)
    const endX = (pinRect.left + pinRect.right) / 2 - sectionRect.left
    const endY = pinRect.bottom - sectionRect.top

    // Smooth quadratic curve pulling upwards
    const controlX = (startX + endX) / 2
    const controlY = Math.min(startY, endY) - 60

    hoverPathRef.current.setAttribute("d", `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`)

    // Draw animation
    const length = hoverPathRef.current.getTotalLength()
    gsap.set(hoverPathRef.current, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
    gsap.to(hoverPathRef.current, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" })

    // Highlight map pin on hover
    const pinId = mapPins[hoveredOfficeIndex].id
    const pinGlow = sectionRef.current.querySelector(`#map-pin-${pinId} .pin-glow`)
    const pinScale = sectionRef.current.querySelector(`#map-pin-${pinId} .pin-scale-wrapper`)

    if (pinScale) {
      gsap.to(pinScale, { scale: 1.25, duration: 0.3, ease: "power2.out", overwrite: "auto" })
    }
    if (pinGlow) {
      gsap.fromTo(pinGlow,
        { scale: 0.8, opacity: 0.8 },
        { scale: 2.2, opacity: 0, duration: 0.8, repeat: -1, ease: "power2.out" }
      )
    }

    return () => {
      if (pinScale) {
        gsap.to(pinScale, { scale: 1.0, duration: 0.3, ease: "power2.out", overwrite: "auto" })
      }
      if (pinGlow) {
        gsap.killTweensOf(pinGlow)
        gsap.set(pinGlow, { scale: 0, opacity: 0 })
      }
    }
  }, [hoveredOfficeIndex])

  // 2. Master GSAP Entrance & Interactions
  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const cleanups: (() => void)[] = []

    const heading = sectionRef.current?.querySelector(".location-heading")
    const arrow = sectionRef.current?.querySelector(".location-arrow")
    const mapImage = sectionRef.current?.querySelector(".map-image-el")
    const dubaiInfo = sectionRef.current?.querySelector(".dubai-info-container")

    // --- A. Split Heading for Mask Reveal ---
    let headingSplit: SplitText | null = null
    if (heading) {
      headingSplit = SplitText.create(heading, {
        type: "lines",
        linesClass: "heading-line-parent",
      })

      headingSplit.lines.forEach((line) => {
        const wrap = document.createElement("div")
        wrap.className = "heading-line-wrap overflow-hidden py-[0.1em] -my-[0.1em]"
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
        gsap.set(line, {
          yPercent: 105,
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.98,
          transformOrigin: "center top",
        })
      })
    }

    // --- B. Initial Setup ---
    if (arrow) {
      gsap.set(arrow, { rotate: -25, opacity: 0, scale: 0.8 })
    }
    if (mapImage) {
      gsap.set(mapImage, { 
        clipPath: "circle(0% at 58.5% 39.5%)", 
        opacity: 0, 
        scale: 0.94,
        filter: "blur(12px)"
      })
    }
    gsap.set(".map-pin-element", { opacity: 0, scale: 0 })
    gsap.set(".dubai-item", { y: 20, opacity: 0 })

    const desktopCards = gsap.utils.toArray<HTMLElement>("[class*='branch-addr-'], [class*='branch-contact-']")
    const mobileCards = gsap.utils.toArray<HTMLElement>(".branch-card-mobile")
    gsap.set([desktopCards, mobileCards], { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.96 })

    // --- C. Entrance ScrollTrigger Timeline ---
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    })

    // 1. Heading reveal
    if (headingSplit) {
      entranceTl.to(headingSplit.lines, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.15,
      }, 0)
    }

    // 1b. Arrow animation
    if (arrow) {
      entranceTl.to(arrow, {
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "expo.out"
      }, 0.6)
    }

    // 2. World Map assembly sweep (reveals outwards from Dubai coordinates)
    if (mapImage) {
      entranceTl.to(mapImage, {
        clipPath: "circle(125% at 58.5% 39.5%)",
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2.0,
        ease: "power2.out"
      }, 0.3)
    }

    // 3. Map pins reveal
    entranceTl.to(".map-pin-element", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)",
      stagger: 0.15
    }, 1.2)

    // 4. Dubai pin drops & bounces
    entranceTl.fromTo("#map-pin-dubai",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "bounce.out" },
      1.6
    )



    // 6. Dubai Info reveals sequentially
    entranceTl.to(".dubai-item", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    }, 2.0)

    // 7. Branch office cards reveal
    if (!isMobile) {
      locations.forEach((_, idx) => {
        entranceTl.to(`.branch-addr-${idx}, .branch-contact-${idx}`, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1
        }, 2.2 + (idx * 0.18))
      })
    } else {
      entranceTl.to(mobileCards, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15
      }, 2.2)
    }

    // --- D. Continuous Active Pin Pulse Loop ---
    entranceTl.add(() => {
      gsap.timeline({ repeat: -1 })
        .to("#map-pin-dubai .pin-glow", { scale: 2.2, opacity: 0, duration: 1.5, ease: "power2.out" })
        .to("#map-pin-dubai .pin-image", { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }, 0)
        .set("#map-pin-dubai .pin-glow", { scale: 0, opacity: 0.8 }, 2.5)
    })

    // --- E. Ambient Micro-Interactions (Heartbeat Loop) ---
    let ambientInterval: ReturnType<typeof setInterval>
    if (!isMobile) {
      ambientInterval = setInterval(() => {
        const isHovered = sectionRef.current?.querySelector(".branch-office-cell:hover")
        if (isHovered) return

        // Exclude Dubai (index 5)
        const randomIdx = Math.floor(Math.random() * (mapPins.length - 1))
        const pin = mapPins[randomIdx]
        const glow = sectionRef.current?.querySelector(`#map-pin-${pin.id} .pin-glow`)

        if (glow) {
          gsap.fromTo(glow,
            { scale: 0.8, opacity: 0.8 },
            { scale: 2.5, opacity: 0, duration: 1.6, ease: "power2.out" }
          )
        }
      }, 7000)

      cleanups.push(() => clearInterval(ambientInterval))
    }

    // --- G. Cursor Spotlight on Map (Removed) ---

    // --- I. Background Gradient Slow Animation ---
    const lightX = gsap.quickTo(".location-bg-light", "--light-x", { duration: 2, ease: "sine.inOut" })
    const lightY = gsap.quickTo(".location-bg-light", "--light-y", { duration: 2, ease: "sine.inOut" })
    let time = 0
    const lightInterval = setInterval(() => {
      time += 0.05
      const x = 30 + Math.sin(time) * 15
      const y = 40 + Math.cos(time * 0.8) * 15
      lightX(`${x}%` as any)
      lightY(`${y}%` as any)
    }, 100)
    cleanups.push(() => clearInterval(lightInterval))

    // --- J. Scroll Exit Timeline ---
    const mapContainer = sectionRef.current?.querySelector(".map-container")
    if (heading && mapContainer) {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      })
        .to(".map-container", { scale: 0.98, ease: "none" })
        .to(".max-w-\\[1350px\\]", { y: -30, ease: "none" }, 0)
        .to(sectionRef.current, { backgroundColor: "#01152a", ease: "none" }, 0)
    }

    return () => {
      cleanups.forEach((fn) => fn())
      if (headingSplit) {
        headingSplit.revert()
      }
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="location-section-bg relative text-white flex flex-col items-start justify-start md:items-center md:justify-center py-20 font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .location-section-bg {
          background: linear-gradient(135deg, #022C56 0%, #011A35 100%);
          position: relative;
          z-index: 10;
        }

        .location-bg-light {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle 800px at var(--light-x, 30%) var(--light-y, 40%), rgba(250, 192, 46, 0.04) 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
          --light-x: 30%;
          --light-y: 40%;
        }


        .map-pin-element {
          will-change: transform, opacity;
        }

        .pin-scale-wrapper {
          will-change: transform;
          transform-style: preserve-3d;
        }

        .branch-office-cell {
          cursor: pointer;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .branch-office-cell:hover {
          opacity: 1 !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .map-pin-element,
          .location-arrow,
          .map-image-el,
          .dubai-item,
          .heading-line-parent * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
          }
        }
      `}} />

      {/* Background Animated Gradient Light & Subtle Noise */}
      <div className="location-bg-light absolute inset-0" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <Image
        src="/images/LocationMask.png"
        alt="Decorative Element"
        fill
        className="absolute z-0 pointer-events-none opacity-40 mix-blend-screen"
      />

      {/* Curved connection lines SVG overlay */}
      <svg className="absolute inset-0 pointer-events-none z-20 w-full h-full">
        <path
          ref={hoverPathRef}
          className="stroke-[#FAC02E] stroke-[1.5] fill-none opacity-0"
          style={{ filter: "drop-shadow(0 0 8px rgba(250, 192, 46, 0.6))" }}
        />
      </svg>

      <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 relative z-10">
        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          {/* Left: Dubai Info */}
          <div className="w-full md:w-[70%] relative">
            <div className="relative">
              <h2 className="location-heading text-3xl md:text-7xl font-heading font-medium mb-16 leading-tight tracking-tight">
                Exactly Where <br />
                <span className="inline-flex items-center gap-3 md:gap-5">
                  You Need Us
                  <Image
                    src='/images/Arrow.png'
                    alt="Arrow"
                    width={32}
                    height={32}
                    className="location-arrow w-6 h-6 md:w-10 md:h-10 object-contain inline-block"
                  />
                </span>
              </h2>
            </div>

            <div
              className="space-y-6 dubai-info-container"
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className="text-3xl font-light dubai-item">Dubai</h3>
              <p className="text-sm opacity-70 leading-relaxed max-w-xs font-light dubai-item">
                702, Warsan Tower, Near Media Rotana, <br />
                Tecom, Barsha Heights, Dubai, <br />
                United Arab Emirates
              </p>
              <div className="text-sm opacity-70 space-y-1 font-light">
                <p className="dubai-item">Contact Number: +971 58 560 1701</p>
                <p className="dubai-item">Landline: +971 043257279</p>
                <p className="dubai-item">Email: Info@adaptsmedia.com</p>
              </div>
            </div>
          </div>

          {/* Right: Dotted World Map */}
          <div className="w-full relative min-h-[300px] flex items-center justify-center map-container">
            <div className="opacity-100 w-full h-full relative">
              <img
                src="/images/global_map.png"
                alt="World Map"
                className="w-full object-contain opacity-100 map-image-el"
              />


              {/* Location Pins */}
              {mapPins.map((pin) => (
                <div
                  key={pin.id}
                  id={`map-pin-${pin.id}`}
                  className="absolute pointer-events-none map-pin-element flex flex-col items-center justify-center"
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: "translate(-50%, -100%)"
                  }}
                >
                  <div className="pin-scale-wrapper relative flex items-center justify-center">
                    <img
                      src='/images/LocationPin.png'
                      alt={pin.name}
                      width={30}
                      height={20}
                      className="pin-image w-6 h-auto relative z-10"
                    />
                    <div className="absolute w-8 h-8 rounded-full bg-[#FAC02E]/60 pin-glow scale-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch Offices Section */}
        <div className="mt-12 w-full">
          <span className="text-[14px] font-medium tracking-[0.1em] opacity-80 mb-6 block">
            Branch Offices
          </span>

          {/* Desktop Layout (Continuous lines) */}
          <div className="hidden lg:flex flex-col w-full pt-4">
            <div className="grid grid-cols-5 gap-10">
              {locations.map((loc, index) => (
                <div
                  key={`desktop-addr-${index}`}
                  data-desktop-addr={index}
                  className="branch-office-cell flex flex-col"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <h4 className={`branch-addr-${index} text-3xl xl:text-4xl font-light mb-6 flex items-baseline gap-2`}>
                    {loc.city} {loc.sub && <span className="text-base opacity-80">- {loc.sub}</span>}
                  </h4>
                  <p className={`branch-addr-${index} text-[13px] opacity-80 leading-relaxed font-light pr-4 min-h-[60px]`}>
                    {loc.address}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-white/30 my-6" />

            <div className="grid grid-cols-5 gap-10">
              {locations.map((loc, index) => (
                <div
                  key={`desktop-contact-${index}`}
                  data-desktop-contact={index}
                  className="branch-office-cell flex flex-col justify-start"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`branch-contact-${index} text-[13px] opacity-80 whitespace-pre-line font-light leading-relaxed`}>
                    {loc.contact}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-white/30 mt-6" />
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-12 pt-4">
            {locations.map((loc, index) => (
              <div
                key={`mobile-${index}`}
                data-mobile-card={index}
                className="branch-card-mobile flex flex-col justify-between h-full"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div>
                  <h4 className="text-3xl font-light mb-4 flex items-baseline gap-2">
                    {loc.city} {loc.sub && <span className="text-base opacity-80">- {loc.sub}</span>}
                  </h4>
                  <p className="text-[13px] opacity-80 leading-relaxed min-h-[60px] font-light">
                    {loc.address}
                  </p>
                </div>
                <div className="text-[13px] py-4 flex flex-col justify-center opacity-80 mt-4 border-t border-b border-white/30 whitespace-pre-line font-light leading-relaxed">
                  {loc.contact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection