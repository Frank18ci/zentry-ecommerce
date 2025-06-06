import type { IUsuario } from '@/features/auth/types'
import { useState } from 'react'

export default function useUsersActions () {
  const [selectedUser, setSelectedUser] = useState<IUsuario | null>(null)
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleEdit = (user: IUsuario) => {
    setSelectedUser(user)
    setDialogMode('edit')
  }

  const handleDelete = (user: IUsuario) => {
    setSelectedUser(user)
    setShowDeleteDialog(true)
  }

  const handleDialogClose = () => {
    setSelectedUser(null)
    setDialogMode(null)
  }

  const handleDeleteSuccess = () => {
    setShowDeleteDialog(false)
    setSelectedUser(null)
  }

  return {
    selectedUser,
    dialogMode,
    showDeleteDialog,
    setSelectedUser,
    setDialogMode,
    setShowDeleteDialog,
    handleEdit,
    handleDelete,
    handleDialogClose,
    handleDeleteSuccess
  }
}
