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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/core/components/ui/select'
import type { ITallaColor } from '@/features/productos/types'
import { Plus, Trash2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { ProductFormData, VariantType } from './product-form-types'

interface ProductFormVariantsProps {
  form: UseFormReturn<ProductFormData>
  colores?: ITallaColor[]
  tallas?: ITallaColor[]
}

export default function ProductFormVariants ({
  form,
  colores,
  tallas
}: ProductFormVariantsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Variantes del Producto</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const currentVariants = form.getValues('productosVariantes')
            form.setValue('productosVariantes', [...currentVariants, { tallaId: 0, colorId: 0, stock: 0 }])
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar variante
        </Button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {form.watch('productosVariantes').map((variant: VariantType, index: number) => (
          <div key={index} className="border rounded-lg p-3 space-y-3 bg-muted/20">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Variante {index + 1}</h4>

              {form.watch('productosVariantes').length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentVariants = form.getValues('productosVariantes')
                    const newVariants = currentVariants.filter((variant: VariantType, i: number) => i !== index)
                    form.setValue('productosVariantes', newVariants.length > 0 ? newVariants : [{ tallaId: 0, colorId: 0, stock: 0 }])
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name={`productosVariantes.${index}.tallaId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Talla</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value ? field.value.toString() : ''}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Seleccionar talla" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tallas && tallas.map((talla) => (
                          <SelectItem key={talla.id} value={talla.id.toString()}>
                            {talla.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`productosVariantes.${index}.colorId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Color</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value ? field.value.toString() : ''}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Seleccionar color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colores && colores.map((color) => (
                          <SelectItem key={color.id} value={color.id.toString()}>
                            <div className="flex items-center gap-2">
                              {color.codigoHex && (
                                <div
                                  className="w-3 h-3 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.codigoHex }}
                                />
                              )}
                              <span className="text-xs">{color.nombre}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`productosVariantes.${index}.stock`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        className="h-8"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {form.watch('productosVariantes').length === 0 && (
        <p className="text-sm text-muted-foreground">
          Al menos una variante es requerida
        </p>
      )}
    </div>
  )
}
