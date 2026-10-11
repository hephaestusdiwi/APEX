import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageView } from '@/components/page/PageView'
import { getPageBySlug } from '@/content/pages'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  return { title: page?.title ?? 'Not found' }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) notFound()
  return <PageView page={page} />
}