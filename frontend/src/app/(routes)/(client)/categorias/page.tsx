import { Button } from '@/core/components/ui/button'
import { actionGetCategorias, actionGetSubCategorias } from '@/features/categorias/actions'
import MainCategorias from '@/features/categorias/components/main-categorias'
import Link from 'next/link'

export default async function PageCategorias () {
  const [dataCategorias, dataSubCategorias] = await Promise.all([
    actionGetCategorias(),
    actionGetSubCategorias()
  ])

  if (!dataCategorias.success) {
    return (
      <main className='flex flex-col gap-5 grow'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>Categorías</h1>
          <p className='text-destructive'>{dataCategorias.message}</p>
        </div>
      </main>
    )
  }

  if (!dataSubCategorias.success) {
    return (
      <main className='flex flex-col gap-5 grow'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>Categorías</h1>
          <p className='text-destructive'>{dataSubCategorias.message}</p>
        </div>
      </main>
    )
  }

  const categorias = dataCategorias.data
  const subCategorias = dataSubCategorias.data

  return (
    <main className='flex flex-col gap-5 grow'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>Categorías</h1>
        <p className='text-muted-foreground'>
          Explora todas nuestras categorías de productos y encuentra exactamente lo que buscas.
        </p>
      </div>

      <MainCategorias
        categorias={categorias}
        subCategorias={subCategorias}
      />

      {/* Summary section */}
      <div className='mt-8 p-6 bg-muted/50 rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
          <div>
            <h3 className='text-2xl font-bold text-primary'>{categorias?.length || 0}</h3>
            <p className='text-sm text-muted-foreground'>Categorías principales</p>
          </div>
          <div>
            <h3 className='text-2xl font-bold text-primary'>{subCategorias?.length || 0}</h3>
            <p className='text-sm text-muted-foreground'>Subcategorías disponibles</p>
          </div>
          <div>
            <Link href="/productos">
              <Button className='mt-2'>
                Ver Todos los Productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
