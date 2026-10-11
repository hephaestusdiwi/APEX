import type { BlockData, ProjectData } from './types'

type Content = Pick<ProjectData, 'title' | 'meta' | 'blocks'>

/**
 * Title dan meta dirender lewat block penanda (slot). Kalau editor tidak menaruh slot,
 * sisipkan di paling atas: title dulu, lalu meta.
 */
export const withDefaultSlots = (content: Content): BlockData[] => {
  const hasTitleSlot = content.blocks.some((block) => block.type === 'titleSlot')
  const hasMetaSlot = content.blocks.some((block) => block.type === 'metaSlot')

  const lead: BlockData[] = []
  if (!hasTitleSlot) {
    lead.push({ type: 'titleSlot', id: 'default-title', layout: {}, title: content.title })
  }
  if (!hasMetaSlot && content.meta.length > 0) {
    lead.push({ type: 'metaSlot', id: 'default-meta', layout: {}, items: content.meta })
  }
  return [...lead, ...content.blocks]
}