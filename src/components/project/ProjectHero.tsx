import Image from 'next/image'
import type { MediaAsset } from '@/content/types'

export function ProjectHero({ hero }: { hero: MediaAsset | null }) {
  if (!hero) return null
  return (
    <Image
      src={hero.src}
      alt={hero.alt}
      width={hero.width}
      height={hero.height}
      priority
      sizes="100vw"
      className="h-auto w-full"
    />
  )
}