'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/core/components/ui/carousel"
import type { IResponseProducto } from '@/features/productos/types'
import Autoplay from "embla-carousel-autoplay"
import { use } from 'react'
import ProductCard from './product-card'

export default function ProductsCarousel ({
  productosPromise
}: {
  productosPromise: Promise<{ success: boolean; data: IResponseProducto; message?: undefined } | { success: boolean; message: string; data?: undefined }>
}) {
  const { data: productos, success } = use(productosPromise)

  if (!success || !productos || !productos.content || productos.content.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-64'>
        <p className='text-muted-foreground'>No hay productos destacados disponibles en este momento.</p>
      </div>
    )
  }

  return (
    <div
      className='flex flex-col gap-5 w-full'
    >
      {/* Header */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Productos Destacados</h2>
        <p className="text-muted-foreground">
          Descubre nuestra selección de productos más populares
        </p>
      </div>

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000
          })
        ]}
        opts={{
          loop: true,
          align: 'start'
        }}
        className='w-full container mx-auto'
      >
        <CarouselContent>
          {productos?.content?.map((producto) => (
            <CarouselItem key={producto.id} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4 select-none cursor-move'>
              <ProductCard producto={producto} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex' />
        <CarouselNext className='hidden md:flex' />
      </Carousel>
    </div>
  )
}
