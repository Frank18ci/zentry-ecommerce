import { API_BASE_URL } from '@/core/lib/constants'
import type { ICategoria, ISubCategoria } from '@/features/categorias/types'

export async function actionGetCategorias () {
  try {
    const res = await fetch(`${API_BASE_URL}/categoria`)

    if (!res.ok) {
      throw new Error('Error al cargar las categorías')
    }

    const data = await res.json() as ICategoria[]

    return {
      success: true,
      data
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar las categorías'
    return {
      success: false,
      message
    }
  }
}

export async function actionGetSubCategorias () {
  try {
    const res = await fetch(`${API_BASE_URL}/subCategoria`)

    if (!res.ok) {
      throw new Error('Error al cargar las sub-categorías')
    }

    const data = await res.json() as ISubCategoria[]

    return {
      success: true,
      data
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar las sub-categorías'
    return {
      success: false,
      message
    }
  }
}
