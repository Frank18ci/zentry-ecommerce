import { actionGetProducts } from '@/features/productos/actions'
import AsideCategorias from '@/features/productos/components/aside-categorias'
import AsideOrdenamiento from '@/features/productos/components/aside-ordenamiento'
import PaginacionProductos from '@/features/productos/components/paginacion-productos'
import ProductList from '@/features/productos/components/product-list'
import type { ICategoria } from '@/features/productos/types'

interface IPageProductsProps {
  searchParams: Promise<{ query?: string, direction?: 'asc' | 'desc', page?: string, sortBy?: string }>
}

export default async function PageProducts ({
  searchParams
}: IPageProductsProps) {
  const { query, direction, page, sortBy } = await searchParams

  const { data: productos, success, message } = await actionGetProducts({ query, direction, page, sortBy })

  const categorias = productos?.content
    .map(producto => producto.subCategoria)
    .filter((categoria, index, self) => self.findIndex(c => c?.id === categoria?.id) === index) as ICategoria[]

  return (
    <main className='flex gap-5 grow'>
      <AsideCategorias categorias={categorias} />

      <section className="flex flex-col gap-5 grow">
        {!success && (
          <p className='text-destructive'>{message}</p>
        )}

        <div className="flex flex-col grow gap-2">
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
          currentPage={page}
          maxPage={productos?.totalPages}
          totalItems={productos?.totalElements}
          query={query}
          direction={direction}
        />
      </section>

      <AsideOrdenamiento />
    </main>
  )
}
