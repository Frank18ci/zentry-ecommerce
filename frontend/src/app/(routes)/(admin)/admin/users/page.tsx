import { UserActions } from '@/features/admin/components/user-actions'
import UsersTable from '@/features/admin/components/users-table'
import { actionGetRoles, actionGetUsers } from '@/features/auth/actions'
import { Suspense } from 'react'

export default async function UsersAdminPage () {
  const usersPromise = actionGetUsers()
  const rolesPromise = actionGetRoles()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-muted-foreground">Administra los usuarios del sistema</p>
        </div>

        <UserActions rolesPromise={rolesPromise} />
      </div>

      <Suspense fallback={<div>Cargando usuarios...</div>}>
        <UsersTable
          usersPromise={usersPromise}
          rolesPromise={rolesPromise}
        />
      </Suspense>
    </div>
  )
}
