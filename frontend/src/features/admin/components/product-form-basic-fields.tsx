'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { Input } from '@/core/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/core/components/ui/select'
import { Textarea } from '@/core/components/ui/textarea'
import type { ISubCategoria } from '@/features/categorias/types'
import type { IEstadoProducto } from '@/features/productos/types'
import { UseFormReturn } from 'react-hook-form'
import { ProductFormData } from './product-form-types'

interface ProductFormBasicFieldsProps {
  form: UseFormReturn<ProductFormData>
  subCategorias?: ISubCategoria[]
  estadoProducts?: IEstadoProducto[]
}

export default function ProductFormBasicFields ({
  form,
  subCategorias,
  estadoProducts
}: ProductFormBasicFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="nombre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input placeholder='Nombre del producto' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="descripcion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción</FormLabel>
            <FormControl>
              <Textarea placeholder='Descripción del producto' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="estado"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value ? field.value.toString() : ''}>
                <FormControl>
                  <SelectTrigger className='w-full capitalize'>
                    <SelectValue placeholder="Elige un estado" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {estadoProducts && estadoProducts.map((estado) => (
                    <SelectItem className='capitalize' key={estado.id} value={estado.id.toString()}>
                      {estado.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="precio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio (S/)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subCategoriaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subcategoría</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(parseInt(value))}
              value={field.value ? field.value.toString() : ''}
            >
              <FormControl>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Elige una subcategoría" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {subCategorias &&
                  Object.entries(
                    subCategorias.reduce((acc: Record<string, ISubCategoria[]>, subCat: ISubCategoria) => {
                      const catName = subCat.categoria.nombre
                      if (!acc[catName]) acc[catName] = []
                      acc[catName].push(subCat)
                      return acc
                    }, {} as Record<string, ISubCategoria[]>)
                  ).map(([categoryName, subcategories]) => (
                    <SelectGroup key={categoryName}>
                      <SelectLabel>{categoryName}</SelectLabel>
                      {(subcategories as ISubCategoria[]).map((subCat) => (
                        <SelectItem key={subCat.id} value={subCat.id.toString()}>
                          {subCat.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))
                }
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
    </div>
  )
}
