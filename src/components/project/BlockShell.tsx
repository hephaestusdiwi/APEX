import type { ReactNode } from 'react'
import type { BlockType, ResolvedLayout, Space, Width } from '@/content/types'

const WIDTH: Record<Width, string> = {
  narrow: 'max-w-xl px-5 md:px-10',
  content: 'max-w-3xl px-5 md:px-10',
  wide: 'max-w-7xl px-5 md:px-10',
  full: 'max-w-none px-0',
}

const BEFORE: Record<Space, string> = {
  none: 'mt-0',
  sm: 'mt-8',
  md: 'mt-16',
  lg: 'mt-28',
  xl: 'mt-44',
}

const AFTER: Record<Space, string> = {
  none: 'mb-0',
  sm: 'mb-8',
  md: 'mb-16',
  lg: 'mb-28',
  xl: 'mb-44',
}

type Props = {
  type: BlockType
  layout: ResolvedLayout
  children: ReactNode
}

export function BlockShell({ type, layout, children }: Props) {
  return (
    <section
      data-block={type}
      data-motion={layout.motion}
      className={`${BEFORE[layout.spaceBefore]} ${AFTER[layout.spaceAfter]}`}
    >
      <div className={`mx-auto w-full ${WIDTH[layout.width]}`}>{children}</div>
    </section>
  )
}