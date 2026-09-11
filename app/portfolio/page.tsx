import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioList from "@/components/portfolio/PortfolioList";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";

// This page currently renders the exact same components as /case-studies
// (same hero, same list, same sections) — search engines will see them as
// duplicate content. Rather than remove either URL, the canonical tag below
// points at /case-studies so ranking signal consolidates there instead of
// splitting across both. If /portfolio is meant to carry different content
// long-term, give it its own copy and drop `canonicalPath` here.
export const metadata: Metadata = buildMetadata({
  title: "Portfolio | Adapts Media",
  description:
    "Explore our featured portfolio of high-impact creative campaigns, brand design, and digital experiences.",
  path: "/portfolio",
  canonicalPath: "/case-studies",
});

export default function PortfolioPage() {
  return (
    <main className="w-full bg-[#0c121c] text-white">
      <PortfolioHero />
      <PortfolioList />
      <PortfolioSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}
