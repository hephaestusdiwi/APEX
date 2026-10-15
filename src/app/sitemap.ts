import { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { SITE_URL } from '@/lib/seo'
import { equal } from 'node:assert'
import { url } from 'node:inspector'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayloadClient()
    const query = { where: { _status: { equals: 'published' } }, pagination: false, depth: 0, overrideAccess: false, select: { slug: true, updatedAt: true } } as const
    const [projects, page]  = await Promise.all([
        payload.find({ collection: 'projects', ...query }),
        payload.find({ collection: 'pages', ...query }),
    ])

    return [
        { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
        { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
        ...projects.docs.filter((p) => p.slug).map((p) => ({ url: `${SITE_URL}/work/${p.slug}`, lastModified: p.updatedAt, priority: 0.8 })),
        ...page.docs.filter((p) => p.slug).map((p) => ({ url: `${SITE_URL}/${p.slug}`, lastModified: p.updatedAt, priority: 0.6 })),
    ]
}