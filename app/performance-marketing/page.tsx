import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/PerformanceMarketing/Hero";
import Intro from "@/ServicesPages/PerformanceMarketing/Intro";
import SeoServicesSection from "@/ServicesPages/PerformanceMarketing/SeoServicesSection";
import SemGoogleAdsSection from "@/ServicesPages/PerformanceMarketing/SemGoogleAdsSection";
import ProgrammaticSection from "@/ServicesPages/PerformanceMarketing/ProgrammaticSection";
import DisplayCampaignSection from "@/ServicesPages/PerformanceMarketing/DisplayCampaignSection";
import PerformanceMarketingSection from "@/ServicesPages/PerformanceMarketing/PerformanceMarketingSection";
import MediaPlanningSection from "@/ServicesPages/PerformanceMarketing/MediaPlanningSection";
import AdOpsAgenciesSection from "@/ServicesPages/PerformanceMarketing/AdOpsAgenciesSection";
import AdOpsPublishersSection from "@/ServicesPages/PerformanceMarketing/AdOpsPublishersSection";
import AffiliateMarketingSection from "@/ServicesPages/PerformanceMarketing/AffiliateMarketingSection";
import RetargetingSection from "@/ServicesPages/PerformanceMarketing/RetargetingSection";
import RetailMediaSection from "@/ServicesPages/PerformanceMarketing/RetailMediaSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "Performance Marketing | Adapts Media",
  description:
    "We build campaigns that are measured, optimised and accountable from first click to closed deal.",
  path: "/performance-marketing",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <div id="seo-services"><SeoServicesSection/></div>
        <div id="sem-google-ads"><SemGoogleAdsSection/></div>
        <ProgrammaticSection/>
        <div id="display-campaigns"><DisplayCampaignSection/></div>
        <PerformanceMarketingSection/>
        <div id="media-planning"><MediaPlanningSection/></div>
        <div id="adops-solutions"><AdOpsAgenciesSection/></div>
        <AdOpsPublishersSection/>
        <div id="affiliate-marketing"><AffiliateMarketingSection/></div>
        <div id="retargeting"><RetargetingSection/></div>
        <div id="retail-media"><RetailMediaSection/></div>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <Footer/>
    </div>
  );
};

export default page;
