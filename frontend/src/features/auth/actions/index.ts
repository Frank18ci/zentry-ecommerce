'use server'

import { API_BASE_URL, COOKIE_NAME } from '@/core/lib/constants'
import type { ISession, IUsuario } from '@/features/auth/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function setCookie (value: string) {
  const cookieStore = await cookies()
  cookieStore.set({
    name: COOKIE_NAME,
    value,
    path: '/',
    maxAge: 3600,
  })
}

export async function actionLogin (initialState: unknown, formData: FormData) {
  let success = false

  const correoElectronico = formData.get('correoElectronico') as string
  const contraseña = formData.get('contraseña') as string

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correoElectronico, contraseña }),
    })

    if (!response.ok) {
      throw new Error("El correo electrónico o la contraseña son incorrectos")
    }

    const session = await response.json() as ISession

    if (!session.token) {
      throw new Error('Token no recibido')
    }

    await setCookie(session.token)

    success = true

    return {
      success,
      message: session.Message || 'Inicio de sesión exitoso',
      data: session,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al iniciar sesión'
    success = false
    return {
      success,
      message,
      data: null,
    }
  } finally {
    if (success) redirect('/')
  }
}

export async function actionLogout () {
  let success = false

  try {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)

    success = true

    return {
      success,
      message: 'Sesión cerrada exitosamente',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cerrar sesión'
    success = false
    return {
      success,
      message,
    }
  } finally {
    if (success) redirect('/login')
  }
}

export async function actionCheckSession () {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.has(COOKIE_NAME)

    if (!sessionCookie) {
      return {
        success: false,
        message: 'No hay sesión activa',
      }
    }

    return {
      success: true,
      message: 'Sesión activa'
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al verificar la sesión'
    return {
      success: false,
      message,
    }
  }
}

export async function actionGetSession () {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(COOKIE_NAME)

    if (!sessionCookie) {
      return {
        success: false,
        message: 'No hay sesión activa',
      }
    }

    const response = await fetch(`${API_BASE_URL}/usuario/session`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionCookie.value}`,
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener la sesión')
    }

    const session = await response.json() as ISession

    return {
      success: true,
      message: 'Sesión obtenida exitosamente',
      data: session,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener la sesión'
    return {
      success: false,
      message,
    }
  }
}

//* REGISTER

export async function actionRegister (formData: FormData) {
  let success = false

  //* Datos de usuario
  const nombre = formData.get('nombre') as string
  const apellido = formData.get('apellido') as string
  const correoElectronico = formData.get('correoElectronico') as string
  const contraseña = formData.get('contraseña') as string
  const telefono = formData.get('telefono') as string

  const clienteOAdmin = formData.get('clienteOAdmin') as string

  if (!['ROLE_CLIENTE', 'ROLE_ADMIN'].includes(clienteOAdmin)) {
    return {
      success: false,
      message: 'Rol no válido',
    }
  }

  //* Construcción del objeto de usuario
  const usuario: Partial<IUsuario> = {
    nombre,
    apellido,
    correoElectronico,
    contraseña,
    telefono
  }

  const saveEndpoint = clienteOAdmin === 'ROLE_CLIENTE' ? 'saveCliente' : 'saveAdmin'

  try {
    const response = await fetch(`${API_BASE_URL}/${saveEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })

    if (!response.ok) {
      throw new Error("Error al registrar el usuario")
    }

    success = true

    return {
      success,
      message: 'Registro exitoso',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al registrar el usuario'
    success = false
    return {
      success,
      message,
    }
  } finally {
    if (success) redirect('/login')
  }
}
