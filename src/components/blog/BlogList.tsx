"use client";

import { useState, useRef, useEffect } from "react";
import { groupTopic } from "@/lib/getPosts";
import BlogGridCard from "@/components/cards/BlogGridCard";
import BlogHero from "@/components/blog/BlogHero";
import Tailwind3DCard from "@/components/cards/Tailwind3DCard";
import ArrowButton from "@/components/buttons/ArrowButton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ArrowDown = ({ isOpen }: { isOpen?: boolean }) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    className={`text-current shrink-0 ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
  >
    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function BlogList({ posts }: { posts: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRowRef = useRef<HTMLDivElement>(null);
  const sharedGlowRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const cleanups: (() => void)[] = [];

    // Initial setup for drawing borders
    gsap.set(".border-draw-path", {
      strokeDasharray: 2000,
      strokeDashoffset: 2000,
    });

    // Explicit initial hidden states, set up front rather than relying on
    // .from() to capture them — .from() ties the "hidden" state to tween
    // construction itself, which was leaving .filter-btn-apply stuck at
    // opacity:0 (its tween's start value never resolved to a playable
    // state, unlike the portfolio filter bar's equivalent animation,
    // which uses this same set-then-.to() pattern reliably).
    gsap.set(".filter-title", { opacity: 0, y: 20 });
    gsap.set(".filter-item", { opacity: 0, y: 25, scale: 0.96 });
    gsap.set(".filter-btn-apply", { opacity: 0, y: 25, scale: 0.96 });

    // Create the ScrollTrigger-based entrance timeline
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".filter-title",
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });

    // 1. Title fade up
    entranceTl.to(".filter-title", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // 2. Dropdown elements and Apply button reveal
    const fields = gsap.utils.toArray<HTMLElement>(".filter-item");
    const paths = fields.map((f) => f.querySelector(".border-draw-path")).filter(Boolean);

    entranceTl.to(fields, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: 0.1,
    }, "-=0.25");

    entranceTl.to(paths, {
      strokeDashoffset: 0,
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.1,
    }, "<");

    entranceTl.to(".filter-btn-apply", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
    }, "-=0.25");

    // --- Shared Glow Follower for Dropdowns ---
    if (!isMobile) {
      const dropButtons = containerRef.current?.querySelectorAll(".filter-item button");
      dropButtons?.forEach((btn) => {
        const handleMouseEnter = () => {
          const parent = containerRef.current?.querySelector(".filter-fields-row") as HTMLElement;
          if (sharedGlowRef.current && parent) {
            const rect = btn.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();
            const left = rect.left - parentRect.left;
            const top = rect.top - parentRect.top - 2;
            const width = rect.width;
            const height = rect.height;

            gsap.to(sharedGlowRef.current, {
              opacity: 1,
              x: left,
              y: top,
              width: width,
              height: height,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        };

        btn.addEventListener("mouseenter", handleMouseEnter);
        cleanups.push(() => btn.removeEventListener("mouseenter", handleMouseEnter));
      });

      const fieldsRow = containerRef.current?.querySelector(".filter-fields-row") as HTMLElement;
      if (fieldsRow) {
        const handleMouseLeave = () => {
          if (sharedGlowRef.current) {
            gsap.to(sharedGlowRef.current, {
              opacity: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        };
        fieldsRow.addEventListener("mouseleave", handleMouseLeave);
        cleanups.push(() => fieldsRow.removeEventListener("mouseleave", handleMouseLeave));
      }
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, { scope: containerRef });

  const ALL_TOPICS = "All Topics";
  const [selectedTopic, setSelectedTopic] = useState(ALL_TOPICS);
  const [activeTopic, setActiveTopic] = useState(ALL_TOPICS);
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRowRef.current && !filterRowRef.current.contains(e.target as Node)) {
        setIsTopicOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown options animation
  useGSAP(() => {
    if (isTopicOpen) {
      gsap.fromTo(".dropdown-panel",
        { opacity: 0, y: -10, scaleY: 0.95, transformOrigin: "top center" },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(".dropdown-item",
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, stagger: 0.03, duration: 0.2, ease: "power2.out", delay: 0.05 }
      );
    }
  }, { scope: containerRef, dependencies: [isTopicOpen] });

  const filterBlogs = () => {
    setActiveTopic(selectedTopic);
    setVisibleCount(9);
  };

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(9);

  // Real category-based filter — the only dimension actual WordPress post
  // data supports (see the real "categories" field from formatWpPost()).
  // Industry / Marketing Goal / Tags filters were removed: they had no
  // corresponding data anywhere in WordPress, so their dropdown options
  // were hardcoded and could never actually filter anything. The site's
  // 23 raw WordPress categories are grouped down to the same handful of
  // buckets used site-wide (see groupTopic()) so the filter list stays
  // short and consistent with the rest of the site.
  const filteredPosts = activeTopic === ALL_TOPICS
    ? posts
    : posts.filter((post: any) => (post.categories || []).some((c: string) => groupTopic(c) === activeTopic));

  // Sliced posts for display
  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const uniqueTopics = [
    ALL_TOPICS,
    ...Array.from(new Set(posts.flatMap((post: any) => (post.categories || []).map(groupTopic)))).sort(),
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#004dc3] text-white font-heading relative z-20">
      
      {/* ── 1ST VIEWPORT CONTAINER (HERO + FILTER = EXACTLY 100VH) ── */}
      <div className="w-full min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between relative z-20 bg-[#004dc3]">
        <BlogHero />

        {/* ── FILTER SECTION ── */}
        <div className="w-full bg-[#004dc3] py-6 lg:py-8 relative z-50">
          <div className="max-w-[1350px] 2xl:max-w-[1600px] mx-auto px-8 md:px-16 lg:px-20">
            <h2 className="filter-title text-lg md:text-xl font-heading font-medium tracking-wide mb-3 text-white font-sans">
              Filter by
            </h2>

            <div ref={filterRowRef} className="relative filter-fields-row flex flex-col lg:flex-row items-start lg:items-end gap-5 lg:gap-8 w-full z-30">
              {/* Shared Glow Follower */}
              <div
                ref={sharedGlowRef}
                className="absolute border border-white rounded-full pointer-events-none opacity-0 transition-all duration-200 ease-out"
                style={{
                  left: 0,
                  top: 0,
                  width: 0,
                  height: 0,
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.25)",
                  borderColor: "rgba(255, 255, 255, 0.8)",
                  willChange: "transform, width, height, opacity"
                }}
              />

              {/* Topic Filter */}
              <div className={`filter-item relative w-full lg:max-w-xs flex flex-col gap-2 ${isTopicOpen ? "z-50" : "z-40"}`}>
                <span className="text-sm font-heading font-normal text-white/80">Topic:</span>
                <button
                  onClick={() => setIsTopicOpen(!isTopicOpen)}
                  className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-all duration-200 relative group overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                >
                  <span className="relative z-10">{selectedTopic}</span>
                  <ArrowDown isOpen={isTopicOpen} />
                  {/* SVG border drawing */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full" fill="none">
                      <rect
                        className="border-draw-path transition-all duration-200 group-hover:stroke-white group-hover:stroke-[1.5px]"
                        x="1"
                        y="1"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        rx="21"
                        ry="21"
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeWidth="1.2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </button>
                {isTopicOpen && (
                  <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                    {uniqueTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setSelectedTopic(topic);
                          setIsTopicOpen(false);
                        }}
                        className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <button
                onClick={filterBlogs}
                className="filter-btn-apply w-full lg:w-auto bg-white text-[#004dc3] hover:bg-white/95 hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(255,255,255,0.15)] active:scale-[0.97] font-heading font-semibold px-16 py-3 rounded-full text-sm tracking-wide transition-all duration-200 cursor-pointer relative z-0"
              >
                Apply
              </button>
            </div>
        </div>
      </div>
      </div>

      {/* ── BLOGS GRID ── */}
      <div className="w-full bg-white py-20 relative z-10">
        <div className="max-w-[1350px] 2xl:max-w-[1600px] mx-auto px-8 md:px-16 lg:px-20">
          {displayedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {displayedPosts.map((post: any) => (
                <BlogGridCard 
                  key={post.slug}
                  title={post.title} 
                  image={post.image} 
                  slug={post.slug}
                  author={post.author}
                  authorSlug={post.authorSlug}
                  date={post.date}
                  tags={post.categories || ["SEO", "Content Marketing", "Digital Strategy"]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#17313B]/50 text-lg">
              No insights match your active filters.
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > visibleCount && (
            <div className="w-full flex justify-center mt-20">
              <ArrowButton title="Load More" onClick={handleLoadMore} variant="blue" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
