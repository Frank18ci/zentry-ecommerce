export type VariantType = {
  tallaId: number
  colorId: number
  stock: number
}

export type ProductFormData = {
  nombre: string
  descripcion: string
  estado: number
  precio: number
  subCategoriaId: number
  imagenes: string[]
  productosVariantes: VariantType[]
}
