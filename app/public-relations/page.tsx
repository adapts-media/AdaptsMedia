import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/ServicesPages/PublicRelations/Hero";
import Intro from "@/ServicesPages/PublicRelations/Intro";
import StrategicPrSection from "@/ServicesPages/PublicRelations/StrategicPrSection";
import PressReleasesSection from "@/ServicesPages/PublicRelations/PressReleasesSection";
import EventsActivationSection from "@/ServicesPages/PublicRelations/EventsActivationSection";
import SponsorshipPartnershipSection from "@/ServicesPages/PublicRelations/SponsorshipPartnershipSection";
import InfluencerAmbassadorSection from "@/ServicesPages/PublicRelations/InfluencerAmbassadorSection";
import CrisisCommunicationsSection from "@/ServicesPages/PublicRelations/CrisisCommunicationsSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

export const metadata: Metadata = buildMetadata({
  title: "Public Relation Services & Consultancy | Adapts Media",
  description:
    "Get your brand into the conversations that matter. Public relation consultancy services that win you real coverage, credibility and trust that ads cannot buy.",
  path: "/public-relations",
});

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <div id="strategic-pr"><StrategicPrSection/></div>
        <div id="press-releases"><PressReleasesSection/></div>
        <div id="events-activation"><EventsActivationSection/></div>
        <div id="sponsorship-partnership"><SponsorshipPartnershipSection/></div>
        <div id="influencer-ambassador"><InfluencerAmbassadorSection/></div>
        <div id="crisis-communications"><CrisisCommunicationsSection/></div>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        
        <Footer/>
    </div>
  );
};

export default page;
