'use client'

import { Button } from '@/core/components/ui/button'
import useToastState from '@/core/hooks/use-toast-state'
import { actionLogout } from '@/features/auth/actions'
import Form from 'next/form'
import { useActionState } from 'react'

export default function BtnLogout () {
  const [state, formAction, isPending] = useActionState(actionLogout, null)
  useToastState({ state, id: 'logout-form' })

  return (
    <Form action={formAction} className='w-full'>
      <Button
        type='submit'
        variant='destructive'
        disabled={isPending}
      >
        {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
      </Button>
    </Form>
  )
}
