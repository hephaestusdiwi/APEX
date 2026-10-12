import { HomeGrid } from '@/components/site/HomeGrid'
import { HomeHero } from '@/components/site/HomeHero'
import { getProjectList } from '@/content/projects'
import { getSiteSettings } from '@/content/site'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [site, projects] = await Promise.all([getSiteSettings(), getProjectList()])
  return (
    <>
      <HomeHero siteName={site.siteName} hero={site.homeHero} />
      <HomeGrid projects={projects} />
    </>
  )
}