export enum ERole {
  ADMIN = "ROLE_ADMIN",
  CLIENTE = "ROLE_CLIENTE"
}

export interface ISession {
  User: {
    password: string | null
    username: string
    authorities: Array<{ authority: "ROLE_ADMIN" | "ROLE_CLIENTE" }>
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
  rol: Rol[]
  nombre: string
  apellido: string
  correoElectronico: string
  contraseña: string
  telefono: string
  direccion: Direccion
  fechaCreacion: Date
}

export interface Direccion {
  id: number
  direccion: string
  ciudad: string
  provincia: string
  codigoPostal: string
  pais: string
}

export interface Rol {
  id: number
  nombre: ERole
}
