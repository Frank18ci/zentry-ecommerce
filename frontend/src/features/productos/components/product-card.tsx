import { Badge } from '@/core/components/ui/badge'
import { formatAmount } from '@/core/lib/helpers'
import type { IProducto } from '@/features/productos/types'
import Image from 'next/image'
import Link from "next/link"

interface IProductCardProps {
  producto: IProducto
}

export default function ProductCard ({ producto }: IProductCardProps) {
  const imgPrincipal = producto.imagenes.find(img => img.principal) || producto.imagenes[0] || { urlImagen: '/vercel.svg' }

  return (
    <Link
      href={`/productos/${producto.id}`}
      className="flex flex-col group relative border-4 hover:shadow-xl hover:shadow-black/[0.04] hover:border-primary transition-all duration-300"
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={imgPrincipal?.urlImagen}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Categoría */}
        <Badge variant='secondary' className="absolute z-10 top-3 right-3">
          {producto.subCategoria.nombre}
        </Badge>

        {/* Información de producto */}
        <div className="absolute z-10 flex items-center justify-between gap-4 p-2 transition-all duration-300 border-2 rounded-full bottom-2 left-2 right-2 bg-background/70 backdrop-blur group-hover:bg-background">
          <h3 className="text-xs font-bold line-clamp-1 text-balance">
            {producto.nombre}
          </h3>
          <span className="px-2 py-1 text-sm font-bold rounded-full bg-primary">{formatAmount(producto.precio)}</span>
        </div>
      </div>
    </Link>
  )
}
