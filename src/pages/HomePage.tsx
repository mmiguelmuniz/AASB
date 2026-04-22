import HeroSection from '@/components/sections/HeroSection'
import QuickLinksSection from '@/components/sections/QuickLinksSection'
import CountdownSection from '@/components/sections/CountdownSection'
import SportsSection from '@/components/sections/SportsSection'
import SchoolsPreviewSection from '@/components/sections/SchoolsPreviewSection'
import InfoBannerSection from '@/components/sections/InfoBannerSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickLinksSection />
      <CountdownSection />
      <SportsSection />
      <SchoolsPreviewSection />
      <InfoBannerSection />
    </>
  )
}
