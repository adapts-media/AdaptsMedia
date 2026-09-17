import type { Metadata } from 'next'
import AboutHero from '@/components/aboutus/AboutHero'
import AboutOrangeSection from '@/components/aboutus/AboutOrangeSection'
import BlueSection from '@/components/aboutus/BlueSection'
import DubaiSection from '@/components/aboutus/DubaiSection'
import ImpactSection from '@/components/aboutus/ImpactSection'
import Recognized from '@/components/aboutus/Recognized'
import TeamSection from '@/components/aboutus/TeamSection'
import ClientsSection from '@/components/homepage/ClientsSection'
import ContactCTA from '@/components/homepage/ContactCTA'
import Footer from '@/components/layout/Footer'
import PerformSection from '@/components/servicespage/PerformSection'
import { buildMetadata } from '@/lib/seo'

import { getWordPressTeamMembers } from '@/lib/getPosts'

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: 'About Us | Adapts Media',
  description:
    "We're a new-age marketing agency combining strategy, creativity, and performance to help brands move faster, connect deeper, and scale smarter.",
  path: '/about-us',
})

const page = async () => {
  const teamMembers = await getWordPressTeamMembers();

  return (
    <div>
    <AboutHero/>
    {/* <DubaiSection/> */}
    <AboutOrangeSection/>
    <BlueSection/>
    <PerformSection/>
    <ImpactSection/>
    <TeamSection
      members={teamMembers}
      limit={4}
      showViewAll={true}
      viewAllText="View Team"
      viewAllHref="/team"
    />
    <ClientsSection/>
    {/* <Recognized/> */}
    <ContactCTA/>
    <Footer/>
    </div>
  )
}

export default page