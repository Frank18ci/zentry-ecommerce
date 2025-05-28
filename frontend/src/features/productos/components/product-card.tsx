import Link from "next/link"

import { formatAmount } from '@/core/lib/helpers'
import type { IProducto } from '@/features/productos/types'

interface IProductCardProps {
  producto: IProducto
}

export default function ProductCard ({ producto }: IProductCardProps) {
  return (
    <div className="group relative rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <Link href={`/productos/${producto.id}`}>
          <h3 className="font-bold">{producto.nombre}</h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{producto.descripcion}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{formatAmount(producto.precio)}</span>

          <span className="text-xs text-muted-foreground uppercase">{producto.subCategoria.nombre}</span>
        </div>
      </div>
    </div>
  )
}
