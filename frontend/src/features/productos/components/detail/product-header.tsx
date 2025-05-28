import { formatAmount } from '@/core/lib/helpers'
import type { IProducto } from '@/features/productos/types'

export default function ProductHeader ({ producto }: { producto: IProducto }) {
  return (
    <header className='flex flex-col gap-2'>
      <h1 className="text-5xl text-balance font-bold mb-2">{producto.nombre}</h1>

      <div className="flex items-center gap-3 bg-primary text-primary-foreground w-max px-3 py-1 rounded-full">
        <span className="text-xl font-bold">{formatAmount(producto.precio)}</span>
      </div>

      <p className="text-muted-foreground">{producto.descripcion}</p>
    </header>
  )
}
