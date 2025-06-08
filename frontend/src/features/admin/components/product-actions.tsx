'use client'

import { Button } from '@/core/components/ui/button'
import ProductSheet from '@/features/admin/components/product-sheet'
import type { ISubCategoria } from '@/features/categorias/types'
import type { IEstadoProducto, ITallaColor } from '@/features/productos/types'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface IProductActionsProps {
  subCategoriasPromise: Promise<{ success: boolean; data: ISubCategoria[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  estadoProductsPromise: Promise<{ success: boolean; data: IEstadoProducto[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  coloresPromise: Promise<{ success: boolean; data: ITallaColor[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  tallasPromise: Promise<{ success: boolean; data: ITallaColor[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
}

export function ProductActions ({
  subCategoriasPromise,
  estadoProductsPromise,
  coloresPromise,
  tallasPromise
}: IProductActionsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="flex space-x-2">
      <Button onClick={() => setShowCreateDialog(true)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Agregar Producto
      </Button>

      <ProductSheet
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        subCategoriasPromise={subCategoriasPromise}
        estadoProductsPromise={estadoProductsPromise}
        coloresPromise={coloresPromise}
        tallasPromise={tallasPromise}
        mode="create"
      />
    </div>
  )
}
