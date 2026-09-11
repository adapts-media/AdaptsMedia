import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// The page component here is a Client Component ("use client"), which
// can't export `metadata` itself — this layout carries it instead.
export const metadata: Metadata = buildMetadata({
  title: "Hyundai Mobis Case Study | Adapts Media",
  description:
    "Building awareness, credibility, and engagement through a social-first content strategy focused on Hyundai Mobis Genuine Parts.",
  path: "/case-studies/hyundai-mobis",
  image: "/images/portfolio/Hyundai/Group.png",
  type: "article",
});

export default function HyundaiMobisCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
