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
  disabled?: boolean
}

export default function AgregarCarritoButton ({
  producto,
  variante,
  cantidad,
  disabled
}: AgregarCarritoButtonProps) {
  const { addItem, isItemInCart } = useCarritoStore()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (disabled || variante?.stock === 0) return

    setIsAdding(true)

    try {
      const principalImagen = producto.imagenes.find(img => img.principal)?.urlImagen || producto.imagenes[0]?.urlImagen

      const carritoItem = {
        productoId: producto.id || 0,
        varianteId: variante?.id || 0,
        nombre: producto.nombre || '',
        precio: producto.precio || 0,
        cantidad: cantidad || 1,
        talla: variante?.talla.nombre || '',
        color: variante?.color.nombre || '',
        codigoHexColor: variante?.color.codigoHex || '',
        stock: variante?.stock || 0,
        imagen: principalImagen
      }

      addItem(carritoItem)

      const talla = variante?.talla.nombre ? `Talla: ${variante.talla.nombre}` : ''
      const color = variante?.color.nombre ? `Color: ${variante.color.nombre}` : ''

      toast.success('Producto agregado al carrito', {
        description: `${producto.nombre} ${talla} ${color}`
      })
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      toast.error(`Error al agregar el producto al carrito: ${msg}`)
    }
  }

  const estaEnCarrito = isItemInCart(producto.id, variante?.id)
  const noDisponible = disabled || (variante && variante.stock === 0)

  if (noDisponible) {
    return (
      <Button variant='ghost' disabled className='cursor-not-allowed'>
        <ShoppingCartIcon />
        {disabled ? 'No está disponible' : 'Sin Stock'}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className='w-full'
    >
      {isAdding ? (
        <>
          <CheckIcon />
          Agregado
        </>
      ) : (
        <>
          <ShoppingCartIcon />
          {estaEnCarrito ? 'En el Carrito' : 'Agregar al Carrito'}
        </>
      )}
    </Button>
  )
}
