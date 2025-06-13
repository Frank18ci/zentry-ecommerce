'use client'

import { Button } from '@/core/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { Input } from '@/core/components/ui/input'
import { Plus, Trash2, X } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { ImagenType, ProductFormData } from './product-form-types'

interface ProductFormImagesProps {
  form: UseFormReturn<ProductFormData>
}

export default function ProductFormImages ({ form }: ProductFormImagesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Imágenes del Producto</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm" onClick={() => {
            const currentImages = form.getValues('imagenes')
            if (currentImages.length < 10) {
              form.setValue('imagenes', [...currentImages, { urlImagen: '', principal: false }])
            }
          }}
          disabled={form.watch('imagenes').length >= 10}
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar imagen
        </Button>
      </div>

      <div className="space-y-2">
        {form.watch('imagenes').map((imagen: ImagenType, index: number) => (
          <FormField
            key={index}
            control={form.control}
            name={`imagenes.${index}.urlImagen`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="URL de la imagen"
                      className="flex-1"
                    />
                  </FormControl>
                  {form.watch('imagenes').length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentImages = form.getValues('imagenes')
                        const newImages = currentImages.filter((img: ImagenType, i: number) => i !== index)
                        form.setValue('imagenes', newImages.length > 0 ? newImages : [{ urlImagen: '', principal: true }])
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {index === 0 && form.watch('imagenes').length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentImages = form.getValues('imagenes')
                        form.setValue('imagenes', currentImages.filter((img: ImagenType, i: number) => i !== index))
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      {form.watch('imagenes').length === 0 && (
        <p className="text-sm text-destructive">
          Al menos una imagen es requerida
        </p>
      )}
    </div>
  )
}
