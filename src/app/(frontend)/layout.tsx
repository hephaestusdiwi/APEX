import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getSiteSettings } from '@/content/site'
import './styles.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { siteName } = await getSiteSettings()
  return { title: { default: siteName, template: `%s — ${siteName}` } }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { siteName, navigation } = await getSiteSettings()

  return (
    <html lang="en">
      <body>
        <MotionProvider />
        <SiteHeader siteName={siteName} navigation={navigation} />
        <main>{children}</main>
      </body>
    </html>
  )
}