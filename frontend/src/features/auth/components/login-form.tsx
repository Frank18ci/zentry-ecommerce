'use client'

import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { Label } from '@/core/components/ui/label'
import useToastState from '@/core/hooks/use-toast-state'
import { actionLogin } from '@/features/auth/actions'
import Form from 'next/form'
import { useActionState } from 'react'

export default function LoginForm () {
  const [state, formAction, isPending] = useActionState(actionLogin, null)
  useToastState({ state, id: 'login-form' })

  return (
    <section className='flex flex-col gap-5'>
      <Form className='flex flex-col gap-5' action={formAction}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="correoElectronico">Correo electrónico:</Label>
          <Input type="email" name="correoElectronico" id="correoElectronico" required />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor="contraseña">Contraseña:</Label>
          <Input type="password" name="contraseña" id="contraseña" required />
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </Form>
    </section>
  )
}
