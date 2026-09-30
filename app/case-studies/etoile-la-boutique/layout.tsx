import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// The page component here is a Client Component ("use client"), which
// can't export `metadata` itself — this layout carries it instead.
export const metadata: Metadata = buildMetadata({
  title: "Etoile La Boutique Case Study | Adapts Media",
  description:
    "Building sustained, bilingual organic growth across the UAE, KSA & Qatar through SEO, content & website management built to compound over time.",
  path: "/case-studies/etoile-la-boutique",
  image: "/images/Case Studies/Etoile la boutique/Etoile la boutique.png",
  type: "article",
});

export default function EtoileLaBoutiqueCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
