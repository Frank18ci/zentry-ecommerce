import { Label } from '@/core/components/ui/label'
import type { IEstadoProducto } from '@/features/productos/types'

interface ProductVariantOptionProps {
  type: 'talla' | 'color'
  item: IEstadoProducto
  selected: string
  onSelect: (value: string) => void
  hasStock: boolean
}

export default function ProductVariantOption ({
  type,
  item,
  selected,
  onSelect,
  hasStock
}: ProductVariantOptionProps) {
  const isSelected = selected === item.nombre
  const isTalla = type === 'talla'

  const baseClasses = "flex items-center justify-center border rounded-md cursor-pointer transition-colors"
  const sizeClasses = isTalla ? "w-12 h-12" : "gap-2 px-3 py-2"
  const stateClasses = hasStock
    ? `hover:border-gray-400 ${isSelected ? 'bg-secondary border-secondary text-secondary-foreground' : ''}`
    : 'opacity-50 cursor-not-allowed bg-gray-100'

  return (
    <div>
      <input
        type="radio"
        name={type}
        id={`${type}-${item.id}`}
        className="sr-only peer"
        disabled={!hasStock}
        checked={isSelected}
        onChange={() => onSelect(item.nombre)}
      />
      <Label
        htmlFor={`${type}-${item.id}`}
        className={`${baseClasses} ${sizeClasses} ${stateClasses}`}
      >
        {!isTalla && (
          <div
            className="w-4 h-4 border border-gray-300 rounded-full"
            style={{ backgroundColor: item.codigoHex }}
          />
        )}
        <span className={!isTalla ? 'text-sm' : ''}>{item.nombre}</span>
      </Label>
    </div>
  )
}
