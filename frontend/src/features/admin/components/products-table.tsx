'use client'

import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table'
import { formatAmount } from '@/core/lib/helpers'
import type { IResponse } from '@/core/types'
import { DeleteProductDialog } from '@/features/admin/components/delete-product-dialog'
import ProductSheet from '@/features/admin/components/product-sheet'
import useProductsActions from '@/features/admin/hooks/use-products-actions'
import type { ISubCategoria } from '@/features/categorias/types'
import PaginacionProductos from '@/features/productos/components/paginacion-productos'
import { IProducto, type IEstadoProducto, type ITallaColor } from '@/features/productos/types'
import { Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { use } from 'react'

interface IProductsTableProps {
  productsPromise: Promise<{ success: boolean; data: IResponse<IProducto>; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  subCategoriasPromise: Promise<{ success: boolean; data: ISubCategoria[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  estadoProductsPromise: Promise<{ success: boolean; data: IEstadoProducto[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  coloresPromise: Promise<{ success: boolean; data: ITallaColor[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
  tallasPromise: Promise<{ success: boolean; data: ITallaColor[]; message?: undefined } | { success: boolean; message: string; data?: undefined }>
}

export default function ProductsTable ({
  productsPromise,
  subCategoriasPromise,
  estadoProductsPromise,
  coloresPromise,
  tallasPromise
}: IProductsTableProps) {
  const { data: products, success } = use(productsPromise)

  const {
    selectedProduct,
    dialogMode,
    showDeleteDialog,
    setShowDeleteDialog,
    handleEdit,
    handleDelete,
    handleDialogClose,
    handleDeleteSuccess
  } = useProductsActions()

  if (!success || !products || !products.content || products.content.length === 0) {
    return <div>No hay productos disponibles</div>
  }

  return (
    <div className='flex flex-col gap-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.content.map((product) => {
            const totalStock = product.productosVariantes?.reduce((total, variant) => total + (variant.stock || 0), 0) || 0

            return (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    width={150}
                    height={150}
                    src={product.imagenes?.[0]?.urlImagen || '/vercel.svg'}
                    alt={product.nombre}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>

                <TableCell className="font-medium">{product.nombre}</TableCell>

                <TableCell>{product.subCategoria?.categoria?.nombre || product.subCategoria?.nombre || 'N/A'}</TableCell>
                <TableCell>{formatAmount(product.precio)}</TableCell>

                <TableCell>
                  {totalStock}
                </TableCell>

                <TableCell>
                  <Badge className='capitalize'>
                    {product.estadoProducto.nombre}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <PaginacionProductos
        maxPage={products.totalPages}
        totalItems={products.totalElements}
        endpoint='/admin/products'
      />      {selectedProduct && dialogMode && (
        <ProductSheet
          open={true}
          onOpenChange={handleDialogClose}
          mode={dialogMode}
          product={selectedProduct}
          subCategoriasPromise={subCategoriasPromise}
          estadoProductsPromise={estadoProductsPromise}
          coloresPromise={coloresPromise}
          tallasPromise={tallasPromise}
        />
      )}

      {selectedProduct && showDeleteDialog && (
        <DeleteProductDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          product={selectedProduct}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}
