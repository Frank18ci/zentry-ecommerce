'use client'

import { Button } from '@/core/components/ui/button'
import { Form } from '@/core/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/core/components/ui/sheet'
import type { ISubCategoria } from '@/features/categorias/types'
import { actualizarProducto, crearProducto } from '@/features/productos/actions'
import { IProducto, type IEstadoProducto, type ITallaColor } from '@/features/productos/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import ProductFormBasicFields from './product-form-basic-fields'
import ProductFormImages from './product-form-images'
import { ProductFormData } from './product-form-types'
import ProductFormVariants from './product-form-variants'

const productSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  estado: z.number().min(0, 'El estado es requerido'),
  precio: z.number().min(0, 'El precio debe ser positivo'),
  subCategoriaId: z.number().min(0, 'La subcategoría es requerida'),
  imagenes: z.array(z.object({
    id: z.number().optional(),
    urlImagen: z.string().min(1, 'La URL de la imagen es requerida'),
    principal: z.boolean(),
  })).min(1, 'Al menos una imagen es requerida').max(10, 'Máximo 10 imágenes'), productosVariantes: z.array(z.object({
    id: z.number().optional(),
    tallaId: z.number().min(1, 'La talla es requerida'),
    colorId: z.number().min(1, 'El color es requerido'),
    stock: z.number().min(0, 'El stock debe ser positivo'),
  })).min(1, 'Al menos una variante es requerida'),
})

interface ProductSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  product?: IProducto
  subCategoriasPromise: Promise<{ success: boolean; data: ISubCategoria[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  estadoProductsPromise: Promise<{ success: boolean; data: IEstadoProducto[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  coloresPromise: Promise<{ success: boolean; data: ITallaColor[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  tallasPromise: Promise<{ success: boolean; data: ITallaColor[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
}

export default function ProductSheet ({ open, onOpenChange, mode, product, subCategoriasPromise, estadoProductsPromise, coloresPromise, tallasPromise }: ProductSheetProps) {
  const { data: subCategorias } = use(subCategoriasPromise)
  const { data: estadoProducts } = use(estadoProductsPromise)
  const { data: colores } = use(coloresPromise)
  const { data: tallas } = use(tallasPromise)
  const [loading, setLoading] = useState(false)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema), defaultValues: {
      nombre: '',
      descripcion: '',
      precio: 0,
      subCategoriaId: 0,
      imagenes: [{ urlImagen: '', principal: true }],
      estado: 0,
      productosVariantes: [{ tallaId: 0, colorId: 0, stock: 0 }],
    },
  })

  useEffect(() => {
    if (product && mode === 'edit') {
      form.reset({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        estado: product.estadoProducto?.id || 0,
        subCategoriaId: product.subCategoria?.id || 0,
        imagenes: product.imagenes?.length > 0
          ? product.imagenes.map(img => ({
            id: img.id,
            urlImagen: img.urlImagen,
            principal: img.principal
          }))
          : [{ urlImagen: '', principal: true }], productosVariantes: product.productosVariantes?.length > 0
            ? product.productosVariantes.map(variant => ({
              id: variant.id,
              tallaId: variant.talla.id,
              colorId: variant.color.id,
              stock: variant.stock,
            }))
            : [{ tallaId: 0, colorId: 0, stock: 0 }],
      })
    } else if (mode === 'create') {
      form.reset({
        nombre: '',
        descripcion: '',
        precio: 0,
        estado: 0,
        subCategoriaId: 0,
        imagenes: [{ urlImagen: '', principal: true }],
        productosVariantes: [{ tallaId: 0, colorId: 0, stock: 0 }],
      })
    }
  }, [product, mode, form])
  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true)

      const selectedSubCategory = subCategorias
        ? subCategorias.find((sub: ISubCategoria) => sub.id === data.subCategoriaId)
        : undefined

      const selectedEstado = estadoProducts
        ? estadoProducts.find((estado: IEstadoProducto) => estado.id === data.estado)
        : undefined

      const productData = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        estadoProducto: selectedEstado,
        subCategoria: selectedSubCategory,
        imagenes: data.imagenes.filter(img => img.urlImagen.trim() !== ''), productosVariantes: data.productosVariantes.map(variant => ({
          ...(variant.id && { id: variant.id }),
          talla: {
            id: variant.tallaId,
            nombre: tallas ? tallas.find(t => t.id === variant.tallaId)?.nombre || '' : ''
          },
          color: {
            id: variant.colorId,
            nombre: colores ? colores.find(c => c.id === variant.colorId)?.nombre || '' : '',
            codigoHex: colores ? colores.find(c => c.id === variant.colorId)?.codigoHex : undefined,
          }, stock: variant.stock,
        })),
      }

      if (mode === 'create') {
        await crearProducto(productData)
        toast.success('Producto creado exitosamente')
      } else if (mode === 'edit' && product) {
        await actualizarProducto(product.id, productData)
        toast.success('Producto actualizado exitosamente')
      }

      onOpenChange(false)
    } catch (error) {
      console.error('Error guardando producto:', error)
      toast.error('Error guardando producto')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full md:w-2/3 !max-w-full">
        <SheetHeader>
          <SheetTitle>
            {mode === 'create' && 'Crear Producto'}
            {mode === 'edit' && 'Editar Producto'}
          </SheetTitle>
          <SheetDescription>
            {mode === 'create' && 'Agrega un nuevo producto a tu inventario.'}
            {mode === 'edit' && 'Realiza cambios en los detalles del producto.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
              {/* Columna izquierda: Información básica e imágenes */}
              <div className="space-y-6 overflow-y-auto pr-2">
                <ProductFormBasicFields
                  form={form}
                  subCategorias={subCategorias}
                  estadoProducts={estadoProducts}
                />

                <ProductFormImages form={form} />
              </div>

              {/* Columna derecha: Variantes */}
              <div className="overflow-y-auto pl-2 border-l">
                <ProductFormVariants
                  form={form}
                  colores={colores}
                  tallas={tallas}
                />
              </div>
            </div>

            <SheetFooter className="border-t pt-4">
              <Button
                type="button"
                className='grow'
                variant="outline"
                disabled={loading}
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className='grow'
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
