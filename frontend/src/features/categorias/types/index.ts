export interface ICategoria {
  id: number
  nombre: string
  descripcion: string
}

export interface ISubCategoria {
  id: number
  nombre: string
  descripcion: string
  categoria: ICategoria
}
