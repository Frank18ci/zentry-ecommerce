import { Avatar, AvatarFallback } from "@/core/components/ui/avatar"
import { buttonVariants } from "@/core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { getInitials } from '@/core/lib/utils'
import { actionGetSession, actionGetUser } from '@/features/auth/actions'
import BtnLogout from '@/features/auth/components/btn-logout'
import Link from 'next/link'

export default async function UserDropdown ({
  fullView = false
}: {
  fullView?: boolean
}) {
  const { data } = await actionGetSession()

  if (!data) {
    return (
      <Link className={buttonVariants({ variant: 'link' })} href='/login'>
        Iniciar sesión
      </Link>
    )
  }

  const { data: usuario } = await actionGetUser(data?.User.id)

  const inicialesUsuario = getInitials({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || ''
  })

  const esAdmin = usuario?.rol.some(rol => rol.nombre === 'admin')

  return (
    <div className="flex items-center space-x-4">
      {usuario ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{inicialesUsuario}</AvatarFallback>
              </Avatar>
              {fullView && (
                <span className="text-sm font-medium">{usuario.nombre}</span>
              )}
            </div>

          </DropdownMenuTrigger>

          <DropdownMenuContent className='w-full min-w-56 max-w-xs' align='end'>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="flex flex-col gap-2 my-2 px-2 text-sm">
              <p className='flex flex-col'>
                <span className='text-muted-foreground'>Nombre: </span>
                <span className='truncate'>{usuario.nombre} {usuario.apellido}</span>
              </p>

              {usuario.rol.length > 0 && (
                <p className='flex flex-col'>
                  <span className='text-muted-foreground'>Rol: </span>
                  <span className='truncate'>{usuario.rol.map(rol => rol.nombre).join(', ')}</span>
                </p>
              )}

              <p className='flex flex-col'>
                <span className='text-muted-foreground'>Correo electrónico: </span>
                <span className='truncate'>{usuario.correoElectronico}</span>
              </p>

              <p className='flex flex-col'>
                <span className='text-muted-foreground'>Teléfono: </span>
                <span className='truncate'>{usuario.telefono}</span>
              </p>

              {esAdmin && (
                <Link
                  className={buttonVariants()}
                  href='/admin'
                >
                  Panel de administración
                </Link>
              )}

              <BtnLogout />
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
