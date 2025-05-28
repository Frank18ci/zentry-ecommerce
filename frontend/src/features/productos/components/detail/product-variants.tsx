'use client'

import { Label } from '@/core/components/ui/label'
import type { IProducto } from '@/features/productos/types'
import { useState } from 'react'

export default function ProductVariants ({
  producto
}: {
  producto: IProducto
}) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Negro")

  return (
    <div className='flex flex-col gap-5'>
      {producto.productosVariantes.length > 0 && (
        <>
          {/* Selector de color */}
          <div>
            <Label className="text-base font-medium mb-3 block">COLOR</Label>
            <div className="flex gap-3">
              {producto.productosVariantes.map((variante) => (
                <div key={variante.color.nombre} className="relative">
                  <input
                    type="radio"
                    value={variante.color.nombre}
                    id={`color-${variante.color.nombre}`}
                    name="color"
                    checked={selectedColor === variante.color.nombre}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`color-${variante.color.nombre}`}
                    className="flex items-center justify-center p-2 border-2 cursor-pointer transition-colors peer-checked:border-gray-900 peer-checked:bg-primary peer-checked:text-primary-foreground"
                    title={variante.color.nombre}
                  >
                    {variante.color.nombre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Selector de talla */}
          <div>
            <Label className="text-base font-medium mb-3 block">TALLA</Label>
            <div className="flex flex-wrap gap-3">
              {producto.productosVariantes.map((variante) => (
                <div key={variante.id}>
                  <input
                    type="radio"
                    value={variante.talla.nombre}
                    id={`size-${variante.talla.nombre}`}
                    name="size"
                    checked={selectedSize === variante.talla.nombre}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`size-${variante.talla.nombre}`}
                    className="flex items-center justify-center w-14 p-2 border-2 cursor-pointer transition-colors peer-checked:border-gray-900 peer-checked:bg-primary peer-checked:text-primary-foreground"
                  >
                    {variante.talla.nombre}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
