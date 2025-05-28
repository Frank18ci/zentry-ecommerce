import ProductDetailSkeleton from '@/features/productos/components/loading/product-detail-skeleton'
import ProductDetail from '@/features/productos/components/product-detail'
import { Suspense } from 'react'

interface IPageProductoProps {
  params: Promise<{ id: string }>
}

export default async function PageProducto ({ params }: IPageProductoProps) {
  const { id } = await params

  return (
    <main className='flex flex-col gap-5 grow'>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={id} />
      </Suspense>
    </main>
  )
}
