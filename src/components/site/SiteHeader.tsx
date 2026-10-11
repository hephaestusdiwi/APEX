import Link from 'next/link'
import type { ReactNode } from 'react'
import type { SiteSettings } from '@/content/site'

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return href.startsWith('/') ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>
}

export function SiteHeader({ siteName, navigation }: SiteSettings) {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-baseline justify-between gap-6 px-5 py-5 text-sm uppercase tracking-widest md:px-10 md:py-8">
      <Link href="/">{siteName}</Link>
      {navigation.length > 0 ? (
        <nav aria-label="Utama">
          <ul className="flex gap-6">
            {navigation.map((item, i) => (
              <li key={`${item.href}-${i}`}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}