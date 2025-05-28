import type { ICategoria } from '@/features/productos/types'

interface AsideCategoriasProps {
  categorias: (ICategoria | undefined)[]
}

export default function AsideCategorias ({ categorias }: AsideCategoriasProps) {
  // Agrupar subcategorías por categoría padre
  const categoriasAgrupadas = categorias.reduce((acc, subCategoria) => {
    if (!subCategoria?.categoria) return acc

    const categoriaId = subCategoria.categoria.id
    if (!acc[categoriaId]) {
      acc[categoriaId] = {
        categoria: subCategoria.categoria,
        subcategorias: []
      }
    }
    acc[categoriaId].subcategorias.push(subCategoria)
    return acc
  }, {} as Record<number, { categoria: ICategoria, subcategorias: ICategoria[] }>)

  return (
    <aside className='flex flex-col gap-2 w-36'>
      <h2 className='text-sm text-muted-foreground'>Categorías</h2>

      <ul className='flex flex-col gap-3'>
        {Object.values(categoriasAgrupadas).map(({ categoria, subcategorias }) => (
          <li key={categoria.id}>
            <div className='font-medium text-sm mb-1'>
              {categoria.nombre}
            </div>
            <ul className='ml-2 flex flex-col'>
              {subcategorias.map(sub => (
                <li key={sub.id} className='text-sm text-muted-foreground'>
                  {sub.nombre}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  )
}
