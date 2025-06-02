'use client'

import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { Label } from '@/core/components/ui/label'
import { RadioGroup } from '@/core/components/ui/radio-group'
import AgregarCarritoButton from '@/features/carrito/components/agregar-carrito-button'
import ProductVariantOption from '@/features/productos/components/detail/product-variant-option'
import type { IEstadoProducto, IProducto } from '@/features/productos/types'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface ProductVariantSelectorProps {
  producto: IProducto
}

export default function ProductVariantSelector ({ producto }: ProductVariantSelectorProps) {
  const [selectedTalla, setSelectedTalla] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  const { tallasDisponibles, coloresDisponibles } = useMemo(() => {
    const getUniqueVariants = (
      variants: IEstadoProducto[]
    ) => {
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

  const stockDisponible = varianteSeleccionada?.stock || 0

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(stockDisponible, prev + delta)))
  }, [stockDisponible])

  return (
    <div className="space-y-6">
      {varianteSeleccionada && (
        <div className="flex items-center gap-2">
          <Badge variant={stockDisponible > 0 ? "secondary" : "destructive"}>
            {stockDisponible > 0 ? `${stockDisponible} en stock` : 'Sin stock'}
          </Badge>
          {stockDisponible > 0 && stockDisponible <= 5 && (
            <span className="text-sm text-amber-600">¡Últimas unidades!</span>
          )}
        </div>
      )}

      {hasMultipleTallas && (
        <div>
          <Label className="block mb-3 text-base font-medium uppercase">
            Talla: {selectedTalla && <span className="font-normal">{selectedTalla}</span>}
          </Label>
          <RadioGroup
            value={selectedTalla}
            onValueChange={setSelectedTalla}
            className="flex flex-wrap gap-2"
          >
            {tallasDisponibles.map(talla => (
              <ProductVariantOption
                key={talla.id}
                type="talla"
                item={talla}
                selected={selectedTalla}
                onSelect={setSelectedTalla}
                hasStock={producto.productosVariantes.some(v => v.talla.id === talla.id && v.stock > 0)}
              />
            ))}
          </RadioGroup>
        </div>
      )}

      {hasMultipleColors && (
        <div>
          <Label className="block mb-3 text-base font-medium uppercase">
            Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
          </Label>
          <RadioGroup
            value={selectedColor}
            onValueChange={setSelectedColor}
            className="flex flex-wrap gap-3"
          >
            {coloresDisponibles.map(color => (
              <ProductVariantOption
                key={color.id}
                type="color"
                item={color}
                selected={selectedColor}
                onSelect={setSelectedColor}
                hasStock={producto.productosVariantes.some(v => v.color.id === color.id && v.stock > 0)}
              />
            ))}
          </RadioGroup>
        </div>
      )}

      {!hasMultipleTallas && !hasMultipleColors && varianteSeleccionada && (
        <div className="text-sm text-muted-foreground">
          Este producto no tiene variantes de talla o color.
        </div>
      )}

      {varianteSeleccionada && stockDisponible > 0 && (
        <div>
          <Label className="block mb-3 text-base font-medium">Cantidad</Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 font-medium text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= stockDisponible}
            >
              +
            </Button>
          </div>
        </div>
      )}

      <AgregarCarritoButton
        producto={producto}
        variante={varianteSeleccionada}
        cantidad={quantity}
        disabled={!varianteSeleccionada || stockDisponible <= 0}
      />
    </div>
  )
}
