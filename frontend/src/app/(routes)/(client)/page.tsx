import { HeroSection } from '@/core/components/layout/hero-section'
import { actionGetProducts } from '@/features/productos/actions'
import ProductsCarousel from '@/features/productos/components/products-carousel'
import { Suspense } from 'react'

export default async function HomePage () {
  const productosPromise = actionGetProducts()

  return (
    <main className='flex flex-col gap-5 grow'>
      <HeroSection />

      <Suspense fallback={
        <div className='flex flex-col gap-5 w-full'>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Productos Destacados</h2>
            <p className="text-muted-foreground">
              Descubre nuestra selección de productos más populares
            </p>
          </div>

          <div className='flex items-center justify-center w-full h-64'>
            <p className='text-muted-foreground'>Cargando productos destacados...</p>
          </div>
        </div>
      }>
        <ProductsCarousel productosPromise={productosPromise} />
      </Suspense>
    </main>
  )
}
