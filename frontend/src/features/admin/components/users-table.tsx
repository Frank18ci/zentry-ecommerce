'use client'

import { Avatar, AvatarFallback } from '@/core/components/ui/avatar'
import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table'
import { getInitials } from '@/core/lib/utils'
import useUsersActions from '@/features/admin/hooks/use-users-actions'
import type { IRol, IUsuario } from '@/features/auth/types'
import { Edit, Trash2, UserIcon } from 'lucide-react'
import { use } from 'react'
import DeleteUserDialog from './delete-user-dialog'
import UserSheet from './user-sheet'

interface IUsersTableProps {
  usersPromise: Promise<{ success: boolean; message: string; data: IUsuario[] } | { success: boolean; message: string; data: null }>
  rolesPromise: Promise<IRol[] | null>
}

export default function UsersTable ({
  usersPromise,
  rolesPromise
}: IUsersTableProps) {
  const usersResult = use(usersPromise)
  const roles = use(rolesPromise)

  const {
    selectedUser,
    dialogMode,
    showDeleteDialog,
    setShowDeleteDialog,
    handleEdit,
    handleDelete,
    handleDialogClose,
    handleDeleteSuccess
  } = useUsersActions()

  if (!usersResult.success || !usersResult.data || usersResult.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <UserIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <div className="text-lg font-medium">No hay usuarios disponibles</div>
        <div className="text-sm text-muted-foreground">
          {usersResult.message || 'No se encontraron usuarios en el sistema'}
        </div>
      </div>
    )
  }

  const users = usersResult.data

  return (
    <div className='flex flex-col gap-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Fecha Creación</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => {
            const inicialesUsuario = getInitials({
              nombre: user.nombre,
              apellido: user.apellido
            })

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{inicialesUsuario}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.nombre} {user.apellido}</div>
                      <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{user.correoElectronico}</TableCell>

                <TableCell>{user.telefono}</TableCell>

                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.rol?.map((role) => (
                      <Badge key={role.id} variant="secondary" className="capitalize">
                        {role.nombre}
                      </Badge>
                    )) || (
                        <span className="text-sm text-muted-foreground">Sin roles</span>
                      )}
                  </div>
                </TableCell>

                <TableCell>
                  {user.fechaCreacion
                    ? new Date(user.fechaCreacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                    : 'N/A'
                  }
                </TableCell>

                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {selectedUser && dialogMode && (
        <UserSheet
          open={true}
          onOpenChange={handleDialogClose}
          mode={dialogMode}
          user={selectedUser}
          roles={roles || []}
        />
      )}

      {selectedUser && showDeleteDialog && (
        <DeleteUserDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          user={selectedUser}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}
