import Image from 'next/image'
import type { ImageTextBlockData } from '@/content/types'
import { ProjectMeta } from '../ProjectMeta'
import { RichParagraphs } from './RichParagraphs'

export function ImageTextView({ block }: { block: ImageTextBlockData }) {
  const { media, paragraphs, imageSide, meta } = block
  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-1.5">
      <div className={`space-y-8 md:pr-14 ${imageSide === 'left' ? 'md:order-2' : ''}`}>
        {meta.length > 0 ? <ProjectMeta items={meta} /> : null}
        <RichParagraphs paragraphs={paragraphs} size="small" />
      </div>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="(min-width: 768px) 37vw, 100vw"
        className="h-auto w-full"
      />
    </div>
  )
}