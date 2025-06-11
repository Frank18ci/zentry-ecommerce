'use client'

import { Badge } from '@/core/components/ui/badge'
import { ENombreEstadoProducto, type IImagen, type IProducto } from '@/features/productos/types'
import Image from 'next/image'
import { useState } from 'react'

const variantsBadgeEstadoProducto = {
  [ENombreEstadoProducto.DESCONTINUADO]: "destructive",
  [ENombreEstadoProducto.DISPONIBLE]: "default",
  [ENombreEstadoProducto.NUEVO]: "default",
  [ENombreEstadoProducto.EDICION_LIMITADA]: "warning",
  [ENombreEstadoProducto.EN_OFERTA]: "success",
  [ENombreEstadoProducto.AGOTADO]: "destructive",
  [ENombreEstadoProducto.EN_REVISION]: "secondary",
  [ENombreEstadoProducto.LIQUIDACION]: "destructive",
  [ENombreEstadoProducto.PROXIMAMENTE]: "secondary",
} as const

export default function ProductGallery ({
  producto
}: {
  producto: IProducto
}) {
  const principalImage = producto.imagenes.find(imagen => imagen.principal) || producto.imagenes[0] || { urlImagen: '/vercel.svg' }

  const [selectedImage, setSelectedImage] = useState<IImagen>(principalImage)

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={selectedImage?.urlImagen || principalImage.urlImagen || "/vercel.svg"}
          alt={producto.nombre}
          fill
          className="object-cover"
        />
        <Badge
          variant={variantsBadgeEstadoProducto[producto.estadoProducto.nombre]}
          className='absolute z-10 capitalize top-3 left-3'>
          {producto.estadoProducto.nombre}
        </Badge>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {producto.imagenes.map((imagen, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(imagen)}
            className={`aspect-square relative overflow-hidden rounded-md border-2 transition-colors ${selectedImage.id === imagen.id ? "border-primary" : "border-muted"
              }`}
          >
            <Image
              src={imagen.urlImagen || "/vercel.svg"}
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
