import ProductCard from '@/features/productos/components/product-card'
import type { IProducto } from '@/features/productos/types'
import { BoxIcon } from 'lucide-react'

export default function ProductList ({
  productos
}: {
  productos?: IProducto[]
}) {
  return (
    <div className="flex flex-col grow w-full">
      {productos?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center grow justify-center py-16 px-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <BoxIcon />
          </div>
          <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
          <p className="text-muted-foreground text-center max-w-md">
            No hay productos disponibles en este momento. Intenta ajustar tus filtros de búsqueda o vuelve más tarde.
          </p>
        </div>
      )}
    </div>
  )
}
