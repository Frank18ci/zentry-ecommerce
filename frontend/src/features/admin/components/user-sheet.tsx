'use client'

import { Button } from '@/core/components/ui/button'
import { Checkbox } from '@/core/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/core/components/ui/form'
import { Input } from '@/core/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/core/components/ui/sheet'
import { actionCreateUser, actionUpdateUser } from '@/features/auth/actions'
import type { IRol, IUsuario } from '@/features/auth/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import type { UserFormData } from './user-form-types'

const userSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  correoElectronico: z.string().email('Ingrese un correo válido'),
  contraseña: z.string(),
  telefono: z.string().min(1, 'El teléfono es requerido'),
  roles: z.array(z.number()).min(1, 'Debe seleccionar al menos un rol'),
})

interface UserSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  user?: IUsuario
  roles?: IRol[]
}

export default function UserSheet ({
  open,
  onOpenChange,
  mode,
  user,
  roles = []
}: UserSheetProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      correoElectronico: '',
      contraseña: '',
      telefono: '',
      roles: [],
    },
  })

  useEffect(() => {
    if (user && mode === 'edit') {
      form.reset({
        nombre: user.nombre,
        apellido: user.apellido,
        correoElectronico: user.correoElectronico,
        contraseña: '', // No mostrar contraseña por seguridad
        telefono: user.telefono,
        roles: user.rol?.map(r => r.id) || [],
      })
    } else if (mode === 'create') {
      form.reset({
        nombre: '',
        apellido: '',
        correoElectronico: '',
        contraseña: '',
        telefono: '',
        roles: [],
      })
    }
  }, [user, mode, form])

  const onSubmit = async (data: UserFormData) => {
    try {
      setLoading(true)

      const selectedRoles = roles.filter(role => data.roles.includes(role.id))

      const userData = {
        nombre: data.nombre,
        apellido: data.apellido,
        correoElectronico: data.correoElectronico,
        contraseña: data.contraseña,
        telefono: data.telefono,
        rol: selectedRoles,
      }

      if (mode === 'create') {
        const result = await actionCreateUser(userData)
        if (result.success) {
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      } else if (mode === 'edit' && user) {
        const result = await actionUpdateUser(user.id, userData)
        if (result.success) {
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      }

      onOpenChange(false)
    } catch (error) {
      console.error('Error guardando usuario:', error)
      toast.error('Error guardando usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full md:w-1/2 !max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {mode === 'create' ? 'Crear Usuario' : 'Editar Usuario'}
          </SheetTitle>
          <SheetDescription>
            {mode === 'create'
              ? 'Agrega un nuevo usuario al sistema.'
              : 'Realiza cambios en los detalles del usuario.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
            <div className="space-y-4 py-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="correoElectronico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Ingrese el teléfono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contraseña"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {mode === 'edit' ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={mode === 'edit' ? 'Dejar vacío para mantener actual' : 'Ingrese la contraseña'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles</FormLabel>
                    <div className="space-y-2">
                      {roles.map((role) => (
                        <div key={role.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`role-${role.id}`}
                            checked={field.value.includes(role.id)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                field.onChange([...field.value, role.id])
                              } else {
                                field.onChange(field.value.filter(id => id !== role.id))
                              }
                            }}
                          />
                          <label
                            htmlFor={`role-${role.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                          >
                            {role.nombre}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="border-t pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Guardar'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
