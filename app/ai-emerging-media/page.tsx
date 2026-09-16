import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/AiEmergingMedia/Hero";
import Intro from "@/ServicesPages/AiEmergingMedia/Intro";
import AeoGeoSection from "@/ServicesPages/AiEmergingMedia/AeoGeoSection";
import AiContentSection from "@/ServicesPages/AiEmergingMedia/AiContentSection";
import MarketingAutomationSection from "@/ServicesPages/AiEmergingMedia/MarketingAutomationSection";
import ConversationalAiSection from "@/ServicesPages/AiEmergingMedia/ConversationalAiSection";
import PredictiveAnalyticsSection from "@/ServicesPages/AiEmergingMedia/PredictiveAnalyticsSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "AI Consulting Services & AI Solutions | Adapts Media",
  description:
    "Grow your business with AI that does real work. Adapts Media provides the best artificial intelligence (AI) services and solutions built around your workflow.",
  path: "/ai-emerging-media",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <AeoGeoSection/>
        <AiContentSection/>
        <MarketingAutomationSection/>
        <ConversationalAiSection/>
        <PredictiveAnalyticsSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <Footer/>
    </div>
  );
};

export default page;
