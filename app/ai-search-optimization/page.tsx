import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/SearchEngineOptimization/Hero";
import Intro from "@/ServicesPages/SearchEngineOptimization/Intro";
import AeoGeoSection from "@/ServicesPages/SearchEngineOptimization/AeoGeoSection";
import AiSeoGeoSection from "@/ServicesPages/SearchEngineOptimization/AiSeoGeoSection";
import OnPageSeoSection from "@/ServicesPages/SearchEngineOptimization/OnPageSeoSection";
import OffPageSeoSection from "@/ServicesPages/SearchEngineOptimization/OffPageSeoSection";
import LocalSeoSection from "@/ServicesPages/SearchEngineOptimization/LocalSeoSection";
import TechnicalSeoSection from "@/ServicesPages/SearchEngineOptimization/TechnicalSeoSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "Search Engine Optimisation Services & Solution | Adapts Media",
  description:
    "Ready to rank? Get organic SEO services for business that bring you buyers, not just traffic. SEO agency services and consulting for long term growth. Ask now.",
  path: "/ai-search-optimization",
});

const page = () => {
  return (
    <div id="ai-search-optimization">
      <Hero />
      <Intro />
      <div id="aeo-geo"><AeoGeoSection /></div>
      <div id="on-page-seo"><OnPageSeoSection /></div>
      <div id="off-page-seo"><OffPageSeoSection /></div>
      <div id="local-seo"><LocalSeoSection /></div>
      <div id="technical-seo"><TechnicalSeoSection /></div>
      <div id="ai-seo-geo"><AiSeoGeoSection /></div>
      <PortfolioSection />
      <ClientsSection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default page;
