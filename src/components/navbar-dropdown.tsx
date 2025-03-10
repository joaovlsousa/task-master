import { ChevronDown } from 'lucide-react'

import { CreateProjectSheet } from '@/app/(app)/projects/_components/create-project-sheet'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function NavbarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          Criar novo...
          <ChevronDown className="size-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 space-y-1.5">
        <CreateProjectSheet />
        <DropdownMenuItem>Certificado</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
