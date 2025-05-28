import ProductCard from '@/features/productos/components/product-card'
import type { IProducto } from '@/features/productos/types'

export default function ListaProductos ({
  productos
}: {
  productos?: IProducto[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos?.length ? productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      )) : (
        <p className='text-muted-foreground'>No se encontraron productos.</p>
      )}
    </div>
  )
}
