import { cache } from 'react'
import { isSafeHref } from '@/lib/href'
import { getPayloadClient } from '@/lib/payload'

export type SiteSettings = {
  siteName: string
  navigation: { label: string; href: string }[]
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: false })
  return {
    siteName: settings.siteName?.trim() || 'Portfolio',
    navigation: (settings.navigation ?? [])
      .filter((item) => isSafeHref(item.href))
      .map(({ label, href }) => ({ label, href })),
  }
})