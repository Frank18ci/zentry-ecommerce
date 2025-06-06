import { Toaster } from '@/core/components/ui/sonner'
import { APP_NAME } from '@/core/lib/constants'
import { Sidebar } from '@/features/admin/components/sidebar'
import UserDropdown from '@/features/auth/components/user-dropdown'
import type { Metadata } from 'next'
import '../../globals.css'

export const metadata: Metadata = {
  title: `Panel de Administración | ${APP_NAME}`,
  description: 'Panel de administración para gestionar productos, categorías, usuarios, órdenes y más.',
}

export default function AdminLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={'antialiased dark'}
      >
        <div className="h-dvh flex relative">
          <aside className='flex flex-col gap-5 fixed top-0 bottom-0 justify-between left-0 h-full w-64 border-r bg-background z-50'>
            <Sidebar />
            <div className="p-5">
              <UserDropdown fullView />
            </div>
          </aside>

          <main className="flex-1 p-5 flex flex-col ml-64 max-h-dvh overflow-y-auto">
            {children}
          </main>
        </div>
        <Toaster richColors />
      </body>
    </html>
  )
}
