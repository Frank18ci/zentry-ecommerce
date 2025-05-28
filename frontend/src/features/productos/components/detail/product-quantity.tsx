'use client'

import { Button } from '@/core/components/ui/button'
import { Label } from '@/core/components/ui/label'
import { useState } from 'react'

export default function ProductQuantity () {
  const [quantity, setQuantity] = useState(1)

  return (
    <div>
      <Label className="text-base font-medium mb-3 block">CANTIDAD</Label>
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
  )
}
