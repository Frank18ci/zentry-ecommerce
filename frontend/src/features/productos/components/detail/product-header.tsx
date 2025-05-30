import { formatAmount } from '@/core/lib/helpers'
import type { IProducto } from '@/features/productos/types'

export default function ProductHeader ({ producto }: { producto: IProducto }) {
  return (
    <header className='flex flex-col gap-3'>
      <div className="flex flex-col gap-1">
        <h1 className="text-5xl font-bold text-balance">{producto.nombre}</h1>
        <p className="text-muted-foreground">{producto.descripcion}</p>
      </div>

      <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-primary text-primary-foreground w-max">
        <span className="text-xl font-bold">{formatAmount(producto.precio)}</span>
      </div>
    </header>
  )
}
