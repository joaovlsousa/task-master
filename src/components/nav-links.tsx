'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const links = [
  {
    title: 'Projetos',
    href: '/projects',
  },
  {
    title: 'Cetificados',
    href: '/certificates',
  },
]

export function NavLinks() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href
  }

  return (
    <nav className="flex items-center gap-x-4">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium text-muted-foreground',
            isActive(link.href) && 'text-foreground'
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
