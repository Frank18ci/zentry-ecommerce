'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const sortOptions = [
  { id: 1, direction: 'asc', sortBy: 'nombre', label: 'Nombre: A → Z' },
  { id: 2, direction: 'desc', sortBy: 'nombre', label: 'Nombre: Z → A' },
  { id: 3, direction: 'asc', sortBy: 'precio', label: 'Precio: menor a mayor' },
  { id: 4, direction: 'desc', sortBy: 'precio', label: 'Precio: mayor a menor' }
]

export default function AsideOrdenamiento () {
  const searchParams = useSearchParams()

  const direction = searchParams.get('direction') || 'asc'
  const query = searchParams.get('query') || ''
  const sortBy = searchParams.get('sortBy') || 'nombre'

  return (
    <aside className='flex flex-col gap-2 w-40'>
      <h2 className='text-sm text-muted-foreground'>Ordenar por</h2>
      <ul>
        {sortOptions.map((option) => (
          <li key={option.id}>
            <Link
              href={`/productos?query=${query}&direction=${option.direction}&sortBy=${option.sortBy}`}
              className={`text-sm ${direction === option.direction && sortBy === option.sortBy ? 'font-bold underline' : ''}`}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
