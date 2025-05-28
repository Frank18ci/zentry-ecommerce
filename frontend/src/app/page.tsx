import { HeroSection } from '@/core/components/layout/hero-section'
import { actionGetProducts } from '@/features/productos/actions'
import ListaProductos from '@/features/productos/components/lista-productos'

export default async function HomePage () {
  const { data: productos } = await actionGetProducts()

  return (
    <main className='flex flex-col gap-5 grow'>
      <HeroSection />

      <ListaProductos productos={productos?.content} />
    </main>
  )
}
