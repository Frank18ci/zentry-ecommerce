import { actionGetProductById } from '@/features/productos/actions'
import ProductDetail from '@/features/productos/components/product-detail'

interface IPageProductoProps {
  params: Promise<{ id: string }>
}

export default async function PageProducto ({ params }: IPageProductoProps) {
  const { id } = await params

  const { data: producto, success, message } = await actionGetProductById({ id })

  if (!producto || !success) {
    return (
      <main className='flex flex-col gap-5 grow'>
        ID: {id}
        <p>{message}</p>
      </main>
    )
  }

  return (
    <main className='flex flex-col gap-5 grow'>
      <ProductDetail producto={producto} />
    </main>
  )
}
