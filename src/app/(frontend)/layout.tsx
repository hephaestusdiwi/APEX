import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getSiteSettings } from '@/content/site'
import './styles.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-poppins',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { siteName } = await getSiteSettings()
  return { title: { default: siteName, template: `%s — ${siteName}` } }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { siteName, navigation, instagramUrl } = await getSiteSettings()

  return (
    <html lang="en" className={poppins.variable}>
      <body className="relative flex min-h-screen flex-col">
        <MotionProvider />
        <SiteHeader siteName={siteName} navigation={navigation} />
        <main className="flex-1">{children}</main>
        <SiteFooter navigation={navigation} instagramUrl={instagramUrl} />
      </body>
    </html>
  )
}