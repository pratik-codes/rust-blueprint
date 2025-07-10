import { FeatureMarquee } from '@/components/feature-marquee'
import { SectionCommunity } from '@/components/sections/community'
import { SectionHero } from '@/components/sections/hero'
import { SectionStartBuilding } from '@/components/sections/start-building'
import { SectionFeatures } from '@/components/sections/features'
import { SectionQuickStart } from '@/components/sections/quick-start'
import { SectionFrameworks } from '@/components/sections/frameworks'

export default function Page() {
  return (
    <>
      <SectionHero />
      <FeatureMarquee />
      <SectionQuickStart />
      <SectionFrameworks />
      <SectionFeatures />
      <SectionStartBuilding />
      <SectionCommunity />
    </>
  )
}
