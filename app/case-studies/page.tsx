import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioList from "@/components/portfolio/PortfolioList";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies | Adapts Media",
  description:
    "Explore our latest case studies and success stories delivering impact across digital marketing, branding, and web development.",
  path: "/case-studies",
});

const CaseStudiesPage = () => {
  return (
    <div>
      <PortfolioHero variant="case-studies" />
      <PortfolioList variant="case-studies" />
      <PortfolioSection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
