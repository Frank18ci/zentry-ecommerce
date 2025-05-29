'use client'

import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { Separator } from '@/core/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/core/components/ui/sheet'
import { formatAmount } from '@/core/lib/helpers'
import { useCarritoStore } from '@/features/carrito/store/carrito-store'
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CarritoDrawer () {
  const [isHydrated, setIsHydrated] = useState(false)

  const {
    items,
    isOpen,
    toggleCart,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getResumen
  } = useCarritoStore()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const resumen = isHydrated ? getResumen() : { cantidadItems: 0, subtotal: 0, impuestos: 0, envio: 0, total: 0 }

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCartIcon className="w-5 h-5" />
          {resumen.cantidadItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs rounded-full -top-2 -right-2"
            >
              {resumen.cantidadItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>
              Carrito de Compras ({resumen.cantidadItems})
            </SheetTitle>
          </div>
          <SheetDescription>
            Revisa tus productos antes de proceder al checkout
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col px-4 pb-5 grow'>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-8">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted">
                <ShoppingCartIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Tu carrito está vacío</h3>
              <p className="mb-4 text-center text-muted-foreground">
                Agrega algunos productos para empezar
              </p>
              <Button asChild onClick={closeCart}>
                <Link href="/productos">
                  Ver Productos
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              {/* Lista de productos */}
              <div className="flex-1 mb-4 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    {/* Imagen del producto */}
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md bg-muted">
                      {item.imagen ? (
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <ShoppingCartIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 text-sm font-medium truncate">{item.nombre}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">Talla: {item.talla}</span>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 border border-gray-300 rounded-full"
                            style={{ backgroundColor: item.codigoHexColor }}
                          />
                          <span className="text-xs text-muted-foreground">{item.color}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {formatAmount(item.precio)}
                        </span>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          >
                            <MinusIcon className="w-3 h-3" />
                          </Button>

                          <span className="w-8 text-sm font-medium text-center">
                            {item.cantidad}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.stock}
                          >
                            <PlusIcon className="w-3 h-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <TrashIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Resumen de precios */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatAmount(resumen.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>IGV (18%):</span>
                  <span>{formatAmount(resumen.impuestos)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío:</span>
                  <span>
                    {resumen.envio === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      formatAmount(resumen.envio)
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{formatAmount(resumen.total)}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-2">
                <Button asChild className="w-full" onClick={closeCart}>
                  <Link href="/carrito">
                    <ShoppingCartIcon />
                    Ver Carrito Completo
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={clearCart}
                >
                  <TrashIcon />
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
