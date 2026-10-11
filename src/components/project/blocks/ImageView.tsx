import Image from 'next/image'
import type { ImageBlockData } from '@/content/types'

export function ImageView({ block }: { block: ImageBlockData }) {
  const { media, caption } = block
  return (
    <figure>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="(min-width: 1280px) 1280px, 100vw"
        className="h-auto w-full"
      />
      {caption ? <figcaption className="mt-3 text-sm text-mute">{caption}</figcaption> : null}
    </figure>
  )
}