import { actionGetCategorias, actionGetSubCategorias } from '@/features/categorias/actions'
import type { ICategoria, ISubCategoria } from '@/features/categorias/types'
import Link from 'next/link'

export default async function AsideCategorias () {
  const [dataCategorias, dataSubCategorias] = await Promise.all([
    actionGetCategorias(),
    actionGetSubCategorias()
  ])

  const categorias = dataCategorias.data
  const subCategorias = dataSubCategorias.data

  if (!categorias || categorias.length === 0 || !subCategorias || subCategorias.length === 0) {
    return (
      <aside className='flex flex-col gap-2 w-max xs:w-full'>
        <h2 className='text-sm text-muted-foreground'>Categorías</h2>
        <p className='text-xs text-muted-foreground'>No hay categorías disponibles.</p>
      </aside>
    )
  }

  const categoriasAgrupadas = categorias?.reduce((acc, categoria) => {
    acc[categoria.id] = {
      categoria,
      subCategorias: subCategorias?.filter(sub => sub.categoria.id === categoria.id)
    }
    return acc
  }, {} as Record<string, { categoria: ICategoria; subCategorias: ISubCategoria[] }>)

  return (
    <aside className='flex flex-col gap-2 xs:w-full overflow-auto max-h-full max-w-full'>
      <h2 className='text-sm text-muted-foreground'>Categorías</h2>

      <ul className='flex gap-3 xs:flex-col gap-x-4'>
        {Object.values(categoriasAgrupadas).map(({ categoria, subCategorias }) => (
          <li key={categoria.id} className='min-w-32'>
            <div className='text-sm'>
              <Link href={`/productos?idCategoria=${categoria.id}`} className='hover:text-primary'>
                <div className='mb-1 font-medium'>
                  {categoria.nombre}
                </div>
              </Link>
              <ul className='flex flex-col ml-2'>
                {subCategorias.map(sub => (
                  <li key={sub.id} className='text-xs'>
                    <Link href={`/productos?idCategoria=${categoria.id}&idSubCategoria=${sub.id}`} className='hover:text-primary'>
                      {sub.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
