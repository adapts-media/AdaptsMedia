import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "I’ll Write You a Letter (IWYL) Case Study | Adapts Media",
  description:
    "Crafting high-energy, creative digital banners to align the brand's online presence with its edgy streetwear aesthetic.",
  path: "/case-studies/iwyl",
  image: "/images/Case Studies/IWYL/IWYL Mask group (1).png",
  type: "article",
});

export default function IWYLCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
