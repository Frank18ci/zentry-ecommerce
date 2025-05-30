import { ScrollArea, ScrollBar } from '@/core/components/ui/scroll-area'
import { Skeleton } from '@/core/components/ui/skeleton'
import AsideCategorias from '@/features/categorias/components/aside-categorias'
import { actionGetProducts } from '@/features/productos/actions'
import AsideOrdenamiento from '@/features/productos/components/aside-ordenamiento'
import PaginacionProductos from '@/features/productos/components/paginacion-productos'
import ProductList from '@/features/productos/components/product-list'
import { Suspense } from 'react'

interface IPageProductsProps {
  searchParams: Promise<{
    query?: string,
    direction?: 'asc' | 'desc',
    page?: string,
    sortBy?: string,
    idCategoria?: string,
    idSubCategoria?: string
  }>
}

export default async function PageProducts ({
  searchParams
}: IPageProductsProps) {
  const { query, direction, page, sortBy, idCategoria, idSubCategoria } = await searchParams

  const { data: productos, success, message } = await actionGetProducts({ query, direction, page, sortBy, idCategoria, idSubCategoria })

  return (
    <main className='flex flex-col gap-5 xs:flex-row grow'>
      <div className='flex flex-col gap-5 max-h-dvh'>
        <Suspense fallback={<Skeleton className='xs:w-36' />}>
          <ScrollArea className="w-full whitespace-nowrap xs:w-36">
            <AsideCategorias />
            <div className='flex xs:hidden'>
              <ScrollBar orientation="horizontal" />
            </div>
            <div className='hidden xs:flex'>
              <ScrollBar orientation="vertical" />
            </div>
          </ScrollArea>
        </Suspense>
        <div className="flex xs:w-36 md:hidden">
          <AsideOrdenamiento />
        </div>
      </div>

      <section className="flex flex-col gap-5 grow">
        {!success && (
          <p className='text-destructive'>{message}</p>
        )}

        <div className="flex flex-col gap-2 grow">
          {query && (
            <p>
              Mostrando {productos?.totalElements || 0} {
                productos
                  ?.totalElements === 1 ? 'resultado' : 'resultados'
              } para &quot;<span className='font-bold'>{query}</span>&quot;
            </p>
          )}

          <ProductList productos={productos?.content} />
        </div>

        <PaginacionProductos
          maxPage={productos?.totalPages}
          totalItems={productos?.totalElements}
        />
      </section>

      <div className="hidden md:flex">
        <AsideOrdenamiento />
      </div>
    </main>
  )
}
