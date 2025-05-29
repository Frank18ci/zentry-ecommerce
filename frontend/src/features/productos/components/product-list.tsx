import ProductCard from '@/features/productos/components/product-card'
import type { IProducto } from '@/features/productos/types'
import { BoxIcon } from 'lucide-react'

export default function ProductList ({
  productos
}: {
  productos?: IProducto[]
}) {
  return (
    <div className="flex flex-col w-full grow">
      {productos?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-16 grow">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted">
            <BoxIcon />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No se encontraron productos</h3>
          <p className="max-w-md text-center text-muted-foreground">
            No hay productos disponibles en este momento. Intenta ajustar tus filtros de búsqueda o vuelve más tarde.
          </p>
        </div>
      )}
    </div>
  )
}
