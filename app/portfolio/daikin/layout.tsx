import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Daikin Case Study | Adapts Media",
  description:
    "Optimizing product listings with rich media, technical feature breakdowns, and conversion-focused copy to lift page traffic and drive sales growth.",
  path: "/portfolio/daikin",
  canonicalPath: "/case-studies/daikin",
  image: "/images/Case Studies/Daikin/Daikin.png",
  type: "article",
});

export default function DaikinPortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
