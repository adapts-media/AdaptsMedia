import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AANI Case Study | Adapts Media",
  description:
    "A multi-channel digital, social, and out-of-home campaign designed to position AANI as the UAE's preferred instant payment method.",
  path: "/portfolio/aani",
  canonicalPath: "/case-studies/aani",
  image: "/images/Case Studies/Aani/Aani.png",
  type: "article",
});

export default function AaniPortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
