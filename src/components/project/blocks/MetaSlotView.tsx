import type { MetaSlotBlockData } from '@/content/types'
import { ProjectMeta } from '../ProjectMeta'

export function MetaSlotView({ block }: { block: MetaSlotBlockData }) {
  return <ProjectMeta items={block.items} />
}