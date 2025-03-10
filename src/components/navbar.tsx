import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { Logo } from './logo'
import { NavLinks } from './nav-links'
import { NavbarDropdown } from './navbar-dropdown'
import { Button } from './ui/button'

export function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between border-b">
      <div className="flex items-center gap-x-16">
        <Logo />
        <NavLinks />
      </div>

      <div className="flex items-center gap-x-8">
        <NavbarDropdown />
        <Button asChild variant="secondary">
          <Link href="/api/auth/logout">
            <LogOut className="size-4 mr-2" />
            Sair
          </Link>
        </Button>
      </div>
    </header>
  )
}
