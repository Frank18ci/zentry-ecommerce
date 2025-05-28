"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/core/components/ui/carousel"
import type { IProducto } from '@/features/productos/types'
import Autoplay from "embla-carousel-autoplay"
import ProductCard from './product-card'

interface ProductsCarouselProps {
  productos: IProducto[]
}

export default function ProductsCarousel ({
  productos
}: ProductsCarouselProps) {
  if (!productos.length) return null

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
          {productos.map((producto) => (
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
