import { Footer } from '@/app/footer'
import Header from '@/core/components/layout/header'
import { APP_DESCRIPTION, APP_NAME } from '@/core/lib/constants'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from 'sonner'
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased dark`}
      >
        <div className='flex flex-col gap-10 px-5 min-h-dvh'>
          <Header />
          <main className='flex flex-col gap-5 grow min-h-[calc(100dvh-144px)]'>
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
