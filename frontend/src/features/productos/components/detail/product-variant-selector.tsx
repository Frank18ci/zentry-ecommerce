'use client'

import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { Label } from '@/core/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/core/components/ui/radio-group'
import AgregarCarritoButton from '@/features/carrito/components/agregar-carrito-button'
import type { IProducto } from '@/features/productos/types'
import { useEffect, useMemo, useState } from 'react'

interface ProductVariantSelectorProps {
  producto: IProducto
}

export default function ProductVariantSelector ({ producto }: ProductVariantSelectorProps) {
  const [selectedTalla, setSelectedTalla] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  // Obtener variantes únicas por talla y color (filtrar valores vacíos o por defecto)
  const tallasDisponibles = useMemo(() => {
    const tallas = producto.productosVariantes.map(v => v.talla)
    const tallasUnicas = Array.from(new Map(tallas.map(t => [t.id, t])).values())
    // Filtrar tallas que no sean válidas (ej: nombre vacío, "N/A", "Default", etc.)
    return tallasUnicas.filter(t => t.nombre && t.nombre.trim() !== '' && !['N/A', 'DEFAULT', 'NONE'].includes(t.nombre.toUpperCase()))
  }, [producto.productosVariantes])

  const coloresDisponibles = useMemo(() => {
    const colores = producto.productosVariantes.map(v => v.color)
    const coloresUnicos = Array.from(new Map(colores.map(c => [c.id, c])).values())
    // Filtrar colores que no sean válidos (ej: nombre vacío, "N/A", "Default", etc.)
    return coloresUnicos.filter(c => c.nombre && c.nombre.trim() !== '' && !['N/A', 'DEFAULT', 'NONE'].includes(c.nombre.toUpperCase()))
  }, [producto.productosVariantes])

  // Determinar si el producto tiene variantes reales
  const tieneVariantesTalla = tallasDisponibles.length > 1
  const tieneVariantesColor = coloresDisponibles.length > 1

  // Encontrar la variante seleccionada
  const varianteSeleccionada = useMemo(() => {
    if (tieneVariantesTalla && tieneVariantesColor) {
      // Producto con variantes de talla y color
      if (!selectedTalla || !selectedColor) return null
      return producto.productosVariantes.find(v =>
        v.talla.nombre === selectedTalla && v.color.nombre === selectedColor
      )
    } else if (tieneVariantesTalla && !tieneVariantesColor) {
      // Solo variantes de talla
      if (!selectedTalla) return null
      return producto.productosVariantes.find(v => v.talla.nombre === selectedTalla)
    } else if (!tieneVariantesTalla && tieneVariantesColor) {
      // Solo variantes de color
      if (!selectedColor) return null
      return producto.productosVariantes.find(v => v.color.nombre === selectedColor)
    } else {
      // Sin variantes - tomar la primera variante disponible
      return producto.productosVariantes.find(v => v.stock > 0) || producto.productosVariantes[0]
    }
  }, [selectedTalla, selectedColor, producto.productosVariantes, tieneVariantesTalla, tieneVariantesColor])

  // Verificar si una combinación está disponible
  const isCombinacionDisponible = (tallaNombre?: string, colorNombre?: string) => {
    return producto.productosVariantes.some(v => {
      const tallaMatch = !tieneVariantesTalla || !tallaNombre || v.talla.nombre === tallaNombre
      const colorMatch = !tieneVariantesColor || !colorNombre || v.color.nombre === colorNombre
      return tallaMatch && colorMatch && v.stock > 0
    })
  }

  // Establecer valores iniciales
  useEffect(() => {
    if (tieneVariantesTalla && tallasDisponibles.length > 0 && !selectedTalla) {
      setSelectedTalla(tallasDisponibles[0].nombre)
    }
    if (tieneVariantesColor && coloresDisponibles.length > 0 && !selectedColor) {
      setSelectedColor(coloresDisponibles[0].nombre)
    }
  }, [tallasDisponibles, coloresDisponibles, tieneVariantesTalla, tieneVariantesColor, selectedTalla, selectedColor])

  const stockDisponible = varianteSeleccionada?.stock || 0
  const maxQuantity = Math.min(10, stockDisponible) // Límite máximo de 10 por compra
  return (
    <div className="space-y-6">
      {/* Selector de Talla - Solo mostrar si hay múltiples tallas */}
      {tieneVariantesTalla && (
        <div>
          <Label className="text-base font-medium mb-3 block">
            Talla: {selectedTalla && <span className="font-normal">{selectedTalla}</span>}
          </Label>
          <RadioGroup
            value={selectedTalla}
            onValueChange={setSelectedTalla}
            className="flex flex-wrap gap-2"
          >
            {tallasDisponibles.map((talla) => {
              const tieneStock = tieneVariantesColor
                ? isCombinacionDisponible(talla.nombre, selectedColor)
                : producto.productosVariantes.some(v => v.talla.id === talla.id && v.stock > 0)

              return (
                <div key={talla.id}>
                  <RadioGroupItem
                    value={talla.nombre}
                    id={`talla-${talla.nombre}`}
                    className="peer sr-only"
                    disabled={!tieneStock}
                  />
                  <Label
                    htmlFor={`talla-${talla.nombre}`}
                    className={`flex items-center justify-center w-12 h-12 border rounded-md cursor-pointer transition-colors
                      ${tieneStock
                        ? 'hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white'
                        : 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                      }`}
                  >
                    {talla.nombre}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
      )}

      {/* Selector de Color - Solo mostrar si hay múltiples colores */}
      {tieneVariantesColor && (
        <div>
          <Label className="text-base font-medium mb-3 block">
            Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
          </Label>
          <RadioGroup
            value={selectedColor}
            onValueChange={setSelectedColor}
            className="flex flex-wrap gap-3"
          >
            {coloresDisponibles.map((color) => {
              const tieneStock = tieneVariantesTalla
                ? isCombinacionDisponible(selectedTalla, color.nombre)
                : producto.productosVariantes.some(v => v.color.id === color.id && v.stock > 0)

              return (
                <div key={color.id}>
                  <RadioGroupItem
                    value={color.nombre}
                    id={`color-${color.nombre}`}
                    className="peer sr-only"
                    disabled={!tieneStock}
                  />
                  <Label
                    htmlFor={`color-${color.nombre}`}
                    className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition-colors
                      ${tieneStock
                        ? 'hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50'
                        : 'opacity-50 cursor-not-allowed bg-gray-100'
                      }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.codigoHex }}
                    />
                    <span className="text-sm">{color.nombre}</span>
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
      )}

      {/* Información de Stock */}
      {varianteSeleccionada && (
        <div className="flex items-center gap-2">
          <Badge variant={stockDisponible > 0 ? "default" : "destructive"}>
            {stockDisponible > 0 ? `${stockDisponible} en stock` : 'Sin stock'}
          </Badge>
          {stockDisponible > 0 && stockDisponible <= 5 && (
            <span className="text-sm text-amber-600">¡Últimas unidades!</span>
          )}
        </div>
      )}

      {/* Mensaje cuando no hay variantes */}
      {!tieneVariantesTalla && !tieneVariantesColor && varianteSeleccionada && (
        <div className="text-sm text-muted-foreground">
          Este producto no tiene variantes de talla o color.
        </div>
      )}

      {/* Selector de Cantidad */}
      {varianteSeleccionada && stockDisponible > 0 && (
        <div>
          <Label className="text-base font-medium mb-3 block">Cantidad</Label>
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
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              disabled={quantity >= maxQuantity}
            >
              +
            </Button>
          </div>
          {maxQuantity < stockDisponible && (
            <p className="text-xs text-muted-foreground mt-1">
              Máximo {maxQuantity} unidades por compra
            </p>
          )}
        </div>
      )}

      {/* Botón Agregar al Carrito */}
      <AgregarCarritoButton
        producto={producto}
        variante={varianteSeleccionada}
        cantidad={quantity}
        className="w-full"
      />
    </div>
  )
}
