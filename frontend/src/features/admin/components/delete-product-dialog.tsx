'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/core/components/ui/alert-dialog'
import { eliminarProducto } from '@/features/productos/actions'
import { IProducto } from '@/features/productos/types'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: IProducto
  onSuccess: () => void
}

export function DeleteProductDialog ({
  open,
  onOpenChange,
  product,
  onSuccess
}: DeleteProductDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await eliminarProducto(product.id)
      toast.success('Producto eliminado con éxito')
      onSuccess()
    } catch (error) {
      console.error('Error eliminando producto: ', error)
      toast.error('Error eliminando producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás 100% seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el producto
            &quot;{product.nombre}&quot; de tu inventario.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
