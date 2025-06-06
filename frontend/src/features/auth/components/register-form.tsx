'use client'

import { Button, buttonVariants } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { Label } from '@/core/components/ui/label'
import useToastState from '@/core/hooks/use-toast-state'
import { actionRegister } from '@/features/auth/actions'
import Form from 'next/form'
import Link from 'next/link'
import { useActionState } from 'react'

export default function RegisterForm () {
  const [state, formAction, isPending] = useActionState(actionRegister, null)
  useToastState({ state, id: 'register-form' })

  return (
    <section className='flex flex-col gap-5'>
      <Form className='flex flex-col gap-5' action={formAction}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="nombre">Nombre:</Label>
          <Input type="text" name="nombre" id="nombre" required />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor="apellido">Apellido:</Label>
          <Input type="text" name="apellido" id="apellido" required />
        </div>

        <div className="flex gap-2 items-center">
          <div className='flex flex-col gap-2 grow'>
            <Label htmlFor="correoElectronico">Correo electrónico:</Label>
            <Input type="email" name="correoElectronico" id="correoElectronico" required />
          </div>

          <div className='flex flex-col gap-2 grow'>
            <Label htmlFor="telefono">Teléfono:</Label>
            <Input type="tel" name="telefono" id="telefono" required />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor="contraseña">Contraseña:</Label>
          <Input type="password" name="contraseña" id="contraseña" required />
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'Registrando...' : 'Registrar'}
        </Button>
      </Form>

      <Link href="/login" className={buttonVariants({ variant: 'link', size: 'sm' })}>
        ¿Ya tienes una cuenta? Inicia sesión aquí
      </Link>
    </section>
  )
}
