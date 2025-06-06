import { ProductActions } from '@/features/admin/components/product-actions'
import ProductsTable from '@/features/admin/components/products-table'
import { actionGetSubCategorias } from '@/features/categorias/actions'
import { actionGetColores, actionGetEstadosProductos, actionGetProducts, actionGetTallas } from '@/features/productos/actions'
import BarraBusqueda from '@/features/productos/components/barra-busqueda'
import { Suspense } from 'react'

interface IPageAdminProductsProps {
  searchParams: Promise<{
    query?: string,
    direction?: 'asc' | 'desc',
    page?: string,
    sortBy?: string,
    idCategoria?: string,
    idSubCategoria?: string
  }>
}

export default async function ProductsAdminPage ({
  searchParams,
}: IPageAdminProductsProps) {
  const productsPromise = actionGetProducts(await searchParams)
  const subCategoriasPromise = actionGetSubCategorias()
  const estadoProductsPromise = actionGetEstadosProductos()
  const coloresPromise = actionGetColores()
  const tallasPromise = actionGetTallas()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Administra tu inventario de productos</p>
        </div>

        <ProductActions
          subCategoriasPromise={subCategoriasPromise}
          estadoProductsPromise={estadoProductsPromise}
          coloresPromise={coloresPromise}
          tallasPromise={tallasPromise}
        />
      </div>

      <BarraBusqueda endpoint='/admin/products' />

      <Suspense fallback={<div>Cargando productos...</div>}>
        <ProductsTable
          productsPromise={productsPromise}
          subCategoriasPromise={subCategoriasPromise}
          estadoProductsPromise={estadoProductsPromise}
          coloresPromise={coloresPromise}
          tallasPromise={tallasPromise}
        />
      </Suspense>
    </div>
  )
}
