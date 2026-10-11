import type { TextBlockData } from '@/content/types'
import { RichParagraphs } from './RichParagraphs'

export function TextView({ block }: { block: TextBlockData }) {
  return <RichParagraphs paragraphs={block.paragraphs} />
}