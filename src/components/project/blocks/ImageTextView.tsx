import Image from 'next/image'
import type { ImageTextBlockData } from '@/content/types'
import { RichParagraphs } from './RichParagraphs'

export function ImageTextView({ block }: { block: ImageTextBlockData }) {
    const { media, paragraphs, imageSide } = block
    return (
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
            <Image
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`h-auto w-full ${imageSide === 'right' ? 'md:order-2' : ''}`}
            />
            <RichParagraphs paragraphs={paragraphs} />
        </div>
    )
}