import type { Media, Page, Project, Video } from '@/payload-types'
import { isAllowedEmbedUrl } from '@/lib/embed'
import { isSafeHref } from '@/lib/href'
import { parseVideoUrl } from '@/lib/video'
import {
  EMBED_ASPECTS,
  GALLERY_VARIANTS,
  HOME_ALIGNS,
  HOME_SIZES,
  MOTIONS,
  SPACES,
  WIDTHS,
  type BlockData,
  type BlockLayout,
  type MediaAsset,
  type PageData,
  type ProjectData,
  type ProjectMetaItem,
  type ProjectSummary,
  type RichInline,
  type RichParagraph,
  type VideoSource,
} from './types'

type PayloadBlock = NonNullable<Project['blocks']>[number]

/** Data induk yang dibutuhkan block penanda (slot). */
type BlockContext = { title: string; meta: ProjectMetaItem[] }

/** Ambil nilai hanya kalau ada di daftar yang diizinkan ('default' otomatis jadi undefined). */
const pick = <T extends string>(
  value: string | null | undefined,
  allowed: readonly T[],
): T | undefined => allowed.find((item) => item === value)

const toLayout = (layout: PayloadBlock['layout']): BlockLayout => ({
  width: pick(layout?.width, WIDTHS),
  spaceBefore: pick(layout?.spaceBefore, SPACES),
  spaceAfter: pick(layout?.spaceAfter, SPACES),
  motion: pick(layout?.motion, MOTIONS),
})

const toMedia = (value: number | Media | null | undefined): MediaAsset | null => {
  if (!value || typeof value !== 'object') return null
  if (!value.url || !value.width || !value.height) return null
  return { src: value.url, alt: value.alt, width: value.width, height: value.height }
}

const toMeta = (doc: Project): ProjectMetaItem[] =>
  (doc.meta ?? []).map(({ label, value }) => ({ label, value }))

// --- Lexical -> node sederhana -------------------------------------------

type LexNode = {
  type: string
  text?: string
  format?: number
  children?: LexNode[]
  fields?: { url?: string; newTab?: boolean }
}

const IS_BOLD = 1
const IS_ITALIC = 2

const toInlines = (nodes: LexNode[] | undefined): RichInline[] =>
  (nodes ?? []).flatMap((node): RichInline[] => {
    switch (node.type) {
      case 'text': {
        if (!node.text) return []
        const format = node.format ?? 0
        return [
          {
            type: 'text',
            text: node.text,
            bold: (format & IS_BOLD) !== 0,
            italic: (format & IS_ITALIC) !== 0,
          },
        ]
      }
      case 'linebreak':
        return [{ type: 'break' }]
      case 'link': {
        const children = toInlines(node.children)
        const href = node.fields?.url
        if (!href || !isSafeHref(href)) return children
        return [{ type: 'link', href, newTab: Boolean(node.fields?.newTab), children }]
      }
      default:
        return []
    }
  })

const toParagraphs = (body: unknown): RichParagraph[] => {
  const root = (body as { root?: { children?: LexNode[] } } | null | undefined)?.root
  return (root?.children ?? [])
    .filter((node) => node.type === 'paragraph')
    .map((node) => ({ children: toInlines(node.children) }))
    .filter((paragraph) => paragraph.children.length > 0)
}

// --- Video ---------------------------------------------------------------

const toVideoSource = (block: Extract<PayloadBlock, { blockType: 'video' }>): VideoSource | null => {
  if (block.provider === 'file') {
    const file: number | Video | null | undefined = block.file
    if (!file || typeof file !== 'object' || !file.url) return null
    if (!file.mimeType?.startsWith('video/')) return null
    return { kind: 'file', src: file.url, mimeType: file.mimeType }
  }
  const parsed = block.url ? parseVideoUrl(block.url) : null
  return parsed ? { kind: 'embed', provider: parsed.provider, src: parsed.src } : null
}

// --- Block ---------------------------------------------------------------

