import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/BrandingCreative/Hero";
import BrandingIntro from "@/ServicesPages/BrandingCreative/BrandingIntro";
import IdentitySection from "@/ServicesPages/BrandingCreative/IdentitySection";
import BrandStrategySection from "@/ServicesPages/BrandingCreative/BrandStrategySection";
import CampaignsSection from "@/ServicesPages/BrandingCreative/CampaignsSection";
import VisualDesignSection from "@/ServicesPages/BrandingCreative/VisualDesignSection";
import DesignSystemsSection from "@/ServicesPages/BrandingCreative/DesignSystemsSection";
import MotionGraphicsSection from "@/ServicesPages/BrandingCreative/MotionGraphicsSection";
import PhotographyProductionSection from "@/ServicesPages/BrandingCreative/PhotographyProductionSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "Branding and Creative Services & Agency | Adapts Media",
  description:
    "We offer creative branding services that turn ideas into identities. As a creative branding agency, we handle strategy, logo design, packaging, and guidelines.",
  path: "/branding-creative",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <BrandingIntro/>
        <div id="identity"><IdentitySection/></div>
        <div id="brand-strategy"><BrandStrategySection/></div>
        <div id="campaigns"><CampaignsSection/></div>
        <div id="visual-design"><VisualDesignSection/></div>
        <div id="design-systems"><DesignSystemsSection/></div>
        <div id="motion-graphics"><MotionGraphicsSection/></div>
        <div id="photography"><PhotographyProductionSection/></div>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <Footer/>
    </div>
  );
};

export default page;
