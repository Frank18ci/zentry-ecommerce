import { HeroSection } from '@/core/components/layout/hero-section'
import { actionGetProducts } from '@/features/productos/actions'
import ProductsCarousel from '@/features/productos/components/products-carousel'

export default async function HomePage () {
  const { data: productos } = await actionGetProducts()

  return (
    <main className='flex flex-col gap-5 grow'>
      <HeroSection />

      {productos?.content && productos.content.length > 0 && (
        <ProductsCarousel productos={productos.content} />
      )}
    </main>
  )
}
