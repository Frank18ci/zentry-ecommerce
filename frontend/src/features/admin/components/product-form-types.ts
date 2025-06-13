export type VariantType = {
  id?: number
  tallaId: number
  colorId: number
  stock: number
}

export type ImagenType = {
  id?: number
  urlImagen: string
  principal: boolean
}

export type ProductFormData = {
  nombre: string
  descripcion: string
  estado: number
  precio: number
  subCategoriaId: number
  imagenes: ImagenType[]
  productosVariantes: VariantType[]
}
