"use client"

import { Button } from "@/core/components/ui/button"
import { Label } from "@/core/components/ui/label"
import { RadioGroup, RadioGroupItem } from '@/core/components/ui/radio-group'
import { Separator } from '@/core/components/ui/separator'
import { formatAmount } from '@/core/lib/helpers'
import type { IProducto } from '@/features/productos/types'
import { RotateCcw, Shield, Truck } from "lucide-react"
import { useState } from "react"

interface ProductDetailProps {
  producto: IProducto
}

export default function ProductDetail ({ producto }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Negro")
  // const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  console.log("Producto seleccionado:", producto)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Galería de imágenes */}
      {/* <div className="space-y-4">
        <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={producto.imagenes[selectedImage] || "/placeholder.svg"}
            alt={producto.nombre}
            fill
            className="object-cover"
          />
          {producto.estado === "en oferta" && (
            <Badge variant="destructive" className="absolute top-4 left-4">
              Oferta
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {producto.imagenes.map((imagen, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square relative overflow-hidden rounded-md border-2 transition-colors ${
                selectedImage === index ? "border-gray-900" : "border-gray-200"
              }`}
            >
              <Image
                src={imagen || "/placeholder.svg"}
                alt={`${producto.nombre} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div> */}

      {/* Información del producto */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">{formatAmount(producto.precio)}</span>
          </div>

          <p className="text-muted-foreground">{producto.descripcion}</p>
        </div>

        <Separator />

        {/* Selector de talla */}
        <div>
          <Label className="text-base font-medium mb-3 block">Talla: {selectedSize}</Label>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {producto.productosVariantes.map((variante) => (
              <div key={variante.id}>
                <RadioGroupItem value={variante.talla.nombre} id={`size-${variante.talla.nombre}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${variante.talla.nombre}`}
                  className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white transition-colors"
                >
                  {variante.talla.nombre}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Selector de color */}
        <div>
          <Label className="text-base font-medium mb-3 block">Color: {selectedColor}</Label>
          <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-3">
            {producto.productosVariantes.map((variante) => (
              <div key={variante.color.nombre}>
                <RadioGroupItem value={variante.color.nombre} id={`color-${variante.color.nombre}`} className="peer sr-only" />
                <Label
                  htmlFor={`color-${variante.color.nombre}`}
                  className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 peer-checked:border-gray-900 transition-colors"
                  style={{ backgroundColor: variante.color.codigoHex }}
                  title={variante.color.nombre}
                />
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Cantidad */}
        <div>
          <Label className="text-base font-medium mb-3 block">Cantidad</Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Información adicional */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Truck className="h-5 w-5" />
            <span>Envío gratis en compras mayores a {formatAmount(50)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <RotateCcw className="h-5 w-5" />
            <span>Devoluciones gratuitas hasta 30 días</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-5 w-5" />
            <span>Garantía de calidad</span>
          </div>
        </div>
      </div>
    </div>
  )
}
