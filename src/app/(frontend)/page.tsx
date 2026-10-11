import { HomeIndex } from '@/components/site/HomeIndex'
import { getProjectList } from '@/content/projects'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const projects = await getProjectList()
  return <HomeIndex projects={projects} />
}