'use client'

import { Button } from '@/core/components/ui/button'
import useUsersActions from '@/features/admin/hooks/use-users-actions'
import type { IRol } from '@/features/auth/types'
import { Plus } from 'lucide-react'
import { use } from 'react'
import UserSheet from './user-sheet'

interface UserActionsProps {
  rolesPromise: Promise<IRol[] | null>
}

export function UserActions ({ rolesPromise }: UserActionsProps) {
  const roles = use(rolesPromise)

  const {
    selectedUser,
    dialogMode,
    setDialogMode,
    handleDialogClose
  } = useUsersActions()

  const handleCreate = () => {
    setDialogMode('create')
  }

  return (
    <>
      <Button onClick={handleCreate}>
        <Plus className="h-4 w-4 mr-2" />
        Crear Usuario
      </Button>

      {dialogMode && (
        <UserSheet
          open={true}
          onOpenChange={handleDialogClose}
          mode={dialogMode}
          user={selectedUser || undefined}
          roles={roles || []}
        />
      )}
    </>
  )
}
