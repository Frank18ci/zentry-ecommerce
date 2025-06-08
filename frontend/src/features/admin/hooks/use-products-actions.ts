import type { IProducto } from '@/features/productos/types'
import { useState } from 'react'

export default function useProductsActions () {
  const [selectedProduct, setSelectedProduct] = useState<IProducto | null>(null)
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleEdit = (product: IProducto) => {
    setSelectedProduct(product)
    setDialogMode('edit')
  }

  const handleDelete = (product: IProducto) => {
    setSelectedProduct(product)
    setShowDeleteDialog(true)
  }

  const handleDialogClose = () => {
    setSelectedProduct(null)
    setDialogMode(null)
  }

  const handleDeleteSuccess = () => {
    setShowDeleteDialog(false)
    setSelectedProduct(null)
  }

  return {
    selectedProduct,
    dialogMode,
    showDeleteDialog,
    setSelectedProduct,
    setDialogMode,
    setShowDeleteDialog,
    handleEdit,
    handleDelete,
    handleDialogClose,
    handleDeleteSuccess
  }
}
