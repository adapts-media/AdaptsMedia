import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/OnlineReputationManagement/Hero";
import Intro from "@/ServicesPages/OnlineReputationManagement/Intro";
import ReviewManagementSection from "@/ServicesPages/OnlineReputationManagement/ReviewManagementSection";
import ForumCommunitySection from "@/ServicesPages/OnlineReputationManagement/ForumCommunitySection";
import SearchNarrativeSection from "@/ServicesPages/OnlineReputationManagement/SearchNarrativeSection";
import SocialListeningSection from "@/ServicesPages/OnlineReputationManagement/SocialListeningSection";
import CrisisRiskMonitoringSection from "@/ServicesPages/OnlineReputationManagement/CrisisRiskMonitoringSection";
import PlatformsEcosystemSection from "@/ServicesPages/OnlineReputationManagement/PlatformsEcosystemSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "Online Reputation Management Services & Agency | Adapts Media",
  description:
    "Protect trust and own your brand narrative. We turn search results, review channels, and online communities into growth assets that protect revenue and build lasting equity.",
  path: "/online-reputation-management",
});

const page = () => {
  return (
    <div>
      <Hero />
      <Intro />
      <div id="review-management">
        <ReviewManagementSection />
      </div>
      <div id="forum-community-reputation">
        <ForumCommunitySection />
      </div>
      <div id="search-narrative-management">
        <SearchNarrativeSection />
      </div>
      <div id="social-listening-response">
        <SocialListeningSection />
      </div>
      <div id="crisis-risk-monitoring">
        <CrisisRiskMonitoringSection />
      </div>
      <div id="platforms-ecosystem-coverage">
        <PlatformsEcosystemSection />
      </div>
      <PortfolioSection />
      <ClientsSection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default page;
