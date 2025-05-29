//* Productos

import type { ISubCategoria } from '@/features/categorias/types'

export interface IImagen {
  id: number
  principal: boolean
  urlImagen: string
}

export interface IProducto {
  id: number
  subCategoria: ISubCategoria
  estadoProducto: IEstadoProducto
  nombre: string
  descripcion: string
  imagenes: IImagen[]
  precio: number
  fechaCreacion: Date
  productosVariantes: IProductosVariante[]
}

export enum ENombreEstadoProducto {
  DESCONTINUADO = 'descontinuado',
  DISPONIBLE = 'disponible',
  NUEVO = 'nuevo',
  PREVENTA = 'preventa',
  EN_OFERTA = 'en oferta',
  AGOTADO = 'agotado'
}

export interface IEstadoProducto {
  id: number
  nombre: ENombreEstadoProducto
  codigoHex?: string
}

export interface IProductosVariante {
  id: number
  talla: IEstadoProducto
  color: IEstadoProducto
  stock: number
}
