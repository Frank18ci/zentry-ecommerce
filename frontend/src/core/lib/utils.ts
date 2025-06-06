import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//* STRINGS
export function getInitials ({
  nombre,
  apellido
}: {
  nombre?: string
  apellido?: string
}) {
  const nombreInicial = nombre ? nombre.charAt(0).toUpperCase() : 'U'
  const apellidoInicial = apellido ? apellido.charAt(0).toUpperCase() : ''

  return `${nombreInicial}${apellidoInicial}`
}
