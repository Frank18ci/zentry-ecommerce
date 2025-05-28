import { Separator } from '@/core/components/ui/separator'
import { actionGetProductById } from '@/features/productos/actions'
import ProductExtraInfo from '@/features/productos/components/detail/product-extra-info'
import ProductGallery from '@/features/productos/components/detail/product-gallery'
import ProductHeader from '@/features/productos/components/detail/product-header'
import ProductQuantity from '@/features/productos/components/detail/product-quantity'
import ProductVariants from '@/features/productos/components/detail/product-variants'

interface ProductDetailProps {
  id: string
}

export default async function ProductDetail ({ id }: ProductDetailProps) {
  const { data: producto, success, message } = await actionGetProductById({ id })

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-red-600">{message}</h2>
      </div>
    )
  }

  const nuevoProducto = {
    ...producto,
    imagenes: producto.imagenes || ["/vercel.svg", "/file.svg", "/globe.svg", "/next.svg", "/window.svg"]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Galería de imágenes */}
      <ProductGallery producto={nuevoProducto} />

      {/* Información del producto */}
      <section className="flex flex-col gap-5">
        <ProductHeader producto={producto} />

        <Separator />

        {/* Variantes del producto (TALLA Y COLOR) */}
        <ProductVariants producto={producto} />

        {/* Cantidad */}
        <ProductQuantity />

        {/* Información adicional */}
        <ProductExtraInfo />
      </section>
    </div>
  )
}
