import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/WebDigitalExperience/Hero";
import Intro from "@/ServicesPages/WebDigitalExperience/Intro";
import UxUiSection from "@/ServicesPages/WebDigitalExperience/UxUiSection";
import WebDevelopmentSection from "@/ServicesPages/WebDigitalExperience/WebDevelopmentSection";
import EcommerceSection from "@/ServicesPages/WebDigitalExperience/EcommerceSection";
import CmsImplementationSection from "@/ServicesPages/WebDigitalExperience/CmsImplementationSection";
import ApiIntegrationSection from "@/ServicesPages/WebDigitalExperience/ApiIntegrationSection";
import LandingPageSection from "@/ServicesPages/WebDigitalExperience/LandingPageSection";
import MaintenanceSection from "@/ServicesPages/WebDigitalExperience/MaintenanceSection";
import CroSection from "@/ServicesPages/WebDigitalExperience/CroSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "Web & Digital Experience | Adapts Media",
  description:
    "Every pixel with purpose. We merge behavioral data with a sharp UI to guide visitors exactly where you want them to land.",
  path: "/web-digital-experience",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <div id="ux-ui"><UxUiSection/></div>
        <div id="web-development"><WebDevelopmentSection/></div>
        <EcommerceSection/>
        <CmsImplementationSection/>
        <div id="api-integration"><ApiIntegrationSection/></div>
        <LandingPageSection/>
        <MaintenanceSection/>
        <CroSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <Footer/>
    </div>
  );
};

export default page;
