'use server'

import { API_BASE_URL } from '@/core/lib/constants'
import type { IResponseProducto } from '@/features/productos/types'

interface IGetProductsParams {
  query?: string
  direction?: 'asc' | 'desc'
  page?: string
  sortBy?: string
}

export async function actionGetProducts ({ query, direction, page, sortBy }: IGetProductsParams | undefined = {}) {
  try {
    const params = new URLSearchParams()
    if (query) params.append('nombre', query)
    if (direction) {
      params.append('sortBy', sortBy || 'nombre')
      params.append('direction', direction)
    }
    if (page) params.append('page', (Number(page) - 1).toString())

    const res = await fetch(`${API_BASE_URL}/producto/page?${params.toString()}`)

    if (!res.ok) {
      throw new Error('Error al cargar los productos')
    }

    const data = await res.json() as IResponseProducto

    if (!data.content || !Array.isArray(data.content)) {
      throw new Error('Datos de productos no válidos')
    }

    return {
      success: true,
      data
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar los productos'
    return {
      success: false,
      message
    }
  }
}

export async function actionGetProductById ({ id }: { id: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/producto/${id}`)

    if (!res.ok) {
      throw new Error('Error al cargar el producto')
    }

    const data = await res.json()

    return {
      success: true,
      data
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar el producto'
    return {
      success: false,
      message
    }
  }
}
