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
