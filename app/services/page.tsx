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
  title: "Services | Adapts Media",
  description:
    "From strategy to execution, we create integrated solutions that help brands connect, perform, and scale.",
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