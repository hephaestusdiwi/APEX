import { withDefaultSlots } from '@/content/slots'
import type { ProjectData, ProjectNeighbors } from '@/content/types'
import { ProjectContent } from './ProjectContent'
import { ProjectHero } from './ProjectHero'
import { ProjectNavigation } from './ProjectNavigation'

type Props = {
  project: ProjectData
  neighbors: ProjectNeighbors | null
}

export function ProjectPage({ project, neighbors }: Props) {
  return (
    <article className="pb-24">
      <ProjectHero hero={project.hero} />
      <ProjectContent blocks={withDefaultSlots(project)} />
      {neighbors ? <ProjectNavigation neighbors={neighbors} /> : null}
    </article>
  )
}