const mapBlock = (block: PayloadBlock, index: number, ctx: BlockContext): BlockData | null => {
  const id = block.id ?? `${block.blockType}-${index}`
  const layout = toLayout(block.layout)

  switch (block.blockType) {
    case 'heading':
      return { type: 'heading', id, layout, text: block.text, level: block.level === 'h3' ? 'h3' : 'h2' }
    case 'text': {
      const paragraphs = toParagraphs(block.body)
      return paragraphs.length > 0 ? { type: 'text', id, layout, paragraphs } : null
    }
    case 'image': {
      const media = toMedia(block.media)
      return media ? { type: 'image', id, layout, media, caption: block.caption || undefined } : null
    }
    case 'imageText': {
      const media = toMedia(block.media)
      const paragraphs = toParagraphs(block.body)
      if (!media || paragraphs.length === 0) return null
      return {
        type: 'imageText',
        id,
        layout,
        media,
        paragraphs,
        imageSide: block.imageSide === 'right' ? 'right' : 'left',
      }
    }
    case 'gallery': {
      const images = (block.images ?? [])
        .map((image) => toMedia(image))
        .filter((image): image is MediaAsset => image !== null)
      return images.length > 0
        ? { type: 'gallery', id, layout, variant: pick(block.variant, GALLERY_VARIANTS) ?? 'grid-2', images }
        : null
    }
    case 'video': {
      const source = toVideoSource(block)
      return source ? { type: 'video', id, layout, source, caption: block.caption || undefined } : null
    }
    case 'link':
      return isSafeHref(block.url)
        ? { type: 'link', id, layout, label: block.label, href: block.url, newTab: Boolean(block.newTab) }
        : null
    case 'quote':
      return { type: 'quote', id, layout, text: block.text, attribution: block.attribution || undefined }
    case 'embed':
      // Cek allowlist diulang saat render: data lama/draft tidak boleh lolos hanya karena validasi admin.
      return isAllowedEmbedUrl(block.url)
        ? {
            type: 'embed',
            id,
            layout,
            src: block.url.trim(),
            title: block.title || 'Embedded content',
            aspect: pick(block.aspect, EMBED_ASPECTS) ?? '16-9',
          }
        : null
    case 'list': {
      const items = (block.items ?? []).map((item) => item.text).filter((text) => text.trim() !== '')
      return items.length > 0
        ? { type: 'list', id, layout, ordered: block.style === 'ordered', items }
        : null
    }
    case 'spacer':
      return { type: 'spacer', id, layout, size: pick(block.size, ['sm', 'md', 'lg', 'xl'] as const) ?? 'md' }
    case 'titleSlot':
      return { type: 'titleSlot', id, layout, title: ctx.title }
    case 'metaSlot':
      return ctx.meta.length > 0 ? { type: 'metaSlot', id, layout, items: ctx.meta } : null
    default: {
      // Error compile di sini = ada block baru di Payload yang belum dipetakan.
      const unmapped: never = block
      return unmapped
    }
  }
}

const mapBlocks = (blocks: Project['blocks'], ctx: BlockContext): BlockData[] =>
  (blocks ?? [])
    .map((block, index) => mapBlock(block, index, ctx))
    .filter((block): block is BlockData => block !== null)

export const mapProject = (doc: Project): ProjectData => {
  const meta = toMeta(doc)
  return {
    id: doc.id,
    slug: doc.slug ?? '',
    title: doc.title,
    hero: toMedia(doc.hero),
    meta,
    blocks: mapBlocks(doc.blocks, { title: doc.title, meta }),
  }
}

export const mapPage = (doc: Page): PageData => ({
  id: doc.id,
  slug: doc.slug ?? '',
  title: doc.title,
  blocks: mapBlocks(doc.blocks, { title: doc.title, meta: [] }),
})

type SummaryDoc = Pick<Project, 'id' | 'title' | 'slug' | 'hero' | 'home'>

export const mapSummary = (doc: SummaryDoc): ProjectSummary => ({
  id: doc.id,
  slug: doc.slug ?? '',
  title: doc.title,
  image: toMedia(doc.home?.cover) ?? toMedia(doc.hero),
  size: pick(doc.home?.size, HOME_SIZES) ?? 'medium',
  align: pick(doc.home?.align, HOME_ALIGNS) ?? 'left',
})