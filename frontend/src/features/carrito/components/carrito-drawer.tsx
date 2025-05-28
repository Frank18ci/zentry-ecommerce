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

export default function CarritoDrawer () {
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

  const resumen = getResumen()

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {resumen.cantidadItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
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

        <div className='px-4 flex flex-col grow pb-5'>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingCartIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Tu carrito está vacío</h3>
              <p className="text-muted-foreground text-center mb-4">
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
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    {/* Imagen del producto */}
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {item.imagen ? (
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCartIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate mb-1">{item.nombre}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">Talla: {item.talla}</span>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.codigoHexColor }}
                          />
                          <span className="text-xs text-muted-foreground">{item.color}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
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
                            <MinusIcon className="h-3 w-3" />
                          </Button>

                          <span className="w-8 text-center text-sm font-medium">
                            {item.cantidad}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.stock}
                          >
                            <PlusIcon className="h-3 w-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <TrashIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Resumen de precios */}
              <div className="space-y-2 mb-4">
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
