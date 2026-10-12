import { cache } from 'react'
import { isSafeHref } from '@/lib/href'
import { getPayloadClient } from '@/lib/payload'
import { toMedia } from './mapper'
import type { MediaAsset } from './types'

export type HomeHeroData = {
  image: MediaAsset | null
  heading: string
  tagline: string
}

export type SiteSettings = {
  siteName: string
  navigation: { label: string; href: string }[]
  instagramUrl: string | null
  homeHero: HomeHeroData
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1, overrideAccess: false })
  const instagram = settings.instagramUrl?.trim()
  return {
    siteName: settings.siteName?.trim() || 'Portfolio',
    navigation: (settings.navigation ?? [])
      .filter((item) => isSafeHref(item.href))
      .map(({ label, href }) => ({ label, href })),
    instagramUrl: instagram && /^https?:\/\//i.test(instagram) ? instagram : null,
    homeHero: {
      image: toMedia(settings.homeHero?.image),
      heading: settings.homeHero?.heading?.trim() ?? '',
      tagline: settings.homeHero?.tagline?.trim() ?? '',
    },
  }
})