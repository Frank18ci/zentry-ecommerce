import { buttonVariants } from '@/core/components/ui/button'
import { Skeleton } from '@/core/components/ui/skeleton'
import { APP_NAME } from '@/core/lib/constants'
import UserDropdown from '@/features/auth/components/user-dropdown'
import BarraBusqueda from '@/features/productos/components/barra-busqueda'
import dynamic from 'next/dynamic'
import Link from "next/link"
import { Suspense } from 'react'

const CarritoDrawer = dynamic(() => import('@/features/carrito/components/carrito-drawer'))

const linkVariant = buttonVariants({ variant: 'link', size: 'sm' })

export default async function Header () {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex items-center justify-between h-16 gap-5">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            {APP_NAME}
          </Link>

          {/* Navegación Desktop */}
          <nav className="flex items-center gap-5">
            <Link href="/productos" className={linkVariant}>
              Productos
            </Link>
            <Link href="/categorias" className={linkVariant}>
              Categorías
            </Link>
            <Link href="/ofertas" className={linkVariant}>
              Ofertas
            </Link>
          </nav>
        </div>

        {/* Barra de búsqueda */}
        <div className="items-center flex-1 hidden max-w-md mx-8 md:flex">
          <BarraBusqueda />
        </div>

        {/* Dropdown de usuario */}
        <div className="flex items-center gap-3">
          <CarritoDrawer />
          <Suspense fallback={<Skeleton className="w-8 h-8 rounded-full animate-pulse" />}>
            <UserDropdown />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
