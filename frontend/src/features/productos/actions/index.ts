'use server'

import { API_BASE_URL, COOKIE_NAME } from '@/core/lib/constants'
import type { IResponse } from '@/core/types'
import type { IEstadoProducto, IProducto } from '@/features/productos/types'
import console from 'console'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

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

    const data = await res.json() as IResponse<IProducto>

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

//* Estado de productos
export async function actionGetEstadosProductos () {
  try {
    const res = await fetch(`${API_BASE_URL}/estadoProducto`)

    if (!res.ok) {
      throw new Error('Error al cargar los estados de productos')
    }

    const data = await res.json() as IEstadoProducto[]

    return {
      success: true,
      data
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar los estados de productos'
    return {
      success: false,
      message
    }
  }
}

//* Colores
export async function actionGetColores () {
  try {
    const res = await fetch(`${API_BASE_URL}/color`)

    if (!res.ok) {
      throw new Error('Error al cargar los colores')
    }

    const data = await res.json() as IEstadoProducto[]

    return {
      success: true,
      data
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar los colores'
    return {
      success: false,
      message
    }
  }
}

//* Tallas
export async function actionGetTallas () {
  try {
    const res = await fetch(`${API_BASE_URL}/talla`)

    if (!res.ok) {
      throw new Error('Error al cargar las tallas')
    }

    const data = await res.json() as IEstadoProducto[]

    return {
      success: true,
      data
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar las tallas'
    return {
      success: false,
      message
    }
  }
}

//* Acciones CRUD para productos
export async function crearProducto (productData: Partial<IProducto>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  try {
    const res = await fetch(`${API_BASE_URL}/producto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify(productData),
    })

    if (!res.ok) {
      throw new Error('Error al crear el producto: ' + res.statusText)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error creando producto: ', error)
    throw error
  } finally {
    revalidatePath('/')
  }
}

export async function actualizarProducto (id: number, productData: Partial<IProducto>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  try {
    const res = await fetch(`${API_BASE_URL}/producto`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify({ ...productData, id }),
    })

    console.log(res)

    if (!res.ok) {
      throw new Error('Error al actualizar el producto')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error actualizando producto: ', error)
    throw error
  } finally {
    revalidatePath('/')
  }
}

export async function eliminarProducto (id: number) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  try {
    const res = await fetch(`${API_BASE_URL}/producto/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token?.value || ''}`,
      },
    })

    if (!res.ok) {
      throw new Error('Error al eliminar el producto')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error eliminando producto: ', error)
    throw error
  } finally {
    revalidatePath('/')
  }
}
