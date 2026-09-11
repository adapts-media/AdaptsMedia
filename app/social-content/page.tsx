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
  title: "Social & Content | Adapts Media",
  description:
    "We turn scrolling feeds into active sales channels and brand advocates through content that triggers action.",
  path: "/social-content",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <SocialMediaSection/>
        <div id="paid-social"><PaidSocialAdvertisingSection/></div>
        <div id="influencer-marketing"><InfluencerMarketingSection/></div>
        <div id="content-strategy"><ContentStrategySection/></div>
        <ContentCreationSection/>
        <CommunityManagementSection/>
        <EmailMarketingSection/>
        <SmsMarketingSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        
        <Footer/>
    </div>
  );
};

export default page;
