import Link from 'next/link'
import type { ProjectNeighbors } from '@/content/types'

export function ProjectNavigation({ neighbors }: { neighbors: ProjectNeighbors }) {
  const { previous, next } = neighbors
  return (
    <nav
      aria-label="Project"
      className="mx-auto mt-40 grid w-full max-w-7xl grid-cols-2 gap-6 border-t border-ink px-5 pt-6 md:px-10"
    >
      <Link href={`/work/${previous.slug}`} rel="prev">
        <span className="block text-xs uppercase tracking-widest text-mute">Previous</span>
        <span className="mt-1 block text-2xl leading-tight md:text-4xl">{previous.title}</span>
      </Link>
      <Link href={`/work/${next.slug}`} rel="next" className="text-right">
        <span className="block text-xs uppercase tracking-widest text-mute">Next</span>
        <span className="mt-1 block text-2xl leading-tight md:text-4xl">{next.title}</span>
      </Link>
    </nav>
  )
}