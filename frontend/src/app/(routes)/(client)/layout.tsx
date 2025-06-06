import { Footer } from '@/core/components/layout/footer'
import Header from '@/core/components/layout/header'
import { APP_DESCRIPTION, APP_NAME } from '@/core/lib/constants'
import type { Metadata } from "next"
import { Toaster } from 'sonner'
import "../../globals.css"

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

export default function ClientLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={'antialiased dark'}
      >
        <div className='flex flex-col gap-10 px-5 min-h-dvh'>
          <Header />
          <main className='flex flex-col gap-5 grow min-h-[calc(100dvh-144px)]'>
            {children}
          </main>
          <Footer />
        </div>
        <Toaster richColors />
      </body>
    </html>
  )
}
