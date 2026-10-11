import Image from 'next/image'
import type { GalleryBlockData, GalleryVariant } from '@/content/types'

const CONTAINER: Record<GalleryVariant, string> = {
  'grid-2': 'grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6',
  'grid-3': 'grid grid-cols-1 items-start gap-4 md:grid-cols-3 md:gap-6',
  staggered: 'grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6',
  strip: 'flex snap-x gap-4 overflow-x-auto md:gap-6',
}

const SIZES: Record<GalleryVariant, string> = {
  'grid-2': '(min-width: 768px) 50vw, 100vw',
  'grid-3': '(min-width: 768px) 33vw, 100vw',
  staggered: '(min-width: 768px) 50vw, 100vw',
  strip: '80vw',
}

export function GalleryView({ block }: { block: GalleryBlockData }) {
  const { variant, images } = block
  const isStrip = variant === 'strip'
  return (
    <div className={CONTAINER[variant]}>
      {images.map((image, i) => (
        <div
          key={`${image.src}-${i}`}
          className={[
            isStrip ? 'shrink-0 snap-start' : '',
            variant === 'staggered' && i % 2 === 1 ? 'md:mt-24' : '',
          ].join(' ')}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={SIZES[variant]}
            className={isStrip ? 'h-[60vh] w-auto max-w-none' : 'h-auto w-full'}
          />
        </div>
      ))}
    </div>
  )
}