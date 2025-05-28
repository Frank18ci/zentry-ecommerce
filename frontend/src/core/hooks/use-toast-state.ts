'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

type TStateFormAction = {
  success: boolean
  message: string
} | null | undefined

export default function useToastState ({
  state,
  id
}: {
  state: TStateFormAction
  id?: string
}) {
  useEffect(() => {
    if (state && state.message) {
      toast[state.success ? "success" : "error"](state.message, {
        id: id || `id-${state.message}`,
      })
    }
  }, [state, id])

  return state
}
