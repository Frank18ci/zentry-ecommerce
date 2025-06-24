'use client'

import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import { Separator } from '@/core/components/ui/separator'
import { formatAmount } from '@/core/lib/helpers'
import { useCarritoStore } from '@/features/carrito/store/carrito-store'
import { ArrowLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CarritoPage () {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getResumen
  } = useCarritoStore()

  const resumen = getResumen()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingCartIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8">
            Descubre nuestros productos y agrega algunos a tu carrito para empezar tu compra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/productos">
                <ShoppingCartIcon className="mr-2 h-4 w-4" />
                Explorar Productos
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/productos">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Carrito de Compras</h1>
            <p className="text-muted-foreground">
              {resumen.cantidadItems} {resumen.cantidadItems === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Productos</h2>
              <Button
                variant="ghost"
                size="sm"
                className='text-destructive hover:text-destructive'
                onClick={clearCart}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Vaciar Carrito
              </Button>
            </div>

            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Imagen del producto */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.imagen ? (
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCartIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.nombre}</h3>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="outline">Talla: {item.talla}</Badge>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.codigoHexColor }}
                              />
                              <span className="text-sm text-muted-foreground">{item.color}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Stock disponible: {item.stock} unidades
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold">
                            {formatAmount(item.precio)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            c/u
                          </span>
                        </div>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>

                          <span className="w-12 text-center font-medium">
                            {item.cantidad}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.stock}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 text-right">
                        <span className="text-lg font-bold">
                          Subtotal: {formatAmount(item.precio * item.cantidad)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatAmount(resumen.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IGV (18%):</span>
                    <span>{formatAmount(resumen.impuestos)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span>
                      {resumen.envio === 0 ? (
                        <span className="text-green-600 font-medium">Gratis</span>
                      ) : (
                        formatAmount(resumen.envio)
                      )}
                    </span>
                  </div>                  {resumen.subtotal > 0 && (resumen.subtotal + resumen.impuestos) < 50 && (
                    <div className="text-xs text-muted-foreground">
                      Agrega {formatAmount(50 - (resumen.subtotal + resumen.impuestos))} más para envío gratis
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatAmount(resumen.total)}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button asChild className="w-full">
                    <Link href="/checkout">
                      Proceder al Checkout
                      <ChevronRightIcon />
                    </Link>
                  </Button>

                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/productos">
                      Seguir Comprando
                    </Link>
                  </Button>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Envío gratis en compras mayores a {formatAmount(50)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
