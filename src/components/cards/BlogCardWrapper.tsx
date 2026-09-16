"use client";

import Link from "next/link";
import Image from "next/image";

interface BlogCardWrapperProps {
  slug: string;
  title: string;
  image: string;
  date?: string;
  category?: string;
}

function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
}

export default function BlogCardWrapper({
  slug,
  title,
  image,
  date,
  category,
}: BlogCardWrapperProps) {
  const cleanTitle = decodeHtmlEntities(title);

  return (
    <div className="flex-shrink-0 w-[310px] sm:w-[360px] md:w-[400px] lg:w-[440px] snap-start">
      <Link
        href={`/blogs/${slug}`}
        className="group block h-full w-full rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/20 hover:border-white/40 transition-colors duration-300 overflow-hidden shadow-lg shadow-black/40 flex flex-col"
      >
        {/* Full Image Container: exactly 4:3 matching 800x600 WordPress featured images so graphic is visible fully */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/30">
          <Image
            src={image}
            alt={cleanTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px"
            className="object-cover"
          />
          {/* Subtle bottom shadow to cleanly anchor the image to the card */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Container below image with glassmorphism */}
        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow bg-white/[0.03] backdrop-blur-sm">
          <div>
            {category && (
              <span className="inline-block text-[11px] font-semibold text-[#FAC02D] uppercase tracking-wider mb-2.5 px-2.5 py-0.5 rounded-full bg-[#FAC02D]/10 border border-[#FAC02D]/30 backdrop-blur-sm">
                {category}
              </span>
            )}
            <h3 className="text-base sm:text-lg md:text-xl font-heading font-medium leading-snug text-white group-hover:text-white transition-colors line-clamp-2">
              {cleanTitle}
            </h3>
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs text-white/60">
            <span>{date || "Read Article"}</span>
            <span className="flex items-center gap-1.5 text-white/80 group-hover:text-[#FAC02D] transition-colors font-medium">
              <span>Read</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
