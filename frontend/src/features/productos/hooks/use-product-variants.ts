import type { IEstadoProducto, IProducto, IProductosVariante } from '@/features/productos/types'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface UseProductVariantsReturn {
  selectedTalla: string
  selectedColor: string
  tallasDisponibles: IEstadoProducto[]
  coloresDisponibles: IEstadoProducto[]
  varianteSeleccionada?: IProductosVariante | null
  stockDisponible: number
  hasMultipleTallas: boolean
  hasMultipleColors: boolean
  setSelectedTalla: (talla: string) => void
  setSelectedColor: (color: string) => void
  hasStock: (type: 'talla' | 'color', item: IEstadoProducto) => boolean
}

export function useProductVariants (producto: IProducto): UseProductVariantsReturn {
  const [selectedTalla, setSelectedTalla] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  const { tallasDisponibles, coloresDisponibles } = useMemo(() => {
    const getUniqueVariants = (variants: IEstadoProducto[]) => {
      const uniqueMap = new Map(variants.map(v => [v.id, v]))
      return Array.from(uniqueMap.values()).filter(v => v.nombre?.trim())
    }

    return {
      tallasDisponibles: getUniqueVariants(
        producto.productosVariantes.map(v => v.talla)
      ),
      coloresDisponibles: getUniqueVariants(
        producto.productosVariantes.map(v => v.color)
      )
    }
  }, [producto.productosVariantes])

  const hasMultipleTallas = tallasDisponibles.length > 1
  const hasMultipleColors = coloresDisponibles.length > 1

  const varianteSeleccionada = useMemo(() => {
    const variants = producto.productosVariantes

    if (hasMultipleTallas && hasMultipleColors) {
      if (!selectedTalla || !selectedColor) return null
      return variants.find(v =>
        v.talla.nombre === selectedTalla && v.color.nombre === selectedColor
      )
    }

    if (hasMultipleTallas) {
      if (!selectedTalla) return null
      return variants.find(v => v.talla.nombre === selectedTalla)
    }

    if (hasMultipleColors) {
      if (!selectedColor) return null
      return variants.find(v => v.color.nombre === selectedColor)
    }

    return variants.find(v => v.stock > 0) || variants[0]
  }, [selectedTalla, selectedColor, producto.productosVariantes, hasMultipleTallas, hasMultipleColors])

  useEffect(() => {
    if (hasMultipleTallas && !selectedTalla && tallasDisponibles[0]) {
      setSelectedTalla(tallasDisponibles[0].nombre)
    }
    if (hasMultipleColors && !selectedColor && coloresDisponibles[0]) {
      setSelectedColor(coloresDisponibles[0].nombre)
    }
  }, [tallasDisponibles, coloresDisponibles, hasMultipleTallas, hasMultipleColors, selectedTalla, selectedColor])

  const hasStock = useCallback((type: 'talla' | 'color', item: IEstadoProducto): boolean => {
    return producto.productosVariantes.some(v =>
      v[type].id === item.id && v.stock > 0
    )
  }, [producto.productosVariantes])

  const stockDisponible = varianteSeleccionada?.stock || 0

  return {
    selectedTalla,
    selectedColor,
    tallasDisponibles,
    coloresDisponibles,
    varianteSeleccionada,
    stockDisponible,
    hasMultipleTallas,
    hasMultipleColors,
    setSelectedTalla,
    setSelectedColor,
    hasStock
  }
}
