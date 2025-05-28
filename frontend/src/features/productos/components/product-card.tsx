'use client'

import Link from "next/link"

import { Badge } from '@/core/components/ui/badge'
import { Button, buttonVariants } from '@/core/components/ui/button'
import { formatAmount } from '@/core/lib/helpers'
import { useCarritoStore } from '@/features/carrito/store/carrito-store'
import type { IProducto } from '@/features/productos/types'
import { ChevronRightIcon, ImageIcon, ShoppingCartIcon } from 'lucide-react'
import { toast } from 'sonner'

interface IProductCardProps {
  producto: IProducto
}

export default function ProductCard ({ producto }: IProductCardProps) {
  const { addItem, openCart } = useCarritoStore()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Encontrar la primera variante disponible
    const primeraVarianteDisponible = producto.productosVariantes.find(v => v.stock > 0)

    if (!primeraVarianteDisponible) {
      toast.error('Producto sin stock disponible')
      return
    }

    const carritoItem = {
      productoId: producto.id,
      varianteId: primeraVarianteDisponible.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      talla: primeraVarianteDisponible.talla.nombre,
      color: primeraVarianteDisponible.color.nombre,
      codigoHexColor: primeraVarianteDisponible.color.codigoHex,
      stock: primeraVarianteDisponible.stock
    }

    addItem(carritoItem)

    toast.success('Producto agregado al carrito', {
      action: {
        label: 'Ver carrito',
        onClick: () => openCart()
      }
    })
  }

  const tieneStock = producto.productosVariantes.some(v => v.stock > 0)
  return (
    <div className="flex flex-col justify-between group relative rounded-xl border overflow-hidden hover:shadow-xl hover:shadow-black/[0.04] hover:border-gray-300/60 transition-all duration-300">
      {/* Product Image Placeholder */}
      <div className="aspect-[4/3] grow relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <ImageIcon />
          </div>
        </div>

        {/* Category Badge */}
        <Badge variant='outline' className="absolute top-3 right-3">
          {producto.subCategoria.nombre}
        </Badge>
      </div>

      <div className="p-5">
        <Link href={`/productos/${producto.id}`} className="group/link">
          <h3 className="font-semibold mb-2 group-hover/link:text-blue-600 transition-colors duration-200 line-clamp-1">
            {producto.nombre}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {producto.descripcion}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{formatAmount(producto.precio)}</span>
            <span className="text-xs text-muted-foreground">Precio unitario</span>
          </div>

          <div className="flex items-center gap-2">
            {tieneStock && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleQuickAdd}
                className="h-8 w-8 p-0"
              >
                <ShoppingCartIcon className="h-4 w-4" />
              </Button>
            )}
            <Link href={`/productos/${producto.id}`} className={buttonVariants({ size: "sm" })}>
              Ver más
              <ChevronRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
