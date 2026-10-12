import Image from 'next/image'
import type { GalleryBlockData, GalleryVariant } from '@/content/types'
import { focalPosition } from '@/lib/focal'

const CONTAINER: Record<GalleryVariant, string> = {
  'grid-2': 'grid grid-cols-1 gap-1.5 md:grid-cols-2',
  'grid-3': 'grid grid-cols-1 gap-1.5 md:grid-cols-3',
  staggered: 'grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6',
  strip: 'flex snap-x gap-4 overflow-x-auto md:gap-6',
}

const SIZES: Record<GalleryVariant, string> = {
  'grid-2': '(min-width: 768px) 37vw, 100vw',
  'grid-3': '(min-width: 768px) 25vw, 100vw',
  staggered: '(min-width: 768px) 37vw, 100vw',
  strip: '80vw',
}

export function GalleryView({ block }: { block: GalleryBlockData }) {
  const { variant, images } = block

  if (variant === 'grid-2' || variant === 'grid-3') {
    return (
      <div className={CONTAINER[variant]}>
        {images.map((image, i) => (
          <div key={`${image.src}-${i}`} className="relative aspect-[10/7] overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={SIZES[variant]}
              className="object-cover"
              style={{ objectPosition: focalPosition(image) }}
            />
          </div>
        ))}
      </div>
    )
  }

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