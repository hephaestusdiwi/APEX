import Image from 'next/image'
import type { MediaAsset } from '@/content/types'

type Props = {
  title: string
  hero: MediaAsset | null
}

export function ProjectHeader({ title }: { title: string }) {
  return (
    <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.92] tracking-tight">
      {title}
    </h1>
  )
}