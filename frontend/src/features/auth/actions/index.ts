'use server'

import { API_BASE_URL, COOKIE_NAME } from '@/core/lib/constants'
import type { IRol, ISession, IUsuario } from '@/features/auth/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

//* USERS
export async function actionGetUsers () {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener los usuarios')
    }

    const usuarios = await response.json() as IUsuario[]

    return {
      success: true,
      message: 'Usuarios obtenidos exitosamente',
      data: usuarios,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener los usuarios'
    return {
      success: false,
      message,
      data: null,
    }
  }
}

export async function actionGetUser (id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener el usuario')
    }

    const usuario = await response.json() as IUsuario

    return {
      success: true,
      message: 'Usuario obtenido exitosamente',
      data: usuario,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener el usuario'
    return {
      success: false,
      message,
      data: null,
    }
  }
}

//* LOGIN
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

//* REGISTER
export async function actionRegister (initialState: unknown, formData: FormData) {
  let success = false

  //* Datos de usuario
  const nombre = formData.get('nombre') as string
  const apellido = formData.get('apellido') as string
  const correoElectronico = formData.get('correoElectronico') as string
  const contraseña = formData.get('contraseña') as string
  const telefono = formData.get('telefono') as string

  //* Construcción del objeto de usuario
  const usuario: Partial<IUsuario> = {
    nombre,
    apellido,
    correoElectronico,
    contraseña,
    telefono
  }

  try {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
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

//* ROLES
export async function actionGetRoles () {
  try {
    const response = await fetch(`${API_BASE_URL}/rol`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener los roles')
    }

    const roles = await response.json() as IRol[]

    return roles
  } catch (error) {
    console.error(error)
    return null
  }
}

//* SESSION
async function setCookie (value: string) {
  const cookieStore = await cookies()
  cookieStore.set({
    name: COOKIE_NAME,
    value,
    path: '/',
    maxAge: 3600,
  })
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

//* USERS CRUD
export async function actionCreateUser (userData: Partial<IUsuario>) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)

  // Eliminar campos vacíos del objeto userData
  const cleanedUserData: Partial<IUsuario> = Object.fromEntries(
    Object.entries(userData).filter(([, value]) => value !== undefined && value !== '')
  )

  try {
    const response = await fetch(`${API_BASE_URL}/usuario/saveAdmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionCookie?.value || ''}`,
      },
      body: JSON.stringify(cleanedUserData),
    })

    if (!response.ok) {
      throw new Error('Error al crear el usuario')
    }

    return {
      success: true,
      message: 'Usuario creado exitosamente',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear el usuario'
    return {
      success: false,
      message,
    }
  } finally {
    revalidatePath('/admin')
  }
}

export async function actionUpdateUser (id: number, userData: Partial<IUsuario>) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)

  // Eliminar campos vacíos del objeto userData
  const cleanedUserData: Partial<IUsuario> = Object.fromEntries(
    Object.entries(userData).filter(([, value]) => value !== undefined && value !== '')
  )

  try {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionCookie?.value || ''}`
      },
      body: JSON.stringify({ ...cleanedUserData, id }),
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario')
    }

    return {
      success: true,
      message: 'Usuario actualizado exitosamente',
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    const message = error instanceof Error ? error.message : 'Error al actualizar el usuario'
    return {
      success: false,
      message,
    }
  } finally {
    revalidatePath('/admin')
  }
}

export async function actionDeleteUser (id: number) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)

  try {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionCookie?.value || ''}`,
      }
    })

    if (!response.ok) {
      throw new Error('Error al eliminar el usuario')
    }

    return {
      success: true,
      message: 'Usuario eliminado exitosamente',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar el usuario'
    return {
      success: false,
      message,
    }
  } finally {
    revalidatePath('/admin')
  }
}
