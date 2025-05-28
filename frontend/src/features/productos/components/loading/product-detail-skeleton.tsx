import { Separator } from '@/core/components/ui/separator'
import { Skeleton } from '@/core/components/ui/skeleton'

export default function ProductDetailSkeleton () {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Galería de imágenes skeleton */}
      <div className="flex flex-col gap-4">
        {/* Imagen principal */}
        <Skeleton className="w-full aspect-square rounded-lg" />

        {/* Miniaturas */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-md" />
          ))}
        </div>
      </div>

      {/* Información del producto skeleton */}
      <section className="flex flex-col gap-5">
        {/* ProductHeader skeleton */}
        <div className="flex flex-col gap-3">
          {/* Título */}
          <Skeleton className="h-16 w-3/4" />

          {/* Precio */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <Separator />

        {/* ProductVariants skeleton (TALLA Y COLOR) */}
        <div className="flex flex-col gap-4">
          {/* Tallas */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <div className="flex gap-2">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>

          {/* Colores */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <div className="flex gap-2">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>
        </div>

        {/* ProductQuantity skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <div className="flex items-center gap-5">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-8 mx-2" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        {/* Botón de agregar al carrito */}
        <Skeleton className="h-12 w-full rounded-md" />

        <Separator />

        {/* ProductExtraInfo skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </section>
    </div>
  )
}
