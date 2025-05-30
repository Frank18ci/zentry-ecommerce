import { useCallback, useState } from 'react'

interface UseQuantitySelectorReturn {
  quantity: number
  maxQuantity: number
  handleQuantityChange: (delta: number) => void
  setQuantity: (quantity: number) => void
}

export function useQuantitySelector (stockDisponible: number): UseQuantitySelectorReturn {
  const [quantity, setQuantity] = useState(1)

  const maxQuantity = Math.min(10, stockDisponible)

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(maxQuantity, prev + delta)))
  }, [maxQuantity])

  return {
    quantity,
    maxQuantity,
    handleQuantityChange,
    setQuantity
  }
}
