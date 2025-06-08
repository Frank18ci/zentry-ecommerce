export enum ERole {
  ADMIN = "admin",
  CLIENTE = "cliente"
}

export interface ISession {
  User: {
    id: number
    password: string | null
    username: string
    authorities: Array<{ authority: "admin" | "cliente" }>
    accountNonExpired: boolean
    accountNonLocked: boolean
    credentialsNonExpired: boolean
    enabled: boolean
  }
  Message: string
  token: string
}

export interface IUsuario {
  id: number
  rol: IRol[]
  nombre: string
  apellido: string
  correoElectronico: string
  contraseña: string
  telefono: string
  direccion: IDireccion
  fechaCreacion: Date
}

export interface IDireccion {
  id: number
  direccion: string
  ciudad: string
  provincia: string
  codigoPostal: string
  pais: string
}

export interface IRol {
  id: number
  nombre: ERole
}
