export interface ICarritoItem {
  id: string
  productoId: number
  varianteId: number
  nombre: string
  precio: number
  cantidad: number
  talla: string
  color: string
  codigoHexColor: string
  stock: number
  imagen?: string
}

export interface ICarritoResumen {
  subtotal: number
  impuestos: number
  envio: number
  total: number
  cantidadItems: number
}

export interface ICarritoStore {
  items: ICarritoItem[]
  isOpen: boolean

  // Acciones
  addItem: (item: Omit<ICarritoItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, cantidad: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Computadas
  getResumen: () => ICarritoResumen
  getItemById: (id: string) => ICarritoItem | undefined
  isItemInCart: (productoId: number, varianteId?: number) => boolean
  getItemCount: () => number
}
