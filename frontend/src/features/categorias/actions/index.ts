import { API_BASE_URL } from '@/core/lib/constants'
import type { IResponse } from '@/core/types'
import type { ICategoria, ISubCategoria } from '@/features/categorias/types'

export async function actionGetCategorias () {
  try {
    const res = await fetch(`${API_BASE_URL}/categoria/page`)

    if (!res.ok) {
      throw new Error('Error al cargar las categorías')
    }

    const data = await res.json() as IResponse<ICategoria>

    if (!Array.isArray(data.content) || !data.content.every(cat => cat.id && cat.nombre)) {
      throw new Error('Datos de categorías no válidos')
    }

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
    const res = await fetch(`${API_BASE_URL}/subCategoria/page`)

    if (!res.ok) {
      throw new Error('Error al cargar las sub-categorías')
    }

    const data = await res.json() as IResponse<ISubCategoria>

    if (!Array.isArray(data.content) || !data.content.every(sub => sub.id && sub.nombre)) {
      throw new Error('Datos de sub-categorías no válidos')
    }

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
