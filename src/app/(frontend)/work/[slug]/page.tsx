import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectPage } from '@/components/project/ProjectPage'
import { getNeighbors } from '@/content/navigation'
import { getProjectBySlug, getProjectList } from '@/content/projects'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  return { title: project?.title ?? 'Not found' }
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params
  const [project, list] = await Promise.all([getProjectBySlug(slug), getProjectList()])
  if (!project) notFound()
  return <ProjectPage project={project} neighbors={getNeighbors(list, slug)} />
}