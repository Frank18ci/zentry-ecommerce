import { PRECIO_ENVIO_GRATIS } from '@/core/lib/constants'
import { formatAmount } from '@/core/lib/helpers'
import { RotateCcwIcon, ShieldIcon, TruckIcon } from 'lucide-react'

export default function ProductExtraInfo () {
  return (
    <div className="space-y-4 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <TruckIcon className="h-5 w-5" />
        <span>Envío gratis en compras mayores a {formatAmount(PRECIO_ENVIO_GRATIS)}</span>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <RotateCcwIcon className="h-5 w-5" />
        <span>Devoluciones gratuitas hasta 30 días</span>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <ShieldIcon className="h-5 w-5" />
        <span>Garantía de calidad</span>
      </div>
    </div>
  )
}
