import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card'
import type { ICategoria, ISubCategoria } from '@/features/categorias/types'
import Link from 'next/link'

export default function MainCategorias ({
  categorias,
  subCategorias
}: {
  categorias: ICategoria[]
  subCategorias: ISubCategoria[]
}) {
  const categoriasAgrupadas = categorias?.reduce((acc, categoria) => {
    acc[categoria.id] = {
      categoria,
      subCategorias: subCategorias?.filter(sub => sub.categoria.id === categoria.id) || []
    }
    return acc
  }, {} as Record<string, { categoria: ICategoria; subCategorias: ISubCategoria[] }>)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Object.values(categoriasAgrupadas).map(({ categoria, subCategorias }) => (
        <Card key={categoria.id} className='group hover:shadow-lg transition-shadow duration-200'>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <CardTitle className='text-xl mb-2 group-hover:text-primary transition-colors'>
                  {categoria.nombre}
                </CardTitle>
                <CardDescription>
                  {categoria.descripcion}
                </CardDescription>
              </div>
              <Badge variant="secondary" className='ml-2'>
                {subCategorias.length} {subCategorias.length === 1 ? 'subcategoría' : 'subcategorías'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className={`flex flex-col justify-between ${subCategorias.length > 0 ? 'justify-between' : 'justify-end'} grow gap-4`}>
            {/* Subcategorías */}
            {subCategorias.length > 0 && (
              <div className='flex flex-col gap-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>Subcategorías:</h4>
                <div className='flex flex-wrap gap-2'>
                  {subCategorias.slice(0, 4).map(sub => (
                    <Link
                      key={sub.id}
                      href={`/productos?idCategoria=${categoria.id}&idSubCategoria=${sub.id}`}
                    >
                      <Badge
                        variant="outline"
                        className='hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-xs'
                      >
                        {sub.nombre}
                      </Badge>
                    </Link>
                  ))}
                  {subCategorias.length > 4 && (
                    <Badge variant="outline" className='text-xs'>
                      +{subCategorias.length - 4} más
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className='flex gap-2 mt-2'>
              <Link href={`/productos?idCategoria=${categoria.id}`} className='flex-1'>
                <Button className='w-full' size="sm">
                  Ver Productos
                </Button>
              </Link>
              <Link href={`/productos?idCategoria=${categoria.id}`}>
                <Button variant="outline" size="sm">
                  Explorar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
