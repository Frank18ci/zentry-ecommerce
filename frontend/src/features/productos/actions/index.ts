'use server'

import { API_BASE_URL, COOKIE_NAME } from '@/core/lib/constants'
import type { IResponse } from '@/core/types'
import type { IEstadoProducto, IImagen, IProducto, IProductosVariante } from '@/features/productos/types'
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

//* ACCIONES PARA PRODUCTOS - CREATE
export async function crearProducto (productData: Partial<IProducto>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  const { productosVariantes, imagenes, ...restoProducto } = productData

  try {
    // Crear el producto
    const res = await fetch(`${API_BASE_URL}/producto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify(restoProducto),
    })

    if (!res.ok) {
      throw new Error('Error al crear el producto: ' + res.statusText)
    }

    const data = await res.json()
    const productoCreado = data

    // Crear las imágenes del producto si existen
    if (imagenes && imagenes.length > 0) {
      const imagenesPromises = imagenes.map((imagen, index) => {
        const imagenSinId = {
          urlImagen: imagen.urlImagen,
          principal: imagen.principal || index === 0 // La primera imagen es principal por defecto
        }
        return crearProductoImagen(productoCreado.id, imagenSinId)
      })

      await Promise.all(imagenesPromises)
    }

    // Crear las variantes del producto si existen
    if (productosVariantes && productosVariantes.length > 0) {
      const variantesPromises = productosVariantes.map(variante => {
        const varianteSinId = {
          talla: variante.talla,
          color: variante.color,
          stock: variante.stock
        }
        return crearProductoVariante(productoCreado.id, varianteSinId)
      })

      await Promise.all(variantesPromises)
    }

    return productoCreado
  } catch (error) {
    console.error('Error creando producto: ', error)
    throw error
  } finally {
    revalidatePath('/')
  }
}

// Función separada para crear una nueva variante de producto
export async function crearProductoVariante (idProducto: number, variante: Omit<IProductosVariante, 'id'>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  try {
    const res = await fetch(`${API_BASE_URL}/productoVariante`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify({
        producto: { id: idProducto },
        ...variante
      }),
    })

    if (!res.ok) {
      throw new Error('Error al crear la variante del producto')
    }

    return await res.json()
  } catch (error) {
    console.error('Error creando variante de producto: ', error)
    throw error
  }
}

// Función para crear una nueva imagen de producto
export async function crearProductoImagen (idProducto: number, imagen: Omit<IImagen, 'id'>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  try {
    const res = await fetch(`${API_BASE_URL}/imagenProducto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify({
        producto: { id: idProducto },
        urlImagen: imagen.urlImagen,
        principal: imagen.principal
      }),
    })

    if (!res.ok) {
      throw new Error('Error al crear la imagen del producto')
    }

    return await res.json()
  } catch (error) {
    console.error('Error creando imagen de producto: ', error)
    throw error
  }
}

//* ACCIONES - UPDATE
// Función separada para actualizar una variante de producto
export async function actualizarProductoVariante (idProducto: number, variante: IProductosVariante) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  try {
    const res = await fetch(`${API_BASE_URL}/productoVariante`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify({
        producto: { id: idProducto },
        ...variante
      }),
    })

    if (!res.ok) {
      throw new Error('Error al actualizar la variante del producto')
    }

    return await res.json()
  } catch (error) {
    console.error('Error actualizando variante de producto: ', error)
    throw error
  }
}

// Función actualizada para actualizar producto
export async function actualizarProducto (id: number, productData: Partial<IProducto>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  // Separar los datos del producto, las variantes y las imágenes
  const { productosVariantes, imagenes, ...restoProducto } = productData

  try {
    // Actualizar el producto
    const resProducto = await fetch(`${API_BASE_URL}/producto`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify({ ...restoProducto, id }),
    })

    if (!resProducto.ok) {
      throw new Error('Error al actualizar el producto')
    }

    // Actualizar las imágenes del producto with Promise.all
    if (imagenes && imagenes.length > 0) {
      const imagenesPromises = imagenes.map((imagen, index) => {
        if (imagen.id) {
          // Si la imagen tiene ID, actualizarla
          return actualizarProductoImagen(id, imagen as IImagen)
        } else {
          // Si la imagen no tiene ID, crearla
          const imagenSinId = {
            urlImagen: imagen.urlImagen,
            principal: imagen.principal || index === 0 // La primera imagen es principal por defecto
          }
          return crearProductoImagen(id, imagenSinId)
        }
      })

      await Promise.all(imagenesPromises)
    }

    // Actualizar las variantes del producto with Promise.all
    if (productosVariantes && productosVariantes.length > 0) {
      const variantesPromises = productosVariantes.map(variante => {
        if (variante.id) {
          // Si la variante tiene ID, actualizarla
          return actualizarProductoVariante(id, variante as IProductosVariante)
        } else {
          // Si la variante no tiene ID, crearla
          const varianteSinId = {
            talla: variante.talla,
            color: variante.color,
            stock: variante.stock
          }
          return crearProductoVariante(id, varianteSinId)
        }
      })

      await Promise.all(variantesPromises)
    }

    const data = await resProducto.json()
    return data
  } catch (error) {
    console.error('Error actualizando producto: ', error)
    throw error
  } finally {
    revalidatePath('/')
  }
}

// Función para actualizar una imagen de producto
export async function actualizarProductoImagen (idProducto: number, imagen: IImagen) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)

  try {
    const res = await fetch(`${API_BASE_URL}/imagenProducto`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value || ''}`,
      },
      body: JSON.stringify({
        id: imagen.id,
        producto: { id: idProducto },
        urlImagen: imagen.urlImagen,
        principal: imagen.principal
      }),
    })

    if (!res.ok) {
      throw new Error('Error al actualizar la imagen del producto')
    }

    return await res.json()
  } catch (error) {
    console.error('Error actualizando imagen de producto: ', error)
    throw error
  }
}

//! ACCIONES - DELETE
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
