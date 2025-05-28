'use client'

import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { useCarritoStore } from '@/features/carrito/store/carrito-store'
import { ShoppingCartIcon } from 'lucide-react'

export default function CarritoIndicator () {
  const { toggleCart, getItemCount } = useCarritoStore()
  const itemCount = getItemCount()

  return (
    <Button variant="outline" size="icon" className="relative" onClick={toggleCart}>
      <ShoppingCartIcon className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  )
}
