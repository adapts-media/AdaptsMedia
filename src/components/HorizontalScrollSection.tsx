'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressBarContainerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth < 768) return // skip horizontal scroll on mobile

      const track = trackRef.current
      const section = sectionRef.current

      if (!track || !section) return

      const progressSetter = gsap.quickSetter(progressRef.current, "width", "%")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.5,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onToggle: (self) => {
            if (progressBarContainerRef.current) {
              progressBarContainerRef.current.style.opacity = self.isActive ? '1' : '0'
            }
          },
          onUpdate: (self) => {
            if (progressRef.current) {
              progressSetter(self.progress * 100)
            }
          },
        },
      })

      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Scoped CSS for premium animated noise texture */}
      <style>{`
        @keyframes noise-anim {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(-2%, 1%); }
          30% { transform: translate(1%, -2%); }
          40% { transform: translate(-1%, 2%); }
          50% { transform: translate(-2%, 1%); }
          60% { transform: translate(2%, 0); }
          70% { transform: translate(0, 1%); }
          80% { transform: translate(-2%, 0); }
          90% { transform: translate(1%, 1%); }
          100% { transform: translate(1%, 0); }
        }
        .animate-grain {
          animation: noise-anim 0.15s infinite steps(6);
        }
      `}</style>

      {/* Progress bar */}
      <div 
        ref={progressBarContainerRef} 
        className="fixed bottom-0 left-0 w-full h-[2px] bg-white/10 z-50 opacity-0 pointer-events-none transition-opacity duration-300"
      >
        <div ref={progressRef} className="h-full bg-white w-0 transition-none" />
      </div>

      <section ref={sectionRef} className="relative md:overflow-hidden md:h-screen h-auto overflow-visible bg-black">
        <div ref={trackRef} className="flex flex-col md:flex-row h-auto md:h-full will-change-transform">

          {/* Panel 1 – Project Visual */}
          <div className="relative md:w-screen w-full md:h-screen h-auto min-h-screen flex-shrink-0 flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80"
                alt="Performance Marketing" 
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-12 md:pb-12 pb-16">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">01</p>
              <p className="text-white text-sm uppercase tracking-wider font-semibold">Performance Marketing</p>
            </div>
          </div>

          {/* Panel 2 – Video Panel */}
          <div className="relative md:w-screen w-full md:h-screen h-auto min-h-screen flex-shrink-0 flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <video autoPlay muted loop playsInline suppressHydrationWarning poster="/default-og.jpg" className="w-full h-full object-cover">
                <source src="/assets/Comp.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-12 md:pb-12 pb-16">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">02</p>
              <p className="text-white text-sm uppercase tracking-wider font-semibold">Creative Strategy</p>
            </div>
          </div>

          {/* Panel 3 – Project Visual */}
          <div className="relative md:w-screen w-full md:h-screen h-auto min-h-screen flex-shrink-0 flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80"
                alt="Brand Identity" 
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-12 md:pb-12 pb-16">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">03</p>
              <p className="text-white text-sm uppercase tracking-wider font-semibold">Brand Identity</p>
            </div>
          </div>

          {/* Panel 4 – Video Panel */}
          <div className="relative md:w-screen w-full md:h-screen h-auto min-h-screen flex-shrink-0 flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <video autoPlay muted loop playsInline suppressHydrationWarning poster="/default-og.jpg" className="w-full h-full object-cover">
                <source src="/assets/video_bg2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-12 md:pb-12 pb-16">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">04</p>
              <p className="text-white text-sm uppercase tracking-wider font-semibold">Digital Campaigns</p>
            </div>
          </div>

          {/* Panel 5 – "Let's make things happen." CTA Panel */}
          <div className="relative md:w-screen w-full md:h-screen h-auto min-h-screen flex-shrink-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden py-20">
            
            {/* Grain texture overlay */}
            <div 
              className="absolute -inset-[50%] w-[200%] h-[200%] opacity-[0.03] pointer-events-none animate-grain"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, 
                backgroundSize: '200px 200px' 
              }} 
            />

            {/* Top-left label */}
            <div className="absolute top-10 left-12">
              <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-semibold">Get Started</span>
            </div>

            {/* Decorative arrow – bottom right */}
            <div className="absolute bottom-10 right-12 text-white/10 text-[120px] leading-none font-thin select-none pointer-events-none">
              ↗
            </div>

            {/* Main content */}
            <div className="text-center px-8 max-w-5xl mx-auto relative z-10">
              <h2 
                className="text-white font-heading font-medium leading-none mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 48px)' }}
              >
                Let's make things<br />happen.
              </h2>
              <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Ready to grow your brand? Let's build something remarkable together.
              </p>
              
              <Link
                href="/start-project"
                className="inline-block bg-white text-black border border-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold hover:bg-transparent hover:text-white transition-all duration-300 no-underline"
              >
                Start a Project →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
