'use server'

import { API_BASE_URL } from '@/core/lib/constants'
import type { IResponseProducto } from '@/features/productos/types'

interface IGetProductsParams {
  query?: string
  direction?: 'asc' | 'desc'
  page?: string
  sortBy?: string
  idCategoria?: string
  idSubCategoria?: string
}

export async function actionGetProducts (props: IGetProductsParams | undefined = {}) {
  const { query, direction, page, sortBy, idCategoria, idSubCategoria } = props

  try {
    const params = new URLSearchParams()

    //* 1. Agregar parámetros de búsqueda
    params.append('size', '6')

    if (query) params.append('nombre', query)

    if (direction) {
      params.append('sortBy', sortBy || 'nombre')
      params.append('direction', direction)
    }

    if (page) {
      params.append('page', (Number(page) - 1).toString())
    }

    if (idCategoria) params.append('idCategoria', idCategoria)
    if (idSubCategoria) params.append('idSubCategoria', idSubCategoria)

    //* 2. Realizar la solicitud a la API
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
