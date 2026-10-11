import type { ProjectMetaItem } from '@/content/types'

export function ProjectMeta({ items }: { items: ProjectMetaItem[] }) {
  if (items.length === 0) return null
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink pt-4 md:grid-cols-4">
      {items.map((item, i) => (
        <div key={`${item.label}-${i}`}>
          <dt className="text-xs uppercase tracking-widest text-mute">{item.label}</dt>
          <dd className="mt-1">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}