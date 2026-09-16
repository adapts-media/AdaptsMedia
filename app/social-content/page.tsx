import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/SocialContent/Hero";
import Intro from "@/ServicesPages/SocialContent/Intro";
import SocialMediaSection from "@/ServicesPages/SocialContent/SocialMediaSection";
import PaidSocialAdvertisingSection from "@/ServicesPages/SocialContent/PaidSocialAdvertisingSection";
import InfluencerMarketingSection from "@/ServicesPages/SocialContent/InfluencerMarketingSection";
import ContentStrategySection from "@/ServicesPages/SocialContent/ContentStrategySection";
import ContentCreationSection from "@/ServicesPages/SocialContent/ContentCreationSection";
import CommunityManagementSection from "@/ServicesPages/SocialContent/CommunityManagementSection";
import EmailMarketingSection from "@/ServicesPages/SocialContent/EmailMarketingSection";
import SmsMarketingSection from "@/ServicesPages/SocialContent/SmsMarketingSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "Social Media Marketing Services & Solution | Adapts Media",
  description:
    "We offer the best social media marketing services for brands that want reach with returns. A social media marketing agency and consultant under one roof.",
  path: "/social-content",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <div id="social-media-management"><SocialMediaSection/></div>
        <div id="paid-social"><PaidSocialAdvertisingSection/></div>
        <div id="influencer-marketing"><InfluencerMarketingSection/></div>
        <div id="content-strategy"><ContentStrategySection/></div>
        <div id="content-creation"><ContentCreationSection/></div>
        <div id="community-management"><CommunityManagementSection/></div>
        <div id="email-marketing"><EmailMarketingSection/></div>
        <div id="sms-marketing"><SmsMarketingSection/></div>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        
        <Footer/>
    </div>
  );
};

export default page;
