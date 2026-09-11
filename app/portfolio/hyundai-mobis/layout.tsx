import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// This route renders byte-identical content to /case-studies/hyundai-mobis
// (same page component, literally copy-pasted) and isn't linked from
// anywhere in the site — same duplicate-content situation as /portfolio
// vs /case-studies generally. Canonical points at the case-studies version
// so this doesn't compete with it in search results.
export const metadata: Metadata = buildMetadata({
  title: "Hyundai Mobis Case Study | Adapts Media",
  description:
    "Building awareness, credibility, and engagement through a social-first content strategy focused on Hyundai Mobis Genuine Parts.",
  path: "/portfolio/hyundai-mobis",
  canonicalPath: "/case-studies/hyundai-mobis",
  image: "/images/portfolio/Hyundai/Group.png",
  type: "article",
});

export default function HyundaiMobisPortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
