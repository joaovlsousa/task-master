import { Navbar } from '@/components/navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto">
      <Navbar />
      <main className="pt-5 h-full">{children}</main>
    </div>
  )
}
