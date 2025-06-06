'use client'

import { Avatar, AvatarFallback } from "@/core/components/ui/avatar"
import { Button, buttonVariants } from "@/core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import useToastState from '@/core/hooks/use-toast-state'
import { actionLogout } from '@/features/auth/actions'
import type { IUsuario } from '@/features/auth/types'
import Form from 'next/form'
import Link from 'next/link'
import { use, useActionState } from 'react'

export default function UserDropdown ({ usuarioPromise }: {
  usuarioPromise: Promise<{ success: boolean; message: string; data?: undefined } | { success: boolean; message: string; data: IUsuario }>
}) {
  const { data: usuario } = use(usuarioPromise)
  const inicialesUsuario = usuario?.nombre ? usuario.nombre.substring(0, 2).toUpperCase() : ''

  const [state, formAction, isPending] = useActionState(actionLogout, null)
  useToastState({ state, id: 'logout-form' })

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
                <span className='text-muted-foreground'>Nombre: </span>
                <span className='truncate'>{usuario.nombre}</span>
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

              <Form action={formAction} className='w-full'>
                <Button
                  type='submit'
                  variant='destructive'
                  disabled={isPending}
                >
                  {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </Button>
              </Form>
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
