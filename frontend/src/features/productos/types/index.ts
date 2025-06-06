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
  EN_OFERTA = 'en oferta',
  AGOTADO = 'agotado',
  EDICION_LIMITADA = 'edición limitada',
  EN_REVISION = 'en revisión',
  LIQUIDACION = 'liquidación',
  PROXIMAMENTE = 'próximamente',
}

export interface IEstadoProducto {
  id: number
  nombre: ENombreEstadoProducto
  codigoHex?: string
}

export interface ITallaColor {
  id: number
  nombre: string
  codigoHex?: string
}

export interface IProductosVariante {
  id: number
  talla: ITallaColor
  color: ITallaColor
  stock: number
}
