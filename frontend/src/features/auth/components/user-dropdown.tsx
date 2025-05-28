import { Avatar, AvatarFallback } from "@/core/components/ui/avatar"
import { Button, buttonVariants } from "@/core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { actionGetSession, actionLogout } from '@/features/auth/actions'
import { ERole } from '@/features/auth/types'
import Link from 'next/link'

export default async function UserDropdown () {
  const session = await actionGetSession()
  const usuario = session.data?.User

  const inicialesUsuario = usuario?.username ? usuario.username.substring(0, 2).toUpperCase() : ''

  const rolesUsuario = usuario?.authorities.map((auth) => {
    return auth.authority === ERole.ADMIN ? 'Administrador' : 'Cliente'
  }).join(', ')

  return (
    <div className="flex items-center space-x-4">
      {usuario ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>{inicialesUsuario}</AvatarFallback>
            </Avatar>

          </DropdownMenuTrigger>

          <DropdownMenuContent className='w-full min-w-56 max-w-xs' align='end'>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="flex flex-col gap-2 my-2 px-2 text-sm">
              <p className='flex flex-col'>
                <span className='text-muted-foreground'>Correo electrónico: </span>
                <span className='truncate'>{usuario.username}</span>
              </p>

              <p className='flex flex-col'>
                <span className='text-muted-foreground'>{rolesUsuario?.length && rolesUsuario.length > 1 ? 'Roles: ' : 'Rol: '}</span>
                <span>{rolesUsuario}</span>
              </p>

              <Button type='button' onClick={actionLogout} variant='destructive'>
                Cerrar sesión
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

      ) : (
        <Link className={buttonVariants({ variant: 'link' })} href='/login'>
          Iniciar sesión
        </Link>
      )}
    </div>
  )
}
