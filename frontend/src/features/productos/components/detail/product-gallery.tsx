'use client'

import { Badge } from '@/core/components/ui/badge'
import { ENombreEstadoProducto, type IProducto } from '@/features/productos/types'
import Image from 'next/image'
import { useState } from 'react'

const variantsBadgeEstadoProducto = {
  [ENombreEstadoProducto.DESCONTINUADO]: "destructive",
  [ENombreEstadoProducto.DISPONIBLE]: "default",
  [ENombreEstadoProducto.NUEVO]: "default",
  [ENombreEstadoProducto.PREVENTA]: "warning",
  [ENombreEstadoProducto.EN_OFERTA]: "success",
  [ENombreEstadoProducto.AGOTADO]: "destructive"
} as const

export default function ProductGallery ({
  producto
}: {
  producto: IProducto & {
    imagenes: string[]
  }
}) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={producto.imagenes[selectedImage] || "/vercel.svg"}
          alt={producto.nombre}
          fill
          className="object-cover"
        />
        <Badge variant={variantsBadgeEstadoProducto[producto.estadoProducto.nombre]} className='capitalize absolute top-3 left-3 z-10'>
          {producto.estadoProducto.nombre}
        </Badge>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {producto.imagenes.map((imagen, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square relative overflow-hidden rounded-md border-2 transition-colors ${selectedImage === index ? "border-primary" : "border-muted"
              }`}
          >
            <Image
              src={imagen || "/vercel.svg"}
              alt={`${producto.nombre} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
