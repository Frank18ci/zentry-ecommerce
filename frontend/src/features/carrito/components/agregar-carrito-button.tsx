'use client'

import { Button } from '@/core/components/ui/button'
import { useCarritoStore } from '@/features/carrito/store/carrito-store'
import type { IProducto, IProductosVariante } from '@/features/productos/types'
import { CheckIcon, ShoppingCartIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface AgregarCarritoButtonProps {
  producto: IProducto
  variante?: IProductosVariante | null
  cantidad: number
  className?: string
  disabled?: boolean
}

export default function AgregarCarritoButton ({
  producto,
  variante,
  cantidad,
  className,
  disabled
}: AgregarCarritoButtonProps) {
  const { addItem, openCart, isItemInCart } = useCarritoStore()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (disabled || variante?.stock === 0) return

    setIsAdding(true)

    try {
      const carritoItem = {
        productoId: producto.id,
        varianteId: variante?.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        talla: variante?.talla.nombre,
        color: variante?.color.nombre,
        codigoHexColor: variante?.color.codigoHex,
        stock: variante?.stock
      }

      addItem(carritoItem)

      toast.success('Producto agregado al carrito', {
        description: `${producto.nombre} ${variante?.talla.nombre || ''} ${variante?.color.nombre || ''}`,
        action: {
          label: 'Ver carrito',
          onClick: () => openCart()
        }
      })
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      toast.error(`Error al agregar el producto al carrito: ${msg}`)
    }
  }

  const estaEnCarrito = isItemInCart(producto.id, variante?.id)
  const sinStock = variante?.stock === 0

  if (sinStock) {
    return (
      <Button disabled className={className}>
        Sin Stock
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className={className}
    >
      {isAdding ? (
        <>
          <CheckIcon className="mr-2 h-4 w-4" />
          Agregado
        </>
      ) : estaEnCarrito ? (
        <>
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          Agregar Más
        </>
      ) : (
        <>
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </>
      )}
    </Button>
  )
}
