import { Fragment } from 'react'
import type { RichInline, RichParagraph } from '@/content/types'

function Inline({ node }: { node: RichInline }) {
  switch (node.type) {
    case 'break':
      return <br />
    case 'link':
      return (
        <a
          href={node.href}
          className="underline underline-offset-4"
          {...(node.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {node.children.map((child, i) => (
            <Inline key={i} node={child} />
          ))}
        </a>
      )
    case 'text': {
      let content = <>{node.text}</>
      if (node.bold) content = <strong className="font-semibold">{content}</strong>
      if (node.italic) content = <em>{content}</em>
      return content
    }
  }
}

const SIZE = {
  base: 'text-base leading-relaxed md:text-lg',
  small: 'text-sm leading-relaxed md:text-[0.95rem]',
} as const

type Props = {
  paragraphs: RichParagraph[]
  size?: keyof typeof SIZE
}

export function RichParagraphs({ paragraphs, size = 'base' }: Props) {
  return (
    <div className={`space-y-5 ${SIZE[size]}`}>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {paragraph.children.map((node, j) => (
            <Fragment key={j}>
              <Inline node={node} />
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}