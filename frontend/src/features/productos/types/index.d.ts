//* Productos

export interface IResponseProducto {
  content: IProducto[]
  pageable: IPageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: ISort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface IProducto {
  id: number
  subCategoria: ICategoria
  estadoProducto: IEstadoProducto
  nombre: string
  descripcion: string
  precio: number
  fechaCreacion: Date
  productosVariantes: IProductosVariante[]
}

export interface IEstadoProducto {
  id: number
  nombre: string
}

export interface IProductosVariante {
  id: number
  talla: IEstadoProducto
  color: IColor
  stock: number
}

export interface IColor {
  id: number
  nombre: string
  codigoHex: string
}

export interface ICategoria {
  id: number
  categoria?: ICategoria
  nombre: string
  descripcion: string
}

export interface IPageable {
  pageNumber: number
  pageSize: number
  sort: ISort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ISort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
