import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/PerformanceMarketing/Hero";
import Intro from "@/ServicesPages/PerformanceMarketing/Intro";
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
  title: "Performance Marketing Services & Solution | Adapts Media",
  description:
    "We offer performance marketing services across paid search, social and programmatic. A performance marketing agency and consultant partner focused on results.",
  path: "/performance-marketing",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <div id="programmatic-advertising"><ProgrammaticSection/></div>
        <div id="display-campaigns"><DisplayCampaignSection/></div>
        <div id="performance-marketing"><PerformanceMarketingSection/></div>
        <div id="media-planning"><MediaPlanningSection/></div>
        <div id="adops-solutions"><AdOpsAgenciesSection/></div>
        <div id="adops-publishers"><AdOpsPublishersSection/></div>
        <div id="affiliate-marketing"><AffiliateMarketingSection/></div>
        <div id="retargeting"><RetargetingSection/></div>
        <div id="retail-media"><RetailMediaSection/></div>
        <div id="sem-google-ads"><SemGoogleAdsSection/></div>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <Footer/>
    </div>
  );
};

export default page;
