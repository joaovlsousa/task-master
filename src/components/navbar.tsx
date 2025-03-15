import { LogOut } from 'lucide-react'

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
          <a href="/api/auth/logout">
            <LogOut className="size-4 mr-2" />
            Sair
          </a>
        </Button>
      </div>
    </header>
  )
}
