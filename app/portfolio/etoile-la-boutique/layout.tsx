import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// This route renders byte-identical content to /case-studies/etoile-la-boutique
// Canonical points at the case-studies version so this doesn't compete with it in search results.
export const metadata: Metadata = buildMetadata({
  title: "Etoile La Boutique Case Study | Adapts Media",
  description:
    "Building sustained, bilingual organic growth across the UAE, KSA & Qatar through SEO, content & website management built to compound over time.",
  path: "/portfolio/etoile-la-boutique",
  canonicalPath: "/case-studies/etoile-la-boutique",
  image: "/images/Case Studies/Etoile la boutique/Etoile la boutique.png",
  type: "article",
});

export default function EtoileLaBoutiquePortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
