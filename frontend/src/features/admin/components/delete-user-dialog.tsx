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
import { actionDeleteUser } from '@/features/auth/actions'
import type { IUsuario } from '@/features/auth/types'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: IUsuario
  onSuccess: () => void
}

export default function DeleteUserDialog ({
  open,
  onOpenChange,
  user,
  onSuccess
}: DeleteUserDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const result = await actionDeleteUser(user.id)

      if (result.success) {
        toast.success(result.message)
        onSuccess()
        onOpenChange(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error('Error eliminando usuario:', error)
      toast.error('Error eliminando usuario')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el usuario{' '}
            <strong>{user.nombre} {user.apellido}</strong> del sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
