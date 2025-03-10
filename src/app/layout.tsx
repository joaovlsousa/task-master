import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Master',
  description:
    'Salve seus projetos web em nossa plataforma e tenha todo controle sobre eles.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('antialiased scroll-smooth', inter.className)}>
        {children}
        <Toaster richColors position="bottom-center" theme="light" />
      </body>
    </html>
  )
}
