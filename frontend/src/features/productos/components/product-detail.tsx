import { Separator } from '@/core/components/ui/separator'
import { actionGetProductById } from '@/features/productos/actions'
import ProductExtraInfo from '@/features/productos/components/detail/product-extra-info'
import ProductGallery from '@/features/productos/components/detail/product-gallery'
import ProductHeader from '@/features/productos/components/detail/product-header'
import ProductVariantSelector from '@/features/productos/components/detail/product-variant-selector'

interface ProductDetailProps {
  id: string
}

export default async function ProductDetail ({ id }: ProductDetailProps) {
  const { data: producto, success, message } = await actionGetProductById({ id })

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <p className="text-muted-foreground mt-2">{message || 'No se pudo encontrar el producto solicitado.'}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Galería de imágenes */}
      <ProductGallery producto={producto} />

      {/* Información del producto */}
      <section className="flex flex-col gap-5">
        <ProductHeader producto={producto} />

        <Separator />

        {/* Selector de variantes y cantidad */}
        <ProductVariantSelector producto={producto} />

        {/* Información adicional */}
        <ProductExtraInfo />
      </section>
    </div>
  )
}
