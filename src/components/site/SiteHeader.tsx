import Link from 'next/link'
import type { SiteSettings } from '@/content/site'
import { SiteNav } from './SiteNav'

export function SiteHeader({ siteName, navigation }: Pick<SiteSettings, 'siteName' | 'navigation'>) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-baseline justify-between gap-6 px-[4%] pt-5 md:pt-8">
      <Link href="/" className="text-lg font-medium md:text-2xl">
        {siteName}
      </Link>
      <SiteNav items={navigation} />
    </header>
  )
}