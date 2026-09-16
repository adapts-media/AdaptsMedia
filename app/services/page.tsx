import type { Metadata } from "next"
import ClientsSection from "@/components/homepage/ClientsSection"
import ContactCTA from "@/components/homepage/ContactCTA"
import Footer from "@/components/layout/Footer"
import SocialBar from "@/components/layout/SocialBar"
import ConnectedThinkingServices from "@/components/servicespage/ConnectedThinking"
import PerformSection from "@/components/servicespage/PerformSection"
import PortfolioSection from "@/components/servicespage/PortfolioSection"
import ServicesHero from "@/components/servicespage/ServicesHero"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Brand Building Services and Solution | Adapts Media",
  description:
    "Your brand deserves better than guesswork. One team for strategy, design, media and web, and results you can check. Get your plan and price today.",
  path: "/services",
})

const page = () => {
  return (
    <div>
    <ServicesHero/>
    <ConnectedThinkingServices/>
    <PortfolioSection/>
    <ClientsSection/>
    <PerformSection/>
    <ContactCTA/>
    <Footer/>
    </div>
  )
}

export default page